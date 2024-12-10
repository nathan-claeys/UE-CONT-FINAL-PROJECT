export const config = {
  server: {
    port: parseInt(process.env.PORT || "3000"),
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: "24h",
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "pokechakucha",
    password: process.env.DB_PASSWORD || "pokechakucha123",
    database: process.env.DB_NAME || "pokechakucha_users",
  },
};
