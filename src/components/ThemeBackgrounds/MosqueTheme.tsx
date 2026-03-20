'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface MosqueThemeProps {
  children?: React.ReactNode;
}

// Seeded pseudo-random number generator for consistent SSR/CSR
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Evening Star Component
function EveningStar({ seed }: { seed: number }) {
  const left = seededRandom(seed * 4) * 100;
  const top = seededRandom(seed * 4 + 1) * 40;
  const size = seededRandom(seed * 4 + 2) * 2 + 1;
  const duration = seededRandom(seed * 4 + 3) * 2 + 1.5;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 200, 100, 0.5) 50%, transparent 70%)',
        willChange: 'transform, opacity'
      }}
      animate={{
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Floating Lantern Component - New Design
function FloatingLantern({ seed }: { seed: number }) {
  const left = seededRandom(seed * 6) * 90 + 5;
  const top = seededRandom(seed * 6 + 1) * 30 + 10;
  const size = seededRandom(seed * 6 + 2) * 20 + 25;
  const duration = seededRandom(seed * 6 + 3) * 4 + 6;
  const hue = seededRandom(seed * 6 + 4) * 40 + 20; // Orange to gold range

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        willChange: 'transform, opacity'
      }}
      initial={{ y: 0, x: 0 }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, 0, -10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Lantern glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          left: -size * 0.25,
          top: -size * 0.25,
          background: `radial-gradient(circle, hsla(${hue}, 100%, 60%, 0.4) 0%, hsla(${hue}, 100%, 50%, 0.1) 50%, transparent 70%)`,
          willChange: 'transform, opacity'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Lantern SVG */}
      <svg width={size} height={size * 1.4} viewBox="0 0 40 56">
        <defs>
          <linearGradient id={`lanternBody${seed}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={`hsl(${hue}, 100%, 70%)`} />
            <stop offset="50%" stopColor={`hsl(${hue}, 100%, 55%)`} />
            <stop offset="100%" stopColor={`hsl(${hue}, 100%, 40%)`} />
          </linearGradient>
        </defs>
        
        {/* String */}
        <line x1="20" y1="0" x2="20" y2="8" stroke="#5c4033" strokeWidth="1" />
        
        {/* Top cap */}
        <path d="M12 8 L28 8 L26 12 L14 12 Z" fill="#8B4513" />
        
        {/* Lantern body - rounded hexagon */}
        <path
          d="M8 14 Q6 28 8 42 L12 46 Q20 48 28 46 L32 42 Q34 28 32 14 L28 12 Q20 10 12 12 Z"
          fill={`url(#lanternBody${seed})`}
          opacity="0.9"
        />
        
        {/* Inner glow */}
        <ellipse cx="20" cy="28" rx="8" ry="12" fill="white" opacity="0.25" />
        
        {/* Bottom cap */}
        <path d="M14 46 L26 46 L28 50 L12 50 Z" fill="#8B4513" />
        
        {/* Tassel */}
        <line x1="20" y1="50" x2="20" y2="55" stroke="#8B4513" strokeWidth="1" />
        <circle cx="20" cy="55" r="2" fill="#DAA520" />
      </svg>
    </motion.div>
  );
}

// Cloud Component
function Cloud({ top, left, scale, delay }: { top: number; left: number; scale: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        transform: `scale(${scale})`,
      }}
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: [0, 0.6, 0.6, 0],
        x: [-100, 0, 100, 200],
      }}
      transition={{
        duration: 30,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg width="200" height="60" viewBox="0 0 200 60">
        <ellipse cx="50" cy="40" rx="40" ry="20" fill="rgba(255, 200, 150, 0.3)" />
        <ellipse cx="90" cy="30" rx="50" ry="25" fill="rgba(255, 200, 150, 0.25)" />
        <ellipse cx="150" cy="35" rx="45" ry="22" fill="rgba(255, 200, 150, 0.2)" />
      </svg>
    </motion.div>
  );
}

// Birds flying
function FlyingBirds({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute top-[15%] left-[10%] pointer-events-none"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: '100vw', opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg width="60" height="20" viewBox="0 0 60 20">
        <path d="M0 10 Q10 5 20 10 Q30 5 40 10" stroke="rgba(50, 30, 20, 0.5)" strokeWidth="2" fill="none" />
        <path d="M20 10 Q30 5 40 10 Q50 5 60 10" stroke="rgba(50, 30, 20, 0.4)" strokeWidth="2" fill="none" />
      </svg>
    </motion.div>
  );
}

// Majestic Mosque Silhouette
function MosqueSilhouette() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-56 md:h-72 lg:h-80">
      <svg
        viewBox="0 0 1400 280"
        className="w-full h-full"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="mosqueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a0a05" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a0502" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="domeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a1510" />
            <stop offset="100%" stopColor="#1a0a05" />
          </linearGradient>
        </defs>
        
        {/* Main mosque base */}
        <motion.rect
          x="200"
          y="180"
          width="1000"
          height="100"
          fill="url(#mosqueGrad)"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ transformOrigin: 'bottom' }}
        />
        
        {/* Central large dome */}
        <motion.ellipse
          cx="700"
          cy="120"
          rx="120"
          ry="80"
          fill="url(#domeGrad)"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{ transformOrigin: 'bottom' }}
        />
        
        {/* Crescent on main dome */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <circle cx="700" cy="45" r="8" fill="#DAA520" />
          <path d="M695 45 Q700 38 705 45" fill="#DAA520" />
        </motion.g>
        
        {/* Left minaret */}
        <motion.g
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{ transformOrigin: 'bottom' }}
        >
          <rect x="250" y="50" width="30" height="130" fill="url(#mosqueGrad)" />
          <ellipse cx="265" cy="50" rx="18" ry="25" fill="url(#domeGrad)" />
          <circle cx="265" cy="30" r="5" fill="#DAA520" />
          <rect x="245" y="180" width="40" height="20" fill="url(#mosqueGrad)" />
        </motion.g>
        
        {/* Right minaret */}
        <motion.g
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ transformOrigin: 'bottom' }}
        >
          <rect x="1120" y="50" width="30" height="130" fill="url(#mosqueGrad)" />
          <ellipse cx="1135" cy="50" rx="18" ry="25" fill="url(#domeGrad)" />
          <circle cx="1135" cy="30" r="5" fill="#DAA520" />
          <rect x="1110" y="180" width="40" height="20" fill="url(#mosqueGrad)" />
        </motion.g>
        
        {/* Small left dome */}
        <motion.ellipse
          cx="450"
          cy="150"
          rx="60"
          ry="40"
          fill="url(#domeGrad)"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ transformOrigin: 'bottom' }}
        />
        
        {/* Small right dome */}
        <motion.ellipse
          cx="950"
          cy="150"
          rx="60"
          ry="40"
          fill="url(#domeGrad)"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{ transformOrigin: 'bottom' }}
        />
        
        {/* Arched windows - glowing */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          {[400, 550, 700, 850, 1000].map((x, i) => (
            <g key={i}>
              <rect x={x - 15} y="200" width="30" height="40" fill="rgba(255, 180, 80, 0.6)" rx="2" />
              <ellipse cx={x} cy="200" rx="15" ry="20" fill="rgba(255, 180, 80, 0.6)" />
              <rect x={x - 10} y="205" width="20" height="30" fill="rgba(255, 220, 150, 0.4)" />
            </g>
          ))}
        </motion.g>
        
        {/* Main entrance */}
        <motion.g
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.5 }}
          style={{ transformOrigin: 'bottom' }}
        >
          <path d="M660 280 L660 170 Q700 130 740 170 L740 280 Z" fill="rgba(255, 180, 80, 0.7)" />
          <path d="M670 280 L670 175 Q700 145 730 175 L730 280 Z" fill="rgba(255, 220, 150, 0.5)" />
        </motion.g>
      </svg>
    </div>
  );
}

export default function MosqueTheme({ children }: MosqueThemeProps) {
  const stars = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({ seed: i * 5 }));
  }, []);

  const lanterns = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({ seed: i * 11 }));
  }, []);

  const clouds = useMemo(() => [
    { top: 8, left: -10, scale: 0.8, delay: 0 },
    { top: 15, left: 20, scale: 1, delay: 10 },
    { top: 5, left: 50, scale: 0.6, delay: 20 },
  ], []);

  const birds = useMemo(() => [
    { delay: 2 },
    { delay: 8 },
    { delay: 18 },
  ], []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Sunset/Dusk gradient sky */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            #1a0a05 0%,
            #2d1810 8%,
            #4a2015 15%,
            #6b2a18 22%,
            #8b3520 28%,
            #b54525 35%,
            #d46030 42%,
            #e88040 50%,
            #f0a050 58%,
            #f5c070 65%,
            #f8d090 75%,
            #fbe0b0 85%,
            #fff0d0 95%,
            #fff8e8 100%
          )`,
        }}
      />

      {/* Sun glow near horizon */}
      <motion.div
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div
          className="w-[400px] h-[200px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(255, 200, 100, 0.8) 0%, rgba(255, 150, 50, 0.4) 30%, transparent 70%)',
            willChange: 'transform, opacity'
          }}
        />
      </motion.div>

      {/* Stars in dark part of sky */}
      {stars.map((star, i) => (
        <EveningStar key={i} {...star} />
      ))}

      {/* Floating clouds */}
      {clouds.map((cloud, i) => (
        <Cloud key={i} {...cloud} />
      ))}

      {/* Flying birds */}
      {birds.map((bird, i) => (
        <FlyingBirds key={i} {...bird} />
      ))}

      {/* Floating lanterns */}
      {lanterns.map((lantern, i) => (
        <FloatingLantern key={i} {...lantern} />
      ))}

      {/* Mosque silhouette */}
      <MosqueSilhouette />

      {/* Gradient overlay at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(10, 5, 2, 0.9) 0%, transparent 100%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(26, 10, 5, 0.5) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
