import { useEffect, useState, useRef } from "react";
import "./Contact.css";
import api from "../../api/api";
import gsap from "gsap";

const Contact = () => {
    const containerRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "Admission Inquiry",
        message: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: ""
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".contact-title-anim",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
            );

            gsap.fromTo(
                ".contact-item-anim",
                { y: 25, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (e.target.name === "name") {
            setErrors({ ...errors, name: "" });
        }
        if (e.target.name === "email") {
            setErrors({ ...errors, email: "" });
        }
        if (e.target.name === "message") {
            setErrors({ ...errors, message: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            setErrors({ ...errors, name: "Name is required!" });
            const target = document.getElementsByName("name")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        if (!formData.email) {
            setErrors({ ...errors, email: "Email is required!" });
            const target = document.getElementsByName("email")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        if (!formData.message) {
            setErrors({ ...errors, message: "Message is required!" });
            const target = document.getElementsByName("message")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        try {
            const res = await api.post("/contact/send", formData);
            if (res.data.success) {
                alert("Message sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "Admission Inquiry",
                    message: ""
                });
                setErrors({ name: "", email: "", message: "" });
            }
        } catch (error) {
            alert(error.response?.data?.message || "Failed to send message");
        }
    };

    return (
        <div className="contact-main" ref={containerRef}>
            <div className="contact-wrapper">
                
                {/* Header Area */}
                <div className="contact-header">
                    <span className="contact-tag contact-title-anim">Help & Support</span>
                    <h1 className="contact-title-anim">Let’s Start a Conversation</h1>
                    <p className="contact-title-anim">
                        Have queries about admissions, campus visits, or academic programs? We are here to help.
                    </p>
                </div>

                {/* Quick Info Grid */}
                <div className="info-cards">
                    <div className="info-card contact-item-anim">
                        <div className="info-icon">📞</div>
                        <div className="info-text">
                            <span>Direct Helpline</span>
                            <h4>+91 98765 43210</h4>
                        </div>
                    </div>

                    <div className="info-card contact-item-anim">
                        <div className="info-icon">✉️</div>
                        <div className="info-text">
                            <span>Official Email</span>
                            <h4>helpdesk@abccollege.edu</h4>
                        </div>
                    </div>

                    <div className="info-card contact-item-anim">
                        <div className="info-icon">📍</div>
                        <div className="info-text">
                            <span>Campus Location</span>
                            <h4>Knowledge Park, Prayagraj</h4>
                        </div>
                    </div>
                </div>

                {/* Main Interaction Layout */}
                <div className="contact-content">
                    
                    {/* Left Details Sidebar */}
                    <div className="contact-sidebar contact-item-anim">
                        <div className="timing-box">
                            <h3>Operating Hours</h3>
                            <div className="timing-row">
                                <span>Mon – Fri:</span>
                                <strong>09:00 AM – 05:00 PM</strong>
                            </div>
                            <div className="timing-row">
                                <span>Saturday:</span>
                                <strong>09:00 AM – 02:00 PM</strong>
                            </div>
                            <div className="timing-row">
                                <span>Sunday:</span>
                                <strong>Closed (Campus Off)</strong>
                            </div>
                        </div>

                        <div className="notice-box">
                            <h4>Campus Visit Note</h4>
                            <p>
                                If you want to visit the campus, please contact us beforehand so our team can guide you properly.
                            </p>
                        </div>
                    </div>

                    {/* Right Form Container */}
                    <div className="contact-form-box contact-item-anim">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <h2>Send Us an Inquiry</h2>
                            <p className="form-desc">Fill out the details below and we will get in touch.</p>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={errors.name || "Enter Your Name"}
                                        className={errors.name ? "input-error" : ""}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={errors.email || "Enter Your Email"}
                                        className={errors.email ? "input-error" : ""}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Contact Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter Your Phone (Optional)"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Subject</label>
                                    <select name="subject" value={formData.subject} onChange={handleChange}>
                                        <option value="Admission Inquiry">Admission Inquiry</option>
                                        <option value="Course & Syllabus">Course & Syllabus</option>
                                        <option value="Fee Structure">Fee Structure</option>
                                        <option value="Campus Tour">Campus Tour</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Your Message *</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={errors.message || "Write your message here..."}
                                    className={errors.message ? "input-error" : ""}
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn">
                                Submit Inquiry →
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Contact;