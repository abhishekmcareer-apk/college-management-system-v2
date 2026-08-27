import { useState, useEffect } from "react";
import "./createStudent.css";
import api from "../../../../../api/api.js";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import toast from "react-hot-toast";

const CreateStudent = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        course: "",
        rollNumber: ""
    });

    useEffect(() => {
        gsap.fromTo(
            ".student-anim",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
        );
    }, []);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/admin/student/add", data);
            if (response.data.success) {
                toast.success("Student created successfully!");
                navigate("/admin/dashboard/manage-students");
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.message || "Failed to create student!");
        }
    };

    return (
        <div className="create-student-page">
            <div className="create-student-container">

                <div className="create-student-header student-anim">
                    <span className="create-student-tag">ADMIN PANEL</span>
                    <h1>Create Student</h1>
                    <p className="create-student-description">
                        Add a new student to the system.
                    </p>
                </div>

                <div className="create-student-card student-anim">
                    <h2>Student Registration Form</h2>

                    <form className="create-student-form" onSubmit={handleSubmit}>

                        <div className="form-grid-row">
                            <div className="create-student-field">
                                <label>Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Student Name"
                                    value={data.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="create-student-field">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Student Email"
                                    value={data.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grid-row">
                            <div className="create-student-field">
                                <label>Password *</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="create-student-field">
                                <label>Course *</label>
                                <input
                                    type="text"
                                    name="course"
                                    placeholder="Course (e.g. BCA, B.Tech)"
                                    value={data.course}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="create-student-field">
                            <label>Roll Number *</label>
                            <input
                                type="text"
                                name="rollNumber"
                                placeholder="Roll Number"
                                value={data.rollNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button className="create-student-btn" type="submit">
                            + Create Student
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default CreateStudent;