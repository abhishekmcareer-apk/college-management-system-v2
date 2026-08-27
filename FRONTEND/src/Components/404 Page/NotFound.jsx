import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";
import gsap from "gsap";

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        gsap.fromTo(
            ".notfound-anim",
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
        );
    }, []);

    return (
        <div className="notfound-page">
            <div className="notfound-container">

                <div className="notfound-tag notfound-anim">
                    404 ERROR
                </div>

                <div className="notfound-glitch-code notfound-anim">
                    404
                </div>

                <h1 className="notfound-title notfound-anim">
                    Page Not Found
                </h1>

                <p className="notfound-description notfound-anim">
                    The page or academic portal you are looking for does not exist, has been moved, or you don't have access permissions.
                </p>

                <div className="notfound-actions notfound-anim">
                    <button
                        className="btn-back"
                        onClick={() => navigate(-1)}
                    >
                        ← Go Back
                    </button>

                    <Link to="/" className="btn-home">
                        Home Page
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NotFound;