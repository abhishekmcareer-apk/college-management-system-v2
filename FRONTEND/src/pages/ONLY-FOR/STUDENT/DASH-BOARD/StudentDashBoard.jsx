import { useEffect, useState, useRef } from "react";
import api from "../../../../api/api.js";
import "./DashBoard.css";
import Loader from "../../../../Components/LOADER/Loader.jsx";
import gsap from "gsap";

const DashBoard = () => {
    const [student, setStudent] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const hasAnimated = useRef(false);

    const fetchStudentDashboard = async () => {
        try {
            const res = await api.get("/student/dashboard");
            if (res.data.success) {
                setStudent(res.data.student);
                setSchedules(res.data.schedules || []);
            }
        } catch (error) {
            console.log("Student dashboard fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentDashboard();
    }, []);

    useEffect(() => {
        if (!loading && !hasAnimated.current) {
            hasAnimated.current = true;
            gsap.fromTo(
                ".student-dash-anim",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: "power2.out" }
            );
        }
    }, [loading]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="student-dash-page">
            <div className="student-dash-container">
                
                {/* Header */}
                <div className="student-dash-header student-dash-anim">
                    <div>
                        <span className="student-dash-tag">STUDENT PORTAL</span>
                        <h1>Student Dashboard</h1>
                        <p className="student-dash-sub">Access your academic profile and timetable.</p>
                    </div>

                    <div className="student-dash-badge">
                        <span>Course</span>
                        <strong>{student?.course || "Student"}</strong>
                    </div>
                </div>

                {/* Student Profile Info */}
                <div className="student-info-card student-dash-anim">
                    <div className="student-avatar-wrap">
                        {student?.userId?.name?.charAt(0)?.toUpperCase() || "S"}
                    </div>
                    <div className="student-info-grid">
                        <div className="info-box">
                            <span className="label">Full Name</span>
                            <h3>{student?.userId?.name || "Student"}</h3>
                        </div>
                        <div className="info-box">
                            <span className="label">Email Address</span>
                            <p>{student?.userId?.email || "N/A"}</p>
                        </div>
                        <div className="info-box">
                            <span className="label">Roll Number</span>
                            <p className="val-cyan">{student?.rollNumber || "N/A"}</p>
                        </div>
                        <div className="info-box">
                            <span className="label">Class / Course</span>
                            <p className="val-green">{student?.course || "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Class Routine / Timetable */}
                <div className="student-schedule-box student-dash-anim">
                    <div className="schedule-head">
                        <div>
                            <h3>My Class Routine</h3>
                            <p>Assigned lectures and timetable schedule</p>
                        </div>
                        <span className="schedule-count-pill">
                            {schedules.length} {schedules.length === 1 ? "Class" : "Classes"}
                        </span>
                    </div>

                    {schedules.length === 0 ? (
                        <div className="student-empty-state">
                            <span className="empty-icon">📅</span>
                            <h4>No Classes Scheduled</h4>
                            <p>No classes scheduled for your course yet.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="simple-table">
                                <thead>
                                    <tr>
                                        <th>Day</th>
                                        <th>Subject</th>
                                        <th>Teacher</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedules.map((item) => (
                                        <tr key={item._id}>
                                            <td>
                                                <span className="badge-day">{item.day}</span>
                                            </td>
                                            <td>
                                                <strong className="subject-title">{item.subject}</strong>
                                            </td>
                                            <td>
                                                <span className="teacher-txt">
                                                    👨‍🏫 {item.teacherId?.userId?.name || "Assigned Teacher"}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="badge-time">
                                                    ⏰ {item.startTime} - {item.endTime}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default DashBoard;