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