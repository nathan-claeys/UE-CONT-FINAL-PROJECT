import { Pokemon, PokemonType, GadgetTarget, Gadget, Transaction } from '../interfaces/storeInterfaces';
import * as mysql from 'mysql2/promise';


export const pool = mysql.createPool({
  host: 'mysql_store_service',  // Correspond au nom du service MySQL dans Docker Compose
  user: 'root',
  password: 'rootpassword',
  database: 'store_service',
});


// Function to get inventory (Pokemon + Gadget)
export const getInventory = async (): Promise<(Pokemon | Gadget)[]> => {
  const connection = await pool.getConnection();
  try {
    // Fetch Pokemon data
    const [pokemonRows] = await connection.query(
      'SELECT id, name, cost, type, power FROM pokemon'
    );
    console.log(["pokemone",pokemonRows])
    const pokemonInventory: Pokemon[] = (pokemonRows as any[]).map((row) => ({
      id: row.id,
      name: row.name,
      cost: row.cost,
      type: row.type as PokemonType,
      power: row.power,
    }));

    // Fetch Gadget data
    const [gadgetRows] = await connection.query(
      'SELECT id, name, cost, target, points FROM gadget'
    );
    const gadgetInventory: Gadget[] = (gadgetRows as any[]).map((row) => ({
      id: row.id,
      name: row.name,
      cost: row.cost,
      target: row.target as GadgetTarget,
      points: row.points,
    }));

    // Combine both inventories
    return [...pokemonInventory, ...gadgetInventory];
  } finally {
    connection.release();
  }
};

// Function to get item details by ID
export const getItemDetails = async (id: string): Promise<Pokemon | Gadget | undefined> => {
  const connection = await pool.getConnection();
  try {
    // Try fetching from Pokemon table
    const [pokemonRows] = await connection.query(
      'SELECT id, name, cost, type, power FROM pokemon WHERE id = ?',
      [id]
    );
    if ((pokemonRows as any[]).length > 0) {
      const row = (pokemonRows as any[])[0];
      return {
        id: row.id,
        name: row.name,
        cost: row.cost,
        type: row.type as PokemonType,
        power: row.power,
      };
    }

    // Try fetching from Gadget table
    const [gadgetRows] = await connection.query(
      'SELECT id, name, cost, target, points FROM gadget WHERE id = ?',
      [id]
    );
    if ((gadgetRows as any[]).length > 0) {
      const row = (gadgetRows as any[])[0];
      return {
        id: row.id,
        name: row.name,
        cost: row.cost,
        target: row.target as GadgetTarget,
        points: row.points,
      };
    }

    // If not found in either table
    return undefined;
  } finally {
    connection.release();
  }
};

// Function to process a purchase
export const processPurchase = async (userId: string, itemId: string, type: string): Promise<Transaction> => {
  const connection = await pool.getConnection();
  try {
    const item = await getItemDetails(itemId);
    if (!item) throw new Error('Item not found');

    const transaction: Transaction = {
      id: `${Date.now()}`, // Unique ID based on timestamp
      date: new Date().toISOString(),
      user: userId,
      item,
      price: -item.cost,
    };

    // Save the transaction
    await connection.query(
      'INSERT INTO transactions (id, date, user, item_id, item_type, price) VALUES (?, ?, ?, ?, ?, ?)',
      [transaction.id, transaction.date, userId, itemId, type, transaction.price]
    );

    return transaction;
  } finally {
    connection.release();
  }
};

// Function to process a sale
export const processSale = async (userId: string, itemId: string, type: string): Promise<Transaction> => {
  const connection = await pool.getConnection();
  try {
    const item = await getItemDetails(itemId);
    if (!item) throw new Error('Item not found');

    const transaction: Transaction = {
      id: `${Date.now()}`, // Unique ID based on timestamp
      date: new Date().toISOString(),
      user: userId,
      item,
      price: item.cost,
    };

    // Save the transaction
    await connection.query(
      'INSERT INTO transactions (id, date, user, item_id, item_type, price) VALUES (?, ?, ?, ?, ?, ?)',
      [transaction.id, transaction.date, userId, itemId, type, transaction.price]
    );

    return transaction;
  } finally {
    connection.release();
  }
};

// Function to get transactions for a user
export const getUserTransactions = async (userId: string): Promise<Transaction[]> => {
  const connection = await pool.getConnection();
  try {
    const [transactionRows] = await connection.query(
      'SELECT t.id, t.date, t.user, t.price, p.name as pokemon_name, g.name as gadget_name, p.type, p.power as pokemon_power, g.target as gadget_target, g.points as gadget_points ' +
        'FROM transactions t ' +
        'LEFT JOIN pokemon p ON t.item_id = p.id AND t.item_type = "pokemon" ' +
        'LEFT JOIN gadget g ON t.item_id = g.id AND t.item_type = "gadget" ' +
        'WHERE t.user = ?',
      [userId]
    );

    return (transactionRows as any[]).map((row) => ({
      id: row.id,
      date: row.date,
      user: row.user,
      price: row.price,
      item: row.pokemon_name
        ? {
          id: row.id,
          name: row.name,
          cost: row.cost,
          type: row.type as PokemonType,
          power: row.power,
          }
        : {
          id: row.id,
          name: row.name,
          cost: row.cost,
          target: row.target as GadgetTarget,
          points: row.points,
          },
    }));
  } finally {
    connection.release();
  }
};