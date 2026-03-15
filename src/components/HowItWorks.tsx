'use client';

import { motion } from 'framer-motion';
import { Sparkles, Palette, Link2, Share2, Moon } from 'lucide-react';

const steps = [
  {
    icon: Sparkles,
    title: 'Enter Details',
    description: 'Add your name and recipient\'s name to personalize your Eid greeting',
    gradient: 'from-amber-500 via-yellow-500 to-orange-400',
    number: '01',
  },
  {
    icon: Palette,
    title: 'Pick a Theme',
    description: 'Choose from 5 stunning animated themes that match your style',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-400',
    number: '02',
  },
  {
    icon: Link2,
    title: 'Generate Link',
    description: 'Get a unique shareable link for your personalized greeting',
    gradient: 'from-violet-500 via-purple-500 to-indigo-400',
    number: '03',
  },
  {
    icon: Share2,
    title: 'Share Joy',
    description: 'Send via WhatsApp, Facebook, or or copy the link to share',
    gradient: 'from-cyan-500 via-teal-500 to-emerald-400',
    number: '04',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            #080508 0%,
            #0c0810 20%,
            #12101c 40%,
            #181428 50%,
            #12101c 60%,
            #0c0810 80%,
            #080508 100%
          )`,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <Moon className="w-32 h-32 text-amber-400" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 opacity-10"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        >
          <Moon className="w-40 h-40 text-amber-400" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Ornamental top */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/30" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
            </motion.div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/30" />
          </motion.div>

          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              background: 'linear-gradient(135deg, #ffd700 0%, #daa520 50%, #b8860b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            How It Works
          </h2>

          <p className="text-white/50 text-lg max-w-md mx-auto">
            Create and share beautiful Eid greetings in 4 easy steps
          </p>
        </motion.div>

        {/* Steps container */}
        <div className="relative">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-px -translate-y-1/2">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(218, 165, 32, 0.2) 20%, rgba(218, 165, 32, 0.2) 80%, transparent 100%)',
              }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Step card */}
                <motion.div
                  className="relative h-full rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{ y: -5 }}
                >
                  {/* Top gradient border */}
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(218, 165, 32, 0.3), transparent)` }}
                  />

                  {/* Content */}
                  <div className="p-6 text-center">
                    {/* Number badge */}
                    <motion.div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                      style={{
                        background: `linear-gradient(135deg, ${step.gradient.split(' ')[1]} 0%, ${step.gradient.split(' ')[3]} 100%)`,
                      }}
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    >
                      {step.number}
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      className="w-20 h-20 mx-auto mt-6 mb-4 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, rgba(218, 165, 32, 0.1) 0%, rgba(184, 134, 11, 0.05) 100%)`,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <step.icon className="w-10 h-10 text-amber-400" />
                    </motion.div>

                    {/* Text */}
                    <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                  </div>

                  {/* Bottom gradient bar */}
                  <motion.div
                    className="absolute bottom-0 left-4 right-4 h-1 rounded-full opacity-0 group-hover:opacity-60 transition-opacity"
                    style={{ background: `linear-gradient(90deg, ${step.gradient.split(' ')[1]}, ${step.gradient.split(' ')[3]})` }}
                  />
                </motion.div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center py-4">
                    <motion.div
                      className="w-px h-8"
                      style={{ background: 'linear-gradient(180deg, rgba(218, 165, 32, 0.3), transparent)' }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="text-3xl opacity-20"
            >
              ✦
            </motion.div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-amber-400/40 text-xl"
            >
              ☪
            </motion.div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="text-3xl opacity-20"
            >
              ✦
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
