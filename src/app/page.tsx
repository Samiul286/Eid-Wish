'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import GreetingPage from '@/components/GreetingPage';
import LandingPage from '@/components/LandingPage';
import { ThemeId, DEFAULT_MESSAGE } from '@/types/wish';

function MainContent() {
  const searchParams = useSearchParams();
  
  // Check if this is a greeting view (has URL parameters)
  const to = searchParams.get('to');
  const from = searchParams.get('from');
  const msg = searchParams.get('msg');
  const theme = searchParams.get('theme') as ThemeId | null;
  
  // If we have the required parameters, show greeting page
  if (to && from) {
    return (
      <GreetingPage
        receiverName={decodeURIComponent(to)}
        senderName={decodeURIComponent(from)}
        message={msg ? decodeURIComponent(msg) : DEFAULT_MESSAGE}
        theme={theme || 'moon'}
      />
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
