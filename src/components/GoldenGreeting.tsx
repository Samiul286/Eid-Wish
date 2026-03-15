'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Music, Music2, Home, Crown, Gem, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEFAULT_MESSAGE, incrementViewCount, generateWishId } from '@/types/wish';
import GoldenTheme from './ThemeBackgrounds/GoldenTheme';
import ShareButtons from './ShareButtons';
import Link from 'next/link';

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
      className="flex items-center justify-center gap-3 my-4"
      style={{ willChange: 'transform, opacity' }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1, delay }}
    >
      <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-amber-500/60 to-amber-400" />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Gem className="w-5 h-5 text-amber-400" />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500/30" />
      </motion.div>
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Gem className="w-5 h-5 text-amber-400" />
      </motion.div>
      <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent via-amber-500/60 to-amber-400" />
    </motion.div>
  );
}

// Elegant monogram frame
function MonogramFrame({ letter }: { letter: string }) {
  return (
    <motion.div
      className="relative inline-flex items-center justify-center"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: 'spring', duration: 1.5 }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80" className="absolute">
        <defs>
          <linearGradient id="monogramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#daa520" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r="38" fill="none" stroke="url(#monogramGrad)" strokeWidth="2" />
        <circle cx="40" cy="40" r="32" fill="none" stroke="url(#monogramGrad)" strokeWidth="0.5" opacity="0.5" />
      </svg>
      <span className="text-3xl font-serif font-bold text-amber-400">{letter}</span>
    </motion.div>
  );
}

// Luxury text reveal with shimmer
function LuxuryReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const letters = text.split('');
  
  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.04,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ transformOrigin: 'center bottom', willChange: 'transform, opacity' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
}

// Gold shimmer text
function GoldShimmerText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className="relative inline-block"
      initial={{ opacity: 0, backgroundPosition: '0% 50%' }}
      animate={{ 
        opacity: 1,
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{ 
        delay,
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        background: 'linear-gradient(135deg, #b8860b 0%, #daa520 25%, #ffd700 50%, #daa520 75%, #b8860b 100%)',
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        willChange: 'background-position'
      }}
    >
      {children}
    </motion.div>
  );
}

// Floating diamond decoration
function FloatingDiamond({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, willChange: 'transform, opacity' }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 45, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path
          d="M12 2 L22 12 L12 22 L2 12 Z"
          fill="none"
          stroke="rgba(218, 165, 32, 0.6)"
          strokeWidth="1"
        />
        <path
          d="M12 6 L18 12 L12 18 L6 12 Z"
          fill="rgba(255, 215, 0, 0.2)"
        />
      </svg>
    </motion.div>
  );
}

// Crown entrance animation
function CrownEntrance({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ opacity: 0, y: -100, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: [-100, 0, 0, 100],
        scale: [0.5, 1, 1, 0.8],
      }}
      transition={{
        duration: 4,
        delay,
        ease: 'easeOut',
      }}
      style={{ left: '50%', top: '30%', transform: 'translateX(-50%)', willChange: 'transform, opacity' }}
    >
      <Crown className="w-16 h-16 text-amber-400 fill-amber-400/30" />
    </motion.div>
  );
}

// Gold particle trail
function GoldTrail({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ opacity: 0, x: '-50%' }}
      animate={{
        opacity: [0, 0.8, 0],
        x: ['0%', '100%'],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{ top: `${30 + delay * 10}%`, left: 0, width: '100%', willChange: 'transform, opacity' }}
    >
      <div
        className="h-px w-1/3 mx-auto"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.5), transparent)',
        }}
      />
    </motion.div>
  );
}

export default function GoldenGreeting({ receiverName, senderName, message }: GoldenGreetingProps) {
  const [phase, setPhase] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [viewCount] = useState(() => {
    const wishId = generateWishId(receiverName, senderName);
    return getAndIncrementViewCount(wishId);
  });

  const floatingDiamonds = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      x: seededRandom(i * 7) * 80 + 10,
      y: seededRandom(i * 7 + 1) * 60 + 20,
      delay: seededRandom(i * 7 + 2) * 2,
    }));
  }, []);

  const crownEntrances = useMemo(() => {
    return Array.from({ length: 2 }, (_, i) => ({ delay: i * 1.5 }));
  }, []);

  const goldTrails = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({ delay: i * 1.2 }));
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2800),
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

  // Get first letter for monogram
  const firstLetter = receiverName.charAt(0).toUpperCase();

  return (
    <GoldenTheme>
      <audio ref={audioRef} loop preload="auto">
        <source src="/eid-music.mp3" type="audio/mpeg" />
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
          className="bg-amber-900/30 backdrop-blur-md border-amber-500/30 hover:bg-amber-800/30 rounded-full"
        >
          {isPlaying ? (
            <Music2 className="w-5 h-5 text-amber-400" />
          ) : (
            <Music className="w-5 h-5 text-amber-400/50" />
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
            className="bg-amber-900/30 backdrop-blur-md border-amber-500/30 hover:bg-amber-800/30 rounded-full"
          >
            <Home className="w-5 h-5 text-amber-400" />
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
            {/* Crown entrances */}
            {phase >= 1 && crownEntrances.map((crown, i) => (
              <CrownEntrance key={i} {...crown} />
            ))}

            {/* Gold trails */}
            {phase >= 1 && goldTrails.map((trail, i) => (
              <GoldTrail key={i} {...trail} />
            ))}

            {/* Floating diamonds */}
            {phase >= 1 && floatingDiamonds.map((diamond, i) => (
              <FloatingDiamond key={i} {...diamond} />
            ))}

            <div className="text-center px-4">
              {/* Crown icon */}
              {phase >= 1 && (
                <motion.div
                  className="mb-6 flex justify-center"
                  initial={{ opacity: 0, y: -50, rotate: -15 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ type: 'spring', duration: 1.2 }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      filter: ['drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))', 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))', 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Crown className="w-14 h-14 text-amber-400 fill-amber-400/40" />
                  </motion.div>
                </motion.div>
              )}

              {/* Arabic greeting */}
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h1 className="text-5xl md:text-7xl font-bold mb-2">
                    <GoldShimmerText>
                      <span>عيد مبارك</span>
                    </GoldShimmerText>
                  </h1>
                  <p className="text-lg md:text-xl text-amber-300/70 tracking-[0.4em] font-light">EID MUBARAK</p>
                </motion.div>
              )}

              {/* Royal ornament */}
              {phase >= 2 && <RoyalOrnament delay={1} />}

              {/* Message */}
              {phase >= 3 && (
                <motion.p
                  className="text-lg md:text-xl text-amber-100/70 mt-4 font-light italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  A royal greeting awaits...
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
            className="min-h-screen flex items-center justify-center px-4 py-20"
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
              {/* Royal invitation card */}
              <div className="relative">
                {/* Outer glow */}
                <motion.div
                  className="absolute -inset-2 rounded-3xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(218, 165, 32, 0.1))',
                    willChange: 'transform, opacity'
                  }}
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Main card */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20, 14, 10, 0.98) 0%, rgba(30, 22, 16, 0.95) 50%, rgba(20, 14, 10, 0.98) 100%)',
                    boxShadow: '0 30px 100px -30px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(218, 165, 32, 0.15)',
                  }}
                >
                  {/* Ornate border */}
                  <div 
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      border: '1px solid rgba(218, 165, 32, 0.4)',
                      boxShadow: 'inset 0 0 60px rgba(218, 165, 32, 0.05)',
                    }}
                  />

                  {/* Top gold bar with pattern */}
                  <div className="h-2 relative overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, #b8860b 0%, #daa520 20%, #ffd700 50%, #daa520 80%, #b8860b 100%)',
                      }}
                    />
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                      }}
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12">
                    {/* Monogram initial */}
                    <motion.div
                      className="flex justify-center mb-6"
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', duration: 1 }}
                    >
                      <MonogramFrame letter={firstLetter} />
                    </motion.div>

                    {/* Arabic greeting */}
                    <motion.div
                      className="text-center mb-4"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2 className="text-4xl md:text-5xl font-bold">
                        <GoldShimmerText>
                          <span>عيد مبارك</span>
                        </GoldShimmerText>
                      </h2>
                    </motion.div>

                    <RoyalOrnament delay={0.5} />

                    <motion.p
                      className="text-center text-amber-300/50 tracking-[0.3em] text-sm mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      EID MUBARAK
                    </motion.p>

                    {/* Receiver name */}
                    <motion.div
                      className="text-center my-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <p className="text-amber-400/60 text-xs tracking-[0.4em] mb-3">A ROYAL GREETING FOR</p>
                      <LuxuryReveal
                        text={receiverName}
                        delay={1}
                        className="text-3xl md:text-5xl font-serif font-bold text-amber-50"
                      />
                    </motion.div>

                    <RoyalOrnament delay={1.4} />

                    {/* Message */}
                    <motion.div
                      className="my-8 px-6 relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 }}
                    >
                      <p className="text-lg md:text-xl text-amber-100/90 leading-relaxed text-center font-serif italic">
                        "{message || DEFAULT_MESSAGE}"
                      </p>
                    </motion.div>

                    <RoyalOrnament delay={1.8} />

                    {/* Sender */}
                    <motion.div
                      className="text-center mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      <p className="text-amber-400/50 text-xs tracking-[0.4em] mb-2">WITH ROYAL REGARDS FROM</p>
                      <GoldShimmerText delay={2.2}>
                        <p className="text-2xl md:text-3xl font-serif font-semibold">
                          {senderName}
                        </p>
                      </GoldShimmerText>
                    </motion.div>

                    {/* Crown decoration */}
                    <motion.div
                      className="flex justify-center mt-8"
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Crown className="w-8 h-8 text-amber-400 fill-amber-400/20" />
                    </motion.div>

                    {/* View counter */}
                    <motion.div
                      className="flex items-center justify-center gap-2 text-amber-200/30 mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.4 }}
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-xs tracking-wider">{viewCount} people received this royal greeting</span>
                    </motion.div>
                  </div>

                  {/* Bottom gold bar */}
                  <div className="h-2 relative overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, #b8860b 0%, #daa520 20%, #ffd700 50%, #daa520 80%, #b8860b 100%)',
                      }}
                    />
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                      }}
                      animate={{ x: ['100%', '-100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                </div>

                {/* Corner gems */}
                {[
                  { top: -8, left: -8 },
                  { top: -8, right: -8 },
                  { bottom: -8, left: -8 },
                  { bottom: -8, right: -8 },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute pointer-events-none"
                    style={pos}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <Gem className="w-4 h-4 text-amber-500" />
                  </motion.div>
                ))}
              </div>


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </GoldenTheme>
  );
}
