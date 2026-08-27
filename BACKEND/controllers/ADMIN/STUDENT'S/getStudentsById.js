import manageStudent from "../../../models/Student.js"


const getStudentsById = async (req, res) => {

    try {
        const { id } = req.params

        const student = await manageStudent.findById(id).populate("userId", "name email role")

        if (!student) {
            return res.status(400).json({
                success: false,
                message: "Student not found"
            })
        }

        return res.status(200).json({
            success:true,
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

export default getStudentsById