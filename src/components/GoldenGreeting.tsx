'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Music, Music2, Home, Crown, Gem, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEFAULT_MESSAGE, incrementViewCount, generateWishId } from '@/types/wish';
import GoldenTheme from './ThemeBackgrounds/GoldenTheme';
import Link from 'next/link';
import { useDeviceCapabilities, useReducedMotion } from '@/hooks/use-reduced-motion';

interface GoldenGreetingProps {
  receiverName: string;
  senderName: string;
  message: string;
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

// Royal Ornament Divider
function RoyalOrnament({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="flex items-center justify-center gap-2 sm:gap-3 my-4 sm:my-6"
      style={{ willChange: 'transform, opacity' }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1, delay }}
    >
      <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-amber-400/80 to-amber-400" />
      <motion.div
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400/50" />
      </motion.div>
      <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-yellow-500/80" />
      <motion.div
        animate={{ rotate: [360, 180, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400/50" />
      </motion.div>
      <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent via-amber-400/80 to-amber-400" />
    </motion.div>
  );
}

// Elegant monogram frame
function MonogramFrame({ letter, delay = 0 }: { letter: string; delay?: number }) {
  return (
    <motion.div
      className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, type: 'spring', duration: 1.5 }}
    >
      <div className="absolute inset-0 rounded-full border-2 border-amber-400/30" />
      <div className="absolute inset-1 rounded-full border border-amber-400/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent rounded-full" />
      <span className="text-3xl sm:text-4xl font-serif font-bold bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-lg">
        {letter}
      </span>
    </motion.div>
  );
}

// Luxury text reveal
function LuxuryReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ');
  return (
    <div className={`flex flex-wrap justify-center gap-x-2 sm:gap-x-3 gap-y-2 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 bg-clip-text text-transparent drop-shadow-sm pb-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ willChange: 'transform, opacity' }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

// Gold shimmer text with glowing effect
function GoldShimmerText({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1 }}
    >
      <div
        className="relative z-10"
        style={{
          background: 'linear-gradient(to right, #FDE68A 0%, #D97706 50%, #FDE68A 100%)',
          backgroundSize: '200% auto',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shine 4s linear infinite',
        }}
      >
        {children}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}} />
    </motion.div>
  );
}

// Floating diamond decoration (simplified for mobile)
function FloatingDiamond({ x, y, delay, scale = 1 }: { x: number; y: number; delay: number; scale?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, willChange: 'transform, opacity', transform: `scale(${scale})` }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 45, 0],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500/50" />
    </motion.div>
  );
}

export default function GoldenGreeting({ receiverName, senderName, message }: GoldenGreetingProps) {
  const [phase, setPhase] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isMobile, isLowEnd } = useDeviceCapabilities();
  const prefersReducedMotion = useReducedMotion();

  const [viewCount] = useState(() => {
    const wishId = generateWishId(receiverName, senderName);
    return getAndIncrementViewCount(wishId);
  });

  const decorationCount = prefersReducedMotion ? 0 : (isMobile || isLowEnd) ? 3 : 6;
  const floatingDiamonds = useMemo(() => {
    return Array.from({ length: decorationCount }, (_, i) => ({
      x: seededRandom(i * 7) * 90 + 5,
      y: seededRandom(i * 7 + 1) * 70 + 10,
      delay: seededRandom(i * 7 + 2) * 2,
      scale: 0.5 + seededRandom(i * 3) * 0.5,
    }));
  }, [decorationCount]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => setShowContent(true), 4200),
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

  const firstLetter = receiverName.charAt(0).toUpperCase();

  return (
    <GoldenTheme>
      <audio ref={audioRef} loop preload="auto">
        <source src="/eid-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Music toggle */}
      <motion.div
        className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMusic}
          className="bg-amber-900/40 backdrop-blur-md border border-amber-500/40 hover:bg-amber-800/60 rounded-full shadow-[0_0_15px_rgba(218,165,32,0.3)]"
        >
          {isPlaying ? (
            <Music2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          ) : (
            <Music className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400/50" />
          )}
        </Button>
      </motion.div>

      {/* Home button */}
      <motion.div
        className="fixed top-3 left-3 sm:top-4 sm:left-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        <Link href="/">
          <Button
            variant="outline"
            size="icon"
            className="bg-amber-900/40 backdrop-blur-md border border-amber-500/40 hover:bg-amber-800/60 rounded-full shadow-[0_0_15px_rgba(218,165,32,0.3)]"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          </Button>
        </Link>
      </motion.div>

      {/* Entrance Animation */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
          >
            {/* Floating decorations */}
            {phase >= 1 && floatingDiamonds.map((diamond, i) => (
              <FloatingDiamond key={i} {...diamond} />
            ))}

            <div className="text-center px-4 w-full max-w-lg">
              {/* Crown Icon */}
              {phase >= 1 && (
                <motion.div
                  className="mb-8 flex justify-center"
                  initial={{ opacity: 0, y: -40, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', duration: 1.5, bounce: 0.5 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 blur-2xl bg-amber-500/20 rounded-full" />
                    <Crown className="w-20 h-20 md:w-28 md:h-28 text-amber-400 fill-amber-500/30 relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                  </div>
                </motion.div>
              )}

              {/* Greeting */}
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <GoldShimmerText className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3 tracking-wider font-serif">
                    عيد مبارك
                  </GoldShimmerText>
                  <p className="text-lg md:text-xl text-amber-300/80 tracking-[0.4em] font-light mt-2">
                    EID MUBARAK
                  </p>
                </motion.div>
              )}

              {/* Message */}
              {phase >= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="mt-8"
                >
                  <RoyalOrnament delay={0} />
                  <p className="text-base sm:text-lg text-amber-100/70 mt-4 font-light italic font-serif">
                    A royal greeting awaits...
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
            transition={{ duration: 1.2 }}
          >
            <motion.div
              className="w-full max-w-2xl relative"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 via-yellow-500/20 to-amber-600/20 rounded-3xl blur-xl" />

              {/* Card Container */}
              <div
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-500/30 backdrop-blur-xl"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(40, 30, 15, 0.95) 0%, rgba(15, 10, 5, 0.98) 100%)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 215, 0, 0.2)',
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                
                {/* Corner details */}
                <div className="absolute top-3 left-3 w-6 h-6 sm:w-8 sm:h-8 border-t border-l border-amber-500/40 rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-6 h-6 sm:w-8 sm:h-8 border-t border-r border-amber-500/40 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-6 h-6 sm:w-8 sm:h-8 border-b border-l border-amber-500/40 rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-6 h-6 sm:w-8 sm:h-8 border-b border-r border-amber-500/40 rounded-br-lg" />

                {/* Content */}
                <div className="relative p-5 sm:p-8 md:p-10 z-10 flex flex-col items-center">
                  {/* Monogram */}
                  <div className="flex justify-center mb-6">
                    <MonogramFrame letter={firstLetter} delay={0.3} />
                  </div>

                  {/* Header */}
                  <div className="text-center mb-6 w-full">
                    <GoldShimmerText delay={0.5} className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif mb-2 pb-1 drop-shadow-md">
                      عيد مبارك
                    </GoldShimmerText>
                    <motion.p 
                      className="text-amber-200/60 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-light"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      Eid Mubarak
                    </motion.p>
                  </div>

                  <div className="w-full flex justify-center">
                    <RoyalOrnament delay={0.9} />
                  </div>

                  {/* Receiver */}
                  <motion.div
                    className="text-center my-8 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    <p className="text-amber-400/50 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase mb-3 text-center w-full">Distinguished Guest</p>
                    <LuxuryReveal
                      text={receiverName}
                      delay={1.3}
                      className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    className="my-8 relative w-full px-2 sm:px-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7, duration: 0.8 }}
                  >
                    <div className="absolute left-0 top-[-10px] sm:top-[-20px] text-3xl sm:text-5xl text-amber-500/20 font-serif leading-none select-none">"</div>
                    <div className="absolute right-0 bottom-[-20px] sm:bottom-[-30px] text-3xl sm:text-5xl text-amber-500/20 font-serif leading-none select-none">"</div>
                    <p className="text-base sm:text-lg md:text-xl text-amber-100/90 leading-relaxed text-center font-serif italic relative z-10 px-4">
                      {message || DEFAULT_MESSAGE}
                    </p>
                  </motion.div>

                  <div className="w-full flex justify-center">
                    <RoyalOrnament delay={2.1} />
                  </div>

                  {/* Sender */}
                  <motion.div
                    className="text-center mt-8 mb-4 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.3 }}
                  >
                    <p className="text-amber-400/50 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase mb-4 text-center w-full">With Royal Compliments</p>
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500/70" />
                      <p className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 pb-1">
                        {senderName}
                      </p>
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500/70" />
                    </div>
                  </motion.div>

                  {/* View count */}
                  <motion.div
                    className="flex justify-center mt-8 sm:mt-10 mb-4 sm:mb-6 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-amber-950/40 border border-amber-500/20 text-amber-200/50 backdrop-blur-sm">
                      <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="text-[9px] sm:text-[10px] font-medium tracking-wider uppercase">
                        {viewCount} Views
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </GoldenTheme>
  );
}
