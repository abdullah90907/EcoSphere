import React, { useState } from 'react';
import { ModuleType, User } from '../types';
import AIAssistant from './AIAssistant';
import { 
  Leaf, 
  Trash2, 
  Wind, 
  LayoutDashboard, 
  Menu, 
  X,
  Sprout,
  LogOut,
  User as UserIcon,
  Settings
} from 'lucide-react';

interface LayoutProps {
  currentModule: ModuleType;
  setModule: (module: ModuleType) => void;
  onLogout: () => void;
  user: User | null;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentModule, setModule, onLogout, user, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { type: ModuleType.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { type: ModuleType.FOOD_WASTE, label: 'Food Waste', icon: <Trash2 size={20} /> },
    { type: ModuleType.AGRICULTURE, label: 'Agriculture', icon: <Sprout size={20} /> },
    { type: ModuleType.POLLUTION, label: 'Pollution Control', icon: <Wind size={20} /> },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden font-['Inter']">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-emerald-900/95 backdrop-blur-md text-white transform transition-transform duration-300 ease-in-out shadow-2xl border-r border-emerald-800 flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-emerald-800/50">
          <div className="flex items-center space-x-2 font-bold text-xl tracking-tight">
            <Leaf className="text-emerald-400" fill="currentColor" />
            <span className="bg-gradient-to-r from-emerald-100 to-teal-200 bg-clip-text text-transparent">Ecosphere</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-emerald-200 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.type}
              onClick={() => {
                setModule(item.type);
                setIsSidebarOpen(false);
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group
                ${currentModule === item.type 
                  ? 'bg-emerald-800/80 text-white shadow-lg border border-emerald-700/50 translate-x-1' 
                  : 'text-emerald-50/90 hover:bg-emerald-800/50 hover:text-white hover:translate-x-1'}
              `}
            >
              <span className={`transition-transform duration-300 ${currentModule === item.type ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className="font-medium tracking-wide">{item.label}</span>
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-emerald-800/50">
            <h4 className="px-4 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/60">System</h4>
            <button
              onClick={() => {
                setModule(ModuleType.ACCOUNT);
                setIsSidebarOpen(false);
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group
                ${currentModule === ModuleType.ACCOUNT 
                  ? 'bg-emerald-800/80 text-white shadow-lg border border-emerald-700/50 translate-x-1' 
                  : 'text-emerald-50/90 hover:bg-emerald-800/50 hover:text-white hover:translate-x-1'}
              `}
            >
              <UserIcon size={20} className={currentModule === ModuleType.ACCOUNT ? 'text-emerald-400' : 'group-hover:text-emerald-400'} />
              <span className="font-medium tracking-wide">Account</span>
            </button>
          </div>
        </nav>
        
        <div className="p-4 border-t border-emerald-800/50">
          <div className="flex items-center space-x-3 px-4 py-4 mb-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/30">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center overflow-hidden border border-emerald-500/20">
              {user?.profile_image ? (
                <img src={user.profile_image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={20} className="text-emerald-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black truncate text-white">{user?.name}</p>
              <p className="text-[9px] font-bold truncate text-emerald-500/60 uppercase tracking-widest">Active Node</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-emerald-100/70 hover:bg-red-900/30 hover:text-red-200 transition-all duration-200 group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium tracking-wide">Logout</span>
          </button>
        </div>
        
        <div className="p-6 text-[10px] text-emerald-400/40 font-black uppercase tracking-widest text-center">
          &copy; 2026 Ecosphere
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Header (Mobile) */}
        <header className="lg:hidden bg-white/80 backdrop-blur-md shadow-sm p-4 flex items-center justify-between z-10 border-b border-slate-200/50">
          <div className="flex items-center space-x-2 font-bold text-emerald-900">
            <Leaf size={20} className="text-emerald-600" />
            <span>Ecosphere</span>
          </div>
          <button onClick={toggleSidebar} className="text-slate-600">
            <Menu size={24} />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>

        {/* Floating AI Assistant */}
        <AIAssistant />
      </div>
    </div>
  );
};

export default Layout;