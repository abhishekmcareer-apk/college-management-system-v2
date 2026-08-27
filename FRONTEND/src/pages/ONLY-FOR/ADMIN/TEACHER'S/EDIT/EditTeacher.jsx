import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../../api/api.js";
import "./EditTeacher.css";
import gsap from "gsap";
import toast from "react-hot-toast";

const EditTeacher = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        subject: "",
        qualification: ""
    });

    useEffect(() => {
        gsap.fromTo(
            ".edit-teacher-anim",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
        );
    }, []);

    useEffect(() => {
        const getTeacher = async () => {
            try {
                const response = await api.get(`/admin/edit-teacher/${id}`);
                const teacher = response.data.teacher;

                setData({
                    name: teacher.userId.name,
                    email: teacher.userId.email,
                    subject: teacher.subject,
                    qualification: teacher.qualification
                });
            } catch (error) {
                console.log(error);
                toast.error("Failed to get teacher data!");
            }
        };
        getTeacher();
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
            const response = await api.put(`/admin/update-teacher/${id}`, data);

            if (response.data.success) {
                toast.success("Teacher updated successfully!");
                navigate("/admin/dashboard/manage-teachers");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update teacher!");
        }
    };

    return (
        <div className="edit-teacher-page">
            <div className="edit-teacher-container">

                <div className="edit-teacher-header edit-teacher-anim">
                    <span className="edit-teacher-tag">ADMIN PANEL</span>
                    <h1>Edit Teacher</h1>
                    <p className="edit-teacher-description">
                        Update teacher information.
                    </p>
                </div>

                <div className="edit-teacher-card edit-teacher-anim">
                    <h2>Faculty Information</h2>

                    <form className="edit-teacher-form" onSubmit={handleSubmit}>

                        <div className="form-grid-row">
                            <div className="edit-teacher-field">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Teacher Name"
                                    value={data.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="edit-teacher-field">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={data.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grid-row">
                            <div className="edit-teacher-field">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={data.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="edit-teacher-field">
                                <label>Qualification</label>
                                <input
                                    type="text"
                                    name="qualification"
                                    placeholder="Qualification"
                                    value={data.qualification}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button className="update-teacher-btn" type="submit">
                            Update Teacher
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default EditTeacher;