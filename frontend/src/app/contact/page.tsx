'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  MessageCircle, 
  Globe, 
  Camera, 
  Share2, 
  Send, 
  HelpCircle, 
  Target, 
  Users, 
  Zap,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('http://localhost:8080/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ fullName: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const faqs = [
    {
      q: "How do I earn coins in ExamsPRO?",
      a: "You earn coins by answering questions correctly (1 coin per MCQ), maintaining daily streaks (15 coins for 7 days), and referring friends (25 coins each)."
    },
    {
      q: "What is the Pro Plan?",
      a: "The Pro Plan gives you unlimited access to all subjects, 500 monthly bonus coins, AI-powered explanations for all questions, and early access to live tournaments."
    },
    {
      q: "Can I use ResultsPRO offline?",
      a: "Currently, ResultsPRO requires an active internet connection to sync your progress, update coin balances, and enable real-time battle mode."
    },
    {
      q: "How do I withdraw my earnings?",
      a: "Once you accumulate at least 10,000 coins, you can request a payout to your bank account via the Payout dashboard."
    }
  ];

  return (
    <main className="min-h-screen text-foreground overflow-hidden font-body">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,200,83,0.05)_0,transparent_70%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Side: Contact Info & Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass border-primary/10 text-[11px] font-bold tracking-[0.2em] text-primary mb-10 uppercase">
                <HelpCircle className="w-3.5 h-3.5" />
                Support & Infrastructure
              </div>
              
              <h1 className="heading-premium text-5xl md:text-8xl mb-8">
                Let&apos;s <span className="text-primary">Connect.</span>
              </h1>
              
              <p className="text-muted text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
                ResultsProNG is West Africa&apos;s leading education infrastructure. 
                Whether you&apos;re a student using ResultsPRO or a school deploying ClassroomPRO, 
                our team is here to support your journey.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 rounded-3xl glass border-foreground/5 hover:border-primary/20 transition-all group">
                  <Target className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-foreground font-bold mb-1 font-display uppercase tracking-tight">Our Mission</h4>
                  <p className="text-muted text-[10px] font-black leading-relaxed uppercase tracking-widest">Gamify excellence for every student.</p>
                </div>
                <div className="p-6 rounded-3xl glass border-foreground/5 hover:border-blue/20 transition-all group">
                  <Users className="w-8 h-8 text-blue mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-foreground font-bold mb-1 font-display uppercase tracking-tight">Our Community</h4>
                  <p className="text-muted text-[10px] font-black leading-relaxed uppercase tracking-widest">50K+ Active students & counting.</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl glass-green flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-1">Email Support</p>
                    <p className="text-xl font-display font-bold text-foreground tracking-tight">hello@resultspro.ng</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl glass border border-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <MessageCircle className="w-6 h-6 text-blue" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-1">WhatsApp Chat</p>
                    <a 
                      href="https://wa.me/message/JYMZWFDPVSCIF1" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xl font-display font-bold text-foreground tracking-tight hover:text-primary transition-colors"
                    >
                      Chat with us — LIVE
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Contact Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-10 md:p-14 rounded-[3.5rem] border-foreground/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-16 bg-primary/5 rounded-full blur-[100px] -mr-24 -mt-24" />
              
              <h3 className="font-display text-3xl text-foreground font-black mb-10 tracking-tighter leading-none relative z-10 uppercase">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-4">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full glass border-foreground/10 rounded-2xl px-6 py-4 text-foreground focus:border-primary/50 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-4">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@school.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full glass border-foreground/10 rounded-2xl px-6 py-4 text-foreground focus:border-primary/50 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-4">Subject</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full glass border-foreground/10 rounded-2xl px-6 py-4 text-foreground focus:border-primary/50 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option>General Inquiry</option>
                    <option>School Demo Request</option>
                    <option>Investment Opportunity</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-4">Message</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full glass border-foreground/10 rounded-2xl px-6 py-4 text-foreground focus:border-primary/50 transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: '#00E65F' }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'loading'}
                  className="w-full bg-primary text-background py-5 rounded-2xl font-black transition-all shadow-[0_20px_40px_-12px_rgba(0,200,83,0.3)] text-lg flex items-center justify-center gap-3 group uppercase tracking-widest disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
                
                {status === 'success' && <p className="text-primary text-center font-bold uppercase tracking-widest text-xs">Message sent successfully!</p>}
                {status === 'error' && <p className="text-red-500 text-center font-bold uppercase tracking-widest text-xs">Failed to send message. Please try again.</p>}
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-16 border-t border-foreground/5 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="heading-premium text-4xl md:text-6xl mb-4">Common <span className="text-primary">Questions</span></h2>
            <p className="text-muted font-bold text-[10px] uppercase tracking-[0.4em] italic">Quick answers to help you get started</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="glass rounded-3xl border-foreground/5 overflow-hidden transition-all duration-500"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left hover:bg-foreground/[0.02] transition-colors"
                >
                  <h4 className="text-foreground font-bold text-lg font-display uppercase tracking-tight flex items-start gap-4">
                    <span className="text-primary opacity-50">Q.</span>
                    {faq.q}
                  </h4>
                  <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-500 ${openFaq === i ? 'rotate-180 text-primary' : ''}`} />
                </button>
                <motion.div 
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="p-8 pt-0 text-muted text-lg leading-relaxed border-t border-foreground/5">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-foreground/[0.01] border-y border-foreground/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl glass-green mx-auto flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-foreground font-bold uppercase tracking-widest text-sm">Safe & Secure</h4>
              <p className="text-muted text-xs font-medium">Enterprise-grade encryption for all school and student data.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl glass mx-auto flex items-center justify-center">
                <Zap className="w-6 h-6 text-amber" />
              </div>
              <h4 className="text-foreground font-bold uppercase tracking-widest text-sm">Fast Response</h4>
              <p className="text-muted text-xs font-medium">Our support team typically responds within 2-4 hours.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl glass mx-auto flex items-center justify-center">
                <Camera className="w-6 h-6 text-blue" />
              </div>
              <h4 className="text-foreground font-bold uppercase tracking-widest text-sm">Social Community</h4>
              <p className="text-muted text-xs font-medium">Join 50,000+ students on our social platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-like Vision Statement */}
      <footer className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted font-display font-black text-[10px] uppercase tracking-[0.4em] mb-8">ResultsProNG Infrastructure</p>
          <div className="flex flex-wrap justify-center gap-8 mb-12 text-muted font-black text-[10px] uppercase tracking-[0.2em]">
            <span className="hover:text-primary transition-colors cursor-pointer">ClassroomPRO</span>
            <span className="hover:text-primary transition-colors cursor-pointer">ExamsPRO</span>
            <span className="hover:text-primary transition-colors cursor-pointer">TutorsPRO</span>
            <span className="hover:text-primary transition-colors cursor-pointer">ResultsPRO</span>
          </div>
          <div className="flex justify-center gap-6">
            <Globe className="w-5 h-5 text-muted hover:text-foreground transition-colors cursor-pointer" />
            <Camera className="w-5 h-5 text-muted hover:text-foreground transition-colors cursor-pointer" />
            <Share2 className="w-5 h-5 text-muted hover:text-foreground transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>
    </main>
  );
}
