import { FastifyPluginAsync } from 'fastify';
import * as storeController from '../controllers/storeController';
import { PurchaseSchema, SellSchema } from '../schemas/storeSchemas';
import { Type } from '@sinclair/typebox';  

const storeRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/store/inventory', {
    schema: {
      summary: 'Obtenir l\'inventaire',
      description: 'Récupère tous les articles disponibles dans le magasin.',
      tags: ['Store'],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              cost: { type: 'number' },
            },
          },
        },
      },
    },
    handler: storeController.getInventoryHandler,
  });

  fastify.get('/store/inventory/:id', {
    schema: {
      summary: 'Obtenir les détails d\'un article',
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            cost: { type: 'number' },
            type: { type: 'string' },
          },
        },
      },
    },
    handler: storeController.getItemDetailsHandler,
  });

  fastify.post('/store/purchase', {
    schema: {
      summary: 'Acheter un article',
      body: PurchaseSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            transaction: { type: 'object' },
          },
        },
      },
    },
    handler: storeController.purchaseItemHandler,
  });

  fastify.post('/store/sell', {
    schema: {
      summary: 'Vendre un article',
      //body: SellSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            transaction: { type: 'object' },
          },
        },
      },
    },
    handler: storeController.sellItemHandler,
  });
  fastify.get('/store/transactions', {
    schema: {
      summary: 'Obtenir les transactions d\'un utilisateur',
      querystring: Type.Object({
        userId: Type.String(),  // L'ID de l'utilisateur doit être un champ à l'intérieur d'un objet
      }),
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              date: { type: 'string' },
              user: { type: 'string' },
              item: { type: 'object' },
              price: { type: 'number' },
            },
          },
        },
      },
    },
    handler: storeController.getUserTransactionsHandler,
  });
  
};

export default storeRoutes;
