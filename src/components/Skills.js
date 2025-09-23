import React, { useEffect, useRef, useState } from 'react';
import '../styles/Skills.css';

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const skillCategories = [
    {
      category: "Frontend Development",
      skills: [
        { name: "React", level: 90, icon: "⚛️" },
        { name: "JavaScript", level: 88, icon: "📜" },
        { name: "TypeScript", level: 80, icon: "🔷" },
        { name: "HTML/CSS", level: 92, icon: "🎨" },
        { name: "Responsive Design", level: 85, icon: "📱" }
      ]
    },
    {
      category: "Backend Development",
      skills: [
        { name: "Node.js", level: 85, icon: "🚀" },
        { name: "Python", level: 88, icon: "🐍" },
        { name: "Express.js", level: 80, icon: "⚡" },
        { name: "REST APIs", level: 87, icon: "🔗" },
        { name: "GraphQL", level: 75, icon: "📊" }
      ]
    },
    {
      category: "Database & Tools",
      skills: [
        { name: "MongoDB", level: 82, icon: "🍃" },
        { name: "PostgreSQL", level: 78, icon: "🐘" },
        { name: "Git", level: 90, icon: "📋" },
        { name: "Docker", level: 75, icon: "🐳" },
        { name: "AWS", level: 70, icon: "☁️" }
      ]
    },
    {
      category: "AI & Data Science",
      skills: [
        { name: "Machine Learning", level: 80, icon: "🤖" },
        { name: "TensorFlow", level: 75, icon: "🧠" },
        { name: "Data Analysis", level: 85, icon: "📈" },
        { name: "OpenAI API", level: 82, icon: "🎯" },
        { name: "Pandas", level: 88, icon: "🐼" }
      ]
    },
    {
      category: "AI & Data Science",
      skills: [
        { name: "Machine Learning", level: 80, icon: "🤖" },
        { name: "TensorFlow", level: 75, icon: "🧠" },
        { name: "Data Analysis", level: 85, icon: "📈" },
        { name: "OpenAI API", level: 82, icon: "🎯" },
        { name: "Pandas", level: 88, icon: "🐼" }
      ]
    },
    {
      category: "AI & Data Science",
      skills: [
        { name: "Machine Learning", level: 80, icon: "🤖" },
        { name: "TensorFlow", level: 75, icon: "🧠" },
        { name: "Data Analysis", level: 85, icon: "📈" },
        { name: "OpenAI API", level: 82, icon: "🎯" },
        { name: "Pandas", level: 88, icon: "🐼" }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
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
              { name: "Team Work", percentage: 90, color: "#764ba2" },
              { name: "Leadership", percentage: 85, color: "#f093fb" },
              { name: "Communication", percentage: 88, color: "#f5576c" }
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
