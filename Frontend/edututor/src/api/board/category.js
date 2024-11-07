import { publicApi } from '../axios.js';

export const getCategory = async () => {
  const response = await publicApi.get(`/categories`);
  return response.data;
};