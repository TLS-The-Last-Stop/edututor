import { privateApi, publicApi } from '../axios.js';

/**
 * 회원가입 아이디 중복체크
 * @param loginId
 * @returns Response.status (400 === 이미 존재하는 아이디, 204 === 가입 가능한 아이디)
 */
export const checkDuplicateId = async (loginId) => {
  const response = await publicApi.get(`/users/ids/${loginId}`);
  return response.data;
};

export const teacherJoin = async (data) => {
  const response = await publicApi.post(`/users/teachers`, data);
  return response.data;
};

export const additionalInfo = async (data) => {
  const response = await publicApi.put(`users/teachers`, data);
  return response.data;
};

export const createStudent = async (data) => {
  const response = await privateApi.post(`/users/students`, data);
  return response.data;
};

export const updateStudent = async (id, data) => {
  const response = await privateApi.patch(`/users/students/${id}`, data);
  return response.data;
};

export const removeStudent = async (id) => {
  const response = await privateApi.delete(`users/students/${id}`);
  return response.data;
};

export const login = async (data) => {
  const response = await publicApi.post('login', data);
  return response.data;
};

export const logout = async () => {
  const response = await privateApi.post('/logout');
  return response.data;
};

export const getUser = async (id) => {
  const response = await privateApi.get(`/users/${id}`);
  return response.data;
};

export const getAllUser = async () => {
  const response = await privateApi.get('/users');
  return response.data;
};

export const removeTeacher = async (id) => {
  const response = await privateApi.delete(`/users/teachers/${id}`);
  return response.data;
};

export const updateTeacher = async (data) => {
  const response = await publicApi.patch('/users/teachers', data);
  return response.data;
};

export const findId = async (email) => {
  const response = await publicApi.post('/mail/loginid', email);
  return response.data;
};

export const findPassword = async (data) => {
  const response = await publicApi.post('/mail/password', data);
  return response.data;
};

export const getStatistics = async () => {
  const response = await privateApi.get('/statistics/users');
  return response.data;
};

export const getUserInfo = (required = false) => {
  try {
    const info = JSON.parse(localStorage.getItem('info'));

    if (required && !info) throw new Error('로그인이 필요합니다.');

    return info;
  } catch (error) {
    if (required) throw error;
  }
  return null;
};