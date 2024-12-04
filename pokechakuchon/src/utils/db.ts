import mysql from 'mysql2';

// Fonction pour tenter de se connecter à la base de données avec une tentative de retry
const connectWithRetry = () => {
  // Créer une connexion à la base de données
  const connection = mysql.createConnection({
    host: 'database',              // Nom du service Docker
    user: 'pokemon_user',
    password: 'pokemon_password',
    database: 'creatures',
    port: 3306                      // Ajoutez ici le port interne du conteneur
  });
  

  // Se connecter à la base de données
  connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données:', err.stack);
      console.log('Nouvelle tentative dans 5 secondes...');
      setTimeout(connectWithRetry, 5000); // Retenter la connexion après 5 secondes
    } else {
      console.log('Connecté à la base de données.');
    }
  });

  return connection;
};

// Appeler la fonction pour établir la connexion
export const connection = connectWithRetry();

export default connection;
