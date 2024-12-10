import { FastifyInstance } from 'fastify';
import * as creaturesController from '../controllers/creaturesController';
import * as gadgetsController from '../controllers/gadgetsController';

async function creaturesRoutes(fastify: FastifyInstance) {

  fastify.get('/creatures', creaturesController.getAllPokemon);
  fastify.get('/creatures/id/:id', creaturesController.getPokemonById);
  fastify.get('/creatures/name/:name', creaturesController.getPokemonByName);
  fastify.post('/creatures', creaturesController.addPokemon);
  fastify.put('/creatures/:id', creaturesController.updatePokemon);
  fastify.delete('/creatures/:id', creaturesController.deletePokemon);

  fastify.get('/gadgets', gadgetsController.getAllGadget);
  fastify.get('/gadgets/id/:id', gadgetsController.getGadgetById);
  fastify.get('/gadgets/name/:name', gadgetsController.getGadgetByName);
  fastify.post('/gadgets', gadgetsController.addGadget);
  fastify.put('/gadgets/:id', gadgetsController.updateGadget);
  fastify.delete('/gadgets/:id', gadgetsController.deleteGadget);
}

export default creaturesRoutes;
