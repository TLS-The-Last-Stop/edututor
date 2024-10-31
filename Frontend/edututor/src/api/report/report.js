import { publicApi } from '../axios.js';

export const getReport = async (page) => {
  const response = await publicApi.get(`/report?page=${page}`);
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