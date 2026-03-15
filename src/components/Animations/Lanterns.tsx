'use client';

import { motion } from 'framer-motion';

interface LanternProps {
  delay: number;
  x: number;
  size: number;
  color: string;
}

function Lantern({ delay, x, size, color }: LanternProps) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: '10%' }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, 20, 0, -20, 0],
        opacity: [0, 1, 1, 1, 0],
        x: [0, 10, 0, -10, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width={size} height={size * 1.5} viewBox="0 0 40 60">
        <defs>
          <radialGradient id={`lanternGlow${delay}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </radialGradient>
          <filter id={`lanternBlur${delay}`}>
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        
        {/* String */}
        <line x1="20" y1="0" x2="20" y2="10" stroke="#8B4513" strokeWidth="1" />
        
        {/* Lantern body */}
        <ellipse
          cx="20"
          cy="35"
          rx="15"
          ry="20"
          fill={`url(#lanternGlow${delay})`}
          filter={`url(#lanternBlur${delay})`}
        />
        
        {/* Lantern top */}
        <rect x="15" y="12" width="10" height="5" fill="#8B4513" rx="1" />
        
        {/* Lantern bottom */}
        <rect x="15" y="52" width="10" height="4" fill="#8B4513" rx="1" />
        
        {/* Inner glow */}
        <ellipse
          cx="20"
          cy="35"
          rx="10"
          ry="15"
          fill="#fff"
          opacity="0.3"
        />
      </svg>
      
      {/* Glow effect */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.8,
          height: size * 0.8,
          left: size * 0.1,
          top: size * 0.3,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: 'blur(10px)',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}

export default function Lanterns() {
  const lanterns = [
    { delay: 0, x: 10, size: 40, color: '#ff6600' },
    { delay: 1, x: 25, size: 35, color: '#ff9900' },
    { delay: 2, x: 40, size: 45, color: '#ffcc00' },
    { delay: 3, x: 55, size: 38, color: '#ff6600' },
    { delay: 4, x: 70, size: 42, color: '#ff9900' },
    { delay: 5, x: 85, size: 36, color: '#ffcc00' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lanterns.map((lantern, index) => (
        <Lantern key={index} {...lantern} />
      ))}
    </div>
  );
}
