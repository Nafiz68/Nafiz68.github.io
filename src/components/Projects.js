import React, { useEffect, useMemo, useRef, useState } from 'react';
import ProjectDetailModal from './ProjectDetailModal';

const projects = [
  {
    title: "ThesisFlow",
    description: "A comprehensive academic research management platform streamlining the thesis submission, supervision, and progress tracking process for BRAC University.",
    github: "https://github.com/Faishal-Monir/Thesis-Management-System",
    demo: "https://thesis-flow-delta.vercel.app/",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Groq(LLaMA 3.1)"],
    category: "Full Stack",
    duration: "3 months",
    image: "/images/projects/thesisflow.png",
    spanClass: "col-span-1 md:col-span-2 lg:col-span-8",
    imageAlign: "object-top",
    role: "Lead Full-Stack Developer",
    challenge: "Manual thesis coordination involved back-and-forth emails, causing version mismatches, delayed feedback, and lost documentation between students and supervisors.",
    solution: "Built a consolidated dashboard featuring real-time state synchronization, encrypted document archiving, and automated LLM summary generation using Groq LLaMA 3.1.",
    deliverables: ["Platform Web App", "Database Schema Design", "LLM Feedback System", "Authentication Module"]
  },
  {
    title: "QuickHire",
    description: "An on-demand recruitment dashboard connecting freelance talent with gig opportunities, featuring smart search, saved jobs, and application tracking.",
    github: "https://github.com/Nafiz68/QuickHire",
    demo: "https://quick-hire-qtec-sol.vercel.app/",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Express.js", "MongoDB", "Three.js"],
    category: "Full Stack",
    duration: "2 months",
    image: "/images/projects/quickhire.png",
    spanClass: "col-span-1 lg:col-span-4",
    imageAlign: "object-center",
    role: "Product & Interface Developer",
    challenge: "Standard gig platforms have high friction for direct developer matching, requiring complex proposal processes for simple assignments.",
    solution: "Created a single-click matchmaking funnel utilizing client-side caching, instant filters, and optimized Three.js decorative 3D assets to drive recruitment visual metrics.",
    deliverables: ["Frontend Web Interface", "Instant Gig matching algorithm", "3D Asset optimizations", "Admin Dashboard"]
  },
  {
    title: "Due Diligence Agent",
    description: "AI-powered automation system that processes enterprise questionnaires using document indexing, semantic search, and RAG answer generation.",
    github: "https://github.com/Nafiz68/Due-Diligence-Agent",
    tech: ["Node.js", "Express", "MongoDB", "Redis", "ChromaDB", "Groq (LLaMA 3.1)", "HuggingFace", "React", "TypeScript"],
    category: "AI & Automation",
    duration: "5 months",
    image: "/images/projects/due-dilligence.png",
    spanClass: "col-span-1 lg:col-span-4",
    imageAlign: "object-top",
    role: "AI Systems Architect",
    challenge: "Filling business compliance questionnaires takes weeks of auditing past corporate PDF reports and manual cross-referencing.",
    solution: "Designed an automated retrieval-augmented generation (RAG) agent that indexes documents into ChromaDB vector stores, generates context-anchored responses with exact citations, and uses Redis queues to manage parallel tasks.",
    deliverables: ["Vector Indexing Pipeline", "RAG Answer Generator", "Admin Approval Console", "Asynchronous Redis Workers"]
  },
  {
    title: "Credenza",
    description: "Client-side, zero-knowledge credential vault utilizing Web Crypto API for secure local encryption, with an integrated cyber reconnaissance dashboard.",
    github: "https://github.com/Nafiz68/Credenza",
    demo: "https://credenza-secure-vault.vercel.app/",
    tech: ["Next.js", "React", "Node.js", "Prisma", "PostgreSQL", "Web Crypto API"],
    category: "Cybersecurity",
    duration: "1 month",
    image: "/images/projects/credenza.png",
    spanClass: "col-span-1 md:col-span-2 lg:col-span-8",
    imageAlign: "object-top",
    role: "Security & Backend Lead",
    challenge: "Storing keys and threat monitoring coordinates in third-party clouds exposes critical infrastructure data to perimeter breaches.",
    solution: "Implemented PBKDF2 key derivation and AES-GCM local encrypting inside the client browser. No plain text data or passwords ever leave the user environment.",
    deliverables: ["Zero-Knowledge Vault UI", "Cryptographic Operations Module", "Prisma Database sync schema", "Reconnaissance visual logs"]
  },
  {
    title: "TrackUp",
    description: "A full-featured platform for job applications tracking, featuring resume parsing, reminders, and listing insight extractions via NLP.",
    github: "https://github.com/Nafiz68/TrackUp",
    demo: "https://trackup-job-tracker.vercel.app/",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Socket.IO", "Docker"],
    category: "Full Stack",
    duration: "4 months",
    image: "/images/projects/trackup.png",
    spanClass: "col-span-1 lg:col-span-6",
    imageAlign: "object-top",
    role: "Lead Architect",
    challenge: "Job seekers lose track of deadlines, application stages, and distinct job parameters when applying to dozens of listings.",
    solution: "Built a Kanban board dashboard synced with Node background workers that scrape details, parse resumes locally, and push real-time listing statistics over Socket.IO websockets.",
    deliverables: ["Kanban Application Dashboard", "Resume Extraction Engine", "Real-Time synchronization server", "Vercel & Docker deployments"]
  },
  {
    title: "Realtime Playlist",
    description: "Collaborative music queue sync with SSE, drag-and-drop reordering using fractional indexing, and a live voting system.",
    github: "https://github.com/Nafiz68/Realtime-Collaborative-Playlist",
    demo: "https://realtime-collaborative-playlist.vercel.app/",
    tech: ["Next.js 16", "React 19", "TypeScript", "Prisma ORM", "SQLite", "Tailwind CSS 4", "Framer Motion"],
    category: "Full Stack",
    duration: "2 months",
    image: "/images/projects/realtime.png",
    spanClass: "col-span-1 lg:col-span-6",
    imageAlign: "object-center",
    role: "Frontend Engineer",
    challenge: "Managing shared music playlists asynchronously leads to race conditions, stuttering queue sync, and disjointed group voting experiences.",
    solution: "Leveraged Server-Sent Events (SSE) for sub-second synchronization and fractional indexing algorithms to enable drag-and-drop reordering without database re-indexing loops.",
    deliverables: ["Synchronized Queue Player UI", "SSE Push Server", "Fractional Index Sorting Module", "Framer Motion animations"]
  },
  {
    title: "Sweet Shop POS",
    description: "Full-stack e-commerce and point-of-sale platform featuring robust shopping cart, admin inventories, and transactional logs.",
    github: "https://github.com/Nafiz68/sweet-shop-api",
    demo: "https://sweet-shop-api-ivory.vercel.app/",
    tech: ["React.js", "TypeScript", "Vite", "Tailwind CSS", "Supabase (PostgreSQL)"],
    category: "Full Stack",
    duration: "1 month",
    image: "/images/projects/sweetshop.png",
    spanClass: "col-span-1 md:col-span-2 lg:col-span-12",
    imageAlign: "object-center",
    role: "Backend & DB Architect",
    challenge: "Boutique sweet shops deal with fresh inventory expiration and localized deliveries requiring flexible billing structures.",
    solution: "Engineered a PostgreSQL schema integrated with Supabase edge functions to perform inventory checks during transactions, lowering stock discrepancy ratios.",
    deliverables: ["Point of Sale Web App", "Supabase DB Schema", "Edge functions inventory monitor", "Admin inventory console"]
  }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const impactStats = useMemo(() => [
    {
      value: 5,
      label: 'Clients Served',
      suffix: '+',
      description: 'Satisfied clients and collaborators globally.',
      colorClass: 'border-primary/20 dark:border-inverse-primary/20',
      icon: (
        <svg className="w-5 h-5 text-primary dark:text-inverse-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      value: 6,
      label: 'Projects Delivered',
      suffix: '+',
      description: 'High-performance production applications.',
      colorClass: 'border-primary/20 dark:border-inverse-primary/20',
      icon: (
        <svg className="w-5 h-5 text-primary dark:text-inverse-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      )
    },
    {
      value: 98,
      label: 'Delivery Success Rate',
      suffix: '%',
      description: 'On-time delivery and client satisfaction.',
      colorClass: 'border-primary/20 dark:border-inverse-primary/20',
      icon: (
        <svg className="w-5 h-5 text-primary dark:text-inverse-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 11 2 2 4-4" />
        </svg>
      )
    },
    {
      value: 30,
      label: 'Self Projects Built',
      suffix: '+',
      description: 'Open-source tools, packages, and extensions.',
      colorClass: 'border-primary/20 dark:border-inverse-primary/20',
      icon: (
        <svg className="w-5 h-5 text-primary dark:text-inverse-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      )
    },
  ], []);

  const [displayedStats, setDisplayedStats] = useState(() => impactStats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    if (!hasAnimated) {
      return undefined;
    }

    let animationFrameId;
    const duration = 1400;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setDisplayedStats(
        impactStats.map((stat) => Math.round(stat.value * easedProgress))
      );

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, impactStats]);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Map filters
  const filters = ['All', 'Full Stack', 'AI & Automation', 'Cybersecurity'];

  // Filtered projects list
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="py-24 border-t border-surface-variant/30 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative">
      <div className="mb-16">
        <div className="inline-block bg-primary-fixed text-on-primary-fixed dark:bg-primary-fixed-dim/20 dark:text-inverse-primary font-label-sm text-label-sm px-3 py-1 rounded w-max tracking-wider mb-4">
          PORTFOLIO
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-4">Selected Works</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-surface-container-highest max-w-2xl">
          A curated gallery of engineering challenges solved, emphasizing performance, vector models, and client safety.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-16">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded font-label-md text-label-md transition-all ${
              activeFilter === filter
                ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                : "bg-surface-container-low dark:bg-[#191c1e] text-on-surface-variant dark:text-surface-container-highest hover:bg-surface-container-high dark:hover:bg-inverse-surface"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid Canvas */}
      {activeFilter === 'All' ? (
        /* Bento Grid when showing ALL */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {filteredProjects.map((project, idx) => (
            <article 
              key={idx}
              onClick={() => setSelectedProject(project)}
              className={`glass-card rounded-xl overflow-hidden group flex flex-col cursor-pointer border border-outline-variant/30 ${project.spanClass}`}
            >
              <div className="relative h-64 shrink-0 overflow-hidden bg-surface-container-high dark:bg-[#2d3133]">
                <img 
                  alt={project.title} 
                  className={`project-image w-full h-full object-cover absolute inset-0 ${project.imageAlign}`} 
                  src={project.image}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-label-md text-label-md flex items-center gap-2">
                    View Case Study 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-container-highest mb-4 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.slice(0, 4).map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-1 rounded bg-[#B9C9DF]/20 dark:bg-[#B9C9DF]/10 text-slate-deep dark:text-inverse-primary font-label-sm text-label-sm">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-1 rounded bg-surface-container dark:bg-inverse-surface text-secondary dark:text-surface-container-highest font-label-sm text-label-sm">
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Standard Grid when FILTERED to avoid grid gaps */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <article 
              key={idx}
              onClick={() => setSelectedProject(project)}
              className="glass-card rounded-xl overflow-hidden group flex flex-col cursor-pointer border border-outline-variant/30 h-full"
            >
              <div className="relative h-64 shrink-0 overflow-hidden bg-surface-container-high dark:bg-[#2d3133]">
                <img 
                  alt={project.title} 
                  className={`project-image w-full h-full object-cover absolute inset-0 ${project.imageAlign}`} 
                  src={project.image}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-label-md text-label-md flex items-center gap-2">
                    View Case Study 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-container-highest mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.slice(0, 3).map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-1 rounded bg-[#B9C9DF]/20 dark:bg-[#B9C9DF]/10 text-slate-deep dark:text-inverse-primary font-label-sm text-label-sm">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 rounded bg-surface-container dark:bg-inverse-surface text-secondary dark:text-surface-container-highest font-label-sm text-label-sm">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* GitHub CTA */}
      <div className="text-center mt-16">
        <a 
          href="https://github.com/Nafiz68"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary dark:text-inverse-primary font-label-md text-label-md hover:underline group cursor-pointer"
        >
          View More Projects on GitHub
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>

      {/* Experience in numbers statistics section */}
      <div className="mt-24 border-t border-surface-variant/30 pt-20" ref={statsRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactStats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`bg-white dark:bg-[#191c1e] p-6 rounded-xl border ${stat.colorClass} soft-shadow flex flex-col gap-3 group hover:-translate-y-1 transition-transform duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/5 dark:bg-inverse-primary/5 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div>
                <div className="font-display-lg text-display-lg text-on-surface dark:text-white font-extrabold flex items-baseline">
                  {displayedStats[idx]}
                  <span className="text-primary dark:text-inverse-primary ml-0.5">{stat.suffix}</span>
                </div>
                <h4 className="font-label-md text-label-md text-on-surface dark:text-white font-bold uppercase tracking-wider mt-1">{stat.label}</h4>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-container-highest text-sm mt-1">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}
