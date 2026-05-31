'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 h-16 flex items-center justify-between backdrop-blur-md"
      style={{
        background: 'linear-gradient(180deg, rgba(13, 27, 42, 0.4) 0%, rgba(13, 27, 42, 0.1) 50%, rgba(13, 27, 42, 0) 100%)'
      }}
    >
      <div className="max-w-[1600px] mx-auto w-full flex items-center justify-between">
        {/* Logo Replicated from ExamsPRO */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="ResultsPRO Logo" 
            width={32} 
            height={32} 
            className="rounded-lg shadow-sm"
          />
          <span className="font-display font-bold text-lg text-white tracking-tight flex flex-col leading-none">
            ResultsPRO 
            <span className="text-green text-[10px] uppercase tracking-[0.2em] mt-0.5">SUITE</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-gray-300 hover:text-white transition-all font-medium text-sm"
            >
              {link.name}
            </Link>
          ))}
          <div className="w-px h-4 bg-white/10 mx-2" />
          <Link href="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green text-navy text-[10px] md:text-sm font-black px-6 py-2 rounded-full hover:bg-green/90 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] uppercase"
            >
              Get in Touch
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
