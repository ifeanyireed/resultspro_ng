'use client';

import { motion } from 'framer-motion';
import { Users, Database, GraduationCap } from 'lucide-react';

export default function Problem() {
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      number: "244M+",
      label: "Children out of school across Sub-Saharan Africa",
      delay: 0.1
    },
    {
      icon: <Database className="w-6 h-6 text-primary" />,
      number: "71%",
      label: "Of Nigerian public schools lack digital systems",
      delay: 0.2
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
      number: "~40%",
      label: "WAEC failure rate — year after year",
      delay: 0.3
    }
  ];

  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden bg-[#05090C]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.3em] text-xs mb-6 uppercase font-display"
          >
            The Crisis
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-premium text-4xl md:text-7xl max-w-4xl"
          >
            Africa's Education Crisis Runs Deeper Than Funding
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: stat.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="glass p-10 rounded-[2.5rem] relative z-10 hover:bg-white/[0.05] transition-all duration-500 border-white/[0.05] h-full flex flex-col">
                <div className="mb-10 p-4 bg-primary/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>
                <div className="text-white text-6xl font-black mb-6 tracking-tighter font-display leading-none">
                  {stat.number}
                </div>
                <p className="text-gray-400 text-lg leading-relaxed font-body">
                  {stat.label}
                </p>
              </div>
              {/* Subtle underline glow */}
              <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quote Block - More Refined */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-32 max-w-5xl mx-auto"
      >
        <div className="glass-gold p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(232,168,56,0.05)_0,transparent_70%)]" />
          <p className="italic text-gold text-2xl md:text-4xl font-display leading-[1.15] tracking-tight relative z-10">
            "The deeper crisis: students who excel in underserved schools go unrecognized — and motivation collapses."
          </p>
        </div>
      </motion.div>
    </section>
  );
}
