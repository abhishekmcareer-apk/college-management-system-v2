import express from "express"
import { getAllContactMessages, submitContactMessage } from "../controllers/CONTACT/contactController.js"

const router = express.Router()

router.post("/send",submitContactMessage)

router.get("/all-inquiries",getAllContactMessages)

export default router