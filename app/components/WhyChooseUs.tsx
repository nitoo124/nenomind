// components/WhyChooseUs.tsx
'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Award, Shield, Zap, Users, 
  TrendingUp, Clock, Sparkles, Globe 
} from 'lucide-react';

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const benefits = [
    {
      icon: Award,
      title: 'Expert Team',
      description: '10+ years of combined experience in AI and web development',
      gradient: 'from-blue-500/20 to-purple-500/20',
    },
    {
      icon: Shield,
      title: 'Quality First',
      description: 'Rigorous testing and quality assurance for every project',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Accelerated development cycles without compromising quality',
      gradient: 'from-pink-500/20 to-orange-500/20',
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Dedicated support and personalized solutions for every client',
      gradient: 'from-orange-500/20 to-blue-500/20',
    },
    {
      icon: TrendingUp,
      title: 'Results Driven',
      description: 'Measurable ROI and data-backed strategies for growth',
      gradient: 'from-green-500/20 to-blue-500/20',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance and maintenance services',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
  ];

  return (
    <section className="relative py-32 bg-[#08080c] overflow-hidden">
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
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.04em]">
            <span className="text-white/90">Why Businesses </span>
            <span className="bg-gradient-to-r from-blue-400/80 via-purple-400/80 to-pink-400/80 bg-clip-text text-transparent">
              Trust Us
            </span>
          </h2>
          <p className="text-white/30 max-w-2xl mx-auto mt-4 text-lg font-light">
            We combine technical excellence with a deep understanding of business needs to deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${benefit.gradient} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500`} />
              <div className="relative bg-white/[0.02] border border-white/[0.04] rounded-2xl p-8 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <benefit.icon className="w-5 h-5 text-white/30" />
                </div>
                <h3 className="text-lg font-medium text-white/80 mb-2">{benefit.title}</h3>
                <p className="text-white/30 text-sm font-light leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;