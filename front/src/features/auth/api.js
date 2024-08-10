// api.js or axiosConfig.js
import axios from 'axios';
import { BASE_URL } from '../../views/Signup';


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json', // 기본 Content-Type
  },
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    // localStorage에서 access 토큰을 가져와서 헤더에 추가
    const access = localStorage.getItem('access');
    if (access) {
      config.headers['access'] = access;
    }
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

export default api;
