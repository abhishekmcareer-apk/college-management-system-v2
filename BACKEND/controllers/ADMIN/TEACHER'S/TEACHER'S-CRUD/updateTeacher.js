import manageUser from "../../../../models/User.js"
import Teacher from "../../../../models/Teacher.js"

const updateTeacher = async (req, res) => {
    try {
        const { name, email, subject, qualification } = req.body

        const teacher = await Teacher.findById(req.params.id)

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            })
        }

        const user = await manageUser.findById(teacher.userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        user.name = name
        user.email = email

        teacher.subject = subject
        teacher.qualification = qualification

        await user.save()
        await teacher.save()

        return res.status(200).json({
            success: true,
            message: "Teacher updated successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


export default updateTeacher