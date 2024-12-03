import fastify from "fastify";
import mysql from "mysql2";

const app = fastify({ logger: true });

const db = mysql.createPool({
  host: "db",
  user: "root",
  password: "root",
  database: "test",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// POST endpoint to add a new club
app.post("/clubs", async (request, reply) => {
  const { name, users } = request.body as { name: string; users: any }; 
  try {
    // Use the promise-based API for inserting the club
    const [results] = await db.promise().query(
      "INSERT INTO club (name, users) VALUES (?, ?)",
      [name, JSON.stringify(users)] // Convert users to JSON string
    );

    const insertId = (results as mysql.ResultSetHeader).insertId;

    reply.code(201).send({
      message: `Club added with ID: ${insertId}`,
      club: { id: insertId, name, users },
    });
  } catch (error) {
    app.log.error(error); 
    reply.status(500).send({ error: "Failed to add club" });
  }
});

// GET endpoint to fetch clubs
app.get("/clubs", async (request, reply) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM club");
    reply.send(results);
  } catch (error) {
    app.log.error(error);
    reply.status(500).send({ error: "Database query failed" });
  }
});

// Add a member
app.post("/clubs/:id/members", async (request, reply) => {
  const { id } = request.params as { id: string };
  const { id: userId, name } = request.body as { id: number; name: string };

  try {
    const [rows] = await db
      .promise()
      .query<mysql.RowDataPacket[]>("SELECT users FROM club WHERE id = ?", [id]);

    if (rows.length === 0) {
      return reply.status(404).send({ error: "Club not found" });
    }

    const currentUsers = rows[0].users;
    
    if (currentUsers.some((u: any) => u.id === userId)) {
      return reply.status(400).send({ error: "User already exists" });
    }

    currentUsers.push({ id: userId, name });
    await db.promise().query("UPDATE club SET users = ? WHERE id = ?", [
      JSON.stringify(currentUsers),
      id,
    ]);

    reply.status(201).send({
      message: "User added to the club",
      club: { id, users: currentUsers },
    });
  } catch (error) {
    app.log.error(error);
    reply.status(500).send({ error: "Failed to add member" });
  }
});

// Remove a member from a club
app.delete("/clubs/:id/members/:memberId", async (request, reply) => {
  const { id, memberId } = request.params as { id: string; memberId: string };

  try {
    // Explicitly type the query result as RowDataPacket[]
    const [rows] = await db
      .promise()
      .query<mysql.RowDataPacket[]>("SELECT users FROM club WHERE id = ?", [id]);

    // Validate that the club exists
    if (rows.length === 0 || !rows[0].users) {
      return reply.status(404).send({ error: "Club not found" });
    }

    console.log("users field from database:", rows[0].users);

    // Parse the current users
    const currentUsers = rows[0].users;

    // Check if the user exists in the club
    const userExists = currentUsers.some((u: any) => u.id === parseInt(memberId));
    if (!userExists) {
      return reply.status(404).send({ error: "User not found in the club" });
    }

    // Remove the user from the list
    const updatedUsers = currentUsers.filter((u: any) => u.id !== parseInt(memberId));

    // Update the users in the database
    await db.promise().query("UPDATE club SET users = ? WHERE id = ?", [
      JSON.stringify(updatedUsers),
      id,
    ]);

    reply.send({
      message: "User removed from the club",
      club: { id, users: updatedUsers },
    });
  } catch (error) {
    app.log.error(error);
    reply.status(500).send({ error: "Failed to remove member" });
  }
});

// Start the Fastify app
const start = async () => {
  try {
    const address = await app.listen({ port: 3000, host: "0.0.0.0" });
    app.log.info(`Server listening on ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
