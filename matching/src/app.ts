import { join } from "path";
// import Swagger from "@fastify/swagger";
// import SwaggerUI from "@fastify/swagger-ui";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync, FastifyServerOptions } from "fastify";
import { registerRoutes } from "./routes/matches"; // Adjust the path as necessary

export interface AppOptions
    extends FastifyServerOptions,
        Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
    // Place here your custom code!
    registerRoutes(fastify);

    // // Register Swagger plugin
    // void fastify.register(Swagger, {
    //     routePrefix: "/documentation",
    //     swagger: {
    //         info: {
    //             title: "Fastify API",
    //             description: "API documentation",
    //             version: "1.0.0"
    //         },
    //         host: "localhost:3000",
    //         schemes: ["http"],
    //         consumes: ["application/json"],
    //         produces: ["application/json"]
    //     },
    //     exposeRoute: true
    // });
    //
    // // Register Swagger UI plugin
    // void fastify.register(SwaggerUI, {
    //     routePrefix: "/api-docs"
    // });

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    void fastify.register(AutoLoad, {
        dir: join(__dirname, "plugins"),
        options: opts,
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    void fastify.register(AutoLoad, {
        dir: join(__dirname, "routes"),
        options: opts,
    });
};

export default app;
export { app, options };

// Start the server
import fastify from "fastify";

const server = fastify();

server.register(app);

server.listen({ port: 3001 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});