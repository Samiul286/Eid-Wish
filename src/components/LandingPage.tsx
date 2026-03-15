'use client';

import { useState, useRef } from 'react';
import Hero from '@/components/Hero';
import ThemePreview from '@/components/ThemePreview';
import HowItWorks from '@/components/HowItWorks';
import WishCreator from '@/components/WishCreator';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeviceCapabilities, useReducedMotion } from '@/hooks/use-reduced-motion';

export default function LandingPage() {
  const [showCreator, setShowCreator] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(undefined);
  const creatorRef = useRef<HTMLDivElement>(null);
  const { isMobile, isLowEnd } = useDeviceCapabilities();
  const prefersReducedMotion = useReducedMotion();

  const handleCreateWish = () => {
    setShowCreator(true);
    setTimeout(() => {
      creatorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    setShowCreator(true);
    setTimeout(() => {
      creatorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <main className="min-h-screen relative">
      {/* Fixed background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #030712 0%, #0a0f1a 30%, #0d1117 60%, #030712 100%)',
          }}
        />
        {/* Subtle ambient orbs — desktop only */}
        {!isMobile && !isLowEnd && !prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 60%)',
                filter: 'blur(50px)',
                willChange: 'transform, opacity',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 60%)',
                filter: 'blur(40px)',
                willChange: 'transform, opacity',
              }}
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.55, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            />
          </>
        )}
      </div>

      {/* Hero */}
      <Hero onCreateWish={handleCreateWish} />

      {/* Themes */}
      <ThemePreview onSelectTheme={handleSelectTheme} selectedTheme={selectedTheme} />

      {/* How It Works */}
      <HowItWorks />

      {/* Wish Creator */}
      <AnimatePresence>
        {showCreator && (
          <motion.section
            ref={creatorRef}
            className="relative py-20 sm:py-28 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.06) 0%, #030712 60%)',
              }}
            />
            <div className="section-divider absolute top-0 left-0 right-0" />

            {/* Decorative elements — desktop only */}
            {!isMobile && !prefersReducedMotion && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-12 left-12 text-4xl opacity-[0.04]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                >
                  ✦
                </motion.div>
                <motion.div
                  className="absolute bottom-12 right-12 text-5xl opacity-[0.04]"
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                >
                  ✦
                </motion.div>
              </div>
            )}

            <div className="relative z-10 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <WishCreator key={selectedTheme} />
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative py-14 sm:py-16 px-4 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, #030712 0%, #060d12 50%, #030712 100%)',
          }}
        />
        <div className="section-divider absolute top-0 left-0 right-0" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Content */}
          <div className="flex flex-col items-center text-center">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-5"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block text-4xl mb-3"
              >
                🌙
              </motion.span>
              <h3
                className="text-2xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #34d399)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                }}
              >
                EidWish
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/35 max-w-sm mx-auto text-sm mb-8 leading-relaxed"
            >
              Spreading joy and blessings this Eid through beautiful personalized greetings.
            </motion.p>

            {/* Separator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-10 h-px bg-gradient-to-r from-transparent to-white/10" />
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-emerald-400/50"
              >
                ✦
              </motion.span>
              <span className="text-white/25 text-xs">Made with ❤️ for the Muslim Ummah</span>
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-emerald-400/50"
              >
                ✦
              </motion.span>
              <div className="w-10 h-px bg-gradient-to-l from-transparent to-white/10" />
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-6 border-t border-white/[0.04]"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/20 text-xs">
              <p>© {new Date().getFullYear()} EidWish. All rights reserved.</p>
              <div className="flex items-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="text-base"
                >
                  ☪
                </motion.span>
                <span>Eid Mubarak</span>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}
