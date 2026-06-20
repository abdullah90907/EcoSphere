import React, { useState, useRef } from 'react';
import { Wind, Trash2, Loader2, Recycle, CloudRain, AlertOctagon, MessageCircle, Send, Gauge } from 'lucide-react';
import { analyzeImageWithGemini, getTextAdvice, getContextualAdvice } from '../services/geminiService';
import { AnalysisResult } from '../types';

const parseMarkdownText = (text: string) => {
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>') // Bold
    .replace(/^\* (.*)$/gm, '<li class="ml-4 mb-1">$1</li>') // Bullet lists
    .replace(/^\d+\. (.*)$/gm, '<li class="ml-4 mb-1">$1</li>') // Numbered lists
    .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc space-y-1 mt-2 mb-2 pl-6">$1</ul>') // Wrap list items
    .replace(/\n/g, '<br />'); // Line breaks
  
  return html;
};

const PollutionModule: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'monitor' | 'waste'>('monitor');

  // Monitor State
  const [aqi, setAqi] = useState(120);
  const [waterPh, setWaterPh] = useState(7.2);
  const [monitorResult, setMonitorResult] = useState<string | null>(null);
  const [monitorLoading, setMonitorLoading] = useState(false);

  // Inline AI Assistant State
  const [inlineQuestion, setInlineQuestion] = useState('');
  const [inlineAnswer, setInlineAnswer] = useState<string | null>(null);
  const [inlineLoading, setInlineLoading] = useState(false);

  // Waste State
  const [wasteImage, setWasteImage] = useState<string | null>(null);
  const [wasteResult, setWasteResult] = useState<AnalysisResult | null>(null);
  const [wasteLoading, setWasteLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleWasteUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWasteImage(reader.result as string);
        setWasteResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeWaste = async () => {
    if (!wasteImage) return;
    setWasteLoading(true);
    try {
      const prompt = `
        Analyze this waste item. 
        Identify the item.
        Categorize as 'Recyclable', 'Compostable', 'Landfill', or 'Hazardous'.
        Provide proper disposal instructions as recommendations.
        Estimate approximate carbon footprint reduction if recycled in metricLabel1/Value1.
      `;
      const data = await analyzeImageWithGemini(wasteImage, prompt);
      setWasteResult(data);
    } catch (error) {
      alert("Analysis failed.");
    } finally {
      setWasteLoading(false);
    }
  };

  const calculateImpact = async () => {
    setMonitorLoading(true);
    setInlineAnswer(null);
    try {
      const prompt = `
        Given Air Quality Index (AQI) of ${aqi} and Water pH of ${waterPh}.
        1. Rate hazard level (Low/Medium/High).
        2. Suggest 3 short, immediate actions (max 15 words each).
        3. Brief carbon footprint note (1 sentence max).
        Keep total response under 100 words, clear and to the point.
      `;
      const advice = await getTextAdvice(prompt);
      setMonitorResult(advice);
    } catch (error) {
      setMonitorResult("Failed to calculate.");
    } finally {
      setMonitorLoading(false);
    }
  };

  const askInlineAI = async () => {
    if (!inlineQuestion.trim()) return;
    const context = monitorResult;
    if (!context) return;

    setInlineLoading(true);
    try {
      const answer = await getContextualAdvice(context, inlineQuestion);
      setInlineAnswer(answer);
    } catch (e) {
      setInlineAnswer("Sorry, I couldn't fetch an answer right now.");
    } finally {
      setInlineLoading(false);
      setInlineQuestion('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Pollution<br />Control</h2>
            <p className="text-slate-600 mt-2 font-medium">Track metrics & sort waste</p>
          </div>
          <button
            onClick={() => setActiveSection('monitor')}
            className={`w-full text-left p-4 rounded-2xl flex items-center space-x-3 transition-all duration-300 ${
              activeSection === 'monitor' 
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-200 scale-105' 
              : 'glass-panel hover:bg-white/50 text-slate-600 hover:text-slate-800'
            }`}
          >
            <Wind size={22} />
            <span className="font-semibold">Air & Water</span>
          </button>
          <button
            onClick={() => setActiveSection('waste')}
            className={`w-full text-left p-4 rounded-2xl flex items-center space-x-3 transition-all duration-300 ${
              activeSection === 'waste' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105' 
              : 'glass-panel hover:bg-white/50 text-slate-600 hover:text-slate-800'
            }`}
          >
            <Recycle size={22} />
            <span className="font-semibold">Smart Sorting</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          {activeSection === 'monitor' ? (
            <div className="glass-panel rounded-3xl p-8 shadow-xl border border-white/60">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center">
                  <AlertOctagon className="mr-3 text-teal-600" />
                  Environmental Hazard Tracker
                </h3>
              </div>
              
              <div className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white/60 p-6 rounded-2xl border border-white/50 shadow-sm">
                    <label className="flex justify-between text-sm font-bold text-slate-700 mb-4">
                      <span>Air Quality Index (AQI)</span>
                      <span className={`px-2 py-0.5 rounded text-white ${aqi > 150 ? 'bg-red-500' : 'bg-teal-500'}`}>{aqi}</span>
                    </label>
                    <input 
                      type="range" min="0" max="500" value={aqi} 
                      onChange={(e) => setAqi(Number(e.target.value))}
                      className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="mt-3 text-xs font-semibold text-slate-400 flex justify-between">
                      <span>Good (0)</span>
                      <span>Hazardous (500)</span>
                    </div>
                  </div>

                  <div className="bg-white/60 p-6 rounded-2xl border border-white/50 shadow-sm">
                    <label className="flex justify-between text-sm font-bold text-slate-700 mb-4">
                      <span>Water pH Level</span>
                      <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">{waterPh}</span>
                    </label>
                    <input 
                      type="range" min="0" max="14" step="0.1" value={waterPh} 
                      onChange={(e) => setWaterPh(Number(e.target.value))}
                      className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="mt-3 text-xs font-semibold text-slate-400 flex justify-between">
                      <span>Acidic (0)</span>
                      <span>Alkaline (14)</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={calculateImpact}
                  disabled={monitorLoading}
                  className="w-full md:w-auto bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  {monitorLoading ? <Loader2 className="animate-spin mr-2" /> : <Gauge className="mr-2" size={24} />}
                  Analyze Impact
                </button>

                {monitorResult && (
                  <div className="mt-8 animate-fade-in">
                    <div className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl border border-teal-200 text-slate-800 leading-relaxed shadow-inner">
                      <div dangerouslySetInnerHTML={{ __html: parseMarkdownText(monitorResult) }} />
                    </div>
                  </div>
                )}

                {/* Inline AI Assistant */}
                {monitorResult && (
                   <div className="mt-8 pt-8 border-t border-slate-200/60">
                      <div className="flex items-center gap-3 mb-4 text-emerald-800 font-bold text-lg">
                        <div className="bg-emerald-100 p-2 rounded-full">
                          <MessageCircle size={20} className="text-emerald-600" />
                        </div>
                        <h3>EcoBot Contextual Help</h3>
                      </div>
                      
                      <div className="bg-white/50 p-2 rounded-2xl border border-white/60 shadow-inner flex gap-2">
                        <input 
                          type="text" 
                          value={inlineQuestion}
                          onChange={(e) => setInlineQuestion(e.target.value)}
                          placeholder="Ask follow-up questions about this data..."
                          className="flex-1 bg-transparent border-none px-4 py-2 focus:ring-0 outline-none text-slate-700 placeholder-slate-400"
                          onKeyDown={(e) => e.key === 'Enter' && askInlineAI()}
                        />
                        <button 
                          onClick={askInlineAI}
                          disabled={inlineLoading || !inlineQuestion}
                          className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-md"
                        >
                          {inlineLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                        </button>
                      </div>

                      {inlineAnswer && (
                        <div className="mt-4 p-5 bg-emerald-50/90 rounded-2xl text-emerald-900 border border-emerald-100 shadow-sm animate-fade-in flex items-start gap-3">
                          <div className="mt-1 bg-emerald-200 p-1 rounded-full shrink-0">
                             <Recycle size={14} className="text-emerald-700" />
                          </div>
                          <div className="text-sm leading-relaxed font-medium">
                             {inlineAnswer}
                          </div>
                        </div>
                      )}
                   </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="glass-panel p-8 rounded-3xl shadow-xl border border-white/60 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                    <Trash2 className="mr-2 text-emerald-600" />
                    Waste Classifier
                  </h3>
                  <div 
                    className="flex-1 min-h-[350px] bg-slate-50/50 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/60 transition-all relative overflow-hidden group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {wasteImage ? (
                      <img src={wasteImage} alt="Waste" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    ) : (
                      <div className="text-center text-slate-400">
                        <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-4">
                           <Trash2 size={40} className="text-emerald-400" />
                        </div>
                        <p className="font-medium text-slate-500">Click to upload trash image</p>
                        <p className="text-xs mt-2 text-slate-400">AI will detect material type</p>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleWasteUpload} className="hidden" accept="image/*" />
                  </div>
                  <button 
                    onClick={analyzeWaste}
                    disabled={!wasteImage || wasteLoading}
                    className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex justify-center items-center transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
                  >
                    {wasteLoading ? <Loader2 className="animate-spin mr-2" /> : "Identify & Sort"}
                  </button>
               </div>

               <div className="space-y-4 h-full">
                 {wasteResult ? (
                   <div className="glass-panel p-8 rounded-3xl shadow-xl border-t-4 border-emerald-500 animate-fade-in h-full flex flex-col">
                      <div className="mb-8">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Detected Item</h4>
                        <h3 className="text-3xl font-extrabold text-slate-800">{wasteResult.title}</h3>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-8 bg-white/50 p-4 rounded-2xl border border-white/50">
                        <div className={`p-4 rounded-2xl ${
                          wasteResult.category.includes('Recyclable') ? 'bg-blue-100 text-blue-600' :
                          wasteResult.category.includes('Hazardous') ? 'bg-red-100 text-red-600' :
                          wasteResult.category.includes('Compost') ? 'bg-amber-100 text-amber-600' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          <Recycle size={32} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-500">Classification</p>
                          <p className="text-xl font-bold text-slate-800">{wasteResult.category}</p>
                        </div>
                      </div>

                      <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100/50 flex-1">
                        <h4 className="font-bold text-emerald-800 mb-4 flex items-center">
                          <Recycle className="mr-2" size={18} /> Disposal Instructions
                        </h4>
                        <ul className="space-y-3">
                          {wasteResult.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start text-sm text-slate-700 font-medium">
                              <span className="mr-3 mt-1.5 w-2 h-2 bg-emerald-500 rounded-full shrink-0 shadow-sm"></span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                   </div>
                 ) : (
                   <div className="glass-panel p-8 rounded-3xl h-full flex items-center justify-center text-center text-slate-400 border border-dashed border-white/50">
                     <div>
                       <CloudRain size={64} className="mx-auto mb-6 opacity-20" />
                       <h3 className="text-lg font-semibold text-slate-600 mb-2">Ready to Sort</h3>
                       <p className="max-w-xs mx-auto text-slate-500">Upload an image and our AI will tell you exactly which bin to use for maximum sustainability.</p>
                     </div>
                   </div>
                 )}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollutionModule;