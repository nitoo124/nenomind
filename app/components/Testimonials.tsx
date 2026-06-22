// components/Testimonials.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      content: "Neno Mind transformed our business operations with their AI automation solutions. We've seen a 300% increase in efficiency.",
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'CTO, GrowthLabs',
      content: 'The web development team delivered an exceptional platform that exceeded all our expectations. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, BrandFlow',
      content: 'Their SEO strategies and AI-powered lead generation have doubled our qualified leads in just 3 months.',
      rating: 5,
    },
    {
      name: 'David Kim',
      role: 'Founder, StartupHub',
      content: 'The graphic design and branding work was phenomenal. They truly understood our vision and brought it to life.',
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-32 bg-[#08080c] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-light tracking-[0.15em] uppercase text-white/20 mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.04em]">
            <span className="text-white/90">What Our </span>
            <span className="bg-gradient-to-r from-blue-400/80 via-purple-400/80 to-pink-400/80 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white/[0.02] border border-white/[0.04] rounded-2xl p-8 md:p-12 backdrop-blur-sm"
            >
              <Quote className="w-12 h-12 text-white/5 absolute top-8 right-8" />

              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-white/70 text-lg font-light leading-relaxed mb-6">
                "{testimonials[currentIndex].content}"
              </p>

              <div>
                <div className="text-white/80 font-medium">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-white/20 text-sm font-light">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
            >
              <ChevronLeft className="w-4 h-4 text-white/20" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-white/20'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
            >
              <ChevronRight className="w-4 h-4 text-white/20" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;