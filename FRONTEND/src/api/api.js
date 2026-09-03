import axios from "axios";


const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:5000/api"
        : "https://college-management-system-v2-fux6.onrender.com/api";


const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export default api;