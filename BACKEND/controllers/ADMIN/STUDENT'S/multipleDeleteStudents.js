import manageStudents from "../../../models/Student.js";
import manageUser from "../../../models/User.js";

const multipleDeleteStudent = async (req, res) => {

    try {

        const { ids } = req.body;

        const students = await manageStudents.find({
            _id: { $in: ids }
        });

        const userIds = students.map(
            (student) => student.userId
        );

        await manageStudents.deleteMany({
            _id: { $in: ids }
        });

        await manageUser.deleteMany({
            _id: { $in: userIds }
        });

        return res.status(200).json({
            success: true,
            message: "Students deleted successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

};

export default multipleDeleteStudent;