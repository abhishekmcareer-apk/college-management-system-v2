import express from "express";
import verify from "../controllers/auth/verify.js";
import signUp from "../controllers/auth/signUp.js";
import login from "../controllers/auth/login.js";
import logout from "../controllers/auth/logout.js"
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router()

router.post("/signup",signUp)
router.post("/login",login)
router.get("/logout",logout)
router.get("/verify",verifyToken,verify)

export default router