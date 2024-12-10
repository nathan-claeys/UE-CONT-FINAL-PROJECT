import axios from 'axios';

const serverUrl = "http://localhost:3000" as string;

interface RegisterResponse {
  message: string;
}


// Fonction de création de compte
async function register(name: string, email: string, password: string): Promise<RegisterResponse> {
  try {
    const response = await axios.post(`${serverUrl}/users/register`, {
      username: name,
      email,
      password,
    });

    if (response.status === 201) {
      return { message: 'User registered successfully' };
    } else {
      throw new Error('Failed to register user');
    }
  } catch (error: unknown) {
    console.error('Registration error:', error);

    if (axios.isAxiosError(error) && error.response) {
      // Propagation d'une erreur plus descriptive si possible
      throw new Error(error.response.data?.message || 'Registration failed due to server error.');
    } else {
      throw new Error('Unable to connect to the server. ' + error);
    }
  }
}

export default register;
