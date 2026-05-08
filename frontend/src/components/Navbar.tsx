'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  
  // Hide navbar on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  const landingLinks = [
    { name: "Products", href: "/#ecosystem" },
    { name: "Pitch", href: "/pitch" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ];

  const pitchLinks = [
    { name: "Problem", href: "/pitch#problem" },
    { name: "Solution", href: "/pitch#solution" },
    { name: "Market", href: "/pitch#market" },
    { name: "Traction", href: "/pitch#traction" },
    { name: "Home", href: "/" }
  ];

  const links = pathname === '/pitch' ? pitchLinks : landingLinks;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-6 flex justify-between items-center"
    >
      <div className="absolute inset-0 bg-background/40 backdrop-blur-2xl" />
      
      <Link href="/" className="relative z-10 font-display text-foreground text-2xl font-black tracking-tighter uppercase group">
        SCHOLARS<span className="text-primary group-hover:text-foreground transition-colors">.NG</span>
      </Link>

      <div className="relative z-10 hidden md:flex items-center gap-10">
        {links.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className="text-muted hover:text-foreground transition-all font-bold text-[11px] uppercase tracking-[0.2em] font-display"
          >
            {link.name}
          </Link>
        ))}
        <ThemeToggle />
        <Link href="/contact">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#00E65F' }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-background px-7 py-2.5 rounded-xl font-black text-xs shadow-[0_10px_20px_-5px_rgba(0,200,83,0.3)] transition-all font-display uppercase tracking-widest"
          >
            Get in Touch
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
}
