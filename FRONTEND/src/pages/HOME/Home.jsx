import { useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        gsap.fromTo(
            ".hero-anim",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power2.out" }
        );

        gsap.fromTo(
            ".stat-item",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".stats-section",
                    start: "top 85%",
                    once: true
                }
            }
        );

        // 3. Features Cards Animation (ScrollTrigger - Only Once)
        gsap.fromTo(
            ".feature-card",
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".features-grid",
                    start: "top 85%",
                    once: true
                }
            }
        );

        // 4. CTA Box Animation (ScrollTrigger - Only Once)
        gsap.fromTo(
            ".cta-box",
            { scale: 0.95, opacity: 0, y: 30 },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".cta-section",
                    start: "top 85%",
                    once: true
                }
            }
        );

        // Cleanup function for ScrollTrigger instances
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="home-wrapper">

            <section className="hero-section">
                <div className="hero-content">
                    <span className="hero-badge hero-anim">Empowering Future Leaders</span>
                    <h1 className="hero-anim">Welcome to ABC College of Higher Learning</h1>
                    <p className="hero-anim">
                        We provide top-tier education, cutting-edge facilities, and a collaborative
                        environment designed to help students discover their potential and achieve excellence.
                    </p>
                    <div className="hero-actions hero-anim">
                        <Link to="/courses" className="hero-btn primary-btn" onClick={scrollToTop}>
                            Explore Courses
                        </Link>
                        <Link to="/contact" className="hero-btn secondary-btn" onClick={scrollToTop}>
                            Contact Admissions
                        </Link>
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="stats-container">
                    <div className="stat-item">
                        <h3>50+</h3>
                        <p>Specialized Courses</p>
                    </div>
                    <div className="stat-item">
                        <h3>12,000+</h3>
                        <p>Successful Alumni</p>
                    </div>
                    <div className="stat-item">
                        <h3>150+</h3>
                        <p>Expert Faculty</p>
                    </div>
                    <div className="stat-item">
                        <h3>95%</h3>
                        <p>Placement Rate</p>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="section-header">
                    <h2>Why Choose Our College?</h2>
                    <p>Designed to give you the competitive edge in your career and life.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🎓</div>
                        <h3>Certified Programs</h3>
                        <p>Industry-standard curriculum crafted with leading domain experts.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔬</div>
                        <h3>Modern Labs</h3>
                        <p>High-tech laboratories, digital library, and smart classroom setups.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">💼</div>
                        <h3>Placement Drive</h3>
                        <p>Comprehensive career coaching and direct placement drives with Fortune 500 companies.</p>
                    </div>
                </div>
            </section>

            {/* 4. CALL TO ACTION (CTA) */}
            <section className="cta-section">
                <div className="cta-box">
                    <h2>Ready to Build Your Career?</h2>
                    <p>Join thousands of students learning and innovating together.</p>
                    <Link to="/signup" className="cta-btn" onClick={scrollToTop}>
                        Get Started Today
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default Home;