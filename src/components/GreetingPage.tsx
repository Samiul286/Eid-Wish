'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Music, Music2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeId, DEFAULT_MESSAGE, themes, incrementViewCount, generateWishId } from '@/types/wish';
import ShareButtons from './ShareButtons';
import MoonTheme from './ThemeBackgrounds/MoonTheme';
import MosqueTheme from './ThemeBackgrounds/MosqueTheme';
import FireworksTheme from './ThemeBackgrounds/FireworksTheme';
import GoldenTheme from './ThemeBackgrounds/GoldenTheme';
import MoonGreeting from './MoonGreeting';
import MosqueGreeting from './MosqueGreeting';
import FireworksGreeting from './FireworksGreeting';
import LoveGreeting from './LoveGreeting';
import GoldenGreeting from './GoldenGreeting';
import Link from 'next/link';

interface GreetingPageProps {
  receiverName: string;
  senderName: string;
  message: string;
  theme: ThemeId;
}

// Seeded pseudo-random number generator for consistent SSR/CSR
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Theme ID to component mapping (excluding moon, mosque, fireworks and love which have their own components)
const THEME_COMPONENTS: Record<Exclude<ThemeId, 'moon' | 'mosque' | 'fireworks' | 'love'>, typeof MoonTheme> = {
  golden: GoldenTheme,
};

// Initialize view count synchronously (only runs once per wish)
const viewCountCache = new Map<string, number>();
function getAndIncrementViewCount(wishId: string): number {
  if (viewCountCache.has(wishId)) {
    return viewCountCache.get(wishId)!;
  }
  const count = incrementViewCount(wishId);
  viewCountCache.set(wishId, count);
  return count;
}

// Inner component for standard themes (golden only)
function StandardGreeting({ receiverName, senderName, message, theme }: GreetingPageProps) {
  const [phase, setPhase] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const themeConfig = themes[theme] || themes.moon;
  const ThemeBackground = THEME_COMPONENTS['golden'];

  // Compute view count once - using lazy initialization
  const [viewCount] = useState(() => {
    const wishId = generateWishId(receiverName, senderName);
    return getAndIncrementViewCount(wishId);
  });

  // Generate stars with deterministic positions
  const stars = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      left: seededRandom(i * 3) * 100,
      top: seededRandom(i * 3 + 1) * 100,
      delay: seededRandom(i * 3 + 2) * 1,
    }));
  }, []);

  useEffect(() => {
    // Animation sequence
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 4000),
      setTimeout(() => setShowContent(true), 5500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    // Try to play music on mount
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
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
    <ThemeBackground>
      {/* Audio element */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/eid-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Music toggle button */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMusic}
          className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
        >
          {isPlaying ? (
            <Music2 className="w-5 h-5 text-yellow-400" />
          ) : (
            <Music className="w-5 h-5 text-white/50" />
          )}
        </Button>
      </motion.div>

      {/* Home button */}
      <motion.div
        className="fixed top-4 left-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <Link href="/">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
          >
            <Home className="w-5 h-5 text-white" />
          </Button>
        </Link>
      </motion.div>

      {/* Animated entrance sequence */}
      <AnimatePresence>
        {!showContent && (
          <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
            {/* Phase 1: Moon with glow */}
            {phase >= 1 && (
              <motion.div
                className="absolute"
                initial={{ opacity: 0, scale: 0.5, y: -100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              >
                <div className="text-8xl md:text-9xl animate-pulse">🌙</div>
              </motion.div>
            )}

            {/* Phase 2: Stars/lights */}
            {phase >= 2 && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {stars.map((star, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                    style={{
                      left: `${star.left}%`,
                      top: `${star.top}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: star.delay,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* Phase 3: Someone special message */}
            {phase >= 3 && (
              <motion.div
                className="text-center px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 1 }}
              >
                <p className="text-xl md:text-2xl text-white/80 font-light">
                  ✨ Someone special sent you an Eid wish... ✨
                </p>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="min-h-screen flex flex-col items-start justify-center px-3 sm:px-4 pt-16 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main greeting */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
              >
                <h1
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                  style={{
                    color: themeConfig.colors.accent,
                    textShadow: `0 0 30px ${themeConfig.colors.accent}40`,
                  }}
                >
                  🌙 Eid Mubarak
                </h1>
              </motion.div>

              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {receiverName}!
              </motion.h2>

              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  {message || DEFAULT_MESSAGE}
                </p>
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl text-white/80 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                From <span className="font-semibold" style={{ color: themeConfig.colors.accent }}>{senderName}</span> ❤️
              </motion.p>

              {/* View counter */}
              <motion.div
                className="flex items-center justify-center gap-2 text-white/60 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">{viewCount} people viewed this Eid wish</span>
              </motion.div>

              {/* Theme badge */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm">
                  {themeConfig.emoji} {themeConfig.name} Theme
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeBackground>
  );
}

export default function GreetingPage(props: GreetingPageProps) {
  // Render Moon theme with special component
  if (props.theme === 'moon') {
    return (
      <MoonGreeting
        receiverName={props.receiverName}
        senderName={props.senderName}
        message={props.message}
      />
    );
  }
  
  // Render Mosque theme with special component
  if (props.theme === 'mosque') {
    return (
      <MosqueGreeting
        receiverName={props.receiverName}
        senderName={props.senderName}
        message={props.message}
      />
    );
  }
  
  // Render Fireworks theme with special component
  if (props.theme === 'fireworks') {
    return (
      <FireworksGreeting
        receiverName={props.receiverName}
        senderName={props.senderName}
        message={props.message}
      />
    );
  }
  
  // Render Love theme with special component
  if (props.theme === 'love') {
    return (
      <LoveGreeting
        receiverName={props.receiverName}
        senderName={props.senderName}
        message={props.message}
      />
    );
  }

  // Render Golden theme with special component
  if (props.theme === 'golden') {
    return (
      <GoldenGreeting
        receiverName={props.receiverName}
        senderName={props.senderName}
        message={props.message}
      />
    );
  }
  
  // Render standard greeting for other themes (fallback)
  return <StandardGreeting {...props} />;
}
