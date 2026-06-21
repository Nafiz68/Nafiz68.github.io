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
      title: "Tutoring & Teaching",
      description: "Providing expert academic support and tutoring in data structures, algorithms, OpenGL graphics, and programming fundamentals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A5.905 5.905 0 0 1 8 3.447.907.907 0 0 1 9 3h6c.319 0 .614.124.83.329a5.907 5.907 0 0 1 4.396 5.961 50.6 50.6 0 0 0-2.658.813m-11.162 0A51.339 51.339 0 0 1 12 11.25c2.107 0 4.136-.14 6.116-.412m-11.162 0a60.37 60.37 0 0 1-.371-7.58 1.125 1.125 0 0 1 1.066-1.077 50.843 50.843 0 0 1 8.734 0 1.125 1.125 0 0 1 1.065 1.077 60.39 60.39 0 0 1-.371 7.58M8.07 19.143a10.515 10.515 0 0 1-1.47-3.91M10.5 21.75a9.75 9.75 0 0 0 3 0m0 0a10.515 10.515 0 0 0 1.47-3.91" />
        </svg>
      )
    },
    {
      title: "Machine Learning & AI",
      description: "Applying advanced machine learning models and data science algorithms to resolve complex, real-world analytical problems.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096L9 21zm0 0h4.992m-4.993 0H4.008m13.805-5.096L17 21m0 0l-.813-5.096L17 21zm0 0h4.992m-4.993 0h-4.992m-2.906-8.904a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm13.5 0a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
        </svg>
      )
    },
    {
      title: "AI Agents & Automation",
      description: "Building intelligent workflow automation systems using n8n and orchestrating multi-agent AI architectures to solve operational issues.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    }
  ];

  return (
    <section id="about" className="py-24 border-t border-surface-variant/30 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative">
      {/* Section 1: Professional Bio */}
      <div className="max-w-4xl mx-auto flex flex-col gap-6 mb-24">
        <div className="flex flex-col gap-6">
          <div className="inline-block bg-primary-fixed text-on-primary-fixed dark:bg-primary-fixed-dim/20 dark:text-inverse-primary font-label-sm text-label-sm px-3 py-1 rounded w-max tracking-wider">
            ABOUT ME
          </div>
          <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface dark:text-white leading-tight">
            Crafting digital solutions with technical precision.
          </h2>
          <div className="font-body-lg text-body-lg text-secondary dark:text-surface-container-highest flex flex-col gap-4">
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
          <div className="flex flex-wrap gap-3 mt-4">
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
      <div className="border-t border-surface-variant/30 pt-20 mb-20">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-2">Services</h2>
          <p className="font-body-md text-body-md text-secondary dark:text-surface-container-highest">What I Offer</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-[#191c1e] p-8 rounded-xl border border-outline-variant/30 hover:border-primary/50 dark:hover:border-inverse-primary/50 transition-all duration-300 flex flex-col gap-4 soft-shadow group"
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
      <div className="bg-surface-container-low dark:bg-[#2d3133] rounded-2xl p-8 md:p-12 soft-shadow flex flex-col md:flex-row justify-between items-center gap-6 border border-outline-variant/20">
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