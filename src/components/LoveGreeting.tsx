'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Music, Music2, Home, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEFAULT_MESSAGE, incrementViewCount, generateWishId } from '@/types/wish';
import LoveTheme from './ThemeBackgrounds/LoveTheme';
import ShareButtons from './ShareButtons';
import Link from 'next/link';

interface LoveGreetingProps {
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

// Floating heart for entrance
function EntranceHeart({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: '50%', willChange: 'transform, opacity' }}
      initial={{ opacity: 0, scale: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.5, 1.2, 0],
        y: [-100, -200, -300],
        x: [0, 50, -30],
      }}
      transition={{
        duration: 2.5,
        delay,
        ease: 'easeOut',
      }}
    >
      <Heart className="w-12 h-12 text-pink-400 fill-pink-400" />
    </motion.div>
  );
}

// Glowing text animation
function GlowingText({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      style={{ willChange: 'transform, opacity' }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Letter reveal animation
function LetterReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const letters = text.split('');

  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.05,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ display: 'inline-block', transformOrigin: 'center bottom', willChange: 'transform, opacity' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
}

export default function LoveGreeting({ receiverName, senderName, message }: LoveGreetingProps) {
  const [phase, setPhase] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [viewCount] = useState(() => {
    const wishId = generateWishId(receiverName, senderName);
    return getAndIncrementViewCount(wishId);
  });

  const entranceHearts = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      delay: i * 0.15,
      x: seededRandom(i * 7) * 80 + 10,
    }));
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setEnvelopeOpen(true), 2200),
      setTimeout(() => setShowEnvelope(false), 4500),
      setTimeout(() => setShowContent(true), 5000),
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
    <LoveTheme>
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
          className="bg-pink-500/20 backdrop-blur-md border-pink-300/30 hover:bg-pink-500/30 rounded-full"
        >
          {isPlaying ? (
            <Music2 className="w-5 h-5 text-pink-200" />
          ) : (
            <Music className="w-5 h-5 text-pink-300/50" />
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
            className="bg-pink-500/20 backdrop-blur-md border-pink-300/30 hover:bg-pink-500/30 rounded-full"
          >
            <Home className="w-5 h-5 text-pink-200" />
          </Button>
        </Link>
      </motion.div>

      {/* Envelope Opening Animation */}
      <AnimatePresence>
        {showEnvelope && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.8 }}
          >
            {/* Envelope container */}
            <motion.div
              className="relative"
              initial={{ y: 200, scale: 0.8 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              {/* Envelope body mimicking SCSS styling and z-index layers */}
              <div 
                className="relative w-80 h-52 md:w-[32rem] md:h-[20rem] mx-auto shadow-2xl rounded-sm"
                style={{
                  perspective: '3000px',
                  perspectiveOrigin: '50% 0',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 1. Envelope Back */}
                <div 
                  className="absolute inset-0 rounded-b-sm"
                  style={{ background: '#b31217' }} /* Darkest red */
                />

                {/* 2. The Letter / Card (.content) */}
                <motion.div
                  className="absolute left-6 right-6 bg-white rounded-t-lg shadow-xl border-t border-gray-100"
                  style={{ 
                    bottom: 0, 
                    height: '92%', 
                    zIndex: 10,
                  }}
                  initial={{ y: 0 }}
                  // Wait 0.8s for flap to open before sliding out
                  animate={envelopeOpen ? { y: '-60%' } : { y: 0 }}
                  transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }} 
                >
                  <div className="p-4 md:p-6 text-center h-full flex flex-col pt-10">
                    <p className="text-[#3B4451] font-bold text-sm md:text-lg mb-2">A special message...</p>
                    <Heart className="w-8 h-8 text-[#F44336] fill-[#F44336] mx-auto mt-6" />
                  </div>
                </motion.div>

                {/* 3. Envelope Front Pockets (.rest equivalents) */}
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
                  <div 
                    className="absolute inset-0"
                    style={{ background: '#ff4d4f', clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}
                  />
                  <div 
                    className="absolute inset-0"
                    style={{ background: '#ff4d4f', clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }}
                  />
                  <div 
                    className="absolute inset-0"
                    style={{ background: '#e63946', clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}
                  />
                </div>

                {/* 4. Envelope Top Flap (.top) */}
                <motion.div
                  className="absolute top-0 left-0 right-0 origin-top"
                  style={{ 
                    height: '60%', 
                    transformStyle: 'preserve-3d',
                    zIndex: 30,
                  }}
                  animate={{ 
                    rotateX: envelopeOpen ? -180 : 0,
                    zIndex: envelopeOpen ? 5 : 30 
                  }}
                  transition={{ 
                    rotateX: { duration: 1, ease: 'easeInOut' },
                    // Snap the z-index halfway through the flip so it visually passes behind the letter 
                    zIndex: { delay: 0.4 } 
                  }}
                >
                  {/* Flap Outer (Front) */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: '#e63946', /* Mid-dark red */
                      clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                      backfaceVisibility: 'hidden',
                    }}
                  />
                  {/* Flap Inner (Back) */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: '#b31217', /* Darkest red */
                      clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                      transform: 'rotateX(180deg)',
                      backfaceVisibility: 'hidden',
                    }}
                  />
                </motion.div>

                {/* Heart Seal */}
                <AnimatePresence>
                  {!envelopeOpen && (
                    <motion.div
                      className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ zIndex: 40 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-rose-200">
                        <Heart className="w-6 h-6 md:w-8 md:h-8 text-rose-500 fill-rose-500" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Floating hearts around envelope */}
            {phase >= 1 && entranceHearts.map((heart, i) => (
              <EntranceHeart key={i} {...heart} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Romantic Letter Style */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="min-h-screen flex items-center justify-center px-4 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="w-full max-w-2xl"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Letter Paper */}
              <div className="relative">
                {/* Decorative corner hearts */}
                <motion.div
                  className="absolute -top-4 -left-4"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Heart className="w-8 h-8 text-rose-300 fill-rose-300" />
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Heart className="w-8 h-8 text-rose-300 fill-rose-300" />
                </motion.div>

                {/* Main letter card */}
                <div
                  className="relative bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-3xl shadow-2xl overflow-hidden"
                  style={{
                    boxShadow: '0 25px 80px -20px rgba(225, 29, 99, 0.4)',
                  }}
                >
                  {/* Decorative top border */}
                  <div className="h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400" />

                  {/* Watermark pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5 L22 15 L32 17 L22 19 L20 29 L18 19 L8 17 L18 15 Z' fill='%23e91e63'/%3E%3C/svg%3E")`,
                    }}
                  />

                  <div className="relative p-8 md:p-12">
                    {/* Greeting Header */}
                    <div className="text-center mb-8">
                      <GlowingText delay={0.3}>
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-medium mb-4">
                          <Sparkles className="w-4 h-4" />
                          <span>Eid Mubarak</span>
                          <Sparkles className="w-4 h-4" />
                        </div>
                      </GlowingText>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                      >
                        <h1 className="text-3xl md:text-5xl font-serif font-bold mb-2">
                          <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                            Dear
                          </span>
                        </h1>
                        <LetterReveal
                          text={receiverName}
                          delay={0.8}
                          className="text-4xl md:text-6xl font-bold"
                        >
                        </LetterReveal>
                        <motion.span
                          className="block text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                        >
                          {receiverName}
                        </motion.span>
                      </motion.div>
                    </div>

                    {/* Decorative divider */}
                    <motion.div
                      className="flex items-center justify-center gap-4 my-6"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
                      <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                      <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
                    </motion.div>

                    {/* Message */}
                    <motion.div
                      className="relative mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      <div className="absolute -left-2 top-0 text-6xl text-rose-200 font-serif">"</div>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center px-6 italic font-serif">
                        {message || DEFAULT_MESSAGE}
                      </p>
                      <div className="absolute -right-2 bottom-0 text-6xl text-rose-200 font-serif">"</div>
                    </motion.div>

                    {/* Decorative divider */}
                    <motion.div
                      className="flex items-center justify-center gap-4 my-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 }}
                    >
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300" />
                      <Sparkles className="w-4 h-4 text-pink-400" />
                      <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                      <Sparkles className="w-4 h-4 text-pink-400" />
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-300" />
                    </motion.div>

                    {/* From section */}
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 }}
                    >
                      <p className="text-gray-500 text-sm mb-2">With all my love,</p>
                      <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                        {senderName}
                      </p>
                      <motion.div
                        className="mt-4 flex justify-center gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                      >
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 1,
                              delay: i * 0.2,
                              repeat: Infinity,
                            }}
                          >
                            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* View counter */}
                    <motion.div
                      className="flex items-center justify-center gap-2 text-gray-400 mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{viewCount} people viewed this love letter</span>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom decorative hearts */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Heart className="w-5 h-5 text-pink-300 fill-pink-300" />
                  <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
                  <Heart className="w-5 h-5 text-pink-300 fill-pink-300" />
                </motion.div>
              </div>

              {/* Share buttons */}
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4 }}
              >
                <ShareButtons
                  receiverName={receiverName}
                  senderName={senderName}
                  message={message}
                  theme="love"
                />
              </motion.div>

              {/* Create own wish */}
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6 }}
              >
                <Link href="/">
                  <Button
                    className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full px-8 py-6 shadow-lg"
                    style={{
                      boxShadow: '0 10px 40px -10px rgba(225, 29, 99, 0.5)',
                    }}
                  >
                    <Heart className="w-5 h-5 mr-2 fill-white" />
                    Create Your Own Love Letter
                    <Heart className="w-5 h-5 ml-2 fill-white" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LoveTheme>
  );
}
