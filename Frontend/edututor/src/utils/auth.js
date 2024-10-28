import privateApi from '../api/axios.js';

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

export const verifyAuth = async () => {
  const response = await privateApi.get('/auth/verify');
  return response.data;
};