'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Share2, Link2, MessageCircle, Facebook, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { ThemeId, generateShareUrl } from '@/types/wish';
import { useState } from 'react';

interface ShareButtonsProps {
  url?: string;
  receiverName: string;
  senderName: string;
  message?: string;
  theme?: ThemeId;
}

export default function ShareButtons({ 
  url: propUrl, 
  receiverName, 
  senderName, 
  message, 
  theme = 'moon' 
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (propUrl) return propUrl;
    return generateShareUrl({
      to: receiverName,
      from: senderName,
      msg: message,
      theme,
    });
  };

  const shareText = `🌙 ${receiverName}, you received a special Eid Mubarak wish from ${senderName}! ✨\n\nClick to view your personalized greeting: `;

  const handleWhatsApp = () => {
    const url = getShareUrl();
    const text = shareText + url;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleFacebook = () => {
    const url = getShareUrl();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleMessenger = () => {
    const url = getShareUrl();
    window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=&redirect_uri=${encodeURIComponent(url)}`, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      const url = getShareUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied! Share it with your loved ones 🌙', {
        style: {
          background: '#1a1a1a',
          color: '#ffd700',
          border: '1px solid #d4af37',
        },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const shareButtons = [
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      handler: handleWhatsApp,
      className: 'bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg shadow-green-500/20',
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      handler: handleFacebook,
      className: 'bg-[#1877F2] hover:bg-[#166FE5] text-white shadow-lg shadow-blue-500/20',
    },
    {
      name: 'Messenger',
      icon: <MessageCircle className="w-5 h-5" />,
      handler: handleMessenger,
      className: 'bg-gradient-to-r from-[#00B2FF] to-[#006AFF] hover:from-[#009FE6] hover:to-[#005ECC] text-white shadow-lg shadow-blue-400/20',
    },
  ];

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
        <div className="flex items-center gap-2 text-white/60">
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium">Share this Eid wish</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-3 gap-3">
        {shareButtons.map((btn, index) => (
          <motion.div
            key={btn.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              onClick={btn.handler}
              className={`w-full py-5 rounded-xl font-medium transition-all duration-300 ${btn.className}`}
            >
              <span className="mr-2">{btn.icon}</span>
              {btn.name}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Copy link button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Button
          onClick={handleCopyLink}
          variant="outline"
          className={`w-full py-5 rounded-xl font-medium transition-all duration-300 ${
            copied
              ? 'bg-green-500/20 border-green-400/50 text-green-400'
              : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
          }`}
        >
          {copied ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center"
            >
              <Check className="w-5 h-5 mr-2" />
              Link Copied!
            </motion.div>
          ) : (
            <>
              <Copy className="w-5 h-5 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
