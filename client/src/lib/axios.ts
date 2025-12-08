import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  withCredentials: true, // optional
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: auto logout on 401
    if (error.response?.status === 401) {
      console.warn("Unauthorized");
    }
    return Promise.reject(error);
  }
);

export default api;
