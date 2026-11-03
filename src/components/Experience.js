import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaGraduationCap, FaCode, FaSearch, FaFlask, FaCogs } from 'react-icons/fa';
import SectionHeader from './fx/SectionHeader';
import { Reveal, EASE } from './fx/Reveal';

const experiences = [
  {
    id: 0,
    position: "Junior Automation Engineer",
    company: "Digital Bridge",
    location: "Dhaka, Bangladesh",
    duration: "Oct 2026 – present",
    type: "Full Time",
    current: true,
    responsibilities: [
      "Build and maintain end-to-end automation workflows for a US-based client, connecting their CRM, communication tools, and internal data systems with n8n and custom APIs.",
      "Design AI-assisted pipelines that handle lead routing, data enrichment, and reporting, replacing repetitive manual operations across the client's teams.",
      "Work directly with the American client across time zones to scope requirements, demo progress, and ship reliable, well-documented automations to production."
    ],
    icon: <FaCogs size={14} />,
  },
  {
    id: 1,
    position: "Student Researcher",
    company: "Elite Research Lab LLC",
    location: "New York, USA",
    duration: "Sept 2026 – present",
    type: "Contractual",
    current: true,
    responsibilities: [
      "Co-led a four-person team developing a turn-level framework to detect unhealthy relationship formation in mental health chatbot conversations; selected for the lab’s 2026 Research Training and Competition.",
    ],
    icon: <FaFlask size={14} />,
  },
  {
    id: 2,
    position: "Automation Specialist",
    company: "Softvence Agency",
    location: "Dhaka, Bangladesh",
    duration: "Apr 2026 – June 2026",
    type: "Internship",
    responsibilities: [
      "Design and deploy complex automation workflows using n8n based on client requirements.",
      "Build secure API integrations and AI-driven workflows, testing and optimizing for scale.",
      "Delivered 7+ high-performance production applications for clients across diverse domains."
    ],
    icon: <FaCode size={14} />,
  },
  {
    id: 4,
    position: "Undergraduate Researcher",
    company: "BRAC University – CSE Department",
    location: "Dhaka, Bangladesh",
    duration: "Jan 2025 – Jan 2026",
    type: "Research / Publication",
    publication: {
      title: "Anchor-Guided Repair: Enhancing Stability of Compromised Pretrained Language Models Against Low-Precision and Weight Noise Attacks",
      url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PSQeWhkAAAAJ&citation_for_view=PSQeWhkAAAAJ:u5HHmVD_uO8C"
    },
    responsibilities: [
      "Developed an anchor-guided weight repair mechanism to stabilize compromised pretrained language models (LLMs).",
      "Enhanced model robustness against quantization and weight noise attacks without retraining.",
      "Documented research methodologies and results for potential academic publications."
    ],
    icon: <FaSearch size={13} />,
  },
  {
    id: 5,
    position: "IT Instructor",
    company: "Zentorra",
    location: "Dhaka, Bangladesh",
    duration: "Feb 2025 – Jul 2025",
    type: "Teaching",
    responsibilities: [
      "Delivered recorded classes on Python fundamentals and project-based learning for beginner students.",
      "Created comprehensive study guides, homework files, and practical coding challenges.",
      "Mentored students through hands-on programming projects and real-world application building."
    ],
    icon: <FaGraduationCap size={15} />,
  }
];

const monogram = (company) => {
  const words = company.split(/[\s–-]+/).filter((w) => /^[A-Za-z]/.test(w));
  return (words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2)).toUpperCase();
};

function Entry({ exp, index }) {
  return (
    <div className="relative pl-12 md:pl-16">
      {/* Node on the rail */}
      <div className="absolute left-[22px] top-7 -translate-x-1/2 z-10">
        <motion.div
          className={`relative w-9 h-9 rounded-full border flex items-center justify-center ${
            exp.current ? 'bg-accent border-accent text-on-accent' : 'bg-ink-900 border-accent/50 text-accent'
          }`}
          initial={{ scale: 0.4, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-30% 0px -30% 0px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {exp.icon}
          {exp.current && <span className="absolute inset-0 rounded-full pulse-dot pulse-ring" />}
        </motion.div>
      </div>

      <Reveal>
        <article className="group relative rounded-2xl transition-transform duration-500 hover:-translate-y-0.5">
          {/* Light that travels around the border on hover */}
          <div aria-hidden="true" className="beam-border opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="beam-border__light" />
          </div>

          <div className="relative rounded-2xl border hairline bg-ink-900/75 overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
            <span
              aria-hidden="true"
              className="absolute right-3 -bottom-7 text-[6.5rem] leading-none font-semibold tracking-tightest text-outline select-none pointer-events-none transition-transform duration-700 group-hover:-translate-x-2"
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Header */}
            <div className="relative flex flex-wrap items-start gap-4 p-5 md:p-6 pb-4 md:pb-5">
              <span
                className={`w-12 h-12 shrink-0 rounded-xl border flex items-center justify-center font-mono text-sm font-medium transition-all duration-500 group-hover:rotate-[-6deg] ${
                  exp.current ? 'border-accent/50 bg-accent/10 text-accent' : 'hairline bg-ink-800 text-fog group-hover:text-accent group-hover:border-accent/40'
                }`}
              >
                {monogram(exp.company)}
              </span>
              <div className="flex-1 min-w-[200px]">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight text-fog">{exp.position}</h3>
                  {exp.current && (
                    <span className="flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">
                      <span className="w-1 h-1 rounded-full bg-accent pulse-dot" />
                      Now
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted">
                  {exp.company} <span className="text-dim">/</span> {exp.location}
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
                <span className="font-mono text-xs text-accent tracking-wide">{exp.duration}</span>
                <span className="rounded-full border hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                  {exp.type}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="relative px-5 md:px-6 pb-5 md:pb-6">
              <div className="h-px mb-4 bg-gradient-to-r from-accent/40 via-fog/10 to-transparent origin-left scale-x-[0.35] group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />

              {exp.publication && (
                <a
                  href={exp.publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Read"
                  className="group/pub mb-4 flex gap-3 rounded-xl border border-accent-2/25 bg-accent-2/[0.06] p-3.5 hover:border-accent-2/60 transition-colors"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent-2 shrink-0 pt-0.5">Paper</span>
                  <span className="text-sm text-fog leading-relaxed group-hover/pub:underline underline-offset-4 decoration-accent-2/50">
                    {exp.publication.title} ↗
                  </span>
                </a>
              )}

              <ul className="space-y-2">
                {exp.responsibilities.map((resp, rIdx) => (
                  <motion.li
                    key={rIdx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 + rIdx * 0.07 }}
                    className="flex gap-3 text-sm md:text-[15px] text-muted leading-relaxed"
                  >
                    <span className="font-mono text-[11px] text-accent shrink-0 pt-[3px]">&gt;</span>
                    <span className="group-hover:text-fog/90 transition-colors duration-500">{resp}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </Reveal>
    </div>
  );
}

export default function Experience() {
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 0.7', 'end 0.6'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section id="experience" className="relative pt-14 md:pt-16 pb-14 md:pb-20">
      <div className="container-x">
        <SectionHeader
          index="02"
          label="Journey"
          title="Professional *journey*."
          description="Roles that shaped my engineering mindset across research, teaching, and industry automation."
        />

        <div ref={railRef} className="relative">
          <div className="absolute left-[22px] top-0 bottom-0 w-px bg-fog/[0.07]" />
          <motion.div
            className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent to-accent-2 origin-top shadow-[0_0_12px_rgb(var(--accent)/0.7)]"
            style={{ scaleY: progress }}
          />
          <div className="flex flex-col gap-5 md:gap-6">
            {experiences.map((exp, index) => (
              <Entry key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
