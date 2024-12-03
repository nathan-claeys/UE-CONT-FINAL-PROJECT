import { FastifyInstance } from 'fastify';
import {
    getMatches,
    createMatch,
} from '../controllers/MatchesController';

export const registerRoutes = (fastify: FastifyInstance) => {
    fastify.get('/matches', getMatches);
    fastify.post('/matches', createMatch);
//     fastify.get('/matches/:matchId', getMatchById);
//     fastify.patch('/matches/:matchId', updateMatchStatus);
//     fastify.delete('/matches/:matchId', deleteMatch);
//     fastify.get('/matches/:matchId/rounds', getRoundsByMatchId);
//     fastify.post('/matches/:matchId/rounds', addRound);
//
};