'use client';

import { motion } from 'framer-motion';

export default function Navbar() {
  const links = [
    { name: "Solution", href: "#solution" },
    { name: "Ecosystem", href: "#ecosystem" },
    { name: "Market", href: "#market" },
    { name: "Traction", href: "#traction" }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-6 flex justify-between items-center"
    >
      <div className="absolute inset-0 bg-background/40 backdrop-blur-2xl border-b border-white/[0.05]" />
      
      <div className="relative z-10 font-display text-white text-2xl font-black tracking-tighter uppercase group cursor-default">
        SCHOLARS<span className="text-primary group-hover:text-white transition-colors">.NG</span>
      </div>

      <div className="relative z-10 hidden md:flex items-center gap-10">
        {links.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="text-gray-400 hover:text-white transition-all font-bold text-[11px] uppercase tracking-[0.2em] font-display"
          >
            {link.name}
          </a>
        ))}
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: '#00E65F' }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-background px-7 py-2.5 rounded-xl font-black text-xs shadow-[0_10px_20px_-5px_rgba(0,200,83,0.3)] transition-all font-display uppercase tracking-widest"
        >
          View the Pitch
        </motion.button>
      </div>
    </motion.nav>
  );
}
