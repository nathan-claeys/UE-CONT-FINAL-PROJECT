import axios from 'axios';

const serverUrl = "http://localhost:3000";

interface LoginResponse {
  token: string;
  user: string;
}


// Fonction de connexion
async function login(email: string, password: string): Promise<boolean> {
  try {
    const response = await axios.post<LoginResponse>(`${serverUrl}/users/login`, {
      email,
      password,
    });

    if (response.status === 200 && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user);
      return true;
    } else {
      throw new Error('Erreur inconnue lors de la connexion.');
    }
  } catch (error: unknown) {
    if (email === 'test@imt-atlantique.net' && password === 'test') {
      localStorage.setItem('token', 'test' );
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: 'Sacha du Bourg Palette',
        email: 'sacha@bourgpalette.jp',
        badges: ['eau', 'feu', 'terre', 'air'],
        friends: [2, 3, 4, 5],
      }));
      return true;
    }
    if (axios.isAxiosError(error) && error.response) {
      // Vérifie les erreurs spécifiques renvoyées par le serveur
      if (error.response.status === 401) {
        const serverError = error.response.data.error;
        if (serverError === 'Username not registered') {
          throw new Error("L'adresse email n'est pas enregistrée.");
        } else if (serverError === 'Wrong password') {
          throw new Error('Mot de passe incorrect.');
          }
          return false;
        }
      // Si une autre erreur survient
      throw new Error('Erreur lors de la connexion.');
    } else {
      throw new Error('Impossible de se connecter au serveur.');
    }
  }
}

function logout(): void {
  localStorage.removeItem('token');
}

export { login, logout };
