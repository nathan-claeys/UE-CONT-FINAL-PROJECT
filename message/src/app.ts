import mysql from 'mysql2';
import { createTableQuery } from './db/init.js';
const connection = mysql.createConnection({
    host: 'localhost',
    port : 3307,
    user: 'user',
    password: 'user_password',
    database: 'my_database'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

connection.query(createTableQuery, (err, results) => {
    if (err) throw err;
    console.log('Query result:', results);
});
const checkTableQuery = `SHOW TABLES FROM my_database LIKE 'messages'`;
connection.query(checkTableQuery, (err, results) => {
    if (err) throw err;
    console.log('Query result:', results);
});
connection.end();
