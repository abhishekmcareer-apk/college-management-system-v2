import manageUser from "../../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await manageUser.findOne({ email })

        if (!user) {
            return res.status(400).json({

                success: false,
                message: "Invalid Email or Password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure:true,
            sameSite:"none",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        const safeUser = await manageUser.findById(user._id).select("-password")

        return res.status(201).json({
            password: undefined,
            success: true,
            message: "LOGIN SUCCESSFULLY",
            user: safeUser
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export default login