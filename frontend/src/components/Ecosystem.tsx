'use client';

import { motion } from 'framer-motion';

export default function Ecosystem() {
  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden bg-[#05090C] border-t border-white/[0.03]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[160px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto mb-32 relative z-10 flex flex-col items-center text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-bold tracking-[0.3em] text-[11px] mb-8 uppercase font-display"
        >
          The Intelligence Loop
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="heading-premium text-4xl md:text-[90px] mb-12"
        >
          Three Products. One Ecosystem.
        </motion.h2>
      </div>

      <div className="max-w-6xl mx-auto relative min-h-[500px] md:min-h-[700px] flex items-center justify-center relative z-10">
        {/* Refined Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 1000 600">
          <motion.path
            d="M 500 300 L 250 150"
            stroke="rgba(0,200,83,0.3)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
          />
          <motion.path
            d="M 500 300 L 750 150"
            stroke="rgba(232,168,56,0.3)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
          />
          <motion.path
            d="M 500 300 L 500 550"
            stroke="rgba(21,101,192,0.3)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
          />
        </svg>

        {/* Central Hub - High Contrast */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="relative z-20 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full glass border-primary/20 flex items-center justify-center p-12 text-center shadow-[0_0_80px_0_rgba(0,200,83,0.1)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,83,0.1)_0,transparent_70%)]" />
          <span className="text-white font-black text-3xl md:text-5xl leading-none font-display tracking-tighter relative z-10">
            INCLUSION <br />
            <span className="text-primary">THROUGH</span> <br />
            RECOGNITION
          </span>
        </motion.div>

        {/* Satellites - Floating Effect */}
        {[
          { 
            name: "ResultsPRO", 
            sub: "Schools Results Manager", 
            pos: "left-0 top-0 md:top-[10%]", 
            glass: "glass-green border-primary/20",
            accent: "text-primary",
            x: -40, y: -20
          },
          { 
            name: "ResultsPRO", 
            sub: "Exams Guide", 
            pos: "right-0 top-0 md:top-[10%]", 
            glass: "glass-gold border-gold/20",
            accent: "text-gold",
            x: 40, y: -20
          },
          { 
            name: "EduNode", 
            sub: "Offline Intelligence", 
            pos: "bottom-[-15%] md:bottom-[-10%]", 
            glass: "glass border-blue/20",
            accent: "text-blue",
            x: 0, y: 40
          }
        ].map((item, i) => (
          <motion.div
            key={item.name + item.sub}
            initial={{ opacity: 0, x: item.x, y: item.y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute ${item.pos} ${item.glass} p-10 rounded-[2.5rem] w-64 md:w-80 shadow-2xl z-30 group hover:bg-white/[0.05] transition-all duration-500 cursor-default`}
          >
            <h4 className={`font-display font-black text-2xl mb-2 ${item.accent} tracking-tighter`}>{item.name}</h4>
            <p className="text-gray-400 text-sm font-display font-bold tracking-tight uppercase opacity-80">{item.sub}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 glass p-10 md:p-14 rounded-[3rem] text-center max-w-5xl mx-auto border-white/[0.05]"
      >
        <p className="italic text-gray-300 text-xl md:text-2xl font-display leading-relaxed tracking-tight">
          "Data from <span className="text-blue font-bold">EduNode</span> feeds <span className="text-primary font-bold">ResultsPRO</span>, which identifies talent for <span className="text-gold font-bold">Exams Guide</span> competitions, 
          creating a self-reinforcing loop of visibility and growth."
        </p>
      </motion.div>
    </section>
  );
}
