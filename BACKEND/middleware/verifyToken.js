import jwt from "jsonwebtoken";
import manageUser from "../models/User.js";

const verifyToken = async (req,res,next)=>{
    try {
        
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Please Login.."
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded)

        const user = await manageUser.findById(decoded.id).select("-password")

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        req.user = user

        next()

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Invalid Token"
        })
    }
}

export default verifyToken