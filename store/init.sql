CREATE TABLE IF NOT EXISTS pokemon (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  cost INT,
  type VARCHAR(50),
  power INT
);

CREATE TABLE IF NOT EXISTS gadget (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  cost INT,
  target VARCHAR(50),
  points INT
);

CREATE TABLE IF NOT EXISTS transactions (
  id VARCHAR(255) PRIMARY KEY,
  date DATETIME,
  user VARCHAR(255),
  item_id INT,
  item_type VARCHAR(50),
  price INT
);
