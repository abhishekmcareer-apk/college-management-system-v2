import { io } from "socket.io-client"

const SOCKET_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:5000"
        : "https://college-management-system-v2-fux6.onrender.com"


const socket = io(SOCKET_URL, {
    withCredentials: true,
    autoConnect: true
})

export default socket