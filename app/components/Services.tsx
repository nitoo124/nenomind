// components/Services.tsx
'use client';

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Bot, Globe, Palette, Search, 
  ArrowRight, Sparkles, Zap, 
  Users, BarChart, Code, 
  Layout, ShoppingCart, PenTool,
  TrendingUp, Target, Smartphone
} from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      icon: Bot,
      title: 'AI Automation',
      description: 'Intelligent automation solutions that transform your workflows',
      gradient: 'from-blue-500/20 to-purple-500/20',
      services: [
        { name: 'AI Agents', icon: Sparkles },
        { name: 'Lead Generation Automation', icon: Users },
        { name: 'CRM Automation', icon: BarChart },
        { name: 'Workflow Automation', icon: Zap },
        { name: 'n8n Automation', icon: Bot },
      ]
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Modern, scalable web solutions built for the future',
      gradient: 'from-purple-500/20 to-pink-500/20',
      services: [
        { name: 'Business Websites', icon: Layout },
        { name: 'E-commerce Websites', icon: ShoppingCart },
        { name: 'Landing Pages', icon: Target },
        { name: 'Custom Web Applications', icon: Code },
      ]
    },
    {
      icon: Palette,
      title: 'Graphic Designing',
      description: 'Creative designs that make your brand stand out',
      gradient: 'from-pink-500/20 to-orange-500/20',
      services: [
        { name: 'Logo Design', icon: PenTool },
        { name: 'Branding', icon: Palette },
        { name: 'Social Media Designs', icon: Smartphone },
        { name: 'UI/UX Design', icon: Layout },
      ]
    },
    {
      icon: Search,
      title: 'SEO',
      description: 'Data-driven SEO strategies that drive organic growth',
      gradient: 'from-orange-500/20 to-blue-500/20',
      services: [
        { name: 'On-Page SEO', icon: Target },
        { name: 'Off-Page SEO', icon: TrendingUp },
        { name: 'Technical SEO', icon: Code },
        { name: 'Local SEO', icon: Search },
      ]
    }
  ];

  return (
    <section id="services" className="relative py-32 bg-[#08080c] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-pink-500/5 to-blue-500/5 rounded-full blur-3xl" />
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
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.04em]">
            <span className="text-white/90">Comprehensive </span>
            <span className="bg-gradient-to-r from-blue-400/80 via-purple-400/80 to-pink-400/80 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-white/30 max-w-2xl mx-auto mt-4 text-lg font-light">
            End-to-end services designed to transform your business operations and accelerate growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative h-full" // Added h-full
              onMouseEnter={() => setActiveCategory(index)}
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-2xl blur transition-opacity duration-500 ${
                activeCategory === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
              }`} />
              <div className="relative bg-white/[0.02] border border-white/[0.04] rounded-2xl p-8 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500 h-full flex flex-col"> {/* Added h-full flex flex-col */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                    <category.icon className="w-5 h-5 text-white/30" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white/80">{category.title}</h3>
                    <p className="text-white/30 text-sm font-light mt-1">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-2 flex-1"> {/* Added flex-1 */}
                  {category.services.map((service, serviceIndex) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + serviceIndex * 0.05 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02] transition-colors duration-300"
                    >
                      <service.icon className="w-3 h-3 text-white/15 flex-shrink-0" />
                      <span className="text-white/50 text-sm font-light">{service.name}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/[0.02]"> {/* Removed flex-1 from here */}
                  <button className="text-white/20 hover:text-white/40 text-sm font-light flex items-center gap-2 transition-colors duration-300">
                    Learn More
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;