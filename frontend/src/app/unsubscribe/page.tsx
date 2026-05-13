'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ShieldCheck, AlertCircle, Loader2, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUnsubscribe = async () => {
    if (!email) return;
    
    setStatus('loading');
    try {
      const response = await fetch('http://localhost:8080/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to unsubscribe. Please try again later.');
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage('A network error occurred. Please check your connection.');
      setStatus('error');
    }
  };

  if (!email) {
    return (
      <div className="glass p-12 rounded-[3.5rem] border-white/10 text-center max-w-xl mx-auto">
        <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-display font-black mb-4 uppercase tracking-tighter">Invalid <span className="text-primary">Link</span></h1>
        <p className="text-gray-500 font-bold text-sm leading-relaxed mb-10">We couldn&apos;t find an email address associated with this request. Please use the link provided in your email footer.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
          <ArrowLeft className="w-4 h-4" /> Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass p-12 md:p-16 rounded-[4rem] border-white/10 text-center"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 group">
              <Mail className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black mb-6 uppercase tracking-tighter leading-none">
              Leaving so <span className="text-primary">Soon?</span>
            </h1>
            <p className="text-gray-500 font-bold text-sm leading-relaxed mb-4">
              We&apos;re sorry to see you go. If you unsubscribe, you&apos;ll stop receiving updates from ResultsPro.ng.
            </p>
            <div className="glass bg-white/5 py-4 px-6 rounded-2xl mb-12 border-white/5 inline-block mx-auto">
              <p className="text-xs font-black uppercase tracking-widest text-primary">{email}</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#00C853' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUnsubscribe}
                className="w-full bg-primary/20 border border-primary/30 text-primary hover:text-background py-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all"
              >
                Confirm Unsubscribe
              </motion.button>
              <Link href="/" className="text-gray-500 font-black text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors py-4">
                Wait, I want to stay!
              </Link>
            </div>
          </motion.div>
        )}

        {status === 'loading' && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-20 text-center"
          >
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-8" />
            <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Processing request...</p>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-12 md:p-16 rounded-[4rem] border-white/10 text-center"
          >
            <div className="w-24 h-24 bg-primary rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-[0_20px_40px_-10px_rgba(0,200,83,0.3)]">
              <ShieldCheck className="w-12 h-12 text-background" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black mb-6 uppercase tracking-tighter leading-none">
              Unsubscribed <span className="text-primary">Successfully</span>
            </h1>
            <p className="text-gray-500 font-bold text-sm leading-relaxed mb-12">
              You&apos;ve been removed from our mailing list. We&apos;ll miss you! You can always come back and subscribe again anytime.
            </p>
            <Link href="/" className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest transition-all">
              <Home className="w-4 h-4" /> Back to Home
            </Link>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div 
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-12 md:p-16 rounded-[4rem] border-red-500/10 text-center"
          >
            <div className="w-24 h-24 bg-red-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black mb-6 uppercase tracking-tighter leading-none text-red-500">
              Oops! <span className="text-white">Something Went Wrong</span>
            </h1>
            <p className="text-gray-500 font-bold text-sm leading-relaxed mb-12">
              {errorMessage}
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest transition-all"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 md:p-10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <Suspense fallback={<Loader2 className="w-12 h-12 text-primary animate-spin" />}>
        <UnsubscribeContent />
      </Suspense>
    </main>
  );
}
