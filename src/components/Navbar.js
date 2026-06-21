import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleNav = () => setNavOpen(!navOpen);
  const closeNav = () => setNavOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "hero", label: "Home" },
    { to: "about", label: "About" },
    { to: "experience", label: "Experience" },
    { to: "projects", label: "Projects" },
    { to: "skills", label: "Skills" },
    { to: "certificates", label: "Certificates" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f7f9fb]/90 dark:bg-[#191c1e]/90 shadow-sm border-b border-surface-variant/20 backdrop-blur-md"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
        {/* Brand */}
        <Link
          to="hero"
          smooth={true}
          duration={500}
          className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white cursor-pointer select-none"
        >
          Nafiz Khan
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-body-md text-body-md">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              spy={true}
              activeClass="text-primary dark:text-inverse-primary font-semibold border-b-2 border-primary dark:border-inverse-primary pb-1"
              className="text-secondary dark:text-surface-container-highest hover:text-primary dark:hover:text-inverse-primary transition-all cursor-pointer"
              offset={-80}
              duration={500}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Controls (Theme toggle & Action Button & Mobile Menu) */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg text-secondary dark:text-surface-container-highest hover:bg-surface-container-low dark:hover:bg-inverse-surface transition-colors focus:outline-none"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>

          <Link
            to="contact"
            smooth={true}
            offset={-80}
            duration={500}
            className="hidden md:inline-flex bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-lg hover:scale-[1.03] transition-all duration-200 cursor-pointer shadow-md shadow-primary/20 active:scale-95"
          >
            Contact
          </Link>

          {/* Mobile Menu button */}
          <button
            onClick={toggleNav}
            className="md:hidden text-on-surface dark:text-white p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {navOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-[#f7f9fb] dark:bg-[#191c1e] border-b border-surface-variant/20 transition-all duration-300 ease-in-out origin-top ${
          navOpen ? "scale-y-100 opacity-100 visible" : "scale-y-0 opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col p-6 gap-4 font-body-md text-body-md">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth={true}
                spy={true}
                activeClass="text-primary dark:text-inverse-primary font-semibold"
                className="block text-secondary dark:text-surface-container-highest py-2 border-b border-surface-variant/10 cursor-pointer"
                offset={-80}
                duration={500}
                onClick={closeNav}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="contact"
              smooth={true}
              className="block text-center bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg cursor-pointer"
              offset={-80}
              duration={500}
              onClick={closeNav}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
