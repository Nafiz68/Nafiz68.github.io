import React, { useEffect, useRef, useState } from 'react';
import '../styles/Certificates.css';

export default function Certificates() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const certificates = [
    {
      title: "Intro to Machine Learning",
      issuer: "Kaggle",
      date: "2025",
      image: "/images/certificates/Intro to Machine Learning.png",
      description: "Comprehensive certification covering cloud architecture, security, and best practices for AWS services.",
      skills: ["Machine Learning", "Kaggle", "AI", "Python"]
    },
    {
      title: "React Developer Certification",
      issuer: "Meta (Facebook)",
      date: "2024",
      image: "/images/certificates/react-cert.jpg",
      description: "Advanced React development certification covering hooks, state management, and modern React patterns.",
      skills: ["React", "JavaScript", "Frontend", "State Management"]
    },
    {
      title: "Python for Data Science",
      issuer: "IBM",
      date: "2023",
      image: "/images/certificates/python-cert.jpg",
      description: "Comprehensive Python certification focusing on data analysis, machine learning, and data visualization.",
      
      skills: ["Python", "Data Science", "Machine Learning", "Pandas"]
    },
    {
      title: "Google Cloud Professional",
      issuer: "Google Cloud",
      date: "2023",
      image: "/images/certificates/gcp-cert.jpg",
      description: "Professional cloud architect certification covering GCP services, deployment, and cloud solutions.",
      
      skills: ["Google Cloud", "Cloud Computing", "Kubernetes", "DevOps"]
    },
    {
      title: "Full Stack Web Development",
      issuer: "FreeCodeCamp",
      date: "2023",
      image: "/images/certificates/fullstack-cert.jpg",
      description: "Complete full-stack development certification covering front-end, back-end, and database technologies.",
     
      skills: ["Full Stack", "Node.js", "MongoDB", "Express.js"]
    },
    {
      title: "Machine Learning Specialization",
      issuer: "Stanford University",
      date: "2022",
      image: "/images/certificates/ml-cert.jpg",
      description: "Advanced machine learning specialization covering algorithms, neural networks, and deep learning.",
  
      skills: ["Machine Learning", "Neural Networks", "TensorFlow", "AI"]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="certificates" className="certificates-section" ref={sectionRef}>
      <div className="container">
        <h2>Certifications & Achievements</h2>
        <p className="section-subtitle">
          Professional certifications and achievements that showcase my commitment to continuous learning and expertise
        </p>

        <div className="certificates-grid">
          {certificates.map((cert, idx) => (
            <div 
              key={idx} 
              className={`certificate-card animate-fadeInUp ${isVisible ? 'visible' : ''}`}
              style={{animationDelay: `${idx * 0.15}s`}}
            >
              <div className="certificate-image">
                <img 
                  src={cert.image} 
                  alt={`${cert.title} Certificate`}
                  className="cert-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="cert-placeholder" style={{display: 'none'}}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>Certificate</span>
                </div>
              </div>
              
              <div className="certificate-content">
                <div className="certificate-header">
                  <h3 className="certificate-title">{cert.title}</h3>
                  <span className="certificate-date">{cert.date}</span>
                </div>
                
                <p className="certificate-issuer">{cert.issuer}</p>
                <p className="certificate-description">{cert.description}</p>
                
                <div className="certificate-skills">
                  {cert.skills.map((skill, skillIdx) => (
                    <span key={skillIdx} className="cert-skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}