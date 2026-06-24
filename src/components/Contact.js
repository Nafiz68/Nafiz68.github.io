import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Formspree integration
      const response = await fetch('https://formspree.io/f/xvgwgzyp', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    }
  };

  const contactMethods = [
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email",
      value: "nafizk368@gmail.com",
      link: "mailto:nafizk368@gmail.com"
    },
    {
      icon: <FaPhone className="w-5 h-5" />,
      title: "Phone Number",
      value: "+8801317266368",
      link: "tel:+8801317266368"
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      title: "Location",
      value: "Dhaka, Bangladesh",
      link: "https://maps.google.com/?q=Dhaka,Bangladesh"
    }
  ];

  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      url: "https://github.com/Nafiz68",
      label: "GitHub",
      hoverClass: "hover:text-[#181717] dark:hover:text-white hover:border-[#181717]/50 dark:hover:border-white/50"
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/nafiz-khan-34b7a6309",
      label: "LinkedIn"
    },
    {
      icon: <FaFacebook className="w-5 h-5" />,
      url: "https://www.facebook.com/share/1B5896cUtx/",
      label: "Facebook"
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      url: "https://www.instagram.com/swapped_nil?igsh=bWFhNHUxbGdsbjZr",
      label: "Instagram",
      hoverClass: "hover:text-[#E4405F] hover:border-[#E4405F]/50"
    },
    {
      icon: <FaGraduationCap className="w-5 h-5" />,
      url: "https://scholar.google.com/citations?user=PSQeWhkAAAAJ&hl=en",
      label: "Google Scholar"
    }
  ];

  return (
    <section id="contact" className="py-12 md:py-16 border-t border-surface-variant/30 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative">
      
      {/* Header */}
      <div className="text-center mb-10 md:mb-12">
        <div className="inline-block bg-primary-fixed text-on-primary-fixed dark:bg-primary-fixed-dim/20 dark:text-inverse-primary font-label-sm text-label-sm px-3 py-1 rounded w-max tracking-wider mb-4">
          CONNECT
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-2">Let's Work Together</h2>
        <p className="font-body-md text-body-md text-secondary dark:text-surface-container-highest max-w-md mx-auto">
          Have a project in mind or want to collaborate? I'm always open to new opportunities.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
        
        {/* Info Column */}
        <div className="space-y-6">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold mb-4">
              Get In Touch
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-container-highest leading-relaxed max-w-md">
              Whether you have a question about my work, need assistance with Python algorithms or full-stack projects, or want to discuss automation pipelines, feel free to reach out!
            </p>
          </div>

          {/* Contact Details List */}
          <div className="space-y-4">
            {contactMethods.map((method, idx) => (
              <a 
                key={idx}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-on-surface-variant dark:text-surface-container-highest hover:text-primary dark:hover:text-inverse-primary transition-colors py-2 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/5 dark:bg-inverse-primary/5 flex items-center justify-center text-primary dark:text-inverse-primary group-hover:scale-105 transition-transform">
                  {method.icon}
                </div>
                <div>
                  <h4 className="font-label-sm text-label-sm text-secondary dark:text-surface-container-highest uppercase tracking-wider">{method.title}</h4>
                  <p className="font-body-md text-body-md text-on-surface dark:text-white font-bold text-sm">{method.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="pt-4 border-t border-surface-variant/30">
            <h4 className="font-label-sm text-label-sm text-secondary dark:text-surface-container-highest uppercase tracking-wider mb-4">Social Handles</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-11 h-11 rounded-lg bg-white dark:bg-[#191c1e] flex items-center justify-center border border-outline-variant/30 text-secondary dark:text-surface-container-highest ${social.hoverClass || "hover:text-primary dark:hover:text-inverse-primary hover:border-primary/50 dark:hover:border-inverse-primary/50"} hover:scale-105 transition-all soft-shadow cursor-pointer`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-white dark:bg-[#191c1e] p-6 rounded-xl border border-outline-variant/30 soft-shadow">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface dark:text-white font-bold" htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-transparent border-b border-outline-variant focus:border-primary dark:focus:border-inverse-primary focus:border-b-2 outline-none py-2 font-body-md text-body-md text-on-surface dark:text-white transition-all placeholder:text-secondary-fixed-dim"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface dark:text-white font-bold" htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-transparent border-b border-outline-variant focus:border-primary dark:focus:border-inverse-primary focus:border-b-2 outline-none py-2 font-body-md text-body-md text-on-surface dark:text-white transition-all placeholder:text-secondary-fixed-dim"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface dark:text-white font-bold" htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Let's collaborate on..."
                className="w-full bg-transparent border-b border-outline-variant focus:border-primary dark:focus:border-inverse-primary focus:border-b-2 outline-none py-2 font-body-md text-body-md text-on-surface dark:text-white transition-all placeholder:text-secondary-fixed-dim"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface dark:text-white font-bold" htmlFor="message">Message</label>
              <textarea 
                id="message"
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className="w-full bg-transparent border-b border-outline-variant focus:border-primary dark:focus:border-inverse-primary focus:border-b-2 outline-none py-2 font-body-md text-body-md text-on-surface dark:text-white transition-all resize-none placeholder:text-secondary-fixed-dim"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`bg-primary text-on-primary font-label-md text-label-md py-3 px-6 rounded-lg hover:scale-[1.02] active:scale-95 transition-all w-full md:w-auto self-start shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer ${
                isSubmitting ? "opacity-80" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="text-green-600 dark:text-green-400 font-body-md text-body-md text-sm mt-2 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="text-red-600 dark:text-red-400 font-body-md text-body-md text-sm mt-2 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                Failed to send message. Please try again.
              </div>
            )}

          </form>
        </div>

      </div>

    </section>
  );
}
