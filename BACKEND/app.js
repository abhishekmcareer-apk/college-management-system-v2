import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js"
import studentRoutes from "./routes/studentRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import teacherRoutes from "./routes/teacherRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"

const app = express()


app.use(cors({
    // origin: "http://localhost:5173",
    credentials: true,
    origin:true
}
))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())



app.use("/api/auth", authRoute)

app.use("/api/student", studentRoutes)

app.use("/api/admin", adminRoutes)

app.use("/api/teacher",teacherRoutes)

app.use("/api/courses",courseRoutes)

app.use("/api/contact", contactRoutes)


export default app