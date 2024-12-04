-- Use the database
USE matching_db;

DELIMITER $$

-- Create GetMatches stored procedure
CREATE PROCEDURE GetMatches(
    IN p_status VARCHAR(255),
    IN p_userId VARCHAR(255)
)
BEGIN
    SELECT * FROM matches
    WHERE (status = p_status OR p_status IS NULL)
      AND (creator_id = p_userId OR opponent_id = p_userId OR p_userId IS NULL);
END $$

-- Create CreateMatch stored procedure
CREATE PROCEDURE CreateMatch(
    IN p_creatorId VARCHAR(255),
    IN p_opponentId VARCHAR(255)
)
BEGIN
    INSERT INTO matches (creator_id, opponent_id, status, rounds)
    VALUES (p_creatorId, p_opponentId, 'created', '[]');
    SELECT LAST_INSERT_ID() AS matchId; -- Return the ID of the newly created match
END $$

CREATE PROCEDURE GetMatchDetails(
    IN p_matchId INT
)
BEGIN
    SELECT * FROM matches WHERE id = p_matchId;
END $$

CREATE PROCEDURE UpdateMatchStatus(
    IN p_matchId INT,
    IN p_status ENUM('created', 'in-progress', 'finished', 'canceled')
)
BEGIN
    UPDATE matches
    SET status = p_status, updated_at = CURRENT_TIMESTAMP
    WHERE id = p_matchId;
END $$

CREATE PROCEDURE DeleteMatch(
    IN p_matchId INT
)
BEGIN
    DELETE FROM matches WHERE id = p_matchId AND status = 'canceled';
END $$

CREATE PROCEDURE GetRoundsForMatch(
    IN p_matchId INT
)
BEGIN
    SELECT * FROM rounds
    WHERE match_id = p_matchId
    ORDER BY round_number;
END $$

CREATE PROCEDURE AddRoundToMatch(
    IN p_matchId INT,
    IN p_roundNumber INT,
    IN p_player1Pokechakuchon INT,
    IN p_player2Pokechakuchon INT,
    IN p_player1Gadget INT,
    IN p_player2Gadget INT
)
BEGIN
    INSERT INTO rounds (match_id, round_number, player1_pokechakuchon_id, player2_pokechakuchon_id, player1_gadget_id, player2_gadget_id)
    VALUES (p_matchId, p_roundNumber, p_player1Pokechakuchon, p_player2Pokechakuchon, p_player1Gadget, p_player2Gadget);
    SELECT * FROM rounds WHERE id = LAST_INSERT_ID();
END $$

CREATE PROCEDURE GetRoundById(
    IN p_matchId INT,
    IN p_roundId INT
)
BEGIN
    SELECT * FROM rounds
    WHERE match_id = p_matchId AND id = p_roundId;
END $$

-- Reset delimiter back to default ;
DELIMITER ;