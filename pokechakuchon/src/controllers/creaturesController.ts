import { FastifyRequest, FastifyReply } from 'fastify';
import connection from '../utils/db'; // Import the DB connection
import { Pokemon } from '../interfaces/index';

// Get all Pokemon
export const getAllPokemon = async (req: FastifyRequest, reply: FastifyReply) => {
  connection.query('SELECT * FROM pokemon', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      reply.status(500).send({ error: 'Error fetching data from the database' });
      return reply;
    } else {
      console.log('Query results:', results); // Debugging
      reply.status(200).send(results);
      return reply;
    }
  });
  return reply;
};

// Get pokemon by id
export const getPokemonById = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as { id: number };

    if (!id) {
        return reply.status(400).send({ error: 'Pokemon id is required' });
    }

    
    const [results] = await connection.promise().query(
        'SELECT * FROM pokemon WHERE id = ?',
        [id]
    );

    if (Array.isArray(results) && results.length > 0) {
        return reply.status(200).send(results[0]);
    } else {
        return reply.status(404).send({ error: `Pokemon with id "${id}" not found` });
    }
};

// Get pokemon by name
export const getPokemonByName = async (req: FastifyRequest, reply: FastifyReply) => {
    const { name } = req.params as { name: string };

    if (!name) {
        return reply.status(400).send({ error: 'Pokemon name is required' });
    }

    
    const [results] = await connection.promise().query(
        'SELECT * FROM pokemon WHERE name = ?',
        [name]
    );

    if (Array.isArray(results) && results.length > 0) {
        return reply.status(200).send(results[0]);
    } else {
        return reply.status(404).send({ error: `Pokemon with name "${name}" not found` });
    }
};

// add a new pokemon
export const addPokemon = async (req: FastifyRequest, reply: FastifyReply) => {
    const { name, type, power }: Partial<Pokemon> = req.body as Pokemon;

    if (!name || !type || !power) {
        return reply.status(400).send({ error: 'All fields (name, type, power) are required' });
    }

const [results] = await connection.promise().query('SELECT * FROM pokemon WHERE name = ?', [name]);

if (Array.isArray(results) && results.length > 0) {
    return reply.status(400).send({ error: `Pokemon ${name} already exists` });
}

await connection.promise().query(
    'INSERT INTO pokemon (name, type, power) VALUES (?, ?, ?)',
    [name, type, power]
);
return reply.status(201).send({ message: `Pokemon ${name} successfully added` });
};
  

// update an existing pokemon
export const updatePokemon = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as { id: number };
    const { name, type, power }: Partial<Pokemon> = req.body as Pokemon;

    if (!name || !type || !power) {
        return reply.status(400).send({ error: 'All fields (name, type, power) are required' });
    }
    
    const [result]: any = await connection.promise().query(
        'UPDATE pokemon SET name = ?, type = ?, power = ? WHERE id = ?',
        [name, type, power, id]
    );

    if (result.affectedRows === 0) {
        return reply.status(404).send({ message: `Pokemon with id ${id} not found` });
    }

    return reply.status(200).send({ message: `Pokemon with id ${id} successfully updated` });
    
};

// delete a pokemon
export const deletePokemon = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as { id: number };

    const [result]: any = await connection.promise().query(
        'DELETE FROM pokemon WHERE id = ?',
        [id]
    );

    if (result.affectedRows === 0) {
        return reply.status(404).send({ message: `Pokemon with id ${id} not found` });
    }

    return reply.status(200).send({ message: `Pokemon with id ${id} successfully deleted` });

};
