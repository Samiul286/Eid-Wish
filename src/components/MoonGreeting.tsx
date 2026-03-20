'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Music, Music2, Home, Moon, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEFAULT_MESSAGE, incrementViewCount, generateWishId, musicOptions, MusicId, DEFAULT_MUSIC } from '@/types/wish';
import MoonTheme from './ThemeBackgrounds/MoonTheme';

import Link from 'next/link';
import { useDeviceCapabilities, useReducedMotion } from '@/hooks/use-reduced-motion';

interface MoonGreetingProps {
  receiverName: string;
  senderName: string;
  message: string;
  music?: MusicId;
}

// Seeded pseudo-random number generator
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// View count cache
const viewCountCache = new Map<string, number>();
function getAndIncrementViewCount(wishId: string): number {
  if (viewCountCache.has(wishId)) {
    return viewCountCache.get(wishId)!;
  }
  const count = incrementViewCount(wishId);
  viewCountCache.set(wishId, count);
  return count;
}

// Animated Arabic-style ornament
function OrnamentLine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="flex items-center justify-center gap-3"
      style={{ willChange: 'transform, opacity' }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1, delay }}
    >
      <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-yellow-400/50 to-yellow-400" />
      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      <div className="w-2 h-2 rotate-45 border border-yellow-400/70" />
      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-yellow-400/50 to-yellow-400" />
    </motion.div>
  );
}

// Floating moon for entrance
function FloatingMoon({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${seededRandom(delay * 7) * 80 + 10}%`, top: '10%', willChange: 'transform, opacity' }}
      initial={{ opacity: 0, y: -100, scale: 0.3 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: [0, 200, 400],
        scale: [0.5, 1, 0.8],
        x: [0, 30, -20],
      }}
      transition={{
        duration: 4,
        delay,
        ease: 'easeOut',
      }}
    >
      <Moon className="w-16 h-16 text-yellow-400 fill-yellow-400/30" />
    </motion.div>
  );
}

// Glowing text reveal
function GlowingReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ');
  
  return (
    <div className={`flex flex-wrap justify-center gap-x-2 ${className}`}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-block"
          style={{ willChange: 'transform, opacity' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + wordIndex * 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

// Character by character reveal
function CharReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const chars = text.split('');
  
  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ transformOrigin: 'center bottom', willChange: 'transform, opacity' }}
          initial={{ opacity: 0, y: 30, rotateY: 90 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: 'easeOut',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}

// Decorative Islamic corner
function IslamicCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const positionClasses = {
    tl: 'top-0 left-0 rotate-0',
    tr: 'top-0 right-0 rotate-90',
    bl: 'bottom-0 left-0 -rotate-90',
    br: 'bottom-0 right-0 rotate-180',
  };

  return (
    <motion.div
      className={`absolute w-16 h-16 md:w-20 md:h-20 ${positionClasses[position]}`}
      style={{ willChange: 'transform, opacity' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring' }}
    >
      <svg viewBox="0 0 80 80" className="w-full h-full text-yellow-400/60">
        <path
          d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z"
          fill="currentColor"
        />
        <circle cx="40" cy="40" r="3" fill="currentColor" />
        <path
          d="M15 15 Q 25 15 25 25 Q 25 35 15 35"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}

export default function MoonGreeting({ receiverName, senderName, message, music }: MoonGreetingProps) {
  const [phase, setPhase] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const selectedMusic = music || DEFAULT_MUSIC;
  const musicFile = musicOptions[selectedMusic].file;
  const { isMobile, isLowEnd } = useDeviceCapabilities();
  const prefersReducedMotion = useReducedMotion();

  const [viewCount] = useState(() => {
    const wishId = generateWishId(receiverName, senderName);
    return getAndIncrementViewCount(wishId);
  });

  // Reduce floating moons on mobile
  const floatingMoonCount = prefersReducedMotion ? 0 : (isMobile || isLowEnd) ? 1 : 3;
  const floatingMoons = useMemo(() => {
    return Array.from({ length: floatingMoonCount }, (_, i) => ({ delay: i * 0.3 }));
  }, [floatingMoonCount]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setShowContent(true), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <MoonTheme>
      <audio ref={audioRef} loop preload="auto">
        <source src={musicFile} type="audio/mpeg" />
      </audio>

      {/* Music toggle */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMusic}
          className="bg-yellow-400/10 backdrop-blur-md border-yellow-400/30 hover:bg-yellow-400/20 rounded-full"
        >
          {isPlaying ? (
            <Music2 className="w-5 h-5 text-yellow-400" />
          ) : (
            <Music className="w-5 h-5 text-yellow-400/50" />
          )}
        </Button>
      </motion.div>

      {/* Home button */}
      <motion.div
        className="fixed top-4 left-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        <Link href="/">
          <Button
            variant="outline"
            size="icon"
            className="bg-yellow-400/10 backdrop-blur-md border-yellow-400/30 hover:bg-yellow-400/20 rounded-full"
          >
            <Home className="w-5 h-5 text-yellow-400" />
          </Button>
        </Link>
      </motion.div>

      {/* Entrance Animation */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Floating moons */}
            {phase >= 1 && floatingMoons.map((moon, i) => (
              <FloatingMoon key={i} {...moon} />
            ))}

            {/* Center content */}
            <div className="text-center">
              {/* Moon symbol */}
              {phase >= 1 && (
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 1.5 }}
                >
                  <div className="relative inline-block">
                    <div className="absolute inset-0 blur-xl bg-yellow-400/30 rounded-full" />
                    <Moon className="w-24 h-24 md:w-32 md:h-32 text-yellow-400 fill-yellow-400/20 relative" />
                  </div>
                </motion.div>
              )}

              {/* Eid Mubarak text */}
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-2" style={{
                    textShadow: '0 0 40px rgba(255, 215, 0, 0.5)',
                  }}>
                    عيد مبارك
                  </h1>
                  <p className="text-xl md:text-2xl text-yellow-200/80 tracking-widest">EID MUBARAK</p>
                </motion.div>
              )}

              {/* Someone special message */}
              {phase >= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="mt-6"
                >
                  <OrnamentLine />
                  <p className="text-lg md:text-xl text-white/70 mt-4 font-light">
                    A blessed message awaits you...
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="min-h-screen flex items-start justify-center px-3 sm:px-4 pt-16 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="w-full max-w-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Decorative Card */}
              <div className="relative">
                {/* Islamic corners */}
                <IslamicCorner position="tl" />
                <IslamicCorner position="tr" />
                <IslamicCorner position="bl" />
                <IslamicCorner position="br" />

                {/* Main card */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(13, 27, 42, 0.9) 0%, rgba(26, 35, 126, 0.85) 50%, rgba(13, 27, 42, 0.9) 100%)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 25px 80px -20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 215, 0, 0.1)',
                  }}
                >
                  {/* Gold border glow */}
                  <div className="absolute inset-0 rounded-2xl" style={{
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    boxShadow: 'inset 0 0 30px rgba(255, 215, 0, 0.05)',
                  }} />

                  {/* Top decorative bar */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

                  {/* Content */}
                  <div className="p-5 sm:p-8 md:p-10">
                    {/* Arabic greeting */}
                    <motion.div
                      className="text-center mb-4"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-1"
                        style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}
                      >
                        عيد مبارك
                      </h2>
                      <p className="text-yellow-200/60 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em]">EID MUBARAK</p>
                    </motion.div>

                    <OrnamentLine delay={0.3} />

                    {/* Receiver name */}
                    <motion.div
                      className="text-center my-5 sm:my-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-yellow-200/60 text-xs sm:text-sm mb-2 tracking-wider">DEAR</p>
                      <CharReveal
                        text={receiverName}
                        delay={0.7}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                      />
                    </motion.div>

                    <OrnamentLine delay={1.2} />

                    {/* Message */}
                    <motion.div
                      className="my-5 sm:my-8 px-2 sm:px-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      <div className="relative">
                        <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed text-center font-light">
                          &ldquo;{message || DEFAULT_MESSAGE}&rdquo;
                        </p>
                      </div>
                    </motion.div>

                    <OrnamentLine delay={1.6} />

                    {/* Sender */}
                    <motion.div
                      className="text-center mt-5 sm:mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    >
                      <p className="text-yellow-200/50 text-xs sm:text-sm tracking-wider mb-2">WITH BLESSINGS FROM</p>
                      <motion.div
                        className="flex items-center justify-center gap-2"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 2, type: 'spring' }}
                      >
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-yellow-400">
                          {senderName}
                        </p>
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    </motion.div>

                    {/* Animated moon */}
                    <motion.div
                      className="flex justify-center mt-5 sm:mt-8"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Moon className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400 fill-yellow-400/20" />
                    </motion.div>

                    {/* View counter */}
                    <motion.div
                      className="flex items-center justify-center gap-2 text-white/40 mt-4 sm:mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-xs sm:text-sm">{viewCount} people received this blessing</span>
                    </motion.div>

                  </div>

                  {/* Bottom decorative bar */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                </div>
              </div>


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MoonTheme>
  );
}
