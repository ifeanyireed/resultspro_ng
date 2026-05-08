'use client';

import { motion } from 'framer-motion';

export default function MarketOpportunity() {
  const stats = [
    { value: "40M+", label: "K-12 Students in Nigeria", accent: "text-primary" },
    { value: "$3.2B", label: "African EdTech 2030", accent: "text-gold" },
    { value: "180K+", label: "Regional Schools", accent: "text-blue" },
    { value: "4th", label: "Largest Global Pop. 2050", accent: "text-foreground" }
  ];

  const phases = [
    { 
      number: "01", 
      title: "Private High-Growth Schools", 
      desc: "Monetizing ResultsPRO and Exams Guide directly through per-student subscriptions.",
      accent: "border-primary/30"
    },
    { 
      number: "02", 
      title: "State Government Partnerships", 
      desc: "Deploying EduNode hardware at scale for regional data infrastructure and offline learning.",
      accent: "border-gold/30"
    },
    { 
      number: "03", 
      title: "Continental Expansion", 
      desc: "Aggregating Africa's largest verified academic data lake for institutional and impact investors.",
      accent: "border-blue/30"
    }
  ];

  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden bg-background border-t border-foreground/[0.03]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.3em] text-[11px] mb-8 uppercase font-display"
          >
            The Opportunity
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-premium text-4xl md:text-8xl max-w-4xl"
          >
            A Continent&apos;s Future, <br />Digitized.
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-8 rounded-[2rem] border-foreground/5 group hover:bg-foreground/[0.02] transition-all duration-500"
            >
              <div className={`${stat.accent} text-4xl md:text-5xl font-black mb-2 font-display tracking-tighter group-hover:scale-105 transition-transform duration-500`}>
                {stat.value}
              </div>
              <p className="text-muted text-[11px] font-black uppercase tracking-[0.1em] font-display">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass p-12 md:p-24 rounded-[4rem] border-foreground/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-[140px] -mr-32 -mt-32" />
          
          <h2 className="heading-premium text-3xl md:text-6xl mb-20 text-center relative z-10">Go-To-Market Strategy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative pl-12 border-l-2 ${phase.accent} group/phase`}
              >
                <span className="text-8xl font-black text-foreground/5 absolute -top-10 -left-6 font-display transition-colors group-hover/phase:text-foreground/10">{phase.number}</span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-foreground mb-6 font-display tracking-tight leading-none">{phase.title}</h3>
                  <p className="text-muted text-lg leading-relaxed font-body">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
