import { useState, useEffect } from "react";
import "./Messages.css";
import api from "../../../../api/api.js";
import { Link } from "react-router-dom";
import gsap from "gsap";
import toast from "react-hot-toast";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        gsap.fromTo(
            ".messages-anim",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
        );
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const res = await api.get("/contact/all");
            if (res.data.success) {
                setMessages(res.data.messages);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;

        try {
            const res = await api.delete(`/contact/delete/${id}`);
            if (res.data.success) {
                toast.success("Message deleted successfully!");
                fetchMessages();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete message!");
        }
    };

    return (
        <div className="messages-page">
            <div className="messages-container">
                
                <div className="messages-header messages-anim">
                    <span className="messages-tag">Portal Inquiries</span>
                    <h1>Student Inquiries</h1>
                    <p>Review and manage messages submitted through the contact form.</p>
                </div>

                <div className="messages-box messages-anim">
                    <h2>Received Messages ({messages.length})</h2>
                    <div className="table-responsive">
                        <table className="messages-table">
                            <thead>
                                <tr>
                                    <th>Sender</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="table-empty-cell">Loading inquiries...</td>
                                    </tr>
                                ) : messages.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="table-empty-cell">No inquiries found.</td>
                                    </tr>
                                ) : (
                                    messages.map((item) => (
                                        <tr key={item._id}>
                                            <td><strong className="sender-name">{item.name}</strong></td>
                                            <td>
                                                <a href={`mailto:${item.email}`} className="email-link">
                                                    {item.email}
                                                </a>
                                            </td>
                                            <td><span className="subject-pill">{item.subject || "General"}</span></td>
                                            <td className="message-content-cell">{item.message}</td>
                                            <td>
                                                <button
                                                    className="message-delete-btn"
                                                    onClick={() => handleDelete(item._id)}
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

export default Messages;