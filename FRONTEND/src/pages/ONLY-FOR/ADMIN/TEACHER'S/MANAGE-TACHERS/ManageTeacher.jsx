import { useEffect, useState, useRef } from "react";
import "./ManageTeachers.css";
import { Link } from "react-router-dom";
import api from "../../../../../api/api.js";
import Loader from "../../../../../Components/LOADER/Loader.jsx";
import gsap from "gsap";
import toast from "react-hot-toast";

const ManageTeachers = () => {
    const [loading, setLoading] = useState(true);
    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState("");
    const hasAnimated = useRef(false);

    const getTeachers = async () => {
        try {
            const res = await api.get("/admin/manage-teachers");
            setTeachers(res.data.teachers || []);
        } catch (err) {
            toast.error("Failed to load faculty directory!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTeachers();
    }, []);

    useEffect(() => {
        if (!loading && !hasAnimated.current) {
            hasAnimated.current = true;
            gsap.fromTo(
                ".manage-teachers-anim",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" }
            );
        }
    }, [loading]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this faculty member?")) return;

        try {
            const res = await api.delete(`/admin/delete-teacher/${id}`);
            if (res.data.success) {
                toast.success("Faculty record deleted!");
                setTeachers((prev) => prev.filter((item) => item._id !== id));
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete!");
        }
    };

    const filtered = teachers.filter((t) => {
        const query = search.toLowerCase().trim();
        const name = t.userId?.name?.toLowerCase() || "";
        const email = t.userId?.email?.toLowerCase() || "";
        const subject = t.subject?.toLowerCase() || "";
        return name.includes(query) || email.includes(query) || subject.includes(query);
    });

    if (loading) return <Loader />;

    return (
        <div className="teachers-panel">
            <div className="teachers-panel__wrap">
                
                {/* Header */}
                <div className="teachers-panel__header manage-teachers-anim">
                    <div>
                        <span className="teachers-panel__pill">Faculty Records</span>
                        <h1 className="teachers-panel__heading">Manage Teachers</h1>
                        <p className="teachers-panel__subtext">Overview, timetable allocations, and account access.</p>
                    </div>

                    <div className="teachers-panel__count-chip">
                        <span>Total Active</span>
                        <strong>{teachers.length}</strong>
                    </div>
                </div>

                {/* Search Field */}
                <div className="teachers-panel__search manage-teachers-anim">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by name, email, or department..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button className="clear-search" onClick={() => setSearch("")}>✕</button>
                    )}
                </div>

                {/* Cards Grid */}
                {filtered.length === 0 ? (
                    <div className="teachers-panel__empty manage-teachers-anim">
                        <span className="empty-emoji">👨‍🏫</span>
                        <h3>{search ? "No faculty found" : "No records available"}</h3>
                        <p>{search ? "Try searching with a different name or keyword." : "Add a new teacher to see them here."}</p>
                    </div>
                ) : (
                    <div className="teachers-panel__grid manage-teachers-anim">
                        {filtered.map((teacher) => (
                            <div className="teacher-card-item" key={teacher._id}>
                                
                                <div className="card-header">
                                    <div className="avatar-box">
                                        {teacher.userId?.name?.charAt(0)?.toUpperCase() || "T"}
                                    </div>
                                    <div className="title-box">
                                        <h3>{teacher.userId?.name || "Faculty Member"}</h3>
                                        <p>{teacher.userId?.email || "No email"}</p>
                                    </div>
                                    <span className="badge-role">{teacher.userId?.role || "Teacher"}</span>
                                </div>

                                <div className="card-specs">
                                    <div className="spec-row">
                                        <span className="spec-label">Assigned Subject:</span>
                                        <span className="spec-val">{teacher.subject || "Not assigned"}</span>
                                    </div>
                                    <div className="spec-row">
                                        <span className="spec-label">Qualification:</span>
                                        <span className="spec-val">{teacher.qualification || "Not provided"}</span>
                                    </div>
                                </div>

                                <div className="card-actions-bar">
                                    <Link
                                        to={`/admin/dashboard/teacher-schedule/${teacher._id}`}
                                        className="btn-action btn-schedule"
                                    >
                                        📅 Timetable
                                    </Link>
                                    <Link
                                        to={`/admin/dashboard/edit-teacher/${teacher._id}`}
                                        className="btn-action btn-edit"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(teacher._id)}
                                        className="btn-action btn-delete"
                                    >
                                        Delete
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

export default ManageTeachers;