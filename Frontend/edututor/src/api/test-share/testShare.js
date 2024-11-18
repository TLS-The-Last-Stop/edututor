import privateApi from '../axios.js';

export const createShareTest = async (data) => {
  const response = await privateApi.post(`/tests/papers/${data.unitId}`, data);
  return response.data;
};

export const cancelShareTest = async (data) => {
  const response = await privateApi.delete(`/tests/papers/${data.unitId}`, { data });
  return response.data;
};