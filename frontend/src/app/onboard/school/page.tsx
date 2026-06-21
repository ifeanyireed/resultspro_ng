'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResultsProRegistryForm } from '@/components/onboarding/ResultsProRegistryForm';
import { Camera, Image as ImageIcon, Globe, ArrowRight, ArrowLeft, CheckCircle2, Building2, Palette, BookOpen } from 'lucide-react';
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
    curriculum: 'WASSCE / National'
  });

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
                    <div className="space-y-6 mb-6">
                      <div>
                        <label className={labelStyle}>Official School Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Royal Academy"
                          value={formData.schoolName}
                          onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                          className={inputStyle}
                        />
                      </div>
                      <div>
                        <label className={labelStyle}>School Motto</label>
                        <input
                          type="text"
                          placeholder="e.g. Excellence in Service"
                          value={formData.motto}
                          onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                          className={inputStyle}
                        />
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
                    <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[11px] border-b border-slate-100 pb-4 mb-6">Assets</h3>
                    <div className="flex-grow space-y-6">
                      <div className="aspect-square rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                        <Camera className="w-8 h-8 text-slate-400 mb-3 group-hover:text-blue-500 transition-colors" />
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 group-hover:text-blue-600">School Logo</p>
                      </div>
                      <div className="aspect-[16/9] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-4 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                        <ImageIcon className="w-6 h-6 text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" />
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 group-hover:text-blue-600">Cover Photo</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Preview & Colors */}
                  <div className={`${cardStyle} md:col-span-2`} style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.02)', borderRadius: '4px', padding: '2.5rem', backgroundColor: '#ffffff' }}>
                    <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[11px] border-b border-slate-100 pb-4 mb-6">
                      Platform Preview
                    </h3>

                    <div className="grid grid-cols-2 gap-8 mb-10">
                      <div>
                        <label className={labelStyle}>Primary Color</label>
                        <div className="flex gap-4 items-center bg-slate-50 p-2 rounded-2xl border border-slate-200/60">
                          <input
                            type="color"
                            value={formData.primaryColor}
                            onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                            className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0 shadow-sm bg-transparent"
                          />
                          <span className="font-bold text-slate-600 text-sm uppercase tracking-wider">{formData.primaryColor}</span>
                        </div>
                      </div>
                      <div>
                        <label className={labelStyle}>Accent Color</label>
                        <div className="flex gap-4 items-center bg-slate-50 p-2 rounded-2xl border border-slate-200/60">
                          <input
                            type="color"
                            value={formData.accentColor}
                            onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                            className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0 shadow-sm bg-transparent"
                          />
                          <span className="font-bold text-slate-600 text-sm uppercase tracking-wider">{formData.accentColor}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-slate-200/80 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40 bg-white mt-auto transition-transform hover:-translate-y-1 duration-500">
                      <div className="h-28 w-full transition-colors duration-500 relative overflow-hidden" style={{ backgroundColor: formData.primaryColor }}>
                        {/* Glass overlay on header */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                        <div className="p-5 flex items-center gap-4 relative z-10">
                          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-sm" />
                          <div className="space-y-2">
                            <div className="h-3 w-32 bg-white/40 rounded-full" />
                            <div className="h-2 w-20 bg-white/20 rounded-full" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-base font-extrabold mb-2 text-slate-900 tracking-tight">{formData.schoolName || "Your School Name"}</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                          {formData.motto || "Your school motto will appear here for students and parents to see."}
                        </p>
                        <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100">
                          <div className="flex gap-1.5">
                            {[...Array(5)].map((_, i) => <div key={i} className="w-2.5 h-2.5 rounded-full bg-slate-200" />)}
                          </div>
                          <div className="w-16 h-8 rounded-full opacity-10 transition-colors duration-500" style={{ backgroundColor: formData.primaryColor }} />
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
