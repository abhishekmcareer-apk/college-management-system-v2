import manageStudent from "../../../models/Student.js";


const getStudent = async (req, res) => {

    try {
        const student = await manageStudent.find().populate("userId", "name email role")

        return res.status(200).json({
            success: true,
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

export default getStudent