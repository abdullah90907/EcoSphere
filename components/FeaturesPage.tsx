import React from 'react';
import { Trash2, Sprout, Wind, ArrowRight, CheckCircle2, Shield, Zap, Sparkles } from 'lucide-react';
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';
import { ModuleType } from '../types';

interface FeaturesPageProps {
  setModule: (module: ModuleType) => void;
  onGetStarted: () => void;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ setModule, onGetStarted }) => {
  const features = [
    {
      id: 'food',
      icon: <Trash2 className="text-emerald-400" size={32} />,
      title: 'Food Waste Guardian',
      description: 'Advanced vision models detect freshness and suggest optimal disposal paths for any food item.',
      capabilities: ['Real-time Freshness Detection', 'Smart Donation Routing', 'Compost Optimization'],
      color: 'emerald'
    },
    {
      id: 'agri',
      icon: <Sprout className="text-lime-400" size={32} />,
      title: 'Smart Agriculture',
      description: 'Precision monitoring for modern farms. Detect crop diseases and automate irrigation schedules.',
      capabilities: ['AI Disease Identification', 'Dynamic Watering Plans', 'Nutrient Deficiency Alerts'],
      color: 'lime'
    },
    {
      id: 'poll',
      icon: <Wind className="text-teal-400" size={32} />,
      title: 'Pollution Control',
      description: 'Monitor your local environment with live AQI tracking and smart waste classification.',
      capabilities: ['Live Air Quality Data', 'Waste Stream Classifier', 'Ph Analysis Engine'],
      color: 'teal'
    }
  ];

  return (
    <div className="min-h-screen bg-[#053d26] text-white selection:bg-emerald-500/30 overflow-x-hidden font-['Inter']">
      <PublicNavbar currentModule={ModuleType.FEATURES} setModule={setModule} onLogin={onGetStarted} />

      <main className="max-w-7xl mx-auto px-6 pt-24 md:pt-40 pb-24">
        <div className="max-w-3xl mb-20 animate-reveal">
          <div className="inline-flex items-center space-x-2 bg-emerald-900/40 border border-emerald-500/20 px-4 py-2 rounded-full mb-8 shadow-lg">
            <Sparkles size={14} className="text-lime-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Hyper-Intelligent Modules</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 leading-[1.1] md:leading-[1] uppercase italic">
            BUILT FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-teal-400 block py-1">IMPACT.</span>
          </h2>
          <p className="text-base md:text-lg text-emerald-100/90 leading-relaxed font-medium">
            Every module in Ecosphere is engineered to solve a specific environmental challenge using the latest in precision data and vision modeling.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {features.map((f, i) => (
            <div 
              key={f.id} 
              className="group bg-emerald-900/20 p-10 rounded-[40px] border border-emerald-800/30 hover:bg-emerald-800/50 transition-all duration-700 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-8 inline-block p-5 bg-emerald-950 rounded-2xl group-hover:scale-110 transition-transform duration-700 border border-emerald-800/50 shadow-xl">
                {f.icon}
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-emerald-400 transition-colors">{f.title}</h3>
              <p className="text-emerald-100/70 mb-8 leading-relaxed font-medium text-sm">
                {f.description}
              </p>
              
              <ul className="space-y-3 mb-10">
                {f.capabilities.map((cap, j) => (
                  <li key={j} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-emerald-100/60">
                    <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform"></div>
                    {cap}
                  </li>
                ))}
              </ul>

              <button 
                onClick={onGetStarted}
                className="w-full py-4 rounded-xl bg-white text-emerald-950 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all hover:scale-[1.02] active:scale-95"
              >
                Launch Module
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Integration Showcase */}
        <div className="bg-emerald-900/20 rounded-[48px] p-8 md:p-16 border border-emerald-800/30 relative group">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-800/30 px-4 py-2 rounded-full mb-8 border border-emerald-700/50">
                <Shield size={16} className="text-lime-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Enterprise Security Layer</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase leading-[1.1] md:leading-[1]">Unified <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300 italic block py-1">Ecosystem.</span></h2>
              <p className="text-base text-emerald-100/70 leading-relaxed mb-10 font-medium">
                Our platform isn't just a collection of tools. It's a synchronized ecosystem where data flows seamlessly between modules to create a circular economy model.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="group/stat">
                  <h4 className="text-3xl font-black mb-1 italic tracking-tighter group-hover/stat:text-emerald-400 transition-colors">99.9%</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500/40">Uptime Reliability</p>
                </div>
                <div className="group/stat">
                  <h4 className="text-3xl font-black mb-1 italic tracking-tighter group-hover/stat:text-lime-400 transition-colors">&lt; 200ms</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500/40">Analysis Latency</p>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-950/40 border border-emerald-500/10 p-10 rounded-[32px] backdrop-blur-3xl relative">
              <div className="absolute -top-6 -right-6 z-20 p-6 bg-gradient-to-br from-emerald-400 to-lime-400 rounded-2xl rotate-12 shadow-2xl animate-float border border-emerald-300/30">
                <Zap size={28} className="text-emerald-950" />
              </div>
              
              <div className="space-y-8">
                {[
                  { label: 'Neural Processing', val: 85, color: 'from-emerald-600 to-emerald-400' },
                  { label: 'Data Throughput', val: 92, color: 'from-lime-600 to-lime-400' },
                  { label: 'Vision Accuracy', val: 98, color: 'from-teal-600 to-teal-400' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100/40">{item.label}</span>
                      <span className="text-[10px] font-black text-emerald-100">{item.val}%</span>
                    </div>
                    <div className="h-1.5 bg-emerald-900/50 rounded-full overflow-hidden border border-emerald-500/10">
                      <div 
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.val}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
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
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-10px) rotate(15deg); }
        }
        .animate-reveal { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-up { opacity: 0; animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default FeaturesPage;