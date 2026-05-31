'use client';

import { motion } from 'framer-motion';
import { BarChart3, Gamepad2, Users, BookOpen, LayoutDashboard, Rocket } from 'lucide-react';

export default function Solution() {
  const products = [
    {
      name: "SchoolHub",
      subtitle: "INSTITUTIONAL OS",
      description: "The centralized heartbeat of your institution. Run admissions, community, and digital operations from one hub.",
      icon: <LayoutDashboard className="w-8 h-8 text-green" />,
      glassStyle: "glass",
      accentColor: "text-green",
      delay: 0.1
    },
    {
      name: "ResultsPRO",
      subtitle: "ACADEMIC INTELLIGENCE",
      description: "Know more than scores. Deep academic insights and automated results processing powered by AI.",
      icon: <BarChart3 className="w-8 h-8 text-green" />,
      glassStyle: "glass",
      accentColor: "text-green",
      delay: 0.2
    },
    {
      name: "ExamsPRO",
      subtitle: "ASSESSMENT ENGINE",
      description: "From assessment to insight. AI-powered CBT engine and question banks for intentional preparation.",
      icon: <Gamepad2 className="w-8 h-8 text-gold" />,
      glassStyle: "glass",
      accentColor: "text-gold",
      delay: 0.3
    },
    {
      name: "ClassroomPRO",
      subtitle: "TEACHING & LEARNING",
      description: "Keep learning moving. Standardized digital classrooms and assignment centers that work even offline.",
      icon: <BookOpen className="w-8 h-8 text-blue" />,
      glassStyle: "glass",
      accentColor: "text-blue",
      delay: 0.4
    },
    {
      name: "TutorsPRO",
      subtitle: "LEARNING SUPPORT",
      description: "Connecting experts with hungry minds. Vetted tutoring delivery and school-led support sessions.",
      icon: <Users className="w-8 h-8 text-purple-400" />,
      glassStyle: "glass",
      accentColor: "text-purple-400",
      delay: 0.5
    },
    {
      name: "ScholarsNG",
      subtitle: "FUTURE SKILLS",
      description: "Building future-ready students. A journey from computer literacy to professional-grade AI and coding skills.",
      icon: <Rocket className="w-8 h-8 text-green" />,
      glassStyle: "glass",
      accentColor: "text-green",
      delay: 0.6
    }
  ];

  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden bg-navy">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-green/5 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 text-white">
        <div className="flex flex-col mb-24 text-center items-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-green font-bold tracking-[0.3em] text-[11px] mb-8 uppercase font-display"
          >
            The Suite
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-premium text-4xl md:text-7xl max-w-5xl text-white"
          >
            The <span className="text-green">ResultsPRO Suite</span> Ecosystem.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: product.delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`${product.glassStyle} p-10 rounded-[2.5rem] flex flex-col group hover:scale-[1.02] transition-all duration-700 h-full cursor-default border-white/5`}
            >
              <div className="mb-8 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-700">
                {product.icon}
              </div>
              <span className={`text-[10px] font-black tracking-[0.2em] mb-4 ${product.accentColor} opacity-70 font-display uppercase`}>
                {product.subtitle}
              </span>
              <h3 className="font-display text-2xl font-black mb-4 text-white leading-tight tracking-tighter">
                {product.name}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed font-body">
                {product.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
