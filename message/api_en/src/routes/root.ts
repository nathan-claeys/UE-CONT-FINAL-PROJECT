// routes/lists/index.ts

import { FastifyInstance } from "fastify";
import * as messageControllers from "../controllers/index";

async function message(fastify: FastifyInstance) {
  fastify.get("/", messageControllers.showDatabase);
  fastify.get(
    "/show_message_user/:receiver/sender/:sender",
    messageControllers.showMessages
  );
  // TODO implement addList in controller
  fastify.post("/send_message", messageControllers.writeMessage);

  fastify.delete("/delete_message", messageControllers.delMessages);
}

export default message;