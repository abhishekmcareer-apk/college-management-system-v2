import ScheduleTeacher from "../../../../models/Schedule.js";


const createSchedule = async (req, res) => {

    try {

        const {teacherId}=req.params

        const {
            
            day,
            subject,
            startTime,
            endTime,
            class: className
        } = req.body;


        // Validation

        if (
            !teacherId ||
            !day ||
            !subject ||
            !startTime ||
            !endTime ||
            !className
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }


        // Create Schedule

        const schedule = await ScheduleTeacher.create({
            teacherId,
            day,
            subject,
            startTime,
            endTime,
            class: className
        });


        return res.status(201).json({
            success: true,
            message: "Schedule created successfully",
            schedule
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

};


export default createSchedule;