'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center px-6 md:px-16 py-24 overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] bg-blue/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--foreground),transparent_98%)_0,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-16 relative z-10">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ultra-Refined Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass border-foreground/10 text-[11px] font-bold tracking-[0.2em] text-primary mb-10 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Education Operating System
            </div>

            <h1 className="heading-premium text-6xl md:text-[110px] mb-8">
              ResultsPro<span className="text-primary">.ng</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-light-green text-xl md:text-3xl font-medium tracking-tight mb-8 max-w-2xl leading-tight"
            >
              One OS for Learning, Engagement, Teaching & Intelligence.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-muted text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-body"
            >
              The intelligent infrastructure for modern schools. 
              We bridge the education gap with ClassroomPRO, ExamsPRO, TutorsPRO, and ResultsPRO.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-wrap gap-5"
            >
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: '#00E65F' }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-background px-10 py-5 rounded-2xl font-black transition-all shadow-[0_20px_40px_-12px_rgba(0,200,83,0.3)] text-lg flex items-center gap-3 group"
              >
                View the Pitch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass px-10 py-5 rounded-2xl text-foreground font-bold transition-all text-lg border-foreground/10 hover:bg-foreground/5"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center relative">
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5 w-full max-w-[320px]"
          >
            {[
              { name: "ClassroomPRO", color: "text-blue", glass: "glass" },
              { name: "ExamsPRO", color: "text-gold", glass: "glass" },
              { name: "TutorsPRO", color: "text-purple-400", glass: "glass" },
              { name: "ResultsPRO", color: "text-primary", glass: "glass" }
            ].map((item, i) => (
              <motion.div
                key={item.name}
                whileHover={{ x: -10 }}
                className={`${item.glass} p-6 rounded-[2rem] ${item.color} font-black text-xl tracking-tighter flex items-center justify-between group cursor-default`}
              >
                {item.name}
                <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Abstract geometric focus element */}
          <div className="absolute -z-10 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[80px]" />
        </div>
      </div>
    </section>
  );
}
