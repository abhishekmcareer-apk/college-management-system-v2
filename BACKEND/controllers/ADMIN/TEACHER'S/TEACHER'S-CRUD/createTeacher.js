import manageUser from "../../../../models/User.js";
import Teacher from "../../../../models/Teacher.js";
import bcrypt from "bcrypt";

const createTeacher = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            subject,
            qualification
        } = req.body;


        if (
            !name ||
            !email ||
            !password ||
            !subject ||
            !qualification
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }


        const existingUser = await manageUser.findOne({ email });


        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });

        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await manageUser.create({
            name,
            email,
            password: hashedPassword,
            role: "teacher"
        });


        const teacher = await Teacher.create({
            userId: user._id,
            subject,
            qualification
        });


        return res.status(200).json({
            success: true,
            message: "Teacher Created Successfully",
            teacher
        });


    } catch (error) {

        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

};


export default createTeacher;
