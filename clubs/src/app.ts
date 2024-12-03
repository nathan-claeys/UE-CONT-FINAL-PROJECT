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
  const { name, user } = request.body as { name: string; user: { id: number; name: string } };

  if (!name || !user || !user.id || !user.name) {
    return reply.status(400).send({ error: "Invalid request body" });
  }

  try {
    // Insert the new club into the `clubs` table
    const [clubResults] = await db.promise().query(
      "INSERT INTO clubs (name) VALUES (?)",
      [name]
    );

    // Retrieve the inserted club's ID
    const clubId = (clubResults as mysql.ResultSetHeader).insertId;

    // Add the user as the creator of the club in the `club_members` table
    await db.promise().query(
      "INSERT INTO club_members (club_id, user_id, user_name, creator) VALUES (?, ?, ?, ?)",
      [clubId, user.id, user.name, 1] // `creator` is set to 1
    );

    reply.code(201).send({
      message: `Club added with ID: ${clubId}`,
      club: {
        id: clubId,
        name,
        creator: {
          user_id: user.id,
          user_name: user.name,
        },
      },
    });
  } catch (error) {
    app.log.error(error); 
    reply.status(500).send({ error: "Failed to add club" });
  }
});


// GET endpoint to fetch clubs
app.get("/clubs", async (request, reply) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM clubs");
    reply.send(results);
  } catch (error) {
    app.log.error(error);
    reply.status(500).send({ error: "Database query failed" });
  }
});

// GET endpoint to fetch members of a club
app.get("/clubs/:id/members", async (request, reply) => {
  const { id } = request.params as { id: string };

  try {
    // Query to fetch members of the specified club
    const [rows] = await db
      .promise()
      .query<mysql.RowDataPacket[]>(
        "SELECT user_id, user_name, creator FROM club_members WHERE club_id = ?",
        [id]
      );

    // Check if members exist
    if (rows.length === 0) {
      return reply.status(404).send({ error: "No members found for this club" });
    }

    // Respond with the list of members
    reply.status(200).send({
      club_id: id,
      members: rows,
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    reply.status(500).send({ error: "Failed to fetch members" });
  }
});



// POST endpoint to add a member to a club
app.post("/clubs/:id/members", async (request, reply) => {
  const { id } = request.params as { id: string }; // Club ID
  const { id: userId, name } = request.body as { id: number; name: string }; // User details

  try {
    // Check if the club exists
    const [clubRows] = await db
      .promise()
      .query<mysql.RowDataPacket[]>("SELECT * FROM clubs WHERE id = ?", [id]);

    if (clubRows.length === 0) {
      return reply.status(404).send({ error: "Club not found" });
    }

    // Check if the user is already a member
    const [userRows] = await db
      .promise()
      .query<mysql.RowDataPacket[]>(
        "SELECT * FROM club_members WHERE club_id = ? AND user_id = ?",
        [id, userId]
      );

    if (userRows.length > 0) {
      return reply.status(400).send({ error: "User already exists in the club" });
    }

    // Add the user to the club (creator = 0 for regular members)
    await db.promise().query(
      "INSERT INTO club_members (club_id, user_id, user_name, creator) VALUES (?, ?, ?, 0)",
      [id, userId, name]
    );

    reply.status(201).send({
      message: "User added to the club",
      user: { user_id: userId, user_name: name, creator: 0 },
    });
  } catch (error) {
    console.error("Error adding member:", error);
    reply.status(500).send({ error: "Failed to add member" });
  }
});



// DELETE endpoint to remove a member from a club
app.delete("/clubs/:id/members/:memberId", async (request, reply) => {
  const { id, memberId } = request.params as { id: string; memberId: string };

  try {
    const [clubRows] = await db
      .promise()
      .query<mysql.RowDataPacket[]>("SELECT * FROM clubs WHERE id = ?", [id]);

    if (clubRows.length === 0) {
      return reply.status(404).send({ error: "Club not found" });
    }

    const [memberRows] = await db
      .promise()
      .query<mysql.RowDataPacket[]>(
        "SELECT * FROM club_members WHERE club_id = ? AND user_id = ?",
        [id, memberId]
      );

    if (memberRows.length === 0) {
      return reply.status(404).send({ error: "User not found in the club" });
    }

    // Remove the user from the club
    await db
      .promise()
      .query("DELETE FROM club_members WHERE club_id = ? AND user_id = ?", [id, memberId]);

    reply.send({
      message: "User removed from the club",
      userId: memberId,
    });
  } catch (error) {
    console.error("Error removing member:", error);
    reply.status(500).send({ error: "Failed to remove member" });
  }
});


// GET endpoint to fetch a club by name
// eg http://127.0.0.1:3000/clubs/by-name?name=club1
app.get("/clubs/by-name", async (request, reply) => {
  const { name } = request.query as { name: string };

  if (!name) {
    return reply.status(400).send({ error: "Name is required" });
  }

  try {
    const [rows] = await db
      .promise()
      .query<mysql.RowDataPacket[]>("SELECT * FROM clubs WHERE name = ?", [name]);

    if (rows.length === 0) {
      return reply.status(404).send({ error: "Club not found" });
    }

    reply.send(rows[0]); // Return the first matching club
  } catch (error) {
    console.error("Error fetching club by name:", error);
    reply.status(500).send({ error: "Failed to fetch club by name" });
  }
});

// GET endpoint to fetch a club by ID
app.get("/clubs/:id", async (request, reply) => {
  const { id } = request.params as { id: string };

  try {
    const [rows] = await db
      .promise()
      .query<mysql.RowDataPacket[]>("SELECT * FROM clubs WHERE id = ?", [id]);

    if (rows.length === 0) {
      return reply.status(404).send({ error: "Club not found" });
    }

    reply.send(rows[0]); 
  } catch (error) {
    console.error("Error fetching club by ID:", error);
    reply.status(500).send({ error: "Failed to fetch club by ID" });
  }
});


// GET endpoint to fetch the creator of a club
app.get("/clubs/:id/creator", async (request, reply) => {
  const { id } = request.params as { id: string };

  try {
    const [rows] = await db
      .promise()
      .query<mysql.RowDataPacket[]>(
        "SELECT user_id, user_name FROM club_members WHERE club_id = ? AND creator = 1",
        [id]
      );

    // Check if a creator exists
    if (rows.length === 0) {
      return reply.status(404).send({ error: "Creator not found for this club" });
    }

    reply.send({
      club_id: id,
      creator: rows[0], // Assuming only one creator exists per club
    });
  } catch (error) {
    console.error("Error fetching creator:", error);
    reply.status(500).send({ error: "Failed to fetch club creator" });
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
