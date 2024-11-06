import axios from 'axios';

// API_URL 환경 변수 또는 기본 URL 설정
const apiUrl = process.env.API_URL || 'http://localhost:8080';

// 공용 API 인스턴스
export const publicApi = axios.create({
  baseURL: apiUrl + '/api',  // baseURL에 apiUrl 추가
  withCredentials: true,       // 로그인 응답의 쿠키를 저장하기 위해 필요
});

// 인증이 필요한 요청을 위한 인스턴스
export const privateApi = axios.create({
  baseURL: apiUrl + '/api',  // baseURL에 apiUrl 추가
  withCredentials: true,
});

// 응답 인터셉터
privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await publicApi.post('/auth/refresh');

          return privateApi(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('userInfo');
          window.dispatchEvent(new Event('auth-update'));
          location.href = '/';

          console.error('Token refresh failed from server:', refreshError);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
);

export default privateApi;
