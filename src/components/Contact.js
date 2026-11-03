import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import SectionHeader from './fx/SectionHeader';
import { Reveal } from './fx/Reveal';
import Magnetic from './fx/Magnetic';

const contactMethods = [
  {
    icon: <FaEnvelope className="w-4 h-4" />,
    title: "Email",
    value: "nafizk368@gmail.com",
    link: "mailto:nafizk368@gmail.com"
  },
  {
    icon: <FaPhone className="w-4 h-4" />,
    title: "Phone Number",
    value: "+8801317266368",
    link: "tel:+8801317266368"
  },
  {
    icon: <FaMapMarkerAlt className="w-4 h-4" />,
    title: "Location",
    value: "Dhaka, Bangladesh",
    link: "https://maps.google.com/?q=Dhaka,Bangladesh"
  }
];

const socialLinks = [
  { icon: <FaGithub className="w-4 h-4" />, url: "https://github.com/Nafiz68", label: "GitHub" },
  { icon: <FaLinkedin className="w-4 h-4" />, url: "https://www.linkedin.com/in/nafiz-khan-34b7a6309", label: "LinkedIn" },
  { icon: <FaFacebook className="w-4 h-4" />, url: "https://www.facebook.com/share/1B5896cUtx/", label: "Facebook" },
  { icon: <FaInstagram className="w-4 h-4" />, url: "https://www.instagram.com/swapped_nil?igsh=bWFhNHUxbGdsbjZr", label: "Instagram" },
  { icon: <FaGraduationCap className="w-4 h-4" />, url: "https://scholar.google.com/citations?user=PSQeWhkAAAAJ&hl=en", label: "Google Scholar" }
];

function Field({ id, label, type = 'text', value, onChange, textarea }) {
  const Comp = textarea ? 'textarea' : 'input';
  return (
    <div className="relative group">
      <Comp
        id={id}
        name={id}
        type={textarea ? undefined : type}
        rows={textarea ? 3 : undefined}
        required
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full bg-transparent border-b border-fog/10 pt-5 pb-2 text-[15px] text-fog outline-none resize-none transition-colors focus:border-transparent"
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-5 text-[15px] text-muted pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-accent peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-[0.18em] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-mono peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em]"
      >
        {label}
      </label>
      <span className="absolute left-0 bottom-0 h-px w-full bg-accent origin-left scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
    </div>
  );
}

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

  return (
    <section id="contact" className="relative py-14 md:py-20">
      <div className="container-x">
        <SectionHeader
          index="06"
          label="Connect"
          title="Let's build something *remarkable*."
          description="Have a project in mind or want to collaborate? I'm always open to new opportunities."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Info */}
          <div className="lg:col-span-5 space-y-7">
            <Reveal>
              <p className="text-muted leading-relaxed max-w-md">
                Whether you have a question about my work, need assistance with Python algorithms or full-stack projects, or want to discuss automation pipelines, feel free to reach out!
              </p>
            </Reveal>

            <div className="border-t hairline">
              {contactMethods.map((method, idx) => (
                <Reveal key={method.title} delay={idx * 0.08}>
                  <a
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-5 py-3.5 border-b hairline overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-accent/[0.07] to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    <span className="relative w-10 h-10 rounded-full border hairline flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-on-accent transition-colors duration-500">
                      {method.icon}
                    </span>
                    <span className="relative flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{method.title}</span>
                      <span className="block text-fog mt-0.5">{method.value}</span>
                    </span>
                    <span className="relative text-muted group-hover:text-accent transition-all duration-500 group-hover:rotate-[-45deg]">→</span>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim mb-4">Social handles</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <Magnetic key={social.label} strength={0.4}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="w-11 h-11 rounded-full border hairline bg-ink-900 flex items-center justify-center text-muted hover:text-on-accent hover:bg-accent hover:border-accent transition-colors duration-300"
                    >
                      {social.icon}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Form: terminal window */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-2xl border hairline bg-ink-900/80 overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-2 px-5 h-11 border-b hairline bg-ink-850">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
                <span className="ml-3 font-mono text-[11px] text-dim">~/contact/new_message.sh</span>
              </div>

              <form className="p-5 md:p-7 flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field id="name" label="Your name" value={formData.name} onChange={handleChange} />
                  <Field id="email" label="Email address" type="email" value={formData.email} onChange={handleChange} />
                </div>
                <Field id="subject" label="Subject" value={formData.subject} onChange={handleChange} />
                <Field id="message" label="Tell me about your project" textarea value={formData.message} onChange={handleChange} />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-2">
                  <div className="font-mono text-[11px] text-dim min-h-[18px]">
                    <AnimatePresence mode="wait">
                      {submitStatus === 'success' && (
                        <motion.span key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-accent">
                          ✓ Message sent successfully! I'll get back to you soon.
                        </motion.span>
                      )}
                      {submitStatus === 'error' && (
                        <motion.span key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400">
                          ✕ Failed to send message. Please try again.
                        </motion.span>
                      )}
                      {!submitStatus && (
                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          &gt; awaiting input<span className="caret">_</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <Magnetic>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative overflow-hidden rounded-full bg-accent text-on-accent pl-6 pr-1.5 py-1.5 text-sm font-semibold flex items-center gap-4 disabled:opacity-70"
                    >
                      <span className="absolute inset-0 bg-fog translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                      <span className="relative">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <span className="relative w-9 h-9 rounded-full bg-ink-950 text-accent flex items-center justify-center">
                        {isSubmitting ? (
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                        ) : (
                          <span className="transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
                        )}
                      </span>
                    </button>
                  </Magnetic>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
