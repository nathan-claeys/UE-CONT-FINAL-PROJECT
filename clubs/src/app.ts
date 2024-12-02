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
  // Type assertion: Assert the type of request.body
  const { name, users } = request.body as { name: string; users: any }; // Here we're asserting the type of request.body

  try {
    // Use the promise-based API for inserting the club
    const [results] = await db.promise().query(
      "INSERT INTO club (name, users) VALUES (?, ?)",
      [name, JSON.stringify(users)] // Convert users to JSON string
    );

    // The result is an array where the first element is a ResultSetHeader
    const insertId = (results as mysql.ResultSetHeader).insertId;

    // Respond with the inserted club's ID and details
    reply.code(201).send({
      message: `Club added with ID: ${insertId}`,
      club: { id: insertId, name, users },
    });
  } catch (error) {
    app.log.error(error); // Log the error for debugging
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
