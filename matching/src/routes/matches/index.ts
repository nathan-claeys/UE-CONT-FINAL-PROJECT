import { FastifyInstance } from 'fastify';
import {
    getMatches,
    createMatch, getMatch, updateMatchStatus, deleteMatch,
} from '../../controllers/MatchesController';

export const registerRoutes = (fastify: FastifyInstance) => {
    fastify.get('/matches', getMatches);
    fastify.post('/matches', createMatch);
    fastify.get('/matches/:matchId', getMatch);
    fastify.put('/matches/:matchId/status', updateMatchStatus);
    fastify.delete('/matches/:matchId', deleteMatch);
    fastify.get('/matches/:matchId/rounds', getRoundsForMatch);
    fastify.post('/matches/:matchId/rounds', addRoundToMatch);
    fastify.get('/matches/:matchId/rounds/:roundId', getRoundById);
    // fastify.get('/matches/:matchId/rounds', getRoundsByMatchId);
    // fastify.post('/matches/:matchId/rounds', addRound);
};
