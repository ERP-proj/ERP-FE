import axios, { AxiosInstance } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 토큰 가져오는 함수 (클라이언트 환경 확인)
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || "";
  }
  return ""; // 서버 환경에서는 빈 문자열 반환
};

// Axios 인스턴스 생성
export const defaultApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    accept: "application/json",
  },
});

// Axios 요청 인터셉터
defaultApi.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
