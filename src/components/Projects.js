import React from 'react';
import '../styles/Projects.css';

export default function Projects() {
  const projects = [
    {
      title: "Thesis Management System",
      description: "Developed a web-based platform to streamline thesis submission, progress tracking, and supervision for students and faculty",

      github: "https://github.com/Faishal-Monir/Thesis-Management-System",
      demo: "https://github.com/Nafiz68/thesis-management",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      category: "Full Stack"
    },
    {
      title: " VaDE —Variational Deep Embedding for Face Clustering",
      description: "Deep clustering implementation on Olivetti Faces dataset using Bayesian Deep Clustering Networks (BDCN) with advanced statistical methods.",
      github: "https://github.com/Nafiz68/Variational-Deep-Embedding-VaDE-for-Face-Clustering",
      tech: ["Python", "PyTorch", "Scikit-learn", "NumPy"],
      category: "Machine Learning"
    },
    {
      title: "Software-Course-Management-System",
      description: " Web-based platform for managing university courses, allowing administrators to create courses, assign instructors, enroll students, and track academic progress.",
      github: "https://github.com/asiradnan/Software-Course-Management-System",
      demo: "https://github.com/Nafiz68/hospital-management",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      category: "Full Stack"
    },
    {
      title: " DisasterGuard DApp — Blockchain Disaster Recovery Training Platform",
      description: " Built a decentralized application (DApp) for training and awareness in disaster recovery, leveraging blockchain for secure certification and training records.",
      github: "https://github.com/Nafiz68/DisasterGuard-DApp---Blockchain-Disaster-Recovery-Training-Platform",
      tech: ["Solidity", "Ethereum", "Web3.js", "Ganache"],
      category: "Blockchain / Dapp"
    },
    {
      title: " The Science of Cinema: Predicting Movie Ratings",
      description: "Implemented machine learning models to predict movie ratings based on various features, analyzing data from multiple sources.",
      github: "https://github.com/Nafiz68/The-Science-of-Cinema-Predicting-Movie-Ratings-Through-Data",
      tech: ["Python", "Pandas", "Scikit-learn", "NumPy"],
      category: "Machine Learning"
    },
    {
      title: " BlockProperty — Decentralized Property Registry on Hyperledger Fabric",
      description: "Blockchain-based property registry system ensuring transparent, secure, and tamper-proof land ownership records.",
      github: "https://github.com/Nafiz68/BlockProperty---Decentralized-Property-Registry-on-Hyperledger-Fabric",
      tech: [" Hyperledger Fabric", "Node.js", " Docker", "Smart Contracts (Chaincode)"],
      category: "Blockchain"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2>Featured Projects</h2>
        <p className="section-subtitle">
          Here are some of my recent projects that showcase my skills and passion for development
        </p>
        
        <div className="projects-grid grid grid-2">
          {projects.map((project, idx) => (
            <div className="project-card card animate-fadeInUp" key={idx} style={{animationDelay: `${idx * 0.2}s`}}>
              <div className="project-header">
                <div className="project-category">{project.category}</div>
                <div className="project-number">0{idx + 1}</div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, techIdx) => (
                    <span key={techIdx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="project-links">
                <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                {project.demo && (
                  <a href={project.demo} className="project-link project-link-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
