import express from "express"
import { createCourse, deleteCourse, getAllCourses } from "../controllers/COURSE/courseController.js"

const router = express.Router()

router.get("/all",getAllCourses)
router.post("/create",createCourse)
router.delete("/delete/:id",deleteCourse)

export default router