import React from 'react';
import { motion } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

// Fades + lifts + unblurs children when they enter the viewport.
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', once = true }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

// Masks each word and slides it up, staggered. `text` may contain *italic* segments.
export function SplitReveal({ text, className = '', wordClassName = '', delay = 0, stagger = 0.06, animate }) {
  const words = [];
  text.split(/(\*[^*]+\*)/).forEach((chunk) => {
    if (!chunk) return;
    const italic = chunk.startsWith('*') && chunk.endsWith('*');
    const clean = italic ? chunk.slice(1, -1) : chunk;
    clean.split(' ').forEach((w) => {
      if (w === '') return;
      if (w === '\n') words.push({ br: true });
      else words.push({ w, italic });
    });
  });

  const variants = {
    hidden: { y: '110%' },
    show: (i) => ({ y: '0%', transition: { duration: 1, delay: delay + i * stagger, ease: EASE } }),
  };

  const motionProps = animate === undefined
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-60px' } }
    : { initial: 'hidden', animate: animate ? 'show' : 'hidden' };

  let i = 0;
  return (
    <motion.span className={className} {...motionProps} aria-label={text.replace(/\*/g, '')}>
      {words.map((word, idx) =>
        word.br ? (
          <br key={idx} />
        ) : (
          <span key={idx} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <motion.span
              custom={i++}
              variants={variants}
              className={`inline-block ${wordClassName} ${word.italic ? 'font-serif italic font-normal text-accent tracking-normal pr-[0.06em]' : ''}`}
            >
              {word.w}
            </motion.span>
            {/^[.,!?;:]/.test(words[idx + 1]?.w || '') ? '' : ' '}
          </span>
        )
      )}
    </motion.span>
  );
}
