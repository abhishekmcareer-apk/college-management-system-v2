import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher",
        required:true
    },
    day:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    }
})

const ScheduleTeacher = mongoose.model("Schedule",ScheduleSchema)

export default ScheduleTeacher