import Teacher from "../../../models/Teacher.js"
import TeacherSchedule from "../../../models/Schedule.js"

const getDashBoard = async (req, res) => {
    try {
        const loggedInUserId = req.user._id

        const teacherCollection = await Teacher.findOne({ userId: loggedInUserId }).populate("userId","name email")

        console.log(teacherCollection)

        if (!teacherCollection) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            })
        }
        const ScheduleCollection = await TeacherSchedule.find({ teacherId: teacherCollection._id })

        console.log(ScheduleCollection)

        return res.status(200).json({
            success: true,
            message: "DashBoard found successfully",
            user: req.user,
            teacher: teacherCollection,
            schedules: ScheduleCollection
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export default getDashBoard