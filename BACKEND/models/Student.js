import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    course:{
        type:String,
        required:true
    },
    rollNumber:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const manageStudent = mongoose.model("Student",studentSchema)

export default manageStudent