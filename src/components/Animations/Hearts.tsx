'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface HeartProps {
  delay: number;
  x: number;
  size: number;
  duration: number;
}

function Heart({ delay, x, size, duration }: HeartProps) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, bottom: -50 }}
      initial={{ y: 0, opacity: 0, scale: 0.5 }}
      animate={{
        y: '-100vh',
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 1, 0.8],
        x: [0, 20, -20, 10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#ff69b4">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.div>
  );
}

// Seeded pseudo-random number generator for consistent SSR/CSR
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export default function Hearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      delay: i * 0.5,
      x: seededRandom(i * 7) * 100,
      size: seededRandom(i * 7 + 1) * 20 + 15,
      duration: seededRandom(i * 7 + 2) * 5 + 8,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart, index) => (
        <Heart key={index} {...heart} />
      ))}
    </div>
  );
}
