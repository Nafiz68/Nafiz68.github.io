import React from 'react';
import '../styles/Projects.css';

export default function Projects() {
  const projects = [
    {
      title: "TrackUp",
      description: "A full-featured platform for tracking job applications, AI-powered resume parsing, smart reminders, analytics, and job insights extracted from publicly available listings using NLP.",
      github: "https://github.com/Nafiz68/TrackUp", 
      demo: "https://trackup-job-tracker.vercel.app/",  
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Socket.IO", "Docker"],
      category: "Full Stack",
      status: "Completed",
      duration: "4 months"
    },
    {
      title: "ThesisFlow",
      description: "Developed a web-based platform to streamline thesis submission, progress tracking, and supervision for students and faculty",
      github: "https://github.com/Faishal-Monir/Thesis-Management-System",
      demo: "https://thesis-flow-delta.vercel.app/",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Groq(LLaMA 3.1)"],
      category: "Full Stack",
      status: "Completed",
      duration: "3 months"
    },
    {
      title: "Credenza",
      description: " Client-side, zero-knowledge credential vault utilizing Web Crypto API (PBKDF2 + AES-GCM) for secure local encryption, with an integrated encrypted reconnaissance tracker for managing cybersecurity data and insights.",
      github: "https://github.com/Nafiz68/Credenza",
      demo: "https://credenza-secure-vault.vercel.app/",
      tech: ["Next.js", "React", "Node.js", "Prisma", "PostgreSQL", "Web Crypto API",],
      category: "Full Stack / Cybersecurity",
      status: "Completed",
      duration: "1 month"
    },
    
    {
      title: "Due Diligence Agent",
      description: " AI-powered full-stack system that automates due diligence questionnaires using document indexing, semantic search, and LLM-based answer generation with citations and human review.",
      github: "https://github.com/Nafiz68/Due-Diligence-Agent",
      tech: ["Node.js", "Express", "MongoDB", "Redis", "ChromaDB", "Groq (LLaMA 3.1)", "HuggingFace", "React", "TypeScript"],
      category: "Full Stack / AI",
      status: "Completed",
      duration: "5 months"
    },
    {
      title: "Sweet Shop",
      description: "A full-stack e-commerce platform for a sweet shop with shopping cart, secure payment processing, order tracking, fraud prevention, and admin panel for product management.",
      github: "https://github.com/Nafiz68/sweet-shop-api",
      demo: "https://sweet-shop-api-ivory.vercel.app/",
      tech: ["React.js", "TypeScript", "Vite", "Tailwind CSS", "Supabase (PostgreSQL)"],
      category: "Full Stack",
      status: "Completed",
      duration: "1 month"
    },
    {
      title: "Realtime Collaborative Playlist",
      description: "A real-time collaborative music playlist application with Server-Sent Events (SSE) for live synchronization, drag-and-drop reordering using fractional indexing, voting system, and now playing simulation.",
      github: "https://github.com/Nafiz68/Realtime-Collaborative-Playlist",
      demo: "https://realtime-collaborative-playlist.vercel.app/",
      tech: ["Next.js 16", "React 19", "TypeScript", "Prisma ORM", "SQLite", "Tailwind CSS 4", "Framer Motion"],
      category: "Full Stack",
      status: "Completed",
      duration: "2 months"
    },
    {
      title: " VaDE — Variational Deep Embedding for Face Clustering",
      description: "Deep clustering implementation on Olivetti Faces dataset using Bayesian Deep Clustering Networks (BDCN) with advanced statistical methods.",
      github: "https://github.com/Nafiz68/Variational-Deep-Embedding-VaDE-for-Face-Clustering",
      tech: ["Python", "PyTorch", "Scikit-learn", "NumPy"],
      category: "Machine Learning",
      status: "Completed",
      duration: "2 months"
    },
    {
      title: " DisasterGuard DApp — Blockchain Disaster Recovery Training Platform",
      description: " Built a decentralized application (DApp) for training and awareness in disaster recovery, leveraging blockchain for secure certification and training records.",
      github: "https://github.com/Nafiz68/DisasterGuard-DApp---Blockchain-Disaster-Recovery-Training-Platform",
      tech: ["Solidity", "Ethereum", "Web3.js", "Ganache"],
      category: "Blockchain / Dapp",
      status: "Completed",
      duration: "2 months"
    },
    {
      title: " BlockProperty — Decentralized Property Registry on Hyperledger Fabric",
      description: "Blockchain-based property registry system ensuring transparent, secure, and tamper-proof land ownership records.",
      github: "https://github.com/Nafiz68/BlockProperty---Decentralized-Property-Registry-on-Hyperledger-Fabric",
      tech: [" Hyperledger Fabric", "Node.js", " Docker", "Smart Contracts (Chaincode)"],
      category: "Blockchain",
      status: "Completed",
      duration: "3 months"
    }
    
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="container">
        <div className="projects-header">
          <h2 className="projects-title">Featured Projects</h2>
          <p className="section-subtitle">
            Here are some of my recent projects that showcase my skills and passion for development
          </p>
        </div>
        
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div 
              className={`project-card ${idx % 2 === 1 ? 'reverse' : ''}`}
              key={idx}
            >
              <div className="project-content-panel">
                <div className="project-badges">
                  <span className="badge badge-category">{project.category}</span>
                  <span className="badge badge-status">{project.status || 'Completed'}</span>
                  <span className="badge badge-duration">{project.duration || 'Recent'}</span>
                </div>

                <h3 className="project-title">{project.title.trim()}</h3>
                <p className="project-description">{project.description.trim()}</p>

                <div className="project-tech">
                  {project.tech.map((tech, techIdx) => (
                    <span key={techIdx} className="tech-tag">
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      className="project-link project-link-primary"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Live Link
                      <span className="link-arrow" aria-hidden="true">↗</span>
                    </a>
                  )}
                  <a 
                    href={project.github} 
                    className="project-link"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Code
                  </a>
                </div>
              </div>

              <div className="project-preview-panel">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title.trim()}
                    className="project-preview-image"
                  />
                ) : (
                  <div className="project-placeholder">
                    <div className="placeholder-browser">
                      <div className="placeholder-toolbar">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className="placeholder-content">
                        <div className="placeholder-title"></div>
                        <div className="placeholder-line"></div>
                        <div className="placeholder-line short"></div>
                        <div className="placeholder-grid">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                    <p className="placeholder-text">Project image coming soon</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <a 
            href="https://github.com/Nafiz68"
            className="more-projects-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            View More Projects on GitHub
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
