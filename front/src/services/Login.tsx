import axios from 'axios';

const serverUrl = "";

interface LoginResponse {
  token: string;
}

//Mock login function
async function login(email: string, password: string): Promise<boolean> {
  if (email === 'a@b.fr' && password === '123') {
    localStorage.setItem('token',"123");
    return true;
    }
    else {
        throw new Error('Invalid credentials');
        }
}

// Fonction de connexion
async function login1(email: string, password: string): Promise<boolean> {
  try {
    const response = await axios.post<LoginResponse>(`${serverUrl}/api/auth/login`, {
      email,
      password,
    });

    if (response.status === 200 && response.data.token) {
      localStorage.setItem('token', response.data.token);
      return true;
    } else {
      throw new Error('Erreur inconnue lors de la connexion.');
    }
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      // Vérifie les erreurs spécifiques renvoyées par le serveur
      if (error.response.status === 401) {
        const serverError = error.response.data.error;
        if (serverError === 'Username not registered') {
          throw new Error("L'adresse email n'est pas enregistrée.");
        } else if (serverError === 'Wrong password') {
          throw new Error('Mot de passe incorrect.');
        }
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
