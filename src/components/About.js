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
    // Create a download link for CV
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // You'll need to add your resume.pdf to the public folder
    link.download = 'CV_Nafiz_Khan_BSc_CSE.pdf';
    link.click();
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
                I'm a passionate Computer Science and Engineering student at BRAC University 
                with a strong foundation in software development and problem-solving. My journey 
                in technology started with competitive programming, where I honed my analytical 
                thinking and algorithm design skills.
              </p>
              <p>
                With experience in full-stack development, machine learning, and mobile app development,
                I enjoy creating innovative solutions that make a real impact. I'm always eager to learn 
                new technologies and take on challenging projects that push the boundaries of what's possible.
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
              <button className="cv-button" onClick={handleDownloadCV}>
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