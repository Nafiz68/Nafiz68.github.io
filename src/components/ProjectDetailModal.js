import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { lockScroll } from '../lib/scroll';
import { EASE } from './fx/Reveal';

const FALLBACK_CHALLENGE = "Every successful software project starts with a complex problem. The core hurdle was creating an optimized, secure environment that handles volatile data loads without exposing client logs to centralized risk points.";
const FALLBACK_SOLUTION = "We built an event-driven system leveraging standard local encryption modules and custom algorithms. By caching states on-device and utilizing async processing queues, we lowered load times while guaranteeing zero data loss.";

// Compact case-study dialog that fits one screen: screenshot + stack on the left,
// tabbed story on the right. Arrow keys step through projects.
export default function ProjectDetailModal({ project, onClose, onPrev, onNext, position }) {
  const [tab, setTab] = useState('challenge');

  useEffect(() => {
    lockScroll(true);
    return () => lockScroll(false);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNext, onPrev]);

  const tabs = [
    { id: 'challenge', label: 'Challenge' },
    { id: 'solution', label: 'Solution' },
    ...(project.deliverables ? [{ id: 'deliverables', label: 'Deliverables' }] : []),
  ];
  const activeTab = tabs.some((t) => t.id === tab) ? tab : 'challenge';

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.05 } }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div className="absolute inset-0 bg-ink-950/75 backdrop-blur-md" onClick={onClose} />

      <motion.div
        data-lenis-prevent
        className="relative w-full max-w-6xl max-h-[92svh] overflow-y-auto lg:overflow-hidden rounded-3xl border hairline bg-ink-900 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.7)]"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-4 sm:px-6 h-14 border-b hairline bg-ink-900/90 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span className="truncate">Case study / {project.category}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {position && <span className="hidden sm:inline font-mono text-[11px] text-dim mr-2">{position}</span>}
            {onPrev && (
              <button onClick={onPrev} aria-label="Previous project" className="w-9 h-9 rounded-full border hairline text-muted hover:text-accent hover:border-accent/60 transition-colors">←</button>
            )}
            {onNext && (
              <button onClick={onNext} aria-label="Next project" className="w-9 h-9 rounded-full border hairline text-muted hover:text-accent hover:border-accent/60 transition-colors">→</button>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              className="group ml-1 w-9 h-9 rounded-full border hairline flex items-center justify-center text-fog hover:text-accent hover:border-accent/60 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform duration-500 group-hover:rotate-90">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.title}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid lg:grid-cols-[1.15fr_1fr]"
          >
            {/* Visual + stack */}
            <div className="p-4 sm:p-6 lg:border-r hairline flex flex-col gap-5">
              <motion.div
                initial={{ clipPath: 'inset(8% 8% 8% 8% round 18px)', opacity: 0 }}
                animate={{ clipPath: 'inset(0% 0% 0% 0% round 18px)', opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden border hairline bg-ink-800"
              >
                <img
                  alt={`${project.title} screenshot`}
                  src={project.image}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-[object-position] duration-[3000ms] ease-[cubic-bezier(0.45,0,0.2,1)] group-hover:object-bottom"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200";
                  }}
                />
              </motion.div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim mb-3">Tech stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.25 + i * 0.03 }}
                      className="rounded-md border hairline bg-ink-800 px-2.5 py-1 font-mono text-[11px] text-fog/85"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="p-5 sm:p-7 flex flex-col gap-5 min-h-0">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tightest leading-[1.05] text-fog">{project.title}</h2>
                <p className="mt-3 text-[15px] text-muted leading-relaxed">{project.description}</p>
              </div>

              <dl className="grid grid-cols-2 gap-4 py-4 border-y hairline">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim mb-1">Role</dt>
                  <dd className="text-sm text-fog">{project.role || 'Lead Developer'}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim mb-1">Timeline</dt>
                  <dd className="text-sm text-fog">{project.duration || 'Ongoing'}</dd>
                </div>
              </dl>

              <div>
                <div className="flex gap-1 p-1 rounded-full border hairline w-max max-w-full mb-4">
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`relative px-4 py-1.5 rounded-full text-[13px] transition-colors ${activeTab === t.id ? 'text-on-accent' : 'text-muted hover:text-fog'}`}
                    >
                      {activeTab === t.id && (
                        <motion.span layoutId="case-tab" className="absolute inset-0 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                      )}
                      <span className="relative">{t.label}</span>
                    </button>
                  ))}
                </div>
                <div className="relative min-h-[132px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: EASE }}
                    >
                      {activeTab === 'challenge' && <p className="text-[15px] text-muted leading-relaxed">{project.challenge || FALLBACK_CHALLENGE}</p>}
                      {activeTab === 'solution' && <p className="text-[15px] text-muted leading-relaxed">{project.solution || FALLBACK_SOLUTION}</p>}
                      {activeTab === 'deliverables' && (
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {project.deliverables.map((d, i) => (
                            <li key={d} className="flex gap-3 rounded-xl border hairline bg-ink-850/60 px-3 py-2.5 text-sm text-fog">
                              <span className="font-mono text-[10px] text-accent pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-full bg-accent text-on-accent pl-5 pr-1.5 py-1.5 text-sm font-semibold"
                  >
                    Visit live site
                    <span className="w-8 h-8 rounded-full bg-on-accent/15 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">↗</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-full border hairline px-5 py-2.5 text-sm text-fog hover:border-accent/60 hover:text-accent transition-colors"
                  >
                    <FaGithub className="w-4 h-4" />
                    Repository
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
