import privateApi from '../axios.js';

export const getAllStudent = async (classroomId) => {
  const response = await privateApi.get(`/classrooms/${classroomId}/students`);
  return response.data;
};