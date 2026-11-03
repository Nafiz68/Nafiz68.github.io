import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const spring = { type: 'spring', stiffness: 260, damping: 20 };

// Sun that morphs into a moon: the mask circle slides over to carve the crescent,
// and the rays retract.
export default function ThemeToggle({ className = '' }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDarkMode ? 'Light mode' : 'Dark mode'}
      className={`relative w-11 h-11 rounded-full border hairline glass flex items-center justify-center text-fog hover:text-accent hover:border-accent/50 transition-colors duration-300 ${className}`}
    >
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        animate={{ rotate: isDarkMode ? 40 : 90 }}
        transition={spring}
      >
        <mask id="moon-mask">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <motion.circle
            r="9"
            fill="black"
            initial={false}
            animate={isDarkMode ? { cx: 17, cy: 5 } : { cx: 30, cy: -6 }}
            transition={spring}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#moon-mask)"
          initial={false}
          animate={{ r: isDarkMode ? 9 : 5 }}
          transition={spring}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: isDarkMode ? 0 : 1, scale: isDarkMode ? 0.4 : 1 }}
          style={{ originX: '12px', originY: '12px' }}
          transition={spring}
        >
          {rays.map((deg) => (
            <line key={deg} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${deg} 12 12)`} />
          ))}
        </motion.g>
      </motion.svg>
    </button>
  );
}
