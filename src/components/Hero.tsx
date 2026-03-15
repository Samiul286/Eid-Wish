'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

interface HeroProps {
  onCreateWish?: () => void;
}

/* ── Deterministic random ── */
function sr(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/* ── Twinkling Star ── */
function TwinkleStar({ i }: { i: number }) {
  const x = sr(i * 3) * 100;
  const y = sr(i * 3 + 1) * 100;
  const s = sr(i * 3 + 2) * 2.5 + 0.8;
  const dur = sr(i * 3 + 3) * 4 + 3;
  const del = sr(i * 3 + 4) * 5;
  const gold = sr(i) > 0.6;
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: s,
        height: s,
        background: gold
          ? `rgba(251, 191, 36, ${sr(i + 7) * 0.5 + 0.3})`
          : `rgba(255, 255, 255, ${sr(i + 9) * 0.4 + 0.2})`,
        boxShadow: gold ? `0 0 ${s * 3}px rgba(251,191,36,0.6)` : 'none',
        willChange: 'transform, opacity',
      }}
      animate={{ opacity: [0.1, 1, 0.1], scale: [0.6, 1.4, 0.6] }}
      transition={{ duration: dur, delay: del, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ── Floating Lantern ── */
function Lantern({ i }: { i: number }) {
  const x = sr(i * 7) * 80 + 10;
  const del = sr(i * 5) * 6;
  const dur = sr(i * 4) * 8 + 12;
  const size = sr(i * 6) * 20 + 20;
  const colors = [
    ['#f59e0b', '#d97706'],
    ['#ef4444', '#b91c1c'],
    ['#8b5cf6', '#6d28d9'],
    ['#06b6d4', '#0e7490'],
    ['#f97316', '#ea580c'],
  ];
  const [c1, c2] = colors[i % colors.length];
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, bottom: '-10%', willChange: 'transform, opacity' }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.7, 0.7, 0],
        y: [0, -window.innerHeight * 0.8],
        x: [0, (sr(i * 11) - 0.5) * 120],
      }}
      transition={{
        duration: dur,
        delay: del,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    >
      {/* Lantern body */}
      <div style={{ width: size, height: size * 1.4, position: 'relative' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `radial-gradient(ellipse at 40% 30%, ${c1}dd, ${c2}88)`,
            borderRadius: '40% 40% 50% 50%',
            boxShadow: `0 0 ${size * 0.6}px ${c1}66, inset 0 0 ${size * 0.3}px rgba(255,255,255,0.15)`,
            border: `1px solid ${c1}80`,
          }}
        />
        {/* String */}
        <div
          style={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1,
            height: 12,
            background: `${c1}80`,
          }}
        />
        {/* Glow core */}
        <div
          style={{
            position: 'absolute',
            inset: '20%',
            background: `radial-gradient(circle, ${c1}cc, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(4px)',
          }}
        />
      </div>
    </motion.div>
  );
}

/* ── Islamic geometric ornament ── */
function IslamicOrnament({ delay }: { delay?: number }) {
  return (
    <motion.div
      className="flex items-center justify-center gap-3"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1.2, delay: delay ?? 0, ease: 'easeOut' }}
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-400/80" />
      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
      <div className="w-2 h-2 rotate-45 border border-amber-400/60" />
      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-400/50 to-amber-400/80" />
    </motion.div>
  );
}

export default function Hero({ onCreateWish }: HeroProps) {
  const stars = useMemo(() => Array.from({ length: 80 }, (_, i) => i), []);
  const lanterns = useMemo(() => Array.from({ length: 6 }, (_, i) => i), []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 sm:py-32 overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 140% 100% at 50% -10%, #1a0f00 0%, #0a0600 40%, #000000 100%)',
          }}
        />
        {/* Gold rim glow at top */}
        <div
          className="absolute top-0 left-0 right-0 h-[50vh]"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(217,119,6,0.18) 0%, transparent 70%)',
          }}
        />
        {/* Stars */}
        {stars.map(i => <TwinkleStar key={i} i={i} />)}
        {/* Floating lanterns */}
        {lanterns.map(i => <Lantern key={i} i={i} />)}
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* ── Crescent Moon ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '5%', right: '8%' }}
        initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.8, delay: 0.3, ease: 'easeOut' }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="90" height="90" viewBox="0 0 100 100" className="opacity-80 hidden sm:block">
            <defs>
              <radialGradient id="moonG" cx="40%" cy="35%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </radialGradient>
              <filter id="moonGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path d="M 55 15 A 35 35 0 1 1 55 85 A 24 24 0 1 0 55 15" fill="url(#moonG)" filter="url(#moonGlow)" opacity="0.9" />
          </svg>
          <div
            className="absolute inset-0 hidden sm:block"
            style={{ filter: 'blur(20px)', background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 65%)' }}
          />
        </motion.div>
      </motion.div>

      {/* ── Small crescent for mobile ── */}
      <motion.div
        className="absolute sm:hidden top-6 right-5 text-3xl"
        animate={{ rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌙
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto">

        {/* Arabic Calligraphy Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full
            bg-amber-500/10 border border-amber-400/25 text-amber-300/80 text-xs sm:text-sm
            font-semibold tracking-widest uppercase backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            Eid al-Fitr 1446
          </span>
        </motion.div>

        {/* Arabic heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mb-3"
        >
          <h2
            className="font-bold leading-none"
            style={{
              fontSize: 'clamp(3.5rem, 14vw, 8rem)',
              fontFamily: 'serif',
              background: 'linear-gradient(135deg, #fde68a 0%, #f59e0b 35%, #fbbf24 65%, #fde68a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 80px rgba(245,158,11,0.25)',
              letterSpacing: '-0.01em',
            }}
          >
            عيد مبارك
          </h2>
        </motion.div>

        {/* Gold ornament divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="my-5 px-4"
        >
          <IslamicOrnament />
        </motion.div>

        {/* English headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mb-6"
        >
          <h1
            className="font-bold text-white tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(1.9rem, 5.5vw, 4.2rem)', fontFamily: 'Georgia, serif' }}
          >
            Send{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24, #fde68a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Magical
            </span>
            {' '}Eid Greetings
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="text-base sm:text-lg text-white/45 mb-12 max-w-xl mx-auto leading-relaxed px-4"
        >
          Create beautiful animated Eid wishes with stunning themes — and share them with your loved ones in one tap.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          {/* Primary */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-2xl blur-xl"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.6) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.button
              onClick={onCreateWish}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-amber-950
                rounded-2xl overflow-hidden border border-amber-300/40 group
                shadow-[0_0_30px_rgba(245,158,11,0.3)]"
              style={{
                background: 'linear-gradient(135deg, #fde68a 0%, #f59e0b 45%, #d97706 100%)',
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-2.5">
                <Sparkles className="w-5 h-5" />
                Create Your Eid Wish
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </div>

          {/* Secondary */}
          <motion.button
            onClick={onCreateWish}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-2xl
              border border-amber-400/20 bg-white/5 hover:bg-white/10 hover:border-amber-400/35
              text-white/70 hover:text-white/90 transition-all duration-300 backdrop-blur-sm"
          >
            Browse Themes
          </motion.button>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {[
            { emoji: '🌙', label: '5 Stunning Themes' },
            { emoji: '✨', label: 'Live Animations' },
            { emoji: '🎵', label: 'Background Music' },
            { emoji: '💌', label: '1-tap Sharing' },
            { emoji: '🆓', label: '100% Free' },
          ].map(({ emoji, label }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.06, y: -2 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full
                bg-amber-500/8 border border-amber-400/15 backdrop-blur-sm"
            >
              <span className="text-sm">{emoji}</span>
              <span className="text-white/55 text-xs sm:text-sm font-medium whitespace-nowrap">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/20 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-amber-400/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-amber-400/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
