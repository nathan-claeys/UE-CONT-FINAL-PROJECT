import { FastifyRequest, FastifyReply } from 'fastify';
import pool from '../db';
import { handleDatabaseError } from '../utils';
import { RowDataPacket, OkPacket } from 'mysql2';
import { Round } from "../interfaces";
import { MatchStatus } from "../enums";

export const getMatches = async (req: FastifyRequest, res: FastifyReply) => {
    const { status, userId } = req.query as { status?: string; userId?: string };

    try {
        const [rows] = await pool.query<RowDataPacket[]>('CALL GetMatches(?, ?)', [status, userId]);
        res.send(rows);
    } catch (error) {
        handleDatabaseError(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

export const createMatch = async (req: FastifyRequest, res: FastifyReply) => {
    const { creatorId, opponentId } = req.body as { creatorId: string; opponentId: string; matchType: string };

    try {
        const [result] = await pool.query<RowDataPacket[]>('CALL CreateMatch(?, ?)', [creatorId, opponentId]);
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

export const getRoundsForMatch = async (
    req: FastifyRequest<{ Params: { matchId: string } }>,
    res: FastifyReply
) => {
    const { matchId } = req.params;

    try {
        const [rows] = await pool.query<RowDataPacket[]>('CALL GetRoundsForMatch(?)', [matchId]);

        if (rows.length === 0) {
            return res.status(404).send({ error: "No rounds found for this match" });
        }

        const rounds: Round[] = rows.map((row: any) => ({
            id: row.id,
            matchId: row.match_id,
            roundNumber: row.round_number,
            player1Pokéchakuchon: row.player1_pokéchakuchon_id,
            player2Pokéchakuchon: row.player2_pokéchakuchon_id,
            player1Gadget: row.player1_gadget_id,
            player2Gadget: row.player2_gadget_id,
            winnerId: row.winner_id,
            result: row.result,
        }));

        res.send(rounds);
    } catch (error) {
        handleDatabaseError(error);
        res.status(500).send({ error: "Internal server error", details: error });
    }
};

export const addRoundToMatch = async (
    req: FastifyRequest<{ Params: { matchId: string }; Body: { roundNumber: number; player1Pokéchakuchon: number; player2Pokéchakuchon: number; player1Gadget?: number; player2Gadget?: number } }>,
    res: FastifyReply
) => {
    const { matchId } = req.params;
    const { roundNumber, player1Pokéchakuchon, player2Pokéchakuchon, player1Gadget, player2Gadget } = req.body;

    try {
        const [matchRows] = await pool.query<RowDataPacket[]>('SELECT * FROM matches WHERE id = ?', [matchId]);

        if (matchRows.length === 0) {
            return res.status(404).send({ error: "Match not found" });
        }

        if (matchRows[0].status === MatchStatus.CANCELED || matchRows[0].status === MatchStatus.FINISHED) {
            return res.status(400).send({ error: "Cannot add round to a canceled or finished match" });
        }

        const [rows] = await pool.query<RowDataPacket[]>('CALL AddRoundToMatch(?, ?, ?, ?, ?, ?)', [matchId, roundNumber, player1Pokéchakuchon, player2Pokéchakuchon, player1Gadget, player2Gadget]);

        const newRound: Round = {
            id: rows[0].id,
            matchId: rows[0].match_id,
            roundNumber: rows[0].round_number,
            player1Pokéchakuchon: rows[0].player1_pokéchakuchon_id,
            player2Pokéchakuchon: rows[0].player2_pokéchakuchon_id,
            player1Gadget: rows[0].player1_gadget_id,
            player2Gadget: rows[0].player2_gadget_id,
            winnerId: rows[0].winner_id,
            result: rows[0].result,
        };

        res.status(201).send(newRound);
    } catch (error) {
        res.status(500).send({ error: "Internal server error", details: error });
    }
};

export const getRoundById = async (
    req: FastifyRequest<{ Params: { matchId: string; roundId: string } }>,
    res: FastifyReply
) => {
    const { matchId, roundId } = req.params;

    try {
        const [rows] = await pool.query<RowDataPacket[]>('CALL GetRoundById(?, ?)', [matchId, roundId]);

        if (rows.length === 0) {
            return res.status(404).send({ error: "Round not found for this match" });
        }

        const round: Round = {
            id: rows[0].id,
            matchId: rows[0].match_id,
            roundNumber: rows[0].round_number,
            player1Pokéchakuchon: rows[0].player1_pokéchakuchon_id,
            player2Pokéchakuchon: rows[0].player2_pokéchakuchon_id,
            player1Gadget: rows[0].player1_gadget_id,
            player2Gadget: rows[0].player2_gadget_id,
            winnerId: rows[0].winner_id,
            result: rows[0].result,
        };

        res.send(round);
    } catch (error) {
        handleDatabaseError(error);
        res.status(500).send({ error: "Internal server error", details: error });
    }
};