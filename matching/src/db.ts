import { Pool } from 'pg';

const pool = new Pool({
    user: 'badr4y',
    host: 'localhost', // or your host
    database: 'matches',
    password: 'potato',
    port: 5432,
});

export default pool;
