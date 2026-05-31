'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, MessageSquare, Users, ArrowUpRight, Activity, Database, Zap, Clock, ShieldAlert, AlertCircle, Inbox } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blog: 0,
    email: 0,
    tickets: 0,
    inbox: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('http://localhost:8080/api/blog').then(res => res.ok ? res.json() : Promise.reject('Blog API failed')),
      fetch('http://localhost:8080/api/contacts').then(res => res.ok ? res.json() : Promise.reject('Contacts API failed')),
      fetch('http://localhost:8080/api/tickets').then(res => res.ok ? res.json() : Promise.reject('Tickets API failed'))
    ]).then(([blog, email, tickets]) => {
      setStats({
        blog: Array.isArray(blog) ? blog.length : 0,
        email: Array.isArray(email) ? email.length : 0,
        tickets: Array.isArray(tickets) ? tickets.length : 0,
        inbox: Array.isArray(tickets) ? tickets.filter((t: any) => t.status === 'open').length : 0
      });
      setError(null);
    }).catch(err => {
      console.error('Error fetching dashboard stats:', err);
      setError('Could not connect to the backend API. Please ensure the server is running on port 8080.');
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const cards = [
    { name: 'Unread Inbox', value: stats.inbox, icon: Inbox, href: '/admin/inbox', color: 'text-primary' },
    { name: 'Blog Posts', value: stats.blog, icon: FileText, href: '/admin/blog', color: 'text-blue' },
    { name: 'Contacts', value: stats.email, icon: Users, href: '/admin/email', color: 'text-gold' },
    { name: 'Support Tickets', value: stats.tickets, icon: MessageSquare, href: '/admin/tickets', color: 'text-amber' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="heading-premium text-5xl md:text-7xl mb-4 text-foreground">Welcome back, <span className="text-primary">Admin.</span></h1>
          <p className="text-gray-500 text-lg font-bold uppercase tracking-[0.2em]">
            System Status: {error ? <span className="text-red-500">Error Encountered</span> : <span className="text-primary">All Systems Operational</span>}
          </p>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl flex items-center gap-4 max-w-md">
            <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
            <p className="text-xs text-red-500/80 font-bold leading-relaxed">{error}</p>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.name} href={card.href} className="group">
              <motion.div 
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-[3.5rem] border-white/5 relative overflow-hidden h-full flex flex-col justify-between hover:border-primary/20 transition-all"
              >
                <div className="absolute top-0 right-0 p-12 bg-white/[0.02] rounded-full -mr-12 -mt-12 transition-all group-hover:scale-110" />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-white/[0.03] ${card.color} border border-white/5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2">{card.name}</p>
                  <h3 className="text-5xl font-display font-black text-foreground">{loading ? '...' : card.value}</h3>
                </div>

                <div className="relative z-10 mt-10 flex items-center justify-between text-gray-500 group-hover:text-primary transition-colors">
                  <span className="text-[9px] font-black uppercase tracking-widest">Open Hub</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
            { label: 'API Status', value: error ? 'Disconnected' : 'Operational', icon: Zap, color: error ? 'text-red-500' : 'text-primary' },
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
                {stat.label === 'API Status' && <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-primary animate-pulse'}`} />}
                <span className="text-foreground font-black text-sm uppercase tracking-tight">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
