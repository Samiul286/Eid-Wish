'use client';

import { motion } from 'framer-motion';
import { Sparkles, Palette, Link2, Share2 } from 'lucide-react';

const steps = [
  {
    icon: Sparkles,
    title: 'Enter Details',
    description: 'Add your name and your recipient\'s name to create a personal greeting.',
    accent: 'from-emerald-500 to-teal-400',
    glow: 'rgba(16,185,129,0.35)',
    number: '01',
    emoji: '✏️',
  },
  {
    icon: Palette,
    title: 'Pick a Theme',
    description: 'Choose from 5 beautifully animated themes that match your favourite style.',
    accent: 'from-violet-500 to-purple-400',
    glow: 'rgba(168,85,247,0.35)',
    number: '02',
    emoji: '🎨',
  },
  {
    icon: Link2,
    title: 'Generate Link',
    description: 'Get a unique shareable link for your completely personalised greeting.',
    accent: 'from-cyan-500 to-sky-400',
    glow: 'rgba(6,182,212,0.35)',
    number: '03',
    emoji: '🔗',
  },
  {
    icon: Share2,
    title: 'Spread Joy',
    description: 'Send via WhatsApp, copy the link, or share directly on social media.',
    accent: 'from-rose-500 to-pink-400',
    glow: 'rgba(244,63,94,0.35)',
    number: '04',
    emoji: '🎉',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 px-4 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 50%, #042f2e22 0%, #030712 55%, #0a0a1a 100%)',
        }}
      />

      {/* Islamic pattern overlay */}
      <div className="absolute inset-0 islamic-pattern opacity-30" />

      {/* Top & bottom section dividers */}
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="section-divider absolute bottom-0 left-0 right-0" />

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-emerald-500/20 rounded-tl-xl hidden sm:block" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-emerald-500/20 rounded-tr-xl hidden sm:block" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-emerald-500/20 rounded-bl-xl hidden sm:block" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-emerald-500/20 rounded-br-xl hidden sm:block" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-emerald mb-6 text-emerald-300 text-xs sm:text-sm font-semibold tracking-widest uppercase"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>
            Simple Steps
          </motion.div>

          <h2
            className="font-bold text-white mb-4 leading-tight"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontFamily: 'var(--font-playfair), Georgia, serif',
            }}
          >
            How It{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Works
            </span>
          </h2>

          <p className="text-white/45 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            Create and share beautiful Eid greetings in just four simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={cardVariants}
            >
              {/* Connector arrow on desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 items-center">
                  <div
                    className="w-6 h-px"
                    style={{ background: 'linear-gradient(90deg, rgba(16,185,129,0.2), transparent)' }}
                  />
                  <div className="w-2 h-2 border-t border-r border-emerald-500/30 rotate-45 -ml-1" />
                </div>
              )}

              {/* Card */}
              <motion.div
                className="relative h-full rounded-2xl overflow-hidden glass border border-white/5 p-6 sm:p-7 flex flex-col"
                whileHover={{ y: -6, borderColor: 'rgba(16,185,129,0.25)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${step.glow} 0%, transparent 60%)`,
                  }}
                />

                {/* Number badge */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ${step.accent} shadow-lg`}
                  >
                    {step.number}
                  </div>
                  <span className="text-3xl">{step.emoji}</span>
                </div>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${step.accent} bg-opacity-10`}
                  style={{ background: `linear-gradient(135deg, ${step.glow.replace('0.35', '0.15')}, transparent)` }}
                >
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${step.accent} opacity-0 group-hover:opacity-70 transition-opacity duration-500`}
                />
              </motion.div>

              {/* Mobile connector */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-3">
                  <motion.div
                    className="w-px h-6"
                    style={{ background: 'linear-gradient(180deg, rgba(16,185,129,0.4), transparent)' }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent" />
            <motion.span
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-emerald-400/50 text-xl"
            >
              ✦
            </motion.span>
            <span className="text-white/20 text-xs tracking-widest uppercase px-2">Made with love</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-emerald-400/50 text-xl"
            >
              ✦
            </motion.span>
            <div className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent via-emerald-500/25 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
