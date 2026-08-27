import Teacher from "../../../../models/Teacher.js";

const getTeacherById = async (req, res) => {

    try {

        const { id } = req.params;

        const teacher = await Teacher
            .findById(id)
            .populate("userId", "name email role");

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            });
        }

        return res.status(200).json({
            success: true,
            teacher
        });

    } catch (error) {

        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

export default getTeacherById;