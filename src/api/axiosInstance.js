import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  "https://gurukul-lms-backend.onrender.com"; // ✅ fallback for production

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true // ✅ REQUIRED for CORS cookies / auth
});

// Attach token (if using JWT)
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken") || "null");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;