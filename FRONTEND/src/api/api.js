import axios from "axios";

const api = axios.create({
    baseURL: "https://college-management-system-v2-fux6.onrender.com/api",
    withCredentials: true
});

export default api;