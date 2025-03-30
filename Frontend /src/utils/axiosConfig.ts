import axios from "axios";

// ✅ Get token from localStorage
const getToken = () => localStorage.getItem("access_token");

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: false, // ❌ No need for credentials since cookies aren't used
});

// ✅ Interceptor to attach token from localStorage
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;
