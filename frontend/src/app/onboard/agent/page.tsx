'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ResultsProRegistryForm } from '@/components/onboarding/ResultsProRegistryForm';
import { ResultsProStepIndicator } from '@/components/onboarding/ResultsProStepIndicator';
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
                <div style={{ height: '4rem' }} />
                {/* Form Header */}
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="!text-[2.25rem] md:!text-[3rem] font-bold text-[#0f172a] !text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Account Registration</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-base font-medium mb-4">Provide accurate bio-data details. This cannot be easily changed.</p>
                </div>

                {/* Spacer above Section Label */}
                <div style={{ height: '1.5rem' }} />

                {/* Sub-sections/Step label indicator */}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
                  <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">2. REGISTER</span>
                </div>
                <div style={{ height: '1.25rem' }} />

                <ResultsProRegistryForm 
                  data={{
                    name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    zone: formData.zone,
                  }}
                  onChange={(newData) => setFormData({ 
                    ...formData, 
                    fullName: newData.name ?? formData.fullName,
                    email: newData.email ?? formData.email,
                    phone: newData.phone ?? formData.phone,
                    address: newData.address ?? formData.address,
                    zone: newData.zone ?? formData.zone
                  })}
                  requireOtp={false}
                  requirePassword={false}
                  showAddress={true}
                  showZone={true}
                  zoneOptions={nigerianZones}
                />

                <div style={{ height: '4rem' }} />
                {/* Bottom Navigation Button Bar */}
                <div className="w-full shrink-0 border-t border-gray-200 flex justify-between sticky bottom-0 bg-[#fafbfc] px-6 py-6 z-10" style={{ marginTop: '2rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                  <button
                    onClick={() => router.push('/onboard')}
                    className="bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    <ArrowLeft className="w-4 h-4" /> Change Role
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    disabled={!isRegistrationValid}
                    className="bg-[#146ef5] hover:bg-[#146ef5]/90 text-white transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    <span>Next: KYC Verification</span> <ArrowRight className="w-4 h-4" />
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
                <div style={{ height: '4rem' }} />
                {/* Form Header */}
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="!text-[2.25rem] md:!text-[3rem] font-bold text-[#0f172a] !text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">KYC Verification</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-base font-medium mb-4">Verify your identity profile to unlock referral commission limits.</p>
                </div>

                {/* Spacer above Section Label */}
                <div style={{ height: '1.5rem' }} />

                {/* Sub-sections/Step label indicator */}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
                  <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">3. KYC</span>
                </div>
                <div style={{ height: '1.25rem' }} />

                <div className={cardStyle} style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.02)', borderRadius: '4px', padding: '2.5rem', margin: '0 auto', maxWidth: '800px', width: '100%', backgroundColor: '#ffffff' }}>

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
                              className={`flex items-center justify-between text-sm p-4 bg-slate-50 rounded-2xl border transition-all duration-300 ${isCurrent ? 'border-sky-200 bg-sky-50/20' : 'border-slate-100'
                                }`}
                            >
                              <span className={`font-bold transition-colors ${isPast ? 'text-slate-800' : isCurrent ? 'text-[#146ef5]' : 'text-slate-400'
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
                              className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${isSelected
                                  ? 'border-[#146ef5] bg-sky-50/25 shadow-sm ring-1 ring-sky-500/20'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                                }`}
                            >
                              <div className="flex items-center justify-between w-full mb-3">
                                <span className={`text-sm font-extrabold ${isSelected ? 'text-[#146ef5]' : 'text-slate-700'}`}>
                                  {type.id}
                                </span>
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#146ef5] bg-[#146ef5]' : 'border-slate-300'
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
                          className={`aspect-[4/3] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 hover:border-sky-400 hover:bg-sky-50/10 transition-all cursor-pointer group relative overflow-hidden ${docFile ? 'border-emerald-300 bg-emerald-50/5' : 'border-slate-200'
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
                          className={`aspect-[4/3] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 hover:border-sky-400 hover:bg-sky-50/10 transition-all cursor-pointer group relative overflow-hidden ${selfieFile ? 'border-emerald-300 bg-emerald-50/5' : 'border-slate-200'
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

                <div style={{ height: '4rem' }} />
                {/* Bottom Navigation Button Bar */}
                <div className="w-full shrink-0 border-t border-gray-200 flex justify-between sticky bottom-0 bg-[#fafbfc] px-6 py-6 z-10" style={{ marginTop: '2rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                  <button
                    onClick={() => setStep(2)}
                    className="bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    onClick={triggerKYCVerification}
                    disabled={!isKYCReady}
                    className="bg-[#146ef5] hover:bg-[#146ef5]/90 text-white transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    <span>Verify & Continue</span> <ArrowRight className="w-4 h-4" />
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
                <div style={{ height: '4rem' }} />
                {/* Form Header */}
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="!text-[2.25rem] md:!text-[3rem] font-bold text-[#0f172a] !text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Financial Ledger</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-base font-medium mb-4">Setup your designated bank details for automated commission payouts.</p>
                </div>

                {/* Spacer above Section Label */}
                <div style={{ height: '1.5rem' }} />

                {/* Sub-sections/Step label indicator */}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
                  <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">4. LEDGER</span>
                </div>
                <div style={{ height: '1.25rem' }} />
                <div className={cardStyle} style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.02)', borderRadius: '4px', padding: '2.5rem', margin: '0 auto', maxWidth: '800px', width: '100%', backgroundColor: '#ffffff' }}>
                  <ResultsProRegistryForm 
                    data={{
                      name: formData.fullName,
                      email: formData.email,
                      phone: formData.phone,
                      address: formData.address,
                      zone: formData.zone
                    }}
                    onChange={(newData) => setFormData({ 
                      ...formData, 
                      fullName: newData.name ?? formData.fullName,
                      email: newData.email ?? formData.email,
                      phone: newData.phone ?? formData.phone,
                      address: newData.address ?? formData.address,
                      zone: newData.zone ?? formData.zone
                    })}
                    requireOtp={false}
                    requirePassword={false}
                    showAddress={false}
                    showZone={false}
                    customTopElement={
                      <div className="space-y-6 mb-6">
                        <div>
                          <label className={labelStyle}>Bank Name</label>
                          <select
                            value={formData.bankName}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, bankName: e.target.value })}
                            className={`${inputStyle} appearance-none cursor-pointer`}
                          >
                            {banks.map(b => <option key={b}>{b}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={labelStyle}>Account Number</label>
                          <input
                            type="text"
                            placeholder="10-digit account number"
                            value={formData.accountNumber}
                            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                            className={inputStyle}
                            maxLength={10}
                          />
                        </div>
                        <div>
                          <label className={labelStyle}>Account Name (Auto-verified)</label>
                          <input
                            type="text"
                            disabled
                            placeholder="Will be auto-filled..."
                            value={formData.accountName}
                            className={`${inputStyle} bg-slate-100 text-slate-500 cursor-not-allowed border-slate-200`}
                          />
                        </div>
                      </div>
                    }
                  />
                </div>

                <div style={{ height: '4rem' }} />
                {/* Bottom Navigation Button Bar */}
                <div className="w-full shrink-0 border-t border-gray-200 flex justify-between sticky bottom-0 bg-[#fafbfc] px-6 py-6 z-10" style={{ marginTop: '2rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    onClick={() => setStep(5)}
                    disabled={formData.accountNumber.length < 10}
                    className="bg-[#146ef5] hover:bg-[#146ef5]/90 text-white transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    <span>Next: Set Profile URL</span> <ArrowRight className="w-4 h-4" />
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

                <div style={{ height: '4rem' }} />
                {/* Form Header */}
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="!text-[2.25rem] md:!text-[3rem] font-bold text-[#0f172a] !text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Referral Console</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-base font-medium mb-4">Configure your links, forecast payouts, and view marketing materials.</p>
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
                              className={`p-3.5 rounded-2xl border transition-all duration-300 text-center ${t.active
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

                <div style={{ height: '4rem' }} />
                {/* Bottom Navigation Button Bar */}
                <div className="w-full shrink-0 border-t border-gray-200 flex justify-between sticky bottom-0 bg-[#fafbfc] px-6 py-6 z-10" style={{ marginTop: '2rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                  <button
                    onClick={() => setStep(4)}
                    disabled={isSubmittingFinal}
                    className="bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    onClick={handleFinalizeOnboarding}
                    disabled={isSubmittingFinal}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed" 
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                  >
                    {isSubmittingFinal ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Customizing Console...</span>
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
