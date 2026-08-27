import express from "express"
import verifyToken from "../middleware/verifyToken.js"
import authorizeRole from "../middleware/authorizeRole.js"
import getDashboard from "../controllers/ADMIN/ADMIN-DASHBOARD/getDashboard.js"
import createTeacher from "../controllers/ADMIN/TEACHER'S/TEACHER'S-CRUD/createTeacher.js"
import getTeachers from "../controllers/ADMIN/TEACHER'S/TEACHER'S-CRUD/getTeacher.js"
import getTeacherById from "../controllers/ADMIN/TEACHER'S/TEACHER'S-CRUD/getTeacherById.js"
import updateTeacher from "../controllers/ADMIN/TEACHER'S/TEACHER'S-CRUD/updateTeacher.js"
import deleteTeacher from "../controllers/ADMIN/TEACHER'S/TEACHER'S-CRUD/deleteTeacher.js"
import multipleDeleteTeacher from "../controllers/ADMIN/TEACHER'S/TEACHER'S-CRUD/multipleDelete.js"

import createStudent from "../controllers/ADMIN/STUDENT'S/createStudent.js"
import getStudent from "../controllers/ADMIN/STUDENT'S/getStudent.js"
import getStudentsById from "../controllers/ADMIN/STUDENT'S/getStudentsById.js"
import updateStudent from "../controllers/ADMIN/STUDENT'S/updateStudent.js"
import deleteStudents from "../controllers/ADMIN/STUDENT'S/deleteStudents.js"
import multipleDelete from "../controllers/ADMIN/STUDENT'S/multipleDeleteStudents.js"
import createSchedule from "../controllers/ADMIN/TEACHER'S/SCHEDULE/createSchedule.js"
import getTeacherSchedule from "../controllers/ADMIN/TEACHER'S/SCHEDULE/getTeacherSchedule.js"
import deleteSchedule from "../controllers/ADMIN/TEACHER'S/SCHEDULE/deleteSchedule.js"

const router = express.Router()

// ========FOR-ADMIN======

router.get("/dashboard",verifyToken,authorizeRole("admin"),getDashboard)

// =======FOR-ADMIN-TEACHER======

router.post("/teacher/add",verifyToken,authorizeRole("admin"),createTeacher)
router.get("/manage-teachers",verifyToken,authorizeRole("admin"),getTeachers)

router.get("/edit-teacher/:id",verifyToken,authorizeRole("admin"),getTeacherById)
router.put("/update-teacher/:id",verifyToken,authorizeRole("admin"),updateTeacher)

router.delete("/delete-teacher/:id",verifyToken,authorizeRole("admin"),deleteTeacher)
router.delete("/multiple-delete",verifyToken,authorizeRole("admin"),multipleDeleteTeacher)

// schedules

router.post("/teacher-schedule/:teacherId",verifyToken,authorizeRole("admin"),createSchedule)
router.get("/teacher-schedule/:teacherId",verifyToken,authorizeRole("admin"),getTeacherSchedule)
router.delete("/delete-schedule/:scheduleId",verifyToken,authorizeRole("admin"),deleteSchedule)

// ========FOR-ADMIN-STUDENT======

router.post("/student/add",verifyToken,authorizeRole("admin"),createStudent)
router.get("/manage-students",verifyToken,authorizeRole("admin"),getStudent)

router.get("/edit-students/:id",verifyToken,authorizeRole("admin"),getStudentsById)
router.put("/update-student/:id",verifyToken,authorizeRole("admin"),updateStudent)

router.delete("/delete-student/:id",verifyToken,authorizeRole("admin"),deleteStudents)
router.delete("/student/multiple-delete",verifyToken,authorizeRole("admin"),multipleDelete)

export default router