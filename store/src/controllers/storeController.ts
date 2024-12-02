import { FastifyReply, FastifyRequest } from 'fastify';
//import { Pokemon, Gadget, GadgetTarget, Transaction } from '../interfaces/storeInterfaces';
import { getInventory, getItemDetails, processPurchase, processSale, getUserTransactions } from '../utils/db';

export const getInventoryHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const inventory = await getInventory();
    reply.send(inventory);
  } catch (error: unknown) {
    if (error instanceof Error) {
      reply.internalServerError(error.message);
    } else {
      reply.internalServerError('An unknown error occurred.');
    }
  }
};

export const getItemDetailsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  try {
    const item = await getItemDetails(id);
    if (!item) {
      reply.notFound(`Item with ID ${id} not found.`);
      return;
    }
    reply.send(item);
  } catch (error: unknown) {
    if (error instanceof Error) {
      reply.internalServerError(error.message);
    } else {
      reply.internalServerError('An unknown error occurred.');
    }
  }
};

export const purchaseItemHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId, itemId, type } = request.body as { userId: string, itemId: string, type: string };
  try {
    const transaction = await processPurchase(userId, itemId, type);
    reply.send({
      status: 'success',
      transaction,
    });
  } catch (error) {
    reply.send({
      status: 'error',
      message: (error as Error).message,
    });
  }
};

export const sellItemHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId, itemId, type } = request.body as { userId: string, itemId: string, type: string };
  try {
    const transaction = await processSale(userId, itemId, type);
    reply.send({
      status: 'success',
      transaction,
    });
  } catch (error) {
    reply.send({
      status: 'error',
      message: (error as Error).message,
    });
  }
};

export const getUserTransactionsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.query as { userId: string };
  try {
    const transactions = await getUserTransactions(userId);
    reply.send(transactions);
  } catch (error) {
    reply.internalServerError((error as Error).message);
  }
};
