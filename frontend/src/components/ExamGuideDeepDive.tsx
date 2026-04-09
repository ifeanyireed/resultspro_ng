'use client';

import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';

export default function ExamGuideDeepDive() {
  const features = [
    "WAEC / NECO / JAMB / SAT / GRE / IELTS prep",
    "Gamified coin system & student battle mode",
    "AI-powered step-by-step explanations",
    "Continental leaderboards for top performers",
    "Mobile-first, optimized for low data usage"
  ];

  return (
    <section className="relative min-h-screen py-32 px-6 md:px-16 overflow-hidden bg-[#05090C] flex items-center border-t border-white/[0.03]">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-amber-brown/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:order-2"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass border-gold/10 text-[10px] font-black tracking-[0.2em] text-gold mb-10 uppercase font-display">
            Product 02
          </div>
          <h2 className="heading-premium text-5xl md:text-8xl mb-12">
            Exams Guide
          </h2>
          
          <ul className="space-y-8 mb-16">
            {features.map((feature, i) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-5 text-gray-400 text-lg md:text-xl font-body"
              >
                <div className="p-1 bg-gold/10 rounded-full border border-gold/20">
                  <Star className="w-5 h-5 text-gold fill-gold/20" />
                </div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          <div className="group inline-flex items-center gap-3 glass-gold px-8 py-4 rounded-2xl text-gold font-black text-lg tracking-tight font-display hover:bg-gold hover:text-background transition-all duration-500 cursor-pointer">
            exams.resultspro.ng — LIVE
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:order-1"
        >
          <div className="glass p-10 md:p-16 rounded-[3.5rem] border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 bg-gold/5 rounded-full blur-3xl" />
            
            <h3 className="font-display text-3xl md:text-5xl text-white font-black mb-12 tracking-tighter leading-none">
              From the Classroom to the Continent
            </h3>
            
            <div className="glass-gold p-10 mb-12 rounded-[2.5rem] border-l-4 border-gold relative z-10">
              <h4 className="text-gold font-display font-black text-xl mb-4 tracking-tight">"The Recognition Engine"</h4>
              <p className="text-gray-400 text-lg leading-relaxed font-body">
                Leaderboards, badges, and live competitions create viral visibility for 
                high-performing students in underrepresented communities. We make achievement social.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-16 relative z-10">
              {["WAEC", "NECO", "JAMB"].map((exam) => (
                <span key={exam} className="glass-gold text-gold px-6 py-2 rounded-xl font-black text-[11px] font-display tracking-[0.1em] border-gold/10">
                  {exam}
                </span>
              ))}
              {["SAT", "GRE", "IELTS"].map((exam) => (
                <span key={exam} className="glass-green text-primary px-6 py-2 rounded-xl font-black text-[11px] font-display tracking-[0.1em] border-primary/10">
                  {exam}
                </span>
              ))}
            </div>

            <p className="text-gray-500 text-lg font-body flex items-center gap-4 border-t border-white/5 pt-10">
              <strong className="text-white font-display uppercase tracking-widest text-[10px] bg-white/5 px-3 py-1 rounded">Engagement Model</strong>
              B2C Freemium + B2B school licenses
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
