import { FastifyReply, FastifyRequest } from "fastify";
const mysql = require('mysql2/promise');
import { MessageSent, ShowMessages } from "../interfaces";

const connectionConfig = {
  host: "localhost",
  port: 3307,
  user: "user",
  password: "user_password",
  database: "my_database",
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
    reply.send({ answer: results });
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
    VALUES (${body.receiver},${body.sender}, '${body.message}')`;

      const [results] = await connection.query(insertMessageQuery);
      // Retourner le résultat
      reply.send({ answer: results });
    }
  } catch (err) {
    console.error("Database query error:", err);
    reply.status(500).send({ error: "Failed to retrieve database tables" });
  }
};

export const showMessages = async (
  request: FastifyRequest<{ Params: ShowMessages }>,
  reply: FastifyReply
) => {
  try {
    const { receiver, sender } = request.params;

    const connection = await mysql.createConnection(connectionConfig);
    const showMessagesQuery = `SELECT * FROM messages WHERE receiver_id=${receiver} AND sender_id=${sender}`;

    const [results] = await connection.query(showMessagesQuery);
    // Retourner le résultat
    reply.send({ answer: results });
  } catch (err) {
    console.error("Database query error:", err);
    reply.status(500).send({ error: "Failed to retrieve database tables" });
  }
};

export const delMessages = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    let body: MessageSent = request.body as MessageSent;
    const connection = await mysql.createConnection(connectionConfig);
    const showMessagesQuery = `DELETE FROM messages WHERE receiver_id=${body.receiver} AND sender_id=${body.sender} AND content='${body.message}'`;

    const [results] = await connection.query(showMessagesQuery);
    // Retourner le résultat
    reply.send({ answer: results });
  } catch (err) {
    console.error("Database query error:", err);
    reply.status(500).send({ error: "Failed to retrieve database tables" });
  }
};