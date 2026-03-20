'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDeviceCapabilities, useReducedMotion } from '@/hooks/use-reduced-motion';

interface FireworksThemeProps {
  children?: React.ReactNode;
}

// Seeded pseudo-random number generator for consistent SSR/CSR
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Sparkle particle
function SparkleParticle({ seed }: { seed: number }) {
  const left = seededRandom(seed * 3) * 100;
  const top = seededRandom(seed * 3 + 1) * 100;
  const size = seededRandom(seed * 3 + 2) * 3 + 1;
  const duration = seededRandom(seed * 3 + 3) * 2 + 1;
  const delay = seededRandom(seed * 3 + 4) * 3;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)`,
        willChange: 'transform, opacity',
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1.5, 0.5],
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

// Firework Burst Component
function FireworkBurst({ seed, index, isMobile }: { seed: number; index: number; isMobile: boolean }) {
  const centerX = seededRandom(seed * 5) * 80 + 10;
  const centerY = seededRandom(seed * 5 + 1) * 50 + 5;
  const hue = seededRandom(seed * 5 + 2) * 360;
  
  // Reduce particles on mobile
  const particleCount = isMobile ? 12 : 24;
  
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      angle: (i / particleCount) * 360,
      distance: seededRandom(seed * 5 + 3 + i) * 30 + 40,
      size: seededRandom(seed * 5 + 4 + i) * 4 + 2,
      delay: seededRandom(seed * 5 + 5 + i) * 0.3,
    }));
  }, [seed, particleCount]);

  const duration = 3;
  const baseDelay = index * 1.5;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${centerX}%`, top: `${centerY}%` }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: duration + 1,
        delay: baseDelay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    >
      {/* Center glow */}
      <motion.div
        className="absolute"
        style={{
          width: 20,
          height: 20,
          left: -10,
          top: -10,
          background: `radial-gradient(circle, hsla(${hue}, 100%, 80%, 0.8) 0%, hsla(${hue}, 100%, 60%, 0.3) 40%, transparent 70%)`,
          filter: 'blur(4px)',
          willChange: 'transform, opacity',
        }}
        animate={{
          scale: [0.5, 2, 1],
          opacity: [1, 0.5, 0],
        }}
        transition={{
          duration: 0.5,
          delay: baseDelay,
          repeat: Infinity,
        }}
      />
      
      {/* Particle trails */}
      {particles.map((particle, i) => {
        const rad = (particle.angle * Math.PI) / 180;
        const x = Math.cos(rad) * particle.distance;
        const y = Math.sin(rad) * particle.distance;
        
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: particle.size,
              height: particle.size * 2,
              background: `linear-gradient(to bottom, hsla(${hue + seededRandom(i) * 30}, 100%, 70%, 1), hsla(${hue}, 100%, 50%, 0.5), transparent)`,
              borderRadius: '50%',
              filter: 'blur(0.5px)',
              willChange: 'transform, opacity',
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: [0, x * 0.3, x],
              y: [0, y * 0.3, y],
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration,
              delay: baseDelay + particle.delay * 0.1,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        );
      })}
      
      {/* Sparkle remnants */}
      {particles.slice(0, 8).map((particle, i) => {
        const rad = (particle.angle * Math.PI) / 180;
        const x = Math.cos(rad) * particle.distance * 1.3;
        const y = Math.sin(rad) * particle.distance * 1.3;
        
        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `hsla(${hue}, 100%, 80%, 0.8)`,
              boxShadow: `0 0 4px hsla(${hue}, 100%, 70%, 0.8)`,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [0, x],
              y: [0, y],
              opacity: [0, 0, 1, 0],
            }}
            transition={{
              duration: duration + 0.5,
              delay: baseDelay + 0.3,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </motion.div>
  );
}

// Rising Rocket Component
function RisingRocket({ seed, index }: { seed: number; index: number }) {
  const left = seededRandom(seed * 4) * 80 + 10;
  const duration = seededRandom(seed * 4 + 1) * 2 + 3;
  const delay = index * 2.5;
  const hue = seededRandom(seed * 4 + 2) * 360;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${left}%`, bottom: 0, willChange: 'transform, opacity' }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -400, -500],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    >
      {/* Rocket trail */}
      <motion.div
        className="absolute"
        style={{
          width: 4,
          height: 60,
          left: -2,
          bottom: 0,
          background: `linear-gradient(to top, transparent, hsla(${hue}, 100%, 70%, 0.6), hsla(${hue}, 100%, 80%, 0.8))`,
          filter: 'blur(2px)',
          willChange: 'transform',
        }}
        animate={{
          scaleY: [0.5, 1, 0.8],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
        }}
      />
      
      {/* Rocket head */}
      <div
        className="w-3 h-3 rounded-full"
        style={{
          background: `hsla(${hue}, 100%, 90%, 1)`,
          boxShadow: `0 0 10px hsla(${hue}, 100%, 70%, 1)`,
        }}
      />
    </motion.div>
  );
}

// Glowing Orb
function GlowingOrb({ seed }: { seed: number }) {
  const top = seededRandom(seed * 3) * 60 + 20;
  const left = seededRandom(seed * 3 + 1) * 60 + 20;
  const size = seededRandom(seed * 3 + 2) * 150 + 100;
  const hue = seededRandom(seed * 3 + 3) * 60 + 280; // Purple to magenta range

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, hsla(${hue}, 80%, 50%, 0.15) 0%, hsla(${hue}, 70%, 40%, 0.05) 50%, transparent 70%)`,
        filter: 'blur(30px)',
        willChange: 'transform, opacity',
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: seededRandom(seed * 3 + 4) * 5 + 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Falling Streamer
function FallingStreamer({ seed }: { seed: number }) {
  const left = seededRandom(seed * 4) * 100;
  const hue = seededRandom(seed * 4 + 1) * 360;
  const duration = seededRandom(seed * 4 + 2) * 4 + 6;
  const delay = seededRandom(seed * 4 + 3) * 5;
  const width = seededRandom(seed * 4 + 4) * 4 + 2;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: -20,
        width: width,
        height: 30,
        background: `linear-gradient(180deg, transparent, hsla(${hue}, 100%, 60%, 0.8), hsla(${hue}, 100%, 70%, 0.4), transparent)`,
        borderRadius: 2,
        willChange: 'transform',
      }}
      initial={{ y: 0, rotate: 0 }}
      animate={{
        y: '110vh',
        rotate: [0, 180, 360, 540],
        x: [0, 30, -20, 10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

export default function FireworksTheme({ children }: FireworksThemeProps) {
  const { isMobile, isLowEnd } = useDeviceCapabilities();
  const prefersReducedMotion = useReducedMotion();

  // Reduce particle counts on mobile and low-end devices
  const sparkleCount = prefersReducedMotion ? 0 : (isMobile || isLowEnd) ? 20 : 60;
  const fireworkBurstCount = prefersReducedMotion ? 0 : (isMobile || isLowEnd) ? 3 : 8;
  const rocketCount = prefersReducedMotion ? 0 : (isMobile || isLowEnd) ? 2 : 5;
  const orbCount = prefersReducedMotion ? 0 : (isMobile || isLowEnd) ? 2 : 4;
  const streamerCount = prefersReducedMotion ? 0 : (isMobile || isLowEnd) ? 5 : 15;

  const sparkles = useMemo(() => {
    return Array.from({ length: sparkleCount }, (_, i) => ({ seed: i * 7 }));
  }, [sparkleCount]);

  const fireworkBursts = useMemo(() => {
    return Array.from({ length: fireworkBurstCount }, (_, i) => ({ seed: i * 17, index: i }));
  }, [fireworkBurstCount]);

  const rockets = useMemo(() => {
    return Array.from({ length: rocketCount }, (_, i) => ({ seed: i * 23, index: i }));
  }, [rocketCount]);

  const orbs = useMemo(() => {
    return Array.from({ length: orbCount }, (_, i) => ({ seed: i * 31 }));
  }, [orbCount]);

  const streamers = useMemo(() => {
    return Array.from({ length: streamerCount }, (_, i) => ({ seed: i * 11 }));
  }, [streamerCount]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Deep night sky with purple tint */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            #050510 0%,
            #0a0a1f 10%,
            #101030 20%,
            #1a1a40 35%,
            #252560 50%,
            #2a2a55 65%,
            #202045 80%,
            #151530 90%,
            #0a0a1f 100%
          )`,
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Glowing orbs */}
      {orbs.map((orb, i) => (
        <GlowingOrb key={i} {...orb} />
      ))}

      {/* Sparkle particles */}
      {sparkles.map((sparkle, i) => (
        <SparkleParticle key={i} {...sparkle} />
      ))}

      {/* Rising rockets */}
      {rockets.map((rocket, i) => (
        <RisingRocket key={i} {...rocket} />
      ))}

      {/* Firework bursts */}
      {fireworkBursts.map((burst, i) => (
        <FireworkBurst key={i} {...burst} isMobile={isMobile || isLowEnd} />
      ))}

      {/* Falling streamers */}
      {streamers.map((streamer, i) => (
        <FallingStreamer key={i} {...streamer} />
      ))}

      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(5, 5, 16, 0.8) 0%, transparent 100%)',
        }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(10, 10, 31, 0.9) 0%, transparent 100%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5, 5, 16, 0.6) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
