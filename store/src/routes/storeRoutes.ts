import { FastifyPluginAsync } from 'fastify';
import * as storeController from '../controllers/storeController';

const storeRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/store/inventory', storeController.getInventoryHandler);
  fastify.get('/store/inventory/:id', storeController.getItemDetailsHandler);
  fastify.post('/store/purchase', storeController.purchaseItemHandler);
  fastify.post('/store/sell', storeController.sellItemHandler);
  fastify.get('/store/transactions', storeController.getUserTransactionsHandler);
};

export default storeRoutes;
