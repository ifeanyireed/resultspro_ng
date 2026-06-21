'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  LayoutGrid, 
  ClipboardList, 
  ShieldCheck, 
  Wallet, 
  Share2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Upload, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Loader2, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  X,
  Building2,
  TrendingUp,
  Percent
} from 'lucide-react';
const steps = [
  { id: 1, label: 'ROLE', icon: LayoutGrid },
  { id: 2, label: 'REGISTER', icon: ClipboardList },
  { id: 3, label: 'KYC', icon: ShieldCheck },
  { id: 4, label: 'LEDGER', icon: Wallet },
  { id: 5, label: 'CONSOLE', icon: Share2 }
];

const nigerianZones = [
  'Lagos (South West)',
  'Abuja FCT (North Central)',
  'Rivers (South South)',
  'Enugu (South East)',
  'Kano (North West)',
  'Kaduna (North West)',
  'Oyo (South West)',
  'Anambra (South East)',
  'Plateau (North Central)',
  'Delta (South South)',
  'Akwa Ibom (South South)'
];

const docTypes = [
  { id: 'NIN', name: 'National Identity Number (NIN)', desc: '11-digit national identity card' },
  { id: 'Passport', name: 'International Passport', desc: 'Standard biometric travel passport' },
  { id: 'License', name: "Driver's License", desc: 'FRSC government-issued driver permit' }
];

const banks = [
  'Access Bank',
  'Fidelity Bank',
  'First Bank of Nigeria',
  'Guaranty Trust Bank (GTB)',
  'Key Stone Bank',
  'Moniepoint MFB',
  'OPay Digital Services',
  'Sterling Bank',
  'United Bank for Africa (UBA)',
  'Wema Bank',
  'Zenith Bank'
];

export default function AgentOnboarding() {
  const router = useRouter();
  
  // Starting at Step 2 (REGISTER) per instructions
  const [step, setStep] = useState(2);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    zone: 'Lagos (South West)',
    documentType: 'NIN',
    bankName: 'Zenith Bank',
    accountNumber: '',
    accountName: '',
    customSlug: ''
  });

  // Track if custom slug has been manually edited
  const [isSlugManual, setIsSlugManual] = useState(false);

  // File Upload State
  const [docFile, setDocFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  // KYC verification simulator state
  const [isVerifyingKYC, setIsVerifyingKYC] = useState(false);
  const [kycProgressStep, setKycProgressStep] = useState(0);

  // Ledger verification state
  const [isResolvingAccount, setIsResolvingAccount] = useState(false);
  const [resolvedAccountName, setResolvedAccountName] = useState('');

  // Referral Console interactions state
  const [copied, setCopied] = useState(false);
  const [schoolsSlider, setSchoolsSlider] = useState(10);
  const [isSubmittingFinal, setIsSubmittingFinal] = useState(false);
  const [isCompletedFlow, setIsCompletedFlow] = useState(false);

  // Automatically update the custom referral slug based on the full name, unless edited manually
  useEffect(() => {
    if (!isSlugManual) {
      const slugified = formData.fullName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, customSlug: slugified || 'agent-name' }));
    }
  }, [formData.fullName, isSlugManual]);

  // Handle Text Input updates
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Screen 1: Registration Validation
  const isRegistrationValid = 
    formData.fullName.trim().length >= 3 &&
    formData.email.includes('@') &&
    formData.phone.trim().length >= 10 &&
    formData.address.trim().length >= 10;

  // Screen 2: KYC Validation & Submission Handshake
  const isKYCReady = docFile !== null && selfieFile !== null;

  const triggerKYCVerification = () => {
    if (!isKYCReady) return;
    setIsVerifyingKYC(true);
    setKycProgressStep(0);

    const checkInterval = setInterval(() => {
      setKycProgressStep(prev => {
        if (prev < 3) {
          return prev + 1;
        } else {
          clearInterval(checkInterval);
          setTimeout(() => {
            setIsVerifyingKYC(false);
            setStep(4); // Advance to Financial Ledger (Step 4)
          }, 800);
          return prev;
        }
      });
    }, 900);
  };

  // Screen 3: Ledger Verification Handshake
  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, accountNumber: val }));

    if (val.length === 10) {
      setIsResolvingAccount(true);
      setResolvedAccountName('');
      setTimeout(() => {
        setIsResolvingAccount(false);
        setResolvedAccountName('Chinedu Okafor'); // Mock resolved account name
      }, 1200);
    } else {
      setIsResolvingAccount(false);
      setResolvedAccountName('');
    }
  };

  const isLedgerValid = formData.accountNumber.length === 10 && resolvedAccountName === 'Chinedu Okafor';

  // Screen 4: Referral console and copy link functions
  const copyReferralLink = () => {
    const url = `resultspro.ng/ref/${formData.customSlug || 'agent-name'}`;
    navigator.clipboard.writeText(`https://${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Commission Calculations
  const getCommissionPercentage = (schools: number) => {
    if (schools <= 5) return 10;
    if (schools <= 15) return 15;
    return 20;
  };

  const currentRate = getCommissionPercentage(schoolsSlider);
  const averageSchoolTermlySub = 150000; // 150,000 NGN
  const termlyEarnings = schoolsSlider * averageSchoolTermlySub * (currentRate / 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Final flow submission
  const handleFinalizeOnboarding = () => {
    setIsSubmittingFinal(true);
    setTimeout(() => {
      setIsSubmittingFinal(false);
      setIsCompletedFlow(true);
    }, 1800);
  };

  // Step Tracker Render Navigation Click
  const handleStepClick = (sId: number) => {
    if (sId === 1) {
      router.push('/onboard');
    } else if (sId < step) {
      setStep(sId);
    }
  };

  const inputStyle = "w-full p-4 bg-slate-50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium";
  const labelStyle = "block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1";
  const cardStyle = "bg-white/80 backdrop-blur-2xl border border-slate-200/60 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden";

  return (
    <main className="bg-[#fafbfc] min-h-screen flex flex-col font-sans text-slate-900 selection:bg-blue-100" style={{ paddingBottom: '6rem' }}>
      <div className="h-10 md:h-16 w-full shrink-0" />
      
      {/* Top Navigation Steps */}
      <div className="w-full pt-5 pb-4 flex justify-center border-b border-gray-100 bg-white/50 backdrop-blur-sm">
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

      <div className="flex-1 w-full max-w-5xl self-center px-8 md:px-12 pt-14 pb-0 md:pt-20 md:pb-0 flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* SCREEN 1: ACCOUNT REGISTRATION */}
          {step === 2 && (
            <motion.div
              key="screen1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 flex flex-col"
            >
              {/* Form Header */}
              <div className="text-center mb-6 flex flex-col items-center">
                <h1 className="!text-[3rem] md:!text-[4.2rem] font-bold text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Account Registration</h1>
                <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-[1.05rem] font-medium mb-4">Create your official partner credentials on the ResultsPRO network.</p>
              </div>

              {/* Spacer above Section Label */}
              <div style={{ height: '1.5rem' }} />

              {/* Sub-sections/Step label indicator */}
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
                <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">2. REGISTER</span>
              </div>
              <div style={{ height: '1.25rem' }} />

              <div className={cardStyle}>
                <div className="space-y-6">
                  
                  {/* Name & Email Group */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelStyle}>
                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Full Name</span>
                      </label>
                      <input 
                        type="text" 
                        name="fullName"
                        placeholder="e.g. Chinedu Okafor"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={inputStyle}
                      />
                    </div>

                    <div>
                      <label className={labelStyle}>
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email Address</span>
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="e.g. chinedu@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Phone & Zone Group */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelStyle}>
                        <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Phone Number</span>
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="e.g. +234 803 123 4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputStyle}
                      />
                    </div>

                    <div>
                      <label className={labelStyle}>
                        <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> Zone/State of Operation</span>
                      </label>
                      <select 
                        name="zone"
                        value={formData.zone}
                        onChange={handleChange}
                        className={`${inputStyle} appearance-none bg-white cursor-pointer`}
                      >
                        {nigerianZones.map((z) => (
                          <option key={z} value={z}>{z}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Residential Address */}
                  <div>
                    <label className={labelStyle}>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Residential Address</span>
                    </label>
                    <textarea 
                      name="address"
                      rows={3}
                      placeholder="Please enter your complete physical address..."
                      value={formData.address}
                      onChange={handleChange}
                      className={`${inputStyle} resize-none`}
                    />
                  </div>

                </div>
              </div>

              {/* Bottom Navigation Button Bar */}
              <div className="w-full border-t border-gray-200 flex justify-between" style={{ marginTop: '2rem', paddingTop: '2rem' }}>
                <button 
                  onClick={() => router.push('/onboard')}
                  className="h-12 px-6 bg-white text-slate-600 border border-slate-200/60 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Change Role
                </button>
                
                <button 
                  onClick={() => setStep(3)} 
                  disabled={!isRegistrationValid}
                  className="h-12 px-8 bg-[#146ef5] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: KYC Verification <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: KYC VERIFICATION */}
          {step === 3 && (
            <motion.div
              key="screen2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 flex flex-col"
            >
              {/* Form Header */}
              <div className="text-center mb-6 flex flex-col items-center">
                <h1 className="!text-[3rem] md:!text-[4.2rem] font-bold text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">KYC Verification</h1>
                <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-[1.05rem] font-medium mb-4">Verify your identity profile to unlock referral commission limits.</p>
              </div>

              {/* Spacer above Section Label */}
              <div style={{ height: '1.5rem' }} />

              {/* Sub-sections/Step label indicator */}
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
                <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">3. KYC</span>
              </div>
              <div style={{ height: '1.25rem' }} />

              <div className={cardStyle}>
                
                {/* Visual verification processing loader animation overlay */}
                {isVerifyingKYC && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 transition-all duration-300">
                    <Loader2 className="w-16 h-16 text-[#146ef5] animate-spin mb-6" />
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Verifying Credentials</h3>
                    <p className="text-slate-500 text-sm text-center max-w-sm mb-8 font-medium">
                      Running background matches on government data registry. Please stay on this screen.
                    </p>
                    
                    <div className="w-full max-w-md space-y-3.5">
                      {[
                        "Uploading secure document assets",
                        "Extracting OCR biological identification metadata",
                        "Executing facial recognition similarity algorithms",
                        "Generating verified system status clearance"
                      ].map((label, idx) => {
                        const isPast = kycProgressStep > idx;
                        const isCurrent = kycProgressStep === idx;
                        return (
                          <div 
                            key={idx} 
                            className={`flex items-center justify-between text-sm p-4 bg-slate-50 rounded-2xl border transition-all duration-300 ${
                              isCurrent ? 'border-sky-200 bg-sky-50/20' : 'border-slate-100'
                            }`}
                          >
                            <span className={`font-bold transition-colors ${
                              isPast ? 'text-slate-800' : isCurrent ? 'text-[#146ef5]' : 'text-slate-400'
                            }`}>
                              {label}
                            </span>
                            {isPast ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            ) : isCurrent ? (
                              <Loader2 className="w-4 h-4 text-[#146ef5] animate-spin shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-slate-200 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-8">
                  {/* Document Type Radios */}
                  <div>
                    <label className={labelStyle}>Select Document Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {docTypes.map((type) => {
                        const isSelected = formData.documentType === type.id;
                        return (
                          <button
                            type="button"
                            key={type.id}
                            onClick={() => setFormData({ ...formData, documentType: type.id })}
                            className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                              isSelected 
                                ? 'border-[#146ef5] bg-sky-50/25 shadow-sm ring-1 ring-sky-500/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full mb-3">
                              <span className={`text-sm font-extrabold ${isSelected ? 'text-[#146ef5]' : 'text-slate-700'}`}>
                                {type.id}
                              </span>
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? 'border-[#146ef5] bg-[#146ef5]' : 'border-slate-300'
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </div>
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider leading-none mb-1">
                              {type.name}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium">
                              {type.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* File Upload Grids */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Drag and Drop Document Area */}
                    <div>
                      <label className={labelStyle}>{formData.documentType} Document Scan</label>
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            setDocFile(e.dataTransfer.files[0]);
                          }
                        }}
                        className={`aspect-[4/3] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 hover:border-sky-400 hover:bg-sky-50/10 transition-all cursor-pointer group relative overflow-hidden ${
                          docFile ? 'border-emerald-300 bg-emerald-50/5' : 'border-slate-200'
                        }`}
                      >
                        <input 
                          type="file" 
                          accept="image/*,.pdf"
                          id="doc-upload" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setDocFile(e.target.files[0]);
                            }
                          }}
                        />
                        <label htmlFor="doc-upload" className="cursor-pointer inset-0 absolute flex flex-col items-center justify-center p-6">
                          {docFile ? (
                            <>
                              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
                                <FileText className="w-6 h-6" />
                              </div>
                              <p className="text-xs font-bold text-slate-700 max-w-[200px] truncate">{docFile.name}</p>
                              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
                                {(docFile.size / 1024 / 1024).toFixed(2)} MB • PDF/IMG
                              </p>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setDocFile(null);
                                }}
                                className="mt-4 p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-slate-400 mb-3 group-hover:text-[#146ef5] group-hover:scale-110 transition-all duration-300" />
                              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1 group-hover:text-slate-700">
                                Drag ID Document File
                              </p>
                              <p className="text-[11px] text-slate-400 font-medium">
                                or click to select file
                              </p>
                            </>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Selfie Upload Area */}
                    <div>
                      <label className={labelStyle}>Live Selfie Upload</label>
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            setSelfieFile(e.dataTransfer.files[0]);
                          }
                        }}
                        className={`aspect-[4/3] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 hover:border-sky-400 hover:bg-sky-50/10 transition-all cursor-pointer group relative overflow-hidden ${
                          selfieFile ? 'border-emerald-300 bg-emerald-50/5' : 'border-slate-200'
                        }`}
                      >
                        <input 
                          type="file" 
                          accept="image/*"
                          id="selfie-upload" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setSelfieFile(e.target.files[0]);
                            }
                          }}
                        />
                        <label htmlFor="selfie-upload" className="cursor-pointer inset-0 absolute flex flex-col items-center justify-center p-6">
                          {selfieFile ? (
                            <>
                              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3 relative overflow-hidden">
                                <CheckCircle2 className="w-6 h-6" />
                              </div>
                              <p className="text-xs font-bold text-slate-700 max-w-[200px] truncate">{selfieFile.name}</p>
                              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
                                {(selfieFile.size / 1024 / 1024).toFixed(2)} MB • IMAGE
                              </p>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setSelfieFile(null);
                                }}
                                className="mt-4 p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-slate-400 mb-3 group-hover:text-[#146ef5] group-hover:scale-110 transition-all duration-300" />
                              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1 group-hover:text-slate-700">
                                Upload Clear Selfie
                              </p>
                              <p className="text-[11px] text-slate-400 font-medium">
                                drag here or browse folder
                              </p>
                            </>
                          )}
                        </label>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Bottom Navigation Button Bar */}
              <div className="w-full border-t border-gray-200 flex justify-between" style={{ marginTop: '2rem', paddingTop: '2rem' }}>
                <button 
                  onClick={() => setStep(2)}
                  className="h-12 px-6 bg-white text-slate-600 border border-slate-200/60 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                
                <button 
                  onClick={triggerKYCVerification} 
                  disabled={!isKYCReady}
                  className="h-12 px-8 bg-[#146ef5] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify & Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: FINANCIAL LEDGER */}
          {step === 4 && (
            <motion.div
              key="screen3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 flex flex-col"
            >
              {/* Form Header */}
              <div className="text-center mb-6 flex flex-col items-center">
                <h1 className="!text-[3rem] md:!text-[4.2rem] font-bold text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Financial Ledger</h1>
                <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-[1.05rem] font-medium mb-4">Setup your designated bank details for automated commission payouts.</p>
              </div>

              {/* Spacer above Section Label */}
              <div style={{ height: '1.5rem' }} />

              {/* Sub-sections/Step label indicator */}
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
                <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">4. LEDGER</span>
              </div>
              <div style={{ height: '1.25rem' }} />

              <div className={cardStyle}>
                <div className="space-y-6">
                  
                  {/* Bank Select */}
                  <div>
                    <label className={labelStyle}>Receiving Bank Name</label>
                    <select 
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      className={`${inputStyle} appearance-none bg-white cursor-pointer`}
                    >
                      {banks.map((bank) => (
                        <option key={bank} value={bank}>{bank}</option>
                      ))}
                    </select>
                  </div>

                  {/* Account Number & Lookup */}
                  <div>
                    <label className={labelStyle}>Account Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="accountNumber"
                        placeholder="Enter 10-digit NUBAN number"
                        value={formData.accountNumber}
                        onChange={handleAccountNumberChange}
                        maxLength={10}
                        className={`${inputStyle} pr-12`}
                      />
                      {isResolvingAccount && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                          <Loader2 className="w-5 h-5 text-[#146ef5] animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Resolved Account Name Output */}
                  <AnimatePresence>
                    {resolvedAccountName && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div className="text-sm">
                          <span className="font-extrabold uppercase tracking-wide block text-[10px] text-emerald-600/80 leading-none mb-1">
                            Verified Bank Account Name
                          </span>
                          <span className="font-extrabold text-base tracking-tight">{resolvedAccountName}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>

              {/* Bottom Navigation Button Bar */}
              <div className="w-full border-t border-gray-200 flex justify-between" style={{ marginTop: '2rem', paddingTop: '2rem' }}>
                <button 
                  onClick={() => setStep(3)}
                  className="h-12 px-6 bg-white text-slate-600 border border-slate-200/60 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                
                <button 
                  onClick={() => setStep(5)} 
                  disabled={!isLedgerValid}
                  className="h-12 px-8 bg-[#146ef5] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Referral Console <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 4: REFERRAL CONSOLE */}
          {step === 5 && (
            <motion.div
              key="screen4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 flex flex-col"
            >
              {/* Activation completion badge */}
              <div className="flex flex-col items-center mb-4">
                 <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-bounce">
                   <CheckCircle2 className="w-10 h-10" />
                 </div>
                 <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                   <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Verification Complete: Account Active
                 </div>
              </div>

              {/* Form Header */}
              <div className="text-center mb-6 flex flex-col items-center">
                <h1 className="!text-[3rem] md:!text-[4.2rem] font-bold text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Referral Console</h1>
                <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-[1.05rem] font-medium mb-4">Configure your links, forecast payouts, and view marketing materials.</p>
              </div>

              {/* Spacer above Section Label */}
              <div style={{ height: '1.5rem' }} />

              {/* Sub-sections/Step label indicator */}
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
                <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">5. CONSOLE</span>
              </div>
              <div style={{ height: '1.25rem' }} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
                 
                 {/* Left Column: Link Generator & Collateral */}
                 <div className="lg:col-span-6 space-y-8">
                   
                   {/* Link Generator Box */}
                   <div className="bg-white/80 border border-slate-200/60 rounded-[2rem] p-6 shadow-sm">
                     <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-[11px] border-b border-slate-100 pb-4 mb-5">
                       Referral Link Customizer
                     </h3>

                     <div className="space-y-4">
                       <div>
                         <label className={labelStyle}>Custom Reference Slug</label>
                         <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all">
                           <span className="text-xs font-bold text-slate-400 px-3 select-none">ref/</span>
                           <input 
                             type="text" 
                             value={formData.customSlug}
                             onChange={(e) => {
                               setIsSlugManual(true);
                               const cleaned = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                               setFormData(prev => ({ ...prev, customSlug: cleaned }));
                             }}
                             placeholder="reference-slug"
                             className="flex-1 p-2 bg-transparent text-sm font-bold text-slate-800 focus:outline-none placeholder:font-medium"
                           />
                         </div>
                       </div>

                       <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                         <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                           Live referral url
                         </span>
                         <div className="flex justify-between items-center gap-3">
                           <span className="text-sm font-bold text-[#146ef5] select-all truncate">
                             resultspro.ng/ref/{formData.customSlug || 'agent-name'}
                           </span>
                           <button 
                             onClick={copyReferralLink}
                             className="h-10 w-10 shrink-0 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors shadow-sm"
                             title="Copy to Clipboard"
                           >
                             {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                           </button>
                         </div>
                       </div>
                     </div>
                   </div>

                   {/* Marketing Collateral Deck */}
                   <div className="bg-white/80 border border-slate-200/60 rounded-[2rem] p-6 shadow-sm">
                     <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-[11px] border-b border-slate-100 pb-4 mb-4">
                       Marketing Assets Deck
                     </h3>
                     <div className="space-y-3">
                       {[
                         { name: "ResultsPRO Deck Slide.pdf", size: "4.8 MB" },
                         { name: "ExamsPRO CBT Demo Video.mp4", size: "18.2 MB" },
                         { name: "Brand Assets Package.zip", size: "9.5 MB" }
                       ].map((item, idx) => (
                         <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-50 hover:bg-slate-100/50 rounded-2xl border border-slate-100 transition-all cursor-pointer group">
                           <div className="flex items-center gap-3">
                             <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#146ef5] flex items-center justify-center">
                               <FileText className="w-5 h-5" />
                             </div>
                             <div>
                               <span className="text-xs font-bold text-slate-700 block tracking-tight group-hover:text-[#146ef5] transition-colors">{item.name}</span>
                               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.size}</span>
                             </div>
                           </div>
                           <button className="h-8 px-3.5 bg-white border border-slate-200 hover:border-[#146ef5] hover:text-[#146ef5] text-xs font-bold text-slate-600 rounded-lg transition-all shadow-sm">
                             Download
                           </button>
                         </div>
                       ))}
                     </div>
                   </div>

                 </div>

                 {/* Right Column: Interactive Earnings Estimator */}
                 <div className="lg:col-span-6">
                   <div className="bg-white/80 border border-slate-200/60 rounded-[2rem] p-6 shadow-sm flex flex-col h-full">
                     <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-[11px] border-b border-slate-100 pb-4 mb-6 flex justify-between items-center">
                       <span>Earnings Estimator</span>
                       <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#146ef5] px-2 py-0.5 bg-sky-50 rounded-full border border-sky-100">
                         <Percent className="w-3 h-3" /> {currentRate}% Comm.
                       </span>
                     </h3>

                     {/* Estimation calculator metrics */}
                     <div className="grid grid-cols-2 gap-4 mb-6">
                       <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                         <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                           Schools Referred
                         </span>
                         <span className="text-2xl font-extrabold text-slate-800">{schoolsSlider} Schools</span>
                       </div>

                       <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                         <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                           Termly Payouts
                         </span>
                         <span className="text-xl font-extrabold text-emerald-600">{formatCurrency(termlyEarnings)}</span>
                       </div>
                     </div>

                     {/* Range Slider */}
                     <div className="mb-8">
                       <div className="flex justify-between items-center mb-2">
                         <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Projected Onboardings</span>
                         <span className="text-xs font-extrabold text-slate-600">{schoolsSlider} / 50</span>
                       </div>
                       <input 
                         type="range" 
                         min={1}
                         max={50}
                         value={schoolsSlider}
                         onChange={(e) => setSchoolsSlider(parseInt(e.target.value))}
                         className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#146ef5]"
                       />
                       <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 select-none">
                         <span>1 School</span>
                         <span>25 Schools</span>
                         <span>50 Schools</span>
                       </div>
                     </div>

                     {/* Custom SVG Bar Chart showing active tier highlights */}
                     <div className="mt-auto pt-6 border-t border-slate-100">
                       <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-4">Commission Tiers Breakdown</span>
                       <div className="grid grid-cols-3 gap-3">
                         {[
                           { tier: "1 - 5 Schools", rate: "10% Comm.", active: schoolsSlider <= 5 },
                           { tier: "6 - 15 Schools", rate: "15% Comm.", active: schoolsSlider > 5 && schoolsSlider <= 15 },
                           { tier: "16+ Schools", rate: "20% Comm.", active: schoolsSlider > 15 }
                         ].map((t, idx) => (
                           <div 
                             key={idx} 
                             className={`p-3.5 rounded-2xl border transition-all duration-300 text-center ${
                               t.active 
                                 ? 'bg-sky-500/10 border-sky-300 text-slate-800 scale-105 shadow-sm'
                                 : 'bg-white border-slate-100 text-slate-400 opacity-60'
                             }`}
                           >
                             <span className="text-[10px] font-extrabold uppercase tracking-wider block mb-1">
                               {t.tier}
                             </span>
                             <span className={`text-sm font-extrabold ${t.active ? 'text-[#146ef5]' : 'text-slate-500'}`}>
                               {t.rate}
                             </span>
                           </div>
                         ))}
                       </div>
                     </div>

                   </div>
                 </div>

              </div>

              {/* Bottom Navigation Button Bar */}
              <div className="w-full border-t border-gray-200 flex justify-between" style={{ marginTop: '2rem', paddingTop: '2rem' }}>
                <button 
                  onClick={() => setStep(4)}
                  disabled={isSubmittingFinal}
                  className="h-12 px-6 bg-white text-slate-600 border border-slate-200/60 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                
                <button 
                  onClick={handleFinalizeOnboarding}
                  disabled={isSubmittingFinal}
                  className="h-12 px-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
                >
                  {isSubmittingFinal ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Customizing Console...
                    </>
                  ) : (
                    <>
                      <span>Finalize Setup</span> <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>

    {/* Copy-to-clipboard Toast */}
    <AnimatePresence>
      {copied && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-900/35 border border-slate-800"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
            <Check className="w-3.5 h-3.5" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold tracking-tight">Referral link copied!</span>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Fullscreen Success Screen */}
    <AnimatePresence>
      {isCompletedFlow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center text-white z-50 px-6"
        >
          <div className="w-20 h-20 rounded-full bg-[#146ef5] flex items-center justify-center text-white mb-6 shadow-lg shadow-sky-500/50 relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-sky-500"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ zIndex: -1, opacity: 0.25 }}
            />
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2 tracking-tight">
            Welcome to ResultsPRO, {formData.fullName}!
          </h1>
          <p className="text-slate-400 text-base md:text-lg text-center max-w-md font-medium mb-8">
            Your partner referral console is fully provisioned. You can now start onboarding schools and tracking payouts.
          </p>
          <button 
            onClick={() => router.push('/onboard')}
            className="h-14 px-8 bg-white text-slate-900 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-all shadow-md shadow-white/10"
          >
            Open Agent Console <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);
}
