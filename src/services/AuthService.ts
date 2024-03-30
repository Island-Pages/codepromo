import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;
const TOKEN_KEY = 'token';

export const login = async (email: string, senha: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, senha });

    const { status } = response;

  if (status !== 200) {
      throw new Error('Credenciais inválidas');
    }

    const { token } = response.data.usuario;

    localStorage.setItem(TOKEN_KEY, token);

    return true;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};
