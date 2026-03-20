'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { themes } from '@/types/wish';
import { Check, Sparkles, ChevronRight } from 'lucide-react';

interface ThemePreviewProps {
  onSelectTheme?: (themeId: string) => void;
  selectedTheme?: string;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function ThemeParticle({ seed, color }: { seed: number; color: string }) {
  const left = seededRandom(seed) * 80 + 10;
  const duration = seededRandom(seed + 1) * 2 + 2;
  const delay = seededRandom(seed + 2) * 2;

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        left: `${left}%`,
        bottom: '10%',
        background: color,
        willChange: 'transform, opacity',
      }}
      animate={{
        y: [0, -60, -90],
        opacity: [0, 0.9, 0],
        x: [0, seededRandom(seed + 3) * 20 - 10],
        scale: [1, 1.5, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

export default function ThemePreview({ onSelectTheme, selectedTheme }: ThemePreviewProps) {
  const themeList = useMemo(() => Object.values(themes), []);

  return (
    <section className="relative py-24 sm:py-32 px-4 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #030712 0%, #0a0f1e 40%, #080d1a 60%, #030712 100%)',
        }}
      />

      {/* Section dividers */}
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="section-divider absolute bottom-0 left-0 right-0" />

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-emerald mb-6 text-emerald-300 text-xs sm:text-sm font-semibold tracking-widest uppercase"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>
            Pick Your Vibe
          </motion.div>

          <h2
            className="font-bold text-white leading-tight mb-5"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontFamily: 'var(--font-playfair), Georgia, serif',
            }}
          >
            Exquisite{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #10b981, #06b6d4, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Themes
            </span>
          </h2>

          <p className="text-white/45 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Five beautifully crafted animated themes — each one designed to make your Eid greeting truly unforgettable.
          </p>
        </motion.div>

        {/* Theme Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {themeList.map((theme, index) => {
            const isSelected = selectedTheme === theme.id;
            return (
              <motion.div
                key={theme.id}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => onSelectTheme?.(theme.id)}
              >
                <motion.div
                  className={`relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-400 ${
                    isSelected
                      ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-black/60'
                      : 'ring-1 ring-white/8'
                  }`}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                >
                  {/* Theme gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.previewGradient}`} />

                  {/* Particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(4)].map((_, i) => (
                      <ThemeParticle key={i} seed={i * (index + 1) * 3} color="rgba(255,255,255,0.7)" />
                    ))}
                  </div>

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Shimmer on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)',
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Emoji */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-5xl sm:text-6xl"
                      whileHover={{ scale: 1.2, rotate: [-5, 5, -5, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {theme.emoji}
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="text-white font-bold text-sm sm:text-base leading-tight">{theme.name}</h3>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center shrink-0"
                        >
                          <Check className="w-3 h-3 text-black" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-white/45 text-xs line-clamp-2 leading-relaxed hidden sm:block">
                      {theme.description}
                    </p>
                  </div>

                  {/* Selected badge */}
                  {isSelected && (
                    <motion.div
                      className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-emerald-400 text-black text-xs font-bold rounded-full"
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                    >
                      ✓ Chosen
                    </motion.div>
                  )}

                  {/* Hover CTA */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(0,0,0,0.2)' }}
                  >
                    {!isSelected && (
                      <div className="flex items-center gap-1.5 px-4 py-2 rounded-full glass text-white text-sm font-semibold">
                        Use This
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Divider decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-14"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-400/50"
            />
            <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent via-emerald-500/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
