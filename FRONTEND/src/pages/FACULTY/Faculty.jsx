import "./Faculty.css";

const Faculty = () => {
    return (
        <div className="faculty">

            <div className="faculty-header">

                <h1>Our Faculty</h1>

                <p>
                    Meet our experienced and dedicated faculty members who are
                    committed to providing quality education and guiding
                    students toward academic excellence.
                </p>

            </div>

            <div className="faculty-container">

                <div className="faculty-card">

                    <div className="faculty-image">
                        <img
                            src="https://placehold.co/300x300"
                            alt="Faculty"
                        />
                    </div>

                    <h3>Dr. Rahul Sharma</h3>

                    <span>Head of Computer Science</span>

                    <p>
                        Ph.D. in Computer Science with more than 12 years of
                        teaching experience.
                    </p>

                </div>

                <div className="faculty-card">

                    <div className="faculty-image">
                        <img
                            src="https://placehold.co/300x300"
                            alt="Faculty"
                        />
                    </div>

                    <h3>Prof. Anjali Verma</h3>

                    <span>Assistant Professor</span>

                    <p>
                        Specializes in Web Development, Database Systems, and
                        Software Engineering.
                    </p>

                </div>

                <div className="faculty-card">

                    <div className="faculty-image">
                        <img
                            src="https://placehold.co/300x300"
                            alt="Faculty"
                        />
                    </div>

                    <h3>Dr. Amit Singh</h3>

                    <span>Professor</span>

                    <p>
                        Research interests include Artificial Intelligence and
                        Machine Learning.
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Faculty;