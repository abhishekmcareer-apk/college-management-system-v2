import ScheduleTeacher from "../../../../models/Schedule.js";

const deleteSchedule = async (req,res)=>{
    try {
        const {scheduleId}=req.params

        const deletedSchedule = await ScheduleTeacher.findByIdAndDelete(scheduleId)

        if(!deleteSchedule){
            return res.status(404).json({
                success:false,
                message:"Schedule not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Schedule deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        
    }
}

export default deleteSchedule