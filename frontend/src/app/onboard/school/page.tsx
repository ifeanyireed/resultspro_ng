'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResultsProRegistryForm } from '@/components/onboarding/ResultsProRegistryForm';
import { Camera, Image as ImageIcon, Globe, ArrowRight, ArrowLeft, CheckCircle2, Building2, Palette, BookOpen, Quote, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ResultsProStepIndicator } from '@/components/onboarding/ResultsProStepIndicator';

const steps = [
  { id: 1, label: 'BASICS', icon: Building2 },
  { id: 2, label: 'BRANDING', icon: Palette },
  { id: 3, label: 'CURRICULUM', icon: BookOpen }
];

export default function SchoolOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    motto: '',
    email: '',
    phone: '',
    primaryColor: '#146ef5',
    accentColor: '#0f172a',
    country: 'Nigeria',
    curriculum: 'WASSCE / National',
    logoUrl: '' as string | null,
    logoFile: null as File | null,
    logoZoom: 1,
    logoRotate: 0,
    logoCropped: false,
    coverUrl: '' as string | null,
    coverFile: null as File | null,
    coverZoom: 1,
    coverRotate: 0,
    coverCropped: false,
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        logoUrl: url,
        logoFile: file,
        logoCropped: false
      }));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        coverUrl: url,
        coverFile: file,
        coverCropped: false
      }));
    }
  };

  const handleSaveCrop = () => {
    setFormData(prev => ({
      ...prev,
      logoCropped: true
    }));
    triggerToast("School logo cropped and saved successfully!");
  };

  const handleSaveCoverCrop = () => {
    setFormData(prev => ({
      ...prev,
      coverCropped: true
    }));
    triggerToast("Cover photo cropped and saved successfully!");
  };

  const triggerToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const nextStep = () => setStep(s => Math.min(s + 1, steps.length));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push('/admin');
    }, 1500);
  };

  const inputStyle = "w-full p-4 bg-slate-50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium";
  const labelStyle = "block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1";
  const cardStyle = "bg-[#ffffff] border border-[#e2e8f0] p-10 max-w-[800px] mx-auto w-full";

  return (
    <>
      <main className="onboard-page bg-[#fafbfc] min-h-screen flex flex-col font-sans text-slate-900 selection:bg-blue-100" style={{ paddingBottom: '6rem' }}>
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#1e293b] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold text-sm tracking-wide border border-white/10"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              {notification}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-2 md:h-4 w-full shrink-0" />

        <ResultsProStepIndicator 
          steps={steps} 
          activeStepId={step} 
          onStepClick={(id) => {
            if (id === 1) {
              router.push('/onboard');
            } else if (Number(id) < step) {
              setStep(Number(id));
            }
          }} 
        />

        <div className="flex-1 w-full max-w-5xl self-center px-6 md:px-10 pt-4 pb-8 flex flex-col overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {/* STEP 1: BUSINESS BASICS */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="space-y-8 flex flex-col"
              >
                <div style={{ height: '4rem' }} />
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="!text-[2.25rem] md:!text-[3rem] font-bold text-[#0f172a] !text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">School Basics</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-base font-medium mb-4">Tell us a bit about your institution.</p>
                </div>

                <div style={{ height: '1.5rem' }} />

                <ResultsProRegistryForm 
                  data={{
                    name: formData.schoolName,
                    email: formData.email,
                    phone: formData.phone,
                  }}
                  onChange={(newData) => setFormData({ 
                    ...formData, 
                    schoolName: newData.name ?? formData.schoolName,
                    email: newData.email ?? formData.email,
                    phone: newData.phone ?? formData.phone,
                  })}
                  requireOtp={false}
                  requirePassword={false}
                  showName={false}
                  customTopElement={
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      <div className="relative">
                        <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1">Official School Name</label>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="e.g. Royal Academy"
                            value={formData.schoolName}
                            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                            className="focus:border-[#146ef5] focus:ring-1 focus:ring-[#146ef5] transition-all text-slate-800 placeholder:text-slate-400"
                            style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', fontSize: '0.875rem', width: '100%', background: 'white' }}
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1">School Motto</label>
                        <div className="relative">
                          <Quote className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="e.g. Excellence in Service"
                            value={formData.motto}
                            onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                            className="focus:border-[#146ef5] focus:ring-1 focus:ring-[#146ef5] transition-all text-slate-800 placeholder:text-slate-400"
                            style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', fontSize: '0.875rem', width: '100%', background: 'white' }}
                          />
                        </div>
                      </div>
                    </div>
                  }
                />

                <div style={{ height: '4rem' }} />
                <div className="w-full shrink-0 border-t border-gray-200 flex justify-between sticky bottom-0 bg-[#fafbfc] px-6 py-6 z-10" style={{ marginTop: '2rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                  <button 
                    onClick={() => router.push('/onboard')} 
                    className="bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    <ArrowLeft className="w-4 h-4" /> Change Role
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!formData.schoolName || !formData.email}
                    className="bg-[#146ef5] hover:bg-[#146ef5]/90 text-white transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    <span>Next Step</span> <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: BRANDING */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="space-y-8 flex flex-col"
              >
                <div style={{ height: '4rem' }} />
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="!text-[2.25rem] md:!text-[3rem] font-bold text-[#0f172a] !text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Your Visual Identity</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-base font-medium mb-4">Your profile will adapt to the brand colors you choose.</p>
                </div>

                <div style={{ height: '1.5rem' }} />

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {/* Card 1: Assets */}
                  <div className={cardStyle} style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.02)', borderRadius: '4px', padding: '2.5rem', backgroundColor: '#ffffff' }}>
                    <h3 className="font-bold text-slate-900 tracking-wider border-b border-slate-100 pb-4 text-center" style={{ fontSize: '20px', marginBottom: '2rem' }}>Assets</h3>
                    <div className="flex-grow flex flex-col items-center w-full">
                      <div className="flex flex-col w-full items-center" style={{ marginBottom: '2.5rem' }}>
                        <label 
                          className="relative mx-auto rounded-full flex items-center justify-center cursor-pointer group transition-all"
                          style={{ aspectRatio: '1/1', width: '75%', boxShadow: '0 15px 35px -5px rgba(0,0,0,0.1), 0 10px 15px -5px rgba(0,0,0,0.04)' }}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="hidden"
                          />

                          {formData.logoUrl ? (
                            <div className="w-full h-full rounded-full overflow-hidden relative">
                              <motion.div
                                className="relative w-full h-full"
                                animate={{ scale: formData.logoCropped ? 1 : 1.05 }}
                              >
                                <img
                                  src={formData.logoUrl}
                                  alt="Logo Source"
                                  className="absolute object-cover transition-transform duration-75"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    transform: `scale(${formData.logoZoom}) rotate(${formData.logoRotate}deg)`,
                                  }}
                                />
                                {!formData.logoCropped && (
                                  <div className="absolute inset-0 border-2 border-dashed border-blue-500 rounded-full pointer-events-none bg-black/15 shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]" />
                                )}
                              </motion.div>
                            </div>
                          ) : (
                            <div 
                              className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
                              style={{
                                backgroundImage: 'url(/abstract-blue-1.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                            >
                              <div className="absolute inset-0 bg-black/40 rounded-full group-hover:bg-black/50 transition-colors"></div>
                              <div className="z-10 flex flex-col items-center justify-center gap-1">
                                <Camera className="w-10 h-10 text-white/90 transition-colors group-hover:text-white drop-shadow-md" strokeWidth={0.5} />
                                <span className="text-white font-black uppercase tracking-widest text-[10px] drop-shadow-md">Logo</span>
                              </div>
                            </div>
                          )}

                          <div className="absolute bottom-1 right-1 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                            <Plus className="w-5 h-5" strokeWidth={2} />
                          </div>
                        </label>
                        
                        {formData.logoUrl && !formData.logoCropped && (
                          <div className="flex flex-col gap-3 mt-4" style={{ width: '75%' }}>
                            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col gap-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex justify-between">
                                <span>Zoom</span>
                                <span className="text-blue-600">{Math.round(formData.logoZoom * 100)}%</span>
                              </label>
                              <input 
                                type="range" min="1" max="3" step="0.1"
                                value={formData.logoZoom}
                                onChange={(e) => setFormData(prev => ({ ...prev, logoZoom: parseFloat(e.target.value) }))}
                                className="w-full accent-blue-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                            
                            <button
                              onClick={(e) => { e.preventDefault(); handleSaveCrop(); }}
                              className="w-full bg-slate-900 hover:bg-black text-white text-[11px] font-black uppercase tracking-widest py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Confirm Crop
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col w-full items-center gap-2 mt-4">
                        <label 
                          className="relative mx-auto rounded-3xl flex flex-col items-center justify-center cursor-pointer group transition-all"
                          style={{ aspectRatio: '1/1', width: '90%', boxShadow: '0 15px 35px -5px rgba(0,0,0,0.1), 0 10px 15px -5px rgba(0,0,0,0.04)' }}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverChange}
                            className="hidden"
                          />
                          {formData.coverUrl ? (
                            <div className="w-full h-full rounded-3xl overflow-hidden relative">
                              <motion.div
                                className="relative w-full h-full"
                                animate={{ scale: formData.coverCropped ? 1 : 1.05 }}
                              >
                                <img
                                  src={formData.coverUrl}
                                  alt="Cover Source"
                                  className="absolute object-cover transition-transform duration-75"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    transform: `scale(${formData.coverZoom}) rotate(${formData.coverRotate}deg)`,
                                  }}
                                />
                                {!formData.coverCropped && (
                                  <div className="absolute inset-0 border-2 border-dashed border-blue-500 rounded-3xl pointer-events-none bg-black/15 shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]" />
                                )}
                              </motion.div>
                            </div>
                          ) : (
                            <div 
                              className="w-full h-full rounded-3xl flex items-center justify-center overflow-hidden"
                              style={{
                                backgroundImage: 'url(/abstract-blue-5.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                            >
                              <div className="absolute inset-0 bg-black/40 rounded-3xl group-hover:bg-black/50 transition-colors"></div>
                              <div className="z-10 flex flex-col items-center justify-center mb-6">
                                <ImageIcon className="w-10 h-10 text-white/90 transition-colors group-hover:text-white drop-shadow-md" strokeWidth={0.5} />
                              </div>
                              <div 
                                className="absolute border whitespace-nowrap text-white transition-all font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                style={{ width: '85%', bottom: '8px', left: '50%', transform: 'translateX(-50%)', padding: '0.6rem 1.5rem', borderRadius: '9999px', backgroundColor: '#146ef5', borderColor: '#146ef5' }}
                              >
                                Upload Cover
                              </div>
                            </div>
                          )}
                        </label>
                        
                        {formData.coverUrl && !formData.coverCropped && (
                          <div className="flex flex-col gap-3 mt-4" style={{ width: '90%' }}>
                            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col gap-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex justify-between">
                                <span>Zoom</span>
                                <span className="text-blue-600">{Math.round(formData.coverZoom * 100)}%</span>
                              </label>
                              <input 
                                type="range" min="1" max="3" step="0.1"
                                value={formData.coverZoom}
                                onChange={(e) => setFormData(prev => ({ ...prev, coverZoom: parseFloat(e.target.value) }))}
                                className="w-full accent-blue-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                            
                            <button
                              onClick={(e) => { e.preventDefault(); handleSaveCoverCrop(); }}
                              className="w-full bg-slate-900 hover:bg-black text-white text-[11px] font-black uppercase tracking-widest py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Confirm Crop
                            </button>
                          </div>
                        )}
                      </div>
                      <div style={{ height: '2rem' }}></div>
                    </div>
                  </div>

                  {/* Card 2: Preview & Colors */}
                  <div className={`${cardStyle} md:col-span-2`} style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.02)', borderRadius: '4px', padding: '2.5rem', backgroundColor: '#ffffff' }}>
                    <h3 className="font-bold text-slate-900 tracking-wider border-b border-slate-100 pb-4" style={{ fontSize: '20px', marginBottom: '2rem' }}>
                      Platform Preview
                    </h3>

                    <div className="grid grid-cols-2 gap-8 mb-10">
                      <div>
                        <div className="flex gap-4 items-center">
                          <div 
                            className="relative shadow-sm shrink-0"
                            style={{ backgroundColor: formData.primaryColor, width: '2.5rem', height: '2.5rem', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}
                          >
                            <input
                              type="color"
                              value={formData.primaryColor}
                              onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                          <div className="flex flex-col" style={{ gap: '0.1rem' }}>
                            <span className="font-bold text-slate-800 uppercase tracking-widest leading-none" style={{ fontSize: '16px' }}>{formData.primaryColor}</span>
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 leading-none">Primary Color</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex gap-4 items-center">
                          <div 
                            className="relative shadow-sm shrink-0"
                            style={{ backgroundColor: formData.accentColor, width: '2.5rem', height: '2.5rem', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}
                          >
                            <input
                              type="color"
                              value={formData.accentColor}
                              onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                          <div className="flex flex-col" style={{ gap: '0.1rem' }}>
                            <span className="font-bold text-slate-800 uppercase tracking-widest leading-none" style={{ fontSize: '16px' }}>{formData.accentColor}</span>
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 leading-none">Accent Color</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div 
                      className="border border-slate-200/80 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40 bg-white transition-transform hover:-translate-y-1 duration-500"
                      style={{ marginTop: '3rem' }}
                    >
                      <div 
                        className="h-28 w-full transition-colors duration-500 relative overflow-hidden" 
                        style={{ 
                          backgroundColor: formData.primaryColor,
                          backgroundImage: formData.coverUrl ? `url(${formData.coverUrl})` : 'url(/abstract-blue-5.jpg)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        {/* Dark overlay filter on header */}
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="p-5 flex items-center justify-end relative z-10 h-full">
                          <div className="space-y-2">
                            <div className="h-3 w-24 bg-white/40 rounded-full" />
                            <div className="h-2 w-16 bg-white/20 rounded-full ml-auto" />
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                        <div style={{ marginTop: '-1.75rem', marginBottom: '1rem', position: 'relative', zIndex: 20 }}>
                          <div 
                            className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden relative"
                            style={{ border: '1.5px solid white' }}
                          >
                            {formData.logoUrl ? (
                              <img src={formData.logoUrl} className="w-full h-full object-contain" alt="School Logo" />
                            ) : (
                              <div 
                                className="w-full h-full" 
                                style={{
                                  backgroundImage: 'url(/abstract-blue-1.jpg)',
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <h4 className="font-extrabold text-slate-900 tracking-tight leading-none" style={{ fontSize: '20px', marginBottom: '0.25rem' }}>{formData.schoolName || "Your School Name"}</h4>
                        <p className="text-slate-400 font-bold uppercase tracking-widest line-clamp-2" style={{ fontSize: '9px', lineHeight: '1.4' }}>
                          {formData.motto || "Your school motto will appear here for students and parents to see."}
                        </p>
                        <div className="flex justify-between items-center border-t border-slate-100" style={{ marginTop: '2rem', paddingTop: '2rem' }}>
                          <div className="flex gap-1.5">
                            {[...Array(5)].map((_, i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#146ef5', opacity: i === 0 ? 1 : 0.3 }} />)}
                          </div>
                          <div className="w-16 h-8 rounded-full shadow-sm" style={{ backgroundColor: '#146ef5' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ height: '4rem' }} />
                <div className="w-full shrink-0 border-t border-gray-200 flex justify-between sticky bottom-0 bg-[#fafbfc] px-6 py-6 z-10" style={{ marginTop: '2rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                  <button 
                    onClick={prevStep} 
                    className="bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-[#146ef5] hover:bg-[#146ef5]/90 text-white transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    <span>Next Step</span> <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CURRICULUM */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="space-y-8 flex flex-col"
              >
                <div style={{ height: '4rem' }} />
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="!text-[2.25rem] md:!text-[3rem] font-bold text-[#0f172a] !text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Academic Standards</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-base font-medium mb-4">Configure your curriculum and regional standards.</p>
                </div>

                <div style={{ height: '1.5rem' }} />

                <div className={cardStyle} style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.02)', borderRadius: '4px', padding: '2.5rem', margin: '0 auto', maxWidth: '800px', width: '100%', backgroundColor: '#ffffff' }}>
                  <div className="space-y-8">
                    <div>
                      <label className={labelStyle}>Operating Country</label>
                      <select
                        value={formData.country}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, country: e.target.value })}
                        className={`${inputStyle} appearance-none bg-white cursor-pointer`}
                      >
                        <option>Nigeria</option>
                        <option>Ghana</option>
                        <option>Kenya</option>
                        <option>UK (International)</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelStyle}>Standard Curriculum</label>
                      <select
                        value={formData.curriculum}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, curriculum: e.target.value })}
                        className={`${inputStyle} appearance-none bg-white cursor-pointer`}
                      >
                        <option>WASSCE / National Curriculum</option>
                        <option>Cambridge International</option>
                        <option>British Curriculum</option>
                        <option>Hybrid (Mixed)</option>
                      </select>
                    </div>

                    <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <Globe className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-blue-900 mb-1">Ecosystem Provisioning</p>
                        <p className="text-sm text-blue-700 leading-relaxed font-medium">
                          ResultsPRO will automatically provision <strong className="font-extrabold text-blue-800">ResultsPRO</strong>, <strong className="font-extrabold text-blue-800">ExamsPRO</strong>, and <strong className="font-extrabold text-blue-800">ClassroomPRO</strong> modules for your school after verification.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ height: '4rem' }} />
                <div className="w-full shrink-0 border-t border-gray-200 flex justify-between sticky bottom-0 bg-[#fafbfc] px-6 py-6 z-10" style={{ marginTop: '2rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                  <button 
                    onClick={prevStep} 
                    className="bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Provisioning...</span>
                      </>
                    ) : (
                      <>
                        <span>Finalize Setup</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
