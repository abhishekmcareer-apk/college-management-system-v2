import { useEffect, useState, useRef } from "react";
import "./Cources.css";
import api from "../../api/api";
import gsap from "gsap";

const Cources = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get("/courses/all");
                if (res.data.success) {
                    setCourses(res.data.courses);
                }
            } catch (error) {
                console.log("Error loading courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".courses-head-text",
                { y: 25, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power2.out" }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!loading && courses.length > 0) {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    ".course-card",
                    { y: 35, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" }
                );
            }, containerRef);

            return () => ctx.revert();
        }
    }, [loading, courses]);

    return (
        <div className="courses-container" ref={containerRef}>
            <div className="courses-wrapper">
                <div className="courses-header">
                    <span className="courses-badge courses-head-text">Academic Programs</span>
                    <h1 className="courses-title courses-head-text">Our Available Courses</h1>
                    <p className="courses-subtitle courses-head-text">
                        Explore our verified industry-focused programs designed to build
                        practical skills, domain depth, and future-ready careers.
                    </p>
                </div>

                {loading && (
                    <div className="courses-grid">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="course-card skeleton-card">
                                <div className="skeleton-line short"></div>
                                <div className="skeleton-line title"></div>
                                <div className="skeleton-line desc"></div>
                                <div className="skeleton-line footer"></div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && courses.length === 0 && (
                    <div className="courses-status">
                        <div className="status-icon">📂</div>
                        <h3>No Courses Available</h3>
                        <p>We are currently updating our syllabus. Please check back soon.</p>
                    </div>
                )}

                {!loading && courses.length > 0 && (
                    <div className="courses-grid">
                        {courses.map((course) => (
                            <div key={course._id} className="course-card">
                                <div className="course-top">
                                    <span className="course-level">Level: {course.tag || "UG / PG"}</span>
                                    <span className="course-time">⏱️ {course.duration}</span>
                                </div>
                                
                                <div className="course-info">
                                    <span className="course-label">Course Name</span>
                                    <h2 className="course-name">{course.title}</h2>
                                </div>

                                <div className="course-info desc-wrapper">
                                    <span className="course-label">Overview</span>
                                    <p className="course-desc">{course.description}</p>
                                </div>
                                
                                <div className="course-bottom">
                                    <div className="fee-box">
                                        <span className="course-label">Total Fee</span>
                                        <p className="course-fee">{course.fees}</p>
                                    </div>

                                    <button className="course-btn">
                                        View Details <span className="btn-arrow">→</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cources;