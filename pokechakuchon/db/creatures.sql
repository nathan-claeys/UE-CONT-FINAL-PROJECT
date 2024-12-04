CREATE DATABASE IF NOT EXISTS creatures_db;

USE creatures_db;

-- Table gadgets
CREATE TABLE gadgets (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing integer ID
  name VARCHAR(255) NOT NULL, 
  target ENUM('MY_ATTACK', 'OPPONENT_ATTACK', 'TYPE_IMPACT', 'CREDIT') NOT NULL,
  points INT NOT NULL
);

-- Table pokemon
CREATE TABLE pokemon (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing integer ID
  name VARCHAR(255) NOT NULL,
  type ENUM('normal', 'fire', 'water', 'grass') NOT NULL,
  power INT NOT NULL
);

-- Example data for gadgets
INSERT INTO gadgets (name, target, points) VALUES
('Power Booster', 'MY_ATTACK', 50),
('Shield Enhancer', 'OPPONENT_ATTACK', -30),
('Type Changer', 'TYPE_IMPACT', 20),
('Credit Multiplier', 'CREDIT', 10);

-- Example data for pokemon
INSERT INTO pokemon (name, type, power) VALUES
('Pikachu', 'fire', 55),
('Charizard', 'fire', 84),
('Bulbasaur', 'grass', 49),
('Squirtle', 'water', 48);
