import { useState, useEffect } from "react";
import "./Login.css";
import api from "../../api/api.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../REDUX/authSlice.js";
import gsap from "gsap";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        gsap.fromTo(
            ".login-box",
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
            const response = await api.post("/auth/login", data);
            const user = response.data.user;

            dispatch(loginSuccess(user));

            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else if (user.role === "teacher") {
                navigate("/teacher/dashboard");
            } else if (user.role === "student") {
                navigate("/student/dashboard");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Invalid credentials!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="login-box">
                <span className="login-badge">Portal Access</span>
                <h1>Welcome Back</h1>
                <p className="login-subtitle">
                    Login with your credentials to access your dashboard.
                </p>

                <form className="login-form" onSubmit={handleSubmit}>
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
                            placeholder={error.password || "Enter your password"}
                            value={data.password}
                            onChange={handleChange}
                            className={error.password ? "input-error" : ""}
                        />
                    </div>

                    <button className="login-btn" type="submit" disabled={loading}>
                        {loading ? "Signing In..." : "Login →"}
                    </button>
                </form>

                {/* Switch to SignUp */}
                <div className="login-footer">
                    <p>New Student? <Link to="/signup">Create an Account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;