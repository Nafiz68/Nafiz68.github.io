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
                I'm a passionate full-stack developer with a love for creating innovative 
                digital solutions. My journey in technology began during my university years, 
                where I discovered the power of code to transform ideas into reality.
              </p>
              <p>
                With a strong foundation in both front-end and back-end technologies, 
                I enjoy building applications that not only function seamlessly but also 
                provide exceptional user experiences. I'm constantly learning and adapting 
                to new technologies to stay at the forefront of web development.
              </p>
            </div>

            <div className="education-card">
              <h3>Education & Achievements</h3>
              <div className="education-item">
                <div className="education-icon">🎓</div>
                <div className="education-details">
                  <h4>Bachelor of Computer Science and Engineering</h4>
                  <p>BRAC University • 2022-2026</p>
                  <p>GPA: 3.63/4.0 </p>
                </div>
              </div>
              
              <div className="achievements">
                <h4>Key Achievements</h4>
                <ul> 
                  <li>🌟 Published research paper on Web Performance</li>
                  <li>💼 Led development team for 3 major projects</li>
                </ul>
              </div>
            </div>
          </div>

        
          <div className="career-objectives">
            <div className="objectives-card">
              <h3>What I Do</h3>
              <div className="objectives-grid">
                <div className="objective-item">
                  <div className="objective-icon">🚀</div>
                  <h4>Web Development</h4>
                  <p>Creating responsive, user-friendly web applications with modern technologies</p>
                </div>
                <div className="objective-item">
                  <div className="objective-icon">⚡</div>
                  <h4>Performance Optimization</h4>
                  <p>Optimizing applications for speed, scalability, and better user experience</p>
                </div>
                <div className="objective-item">
                  <div className="objective-icon">🔧</div>
                  <h4>Problem Solving</h4>
                  <p>Analyzing complex problems and delivering elegant, efficient solutions</p>
                </div>
                <div className="objective-item">
                  <div className="objective-icon">🌐</div>
                  <h4>Full-Stack Solutions</h4>
                  <p>Building complete applications from database design to user interface</p>
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