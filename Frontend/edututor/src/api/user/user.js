import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * 회원가입 아이디 중복체크
 * @param joinId
 * @returns Response.status (400 === 이미 존재하는 아이디, 204 === 가입 가능한 아이디)
 */
export const checkDuplicateId = async (joinId) => {
  const response = await axios.get(`${BASE_URL}/users/${joinId}`);
  return response.data;
};

export const join = async (data) => {
  const response = await axios.post(`${BASE_URL}/users`, data);
  return response.data;
};