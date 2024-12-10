import { FastifyRequest, FastifyReply } from 'fastify';
import connection from '../utils/db'; // Import the DB connection
import { Gadget } from '../interfaces/index';

// Get all gadgets
export const getAllGadget = async (req: FastifyRequest, reply: FastifyReply) => {
  connection.query('SELECT * FROM gadget', (err, results) => {
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

// Get gadget by id
export const getGadgetById = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as { id: number };

    if (!id) {
        return reply.status(400).send({ error: 'Gadget id is required' });
    }

    
    const [results] = await connection.promise().query(
        'SELECT * FROM gadget WHERE id = ?',
        [id]
    );

    if (Array.isArray(results) && results.length > 0) {
        return reply.status(200).send(results[0]);
    } else {
        return reply.status(404).send({ error: `Gadget with id "${id}" not found` });
    }
};

// Get gadget by name
export const getGadgetByName = async (req: FastifyRequest, reply: FastifyReply) => {
    const { name } = req.params as { name: string };

    if (!name) {
        return reply.status(400).send({ error: 'Gadget name is required' });
    }

    
    const [results] = await connection.promise().query(
        'SELECT * FROM gadget WHERE name = ?',
        [name]
    );

    if (Array.isArray(results) && results.length > 0) {
        return reply.status(200).send(results[0]);
    } else {
        return reply.status(404).send({ error: `Gadget with name "${name}" not found` });
    }
};

// add a new gadget
export const addGadget = async (req: FastifyRequest, reply: FastifyReply) => {
    const { name, target, points }: Partial<Gadget> = req.body as Gadget;

    if (!name || !target || !points) {
        return reply.status(400).send({ error: 'All fields (name, target, points) are required' });
    }

const [results] = await connection.promise().query('SELECT * FROM gadget WHERE name = ?', [name]);

if (Array.isArray(results) && results.length > 0) {
    return reply.status(400).send({ error: `Gadget ${name} already exists` });
}

await connection.promise().query(
    'INSERT INTO gadget (name, target, points) VALUES (?, ?, ?)',
    [name, target, points]
);
return reply.status(201).send({ message: `Gadget ${name} successfully added` });
};
  

// update an existing gadget
export const updateGadget = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as { id: number };
    const { name, target, points }: Partial<Gadget> = req.body as Gadget;

    if (!name || !target || !points) {
        return reply.status(400).send({ error: 'All fields (name, target, points) are required' });
    }
    
    const [result]: any = await connection.promise().query(
        'UPDATE gadget SET name = ?, target = ?, points = ? WHERE id = ?',
        [name, target, points, id]
    );

    if (result.affectedRows === 0) {
        return reply.status(404).send({ message: `Gadget with id ${id} not found` });
    }

    return reply.status(200).send({ message: `Gadget with id ${id} successfully updated` });
    
};

// delete a gadget
export const deleteGadget = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as { id: number };

    const [result]: any = await connection.promise().query(
        'DELETE FROM gadget WHERE id = ?',
        [id]
    );

    if (result.affectedRows === 0) {
        return reply.status(404).send({ message: `Gadget with id ${id} not found` });
    }

    return reply.status(200).send({ message: `Gadget with id ${id} successfully deleted` });

};
