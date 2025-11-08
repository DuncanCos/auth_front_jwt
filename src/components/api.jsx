// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // récupère l’URL depuis .env
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});



// Interceptor réponsed
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si erreur 401 et pas déjà en cours de refresh
    if (
      (error.response?.status === 401|| error.response?.status === 403) &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;
      try {
        await api.get("/auth/refresh", {}, { withCredentials: true });
        return api(originalRequest);
      } catch (err) {
        console.log("error refresh interceptor", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
