import { FastifyRequest, FastifyReply } from 'fastify';
import connection from '../utils/db'; // Import the DB connection
import { Pokemon } from '../interfaces/index';

// Get all Pokemon
export const getAllPokemon = async (req: FastifyRequest, reply: FastifyReply) => {
  connection.query('SELECT * FROM pokemon', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      reply.status(500).send({ error: 'Error fetching data from the database' });
    } else {
      console.log('Query results:', results); // Debugging
      reply.status(200).send(results);
    }
  });
  return reply;
};

// Get a Pokemon by name
export const getPokemonByName = async (req: FastifyRequest, reply: FastifyReply) => {
    const { name } = req.params as { name: string };
  
    if (!name) {
      return reply.status(400).send({ error: 'Pokemon name is required' });
    }
  
    connection.query(
      'SELECT * FROM pokemon WHERE name = ?',
      [name],
      (err, results) => {
        if (err) {
          console.error('Error fetching Pokemon by name:', err);
          return reply.status(500).send({ error: 'Error fetching Pokemon' });
        }
  
        if (Array.isArray(results) && results.length > 0) {
          return reply.status(200).send(results[0]); // Return the first matching Pokemon
        } else {
          return reply.status(404).send({ error: `Pokemon with name "${name}" not found` });
        }
      }
    );
  };
  
// Add a new Pokemon
export const addPokemon = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name, type, power }: Partial<Pokemon> = req.body as Pokemon;

  if (!name || !type || !power) {
    return reply.status(400).send({ error: 'All fields (name, type, power) are required' });
  }

  connection.query('SELECT * FROM pokemon WHERE name = ?', [name], (err, results) => {
    if (err) {
      console.error('Error during existence check:', err);
      reply.status(500).send({ error: 'Error checking Pokemon existence' });
    } else if (Array.isArray(results) && results.length > 0) {
      reply.status(400).send({ error: `Pokemon ${name} already exists` });
    } else {
      connection.query(
        'INSERT INTO pokemon (name, type, power) VALUES (?, ?, ?)',
        [name, type, power],
        (insertErr) => {
          if (insertErr) {
            console.error('Insertion error:', insertErr);
            reply.status(500).send({ error: 'Error adding Pokemon' });
          } else {
            reply.status(201).send({ message: `Pokemon ${name} successfully added` });
          }
        }
      );
    }
  });
  return reply;
};

// Update an existing Pokemon
export const updatePokemon = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as { id: string };
    const { name, type, power }: Partial<Pokemon> = req.body as Pokemon;
  
    if (!name || !type || !power) {
      return reply.status(400).send({ error: 'All fields (name, type, power) are required' });
    }
  
    connection.query(
      'UPDATE pokemon SET name = ?, type = ?, power = ? WHERE id = ?',
      [name, type, power, id],
      (err) => {
        if (err) {
          console.error('Update error:', err);
          return reply.status(500).send({ message: `Pokemon with id ${id} does not exist in the table` });
        }
  
        reply.status(200).send({ message: `Pokemon with id ${id} successfully updated` });
      }
    );
  };
  
  // Delete a Pokemon
  export const deletePokemon = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as { id: string };
  
    connection.query('DELETE FROM pokemon WHERE id = ?', [id], (err) => {
      if (err) {
        console.error('Deletion error:', err);
        return reply.status(500).send({ message: `Pokemon with id ${id} does not exist in the table` });
      }
      reply.status(200).send({ message: `Pokemon with id ${id} successfully deleted` });
    });
};