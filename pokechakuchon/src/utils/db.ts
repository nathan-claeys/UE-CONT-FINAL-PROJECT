import mysql from 'mysql2';

// Créer une connexion à la base de données
export const connection = mysql.createConnection({
  host: 'localhost',       // Votre hôte, généralement 'localhost' pour une installation locale
  user: 'root',            // Nom d'utilisateur MySQL
  password: '',            // Laissez vide si vous n'avez pas défini de mot de passe
  database: 'creatures' // Le nom de votre base de données
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
