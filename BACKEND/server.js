import { configDotenv } from "dotenv";
import app from "./app.js"
import http from "http"
import { Server } from "socket.io";
import connectDB from "./config/db.js"

configDotenv()

const PORT = process.env.PORT || 5000

const startServer = async () => {
    await connectDB()

    const server = http.createServer(app)

    const io = new Server(server, {
        cors: {
            origin: [
                "https://college-management-frontend-v2.onrender.com",
                "http://localhost:5173"
            ],
            credentials: true
        }
    })


    io.on("connection", (socket) => {
        console.log("New user added", socket.id)

        socket.on("send_message", (data) => {
            io.emit("receive_message", data)
        })

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id)
        })
    })

    server.listen(PORT,()=>{
        console.log(`Server started at ${PORT} with socket.io`)
    })

}

startServer()