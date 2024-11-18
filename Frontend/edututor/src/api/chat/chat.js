import { publicApi } from '../axios.js';

export const getChat = async (classroomId) => {
  const response = await publicApi.get(`/chat/${classroomId}`);
  return response.data;
};