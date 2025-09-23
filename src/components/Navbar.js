import React, { useState } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);
  const closeNav = () => setNavOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Nafiz Khan</div>

        {/* Desktop Menu */}
        <ul className={`nav-links ${navOpen ? "open" : ""}`}>
          <li>
            <Link to="hero" smooth={true} onClick={closeNav}>
              Home
            </Link>
          </li>
          <li>
            <Link to="about" smooth={true} onClick={closeNav}>
              About
            </Link>
          </li>
          <li>
            <Link to="projects" smooth={true} onClick={closeNav}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="skills" smooth={true} onClick={closeNav}>
              Skills
            </Link>
          </li>
          <li>
            <Link to="certificates" smooth={true} onClick={closeNav}>
              Certificates
            </Link>
          </li>
          <li>
            <Link to="contact" smooth={true} onClick={closeNav}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="nav-icon" onClick={toggleNav}>
          {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>
    </nav>
  );
}
