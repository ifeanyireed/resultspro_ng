'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Users, BarChart3, TrendingUp, UserPlus, Send, 
  List, UserCheck, Calendar, PieChart, Plus, Search, 
  Filter, MoreVertical, Edit3, Trash2, Globe, Clock, 
  ChevronRight, ArrowUpRight, Download, X, Save, Loader2, Upload
} from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-64 w-full glass animate-pulse rounded-3xl" />
});
import 'react-quill-new/dist/quill.snow.css';

// Types
interface MailingList {
  id: number;
  name: string;
  description: string;
  contacts?: Contact[];
}

interface Contact {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  address?: string;
  state: string;
  lga: string;
  mailing_list_id?: number;
  status: string;
  created_at: string;
}

interface Campaign {
  id: number;
  subject: string;
  content: string;
  scheduled_at: string | null;
  status: 'draft' | 'scheduled' | 'sent';
  mailing_list_id?: number;
}

interface Metrics {
  open_rate: number;
  click_rate: number;
  bounce_rate: number;
  total_sent: number;
}

const TABS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'lists', label: 'Mailing Lists', icon: List },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'campaigns', label: 'Campaigns', icon: Send },
  { id: 'metrics', label: 'Detailed Metrics', icon: PieChart },
];

export default function EmailMgmtPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [lists, setLists] = useState<MailingList[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'list' | 'contact' | 'campaign'>('list');
  const [editingItem, setEditingItem] = useState<MailingList | Contact | Campaign | null>(null);

  const fetchData = async () => {
    try {
      const [listsRes, contactsRes, campaignsRes, metricsRes] = await Promise.all([
        fetch('http://localhost:8080/api/mailing-lists').then(res => res.json()),
        fetch('http://localhost:8080/api/contacts').then(res => res.json()),
        fetch('http://localhost:8080/api/campaigns').then(res => res.json()),
        fetch('http://localhost:8080/api/metrics/engagement').then(res => res.json())
      ]);

      setLists(Array.isArray(listsRes) ? listsRes : []);
      setContacts(Array.isArray(contactsRes) ? contactsRes : []);
      setCampaigns(Array.isArray(campaignsRes) ? campaignsRes : []);
      setMetrics(metricsRes);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (data: MailingList | Contact | Campaign) => {
    const endpoint = modalType === 'list' ? 'mailing-lists' : modalType === 'contact' ? 'contacts' : 'campaigns';
    const method = data.id ? 'PUT' : 'POST';
    const url = data.id ? `http://localhost:8080/api/${endpoint}/${data.id}` : `http://localhost:8080/api/${endpoint}`;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsModalOpen(false);
        fetchData();
      }
    } catch (err) {
      console.error('Error saving:', err);
    }
  };

  const handleDelete = async (type: string, id: number) => {
    if (!confirm('Are you sure?')) return;
    const endpoint = type === 'list' ? 'mailing-lists' : type === 'contact' ? 'contacts' : 'campaigns';
    try {
      await fetch(`http://localhost:8080/api/${endpoint}/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/api/contacts/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Contacts uploaded successfully');
        fetchData();
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (err) {
      console.error('Error uploading CSV:', err);
      alert('Network error during upload');
    }
  };

  const renderOverview = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Contacts', value: contacts.length, icon: Users, color: 'text-primary' },
          { label: 'Open Rate', value: `${metrics?.open_rate || 0}%`, icon: BarChart3, color: 'text-blue' },
          { label: 'Click Rate', value: `${metrics?.click_rate || 0}%`, icon: TrendingUp, color: 'text-gold' },
          { label: 'Total Sent', value: metrics?.total_sent || 0, icon: Send, color: 'text-amber' },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-display font-bold uppercase tracking-tight">Recent Activity</h3>
            <button className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {contacts.slice(0, 5).map((contact) => (
              <div key={contact.id} className="glass p-5 rounded-3xl border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                    {contact.full_name?.[0] || contact.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{contact.full_name || 'Anonymous'}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{contact.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">Subscribed</p>
                  <p className="text-[9px] text-gray-500">{new Date(contact.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-xl font-display font-bold uppercase tracking-tight">Pending Campaigns</h3>
          <div className="space-y-4">
            {campaigns.filter(c => c.status === 'scheduled').map(campaign => (
              <div key={campaign.id} className="glass p-6 rounded-[2rem] border-white/5 bg-primary/[0.02]">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Scheduled</p>
                <h4 className="font-bold text-sm mb-1">{campaign.subject}</h4>
                <p className="text-[10px] text-gray-500 mb-4 flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {new Date(campaign.scheduled_at!).toLocaleString()}
                </p>
                <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  Edit Schedule
                </button>
              </div>
            ))}
            {campaigns.filter(c => c.status === 'scheduled').length === 0 && (
              <div className="glass p-10 rounded-[2rem] border-white/5 text-center">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">No scheduled campaigns</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLists = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-display font-black uppercase tracking-tight">Mailing <span className="text-primary">Lists</span></h3>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Organize your audience into segments</p>
        </div>
        <button 
          onClick={() => { setModalType('list'); setEditingItem({ name: '', description: '' }); setIsModalOpen(true); }}
          className="bg-primary text-background px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create List
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map((list) => (
          <div key={list.id} className="glass p-8 rounded-[3rem] border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => { setModalType('list'); setEditingItem(list); setIsModalOpen(true); }} className="p-2 hover:text-primary"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete('list', list.id)} className="p-2 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <List className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-display font-black mb-2">{list.name}</h4>
            <p className="text-gray-500 text-xs leading-relaxed mb-6 h-8 line-clamp-2">{list.description}</p>
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-gray-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">{list.contacts?.length || 0} Contacts</span>
              </div>
              <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-display font-black uppercase tracking-tight">Contact <span className="text-primary">Directory</span></h3>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Manage all your subscribers in one place</p>
        </div>
        <div className="flex gap-4">
          <input 
            type="file" 
            accept=".csv" 
            ref={fileInputRef} 
            onChange={handleCSVUpload} 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="glass px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 border-white/10"
          >
            <Upload className="w-4 h-4" /> Import CSV
          </button>
          <button className="glass px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 border-white/10">
            <Download className="w-4 h-4" /> Export
          </button>
          <button 
            onClick={() => { setModalType('contact'); setEditingItem({ full_name: '', email: '', phone: '', address: '', state: '', lga: '', status: 'active' }); setIsModalOpen(true); }}
            className="bg-primary text-background px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Contact
          </button>
        </div>
      </div>

      <div className="glass rounded-[3rem] border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search by name, email or LGA..." className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-primary/50" />
          </div>
          <button className="px-6 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-white/[0.05]">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.01]">
              <tr>
                <th className="px-8 py-6 text-gray-500 font-black text-[10px] uppercase tracking-widest">Contact</th>
                <th className="px-8 py-6 text-gray-500 font-black text-[10px] uppercase tracking-widest">Phone</th>
                <th className="px-8 py-6 text-gray-500 font-black text-[10px] uppercase tracking-widest">Address</th>
                <th className="px-8 py-6 text-gray-500 font-black text-[10px] uppercase tracking-widest">Location</th>
                <th className="px-8 py-6 text-gray-500 font-black text-[10px] uppercase tracking-widest">Mailing List</th>
                <th className="px-8 py-6 text-gray-500 font-black text-[10px] uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-gray-500 font-black text-[10px] uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-white/[0.01] group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-[10px]">
                        {contact.full_name?.[0] || contact.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{contact.full_name || 'Anonymous'}</p>
                        <p className="text-[10px] text-gray-500">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[10px] font-bold tracking-tight">{contact.phone || 'N/A'}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[10px] font-medium text-gray-400 max-w-[150px] truncate">{contact.address || 'N/A'}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[10px] font-bold uppercase tracking-tight">{contact.state || 'N/A'}</p>
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest">{contact.lga || 'Unknown LGA'}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-medium text-gray-400">
                      {lists.find(l => l.id === contact.mailing_list_id)?.name || 'Unassigned'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${contact.status === 'active' ? 'bg-primary/10 text-primary' : contact.status === 'unsubscribed' ? 'bg-amber/10 text-amber' : 'bg-red-500/10 text-red-500'}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setModalType('contact'); setEditingItem(contact); setIsModalOpen(true); }} className="p-2 hover:text-primary"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete('contact', contact.id)} className="p-2 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-display font-black uppercase tracking-tight">Email <span className="text-primary">Campaigns</span></h3>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Design and broadcast your messages</p>
        </div>
        <button 
          onClick={() => { setModalType('campaign'); setEditingItem({ subject: '', content: '', status: 'draft', mailing_list_id: lists[0]?.id }); setIsModalOpen(true); }}
          className="bg-primary text-background px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="glass p-8 rounded-[3.5rem] border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 flex gap-2">
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                campaign.status === 'sent' ? 'bg-primary/10 text-primary' : 
                campaign.status === 'scheduled' ? 'bg-blue/10 text-blue' : 'bg-gray-500/10 text-gray-500'
              }`}>
                {campaign.status}
              </span>
              <button onClick={() => { setModalType('campaign'); setEditingItem(campaign); setIsModalOpen(true); }} className="p-1 hover:text-primary"><MoreVertical className="w-4 h-4" /></button>
            </div>
            <div className="w-14 h-14 bg-white/[0.03] rounded-2xl flex items-center justify-center text-gray-400 mb-6 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-display font-black mb-1">{campaign.subject}</h4>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-6">
              To: {lists.find(l => l.id === campaign.mailing_list_id)?.name || 'All Contacts'}
            </p>
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-[10px] font-black">24.5%</p>
                  <p className="text-[8px] text-gray-500 uppercase tracking-widest">Open</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black">8.2%</p>
                  <p className="text-[8px] text-gray-500 uppercase tracking-widest">Click</p>
                </div>
              </div>
              <button className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2 hover:gap-3 transition-all">
                View Report <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      <style jsx global>{`
        .ql-container {
          font-family: inherit;
          font-size: 1rem;
          border-bottom-left-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          min-height: 300px;
        }
        .ql-toolbar {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-top-left-radius: 1.5rem;
          border-top-right-radius: 1.5rem;
          padding: 1rem !important;
        }
        .ql-stroke { stroke: #9ca3af !important; }
        .ql-fill { fill: #9ca3af !important; }
        .ql-picker { color: #9ca3af !important; }
        .ql-editor { color: var(--foreground); padding: 1.5rem; }
        .ql-editor.ql-blank::before { color: rgba(156, 163, 175, 0.5) !important; left: 1.5rem; }
      `}</style>

      <header className="flex justify-between items-end">
        <div>
          <h1 className="heading-premium text-4xl md:text-5xl mb-2">Communications <span className="text-primary">Hub</span></h1>
          <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.4em]">Integrated Email & Audience Management</p>
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

      {loading ? (
        <div className="flex justify-center py-40">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'lists' && renderLists()}
          {activeTab === 'contacts' && renderContacts()}
          {activeTab === 'campaigns' && renderCampaigns()}
          {activeTab === 'metrics' && (
            <div className="glass p-20 rounded-[4rem] text-center border-white/5">
              <PieChart className="w-20 h-20 text-primary/20 mx-auto mb-8" />
              <h3 className="text-2xl font-display font-black uppercase mb-4">Advanced Analytics</h3>
              <p className="text-gray-500 font-bold text-sm max-w-md mx-auto">This module is currently processing deep insights from SendPulse. Detailed campaign breakdowns and heatmaps will be available shortly.</p>
            </div>
          )}
        </AnimatePresence>
      )}

      {/* Shared Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md" 
              onClick={() => setIsModalOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3.5rem] border-white/10 relative z-10 p-10 md:p-14"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-display font-black uppercase tracking-tighter">
                  {editingItem?.id ? 'Edit' : 'New'} <span className="text-primary">{modalType}</span>
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-3 rounded-2xl hover:bg-white/5 text-gray-500 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {modalType === 'list' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">List Name</label>
                      <input 
                        type="text" value={(editingItem as MailingList)?.name || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value } as MailingList)}
                        className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50" placeholder="e.g. VIP Newsletter" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Description</label>
                      <textarea 
                        rows={4} value={(editingItem as MailingList)?.description || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value } as MailingList)}
                        className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 resize-none" placeholder="Describe this segment..." 
                      />
                    </div>
                  </>
                )}

                {modalType === 'contact' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Full Name</label>
                      <input 
                        type="text" value={(editingItem as Contact)?.full_name || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, full_name: e.target.value } as Contact)}
                        className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50" placeholder="John Doe" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Email</label>
                      <input 
                        type="email" value={(editingItem as Contact)?.email || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value } as Contact)}
                        className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50" placeholder="john@example.com" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Phone</label>
                      <input 
                        type="text" value={(editingItem as Contact)?.phone || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, phone: e.target.value } as Contact)}
                        className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50" placeholder="08012345678" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Address</label>
                      <input 
                        type="text" value={(editingItem as Contact)?.address || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, address: e.target.value } as Contact)}
                        className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50" placeholder="123 Street Name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">State</label>
                      <input 
                        type="text" value={(editingItem as Contact)?.state || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, state: e.target.value } as Contact)}
                        className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50" placeholder="Lagos" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">LGA</label>
                      <input 
                        type="text" value={(editingItem as Contact)?.lga || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, lga: e.target.value } as Contact)}
                        className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50" placeholder="Ikeja" 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Assign to List</label>
                      <select 
                        value={(editingItem as Contact)?.mailing_list_id || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, mailing_list_id: parseInt(e.target.value) } as Contact)}
                        className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 appearance-none cursor-pointer"
                      >
                        <option value="">No List Assigned</option>
                        {lists.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {modalType === 'campaign' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Subject</label>
                        <input 
                          type="text" value={(editingItem as Campaign)?.subject || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, subject: e.target.value } as Campaign)}
                          className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50" placeholder="Welcome to Scholars!" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Recipient List</label>
                        <select 
                          value={(editingItem as Campaign)?.mailing_list_id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, mailing_list_id: parseInt(e.target.value) } as Campaign)}
                          className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 appearance-none cursor-pointer"
                        >
                          {lists.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Email Content</label>
                      <div className="min-h-[300px]">
                        <ReactQuill 
                          theme="snow"
                          value={(editingItem as Campaign)?.content || ''}
                          onChange={(content) => setEditingItem({ ...editingItem, content } as Campaign)}
                          placeholder="Write your email here..."
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Status</label>
                        <select 
                          value={(editingItem as Campaign)?.status || 'draft'} 
                          onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value } as Campaign)}
                          className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 appearance-none cursor-pointer"
                        >
                          <option value="draft">Draft</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="sent">Sent</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Schedule (Optional)</label>
                        <input 
                          type="datetime-local" 
                          value={(editingItem as Campaign)?.scheduled_at?.split('.')[0] || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, scheduled_at: e.target.value, status: 'scheduled' } as Campaign)}
                          className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50" 
                        />
                      </div>
                    </div>
                  </div>
                )}

                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: '#00E65F' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSave(editingItem)}
                  className="w-full bg-primary text-background py-5 rounded-2xl font-black transition-all shadow-lg shadow-primary/20 text-lg flex items-center justify-center gap-3 uppercase tracking-widest mt-8"
                >
                  Save Changes <Save className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
