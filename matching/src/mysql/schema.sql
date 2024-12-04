CREATE DATABASE IF NOT EXISTS matching_db;

USE matching_db;

CREATE TABLE matches (
                         id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing integer ID
                         creator_id VARCHAR(255) NOT NULL,
                         opponent_id VARCHAR(255),
                         status ENUM('created', 'in-progress', 'finished', 'canceled') DEFAULT 'created',
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE rounds (
                        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing integer ID
                        match_id INT NOT NULL,
                        round_number INT NOT NULL,
                        player1_choice VARCHAR(255) NOT NULL, -- Replace with your Pokéchakuchon ID type
                        player2_choice VARCHAR(255) NOT NULL, -- Replace with your Pokéchakuchon ID type
                        winner_id VARCHAR(255),
                        result ENUM('player1_win', 'player2_win', 'draw'),
                        FOREIGN KEY (match_id) REFERENCES matches(id)
);

CREATE TABLE match_statistics (
                                  user_id CHAR(36) NOT NULL UNIQUE, -- UUID in string format
                                  total_matches INT DEFAULT 0,
                                  wins INT DEFAULT 0,
                                  losses INT DEFAULT 0,
                                  draws INT DEFAULT 0
);

CREATE TABLE match_history (
                               user_id CHAR(36) NOT NULL UNIQUE, -- UUID in string format
                               matches JSON -- Store matches data as a JSON array or structure
);