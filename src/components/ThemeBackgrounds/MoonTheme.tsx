'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDeviceCapabilities, useReducedMotion } from '@/hooks/use-reduced-motion';

interface MoonThemeProps {
  children?: React.ReactNode;
}

// Seeded pseudo-random number generator for consistent SSR/CSR
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Twinkling Star Component
function TwinklingStar({ seed }: { seed: number }) {
  const left = seededRandom(seed * 5) * 100;
  const top = seededRandom(seed * 5 + 1) * 100;
  const size = seededRandom(seed * 5 + 2) * 2 + 1;
  const duration = seededRandom(seed * 5 + 3) * 2 + 2;
  const delay = seededRandom(seed * 5 + 4) * 3;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 215, 0, 0.5) 50%, transparent 70%)`,
        willChange: 'transform, opacity',
      }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [0.8, 1.2, 0.8],
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

// Shooting Star Component
function ShootingStar({ seed }: { seed: number }) {
  const top = seededRandom(seed * 6) * 50;
  const left = seededRandom(seed * 6 + 1) * 100;
  const duration = seededRandom(seed * 6 + 2) * 1 + 1.5;
  const delay = seededRandom(seed * 6 + 3) * 8;

  return (
    <motion.div
      className="absolute"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: 100,
        height: 1,
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,215,0,0.8) 100%)',
        transform: 'rotate(-45deg)',
        borderRadius: 2,
        willChange: 'transform, opacity',
      }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, 200],
        y: [0, 200],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

// Constellation Point
function ConstellationPoint({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-yellow-200"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    />
  );
}

// Large Crescent Moon
function LargeCrescentMoon() {
  return (
    <motion.div
      className="absolute top-10 right-10 md:top-16 md:right-20"
      initial={{ opacity: 0, x: 100, rotate: 45 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      {/* Moon glow layers */}
      <div className="relative">
        {/* Outer glow */}
        <motion.div
          className="absolute -inset-20 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Inner glow */}
        <motion.div
          className="absolute -inset-10 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.25) 0%, transparent 60%)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Crescent SVG */}
        <svg width="150" height="150" viewBox="0 0 100 100" className="md:w-[200px] md:h-[200px]">
          <defs>
            <linearGradient id="moonGradientNew" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffef0" />
              <stop offset="30%" stopColor="#ffd700" />
              <stop offset="70%" stopColor="#f4c430" />
              <stop offset="100%" stopColor="#daa520" />
            </linearGradient>
            <filter id="moonGlowNew">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d="M 50 5 A 45 45 0 1 1 50 95 A 35 35 0 1 0 50 5"
            fill="url(#moonGradientNew)"
            filter="url(#moonGlowNew)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </motion.div>
  );
}

// Islamic Geometric Pattern Background
function IslamicPattern() {
  return (
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffd700' stroke-width='0.5'%3E%3Cpath d='M40 0L40 80M0 40L80 40'/%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Cpath d='M40 20L46.93 30L46.93 50L40 60L33.07 50L33.07 30Z'/%3E%3Cpath d='M20 40L30 33.07L50 33.07L60 40L50 46.93L30 46.93Z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Nebula Effect
function Nebula() {
  return (
    <>
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30, 60, 114, 0.3) 0%, transparent 60%)',
          filter: 'blur(40px)',
          willChange: 'transform, opacity',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(57, 73, 171, 0.2) 0%, transparent 50%)',
          filter: 'blur(30px)',
          willChange: 'transform, opacity',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

export default function MoonTheme({ children }: MoonThemeProps) {
  const { isMobile, isLowEnd } = useDeviceCapabilities();
  const prefersReducedMotion = useReducedMotion();

  // Reduce particle count on mobile and low-end devices
  const starCount = prefersReducedMotion ? 0 : (isMobile || isLowEnd) ? 30 : 80;
  const shootingStarCount = prefersReducedMotion ? 0 : (isMobile || isLowEnd) ? 2 : 5;

  const stars = useMemo(() => {
    return Array.from({ length: starCount }, (_, i) => ({ seed: i * 7 }));
  }, [starCount]);

  const shootingStars = useMemo(() => {
    return Array.from({ length: shootingStarCount }, (_, i) => ({ seed: i * 13 }));
  }, [shootingStarCount]);

  const constellationPoints = useMemo(() => [
    { x: 15, y: 20 }, { x: 18, y: 25 }, { x: 22, y: 22 },
    { x: 17, y: 30 }, { x: 25, y: 28 }, { x: 30, y: 25 },
    { x: 20, y: 35 }, { x: 28, y: 33 }, { x: 35, y: 30 },
  ], []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Deep night sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            #000510 0%,
            #0a1628 15%,
            #0d1b2a 30%,
            #1a237e 50%,
            #283593 65%,
            #3949ab 80%,
            #1a237e 100%
          )`,
        }}
      />

      {/* Islamic geometric pattern */}
      <IslamicPattern />

      {/* Nebula effects - skip on mobile for performance */}
      {!isMobile && !prefersReducedMotion && <Nebula />}

      {/* Large crescent moon */}
      <LargeCrescentMoon />

      {/* Constellation in top-left - skip on mobile */}
      {!isMobile && !prefersReducedMotion && (
        <div className="absolute top-20 left-10 opacity-60">
          {constellationPoints.map((point, i) => (
            <ConstellationPoint key={i} {...point} delay={i * 0.1 + 2} />
          ))}
          {/* Constellation lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{ width: 200, height: 150 }}>
            <motion.path
              d="M 30 40 L 36 50 L 44 44 L 34 60 L 50 56 L 60 50 L 40 70 L 56 66 L 70 60"
              stroke="rgba(255, 215, 0, 0.5)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 2 }}
            />
          </svg>
        </div>
      )}

      {/* Twinkling stars */}
      {stars.map((star, i) => (
        <TwinklingStar key={i} {...star} />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star, i) => (
        <ShootingStar key={i} {...star} />
      ))}

      {/* Top gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 5, 16, 0.8) 0%, transparent 100%)',
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(26, 35, 126, 0.6) 0%, transparent 100%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 5, 16, 0.5) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
