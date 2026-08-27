import Teacher from "../../../../models/Teacher.js"

const getTeachers = async (req, res) => {

    try {

        const teachers = await Teacher.find().populate("userId", "name email role")

        return res.status(200).json({
            success: true,
            teachers
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export default getTeachers