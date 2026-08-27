import manageStudent from "../../../models/Student.js"
import manageUser from "../../../models/User.js"


const deleteStudents = async (req, res) => {
    try {
        const { id } = req.params

        const student = await manageStudent.findById(id)

        if(!student){
            return res.status(404).json({
                success:false,
                message:"Student not found"
            })
        }

        await manageStudent.findByIdAndDelete(id)

        const userId = student.userId

        await manageUser.findByIdAndDelete(userId)

        return res.status(200).json({
            success: true,
            message: "Student deleted succesfully",
            student
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export default deleteStudents