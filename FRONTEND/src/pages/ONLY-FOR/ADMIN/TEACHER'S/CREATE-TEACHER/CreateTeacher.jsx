import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CreateTeacher.css";
import api from "../../../../../api/api.js";
import gsap from "gsap";
import toast from "react-hot-toast";

const CreateTeacher = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        subject: "",
        qualification: ""
    });

    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        subject: "",
        qualification: ""
    });

    useEffect(() => {
        gsap.fromTo(
            ".create-teacher-anim",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
        );
    }, []);

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

        if (!data.name.trim()) {
            setError({ ...error, name: "Name is required!" });
            const target = document.getElementsByName("name")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        if (!data.email.trim()) {
            setError({ ...error, email: "Email is required!" });
            const target = document.getElementsByName("email")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        if (!data.password.trim()) {
            setError({ ...error, password: "Password is required!" });
            const target = document.getElementsByName("password")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        if (!data.subject.trim()) {
            setError({ ...error, subject: "Subject is required!" });
            const target = document.getElementsByName("subject")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        if (!data.qualification.trim()) {
            setError({ ...error, qualification: "Qualification is required!" });
            const target = document.getElementsByName("qualification")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/admin/teacher/add", data);

            if (response.data.success || response.status === 200 || response.status === 201) {
                toast.success("Teacher created successfully!");
                navigate("/admin/dashboard/manage-teachers");
            }
        } catch (err) {
            if (err.response?.data?.message === "Email already exists") {
                setError({
                    name: "",
                    email: "Email already exists!",
                    password: "",
                    subject: "",
                    qualification: ""
                });
                toast.error("Email already exists!");
            } else {
                toast.error(err.response?.data?.message || "Failed to create teacher!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-teacher-page">
            <div className="create-teacher-container">
                
                <div className="create-teacher-header create-teacher-anim">
                    <span className="create-teacher-tag">Faculty Administration</span>
                    <h1>Create Teacher</h1>
                    <p>Register new faculty credentials and allocate academic subjects.</p>
                </div>

                <div className="create-teacher-card create-teacher-anim">
                    <h2>Teacher Registration Form</h2>
                    
                    <form className="create-teacher-form" onSubmit={handleSubmit}>
                        
                        <div className="form-grid-row">
                            <div className="form-group">
                                <label>Teacher Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={error.name || "Enter teacher name"}
                                    value={data.name}
                                    onChange={handleChange}
                                    className={error.name ? "input-error" : ""}
                                />
                            </div>

                            <div className="form-group">
                                <label>Teacher Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={error.email || "Enter teacher email"}
                                    value={data.email}
                                    onChange={handleChange}
                                    className={error.email ? "input-error" : ""}
                                />
                            </div>
                        </div>

                        <div className="form-grid-row">
                            <div className="form-group">
                                <label>Password *</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder={error.password || "Enter password"}
                                    value={data.password}
                                    onChange={handleChange}
                                    className={error.password ? "input-error" : ""}
                                />
                            </div>

                            <div className="form-group">
                                <label>Subject *</label>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder={error.subject || "Enter subject"}
                                    value={data.subject}
                                    onChange={handleChange}
                                    className={error.subject ? "input-error" : ""}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Qualification *</label>
                            <input
                                type="text"
                                name="qualification"
                                placeholder={error.qualification || "Enter qualification"}
                                value={data.qualification}
                                onChange={handleChange}
                                className={error.qualification ? "input-error" : ""}
                            />
                        </div>

                        <button
                            type="submit"
                            className="create-teacher-btn"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "+ Create Teacher"}
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default CreateTeacher;