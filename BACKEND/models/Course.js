import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    tag: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    fees: {
        type: String,
        default: "Contact College"
    }
}, {
    timestamps: true
})

const manageCourse = mongoose.model("Course", courseSchema)

export default manageCourse