import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import { logOut } from "../../REDUX/authSlice";
import "./Footer.css";

const Footer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = async () => {
        try {
            await api.get("/auth/logout");
            dispatch(logOut());
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                
                <div className="footer-col">
                    <h3 className="footer-logo">ABC College</h3>
                    <p className="footer-about">
                        Empowering students with quality education, modern research labs, and career opportunities.
                    </p>
                </div>

                <div className="footer-col">
                    <h4 className="footer-title">Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/admission">Admission</Link></li>
                        <li><Link to="/chat">Chat</Link></li>
                        
                        {user ? (
                            <>
                                <li><Link to={user.role === "admin" ? "/admin/dashboard" : user.role === "teacher" ? "/teacher/dashboard" : "/student/dashboard"}>Dashboard</Link></li>
                                <li>
                                    <button onClick={handleLogout} className="footer-logout-btn">
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li><Link to="/login">Portal Login</Link></li>
                        )}
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-title">Contact Us</h4>
                    <p className="footer-info">📍 Knowledge Park, Prayagraj, UP</p>
                    <p className="footer-info">📞 +91 98765 43210</p>
                    <p className="footer-info">✉️ helpdesk@abccollege.edu</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 ABC College. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;