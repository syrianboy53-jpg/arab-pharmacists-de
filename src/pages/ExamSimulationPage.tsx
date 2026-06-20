import { useState, useEffect } from 'react';
import { PlayCircle, CheckCircle, Clock, Award, FileText, Headphones, Edit3, Mic } from 'lucide-react';
import { playTadaSound, triggerConfetti } from '../utils/gamification';

export default function ExamSimulationPage() {
  const [examStarted, setExamStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState<'intro' | 'lesen' | 'hoeren' | 'schreiben' | 'sprechen' | 'result'>('intro');
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  useEffect(() => {
    if (currentSection === 'result') {
      playTadaSound();
      triggerConfetti();
    }
  }, [currentSection]);

  const startExam = () => {
    setExamStarted(true);
    setCurrentSection('lesen');
  };

  const completeSection = (points: number, nextSection: any) => {
    setScore(s => s + points);
    setCurrentSection(nextSection);
  };

  if (!examStarted || currentSection === 'intro') {
    return (
      <div className="p-4 max-w-4xl mx-auto mb-20 animate-fade-in">
        <div className="bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 text-emerald-900 dark:text-emerald-100 text-center shadow-sm mb-8">
          <Award size={64} className="mx-auto mb-4 text-emerald-600 dark:text-emerald-400" />
          <h1 className="text-3xl font-bold mb-4">محاكاة امتحان B1 (telc / Goethe)</h1>
          <p className="text-lg opacity-90 mb-6 font-medium">
            اختبر نفسك في الأقسام الأربعة (القراءة، الاستماع، الكتابة، المحادثة) في ظروف مشابهة للامتحان الحقيقي.
          </p>
          <div className="flex justify-center gap-4 text-sm font-medium opacity-80 mb-8">
            <span className="flex items-center gap-1"><Clock size={16}/> 15 دقيقة (نسخة مصغرة)</span>
            <span className="flex items-center gap-1"><CheckCircle size={16}/> تصحيح فوري</span>
          </div>
          <button 
            onClick={startExam}
            className="bg-emerald-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md hover:scale-105 transition-transform hover:bg-emerald-700"
          >
            بدء الامتحان الآن
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-start gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-3 rounded-xl">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 dark:text-gray-900 dark:text-white">القراءة (Lesen)</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">نصوص أصلية مع أسئلة اختيار من متعدد.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-start gap-4">
            <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-3 rounded-xl">
              <Headphones size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 dark:text-gray-900 dark:text-white">الاستماع (Hören)</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">مقاطع صوتية تحاكي إعلانات محطة القطار والراديو.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-start gap-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-3 rounded-xl">
              <Edit3 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 dark:text-gray-900 dark:text-white">الكتابة (Schreiben)</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">كتابة إيميل رسمي أو غير رسمي مع تصحيح ذكي.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-start gap-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl">
              <Mic size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 dark:text-gray-900 dark:text-white">المحادثة (Sprechen)</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">التخطيط لشيء مع شريك ووصف صورة.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === 'lesen') {
    return (
      <div className="p-4 max-w-3xl mx-auto mb-20 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="text-blue-500" /> قسم القراءة (Lesen)
          </h2>
          <span className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300">1 / 4</span>
        </div>
        
        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 mb-6">
          <h3 className="font-bold text-lg mb-4 dark:text-gray-900 dark:text-white border-b dark:border-white/10 pb-2 dark:border-white/5">Teil 1: Lesen Sie den Text.</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 bg-gray-50 dark:bg-[#0f0f1a] p-4 rounded-xl border-l-4 border-blue-500 text-left" dir="ltr">
            Liebe Sarah,<br/><br/>
            ich hoffe, es geht dir gut! Ich schreibe dir, weil ich nächste Woche nach Berlin umziehe. Ich habe endlich eine schöne Wohnung gefunden. Sie ist nicht sehr groß, aber sie liegt zentral. Am Samstag mache ich eine kleine Einweihungsparty. Hast du Zeit zu kommen? Ich würde mich sehr freuen!
            <br/><br/>Viele Grüße,<br/>Julia
          </p>
          
          <div className="space-y-4 text-left" dir="ltr">
            <p className="font-bold dark:text-gray-900 dark:text-white">1. Warum schreibt Julia die E-Mail?</p>
            <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${answers['q1'] === 'A' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-gray-700'}`}>
              <input type="radio" name="q1" value="A" onChange={() => handleSelect('q1', 'A')} checked={answers['q1'] === 'A'} className="w-5 h-5 text-blue-600" />
              <span className={`font-medium ${answers['q1'] === 'A' ? 'text-blue-700 dark:text-blue-300' : 'dark:text-gray-200'}`}>A) Sie sucht eine neue Wohnung.</span>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${answers['q1'] === 'B' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-gray-700'}`}>
              <input type="radio" name="q1" value="B" onChange={() => handleSelect('q1', 'B')} checked={answers['q1'] === 'B'} className="w-5 h-5 text-blue-600" />
              <span className={`font-medium ${answers['q1'] === 'B' ? 'text-blue-700 dark:text-blue-300' : 'dark:text-gray-200'}`}>B) Sie lädt Sarah zu einer Party ein.</span>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${answers['q1'] === 'C' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-gray-700'}`}>
              <input type="radio" name="q1" value="C" onChange={() => handleSelect('q1', 'C')} checked={answers['q1'] === 'C'} className="w-5 h-5 text-blue-600" />
              <span className={`font-medium ${answers['q1'] === 'C' ? 'text-blue-700 dark:text-blue-300' : 'dark:text-gray-200'}`}>C) Sie fährt nach Berlin in den Urlaub.</span>
            </label>
          </div>
        </div>
        
        <button 
          onClick={() => completeSection(25, 'hoeren')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          التالي: قسم الاستماع <CheckCircle size={20} />
        </button>
      </div>
    );
  }

  if (currentSection === 'hoeren') {
    return (
      <div className="p-4 max-w-3xl mx-auto mb-20 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-gray-900 dark:text-white flex items-center gap-2">
            <Headphones className="text-orange-500" /> قسم الاستماع (Hören)
          </h2>
          <span className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300">2 / 4</span>
        </div>
        
        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 mb-6">
          <h3 className="font-bold text-lg mb-4 dark:text-gray-900 dark:text-white border-b dark:border-white/10 pb-2 dark:border-white/5">Teil 1: Hören Sie die Ansage.</h3>
          
          <div className="bg-gray-50 dark:bg-[#0f0f1a] p-6 rounded-xl text-center mb-6 border border-gray-200 dark:border-white/5">
            <button className="bg-orange-500 text-gray-900 dark:text-white rounded-full p-4 hover:scale-110 transition-transform shadow-lg mb-3">
              <PlayCircle size={48} />
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400">Audio 1: Ansage am Bahnhof</p>
          </div>
          
          <div className="space-y-4 text-left" dir="ltr">
            <p className="font-bold dark:text-gray-900 dark:text-white">1. Der Zug nach München...</p>
            <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${answers['q2'] === 'A' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30' : 'border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-gray-700'}`}>
              <input type="radio" name="q2" value="A" onChange={() => handleSelect('q2', 'A')} checked={answers['q2'] === 'A'} className="w-5 h-5 text-orange-600" />
              <span className={`font-medium ${answers['q2'] === 'A' ? 'text-orange-700 dark:text-orange-300' : 'dark:text-gray-200'}`}>A) fällt heute aus.</span>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${answers['q2'] === 'B' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30' : 'border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-gray-700'}`}>
              <input type="radio" name="q2" value="B" onChange={() => handleSelect('q2', 'B')} checked={answers['q2'] === 'B'} className="w-5 h-5 text-orange-600" />
              <span className={`font-medium ${answers['q2'] === 'B' ? 'text-orange-700 dark:text-orange-300' : 'dark:text-gray-200'}`}>B) hat 20 Minuten Verspätung.</span>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${answers['q2'] === 'C' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30' : 'border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-gray-700'}`}>
              <input type="radio" name="q2" value="C" onChange={() => handleSelect('q2', 'C')} checked={answers['q2'] === 'C'} className="w-5 h-5 text-orange-600" />
              <span className={`font-medium ${answers['q2'] === 'C' ? 'text-orange-700 dark:text-orange-300' : 'dark:text-gray-200'}`}>C) fährt auf Gleis 5 ab.</span>
            </label>
          </div>
        </div>
        
        <button 
          onClick={() => completeSection(25, 'schreiben')}
          className="w-full bg-orange-600 hover:bg-orange-700 text-gray-900 dark:text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          التالي: قسم الكتابة <CheckCircle size={20} />
        </button>
      </div>
    );
  }

  if (currentSection === 'schreiben') {
    return (
      <div className="p-4 max-w-3xl mx-auto mb-20 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-gray-900 dark:text-white flex items-center gap-2">
            <Edit3 className="text-purple-500" /> قسم الكتابة (Schreiben)
          </h2>
          <span className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300">3 / 4</span>
        </div>
        
        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 mb-6">
          <h3 className="font-bold text-lg mb-4 dark:text-gray-900 dark:text-white border-b dark:border-white/10 pb-2 dark:border-white/5">Schreiben Sie eine E-Mail</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-left" dir="ltr">
            Sie haben am Wochenende einen Ausflug gemacht. Schreiben Sie Ihrem Freund/Ihrer Freundin eine E-Mail darüber.<br/>
            - Wohin sind Sie gefahren?<br/>
            - Wie war das Wetter?<br/>
            - Was haben Sie gemacht?
          </p>
          
          <textarea 
            className="w-full h-48 p-4 rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#0f0f1a] focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none text-left dark:text-white font-sans"
            placeholder="Liebe(r)..."
            dir="ltr"
          ></textarea>
          
          <div className="mt-4 flex justify-end">
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <Award size={16} /> تصحيح النص بالذكاء الاصطناعي
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => completeSection(25, 'sprechen')}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          التالي: قسم المحادثة <CheckCircle size={20} />
        </button>
      </div>
    );
  }

  if (currentSection === 'sprechen') {
    return (
      <div className="p-4 max-w-3xl mx-auto mb-20 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-gray-900 dark:text-white flex items-center gap-2">
            <Mic className="text-emerald-500" /> قسم المحادثة (Sprechen)
          </h2>
          <span className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300">4 / 4</span>
        </div>
        
        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 mb-6">
          <h3 className="font-bold text-lg mb-4 dark:text-gray-900 dark:text-white border-b dark:border-white/10 pb-2 dark:border-white/5">Teil 2: Etwas gemeinsam planen</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-left" dir="ltr">
            Ein Kollege von Ihnen hat bald Geburtstag. Sie möchten mit Ihrem Partner/Ihrer Partnerin ein Geschenk kaufen und eine kleine Überraschung planen.
          </p>
          
          <div className="bg-emerald-50 dark:bg-emerald-900/30 p-6 rounded-xl text-center mb-6 border border-emerald-100 dark:border-emerald-800">
            <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
              <Mic size={32} />
            </div>
            <p className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">اضغط للتحدث (قريباً)</p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">تدرب على المحادثة مع المدرب الصوتي الذكي.</p>
          </div>
        </div>
        
        <button 
          onClick={() => completeSection(25, 'result')}
          className="w-full bg-emerald-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          إنهاء الامتحان وعرض النتيجة <Award size={20} />
        </button>
      </div>
    );
  }

  // Result Page
  return (
    <div className="p-4 max-w-2xl mx-auto mb-20 animate-fade-in text-center">
      <div className="bg-white dark:bg-[#1a1a2e] p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-white/5">
        <div className="w-24 h-24 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle size={48} className="text-gray-900 dark:text-white" />
        </div>
        <h2 className="text-3xl font-bold dark:text-gray-900 dark:text-white mb-2">تهانينا! 🎉</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">لقد أتممت محاكاة الامتحان بنجاح.</p>
        
        <div className="bg-gray-50 dark:bg-[#0f0f1a] rounded-2xl p-6 mb-8 border border-gray-100 dark:border-white/5">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">النتيجة التقديرية</p>
          <p className="text-5xl font-black text-emerald-600">{score} <span className="text-2xl text-gray-400">/ 100</span></p>
        </div>
        
        <button 
          onClick={() => {
            setScore(0);
            setCurrentSection('intro');
            setExamStarted(false);
          }}
          className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-900 dark:text-white font-bold px-8 py-4 rounded-xl transition-colors w-full"
        >
          إعادة الامتحان
        </button>
      </div>
    </div>
  );
}
