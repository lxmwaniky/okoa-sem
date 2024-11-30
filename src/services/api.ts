import axios from 'axios';
import { Paper } from '../types/paper';

const API_URL = 'https://past-paper-api.onrender.com/api/v1';

export const getPapers = async () => {
  const response = await axios.get(`${API_URL}/papers`);
  return response.data;
};

export const searchPapers = async (unitCode: string) => {
  const response = await axios.get(`${API_URL}/papers/${unitCode}`);
  return response.data;
};

export const addPaper = async (paper: Omit<Paper, '_id' | '__v'>) => {
  const response = await axios.post(`${API_URL}/papers`, paper);
  return response.data;
};

export const updatePaper = async (unitCode: string, yearTaken: string, paper: Partial<Paper>) => {
  const response = await axios.put(`${API_URL}/papers/${unitCode}/${yearTaken}`, paper);
  return response.data;
};

export const deletePaper = async (unitCode: string, yearTaken: string) => {
  try {
    const response = await axios.delete(`${API_URL}/papers/${unitCode}/${yearTaken}`);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete paper');
    }
    throw error;
  }
};