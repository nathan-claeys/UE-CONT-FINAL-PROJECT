import Fastify from 'fastify';
import { registerRoutes } from './controllers/MatchesController';

const fastify = Fastify({ logger: true });

registerRoutes(fastify);

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`Server listening at ${address}`);
});