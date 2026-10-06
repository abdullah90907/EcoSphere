import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Shield, Globe, Zap, Play, X } from 'lucide-react';
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';
import { ModuleType } from '../types';

interface LandingPageProps {
  onGetStarted: () => void;
  onDemoLogin: () => void;
  setModule: (module: ModuleType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onDemoLogin, setModule }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const targetMousePosRef = useRef({ x: 0, y: 0 });
  const [showVideoModal, setShowVideoModal] = useState(false);
  const YOUTUBE_VIDEO_ID = 'pnZGJhS3rOg';
  
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowVideoModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div className="min-h-screen bg-[#052d1e] text-white selection:bg-emerald-500/30 overflow-x-hidden font-['Inter']">
      <PublicNavbar currentModule={ModuleType.HOME} setModule={setModule} onLogin={onGetStarted} />

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Interactive Canvas Background */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#052d1e]/50 to-[#052d1e] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto relative z-10 text-center w-full">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/20 px-4 py-2 rounded-full mb-8 sm:mb-10 animate-fade-in shadow-2xl backdrop-blur-xl">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-emerald-400/80">Ecosystem Protocol v2.0</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6rem] font-black tracking-tight leading-[1.05] mb-6 sm:mb-8 animate-reveal">
            REDEFINING{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-teal-400 italic">ECOLOGY</span>
            </span>
            {' '}BY DESIGN
          </h1>

          {/* Sub-headline */}
          <p className="max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-emerald-100/60 leading-relaxed mb-10 sm:mb-12 animate-fade-in-up font-medium px-2">
            Deploying hyper-intelligent monitoring nodes and precision data models to restore balance
            to our global environment through edge-compute intelligence.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            {/* Initialize System */}
            <button
              id="hero-get-started"
              onClick={onGetStarted}
              className="group relative bg-emerald-500 text-emerald-950 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl w-full sm:w-auto justify-center"
            >
              <span className="relative z-10">Initialize System</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>

            {/* Try Demo Account — goes straight to Dashboard */}
            <button
              id="hero-demo-account"
              onClick={onDemoLogin}
              className="group relative bg-gradient-to-r from-emerald-500/20 via-emerald-400/20 to-teal-500/20 border border-emerald-400/40 text-emerald-300 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-2.5 backdrop-blur-md transition-all hover:bg-emerald-500/30 hover:border-emerald-400 hover:scale-[1.02] active:scale-95 shadow-xl w-full sm:w-auto justify-center"
            >
              <Sparkles size={16} className="text-lime-400 group-hover:rotate-12 transition-transform animate-pulse" />
              <span>Try Demo Account</span>
            </button>

            {/* Watch Demo Video */}
            <button
              id="hero-watch-demo"
              onClick={() => setShowVideoModal(true)}
              className="group relative border border-white/10 bg-white/5 text-emerald-100/80 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-2.5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-95 w-full sm:w-auto justify-center"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/30 border border-emerald-400/50 group-hover:bg-emerald-500/50 transition-colors">
                <Play size={10} className="text-emerald-300 translate-x-[1px]" fill="currentColor" />
              </span>
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Status Bar */}
          <div
            className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto border-t border-emerald-500/5 pt-8 sm:pt-10 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            {[
              { label: 'Active Nodes', val: '12,482' },
              { label: 'Carbon Offset', val: '842.5t' },
              { label: 'Latency', val: '42ms' },
              { label: 'AI Precision', val: '98.2%' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">{stat.val}</div>
                <div className="text-[8px] font-bold uppercase tracking-widest text-emerald-500/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Technology Section removed as it was redundant */}

      {/* Core Pillars */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-[#053d26]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
            {[
              { icon: <Globe className="text-emerald-400" size={28} />, title: 'Global Impact', desc: 'Real-time environmental monitoring across 150+ international zones.' },
              { icon: <Shield className="text-lime-400" size={28} />, title: 'Zero Waste', desc: 'Intelligent systems designed to eliminate food and industrial waste streams.' },
              { icon: <Zap className="text-teal-400" size={28} />, title: 'Visionary Tech', desc: 'Advanced computer vision and data modeling for a sustainable future.' },
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
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-y border-emerald-500/5 bg-emerald-900/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/60 mb-10 sm:mb-12">The Vanguard of Sustainability</h2>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 hover:opacity-100">
            {['TERRA', 'AQUA', 'AERO', 'FLORA', 'ORBIS'].map(brand => (
              <span key={brand} className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter cursor-default">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Breakdown */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-emerald-950">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {[
            { value: '12.5k', label: 'KG Food Saved' },
            { value: '42.8', label: 'Tons CO2 Offset' },
            { value: '98%', label: 'Accuracy Rate' },
            { value: '24/7', label: 'Active Support' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 group-hover:text-emerald-400 transition-all duration-500 italic tracking-tighter">{stat.value}</div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <PublicFooter setModule={setModule} />

      {/* ── YouTube Video Modal ── */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Demo video"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowVideoModal(false)}
          />
          {/* Modal Panel */}
          <div className="relative z-10 w-full max-w-4xl animate-modal-in">
            <button
              id="video-modal-close"
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 right-0 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
              aria-label="Close video"
            >
              <X size={16} /> Close
            </button>
            {/* 16:9 iframe wrapper */}
            <div
              className="relative w-full rounded-2xl overflow-hidden border border-emerald-500/20 shadow-[0_0_80px_rgba(52,211,153,0.15)]"
              style={{ paddingTop: '56.25%' }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="EcoSphere Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes reveal {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
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
        @keyframes modal-in {
          0% { transform: scale(0.92) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-reveal { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-up { opacity: 0; animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-modal-in { animation: modal-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default LandingPage;