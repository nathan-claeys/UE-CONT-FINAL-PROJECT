import { FastifyInstance } from 'fastify';

const app: FastifyInstance = require('fastify')();

app.get('/', async (request, reply) => {
  return { Pokechakuchon : 'Welcome to the creatures database' };
});

// Passer l'objet avec la clé 'port'
app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
