'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';

// ==================== TYPES ====================
interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

type FormStatus = 'idle' | 'sending' | 'success';

// ==================== CONSTANTS ====================
const SERVICE_OPTIONS = [
  'AI Automation',
  'Web Development',
  'Graphic Design',
  'SEO',
  'Mobile App Development',
  'Cloud Solutions',
] as const;

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
};

// ==================== COMPONENT ====================
const Contact = () => {
  // ===== Refs =====
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // ===== State =====
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    company: false,
    service: false,
    message: false,
  });

  // ===== Validation =====
  const validateField = useCallback(
    (field: keyof FormData, value: string): string | null => {
      switch (field) {
        case 'name':
          if (!value.trim()) return 'Name is required';
          if (value.trim().length < 2) return 'Name must be at least 2 characters';
          return null;

        case 'email':
          if (!value.trim()) return 'Email is required';
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return 'Please enter a valid email address';
          return null;

        case 'service':
          if (!value) return 'Please select a service';
          return null;

        case 'message':
          if (!value.trim()) return 'Message is required';
          if (value.trim().length < 10) return 'Message must be at least 10 characters';
          return null;

        default:
          return null;
      }
    },
    []
  );

  const getFieldError = useCallback(
    (field: keyof FormData): string | null => {
      if (!touched[field]) return null;
      return validateField(field, formData[field]);
    },
    [touched, formData, validateField]
  );

  const isFormValid = useCallback((): boolean => {
    const fields: (keyof FormData)[] = ['name', 'email', 'service', 'message'];
    return fields.every((field) => !validateField(field, formData[field]));
  }, [formData, validateField]);

  // ===== Handlers =====
  const handleInputChange = useCallback(
    (field: keyof FormData) =>
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        setError(null);
        // Clear field error when user starts typing
        if (touched[field]) {
          setTouched((prev) => ({ ...prev, [field]: true }));
        }
      },
    [touched]
  );

  const handleBlur = useCallback(
    (field: keyof FormData) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Mark all fields as touched
      setTouched({
        name: true,
        email: true,
        company: true,
        service: true,
        message: true,
      });

      if (!isFormValid()) {
        setError('Please fix all errors before submitting');
        return;
      }

      try {
        setFormStatus('sending');
        setError(null);

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to send message');
        }

        setFormStatus('success');
        setFormData(INITIAL_FORM_DATA);
        setTouched({
          name: false,
          email: false,
          company: false,
          service: false,
          message: false,
        });

        // Reset form
        if (formRef.current) {
          formRef.current.reset();
        }
      } catch (err) {
        console.error('Contact form error:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to send message. Please try again.'
        );
        setFormStatus('idle');
      }
    },
    [formData, isFormValid]
  );

  // ===== Effects =====
  useEffect(() => {
    if (formStatus === 'success') {
      const timer = setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  // ===== Render Helpers =====
  const renderInput = (
    field: keyof FormData,
    type: string,
    placeholder: string,
    required = true
  ) => {
    const error = getFieldError(field);
    const isError = !!error && touched[field];

    return (
      <div className="space-y-1.5">
        <input
          id={field}
          type={type}
          required={required}
          placeholder={placeholder}
          value={formData[field]}
          onChange={handleInputChange(field)}
          onBlur={handleBlur(field)}
          aria-invalid={isError}
          aria-describedby={isError ? `${field}-error` : undefined}
          className={`w-full px-5 py-4 rounded-2xl bg-white/[0.03] border text-white placeholder:text-white/25 focus:outline-none transition-all duration-200 ${
            isError
              ? 'border-red-500/60 focus:border-red-500'
              : 'border-white/[0.05] focus:border-blue-500/40'
          }`}
        />
        {isError && (
          <p id={`${field}-error`} className="text-red-400 text-sm px-1">
            {error}
          </p>
        )}
      </div>
    );
  };

  // ==================== JSX ====================
  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-blue-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-to-l from-pink-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-light tracking-[0.15em] uppercase text-white/20 mb-4">
            Get In Touch
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.04em]">
            <span className="text-white/90">Let&apos;s Build </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Something Great
            </span>
          </h2>

          <p className="text-white/30 max-w-2xl mx-auto mt-5 text-lg font-light">
            Ready to transform your business? Let&apos;s discuss your next project.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-medium text-white mb-4">
                Contact Information
              </h3>
              <p className="text-white/40">
                We&apos;d love to hear about your ideas and help bring them to life.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'hello@nenomind.com',
                  color: 'text-blue-400',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+92 348 1874354',
                  color: 'text-purple-400',
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: 'Pakistan',
                  color: 'text-pink-400',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-colors group"
                >
                  <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0`} />
                  <div>
                    <p className="text-white/40 text-sm">{item.label}</p>
                    <p className="text-white/80 group-hover:text-white transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social/Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-4"
            >
              <div className="flex items-center gap-3 text-white/20 text-sm">
                <span className="w-8 h-px bg-white/10" />
                <span>Typically replies within 24 hours</span>
                <span className="w-8 h-px bg-white/10" />
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
            noValidate
          >
            {/* Name */}
            {renderInput('name', 'text', 'Your Name')}

            {/* Email */}
            {renderInput('email', 'email', 'Email Address')}

            {/* Company */}
            <div>
              <input
                type="text"
                placeholder="Company Name (Optional)"
                value={formData.company}
                onChange={handleInputChange('company')}
                onBlur={handleBlur('company')}
                className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-white placeholder:text-white/25 focus:outline-none focus:border-blue-500/40 transition-all duration-200"
              />
            </div>

            {/* Service Selection */}
            <div className="space-y-1.5">
              <select
                required
                value={formData.service}
                onChange={handleInputChange('service')}
                onBlur={handleBlur('service')}
                className={`w-full px-5 py-4 rounded-2xl bg-white/[0.03] border text-white focus:outline-none transition-all duration-200 appearance-none ${
                  getFieldError('service') && touched.service
                    ? 'border-red-500/60 focus:border-red-500'
                    : 'border-white/[0.05] focus:border-blue-500/40'
                }`}
              >
                <option value="" className="bg-[#0a0a0f]">
                  Select Service
                </option>
                {SERVICE_OPTIONS.map((service) => (
                  <option key={service} value={service} className="bg-[#0a0a0f]">
                    {service}
                  </option>
                ))}
              </select>
              {getFieldError('service') && touched.service && (
                <p className="text-red-400 text-sm px-1">
                  {getFieldError('service')}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <textarea
                rows={5}
                required
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleInputChange('message')}
                onBlur={handleBlur('message')}
                className={`w-full px-5 py-4 rounded-2xl bg-white/[0.03] border text-white placeholder:text-white/25 resize-none focus:outline-none transition-all duration-200 ${
                  getFieldError('message') && touched.message
                    ? 'border-red-500/60 focus:border-red-500'
                    : 'border-white/[0.05] focus:border-blue-500/40'
                }`}
              />
              {getFieldError('message') && touched.message && (
                <p className="text-red-400 text-sm px-1">
                  {getFieldError('message')}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 px-4 py-3 rounded-xl border border-red-500/20"
              >
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formStatus === 'sending'}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium transition-all duration-300 hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="relative flex items-center gap-2">
                {formStatus === 'idle' && (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}

                {formStatus === 'sending' && (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                )}

                {formStatus === 'success' && (
                  <>
                    <CheckCircle size={18} />
                    Message Sent!
                  </>
                )}
              </span>
            </button>

            {/* Success Message */}
            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-400 text-sm bg-green-500/10 px-4 py-3 rounded-xl border border-green-500/20"
              >
                ✓ Thank you! We&apos;ll get back to you soon.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;