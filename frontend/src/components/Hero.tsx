'use client';

import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Cpu, CheckCircle2, ChevronRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Float, Stars } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import IMacModel from './3d/IMacModel';

gsap.registerPlugin(TextPlugin);

const SCENES = [
  {
    id: 'schoolhub',
    tag: 'Campus Operating System',
    title: 'SchoolHub',
    description: 'Run your digital campus from one place. The centralized OS for admissions, community management, and school-wide communications.',
    color: '#00C853',
    image: '/examspro-screenshot.png',
    features: ['School Pulse', 'Admissions', 'Community']
  },
  {
    id: 'resultspro',
    tag: 'Academic Intelligence',
    title: 'ResultsPRO',
    description: 'Know More Than Scores. Transform examination data into actionable academic insights with Power BI-grade intelligence.',
    color: '#00C853',
    image: '/examspro-screenshot.png',
    features: ['Report Cards', 'Broadsheets', 'Intelligence']
  },
  {
    id: 'examspro',
    tag: 'Assessment Engine',
    title: 'ExamsPRO',
    description: 'From Assessment To Insight. Prepare students intentionally with an advanced CBT engine and automated grading systems.',
    color: '#FF9100',
    image: '/examspro-screenshot.png',
    features: ['Assessment Builder', 'CBT Center', 'Analytics']
  },
  {
    id: 'classroompro',
    tag: 'Teaching & Learning',
    title: 'ClassroomPRO',
    description: 'Keep Learning Moving. Standardize lesson delivery and organize assignments with an offline-first digital classroom.',
    color: '#2979FF',
    image: '/examspro-screenshot.png',
    features: ['Class Dashboard', 'Assignments', 'Learning Feed']
  },
  {
    id: 'tutorspro',
    tag: 'Learning Support',
    title: 'TutorsPRO',
    description: "Learning Doesn't End At The Bell. Connect students with vetted academic support through real-time collaboration tools.",
    color: '#A78BFA',
    image: '/examspro-screenshot.png',
    features: ['Find Tutor', 'Profile Management', 'Session Booking']
  },
  {
    id: 'scholarsng',
    tag: 'Future Skills',
    title: 'ScholarsNG',
    description: 'From Computer Literacy To Artificial Intelligence. Build future-ready students with coding, robotics, and entrepreneurship.',
    color: '#00C853',
    image: '/examspro-screenshot.png',
    features: ['Skill Journeys', 'Project Portfolio', 'Hackathons']
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [rotationTarget, setRotationTarget] = useState(-2.0); // Standard 'facing user' rotation
  const modelRef = useRef<THREE.Group>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scene = SCENES[index];

  // Cycle through scenes and trigger spin
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % SCENES.length;
        setRotationTarget(target => target - Math.PI * 2); // Add full spin
        return next;
      });
    }, 8000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // Handle manual tab clicks with spin
  const handleTabClick = (i: number) => {
    if (i === index) return;
    setIndex(i);
    setRotationTarget(target => target - Math.PI * 2); // Add full spin on manual click too
  };

  useGSAP(() => {
    if (!modelRef.current) return;

    // Transition animation for the model (Maintains position, executes spin)
    gsap.to(modelRef.current.rotation, {
      y: rotationTarget, 
      duration: 2,
      ease: "expo.inOut"
    });

    // Typewriter effect for description
    if (textRef.current) {
      gsap.to(textRef.current, {
        duration: 1.5,
        text: scene.description,
        ease: "none"
      });
    }

    // Standardized subtle glow (Primary Green)
    gsap.to(".bg-glow-dynamic", {
      backgroundColor: "#00C853",
      opacity: 0.05,
      duration: 2,
      ease: "power2.out"
    });

  }, { scope: containerRef, dependencies: [index, rotationTarget] });

  // Initial Entrance
  useGSAP(() => {
    if (!modelRef.current) return;
    gsap.set(modelRef.current.position, { x: 5, y: -1.1 });
    gsap.set(modelRef.current.rotation, { x: 0, y: -Math.PI / 2 });

    gsap.to(modelRef.current.position, {
      x: 0.2, 
      y: -1.1, 
      duration: 2.5,
      delay: 0.5,
      ease: "power4.out"
    });

    gsap.to(modelRef.current.rotation, {
      y: -2.0, // Face user immediately on entrance
      duration: 3,
      delay: 0.5,
      ease: "expo.out"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-navy text-white font-body">
      
      <div className="absolute inset-0 z-0">
        <div className="bg-glow-dynamic absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 rounded-full blur-[160px] transition-colors duration-2000" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-10 hidden lg:flex items-center">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 35 }} className="w-full h-full">
          {/* Restored High-Fidelity Lighting */}
          <ambientLight intensity={0.8} />
          <pointLight position={[2, 1, 2]} intensity={1.5} color={scene.color} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
          
          <React.Suspense fallback={null}>
             <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
                <IMacModel 
                  ref={modelRef}
                  scale={0.021} 
                  position={[0.2, -1.1, 0]} 
                  rotation={[0, -2.0, 0]}
                  screenImage={scene.image}
                />
             </Float>
             <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
             <Environment preset="night" />
             <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={10} blur={3} far={4.5} color="#000000" />
          </React.Suspense>
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 py-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-16">
          <div className="lg:col-span-8">
            <div className="space-y-10">
              
              <div className="flex gap-4">
                {SCENES.map((s, i) => (
                  <button 
                    key={s.id}
                    onClick={() => handleTabClick(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-12 bg-green' : 'w-4 bg-white/10'}`}
                  />
                ))}
              </div>

              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={scene.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.3em] text-green uppercase shadow-sm">
                      <Cpu className="w-3.5 h-3.5" />
                      {scene.tag}
                    </div>
                    <h1 className="font-display text-display-md md:text-[72px] font-black leading-[0.9] tracking-tighter text-white">
                      {scene.title}
                    </h1>
                  </motion.div>
                </AnimatePresence>
                
                <p ref={textRef} className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium min-h-[80px] max-w-xl">
                  {/* GSAP Typewriter */}
                </p>

                <div className="flex flex-wrap gap-4">
                   {scene.features.map((f, i) => (
                     <div key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        <CheckCircle2 className="w-3 h-3 text-green" />
                        {f}
                     </div>
                   ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <button className="bg-green text-navy px-10 py-5 rounded-full font-black text-lg flex items-center gap-4 hover:scale-105 transition-transform shadow-[0_20px_50px_-10px_rgba(0,200,83,0.4)] uppercase">
                  Launch {scene.title}
                  <Play className="w-5 h-5 fill-current" />
                </button>
                <button className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                  View Case Study
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4" />
        </div>
      </div>

      <div className="absolute bottom-10 left-10 text-[15vw] font-black text-white/[0.02] pointer-events-none select-none leading-none font-display">
        {scene.title.replace('PRO', '').toUpperCase()}
      </div>
    </section>
  );
}
