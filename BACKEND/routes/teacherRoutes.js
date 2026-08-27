import express from "express"
import verifytoken from "../middleware/verifyToken.js"
import authorizerole from "../middleware/authorizeRole.js"
import getDashBoard from "../controllers/TEACHER/TEACHER-DASHBOARD/getDashBoard.js"

const router = express.Router()

router.get("/dashboard",verifytoken,authorizerole("teacher"),getDashBoard)

export default router