'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface GoldenThemeProps {
  children?: React.ReactNode;
}

// Seeded pseudo-random number generator for consistent SSR/CSR
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Gold Dust Particle
function GoldDust({ seed }: { seed: number }) {
  const left = seededRandom(seed * 4) * 100;
  const top = seededRandom(seed * 4 + 1) * 100;
  const size = seededRandom(seed * 4 + 2) * 3 + 1;
  const duration = seededRandom(seed * 4 + 3) * 4 + 3;
  const delay = seededRandom(seed * 4 + 4) * 2;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(218, 165, 32, 0.5) 50%, transparent 70%)`,
        willChange: 'transform, opacity'
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 10, -10, 0],
        opacity: [0.3, 1, 0.3],
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

// Floating Gold Flake
function GoldFlake({ seed }: { seed: number }) {
  const left = seededRandom(seed * 5) * 100;
  const duration = seededRandom(seed * 5 + 1) * 8 + 10;
  const delay = seededRandom(seed * 5 + 2) * 5;
  const size = seededRandom(seed * 5 + 3) * 8 + 6;
  const rotation = seededRandom(seed * 5 + 4) * 720 - 360;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: -30,
        willChange: 'transform, opacity'
      }}
      initial={{ y: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: '110vh',
        rotate: rotation,
        opacity: [0, 0.8, 0.6, 0],
        x: [0, 40, -30, 20, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg width={size} height={size * 1.2} viewBox="0 0 20 24">
        <defs>
          <linearGradient id={`flakeGrad${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#daa520" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
        <path
          d="M10 0 L12 8 L20 10 L12 12 L10 24 L8 12 L0 10 L8 8 Z"
          fill={`url(#flakeGrad${seed})`}
          opacity="0.8"
        />
      </svg>
    </motion.div>
  );
}

// Crown Jewel
function CrownJewel({ top, left, delay }: { top: number; left: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${top}%`, left: `${left}%`, willChange: 'transform, opacity' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.8],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="relative">
        <motion.div
          className="absolute -inset-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <svg width="20" height="20" viewBox="0 0 24 24">
          <defs>
            <linearGradient id={`jewelGrad${top}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#b8860b" />
            </linearGradient>
          </defs>
          <path
            d="M12 2 L15 9 L22 9 L16.5 13.5 L18.5 21 L12 16.5 L5.5 21 L7.5 13.5 L2 9 L9 9 Z"
            fill={`url(#jewelGrad${top})`}
          />
        </svg>
      </div>
    </motion.div>
  );
}

// Elegant Light Ray
function LightRay({ index }: { index: number }) {
  const left = 15 + index * 17;
  
  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{
        left: `${left}%`,
        width: 1,
        height: '40%',
        background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.2) 0%, transparent 100%)',
        transformOrigin: 'top',
        willChange: 'transform, opacity'
      }}
      animate={{
        scaleY: [0.5, 1, 0.5],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration: 3,
        delay: index * 0.3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Shimmer Wave
function ShimmerWave({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{ top: '30%' }}
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div
        className="w-1/2 h-px mx-auto"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.6), transparent)',
        }}
      />
    </motion.div>
  );
}

// Ornate Frame Corner
function OrnateCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const positionStyles = {
    tl: { top: 0, left: 0, transform: 'rotate(0deg)' },
    tr: { top: 0, right: 0, transform: 'rotate(90deg)' },
    bl: { bottom: 0, left: 0, transform: 'rotate(-90deg)' },
    br: { bottom: 0, right: 0, transform: 'rotate(180deg)' },
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ ...positionStyles[position], willChange: 'transform, opacity' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80">
        <defs>
          <linearGradient id={`cornerGrad${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#daa520" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
        <path
          d="M0 0 L40 0 L40 4 L4 4 L4 40 L0 40 Z"
          fill={`url(#cornerGrad${position})`}
          opacity="0.7"
        />
        <circle cx="20" cy="20" r="8" fill="none" stroke={`url(#cornerGrad${position})`} strokeWidth="1" opacity="0.5" />
        <path
          d="M8 8 Q16 8 16 16 Q16 24 8 24"
          fill="none"
          stroke={`url(#cornerGrad${position})`}
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M12 4 L12 12 L20 12"
          fill="none"
          stroke={`url(#cornerGrad${position})`}
          strokeWidth="0.5"
          opacity="0.4"
        />
      </svg>
    </motion.div>
  );
}

// Golden Halo
function GoldenHalo() {
  return (
    <motion.div
      className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ willChange: 'transform, opacity' }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: 600,
          height: 400,
          background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.15) 0%, rgba(218, 165, 32, 0.05) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}

export default function GoldenTheme({ children }: GoldenThemeProps) {
  const goldDust = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({ seed: i * 7 }));
  }, []);

  const goldFlakes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({ seed: i * 11 }));
  }, []);

  const crownJewels = useMemo(() => [
    { top: 10, left: 20, delay: 0 },
    { top: 15, left: 75, delay: 1 },
    { top: 25, left: 45, delay: 2 },
    { top: 8, left: 55, delay: 1.5 },
    { top: 20, left: 30, delay: 0.5 },
  ], []);

  const lightRays = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({ index: i }));
  }, []);

  const shimmerWaves = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({ delay: i * 3 }));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Rich black with warm undertones */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            135deg,
            #0a0806 0%,
            #1a1410 15%,
            #241c14 30%,
            #2a2016 45%,
            #1a1410 60%,
            #140e0a 75%,
            #0a0806 90%,
            #050403 100%
          )`,
        }}
      />

      {/* Luxurious damask pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23d4af37'%3E%3Cpath d='M60 10 Q70 30 60 50 Q50 30 60 10 M10 60 Q30 70 50 60 Q30 50 10 60 M110 60 Q90 70 70 60 Q90 50 110 60 M60 110 Q70 90 60 70 Q50 90 60 110'/%3E%3Ccircle cx='60' cy='60' r='15' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3Ccircle cx='60' cy='60' r='25' fill='none' stroke='%23d4af37' stroke-width='0.3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Golden halo */}
      <GoldenHalo />

      {/* Light rays from top */}
      {lightRays.map((ray, i) => (
        <LightRay key={i} {...ray} />
      ))}

      {/* Shimmer waves */}
      {shimmerWaves.map((wave, i) => (
        <ShimmerWave key={i} {...wave} />
      ))}

      {/* Gold dust particles */}
      {goldDust.map((dust, i) => (
        <GoldDust key={i} {...dust} />
      ))}

      {/* Floating gold flakes */}
      {goldFlakes.map((flake, i) => (
        <GoldFlake key={i} {...flake} />
      ))}

      {/* Crown jewels */}
      {crownJewels.map((jewel, i) => (
        <CrownJewel key={i} {...jewel} />
      ))}

      {/* Ornate frame corners */}
      <OrnateCorner position="tl" />
      <OrnateCorner position="tr" />
      <OrnateCorner position="bl" />
      <OrnateCorner position="br" />

      {/* Top gold bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #ffd700 20%, #daa520 50%, #ffd700 80%, transparent 100%)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Bottom gold bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #ffd700 20%, #daa520 50%, #ffd700 80%, transparent 100%)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5, 4, 3, 0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
