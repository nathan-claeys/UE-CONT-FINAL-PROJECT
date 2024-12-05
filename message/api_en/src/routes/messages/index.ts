// routes/lists/index.ts
import { FastifyInstance } from "fastify";
import * as messageControllers from "../../controllers/index";
import Fastify from "fastify";
import cors from "@fastify/cors";
import * as schemas from "../../schemas";

const mysql = require("mysql2/promise");
// import * as schemas from "../../schemas";

const fastify = Fastify();
const connectionConfig = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.MYSQL_USER || "user",
  password: process.env.MYSQL_ROOT_PASSWORD || "user_password",
  database: process.env.MYSQL_DATABASE || "my_database",
};
const cors_funct = async () => {
  await fastify.register(cors, {});
};

const createTableMessage = async () => {
  const connection = await mysql.createConnection(connectionConfig);
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            receiver_id TEXT NOT NULL,
            sender_id TEXT NOT NULL,
            content TEXT NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
  await connection.query(createTableQuery);
};

async function message(fastify: FastifyInstance) {
  await cors_funct();
  await createTableMessage();
  fastify.get(
    "/",
    { schema: schemas.showDatabaseSchema },
    messageControllers.showDatabase
  );
  fastify.get(
    "/show_message_user/:receiver/sender/:sender",
    { schema: schemas.showMessagesSchema },
    messageControllers.showMessages
  );

  fastify.post(
    "/send_message",
    { schema: schemas.sendMessageSchema },
    messageControllers.writeMessage
  );

  fastify.delete(
    "/delete_message/:id_message",
    { schema: schemas.deleteMessageSchema },
    messageControllers.delMessages
  );
  fastify.delete("/delete_table", messageControllers.delTable);
}
cors_funct;
export default message;
