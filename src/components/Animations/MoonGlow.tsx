'use client';

import { motion } from 'framer-motion';

interface MoonGlowProps {
  size?: number;
  className?: string;
}

export default function MoonGlow({ size = 120, className = '' }: MoonGlowProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 2,
          height: size * 2,
          left: -size / 2,
          top: -size / 2,
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Middle glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          left: -size / 4,
          top: -size / 4,
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Moon crescent */}
      <motion.div
        className="relative"
        style={{
          width: size,
          height: size,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <svg
          viewBox="0 0 100 100"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffacd" />
              <stop offset="50%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#daa520" />
            </linearGradient>
            <filter id="moonGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d="M 50 10 A 40 40 0 1 1 50 90 A 30 30 0 1 0 50 10"
            fill="url(#moonGradient)"
            filter="url(#moonGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
