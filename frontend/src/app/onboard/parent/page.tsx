'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  User, 
  Search, 
  Users, 
  CreditCard, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Plus, 
  Trash2, 
  AlertCircle,
  Smartphone,
  Mail,
  Check,
  Ticket,
  Clock,
  Sparkles,
  Info,
  CreditCard as CardIcon,
  HelpCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
const steps = [
  { id: 1, label: 'ROLE', icon: LayoutGrid },
  { id: 2, label: 'REGISTRY', icon: User },
  { id: 3, label: 'STUDENT', icon: Search },
  { id: 4, label: 'FAMILY', icon: Users },
  { id: 5, label: 'PAYMENT', icon: CreditCard }
];

export default function ParentOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(2); // Starts at REGISTRY (Step 2)
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 2: Parent Registry
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    parentPassword: '',
    
    // Step 3: Student Verification
    admissionNumber: '',
    studentDob: '',
    
    // Step 4: Family Profile
    relationshipType: 'Mother', // Default
    isEmergencyContact: true,
    siblings: [] as { name: string; admissionNumber: string; class: string }[],
    
    // Step 5: Payment
    paymentOption: 'scratch' as 'scratch' | 'subscription',
    scratchCardPin: '',
  });

  // OTP Simulator States
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);

  // Student Search Simulation States
  const [isSearchingStudent, setIsSearchingStudent] = useState(false);
  const [studentVerified, setStudentVerified] = useState(false);
  const [verifiedStudentData, setVerifiedStudentData] = useState<{
    name: string;
    class: string;
    admissionNumber: string;
  } | null>(null);
  const [searchError, setSearchError] = useState('');
  const [linkConfirmed, setLinkConfirmed] = useState(false);
  const [searchStage, setSearchStage] = useState('');

  // Sibling Lookup States
  const [showAddSibling, setShowAddSibling] = useState(false);
  const [siblingAdminNo, setSiblingAdminNo] = useState('');
  const [siblingDob, setSiblingDob] = useState('');
  const [isSearchingSibling, setIsSearchingSibling] = useState(false);
  const [siblingSearchResult, setSiblingSearchResult] = useState<{
    name: string;
    class: string;
    admissionNumber: string;
  } | null>(null);
  const [siblingSearchError, setSiblingSearchError] = useState('');

  // Paystack / Flutterwave Online Payment Popover States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paystackCardNum, setPaystackCardNum] = useState('');
  const [paystackExpiry, setPaystackExpiry] = useState('');
  const [paystackCvv, setPaystackCvv] = useState('');
  const [isPaystackProcessing, setIsPaystackProcessing] = useState(false);
  const [paystackStage, setPaystackStage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [scratchCardError, setScratchCardError] = useState('');

  // OTP Timer countdown simulator
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && otpTimer > 0 && !otpVerified) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer, otpVerified]);

  // Input styling
  const inputStyle = "w-full p-4 bg-slate-50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#146ef5]/20 focus:border-[#146ef5] transition-all text-sm font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium shadow-inner";
  const labelStyle = "block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1";
  const cardStyle = "bg-white/90 backdrop-blur-2xl border border-slate-200/60 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(20,110,245,0.04)]";

  // Password Strength Evaluator
  const getPasswordStrength = () => {
    if (!formData.parentPassword) return { score: 0, text: 'No Password', color: 'bg-slate-200' };
    const len = formData.parentPassword.length;
    if (len < 6) return { score: 1, text: 'Weak', color: 'bg-rose-500' };
    if (len < 10) return { score: 2, text: 'Medium', color: 'bg-amber-500' };
    return { score: 3, text: 'Strong', color: 'bg-emerald-500' };
  };

  const passwordStrength = getPasswordStrength();

  // OTP actions
  const handleSendOtp = () => {
    if (!formData.parentPhone || !formData.parentEmail) {
      setOtpError('Please fill out Email and Phone Number first.');
      return;
    }
    setOtpSending(true);
    setOtpError('');
    setTimeout(() => {
      setOtpSending(false);
      setOtpSent(true);
      setOtpTimer(60);
    }, 1200);
  };

  const handleVerifyOtp = () => {
    setOtpVerifying(true);
    setOtpError('');
    setTimeout(() => {
      setOtpVerifying(false);
      if (otpCode === '4892') {
        setOtpVerified(true);
      } else {
        setOtpError('Invalid OTP code. Use 4892 to simulate success.');
      }
    }, 900);
  };

  // Student search simulator
  const handleStudentLookup = () => {
    if (!formData.admissionNumber || !formData.studentDob) {
      setSearchError('Admission Number and Date of Birth are required.');
      return;
    }
    setIsSearchingStudent(true);
    setSearchError('');
    setStudentVerified(false);
    
    // Simulate multi-stage network latency check
    setSearchStage('Connecting to academic service...');
    setTimeout(() => {
      setSearchStage('Validating student enrollment details...');
      setTimeout(() => {
        setSearchStage('Resolving profile data...');
        setTimeout(() => {
          setIsSearchingStudent(false);
          setVerifiedStudentData({
            name: 'Tunde Greenwood',
            class: 'Grade 10A',
            admissionNumber: formData.admissionNumber
          });
          setStudentVerified(true);
          setLinkConfirmed(true);
        }, 600);
      }, 600);
    }, 600);
  };

  // Sibling lookup simulator
  const handleSiblingLookup = () => {
    if (!siblingAdminNo || !siblingDob) {
      setSiblingSearchError('Sibling Admission Number and DOB are required.');
      return;
    }
    setIsSearchingSibling(true);
    setSiblingSearchError('');
    setSiblingSearchResult(null);

    setTimeout(() => {
      setIsSearchingSibling(false);
      setSiblingSearchResult({
        name: 'Amara Greenwood',
        class: 'Grade 10B',
        admissionNumber: siblingAdminNo
      });
    }, 1200);
  };

  const addSiblingToProfile = () => {
    if (siblingSearchResult) {
      // Check if already added
      const exists = formData.siblings.some(
        (s) => s.admissionNumber.toLowerCase() === siblingSearchResult.admissionNumber.toLowerCase()
      );
      if (exists) {
        setSiblingSearchError('This sibling is already linked to your profile.');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        siblings: [...prev.siblings, siblingSearchResult]
      }));
      // Reset search fields
      setSiblingSearchResult(null);
      setSiblingAdminNo('');
      setSiblingDob('');
      setShowAddSibling(false);
    }
  };

  const removeSibling = (adminNo: string) => {
    setFormData((prev) => ({
      ...prev,
      siblings: prev.siblings.filter((s) => s.admissionNumber !== adminNo)
    }));
  };

  // Scratch card formatting & auto validation
  const handleScratchCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[-\s]/g, '');
    if (/^\d*$/.test(val)) {
      // Format with dashes XXXX-XXXX-XXXX
      let formatted = val;
      if (val.length > 4 && val.length <= 8) {
        formatted = `${val.slice(0, 4)}-${val.slice(4)}`;
      } else if (val.length > 8) {
        formatted = `${val.slice(0, 4)}-${val.slice(4, 8)}-${val.slice(8, 12)}`;
      }
      setFormData(prev => ({ ...prev, scratchCardPin: formatted.slice(0, 14) }));
      
      // Auto-validate at 12 digits
      if (val.length === 12) {
        setScratchCardError('');
      }
    }
  };

  // Online subscription checkout triggers
  const triggerOnlinePayment = () => {
    setShowPaymentModal(true);
    setPaymentSuccess(false);
    setPaystackStage('Initialize Checkout Overlay...');
  };

  const handlePaystackCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaystackProcessing(true);
    
    setPaystackStage('Establishing secure handshake...');
    setTimeout(() => {
      setPaystackStage('Authorizing with card network...');
      setTimeout(() => {
        setPaystackStage('Verifying settlement balance...');
        setTimeout(() => {
          setIsPaystackProcessing(false);
          setPaymentSuccess(true);
          // Wait briefly, then close popover modal
          setTimeout(() => {
            setShowPaymentModal(false);
          }, 1500);
        }, 800);
      }, 800);
    }, 800);
  };

  // Next steps checks
  const isStepValid = (stepId: number) => {
    switch (stepId) {
      case 2:
        return (
          formData.parentName.trim() !== '' &&
          formData.parentEmail.trim() !== '' &&
          formData.parentPhone.trim() !== '' &&
          formData.parentPassword.length >= 6 &&
          otpVerified
        );
      case 3:
        return studentVerified && linkConfirmed;
      case 4:
        return formData.relationshipType !== '';
      case 5:
        if (formData.paymentOption === 'scratch') {
          return formData.scratchCardPin.replace(/[-\s]/g, '').length === 12;
        }
        return paymentSuccess;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (step === 5) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(6); // Finish/success page
      }, 1500);
    } else {
      setStep((s) => Math.min(s + 1, 5));
    }
  };

  const handlePrevStep = () => {
    setStep((s) => Math.max(s - 1, 2));
  };

  const handleStepTrackerNavigation = (targetStep: number) => {
    if (targetStep === 1) {
      router.push('/onboard');
    } else if (targetStep < step) {
      setStep(targetStep);
  return (
    <>
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

        {/* TRANSITIONAL STEP CONTENT */}
        <div className="flex-1 w-full max-w-5xl self-center px-8 md:px-12 pt-14 pb-0 md:pt-20 md:pb-0 flex flex-col">
          <AnimatePresence mode="wait">
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 flex flex-col"
              >
                {/* Form Header */}
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="!text-[3rem] md:!text-[4.2rem] font-bold text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Parent Registry</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-[1.05rem] font-medium mb-4">Set up your parent credentials. We will verify your email and phone number to enable instant notification flags for academic results.</p>
                </div>

                {/* Spacer above Section Label */}
                <div style={{ height: '1.5rem' }} />

                {/* Sub-sections/Step label indicator */}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
                  <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">2. REGISTRY</span>
                </div>
                <div style={{ height: '1.25rem' }} />

                <div className={cardStyle}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className={labelStyle}>Full Name</label>
                      <input
                        type="text"
                        disabled={otpVerified}
                        placeholder="e.g. Adebayo Greenwood"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className={labelStyle}>Email Address</label>
                      <input
                        type="email"
                        disabled={otpVerified}
                        placeholder="parent@example.com"
                        value={formData.parentEmail}
                        onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className={labelStyle}>Phone Number</label>
                      <div className="relative">
                        <input
                          type="tel"
                          disabled={otpVerified}
                          placeholder="+2348012345678"
                          value={formData.parentPhone}
                          onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                          className={inputStyle}
                        />
                        {!otpVerified && (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={otpSending || !formData.parentPhone}
                            className="absolute right-2 top-2 px-4 py-2 bg-[#146ef5] hover:bg-[#146ef5]/90 disabled:bg-slate-200 text-white rounded-xl text-xs font-bold transition-all"
                          >
                            {otpSending ? 'Sending...' : otpSent ? 'Resend' : 'Send OTP'}
                          </button>
                        )}
                        {otpVerified && (
                          <div className="absolute right-4 top-4 text-emerald-500 flex items-center gap-1 text-xs font-bold">
                            <Check className="w-4 h-4 stroke-[3]" /> Verified
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className={labelStyle}>Password</label>
                      <input
                        type="password"
                        disabled={otpVerified}
                        placeholder="Min. 6 characters"
                        value={formData.parentPassword}
                        onChange={(e) => setFormData({ ...formData, parentPassword: e.target.value })}
                        className={inputStyle}
                      />
                      
                      {/* Password strength meter */}
                      {formData.parentPassword && (
                        <div className="mt-2.5 px-1">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mb-1">
                            <span>Strength: {passwordStrength.text}</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                            <div 
                              className={`h-full ${passwordStrength.color} transition-all duration-500`}
                              style={{ width: `${(passwordStrength.score / 3) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* OTP Simulation Panel */}
                  <AnimatePresence>
                    {otpSent && !otpVerified && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-2 mb-6"
                      >
                        <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-[1.75rem] flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-700 text-xs font-extrabold uppercase tracking-wider">
                              <Smartphone className="w-4 h-4 text-[#146ef5]" />
                              <span>Verify Phone Number OTP</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-[#146ef5] font-bold bg-[#146ef5]/5 px-2.5 py-1 rounded-full">
                              <Clock size={12} className="animate-spin" />
                              <span>0:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</span>
                            </div>
                          </div>

                          <div className="bg-blue-50 border border-blue-200/60 text-[#146ef5] px-4 py-3 rounded-2xl flex items-start gap-2.5 text-xs font-medium">
                            <Sparkles className="w-5 h-5 text-[#146ef5] shrink-0 mt-0.5 animate-pulse" />
                            <div>
                              <span className="font-extrabold text-blue-900">SIMULATOR ALERT:</span> An OTP was sent. Please type <span className="underline font-black text-blue-955">4892</span> to complete mock verification.
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <input
                              type="text"
                              maxLength={4}
                              placeholder="Enter 4-digit code"
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value)}
                              className="flex-1 p-3 bg-white border border-slate-200 rounded-xl text-center font-black tracking-widest text-lg focus:outline-none focus:border-[#146ef5]"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyOtp}
                              disabled={otpVerifying || otpCode.length !== 4}
                              className="px-6 bg-[#146ef5] text-white hover:bg-[#146ef5]/90 rounded-xl font-bold text-xs transition-all uppercase tracking-wider"
                            >
                              {otpVerifying ? 'Verifying...' : 'Verify Code'}
                            </button>
                          </div>
                          {otpError && (
                            <span className="text-xs text-rose-500 font-bold flex items-center gap-1">
                              <AlertCircle size={12} /> {otpError}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Navigation Button Bar */}
                <div className="w-full border-t border-gray-200 flex justify-between" style={{ marginTop: '2rem', paddingTop: '2rem' }}>
                  <button
                    onClick={handlePrevStep}
                    className="h-12 px-6 bg-white text-slate-600 border border-slate-200/60 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4" /> Role Selection
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={!isStepValid(2)}
                    className="h-12 px-8 bg-[#146ef5] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Verify & Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 flex flex-col"
              >
                {/* Form Header */}
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="!text-[3rem] md:!text-[4.2rem] font-bold text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Student Verification</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-[1.05rem] font-medium mb-4">Link your child to your parent dashboard. Input their official Admission/Student ID and Date of Birth to search the institutional database.</p>
                </div>

                {/* Spacer above Section Label */}
                <div style={{ height: '1.5rem' }} />

                {/* Sub-sections/Step label indicator */}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
                  <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">3. STUDENT</span>
                </div>
                <div style={{ height: '1.25rem' }} />

                <div className={cardStyle}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className={labelStyle}>Student Admission Number</label>
                      <input
                        type="text"
                        placeholder="e.g. GHS-2026-001"
                        value={formData.admissionNumber}
                        onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
                        className={inputStyle}
                        disabled={studentVerified}
                      />
                    </div>
                    <div>
                      <label className={labelStyle}>Date of Birth</label>
                      <input
                        type="date"
                        value={formData.studentDob}
                        onChange={(e) => setFormData({ ...formData, studentDob: e.target.value })}
                        className={inputStyle}
                        disabled={studentVerified}
                      />
                    </div>
                  </div>

                  {searchError && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-rose-500">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{searchError}</span>
                    </div>
                  )}

                  {/* Lookup Action Trigger */}
                  {!studentVerified && !isSearchingStudent && (
                    <button
                      type="button"
                      onClick={handleStudentLookup}
                      className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-extrabold rounded-2xl text-xs uppercase tracking-widest transition-all shadow-md"
                    >
                      Look Up Student Records
                    </button>
                  )}

                  {/* Looking Up Loading state */}
                  {isSearchingStudent && (
                    <div className="p-8 border border-slate-100 bg-slate-50/50 rounded-3xl flex flex-col items-center justify-center text-center">
                      <div className="w-10 h-10 border-4 border-[#146ef5]/20 border-t-[#146ef5] rounded-full animate-spin mb-4" />
                      <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-1">Database Queries In Progress</h4>
                      <p className="text-xs text-slate-400 font-medium">{searchStage}</p>
                    </div>
                  )}

                  {/* Match results resolved display */}
                  {studentVerified && verifiedStudentData && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-6 border border-emerald-100 bg-emerald-50/20 rounded-[1.75rem]"
                    >
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-tr from-[#146ef5] to-indigo-500 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md shrink-0">
                            TG
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="text-base font-extrabold text-slate-800">{verifiedStudentData.name}</h4>
                              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">Verified</span>
                            </div>
                            <p className="text-xs text-slate-500 font-semibold">{verifiedStudentData.class} • Reg ID: {verifiedStudentData.admissionNumber}</p>
                            <p className="text-[10px] text-slate-400 font-medium mt-0.5">Greenwood High School Portal</p>
                          </div>
                        </div>

                        {/* Confirmation Box */}
                        <label className="flex items-center gap-3 bg-white p-3 border border-slate-100 rounded-2xl cursor-pointer hover:shadow-sm transition-all shrink-0">
                          <input
                            type="checkbox"
                            checked={linkConfirmed}
                            onChange={(e) => setLinkConfirmed(e.target.checked)}
                            className="w-4.5 h-4.5 text-[#146ef5] border-slate-300 rounded focus:ring-[#146ef5]"
                          />
                          <div className="text-left">
                            <span className="block text-[10px] font-black uppercase tracking-wider text-slate-800">Confirm Link</span>
                            <span className="block text-[9px] text-slate-400 font-medium">Link child to family unit</span>
                          </div>
                        </label>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setStudentVerified(false);
                          setLinkConfirmed(false);
                        }}
                        className="mt-4 text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest block transition-colors"
                      >
                        Reset Search Parameter
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Bottom Navigation Button Bar */}
                <div className="w-full border-t border-gray-200 flex justify-between" style={{ marginTop: '2rem', paddingTop: '2rem' }}>
                  <button
                    onClick={handlePrevStep}
                    className="h-12 px-6 bg-white text-slate-600 border border-slate-200/60 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4" /> Parent Registry
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={!isStepValid(3)}
                    className="h-12 px-8 bg-[#146ef5] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Verify Relationship <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 flex flex-col"
              >
                {/* Form Header */}
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="!text-[3rem] md:!text-[4.2rem] font-bold text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Family Profile</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-[1.05rem] font-medium mb-4">Define your specific relationship context with linked students and configure emergency safety triggers.</p>
                </div>

                {/* Spacer above Section Label */}
                <div style={{ height: '1.5rem' }} />

                {/* Sub-sections/Step label indicator */}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
                  <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">4. FAMILY</span>
                </div>
                <div style={{ height: '1.25rem' }} />

                <div className={cardStyle}>
                  {/* Relationship Cards */}
                  <div className="mb-8">
                    <label className={labelStyle}>Select Relationship Type</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Mother', 'Father', 'Guardian'].map((rel) => {
                        const isSelected = formData.relationshipType === rel;
                        return (
                          <button
                            key={rel}
                            type="button"
                            onClick={() => setFormData({ ...formData, relationshipType: rel })}
                            className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-all ${
                              isSelected 
                                ? 'border-[#146ef5] bg-[#146ef5]/5 text-[#146ef5] font-black' 
                                : 'border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700'
                            }`}
                          >
                            <span className="text-xs font-bold uppercase tracking-wider">{rel}</span>
                            {isSelected && <div className="w-1.5 h-1.5 bg-[#146ef5] rounded-full" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Emergency Toggle */}
                  <div className="p-5 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-between gap-4 mb-8">
                    <div className="text-left">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-0.5">Emergency Contact</h4>
                      <p className="text-[11px] text-slate-400 font-medium">Designate this device as primary emergency alert hub</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.isEmergencyContact} 
                        onChange={(e) => setFormData({ ...formData, isEmergencyContact: e.target.checked })}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#146ef5]"></div>
                    </label>
                  </div>

                  {/* Linked Students List */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Linked Household Children</h4>
                      <button
                        type="button"
                        onClick={() => setShowAddSibling(!showAddSibling)}
                        className="text-xs font-bold text-[#146ef5] hover:text-[#146ef5]/80 flex items-center gap-1 transition-colors"
                      >
                        <Plus size={14} /> Add Sibling
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      {/* Primary Verified Student */}
                      <div className="p-4 border border-slate-100 bg-white rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                            TG
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-slate-800">Tunde Greenwood</span>
                            <span className="block text-[10px] text-slate-400 font-semibold">Grade 10A • Primary Account Link</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-blue-50 text-[#146ef5] rounded-full text-[9px] font-black uppercase tracking-wider">Primary</span>
                      </div>

                      {/* Siblings */}
                      {formData.siblings.map((sib) => (
                        <div key={sib.admissionNumber} className="p-4 border border-slate-100 bg-white rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                              AG
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-slate-800">{sib.name}</span>
                              <span className="block text-[10px] text-slate-400 font-semibold">{sib.class} • Sibling</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSibling(sib.admissionNumber)}
                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Sibling Collapse Section */}
                  <AnimatePresence>
                    {showAddSibling && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-6"
                      >
                        <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-[1.75rem] flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">Link Sibling Student</h4>
                            <button 
                              type="button" 
                              onClick={() => setShowAddSibling(false)}
                              className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase"
                            >
                              Cancel
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className={labelStyle}>Sibling ID / Admission No</label>
                              <input
                                type="text"
                                placeholder="e.g. GHS-2026-002"
                                value={siblingAdminNo}
                                onChange={(e) => setSiblingAdminNo(e.target.value)}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                              />
                            </div>
                            <div>
                              <label className={labelStyle}>Date of Birth</label>
                              <input
                                type="date"
                                value={siblingDob}
                                onChange={(e) => setSiblingDob(e.target.value)}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                              />
                            </div>
                          </div>

                          {siblingSearchError && (
                            <span className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                              <AlertCircle size={12} /> {siblingSearchError}
                            </span>
                          )}

                          {!siblingSearchResult && !isSearchingSibling && (
                            <button
                              type="button"
                              onClick={handleSiblingLookup}
                              className="w-full py-3 bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                            >
                              Verify Sibling Record
                            </button>
                          )}

                          {isSearchingSibling && (
                            <div className="py-4 text-center">
                              <div className="w-6 h-6 border-2 border-[#146ef5]/20 border-t-[#146ef5] rounded-full animate-spin mx-auto mb-2" />
                              <span className="text-xs text-slate-400">Searching records...</span>
                            </div>
                          )}

                          {siblingSearchResult && (
                            <div className="p-4 border border-emerald-100 bg-emerald-50/20 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                              <div>
                                <span className="block text-xs font-bold text-slate-800">{siblingSearchResult.name}</span>
                                <span className="block text-[10px] text-slate-400 font-semibold">{siblingSearchResult.class}</span>
                              </div>
                              <button
                                type="button"
                                onClick={addSiblingToProfile}
                                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all"
                              >
                                Add Sibling
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Navigation Button Bar */}
                <div className="w-full border-t border-gray-200 flex justify-between" style={{ marginTop: '2rem', paddingTop: '2rem' }}>
                  <button
                    onClick={handlePrevStep}
                    className="h-12 px-6 bg-white text-slate-600 border border-slate-200/60 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4" /> Student Verification
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={!isStepValid(4)}
                    className="h-12 px-8 bg-[#146ef5] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proceed to Billing <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 flex flex-col"
              >
                {/* Form Header */}
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="!text-[3rem] md:!text-[4.2rem] font-bold text-[#0f172a] ![text-shadow:none] mb-3 leading-tight tracking-tight">Payment & Activation</h1>
                  <p className="text-gray-500 !text-gray-500 ![text-shadow:none] text-sm md:text-[1.05rem] font-medium mb-4">Activate your portal lookup. Choose to settle access using a scratch card pin or subscribe termly via our payment processors.</p>
                </div>

                {/* Spacer above Section Label */}
                <div style={{ height: '1.5rem' }} />

                {/* Sub-sections/Step label indicator */}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
                  <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.2em] uppercase">5. PAYMENT</span>
                </div>
                <div style={{ height: '1.25rem' }} />

                <div className={cardStyle}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Option A: Scratch Card */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentOption: 'scratch' })}
                      className={`p-6 border rounded-[2rem] text-left transition-all ${
                        formData.paymentOption === 'scratch'
                          ? 'border-[#146ef5] bg-[#146ef5]/5 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-[#146ef5]/10 rounded-xl text-[#146ef5]">
                          <Ticket size={24} />
                        </div>
                        <input
                          type="radio"
                          checked={formData.paymentOption === 'scratch'}
                          onChange={() => setFormData({ ...formData, paymentOption: 'scratch' })}
                          className="w-4 h-4 text-[#146ef5]"
                        />
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-1">Scratch Card Activation</h4>
                      <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">Use PIN from physical school card to unlock access.</p>
                    </button>

                    {/* Option B: Online Subscription */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentOption: 'subscription' })}
                      className={`p-6 border rounded-[2rem] text-left transition-all ${
                        formData.paymentOption === 'subscription'
                          ? 'border-[#146ef5] bg-[#146ef5]/5 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-500">
                          <CardIcon size={24} />
                        </div>
                        <input
                          type="radio"
                          checked={formData.paymentOption === 'subscription'}
                          onChange={() => setFormData({ ...formData, paymentOption: 'subscription' })}
                          className="w-4 h-4 text-[#146ef5]"
                        />
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-1">Online Portal Subscription</h4>
                      <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">Pay termly via card/bank transfer instantly. ₦2,500/term.</p>
                    </button>
                  </div>

                  {/* Payment Inner Actions Panel */}
                  <AnimatePresence mode="wait">
                    {formData.paymentOption === 'scratch' ? (
                      <motion.div
                        key="scratchPanel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-[1.75rem] flex flex-col gap-4 mb-6">
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">Enter Scratch Card PIN</h4>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="e.g. 1234-5678-9012"
                              value={formData.scratchCardPin}
                              onChange={handleScratchCardChange}
                              className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-center text-lg font-black tracking-widest focus:outline-none focus:border-[#146ef5]"
                            />
                            {formData.scratchCardPin.replace(/[-\s]/g, '').length === 12 && (
                              <div className="absolute right-4 top-5 text-emerald-500 flex items-center gap-1 text-xs font-bold">
                                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" /> Validated
                              </div>
                            )}
                          </div>
                          
                          {scratchCardError && (
                            <span className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                              <AlertCircle size={12} /> {scratchCardError}
                            </span>
                          )}

                          <div className="flex gap-2.5 items-start bg-slate-100/50 p-4 rounded-xl text-[10px] text-slate-400 font-semibold leading-relaxed">
                            <Info size={14} className="text-[#146ef5] shrink-0 mt-0.5" />
                            <span>PIN layout must contain exactly 12 numeric digits. Simulation auto-accepts any valid format. Try typing: <b className="text-slate-600">123456789012</b></span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="onlinePanel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-[1.75rem] flex flex-col gap-4 mb-6 text-center">
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 text-left">Termly Subscription Billing</h4>
                          
                          <div className="py-6 flex flex-col items-center">
                            <span className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-1">Access Billing Settler</span>
                            <span className="text-3xl font-black text-slate-800">₦2,500.00</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">per student / academic term</span>
                          </div>

                          {!paymentSuccess ? (
                            <button
                              type="button"
                              onClick={triggerOnlinePayment}
                              className="w-full py-4 bg-[#146ef5] hover:bg-[#146ef5]/90 text-white font-extrabold rounded-2xl text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                            >
                              <CardIcon size={16} /> Pay ₦2,500.00 via Paystack
                            </button>
                          ) : (
                            <div className="p-4 border border-emerald-100 bg-emerald-50/20 rounded-2xl flex items-center justify-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-wider">
                              <CheckCircle2 className="w-5 h-5" /> Online Payment Confirmed Successfully!
                            </div>
                          )}

                          <div className="flex gap-2.5 items-start bg-slate-100/50 p-4 rounded-xl text-[10px] text-slate-400 font-semibold text-left leading-relaxed">
                            <Lock size={14} className="text-[#146ef5] shrink-0 mt-0.5" />
                            <span>Transactions processed securely under standard sandbox profiles. Settle instantly to activate portal sync operations.</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Navigation Button Bar */}
                <div className="w-full border-t border-gray-200 flex justify-between" style={{ marginTop: '2rem', paddingTop: '2rem' }}>
                  <button
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                    className="h-12 px-6 bg-white text-slate-600 border border-slate-200/60 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4" /> Family Profile
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={!isStepValid(5) || isSubmitting}
                    className="h-12 px-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Activating Setup...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Onboarding</span> <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white/95 border border-slate-200/60 rounded-[3rem] p-10 shadow-[0_30px_60px_rgba(20,110,245,0.08)] text-center relative overflow-hidden"
              >
                {/* Floating sparkles background */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#146ef5]/5 rounded-full blur-xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />

                <div className="w-20 h-20 bg-gradient-to-tr from-[#146ef5] to-indigo-500 rounded-[2rem] flex items-center justify-center text-white font-black text-3xl shadow-lg mx-auto mb-6 relative z-10 animate-bounce">
                  <CheckCircle2 size={40} className="stroke-[2.5]" />
                </div>

                <span className="text-[10px] font-extrabold text-[#146ef5] tracking-[0.25em] uppercase block mb-2">Onboarding Completed</span>
                <h2 className="text-3xl font-black text-slate-800 leading-tight mb-4">Profile Activated!</h2>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                  Welcome to the SchoolHub Ecosystem, <b>{formData.parentName}</b>. Your relationship ledger matches have been verified and synced downstream.
                </p>

                {/* Summary Box */}
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl text-left max-w-lg mx-auto mb-8">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-200/40">Account Summary</h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Parent User</span>
                      <span className="font-extrabold text-slate-800">{formData.parentName}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Contact Detail</span>
                      <span className="font-medium">{formData.parentPhone}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Relationship</span>
                      <span className="font-extrabold text-[#146ef5]">{formData.relationshipType}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Main Linked Child</span>
                      <span className="font-extrabold text-slate-800">Tunde Greenwood (Grade 10A)</span>
                    </div>
                    {formData.siblings.length > 0 && (
                      <div className="col-span-2">
                        <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Linked Siblings</span>
                        <span className="font-medium text-slate-700">
                          {formData.siblings.map(s => `${s.name} (${s.class})`).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://schoolhub.resultspro.ng"
                    className="px-8 py-4 bg-[#146ef5] hover:bg-[#146ef5]/90 text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-md hover:-translate-y-0.5 transition-all text-center"
                  >
                    Launch SchoolHub Portal
                  </a>
                  <button
                    type="button"
                    onClick={() => alert("Setup summary print instructions issued (Simulation).")}
                    className="px-8 py-4 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 rounded-full font-bold text-xs uppercase tracking-widest transition-all text-center"
                  >
                    Print Receipt
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ONLINE SUBSCRIPTION CHECKOUT POPOVER MODAL */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isPaystackProcessing) setShowPaymentModal(false);
              }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Centered Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 w-full max-w-md relative z-10 overflow-hidden"
            >
              {/* Paystack green-themed mockup banner */}
              <div className="bg-[#1fcb87] p-5 text-white flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-sans font-black tracking-wider text-sm">
                  <div className="w-5 h-5 rounded-full bg-white text-[#1fcb87] flex items-center justify-center font-black text-xs">p</div>
                  <span>paystack</span>
                  <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2 py-0.5 rounded-full">SECURE</span>
                </div>
                <div className="text-[10px] font-bold text-white/90">
                  sandbox simulator
                </div>
              </div>

              <form onSubmit={handlePaystackCheckout} className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-1">Payment Settle Amount</span>
                  <h3 className="text-2xl font-black text-slate-800">₦2,500.00</h3>
                  <span className="block text-[11px] text-slate-500 font-medium mt-1">{formData.parentEmail || 'parent@example.com'}</span>
                </div>

                {!isPaystackProcessing && !paymentSuccess && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="4000 1234 5678 9010"
                        value={paystackCardNum}
                        onChange={(e) => setPaystackCardNum(e.target.value.replace(/\D/g, '').slice(0, 16))}
                        className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1fcb87] text-sm font-bold text-slate-800 placeholder:text-slate-300"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Expiry Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM / YY"
                          value={paystackExpiry}
                          onChange={(e) => setPaystackExpiry(e.target.value)}
                          className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1fcb87] text-sm font-bold text-slate-800 placeholder:text-slate-300 text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">CVV</label>
                        <input
                          type="password"
                          required
                          placeholder="123"
                          value={paystackCvv}
                          onChange={(e) => setPaystackCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1fcb87] text-sm font-bold text-slate-800 placeholder:text-slate-300 text-center"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#1fcb87] hover:bg-[#1fcb87]/90 text-white font-extrabold rounded-2xl text-xs uppercase tracking-widest transition-all shadow-md mt-4 flex items-center justify-center gap-1.5"
                    >
                      <Lock size={12} className="stroke-[2.5]" /> Pay ₦2,500.00
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setShowPaymentModal(false)}
                      className="w-full py-2.5 border border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-600 font-extrabold rounded-xl text-[10px] uppercase tracking-wider transition-colors"
                    >
                      Cancel Payment
                    </button>
                  </div>
                )}

                {/* Processing Transaction Simulation */}
                {isPaystackProcessing && (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 border-4 border-[#1fcb87]/20 border-t-[#1fcb87] rounded-full animate-spin mb-4" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-1">Gateway Handshake</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">{paystackStage}</p>
                  </div>
                )}

                {/* Complete Successful Payment Checkout Display */}
                {paymentSuccess && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-6 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-4 shadow-sm animate-pulse">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-1">Transaction Successful</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">Payment activation references committed successfully.</p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
