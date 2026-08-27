import jwt from "jsonwebtoken"

const generateToken = (user,res)=>{


    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET,

        {
            expiresIn:"7d"
        }
    )

    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:1000*60*60*24*7
    })

}

export default generateToken;