'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeId, DEFAULT_MESSAGE, themes, MusicId } from '@/types/wish';
import MoonTheme from './ThemeBackgrounds/MoonTheme';
import MosqueTheme from './ThemeBackgrounds/MosqueTheme';
import FireworksTheme from './ThemeBackgrounds/FireworksTheme';
import GoldenTheme from './ThemeBackgrounds/GoldenTheme';
import LoveTheme from './ThemeBackgrounds/LoveTheme';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  wish: {
    senderName: string;
    receiverName: string;
    message: string;
    theme: ThemeId;
    music?: MusicId;
  };
}

const THEME_COMPONENTS: Record<ThemeId, typeof MoonTheme> = {
  moon: MoonTheme,
  mosque: MosqueTheme,
  fireworks: FireworksTheme,
  golden: GoldenTheme,
  love: LoveTheme,
};

export default function PreviewModal({ isOpen, onClose, onConfirm, wish }: PreviewModalProps) {
  const themeConfig = themes[wish.theme] || themes.moon;
  const message = wish.message || DEFAULT_MESSAGE;
  const ThemeBackground = THEME_COMPONENTS[wish.theme] || MoonTheme;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal container */}
          <motion.div
            className="relative w-full max-w-3xl max-h-[95vh] overflow-hidden rounded-3xl"
            initial={{ scale: 0.85, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Preview content */}
            <div className="relative h-[450px] md:h-[550px]">
              <ThemeBackground>
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-12 text-center">
                  {/* Decorative top */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <span className="text-white/30 text-sm tracking-widest">PREVIEW</span>
                  </motion.div>

                  {/* Main greeting */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.8, delay: 0.3 }}
                  >
                    <h1
                      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3"
                      style={{
                        fontFamily: 'var(--font-playfair), Georgia, serif',
                        color: themeConfig.colors.accent,
                        textShadow: `0 0 40px ${themeConfig.colors.accent}50`,
                      }}
                    >
                      🌙 Eid Mubarak
                    </h1>
                  </motion.div>

                  <motion.h2
                    className="text-3xl md:text-4xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {wish.receiverName || 'Receiver'}!
                  </motion.h2>

                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 mb-6 border border-white/20 max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <p className="text-sm md:text-base text-white/90 leading-relaxed line-clamp-4">
                      {message}
                    </p>
                  </motion.div>

                  <motion.p
                    className="text-lg md:text-xl text-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    From <span className="font-semibold" style={{ color: themeConfig.colors.accent }}>{wish.senderName || 'Sender'}</span> ❤️
                  </motion.p>
                </div>
              </ThemeBackground>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 p-5 bg-gradient-to-t from-[#0a0a1a] via-[#0d1b2a] to-[#0d1b2a] border-t border-white/5">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 py-5 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl font-medium"
              >
                Edit
              </Button>
              <Button
                onClick={onConfirm}
                className="flex-1 py-5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 hover:from-yellow-300 hover:via-amber-300 hover:to-yellow-300 text-black rounded-xl font-semibold shadow-lg shadow-yellow-400/20 btn-eid"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate & Share
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
