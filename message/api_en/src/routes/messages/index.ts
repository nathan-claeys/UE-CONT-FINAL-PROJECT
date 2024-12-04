// routes/lists/index.ts
import { FastifyInstance } from "fastify";
import * as messageControllers from "../../controllers/index";
import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify();
const cors_funct = async () => {
  await fastify.register(cors, {});
};

async function message(fastify: FastifyInstance) {
  await cors_funct();
  fastify.get("/", messageControllers.showDatabase);
  fastify.get(
    "/show_message_user/:receiver/sender/:sender",
    messageControllers.showMessages
  );
  // TODO implement addList in controller
  fastify.post("/send_message", messageControllers.writeMessage);

  fastify.delete("/delete_message/:id_message", messageControllers.delMessages);
  fastify.delete("/delete_table", messageControllers.delTable);
}
cors_funct;
export default message;
