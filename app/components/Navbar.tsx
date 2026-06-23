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

  // Handle scroll effect
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

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 + 0.1, duration: 0.4 },
    }),
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={containerVariants}
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
{/* Logo Section */}
<Link href="/" className="flex items-center">
  <motion.div
    className="flex items-center gap-3 cursor-pointer"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {/* Logo Image with White Background Removal */}
    <div className="relative">
  <div className="bg-transparent">
   <Image
  src="/logo.png"
  width={50}
  height={50}
 
  className='rounded-full'
  alt="Logo"
/>
  </div>
  {/* Glow Effect */}
  <div className="absolute inset-0 bg-blue-500/10 blur-xl -z-10"></div>
</div>
  </motion.div>
</Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.div key={link.name} custom={i} variants={linkVariants} initial="hidden" animate="visible">
                <Link href={link.href}>
                  <motion.button
                    onClick={() => setActiveLink(link.name)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      activeLink === link.name
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {link.name}
                    
                    {/* Underline Animation */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      animate={{
                        width: activeLink === link.name ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Section - CTA Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                className="hidden sm:block relative px-6 py-2.5 text-sm font-semibold text-white rounded-lg overflow-hidden group"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50" />
                
                {/* Glow Effect on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-lg"
                  whileHover={{ opacity: 0.3 }}
                />

                <Link href="#contact" className="relative flex items-center gap-2">
                  Get Free Consultation
                </Link>
              </button>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 top-20 right-0 w-full sm:w-96 h-screen bg-black/95 backdrop-blur-lg border-l border-blue-500/20 z-30 md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {/* Mobile Nav Links */}
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={link.href}>
                    <motion.button
                      onClick={() => {
                        setActiveLink(link.name);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-lg font-medium ${
                        activeLink === link.name
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                      whileHover={{ x: 8 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {link.name}
                    </motion.button>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA Button */}
              <motion.div
                className="pt-6 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button className="w-full relative px-6 py-3 text-sm font-semibold text-white rounded-lg overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50" />
                  <span className="relative">Get Free Consultation</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
