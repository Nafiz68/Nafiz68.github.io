import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, animate, useInView, useScroll, useTransform } from 'framer-motion';
import ProjectDetailModal from './ProjectDetailModal';
import SectionHeader from './fx/SectionHeader';
import { Reveal, EASE } from './fx/Reveal';
import Magnetic from './fx/Magnetic';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "ThesisFlow",
    featured: true,
    description: "A comprehensive academic research management platform streamlining the thesis submission, supervision, and progress tracking process for BRAC University.",
    github: "https://github.com/Faishal-Monir/Thesis-Management-System",
    demo: "https://thesis-flow-delta.vercel.app/",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Groq(LLaMA 3.1)"],
    category: "Full Stack",
    duration: "3 months",
    image: "/images/projects/thesisflow.png",
    role: "Lead Full-Stack Developer",
    challenge: "Manual thesis coordination involved back-and-forth emails, causing version mismatches, delayed feedback, and lost documentation between students and supervisors.",
    solution: "Built a consolidated dashboard featuring real-time state synchronization, encrypted document archiving, and automated LLM summary generation using Groq LLaMA 3.1.",
    deliverables: ["Platform Web App", "Database Schema Design", "LLM Feedback System", "Authentication Module"]
  },
  {
    title: "TrackUp",
    featured: true,
    description: "A full-featured platform for job applications tracking, featuring resume parsing, reminders, and listing insight extractions via NLP.",
    github: "https://github.com/Nafiz68/TrackUp",
    demo: "https://trackup-job-tracker.vercel.app/",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Socket.IO", "Docker"],
    category: "Full Stack",
    duration: "4 months",
    image: "/images/projects/trackup.png",
    role: "Lead Architect",
    challenge: "Job seekers lose track of deadlines, application stages, and distinct job parameters when applying to dozens of listings.",
    solution: "Built a Kanban board dashboard synced with Node background workers that scrape details, parse resumes locally, and push real-time listing statistics over Socket.IO websockets.",
    deliverables: ["Kanban Application Dashboard", "Resume Extraction Engine", "Real-Time synchronization server", "Vercel & Docker deployments"]
  },
  {
    title: "Sweet Shop POS",
    description: "Full-stack e-commerce and point-of-sale platform featuring robust shopping cart, admin inventories, and transactional logs.",
    github: "https://github.com/Nafiz68/sweet-shop-api",
    demo: "https://sweet-shop-api-ivory.vercel.app/",
    tech: ["React.js", "TypeScript", "Vite", "Tailwind CSS", "Supabase (PostgreSQL)"],
    category: "UI Engineering",
    duration: "1 month",
    image: "/images/projects/sweetshop.png",
    role: "Backend & DB Architect",
    challenge: "Boutique sweet shops deal with fresh inventory expiration and localized deliveries requiring flexible billing structures.",
    solution: "Engineered a PostgreSQL schema integrated with Supabase edge functions to perform inventory checks during transactions, lowering stock discrepancy ratios.",
    deliverables: ["Point of Sale Web App", "Supabase DB Schema", "Edge functions inventory monitor", "Admin inventory console"]
  },
  {
    title: "Zenji Streetwear - E-Commerce Platform",
    description: "A responsive, single-page storefront for a streetwear brand, pairing expressive product browsing with polished motion and an energetic visual identity.",
    demo: "https://zenji-ecommerce-website.vercel.app/",
    github: "https://github.com/Nafiz68/Zenji-Ecommerce-website",
    tech: ["React.js", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "GSAP", "Lenis", "Lucide React"],
    category: "UI Engineering",
    duration: "1 month",
    image: "/images/projects/zenji.png",
    role: "Frontend Developer",
    challenge: "Create a distinctive online storefront that makes a streetwear collection easy to explore while keeping the experience fluid and usable across screen sizes.",
    solution: "Built a modern single-page shopping experience with interactive product browsing, responsive layouts, and layered motion effects. Framer Motion, GSAP, and Lenis bring movement and smooth scrolling together without losing focus on the products.",
    deliverables: ["Responsive Streetwear Storefront", "Interactive Product Browsing", "Animated Page Transitions", "Smooth Scrolling Experience"]
  },
  
  {
  title: "Multimodal RAG Agent",
  featured: true,
  description: "A multimodal Retrieval-Augmented Generation API that identifies clothing products from customer images using CLIP embeddings, ChromaDB vector search, and an AI-powered retrieval pipeline.",
  github: "https://github.com/Nafiz68/Multimodal-RAG-Agent-for-Clothing-Store",
  demo: "https://huggingface.co/spaces/Nafizk368/Multimodal-RAG-Agent-for-Clothing-Store",
  tech: ["Python", "FastAPI", "LangChain", "ChromaDB", "SQLite", "CLIP", "Hugging Face"],
  category: "AI / RAG",
  duration: "1 month",
  image: "/images/projects/multimodal-rag.png",
  role: "AI & Backend Developer",
  challenge: "Traditional keyword search struggles to identify clothing items from images, making it difficult to match customer-uploaded photos with the correct products in a catalog.",
  solution: "Developed a multimodal RAG pipeline that generates CLIP embeddings, performs semantic similarity search with ChromaDB, retrieves product metadata from SQLite, and exposes the workflow through a FastAPI API for real-time image-based product identification.",
  deliverables: [
    "Multimodal RAG API",
    "CLIP Embedding & Vector Search",
    "FastAPI Backend",
    "LangChain Retrieval Agent"
  ]
  },
  {
    title: "Harmonia",
    description: "A music context understanding platform that combines BERT and graph neural networks to classify, explore, and retrieve music using audio structure, tags, and natural-language descriptions.",
    github: "https://github.com/Nafiz68/Harmonia",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "Python", "PyTorch", "PGlite", "Better Auth"],
    category: "AI / Machine Learning",
    duration: "Independent Project",
    image: "/images/projects/harmonia.png",
    role: "AI & Full-Stack Developer",
    challenge: "Music discovery often depends on isolated metadata or simple text matching, which misses relationships between musical structure, descriptive tags, and the language people use to describe what they want to hear.",
    solution: "Developed an interactive platform centered on a GNN–BERT fusion model. BERT supports multi-label music tagging, GraphSAGE models chord and segment relationships, and contrastive learning connects audio clips with natural-language captions for retrieval. Visualizations help users inspect the connections between music, tags, and text.",
    deliverables: ["GNN–BERT Music Context Model", "Multi-Label Music Tag Classifier", "Natural-Language Audio Retrieval", "Interactive Music Relationship Visualizations"]
  },
  {
  title: "NavWatch",
  description: "A real-time AIS vessel tracking platform that decodes live maritime data from a TCP feed and visualizes vessel movements on an interactive map with live updates.",
  github: "https://github.com/Nafiz68/AIS-Vessel-Map",
  demo: "https://ais-vessel-map.vercel.app/",
  tech: ["React.js", "Node.js", "Express.js", "MongoDB", "WebSocket", "Leaflet"],
  category: "Full Stack",
  duration: "1 month",
  image: "/images/projects/navwatch.png",
  role: "Full Stack Developer",
  challenge: "Real-time AIS vessel feeds generate continuous high-volume NMEA messages that require efficient decoding, storage, and synchronization without introducing duplicate records or UI lag.",
  solution: "Built a full-stack system that decodes live AIS messages, upserts vessel data in MongoDB, and broadcasts updates via WebSockets to an interactive Leaflet map with searchable vessel information and real-time status indicators.",
  deliverables: [
    "Real-time Vessel Tracking Dashboard",
    "AIS NMEA Decoder & TCP Integration",
    "WebSocket Live Update System",
    "REST API & MongoDB Backend"
  ]
  },
  {
    title: "Due Diligence Agent",
    featured: true,
    description: "AI-powered automation system that processes enterprise questionnaires using document indexing, semantic search, and RAG answer generation.",
    github: "https://github.com/Nafiz68/Due-Diligence-Agent",
    tech: ["Node.js", "Express", "MongoDB", "Redis", "ChromaDB", "Groq (LLaMA 3.1)", "HuggingFace", "React", "TypeScript"],
    category: "AI / RAG",
    duration: "5 months",
    image: "/images/projects/due-dilligence.png",
    role: "AI Systems Architect",
    challenge: "Filling business compliance questionnaires takes weeks of auditing past corporate PDF reports and manual cross-referencing.",
    solution: "Designed an automated retrieval-augmented generation (RAG) agent that indexes documents into ChromaDB vector stores, generates context-anchored responses with exact citations, and uses Redis queues to manage parallel tasks.",
    deliverables: ["Vector Indexing Pipeline", "RAG Answer Generator", "Admin Approval Console", "Asynchronous Redis Workers"]
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
    role: "Product & Interface Developer",
    challenge: "Standard gig platforms have high friction for direct developer matching, requiring complex proposal processes for simple assignments.",
    solution: "Created a single-click matchmaking funnel utilizing client-side caching, instant filters, and optimized Three.js decorative 3D assets to drive recruitment visual metrics.",
    deliverables: ["Frontend Web Interface", "Instant Gig matching algorithm", "3D Asset optimizations", "Admin Dashboard"]
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
    role: "Security & Backend Lead",
    challenge: "Storing keys and threat monitoring coordinates in third-party clouds exposes critical infrastructure data to perimeter breaches.",
    solution: "Implemented PBKDF2 key derivation and AES-GCM local encrypting inside the client browser. No plain text data or passwords ever leave the user environment.",
    deliverables: ["Zero-Knowledge Vault UI", "Cryptographic Operations Module", "Prisma Database sync schema", "Reconnaissance visual logs"]
  },

  {
    title: "Timing Side-Channel Attack Demonstration",
    description: "An educational security project exploring how execution-time differences can reveal information about a system’s internal behavior.",
    github: "https://github.com/Nafiz68/Timing-Side-Channel-Attack-Demonstration",
    tech: ["Timing Analysis", "Side-Channel Security", "Secure Implementation"],
    category: "Cybersecurity",
    duration: "Independent Project",
    image: "/images/projects/timing-attack.png",
    role: "Security Project Developer",
    challenge: "Timing differences in software can unintentionally expose clues about hidden data or internal decisions, even when the system does not directly reveal that information.",
    solution: "Created a demonstration of timing-based information leakage to make the side-channel concept easier to understand and show why secure software needs to account for observable execution behavior.",
    deliverables: ["Timing Side-Channel Demonstration", "Execution-Time Analysis", "Security Learning Resource"]
  },
  {
  title: "Multi-Agent AI Debate System",
  description: "A LangChain-powered multi-agent system where two AI agents debate opposing viewpoints while a third AI judge evaluates arguments and returns structured scoring with a final verdict.",
  github: "https://github.com/Nafiz68/Multi-Agent-AI-Debate-System",
  demo: "",
  tech: ["Python", "LangChain", "Groq", "LLMs", "Google Colab"],
  category: "AI Agents & Automation",
  duration: "1 week",
  image: "/images/projects/ai-debate.png",
  role: "AI Developer",
  challenge: "Evaluating AI reasoning objectively requires coordinating multiple specialized agents while maintaining structured debate flow and unbiased assessment.",
  solution: "Built a multi-agent debate framework where two LLM-powered agents generate arguments and rebuttals from opposing perspectives, while a dedicated judge agent scores logic, clarity, and persuasiveness before producing a structured JSON verdict.",
  deliverables: [
    "Multi-Agent Debate Framework",
    "AI Judge & Scoring System",
    "Structured JSON Output",
    "LangChain Agent Orchestration"
  ]
 },
 {
  title: "n8n AI Automation Collection",
  description: "A curated collection of 35+ production-ready n8n workflows automating AI agents, business processes, content generation, lead generation, and productivity tasks using modern APIs and LLMs.",
  github: "https://github.com/Nafiz68/n8n-workflows",
  demo: "",
  tech: ["n8n", "OpenAI", "LangChain", "Google Sheets", "Telegram", "REST APIs"],
  category: "AI Agents & Automation",
  duration: "10 months",
  image: "/images/projects/n8n-workflows.png",
  role: "Automation Engineer",
  challenge: "Businesses often rely on repetitive manual workflows across multiple platforms, leading to inefficiencies, slow response times, and fragmented automation.",
  solution: "Designed and built a repository of 40+ reusable n8n workflows covering AI agents, RAG pipelines, recruitment, CRM automation, content generation, notifications, and business process automation, enabling rapid deployment with configurable credentials.",
  deliverables: [
    "40+ Ready-to-Use n8n Workflows",
    "AI Agents & RAG Pipelines",
    "Business Process Automation",
    "API & Third-Party Integrations"
  ]
  },

  
  // {
  //   title: "Realtime Playlist",
  //   description: "Collaborative music queue sync with SSE, drag-and-drop reordering using fractional indexing, and a live voting system.",
  //   github: "https://github.com/Nafiz68/Realtime-Collaborative-Playlist",
  //   demo: "https://realtime-collaborative-playlist.vercel.app/",
  //   tech: ["Next.js 16", "React 19", "TypeScript", "Prisma ORM", "SQLite", "Tailwind CSS 4", "Framer Motion"],
  //   category: "Full Stack",
  //   duration: "2 months",
  //   image: "/images/projects/realtime.png",
  //   role: "Frontend Engineer",
  //   challenge: "Managing shared music playlists asynchronously leads to race conditions, stuttering queue sync, and disjointed group voting experiences.",
  //   solution: "Leveraged Server-Sent Events (SSE) for sub-second synchronization and fractional indexing algorithms to enable drag-and-drop reordering without database re-indexing loops.",
  //   deliverables: ["Synchronized Queue Player UI", "SSE Push Server", "Fractional Index Sorting Module", "Framer Motion animations"]
  // },
  
];

const impactStats = [
  { value: 9, suffix: '+', label: 'Clients Served', description: 'Satisfied clients and collaborators globally.' },
  { value: 16, suffix: '+', label: 'Projects Delivered', description: 'High-performance production applications.' },
  { value: 99, suffix: '%', label: 'Delivery Success Rate', description: 'On-time delivery and client satisfaction.' },
  { value: 35, suffix: '+', label: 'Self Projects Built', description: 'Open-source tools, packages, and extensions.' },
];

function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref} className="tabular-nums">{display}</span>;
}

// "github.com/Nafiz68/TrackUp" or the live site's host, shown in the window's address bar.
const addressFor = (project) => {
  try {
    if (project.demo) return new URL(project.demo).hostname.replace(/^www\./, '');
    return new URL(project.github).pathname.replace(/^\//, 'github.com/');
  } catch {
    return project.title.toLowerCase().replace(/\s+/g, '-');
  }
};

const featuredProjects = projects.filter((p) => p.featured);
const archiveProjects = projects.filter((p) => !p.featured);

function LinkButtons({ project }) {
  const stop = (e) => e.stopPropagation();
  return (
    <div className="flex items-center gap-2">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          aria-label={`${project.title} source code`}
          className="w-9 h-9 rounded-full border hairline flex items-center justify-center text-muted hover:text-accent hover:border-accent/60 transition-colors"
        >
          <FaGithub className="w-3.5 h-3.5" />
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          aria-label={`${project.title} live site`}
          className="h-9 rounded-full border hairline flex items-center gap-2 px-3.5 font-mono text-[10px] uppercase tracking-wider text-muted hover:text-accent hover:border-accent/60 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
          Live
        </a>
      )}
    </div>
  );
}

// One featured project. Cards pin in place and the earlier ones shrink back as later ones slide over them.
function FeaturedCard({ project, i, total, progress, onOpen }) {
  const targetScale = 1 - (total - 1 - i) * 0.045;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const open = () => onOpen(project);

  return (
    <div className="sticky top-0 h-[100svh] flex items-center justify-center">
      <motion.div
        style={{ scale, top: `calc(-4svh + ${i * 22}px)` }}
        className="relative w-full origin-top"
      >
        <div
          role="button"
          tabIndex={0}
          onClick={open}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open())}
          data-cursor="Open"
          className="group relative grid lg:grid-cols-12 rounded-3xl border hairline bg-ink-900 overflow-hidden lg:h-[min(520px,70svh)] shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.5)]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(circle at ${i % 2 ? '100% 0%' : '0% 100%'}, rgb(var(--accent) / 0.12), transparent 50%)` }}
          />

          {/* Copy */}
          <div className="relative lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col gap-5 order-2 lg:order-1">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
              <span className="text-accent">Featured / {String(i + 1).padStart(2, '0')}</span>
              <span className="text-dim">{String(i + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}</span>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim mb-3">{project.category}</div>
              <h3 className="text-3xl sm:text-4xl xl:text-5xl font-semibold tracking-tightest leading-[1.02] text-fog group-hover:text-accent transition-colors duration-500">
                {project.title}
              </h3>
            </div>
            <p className="text-sm md:text-base text-muted leading-relaxed line-clamp-3 lg:line-clamp-4">{project.description}</p>
            <dl className="grid grid-cols-2 gap-4 py-4 border-y hairline">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim mb-1">Role</dt>
                <dd className="text-sm text-fog">{project.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim mb-1">Timeline</dt>
                <dd className="text-sm text-fog">{project.duration}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 5).map((tech) => (
                <span key={tech} className="rounded-md border hairline bg-ink-800/60 px-2 py-1 font-mono text-[10px] text-fog/80">
                  {tech}
                </span>
              ))}
              {project.tech.length > 5 && <span className="px-2 py-1 font-mono text-[10px] text-dim">+{project.tech.length - 5}</span>}
            </div>
            <div className="mt-auto flex items-center justify-between gap-4 pt-2">
              <span className="flex items-center gap-3 text-sm font-medium text-fog">
                <span className="w-10 h-10 rounded-full bg-accent text-on-accent flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
                Read case study
              </span>
              <LinkButtons project={project} />
            </div>
          </div>

          {/* Screenshot in a window frame */}
          <div className="relative lg:col-span-7 p-3 sm:p-4 lg:pl-0 order-1 lg:order-2">
            <div className="relative h-56 sm:h-72 lg:h-full rounded-2xl border hairline bg-ink-800 overflow-hidden flex flex-col">
              <div className="flex items-center gap-3 px-4 h-9 shrink-0 border-b hairline bg-ink-850/80">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
                </div>
                <div className="flex-1 min-w-0 flex items-center gap-2 rounded-md bg-ink-950/60 border hairline px-2.5 h-6 max-w-sm mx-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span className="font-mono text-[10px] text-muted truncate">{addressFor(project)}</span>
                </div>
              </div>
              <div className="relative flex-1 overflow-hidden">
                <img
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  src={project.image}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-[object-position,transform] duration-[3000ms] ease-[cubic-bezier(0.45,0,0.2,1)] group-hover:object-bottom group-hover:scale-[1.02]"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FeaturedStack({ onOpen }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <div ref={ref} className="relative">
      {featuredProjects.map((project, i) => (
        <FeaturedCard
          key={project.title}
          project={project}
          i={i}
          total={featuredProjects.length}
          progress={scrollYProgress}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

const CYCLE_MS = 5000;

// Preview panel for the active archive project. Screenshots wipe in from the bottom on change.
function ArchivePreview({ project, onOpen }) {
  return (
    <div className="relative rounded-3xl border hairline bg-ink-900/80 overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
      <div className="flex items-center gap-3 px-4 h-10 border-b hairline bg-ink-850/70">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-2 rounded-md bg-ink-950/60 border hairline px-2.5 h-6 max-w-sm mx-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={project.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[10px] text-muted truncate"
            >
              {addressFor(project)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onOpen(project)}
        data-cursor="Open"
        className="group relative block w-full h-[clamp(170px,36svh,360px)] overflow-hidden bg-ink-800"
        aria-label={`Open ${project.title} case study`}
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={project.title}
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top transition-[object-position] duration-[2600ms] ease-[cubic-bezier(0.45,0,0.2,1)] group-hover:object-bottom"
            initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.08 }}
            animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.25 } }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200";
            }}
          />
        </AnimatePresence>
        <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
          {project.category}
        </span>
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="p-4 md:p-5 flex flex-col gap-3"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h4 className="text-xl md:text-2xl font-semibold tracking-tight text-fog">{project.title}</h4>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                {project.role} / {project.duration}
              </div>
            </div>
            <LinkButtons project={project} />
          </div>
          <p className="text-sm text-muted leading-relaxed line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((tech) => (
                <span key={tech} className="rounded-md border hairline bg-ink-800/60 px-2 py-1 font-mono text-[10px] text-fog/80">{tech}</span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="group/cs flex items-center gap-2 text-sm font-medium text-fog hover:text-accent transition-colors"
            >
              Case study
              <span className="transition-transform duration-500 group-hover/cs:translate-x-1">→</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Compact list on the left, live preview on the right. Auto-advances until the visitor interacts.
function ArchiveList({ onOpen }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-20% 0px -20% 0px' });

  const categories = useMemo(() => ['All', ...new Set(archiveProjects.map((p) => p.category))], []);
  const filtered = useMemo(
    () => (activeFilter === 'All' ? archiveProjects : archiveProjects.filter((p) => p.category === activeFilter)),
    [activeFilter]
  );
  const current = filtered[Math.min(active, filtered.length - 1)];
  const cycling = inView && !paused && filtered.length > 1;

  useEffect(() => {
    if (!cycling) return undefined;
    const id = setTimeout(() => setActive((i) => (i + 1) % filtered.length), CYCLE_MS);
    return () => clearTimeout(id);
  }, [cycling, active, filtered.length]);

  const choose = (filter) => {
    setActiveFilter(filter);
    setActive(0);
  };

  // Hover previews on desktop; on touch the first tap previews and the second opens.
  const onRowClick = (project, i) => {
    if (i === active || window.matchMedia('(hover: hover)').matches) onOpen(project);
    else setActive(i);
  };

  return (
    <div ref={ref} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent mb-3">{'// archive'}</div>
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-fog">
            More projects <span className="font-mono text-base text-dim align-middle">({archiveProjects.length})</span>
          </h3>
        </Reveal>
        <Reveal delay={0.08} className="flex flex-wrap gap-1.5">
          {categories.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => choose(filter)}
                className={`relative rounded-full px-3.5 py-1.5 text-xs transition-colors duration-300 border ${
                  isActive ? 'text-on-accent border-transparent' : 'text-muted hover:text-fog hairline'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="archive-filter"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        <div className="lg:col-span-7 lg:order-2 lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)]">
          {current && <ArchivePreview project={current} onOpen={onOpen} />}
        </div>

        <Reveal className="lg:col-span-5 lg:order-1">
          <ul className="relative border-t hairline">
            <AnimatePresence initial={false} mode="popLayout">
              {filtered.map((project, i) => {
                const isActive = current === project;
                return (
                  <motion.li
                    key={project.title}
                    layout
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.45, ease: EASE, delay: i * 0.03 }}
                    className="relative border-b hairline"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="archive-active"
                        className="absolute inset-0 bg-gradient-to-r from-accent/[0.12] via-accent/[0.04] to-transparent border-l-2 border-accent"
                        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => onRowClick(project, i)}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                      onFocus={() => setActive(i)}
                      data-cursor="Open"
                      className="group relative w-full flex items-center gap-4 px-4 py-3 text-left"
                    >
                      <span className={`font-mono text-[11px] tabular-nums transition-colors ${isActive ? 'text-accent' : 'text-dim'}`}>
                        {String(archiveProjects.indexOf(project) + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span
                          className={`block truncate text-[15px] md:text-base font-medium tracking-tight transition-all duration-500 ${
                            isActive ? 'text-fog translate-x-1.5' : 'text-muted'
                          }`}
                        >
                          {project.title}
                        </span>
                      </span>
                      <span className="hidden sm:block shrink-0 font-mono text-[10px] uppercase tracking-wider text-dim">
                        {project.category.split(' ')[0]}
                      </span>
                      <span
                        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all duration-500 ${
                          isActive ? 'bg-accent text-on-accent rotate-[-45deg]' : 'text-dim'
                        }`}
                      >
                        →
                      </span>
                    </button>
                    {isActive && cycling && (
                      <motion.span
                        key={`progress-${active}`}
                        className="absolute left-0 bottom-[-1px] h-px w-full bg-accent origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
            {cycling ? 'Auto-playing. Hover to explore.' : 'Click a project to open its case study.'}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const step = (dir) =>
    setSelectedProject((p) => projects[(projects.indexOf(p) + dir + projects.length) % projects.length]);

  return (
    <section id="projects" className="relative py-14 md:py-20">
      <div className="container-x">
        <SectionHeader
          index="03"
          label="Portfolio"
          title="Selected *works*."
          description="A curated gallery of engineering challenges solved, emphasizing performance, vector models, and client safety."
        />

        <FeaturedStack onOpen={setSelectedProject} />

        <div className="mt-12 md:mt-16">
          <ArchiveList onOpen={setSelectedProject} />
        </div>

        {/* GitHub CTA */}
        <Reveal className="mt-10 flex justify-center">
          <Magnetic>
            <a
              href="https://github.com/Nafiz68"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border hairline glass px-6 py-3.5 text-sm text-fog hover:border-accent/60 transition-colors duration-300"
            >
              <span className="font-mono text-xs text-accent">$</span>
              View more projects on GitHub
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
        </Reveal>

        {/* Experience in numbers */}
        <div className="mt-14 md:mt-16 grid grid-cols-2 lg:grid-cols-4 border-t border-l hairline rounded-2xl overflow-hidden">
          {impactStats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 0.08} className="border-r border-b hairline">
              <div className="group relative p-6 md:p-8 h-full hover:bg-fog/[0.02] transition-colors duration-500">
                <div className="font-mono text-[10px] text-dim mb-6">0{idx + 1} /</div>
                <div className="text-[2.6rem] sm:text-5xl lg:text-6xl font-semibold tracking-tightest text-fog leading-none">
                  <Counter value={stat.value} />
                  <span className="text-accent">{stat.suffix}</span>
                </div>
                <h4 className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-fog">{stat.label}</h4>
                <p className="mt-2 text-sm text-muted leading-relaxed">{stat.description}</p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-700" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            key="case-study"
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
            position={`${String(projects.indexOf(selectedProject) + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
