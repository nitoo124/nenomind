'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`sticky top-0 z-40 w-full h-20 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/40 backdrop-blur-md border-b border-white/5'
            : 'bg-black/20 backdrop-blur-sm'
        }`}
        style={{
          boxShadow: isScrolled
            ? '0 8px 32px rgba(59, 130, 246, 0.1)'
            : 'none',
        }}
      >
        <div className="flex items-center justify-between h-full px-6 md:px-12 lg:px-16 max-w-7xl mx-auto w-full">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src="/logo.png"
                width={50}
                height={50}
                className="rounded-full"
                alt="Logo"
              />
            </motion.div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={link.href}>
                  <button
                    onClick={() => setActiveLink(link.name)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      activeLink === link.name
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.name}

                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: activeLink === link.name ? '100%' : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* CTA */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                href="#contact"
                className="hidden sm:block px-6 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Get Free Consultation
              </Link>
            </motion.div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 top-20 w-full sm:w-96 h-screen bg-black/95 backdrop-blur-lg border-l border-blue-500/20 z-30 md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={link.href}>
                    <button
                      onClick={() => {
                        setActiveLink(link.name);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium ${
                        activeLink === link.name
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </button>
                  </Link>
                </motion.div>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}