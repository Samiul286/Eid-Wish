'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { themes, ThemeId, DEFAULT_MESSAGE, generateShareUrl } from '@/types/wish';
import { Sparkles, Eye, Check, Share2, User, Heart, MessageSquare, Palette, Copy, CheckCheck, Crown } from 'lucide-react';
import PreviewModal from './PreviewModal';
import ShareButtons from './ShareButtons';
import { toast } from 'sonner';

export default function WishCreator() {
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>('moon');
  const [showPreview, setShowPreview] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!senderName.trim() || !receiverName.trim()) return;
    
    const url = generateShareUrl({
      to: receiverName.trim(),
      from: senderName.trim(),
      msg: message.trim() || DEFAULT_MESSAGE,
      theme: selectedTheme,
    });
    
    setGeneratedUrl(url);
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
      toast.success('Link copied! Share it with your loved ones 🌙', {
        style: {
          background: 'linear-gradient(135deg, #1a1428 0%, #0d1b2a 100%)',
          color: '#ffd700',
          border: '1px solid #d4af37',
        },
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

  // Success state
  if (generatedUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto"
      >
        <div className="relative rounded-3xl overflow-hidden">
          {/* Ornate border */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              border: '2px solid transparent',
              background: 'linear-gradient(#0d1b2a, #0d1b2a) padding-box, linear-gradient(135deg, #b8860b, #ffd700, #b8860b) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          <div className="relative p-8 md:p-10">
            {/* Success header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                style={{
                  background: 'linear-gradient(135deg, #b8860b, #ffd700, #daa520)',
                  boxShadow: '0 10px 40px -10px rgba(255, 215, 0, 0.3)',
                }}
              >
                <Crown className="w-10 h-10 text-black" />
              </motion.div>

              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  background: 'linear-gradient(135deg, #ffd700, #daa520)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Your Wish is Ready!
              </h2>
              <p className="text-white/50">
                Share this link with <span className="text-amber-400">{receiverName}</span>
              </p>
            </div>

            {/* URL Display */}
            <div className="mb-8">
              <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <div className="p-4">
                  <p className="text-white/30 text-xs mb-2 uppercase tracking-wider">Shareable Link</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-black/30 rounded-xl px-4 py-3 overflow-hidden">
                      <p className="text-white/80 text-sm truncate font-mono">{generatedUrl}</p>
                    </div>
                    <Button
                      onClick={handleCopyLink}
                      className={`shrink-0 px-5 py-3 rounded-xl font-medium transition-all ${
                        copied
                          ? 'bg-emerald-500 hover:bg-emerald-500 text-white'
                          : 'bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-black'
                      }`}
                    >
                      {copied ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Copied!
                        </motion.div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Copy className="w-4 h-4" />
                          Copy
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Share buttons */}
            <div className="mb-6">
              <ShareButtons
                receiverName={receiverName}
                senderName={senderName}
                message={message || DEFAULT_MESSAGE}
                theme={selectedTheme}
                url={generatedUrl}
              />
            </div>

            {/* Create another */}
            <Button
              onClick={() => {
                setGeneratedUrl(null);
                setSenderName('');
                setReceiverName('');
                setMessage('');
              }}
              variant="outline"
              className="w-full py-5 border-amber-400/30 bg-transparent text-amber-400 hover:bg-amber-400/10 rounded-2xl"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Another Wish
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Form state
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl mx-auto"
      >
        <div className="relative rounded-3xl overflow-hidden">
          {/* Ornate border */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              border: '2px solid transparent',
              background: 'linear-gradient(#0d1b2a, #0d1b2a) padding-box, linear-gradient(135deg, #b8860b, #ffd700, #b8860b) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          {/* Header */}
          <div className="relative p-8 md:p-10 pb-6 text-center border-b border-amber-400/10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
              style={{
                background: 'linear-gradient(135deg, #b8860b, #ffd700, #daa520)',
                boxShadow: '0 10px 40px -10px rgba(255, 215, 0, 0.3)',
              }}
            >
              <Sparkles className="w-8 h-8 text-black" />
            </motion.div>

            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                background: 'linear-gradient(135deg, #ffd700, #daa520)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Create Your Eid Wish
            </h2>
            <p className="text-white/40 text-sm">
              Send heartfelt Eid greetings with beautiful themes
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="p-6 md:p-8 space-y-6">
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label className="text-white/60 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  Your Name
                </Label>
                <div className="relative">
                  <Input
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="bg-white/5 border-amber-400/20 text-white placeholder:text-white/30 focus:border-amber-400/50 h-12 px-4 rounded-xl text-base"
                  />
                  {senderName && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <Check className="w-4 h-4 text-emerald-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Label className="text-white/60 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  Recipient
                </Label>
                <div className="relative">
                  <Input
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    placeholder="Who is this for?"
                    required
                    className="bg-white/5 border-amber-400/20 text-white placeholder:text-white/30 focus:border-amber-400/50 h-12 px-4 rounded-xl text-base"
                  />
                  {receiverName && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <Check className="w-4 h-4 text-emerald-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Message */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label className="text-white/60 flex items-center gap-2 text-xs uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                Message <span className="text-white/20 normal-case">(optional)</span>
              </Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={DEFAULT_MESSAGE}
                rows={2}
                className="bg-white/5 border-amber-400/20 text-white placeholder:text-white/30 focus:border-amber-400/50 rounded-xl resize-none py-3 text-base"
              />
            </motion.div>

            {/* Theme selection */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Label className="text-white/60 flex items-center gap-2 text-xs uppercase tracking-wider">
                <Palette className="w-3.5 h-3.5 text-purple-400" />
                Choose Theme
              </Label>

              <div className="grid grid-cols-5 gap-2">
                {Object.values(themes).map((theme) => {
                  const isSelected = selectedTheme === theme.id;
                  return (
                    <motion.button
                      key={theme.id}
                      type="button"
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                        isSelected
                          ? 'ring-2 ring-amber-400 scale-105'
                          : 'hover:scale-105 opacity-60 hover:opacity-100'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme.previewGradient}`} />
                      <div className="relative h-full flex items-center justify-center">
                        <span className="text-2xl">{theme.emoji}</span>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute bottom-1 right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center"
                        >
                          <Check className="w-2.5 h-2.5 text-black" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <p className="text-center text-white/30 text-xs">
                <span className="text-amber-400/60">{themes[selectedTheme].name}</span> theme selected
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                type="button"
                variant="outline"
                disabled={!senderName.trim() || !receiverName.trim()}
                onClick={handlePreview}
                className="flex-1 py-5 border-amber-400/30 bg-transparent text-white/70 hover:bg-amber-400/10 hover:text-white rounded-xl"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>

              <Button
                type="submit"
                disabled={!senderName.trim() || !receiverName.trim()}
                className="flex-1 py-5 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-black rounded-xl font-semibold"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Generate Link
              </Button>
            </motion.div>
          </form>
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
        }}
      />
    </>
  );
}
