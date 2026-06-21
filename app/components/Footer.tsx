// components/Footer.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Globe,
    Mail,
    Phone,
    MapPin,
    ArrowUp,
    User,
    Briefcase,
    MessageCircle,
} from "lucide-react";
import Link from 'next/link';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-[#08080c] border-t border-white/[0.02] overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-b from-blue-500/5 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative">
                {/* Main Footer */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="#home" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">N</span>
                            </div>
                            <span className="text-xl font-bold text-white">
                                Neno<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Mind</span>
                            </span>
                        </Link>
                        <p className="text-white/30 text-sm font-light leading-relaxed">
                            Transforming businesses with cutting-edge AI solutions and web development.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white/60 text-sm font-medium mb-4">Services</h4>
                        <ul className="space-y-2">
                            {['AI Automation', 'Web Development', 'Graphic Design', 'SEO'].map((service) => (
                                <li key={service}>
                                    <Link href="#services" className="text-white/20 hover:text-white/40 text-sm font-light transition-colors duration-300">
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white/60 text-sm font-medium mb-4">Company</h4>
                        <ul className="space-y-2">
                            {['About', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href={`#${item.toLowerCase()}`} className="text-white/20 hover:text-white/40 text-sm font-light transition-colors duration-300">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white/60 text-sm font-medium mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-white/20 hover:text-white/40 text-sm font-light transition-colors duration-300">
                                <Mail className="w-4 h-4" />
                                <span>hello@nenomind.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/20 hover:text-white/40 text-sm font-light transition-colors duration-300">
                                <Phone className="w-4 h-4" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/20 text-sm font-light">
                                <MapPin className="w-4 h-4" />
                                <span>San Francisco, CA</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/10 text-sm font-light">
                        © 2026 Neno Mind. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {[
                                { icon: Globe, href: "#" },
                                { icon: User, href: "#" },
                                { icon: Briefcase, href: "#" },
                                { icon: MessageCircle, href: "#" },
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ y: -2 }}
                                    className="text-white/10 hover:text-white/30 transition-colors duration-300"
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Scroll to Top */}
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ y: -2 }}
                            className="p-2 rounded-full bg-white/[0.02] border border-white/[0.04] text-white/10 hover:text-white/30 transition-colors duration-300"
                        >
                            <ArrowUp className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;