'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Key,
  User,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  AlertCircle,
  LayoutGrid,
  Eye,
  EyeOff,
  Phone,
  Compass,
  Check,
  RotateCw,
  Scissors,
  Mail,
  ShieldCheck,
  Send,
  Sparkles,
  School,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ResultsProRegistryForm } from '@/components/onboarding/ResultsProRegistryForm';

const steps = [
  { id: 1, label: 'ROLE', icon: LayoutGrid },
  { id: 2, label: 'INVITE', icon: Key },
  { id: 3, label: 'PROFILE', icon: User },
  { id: 4, label: 'CLASSES', icon: BookOpen }
];

export default function TeacherOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(2); // Starts at Step 2 (INVITE)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [isSendingCorrection, setIsSendingCorrection] = useState(false);
  const [correctionSuccess, setCorrectionSuccess] = useState(false);
  const [correctionText, setCorrectionText] = useState('');

  // Custom alerts/toasts
  const [notification, setNotification] = useState<string | null>(null);

  // Form States
  const [formData, setFormData] = useState({
    // Pre-filled read-only fields
    name: 'Mrs. Grace Daniels',
    email: 'teacher@greenwood.edu.ng',
    schoolName: 'Greenwood High School',

    // Step 2
    password: '',

    // Step 3
    phone: '',
    gender: '',
    specialization: '',
    avatarUrl: '' as string | null,
    avatarFile: null as File | null,
    avatarZoom: 1.5,
    avatarRotate: 0,
    avatarCropped: false,

    // Step 4
    correctionSubmitted: false,
  });

  // Sample avatar image for crop mockup
  const sampleAvatarImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop";

  // Form data handlers
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  };

  // Password validation checks
  const passLength = formData.password.length >= 8;
  const passHasUpper = /[A-Z]/.test(formData.password);
  const passHasNumber = /[0-9]/.test(formData.password);
  const passHasSpecial = /[^A-Za-z0-9]/.test(formData.password);

  const getPasswordStrength = () => {
    if (!formData.password) return { score: 0, text: 'No Password', color: 'bg-slate-200' };
    let score = 0;
    if (passLength) score++;
    if (passHasUpper) score++;
    if (passHasNumber) score++;
    if (passHasSpecial) score++;

    if (score <= 1) return { score: 1, text: 'Weak', color: 'bg-rose-500' };
    if (score <= 3) return { score: 2, text: 'Medium', color: 'bg-amber-500' };
    return { score: 3, text: 'Strong', color: 'bg-emerald-500' };
  };

  const passwordStrength = getPasswordStrength();
  const isStep2Valid = formData.password && passwordStrength.score >= 2;

  // File drop/upload triggers
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        avatarUrl: url,
        avatarFile: file,
        avatarCropped: false
      }));
    }
  };

  const useSampleAvatar = () => {
    setFormData(prev => ({
      ...prev,
      avatarUrl: sampleAvatarImage,
      avatarCropped: false
    }));
  };

  const handleSaveCrop = () => {
    setFormData(prev => ({
      ...prev,
      avatarCropped: true
    }));
    triggerToast("Profile photo cropped and saved successfully!");
  };

  const triggerToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const isStep3Valid =
    formData.phone.length >= 10 &&
    formData.gender !== '' &&
    formData.specialization !== '' &&
    formData.avatarCropped;

  // Class assignment verification data
  const assignments = [
    { id: 1, class: 'Grade 10A', subject: 'Mathematics', type: 'Core Subject', periods: 4 },
    { id: 2, class: 'Grade 10B', subject: 'Further Mathematics', type: 'Elective Subject', periods: 3 },
    { id: 3, class: 'Grade 11A', subject: 'Mathematics', type: 'Core Subject', periods: 4 }
  ];

  // Steps navigation
  const nextStep = () => setStep(s => Math.min(s + 1, steps.length));
  const prevStep = () => {
    if (step === 2) {
      router.push('/onboard');
    } else {
      setStep(s => Math.max(s - 1, 2));
    }
  };

  // Submit Handler
  const handleFinalize = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      triggerToast("Onboarding finalized successfully! Welcome aboard.");
      setTimeout(() => {
        router.push('/teacher');
      }, 1500);
    }, 2000);
  };

  // Simulation of Admin Notification alert
  const sendCorrectionRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctionText.trim()) return;

    setIsSendingCorrection(true);
    setTimeout(() => {
      setIsSendingCorrection(false);
      setCorrectionSuccess(true);
      setFormData(prev => ({ ...prev, correctionSubmitted: true }));
      triggerToast("Alert dispatched! Greenwood High School Admin has been notified.");
      setTimeout(() => {
        setIsCorrectionModalOpen(false);
        setCorrectionSuccess(false);
        setCorrectionText('');
      }, 2000);
    }, 1500);
  };

  // Styling Variables (Matches resultspro UI aesthetics)
  const inputStyle = "w-full p-4 bg-slate-50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium";
  const labelStyle = "block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1";
  const cardStyle = "bg-white/80 backdrop-blur-2xl border border-slate-200/60 rounded-[2.25rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)]";

  return (
    <>
      {/* Global Notifications/Alert Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-white/10 flex items-center gap-3 backdrop-blur-md bg-opacity-95">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold leading-normal">{notification}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-[#fafbfc] min-h-screen flex flex-col font-sans text-slate-900 selection:bg-blue-100" style={{ paddingBottom: '6rem' }}>
        <div className="h-2 md:h-4 w-full shrink-0" />

        {/* Top Navigation Steps */}
        <div className="sticky top-0 z-50 w-full shrink-0 pt-8 pb-10 flex justify-center border-b border-gray-100 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-8 md:gap-16 overflow-x-auto px-6 py-5 hide-scrollbar">
            {steps.map((s) => {
              const isActive = s.id === step;
              const isPast = s.id < step;
              const Icon = s.icon;

              return (
                <div
                  key={s.id}
                  onClick={() => {
                    if (s.id === 1) {
                      router.push('/onboard');
                    } else if (isPast) {
                      setStep(s.id);
                    }
                  }}
                  className={`flex flex-col items-center gap-2 shrink-0 p-2 group transition-all
                    ${(isPast || s.id === 1) ? 'cursor-pointer' : 'pointer-events-none'}`}
                >
                  {/* Outer Ring Container */}
                  <div
                    className={`w-[44px] h-[44px] rounded-full flex items-center justify-center p-[3px] bg-transparent transition-all duration-300
                      ${isActive
                        ? 'border border-blue-600'
                        : 'border border-transparent group-hover:border-blue-600'
                      }`}
                  >
                    {/* Inner Icon Circle */}
                    <div
                      className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-all duration-300
                        ${isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-400 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white'
                        }`}
                    >
                      <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                  </div>
                  <span className={`text-[9.5px] font-bold tracking-widest transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-900'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 w-full max-w-5xl self-center px-6 md:px-10 pt-4 pb-8 flex flex-col overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {/* SCREEN 1 / STEP 2: INVITATION VERIFICATION */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="space-y-8 flex flex-col"
              >
                {/* Headers */}
                <div className="text-center mb-6 flex flex-col items-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-extrabold text-[10px] tracking-wider uppercase mb-3">
                    <School className="w-3.5 h-3.5" />
                    <span>{formData.schoolName}</span>
                  </div>
                  <h1 className="!text-[3rem] md:!text-[4.2rem] font-bold text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Invitation Verification</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-[1.05rem] font-medium mb-4">Verify your pre-approved classroom registry details and secure your access.</p>
                </div>

                {/* Spacer above Section Label */}
                <div style={{ height: '1.5rem' }} />

                {/* Section Label */}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-3.5 bg-blue-600 rounded-full"></div>
                  <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">2. VERIFY INVITATION</span>
                </div>
                <div style={{ height: '1.25rem' }} />

                <div className={cardStyle}>
                  <ResultsProRegistryForm 
                    data={{
                      name: formData.name,
                      email: formData.email,
                      phone: formData.phone,
                      password: formData.password
                    }}
                    onChange={(newData) => {
                      if (newData.password !== undefined) {
                        setFormData({ ...formData, password: newData.password });
                      }
                    }}
                    requireOtp={false}
                    showName={false}
                    showPhone={false}
                    readOnlyFields={['email']}
                    customTopElement={
                      <div className="mb-6">
                        <label className={labelStyle}>Assigned School</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <School className="w-4 h-4 text-slate-400" />
                          </div>
                          <input
                            type="text"
                            value={formData.schoolName}
                            readOnly
                            className={`${inputStyle} pl-11 text-slate-400 select-all cursor-default bg-slate-100 border-slate-200`}
                          />
                        </div>
                      </div>
                    }
                  />
                </div>

                {/* Bottom Navigation Button Bar */}
                <div className="w-full shrink-0 border-t border-gray-200 flex justify-between sticky bottom-0 bg-[#fafbfc] px-6 py-6 z-10" style={{ marginTop: '2rem' }}>
                  <button
                    onClick={prevStep}
                    className="h-12 px-6 bg-white text-slate-600 border border-slate-200/60 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4" /> Cancel
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!isStep2Valid}
                    className="h-12 px-8 bg-[#146ef5] hover:bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next: Complete Profile</span> <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 2 / STEP 3: PROFILE COMPLETION */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-8 flex flex-col"
              >
                {/* Headers */}
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="!text-[3rem] md:!text-[4.2rem] font-bold text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Profile Completion</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-[1.05rem] font-medium mb-4">Verify bio-data items and align specialization preferences.</p>
                </div>

                {/* Spacer above Section Label */}
                <div style={{ height: '1.5rem' }} />

                {/* Section Label */}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-3.5 bg-blue-600 rounded-full"></div>
                  <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">3. COMPLETE PROFILE</span>
                </div>
                <div style={{ height: '1.25rem' }} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Inputs Column */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className={cardStyle}>
                      <div className="space-y-5">

                        {/* Phone Number */}
                        <div>
                          <label className={labelStyle}>Contact Phone Number</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Phone className="w-4 h-4 text-slate-400" />
                            </div>
                            <input
                              type="tel"
                              placeholder="+234 803 123 4567"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className={`${inputStyle} pl-11`}
                            />
                          </div>
                        </div>

                        {/* Gender Selection */}
                        <div>
                          <label className={labelStyle}>Gender</label>
                          <div className="grid grid-cols-3 gap-3">
                            {['Female', 'Male', 'Other'].map((g) => (
                              <button
                                key={g}
                                type="button"
                                onClick={() => setFormData({ ...formData, gender: g })}
                                className={`p-3.5 rounded-xl border text-xs font-bold transition-all ${formData.gender === g
                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                  }`}
                              >
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Specialization dropdown */}
                        <div>
                          <label className={labelStyle}>Academic Specialization</label>
                          <div className="relative">
                            <select
                              value={formData.specialization}
                              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                              className={`${inputStyle} appearance-none bg-white cursor-pointer pr-10`}
                            >
                              <option value="" disabled>Select Specialization Degree</option>
                              <option value="B.Sc. Mathematics">B.Sc. Mathematics</option>
                              <option value="B.Ed. Mathematics">B.Ed. Mathematics</option>
                              <option value="B.A. English Language">B.A. English Language</option>
                              <option value="M.Sc. Physics">M.Sc. Physics</option>
                              <option value="B.Sc. Chemistry">B.Sc. Chemistry</option>
                              <option value="B.Ed. Science Education">B.Ed. Science Education</option>
                              <option value="M.Ed. Educational Management">M.Ed. Educational Management</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                              <Compass className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Avatar Upload / Crop UI Column */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white border border-slate-200/60 rounded-[2.25rem] p-6 shadow-md">
                      <label className={labelStyle}>Profile Avatar Setup</label>

                      <div className="mt-3 flex flex-col items-center">
                        {/* Image Box */}
                        <div className="relative w-40 h-40 rounded-full border-4 border-slate-100 overflow-hidden bg-slate-50 flex items-center justify-center shadow-inner group">
                          {formData.avatarUrl ? (
                            <motion.div
                              className="relative w-full h-full"
                              animate={{ scale: formData.avatarCropped ? 1 : 1.05 }}
                            >
                              {/* Crop viewport screen */}
                              <img
                                src={formData.avatarUrl}
                                alt="Avatar Source"
                                className="absolute object-cover transition-transform duration-75"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  transform: `scale(${formData.avatarZoom}) rotate(${formData.avatarRotate}deg)`,
                                }}
                              />

                              {/* Overlay circle crop boundary */}
                              {!formData.avatarCropped && (
                                <div className="absolute inset-0 border-2 border-dashed border-blue-500 rounded-full pointer-events-none bg-black/15 shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]" />
                              )}
                            </motion.div>
                          ) : (
                            <div className="text-center p-4">
                              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">No Photo</span>
                            </div>
                          )}
                        </div>

                        {/* Upload / Sandbox Triggers */}
                        <div className="mt-4 flex flex-col gap-2 w-full">
                          <div className="flex gap-2">
                            <label className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                              />
                            </label>

                            <button
                              type="button"
                              onClick={useSampleAvatar}
                              className="px-3 h-9 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-xl border border-blue-100 transition-all"
                            >
                              Use Sample
                            </button>
                          </div>

                          {/* CROP CONTROLS (Only if image loaded and not finalized) */}
                          {formData.avatarUrl && !formData.avatarCropped && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-3"
                            >
                              <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                                <Scissors className="w-3 h-3 text-blue-500" /> Image Crop Controls
                              </span>

                              {/* Zoom slider */}
                              <div className="space-y-1">
                                <div className="flex justify-between text-[9px] font-bold text-slate-500">
                                  <span>Zoom Scale</span>
                                  <span>{formData.avatarZoom.toFixed(1)}x</span>
                                </div>
                                <input
                                  type="range"
                                  min="1"
                                  max="3"
                                  step="0.1"
                                  value={formData.avatarZoom}
                                  onChange={(e) => setFormData({ ...formData, avatarZoom: parseFloat(e.target.value) })}
                                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                              </div>

                              {/* Rotation slider */}
                              <div className="space-y-1">
                                <div className="flex justify-between text-[9px] font-bold text-slate-500">
                                  <span>Rotate Angle</span>
                                  <span>{formData.avatarRotate}°</span>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="360"
                                  value={formData.avatarRotate}
                                  onChange={(e) => setFormData({ ...formData, avatarRotate: parseInt(e.target.value) })}
                                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={handleSaveCrop}
                                className="w-full h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm shadow-blue-500/10 flex items-center justify-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" /> Save Crop Preview
                              </button>
                            </motion.div>
                          )}

                          {formData.avatarCropped && (
                            <div className="mt-2 p-2 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between px-3">
                              <span className="text-[10px] font-bold text-emerald-800 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Photo Cropped
                              </span>
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, avatarCropped: false })}
                                className="text-[9px] font-extrabold uppercase text-slate-400 hover:text-blue-600 transition-colors"
                              >
                                Adjust
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation Button Bar */}
                <div className="w-full shrink-0 border-t border-gray-200 flex justify-between sticky bottom-0 bg-[#fafbfc] px-6 py-6 z-10" style={{ marginTop: '2rem' }}>
                  <button onClick={prevStep} className="h-12 px-6 bg-white text-slate-600 border border-slate-200/60 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!isStep3Valid}
                    className="h-12 px-8 bg-[#146ef5] hover:bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next: Classes & Subjects</span> <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 3 / STEP 4: ASSIGNMENT VERIFICATION */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-8 flex flex-col"
              >
                {/* Headers */}
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="!text-[3rem] md:!text-[4.2rem] font-bold text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Assignment Verification</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-[1.05rem] font-medium mb-4">Verify classrooms and curriculums assigned to your staff profile.</p>
                </div>

                {/* Spacer above Section Label */}
                <div style={{ height: '1.5rem' }} />

                {/* Section Label */}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-3.5 bg-blue-600 rounded-full"></div>
                  <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">4. VERIFY CLASSES</span>
                </div>
                <div style={{ height: '1.25rem' }} />

                <div className={cardStyle}>
                  <div className="space-y-6">

                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Class & Course Assignments</span>
                        <h4 className="text-sm font-bold text-slate-800 mt-1">Landed Schedule Profile</h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsCorrectionModalOpen(true)}
                        className={`h-9 px-4 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${formData.correctionSubmitted
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formData.correctionSubmitted ? "Review Request Sent" : "Request Correction"}</span>
                      </button>
                    </div>

                    {/* Read-Only Table/Cards List */}
                    <div className="space-y-3">
                      {assignments.map((asg) => (
                        <div
                          key={asg.id}
                          className="p-4 bg-slate-50 border border-slate-200/50 hover:border-blue-500/20 rounded-2.5xl transition-all flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                              <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="text-sm font-bold text-slate-800 leading-tight">{asg.class} - {asg.subject}</h5>
                              <span className="text-[10px] font-medium text-slate-400 mt-1 block">{asg.type} • {asg.periods} periods per week</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 border border-slate-200/40 text-slate-600 px-3 py-1.5 rounded-xl shrink-0">
                            Active Listing
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100/60 flex items-start gap-3 mt-4">
                      <AlertCircle className="w-4 h-4 text-sky-600 mt-0.5 shrink-0 animate-bounce" />
                      <div className="text-[11px] font-semibold text-sky-900 leading-relaxed">
                        Verify that these classes match your physical workload allocation. If there is a discrepancy, click
                        <span className="font-extrabold text-blue-600 px-1">Request Correction</span>. The wizard can still be finalized.
                      </div>
                    </div>

                    {formData.correctionSubmitted && (
                      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3 mt-2">
                        <CheckCircle2 className="w-4.5 h-4.5 text-amber-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-widest block leading-none">Correction Alert Registered</span>
                          <p className="text-[10.5px] font-semibold text-amber-900/80 leading-normal mt-1">
                            Your report was successfully delivered to the School Administrator. They can adjust assignments live from the school portal dashboard.
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Bottom Navigation Button Bar */}
                <div className="w-full shrink-0 border-t border-gray-200 flex justify-between sticky bottom-0 bg-[#fafbfc] px-6 py-6 z-10" style={{ marginTop: '2rem' }}>
                  <button onClick={prevStep} className="h-12 px-6 bg-white text-slate-600 border border-slate-200/60 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    onClick={handleFinalize}
                    disabled={isSubmitting}
                    className="h-12 px-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Provisioning Gradebook...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Onboarding</span>
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

      {/* CORRECTION REQUEST SLIDE-OVER / MODAL */}
      <AnimatePresence>
        {isCorrectionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[2rem] border border-slate-200/60 w-full max-w-lg p-7 shadow-2xl space-y-6 relative overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setIsCorrectionModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0f172a]">Request Assignment Correction</h3>
                  <p className="text-xs text-slate-500 font-medium">This alerts school administration to adjust your class lists.</p>
                </div>
              </div>

              {!correctionSuccess ? (
                <form onSubmit={sendCorrectionRequest} className="space-y-4">
                  <div>
                    <label className={labelStyle}>Staff Context Info</label>
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700 bg-slate-50 p-3.5 border border-slate-200/60 rounded-xl">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 block uppercase">Teacher</span>
                        {formData.name}
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 block uppercase">School Domain</span>
                        {formData.schoolName}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={labelStyle}>Specify Incorrect Assignments</label>
                    <textarea
                      required
                      rows={4}
                      value={correctionText}
                      onChange={(e) => setCorrectionText(e.target.value)}
                      placeholder="Specify your adjustments (e.g. 'I am not teaching Grade 10B Further Mathematics. Please assign me to English Grade 10A instead.')"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    />
                  </div>

                  <div className="flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCorrectionModalOpen(false)}
                      className="h-10 px-5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSendingCorrection}
                      className="h-10 px-5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isSendingCorrection ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Dispatching Alert...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Correction Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-emerald-800">Alert Dispatched to Admin!</h4>
                    <p className="text-xs text-slate-500 max-w-sm mt-1 mx-auto">
                      A high-priority notification was pushed to school system administrators. This will not block your onboarding progress.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
