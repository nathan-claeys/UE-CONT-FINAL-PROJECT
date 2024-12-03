import { FastifyInstance } from 'fastify';
import * as creaturesController from '../controllers/creaturesController';

async function creaturesRoutes(fastify: FastifyInstance) {

  fastify.get('/creatures', creaturesController.getAllPokemon);
  fastify.get('/creatures/:name', creaturesController.getPokemonByName);
  fastify.post('/creatures', creaturesController.addPokemon);
  fastify.put('/creatures/:id', creaturesController.updatePokemon);
  fastify.delete('/creatures/:id', creaturesController.deletePokemon);
}

export default creaturesRoutes;
