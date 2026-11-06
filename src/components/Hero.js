import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import ScrambleText from './fx/ScrambleText';
import Magnetic from './fx/Magnetic';
import { SplitReveal, EASE } from './fx/Reveal';
import { scrollToId } from '../lib/scroll';

const roles = [
  'Software Engineer',
  'Full-Stack Developer',
  'Problem Solver',
  'AI & Automation Specialist',
  'LLM Researcher',
];

const stack = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'FastAPI', 'PyTorch', 'LangChain',
  'MongoDB', 'PostgreSQL', 'Redis', 'ChromaDB', 'Docker', 'n8n', 'Supabase', 'Prisma',
];

function useDhakaTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function DhakaClock() {
  const time = useDhakaTime();
  return <>{time}</>;
}

function PhotoCard({ ready }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const chips = [
    { label: 'AI / RAG', className: '-left-6 top-[18%]', delay: 0 },
    { label: 'Full-Stack', className: '-right-5 top-[46%]', delay: 1.2 },
    { label: 'Automation', className: '-left-3 bottom-[12%]', delay: 2.1 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
      animate={ready ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
      className="relative mx-auto w-[min(62vw,240px)] sm:w-[min(48vw,300px)] lg:w-[min(100%,52svh,410px)]"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="group relative aspect-[4/5] rounded-2xl p-2 border hairline bg-ink-850/70"
      >
        {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((c) => (
          <span key={c} className={`absolute w-5 h-5 border-accent/80 ${c} -m-px rounded-[3px]`} />
        ))}
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <img
            alt="Nafiz Khan"
            src="/images/profile-photo.jpg"
            className="w-full h-full object-cover object-[72%_50%] grayscale-[65%] contrast-[1.05] transition-all duration-1000 ease-out group-hover:grayscale-0 group-hover:scale-[1.04]"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600';
            }}
          />
          <div className="absolute inset-0 scanlines opacity-40 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />
          <motion.div
            className="absolute inset-0 pointer-events-none will-change-transform"
            style={{ background: 'linear-gradient(180deg, transparent 40%, rgb(var(--accent) / 0.15) 50%, transparent 60%)' }}
            animate={{ y: ['-60%', '60%'] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
          />
          <div className="absolute top-3 left-3 right-3 flex justify-between font-mono text-[10px] text-white/80 tracking-wider">
            <span>IMG_001.RAW</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />REC</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end font-mono text-[10px] text-white/80 tracking-wider">
            <span>23.8103° N<br />90.4125° E</span>
            <span className="text-accent">DHAKA, BD</span>
          </div>
        </div>
        {chips.map((chip) => (
          <motion.span
            key={chip.label}
            className={`absolute ${chip.className} hidden sm:flex items-center gap-2 glass border hairline rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-fog shadow-2xl`}
            style={{ transform: 'translateZ(40px)' }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: chip.delay }}
          >
            <span className="w-1 h-1 rounded-full bg-accent" />
            {chip.label}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Hero({ ready }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    if (!ready) return undefined;
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, [ready]);

  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-[100svh] flex flex-col overflow-hidden">

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative flex-1 flex items-center pt-24 md:pt-24 pb-8">
        <div className="container-x w-full grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div {...fade(0.1)} className="inline-flex items-center gap-3 rounded-full border hairline glass pl-2 pr-4 py-1.5 mb-5 md:mb-6">
              <span className="flex items-center gap-2 rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
                Available
              </span>
              <span className="text-xs text-muted">Open to roles & collaborations</span>
            </motion.div>

            <motion.p {...fade(0.2)} className="font-mono text-xs md:text-sm text-muted mb-3">
              <span className="text-accent">const</span> engineer <span className="text-accent-2">=</span> <span className="text-fog">"Nafiz Khan"</span>;
            </motion.p>

            <h1 className="text-[clamp(2.6rem,min(12vw,9.5svh),6.2rem)] lg:text-[clamp(3rem,min(6.4vw,10svh),6.6rem)] font-semibold tracking-tightest leading-[0.95] text-fog">
              <SplitReveal text="Building *intelligent*" animate={ready} delay={0.25} stagger={0.08} />
              <br />
              <SplitReveal text="software." animate={ready} delay={0.45} wordClassName="text-gradient" />
            </h1>

            <motion.div {...fade(0.7)} className="mt-5 md:mt-6 flex items-center gap-3 font-mono text-sm md:text-base min-h-[28px]">
              <span className="text-accent">&gt;</span>
              <span className="text-muted">aspiring</span>
              <ScrambleText key={roleIdx} text={roles[roleIdx]} start={ready} duration={600} className="text-fog" />
              <span className="caret w-2 h-5 bg-accent inline-block" />
            </motion.div>

            <motion.p {...fade(0.8)} className="mt-4 md:mt-5 text-[15px] md:text-base xl:text-lg text-muted max-w-xl leading-relaxed">
              Computer Science graduate specializing in full-stack engineering, AI systems, and workflow automation.
              I build scalable web applications, AI-powered tools, and production-ready software that solve real-world problems.
            </motion.p>

            <motion.div {...fade(0.95)} className="mt-7 md:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Magnetic>
                <button
                  onClick={() => scrollToId('projects')}
                  className="group relative overflow-hidden rounded-full bg-accent text-on-accent pl-6 pr-2 py-2 text-sm font-semibold flex items-center gap-3 shadow-[0_0_40px_-8px_rgb(var(--accent)/0.6)]"
                >
                  <span className="absolute inset-0 bg-fog translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  <span className="relative">View Projects</span>
                  <span className="relative w-10 h-10 rounded-full bg-on-accent/15 text-on-accent flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
                </button>
              </Magnetic>
            </motion.div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <PhotoCard ready={ready} />
          </div>
        </div>
      </motion.div>

      <motion.div {...fade(1.1)} className="relative container-x w-full pb-5 hidden md:grid grid-cols-3 items-end font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
        <div>
          <div className="text-muted">Based in</div>
          <div className="text-fog mt-1">Dhaka, Bangladesh</div>
        </div>
        <button onClick={() => scrollToId('about')} className="justify-self-center flex flex-col items-center gap-3 group" aria-label="Scroll to about">
          <span className="group-hover:text-accent transition-colors">Scroll</span>
          <span className="relative w-px h-8 bg-fog/10 overflow-hidden">
            <motion.span
              className="absolute top-0 left-0 w-px h-4 bg-accent"
              animate={{ y: ['-80%', '220%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </button>
        <div className="text-right">
          <div className="text-muted">Local time</div>
          <div className="text-fog mt-1 tabular-nums"><DhakaClock /> GMT+6</div>
        </div>
      </motion.div>

      <div className="relative border-y hairline bg-ink-900/50 py-3.5 overflow-hidden mask-fade-x marquee-pause">
        <div className="marquee flex w-max gap-10" style={{ '--duration': '45s' }}>
          {[...stack, ...stack].map((s, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.2em] text-muted whitespace-nowrap">
              {s}
              <span className="text-accent/60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
