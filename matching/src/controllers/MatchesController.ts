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

export const getRoundsForMatch = async (
    req: FastifyRequest<{ Params: { matchId: string } }>,
    res: FastifyReply
) => {
    const { matchId } = req.params;

    const query = `
    SELECT * FROM rounds
    WHERE match_id = $1
    ORDER BY round_number;
  `;

    try {
        const { rows } = await pool.query(query, [matchId]);

        if (rows.length === 0) {
            return res.status(404).send({ error: "No rounds found for this match" });
        }

        const rounds: Round[] = rows.map((row) => ({
            id: row.id,
            matchId: row.match_id,
            roundNumber: row.round_number,
            player1Choice: row.player1_choice,
            player2Choice: row.player2_choice,
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
    req: FastifyRequest<{ Params: { matchId: string }; Body: { roundNumber: number; player1Choice: string; player2Choice: string } }>,
    res: FastifyReply
) => {
    const { matchId } = req.params;
    const { roundNumber, player1Choice, player2Choice } = req.body;

    const matchQuery = 'SELECT * FROM matches WHERE id = $1';
    const { rows: matchRows } = await pool.query(matchQuery, [matchId]);

    if (matchRows.length === 0) {
        return res.status(404).send({ error: "Match not found" });
    }

    if (matchRows[0].status === MatchStatus.CANCELED || matchRows[0].status === MatchStatus.FINISHED) {
        return res.status(400).send({ error: "Cannot add round to a canceled or finished match" });
    }

    const query = `
    INSERT INTO rounds (match_id, round_number, player1_choice, player2_choice)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

    try {
        const { rows } = await pool.query(query, [matchId, roundNumber, player1Choice, player2Choice]);

        const newRound: Round = {
            id: rows[0].id,
            matchId: rows[0].match_id,
            roundNumber: rows[0].round_number,
            player1Choice: rows[0].player1_choice,
            player2Choice: rows[0].player2_choice,
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

    const query = `
        SELECT * FROM rounds
        WHERE match_id = $1 AND id = $2;
    `;

    try {
        const { rows } = await pool.query(query, [matchId, roundId]);

        if (rows.length === 0) {
            return res.status(404).send({ error: "Round not found for this match" });
        }

        const round: Round = {
            id: rows[0].id,
            matchId: rows[0].match_id,
            roundNumber: rows[0].round_number,
            player1Choice: rows[0].player1_choice,
            player2Choice: rows[0].player2_choice,
            winnerId: rows[0].winner_id,
            result: rows[0].result,
        };

        res.send(round);
    } catch (error) {
        handleDatabaseError(error);
        res.status(500).send({ error: "Internal server error", details: error });
    }
};
