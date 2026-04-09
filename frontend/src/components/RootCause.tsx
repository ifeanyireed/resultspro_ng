'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export default function RootCause() {
  return (
    <section className="relative bg-[#05090C] py-32 px-6 md:px-16 overflow-hidden">
      {/* Structural Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-primary font-bold tracking-[0.3em] text-[11px] mb-8 block uppercase font-display">
            The Insight
          </span>
          <h2 className="heading-premium text-4xl md:text-7xl mb-12">
            Recognition is the Missing Lever
          </h2>
          <div className="space-y-8 text-gray-400 text-xl leading-relaxed font-body max-w-xl">
            <p>
              Billions invested in infrastructure, meals, and scholarships haven't fixed motivation — 
              because the student who scores 94% in a public school in Kano has never been seen 
              beyond those walls.
            </p>
            <motion.p 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-light-green italic font-medium text-2xl tracking-tight leading-snug border-l-2 border-primary/30 pl-10 py-2"
            >
              "Recognition doesn't just reward achievement — it creates aspirational pull for entire communities. 
              No amount of funding replicates this."
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center relative"
        >
          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] rounded-full glass-gold flex items-center justify-center group overflow-hidden border-gold/10">
            {/* Spinning decorative orbit */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border border-gold/10 rounded-full border-dashed"
            />
            
            <div className="relative z-10 flex flex-col items-center">
              <Trophy className="w-24 h-24 text-gold mb-10 group-hover:scale-110 transition-transform duration-700 drop-shadow-[0_0_30px_rgba(232,168,56,0.3)]" />
              <p className="italic text-gold text-2xl md:text-3xl font-black text-center max-w-xs leading-none tracking-tighter uppercase font-display px-6">
                "The most underutilized lever in African education"
              </p>
            </div>
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,168,56,0.1)_0,transparent_70%)]" />
          </div>
          
          {/* Subtle floating background glow */}
          <div className="absolute -z-10 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[140px] animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
