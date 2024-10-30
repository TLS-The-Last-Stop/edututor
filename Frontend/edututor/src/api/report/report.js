import { publicApi } from '../axios.js';

export const getReportByTestPaperId = async () => {

  const response = await publicApi.get('/report');
  return {
    success: true,
    data: response.data.data
  };
};