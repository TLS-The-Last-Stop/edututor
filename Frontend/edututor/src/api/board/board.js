import { publicApi } from '../axios.js';

export const getBoardsByCategory = async (categoryId, includeChildren = false) => {
  const response = await publicApi.get(`/cmmn/${categoryId}`, {
    params: { includeChildren }
  });
  return response.data;
};