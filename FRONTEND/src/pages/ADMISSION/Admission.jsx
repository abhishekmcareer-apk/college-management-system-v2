import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Admission.css";
import gsap from "gsap";

const Admissions = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".admissions-head-anim",
                { y: 25, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power2.out" }
            );

            gsap.fromTo(
                ".admissions-card-anim",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="admissions-page" ref={containerRef}>
            
            {/* Hero Header Section */}
            <section className="admissions-hero-section">
                <div className="admissions-hero-container">
                    <span className="admissions-hero-tag admissions-head-anim">Admissions Open</span>
                    <h1 className="admissions-hero-title admissions-head-anim">Begin Your Academic Journey</h1>
                    <p className="admissions-hero-subtitle admissions-head-anim">
                        Join a vibrant community of scholars, innovators, and future leaders. 
                        Follow our streamlined application guide to secure your seat.
                    </p>
                </div>
            </section>

            {/* Admission Process Flow */}
            <section className="admissions-process-section">
                <div className="admissions-content-container">
                    
                    <div className="section-heading-block admissions-head-anim">
                        <h2 className="section-main-title">Admission Process</h2>
                        <p className="section-sub-title">Simple and transparent steps to complete your enrollment.</p>
                    </div>

                    <div className="process-steps-grid">
                        
                        <div className="process-step-card admissions-card-anim">
                            <span className="step-indicator">Step</span>
                            <div className="step-icon-badge">📝</div>
                            <h3 className="step-title">Online Inquiry</h3>
                            <p className="step-details">
                                Submit your preliminary details via our inquiry form or visit the admissions cell.
                            </p>
                        </div>

                        <div className="process-step-card admissions-card-anim">
                            <span className="step-indicator">Step</span>
                            <div className="step-icon-badge">📑</div>
                            <h3 className="step-title">Document Screening</h3>
                            <p className="step-details">
                                Submit academic transcripts, identity proofs, and scorecards for verification.
                            </p>
                        </div>

                        <div className="process-step-card admissions-card-anim">
                            <span className="step-indicator">Step</span>
                            <div className="step-icon-badge">🎯</div>
                            <h3 className="step-title">Counseling & Interview</h3>
                            <p className="step-details">
                                Attend career counseling and an aptitude assessment with our academic panel.
                            </p>
                        </div>

                        <div className="process-step-card admissions-card-anim">
                            <span className="step-indicator">Step</span>
                            <div className="step-icon-badge">🎓</div>
                            <h3 className="step-title">Seat Confirmation</h3>
                            <p className="step-details">
                                Pay the initial semester fee and receive your official admission confirmation letter.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Required Documents & Eligibility */}
            <section className="admissions-docs-section">
                <div className="admissions-content-container">
                    <div className="docs-dual-grid">
                        
                        {/* Documents Checklist */}
                        <div className="docs-info-card admissions-card-anim">
                            <div className="card-header-line">
                                <span className="card-icon-box">📁</span>
                                <div>
                                    <h3 className="docs-card-heading">Required Documents</h3>
                                    <span className="docs-card-sub">Mandatory for verification</span>
                                </div>
                            </div>
                            <ul className="docs-checklist">
                                <li>Original 10th and 12th Grade Marksheets</li>
                                <li>Transfer and Character Certificates</li>
                                <li>Valid Government Identity Proof (Aadhaar / Passport)</li>
                                <li>Recent Passport-sized Color Photographs</li>
                                <li>Graduation Marksheets (Only for PG Programs)</li>
                            </ul>
                        </div>

                        {/* Eligibility & Scholarships */}
                        <div className="docs-info-card admissions-card-anim">
                            <div className="card-header-line">
                                <span className="card-icon-box">🏆</span>
                                <div>
                                    <h3 className="docs-card-heading">Scholarships & Aid</h3>
                                    <span className="docs-card-sub">Merit-based opportunities</span>
                                </div>
                            </div>
                            <ul className="docs-checklist">
                                <li>Merit scholarship for students scoring above 85% in 12th</li>
                                <li>Sports quota fee concessions for state/national players</li>
                                <li>Special financial aid for defense wards and single parents</li>
                                <li>Early application discount on admission processing fees</li>
                                <li>Zero-interest education loan assistance on campus</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* Admissions Support CTA */}
            <section className="admissions-cta-section">
                <div className="admissions-content-container">
                    <div className="admissions-cta-card admissions-card-anim">
                        <h2 className="admissions-cta-title">Ready to Take the Next Step?</h2>
                        <p className="admissions-cta-desc">
                            Connect with our admissions desk to resolve doubts, check eligibility, or schedule a campus visit.
                        </p>
                        <div className="admissions-cta-group">
                            <Link to="/contact" className="admissions-btn primary-btn">Submit Inquiry</Link>
                            <Link to="/courses" className="admissions-btn secondary-btn">Browse Programs</Link>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default Admissions;