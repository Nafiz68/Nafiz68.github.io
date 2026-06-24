import React from 'react';
import { FaBriefcase, FaGraduationCap, FaCode, FaSearch } from 'react-icons/fa';

export default function Experience() {
  const experiences = [
    {
      id: 1,
      position: "Automation Specialist",
      company: "Softvence",
      location: "Dhaka, Bangladesh",
      duration: "Apr 2026 – June 2026",
      type: "Full Time",
      responsibilities: [
        "Design and deploy complex automation workflows using n8n based on client requirements.",
        "Build secure API integrations and AI-driven workflows, testing and optimizing for scale."
      ],
      icon: <FaCode size={18} />,
      iconColor: "text-primary border-primary dark:text-inverse-primary dark:border-inverse-primary"
    },
    {
      id: 2,
      position: "Executive, Network & IT",
      company: "Wintel Limited",
      location: "Dhaka, Bangladesh",
      duration: "Dec 2025 – Feb 2026",
      type: "Internship",
      responsibilities: [
        "Supported network infrastructure maintenance and IT operations within the Technical Team.",
        "Assisted in troubleshooting server configurations, system monitoring, and compiling technical documents."
      ],
      icon: <FaBriefcase size={16} />,
      iconColor: "text-secondary border-secondary dark:text-surface-container-highest dark:border-surface-container-highest"
    },
    {
      id: 3,
      position: "Undergraduate Researcher",
      company: "BRAC University – CSE Department",
      location: "Dhaka, Bangladesh",
      duration: "Jan 2025 – Jan 2026",
      type: "Research / AI & ML",
      responsibilities: [
        "Developed an anchor-guided weight repair mechanism to stabilize compromised pretrained language models (LLMs).",
        "Enhanced model robustness against quantization and weight noise attacks without retraining.",
        "Documented research methodologies and results for potential academic publications."
      ],
      icon: <FaSearch size={16} />,
      iconColor: "text-primary border-primary dark:text-inverse-primary dark:border-inverse-primary"
    },
    {
      id: 4,
      position: "IT Instructor",
      company: "Zentorra",
      location: "Dhaka, Bangladesh",
      duration: "Feb 2025 – Jul 2025",
      type: "Teaching",
      responsibilities: [
        "Delivered recorded classes on Python fundamentals and project-based learning for beginner students.",
        "Created comprehensive study guides, homework files, and practical coding challenges.",
        "Mentored students through hands-on programming projects and real-world application building."
      ],
      icon: <FaGraduationCap size={18} />,
      iconColor: "text-secondary border-secondary dark:text-surface-container-highest dark:border-surface-container-highest"
    },
    {
      id: 5,
      position: "Private Tutor",
      company: "Self-Employed",
      location: "Dhaka, Bangladesh",
      duration: "Jan 2024 – Apr 2025",
      type: "Tutoring",
      responsibilities: [
        "Tutored undergraduates in Python Data Structures and Computer Graphics concepts.",
        "Specialized in helping students understand complex structures like trees, recursion, and search algorithms.",
        "Provided hands-on guidance with OpenGL programming, shader pipelines, and graphics rendering techniques."
      ],
      icon: <FaGraduationCap size={18} />,
      iconColor: "text-secondary border-secondary dark:text-surface-container-highest dark:border-surface-container-highest"
    }
  ];

  return (
    <section id="experience" className="py-12 md:py-16 border-t border-surface-variant/30 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative">
      <div className="text-center mb-10 md:mb-12">
        <div className="inline-block bg-primary-fixed text-on-primary-fixed dark:bg-primary-fixed-dim/20 dark:text-inverse-primary font-label-sm text-label-sm px-3 py-1 rounded w-max tracking-wider mb-4">
          JOURNEY
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-2">Professional Journey</h2>
        <p className="font-body-md text-body-md text-secondary dark:text-surface-container-highest">
          Roles that shaped my engineering mindset across research, teaching, and industry automation
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Center line on desktop, Left line on mobile */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-outline-variant/60 dark:bg-outline-variant/30 transform md:-translate-x-1/2 z-0"></div>
        
        <div className="flex flex-col gap-8 md:gap-10">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={exp.id} className="timeline-grid relative z-10 items-start">
                
                {/* Desktop Left Side Content (For Even indices) */}
                {isEven ? (
                  <div className="md:text-right hidden md:block pt-3">
                    <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{exp.position}</h3>
                    <div className="font-label-md text-label-md text-primary dark:text-inverse-primary mt-1">{exp.company}</div>
                    <div className="font-label-sm text-label-sm text-secondary dark:text-surface-container-highest mt-1">{exp.duration}</div>
                  </div>
                ) : (
                  /* Desktop Left Side Card (For Odd indices) */
                  <div className="bg-white dark:bg-[#191c1e] p-5 rounded-xl border border-outline-variant/30 hover:border-primary/50 dark:hover:border-inverse-primary/50 transition-all duration-300 soft-shadow hidden md:block group text-right">
                    <span className="bg-[#B9C9DF]/20 dark:bg-[#B9C9DF]/10 text-slate-deep dark:text-inverse-primary font-label-sm text-label-sm px-2.5 py-1 rounded inline-block mb-4 uppercase tracking-wider">
                      {exp.type}
                    </span>
                    <ul className="space-y-2 text-right">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="font-body-md text-body-md text-on-surface-variant dark:text-surface-container-highest text-sm leading-relaxed">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Marker (Center on desktop, Left on mobile) */}
                <div className="flex justify-center md:pt-3">
                  <div className={`w-12 h-12 rounded-full bg-white dark:bg-[#191c1e] border-2 flex items-center justify-center relative z-10 soft-shadow ${exp.iconColor}`}>
                    {exp.icon}
                  </div>
                </div>

                {/* Desktop Right Side Content */}
                {isEven ? (
                  /* Desktop Right Side Card (For Even indices) / Mobile Content (All) */
                  <div className="bg-white dark:bg-[#191c1e] p-5 rounded-xl border border-outline-variant/30 hover:border-primary/50 dark:hover:border-inverse-primary/50 transition-all duration-300 soft-shadow group">
                    <div className="md:hidden mb-4">
                      <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{exp.position}</h3>
                      <div className="font-label-md text-label-md text-primary dark:text-inverse-primary mt-1">{exp.company}</div>
                      <div className="font-label-sm text-label-sm text-secondary dark:text-surface-container-highest mt-1">{exp.duration}</div>
                    </div>
                    <span className="bg-[#B9C9DF]/20 dark:bg-[#B9C9DF]/10 text-slate-deep dark:text-inverse-primary font-label-sm text-label-sm px-2.5 py-1 rounded inline-block mb-4 uppercase tracking-wider">
                      {exp.type}
                    </span>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="font-body-md text-body-md text-on-surface-variant dark:text-surface-container-highest text-sm leading-relaxed flex items-start gap-2">
                          <span className="text-primary dark:text-inverse-primary mt-1 select-none">▪</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  /* Desktop Right Side Content (For Odd indices) / Mobile Content (All) */
                  <div className="flex flex-col">
                    {/* Desktop view text */}
                    <div className="md:text-left hidden md:block pt-3">
                      <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{exp.position}</h3>
                      <div className="font-label-md text-label-md text-primary dark:text-inverse-primary mt-1">{exp.company}</div>
                      <div className="font-label-sm text-label-sm text-secondary dark:text-surface-container-highest mt-1">{exp.duration}</div>
                    </div>
                    {/* Mobile card (shown only on mobile) */}
                    <div className="bg-white dark:bg-[#191c1e] p-5 rounded-xl border border-outline-variant/30 hover:border-primary/50 dark:hover:border-inverse-primary/50 transition-all duration-300 soft-shadow group md:hidden mt-2">
                      <div className="mb-4">
                        <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{exp.position}</h3>
                        <div className="font-label-md text-label-md text-primary dark:text-inverse-primary mt-1">{exp.company}</div>
                        <div className="font-label-sm text-label-sm text-secondary dark:text-surface-container-highest mt-1">{exp.duration}</div>
                      </div>
                      <span className="bg-[#B9C9DF]/20 dark:bg-[#B9C9DF]/10 text-slate-deep dark:text-inverse-primary font-label-sm text-label-sm px-2.5 py-1 rounded inline-block mb-4 uppercase tracking-wider">
                        {exp.type}
                      </span>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="font-body-md text-body-md text-on-surface-variant dark:text-surface-container-highest text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-primary dark:text-inverse-primary mt-1 select-none">▪</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}