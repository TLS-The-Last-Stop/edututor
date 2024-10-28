import axios from 'axios';

axios.defaults.withCredentials = true;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllStudent = async (classroomId) => {
  const response = await axios.get(`${BASE_URL}/classrooms/${classroomId}/students`);
  return response.data;
};