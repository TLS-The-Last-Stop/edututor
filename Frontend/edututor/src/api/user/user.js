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
  const response = await privateApi().post(`/users/students`, data, {
    withCredentials: true
  });
  return response.data;
};

export const login = async (data) => {
  const response = await publicApi.post('login', data);
  return response.data;
};
