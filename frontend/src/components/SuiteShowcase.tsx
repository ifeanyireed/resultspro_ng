'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import IMacModel from './3d/IMacModel';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: 'schoolhub',
    title: 'SchoolHub',
    subtitle: 'Run your digital campus from one place.',
    tag: 'Campus Operating System',
    color: 'text-green',
    accent: '#00E65F',
    features: [
      'Pulse Dashboard',
      'Admissions Pipeline',
      'Community Portal',
      'Ecosystem Hub'
    ],
    image: '/examspro-screenshot.png'
  },
  {
    id: 'resultspro',
    title: 'ResultsPRO',
    subtitle: 'Know More Than Scores.',
    tag: 'Academic Intelligence',
    color: 'text-green',
    accent: '#00E65F',
    features: [
      'Upload & Process',
      'Report Cards',
      'Academic BI',
      'Teacher Analytics'
    ],
    image: '/examspro-screenshot.png'
  },
  {
    id: 'examspro',
    title: 'ExamsPRO',
    subtitle: 'From Assessment To Insight.',
    tag: 'Assessment Engine',
    color: 'text-amber',
    accent: '#FF9100',
    features: [
      'Question Bank',
      'Live CBT Battles',
      'Mock Templates',
      'Detailed Insights'
    ],
    image: '/examspro-screenshot.png'
  },
  {
    id: 'classroompro',
    title: 'ClassroomPRO',
    subtitle: 'Keep Learning Moving.',
    tag: 'Teaching & Learning',
    color: 'text-blue',
    accent: '#2979FF',
    features: [
      'Offline Access',
      'Assignment Center',
      'Learning Feed',
      'Resource Library'
    ],
    image: '/examspro-screenshot.png'
  },
  {
    id: 'tutorspro',
    title: 'TutorsPRO',
    subtitle: "Learning Doesn't End At The Bell.",
    tag: 'Learning Support',
    color: 'text-purple-400',
    accent: '#A78BFA',
    features: [
      'Vetted Instructors',
      'Session Booking',
      'Tutor Profiles',
      'Live Whiteboarding'
    ],
    image: '/examspro-screenshot.png'
  },
  {
    id: 'scholarsng',
    title: 'ScholarsNG',
    subtitle: 'From Computer Literacy To Artificial Intelligence.',
    tag: 'Future Skills',
    color: 'text-green',
    accent: '#00E65F',
    features: [
      'Coding & Robotics',
      'Skill Journeys',
      'Project Showcase',
      'Global Portfolio'
    ],
    image: '/examspro-screenshot.png'
  }
];

export default function SuiteShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group>(null);
  const [activeProduct, setActiveProduct] = useState(0);

  // Setup ScrollTriggers once
  useGSAP(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray<HTMLElement>('.product-section');

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        onEnter: () => setActiveProduct(i),
        onEnterBack: () => setActiveProduct(i),
      });
    });
  }, { scope: containerRef });

  // Handle the spin animation separately when activeProduct changes
  useGSAP(() => {
    if (!modelRef.current) return;

    // Execute the full 360 spin
    gsap.to(modelRef.current.rotation, {
      y: `-=${Math.PI * 2}`,
      duration: 1.5,
      ease: "power3.inOut"
    });
  }, { dependencies: [activeProduct] });

  return (
    <div ref={containerRef} className="relative bg-navy text-white">
      {/* Sticky 3D Canvas */}
      <div className="sticky top-0 h-screen w-full z-0 overflow-hidden pointer-events-none">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 35 }}>
          {/* Restored High-Fidelity Lighting */}
          <ambientLight intensity={0.8} />
          <pointLight position={[2, 1, 2]} intensity={1.5} color={PRODUCTS[activeProduct].accent} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />

          <React.Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <IMacModel
                ref={modelRef}
                scale={0.02}
                position={[1.5, -1.1, 0]}
                // Initial rotation, then handled by GSAP
                rotation={[0, -2.0, 0]}
                screenImage={PRODUCTS[activeProduct].image}
              />
            </Float>
            <Environment preset="night" />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} color="#000000" />
          </React.Suspense>
        </Canvas>
      </div>

      {/* Product Sections Overlays */}
      <div className="relative z-10 mt-[-100vh]">
        {PRODUCTS.map((product) => (
          <section
            key={product.id}
            className="product-section min-h-screen flex items-center px-6 md:px-16"
          >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-left">
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className={`inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.2em] ${product.color} uppercase shadow-sm`}>
                    {product.tag}
                  </div>
                  <h2 className="font-display heading-premium text-5xl md:text-6xl text-white">
                    {product.title}
                  </h2>
                  <p className="text-gray-400 text-xl md:text-3xl font-medium tracking-tight leading-tight max-w-xl">
                    {product.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-4 p-5 rounded-[2rem] bg-white/5 border border-white/10 group hover:bg-white/10 transition-all shadow-sm">
                      <CheckCircle2 className={`w-6 h-6 mt-0.5 ${product.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                      <span className="text-gray-300 text-sm font-bold uppercase tracking-widest leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-green text-navy font-black hover:bg-green/90 transition-all group shadow-sm uppercase text-sm">
                  Explore {product.title}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Spacer for 3D model on the right */}
              <div className="hidden lg:block h-[500px]" />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
