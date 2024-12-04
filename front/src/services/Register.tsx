import axios from 'axios';

const serverUrl = "" as string;

interface RegisterResponse {
  message: string;
}

//Mock register function
async function register(name: string, email: string, password: string): Promise<RegisterResponse> {
  if (email !== '' && password !== '' && name !== '') {
    return {message: 'User registered successfully'};
    }
    else {
        throw new Error('Empty fields');
        }
}

// Fonction de création de compte
async function register1(name: string, email: string, password: string): Promise<RegisterResponse> {
  try {
    const response = await axios.post(`${serverUrl}/api/auth/register`, {
      name,
      email,
      password,
    });

    if (response.status === 201) {
      return { message: 'User registered successfully' };
    } else {
      throw new Error('Failed to register user');
    }
  } catch (error: any) {
    console.error('Registration error:', error);

    if (axios.isAxiosError(error) && error.response) {
      // Propagation d'une erreur plus descriptive si possible
      throw new Error(error.response.data?.message || 'Registration failed due to server error.');
    } else {
      throw new Error('Unable to connect to the server.');
    }
  }
}

export default register;
