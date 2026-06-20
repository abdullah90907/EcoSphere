import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Shield, Globe, Zap, Leaf, CheckCircle2 } from 'lucide-react';
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';
import { ModuleType } from '../types';

interface LandingPageProps {
  onGetStarted: () => void;
  setModule: (module: ModuleType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, setModule }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const targetMousePosRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: { 
      x: number; 
      y: number; 
      size: number; 
      speedX: number; 
      speedY: number; 
      vx: number; 
      vy: number; 
    }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          size: Math.random() * 2 + 0.8,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          vx: 0,
          vy: 0,
        });
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      targetMousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      mousePosRef.current.x += (targetMousePosRef.current.x - mousePosRef.current.x) * 0.15;
      mousePosRef.current.y += (targetMousePosRef.current.y - mousePosRef.current.y) * 0.15;
      
      particles.forEach((particle, index) => {
        particle.x += particle.speedX + particle.vx;
        particle.y += particle.speedY + particle.vy;
        
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        
        const dx = mousePosRef.current.x - particle.x;
        const dy = mousePosRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 180;
        
        if (distance < maxDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = Math.pow((maxDistance - distance) / maxDistance, 2) * 10;
          particle.vx -= forceDirectionX * force;
          particle.vy -= forceDirectionY * force;
        }
        
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = distance < maxDistance 
          ? `rgba(52, 211, 153, ${0.5 + (1 - distance / maxDistance) * 0.7})` 
          : 'rgba(52, 211, 153, 0.35)';
        ctx.fill();
        
        if (distance < maxDistance / 2) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52, 211, 153, ${0.12 * (1 - distance / (maxDistance / 2))})`;
          ctx.fill();
        }
        
        particles.slice(index + 1).forEach(otherParticle => {
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (dist2 < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(52, 211, 153, ${0.18 * (1 - dist2 / 160)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-[#052d1e] text-white selection:bg-emerald-500/30 overflow-x-hidden font-['Inter']">
      <PublicNavbar currentModule={ModuleType.HOME} setModule={setModule} onLogin={onGetStarted} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden">
        {/* Interactive Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#052d1e]/50 to-[#052d1e] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/20 px-4 py-2 rounded-full mb-10 animate-fade-in shadow-2xl backdrop-blur-xl">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-emerald-400/80">Ecosystem Protocol v2.0</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] md:leading-[1] mb-8 animate-reveal">
            REDEFINING <br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-teal-400 italic">ECOLOGY</span>
            </span>
            <br />
            BY DESIGN
          </h1>
          
          <p className="max-w-2xl mx-auto text-sm md:text-lg text-emerald-100/60 leading-relaxed mb-12 animate-fade-in-up font-medium">
            Deploying hyper-intelligent monitoring nodes and precision data models <br className="hidden md:block" />
            to restore balance to our global environment through edge-compute intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={onGetStarted}
              className="group relative bg-emerald-500 text-emerald-950 px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl"
            >
              <span className="relative z-10">Initialize System</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
            
            <button 
              onClick={() => setModule(ModuleType.FEATURES)}
              className="px-10 py-4 rounded-xl border border-emerald-500/10 bg-white/5 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all backdrop-blur-md text-emerald-100/80"
            >
              Explore Modules
            </button>
          </div>

          {/* Status Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto border-t border-emerald-500/5 pt-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {[
              { label: 'Active Nodes', val: '12,482' },
              { label: 'Carbon Offset', val: '842.5t' },
              { label: 'Latency', val: '42ms' },
              { label: 'AI Precision', val: '98.2%' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-bold text-white mb-1 tracking-tight">{stat.val}</div>
                <div className="text-[8px] font-bold uppercase tracking-widest text-emerald-500/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Technology Section removed as it was redundant */}

      {/* Core Pillars - Redesigned */}
      <section className="py-24 px-6 bg-[#053d26]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              { 
                icon: <Globe className="text-emerald-400" size={28} />, 
                title: 'Global Impact', 
                desc: 'Real-time environmental monitoring across 150+ international zones.'
              },
              { 
                icon: <Shield className="text-lime-400" size={28} />, 
                title: 'Zero Waste', 
                desc: 'Intelligent systems designed to eliminate food and industrial waste streams.'
              },
              { 
                icon: <Zap className="text-teal-400" size={28} />, 
                title: 'Visionary Tech', 
                desc: 'Advanced computer vision and data modeling for a sustainable future.'
              }
            ].map((pillar, i) => (
              <div key={i} className="group relative">
                <div className="relative z-10 pl-4">
                  <div className="mb-6 p-4 bg-emerald-900/40 rounded-2xl inline-block border border-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-500">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-black tracking-tight mb-3 group-hover:text-emerald-400 transition-colors">{pillar.title}</h3>
                  <p className="text-emerald-100/70 leading-relaxed font-medium text-sm">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6 border-y border-emerald-500/5 bg-emerald-900/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/60 mb-12">The Vanguard of Sustainability</h2>
          <div className="flex flex-wrap justify-center gap-10 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 hover:opacity-100">
            {['TERRA', 'AQUA', 'AERO', 'FLORA', 'ORBIS'].map(brand => (
              <span key={brand} className="text-2xl md:text-4xl font-black italic tracking-tighter cursor-default">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Breakdown */}
      <section className="py-24 px-6 relative overflow-hidden bg-emerald-950">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {[
            { value: '12.5k', label: 'KG Food Saved' },
            { value: '42.8', label: 'Tons CO2 Offset' },
            { value: '98%', label: 'Accuracy Rate' },
            { value: '24/7', label: 'Active Support' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-4xl md:text-6xl font-black mb-2 group-hover:text-emerald-400 transition-all duration-500 italic tracking-tighter">{stat.value}</div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <PublicFooter setModule={setModule} />

      <style>{`
        @keyframes reveal {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes reveal-left {
          0% { transform: translateX(-30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes reveal-right {
          0% { transform: translateX(30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-reveal { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-reveal-left { animation: reveal-left 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-reveal-right { animation: reveal-right 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-up { opacity: 0; animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default LandingPage;