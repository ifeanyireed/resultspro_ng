'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Mail, MessageSquare, Home, Tag, Folder, MessageCircle } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
    { name: 'Email Mgmt', href: '/admin/email', icon: Mail },
    { name: 'Support Tickets', href: '/admin/tickets', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-foreground/5 fixed h-full z-20">
        <div className="p-8">
          <Link href="/" className="font-display text-foreground text-xl font-black tracking-tighter uppercase group">
            SCHOLARS<span className="text-primary group-hover:text-foreground transition-colors">.NG</span>
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mt-2">Admin Portal</p>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-widest ${
                  isActive
                    ? 'bg-primary text-background shadow-[0_10px_20px_-5px_rgba(0,200,83,0.3)]'
                    : 'text-muted hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-8 px-8 w-full space-y-6">
          <ThemeToggle />
          <Link href="/" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors font-bold text-xs uppercase tracking-widest">
            <Home className="w-4 h-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 relative">
        <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
        {children}
      </main>
    </div>
  );
}
