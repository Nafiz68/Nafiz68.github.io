import React, { useEffect } from 'react';

export default function ProjectDetailModal({ project, onClose }) {
  
  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#f7f9fb] dark:bg-[#191c1e] text-on-surface dark:text-white animate-fadeIn">
      
      {/* Sticky Top Header */}
      <header className="sticky top-0 w-full z-50 bg-[#f7f9fb]/90 dark:bg-[#191c1e]/90 backdrop-blur-md border-b border-surface-variant/20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
          <div className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">
            Case Study
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 bg-primary/5 hover:bg-primary/10 dark:bg-inverse-primary/5 dark:hover:bg-inverse-primary/10 text-primary dark:text-inverse-primary font-label-md text-label-md px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </button>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="pt-8 pb-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        
        {/* Project Header Info */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
            <div className="md:col-span-8">
              <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface dark:text-white font-extrabold mb-4">
                {project.title}: Project Details
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-surface-container-highest max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="md:col-span-4 flex flex-col justify-end gap-4 border-t md:border-t-0 md:border-l border-outline-variant/30 pt-6 md:pt-0 md:pl-8">
              <div>
                <span className="block font-label-sm text-label-sm text-secondary dark:text-surface-container-highest uppercase tracking-wider mb-1">Role</span>
                <span className="font-body-md text-body-md text-on-surface dark:text-white font-bold">{project.role || "Lead Developer"}</span>
              </div>
              <div>
                <span className="block font-label-sm text-label-sm text-secondary dark:text-surface-container-highest uppercase tracking-wider mb-1">Timeline</span>
                <span className="font-body-md text-body-md text-on-surface dark:text-white font-bold">{project.duration || "Ongoing"}</span>
              </div>
              <div>
                <span className="block font-label-sm text-label-sm text-secondary dark:text-surface-container-highest uppercase tracking-wider mb-1">Category</span>
                <span className="font-body-md text-body-md text-on-surface dark:text-white font-bold">{project.category}</span>
              </div>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="w-full rounded-2xl overflow-hidden soft-shadow bg-surface-container-high dark:bg-[#2d3133] border border-outline-variant/30">
            <img 
              alt={`${project.title} Banner`} 
              className="w-full h-auto max-h-[500px] object-cover" 
              src={project.image}
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200";
              }}
            />
          </div>
        </section>

        {/* Case Study Details Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Sidebar (Meta & Actions) */}
          <div className="md:col-span-3 space-y-8">
            <div>
              <h3 className="font-label-md text-label-md text-on-surface dark:text-white font-extrabold uppercase tracking-wider mb-4 border-b border-surface-variant/30 pb-2">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="bg-[#B9C9DF]/20 dark:bg-[#B9C9DF]/10 text-slate-deep dark:text-inverse-primary font-label-sm text-label-sm px-3 py-1.5 rounded-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.deliverables && (
              <div>
                <h3 className="font-label-md text-label-md text-on-surface dark:text-white font-extrabold uppercase tracking-wider mb-4 border-b border-surface-variant/30 pb-2">
                  Deliverables
                </h3>
                <ul className="space-y-2 font-body-md text-body-md text-on-surface-variant dark:text-surface-container-highest text-sm">
                  {project.deliverables.map((del, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary dark:text-inverse-primary mt-1">•</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Project CTA Links */}
            <div className="pt-4 flex flex-col gap-3">
              {project.demo && (
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg hover:scale-[1.02] transition-transform text-center shadow-md shadow-primary/20 cursor-pointer block"
                >
                  Visit Live Site ↗
                </a>
              )}
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-surface-container-lowest dark:bg-[#2d3133] text-on-surface dark:text-white border border-outline-variant py-3 rounded-lg hover:border-primary dark:hover:border-inverse-primary hover:text-primary dark:hover:text-inverse-primary transition-colors text-center cursor-pointer block"
              >
                View Repository Code
              </a>
            </div>
          </div>

          {/* Right Main Content Panel */}
          <div className="md:col-span-8 md:col-start-5 space-y-12">
            
            {/* Challenge article */}
            <article>
              <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold mb-4">
                The Challenge
              </h2>
              <div className="font-body-lg text-body-lg text-on-surface-variant dark:text-surface-container-highest leading-relaxed space-y-4">
                <p>
                  {project.challenge || "Every successful software project starts with a complex problem. The core hurdle was creating an optimized, secure environment that handles volatile data loads without exposing client logs to centralized risk points."}
                </p>
              </div>
            </article>

            {/* Solution article */}
            <article>
              <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold mb-4">
                The Solution
              </h2>
              <div className="font-body-lg text-body-lg text-on-surface-variant dark:text-surface-container-highest leading-relaxed space-y-4">
                <p>
                  {project.solution || "We built an event-driven system leveraging standard local encryption modules and custom algorithms. By caching states on-device and utilizing async processing queues, we lowered load times while guaranteeing zero data loss."}
                </p>
              </div>
            </article>
          </div>

        </section>
      </main>
    </div>
  );
}
