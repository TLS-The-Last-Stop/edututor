import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getBoardsByCategory = async (categoryId, includeChildren = false) => {
  const response = await axios.get(`${BASE_URL}/cmmn/${categoryId}`, {
    params: { includeChildren }
  });
  return response.data;
};