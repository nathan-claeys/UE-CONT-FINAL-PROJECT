import { FastifyReply, FastifyRequest } from 'fastify';
import { InventoryItem, Transaction } from '../interfaces/storeInterfaces';
import { getInventory, getItemDetails, processPurchase, processSale, getUserTransactions } from '../utils/db';

export const getInventoryHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { type } = request.query as { type: string };
  try {
    const inventory: InventoryItem[] = await getInventory(type);
    reply.send(inventory);
  } catch (error: unknown) {  // Specify 'unknown' type
    if (error instanceof Error) {  // Narrowing down the error type
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
    if (item) {
      reply.send(item);
    } else {
      reply.notFound(`Item with ID ${id} not found.`);
    }
  } catch (error: unknown) {  // Specify 'unknown' type
    if (error instanceof Error) {  // Narrowing down the error type
      reply.internalServerError(error.message);
    } else {
      reply.internalServerError('An unknown error occurred.');
    }
  }
};

export const purchaseItemHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId, itemId, type } = request.body as { userId: number, itemId: number, type: string };
  try {
    const transaction: Transaction = await processPurchase(userId, itemId, type);
    reply.send({
      status: 'success',
      transaction
    });
  } catch (error: unknown) {  // Specify 'unknown' type
    if (error instanceof Error) {  // Narrowing down the error type
      reply.send({
        status: 'error',
        message: error.message
      });
    } else {
      reply.send({
        status: 'error',
        message: 'An unknown error occurred.'
      });
    }
  }
};

export const sellItemHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId, itemId, type } = request.body as { userId: number, itemId: number, type: string };
  try {
    const transaction: Transaction = await processSale(userId, itemId, type);
    reply.send({
      status: 'success',
      transaction
    });
  } catch (error: unknown) {  // Specify 'unknown' type
    if (error instanceof Error) {  // Narrowing down the error type
      reply.send({
        status: 'error',
        message: error.message
      });
    } else {
      reply.send({
        status: 'error',
        message: 'An unknown error occurred.'
      });
    }
  }
};

export const getUserTransactionsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.query as { userId: number };
  try {
    const transactions: Transaction[] = await getUserTransactions(userId);
    reply.send(transactions);
  } catch (error: unknown) {  // Specify 'unknown' type
    if (error instanceof Error) {  // Narrowing down the error type
      reply.internalServerError(error.message);
    } else {
      reply.internalServerError('An unknown error occurred.');
    }
  }
};
