'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, MessageSquare, Users, ArrowUpRight, Activity, Database, Zap, Clock, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blog: 0,
    email: 0,
    tickets: 0
  });

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8080/api/blog').then(res => res.json()),
      fetch('http://localhost:8080/api/contacts').then(res => res.json()),
      fetch('http://localhost:8080/api/tickets').then(res => res.json())
    ]).then(([blog, email, tickets]) => {
      setStats({
        blog: Array.isArray(blog) ? blog.length : 0,
        email: Array.isArray(email) ? email.length : 0,
        tickets: Array.isArray(tickets) ? tickets.length : 0
      });
    }).catch(err => console.error('Error fetching dashboard stats:', err));
  }, []);

  const cards = [
    { name: 'Blog Posts', value: stats.blog, icon: FileText, href: '/admin/blog', color: 'text-primary' },
    { name: 'Contacts', value: stats.email, icon: Users, href: '/admin/email', color: 'text-blue' },
    { name: 'Support Tickets', value: stats.tickets, icon: MessageSquare, href: '/admin/tickets', color: 'text-gold' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="heading-premium text-5xl md:text-7xl mb-4 text-foreground">Welcome back, <span className="text-primary">Admin.</span></h1>
        <p className="text-gray-500 text-lg font-bold uppercase tracking-[0.2em]">System Status: All Systems Operational</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.name} href={card.href} className="group">
              <motion.div 
                whileHover={{ y: -10 }}
                className="glass p-10 rounded-[3.5rem] border-white/5 relative overflow-hidden h-full flex flex-col justify-between hover:border-primary/20 transition-all"
              >
                <div className="absolute top-0 right-0 p-12 bg-white/[0.02] rounded-full -mr-12 -mt-12 transition-all group-hover:scale-110" />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 bg-white/[0.03] ${card.color} border border-white/5`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <p className="text-gray-500 font-black text-[11px] uppercase tracking-[0.4em] mb-3">{card.name}</p>
                  <h3 className="text-6xl font-display font-black text-foreground">{card.value}</h3>
                </div>

                <div className="relative z-10 mt-12 flex items-center justify-between text-gray-500 group-hover:text-primary transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-widest">Open Management Hub</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      <section className="glass p-12 rounded-[4rem] border-white/5">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Activity className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-display font-black text-foreground uppercase tracking-tight">System Infrastructure</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'API Status', value: 'Operational', icon: Zap, color: 'text-primary' },
            { label: 'Database', value: 'SQLite / Connected', icon: Database, color: 'text-blue' },
            { label: 'Auth Provider', value: 'Authenticated', icon: ShieldAlert, color: 'text-gold' },
            { label: 'Last Sync', value: 'Just Now', icon: Clock, color: 'text-gray-500' },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-gray-500 font-black text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                <stat.icon className="w-3 h-3" />
                {stat.label}
              </p>
              <div className="flex items-center gap-2">
                {stat.label === 'API Status' && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                <span className="text-foreground font-black text-sm uppercase tracking-tight">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
