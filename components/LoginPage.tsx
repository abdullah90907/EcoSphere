import React, { useState } from 'react';
import { Leaf, ArrowRight, Mail, Lock, Github, Chrome } from 'lucide-react';
import { ModuleType, User } from '../types';
import { authService } from '../services/authService';

interface LoginPageProps {
  onLogin: (user: User) => void;
  setModule: (module: ModuleType) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, setModule }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      onLogin(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#053d26] flex items-center justify-center p-6 relative overflow-hidden font-['Inter']">
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-teal-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-emerald-950/50 backdrop-blur-2xl rounded-[2.5rem] border border-emerald-500/10 overflow-hidden shadow-2xl relative z-10">
        {/* Left Side - Info */}
        <div className="p-12 hidden lg:flex flex-col justify-between bg-gradient-to-br from-emerald-900/50 to-emerald-950/50 border-r border-emerald-500/10">
          <div>
            <div 
              className="flex items-center space-x-2 cursor-pointer mb-12 group"
              onClick={() => setModule(ModuleType.HOME)}
            >
              <div className="p-2 bg-gradient-to-br from-emerald-400 to-lime-400 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-500/20">
                <Leaf size={22} className="text-emerald-950" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase italic text-white">Ecosphere</span>
            </div>
            
            <h2 className="text-4xl font-black text-white leading-tight mb-6">
              REJOIN THE <br />
              <span className="text-emerald-400 italic">REVOLUTION.</span>
            </h2>
            <p className="text-emerald-100/60 leading-relaxed">
              Access your environmental monitoring dashboard and continue engineering a sustainable future.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-emerald-100/40">
              <div className="w-12 h-[1px] bg-emerald-500/20"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Status</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-900/30 p-4 rounded-2xl border border-emerald-500/5">
                <div className="text-emerald-400 text-xl font-black italic">98.2%</div>
                <div className="text-[8px] font-black uppercase tracking-widest text-emerald-100/30">Node Uptime</div>
              </div>
              <div className="bg-emerald-900/30 p-4 rounded-2xl border border-emerald-500/5">
                <div className="text-lime-400 text-xl font-black italic">24/7</div>
                <div className="text-[8px] font-black uppercase tracking-widest text-emerald-100/30">Monitoring</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="lg:hidden flex justify-center mb-8">
             <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => setModule(ModuleType.HOME)}
            >
              <div className="p-2 bg-gradient-to-br from-emerald-400 to-lime-400 rounded-xl group-hover:rotate-12 transition-transform">
                <Leaf size={22} className="text-emerald-950" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase italic text-white">Ecosphere</span>
            </div>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Welcome Back</h3>
            <p className="text-emerald-100/40 text-sm">Enter your credentials to continue</p>
            {error && <p className="text-red-400 text-xs mt-4 font-bold">{error}</p>}
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60 ml-4">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40 group-focus-within:text-emerald-400 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="guardian@ecosphere.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-emerald-900/20 border border-emerald-500/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-emerald-100/20 focus:outline-none focus:border-emerald-500/40 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60">Password</label>
                <button type="button" className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 hover:text-white transition-colors">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40 group-focus-within:text-emerald-400 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-emerald-900/20 border border-emerald-500/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-emerald-100/20 focus:outline-none focus:border-emerald-500/40 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full group relative bg-emerald-500 text-emerald-950 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/10 mt-4 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? 'Authenticating...' : 'Authenticate'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>

            <div className="relative py-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-emerald-500/10"></div>
              </div>
              <span className="relative bg-[#0b2b1e] lg:bg-transparent px-4 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-100/20">Or Continue With</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-3 bg-emerald-900/20 border border-emerald-500/10 py-3 rounded-xl hover:bg-emerald-500/10 transition-all group">
                <Chrome size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-3 bg-emerald-900/20 border border-emerald-500/10 py-3 rounded-xl hover:bg-emerald-500/10 transition-all group">
                <Github size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">GitHub</span>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100/30">
            Don't have an account? 
            <button 
              onClick={() => setModule(ModuleType.SIGNUP)}
              className="text-emerald-400 hover:text-white ml-2 transition-colors"
            >
              Initialize Node
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
