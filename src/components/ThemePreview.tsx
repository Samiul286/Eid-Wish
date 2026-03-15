'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { themes } from '@/types/wish';
import { Check, Sparkles } from 'lucide-react';

interface ThemePreviewProps {
  onSelectTheme?: (themeId: string) => void;
  selectedTheme?: string;
}

// Seeded pseudo-random number generator
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Floating particle for theme cards
function ThemeParticle({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        background: 'rgba(255, 215, 0, 0.6)',
        willChange: 'transform, opacity'
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -40, -80],
        opacity: [0, 1, 0],
        x: [0, seededRandom(delay) * 20 - 10],
      }}
      transition={{
        duration: 3,
        delay: delay * 0.5,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

export default function ThemePreview({ onSelectTheme, selectedTheme }: ThemePreviewProps) {
  const themeList = useMemo(() => Object.values(themes), []);

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            #080508 0%,
            #0c0810 20%,
            #100c18 40%,
            #151020 60%,
            #100c18 80%,
            #080508 100%
          )`,
        }}
      />

      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23d4af37'%3E%3Cpath d='M40 0 L50 30 L80 40 L50 50 L40 80 L30 50 L0 40 L30 30 Z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.05) 0%, transparent 60%)',
          willChange: 'transform, opacity'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative top */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/40" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-6 h-6 text-amber-400" />
            </motion.div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/40" />
          </motion.div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #b8860b 0%, #ffd700 40%, #daa520 60%, #b8860b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Exquisite Themes
            </span>
          </h2>

          <p className="text-white/50 max-w-lg mx-auto text-lg leading-relaxed">
            Choose from 5 beautifully crafted themes to make your Eid greeting truly memorable
          </p>
        </motion.div>

        {/* Theme cards - Horizontal scroll on mobile, grid on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {themeList.map((theme, index) => {
            const isSelected = selectedTheme === theme.id;
            return (
              <motion.div
                key={theme.id}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => onSelectTheme?.(theme.id)}
              >
                {/* Card container */}
                <motion.div
                  className={`relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-500 ${
                    isSelected ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-black/50' : ''
                  }`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Theme background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${theme.previewGradient}`}
                  />

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                      <ThemeParticle key={i} delay={i + index} />
                    ))}
                  </div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Emoji icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-6xl md:text-7xl"
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {theme.emoji}
                    </motion.div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-semibold text-base md:text-lg">{theme.name}</h3>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-black" />
                          </motion.div>
                        )}
                      </div>
                      <p className="text-white/40 text-xs md:text-sm line-clamp-2 leading-relaxed">
                        {theme.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      className="absolute top-3 right-3 px-3 py-1 bg-yellow-400 text-black text-xs font-medium rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      Selected
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-amber-400/50"
            />
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-amber-400/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
