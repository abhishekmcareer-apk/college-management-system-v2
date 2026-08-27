const verify = (req, res) => {


    return res.status(200).json({
        success: true,
        message: "User Verified",
        user: req.user
    })
}

export default verify