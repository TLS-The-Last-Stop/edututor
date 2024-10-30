import { publicApi } from '../axios.js';

export const getReport = async () => {
  const response = await publicApi.get('/report');
  return {
    success: true,
    data: response.data.data
  };
};

export const getReportDetail = async (testPapaerId) => {
  const response = await publicApi.get(`/report/${testPapaerId}`);
  return {
    success: true,
    data: response.data.data
  };
};