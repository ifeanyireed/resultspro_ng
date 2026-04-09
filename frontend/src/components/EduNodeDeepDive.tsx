'use client';

import { motion } from 'framer-motion';
import { Server, WifiOff, Layout, BarChart, Check, Cpu } from 'lucide-react';

export default function EduNodeDeepDive() {
  const features = [
    { icon: <Cpu className="w-6 h-6 text-blue" />, text: "Raspberry Pi 5 local server — no internet required" },
    { icon: <Layout className="w-6 h-6 text-blue" />, text: "Lesson notes & exams served offline to all devices" },
    { icon: <WifiOff className="w-6 h-6 text-blue" />, text: "Teacher management tools & attendance systems" },
    { icon: <BarChart className="w-6 h-6 text-blue" />, text: "Edge data aggregated into regional dashboards" }
  ];

  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden bg-[#05090C] border-t border-white/[0.03]">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col mb-24 items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass border-blue/10 text-[10px] font-black tracking-[0.2em] text-blue mb-8 uppercase font-display"
          >
            Product 03
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-premium text-4xl md:text-8xl mb-8"
          >
            EduNode
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue font-display font-black tracking-tight text-xl md:text-3xl"
          >
            Offline Intelligence for Every School.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-6 glass p-8 rounded-[2rem] border-blue/5 group hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="shrink-0 p-4 bg-blue/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                <p className="text-gray-400 text-lg md:text-xl font-body leading-relaxed">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-12 md:p-16 rounded-[3.5rem] border-blue/20 relative h-full overflow-hidden flex flex-col justify-center"
            >
              <div className="absolute top-0 right-0 p-16 bg-blue/5 rounded-full blur-[100px] -mr-24 -mt-24" />
              
              <h3 className="font-display text-3xl md:text-5xl text-white font-black mb-10 tracking-tighter leading-none relative z-10">
                The Government Data Pipeline
              </h3>
              <p className="text-gold italic text-2xl md:text-3xl mb-12 leading-tight font-display font-medium tracking-tight relative z-10 max-w-xl">
                "How do we make data-driven decisions when we have no data?"
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative z-10">
                {[
                  "Verified school data",
                  "Real-time attendance",
                  "Performance trends",
                  "Resource insights"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 text-gray-400 font-body text-lg">
                    <div className="w-2 h-2 rounded-full bg-blue" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-blue text-white py-6 px-10 font-black text-center rounded-[1.5rem] text-lg font-display tracking-[0.1em] relative z-10 shadow-[0_20px_40px_-12px_rgba(21,101,192,0.4)] uppercase"
              >
                Hardware + SaaS • Government Ready
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
