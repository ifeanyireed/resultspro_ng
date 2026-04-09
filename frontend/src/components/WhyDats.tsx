'use client';

import { motion } from 'framer-motion';

export default function WhyDats() {
  const cards = [
    { title: "Underrepresented Populations", desc: "Our core focus is the 71% of schools often ignored by standard SaaS platforms." },
    { title: "Government Data Infrastructure", desc: "We provide the edge computing and data pipelines required for national digital transformation." },
    { title: "AI for Public Good", desc: "Using AI not just for answers, but for deep academic insight and equitable performance tracking." },
    { title: "Scalable Without Connectivity", desc: "We solved the 'internet gap' with EduNode, making digital equity a practical reality." }
  ];

  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden bg-[#05090C] border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col mb-24 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.3em] text-[11px] mb-8 uppercase font-display"
          >
            The Rationale
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-premium text-4xl md:text-8xl mb-8 leading-none"
          >
            Built for Exactly What You Fund.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-12 md:p-16 rounded-[3rem] hover:bg-white/[0.05] transition-all duration-700 group cursor-default border-white/5"
            >
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 group-hover:text-primary transition-colors font-display tracking-tight leading-none">{card.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed font-body">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-green py-14 px-6 md:px-16 text-center border-y border-primary/10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,200,83,0.05)_0,transparent_70%)]" />
        <p className="text-white text-2xl md:text-4xl font-black italic tracking-tighter leading-tight font-display max-w-5xl mx-auto relative z-10">
          "Our mission is to ensure that no child’s potential is lost to the lack of a data point."
        </p>
      </motion.div>
    </section>
  );
}
