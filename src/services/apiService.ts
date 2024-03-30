import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

export interface cupom {
  nome: string;
  cpf: string;
  valor: string;
  formaPagamento: string;
}


export const getCupons = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pegarCupons`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const postDadosCupom = async (data: any) => {
  try {
    console.log(data);
    const response = await axios.post(`${API_BASE_URL}/dadosCupom`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const postNewCupom = async (dadosCupom: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/criarCupom`, dadosCupom);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const patchValidarCupom = async (id: string) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}/validarCupom`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const deleteCupom = async (id: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${id}/sua-rota`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || error.message);
  }
};
