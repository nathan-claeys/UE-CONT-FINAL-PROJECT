const fastify = require("fastify")({ logger: true });
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "db",
  user: "root",
  password: "root",
  database: "test",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

fastify.get("/", async (request, reply) => {
  reply.send({ hello: "world" });
});


fastify.get("/clubs", (request, reply) => {
  db.query("SELECT * FROM club", (error, results) => {
    if (error) throw error;
    reply.send(results);
  });
});



const start = async () => {
  try {
    // Try using 'host' and 'port' directly in the listen method
    const address = await fastify.listen(3000, '0.0.0.0');
    fastify.log.info(`Server listening on ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();