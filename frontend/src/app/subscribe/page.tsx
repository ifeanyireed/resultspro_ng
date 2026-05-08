'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, MapPin, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const NIGERIA_STATES = {
  "Lagos": ["Ikeja", "Badagry", "Epe", "Ikorodu", "Lagos Island", "Lagos Mainland"],
  "Abuja (FCT)": ["Gwagwalada", "Kuje", "Abuja Municipal", "Bwari", "Kwali"],
  "Kano": ["Kano Municipal", "Dala", "Fagge", "Gwale", "Tarauni", "Nasarawa"],
  "Rivers": ["Port Harcourt", "Obio-Akpor", "Okrika", "Eleme", "Oyigbo"],
  "Oyo": ["Ibadan North", "Ibadan South", "Egbeda", "Olorunsogo"],
  // Add more as needed or keep it simple for now
};

export default function SubscribePage() {
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    state: '',
    lga: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const lgas = useMemo(() => {
    return formData.state ? NIGERIA_STATES[formData.state as keyof typeof NIGERIA_STATES] || [] : [];
  }, [formData.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('http://localhost:8080/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage('Network error. Please check your connection.');
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 md:p-10 relative overflow-hidden">
      {/* Premium Background Background */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[150px] rounded-full" />

      <div className="w-full max-w-xl relative z-10">
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-10 md:p-14 rounded-[4rem] border-white/10"
            >
              <header className="mb-10 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none mb-4">
                  Stay <span className="text-primary">Connected</span>
                </h1>
                <p className="text-gray-500 font-bold text-sm">Join the Scholars.ng community for the latest education insights.</p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-2xl flex items-center gap-3 text-sm font-bold">
                    <AlertCircle className="w-5 h-5" />
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full glass bg-white/[0.03] border-white/10 rounded-2xl pl-14 pr-6 py-5 outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full glass bg-white/[0.03] border-white/10 rounded-2xl pl-14 pr-6 py-5 outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">State</label>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                      <select 
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value, lga: '' })}
                        className="w-full glass bg-white/[0.03] border-white/10 rounded-2xl pl-12 pr-4 py-5 outline-none focus:border-primary/50 appearance-none cursor-pointer text-sm"
                      >
                        <option value="">Select State</option>
                        {Object.keys(NIGERIA_STATES).map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">LGA</label>
                    <div className="relative">
                      <select 
                        required
                        disabled={!formData.state}
                        value={formData.lga}
                        onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                        className="w-full glass bg-white/[0.03] border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-primary/50 appearance-none cursor-pointer text-sm disabled:opacity-50"
                      >
                        <option value="">Select LGA</option>
                        {lgas.map(lga => (
                          <option key={lga} value={lga}>{lga}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: '#00C853' }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'loading'}
                  className="w-full bg-primary text-background py-6 rounded-3xl font-black text-xs uppercase tracking-widest mt-4 shadow-[0_20px_40px_-10px_rgba(0,200,83,0.3)] flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Subscribe Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 md:p-16 rounded-[4rem] border-white/10 text-center"
            >
              <div className="w-24 h-24 bg-primary rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-[0_20px_40px_-10px_rgba(0,200,83,0.3)]">
                <CheckCircle2 className="w-12 h-12 text-background" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-black mb-6 uppercase tracking-tighter leading-none">
                Welcome to the <span className="text-primary">Family!</span>
              </h1>
                <p className="text-gray-500 font-bold text-sm leading-relaxed mb-12">
                  Thank you for subscribing! You&apos;re now on our list and will be among the first to receive our latest updates and education news.
                </p>
              <Link href="/" className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest transition-all">
                Return Home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
