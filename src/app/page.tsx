'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import GreetingPage from '@/components/GreetingPage';
import LandingPage from '@/components/LandingPage';
import { ThemeId, DEFAULT_MESSAGE } from '@/types/wish';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Send } from 'lucide-react';

function MainContent() {
  const searchParams = useSearchParams();
  const [unlocked, setUnlocked] = useState(false);
  
  // Check if this is a greeting view (has URL parameters)
  const to = searchParams.get('to');
  const from = searchParams.get('from');
  const msg = searchParams.get('msg');
  const theme = searchParams.get('theme') as ThemeId | null;
  
  // If we have the required parameters, show greeting page
  if (to && from) {
    if (!unlocked) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#020510] via-[#0f172a] to-[#1e1136] flex items-center justify-center p-6 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute top-[10%] left-[20%] w-[40vh] h-[40vh] bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-pulse duration-[4000ms]" />
          <div className="absolute bottom-[20%] right-[10%] w-[30vh] h-[30vh] bg-indigo-500/10 rounded-full blur-[80px] mix-blend-screen pointer-events-none animate-pulse duration-[5000ms]" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
            className="relative z-10 w-full max-w-md rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_20px_80px_-20px_rgba(255,215,0,0.1)] overflow-hidden text-center p-8 sm:p-12"
          >
            {/* Hanging Lantern Animation */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 12 }}
              className="absolute left-1/2 -translate-x-1/2 top-0"
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-amber-400/50 to-transparent mx-auto" />
              <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                style={{ transformOrigin: 'top center' }}
                className="relative -mt-2"
              >
                <div className="w-16 h-16 bg-gradient-to-tr from-amber-200 via-amber-400 to-amber-500 rounded-xl rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.4)] border border-amber-200/50">
                  <div className="w-10 h-10 border border-amber-900/30 rounded-lg flex items-center justify-center bg-black/10 backdrop-blur-sm -rotate-45">
                    <Gift className="w-5 h-5 text-amber-950" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <div className="mt-20 mb-8 relative">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-amber-200 font-serif leading-tight">
                 {decodeURIComponent(to)}!
              </h2>
              <div className="flex items-center justify-center gap-2 text-white/50 text-sm sm:text-base mb-2 font-medium">
                <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/20" />
                <span>Special wish from</span>
                <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/20" />
              </div>
              <p className="text-xl sm:text-2xl text-amber-400 font-semibold font-serif italic">
                {decodeURIComponent(from)}
              </p>
            </div>
            
            <button
               onClick={() => setUnlocked(true)}
               className="w-full py-5 sm:py-6 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-amber-950 rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_50px_rgba(255,215,0,0.4)] relative group overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#121b2d] hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 fill-amber-950/20" />
                <span className="tracking-wide">Open Wish</span>
              </span>
            </button>
          </motion.div>
        </div>
      );
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="greeting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          <GreetingPage
            receiverName={decodeURIComponent(to)}
            senderName={decodeURIComponent(from)}
            message={msg ? decodeURIComponent(msg) : DEFAULT_MESSAGE}
            theme={theme || 'moon'}
          />
        </motion.div>
      </AnimatePresence>
    );
  }
  
  // Otherwise, show the landing page with creator
  return <LandingPage />;
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] via-[#1a237e] to-[#3949ab] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MainContent />
    </Suspense>
  );
}
