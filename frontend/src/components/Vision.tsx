'use client';

import { motion } from 'framer-motion';

export default function Vision() {
  return (
    <section className="relative bg-background py-40 px-6 md:px-16 overflow-hidden min-h-screen flex flex-col justify-center border-t border-foreground/[0.03]">
      {/* High-End Decorative Elements */}
      <div className="absolute top-0 right-0 p-12 pointer-events-none hidden lg:block opacity-30">
        <div className="relative w-[600px] h-[600px]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] glass-green rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-24 right-24 w-[400px] h-[400px] glass-gold rounded-full blur-3xl delay-700 animate-pulse" />
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary via-gold to-transparent" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <h2 className="heading-premium text-6xl md:text-[140px] leading-[0.9] mb-16">
            Every Child <span className="text-primary">Seen.</span><br />
            Every School <span className="text-gold">Smart.</span><br />
            Every Decision <span className="text-foreground">Data-Driven.</span>
          </h2>
          
          <div className="space-y-10 text-muted font-body text-xl md:text-3xl leading-relaxed mb-20 max-w-4xl opacity-80">
            <p>
              Whether it’s the student in Katsina, the teacher in Rivers State, 
              or the ministry official in Abuja — we are building the infrastructure 
              to ensure no talent goes unrecognized and no decision is made in the dark.
            </p>
            <p className="text-gold font-display font-black italic tracking-tighter text-4xl md:text-6xl leading-none">&quot;Let&apos;s build this together.&quot;</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 pt-16 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-10"
        >
          <div className="font-display text-foreground text-3xl font-black tracking-[0.2em] uppercase">SCHOLARS<span className="text-primary">.NG</span></div>
          <div className="flex flex-col md:flex-row gap-12 text-muted font-display font-black text-xs uppercase tracking-[0.2em]">
            <a href="mailto:invest@scholars.ng" className="hover:text-gold transition-colors underline decoration-foreground/5 underline-offset-8">invest@scholars.ng</a>
            <a href="https://scholars.ng" className="hover:text-gold transition-colors underline decoration-foreground/5 underline-offset-8">scholars.ng</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
