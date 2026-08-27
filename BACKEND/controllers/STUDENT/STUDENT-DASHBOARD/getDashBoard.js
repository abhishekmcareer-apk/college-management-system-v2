import Student from "../../../models/Student.js";
import TeacherSchedule from "../../../models/Schedule.js";

const getStudentDashBoard = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // 1. Logged-in student ka data nikala
        const student = await Student.findOne({ userId: loggedInUserId }).populate("userId", "name email");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // 2. Schedule ke "subject" ko Student ke "course" se match kiya (case-insensitive)
        const schedules = await TeacherSchedule.find({
            subject: { $regex: new RegExp(`^${student.course}$`, "i") }
        }).populate({
            path: "teacherId",
            populate: {
                path: "userId",
                select: "name"
            }
        });

        return res.status(200).json({
            success: true,
            student,
            schedules
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default getStudentDashBoard;