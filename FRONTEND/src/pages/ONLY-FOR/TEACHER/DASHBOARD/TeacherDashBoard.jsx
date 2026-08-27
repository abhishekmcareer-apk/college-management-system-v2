import { useEffect, useState, useRef } from "react";
import api from "../../../../api/api.js";
import "./DashBoard.css";
import Loader from "../../../../Components/LOADER/Loader.jsx";
import gsap from "gsap";

const TeacherDashboard = () => {
    const [teacher, setTeacher] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const hasAnimated = useRef(false);

    const fetchDashboard = async () => {
        try {
            const res = await api.get("/teacher/dashboard");
            if (res.data.success) {
                setTeacher(res.data.teacher);
                setSchedules(res.data.schedules || []);
            }
        } catch (error) {
            console.log("Teacher dashboard fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    useEffect(() => {
        if (!loading && !hasAnimated.current) {
            hasAnimated.current = true;
            gsap.fromTo(
                ".teacher-dash-anim",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: "power2.out" }
            );
        }
    }, [loading]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="teacher-dashboard-page">
            <div className="teacher-dashboard-container">

                {/* Header */}
                <div className="teacher-dashboard-header teacher-dash-anim">
                    <div>
                        <span className="teacher-dashboard-tag">FACULTY PORTAL</span>
                        <h1>Teacher Dashboard</h1>
                        <p className="teacher-dashboard-subtext">Manage weekly lectures, allocated classrooms, and faculty profile.</p>
                    </div>

                    <div className="teacher-subject-chip">
                        <span>Assigned Subject</span>
                        <strong>{teacher?.subject || "Faculty"}</strong>
                    </div>
                </div>

                {/* Faculty Profile Card */}
                <div className="teacher-profile-overview-card teacher-dash-anim">
                    <div className="teacher-avatar-box">
                        {teacher?.userId?.name?.charAt(0)?.toUpperCase() || "T"}
                    </div>
                    <div className="teacher-details-grid">
                        <div>
                            <span className="teacher-info-label">Faculty Name</span>
                            <h3>{teacher?.userId?.name || "Teacher"}</h3>
                        </div>
                        <div>
                            <span className="teacher-info-label">Email Address</span>
                            <p>{teacher?.userId?.email || "N/A"}</p>
                        </div>
                        <div>
                            <span className="teacher-info-label">Department / Subject</span>
                            <p className="teacher-subject-highlight">{teacher?.subject || "N/A"}</p>
                        </div>
                        <div>
                            <span className="teacher-info-label">Qualification</span>
                            <p className="teacher-qual-highlight">{teacher?.qualification || "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Weekly Routine Table Section */}
                <div className="teacher-routine-card teacher-dash-anim">
                    <div className="teacher-routine-header">
                        <div>
                            <h2>My Weekly Classes</h2>
                            <p>Allocated lecture periods and classroom designations</p>
                        </div>
                        <span className="teacher-class-count-badge">
                            {schedules.length} {schedules.length === 1 ? "Class" : "Classes"} Assigned
                        </span>
                    </div>

                    {schedules.length === 0 ? (
                        <div className="teacher-empty-box">
                            <span className="teacher-empty-icon">📅</span>
                            <h3>No Classes Assigned</h3>
                            <p>You have no scheduled lecture slots assigned yet.</p>
                        </div>
                    ) : (
                        <div className="teacher-table-wrapper">
                            <table className="teacher-routine-table">
                                <thead>
                                    <tr>
                                        <th>Day</th>
                                        <th>Subject</th>
                                        <th>Class / Room</th>
                                        <th>Class Timing</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedules.map((item) => (
                                        <tr key={item._id}>
                                            <td>
                                                <span className="teacher-day-badge">{item.day}</span>
                                            </td>
                                            <td>
                                                <strong className="teacher-subject-name">{item.subject}</strong>
                                            </td>
                                            <td>
                                                <span className="teacher-room-badge">🏫 {item.class}</span>
                                            </td>
                                            <td>
                                                <span className="teacher-time-badge">
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

export default TeacherDashboard;