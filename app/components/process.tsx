// components/Process.tsx
'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Search, FileText, PenTool, Code, 
  Rocket, TrendingUp, ArrowRight 
} from 'lucide-react';

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const steps = [
    {
      icon: Search,
      title: 'Discovery',
      description: 'Understanding your business goals and requirements',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: FileText,
      title: 'Planning',
      description: 'Strategic roadmap and architecture design',
      gradient: 'from-cyan-500/20 to-teal-500/20',
    },
    {
      icon: PenTool,
      title: 'Design',
      description: 'Creating intuitive and engaging user experiences',
      gradient: 'from-teal-500/20 to-green-500/20',
    },
    {
      icon: Code,
      title: 'Development',
      description: 'Building robust and scalable solutions',
      gradient: 'from-green-500/20 to-blue-500/20',
    },
    {
      icon: Rocket,
      title: 'Launch',
      description: 'Deploying your solution with precision',
      gradient: 'from-blue-500/20 to-purple-500/20',
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'Continuous optimization and scaling',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
  ];

  return (
    <section className="relative py-32 bg-[#0a0a0f] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-light tracking-[0.15em] uppercase text-white/20 mb-4">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.04em]">
            <span className="text-white/90">How We </span>
            <span className="bg-gradient-to-r from-blue-400/80 via-purple-400/80 to-pink-400/80 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="text-white/30 max-w-2xl mx-auto mt-4 text-lg font-light">
            A streamlined process that ensures quality, transparency, and exceptional results.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute left-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-pink-500/20" />
          
          <div className="space-y-16 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`md:flex items-center gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="group relative">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${step.gradient} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500`} />
                    <div className="relative bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500">
                      <div className="flex items-center gap-4 justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <step.icon className="w-5 h-5 text-white/30" />
                          </div>
                          <div>
                            <div className="text-xs text-white/20 font-light tracking-[0.1em] uppercase">
                              Step {index + 1}
                            </div>
                            <h3 className="text-xl font-medium text-white/80">{step.title}</h3>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-white/30 transition-colors duration-300" />
                      </div>
                      <p className="text-white/30 text-sm font-light mt-3">{step.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center justify-center w-12 h-12">
                  <div className="w-3 h-3 rounded-full bg-white/[0.05] border border-white/[0.05]" />
                </div>
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;