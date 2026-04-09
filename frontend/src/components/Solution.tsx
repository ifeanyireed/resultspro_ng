'use client';

import { motion } from 'framer-motion';
import { BarChart3, Gamepad2, Server } from 'lucide-react';

export default function Solution() {
  const products = [
    {
      name: "ResultsPRO Schools Results Manager",
      subtitle: "SCHOOL INTELLIGENCE",
      description: "Automates result management with parent dashboards, teacher tools, and real-time AI analytics.",
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      glassStyle: "glass-green border-primary/10",
      accentColor: "text-primary",
      delay: 0.1
    },
    {
      name: "ResultsPRO Exams Guide",
      subtitle: "STUDENT ENGAGEMENT",
      description: "AI-powered gamified exam prep connecting students from classroom to continental competition.",
      icon: <Gamepad2 className="w-8 h-8 text-gold" />,
      glassStyle: "glass-gold border-gold/10",
      accentColor: "text-gold",
      delay: 0.2
    },
    {
      name: "EduNode",
      subtitle: "OFFLINE INTELLIGENCE",
      description: "Edge server delivering AI-powered learning and government-grade data to schools with no reliable internet.",
      icon: <Server className="w-8 h-8 text-blue" />,
      glassStyle: "glass border-blue/20",
      accentColor: "text-blue",
      delay: 0.3
    }
  ];

  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden bg-[#05090C]">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.3em] text-[11px] mb-8 uppercase font-display"
          >
            The Solution
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-premium text-4xl md:text-7xl max-w-4xl"
          >
            One Mission. Three Products. One Ecosystem.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: product.delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`${product.glassStyle} p-12 rounded-[3rem] flex flex-col group hover:scale-[1.02] hover:bg-white/[0.04] transition-all duration-700 h-full cursor-default`}
            >
              <div className="mb-12 p-5 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-700">
                {product.icon}
              </div>
              <span className={`text-[10px] font-black tracking-[0.2em] mb-6 ${product.accentColor} opacity-70 font-display uppercase`}>
                {product.subtitle}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-black mb-6 text-white leading-tight tracking-tighter">
                {product.name}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed font-body">
                {product.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
