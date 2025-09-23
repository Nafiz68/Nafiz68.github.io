import React, { useEffect, useState, useMemo } from 'react';
import '../styles/Hero.css';

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const roles = useMemo(() => [
    'Software Engineer',
    'CS Undergrad',
    'Problem Solver',
    'Tech Enthusiast'
  ], []);

  useEffect(() => {
    const handleType = () => {
      const currentRole = roles[loopNum % roles.length];
      const updatedText = isDeleting
        ? currentRole.substring(0, text.length - 1)
        : currentRole.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1000);
        setTypingSpeed(50);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  const handleScrollDown = () => {
    const projectsSection = document.getElementById('about');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text animate-fadeInUp">
          <h1>
            <span className="greeting-text">Hi, I'm</span> <span className="name-highlight">Nafiz Khan</span> 
          </h1>
          <div className="typewriter-container">
            <span className="typewriter-text">
              Aspiring <span className="typewriter">{text}</span>
              <span className="cursor">|</span>
            </span>
          </div>
          <p className="hero-description">
            Passionate about creating innovative solutions and learning cutting-edge technologies.
            Always excited to take on new challenges and build amazing projects.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
          </div>
        </div>
        
        <div className="hero-image animate-fadeInUp">
          <div className="profile-container">
            <div className="profile-ring"></div>
            <div className="profile-image">
              <img 
                src="/images/profile-photo.jpg" 
                alt="Nafiz Khan - Software Engineer"
                className="profile-photo"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator" onClick={handleScrollDown}>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
}
