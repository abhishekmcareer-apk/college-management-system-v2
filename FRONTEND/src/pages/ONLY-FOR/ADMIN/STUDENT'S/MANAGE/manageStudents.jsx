import "./manageStudents.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../../../../api/api.js";
import Loader from "../../../../../Components/LOADER/Loader.jsx";
import gsap from "gsap";
import toast from "react-hot-toast";

const ManageStudents = () => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [searchText, setSearchText] = useState("");
    const hasAnimated = useRef(false);

    const getStudents = async () => {
        try {
            const response = await api.get("/admin/manage-students");
            setStudents(response.data.student || []);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load students!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    useEffect(() => {
        if (!loading && !hasAnimated.current) {
            hasAnimated.current = true;
            gsap.fromTo(
                ".manage-student-anim",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" }
            );
        }
    }, [loading]);

    const handleSelectStudent = (studentId) => {
        setSelectedStudents((previousSelectedStudents) => {
            if (previousSelectedStudents.includes(studentId)) {
                return previousSelectedStudents.filter(
                    (selectedStudentId) => selectedStudentId !== studentId
                );
            }
            return [...previousSelectedStudents, studentId];
        });
    };

    const handleSelectAll = () => {
        if (selectedStudents.length === students.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(students.map((currentStudent) => currentStudent._id));
        }
    };

    const handleDelete = async (studentId) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            const response = await api.delete(`/admin/delete-student/${studentId}`);
            if (response.data.success) {
                toast.success("Student deleted successfully!");
                setStudents((previousStudents) =>
                    previousStudents.filter(
                        (currentStudent) => currentStudent._id !== studentId
                    )
                );
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete student!");
        }
    };

    const handleDeleteSelected = async () => {
        if (!window.confirm(`Are you sure you want to delete ${selectedStudents.length} selected students?`)) return;

        try {
            const response = await api.delete("/admin/student/multiple-delete", {
                data: { ids: selectedStudents }
            });

            if (response.data.success) {
                toast.success("Selected students deleted successfully!");
                setStudents((previousStudents) =>
                    previousStudents.filter(
                        (currentStudent) => !selectedStudents.includes(currentStudent._id)
                    )
                );
                setSelectedStudents([]);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete selected students!");
        }
    };

    // =========================================================================
    // 🔍 SEARCH FILTER LOGIC (यही वो लॉजिक है)
    // =========================================================================
    const filteredStudents = students.filter((student) => {
        const search = searchText.toLowerCase().trim();
        const name = student.userId?.name?.toLowerCase() || "";
        const email = student.userId?.email?.toLowerCase() || "";
        const course = student.course?.toLowerCase() || "";
        const rollNumber = student.rollNumber?.toLowerCase() || "";

        return (
            name.includes(search) ||
            email.includes(search) ||
            course.includes(search) ||
            rollNumber.includes(search)
        );
    });

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="manage-students-page">
            <div className="manage-students-container">

                {/* Header */}
                <div className="manage-students-header manage-student-anim">
                    <div>
                        <span className="manage-students-tag">ADMIN PANEL</span>
                        <h1>Manage Students</h1>
                        <p className="page-description">
                            View, filter and manage enrolled student directory.
                        </p>
                    </div>

                    <div className="total-students-chip">
                        <span>Total Students</span>
                        <strong>{students.length}</strong>
                    </div>
                </div>

                {/* Search Bar with Cut Button */}
                <div className="students-search-box manage-student-anim">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search student by name, email, course, roll no..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    {searchText && (
                        <button className="clear-search-btn" onClick={() => setSearchText("")}>
                            ✕
                        </button>
                    )}
                </div>

                {/* Card / Table Container */}
                <div className="students-card manage-student-anim">

                    <div className="students-table-header">
                        <div>
                            <h2>Student Roster</h2>
                            <p>Select multiple students for bulk deletion</p>
                        </div>

                        {selectedStudents.length > 0 && (
                            <button
                                className="delete-selected-btn"
                                onClick={handleDeleteSelected}
                            >
                                Delete Selected ({selectedStudents.length})
                            </button>
                        )}
                    </div>

                    {filteredStudents.length === 0 ? (
                        <div className="empty-students">
                            <span className="empty-icon">👨‍🎓</span>
                            <h3>{searchText ? "No Matching Students Found" : "No Students Available"}</h3>
                            <p>{searchText ? "Try searching with a different keyword." : "Students will appear here once they are enrolled."}</p>
                        </div>
                    ) : (
                        <div className="students-table-wrapper">
                            <table className="students-table">
                                <thead>
                                    <tr>
                                        <th className="checkbox-column">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    students.length > 0 &&
                                                    selectedStudents.length === students.length
                                                }
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Course</th>
                                        <th>Roll Number</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredStudents.map((student) => (
                                        <tr key={student._id}>
                                            <td className="checkbox-column">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudents.includes(student._id)}
                                                    onChange={() => handleSelectStudent(student._id)}
                                                />
                                            </td>

                                            <td>
                                                <div className="student-name">
                                                    <div className="student-avatar">
                                                        {student.userId?.name?.charAt(0)?.toUpperCase() || "S"}
                                                    </div>
                                                    <strong>{student.userId?.name}</strong>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="student-email">{student.userId?.email}</span>
                                            </td>

                                            <td>
                                                <span className="course-badge">{student.course}</span>
                                            </td>

                                            <td>
                                                <span className="roll-text">{student.rollNumber}</span>
                                            </td>

                                            <td>
                                                <div className="student-actions">
                                                    <Link
                                                        className="edit-student-btn"
                                                        to={`/admin/dashboard/edit-students/${student._id}`}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        className="delete-student-btn"
                                                        onClick={() => handleDelete(student._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
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

export default ManageStudents;