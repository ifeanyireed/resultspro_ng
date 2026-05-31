'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  Target, 
  Zap, 
  Globe, 
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Trophy,
  LayoutDashboard,
  Rocket
} from 'lucide-react';

export default function Ecosystem() {
  const pathname = usePathname();
  if (pathname === '/pitch') return null;

  const cards = [
    {
      title: "SchoolHub",
      description: "Run your digital campus from one place. The centralized operating system for modern institutions.",
      icon: <LayoutDashboard className="w-6 h-6" />,
      tag: "Institutional OS",
      color: "text-green",
      glass: "glass"
    },
    {
      title: "ResultsPRO",
      description: "Know More Than Scores. Transform examination data into actionable academic insights with Power BI-grade intelligence.",
      icon: <BarChart3 className="w-6 h-6" />,
      tag: "Academic BI",
      color: "text-green",
      glass: "glass"
    },
    {
      title: "ExamsPRO",
      description: "From Assessment To Insight. Prepare students intentionally with an advanced CBT engine and automated grading.",
      icon: <Zap className="w-6 h-6" />,
      tag: "Assessment Engine",
      color: "text-gold",
      glass: "glass"
    },
    {
      title: "ClassroomPRO",
      description: "Keep Learning Moving. Standardize lesson delivery and organize assignments with an offline-first digital classroom.",
      icon: <Target className="w-6 h-6" />,
      tag: "Teaching & Learning",
      color: "text-blue",
      glass: "glass"
    },
    {
      title: "TutorsPRO",
      description: "Learning Doesn't End At The Bell. Connect students with vetted academic support through real-time tools.",
      icon: <Users className="w-6 h-6" />,
      tag: "Learning Support",
      color: "text-purple-400",
      glass: "glass"
    },
    {
      title: "ScholarsNG",
      description: "Build future-ready students. From computer literacy to AI, robotics, and global project portfolios.",
      icon: <Rocket className="w-6 h-6" />,
      tag: "Future Skills",
      color: "text-green",
      glass: "glass"
    }
  ];

  return (
    <section className="py-32 px-6 md:px-16 relative bg-navy text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          <div className="lg:col-span-4 sticky top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-widest text-green mb-6 uppercase shadow-sm">
                <Globe className="w-3 h-3" />
                Integrated Platform
              </div>
              <h2 className="font-display heading-premium text-4xl md:text-6xl mb-8">
                The <span className="text-green">Full Stack</span> Education OS.
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed font-body">
                We don&apos;t just build apps; we build infrastructure. From the classroom to the individual student, ResultsPRO NG connects every touchpoint of the education journey.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <ShieldCheck className="w-4 h-4" />, text: "Enterprise-grade Data Security" },
                  { icon: <Smartphone className="w-4 h-4" />, text: "Mobile-First User Experience" },
                  { icon: <Trophy className="w-4 h-4" />, text: "Gamified Engagement Models" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-400 font-bold text-xs uppercase tracking-widest">
                    <div className="text-green">{item.icon}</div>
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${card.glass} p-10 rounded-[3rem] border-white/5 group hover:border-green/20 transition-all cursor-pointer flex flex-col`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 ${card.color} group-hover:scale-110 transition-transform duration-500`}>
                  {card.icon}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${card.color}`}>{card.tag}</span>
                  <div className="h-px w-8 bg-white/10" />
                </div>
                
                <h3 className="text-2xl font-display font-black text-white mb-4 group-hover:text-green transition-colors">
                  {card.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-10 flex-grow">
                  {card.description}
                </p>

                <div className="flex items-center justify-between group/btn">
                  <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">Deep Dive</span>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/btn:bg-green group-hover/btn:text-navy transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
