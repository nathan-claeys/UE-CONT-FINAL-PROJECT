import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import pool from '../db';
import { handleDatabaseError } from '../utils';

export const getMatches = async (req: FastifyRequest, res: FastifyReply) => {
    const { status, userId } = req.query as { status?: string; userId?: string };

    let query = `SELECT * FROM matches`;
    const params: any[] = [];

    if (status || userId) {
        query += " WHERE";
        if (status) {
            params.push(status);
            query += ` status = $${params.length}`;
        }
        if (userId) {
            if (params.length > 0) query += " AND";
            params.push(userId);
            query += ` (creator_id = $${params.length} OR opponent_id = $${params.length})`;
        }
    }

    try {
        const { rows } = await pool.query(query, params);
        res.send(rows);
    } catch (error) {
        handleDatabaseError(error);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const createMatch = async (req: FastifyRequest, res: FastifyReply) => {
    const { creatorId, opponentId, matchType } = req.body as { creatorId: string; opponentId: string; matchType: string };

    const query = `
        INSERT INTO matches (creator_id, opponent_id, status)
        VALUES ($1, $2, 'created')
            RETURNING id;
    `;

    try {
        const { rows } = await pool.query(query, [creatorId, opponentId]);
        res.status(201).send({ matchId: rows[0].id });
    } catch (error) {
        handleDatabaseError(error);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const registerRoutes = (fastify: FastifyInstance) => {
    fastify.get('/matches', getMatches);
    fastify.post('/matches', createMatch);
    // Add other routes here
};