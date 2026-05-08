'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('http://localhost:8080/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: 'Web Subscriber' }),
      });
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="py-32 px-6 md:px-16 border-t border-foreground/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-64 bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      
      <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[4rem] border-foreground/5 relative z-10 text-center">
        <div className="w-16 h-16 rounded-3xl glass-green mx-auto flex items-center justify-center mb-8">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        
        <h2 className="heading-premium text-4xl md:text-6xl mb-6">Join the <span className="text-primary">Inner Circle</span></h2>
        <p className="text-muted text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
          Get exclusive updates on new features, educational trends, and the future of ScholarsNG.
        </p>

        <form onSubmit={handleSubscribe} className="max-w-md mx-auto relative group">
          <input 
            type="email" 
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full glass border-foreground/10 rounded-2xl px-8 py-5 text-foreground focus:border-primary/50 transition-all outline-none"
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status === 'loading'}
            className="absolute right-2 top-2 bottom-2 bg-primary text-background px-6 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            {status === 'loading' ? '...' : <Send className="w-4 h-4" />}
          </motion.button>
        </form>
        
        {status === 'success' && <p className="mt-4 text-primary font-bold text-xs uppercase tracking-widest animate-pulse">Welcome to the family!</p>}
        {status === 'error' && <p className="mt-4 text-red-500 font-bold text-xs uppercase tracking-widest">Something went wrong. Try again?</p>}
        
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted italic">Join 5,000+ students & educators</p>
      </div>
    </section>
  );
}
