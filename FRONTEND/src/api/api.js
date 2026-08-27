import axios from "axios";

const api = axios.create({
    // baseURL: "https://college-management-backend-yjrw.onrender.com/api",
    baseURL:"http://localhost:5000/api",
    withCredentials: true
});

export default api;