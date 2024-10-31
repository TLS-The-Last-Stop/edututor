import { privateApi, publicApi } from '../axios.js';

/**
 * 회원가입 아이디 중복체크
 * @param loginId
 * @returns Response.status (400 === 이미 존재하는 아이디, 204 === 가입 가능한 아이디)
 */
export const checkDuplicateId = async (loginId) => {
  const response = await publicApi.get(`/users/${loginId}`);
  return response.data;
};

export const teacherJoin = async (data) => {
  const response = await publicApi.post(`/users/teachers`, data);
  return response.data;
};

export const createStudent = async (data) => {
  const response = await privateApi.post(`/users/students`, data);
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