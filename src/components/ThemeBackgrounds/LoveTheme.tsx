'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface LoveThemeProps {
  children?: React.ReactNode;
}

// Seeded pseudo-random number generator for consistent SSR/CSR
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Rose Petal Component - More realistic petal shape
function RosePetal({ seed }: { seed: number }) {
  const left = seededRandom(seed * 3) * 100;
  const size = seededRandom(seed * 3 + 1) * 25 + 20;
  const duration = seededRandom(seed * 3 + 2) * 12 + 15;
  const delay = seededRandom(seed * 3 + 3) * 8;
  const rotationStart = seededRandom(seed * 3 + 4) * 360;
  const rotationEnd = seededRandom(seed * 3 + 5) * 720 - 360;
  const swayAmount = seededRandom(seed * 3 + 6) * 60 + 30;
  const colorVariant = Math.floor(seededRandom(seed * 3 + 7) * 4);
  
  const petalColors = [
    'rgba(255, 182, 193, 0.7)',   // Light pink
    'rgba(255, 105, 140, 0.6)',   // Hot pink
    'rgba(219, 112, 147, 0.65)',  // Medium pink
    'rgba(255, 160, 180, 0.55)',  // Soft rose
  ];
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: -50,
        width: size,
        height: size * 1.3,
      }}
      initial={{ 
        y: 0, 
        rotate: rotationStart, 
        opacity: 0,
        scale: 0.8 
      }}
      animate={{
        y: '120vh',
        rotate: rotationEnd,
        opacity: [0, 0.9, 0.8, 0.7, 0],
        scale: [0.8, 1, 0.95, 0.85],
        x: [0, swayAmount, -swayAmount * 0.5, swayAmount * 0.3, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg 
        viewBox="0 0 30 40" 
        fill={petalColors[colorVariant]}
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      >
        <path d="M15 0 C5 8 0 20 0 28 C0 36 7 40 15 40 C23 40 30 36 30 28 C30 20 25 8 15 0 Z" />
      </svg>
    </motion.div>
  );
}

// Glowing Orb Component
function GlowingOrb({ seed, index }: { seed: number; index: number }) {
  const top = seededRandom(seed * 4 + index * 10) * 80 + 10;
  const left = seededRandom(seed * 4 + index * 10 + 1) * 80 + 10;
  const size = seededRandom(seed * 4 + index * 10 + 2) * 100 + 80;
  const hue = seededRandom(seed * 4 + index * 10 + 3) * 40 + 320; // Pink to magenta range
  
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, hsla(${hue}, 80%, 70%, 0.25) 0%, hsla(${hue}, 80%, 60%, 0.1) 40%, transparent 70%)`,
        filter: 'blur(20px)',
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: seededRandom(seed * 4 + index * 10 + 4) * 5 + 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.5,
      }}
    />
  );
}

// Sparkle Component
function Sparkle({ seed }: { seed: number }) {
  const top = seededRandom(seed * 5) * 100;
  const left = seededRandom(seed * 5 + 1) * 100;
  const size = seededRandom(seed * 5 + 2) * 4 + 2;
  const duration = seededRandom(seed * 5 + 3) * 2 + 2;
  const delay = seededRandom(seed * 5 + 4) * 3;
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.8, 0],
        scale: [0, 1, 0.8, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg viewBox="0 0 24 24" fill="rgba(255, 215, 0, 0.9)">
        <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
      </svg>
    </motion.div>
  );
}

// Floating Heart Component - New elegant style
function FloatingHeart({ seed }: { seed: number }) {
  const left = seededRandom(seed * 6) * 100;
  const size = seededRandom(seed * 6 + 1) * 15 + 10;
  const duration = seededRandom(seed * 6 + 2) * 8 + 12;
  const delay = seededRandom(seed * 6 + 3) * 5;
  const opacity = seededRandom(seed * 6 + 4) * 0.3 + 0.4;
  const hue = seededRandom(seed * 6 + 5) * 30 + 340; // Pink variations
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        bottom: -50,
        width: size,
        height: size,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: '-110vh',
        opacity: [0, opacity, opacity, 0],
        x: [0, 30, -20, 15, 0],
        rotate: [-15, 15, -10, 10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill={`hsla(${hue}, 90%, 65%, 0.7)`}
        style={{ filter: 'drop-shadow(0 2px 6px rgba(255, 100, 150, 0.3))' }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.div>
  );
}

// Silk Ribbon Component
function SilkRibbon({ index }: { index: number }) {
  const top = index * 25 + 10;
  const hue = 330 + index * 15;
  
  return (
    <motion.div
      className="absolute pointer-events-none w-full"
      style={{
        top: `${top}%`,
        height: 2,
        background: `linear-gradient(90deg, transparent 0%, hsla(${hue}, 70%, 70%, 0.3) 20%, hsla(${hue}, 70%, 80%, 0.5) 50%, hsla(${hue}, 70%, 70%, 0.3) 80%, transparent 100%)`,
        filter: 'blur(1px)',
      }}
      animate={{
        x: ['-50%', '50%', '-50%'],
        scaleX: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 8 + index * 2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.8,
      }}
    />
  );
}

export default function LoveTheme({ children }: LoveThemeProps) {
  const petals = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({ seed: i * 17 }));
  }, []);
  
  const orbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({ seed: i * 23, index: i }));
  }, []);
  
  const sparkles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({ seed: i * 31 }));
  }, []);
  
  const hearts = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({ seed: i * 37 }));
  }, []);
  
  const ribbons = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({ index: i }));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dreamy twilight gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            #1a0a14 0%,
            #2d1f3d 15%,
            #4a2545 30%,
            #6b2d5c 45%,
            #8b3a62 55%,
            #a84a6b 65%,
            #c85a7a 75%,
            #e8788a 85%,
            #f4a0a8 95%,
            #fad4d8 100%
          )`,
        }}
      />
      
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 25 L55 45 L75 50 L55 55 L50 75 L45 55 L25 50 L45 45 Z' fill='%23ffffff' fill-opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Glowing orbs - ambient light */}
      {orbs.map((orb, i) => (
        <GlowingOrb key={`orb-${i}`} {...orb} />
      ))}
      
      {/* Silk ribbon waves */}
      {ribbons.map((ribbon, i) => (
        <SilkRibbon key={`ribbon-${i}`} {...ribbon} />
      ))}
      
      {/* Floating hearts */}
      {hearts.map((heart, i) => (
        <FloatingHeart key={`heart-${i}`} {...heart} />
      ))}
      
      {/* Rose petals */}
      {petals.map((petal, i) => (
        <RosePetal key={`petal-${i}`} {...petal} />
      ))}
      
      {/* Sparkles */}
      {sparkles.map((sparkle, i) => (
        <Sparkle key={`sparkle-${i}`} {...sparkle} />
      ))}
      
      {/* Central romantic glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(ellipse at center, rgba(255, 150, 180, 0.2) 0%, rgba(200, 100, 150, 0.1) 30%, transparent 60%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Top and bottom gradient fades */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(26, 10, 20, 0.8) 0%, transparent 100%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(250, 212, 216, 0.6) 0%, transparent 100%)',
        }}
      />
      
      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(26, 10, 20, 0.4) 100%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
