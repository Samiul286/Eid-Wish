'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Music, Music2, Home, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEFAULT_MESSAGE, incrementViewCount, generateWishId, musicOptions, MusicId, DEFAULT_MUSIC } from '@/types/wish';
import MosqueTheme from './ThemeBackgrounds/MosqueTheme';

import Link from 'next/link';

interface MosqueGreetingProps {
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

// Islamic Arch Ornament
function IslamicArch({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.8, delay }}
      style={{ transformOrigin: 'top', willChange: 'transform, opacity' }}
    >
      <svg width="200" height="40" viewBox="0 0 200 40">
        <path
          d="M0 40 L0 20 Q100 -20 200 20 L200 40 Z"
          fill="none"
          stroke="rgba(218, 165, 32, 0.6)"
          strokeWidth="2"
        />
        <circle cx="100" cy="15" r="4" fill="rgba(218, 165, 32, 0.8)" />
      </svg>
    </motion.div>
  );
}

// Decorative Divider
function GoldenDivider({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="flex items-center justify-center gap-3 my-4"
      style={{ willChange: 'transform, opacity' }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-amber-400/60 to-amber-400" />
      <div className="w-3 h-3 rotate-45 border-2 border-amber-400/70" />
      <div className="w-2 h-2 rounded-full bg-amber-400/80" />
      <div className="w-3 h-3 rotate-45 border-2 border-amber-400/70" />
      <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent via-amber-400/60 to-amber-400" />
    </motion.div>
  );
}

// Floating lantern for entrance
function EntranceLantern({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: '20%', willChange: 'transform, opacity' }}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [50, 0, -50, -100],
        scale: [0.5, 1, 0.8, 0.5],
      }}
      transition={{
        duration: 4,
        delay,
        ease: 'easeOut',
      }}
    >
      <svg width="40" height="56" viewBox="0 0 40 56">
        <defs>
          <radialGradient id={`entranceLantern${delay}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#ff8c00" />
          </radialGradient>
        </defs>
        <ellipse cx="20" cy="28" rx="14" ry="18" fill={`url(#entranceLantern${delay})`} opacity="0.9" />
        <ellipse cx="20" cy="28" rx="8" ry="12" fill="white" opacity="0.3" />
      </svg>
    </motion.div>
  );
}

// Word reveal animation
function WordReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ');
  
  return (
    <div className={`flex flex-wrap justify-center gap-x-3 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 30, rotateX: -45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ transformOrigin: 'center bottom', willChange: 'transform, opacity' }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

// Letter cascade animation
function LetterCascade({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const letters = text.split('');
  
  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: -50, scale: 1.5 }}
          style={{ willChange: 'transform, opacity' }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.05,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
}

// Sun/Moon icon animation
function SunMoonIcon() {
  return (
    <motion.div
      className="relative"
      style={{ willChange: 'transform, opacity' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
    >
      <Sun className="w-10 h-10 text-amber-300" />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-3 bg-amber-300/60 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 45}deg) translateY(-20px)`,
              transformOrigin: 'center',
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function MosqueGreeting({ receiverName, senderName, message, music }: MosqueGreetingProps) {
  const [phase, setPhase] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const selectedMusic = music || DEFAULT_MUSIC;
  const musicFile = musicOptions[selectedMusic].file;

  const [viewCount] = useState(() => {
    const wishId = generateWishId(receiverName, senderName);
    return getAndIncrementViewCount(wishId);
  });

  const entranceLanterns = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      delay: i * 0.2,
      x: seededRandom(i * 11) * 80 + 10,
    }));
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => setShowContent(true), 4500),
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
    <MosqueTheme>
      <audio ref={audioRef} loop preload="auto">
        <source src={musicFile} type="audio/mpeg" />
      </audio>

      {/* Music toggle */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMusic}
          className="bg-amber-500/20 backdrop-blur-md border-amber-400/30 hover:bg-amber-500/30 rounded-full"
        >
          {isPlaying ? (
            <Music2 className="w-5 h-5 text-amber-300" />
          ) : (
            <Music className="w-5 h-5 text-amber-300/50" />
          )}
        </Button>
      </motion.div>

      {/* Home button */}
      <motion.div
        className="fixed top-4 left-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
      >
        <Link href="/">
          <Button
            variant="outline"
            size="icon"
            className="bg-amber-500/20 backdrop-blur-md border-amber-400/30 hover:bg-amber-500/30 rounded-full"
          >
            <Home className="w-5 h-5 text-amber-300" />
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
            {/* Floating lanterns */}
            {phase >= 1 && entranceLanterns.map((lantern, i) => (
              <EntranceLantern key={i} {...lantern} />
            ))}

            <div className="text-center px-4">
              {/* Islamic arch */}
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="mb-4"
                >
                  <SunMoonIcon />
                </motion.div>
              )}

              {/* Arabic greeting */}
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 
                    className="text-5xl md:text-7xl font-bold text-amber-300 mb-2"
                    style={{
                      textShadow: '0 0 40px rgba(255, 191, 0, 0.5), 0 2px 10px rgba(0,0,0,0.3)',
                    }}
                  >
                    عيد مبارك
                  </h1>
                  <p className="text-lg md:text-xl text-amber-100/70 tracking-[0.4em]">EID MUBARAK</p>
                </motion.div>
              )}

              {/* Arch ornament */}
              {phase >= 2 && (
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <IslamicArch delay={0} />
                </motion.div>
              )}

              {/* Message */}
              {phase >= 3 && (
                <motion.p
                  className="text-lg md:text-xl text-white/80 mt-6 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  A blessed message arrives at sunset...
                </motion.p>
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
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Scroll/Card Design */}
              <div className="relative">
                {/* Decorative top arch */}
                <motion.div
                  className="absolute -top-8 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <svg width="120" height="30" viewBox="0 0 120 30">
                    <path
                      d="M10 30 Q60 -15 110 30"
                      fill="none"
                      stroke="rgba(218, 165, 32, 0.5)"
                      strokeWidth="2"
                    />
                    <circle cx="60" cy="10" r="5" fill="rgba(218, 165, 32, 0.7)" />
                  </svg>
                </motion.div>

                {/* Main card */}
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(45, 24, 16, 0.95) 0%, rgba(74, 32, 21, 0.9) 50%, rgba(45, 24, 16, 0.95) 100%)',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(218, 165, 32, 0.1)',
                  }}
                >
                  {/* Gold border */}
                  <div 
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      border: '1px solid rgba(218, 165, 32, 0.3)',
                      boxShadow: 'inset 0 0 40px rgba(218, 165, 32, 0.05)',
                    }}
                  />

                  {/* Top decorative bar */}
                  <div className="h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

                  {/* Content */}
                  <div className="p-5 sm:p-8 md:p-10">
                    {/* Arabic greeting */}
                    <motion.div
                      className="text-center mb-3"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-300"
                        style={{ textShadow: '0 0 30px rgba(255, 191, 0, 0.4)' }}
                      >
                        عيد مبارك
                      </h2>
                    </motion.div>

                    <IslamicArch delay={0.3} />

                    <motion.p
                      className="text-center text-amber-200/60 tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      EID MUBARAK
                    </motion.p>

                    {/* Receiver name */}
                    <motion.div
                      className="text-center my-5 sm:my-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <p className="text-amber-200/50 text-xs sm:text-sm tracking-wider mb-3">DEAR BELOVED</p>
                      <LetterCascade
                        text={receiverName}
                        delay={0.8}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                      />
                    </motion.div>

                    <GoldenDivider delay={1.2} />

                    {/* Message */}
                    <motion.div
                      className="my-5 sm:my-8 px-2 sm:px-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      <p className="text-base sm:text-lg md:text-xl text-amber-50/90 leading-relaxed text-center font-light italic">
                        &ldquo;{message || DEFAULT_MESSAGE}&rdquo;
                      </p>
                    </motion.div>

                    <GoldenDivider delay={1.6} />

                    {/* Sender */}
                    <motion.div
                      className="text-center mt-5 sm:mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    >
                      <p className="text-amber-200/50 text-xs sm:text-sm tracking-wider mb-2">SENT WITH BLESSINGS FROM</p>
                      <WordReveal
                        text={senderName}
                        delay={2}
                        className="text-xl sm:text-2xl md:text-3xl font-semibold text-amber-300"
                      />
                    </motion.div>

                    {/* Animated sun/moon */}
                    <motion.div
                      className="flex justify-center mt-5 sm:mt-8"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Moon className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300/80" />
                    </motion.div>

                    {/* View counter */}
                    <motion.div
                      className="flex items-center justify-center gap-2 text-amber-100/40 mt-4 sm:mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-xs sm:text-sm">{viewCount} people received this blessing</span>
                    </motion.div>

                  </div>

                  {/* Bottom decorative bar */}
                  <div className="h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                </div>

                {/* Bottom arch decoration */}
                <motion.div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <svg width="80" height="20" viewBox="0 0 80 20">
                    <path
                      d="M5 20 Q40 -10 75 20"
                      fill="none"
                      stroke="rgba(218, 165, 32, 0.4)"
                      strokeWidth="1.5"
                    />
                  </svg>
                </motion.div>
              </div>


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MosqueTheme>
  );
}
