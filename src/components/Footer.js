import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleQuickLinkClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Nafiz Khan</h3>
            <span className="brand-tagline">Full Stack Developer</span>
          </div>

          <div className="footer-nav">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleQuickLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Nafiz Khan. All rights reserved.</p>
          <span>Built with React</span>
        </div>
      </div>
    </footer>
  );
}