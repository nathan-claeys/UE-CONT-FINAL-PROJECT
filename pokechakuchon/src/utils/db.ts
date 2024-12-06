import mysql from 'mysql2';

// Créer une connexion à la base de données
export const connection = mysql.createConnection({
  host: 'db',       
  user: 'root',            
  password: 'toto',            
  database: 'creatures' 
});

// Se connecter à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.stack);
    return;
  }
  console.log('Connecté à la base de données.');
});

export default connection;
