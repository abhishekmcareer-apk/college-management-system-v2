import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
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
                        <li><Link to="/login">Dashbord</Link></li>
                        <li><Link to="/admission">Admission</Link></li>
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