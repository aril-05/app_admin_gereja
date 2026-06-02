import axios from "axios";

// 1. Buat instance Axios dengan URL Backend Anda
const api = axios.create({
  baseURL: "http://localhost:8000",
});

// 2. Pasang "Kurir Pintar" (Request Interceptor)
// Kurir ini akan otomatis mengambil token dari localStorage
// dan menempelkannya di Header Authorization: Bearer <token>
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;