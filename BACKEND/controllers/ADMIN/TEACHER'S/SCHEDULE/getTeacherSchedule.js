import Teacher from "../../../../models/Teacher.js"
import ScheduleTeacher from "../../../../models/Schedule.js"


const getTeacherSchedule = async (req, res) => {
    try {
        const { teacherId } = req.params

        const teacher = await Teacher.findById(teacherId).populate("userId", "name email role")

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            })
        }

        const schedules = await ScheduleTeacher.find({ teacherId })

        return res.status(200).json({
            success: true,
            teacher,
            schedules
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export default getTeacherSchedule