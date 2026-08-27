import manageStudent from "../../../models/Student.js"
import manageUser from "../../../models/User.js"


const updateStudent = async (req, res) => {
    try {
        const { id } = req.params

        const { name, email, course, rollNumber } = req.body

        if (!name || !email || !course || !rollNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const Student = await manageStudent.findByIdAndUpdate(id, { course, rollNumber }, { returnDocument: "after" })

        if (!Student) {
            return res.status(400).json({
                success: false,
                message: "Student not found"
            })
        }

        const user = await manageUser.findByIdAndUpdate(Student.userId, { name, email }, { returnDocument: "after" })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Student updated successfully",
            Student
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export default updateStudent