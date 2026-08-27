import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../../api/api.js";
import "./TeacherSchedule.css";
import Loader from "../../../../../Components/LOADER/Loader.jsx";
import gsap from "gsap";
import toast from "react-hot-toast";

const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const TeacherSchedule = () => {
    const { teacherId } = useParams();

    const [loading, setLoading] = useState(true);
    const [teacherDetails, setTeacherDetails] = useState(null);
    const [scheduleList, setScheduleList] = useState([]);
    const hasAnimated = useRef(false);

    const [scheduleData, setScheduleData] = useState({
        day: "",
        subject: "",
        startTime: "",
        endTime: "",
        class: ""
    });

    const getScheduleData = async () => {
        try {
            const response = await api.get(`/admin/teacher-schedule/${teacherId}`);

            if (response.data.success) {
                setTeacherDetails(response.data.teacher);
                setScheduleList(response.data.schedules || []);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load schedule data!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getScheduleData();
    }, [teacherId]);

    useEffect(() => {
        if (!loading && !hasAnimated.current) {
            hasAnimated.current = true;
            gsap.fromTo(
                ".schedule-anim",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: "power2.out" }
            );
        }
    }, [loading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScheduleData({
            ...scheduleData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(`/admin/teacher-schedule/${teacherId}`, scheduleData);

            if (response.data.success) {
                toast.success("Schedule successfully added!");

                setScheduleList((prevList) => [
                    ...prevList,
                    response.data.schedule
                ]);

                setScheduleData({
                    day: "",
                    subject: "",
                    startTime: "",
                    endTime: "",
                    class: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Schedule add nahi ho paya!");
        }
    };

    const handleDeleteSchedule = async (scheduleId) => {
        if (!window.confirm("Are you sure you want to remove this class?")) return;

        try {
            const response = await api.delete(`/admin/delete-schedule/${scheduleId}`);

            if (response.data.success) {
                toast.success("Class schedule removed!");
                setScheduleList((prevList) =>
                    prevList.filter((item) => item._id !== scheduleId)
                );
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Schedule delete nahi ho paya!");
        }
    };

    const groupedSchedules = daysOrder.map((day) => {
        const dayClasses = scheduleList
            .filter((item) => item.day.toLowerCase() === day.toLowerCase())
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

        return {
            day,
            classes: dayClasses
        };
    }).filter((group) => group.classes.length > 0);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="teacher-schedule-page">
            <div className="teacher-schedule-container">

                {/* Header */}
                <div className="schedule-header schedule-anim">
                    <span className="schedule-tag">ADMIN PANEL</span>
                    <h1>Teacher Schedule</h1>
                    <p className="schedule-desc">Manage weekly timetable and class allocations.</p>
                </div>

                {/* Profile Card */}
                <div className="teacher-profile-card schedule-anim">
                    <div className="teacher-profile-avatar">
                        {teacherDetails?.userId?.name?.charAt(0)?.toUpperCase() || "T"}
                    </div>
                    <div className="teacher-profile-info">
                        <h2>{teacherDetails?.userId?.name || "Teacher Details"}</h2>
                        <p>
                            {teacherDetails?.subject || "Subject"} • {teacherDetails?.userId?.email || "Email"}
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="schedule-card schedule-anim">
                    <div className="schedule-card-header">
                        <h2>Add Class Schedule</h2>
                        <p>Assign a new time slot and classroom to this teacher.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="schedule-form">
                        
                        <div className="schedule-grid-3">
                            <div className="schedule-field">
                                <label>Day</label>
                                <select
                                    name="day"
                                    value={scheduleData.day}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Day</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                </select>
                            </div>

                            <div className="schedule-field">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="e.g. Mathematics"
                                    value={scheduleData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="schedule-field">
                                <label>Class / Section</label>
                                <input
                                    type="text"
                                    name="class"
                                    placeholder="e.g. BCA 1st Year"
                                    value={scheduleData.class}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="schedule-grid-2">
                            <div className="schedule-field">
                                <label>Start Time</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={scheduleData.startTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="schedule-field">
                                <label>End Time</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={scheduleData.endTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="add-schedule-btn">
                            + Add Schedule
                        </button>
                    </form>
                </div>

                {/* Timetable Section */}
                <div className="weekly-timetable-section schedule-anim">
                    <div className="section-title-wrap">
                        <h2>Weekly Timetable</h2>
                        <p>Organized by day and class timing.</p>
                    </div>

                    {groupedSchedules.length === 0 ? (
                        <div className="empty-schedule-card">
                            <span className="empty-icon">📅</span>
                            <h3>No Classes Scheduled</h3>
                            <p>Use the form above to assign weekly classes for this teacher.</p>
                        </div>
                    ) : (
                        <div className="day-wise-grid">
                            {groupedSchedules.map((group) => (
                                <div className="day-schedule-card" key={group.day}>
                                    <div className="day-card-header">
                                        <span className="day-badge">{group.day}</span>
                                        <span className="class-count">
                                            {group.classes.length} {group.classes.length === 1 ? "Class" : "Classes"}
                                        </span>
                                    </div>

                                    <div className="class-items-list">
                                        {group.classes.map((cls) => (
                                            <div className="class-item" key={cls._id}>
                                                <div className="class-time-tag">
                                                    <span>{cls.startTime} - {cls.endTime}</span>
                                                </div>

                                                <div className="class-meta">
                                                    <strong className="class-subject">{cls.subject}</strong>
                                                    <span className="class-room">{cls.class}</span>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="delete-class-btn"
                                                    title="Remove class"
                                                    onClick={() => handleDeleteSchedule(cls._id)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default TeacherSchedule;