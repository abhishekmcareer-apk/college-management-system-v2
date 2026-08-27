import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
    return (
        <main className="about-page">
            
            {/* Hero Header Section */}
            <section className="about-hero-section">
                <div className="about-hero-container">
                    <span className="about-hero-tag">Our Legacy & Mission</span>
                    <h1 className="about-hero-title">Shaping Futures Since 1998</h1>
                    <p className="about-hero-subtitle">
                        ABC College of Higher Education is dedicated to fostering academic brilliance, 
                        innovative research, and ethical leadership in a dynamic learning environment.
                    </p>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section className="vision-mission-section">
                <div className="about-content-container">
                    <div className="vision-mission-grid">
                        
                        {/* Vision Card */}
                        <article className="vision-card">
                            <div className="card-icon-wrapper">🎯</div>
                            <h2 className="card-heading">Our Vision</h2>
                            <p className="card-description">
                                To emerge as a globally recognized center of excellence in higher education, 
                                driving technological innovation and empowering students to lead positive global change.
                            </p>
                        </article>

                        {/* Mission Card */}
                        <article className="mission-card">
                            <div className="card-icon-wrapper">🚀</div>
                            <h2 className="card-heading">Our Mission</h2>
                            <p className="card-description">
                                Providing quality education through modern infrastructure, rigorous research opportunities, 
                                and holistic development that bridges academic learning with real-world industry demands.
                            </p>
                        </article>

                    </div>
                </div>
            </section>

            {/* Principal / Leadership Message Section */}
            <section className="principal-message-section">
                <div className="about-content-container">
                    <div className="principal-card">
                        
                        <div className="principal-avatar-wrapper">
                            <span className="principal-avatar-icon">👨‍🏫</span>
                        </div>

                        <div className="principal-content">
                            <span className="principal-label">Principal's Message</span>
                            <blockquote className="principal-quote">
                                "Education is the most powerful tool to transform society."
                            </blockquote>
                            <p className="principal-statement">
                                At ABC College, we believe that education extends far beyond textbooks. We nurture curiosity, 
                                critical thinking, and character to prepare our students for real-world global challenges.
                            </p>
                            <div className="principal-signature">
                                <h3 className="principal-name">Dr. Rajesh Sharma</h3>
                                <span className="principal-designation">Ph.D., Principal & Director</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Core Pillars Section */}
            <section className="core-pillars-section">
                <div className="about-content-container">
                    
                    <div className="section-header-block">
                        <h2 className="section-main-heading">Our Core Pillars</h2>
                        <p className="section-sub-heading">The guiding values behind our 25+ years of academic success.</p>
                    </div>

                    <div className="pillars-grid">
                        
                        <div className="pillar-card">
                            <span className="pillar-badge">Pillar</span>
                            <h3 className="pillar-title">Academic Rigor</h3>
                            <p className="pillar-details">Curriculums aligned with top industry benchmarks and accredited standards.</p>
                        </div>

                        <div className="pillar-card">
                            <span className="pillar-badge">Pillar</span>
                            <h3 className="pillar-title">Global Exposure</h3>
                            <p className="pillar-details">Collaborations with international universities for research and exchange programs.</p>
                        </div>

                        <div className="pillar-card">
                            <span className="pillar-badge">Pillar</span>
                            <h3 className="pillar-title">Ethical Leadership</h3>
                            <p className="pillar-details">Instilling social responsibility, integrity, and discipline in every graduate.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Bottom Call To Action */}
            <section className="about-cta-section">
                <div className="about-content-container">
                    <div className="about-cta-card">
                        <h2 className="cta-title">Want to be a part of our campus?</h2>
                        <p className="cta-description">Explore our wide range of undergraduate and postgraduate programs.</p>
                        <div className="cta-actions-group">
                            <Link to="/courses" className="cta-action-btn primary-action">View Courses</Link>
                            <Link to="/contact" className="cta-action-btn secondary-action">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default About;