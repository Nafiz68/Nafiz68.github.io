import React from 'react';
import { motion } from 'framer-motion';
import { SplitReveal, Reveal, EASE } from './Reveal';
import ScrambleText from './ScrambleText';

export default function SectionHeader({ index, label, title, description, align = 'left' }) {
  const centered = align === 'center';
  return (
    <div className={`mb-8 md:mb-10 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-4xl'}`}>
      <div className={`flex items-center gap-4 mb-4 font-mono text-[11px] tracking-[0.25em] uppercase text-muted ${centered ? 'justify-center' : ''}`}>
        <span className="text-accent">[{index}]</span>
        <ScrambleText text={label} />
        <motion.span
          className="h-px w-16 md:w-24 bg-gradient-to-r from-accent/60 to-transparent origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        />
      </div>
      <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem] font-semibold tracking-tightest leading-[1.04] text-fog">
        <SplitReveal text={title} />
      </h2>
      {description && (
        <Reveal delay={0.25}>
          <p className={`mt-4 md:mt-5 text-base md:text-lg text-muted leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
