import React from 'react';
import '../styles/Projects.css';

export default function Projects() {
  const projects = [
    {
      title: "Thesis Management System",
      description: "AI-powered chatbot to guide students through thesis submission process with intelligent recommendations and real-time assistance.",
      github: "https://github.com/your-repo",
      demo: "#",
      tech: ["React", "Node.js", "OpenAI", "MongoDB"],
      category: "Full Stack"
    },
    {
      title: "Bayesian Clustering Project",
      description: "Deep clustering implementation on Olivetti Faces dataset using Bayesian Deep Clustering Networks (BDCN) with advanced statistical methods.",
      github: "https://github.com/your-repo",
      demo: "#",
      tech: ["Python", "TensorFlow", "Scikit-learn", "NumPy"],
      category: "Machine Learning"
    },
    {
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website built with React featuring smooth animations, glassmorphism design, and interactive elements.",
      github: "https://github.com/your-repo",
      demo: "#",
      tech: ["React", "CSS3", "JavaScript", "Responsive Design"],
      category: "Web Development"
    },
    {
      title: "Task Management App",
      description: "Full-stack task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      github: "https://github.com/your-repo",
      demo: "#",
      tech: ["React", "Express.js", "Socket.io", "PostgreSQL"],
      category: "Full Stack"
    },
    {
      title: "Task Management App",
      description: "Full-stack task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      github: "https://github.com/your-repo",
      demo: "#",
      tech: ["React", "Express.js", "Socket.io", "PostgreSQL"],
      category: "Full Stack"
    },
    {
      title: "Task Management App",
      description: "Full-stack task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      github: "https://github.com/your-repo",
      demo: "#",
      tech: ["React", "Express.js", "Socket.io", "PostgreSQL"],
      category: "Full Stack"
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
                <a href={project.demo} className="project-link project-link-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
