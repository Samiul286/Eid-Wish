export type ThemeId = 'moon' | 'mosque' | 'fireworks' | 'golden' | 'love';
export type MusicId = 'rahmatun' | 'qusad';

export interface WishParams {
  senderName: string;
  receiverName: string;
  message: string;
  theme: ThemeId;
  music?: MusicId;
}

export const DEFAULT_MESSAGE = "May Allah bless you and your family with happiness, peace, and prosperity on this blessed occasion of Eid. Eid Mubarak! 🌙✨";

// Music configurations
export const musicOptions: Record<MusicId, {
  id: MusicId;
  name: string;
  file: string;
  description: string;
}> = {
  rahmatun: {
    id: 'rahmatun',
    name: "Rahmatun Lil'Alameen",
    file: '/eid-music.mp3',
    description: 'Peaceful and spiritual melody',
  },
  qusad: {
    id: 'qusad',
    name: 'Qusad Einy',
    file: '/eid-music2.mp3',
    description: 'Uplifting and joyful tune',
  },
};

export const DEFAULT_MUSIC: MusicId = 'rahmatun';

// Theme configurations
export const themes: Record<ThemeId, {
  id: ThemeId;
  name: string;
  emoji: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  previewGradient: string;
}> = {
  moon: {
    id: 'moon',
    name: 'Islamic Moon',
    emoji: '🌙',
    description: 'Majestic night sky with golden crescent moon, twinkling stars, and Islamic patterns',
    colors: {
      primary: '#0d1b2a',
      secondary: '#1a237e',
      accent: '#ffd700',
      background: '#000510',
      text: '#ffffff',
    },
    previewGradient: 'from-[#000510] via-[#1a237e] to-[#3949ab]',
  },
  mosque: {
    id: 'mosque',
    name: 'Mosque',
    emoji: '🕌',
    description: 'Majestic sunset silhouette with floating lanterns and Islamic architecture',
    colors: {
      primary: '#6b2a18',
      secondary: '#d46030',
      accent: '#DAA520',
      background: '#1a0a05',
      text: '#ffffff',
    },
    previewGradient: 'from-[#1a0a05] via-[#d46030] to-[#f5c070]',
  },
  fireworks: {
    id: 'fireworks',
    name: 'Fireworks',
    emoji: '🎆',
    description: 'Dazzling celebration with neon bursts, sparkles, and vibrant colorful explosions',
    colors: {
      primary: '#1a1a40',
      secondary: '#2a2a55',
      accent: '#ff00ff',
      background: '#050510',
      text: '#ffffff',
    },
    previewGradient: 'from-[#050510] via-[#1a1a40] to-[#ff00ff]',
  },
  golden: {
    id: 'golden',
    name: 'Golden Luxury',
    emoji: '🌟',
    description: 'Elegant royal design with shimmering gold, ornate frames, and luxurious typography',
    colors: {
      primary: '#daa520',
      secondary: '#ffd700',
      accent: '#ffd700',
      background: '#0a0806',
      text: '#ffd700',
    },
    previewGradient: 'from-[#0a0806] via-[#241c14] to-[#ffd700]',
  },
  love: {
    id: 'love',
    name: 'Love',
    emoji: '💖',
    description: 'Dreamy twilight gradient with floating rose petals, hearts, and romantic sparkles',
    colors: {
      primary: '#a84a6b',
      secondary: '#c85a7a',
      accent: '#ffd700',
      background: '#1a0a14',
      text: '#ffffff',
    },
    previewGradient: 'from-[#1a0a14] via-[#6b2d5c] to-[#e8788a]',
  },
};

// View counter using localStorage
export function getViewCount(id: string): number {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(`wish_views_${id}`);
  return stored ? parseInt(stored, 10) : 0;
}

export function incrementViewCount(id: string): number {
  if (typeof window === 'undefined') return 0;
  const current = getViewCount(id);
  const newCount = current + 1;
  localStorage.setItem(`wish_views_${id}`, newCount.toString());
  return newCount;
}

// Generate wish ID from params
export function generateWishId(to: string, from: string): string {
  return `${to}-${from}`.toLowerCase().replace(/\s+/g, '-');
}

// Generate shareable URL
export function generateShareUrl(params: {
  to: string;
  from: string;
  msg?: string;
  theme: ThemeId;
  music?: MusicId;
}): string {
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}`
    : '';
  
  const urlParams = new URLSearchParams();
  urlParams.set('to', encodeURIComponent(params.to));
  urlParams.set('from', encodeURIComponent(params.from));
  if (params.msg && params.msg !== DEFAULT_MESSAGE) {
    urlParams.set('msg', encodeURIComponent(params.msg));
  }
  urlParams.set('theme', params.theme);
  if (params.music) {
    urlParams.set('music', params.music);
  }
  
  return `${baseUrl}/?${urlParams.toString()}`;
}
