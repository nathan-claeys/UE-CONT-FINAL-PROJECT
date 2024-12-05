// routes/lists/index.ts

import { FastifyInstance } from "fastify";

async function message(fastify: FastifyInstance) {
  fastify.get("/", async function (request, reply) {
    return { root: true };
  });
}

export default message;
