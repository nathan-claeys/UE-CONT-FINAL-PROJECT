import dotenv from 'dotenv';

// Load environment variables from a `.env` file
dotenv.config();

export const dbConfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'messaging',
};
