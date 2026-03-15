'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  distance: number;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
  color: string;
}

const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#ff0088'];

export default function Fireworks() {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    const createFirework = () => {
      const x = Math.random() * 80 + 10;
      const y = Math.random() * 40 + 10;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const particles: Particle[] = [];

      for (let i = 0; i < 12; i++) {
        particles.push({
          id: i,
          x,
          y,
          color: i % 3 === 0 ? colors[Math.floor(Math.random() * colors.length)] : color,
          angle: (i / 20) * 360,
          distance: Math.random() * 50 + 30,
        });
      }

      const newFirework: Firework = {
        id: Date.now(),
        x,
        y,
        particles,
        color,
      };

      setFireworks((prev) => [...prev, newFirework]);

      setTimeout(() => {
        setFireworks((prev) => prev.filter((f) => f.id !== newFirework.id));
      }, 2000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        createFirework();
      }
    }, 1500);

    // Create initial fireworks
    setTimeout(createFirework, 500);
    setTimeout(createFirework, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {fireworks.map((firework) => (
          <div key={firework.id} className="absolute" style={{ left: `${firework.x}%`, top: `${firework.y}%` }}>
            {firework.particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: particle.color, willChange: 'transform, opacity' }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
                  y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1.5,
                  ease: 'easeOut',
                }}
              />
            ))}
            {/* Center flash */}
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-white"
              style={{ left: -8, top: -8, willChange: 'transform, opacity' }}
              initial={{ opacity: 1, scale: 2 }}
              animate={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
