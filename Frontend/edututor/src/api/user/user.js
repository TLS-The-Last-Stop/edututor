import axios from 'axios';
import { privateApi, publicApi } from '../axios.js';

const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * 회원가입 아이디 중복체크
 * @param loginId
 * @returns Response.status (400 === 이미 존재하는 아이디, 204 === 가입 가능한 아이디)
 */
export const checkDuplicateId = async (loginId) => {
  const response = await axios.get(`${BASE_URL}/users/${loginId}`);
  return response.data;
};

export const teacherJoin = async (data) => {
  const response = await axios.post(`${BASE_URL}/users/teachers`, data);
  return response.data;
};

export const createStudent = async (data) => {
  const response = await axios.post(`${BASE_URL}/users/students`, data, {
    withCredentials: true
  });
  return response.data;
};

export const login = async (data) => {
  const response = await publicApi.post('login', data);
  return response.data;
};
