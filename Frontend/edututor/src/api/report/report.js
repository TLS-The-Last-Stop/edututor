import { publicApi } from '../axios.js';

export const getReport = async (queryString) => {
  try {
    const response = await publicApi.get(`/report${queryString ? `?${queryString}` : ''}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('리포트 조회 실패:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const getReportDetail = async (testPapaerId) => {
  const response = await publicApi.get(`/report/${testPapaerId}`);
  return {
    success: true,
    data: response.data.data
  };
};

export const getClassroomCourses = async () => {
  const response = await publicApi.get('/course/class-courses');
  return {
    success: true,
    data: response.data.data
  };
};