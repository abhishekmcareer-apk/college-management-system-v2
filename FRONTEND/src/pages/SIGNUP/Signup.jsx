import { useState, useEffect } from "react";
import "./SignUp.css";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";

const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        gsap.fromTo(
            ".signup-box",
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
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

        /* Name Check */
        if (!data.name) {
            setError({ ...error, name: "Name is required!" });
            const target = document.getElementsByName("name")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        /* Email Check */
        if (!data.email) {
            setError({ ...error, email: "Email is required!" });
            const target = document.getElementsByName("email")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        /* Password Check */
        if (!data.password) {
            setError({ ...error, password: "Password is required!" });
            const target = document.getElementsByName("password")[0];
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
            target?.focus();
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/auth/signup", data);
            
            if (response.data.success) {
                alert("Account created successfully! Please login.");
                navigate("/login");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup">
            <div className="signup-box">
                <span className="signup-badge">New Student</span>
                <h1>Create Account</h1>
                <p className="signup-subtitle">
                    Register to get access to college portal and courses.
                </p>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder={error.name || "Enter your full name"}
                            value={data.name}
                            onChange={handleChange}
                            className={error.name ? "input-error" : ""}
                        />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder={error.email || "Enter your email"}
                            value={data.email}
                            onChange={handleChange}
                            className={error.email ? "input-error" : ""}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder={error.password || "Create a password"}
                            value={data.password}
                            onChange={handleChange}
                            className={error.password ? "input-error" : ""}
                        />
                    </div>

                    <button className="signup-btn" type="submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Create Account →"}
                    </button>
                </form>

                {/* Switch to Login */}
                <div className="signup-footer">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;