// src/apiClient.js
import axios from "axios";
import { BASE_URL } from "./commonFunction";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "https://www.rebu.kro.kr", // 백엔드 API 주소
  headers: {
    "Content-Type": "application/json",
    access: `${localStorage.getItem("access")}`,
  },
  withCredentials: true, // 쿠키 전송 설정
});

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => {
    // 커스텀 성공 코드가 '1'로 시작하는지 확인
    if (response.data.code && response.data.code.startsWith("1")) {
      // 성공적인 응답은 그대로 반환
      return response;
    }

    // 만약 응답 코드가 '0A15'라면 액세스 토큰이 만료된 것으로 처리
    if (response.data.code === "0A15") {
      const originalRequest = response.config;
      // 액세스 토큰 재발급 시도 (한 번만 시도하도록 _retry 플래그 사용)
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          return axios
            .post(`${BASE_URL}/api/auths/refresh`, { withCredentials: true })
            .then((res) => {
              console.log(res);
              // const newAccessToken = res.headers["access"];
              // localStorage.setItem("access", newAccessToken);

              // 새로운 토큰으로 헤더 업데이트
              // originalRequest.headers["access"] = `${newAccessToken}`;

              // 원래 요청을 다시 시도
              return apiClient(originalRequest);
            });
        } catch (error) {
          console.error("Token refresh failed:", error);
          // 로그아웃 처리 또는 사용자에게 재로그인 요청
          // window.location.href = '/login';
          return Promise.reject(error);
        }
      }
    }

    // 다른 에러 처리
    return Promise.reject(response);
  },
  (error) => {
    // HTTP 오류인 경우 (서버 응답 없음 등)
    return Promise.reject(error);
  }
);

export default apiClient;
