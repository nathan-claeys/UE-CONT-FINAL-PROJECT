import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserData, saveUserData } from '../data/db';

export const getTeam = async (
    request: FastifyRequest<{ Params: { userId: string } }>, 
    reply: FastifyReply) => {
      const { userId } = request.params;
      const userData = getUserData(userId);
      return reply.status(201).send(userData["team"])
  }