'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, User, Tag, Clock, Search, Filter, 
  Loader2, CheckCircle2, AlertCircle, MessageSquare,
  Inbox, Archive, ShieldAlert
} from 'lucide-react';

interface Ticket {
  id: number;
  created_at: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
}

const TABS = [
  { id: 'all', label: 'All Tickets', icon: Inbox },
  { id: 'open', label: 'Open', icon: AlertCircle },
  { id: 'closed', label: 'Closed', icon: Archive },
];

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/tickets')
      .then((res) => res.json())
      .then((data) => {
        setTickets(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesTab = activeTab === 'all' || ticket.status === activeTab;
      const matchesSearch = 
        ticket.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [tickets, activeTab, searchQuery]);

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="heading-premium text-4xl md:text-5xl mb-2">Support <span className="text-primary">Desk</span></h1>
          <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.4em]">Integrated User Inquiries & Support</p>
        </div>
        <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  active ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-primary hover:bg-primary/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className={active ? 'block' : 'hidden lg:block'}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Tickets', value: tickets.length, icon: MessageSquare, color: 'text-blue' },
          { label: 'Open Issues', value: tickets.filter(t => t.status === 'open').length, icon: AlertCircle, color: 'text-primary' },
          { label: 'Resolved', value: tickets.filter(t => t.status === 'closed').length, icon: CheckCircle2, color: 'text-gold' },
        ].map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[2.5rem] border-white/5">
            <div className={`p-3 rounded-2xl bg-white/[0.03] ${stat.color} w-fit mb-4`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h4 className="text-3xl font-display font-black">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="flex gap-6 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by name, email or subject..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass border-white/10 rounded-2xl px-12 py-4 outline-none focus:border-primary/50 text-sm"
          />
        </div>
        <button className="glass px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 border-white/10">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-40">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {filteredTickets.length === 0 ? (
            <div className="glass p-20 rounded-[4rem] text-center border-white/5">
              <ShieldAlert className="w-16 h-16 text-primary/20 mx-auto mb-6" />
              <p className="text-gray-500 font-black uppercase tracking-widest">Clear desk. No tickets found matching your criteria.</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={ticket.id}
                className="glass p-8 rounded-[3rem] border-white/5 hover:border-primary/20 transition-all group"
              >
                <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em] bg-primary/5 px-3 py-1 rounded-lg w-fit">
                      <Tag className="w-3 h-3" />
                      {ticket.subject}
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-black text-foreground mb-1">{ticket.full_name}</h3>
                      <div className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3" />
                          {ticket.email}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] ${
                      ticket.status === 'open' ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(0,200,83,0.1)]' : 'bg-white/5 text-gray-500'
                    }`}>
                      {ticket.status}
                    </span>
                    <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Mark as Resolved</button>
                  </div>
                </div>
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 group-hover:border-primary/10 transition-colors">
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">{ticket.message}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
