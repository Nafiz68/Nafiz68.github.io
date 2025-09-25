import React, { useEffect, useRef, useState } from 'react';
import '../styles/Certificates.css';

export default function Certificates() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

const certificates = [
  {
    title: "AI Foundation",
    issuer: "AI Certs",
    date: "2025",
    image: "/images/certificates/AF.jpg",
    description: "Covered core AI concepts, machine learning, ethics, and business applications."
  },
  {
    title: "Intro to Machine Learning",
    issuer: "Kaggle",
    date: "2025",
    image: "/images/certificates/Intro to Machine Learning.png",
    description: "Learned practical data science and machine learning applications."
  },
  {
    title: "Intermediate ChatGPT",
    issuer: "DataCamp",
    date: "2025",
    image: "/images/certificates/ChatGPT.jpg",
    description: "Focused on advanced prompt engineering and understanding GPT architecture."
  },
  {
    title: "Learn Blockchain and Cryptocurrency from Beginning",
    issuer: "Udemy",
    date: "2025",
    image: "/images/certificates/Blockchain.jpg",
    description: "Gained foundational knowledge in blockchain, Bitcoin, crypto exchanges, and DeFi."
  },
  {
    title: "Introduction to Microsoft 365 Copilot",
    issuer: "Microsoft Learn",
    date: "2025",
    image: "/images/certificates/MS365.jpg",
    description: "Learned AI integration in Microsoft productivity tools."
  },
  {
    title: "Intermediate SQL",
    issuer: "DataCamp",
    date: "2024",
    image: "/images/certificates/SQL.jpg",
    description: "Mastered aggregate functions, sorting, grouping, and data presentation in SQL."
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
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
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
                
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}