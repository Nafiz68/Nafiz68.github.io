import React, { useEffect, useRef, useState } from 'react';
import '../styles/Skills.css';

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  // const skillCategories = [
  //   {
  //     category: "Programming Languages",
  //     skills: [
  //       { name: "Python", level: 90, icon: "🐍" },
  //       { name: "C", level: 65, icon: "⚙️" },
  //       { name: "JavaScript", level: 77, icon: "🟨" },
  //       { name: "HTML", level: 82, icon: "🎨" },
  //       { name: "CSS", level: 78, icon: "🌐" },
  //     ]
  //   },
  //   {
  //     category: "Frameworks & Technologies",
  //     skills: [
  //       { name: "React", level: 69, icon: "⚛️" },
  //       { name: "Node.js", level: 66, icon: "🟢" },
  //       { name: "Express.js", level: 63, icon: "⚡" },
  //       { name: "Next.js", level: 79, icon: "▲" },
  //       { name: "Tailwind CSS", level: 55, icon: "🎯" }
  //     ]
  //   },
  //   {
  //     category: "Databases & Tools",
  //     skills: [
  //       { name: "MySQL", level: 84, icon: "🗄️" },
  //       { name: "MongoDB", level: 82, icon: "🍃" },
  //       { name: "Git/GitHub", level: 89, icon: "🐙" },
  //       { name: "VS Code", level: 93, icon: "💻" },
  //       { name: "n8n", level: 67, icon: "⚙️" },
  //     ]
  //   },
  //   {
  //     category: "Specialized Areas",
  //     skills: [
  //       { name: "Machine Learning", level: 63, icon: "🤖" },
  //       { name: "Teaching/Tutoring", level: 81, icon: "👨‍🏫" },
  //       { name: "Workflow Automation", level: 65, icon: "🔄" },
  //       { name: "AI Security / LLM Research", level: 85, icon: "🔐" },
  //       { name: "Web Development", level: 90, icon: "🌐" }
  //     ]
  //   }
  // ];
  const skillCategories = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", level: 90, icon: "🐍" },
      { name: "JavaScript", level: 85, icon: "🟨" },
      { name: "C", level: 65, icon: "⚙️" },
      { name: "Solidity", level: 55, icon: "🔗" },
      { name: "SQL", level: 70, icon: "🗄️" }
    ]
  },
  {
    category: "Frameworks & Technologies",
    skills: [
      { name: "React", level: 82, icon: "⚛️" },
      { name: "Next.js", level: 84, icon: "▲" },
      { name: "Node.js", level: 78, icon: "🟢" },
      { name: "Express.js", level: 75, icon: "⚡" },
      { name: "PyTorch", level: 76, icon: "🔥" }
    ]
  },
  {
    category: "Databases & Tools",
    skills: [
      { name: "MongoDB", level: 84, icon: "🍃" },
      { name: "MySQL", level: 72, icon: "🗄️" },
      { name: "Git/GitHub", level: 91, icon: "🐙" },
      { name: "Docker", level: 62, icon: "🐳" },
      { name: "n8n", level: 55, icon: "🔧" }
    ]
  },
  {
    category: "Specialized Areas",
    skills: [
      { name: "Web Development", level: 92, icon: "🌐" },
      { name: "Machine Learning", level: 70, icon: "🤖" },
      { name: "AI Security / LLM Research", level: 87, icon: "🔐" },
      { name: "Blockchain Development", level: 78, icon: "⛓️" },
      { name: "Workflow Automation", level: 72, icon: "🔄" }
    ]
  }
];


  useEffect(() => {
    // Check if device is mobile for better animation handling
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay for mobile devices to ensure smooth animation
          setTimeout(() => {
            setIsVisible(true);
          }, isMobile ? 200 : 0);
        }
      },
      { 
        threshold: isMobile ? 0.1 : 0.2, // Lower threshold for mobile
        rootMargin: isMobile ? '100px' : '50px' // Larger root margin for mobile
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="container">
        <h2>Skills & Expertise</h2>
        <p className="section-subtitle">
          Technologies and tools I work with to bring ideas to life
        </p>

        <div className="skills-categories">
          {skillCategories.map((category, categoryIdx) => (
            <div 
              key={categoryIdx} 
              className={`skill-category animate-fadeInUp ${isVisible ? 'visible' : ''}`}
              style={{animationDelay: `${categoryIdx * 0.2}s`}}
            >
              <h3 className="category-title">{category.category}</h3>
              
              <div className="skills-grid">
                {category.skills.map((skill, skillIdx) => (
                  <div 
                    key={skillIdx} 
                    className="skill-item"
                    style={{animationDelay: `${(categoryIdx * 0.2) + (skillIdx * 0.1)}s`}}
                  >
                    <div className="skill-header">
                      <div className="skill-info">
                        <span className="skill-icon">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${(categoryIdx * 0.2) + (skillIdx * 0.1)}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Circular Skills */}
        <div className="circular-skills">
          <h3>Core Competencies</h3>
          <div className="circular-skills-grid">
            {[
              { name: "Problem Solving", percentage: 95, color: "#667eea" },
              { name: "Team Work", percentage: 90, color: "#61da5fff" },
              { name: "Communication", percentage: 88, color: "#f5576c" },
              { name: "Analytical Thinking", percentage: 93, color: "#683cc7ff" },
              { name: "Continuous Learning", percentage: 91, color: "#4ecdc4" }
            ].map((skill, idx) => (
              <div 
                key={idx} 
                className={`circular-skill animate-fadeInUp ${isVisible ? 'visible' : ''}`}
                style={{animationDelay: `${1 + (idx * 0.1)}s`}}
              >
                <div className="circular-progress">
                  <svg className="progress-ring" width="120" height="120">
                    <circle
                      className="progress-ring-circle-bg"
                      cx="60"
                      cy="60"
                      r="50"
                    />
                    <circle
                      className="progress-ring-circle"
                      cx="60"
                      cy="60"
                      r="50"
                      style={{
                        strokeDasharray: `${2 * Math.PI * 50}`,
                        strokeDashoffset: isVisible 
                          ? `${2 * Math.PI * 50 * (1 - skill.percentage / 100)}`
                          : `${2 * Math.PI * 50}`,
                        stroke: skill.color,
                        transitionDelay: `${1 + (idx * 0.1)}s`
                      }}
                    />
                  </svg>
                  <div className="progress-text">
                    <span className="progress-number">{skill.percentage}%</span>
                  </div>
                </div>
                <h4 className="circular-skill-name">{skill.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
