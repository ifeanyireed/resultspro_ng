'use client';

import { motion } from 'framer-motion';

export default function TheAsk() {
  const funds = [
    { percent: "35%", label: "EduNode R&D", desc: "Hardening hardware and building the data bridge." },
    { percent: "30%", label: "Engineering", desc: "Scaling platforms for high-volume regional traffic." },
    { percent: "20%", label: "Sales & Marketing", desc: "Expanding school adoption across 10 Nigerian states." },
    { percent: "15%", label: "Operations", desc: "Logistics, support, and regional team building." }
  ];

  const milestones = ["Q2: 50 Schools", "Q3: 100 Schools", "Q4: State Pilot", "2027: Continental"];

  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden bg-background border-t border-foreground/[0.03]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-16 mb-32">
          <div className="lg:w-2/3">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-[0.3em] text-[11px] mb-8 uppercase font-display block"
            >
              The Funding
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-premium text-4xl md:text-8xl mb-8"
            >
              Seed Funding to <br />Scale Nigeria.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-muted text-xl font-body leading-relaxed max-w-xl"
            >
              We are seeking mission-aligned impact investors to help us close the education 
              data gap and empower the next generation of African talent.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-gold p-12 md:p-16 rounded-[4rem] text-center lg:text-left min-w-[320px] border-gold/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-16 bg-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-gold font-black tracking-[0.2em] mb-4 uppercase font-display text-xs opacity-70">Raising</p>
            <div className="text-foreground text-6xl md:text-8xl font-black font-display tracking-tighter leading-none">$500K</div>
            <p className="text-muted font-black text-xl mt-4 font-display uppercase tracking-tight">Seed Round</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-32">
          {funds.map((fund, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-10 rounded-[2.5rem] border-foreground/5 hover:bg-foreground/[0.02] transition-all duration-500 h-full flex flex-col group"
            >
              <div className="text-gold text-4xl md:text-5xl font-black mb-6 font-display tracking-tighter group-hover:scale-105 transition-transform">{fund.percent}</div>
              <h4 className="text-foreground font-black text-xl mb-3 font-display tracking-tight leading-none">{fund.label}</h4>
              <p className="text-muted text-base font-body leading-relaxed">{fund.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative glass p-12 md:p-20 rounded-[4rem] border-foreground/5 overflow-hidden">
          <div className="absolute top-1/2 left-10 right-10 h-px bg-foreground/5" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {milestones.map((milestone, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative pt-10"
              >
                <div className="absolute top-[-4.5px] left-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_0_rgba(0,200,83,0.8)]" />
                <p className="text-muted font-display font-black tracking-tight text-xs uppercase mb-2">Milestone {i+1}</p>
                <p className="text-foreground font-display font-black text-xl md:text-2xl tracking-tight leading-none">{milestone}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
