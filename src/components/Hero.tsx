'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Zap, Globe, Heart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface HeroProps {
  onCreateWish?: () => void;
}

/* ────────────────── Twinkling Star ────────────────── */
function Star({ seed }: { seed: number }) {
  const r = (s: number) => {
    const x = Math.sin(s * 12.9898 + s * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const left = r(seed * 3) * 100;
  const top = r(seed * 3 + 1) * 100;
  const size = r(seed * 3 + 2) * 2.5 + 1;
  const dur = r(seed * 3 + 3) * 4 + 2;
  const del = r(seed * 3 + 4) * 4;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(${r(seed) > 0.5 ? '110,231,183' : '167,243,208'}, ${r(seed) * 0.6 + 0.3}) 0%, transparent 70%)`,
        willChange: 'transform, opacity',
      }}
      animate={{ opacity: [0.1, 1, 0.1], scale: [0.7, 1.4, 0.7] }}
      transition={{ duration: dur, delay: del, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ────────────────── Floating Orb ────────────────── */
function FloatingOrb({ color, size, x, y, delay }: { color: string; size: number; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        filter: 'blur(60px)',
        willChange: 'transform, opacity',
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.15, 1],
      }}
      transition={{ duration: 8 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ────────────────── Badge ────────────────── */
function Badge({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-emerald"
      whileHover={{ scale: 1.06, y: -2 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="text-white/70 text-sm font-medium whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

export default function Hero({ onCreateWish }: HeroProps) {
  const stars = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 sm:py-24 overflow-hidden">

      {/* ── Background Layer ── */}
      <div className="absolute inset-0">
        {/* Deep base */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 120% 90% at 50% 0%, #042f2e 0%, #030712 50%, #0a0a1a 100%)',
          }}
        />

        {/* Ambient orbs */}
        <FloatingOrb color="radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)" size={500} x="10%" y="5%" delay={0} />
        <FloatingOrb color="radial-gradient(circle, rgba(13,148,136,0.2) 0%, transparent 70%)" size={400} x="60%" y="20%" delay={3} />
        <FloatingOrb color="radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)" size={350} x="75%" y="60%" delay={6} />
        <FloatingOrb color="radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)" size={300} x="5%" y="70%" delay={9} />

        {/* Stars */}
        {stars.map((i) => <Star key={i} seed={i * 7} />)}

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16,185,129,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(3,7,18,0.8) 100%)',
          }}
        />
      </div>

      {/* ── Central Moon Emblem ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '8%', left: '50%', transform: 'translateX(-50%)' }}
        initial={{ opacity: 0, scale: 0.6, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="relative w-40 h-40 sm:w-52 sm:h-52">
          {/* Pulse rings */}
          {[80, 100, 120].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-emerald-500/20"
              style={{
                width: size * 1.4,
                height: size * 1.4,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 4 + i, delay: i * 1.2, repeat: Infinity }}
            />
          ))}

          {/* Moon SVG */}
          <motion.div
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6ee7b7" />
                  <stop offset="40%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <filter id="moonGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <radialGradient id="moonGlowGrad" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(16,185,129,0.4)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              {/* Glow */}
              <circle cx="50" cy="50" r="40" fill="url(#moonGlowGrad)" />
              {/* Crescent */}
              <path
                d="M 50 10 A 40 40 0 1 1 50 90 A 30 30 0 1 0 50 10"
                fill="url(#moonGrad)"
                filter="url(#moonGlow)"
              />
              {/* Star */}
              <path
                d="M 70 35 L 72 41 L 78 41 L 73.5 44.5 L 75.5 51 L 70 47 L 64.5 51 L 66.5 44.5 L 62 41 L 68 41 Z"
                fill="#fbbf24"
                opacity="0.9"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-10 text-center max-w-5xl mx-auto w-full mt-28 sm:mt-32">

        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase glass-emerald text-emerald-300 animate-border-glow">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            Eid Mubarak 2025
          </span>
        </motion.div>

        {/* Arabic title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mb-4"
        >
          <h2
            className="font-bold leading-none"
            style={{
              fontSize: 'clamp(2.8rem, 10vw, 6.5rem)',
              background: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 35%, #34d399 60%, #6ee7b7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'var(--font-amiri), serif',
              textShadow: '0 0 80px rgba(16,185,129,0.3)',
            }}
          >
            عيد مبارك
          </h2>
        </motion.div>

        {/* English headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mb-8"
        >
          <h1
            className="font-bold text-white tracking-tight leading-[1.05]"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4.75rem)',
              fontFamily: 'var(--font-playfair), Georgia, serif',
            }}
          >
            Create&nbsp;
            <span
              style={{
                background: 'linear-gradient(135deg, #10b981, #06b6d4, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Magical
            </span>
            <br className="sm:hidden" />
            &nbsp;Eid Greetings
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-emerald-500/40" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </motion.div>
          <div className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-emerald-500/40" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-base sm:text-lg md:text-xl text-white/55 mb-12 max-w-2xl mx-auto leading-relaxed px-4"
        >
          Send heartfelt Eid blessings to your loved ones with stunning animated themes,
          personalized messages, and one-click sharing.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          {/* Primary CTA */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-2xl blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <Button
              onClick={onCreateWish}
              size="lg"
              className="relative px-8 sm:px-10 py-6 text-base sm:text-lg font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:via-teal-400 hover:to-emerald-400 text-white rounded-2xl shadow-xl shadow-emerald-900/50 transition-all duration-500 group overflow-hidden border border-emerald-400/30"
            >
              {/* Shine sweep */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              />
              <Sparkles className="w-5 h-5 mr-2.5 relative group-hover:scale-110 transition-transform duration-300" />
              <span className="relative">Create Your Eid Wish</span>
              <ArrowRight className="w-5 h-5 ml-2.5 relative group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Secondary CTA */}
          <Button
            variant="outline"
            size="lg"
            onClick={onCreateWish}
            className="px-8 py-6 text-base sm:text-lg font-semibold rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/80 transition-all duration-300 backdrop-blur-sm"
          >
            View Themes
          </Button>
        </motion.div>

        {/* Feature Badges */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Badge icon={Zap} label="5 Stunning Themes" />
          <Badge icon={Sparkles} label="Animated Effects" />
          <Badge icon={Globe} label="Instant Sharing" />
          <Badge icon={Heart} label="100% Free" />
        </motion.div>
      </div>

      {/* ── Bottom Scroll Hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/20 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-emerald-400/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
