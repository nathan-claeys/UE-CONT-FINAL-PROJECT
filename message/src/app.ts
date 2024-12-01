import mysql from 'mysql2';

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

connection.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) throw err;
    console.log('Query result:', results);
});

connection.end();
