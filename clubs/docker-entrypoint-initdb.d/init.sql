CREATE DATABASE IF NOT EXISTS test;
USE test;

CREATE TABLE IF NOT EXISTS clubs (
  id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for the club
  name VARCHAR(255) NOT NULL          -- Name of the club
);

CREATE TABLE IF NOT EXISTS club_members (
  id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for the member entry
  club_id INT NOT NULL,               -- Foreign key referencing `clubs.id`
  user_id INT NOT NULL,               -- User ID of the member
  user_name VARCHAR(255) NOT NULL,    -- Name of the user
  creator TINYINT(1) DEFAULT 0,       -- Indicates if the user is the creator
  FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
);