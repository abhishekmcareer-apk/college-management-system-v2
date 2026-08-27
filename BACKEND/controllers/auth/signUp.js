import manageUser from "../../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const signUp = async (req, res) => {

   try {
     // ========VALIDATION=====

    const { name, email, password } = req.body

    if (!name || !email || !password ) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const existingUser = await manageUser.findOne({ email })

    if (existingUser) {
        return res.status(400).json({
            message: "Email already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    console.log(hashPassword)

    const user = await manageUser.create({
        name,
        email,
        password: hashPassword,
        role:"student"
    })

    const token = jwt.sign({id:user._id} , process.env.JWT_SECRET,{expiresIn:"7d"})

    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:1000*60*60*24*7
    })

    return res.status(201).json({
        success:true,
        message:"Account Created Successfully",
    })
   } catch (error) {
    console.log(error.message)
    return res.status(500).json({
        success:false,
        message:"Internal server error"
    })
   }
}

export default signUp