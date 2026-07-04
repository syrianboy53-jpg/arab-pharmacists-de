import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const verbs = [
  {
    infinitiv: 'sein', meaning: 'يكون',
    präsens: { ich: 'bin', du: 'bist', 'er/sie': 'ist', wir: 'sind', ihr: 'seid', sie: 'sind' },
    präteritum: { ich: 'war', du: 'warst', 'er/sie': 'war', wir: 'waren', ihr: 'wart', sie: 'waren' },
    perfekt: 'ist gewesen',
  },
  {
    infinitiv: 'haben', meaning: 'يملك',
    präsens: { ich: 'habe', du: 'hast', 'er/sie': 'hat', wir: 'haben', ihr: 'habt', sie: 'haben' },
    präteritum: { ich: 'hatte', du: 'hattest', 'er/sie': 'hatte', wir: 'hatten', ihr: 'hattet', sie: 'hatten' },
    perfekt: 'hat gehabt',
  },
  {
    infinitiv: 'werden', meaning: 'يصبح',
    präsens: { ich: 'werde', du: 'wirst', 'er/sie': 'wird', wir: 'werden', ihr: 'werdet', sie: 'werden' },
    präteritum: { ich: 'wurde', du: 'wurdest', 'er/sie': 'wurde', wir: 'wurden', ihr: 'wurdet', sie: 'wurden' },
    perfekt: 'ist geworden',
  },
  {
    infinitiv: 'gehen', meaning: 'يذهب',
    präsens: { ich: 'gehe', du: 'gehst', 'er/sie': 'geht', wir: 'gehen', ihr: 'geht', sie: 'gehen' },
    präteritum: { ich: 'ging', du: 'gingst', 'er/sie': 'ging', wir: 'gingen', ihr: 'gingt', sie: 'gingen' },
    perfekt: 'ist gegangen',
  },
  {
    infinitiv: 'kommen', meaning: 'يأتي',
    präsens: { ich: 'komme', du: 'kommst', 'er/sie': 'kommt', wir: 'kommen', ihr: 'kommt', sie: 'kommen' },
    präteritum: { ich: 'kam', du: 'kamst', 'er/sie': 'kam', wir: 'kamen', ihr: 'kamt', sie: 'kamen' },
    perfekt: 'ist gekommen',
  },
  {
    infinitiv: 'machen', meaning: 'يفعل/يصنع',
    präsens: { ich: 'mache', du: 'machst', 'er/sie': 'macht', wir: 'machen', ihr: 'macht', sie: 'machen' },
    präteritum: { ich: 'machte', du: 'machtest', 'er/sie': 'machte', wir: 'machten', ihr: 'machtet', sie: 'machten' },
    perfekt: 'hat gemacht',
  },
  {
    infinitiv: 'können', meaning: 'يستطيع',
    präsens: { ich: 'kann', du: 'kannst', 'er/sie': 'kann', wir: 'können', ihr: 'könnt', sie: 'können' },
    präteritum: { ich: 'konnte', du: 'konntest', 'er/sie': 'konnte', wir: 'konnten', ihr: 'konntet', sie: 'konnten' },
    perfekt: 'hat gekonnt',
  },
  {
    infinitiv: 'müssen', meaning: 'يجب',
    präsens: { ich: 'muss', du: 'musst', 'er/sie': 'muss', wir: 'müssen', ihr: 'müsst', sie: 'müssen' },
    präteritum: { ich: 'musste', du: 'musstest', 'er/sie': 'musste', wir: 'mussten', ihr: 'musstet', sie: 'mussten' },
    perfekt: 'hat gemusst',
  },
  {
    infinitiv: 'wollen', meaning: 'يريد',
    präsens: { ich: 'will', du: 'willst', 'er/sie': 'will', wir: 'wollen', ihr: 'wollt', sie: 'wollen' },
    präteritum: { ich: 'wollte', du: 'wolltest', 'er/sie': 'wollte', wir: 'wollten', ihr: 'wolltet', sie: 'wollten' },
    perfekt: 'hat gewollt',
  },
  {
    infinitiv: 'sollen', meaning: 'ينبغي',
    präsens: { ich: 'soll', du: 'sollst', 'er/sie': 'soll', wir: 'sollen', ihr: 'sollt', sie: 'sollen' },
    präteritum: { ich: 'sollte', du: 'solltest', 'er/sie': 'sollte', wir: 'sollten', ihr: 'solltet', sie: 'sollten' },
    perfekt: 'hat gesollt',
  },
  {
    infinitiv: 'sprechen', meaning: 'يتكلم',
    präsens: { ich: 'spreche', du: 'sprichst', 'er/sie': 'spricht', wir: 'sprechen', ihr: 'sprecht', sie: 'sprechen' },
    präteritum: { ich: 'sprach', du: 'sprachst', 'er/sie': 'sprach', wir: 'sprachen', ihr: 'spracht', sie: 'sprachen' },
    perfekt: 'hat gesprochen',
  },
  {
    infinitiv: 'fahren', meaning: 'يسافر/يقود',
    präsens: { ich: 'fahre', du: 'fährst', 'er/sie': 'fährt', wir: 'fahren', ihr: 'fahrt', sie: 'fahren' },
    präteritum: { ich: 'fuhr', du: 'fuhrst', 'er/sie': 'fuhr', wir: 'fuhren', ihr: 'fuhrt', sie: 'fuhren' },
    perfekt: 'ist gefahren',
  },
  {
    infinitiv: 'essen', meaning: 'يأكل',
    präsens: { ich: 'esse', du: 'isst', 'er/sie': 'isst', wir: 'essen', ihr: 'esst', sie: 'essen' },
    präteritum: { ich: 'aß', du: 'aßt', 'er/sie': 'aß', wir: 'aßen', ihr: 'aßt', sie: 'aßen' },
    perfekt: 'hat gegessen',
  },
  {
    infinitiv: 'lesen', meaning: 'يقرأ',
    präsens: { ich: 'lese', du: 'liest', 'er/sie': 'liest', wir: 'lesen', ihr: 'lest', sie: 'lesen' },
    präteritum: { ich: 'las', du: 'last', 'er/sie': 'las', wir: 'lasen', ihr: 'last', sie: 'lasen' },
    perfekt: 'hat gelesen',
  },
  {
    infinitiv: 'schreiben', meaning: 'يكتب',
    präsens: { ich: 'schreibe', du: 'schreibst', 'er/sie': 'schreibt', wir: 'schreiben', ihr: 'schreibt', sie: 'schreiben' },
    präteritum: { ich: 'schrieb', du: 'schriebst', 'er/sie': 'schrieb', wir: 'schrieben', ihr: 'schriebt', sie: 'schrieben' },
    perfekt: 'hat geschrieben',
  },
  {
    infinitiv: 'nehmen', meaning: 'يأخذ',
    präsens: { ich: 'nehme', du: 'nimmst', 'er/sie': 'nimmt', wir: 'nehmen', ihr: 'nehmt', sie: 'nehmen' },
    präteritum: { ich: 'nahm', du: 'nahmst', 'er/sie': 'nahm', wir: 'nahmen', ihr: 'nahmt', sie: 'nahmen' },
    perfekt: 'hat genommen',
  },
  {
    infinitiv: 'geben', meaning: 'يعطي',
    präsens: { ich: 'gebe', du: 'gibst', 'er/sie': 'gibt', wir: 'geben', ihr: 'gebt', sie: 'geben' },
    präteritum: { ich: 'gab', du: 'gabst', 'er/sie': 'gab', wir: 'gaben', ihr: 'gabt', sie: 'gaben' },
    perfekt: 'hat gegeben',
  },
  {
    infinitiv: 'wissen', meaning: 'يعرف (معلومة)',
    präsens: { ich: 'weiß', du: 'weißt', 'er/sie': 'weiß', wir: 'wissen', ihr: 'wisst', sie: 'wissen' },
    präteritum: { ich: 'wusste', du: 'wusstest', 'er/sie': 'wusste', wir: 'wussten', ihr: 'wusstet', sie: 'wussten' },
    perfekt: 'hat gewusst',
  },
]

const pronouns = ['ich', 'du', 'er/sie', 'wir', 'ihr', 'sie'] as const
type Pronoun = typeof pronouns[number]

export default function VerbTrainerPage() {
  const [mode, setMode] = useState<'browse' | 'drill'>('browse')
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null)
  const [drillVerb, setDrillVerb] = useState(0)
  const [drillPronoun, setDrillPronoun] = useState<Pronoun>('ich')
  const [drillTense, setDrillTense] = useState<'präsens' | 'präteritum'>('präsens')
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const nextDrill = useCallback(() => {
    setDrillVerb(Math.floor(Math.random() * verbs.length))
    setDrillPronoun(pronouns[Math.floor(Math.random() * pronouns.length)])
    setDrillTense(Math.random() > 0.5 ? 'präsens' : 'präteritum')
    setUserAnswer('')
    setFeedback(null)
  }, [])

  useEffect(() => { nextDrill() }, [nextDrill])

  const checkAnswer = () => {
    const verb = verbs[drillVerb]
    const correct = verb[drillTense][drillPronoun]
    if (userAnswer.trim().toLowerCase() === correct.toLowerCase()) {
      setFeedback('correct')
      setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }))
    } else {
      setFeedback('wrong')
      setScore(s => ({ ...s, total: s.total + 1 }))
    }
  }

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'de-DE'; u.rate = 0.8
      window.speechSynthesis.speak(u)
    }
  }

  const current = selectedVerb ? verbs.find(v => v.infinitiv === selectedVerb) : null

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
        <span>›</span>
        <span className="text-[#00b894] font-bold">مدرب تصريف الأفعال</span>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] p-8 text-center" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #1e3a5f 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,184,148,0.5), transparent 70%)' }} />
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white mb-2">🔄 مدرب تصريف الأفعال</h1>
          <p className="text-sm text-white/60">{verbs.length} فعل شائع — Präsens + Präteritum + Perfekt</p>
          <div className="flex gap-2 justify-center mt-4">
            <button onClick={() => { setMode('browse'); setSelectedVerb(null) }} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${mode === 'browse' ? 'bg-white text-blue-700' : 'bg-white/10 text-white/60'}`}>📖 تصفح</button>
            <button onClick={() => { setMode('drill'); nextDrill(); setScore({ correct: 0, total: 0 }) }} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${mode === 'drill' ? 'bg-white text-blue-700' : 'bg-white/10 text-white/60'}`}>⚡ تدريب سريع</button>
          </div>
        </div>
      </div>

      {mode === 'browse' && !current && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {verbs.map(v => (
            <button key={v.infinitiv} onClick={() => setSelectedVerb(v.infinitiv)} className="glass p-4 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-[#00b894]/30 transition-all text-center cursor-pointer group hover:-translate-y-0.5">
              <p className="text-lg font-black text-gray-900 dark:text-white font-sans group-hover:text-[#00b894] transition-colors" dir="ltr">{v.infinitiv}</p>
              <p className="text-xs text-gray-500">{v.meaning}</p>
              <p className="text-[10px] text-gray-400 font-sans mt-1" dir="ltr">{v.perfekt}</p>
            </button>
          ))}
        </div>
      )}

      {mode === 'browse' && current && (
        <div className="space-y-4">
          <button onClick={() => setSelectedVerb(null)} className="text-xs text-gray-500 hover:text-[#00b894] transition-colors">← العودة للقائمة</button>
          <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white font-sans" dir="ltr">{current.infinitiv}</h2>
              <button onClick={() => speak(current.infinitiv)} className="text-gray-400 hover:text-[#00b894]">🔊</button>
              <span className="text-sm text-gray-500">{current.meaning}</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold font-sans ml-auto" dir="ltr">Perfekt: {current.perfekt}</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {(['präsens', 'präteritum'] as const).map(tense => (
                <div key={tense} className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10">
                  <h3 className="text-xs font-bold text-[#00b894] mb-3 font-sans" dir="ltr">{tense === 'präsens' ? 'Präsens (المضارع)' : 'Präteritum (الماضي البسيط)'}</h3>
                  <div className="space-y-1.5">
                    {pronouns.map(p => (
                      <div key={p} className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-sans text-xs" dir="ltr">{p}</span>
                        <span className="font-bold text-gray-900 dark:text-white font-sans" dir="ltr">{current[tense][p]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === 'drill' && (
        <div className="max-w-md mx-auto space-y-4">
          <div className="glass p-3 rounded-xl border border-gray-200 dark:border-white/5 flex items-center justify-between text-sm">
            <span>✅ {score.correct} / {score.total}</span>
            <span className={`font-bold ${score.total > 0 && score.correct / score.total >= 0.7 ? 'text-emerald-500' : 'text-amber-500'}`}>
              {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
            </span>
          </div>

          <div className="glass p-8 rounded-[2rem] border border-gray-200 dark:border-white/5 text-center space-y-5">
            <div>
              <p className="text-xs text-gray-400 mb-2">صرّف الفعل التالي:</p>
              <p className="text-3xl font-black text-gray-900 dark:text-white font-sans" dir="ltr">{verbs[drillVerb].infinitiv}</p>
              <p className="text-xs text-gray-500">{verbs[drillVerb].meaning}</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold font-sans" dir="ltr">{drillPronoun}</span>
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold">{drillTense === 'präsens' ? 'المضارع' : 'الماضي'}</span>
            </div>

            {!feedback ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && userAnswer.trim() && checkAnswer()}
                  placeholder="اكتب التصريف..."
                  className="w-full text-center bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-2xl px-5 py-3 text-lg font-sans focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white"
                  dir="ltr" autoFocus
                />
                <button onClick={checkAnswer} disabled={!userAnswer.trim()} className="w-full bg-[#00b894] text-white font-bold py-3 rounded-2xl hover:bg-[#00a884] transition-all disabled:opacity-40 cursor-pointer shadow-lg shadow-[#00b894]/20">
                  تحقّق ✓
                </button>
              </div>
            ) : (
              <div className="space-y-3 animate-slideDown">
                <div className={`p-4 rounded-xl border-2 ${feedback === 'correct' ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-300 dark:border-emerald-700' : 'bg-red-50 dark:bg-red-900/10 border-red-300 dark:border-red-700'}`}>
                  <p className={`text-lg font-bold ${feedback === 'correct' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {feedback === 'correct' ? '✅ صحيح!' : '❌ خطأ'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1" dir="ltr">
                    {drillPronoun} → <strong>{verbs[drillVerb][drillTense][drillPronoun]}</strong>
                  </p>
                </div>
                <button onClick={nextDrill} className="w-full bg-[#00b894] text-white font-bold py-3 rounded-2xl cursor-pointer hover:bg-[#00a884] transition-all shadow-lg">
                  التالي ←
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
