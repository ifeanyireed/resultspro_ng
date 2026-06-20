'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { 
  Inbox, Archive, Trash2, Search, 
  MoreVertical, Reply, Forward, ShieldAlert,
  Mail, ChevronLeft, ChevronRight,
  Loader2, AlertCircle, RefreshCw
} from 'lucide-react';

interface Email {
  id: number;
  created_at: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  isStarred?: boolean;
}

const TABS = [
  { id: 'all', label: 'Inbox', icon: Inbox },
  { id: 'open', label: 'Open', icon: AlertCircle },
  { id: 'closed', label: 'Archived', icon: Archive },
];

export default function InboxPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/inbox');
      const data = await res.json();
      setEmails(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching emails:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredEmails = useMemo(() => {
    return emails.filter(email => {
      const matchesTab = activeTab === 'all' || email.status === activeTab;
      const matchesSearch = 
        email.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [emails, activeTab, searchQuery]);

  const handleStatusChange = async (id: number, status: string) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    if (selectedEmail?.id === id) {
      setSelectedEmail(prev => prev ? { ...prev, status } : null);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Sidebar List */}
      <div className="w-1/3 flex flex-col glass rounded-[2.5rem] border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-display font-black uppercase tracking-tight">Inbox</h2>
            <button onClick={fetchData} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id ? 'bg-primary text-background' : 'bg-white/5 text-gray-500 hover:text-primary'
                }`}
              >
                <tab.icon className="w-3 h-3" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : filteredEmails.length === 0 ? (
            <div className="p-10 text-center space-y-4 opacity-50">
              <ShieldAlert className="w-10 h-10 mx-auto text-primary" />
              <p className="text-[10px] font-black uppercase tracking-widest">No messages found</p>
            </div>
          ) : (
            filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`p-6 border-b border-white/5 cursor-pointer transition-all hover:bg-white/[0.02] relative ${
                  selectedEmail?.id === email.id ? 'bg-primary/[0.03] border-l-4 border-l-primary' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-sm truncate pr-4">{email.full_name}</p>
                  <p className="text-[9px] text-gray-500 whitespace-nowrap">{new Date(email.created_at).toLocaleDateString()}</p>
                </div>
                <h4 className={`text-xs mb-2 truncate ${selectedEmail?.id === email.id ? 'text-primary' : 'text-gray-300'}`}>
                  {email.subject}
                </h4>
                <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
                  {email.message}
                </p>
                {email.status === 'open' && (
                  <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(0,200,83,0.5)]" />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message View */}
      <div className="flex-1 glass rounded-[2.5rem] border-white/5 overflow-hidden flex flex-col">
        {selectedEmail ? (
          <>
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <div className="flex gap-4">
                <button 
                  onClick={() => handleStatusChange(selectedEmail.id, selectedEmail.status === 'open' ? 'closed' : 'open')}
                  className="p-3 hover:bg-white/5 rounded-2xl transition-colors group"
                >
                  {selectedEmail.status === 'open' ? (
                    <Archive className="w-5 h-5 text-gray-500 group-hover:text-gold" />
                  ) : (
                    <Inbox className="w-5 h-5 text-gold group-hover:text-primary" />
                  )}
                </button>
                <button className="p-3 hover:bg-white/5 rounded-2xl transition-colors group">
                  <Trash2 className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
                </button>
              </div>
              <div className="flex gap-2">
                <button className="p-3 hover:bg-white/5 rounded-2xl transition-colors"><ChevronLeft className="w-5 h-5 text-gray-500" /></button>
                <button className="p-3 hover:bg-white/5 rounded-2xl transition-colors"><ChevronRight className="w-5 h-5 text-gray-500" /></button>
                <button className="p-3 hover:bg-white/5 rounded-2xl transition-colors"><MoreVertical className="w-5 h-5 text-gray-500" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
              <header className="space-y-6">
                <h1 className="text-3xl font-display font-black text-foreground">{selectedEmail.subject}</h1>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                      {selectedEmail.full_name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold">{selectedEmail.full_name}</p>
                        <span className="text-[10px] text-gray-500 font-medium">&lt;{selectedEmail.email}&gt;</span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">to me</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold">{new Date(selectedEmail.created_at).toLocaleString()}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                      Status: <span className={selectedEmail.status === 'open' ? 'text-primary' : 'text-gold'}>{selectedEmail.status}</span>
                    </p>
                  </div>
                </div>
              </header>

              <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-gray-300 leading-relaxed text-sm whitespace-pre-wrap min-h-[300px]">
                {selectedEmail.message}
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 rounded-2xl bg-primary text-background font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:scale-[1.02] transition-all">
                  <Reply className="w-4 h-4" /> Reply
                </button>
                <button className="flex-1 py-4 rounded-2xl glass border-white/10 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                  <Forward className="w-4 h-4" /> Forward
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-6">
            <div className="w-24 h-24 rounded-[2rem] bg-primary/5 flex items-center justify-center text-primary/20">
              <Mail className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-display font-black uppercase tracking-tight">Select a message</h3>
              <p className="text-gray-500 text-xs font-medium max-w-xs mx-auto">Choose an email from the list to view its contents and take action.</p>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
