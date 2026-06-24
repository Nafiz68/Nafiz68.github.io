import React from 'react';
import { Link } from 'react-scroll';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nafiz-khan-34b7a6309' },
    { name: 'GitHub', url: 'https://github.com/Nafiz68' },
    { name: 'Facebook', url: 'https://www.facebook.com/share/1B5896cUtx/' },
    { name: 'Instagram', url: 'https://www.instagram.com/swapped_nil?igsh=bWFhNHUxbGdsbjZr' },
    { name: 'Scholar', url: 'https://scholar.google.com/citations?user=PSQeWhkAAAAJ&hl=en' }
  ];

  return (
    <footer className="w-full py-6 bg-surface-container-low dark:bg-[#191c1e] border-t border-outline-variant/30 mt-8">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-5 text-center md:text-left">
        
        {/* Brand / Tagline */}
        <div className="flex flex-col gap-1">
          <Link 
            to="hero" 
            smooth={true} 
            duration={500} 
            className="font-label-md text-label-md font-bold text-on-surface dark:text-white cursor-pointer select-none"
          >
            Nafiz Khan
          </Link>
          <span className="font-label-sm text-label-sm text-secondary dark:text-surface-container-highest">
            Built with precision.
          </span>
        </div>

        {/* Copyright */}
        <div className="font-label-sm text-label-sm text-on-secondary-container dark:text-surface-container-highest">
          &copy; {currentYear} Nafiz Khan. All rights reserved.
        </div>

        {/* Links */}
        <div className="flex gap-6">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-secondary-container dark:text-surface-container-highest hover:text-primary dark:hover:text-inverse-primary transition-colors font-label-sm text-label-sm opacity-85 hover:opacity-100 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}