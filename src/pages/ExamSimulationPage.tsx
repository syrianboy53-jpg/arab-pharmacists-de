import { useState, useEffect, useRef, useCallback } from 'react';
import { PlayCircle, CheckCircle, Clock, Award, FileText, Headphones, Edit3, Mic } from 'lucide-react';
import { playTadaSound, triggerConfetti } from '../utils/gamification';
import { examsData } from '../data/exams';

export default function ExamSimulationPage() {
  const [examStarted, setExamStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState<'intro' | 'lesen' | 'hoeren' | 'schreiben' | 'sprechen' | 'result'>('intro');
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  
  const exam = examsData[0]; // Load the first Mock Exam (Telc B1)

  // TTS State for Hören section
  const [playingId, setPlayingId] = useState<string | null>(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    return () => { synthRef.current.cancel() };
  }, []);

  const speakText = useCallback((text: string, id: string) => {
    const synth = synthRef.current;
    if (playingId === id) {
      synth.cancel();
      setPlayingId(null);
      return;
    }
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.9;
    
    const voices = synth.getVoices();
    const deVoice = voices.find(v => v.lang.startsWith('de') || v.lang.includes('DE'));
    if (deVoice) utterance.voice = deVoice;

    utterance.onstart = () => setPlayingId(id);
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    synth.speak(utterance);
  }, [playingId]);

  const handleSelect = (questionId: string, value: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  useEffect(() => {
    if (currentSection === 'result') {
      playTadaSound();
      triggerConfetti();
      synthRef.current.cancel();
    }
  }, [currentSection]);

  const startExam = () => {
    setExamStarted(true);
    setCurrentSection('hoeren'); // start with Hören
    window.scrollTo(0, 0);
  };

  const completeSection = (nextSection: any) => {
    synthRef.current.cancel();
    setPlayingId(null);
    setCurrentSection(nextSection);
    window.scrollTo(0, 0);
  };

  if (!examStarted || currentSection === 'intro') {
    return (
      <div className="p-4 max-w-4xl mx-auto mb-20 animate-fade-in font-cairo">
        <div className="bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 text-emerald-900 dark:text-emerald-100 text-center shadow-sm mb-8">
          <Award size={64} className="mx-auto mb-4 text-emerald-600 dark:text-emerald-400" />
          <h1 className="text-3xl font-bold mb-4">{exam.title}</h1>
          <p className="text-lg opacity-90 mb-6 font-medium">
            اختبر نفسك في الأقسام الأربعة في ظروف مشابهة للامتحان الحقيقي.
          </p>
          <div className="flex justify-center gap-4 text-sm font-medium opacity-80 mb-8">
            <span className="flex items-center gap-1"><Clock size={16}/> {exam.durationMinutes} دقيقة</span>
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
            <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-3 rounded-xl">
              <Headphones size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 dark:text-gray-900 dark:text-white">الاستماع (Hören)</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">استمع وجاوب على الأسئلة.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-start gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-3 rounded-xl">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 dark:text-gray-900 dark:text-white">القراءة (Lesen)</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">نصوص قراءة وفهم مقروء.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-start gap-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-3 rounded-xl">
              <Edit3 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 dark:text-gray-900 dark:text-white">الكتابة (Schreiben)</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">كتابة رسالة.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-start gap-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl">
              <Mic size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 dark:text-gray-900 dark:text-white">المحادثة (Sprechen)</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">التخطيط لموضوع.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === 'hoeren') {
    return (
      <div className="p-4 max-w-3xl mx-auto mb-20 animate-slide-up font-cairo">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-gray-900 dark:text-white flex items-center gap-2">
            <Headphones className="text-orange-500" /> قسم الاستماع (Hören)
          </h2>
          <span className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300">1 / 4</span>
        </div>
        
        {exam.hoeren.map((section, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 mb-6">
            <h3 className="font-bold text-lg mb-2 dark:text-gray-900 dark:text-white">{section.title}</h3>
            <p className="text-gray-500 text-sm mb-6">{section.description}</p>
            
            {section.questions.map((q) => (
              <div key={q.id} className="mb-8 border-b border-gray-100 dark:border-white/5 pb-6 last:border-0 last:pb-0">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <button 
                    onClick={() => q.audioText && speakText(q.audioText, q.id)}
                    className="shrink-0 flex items-center justify-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 py-3 px-6 rounded-xl font-bold transition-colors"
                  >
                    {playingId === q.id ? <><Clock className="animate-spin" size={20}/> إيقاف</> : <><PlayCircle size={20}/> استمع</>}
                  </button>
                  <div className="flex-1 text-left" dir="ltr">
                    <p className="font-bold text-lg dark:text-white">{q.text}</p>
                  </div>
                </div>

                <div className="grid gap-3 text-left" dir="ltr">
                  {q.options?.map((opt, optIdx) => (
                    <label key={optIdx} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${answers[q.id] === optIdx ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30' : 'border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-gray-700'}`}>
                      <input type="radio" name={q.id} value={optIdx} onChange={() => handleSelect(q.id, optIdx)} checked={answers[q.id] === optIdx} className="w-5 h-5 text-orange-600" />
                      <span className={`font-medium ${answers[q.id] === optIdx ? 'text-orange-700 dark:text-orange-300' : 'dark:text-gray-200'}`}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        
        <button 
          onClick={() => completeSection('lesen')}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          التالي: قسم القراءة <CheckCircle size={20} />
        </button>
      </div>
    );
  }

  if (currentSection === 'lesen') {
    return (
      <div className="p-4 max-w-3xl mx-auto mb-20 animate-slide-up font-cairo">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="text-blue-500" /> قسم القراءة (Lesen)
          </h2>
          <span className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300">2 / 4</span>
        </div>
        
        {exam.lesen.map((section, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 mb-6">
            <h3 className="font-bold text-lg mb-2 dark:text-gray-900 dark:text-white">{section.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{section.description}</p>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 bg-gray-50 dark:bg-[#0f0f1a] p-5 rounded-xl border-l-4 border-blue-500 text-left font-sans whitespace-pre-wrap" dir="ltr">
              {section.text}
            </p>
            
            <div className="space-y-8 text-left" dir="ltr">
              {section.questions.map((q) => (
                <div key={q.id}>
                  <p className="font-bold text-lg mb-3 dark:text-white">{q.text}</p>
                  <div className="grid gap-3">
                    {q.options?.map((opt, optIdx) => (
                      <label key={optIdx} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${answers[q.id] === optIdx ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-gray-700'}`}>
                        <input type="radio" name={q.id} value={optIdx} onChange={() => handleSelect(q.id, optIdx)} checked={answers[q.id] === optIdx} className="w-5 h-5 text-blue-600" />
                        <span className={`font-medium ${answers[q.id] === optIdx ? 'text-blue-700 dark:text-blue-300' : 'dark:text-gray-200'}`}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => completeSection('schreiben')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          التالي: قسم الكتابة <CheckCircle size={20} />
        </button>
      </div>
    );
  }

  if (currentSection === 'schreiben') {
    return (
      <div className="p-4 max-w-3xl mx-auto mb-20 animate-slide-up font-cairo">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-gray-900 dark:text-white flex items-center gap-2">
            <Edit3 className="text-purple-500" /> قسم الكتابة (Schreiben)
          </h2>
          <span className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300">3 / 4</span>
        </div>
        
        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 mb-6">
          <h3 className="font-bold text-lg mb-4 dark:text-gray-900 dark:text-white border-b dark:border-white/10 pb-2 dark:border-white/5">{exam.schreiben.title}</h3>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-right" dir="rtl">
            {exam.schreiben.prompt}
          </p>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-6 text-left bg-gray-50 dark:bg-white/5 p-4 rounded-xl border-l-4 border-purple-500 font-sans" dir="ltr">
            {exam.schreiben.promptDe}
          </p>
          
          <textarea 
            className="w-full h-64 p-4 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f0f1a] text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none mb-6 font-sans text-lg"
            placeholder="Schreiben Sie hier..."
            dir="ltr"
            value={answers['schreiben'] || ''}
            onChange={(e) => handleSelect('schreiben', e.target.value)}
          ></textarea>
        </div>
        
        <button 
          onClick={() => completeSection('sprechen')}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          التالي: قسم المحادثة <CheckCircle size={20} />
        </button>
      </div>
    );
  }

  if (currentSection === 'sprechen') {
    return (
      <div className="p-4 max-w-3xl mx-auto mb-20 animate-slide-up font-cairo">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-gray-900 dark:text-white flex items-center gap-2">
            <Mic className="text-emerald-500" /> قسم المحادثة (Sprechen)
          </h2>
          <span className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300">4 / 4</span>
        </div>
        
        <div className="space-y-6">
          {exam.sprechen.map((part, idx) => (
            <div key={idx} className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
              <h3 className="font-bold text-lg mb-2 dark:text-gray-900 dark:text-white">{part.title}</h3>
              <p className="text-gray-500 mb-4">{part.description}</p>
              
              <ul className="list-disc pl-6 space-y-2 text-left" dir="ltr">
                {part.prompts.map((p, i) => (
                  <li key={i} className="text-gray-800 dark:text-gray-200 font-medium font-sans">{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => {
            // Calculate Score based on multiple choice & true-false
            let finalScore = 0;
            exam.hoeren.forEach(s => s.questions.forEach(q => {
              if (answers[q.id] === q.correctAnswer) finalScore += 5;
            }));
            exam.lesen.forEach(s => s.questions.forEach(q => {
              if (answers[q.id] === q.correctAnswer) finalScore += 5;
            }));
            setScore(finalScore);
            completeSection('result');
          }}
          className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          إنهاء الامتحان وعرض النتيجة <Award size={20} />
        </button>
      </div>
    );
  }

  if (currentSection === 'result') {
    return (
      <div className="p-4 max-w-2xl mx-auto mb-20 text-center animate-fade-in font-cairo">
        <div className="bg-white dark:bg-[#1a1a2e] p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-white/5">
          <Award size={80} className="mx-auto mb-6 text-yellow-500 animate-bounce" />
          <h2 className="text-3xl font-black mb-2 dark:text-white">انتهى الامتحان!</h2>
          <p className="text-gray-500 mb-8">عمل رائع! لقد أنهيت جميع أقسام محاكاة B1.</p>
          
          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500 mb-8">
            {score} <span className="text-2xl text-gray-400">نقطة</span>
          </div>

          <div className="text-left bg-gray-50 dark:bg-[#0f0f1a] p-6 rounded-2xl mb-8 border border-gray-200 dark:border-white/5" dir="ltr">
            <h3 className="font-bold mb-4 border-b border-gray-200 dark:border-white/10 pb-2 dark:text-white">Musterbrief (نموذج الإجابة لرسالتك):</h3>
            <pre className="font-sans whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
              {exam.schreiben.sampleAnswer}
            </pre>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-lg px-8 py-4 rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            إعادة الامتحان
          </button>
        </div>
      </div>
    );
  }

  return null;
}
