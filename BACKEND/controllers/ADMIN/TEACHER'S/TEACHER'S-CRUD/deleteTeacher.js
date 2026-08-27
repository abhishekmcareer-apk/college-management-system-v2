import Teacher from "../../../../models/Teacher.js";
import manageUser from "../../../../models/User.js";


const deleteTeacher = async (req, res) => {

    try {
        const teacher = await Teacher.findById(req.params.id)
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            })
        }

        const userId = teacher.userId

        await Teacher.findByIdAndDelete(req.params.id)
        await manageUser.findByIdAndDelete(userId)

        return res.status(200).json({
            success: true,
            message: "Teacher deleted successfully"
        })
    } catch (error) {
        console.log(error.message)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }

}

export default deleteTeacher