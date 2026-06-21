// components/About.tsx
'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Rocket, Award, Shield, Zap } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { value: '500+', label: 'Clients Served', icon: Award },
    { value: '300+', label: 'AI Agents Deployed', icon: Zap },
    { value: '95%', label: 'Client Satisfaction', icon: Shield },
  ];

  const cards = [
    {
      title: 'Our Mission',
      description: 'To democratize AI technology and make it accessible to businesses of all sizes, empowering them to achieve unprecedented efficiency and growth.',
      icon: Target,
      gradient: 'from-blue-500/20 to-purple-500/20',
    },
    {
      title: 'Our Vision',
      description: 'To become the global leader in AI solutions, transforming how businesses operate and creating a future where AI enhances every aspect of work.',
      icon: Eye,
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: 'Our Goal',
      description: 'Empower 10,000 businesses with AI automation by 2026, creating measurable impact and driving sustainable growth.',
      icon: Rocket,
      gradient: 'from-pink-500/20 to-blue-500/20',
    },
  ];

  return (
    <section id="about" className="relative py-32 bg-[#0a0a0f] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-6 md:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-light tracking-[0.15em] uppercase text-white/20 mb-4">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.04em]">
            <span className="text-white/90">Transforming Business </span>
            <span className="bg-gradient-to-r from-blue-400/80 via-purple-400/80 to-pink-400/80 bg-clip-text text-transparent">
              Through AI
            </span>
          </h2>
          <p className="text-white/30 max-w-2xl mx-auto mt-4 text-lg font-light">
            We combine cutting-edge technology with creative design to deliver solutions that drive real business results.
          </p>
        </motion.div>

        {/* Mission/Vision/Goal Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500`} />
              <div className="relative bg-white/[0.02] border border-white/[0.04] rounded-2xl p-8 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <card.icon className="w-5 h-5 text-white/30" />
                </div>
                <h3 className="text-xl font-medium text-white/80 mb-3">{card.title}</h3>
                <p className="text-white/30 font-light leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.02]"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="p-8 text-center bg-[#0a0a0f] hover:bg-white/[0.01] transition-colors duration-500"
            >
              <stat.icon className="w-5 h-5 text-white/10 mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-light text-white/80 tracking-[-0.02em]">
                {stat.value}
              </div>
              <p className="text-white/15 text-sm font-light tracking-[0.05em] mt-1.5">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;