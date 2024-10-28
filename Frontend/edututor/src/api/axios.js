import axios from 'axios';

export const publicApi = axios.create({
  baseURL        : '/api',
  withCredentials: true  // 로그인 응답의 쿠키를 저장하기 위해 필요
});

// 인증이 필요한 요청을 위한 인스턴스
export const privateApi = axios.create({
  baseURL        : '/api',
  withCredentials: true
});

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 리프레시 토큰으로 새로운 토큰 요청 (publicApi 사용)
        await publicApi.post('/auth/refresh');
        alert('악 access 만료');
        // 새로운 액세스 토큰으로 원래 요청 재시도
        return privateApi(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed from server:', refreshError);
        //window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default privateApi;