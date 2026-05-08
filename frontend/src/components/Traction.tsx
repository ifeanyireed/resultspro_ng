'use client';

import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

export default function Traction() {
  const products = [
    {
      name: "ResultsPRO Schools Results Manager",
      url: "resultspro.ng",
      bullets: [
        "Currently live in multiple private schools",
        "Over 5,000 students managed digitally",
        "95% teacher retention on the platform",
        "Parent engagement increased by 60%"
      ],
      accent: "text-primary"
    },
    {
      name: "ResultsPRO Exams Guide",
      url: "exams.resultspro.ng",
      bullets: [
        "Over 10,000 practice sessions conducted",
        "Live student battle mode successfully piloted",
        "Curriculum-aligned question bank built",
        "Integration with WAEC and JAMB patterns"
      ],
      accent: "text-gold"
    }
  ];

  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden bg-background border-t border-foreground/[0.03]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col mb-24 items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.3em] text-[11px] mb-8 uppercase font-display"
          >
            The Momentum
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-premium text-4xl md:text-8xl mb-12"
          >
            Traction & Pilots
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-12 md:p-16 rounded-[3.5rem] relative overflow-hidden group border-foreground/5"
            >
              <div className="absolute top-10 right-10 bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-black tracking-widest border border-primary/20 uppercase font-display">LIVE</div>
              <h3 className={`font-display text-3xl md:text-4xl font-black mb-4 leading-tight tracking-tight ${product.accent}`}>{product.name}</h3>
              <a href={`https://${product.url}`} className="text-muted font-medium mb-12 inline-flex items-center gap-2 hover:text-foreground transition-colors font-display tracking-tight text-lg underline decoration-foreground/10 underline-offset-8">
                {product.url} <ExternalLink className="w-4 h-4" />
              </a>

              <ul className="space-y-6 text-muted text-lg font-body">
                {product.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-4 group/item">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1 opacity-40 group-hover/item:opacity-100 transition-opacity" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="glass p-12 md:p-16 rounded-[3rem] border-blue/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-24 bg-blue/5 rounded-full blur-[120px]" />
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex flex-col">
              <div className="text-foreground text-3xl md:text-5xl font-black tracking-tighter font-display leading-none mb-4">EduNode Hardware Pilot</div>
              <p className="text-muted text-xl font-body italic">Pilot programs being discussed for expansion across Nigeria.</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gold text-background px-10 py-5 rounded-2xl font-black tracking-widest text-sm uppercase shadow-[0_20px_40px_-12px_rgba(232,168,56,0.3)] font-display"
            >
              Ready for Deployment
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
