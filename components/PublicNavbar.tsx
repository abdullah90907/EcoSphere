import React from 'react';
import { Leaf, Menu, X, Sparkles } from 'lucide-react';
import { ModuleType } from '../types';

interface PublicNavbarProps {
  currentModule: ModuleType;
  setModule: (module: ModuleType) => void;
  onLogin: () => void;
}

const PublicNavbar: React.FC<PublicNavbarProps> = ({ currentModule, setModule, onLogin }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { type: ModuleType.HOME, label: 'Home' },
    { type: ModuleType.FEATURES, label: 'Features' },
    { type: ModuleType.IMPACT, label: 'Impact' },
    { type: ModuleType.MISSION, label: 'Mission' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'bg-emerald-950/40 backdrop-blur-md py-3 border-b border-emerald-500/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)]' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer group animate-fade-in"
          onClick={() => setModule(ModuleType.HOME)}
        >
          <div className="p-2 bg-gradient-to-br from-emerald-400 to-lime-400 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-500/20">
            <Leaf size={22} className="text-emerald-950" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic text-white">Ecosphere</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-3">
          {navItems.map((item, i) => (
            <button
              key={item.type}
              onClick={() => setModule(item.type)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-full relative group animate-fade-in`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className={`relative z-10 ${
                currentModule === item.type ? 'text-emerald-400' : 'text-emerald-50/90 group-hover:text-white'
              }`}>
                {item.label}
              </span>
              {currentModule === item.type && (
                <div className="absolute inset-0 bg-emerald-500/10 rounded-full border border-emerald-500/20"></div>
              )}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-400 group-hover:w-1/2 transition-all duration-300"></div>
            </button>
          ))}
          
          <div className="w-2"></div>

          <button
            onClick={() => setModule(ModuleType.LOGIN)}
            className="group relative bg-gradient-to-r from-emerald-400 to-lime-400 text-emerald-950 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20 flex items-center gap-2 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>Demo Login</span>
          </button>

          <button
            onClick={onLogin}
            className="group relative bg-white/10 border border-emerald-500/20 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] overflow-hidden transition-all hover:bg-white/20 hover:scale-105 active:scale-95 shadow-xl animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <span className="relative z-10">Login</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-emerald-950 border-b border-emerald-800 p-6 space-y-4 animate-fade-in-down">
          {navItems.map((item) => (
            <button
              key={item.type}
              onClick={() => {
                setModule(item.type);
                setIsOpen(false);
              }}
              className="block w-full text-left text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100/60 py-2"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setModule(ModuleType.LOGIN);
              setIsOpen(false);
            }}
            className="w-full bg-gradient-to-r from-emerald-400 to-lime-400 text-emerald-950 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
          >
            <Sparkles size={16} />
            <span>Try Demo Account</span>
          </button>
          <button
            onClick={() => {
              onLogin();
              setIsOpen(false);
            }}
            className="w-full bg-white/10 border border-emerald-500/20 text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;