import { FastifyReply, FastifyRequest } from "fastify";
import mysql from "mysql2/promise";
import { MessageSent, ShowMessages, DelMessage } from "../interfaces";

const connectionConfig = {
  host: "localhost",
  port: 3307,
  user: "user",
  password: "user_password",
  database: "my_database",
};

export const delTable = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    // Requête SQL pour afficher les tables
    const [results] = await connection.query(`DROP TABLE messages;`);

    // Retourner le résultat
    reply.send({ messages: results });
  } catch (err) {
    console.error("Database query error:", err);
    reply.status(500).send({ error: "Failed to retrieve database tables" });
  }
};
export const showDatabase = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    // Requête SQL pour afficher les tables
    const [results] = await connection.query(`SELECT * FROM messages`);

    // Retourner le résultat
    reply.send({ messages: results });
  } catch (err) {
    console.error("Database query error:", err);
    reply.status(500).send({ error: "Failed to retrieve database tables" });
  }
};

export const writeMessage = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  let body: MessageSent = request.body as MessageSent;
  const connection = await mysql.createConnection(connectionConfig);
  try {
    console.log("body.message : ");
    if (body.message.length) {
      const insertMessageQuery = `INSERT INTO messages (receiver_id, sender_id, content)
    VALUES ('${body.receiver}','${body.sender}', '${body.message}')`;

      await connection.query(insertMessageQuery);
      // Retourner le résultat
      reply.send({ result: "The message was added to the database" });
    }
  } catch (err) {
    console.error("Database query error:", err);
    reply.status(402).send({ error: "Failed to retrieve database tables" });
  }
};

export const showMessages = async (
  request: FastifyRequest<{ Params: ShowMessages }>,
  reply: FastifyReply
) => {
  try {
    const { receiver, sender } = request.params;

    const connection = await mysql.createConnection(connectionConfig);
    const showMessagesQuery = `SELECT * FROM messages WHERE (receiver_id='${receiver}' AND sender_id='${sender}') OR (receiver_id='${sender}' AND sender_id='${receiver}')`;

    const [results] = await connection.query(showMessagesQuery);
    // Retourner le résultat
    reply.send({ answer: results });
  } catch (err) {
    console.error("Database query error:", err);
    reply.status(500).send({ error: "Failed to retrieve database tables" });
  }
};

export const delMessages = async (
  request: FastifyRequest<{ Params: DelMessage }>,
  reply: FastifyReply
) => {
  try {
    let { id_message } = request.params;
    const connection = await mysql.createConnection(connectionConfig);
    const showMessagesQuery = `DELETE FROM messages WHERE id=${id_message}`;

    await connection.query(showMessagesQuery);
    // Retourner le résultat
    reply.send({ result: "The message was deleted" });
  } catch (err) {
    console.error("Database query error:", err);
    reply.status(402).send({ error: "Failed to retrieve database tables" });
  }
};
