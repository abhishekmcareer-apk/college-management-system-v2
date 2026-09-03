import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { logOut } from "../../REDUX/authSlice";
import gsap from "gsap";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        gsap.fromTo(
            ".nav-links li",
            { y: -15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.08 }
        );
    }, []);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                ".mobile-drawer a, .mobile-drawer button",
                { y: -10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.25, stagger: 0.04, ease: "power2.out" }
            );
        }
    }, [isOpen]);

    const handleLogout = async () => {
        try {
            setIsOpen(false);
            await api.get("/auth/logout");
            dispatch(logOut());
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    const handleDashboard = () => {
        setIsOpen(false);
        if (user.role === "admin") {
            navigate("/admin/dashboard");
        } else if (user.role === "teacher") {
            navigate("/teacher/dashboard");
        } else if (user.role === "student") {
            navigate("/student/dashboard");
        }
    };

    return (
        <nav className="site-navbar">
            <div className="nav-container">
                {/* Brand Logo */}
                <div className="brand-logo">
                    <Link to="/">
                        <h2>ABC College</h2>
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/admission">Admission</Link></li>
                    <li><Link to="/chat">Chat</Link></li>

                    {!user ? (
                        <li>
                            <Link to="/login" className="nav-login-btn">
                                Portal Login
                            </Link>
                        </li>
                    ) : (
                        <li className="user-menu-item">
                            <button className="user-menu-btn">
                                {user.name} ▾
                            </button>
                            <div className="user-dropdown">
                                <div className="dropdown-user-info">
                                    <span>Logged in as</span>
                                    <strong>{user.name}</strong>
                                </div>
                                <button onClick={handleDashboard}>Dashboard</button>
                                <button onClick={handleLogout} className="user-logout-btn">Logout</button>
                            </div>
                        </li>
                    )}
                </ul>

                {/* Mobile Menu Button */}
                <button className="menu-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="mobile-drawer">
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
                    <Link to="/courses" onClick={() => setIsOpen(false)}>Courses</Link>
                    <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
                    <Link to="/admission" onClick={()=>setIsOpen(false)}>Admission</Link>
                    <Link to="/chat" onClick={()=>setIsOpen(false)}>Chat</Link>

                    {!user ? (
                        <div className="mobile-auth-wrap">
                            <Link to="/login" onClick={() => setIsOpen(false)} className="nav-login-btn">
                                Portal Login
                            </Link>
                        </div>
                    ) : (
                        <div className="mobile-user-wrap">
                            <p className="mobile-user-label">
                                Logged in as: <strong>{user.name}</strong>
                            </p>
                            <button onClick={handleDashboard} className="mobile-action-btn">
                                Dashboard
                            </button>
                            <button onClick={handleLogout} className="mobile-action-btn mobile-logout-btn">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;