import React from 'react';

export default function About() {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'CV_Nafiz_Khan_BSc_CSE.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const services = [
    {
      title: "Full-Stack Development",
      description: "Building robust, end-to-end web applications with modern tech stacks like React, Next.js, Node.js, and databases.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>
      )
    },
    {
    title: "API Integrations",
    description: "Building scalable integrations between third-party services, databases, CRMs, and AI systems using REST APIs, webhooks, and authentication protocols.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.182-2.121a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      )
    },
    {
      title: "Machine Learning & AI",
      description: "Applying advanced machine learning models and data science algorithms to resolve complex, real-world analytical problems.",
      icon: (
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.75h4.5M12 3.75v3m-6 3h12a1.5 1.5 0 011.5 1.5v6A1.5 1.5 0 0118 18.75H6a1.5 1.5 0 01-1.5-1.5v-6A1.5 1.5 0 016 9.75Zm3 3h.008v.008H9v-.008Zm6 0h.008v.008H15v-.008ZM9 15h6" />
</svg>
      )
    },
    {
      title: "AI Agents & Automation",
      description: "Building intelligent workflow automation systems using n8n and orchestrating multi-agent AI architectures to solve operational issues.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.983 3.75c.382 0 .757.02 1.125.058l.34 1.703a7.52 7.52 0 012.03.84l1.447-.963a8.3 8.3 0 011.59 1.59l-.963 1.447c.36.64.643 1.319.84 2.03l1.703.34a8.36 8.36 0 010 2.25l-1.703.34a7.52 7.52 0 01-.84 2.03l.963 1.447a8.3 8.3 0 01-1.59 1.59l-1.447-.963a7.52 7.52 0 01-2.03.84l-.34 1.703a8.36 8.36 0 01-2.25 0l-.34-1.703a7.52 7.52 0 01-2.03-.84l-1.447.963a8.3 8.3 0 01-1.59-1.59l.963-1.447a7.52 7.52 0 01-.84-2.03l-1.703-.34a8.36 8.36 0 010-2.25l1.703-.34a7.52 7.52 0 01.84-2.03l-.963-1.447a8.3 8.3 0 011.59-1.59l1.447.963a7.52 7.52 0 012.03-.84l.34-1.703c.368-.038.743-.058 1.125-.058Z" />
</svg>
      )
    }
  ];

  return (
    <section id="about" className="py-12 md:py-16 border-t border-surface-variant/30 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative">
      {/* Section 1: Professional Bio */}
      <div className="max-w-4xl mx-auto flex flex-col gap-5 mb-12 md:mb-14">
        <div className="flex flex-col gap-5">
          <div className="inline-block bg-primary-fixed text-on-primary-fixed dark:bg-primary-fixed-dim/20 dark:text-inverse-primary font-label-sm text-label-sm px-3 py-1 rounded w-max tracking-wider mx-auto">
            ABOUT ME
          </div>
          <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface dark:text-white leading-tight">
            Crafting digital solutions with technical precision.
          </h2>
          <div className="font-body-lg text-body-lg text-secondary dark:text-surface-container-highest flex flex-col gap-3">
            <p>
              My journey in technology began with competitive programming, where I developed strong
              analytical thinking and algorithm design skills. This foundation led me to explore
              full-stack development, where I discovered my passion for creating end-to-end solutions.
            </p>
            <p>
              Today, I focus on building scalable web applications, implementing machine learning models,
              and exploring emerging technologies like blockchain. Recently, I have been designing workflow 
              automations with n8n and creating autonomous AI agents, combining automation with intelligence 
              to solve practical, real-world challenges.
            </p>
          </div>
          
          {/* Highlight Stats Chips */}
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="bg-[#B9C9DF]/20 text-slate-deep dark:text-inverse-primary font-label-sm text-label-sm px-4 py-2 rounded">
              BRAC University
            </div>
            <div className="bg-[#B9C9DF]/20 text-slate-deep dark:text-inverse-primary font-label-sm text-label-sm px-4 py-2 rounded">
              Full-Stack Development
            </div>
            <div className="bg-[#B9C9DF]/20 text-slate-deep dark:text-inverse-primary font-label-sm text-label-sm px-4 py-2 rounded">
              AI Security Research
            </div>
            <div className="bg-[#B9C9DF]/20 text-slate-deep dark:text-inverse-primary font-label-sm text-label-sm px-4 py-2 rounded">
              n8n & AI Automation
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Services / What I Do */}
      <div className="border-t border-surface-variant/30 pt-10 md:pt-12 mb-10 md:mb-12">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-2">Expertise</h2>
          <p className="font-body-md text-body-md text-secondary dark:text-surface-container-highest">Here’s how I can help you</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-[#191c1e] p-6 rounded-xl border border-outline-variant/30 hover:border-primary/50 dark:hover:border-inverse-primary/50 transition-all duration-300 flex flex-col gap-3 soft-shadow group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/5 dark:bg-inverse-primary/5 flex items-center justify-center text-primary dark:text-inverse-primary group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-semibold">
                {service.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-container-highest text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: CV Download CTA */}
      <div className="bg-surface-container-low dark:bg-[#2d3133] rounded-2xl p-6 md:p-8 soft-shadow flex flex-col md:flex-row justify-between items-center gap-5 border border-outline-variant/20">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">Want to know more?</h3>
          <p className="font-body-md text-body-md text-secondary dark:text-surface-container-highest max-w-md">
            Download my complete resume for detailed information about my academic coursework, qualifications, and achievements.
          </p>
        </div>
        <button
          onClick={handleDownloadCV}
          className="bg-primary text-on-primary font-label-md text-label-md px-8 py-4 rounded-lg hover:scale-105 transition-all duration-200 cursor-pointer shadow-md shadow-primary/20 whitespace-nowrap active:scale-95"
        >
          Download Resume
        </button>
      </div>
    </section>
  );
}