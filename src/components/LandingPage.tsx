'use client';

import { useState, useRef } from 'react';
import Hero from '@/components/Hero';
import ThemePreview from '@/components/ThemePreview';
import HowItWorks from '@/components/HowItWorks';
import WishCreator from '@/components/WishCreator';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const [showCreator, setShowCreator] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(undefined);
  const creatorRef = useRef<HTMLDivElement>(null);

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
    <main className="min-h-screen relative" style={{ background: '#000' }}>
      {/* Fixed ambient background */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, #1a0f00 0%, #050300 40%, #000 100%)' }}
      />

      {/* Hero */}
      <Hero onCreateWish={handleCreateWish} />

      {/* Themes */}
      <ThemePreview onSelectTheme={handleSelectTheme} selectedTheme={selectedTheme} />

      {/* How It Works */}
      <HowItWorks />

      {/* Wish Creator section */}
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
            {/* Warm ambient background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(217,119,6,0.07) 0%, #000 55%)',
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

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
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(0deg, #020100 0%, #050200 100%)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-5"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="text-4xl mb-3"
              >
                🌙
              </motion.div>
              <h3
                className="text-2xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #fde68a, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'Georgia, serif',
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
              className="text-white/30 max-w-sm mx-auto text-sm mb-8 leading-relaxed"
            >
              Spreading Eid joy through beautiful personalized greetings with love.
            </motion.p>

            {/* Ornament */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-10 h-px bg-gradient-to-r from-transparent to-amber-400/20" />
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-amber-400/40 text-sm"
              >
                ✦
              </motion.span>
              <span className="text-white/20 text-xs">Made with ❤️ for the Muslim Ummah</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                className="text-amber-400/40 text-sm"
              >
                ✦
              </motion.span>
              <div className="w-10 h-px bg-gradient-to-l from-transparent to-amber-400/20" />
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-6 border-t border-amber-400/[0.06]"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/15 text-xs">
              <p>© {new Date().getFullYear()} EidWish. All rights reserved.</p>
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  className="text-amber-400/40"
                >
                  ☪
                </motion.span>
                <span className="text-amber-400/30">Eid Mubarak</span>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}
