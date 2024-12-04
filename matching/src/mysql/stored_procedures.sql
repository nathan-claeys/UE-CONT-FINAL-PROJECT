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
    INSERT INTO matches (creator_id, opponent_id, status)
    VALUES (p_creatorId, p_opponentId, 'created');
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

-- Reset delimiter back to default ;
DELIMITER ;



