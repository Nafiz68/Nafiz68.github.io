import React, { useState, useEffect } from 'react';
import '../styles/Experience.css';

const Experience = () => {
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

    const experienceSection = document.querySelector('#experience');
    if (experienceSection) {
      observer.observe(experienceSection);
    }

    return () => {
      if (experienceSection) {
        observer.unobserve(experienceSection);
      }
    };
  }, []);

  const experiences = [
    {
      id: 1,
      position: "IT Instructor",
      company: "Zentorra",
      location: "Dhaka, Bangladesh",
      duration: "Feb 2025 – Jul 2025",
      type: "Teaching",
      responsibilities: [
        "Delivered recorded classes on Python fundamentals and project-based learning for beginner-level students.",
        "Created comprehensive learning materials and practical coding exercises.",
        "Mentored students through hands-on programming projects and real-world applications."
      ],
      icon: "🎓",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      position: "Private Tutor",
      company: "Self-Employed",
      location: "Dhaka, Bangladesh", 
      duration: "Jan 2024 – Apr 2025",
      type: "Tutoring",
      responsibilities: [
        "Tutored undergraduates in Python Data Structures and Computer Graphics.",
        "Specialized in teaching complex concepts like recursion and tree data structures.",
        "Provided hands-on guidance with OpenGL programming and graphics rendering.",
        "Offered comprehensive academic support and exam preparation."
      ],
      icon: "💻",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      position: "Undergraduate Researcher",
      company: "BRAC University – CSE Department",
      location: "Dhaka, Bangladesh",
      duration: "Jan 2025 – Jan 2026",
      type: "Research / AI & ML",
      responsibilities: [
        "Developed an anchor-guided weight repair mechanism to stabilize compromised pretrained language models.",
        "Enhanced model robustness against quantization and weight noise attacks without retraining.",
        "Documented methodology and results for potential publication and academic presentations."
      ],
      icon: "🔬",
      color: "linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)"
    }

  ];

  return (
    <section id="experience" className={`experience-section ${isVisible ? 'animate' : ''}`}>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="container">
        <div className="experience-header">
          <h2 className="section-title">Professional Experience</h2>
          <div className="title-underline"></div>
          
        </div>

        <div className="experience-timeline">
          <div className="timeline-line"></div>
          
          {experiences.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`experience-item ${index % 2 === 0 ? 'left' : 'right'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="timeline-marker">
                <div className="marker-icon" style={{ background: exp.color }}>
                  {exp.icon}
                </div>
              </div>
              
              <div className="experience-card">
                <div className="card-header">
                  <div className="position-info">
                    <h3 className="position-title">{exp.position}</h3>
                    <div className="company-info">
                      <span className="company-name">{exp.company}</span>
                      <span className="location">{exp.location}</span>
                    </div>
                  </div>
                  <div className="duration-badge">
                    <span className="duration">{exp.duration}</span>
                    <span className="type-tag">{exp.type}</span>
                  </div>
                </div>
                
                <div className="card-content">
                  <ul className="responsibilities">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="responsibility-item">
                        <span className="bullet">▶</span>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>

                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;