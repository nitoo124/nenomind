'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp, Award, Users, Star, Clock } from 'lucide-react';

// Animated Counter Component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

// Animated Gradient Background
function AnimatedGradientBackground() {
  const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 50 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x * 50);
      mouseY.set(y * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main Gradient Orb - Interactive */}
      <motion.div
        style={{ 
          x: springX, 
          y: springY,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 30%, rgba(236, 72, 153, 0.05) 60%, transparent 80%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Secondary Gradient Orb */}
      <motion.div
        style={{ 
          x: springX, 
          y: springY,
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 },
          opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.12) 0%, rgba(59, 130, 246, 0.08) 40%, rgba(14, 165, 233, 0.04) 70%, transparent 90%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Third Gradient Orb */}
      <motion.div
        style={{ 
          x: springX, 
          y: springY,
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 },
          opacity: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }}
        className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.1) 0%, rgba(168, 85, 247, 0.06) 40%, rgba(59, 130, 246, 0.03) 70%, transparent 90%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Floating Gradient Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[30%] left-[20%] w-[200px] h-[200px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-[30%] right-[20%] w-[250px] h-[250px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Gradient Mesh */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background: `
            conic-gradient(from 0deg at 50% 50%, 
              rgba(59, 130, 246, 0.1) 0deg, 
              rgba(139, 92, 246, 0.1) 90deg, 
              rgba(236, 72, 153, 0.1) 180deg, 
              rgba(59, 130, 246, 0.1) 270deg, 
              rgba(139, 92, 246, 0.1) 360deg
            )
          `,
          filter: 'blur(40px)',
        }}
      />

      {/* Gradient Stripes */}
      <motion.div
        animate={{
          x: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 opacity-[0.015]"
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              rgba(59, 130, 246, 0.1) 100px,
              rgba(139, 92, 246, 0.1) 200px,
              transparent 200px,
              transparent 300px
            )
          `,
          backgroundSize: '300px 300px',
        }}
      />
    </div>
  );
}

// 3D Geometric Shapes with Gradients
function GeometricShapes() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 30, stiffness: 60 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 60 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x * 30);
      mouseY.set(y * 30);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Rotating Cube with Gradient */}
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[15%] right-[15%] w-32 h-32"
      >
        <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-white/[0.03] backdrop-blur-sm"
              style={{
                transform: `rotate${['X', 'Y', 'Z', 'X', 'Y', 'Z'][i]}(${i * 60}deg) translateZ(50px)`,
                transformStyle: 'preserve-3d',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Octahedron with Gradient */}
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{ 
          rotateZ: 360,
          y: [0, -30, 0],
        }}
        transition={{ 
          rotateZ: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-[20%] left-[10%] w-24 h-24"
      >
        <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/[0.03]"
              style={{
                transform: `rotateX(${i * 45}deg) rotateY(${i * 45}deg) translateZ(40px)`,
                transformStyle: 'preserve-3d',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Ring with Gradient */}
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{ rotateX: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] left-[25%] w-40 h-40"
      >
        <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/[0.03]"
              style={{
                transform: `rotateY(${i * 30}deg) rotateX(60deg) translateZ(60px)`,
                transformStyle: 'preserve-3d',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// 3D Depth Layers with Gradient
function DepthLayers() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 30, stiffness: 50 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Layer 1 - Background Grid with Gradient */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '-1px -1px',
          }}
        />
      </motion.div>

      {/* Layer 2 - Gradient Orbs with Parallax */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, rgba(236, 72, 153, 0.04) 40%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </motion.div>
    </>
  );
}

// Particles with Gradient
function ParticleField3D() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 60 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 60 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x * 40);
      mouseY.set(y * 40);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => {
        const depth = Math.random() * 0.5 + 0.5;
        const colors = ['from-blue-500/10', 'from-purple-500/10', 'from-pink-500/10', 'from-cyan-500/10'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={`particle-${i}`}
            style={{ 
              x: springX,
              y: springY,
              scale: depth,
            }}
            className="absolute"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 800 + 200,
              opacity: 0,
            }}
            animate={{
              y: -200,
              opacity: [0, 0.4 * depth, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'easeInOut',
            }}
          >
            <div 
              className={`w-[2px] h-[2px] rounded-full bg-gradient-to-b ${color} to-transparent`}
              style={{
                boxShadow: `0 0 15px rgba(59, 130, 246, ${0.01 + depth * 0.02})`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// Noise Texture
function NoiseTexture() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }}
    />
  );
}

// Premium Vignette
function Vignette() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%),
          radial-gradient(ellipse at center, transparent 0%, rgba(10,10,15,0.2) 100%)
        `,
      }}
    />
  );
}

export default function Hero() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 20]);

  // Animation Variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 1.4, 
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: 0.8 + i * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const statVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: 1.1 + i * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0a0f] overflow-hidden"
    >
      {/* Base Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d1a] to-[#08080c]" />
      
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground />

      {/* 3D Depth Layers */}
      <DepthLayers />

      {/* Geometric 3D Shapes with Gradients */}
      <GeometricShapes />

      {/* 3D Particles with Gradient */}
      <ParticleField3D />

      {/* Noise Texture */}
      <NoiseTexture />

      {/* Vignette */}
      <Vignette />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-center items-center text-center">
        {/* Badge */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-white/30" />
            <span className="text-[10px] font-light tracking-[0.15em] uppercase text-white/25">
              AI-Powered Solutions
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-2 mb-5"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.05] tracking-[-0.04em]">
            <motion.div variants={fadeUpVariants} className="block">
              <span className="text-white/90">
                Transform Your
              </span>
            </motion.div>
            <motion.div variants={fadeUpVariants} className="block">
              <span className="bg-gradient-to-r from-blue-400/80 via-purple-400/80 to-pink-400/80 bg-clip-text text-transparent">
                Business with AI
              </span>
            </motion.div>
          </h1>
        </motion.div>

        {/* Supporting Text */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-base md:text-lg text-white/30 leading-relaxed max-w-xl mx-auto font-light tracking-[0.01em]"
        >
          Neno Mind helps businesses scale through AI automation, web development, 
          and design. Experience the future of digital transformation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3 pt-8 justify-center"
        >
          <motion.button
            custom={0}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative px-8 py-3 text-sm font-medium text-white rounded-full overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 transition-opacity duration-700 group-hover:opacity-80" />
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <span className="relative flex items-center gap-2.5 tracking-[0.02em]">
              Get Free Consultation
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-500" />
            </span>
          </motion.button>

          <motion.button
            custom={1}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="px-8 py-3 text-sm font-medium text-white/40 rounded-full border border-white/[0.04] bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] hover:text-white/60 transition-all duration-700 tracking-[0.02em]"
          >
            Explore Services
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-7 pt-10"
        >
          {[
            { icon: Zap, text: 'AI Automation' },
            { icon: Shield, text: 'Custom Solutions' },
            { icon: TrendingUp, text: 'Growth Strategy' },
          ].map((item, i) => (
            <motion.div
              key={item.text}
              variants={fadeUpVariants}
              className="flex items-center gap-2"
            >
              <div className="p-1 rounded-full bg-white/[0.02]">
                <item.icon className="w-3 h-3 text-white/15" />
              </div>
              <span className="text-[11px] text-white/20 font-light tracking-[0.05em]">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="w-full mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.02]">
            {[
              { icon: Award, value: 100, suffix: '+', label: 'Projects' },
              { icon: Users, value: 50, suffix: '+', label: 'Clients' },
              { icon: Star, value: 95, suffix: '%', label: 'Satisfaction' },
              { icon: Clock, value: 24, suffix: '/7', label: 'Support' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={statVariants}
                initial="hidden"
                animate="visible"
                className="relative p-6 md:p-7 bg-[#0a0a0f] hover:bg-white/[0.01] transition-colors duration-700"
              >
                <div className="flex flex-col items-center">
                  <stat.icon className="w-4 h-4 text-white/10 mb-2.5" />
                  <div className="text-2xl md:text-3xl font-light text-white/80 tracking-[-0.02em]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[10px] text-white/15 font-light tracking-[0.1em] uppercase mt-1.5">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '60px', opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-auto mt-12"
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[9px] text-white/8 tracking-[0.3em] uppercase font-light">
            Scroll
          </span>
          <div className="w-px h-6 bg-gradient-to-b from-white/10 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}