// Client-side utility functions for wish management
// All data is stored in URL parameters and localStorage for view counts

import { ThemeId, DEFAULT_MESSAGE } from '@/types/wish';

// View counter using localStorage
export function getViewCount(id: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const stored = localStorage.getItem(`wish_views_${id}`);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

export function incrementViewCount(id: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const current = getViewCount(id);
    const newCount = current + 1;
    localStorage.setItem(`wish_views_${id}`, newCount.toString());
    return newCount;
  } catch {
    return 1;
  }
}

// Generate wish ID from params (for view counting)
export function generateWishId(to: string, from: string): string {
  return `${to}-${from}`.toLowerCase().replace(/\s+/g, '-');
}

// Generate shareable URL with query parameters
export function generateShareUrl(params: {
  to: string;
  from: string;
  msg?: string;
  theme: ThemeId;
}): string {
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}`
    : '';
  
  const urlParams = new URLSearchParams();
  urlParams.set('to', params.to);
  urlParams.set('from', params.from);
  if (params.msg && params.msg !== DEFAULT_MESSAGE) {
    urlParams.set('msg', params.msg);
  }
  urlParams.set('theme', params.theme);
  
  return `${baseUrl}/?${urlParams.toString()}`;
}

// Parse wish from URL parameters
export function parseWishFromUrl(searchParams: URLSearchParams): {
  receiverName: string;
  senderName: string;
  message: string;
  theme: ThemeId;
} | null {
  const to = searchParams.get('to');
  const from = searchParams.get('from');
  const msg = searchParams.get('msg');
  const theme = searchParams.get('theme') as ThemeId | null;
  
  if (!to || !from) return null;
  
  return {
    receiverName: decodeURIComponent(to),
    senderName: decodeURIComponent(from),
    message: msg ? decodeURIComponent(msg) : DEFAULT_MESSAGE,
    theme: theme || 'moon',
  };
}
