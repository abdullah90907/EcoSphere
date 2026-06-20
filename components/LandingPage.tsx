import React from 'react';
import { ArrowRight, Sparkles, Shield, Globe, Zap, Leaf, CheckCircle2 } from 'lucide-react';
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';
import { ModuleType } from '../types';

interface LandingPageProps {
  onGetStarted: () => void;
  setModule: (module: ModuleType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, setModule }) => {
  return (
    <div className="min-h-screen bg-[#052d1e] text-white selection:bg-emerald-500/30 overflow-x-hidden font-['Inter']">
      <style>{`
        @keyframes subtle-move {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .bg-grid-pattern {
          background-image: radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.05) 1px, transparent 0);
          background-size: 40px 40px;
        }
        .animate-subtle-move {
          animation: subtle-move 60s linear infinite;
        }
      `}</style>
      
      <PublicNavbar currentModule={ModuleType.HOME} setModule={setModule} onLogin={onGetStarted} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden">
        {/* Modern Minimalist Background */}
        <div className="absolute inset-0 bg-grid-pattern animate-subtle-move pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#052d1e]/50 to-[#052d1e] pointer-events-none"></div>
        
        {/* Subtle Glowing Nodes */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-lime-400 rounded-full shadow-[0_0_15px_rgba(163,230,53,0.8)] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.8)] animate-pulse" style={{ animationDelay: '2s' }}></div>

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