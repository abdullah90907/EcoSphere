import React, { useState } from 'react';
import { Leaf, ArrowRight, Mail, Lock, User as UserIcon, ShieldCheck } from 'lucide-react';
import { ModuleType, User } from '../types';
import { authService } from '../services/authService';

interface SignupPageProps {
  onSignup: (user: User) => void;
  setModule: (module: ModuleType) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, setModule }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const data = await authService.signup(name, email, password);
      onSignup(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#053d26] flex items-center justify-center p-6 relative overflow-hidden font-['Inter']">
      {/* Background Effects */}
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-teal-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-emerald-950/50 backdrop-blur-2xl rounded-[2.5rem] border border-emerald-500/10 overflow-hidden shadow-2xl relative z-10">
        {/* Left Side - Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
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
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Initialize Node</h3>
            <p className="text-emerald-100/40 text-sm">Join the global environmental network</p>
            {error && <p className="text-red-400 text-xs mt-4 font-bold">{error}</p>}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60 ml-4">Full Name</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40 group-focus-within:text-emerald-400 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Eco Guardian"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-emerald-900/20 border border-emerald-500/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-emerald-100/20 focus:outline-none focus:border-emerald-500/40 transition-all"
                />
              </div>
            </div>

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
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60 ml-4">Access Key (Password)</label>
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

            <div className="flex items-center gap-3 px-4 py-2">
              <input type="checkbox" required className="w-4 h-4 rounded border-emerald-500/20 bg-emerald-900/40 text-emerald-500 focus:ring-emerald-500" />
              <label className="text-[9px] font-black uppercase tracking-widest text-emerald-100/40">I agree to the environmental protocol</label>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full group relative bg-emerald-500 text-emerald-950 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/10 mt-2 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? 'Deploying...' : 'Deploy Node'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </form>

          <p className="mt-10 text-center text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100/30">
            Already registered? 
            <button 
              onClick={() => setModule(ModuleType.LOGIN)}
              className="text-emerald-400 hover:text-white ml-2 transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>

        {/* Right Side - Info */}
        <div className="p-12 hidden lg:flex flex-col justify-between bg-gradient-to-bl from-emerald-900/50 to-emerald-950/50 border-l border-emerald-500/10 order-1 lg:order-2">
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
              SECURE YOUR <br />
              <span className="text-lime-400 italic">ENVIRONMENT.</span>
            </h2>
            <p className="text-emerald-100/60 leading-relaxed">
              Join 12,000+ nodes worldwide in monitoring and protecting our planet's vital ecosystems.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-emerald-900/30 p-6 rounded-3xl border border-emerald-500/10 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-500/20 rounded-2xl">
                  <ShieldCheck className="text-emerald-400" size={24} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-white">Encrypted Node</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-emerald-500/60">AES-256 Protocol</div>
                </div>
              </div>
              <p className="text-[10px] text-emerald-100/40 leading-relaxed">
                Your data is protected by industry-leading encryption and decentralized ledger technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
