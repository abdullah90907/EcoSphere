import React from 'react';
import { Leaf, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { ModuleType } from '../types';

interface PublicFooterProps {
  setModule?: (module: ModuleType) => void;
}

const PublicFooter: React.FC<PublicFooterProps> = ({ setModule }) => {
  const platformLinks = [
    { label: 'Home', type: ModuleType.HOME },
    { label: 'Features', type: ModuleType.FEATURES },
    { label: 'Impact', type: ModuleType.IMPACT },
    { label: 'Mission', type: ModuleType.MISSION },
  ];

  return (
    <footer className="bg-emerald-950 border-t border-emerald-900/50 py-20 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Leaf size={28} className="text-emerald-500" />
              <span className="text-2xl font-black tracking-tighter uppercase italic text-white">Ecosphere</span>
            </div>
            <p className="text-emerald-100/40 text-sm max-w-sm leading-relaxed mb-8">
              Protecting our planet through intelligent data systems and community-driven sustainability. 
              Join us in building a zero-waste future for generations to come.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 bg-emerald-900/50 rounded-xl text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-6">Platform</h4>
            <ul className="space-y-4">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => setModule?.(link.type)}
                    className="text-sm text-emerald-100/60 hover:text-emerald-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-6">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sustainability Report'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-emerald-100/60 hover:text-emerald-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-emerald-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-100/20">
            &copy; 2026 Ecosphere Guardian. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100/40">
            <span>Made with Care for the Earth</span>
            <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
            <span>Global Operations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;