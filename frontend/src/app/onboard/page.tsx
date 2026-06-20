'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, ClipboardList, Phone, ShieldCheck, Camera, CreditCard, ArrowRight, User, School, Handshake } from 'lucide-react';

const steps = [
  { id: 'GROUP', icon: LayoutGrid, label: 'GROUP' },
  { id: 'BASICS', icon: ClipboardList, label: 'BASICS' },
  { id: 'CONTACT', icon: Phone, label: 'CONTACT' },
  { id: 'VERIFY', icon: ShieldCheck, label: 'VERIFY' },
  { id: 'BRANDING', icon: Camera, label: 'BRANDING' },
  { id: 'PLAN', icon: CreditCard, label: 'PLAN' },
];

const roles = [
  {
    id: 'parent',
    title: "Parent / Student",
    description: "TRACK PROGRESS & VIEW RESULTS",
    icon: User,
    color: "text-rose-500",
    link: "https://schoolhub.resultspro.ng",
  },
  {
    id: 'school',
    title: "School Admin",
    description: "DEPLOY YOUR DIGITAL CAMPUS",
    icon: School,
    color: "text-amber-500",
    link: "/onboard/school",
  },
  {
    id: 'agent',
    title: "Agent / Partner",
    description: "JOIN OUR PARTNER NETWORK",
    icon: Handshake,
    color: "text-blue-600",
    link: "/onboard/agent",
  }
];

export default function OnboardPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const getNextLink = () => {
    if (!selectedRole) return '#';
    const role = roles.find(r => r.id === selectedRole);
    return role ? role.link : '#';
  };

  return (
    <main className="bg-[#fafbfc] min-h-screen flex flex-col font-sans text-slate-900 selection:bg-blue-100">
      {/* Top Navigation Steps */}
      <div className="w-full pt-10 pb-8 flex justify-center border-b border-gray-100 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-8 md:gap-20 overflow-x-auto px-6 hide-scrollbar">
          {steps.map((step) => {
            const isActive = step.id === 'GROUP';
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex flex-col items-center gap-3 shrink-0">
                <div className={`w-[46px] h-[46px] rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-blue-600 text-white ring-1 ring-blue-600 ring-offset-[4px]' : 'bg-white border border-gray-200 text-gray-400'}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[9px] font-bold tracking-widest ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 flex flex-col">
        {/* Headers */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-[2.75rem] font-extrabold text-[#0f172a] !text-[#0f172a] ![text-shadow:none] tracking-tight mb-4">Choose your specialty</h1>
          <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-base md:text-[1.1rem] font-medium">Follow the steps to precisely categorize your business.</p>
        </div>

        <div className="text-center mb-16">
          <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 tracking-[0.2em] uppercase transition-colors">
            Reset Progress & Start Over
          </button>
        </div>

        {/* Section Label */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
          <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">1. SELECT SPECIALTY GROUP</span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`text-left bg-white rounded-[1.5rem] p-6 md:p-8 flex flex-col transition-all duration-300 border-2 outline-none
                  ${isSelected ? 'border-blue-600 shadow-[0_8px_30px_rgb(37,99,235,0.12)] -translate-y-1' : 'border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1'}`}
              >
                <div className="mb-6 md:mb-8">
                  <Icon size={26} className={`${role.color} ${isSelected ? 'scale-110' : ''} transition-transform`} strokeWidth={2.5} />
                </div>
                
                <h3 className="text-[1.35rem] font-extrabold text-slate-900 !text-slate-900 ![text-shadow:none] mb-2 leading-tight">{role.title}</h3>
                <p className="text-[9px] font-bold text-gray-400 !text-gray-400 ![text-shadow:none] uppercase tracking-widest leading-relaxed">
                  {role.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <div className="mt-auto flex justify-end pt-10 pb-8 border-t border-gray-100">
          <Link 
            href={getNextLink()}
            className={`h-[3.25rem] px-8 rounded-full font-bold flex items-center gap-2 transition-all ${selectedRole ? 'bg-[#8ca5f8] hover:bg-[#7b96f5] text-white shadow-md hover:-translate-y-0.5' : 'bg-[#8ca5f8]/50 text-white/80 pointer-events-none'}`}
          >
            Next: Business Basics <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}