// routes/lists/index.ts

import { FastifyInstance } from "fastify";
import * as messageControllers from "../../controllers/index";

async function message(fastify: FastifyInstance) {
  fastify.get("/", messageControllers.showDatabase);

  // TODO implement addList in controller
  //   fastify.post("/send_message", messageControllers.writeMessage);
}

export default message;
