import { FastifyRequest, FastifyReply } from 'fastify';
import pool from '../db';
import { handleDatabaseError } from '../utils';
import { RowDataPacket, OkPacket } from 'mysql2';

export const getMatches = async (req: FastifyRequest, res: FastifyReply) => {
    const { status, userId } = req.query as { status?: string; userId?: string };

    try {
        const [rows] = await pool.query('CALL GetMatches(?, ?)', [status, userId]);
        res.send(rows);
    } catch (error) {
        handleDatabaseError(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

export const createMatch = async (req: FastifyRequest, res: FastifyReply) => {
    const { creatorId, opponentId } = req.body as { creatorId: string; opponentId: string; matchType: string };

    try {
        const [result]: any = await pool.query('CALL CreateMatch(?, ?)', [creatorId, opponentId]);
        res.status(201).send({ matchId: result[0].matchId });
    } catch (error) {
        handleDatabaseError(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

export const getMatch = async (req: FastifyRequest, res: FastifyReply) => {
    const { matchId } = req.params as { matchId: number };

    const query = `CALL GetMatchDetails(?)`;

    try {
        const [rows] = await pool.query<RowDataPacket[]>(query, [matchId]);
        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.status(404).send({ error: "Match not found" });
        }
    } catch (error) {
        handleDatabaseError(error);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const updateMatchStatus = async (req: FastifyRequest, res: FastifyReply) => {
    const { matchId } = req.params as { matchId: number };
    const { status } = req.body as { status: string };

    const validStatuses = ["created", "in-progress", "finished", "canceled"];

    if (!validStatuses.includes(status)) {
        return res.status(400).send({ error: "Invalid status" });
    }

    const query = `CALL UpdateMatchStatus(?, ?)`;

    try {
        await pool.query(query, [matchId, status]);
        res.send({ message: `Match status updated to ${status}` });
    } catch (error) {
        handleDatabaseError(error);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const deleteMatch = async (req: FastifyRequest, res: FastifyReply) => {
    const { matchId } = req.params as { matchId: number };

    const query = `CALL DeleteMatch(?)`;

    try {
        const [result] = await pool.query<OkPacket>(query, [matchId]);
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Match not found or cannot be deleted" });
        }
        res.send({ message: "Match deleted successfully" });
    } catch (error) {
        handleDatabaseError(error);
        res.status(500).send({ error: "Internal server error" });
    }
};
