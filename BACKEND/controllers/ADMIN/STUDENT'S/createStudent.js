import manageUser from "../../../models/User.js"
import manageStudent from '../../../models/Student.js'
import bcrypt from "bcrypt"

const createStudent = async (req, res) => {

    try {
        const { name, email, password, course, rollNumber } = req.body

        if (!name || !email || !password || !course || !rollNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const existingUser = await manageUser.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Eamil already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await manageUser.create({
            name,
            email,
            password: hashedPassword,
            role: "student"
        })

        const student = await manageStudent.create({
            userId: user._id,
            course,
            rollNumber
        })

        return res.status(201).json({
            success: true,
            message: "Student created successfully",
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

export default createStudent