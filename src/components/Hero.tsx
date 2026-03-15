'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Moon, Star, ArrowRight, Crown } from 'lucide-react';

interface HeroProps {
  onCreateWish?: () => void;
}

// Seeded pseudo-random number generator
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Floating star component
function FloatingStar({ seed }: { seed: number }) {
  const left = seededRandom(seed * 4) * 100;
  const top = seededRandom(seed * 4 + 1) * 100;
  const size = seededRandom(seed * 4 + 2) * 2 + 1;
  const duration = seededRandom(seed * 4 + 3) * 3 + 2;
  const delay = seededRandom(seed * 4 + 4) * 3;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(255, 215, 0, ${seededRandom(seed) * 0.5 + 0.3}) 0%, transparent 70%)`,
      }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [0.8, 1.3, 0.8],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Orbiting element
function OrbitingElement({ children, radius, duration, delay }: { children: React.ReactNode; radius: number; duration: number; delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: radius,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

// Morphing shape
function MorphingShape({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.3, 0],
        scale: [0.5, 1.5, 0.5],
        rotate: [0, 180, 360],
        borderRadius: ['20%', '50%', '20%'],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        className="w-[600px] h-[600px]"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(218, 165, 32, 0.05) 50%, transparent 100%)',
          filter: 'blur(60px)',
        }}
      />
    </motion.div>
  );
}

export default function Hero({ onCreateWish }: HeroProps) {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({ seed: i * 5 }));
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0">
        {/* Base gradient - dark luxurious */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              180deg,
              #050308 0%,
              #0a0810 15%,
              #100c18 30%,
              #15101f 45%,
              #1a1428 55%,
              #151020 70%,
              #0e0a15 85%,
              #080508 100%
            )`,
          }}
        />

        {/* Radial overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(26, 20, 40, 0.8) 0%, transparent 50%)',
          }}
        />

        {/* Stars */}
        {stars.map((star, i) => (
          <FloatingStar key={i} {...star} />
        ))}

        {/* Morphing shapes */}
        <MorphingShape delay={0} />
        <MorphingShape delay={4} />
      </div>

      {/* Central decorative element - Ornate frame */}
      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        style={{ top: '15%', left: '50%', transform: 'translateX(-50%)' }}
      >
        {/* Large crescent with orbiting elements */}
        <div className="relative">
          {/* Outer glow */}
          <motion.div
            className="absolute -inset-16"
            style={{
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 60%)',
              filter: 'blur(20px)',
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Central crescent */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="180" height="180" viewBox="0 0 100 100" className="opacity-80">
              <defs>
                <linearGradient id="heroMoonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fffef0" />
                  <stop offset="40%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#b8860b" />
                </linearGradient>
                <filter id="heroMoonBlur">
                  <feGaussianBlur stdDeviation="1" />
                </filter>
              </defs>
              <path
                d="M 50 8 A 42 42 0 1 1 50 92 A 32 32 0 1 0 50 8"
                fill="url(#heroMoonGrad)"
                filter="url(#heroMoonBlur)"
              />
            </svg>
          </motion.div>

          {/* Orbiting elements */}
          <OrbitingElement radius={120} duration={20} delay={0}>
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400/50" />
          </OrbitingElement>
          <OrbitingElement radius={140} duration={30} delay={5}>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </OrbitingElement>
          <OrbitingElement radius={100} duration={25} delay={10}>
            <div className="w-2 h-2 rounded-full bg-yellow-300" />
          </OrbitingElement>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Ornamental top decoration */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4">
            <motion.div
              className="w-16 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(218, 165, 32, 0.5))' }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            >
              <Crown className="w-6 h-6 text-amber-400 fill-amber-400/30" />
            </motion.div>
            <motion.div
              className="w-16 h-px"
              style={{ background: 'linear-gradient(90deg, rgba(218, 165, 32, 0.5), transparent)' }}
            />
          </div>
        </motion.div>

        {/* Arabic calligraphy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-4"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #b8860b 0%, #ffd700 40%, #daa520 60%, #b8860b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 60px rgba(255, 215, 0, 0.3)',
              fontFamily: 'var(--font-playfair), Georgia, serif',
            }}
          >
            عيد مبارك
          </motion.h2>
        </motion.div>

        {/* English title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-wide"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            <span className="inline-block">
              Eid
              <motion.span
                className="inline-block mx-3"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Moon className="w-10 h-10 md:w-14 md:h-14 text-yellow-400 fill-yellow-400/30 inline-block" />
              </motion.span>
              Mubarak
            </span>
          </h1>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-amber-400/40" />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </motion.div>
          <div className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-amber-400/40" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl text-amber-100/80 mb-4 font-light"
        >
          Create Beautiful Personalized Eid Greetings
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base md:text-lg text-white/40 mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Send heartfelt Eid wishes to your loved ones with stunning animations and beautiful themes
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="relative inline-block"
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 60%)',
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <Button
            onClick={onCreateWish}
            size="lg"
            className="relative px-10 py-7 text-lg font-semibold bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 hover:from-amber-500 hover:via-yellow-300 hover:to-amber-500 text-black rounded-full shadow-lg shadow-yellow-500/30 transition-all duration-500 group"
            style={{
              backgroundSize: '200% 100%',
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <Sparkles className="w-5 h-5 mr-3 relative group-hover:rotate-180 transition-transform duration-500" />
            <span className="relative">Create Your Eid Wish</span>
            <ArrowRight className="w-5 h-5 ml-3 relative group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {[
            { icon: '🎨', label: '5 Beautiful Themes' },
            { icon: '✨', label: 'Animated Effects' },
            { icon: '🔗', label: 'Instant Sharing' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-full border border-amber-400/20 bg-amber-400/5 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: 'rgba(218, 165, 32, 0.4)' }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-white/70 text-sm">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
