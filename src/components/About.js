import React, { useState, useEffect } from 'react';
import '../styles/About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, []);

  const handleDownloadCV = () => {
    // Direct download approach
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Nafiz_Khan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  
  return (
    <section id="about" className={`about-section ${isVisible ? 'animate' : ''}`}>
      <div className="container">
        <div className="about-header">
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
        </div>

        <div className="about-content">
          <div className="about-story">
            <div className="story-card">
              <h3>My Story</h3>
              <p>
                My journey in technology began with competitive programming, where I developed strong 
                analytical thinking and algorithm design skills. This foundation led me to explore 
                full-stack development, where I discovered my passion for creating end-to-end solutions.
              </p>
              <p>
                Today, I focus on building scalable web applications, implementing machine learning models, 
                and exploring emerging technologies like blockchain. I thrive on solving complex problems 
                and turning innovative ideas into functional, impactful software solutions.
              </p>
            </div>

            <div className="education-card">
              <h3>Education & Achievements</h3>
              <div className="education-item">
                <div className="education-icon">🎓</div>
                <div className="education-details">
                  <h4>Bachelor of Computer Science and Engineering</h4>
                  <p>BRAC University • 2022-2026</p>
                </div>
              </div>
              
              <div className="achievements">
                <h4>Key Achievements</h4>
                  <ul>
                    <li>🎯 Solved 150+ problems across various competitive programming platforms</li>
                    <li>💻 Developed multiple full-stack web applications with scalable backend and RESTful APIs</li>
                    {/* <li>🔐 Conducted research on adversarial attacks against LLMs, proposing novel defense mechanisms</li> */}
                    <li>📊 Implemented machine learning models for real-world datasets, improving prediction accuracy</li>
                  </ul>

              </div>
            </div>
          </div>

          
          <div className="career-objectives">
            <div className="objectives-card">
              <h3>What I Do</h3>
              <div className="objectives-grid">
                <div className="objective-item">
                  <div className="objective-icon">🌐</div>
                  <h4>Full-Stack Development</h4>
                  <p>Building end-to-end web applications using modern technologies like React, Node.js, and databases</p>
                </div>
                <div className="objective-item">
                  <div className="objective-icon">🔧</div>
                  <h4>Problem Solving</h4>
                  <p>Analyzing complex problems and delivering elegant, efficient solutions</p>
                </div>
                <div className="objective-item">
                  <div className="objective-icon">🤖</div>
                  <h4>Machine Learning & AI</h4>
                  <p>Applying machine learning algorithms and data science techniques to solve real-world problems</p>
                </div>
                <div className="objective-item">
                  <div className="objective-icon">⚡</div>
                  <h4>Competitive Programming</h4>
                  <p>Solving algorithmic challenges and participating in coding competitions to sharpen problem-solving skills</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cv-download">
            <div className="cv-card">
              <h3>Want to know more?</h3>
              <p>Download my complete resume for detailed information about my experience and projects.</p>
              <button 
                className="cv-button" 
                onClick={handleDownloadCV}
                style={{
                  background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '20px'
                }}
              >
                <span className="cv-icon">📄</span>
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;