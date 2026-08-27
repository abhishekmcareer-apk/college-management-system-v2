import manageCourse from "../../models/Course.js";

export const createCourse = async (req, res) => {
    try {
        const { title, tag, duration, description, fees } = req.body

        if (!title || !tag || !duration || !description || !fees) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            })
        }

        const newCourse = await manageCourse.create({
            title,
            tag,
            duration,
            description,
            fees: fees || "Contact College"
        })

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            course: newCourse
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const getAllCourses = async (req, res) => {
    try {
        const courses = await manageCourse.find().sort({ createdAt: -1 })  //isme sort isliye laga hai taki jo naya course bane wo sabse upar rahe , agar ais anahi kiya to purana wla upar aur naya wala neeche dikhega
        return res.status(200).json({
            success: true,
            courses
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params

        const deletedCourse = await manageCourse.findByIdAndDelete(id)
        if (!deletedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}