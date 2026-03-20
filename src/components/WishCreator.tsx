'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { themes, ThemeId, DEFAULT_MESSAGE, generateShareUrl, musicOptions, MusicId, DEFAULT_MUSIC } from '@/types/wish';
import { Sparkles, Eye, Check, Share2, User, Heart, MessageSquare, Palette, Copy, CheckCheck, Crown, Send, Gift, PartyPopper, Music2, Play, Pause } from 'lucide-react';
import PreviewModal from './PreviewModal';
import ShareButtons from './ShareButtons';
import { toast } from 'sonner';

export default function WishCreator() {
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>('moon');
  const [selectedMusic, setSelectedMusic] = useState<MusicId>(DEFAULT_MUSIC);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [previewingMusic, setPreviewingMusic] = useState<MusicId | null>(null);
  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);

  const handleGenerate = () => {
    if (!senderName.trim() || !receiverName.trim()) return;
    
    const url = generateShareUrl({
      to: receiverName.trim(),
      from: senderName.trim(),
      msg: message.trim() || DEFAULT_MESSAGE,
      theme: selectedTheme,
      music: selectedMusic,
    });
    
    setGeneratedUrl(url);
  };

  const toggleMusicPreview = (musicId: MusicId) => {
    if (previewingMusic === musicId) {
      audioPreviewRef.current?.pause();
      setPreviewingMusic(null);
    } else {
      if (audioPreviewRef.current) {
        audioPreviewRef.current.pause();
      }
      const audio = new Audio(musicOptions[musicId].file);
      audio.volume = 0.5;
      audio.play();
      setPreviewingMusic(musicId);
      audio.onended = () => setPreviewingMusic(null);
      audioPreviewRef.current = audio;
    }
  };

  const handlePreview = () => {
    if (!senderName.trim() || !receiverName.trim()) return;
    setShowPreview(true);
  };

  const handleCopyLink = async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      toast.success('Magic link copied! Ready to share ✨', {
        className: 'bg-black/80 backdrop-blur-xl border-amber-500/30 text-amber-300 font-medium rounded-2xl',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = generatedUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 100,
        staggerChildren: 0.1,
        delayChildren: 0.1 
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
  };

  // Success state
  if (generatedUrl) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg mx-auto relative z-10"
      >
        <div className="relative rounded-[2.5rem] bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_-20px_rgba(255,215,0,0.15)] overflow-hidden">
          
          {/* Animated Glow Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none" />

          <div className="relative p-6 sm:p-10 flex flex-col items-center">
            
            <motion.div variants={itemVariants} className="relative mb-6">
              <motion.div
                animate={{ 
                  boxShadow: ['0 0 20px rgba(255, 215, 0, 0.2)', '0 0 40px rgba(255, 215, 0, 0.5)', '0 0 20px rgba(255, 215, 0, 0.2)']
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-600 flex items-center justify-center relative z-10 shadow-xl"
              >
                <PartyPopper className="w-12 h-12 text-black/90" />
              </motion.div>
              {/* Confetti particles effect ring */}
              <div className="absolute inset-0 rounded-full border border-amber-400/30 animate-ping opacity-50 duration-1000" />
            </motion.div>

            <motion.div variants={itemVariants} className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-100 to-amber-300 drop-shadow-sm font-serif">
                It's Ready!
              </h2>
              <p className="text-white/60 text-sm sm:text-base font-medium">
                Your beautiful wish for <span className="text-amber-400 font-semibold">{receiverName}</span> is complete.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full mb-8">
              <div className="group relative rounded-2xl bg-white/5 border border-white/10 p-1.5 transition-all hover:bg-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-2">
                  <div className="flex-1 bg-black/40 rounded-xl px-4 py-3 sm:py-4 overflow-hidden shadow-inner">
                    <p className="text-white/70 text-sm truncate font-mono tracking-tight">{generatedUrl}</p>
                  </div>
                  <Button
                    onClick={handleCopyLink}
                    className={`shrink-0 overflow-hidden relative h-full min-h-[48px] px-5 sm:px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                      copied
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/25'
                        : 'bg-white text-black hover:bg-amber-100 shadow-white/10'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="copied"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCheck className="w-5 h-5" />
                          <span>Copied</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Copy className="w-5 h-5" />
                          <span>Copy Link</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full mb-8">
              {/* Clean up duplicate heading */}
              <ShareButtons
                receiverName={receiverName}
                senderName={senderName}
                message={message || DEFAULT_MESSAGE}
                theme={selectedTheme}
                url={generatedUrl}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <Button
                onClick={() => {
                  setGeneratedUrl(null);
                  setSenderName('');
                  setReceiverName('');
                  setMessage('');
                  setSelectedMusic(DEFAULT_MUSIC);
                  if (audioPreviewRef.current) {
                    audioPreviewRef.current.pause();
                    setPreviewingMusic(null);
                  }
                }}
                variant="ghost"
                className="w-full py-6 font-semibold text-white/50 hover:text-amber-400 hover:bg-amber-400/10 rounded-2xl transition-all border border-transparent hover:border-amber-400/20 group"
              >
                <Gift className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Create Another Wish
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Form state
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl mx-auto relative z-10"
      >
        <div className="relative rounded-[2.5rem] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Animated Background Highlights */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
          
          <div className="relative p-6 sm:p-10">
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-10">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-[0_0_30px_rgba(255,215,0,0.3)] shadow-inner"
              >
                <Sparkles className="w-8 h-8 text-black" fill="currentColor" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 font-serif">
                Craft a Memory
              </h2>
              <p className="text-white/50 text-sm sm:text-base">
                Design a stunning personalized greeting for your loved ones.
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="space-y-6 sm:space-y-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {/* Sender Name */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label className="uppercase text-[10px] sm:text-xs font-bold tracking-[0.2em] text-amber-400/80 flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    From Whom?
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-amber-400/20 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <Input
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Your Name"
                      required
                      className="relative bg-white/5 border-white/10 hover:border-white/20 text-white placeholder:text-white/20 focus:border-amber-400/50 focus:bg-black/50 h-14 px-5 rounded-xl text-base sm:text-lg transition-all shadow-inner"
                    />
                  </div>
                </motion.div>

                {/* Receiver Name */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label className="uppercase text-[10px] sm:text-xs font-bold tracking-[0.2em] text-purple-400/80 flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5" />
                    For Whom?
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-purple-400/20 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <Input
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      placeholder="Their Name"
                      required
                      className="relative bg-white/5 border-white/10 hover:border-white/20 text-white placeholder:text-white/20 focus:border-purple-400/50 focus:bg-black/50 h-14 px-5 rounded-xl text-base sm:text-lg transition-all shadow-inner"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Message */}
              <motion.div variants={itemVariants} className="space-y-3">
                <Label className="uppercase text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-400/80 flex items-center justify-between">
                  <span className="flex items-center gap-2"><MessageSquare className="w-3.5 h-3.5" /> Heartfelt Message</span>
                  <span className="text-white/20 font-normal normal-case tracking-normal">Optional</span>
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={DEFAULT_MESSAGE}
                    rows={3}
                    className="relative bg-white/5 border-white/10 hover:border-white/20 text-white placeholder:text-white/20 focus:border-blue-400/50 focus:bg-black/50 rounded-xl resize-none py-4 px-5 text-base leading-relaxed transition-all shadow-inner"
                  />
                </div>
              </motion.div>

              {/* Theme Selection */}
              <motion.div variants={itemVariants} className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label className="uppercase text-[10px] sm:text-xs font-bold tracking-[0.2em] text-emerald-400/80 flex items-center gap-2">
                    <Palette className="w-3.5 h-3.5" />
                    Select Theme
                  </Label>
                  <span className="text-xs font-medium text-emerald-400/60 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                    {themes[selectedTheme].name}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-3">
                  {Object.values(themes).map((theme) => {
                    const isSelected = selectedTheme === theme.id;
                    return (
                      <motion.button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${
                          isSelected
                            ? 'shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-100 z-10'
                            : 'scale-95 opacity-50 hover:opacity-100 hover:scale-100'
                        }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.previewGradient}`} />
                        {isSelected && (
                          <motion.div 
                            layoutId="theme-selection"
                            className="absolute inset-0 border-2 border-white rounded-2xl"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <div className="relative h-full flex flex-col items-center justify-center gap-1">
                          <span className="text-2xl sm:text-3xl transform transition-transform duration-300" style={{ transform: isSelected ? 'scale(1.1)' : 'scale(1)' }}>{theme.emoji}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Music Selection */}
              <motion.div variants={itemVariants} className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <Label className="uppercase text-[10px] sm:text-xs font-bold tracking-[0.2em] text-pink-400/80 flex items-center gap-2">
                    <Music2 className="w-3.5 h-3.5" />
                    Choose Music
                  </Label>
                  <span className="text-white/20 font-normal normal-case tracking-normal text-xs">Optional</span>
                </div>

                <div className="space-y-2">
                  {Object.values(musicOptions).map((music) => {
                    const isSelected = selectedMusic === music.id;
                    const isPreviewing = previewingMusic === music.id;
                    return (
                      <motion.button
                        key={music.id}
                        type="button"
                        onClick={() => setSelectedMusic(music.id)}
                        className={`w-full relative rounded-lg overflow-hidden transition-all duration-300 ${
                          isSelected
                            ? 'bg-pink-500/15 border border-pink-400/40'
                            : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center gap-2.5 p-2.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMusicPreview(music.id);
                            }}
                            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              isPreviewing
                                ? 'bg-pink-500 text-white'
                                : 'bg-white/10 text-white/60 hover:bg-white/20'
                            }`}
                          >
                            {isPreviewing ? (
                              <Pause className="w-3.5 h-3.5" fill="currentColor" />
                            ) : (
                              <Play className="w-3.5 h-3.5 ml-0.5" fill="currentColor" />
                            )}
                          </button>
                          <div className="flex-1 text-left">
                            <p className={`font-semibold text-sm transition-colors ${
                              isSelected ? 'text-pink-300' : 'text-white/80'
                            }`}>
                              {music.name}
                            </p>
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="shrink-0 w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center"
                            >
                              <Check className="w-3.5 h-3.5 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={!senderName.trim() || !receiverName.trim()}
                  onClick={handlePreview}
                  className="sm:w-1/3 py-6 h-auto bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-xl border border-white/10 transition-all font-semibold"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Preview
                </Button>

                <Button
                  type="submit"
                  disabled={!senderName.trim() || !receiverName.trim()}
                  className="flex-1 py-6 h-auto bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-600 text-amber-950 rounded-xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] disabled:opacity-50 disabled:shadow-none relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Generate Link
                  </span>
                </Button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={() => {
          setShowPreview(false);
          handleGenerate();
        }}
        wish={{
          senderName,
          receiverName,
          message,
          theme: selectedTheme,
          music: selectedMusic,
        }}
      />
    </>
  );
}
