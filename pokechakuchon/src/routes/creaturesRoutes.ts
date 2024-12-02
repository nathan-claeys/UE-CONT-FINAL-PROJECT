import { FastifyInstance } from "fastify";
import * as creaturesController from '../controllers/creaturesController';

async function creatureRoutes(fastify: FastifyInstance) {
  fastify.get("/creatures", creaturesController.getCreatures);
  fastify.get("/creatures/:id", creaturesController.getCreature);
  fastify.post("/creatures", creaturesController.addCreature);
  fastify.delete("/creatures/:id", creaturesController.deleteCreature);
  fastify.register(creaturesController.registerGraphQL);
}

export default creatureRoutes;
