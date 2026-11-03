import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeader from './fx/SectionHeader';
import { Reveal, EASE } from './fx/Reveal';
import { downloadFile } from '../lib/scroll';

const statement =
  "I turn complex problems into scalable software, blending clean engineering, intelligent automation, and real-world usability.";

const focusAreas = ['Software Engineering', 'Full-Stack Development', 'AI Agents & Automation', 'System Design', 'AI Research'];

const services = [
  {
    title: "Full-Stack Development",
    description: "Building robust, end-to-end web applications with modern tech stacks like React, Next.js, Node.js, and databases.",
    tag: "react · node · sql",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    )
  },
  {
    title: "API Integrations",
    description: "Building scalable integrations between third-party services, databases, CRMs, and AI systems using REST APIs, webhooks, and authentication protocols.",
    tag: "rest · webhooks · oauth",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.182-2.121a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    )
  },
  {
    title: "Machine Learning & AI",
    description: "Applying advanced machine learning models and data science algorithms to resolve complex, real-world analytical problems.",
    tag: "pytorch · rag · llms",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.75h4.5M12 3.75v3m-6 3h12a1.5 1.5 0 011.5 1.5v6A1.5 1.5 0 0118 18.75H6a1.5 1.5 0 01-1.5-1.5v-6A1.5 1.5 0 016 9.75Zm3 3h.008v.008H9v-.008Zm6 0h.008v.008H15v-.008ZM9 15h6" />
      </svg>
    )
  },
  {
    title: "AI Agents & Automation",
    description: "Building intelligent workflow automation systems using n8n and orchestrating multi-agent AI architectures to solve operational issues.",
    tag: "n8n · agents · langchain",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.983 3.75c.382 0 .757.02 1.125.058l.34 1.703a7.52 7.52 0 012.03.84l1.447-.963a8.3 8.3 0 011.59 1.59l-.963 1.447c.36.64.643 1.319.84 2.03l1.703.34a8.36 8.36 0 010 2.25l-1.703.34a7.52 7.52 0 01-.84 2.03l.963 1.447a8.3 8.3 0 01-1.59 1.59l-1.447-.963a7.52 7.52 0 01-2.03.84l-.34 1.703a8.36 8.36 0 01-2.25 0l-.34-1.703a7.52 7.52 0 01-2.03-.84l-1.447.963a8.3 8.3 0 01-1.59-1.59l.963-1.447a7.52 7.52 0 01-.84-2.03l-1.703-.34a8.36 8.36 0 010-2.25l1.703-.34a7.52 7.52 0 01.84-2.03l-.963-1.447a8.3 8.3 0 011.59-1.59l1.447.963a7.52 7.52 0 012.03-.84l.34-1.703c.368-.038.743-.058 1.125-.058Z" />
      </svg>
    )
  }
];

const cvs = [
  {
    label: 'Academic CV',
    path: '/Nafiz_Khan_Academic_CV.pdf',
    file: 'Nafiz_Khan_Academic_CV.pdf',
    blurb: 'Research & publications',
    lines: [70, 92, 85, 60, 78, 95, 88, 52, 74, 90],
  },
  {
    label: 'Technical CV',
    path: '/resume.pdf',
    file: 'Nafiz_Khan_Technical_CV.pdf',
    blurb: 'Engineering & projects',
    lines: [55, 88, 94, 72, 64, 90, 80, 58, 86, 70],
  },
];

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}

// Statement whose words light up as it scrolls through the viewport.
function ScrollStatement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = statement.split(' ');
  return (
    <p ref={ref} className="relative text-[1.5rem] sm:text-3xl lg:text-[2.6rem] font-medium tracking-tight leading-[1.2] text-fog max-w-5xl">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w === 'intelligent' ? <span className="font-serif italic font-normal text-accent">{w}</span> : w}
        </Word>
      ))}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="relative pt-16 md:pt-20 pb-6 md:pb-8">
      <div className="container-x">
        <SectionHeader index="01" label="About me" title="Building scalable software and *practical* AI solutions." />

        <ScrollStatement />

        <div className="mt-10 md:mt-14 grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-28">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim mb-5">{"// profile.json"}</div>
              <div className="rounded-2xl border hairline bg-ink-900/70 p-5 font-mono text-[13px] leading-7">
                <div><span className="text-dim">{'{'}</span></div>
                <div className="pl-4"><span className="text-accent-2">"degree"</span>: <span className="text-fog">"BSc CSE"</span>,</div>
                <div className="pl-4"><span className="text-accent-2">"school"</span>: <span className="text-fog">"BRAC University"</span>,</div>
                <div className="pl-4"><span className="text-accent-2">"focus"</span>: <span className="text-fog">"AI × Full-Stack"</span>,</div>
                <div className="pl-4"><span className="text-accent-2">"research"</span>: <span className="text-accent">"published"</span>,</div>
                <div className="pl-4"><span className="text-accent-2">"status"</span>: <span className="text-accent">"shipping"</span></div>
                <div><span className="text-dim">{'}'}</span></div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8 space-y-5 text-base md:text-lg text-muted leading-relaxed">
            <Reveal>
              <p>
                I'm a Computer Science graduate from <span className="text-fog">BRAC University</span> specializing in full-stack
                software engineering, AI systems, and workflow automation. I build scalable,
                production-ready applications using modern web technologies while integrating
                AI to solve practical business problems.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                My experience spans MERN development, Retrieval-Augmented Generation (RAG),
                AI agents, cybersecurity-focused applications, and n8n automations. I also
                conducted undergraduate research on improving the robustness of pretrained
                language models, resulting in a <span className="text-fog">published research paper</span>.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                I enjoy building software that combines clean engineering, intelligent
                automation, and real-world usability from SaaS platforms and developer tools
                to AI-powered applications.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="flex flex-wrap gap-2.5 pt-4">
              {focusAreas.map((area) => (
                <span key={area} className="rounded-full border hairline px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-fog/80 hover:border-accent/50 hover:text-accent transition-colors duration-300">
                  {area}
                </span>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Expertise */}
        <div className="mt-14 md:mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <Reveal>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Expertise</h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-dim">Here's how I can help you</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, idx) => (
              <Reveal key={service.title} delay={idx * 0.08} className="h-full">
                <div className="spotlight group h-full rounded-2xl p-6 flex flex-col gap-5 hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl border hairline bg-ink-800 flex items-center justify-center text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-on-accent group-hover:rotate-[-8deg]">
                      {service.icon}
                    </div>
                    <span className="font-mono text-[11px] text-dim">0{idx + 1}</span>
                  </div>
                  <h4 className="text-xl font-semibold tracking-tight text-fog">{service.title}</h4>
                  <p className="text-sm text-muted leading-relaxed flex-1">{service.description}</p>
                  <div className="pt-4 border-t hairline font-mono text-[10px] uppercase tracking-wider text-dim group-hover:text-accent transition-colors duration-500">
                    {service.tag}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CV CTA */}
        <Reveal className="mt-10 md:mt-12">
          <div className="relative rounded-3xl border hairline bg-ink-900/70 overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 grid-bg opacity-50" />
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 85% 50%, rgb(var(--accent) / 0.13), transparent 50%)' }} />
            </div>

            <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-10 items-center p-6 sm:p-8 lg:p-10">
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
                  {'// resume.download()'}
                </div>
                <h3 className="text-3xl md:text-[2.6rem] font-semibold tracking-tight leading-[1.05]">
                  Want to know <span className="font-serif italic font-normal text-accent">more?</span>
                </h3>
                <p className="text-muted max-w-md leading-relaxed">
                  Choose an academic or technical CV to learn more about my background and experience.
                </p>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {cvs.map((cv, i) => (
                  <motion.div
                    key={cv.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.1 }}
                  >
                  <button
                    type="button"
                    onClick={() => downloadFile(cv.path, cv.file)}
                    data-cursor="Get"
                    className="spotlight group w-full rounded-2xl p-3 text-left hover:-translate-y-1.5"
                  >
                    {/* Paper preview */}
                    <div className="relative h-32 sm:h-36 rounded-xl bg-ink-850 border hairline overflow-hidden px-5 pt-4">
                      <div className="relative mx-auto h-[150%] w-[82%] rounded-t-md bg-ink-900 border hairline shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)] p-4 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3 group-hover:rotate-[-1.5deg]">
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="w-6 h-6 rounded-full bg-accent/25" />
                          <div className="space-y-1.5">
                            <span className="block h-1.5 w-16 rounded-full bg-fog/40" />
                            <span className="block h-1 w-10 rounded-full bg-fog/15" />
                          </div>
                        </div>
                        {cv.lines.map((w, li) => (
                          <span
                            key={li}
                            className={`block h-1 rounded-full mb-1.5 ${li % 4 === 0 ? 'bg-accent/50 mt-2.5' : 'bg-fog/15'}`}
                            style={{ width: `${w}%` }}
                          />
                        ))}
                        <span className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-accent/25 to-transparent -translate-y-full group-hover:translate-y-[260%] transition-transform duration-[1200ms] ease-out" />
                      </div>
                      <span className="absolute top-3 right-3 rounded-md bg-accent text-on-accent px-1.5 py-0.5 font-mono text-[9px] font-medium tracking-wider">
                        PDF
                      </span>
                    </div>

                    {/* File meta */}
                    <div className="flex items-center gap-3 px-2 pt-4 pb-1">
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-semibold tracking-tight text-fog group-hover:text-accent transition-colors">{cv.label}</div>
                        <div className="font-mono text-[10px] text-dim truncate mt-0.5">{cv.file}</div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted mt-2">{cv.blurb}</div>
                      </div>
                      <span className="relative w-10 h-10 shrink-0 rounded-full border hairline overflow-hidden flex items-center justify-center text-fog transition-colors duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-on-accent">
                        <span className="transition-transform duration-500 group-hover:translate-y-10">↓</span>
                        <span className="absolute -translate-y-10 transition-transform duration-500 group-hover:translate-y-0">↓</span>
                      </span>
                    </div>
                  </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
