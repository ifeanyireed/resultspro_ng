'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ResultsProDeepDive() {
  const features = [
    "Automated computation & report cards",
    "Parent portal — instant result access",
    "Teacher-parent direct messaging",
    "AI analytics: student, class & subject",
    "Multi-school & regional reporting"
  ];

  return (
    <section className="relative min-h-screen py-32 px-6 md:px-16 overflow-hidden bg-[#05090C] flex items-center border-t border-white/[0.03]">
      {/* Refined Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass border-primary/10 text-[10px] font-black tracking-[0.2em] text-primary mb-10 uppercase font-display">
            Product 01
          </div>
          <h2 className="heading-premium text-5xl md:text-8xl mb-12">
            ResultsPRO
          </h2>
          
          <ul className="space-y-8 mb-16">
            {features.map((feature, i) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-5 text-gray-400 text-lg md:text-xl font-body"
              >
                <div className="p-1 bg-primary/10 rounded-full border border-primary/20">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          <div className="group inline-flex items-center gap-3 glass-green px-8 py-4 rounded-2xl text-primary font-black text-lg tracking-tight font-display hover:bg-primary hover:text-background transition-all duration-500 cursor-pointer">
            resultspro.ng — LIVE
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass p-10 md:p-16 rounded-[3.5rem] border-white/5 relative overflow-hidden group">
            {/* Subtle internal glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <h3 className="font-display text-3xl md:text-5xl text-white font-black mb-12 tracking-tighter leading-none">
              The Window Parents Never Had
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { val: "3 min", label: "to generate results" },
                { val: "100%", label: "mobile-accessible" },
                { val: "Live", label: "AI-driven analytics" }
              ].map((stat, i) => (
                <div key={i} className="glass-green p-6 rounded-3xl text-center border-primary/5">
                  <div className="text-primary text-3xl font-black mb-1 font-display tracking-tighter leading-none">{stat.val}</div>
                  <div className="text-[10px] text-gray-500 uppercase font-black tracking-[0.1em] font-display">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-8 text-gray-400 text-lg mb-16 font-body leading-relaxed">
              <p><strong className="text-white font-display uppercase tracking-wider text-sm mr-2">Target Market</strong> Private and public K-12 schools seeking data-driven efficiency.</p>
              <p><strong className="text-white font-display uppercase tracking-wider text-sm mr-2">Revenue</strong> Annual per-student SaaS subscription + premium reporting modules.</p>
            </div>

            <div className="glass-green p-10 text-primary italic text-xl border-l-4 border-primary rounded-r-[2rem] font-display leading-[1.4] tracking-tight bg-primary/[0.02]">
              "We aren't just digitizing records; we're creating the first reliable data bridge between the school gate and the kitchen table."
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
