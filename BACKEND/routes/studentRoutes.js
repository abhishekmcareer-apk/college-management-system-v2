import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import authorizerole from "../middleware/authorizeRole.js"
import getStudentDashBoard from "../controllers/STUDENT/STUDENT-DASHBOARD/getDashBoard.js";

const router = express.Router()

router.get("/dashboard",verifyToken,authorizerole("student"),getStudentDashBoard)

export default router