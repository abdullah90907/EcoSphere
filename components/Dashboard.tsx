import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, TrendingDown, Leaf, AlertCircle, Wind, Lightbulb, RefreshCw } from 'lucide-react';
import { getTextAdvice } from '../services/geminiService';
import { authService } from '../services/authService';

const Dashboard: React.FC = () => {
  const [dailyTip, setDailyTip] = useState<string>("Loading your daily sustainability tip...");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [user, setUser] = useState(authService.getCurrentUser());
  const [stats, setStats] = useState({
    food_saved: 0,
    water_saved: 0,
    carbon_offset: 0,
    alerts_count: 0
  });

  const fetchStats = async () => {
    try {
      const data = await authService.getUserStats();
      setStats(data);
    } catch (e) {
      console.error("Failed to fetch user stats", e);
    }
  };

  const fetchTip = async (force: boolean = false) => {
    // 1 hour in milliseconds
    const CACHE_DURATION = 60 * 60 * 1000;
    const now = Date.now();
    
    if (!force) {
      const cachedData = localStorage.getItem('eco_daily_tip');
      if (cachedData) {
        const { tip, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < CACHE_DURATION) {
          setDailyTip(tip);
          return;
        }
      }
    }

    setIsRefreshing(true);
    try {
      const tip = await getTextAdvice("Give me one short, interesting, and actionable sustainability tip for today. Less than 20 words.");
      setDailyTip(tip);
      localStorage.setItem('eco_daily_tip', JSON.stringify({ tip, timestamp: now }));
    } catch (e) {
      setDailyTip("Reduce, Reuse, Recycle!");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTip();
    fetchStats();
  }, []);

  const wasteData = [
    { name: 'Mon', value: stats.food_saved / 7 + 1 },
    { name: 'Tue', value: stats.food_saved / 7 - 0.5 },
    { name: 'Wed', value: stats.food_saved / 7 + 2 },
    { name: 'Thu', value: stats.food_saved / 7 },
    { name: 'Fri', value: stats.food_saved / 7 + 0.5 },
    { name: 'Sat', value: stats.food_saved / 7 + 3 },
    { name: 'Sun', value: stats.food_saved / 7 + 1 },
  ];

  const pollutionData = [
    { name: 'Recyclable', value: 45 },
    { name: 'Compost', value: 30 },
    { name: 'Landfill', value: 15 },
    { name: 'Hazardous', value: 10 },
  ];

  const COLORS = ['#10B981', '#F59E0B', '#64748B', '#EF4444'];

  return (
    <div className="space-y-6">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Sustainability Overview</h1>
          <p className="text-slate-500">Welcome back, {user?.name || 'Guardian'}. Here is your weekly impact report.</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 px-4 py-3 rounded-xl flex items-start max-w-md relative group">
          <Lightbulb className="text-amber-500 shrink-0 mr-3 mt-0.5" size={20} />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wide">Daily Eco Tip</h4>
              <button 
                onClick={() => fetchTip(true)} 
                disabled={isRefreshing}
                className="text-amber-500 hover:text-amber-700 transition-colors disabled:opacity-50"
                title="Refresh tip"
              >
                <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
              </button>
            </div>
            <p className="text-sm text-amber-900 font-medium">{dailyTip}</p>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Food Saved</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.food_saved} kg</h3>
            </div>
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <Leaf size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-600">
            <ArrowUpRight size={16} className="mr-1" />
            <span>+12% from last week</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Water Usage</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.water_saved} L</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <TrendingDown size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-blue-600">
            <TrendingDown size={16} className="mr-1" />
            <span>-5% optimized irrigation</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Carbon Offset</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.carbon_offset} kg</h3>
            </div>
            <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
              <Wind size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-slate-400">
            <span>Consistent impact</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Alerts</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.alerts_count}</h3>
            </div>
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="mt-4 text-sm text-amber-600 cursor-pointer hover:underline">
            View agriculture alerts
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Food Waste Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Weekly Waste Analysis (kg)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#F1F5F9' }}
                />
                <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Waste Composition Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Waste Composition</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pollutionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pollutionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 ml-4">
              {pollutionData.map((entry, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-slate-600">{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
