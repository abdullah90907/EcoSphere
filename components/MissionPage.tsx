import React from 'react';
import { Target, Heart, Globe, Users, Sparkles } from 'lucide-react';
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';
import { ModuleType } from '../types';

interface MissionPageProps {
  setModule: (module: ModuleType) => void;
  onGetStarted: () => void;
}

const MissionPage: React.FC<MissionPageProps> = ({ setModule, onGetStarted }) => {
  return (
    <div className="min-h-screen bg-[#053d26] text-white selection:bg-emerald-500/30 overflow-x-hidden font-['Inter']">
      <PublicNavbar currentModule={ModuleType.MISSION} setModule={setModule} onLogin={onGetStarted} />

      <main className="max-w-7xl mx-auto px-6 pt-24 md:pt-40 pb-24">
        <div className="max-w-4xl mx-auto text-center mb-24 animate-reveal">
          <div className="inline-flex items-center space-x-2 bg-emerald-900/40 border border-emerald-500/20 px-4 py-2 rounded-full mb-8 shadow-lg">
            <Target size={14} className="text-lime-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Our North Star</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 leading-[1.1] md:leading-[1] uppercase italic">
            MISSION <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-teal-400 block py-1">RESTORATION.</span>
          </h1>
          <p className="text-base md:text-lg text-emerald-100/80 leading-relaxed font-medium max-w-2xl mx-auto">
            We are on a relentless pursuit to reverse environmental degradation through the marriage of deep-tech engineering and ecological wisdom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          <div className="bg-emerald-900/20 p-10 lg:p-16 rounded-[40px] border border-emerald-800/30 group hover:bg-emerald-800/40 transition-all duration-700 animate-fade-in-up">
            <div className="mb-8 p-5 bg-emerald-950 rounded-2xl inline-block border border-emerald-800/50 shadow-xl group-hover:scale-110 transition-transform duration-700">
              <Heart className="text-emerald-400" size={32} />
            </div>
            <h3 className="text-3xl font-black mb-6 group-hover:text-emerald-400 transition-colors tracking-tight">Built with Purpose</h3>
            <p className="text-emerald-100/70 text-base leading-relaxed font-medium">
              Ecosphere wasn't built to just collect data. It was built to solve the silent crises of our time: the 1.3 billion tons of food wasted annually and the rapid decline of agricultural biodiversity.
            </p>
          </div>

          <div className="bg-emerald-900/20 p-10 lg:p-16 rounded-[40px] border border-emerald-800/30 group hover:bg-emerald-800/40 transition-all duration-700 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-8 p-5 bg-emerald-950 rounded-2xl inline-block border border-emerald-800/50 shadow-xl group-hover:scale-110 transition-transform duration-700">
              <Users className="text-lime-400" size={32} />
            </div>
            <h3 className="text-3xl font-black mb-6 group-hover:text-lime-400 transition-colors tracking-tight">Community Driven</h3>
            <p className="text-emerald-100/70 text-base leading-relaxed font-medium">
              We believe that true sustainability is a collective effort. Our platform empowers individuals, farmers, and cities to become active guardians of their local ecosystems.
            </p>
          </div>
        </div>

        {/* Vision Quote */}
        <div className="py-24 border-y border-emerald-500/10 text-center animate-fade-in relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full scale-150 group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black italic tracking-tighter leading-[1.2] md:leading-[1.1] max-w-4xl mx-auto uppercase">
              "The greatest threat to our planet is the belief that someone else will save it."
            </h2>
            <div className="mt-12 text-[10px] font-black uppercase tracking-[0.6em] text-emerald-500/40">Robert Swan — Environmentalist</div>
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

export default MissionPage;