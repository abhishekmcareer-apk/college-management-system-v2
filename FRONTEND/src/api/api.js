import axios from "axios";

const api = axios.create({
    // baseURL: "https://college-management-backend-yjrw.onrender.com/api",
    // baseURL:"http://localhost:5000/api",
    baseURL: "https://college-api-v2.onrender.com/api" ,
    withCredentials: true
});

export default api;