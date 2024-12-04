import { FastifyPluginAsync } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import AutoLoad from '@fastify/autoload';
import { join } from 'path';

const app: FastifyPluginAsync = async (fastify, opts) => {
  // Configuration Swagger
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Clash Of Pokéchakucha Store API',
        description: 'Documentation OpenAPI pour le microservice Store',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Serveur local',
        },
      ],
    },
  });

  await fastify.register(fastifySwaggerUI, {
    routePrefix: '/docs', // Documentation accessible via /docs
    staticCSP: true,
  });

  // Autoload des plugins et des routes
  await fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  await fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });
};

export default app;
