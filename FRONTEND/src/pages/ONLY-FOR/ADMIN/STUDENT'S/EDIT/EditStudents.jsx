import "./EditStudents.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../../api/api.js";
import gsap from "gsap";
import toast from "react-hot-toast";

const EditStudents = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [data, setData] = useState({
        name: "",
        email: "",
        course: "",
        rollNumber: ""
    });

    useEffect(() => {
        gsap.fromTo(
            ".edit-student-anim",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
        );
    }, []);

    const getStudent = async () => {
        try {
            const response = await api.get(`/admin/edit-students/${id}`);
            const student = response.data.student;
            setData({
                name: student.userId.name,
                email: student.userId.email,
                course: student.course,
                rollNumber: student.rollNumber
            });
        } catch (error) {
            console.log(error);
            toast.error("Failed to load student data!");
        }
    };

    useEffect(() => {
        getStudent();
    }, [id]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.put(`/admin/update-student/${id}`, data);
            if (response.data.success || response.status === 200) {
                toast.success("Student updated successfully!");
                navigate("/admin/dashboard/manage-students");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update student!");
        }
    };

    return (
        <div className="edit-student-page">
            <div className="edit-student-container">

                <div className="edit-student-header edit-student-anim">
                    <span className="edit-student-tag">ADMIN PANEL</span>
                    <h1>Edit Student</h1>
                    <p className="edit-student-description">
                        Update student information.
                    </p>
                </div>

                <div className="edit-student-card edit-student-anim">
                    <h2>Student Information</h2>

                    <form className="edit-student-form" onSubmit={handleSubmit}>

                        <div className="form-grid-row">
                            <div className="edit-student-field">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Student Name"
                                    value={data.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="edit-student-field">
                                <label>Email</label>
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
                            <div className="edit-student-field">
                                <label>Course</label>
                                <input
                                    type="text"
                                    name="course"
                                    placeholder="Course"
                                    value={data.course}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="edit-student-field">
                                <label>Roll Number</label>
                                <input
                                    type="text"
                                    name="rollNumber"
                                    placeholder="Roll Number"
                                    value={data.rollNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button className="update-student-btn" type="submit">
                            Update Student
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default EditStudents;