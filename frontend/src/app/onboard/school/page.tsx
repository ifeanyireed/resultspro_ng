'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResultsProRegistryForm } from '@/components/onboarding/ResultsProRegistryForm';
import { Camera, Image as ImageIcon, Globe, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PhotoHero from '@/components/PhotoHero';

const steps = [
  { id: 1, title: 'Basics' },
  { id: 2, title: 'Branding' },
  { id: 3, title: 'Curriculum' }
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

  const inputStyle = "w-full p-4 bg-slate-50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium";
  const labelStyle = "block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1";
  const cardStyle = "bg-white/80 backdrop-blur-2xl border border-slate-200/60 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

  return (
    <>
      <PhotoHero
        title="School Setup Wizard"
        subtitle="Launch your digital campus, automate results, and scale academic excellence."
        image="/photo06.jpeg"
        tagline="Onboarding"
      />

      <section className="section section-white bg-slate-50 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-sky-400/10 to-transparent rounded-full blur-[80px] pointer-events-none" />

        <div className="container relative z-10">

          {/* STICKY STEP INDICATOR */}
          <div className="sticky top-0 z-40 bg-slate-50/90 backdrop-blur-xl py-6 mb-12 border-b border-slate-200/60">
            <div className="max-w-4xl mx-auto flex justify-center">
              <div className="flex gap-2 p-1.5 bg-white border border-slate-200/60 rounded-full shadow-sm">
                {steps.map((s) => (
                  <button
                    key={s.id}
                    disabled={step < s.id}
                    className={`px-6 py-2.5 rounded-full text-sm font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center ${step === s.id
                        ? 'bg-slate-900 text-white shadow-md'
                        : step > s.id
                          ? 'text-sky-500 hover:bg-slate-50'
                          : 'text-slate-400 cursor-not-allowed'
                      }`}
                    onClick={() => setStep(s.id)}
                  >
                    {step > s.id && <CheckCircle2 className="w-4 h-4 mr-2 -mt-0.5" />}
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {/* STEP 1: BUSINESS BASICS */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">School Basics</h2>
                    <p className="text-slate-500 text-lg font-medium">Tell us a bit about your institution.</p>
                  </div>

                  <div className="w-full">
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
                  </div>

                  <div className="flex justify-end mt-12">
                    <button
                      onClick={nextStep}
                      disabled={!formData.schoolName || !formData.email}
                      className="h-14 px-8 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next: Branding <ArrowRight className="w-5 h-5" />
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
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Your Visual Identity</h2>
                    <p className="text-slate-500 text-lg font-medium">Your profile will adapt to the <span className="font-bold text-sky-500">Brand Colors</span> you choose.</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Card 1: Assets */}
                    <div className={`${cardStyle} md:col-span-1 p-6 space-y-6 flex flex-col`}>
                      <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[11px] border-b border-slate-100 pb-4">Assets</h3>
                      <div className="flex-grow space-y-6">
                        <div className="aspect-square rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 bg-slate-50 hover:border-sky-400 hover:bg-sky-50/50 transition-all cursor-pointer group">
                          <Camera className="w-8 h-8 text-slate-400 mb-3 group-hover:text-sky-500 transition-colors" />
                          <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 group-hover:text-sky-600">School Logo</p>
                        </div>
                        <div className="aspect-[16/9] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-4 bg-slate-50 hover:border-sky-400 hover:bg-sky-50/50 transition-all cursor-pointer group">
                          <ImageIcon className="w-6 h-6 text-slate-400 mb-2 group-hover:text-sky-500 transition-colors" />
                          <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 group-hover:text-sky-600">Cover Photo</p>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Preview & Colors */}
                    <div className={`${cardStyle} md:col-span-2 p-8`}>
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

                  <div className="flex justify-between mt-12">
                    <button onClick={prevStep} className="h-14 px-8 bg-white text-slate-600 border border-slate-200/60 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button onClick={nextStep} className="h-14 px-8 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                      Next: Curriculum <ArrowRight className="w-5 h-5" />
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
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Academic Standards</h2>
                    <p className="text-slate-500 text-lg font-medium">Configure your curriculum and regional standards.</p>
                  </div>

                  <div className={cardStyle}>
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

                      <div className="p-6 bg-sky-50/50 rounded-2xl border border-sky-100/50 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                          <Globe className="w-5 h-5 text-sky-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-sky-900 mb-1">Ecosystem Provisioning</p>
                          <p className="text-sm text-sky-700 leading-relaxed font-medium">
                            ResultsPRO will automatically provision <strong className="font-extrabold text-sky-800">ResultsPRO</strong>, <strong className="font-extrabold text-sky-800">ExamsPRO</strong>, and <strong className="font-extrabold text-sky-800">ClassroomPRO</strong> modules for your school after verification.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-12">
                    <button onClick={prevStep} className="h-14 px-8 bg-white text-slate-600 border border-slate-200/60 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="h-14 px-10 bg-emerald-500 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Provisioning...' : 'Finalize Setup'}
                      {!isSubmitting && <CheckCircle2 className="w-5 h-5" />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
