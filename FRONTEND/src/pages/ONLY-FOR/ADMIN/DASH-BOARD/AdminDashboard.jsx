import { useEffect, useRef } from "react";
import "./AdminDashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../../../api/api.js";
import Loader from "../../../../Components/LOADER/Loader.jsx";
import { setAdminDashBoardData } from "../../../../REDUX/adminSlice.js";
import gsap from "gsap";

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.admin?.adminDashBoardData);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!user) {
            const getDashboard = async () => {
                try {
                    const res = await api.get("/admin/dashboard");
                    dispatch(setAdminDashBoardData(res.data.user));
                } catch (err) {
                    console.log(err);
                }
            };
            getDashboard();
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (user && !hasAnimated.current) {
            hasAnimated.current = true;
            gsap.fromTo(
                ".admin-anim",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: "power2.out" }
            );
        }
    }, [user]);

    if (!user) {
        return <Loader />;
    }

    return (
        <div className="admin-page">
            <div className="admin-container">
                
                {/* Banner Area */}
                <div className="admin-banner admin-anim">
                    <span className="admin-tag">College Administrator</span>
                    <h1 className="admin-title">Admin Dashboard</h1>
                    <p className="admin-subtitle">
                        Logged in as <strong className="user-highlight">{user.name}</strong>
                    </p>
                </div>

                {/* Profile Overview */}
                <div className="admin-profile-box admin-anim">
                    <h2 className="admin-section-heading">Account Overview</h2>
                    <div className="admin-info-grid">
                        <div className="admin-info-card">
                            <span className="info-title">Full Name</span>
                            <strong className="info-value">{user.name}</strong>
                        </div>

                        <div className="admin-info-card">
                            <span className="info-title">Email Address</span>
                            <strong className="info-value">{user.email}</strong>
                        </div>

                        <div className="admin-info-card">
                            <span className="info-title">System Role</span>
                            <span className="admin-role-pill">{user.role}</span>
                        </div>
                    </div>
                </div>

                {/* Section 1: Academic & Portal Controls */}
                <div className="admin-section-block admin-anim">
                    <div className="section-title-wrap">
                        <span className="section-icon">⚙️</span>
                        <div>
                            <h2 className="admin-section-heading">Academic & Portal Controls</h2>
                            <p className="section-desc">Manage college programs, academic details, and incoming inquiries.</p>
                        </div>
                    </div>
                    
                    <div className="admin-cards-grid">
                        <Link to="/admin/dashboard/manage-courses" className="admin-nav-card">
                            <span className="nav-card-icon">📚</span>
                            <div className="nav-card-content">
                                <h3>Manage Courses</h3>
                                <p>Add new academic programs, edit fees, and update course details.</p>
                            </div>
                        </Link>

                        <Link to="/admin/dashboard/messages" className="admin-nav-card">
                            <span className="nav-card-icon">📩</span>
                            <div className="nav-card-content">
                                <h3>Contact Inquiries</h3>
                                <p>Review and reply to public inquiries submitted via contact forms.</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Section 2: Faculty Management */}
                <div className="admin-section-block admin-anim">
                    <div className="section-title-wrap">
                        <span className="section-icon">👨‍🏫</span>
                        <div>
                            <h2 className="admin-section-heading">Faculty Management</h2>
                            <p className="section-desc">Onboard professors, update department assignments, and track records.</p>
                        </div>
                    </div>

                    <div className="admin-cards-grid">
                        <Link to="/admin/dashboard/add-teacher" className="admin-nav-card">
                            <span className="nav-card-icon">➕</span>
                            <div className="nav-card-content">
                                <h3>Create Teacher Account</h3>
                                <p>Register a new faculty member with subject specialization.</p>
                            </div>
                        </Link>

                        <Link to="/admin/dashboard/manage-teachers" className="admin-nav-card">
                            <span className="nav-card-icon">📑</span>
                            <div className="nav-card-content">
                                <h3>Manage Teachers List</h3>
                                <p>Search active faculties, modify profiles, or revoke access.</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Section 3: Student Administration */}
                <div className="admin-section-block admin-anim">
                    <div className="section-title-wrap">
                        <span className="section-icon">👨‍🎓</span>
                        <div>
                            <h2 className="admin-section-heading">Student Administration</h2>
                            <p className="section-desc">Enroll students, assign batches, and verify active academic statuses.</p>
                        </div>
                    </div>

                    <div className="admin-cards-grid">
                        <Link to="/admin/dashboard/add-student" className="admin-nav-card">
                            <span className="nav-card-icon">➕</span>
                            <div className="nav-card-content">
                                <h3>Enroll New Student</h3>
                                <p>Add a new student profile and allocate roll numbers.</p>
                            </div>
                        </Link>

                        <Link to="/admin/dashboard/manage-students" className="admin-nav-card">
                            <span className="nav-card-icon">👥</span>
                            <div className="nav-card-content">
                                <h3>Manage Students Directory</h3>
                                <p>Search student rosters, review attendance, and academic standing.</p>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;