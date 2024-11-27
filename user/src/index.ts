import "dotenv/config";
import { buildApp } from "./app";
import { config } from "./config";

async function start() {
  try {
    const app = await buildApp();

    await app.listen({
      port: config.server.port,
      host: "0.0.0.0",
    });

    app.log.info(`Server started on port ${config.server.port}`);
    app.log.info(
      `Documentation available at http://localhost:${config.server.port}/docs`
    );
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

start();
