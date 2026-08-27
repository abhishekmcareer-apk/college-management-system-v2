import manageUser from "../../../../models/User.js";
import Teacher from "../../../../models/Teacher.js";

const multipleDeleteTeacher = async (req, res) => {

    try {

        const { ids } = req.body;

        const teachers = await Teacher.find({
            _id: { $in: ids }
        });

        const userIds = teachers.map(
            (teacher) => teacher.userId
        );

        await Teacher.deleteMany({
            _id: { $in: ids }
        });

        await manageUser.deleteMany({
            _id: { $in: userIds }
        });

        return res.status(200).json({
            success: true,
            message: "Teachers deleted successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

};

export default multipleDeleteTeacher;