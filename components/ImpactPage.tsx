import React from 'react';
import { BarChart3, TrendingUp, Wind, Sprout, Sparkles } from 'lucide-react';
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';
import { ModuleType } from '../types';

interface ImpactPageProps {
  setModule: (module: ModuleType) => void;
  onGetStarted: () => void;
}

const ImpactPage: React.FC<ImpactPageProps> = ({ setModule, onGetStarted }) => {
  return (
    <div className="min-h-screen bg-[#053d26] text-white selection:bg-emerald-500/30 overflow-x-hidden font-['Inter']">
      <PublicNavbar currentModule={ModuleType.IMPACT} setModule={setModule} onLogin={onGetStarted} />

      <main className="max-w-7xl mx-auto px-6 pt-24 md:pt-40 pb-24">
        <div className="max-w-4xl mb-24 animate-reveal">
          <div className="inline-flex items-center space-x-2 bg-emerald-900/40 border border-emerald-500/20 px-4 py-2 rounded-full mb-8 shadow-lg">
            <BarChart3 size={14} className="text-lime-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Live Global Impact</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 leading-[1.1] md:leading-[1] uppercase italic">
            DATA FOR <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-teal-400 block py-1">CHANGE.</span>
          </h1>
          <p className="text-base md:text-lg text-emerald-100/80 leading-relaxed font-medium max-w-2xl">
            We measure success in tons of waste diverted, hectares of land restored, and millions of cubic meters of air purified.
          </p>
        </div>

        {/* Big Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
          {[
            { icon: <TrendingUp size={24} />, val: '12,500', unit: 'KG', label: 'Food Saved', color: 'text-emerald-400' },
            { icon: <Wind size={24} />, val: '42.8', unit: 'TONS', label: 'CO2 Offset', color: 'text-lime-400' },
            { icon: <Sprout size={24} />, val: '1,200', unit: 'HECTARES', label: 'Monitored Land', color: 'text-teal-400' },
            { icon: <BarChart3 size={24} />, val: '89%', unit: 'RECOVERY', label: 'Waste Stream', color: 'text-emerald-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-emerald-900/20 border border-emerald-800/30 p-10 rounded-[32px] text-center group hover:bg-emerald-800/40 transition-all duration-700 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`mb-6 p-4 bg-emerald-950 rounded-2xl inline-block ${stat.color} group-hover:scale-110 transition-transform border border-emerald-800/50 shadow-xl`}>
                {stat.icon}
              </div>
              <div className="text-4xl font-black mb-2 italic tracking-tighter">
                {stat.val}<span className={`text-xs not-italic ml-1 ${stat.color}`}>{stat.unit}</span>
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/40">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Impact Map/Visual Showcase */}
        <div className="bg-emerald-900/20 border border-emerald-500/10 rounded-[48px] p-10 md:p-20 relative overflow-hidden group animate-fade-in">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-8 uppercase italic">Worldwide <br /><span className="text-emerald-400">Network.</span></h2>
            <p className="text-base md:text-lg text-emerald-100/70 max-w-2xl leading-relaxed font-medium mb-12">
              Our sensors and AI nodes are active across 4 continents, providing the first unified global environmental data layer for governments and organizations.
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {['Europe', 'North America', 'Asia', 'South America'].map((region, i) => (
                <div key={region} className="flex flex-col items-center gap-3 group/region">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover/region:scale-125 transition-transform"></div>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-100/40 group-hover/region:text-emerald-400 transition-colors">{region}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <PublicFooter setModule={setModule} />

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
        .animate-reveal { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-up { opacity: 0; animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ImpactPage;