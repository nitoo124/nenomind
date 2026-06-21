// components/Contact.tsx
'use client';

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus('success');
  };

  return (
    <section id="contact" className="relative py-32 bg-[#0a0a0f] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-blue-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-light tracking-[0.15em] uppercase text-white/20 mb-4">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.04em]">
            <span className="text-white/90">Let's Build </span>
            <span className="bg-gradient-to-r from-blue-400/80 via-purple-400/80 to-pink-400/80 bg-clip-text text-transparent">
              Something Great
            </span>
          </h2>
          <p className="text-white/30 max-w-2xl mx-auto mt-4 text-lg font-light">
            Ready to transform your business? Reach out and let's discuss your project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-medium text-white/80 mb-4">Contact Information</h3>
              <p className="text-white/30 font-light">
                We'd love to hear from you. Here's how you can reach us.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors duration-300">
                <Mail className="w-5 h-5 text-white/20" />
                <div>
                  <div className="text-white/20 text-sm font-light">Email</div>
                  <div className="text-white/60">hello@nenomind.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors duration-300">
                <Phone className="w-5 h-5 text-white/20" />
                <div>
                  <div className="text-white/20 text-sm font-light">Phone</div>
                  <div className="text-white/60">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors duration-300">
                <MapPin className="w-5 h-5 text-white/20" />
                <div>
                  <div className="text-white/20 text-sm font-light">Location</div>
                  <div className="text-white/60">San Francisco, CA</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-white/80 placeholder:text-white/20 focus:border-white/10 focus:outline-none transition-colors duration-300"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-white/80 placeholder:text-white/20 focus:border-white/10 focus:outline-none transition-colors duration-300"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Company Name"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-white/80 placeholder:text-white/20 focus:border-white/10 focus:outline-none transition-colors duration-300"
              />
            </div>
            <div>
              <select
                required
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-white/60 focus:border-white/10 focus:outline-none transition-colors duration-300 appearance-none"
              >
                <option value="" className="bg-[#0a0a0f]">Service Required</option>
                <option value="ai" className="bg-[#0a0a0f]">AI Automation</option>
                <option value="web" className="bg-[#0a0a0f]">Web Development</option>
                <option value="design" className="bg-[#0a0a0f]">Graphic Design</option>
                <option value="seo" className="bg-[#0a0a0f]">SEO</option>
              </select>
            </div>
            <div>
              <textarea
                placeholder="Tell us about your project"
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-white/80 placeholder:text-white/20 focus:border-white/10 focus:outline-none transition-colors duration-300 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={formStatus !== 'idle'}
              className="w-full px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 text-white font-medium hover:opacity-80 transition-opacity duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formStatus === 'idle' && (
                <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>
              )}
              {formStatus === 'sending' && 'Sending...'}
              {formStatus === 'success' && (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Message Sent!
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;