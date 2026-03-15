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
      {/* Background - Deep luxurious gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              180deg,
              #030208 0%,
              #080510 20%,
              #0c0810 35%,
              #100c18 50%,
              #151020 65%,
              #100c18 80%,
              #080510 90%,
              #050308 100%
            )`,
          }}
        />
        
        {/* Ambient glow effects - skip on mobile for performance */}
        {!isMobile && !isLowEnd && !prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 60%)',
                filter: 'blur(40px)',
                willChange: 'transform, opacity',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(218, 165, 32, 0.05) 0%, transparent 60%)',
                filter: 'blur(30px)',
                willChange: 'transform, opacity',
              }}
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </>
        )}
      </div>

      {/* Hero Section */}
      <Hero onCreateWish={handleCreateWish} />

      {/* Theme Preview Section */}
      <ThemePreview 
        onSelectTheme={handleSelectTheme} 
        selectedTheme={selectedTheme}
      />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Wish Creator Section */}
      <AnimatePresence>
        {showCreator && (
          <motion.section
            ref={creatorRef}
            className="relative py-24 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Background */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  180deg,
                  #050308 0%,
                  #0c0810 30%,
                  #12101c 50%,
                  #151020 70%,
                  #12101c 85%,
                  #080510 100%
                )`,
              }}
            />
            
            {/* Decorative elements - skip on mobile */}
            {!isMobile && !prefersReducedMotion && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-10 left-10 text-5xl opacity-5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                >
                  ✦
                </motion.div>
                <motion.div
                  className="absolute bottom-10 right-10 text-6xl opacity-5"
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                >
                  ✦
                </motion.div>
              </div>
            )}

            <div className="relative z-10 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
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
      <footer className="relative py-16 px-4 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(0deg, #030208 0%, #080510 50%, #030208 100%)`,
          }}
        />
        
        {/* Decorative top line */}
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(218, 165, 32, 0.3), transparent)',
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Main footer content */}
          <div className="text-center mb-8">
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block"
              >
                <span className="text-4xl">🌙</span>
              </motion.div>
              <h3 
                className="text-2xl font-bold mt-2"
                style={{
                  background: 'linear-gradient(135deg, #b8860b,0%, #ffd700 50%, #b8860b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                }}
              >
                EidWish
              </h3>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 max-w-md mx-auto mb-8 text-sm"
            >
              Spread joy and blessings this Eid with beautiful personalized greetings
            </motion.p>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/20" />
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-amber-400"
              >
                ✦
              </motion.span>
              <span className="text-white/30 text-xs">Made with ❤️ for the Muslim Ummah</span>
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-amber-400"
              >
                ✦
              </motion.span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/20" />
            </motion.div>
          </div>

          {/* Bottom section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-6 border-t border-white/5"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/25 text-xs">
              <p>© {new Date().getFullYear()} EidWish. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <motion.span 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
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
