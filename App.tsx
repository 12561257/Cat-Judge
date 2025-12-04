import React, { useState } from 'react';
import { AppStage, CaseData, VerdictData, ReparationTask, Language } from './types';
import { judgeCase } from './services/geminiService';
import CatAvatar from './components/CatAvatar';
import Button from './components/Button';
import { Loader2, Gavel, Heart, Scale, ArrowRight, RefreshCcw, Globe } from 'lucide-react';
import { translations } from './utils/translations';

// --- Sub-components ---

const Landing: React.FC<{ onStart: () => void, t: any }> = ({ onStart, t }) => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-fade-in relative">
    <CatAvatar size="xl" className="mb-8 wiggle" />
    <h1 className="text-5xl md:text-6xl font-serif font-black text-cat-brown mb-4">
      {t.landing.title}
      <br />
      <span className="text-cat-pink-dark">{t.landing.subtitle}</span>
    </h1>
    <p className="text-xl md:text-2xl text-stone-600 mb-12 max-w-2xl font-serif whitespace-pre-line">
      {t.landing.description}
    </p>
    <Button onClick={onStart} className="text-xl px-12 py-4 flex items-center gap-2">
      <Gavel size={24} />
      {t.landing.button}
    </Button>
  </div>
);

const InputForm: React.FC<{ onSubmit: (data: CaseData) => void, t: any }> = ({ onSubmit, t }) => {
  const [data, setData] = useState<CaseData>({
    partyA: { name: '', event: '', grievance: '' },
    partyB: { name: '', event: '', grievance: '' },
  });

  const handleChange = (party: 'partyA' | 'partyB', field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [party]: { ...prev[party], [field]: value }
    }));
  };

  const isFormValid = 
    data.partyA.name && data.partyA.event && data.partyA.grievance &&
    data.partyB.name && data.partyB.event && data.partyB.grievance;

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <CatAvatar size="md" className="mx-auto mb-4" variant="judge" />
        <h2 className="text-3xl font-serif font-bold text-cat-brown">{t.input.header}</h2>
        <p className="text-stone-500 italic">{t.input.subheader}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Party A */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-blue-100 relative">
            <div className="absolute -top-4 left-6 bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                {t.input.partyA}
            </div>
            <div className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-stone-600 mb-1">{t.input.labelName}</label>
                    <input 
                        type="text" 
                        value={data.partyA.name}
                        onChange={(e) => handleChange('partyA', 'name', e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder={t.input.placeholderNameA}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-stone-600 mb-1">{t.input.labelEvent}</label>
                    <textarea 
                        value={data.partyA.event}
                        onChange={(e) => handleChange('partyA', 'event', e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                        placeholder={t.input.placeholderEventA}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-stone-600 mb-1">{t.input.labelGrievance}</label>
                    <textarea 
                        value={data.partyA.grievance}
                        onChange={(e) => handleChange('partyA', 'grievance', e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                        placeholder={t.input.placeholderGrievanceA}
                    />
                </div>
            </div>
        </div>

        {/* Party B */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-pink-100 relative">
            <div className="absolute -top-4 left-6 bg-pink-100 text-pink-800 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                {t.input.partyB}
            </div>
            <div className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-stone-600 mb-1">{t.input.labelName}</label>
                    <input 
                        type="text" 
                        value={data.partyB.name}
                        onChange={(e) => handleChange('partyB', 'name', e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                        placeholder={t.input.placeholderNameB}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-stone-600 mb-1">{t.input.labelEvent}</label>
                    <textarea 
                        value={data.partyB.event}
                        onChange={(e) => handleChange('partyB', 'event', e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 h-24 focus:outline-none focus:ring-2 focus:ring-pink-200 resize-none"
                        placeholder={t.input.placeholderEventB}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-stone-600 mb-1">{t.input.labelGrievance}</label>
                    <textarea 
                        value={data.partyB.grievance}
                        onChange={(e) => handleChange('partyB', 'grievance', e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 h-24 focus:outline-none focus:ring-2 focus:ring-pink-200 resize-none"
                        placeholder={t.input.placeholderGrievanceB}
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
            onClick={() => onSubmit(data)} 
            disabled={!isFormValid}
            className="w-full md:w-auto min-w-[300px]"
        >
            {t.input.submit}
        </Button>
      </div>
    </div>
  );
};

const LoadingView: React.FC<{ t: any }> = ({ t }) => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
    <div className="relative mb-8">
        <CatAvatar size="xl" className="animate-pulse" />
        <div className="absolute -right-8 -top-8 text-6xl animate-bounce" style={{ animationDuration: '2s' }}>⚖️</div>
    </div>
    <h2 className="text-3xl font-serif font-bold text-cat-brown mb-2">{t.loading.title}</h2>
    <p className="text-stone-500 text-lg">{t.loading.subtitle}</p>
    <Loader2 className="animate-spin mt-8 text-cat-pink-dark" size={48} />
  </div>
);

const VerdictView: React.FC<{ 
    verdict: VerdictData, 
    names: { a: string, b: string },
    onAccept: () => void,
    t: any
}> = ({ verdict, names, onAccept, t }) => {
    
  return (
    <div className="min-h-screen py-12 px-4 md:px-8 max-w-4xl mx-auto">
       <div className="text-center mb-8">
        <CatAvatar size="lg" className="mx-auto mb-4" variant="judge" />
        <h1 className="text-4xl font-serif font-black text-stone-800 tracking-tight uppercase border-b-4 border-stone-800 inline-block pb-2">
            {t.verdict.title}
        </h1>
      </div>

      {/* Root Analysis */}
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mb-8">
        <h3 className="flex items-center gap-2 text-xl font-bold text-blue-600 mb-3">
            <span className="text-2xl">🔍</span> {t.verdict.rootAnalysis}
        </h3>
        <p className="text-stone-700 leading-relaxed font-serif text-lg italic">
            "{verdict.rootAnalysis}"
        </p>
      </div>

      {/* Responsibility Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mb-8">
         <h3 className="text-center text-stone-500 font-bold uppercase tracking-widest text-sm mb-6">{t.verdict.responsibility}</h3>
         <div className="relative h-16 bg-stone-100 rounded-full overflow-hidden flex font-bold text-white text-lg md:text-xl">
            <div 
                className="bg-blue-400 flex items-center justify-center transition-all duration-1000 ease-out"
                style={{ width: `${verdict.partyAScore}%` }}
            >
                {verdict.partyAScore > 15 && `${verdict.partyAScore}%`}
            </div>
            <div 
                className="bg-pink-400 flex items-center justify-center transition-all duration-1000 ease-out"
                style={{ width: `${verdict.partyBScore}%` }}
            >
                {verdict.partyBScore > 15 && `${verdict.partyBScore}%`}
            </div>
         </div>
         <div className="flex justify-between mt-2 px-2 text-sm font-bold text-stone-600">
            <span className="text-blue-500">{names.a}</span>
            <span className="text-pink-500">{names.b}</span>
         </div>
      </div>

      {/* The Decree */}
      <div className="bg-[#FFF8E1] rounded-tl-sm rounded-br-sm rounded-tr-[3rem] rounded-bl-[3rem] shadow-lg border-4 border-double border-orange-200 p-8 mb-10 relative">
         <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-cat-brown text-white px-6 py-1 rounded-full text-sm font-bold uppercase shadow-sm">
            {t.verdict.decree}
         </div>
         <h3 className="text-2xl font-serif font-bold text-center text-stone-800 mb-4 mt-2">
            {verdict.decreeTitle}
         </h3>
         <p className="text-stone-700 font-serif leading-loose text-justify">
            {verdict.decreeContent}
         </p>
         <div className="mt-8 flex justify-end">
            <div className="text-center">
                <div className="font-cursive text-cat-pink-dark text-3xl opacity-80 rotate-[-10deg]">Judge Cat 🐾</div>
            </div>
         </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={onAccept} className="w-full md:w-2/3 shadow-xl animate-pulse">
            {t.verdict.accept}
        </Button>
      </div>
    </div>
  );
};

const RestorationView: React.FC<{ 
    verdict: VerdictData, 
    names: { a: string, b: string },
    t: any
}> = ({ verdict, names, t }) => {
    const [tasks, setTasks] = useState<ReparationTask[]>(
        verdict.reparations.map((r, i) => ({ ...r, id: i.toString(), completed: false }))
    );
    const [temperature, setTemperature] = useState(80);

    const toggleTask = (id: string) => {
        setTasks(prev => prev.map(t => {
            if (t.id === id && !t.completed) {
                setTemperature(curr => Math.min(100, curr + Math.ceil(20 / prev.length)));
                return { ...t, completed: true };
            }
            return t;
        }));
    };

    const isComplete = tasks.every(t => t.completed);

    const getTemperatureLabel = (temp: number) => {
        if (temp < 85) return { text: t.statusText.chilly, color: "text-blue-500" };
        if (temp < 95) return { text: t.statusText.warming, color: "text-orange-500" };
        return { text: t.statusText.burning, color: "text-red-500" };
    };

    const tempInfo = getTemperatureLabel(temperature);

    return (
        <div className="min-h-screen py-12 px-4 md:px-8 max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <CatAvatar size="md" className="mx-auto mb-4" variant={isComplete ? "happy" : "judge"} />
                <h2 className="text-3xl font-serif font-bold text-cat-brown">{t.restoration.header}</h2>
                
                {/* Temperature Gauge */}
                <div className="mt-8 bg-white p-6 rounded-3xl shadow-md max-w-md mx-auto">
                    <div className="flex justify-between items-end mb-2">
                        <span className={`text-3xl font-black ${tempInfo.color}`}>{temperature}°C</span>
                        <span className="text-stone-400 text-sm font-bold uppercase">{t.restoration.loveLevel}</span>
                    </div>
                    <div className="h-4 bg-stone-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-blue-300 via-pink-400 to-red-500 transition-all duration-1000"
                            style={{ width: `${temperature}%` }}
                        />
                    </div>
                    <div className="mt-2 text-stone-500 font-medium">
                        {t.restoration.status} <span className={`${tempInfo.color} font-bold`}>{tempInfo.text}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-stone-400 font-bold uppercase tracking-widest text-sm ml-2">{t.restoration.reparations}</h3>
                {tasks.map((task) => (
                    <div 
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`
                            relative overflow-hidden group cursor-pointer transition-all duration-300
                            p-6 rounded-2xl border-2 shadow-sm flex items-center gap-4
                            ${task.completed 
                                ? 'bg-green-50 border-green-200 opacity-80' 
                                : 'bg-white border-stone-100 hover:border-cat-pink hover:shadow-md'
                            }
                        `}
                    >
                        <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors
                            ${task.completed ? 'bg-green-500 text-white' : 'bg-stone-100 text-stone-300 group-hover:bg-cat-pink group-hover:text-white'}
                        `}>
                            {task.completed ? <Heart fill="currentColor" size={24}/> : <div className="text-xl font-bold">{parseInt(task.id) + 1}</div>}
                        </div>
                        
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`
                                    text-xs font-bold px-2 py-0.5 rounded uppercase
                                    ${task.party === 'A' ? 'bg-blue-100 text-blue-700' : 
                                      task.party === 'B' ? 'bg-pink-100 text-pink-700' : 
                                      'bg-purple-100 text-purple-700'}
                                `}>
                                    {task.party === 'A' ? names.a : task.party === 'B' ? names.b : t.restoration.partyBoth}
                                </span>
                            </div>
                            <p className={`text-lg font-medium ${task.completed ? 'text-stone-500 line-through' : 'text-stone-800'}`}>
                                {task.task}
                            </p>
                        </div>

                        {task.completed && (
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                                <span className="text-8xl">❤️</span>
                             </div>
                        )}
                    </div>
                ))}
            </div>

            {isComplete && (
                <div className="mt-12 text-center animate-bounce">
                    <h3 className="text-2xl font-bold text-cat-pink-dark mb-4">{t.restoration.complete}</h3>
                    <Button onClick={() => window.location.reload()} variant="outline">
                        <RefreshCcw size={20} className="mr-2 inline" />
                        {t.restoration.newCase}
                    </Button>
                </div>
            )}
        </div>
    );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.LANDING);
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [verdict, setVerdict] = useState<VerdictData | null>(null);
  const [language, setLanguage] = useState<Language>('zh');

  const t = translations[language];

  const handleStart = () => setStage(AppStage.INPUT);

  const handleSubmitCase = async (data: CaseData) => {
    setCaseData(data);
    setStage(AppStage.LOADING);
    try {
      const result = await judgeCase(data, language);
      setVerdict(result);
      setStage(AppStage.VERDICT);
    } catch (error) {
      alert(language === 'zh' ? "猫猫法官睡着了 (API Error)。请重试。" : "Judge Cat is taking a nap (API Error). Please try again.");
      setStage(AppStage.INPUT);
    }
  };

  const handleAcceptVerdict = () => setStage(AppStage.RESTORATION);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="font-sans text-cat-brown bg-cat-beige min-h-screen selection:bg-cat-pink selection:text-white relative">
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={toggleLanguage}
          className="bg-white/50 backdrop-blur hover:bg-white border-2 border-cat-brown/10 hover:border-cat-brown px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-bold transition-all shadow-sm"
        >
          <Globe size={16} />
          {language === 'en' ? '中文' : 'English'}
        </button>
      </div>

      {stage === AppStage.LANDING && <Landing onStart={handleStart} t={t} />}
      {stage === AppStage.INPUT && <InputForm onSubmit={handleSubmitCase} t={t} />}
      {stage === AppStage.LOADING && <LoadingView t={t} />}
      {stage === AppStage.VERDICT && verdict && caseData && (
        <VerdictView 
            verdict={verdict} 
            names={{ a: caseData.partyA.name, b: caseData.partyB.name }} 
            onAccept={handleAcceptVerdict} 
            t={t}
        />
      )}
      {stage === AppStage.RESTORATION && verdict && caseData && (
        <RestorationView 
            verdict={verdict} 
            names={{ a: caseData.partyA.name, b: caseData.partyB.name }} 
            t={t}
        />
      )}
    </div>
  );
};

export default App;