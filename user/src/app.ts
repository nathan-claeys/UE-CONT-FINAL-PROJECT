import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { UserService } from "./services/UserService";
import fastifyJwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { config } from "./config";
import cors from '@fastify/cors'

interface AuthenticatedRequest extends FastifyRequest {
  user: {
    userId: string;
  };
}

interface RegisterUserBody {
  username: string;
  email: string;
  password: string;
}

interface LoginUserBody {
  email: string;
  password: string;
}

export async function buildApp(): Promise<FastifyInstance> {
  const app = fastify({
    logger: {
      level: process.env.LOG_LEVEL || "info",
      serializers: {
        req(request) {
          return {
            method: request.method,
            url: request.url,
            hostname: request.hostname,
            remoteAddress: request.ip,
            remotePort: request.socket.remotePort,
          };
        },
      },
    },
  });

  // Database setup
  const dataSource = new DataSource({
    type: "postgres",
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    entities: [User],
    synchronize: process.env.NODE_ENV !== "production",
    logging: process.env.NODE_ENV !== "production",
  });

  // Database connection with retry logic
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 5000;

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      await dataSource.initialize();
      app.log.info("Database connection established successfully.");
      break;
    } catch (error) {
      if (i === MAX_RETRIES - 1) {
        app.log.error(
          "Maximum retries reached. Unable to connect to the database:",
          error
        );
        throw error;
      }
      app.log.warn(
        `Failed to connect to database. Retrying in ${
          RETRY_DELAY / 1000
        }s... (Attempt ${i + 1}/${MAX_RETRIES})`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }

  // CORS
  await app.register(cors, {})

  // JWT Plugin
  await app.register(fastifyJwt, {
    secret: config.jwt.secret,
    sign: {
      expiresIn: config.jwt.expiresIn,
    },
  });

  // Swagger Documentation
  await app.register(swagger, {
    swagger: {
      info: {
        title: "User Service API",
        version: "1.0.0",
        description: "Documentation for the User Service API",
      },
      host: `localhost:${config.server.port}`,
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
    },
    staticCSP: true,
  });

  // Authentication decorator
  app.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.status(401).send({
          error: "Unauthorized",
          message: "Invalid or expired token",
          statusCode: 401,
        });
      }
    }
  );

  // Initialize services
  const userRepository = dataSource.getRepository(User);
  const userService = new UserService(userRepository);

  // Routes
  app.post<{ Body: RegisterUserBody }>(
    "/users/register",
    {
      schema: {
        body: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: { type: "string", minLength: 3, maxLength: 50 },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6, maxLength: 100 },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "string" },
              username: { type: "string" },
              email: { type: "string" },
              credits: { type: "number" },
              level: { type: "number" },
              experience: { type: "number" },
              createdAt: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const user = await userService.createUser(request.body);
      reply.code(201).send(user);
    }
  );

  app.post<{ Body: LoginUserBody }>(
    "/users/login",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              token: { type: "string" },
              user: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  username: { type: "string" },
                  email: { type: "string" },
                  credits: { type: "number" },
                  level: { type: "number" },
                  experience: { type: "number" },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const authResponse = await userService.login(request.body);
      reply.send(authResponse);
    }
  );

  app.get(
    "/users/me",
    {
      onRequest: [(app as any).authenticate],
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "string" },
              username: { type: "string" },
              email: { type: "string" },
              credits: { type: "number" },
              level: { type: "number" },
              experience: { type: "number" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
        },
      },
    },
    async (request: AuthenticatedRequest, reply: FastifyReply) => {
      const user = await userService.getUserById(request.user.userId);
      reply.send(user);
    }
  );

  // Error handler
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);

    let statusCode = error.statusCode || 500;
    let errorResponse = {
      error: error.name || "InternalServerError",
      message: error.message || "An unexpected error occurred",
      statusCode,
    };

    if (error.code === "FST_ERR_VALIDATION") {
      statusCode = 400;
      errorResponse.error = "ValidationError";
    } else if (error.code === "FST_JWT_NO_AUTHORIZATION_IN_HEADER") {
      statusCode = 401;
      errorResponse.error = "AuthenticationError";
    }

    reply.status(statusCode).send(errorResponse);
  });

  return app;
}
