import privateApi from '../axios.js';

export const createShareTest = async (shareData) => {
  const response = await privateApi.post(`/tests/papers/${shareData.unitId}`, shareData);
  return response.data;
};