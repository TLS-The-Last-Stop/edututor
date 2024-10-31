import privateApi from '../api/axios.js';

export const verifyAuth = async () => {
  const response = await privateApi.get('/auth/verify');
  return response.data;
};
