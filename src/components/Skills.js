import React, { useEffect, useRef, useState } from 'react';

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const frontendSkills = [
  { name: "React / Next.js", level: 85 },
  { name: "JavaScript / TypeScript", level: 85 },
  { name: "Tailwind CSS & Styling", level: 90 },
  { name: "Socket.IO", level: 80 },
  { name: "Web3.js", level: 75 },
  { name: "OpenGL / Computer Graphics", level: 65 }
];

const backendSkills = [
  { name: "Node.js / Express.js", dots: 4 },
  { name: "Python / FastAPI / PyTorch", dots: 4 },
  { name: "SQL & NoSQL (Postgres, MongoDB)", dots: 4 },
  { name: "Supabase & Prisma ORM", dots: 4 },
  // { name: "OAuth2 & Passport.js", dots: 4 },
  { name: "Blockchain (Solidity, Hyperledger)", dots: 3 }
];

const tools = [
  "Git / GitHub",
  "Docker",
  "n8n Automation",
  "Puppeteer",
  "Playwright",
  "Supabase",
  "Prisma ORM",
  "Postman",
  "REST APIs",
  "Webhook Integration",

  "JWT Authentication",
  "OpenAI API",
  "Groq AI",
  "LangChain",
  "OAuth2",
  "Vector Databases",
  "Redis",
  "Cohere",
  "NLP",
  "Regex",
  "pdf-parse",
  "mammoth",
  "Data Extraction",
  "Data Manipulation",
  "Web Scraping",
  "Figma",
  "Arduino",
];

  const professionalEdge = [
  {
    title: "Academic High Distinction",
    description: "Awarded Dean's List honors at BRAC University in Summer 2024 and Spring 2025."
  },
  {
    title: "Award-Winning Project",
    description: "Secured 2nd Runner-up position at the BRAC CSE471 Project Showcase (Summer 2025) for ThesisFlow."
  },
  {
  title: "Research Publication",
  description: "Published undergraduate research on improving the robustness of pretrained LLMs against quantization and weight noise attacks."
  },
    {
  title: "Problem Solving",
  description: "Solved 150+ coding problems across competitive programming platforms, strengthening algorithmic and analytical thinking."
  },
  // {
  //   title: "Workflow Automation",
  //   description: "Designed and deployed 50+ automation workflows and AI-powered integrations using n8n."
  // }
];

  return (
    <section id="skills" className="py-12 md:py-16 border-t border-surface-variant/30 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative" ref={sectionRef}>
      
      {/* Header */}
      <div className="text-center mb-10 md:mb-12">
        <div className="inline-block bg-primary-fixed text-on-primary-fixed dark:bg-primary-fixed-dim/20 dark:text-inverse-primary font-label-lg text-label-lg px-3 py-1 rounded w-max tracking-wider mb-4">
          CAPABILITIES
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-2">Technical Expertise</h2>
        <p className="font-body-md text-body-md text-secondary dark:text-surface-container-highest">
          A comprehensive overview of my technical stack and core professional edge
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-14">
        
        {/* Frontend Engineering Card */}
        <article className="bg-white dark:bg-[#191c1e] rounded-xl p-6 border border-outline-variant/30 hover:border-primary/50 dark:hover:border-inverse-primary/50 flex flex-col soft-shadow group hover:-translate-y-1 transition-all duration-300">
          <header className="mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/5 dark:bg-inverse-primary/5 flex items-center justify-center text-primary dark:text-inverse-primary group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">Frontend Engineering</h3>
          </header>
          
          <div className="space-y-5 flex-grow">
            {frontendSkills.map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="font-label-md text-label-md text-on-surface dark:text-white">{skill.name}</span>
                  <span className="font-label-sm text-label-sm text-secondary dark:text-surface-container-highest">{skill.level}%</span>
                </div>
                <div className="h-[3px] w-full bg-surface-container dark:bg-inverse-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary dark:bg-inverse-primary transition-all duration-1000 ease-out" 
                    style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Backend & APIs Card */}
        <article className="bg-white dark:bg-[#191c1e] rounded-xl p-6 border border-outline-variant/30 hover:border-primary/50 dark:hover:border-inverse-primary/50 flex flex-col soft-shadow group hover:-translate-y-1 transition-all duration-300">
          <header className="mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/5 dark:bg-inverse-primary/5 flex items-center justify-center text-primary dark:text-inverse-primary group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75" />
              </svg>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">Backend & APIs</h3>
          </header>
          
          <div className="space-y-5 flex-grow justify-center flex flex-col">
            {backendSkills.map((skill, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface dark:text-white">{skill.name}</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div 
                      key={dot} 
                      className={`h-2.5 w-6 rounded-full transition-all duration-700 ${
                        isVisible && dot <= skill.dots 
                          ? "bg-primary dark:bg-inverse-primary scale-x-105" 
                          : "bg-surface-container dark:bg-inverse-surface"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Tools & DevOps Card */}
        <article className="bg-white dark:bg-[#191c1e] rounded-xl p-6 border border-outline-variant/30 hover:border-primary/50 dark:hover:border-inverse-primary/50 flex flex-col soft-shadow group hover:-translate-y-1 transition-all duration-300">
          <header className="mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/5 dark:bg-inverse-primary/5 flex items-center justify-center text-primary dark:text-inverse-primary group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A1.79 1.79 0 0020 21l2-2a1.79 1.79 0 000-2.58l-5.83-5.83M11.42 15.17l2.46-2.46m-2.46 2.46A2.25 2.25 0 019 15.5H7.5a2.25 2.25 0 01-2.25-2.25V12a2.25 2.25 0 012.25-2.25H9a2.25 2.25 0 012.25 2.25v1.5a2.25 2.25 0 01-.5 1.42zm1.73-3.62l1.63-1.63m-1.63 1.63l-.42.42m0-.42l-.42-.42m3.62 1.63L19 12m-4.25-1.5h-1.5m1.5-1.5v-1.5" />
              </svg>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">Tools & DevOps</h3>
          </header>
          <div className="flex flex-wrap gap-2.5">
            {tools.map((tool, idx) => (
              <span 
                key={idx} 
                className="px-4 py-2 bg-surface-container-low dark:bg-inverse-surface text-slate-deep dark:text-white font-label-sm text-label-sm rounded uppercase tracking-wider border border-outline-variant/20 hover:border-primary/50 transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </article>

        {/* Professional Edge Card */}
        <article className="bg-white dark:bg-[#191c1e] rounded-xl p-6 border border-outline-variant/30 hover:border-primary/50 dark:hover:border-inverse-primary/50 flex flex-col soft-shadow group hover:-translate-y-1 transition-all duration-300">
          <header className="mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/5 dark:bg-inverse-primary/5 flex items-center justify-center text-primary dark:text-inverse-primary group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">Impact & Recognition</h3>
          </header>
          
          <div className="grid grid-cols-1 gap-4">
            {professionalEdge.map((edge, idx) => (
              <div key={idx} className="border-l-2 border-primary/20 dark:border-inverse-primary/20 pl-4 hover:border-primary transition-colors">
                <h4 className="font-label-md text-label-md text-on-surface dark:text-white font-bold mb-0.5">{edge.title}</h4>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-container-highest text-sm leading-relaxed">{edge.description}</p>
              </div>
            ))}
          </div>
        </article>

      </div>
      
    </section>
  );
}