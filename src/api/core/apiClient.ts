import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
// ✅ 최신 상태 가져오기 (함수 사용)
const getAccessToken = () => useAuthStore.getState().accessToken;

// 요청 인터셉터: 모든 API 요청에 Access Token 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (Response Interceptor)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { logout, refreshToken, login } = useAuthStore.getState();

    if (error.response && error.response.status === 401) {
      if (!refreshToken) {
        logout();
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
        return Promise.reject(error);
      }
      try {
        // Refresh Token을 이용한 새로운 Access Token 요청
        const refreshResponse = await apiClient.post(
          "/api/account/reissueToken",
          null,
          {
            params: { refreshToken },
            headers: { "Content-Type": "application/json" },
          }
        );

        if (refreshResponse.data.code === "OK") {
          const newAccessToken = refreshResponse.data.data.accessToken;
          const newRefreshToken = refreshResponse.data.data.refreshToken;

          // Zustand에 새로운 토큰 저장
          login(
            newAccessToken,
            newRefreshToken,
            useAuthStore.getState().isAdmin
          );

          // 실패한 요청을 새로운 Access Token으로 다시 실행
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiClient(error.config);
        }
      } catch (refreshError) {
        logout(); // Refresh Token 재발급 실패 시 로그아웃
        if (typeof window !== "undefined") {
          window.location.href = "/"; // ✅ 재발급 실패 시 이동
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
