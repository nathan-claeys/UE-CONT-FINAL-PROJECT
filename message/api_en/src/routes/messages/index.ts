// routes/lists/index.ts
import { FastifyInstance } from "fastify";
import * as messageControllers from "../../controllers/index";
import Fastify from "fastify";
import cors from "@fastify/cors";
import * as schemas from "../../schemas";

const fastify = Fastify();
const cors_funct = async () => {
  await fastify.register(cors, {});
};

async function message(fastify: FastifyInstance) {
  await cors_funct();
  fastify.get(
    "/",
    // { schema: schemas.showDatabaseSchema },
    messageControllers.showDatabase
  );
  fastify.get(
    "/show_message_user/:receiver/sender/:sender",
    // { schema: schemas.showMessagesSchema },
    messageControllers.showMessages
  );

  fastify.post(
    "/send_message",
    //  { schema: schemas.sendMessageSchema },
    messageControllers.writeMessage
  );

  fastify.delete(
    "/delete_message/:id_message",
    //  { schema: schemas.deleteMessageSchema },
    messageControllers.delMessages
  );
  fastify.delete("/delete_table", messageControllers.delTable);
}
cors_funct;
export default message;
