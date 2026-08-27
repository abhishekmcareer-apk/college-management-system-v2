import { useState, useEffect } from "react";
import "./ManageCources.css";
import api from "../../../../api/api.js";
import { Link } from "react-router-dom";
import gsap from "gsap";
import toast from "react-hot-toast";

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        title: "",
        tag: "",
        duration: "",
        fees: "",
        description: ""
    });

    const [error, setError] = useState({
        title: "",
        tag: "",
        duration: "",
        fees: "",
        description: ""
    });

    useEffect(() => {
        gsap.fromTo(
            ".manage-courses-anim",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
        );
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await api.get("/courses/all");
            if (res.data.success) {
                setCourses(res.data.courses);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });

        if (error[e.target.name]) {
            setError({
                ...error,
                [e.target.name]: ""
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.title) {
            setError({ ...error, title: "Title is required!" });
            const target = document.getElementsByName("title")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        if (!data.tag) {
            setError({ ...error, tag: "Tag is required!" });
            const target = document.getElementsByName("tag")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        if (!data.duration) {
            setError({ ...error, duration: "Duration is required!" });
            const target = document.getElementsByName("duration")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        if (!data.fees) {
            setError({ ...error, fees: "Fees is required!" });
            const target = document.getElementsByName("fees")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        if (!data.description) {
            setError({ ...error, description: "Description is required!" });
            const target = document.getElementsByName("description")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        try {
            setLoading(true);
            const res = await api.post("/courses/create", data);
            if (res.data.success) {
                toast.success("Course created successfully!");
                setData({
                    title: "",
                    tag: "",
                    duration: "",
                    fees: "",
                    description: ""
                });
                fetchCourses();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create course!");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;

        try {
            const res = await api.delete(`/courses/delete/${id}`);
            if (res.data.success) {
                toast.success("Course deleted successfully!");
                fetchCourses();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete course!");
        }
    };

    return (
        <div className="manage-courses-page">
            <div className="manage-courses-container">
                
                <div className="manage-courses-header manage-courses-anim">
                    <Link to="/admin/dashboard" className="back-link">← Back to Dashboard</Link>
                    <span className="manage-courses-tag">Admin Controls</span>
                    <h1>Manage Courses</h1>
                    <p>Add new courses or manage existing programs.</p>
                </div>

                <div className="courses-form-box manage-courses-anim">
                    <h2>Add New Course</h2>
                    <form className="courses-form" onSubmit={handleSubmit}>
                        
                        <div className="form-grid-row">
                            <div className="input-group">
                                <label>Course Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder={error.title || "e.g. B.Tech Computer Science"}
                                    value={data.title}
                                    onChange={handleChange}
                                    className={error.title ? "input-error" : ""}
                                />
                            </div>

                            <div className="input-group">
                                <label>Tag / Category</label>
                                <input
                                    type="text"
                                    name="tag"
                                    placeholder={error.tag || "e.g. Engineering / Management"}
                                    value={data.tag}
                                    onChange={handleChange}
                                    className={error.tag ? "input-error" : ""}
                                />
                            </div>
                        </div>

                        <div className="form-grid-row">
                            <div className="input-group">
                                <label>Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    placeholder={error.duration || "e.g. 4 Years"}
                                    value={data.duration}
                                    onChange={handleChange}
                                    className={error.duration ? "input-error" : ""}
                                />
                            </div>

                            <div className="input-group">
                                <label>Fees</label>
                                <input
                                    type="text"
                                    name="fees"
                                    placeholder={error.fees || "e.g. ₹ 85,000 / Year"}
                                    value={data.fees}
                                    onChange={handleChange}
                                    className={error.fees ? "input-error" : ""}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Description</label>
                            <textarea
                                rows="3"
                                name="description"
                                placeholder={error.description || "Enter course overview..."}
                                value={data.description}
                                onChange={handleChange}
                                className={error.description ? "input-error" : ""}
                            ></textarea>
                        </div>

                        <button type="submit" className="course-submit-btn" disabled={loading}>
                            {loading ? "Adding Course..." : "+ Create Course"}
                        </button>
                    </form>
                </div>

                <div className="courses-table-box manage-courses-anim">
                    <h2>All Courses ({courses.length})</h2>
                    <div className="table-responsive">
                        <table className="courses-data-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Tag</th>
                                    <th>Duration</th>
                                    <th>Fees</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="table-empty-cell">No courses available.</td>
                                    </tr>
                                ) : (
                                    courses.map((course) => (
                                        <tr key={course._id}>
                                            <td><strong>{course.title}</strong></td>
                                            <td><span className="course-tag-pill">{course.tag}</span></td>
                                            <td>{course.duration}</td>
                                            <td className="fee-cell">{course.fees}</td>
                                            <td>
                                                <button
                                                    className="course-delete-btn"
                                                    onClick={() => handleDelete(course._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageCourses;