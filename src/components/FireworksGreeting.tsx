'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Music, Music2, Home, Sparkles, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEFAULT_MESSAGE, incrementViewCount, generateWishId } from '@/types/wish';
import FireworksTheme from './ThemeBackgrounds/FireworksTheme';
import ShareButtons from './ShareButtons';
import Link from 'next/link';
import { useDeviceCapabilities, useReducedMotion } from '@/hooks/use-reduced-motion';

interface FireworksGreetingProps {
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

// Neon text glow animation
function NeonGlow({ children, color = '#ff00ff', delay = 0 }: { children: React.ReactNode; color?: string; delay?: number }) {
  return (
    <motion.div
      className="relative inline-block"
      style={{
        textShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        willChange: 'transform, opacity'
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.5, 1, 0.5],
      }}
      transition={{ 
        duration: 2, 
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Sparkle burst divider
function SparkleDivider({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="flex items-center justify-center gap-2 my-4"
      style={{ willChange: 'transform, opacity' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring' }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <Sparkles className="w-5 h-5 text-cyan-400" />
      </motion.div>
      <motion.div
        className="h-px w-12 bg-gradient-to-r from-cyan-400/60 to-fuchsia-500/60"
        animate={{ scaleX: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
      </motion.div>
      <motion.div
        className="h-px w-12 bg-gradient-to-l from-cyan-400/60 to-fuchsia-500/60"
        animate={{ scaleX: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <Sparkles className="w-5 h-5 text-fuchsia-400" />
      </motion.div>
    </motion.div>
  );
}

// Explosive text reveal
function ExplosiveReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const letters = text.split('');
  
  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {letters.map((letter, i) => {
        const angle = seededRandom(i * 5) * 360;
        const distance = 100;
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        
        return (
          <motion.span
            key={i}
            className="inline-block"
            style={{ willChange: 'transform, opacity' }}
            initial={{ 
              opacity: 0, 
              x, 
              y, 
              scale: 2,
              rotate: seededRandom(i * 5 + 1) * 360 - 180,
            }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              y: 0, 
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.03,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        );
      })}
    </div>
  );
}

// Wave text animation
function WaveReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ');
  
  return (
    <div className={`flex flex-wrap justify-center gap-x-3 ${className}`}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-block"
          style={{ transformOrigin: 'center bottom', willChange: 'transform, opacity' }}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + wordIndex * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

// Rainbow shimmer effect
function RainbowShimmer({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className="relative inline-block"
      style={{
        background: 'linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #ff0080)',
        backgroundSize: '300% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        willChange: 'background-position, opacity'
      }}
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
    >
      {children}
    </motion.div>
  );
}

// Particle burst for entrance
function ParticleBurst({ x, y, delay }: { x: number; y: number; delay: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      angle: (i / 6) * 360,
      color: ['#ff0080', '#ff8c00', '#40e0d0', '#ff00ff', '#00ff00', '#ffff00'][i % 6],
    }));
  }, []);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, willChange: 'transform, opacity' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, delay, repeat: Infinity, repeatDelay: 3 }}
    >
      {particles.map((particle, i) => {
        const rad = (particle.angle * Math.PI) / 180;
        const distance = 80;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: particle.color,
              boxShadow: `0 0 6px ${particle.color}`,
            }}
            initial={{ x: 0, y: 0, scale: 0 }}
            animate={{
              x: Math.cos(rad) * distance,
              y: Math.sin(rad) * distance,
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.02,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        );
      })}
    </motion.div>
  );
}

// Pulsing star decoration
function PulsingStar({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, willChange: 'transform, opacity' }}
      animate={{
        scale: [0.5, 1.2, 0.5],
        rotate: [0, 180, 360],
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
    </motion.div>
  );
}

export default function FireworksGreeting({ receiverName, senderName, message }: FireworksGreetingProps) {
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

  // Reduce particle effects on mobile
  const particleBurstCount = prefersReducedMotion ? 0 : (isMobile || isLowEnd) ? 1 : 3;
  const pulsingStarCount = prefersReducedMotion ? 0 : (isMobile || isLowEnd) ? 2 : 4;

  const particleBursts = useMemo(() => {
    return Array.from({ length: particleBurstCount }, (_, i) => ({
      x: seededRandom(i * 7) * 80 + 10,
      y: seededRandom(i * 7 + 1) * 60 + 20,
      delay: i * 0.5,
    }));
  }, [particleBurstCount]);

  const pulsingStars = useMemo(() => {
    return Array.from({ length: pulsingStarCount }, (_, i) => ({
      x: seededRandom(i * 11) * 90 + 5,
      y: seededRandom(i * 11 + 1) * 70 + 15,
      delay: seededRandom(i * 11 + 2) * 2,
    }));
  }, [pulsingStarCount]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
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
    <FireworksTheme>
      <audio ref={audioRef} loop preload="auto">
        <source src="/eid-music.mp3" type="audio/mpeg" />
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
          className="bg-fuchsia-500/20 backdrop-blur-md border-fuchsia-400/30 hover:bg-fuchsia-500/30 rounded-full"
        >
          {isPlaying ? (
            <Music2 className="w-5 h-5 text-cyan-300" />
          ) : (
            <Music className="w-5 h-5 text-cyan-300/50" />
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
            className="bg-fuchsia-500/20 backdrop-blur-md border-fuchsia-400/30 hover:bg-fuchsia-500/30 rounded-full"
          >
            <Home className="w-5 h-5 text-cyan-300" />
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
            {/* Particle bursts */}
            {phase >= 1 && particleBursts.map((burst, i) => (
              <ParticleBurst key={i} {...burst} />
            ))}

            {/* Pulsing stars */}
            {phase >= 1 && pulsingStars.map((star, i) => (
              <PulsingStar key={i} {...star} />
            ))}

            <div className="text-center px-4">
              {/* Celebration icon */}
              {phase >= 1 && (
                <motion.div
                  className="mb-6 flex justify-center gap-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', duration: 0.8 }}
                >
                  <motion.div
                    animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Sparkles className="w-10 h-10 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <Zap className="w-10 h-10 text-cyan-400 fill-cyan-400" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  >
                    <Sparkles className="w-10 h-10 text-fuchsia-400 fill-fuchsia-400" />
                  </motion.div>
                </motion.div>
              )}

              {/* Eid Mubarak with neon glow */}
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-5xl md:text-7xl font-bold mb-2">
                    <NeonGlow color="#ff00ff" delay={0}>
                      <span className="text-fuchsia-400">عيد مبارك</span>
                    </NeonGlow>
                  </h1>
                  <RainbowShimmer delay={0.3}>
                    <p className="text-xl md:text-2xl font-bold tracking-widest">EID MUBARAK</p>
                  </RainbowShimmer>
                </motion.div>
              )}

              {/* Sparkle divider */}
              {phase >= 2 && <SparkleDivider delay={0.8} />}

              {/* Message */}
              {phase >= 3 && (
                <motion.p
                  className="text-lg md:text-xl text-white/80 mt-4 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  ✨ A spectacular celebration awaits you... ✨
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Glowing card */}
              <div className="relative">
                {/* Outer glow */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl opacity-50 blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, #ff00ff, #00ffff, #ff00ff)',
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Main card */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20, 20, 40, 0.95) 0%, rgba(30, 30, 60, 0.9) 50%, rgba(20, 20, 40, 0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 25px 80px -20px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      border: '2px solid transparent',
                      background: 'linear-gradient(135deg, rgba(20,20,40,0.95), rgba(30,30,60,0.9)) padding-box, linear-gradient(135deg, #ff00ff, #00ffff, #ff00ff) border-box',
                    }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />

                  {/* Top neon bar */}
                  <motion.div
                    className="h-1"
                    style={{
                      background: 'linear-gradient(90deg, #ff00ff, #ff8c00, #ffff00, #00ff00, #00ffff, #0080ff, #8000ff, #ff00ff)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '200% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Content */}
                  <div className="p-8 md:p-12">
                    {/* Arabic greeting with glow */}
                    <motion.div
                      className="text-center mb-4"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <NeonGlow color="#ff00ff">
                        <h2 className="text-4xl md:text-5xl font-bold text-fuchsia-300">
                          عيد مبارك
                        </h2>
                      </NeonGlow>
                    </motion.div>

                    <SparkleDivider delay={0.3} />

                    <motion.div
                      className="text-center mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <RainbowShimmer>
                        <p className="text-lg font-bold tracking-[0.3em]">EID MUBARAK</p>
                      </RainbowShimmer>
                    </motion.div>

                    {/* Receiver name - explosive reveal */}
                    <motion.div
                      className="text-center my-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <p className="text-cyan-300/60 text-sm tracking-wider mb-3">CELEBRATING WITH</p>
                      <ExplosiveReveal
                        text={receiverName}
                        delay={0.8}
                        className="text-3xl md:text-5xl font-bold text-white"
                      />
                    </motion.div>

                    <SparkleDivider delay={1.2} />

                    {/* Message */}
                    <motion.div
                      className="my-8 px-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      <p className="text-lg md:text-xl text-white/90 leading-relaxed text-center font-light">
                        "{message || DEFAULT_MESSAGE}"
                      </p>
                    </motion.div>

                    <SparkleDivider delay={1.6} />

                    {/* Sender */}
                    <motion.div
                      className="text-center mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    >
                      <p className="text-fuchsia-300/50 text-sm tracking-wider mb-2">LIGHTING UP THE SKY FOR YOU</p>
                      <WaveReveal
                        text={senderName}
                        delay={2}
                        className="text-2xl md:text-3xl font-semibold"
                      >
                      </WaveReveal>
                      <motion.span
                        className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                      >
                        {senderName}
                      </motion.span>
                    </motion.div>

                    {/* Animated sparkle */}
                    <motion.div
                      className="flex justify-center mt-8"
                      animate={{ 
                        y: [0, -8, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                    </motion.div>

                    {/* View counter */}
                    <motion.div
                      className="flex items-center justify-center gap-2 text-white/40 mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{viewCount} people celebrated this moment</span>
                    </motion.div>
                  </div>

                  {/* Bottom neon bar */}
                  <motion.div
                    className="h-1"
                    style={{
                      background: 'linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff0080, #00ffff, #ff00ff)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['200% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </div>
              </div>


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </FireworksTheme>
  );
}
