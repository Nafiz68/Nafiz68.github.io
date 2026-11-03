import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, animate, useInView } from 'framer-motion';
import SectionHeader from './fx/SectionHeader';
import { Reveal, EASE } from './fx/Reveal';
import { FaRobot, FaBrain, FaDatabase, FaPlug, FaTools, FaGraduationCap, FaTrophy, FaScroll, FaCode } from 'react-icons/fa';

const frontendSkills = [
  { name: "React / Next.js", level: 85 },
  { name: "JavaScript / TypeScript", level: 85 },
  { name: "Tailwind CSS & Styling", level: 90 },
  { name: "Socket.IO", level: 80 },
  { name: "Web3.js", level: 75 },
  { name: "OpenGL / Computer Graphics", level: 65 }
];

const backendSkills = [
  { name: "Node.js / Express.js", level: 80 },
  { name: "Python / FastAPI / PyTorch", level: 80 },
  { name: "SQL & NoSQL (Postgres, MongoDB)", level: 80 },
  { name: "Supabase & Prisma ORM", level: 80 },
  // { name: "OAuth2 & Passport.js", level: 80 },
  { name: "Blockchain (Solidity, Hyperledger)", level: 60 }
];

const toolGroups = [
  { id: 'automation', label: 'Automation', icon: FaRobot, version: '4.0.0', items: ["n8n Automation","make.com", "Puppeteer", "Playwright", "Web Scraping"] },
  { id: 'ai', label: 'AI & LLM', icon: FaBrain, version: '3.1.0', items: ["OpenAI API", "Groq AI", "LangChain", "Cohere", "Vector Databases", "NLP"] },
  { id: 'data', label: 'Data & Storage', icon: FaDatabase, version: '2.4.0', items: ["Supabase", "Prisma ORM", "Redis", "Data Extraction", "Data Manipulation", "Regex", "pdf-parse", "mammoth", "Hubspot"] },
  { id: 'apis', label: 'APIs & Auth', icon: FaPlug, version: '1.8.0', items: ["REST APIs", "Webhook Integration", "JWT Authentication", "OAuth2"] },
  { id: 'devops', label: 'DevOps & Tools', icon: FaTools, version: '5.2.0', items: ["Git / GitHub", "Docker", "Postman", "Figma", "Arduino"] },
];

const professionalEdge = [
  {
    title: "Academic High Distinction",
    icon: FaGraduationCap,
    metric: "2x",
    unit: "Dean's List",
    description: "Awarded Dean's List honors at BRAC University in Summer 2024 and Spring 2025."
  },
  {
    title: "Award-Winning Project",
    icon: FaTrophy,
    metric: "2nd",
    unit: "Runner-up, CSE471",
    description: "Secured 2nd Runner-up position at the BRAC CSE471 Project Showcase (Summer 2025) for ThesisFlow."
  },
  {
    title: "Research Publication",
    icon: FaScroll,
    metric: "1",
    unit: "Published paper",
    description: "Published undergraduate research on improving the robustness of pretrained LLMs against quantization and weight noise attacks."
  },
  {
    title: "Problem Solving",
    icon: FaCode,
    metric: "150+",
    unit: "Problems solved",
    description: "Solved 150+ coding problems across competitive programming platforms, strengthening algorithmic and analytical thinking."
  },
  // {
  //   title: "Workflow Automation",
  //   description: "Designed and deployed 50+ automation workflows and AI-powered integrations using n8n."
  // }
];

const R = 38;
const CIRC = 2 * Math.PI * R;

// Ring gauge: the arc sweeps to the level while the number counts up.
function Gauge({ skill, index }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, skill.level, {
      duration: 1.4,
      delay: 0.1 + index * 0.08,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [skill.level, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
      className="group flex flex-col items-center text-center basis-1/2 sm:basis-1/3 lg:basis-0 lg:flex-1 px-2"
    >
      <div className="relative w-[92px] h-[92px] transition-transform duration-500 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgb(var(--fog) / 0.14)" strokeWidth="1" strokeDasharray="1 5.02" />
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgb(var(--fog) / 0.08)" strokeWidth="5" />
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="rgb(var(--accent))"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            animate={{ strokeDashoffset: CIRC * (1 - skill.level / 100) }}
            transition={{ duration: 1.4, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: 'drop-shadow(0 0 6px rgb(var(--accent) / 0.55))' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold tracking-tight text-fog tabular-nums leading-none">{value}</span>
          <span className="font-mono text-[9px] text-dim mt-1">/ 100</span>
        </div>
        <span className="absolute inset-0 rounded-full bg-accent/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>
      <span className="mt-3 text-[13px] leading-snug text-fog/90 max-w-[130px] group-hover:text-accent transition-colors">
        {skill.name}
      </span>
    </motion.div>
  );
}

const stacks = [
  { id: 'frontend', label: 'Frontend', code: 'fe.module', skills: frontendSkills },
  { id: 'backend', label: 'Backend & APIs', code: 'be.module', skills: backendSkills },
];

// One compact panel instead of two tall cards: tab switch + a row of gauges.
function SkillHud() {
  const [tab, setTab] = useState('frontend');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const stack = stacks.find((s) => s.id === tab);
  const avg = Math.round(stack.skills.reduce((a, s) => a + s.level, 0) / stack.skills.length);

  return (
    <article ref={ref} className="spotlight relative rounded-2xl overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ background: 'linear-gradient(180deg, transparent 33%, rgb(var(--accent) / 0.06) 50%, transparent 67%)' }}
          animate={{ y: ['-65%', '65%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <header className="relative flex flex-wrap items-center justify-between gap-4 px-5 md:px-7 pt-5 md:pt-6">
        <div className="flex gap-1 p-1 rounded-full border hairline bg-ink-950/40">
          {stacks.map((s) => (
            <button
              key={s.id}
              onClick={() => setTab(s.id)}
              className={`relative px-4 py-1.5 rounded-full text-[13px] transition-colors ${tab === s.id ? 'text-on-accent' : 'text-muted hover:text-fog'}`}
            >
              {tab === s.id && (
                <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
              )}
              <span className="relative">{s.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
          <span>{stack.code}</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
            avg <span className="text-accent tabular-nums">{avg}%</span>
          </span>
        </div>
      </header>

      <div className="relative px-5 md:px-7 py-7 md:py-8 min-h-[190px]">
        {inView && (
          <AnimatePresence mode="wait">
            <motion.div key={tab} className="flex flex-wrap justify-center gap-y-7">
              {stack.skills.map((skill, i) => (
                <Gauge key={skill.name} skill={skill} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </article>
  );
}

const TOOL_CYCLE_MS = 5000;

// Typed command line; restarts whenever `text` changes.
function Typed({ text }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    let count = 0;
    const id = setInterval(() => {
      count += 1;
      setN(count);
      if (count >= text.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span>
      {text.slice(0, n)}
      <span className="caret inline-block w-2 h-4 -mb-0.5 ml-0.5 bg-accent" />
    </span>
  );
}

// Tools as a package tree inside a terminal; groups auto-cycle until the visitor picks one.
function ToolTerminal() {
  const [group, setGroup] = useState(0);
  const [locked, setLocked] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-20% 0px -20% 0px' });
  const current = toolGroups[group];
  const total = toolGroups.reduce((a, g) => a + g.items.length, 0);

  useEffect(() => {
    if (!inView || locked) return undefined;
    const id = setTimeout(() => setGroup((g) => (g + 1) % toolGroups.length), TOOL_CYCLE_MS);
    return () => clearTimeout(id);
  }, [inView, locked, group]);

  return (
    <article ref={ref} className="relative rounded-2xl border hairline bg-ink-900/80 overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
      {/* Chrome */}
      <div className="flex items-center gap-3 px-4 h-10 border-b hairline bg-ink-850/70">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <span className="font-mono text-[11px] text-dim">~/nafiz/toolbox</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
          <span className="text-accent">{total}</span> packages
        </span>
      </div>

      <div className="grid md:grid-cols-[220px_1fr]">
        {/* Groups */}
        <nav className="flex md:flex-col gap-1 p-3 overflow-x-auto md:border-r hairline select-none">
          {toolGroups.map((g, i) => {
            const isActive = i === group;
            return (
              <button
                key={g.id}
                onClick={() => {
                  setGroup(i);
                  setLocked(true);
                }}
                className={`relative shrink-0 flex items-center justify-between gap-4 rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                  isActive ? 'text-fog' : 'text-muted hover:text-fog'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="tool-group"
                    className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative flex items-center gap-2.5">
                  <g.icon className={`w-3.5 h-3.5 ${isActive ? 'text-accent' : 'text-dim'}`} />
                  {g.label}
                </span>
                <span className={`relative font-mono text-[10px] ${isActive ? 'text-accent' : 'text-dim'}`}>{g.items.length}</span>
                {isActive && !locked && inView && (
                  <motion.span
                    key={`p-${group}`}
                    className="absolute left-2 right-2 bottom-0.5 h-px bg-accent origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: TOOL_CYCLE_MS / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Output */}
        <div className="p-4 md:p-5 font-mono text-[13px] min-h-[228px]">
          <div className="text-muted mb-3">
            <span className="text-accent">❯</span> <Typed text={`npm ls @nafiz/${current.id} --depth=0`} />
          </div>
          <div key={current.id}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-dim mb-2"
              >
                @nafiz/{current.id}@{current.version}
              </motion.div>
              <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-6">
                {current.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: EASE, delay: 0.7 + i * 0.06 }}
                    className="group flex items-center gap-2 py-1.5 rounded-md -mx-2 px-2 hover:bg-accent/[0.07] transition-colors"
                  >
                    <span className="text-dim">{i === current.items.length - 1 ? '└──' : '├──'}</span>
                    <span className="text-fog/90 group-hover:text-accent transition-colors truncate">{item}</span>
                    <span className="ml-auto text-[10px] text-dim opacity-0 group-hover:opacity-100 transition-opacity">✓ installed</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + current.items.length * 0.06 }}
                className="mt-3 text-[11px] text-accent"
              >
                ✓ {current.items.length} packages, 0 vulnerabilities
              </motion.div>
          </div>
        </div>
      </div>
    </article>
  );
}

// Achievement tiles: glowing icon, headline figure, travelling border light on hover.
function Achievements() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {professionalEdge.map((edge, idx) => (
        <Reveal key={edge.title} delay={idx * 0.08} className="h-full">
          <article className="group relative h-full rounded-2xl transition-transform duration-500 hover:-translate-y-1">
            <div aria-hidden="true" className="beam-border opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="beam-border__light" />
            </div>
            <div className="relative h-full rounded-2xl border hairline bg-ink-900/75 p-5 md:p-6 overflow-hidden flex flex-col" style={{ boxShadow: 'var(--card-shadow)' }}>
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'radial-gradient(circle, rgb(var(--accent) / 0.18), transparent 70%)' }}
              />
              <div className="relative flex items-start justify-between mb-5">
                <span className="relative w-11 h-11 rounded-xl border border-accent/30 bg-accent/10 flex items-center justify-center text-accent transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                  <edge.icon className="w-[18px] h-[18px]" />
                </span>
                <span className="font-mono text-[10px] text-dim">#{String(idx + 1).padStart(2, '0')}</span>
              </div>
              <div className="relative text-3xl md:text-[2rem] font-semibold tracking-tightest text-fog leading-none">
                {edge.metric}
              </div>
              <div className="relative font-mono text-[10px] uppercase tracking-[0.18em] text-accent mt-2 mb-4">{edge.unit}</div>
              <h4 className="relative text-[15px] font-semibold text-fog mb-1.5">{edge.title}</h4>
              <p className="relative text-[13px] text-muted leading-relaxed">{edge.description}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-14 md:py-20">
      <div className="container-x">
        <SectionHeader
          index="04"
          label="Capabilities"
          title="Technical *expertise*."
          description="A comprehensive overview of my technical stack and core professional edge."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {/* Frontend + backend */}
          <Reveal className="lg:col-span-2">
            <SkillHud />
          </Reveal>

          {/* Tools */}
          <Reveal className="lg:col-span-2">
            <ToolTerminal />
          </Reveal>

          {/* Recognition */}
          <div className="lg:col-span-2 mt-4">
            <Reveal className="flex items-end justify-between gap-4 mb-5">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-fog">
                Impact & <span className="font-serif italic font-normal text-accent">recognition</span>
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">achievements.log</span>
            </Reveal>
            <Achievements />
          </div>
        </div>
      </div>
    </section>
  );
}
