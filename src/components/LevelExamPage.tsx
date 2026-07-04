import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Option {
  id: string
  de: string
}

interface Question {
  id: string
  promptDe: string
  options: Option[]
  correct: string
  explanationAr: string
}

interface ReadingPassage {
  id: string
  titleDe: string
  textDe: string
  questions: Question[]
}

interface Sprachbaustein {
  id: string
  contextDe: string
  options: Option[]
  correct: string
  explanationAr: string
  blank?: string
}

interface SchreibenPart {
  id: string
  titleDe: string
  promptDe: string
  promptAr: string
  redemittel: string[]
  sampleDe: string
  sampleAr: string
}

interface SprechenPart {
  id: string
  titleDe: string
  promptDe: string
  promptAr: string
  redemittel: string[]
  sampleDe: string
  sampleAr: string
}

export interface ExamModel {
  id: string
  titleAr: string
  titleDe: string
  level: string
  durationMin: number
  readingPassages: ReadingPassage[]
  sprachbausteine: Sprachbaustein[]
  schreibenParts: SchreibenPart[]
  sprechenParts: SprechenPart[]
}

interface LevelExamPageProps {
  models: ExamModel[]
  level: string
  emoji: string
  accentColor: string
  accentBg: string
  accentBorder: string
  subtitle: string
}

export default function LevelExamPage({
  models,
  level,
  emoji,
  accentColor,
  accentBg,
  accentBorder,
  subtitle,
}: LevelExamPageProps) {
  const [selectedModelId, setSelectedModelId] = useState<string>(models[0]?.id || '')
  const [activeTab, setActiveTab] = useState<'lesen' | 'sprachbausteine' | 'schreiben' | 'sprechen'>('lesen')

  // Quiz states
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [selectedSbAnswers, setSelectedSbAnswers] = useState<Record<string, string>>({})
  const [writingInputs, setWritingInputs] = useState<Record<string, string>>({})
  const [showModelAnswers, setShowModelAnswers] = useState<Record<string, boolean>>({})
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({})
  const [showSprechenAnswers, setShowSprechenAnswers] = useState<Record<string, boolean>>({})

  const currentModel = models.find(m => m.id === selectedModelId)

  if (!currentModel) {
    return (
      <div className="glass p-10 text-center rounded-2xl border border-gray-200 dark:border-white/5">
        <p className="text-gray-500 dark:text-gray-400 text-sm">لا توجد نماذج {level} متاحة حالياً.</p>
      </div>
    )
  }

  // Text-To-Speech
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'de-DE'
      utterance.rate = 0.85
      window.speechSynthesis.speak(utterance)
    }
  }

  // Word count
  const getWordCount = (text: string) => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  }

  const handleModelChange = (id: string) => {
    setSelectedModelId(id)
    setSelectedAnswers({})
    setSelectedSbAnswers({})
    setWritingInputs({})
    setShowModelAnswers({})
    setShowExplanation({})
    setShowSprechenAnswers({})
  }

  // Count answered questions
  const totalLesenQ = currentModel.readingPassages.reduce((sum, p) => sum + p.questions.length, 0)
  const answeredLesen = Object.keys(selectedAnswers).length
  const correctLesen = Object.entries(selectedAnswers).filter(([qId, ans]) => {
    for (const p of currentModel.readingPassages) {
      const q = p.questions.find(qq => qq.id === qId)
      if (q) return q.correct === ans
    }
    return false
  }).length

  const totalSb = currentModel.sprachbausteine.length
  const answeredSb = Object.keys(selectedSbAnswers).length
  const correctSb = Object.entries(selectedSbAnswers).filter(([sbId, ans]) => {
    const sb = currentModel.sprachbausteine.find(s => s.id === sbId)
    return sb?.correct === ans
  }).length

  const tabs = [
    { id: 'lesen' as const, label: '📖 القراءة', badge: `${answeredLesen}/${totalLesenQ}` },
    { id: 'sprachbausteine' as const, label: '🧩 القواعد', badge: `${answeredSb}/${totalSb}` },
    { id: 'schreiben' as const, label: '✍️ الكتابة', badge: `${currentModel.schreibenParts.length}` },
    { id: 'sprechen' as const, label: '🗣️ المحادثة', badge: `${currentModel.sprechenParts.length}` },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
        <span>›</span>
        <Link to={`/${level.toLowerCase()}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">مستوى {level}</Link>
        <span>›</span>
        <span className={accentColor}>امتحان تفاعلي</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{emoji}</span>
          <div>
            <h1 className="font-bold text-2xl grad-text">
              امتحان {level} التفاعلي — {subtitle}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              نموذج تدريبي كامل مع شروحات عربية وإجابات نموذجية
            </p>
          </div>
        </div>

        {/* Model Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">النموذج:</label>
          <select
            value={selectedModelId}
            onChange={(e) => handleModelChange(e.target.value)}
            className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white"
          >
            {models.map(model => (
              <option key={model.id} value={model.id}>
                {model.titleAr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Score Overview */}
      {(answeredLesen > 0 || answeredSb > 0) && (
        <div className={`${accentBg} border ${accentBorder} rounded-2xl p-4 flex flex-wrap gap-6 items-center`}>
          <div className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">نتائجك الحالية:</span>
          </div>
          {answeredLesen > 0 && (
            <div className="text-xs">
              <span className="text-gray-500 dark:text-gray-400">القراءة: </span>
              <span className={`font-bold ${correctLesen / answeredLesen >= 0.7 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {correctLesen}/{answeredLesen} صحيح ({Math.round(correctLesen / answeredLesen * 100)}%)
              </span>
            </div>
          )}
          {answeredSb > 0 && (
            <div className="text-xs">
              <span className="text-gray-500 dark:text-gray-400">القواعد: </span>
              <span className={`font-bold ${correctSb / answeredSb >= 0.7 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {correctSb}/{answeredSb} صحيح ({Math.round(correctSb / answeredSb * 100)}%)
              </span>
            </div>
          )}
        </div>
      )}

      {/* Model Info + Tabs */}
      <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 flex justify-between items-center flex-wrap gap-4 shadow-xl">
        <div>
          <h2 className={`text-lg font-bold ${accentColor} flex items-center gap-2`}>
            <span dir="ltr">{currentModel.titleDe}</span>
            <span className={`text-xs ${accentBg} border ${accentBorder} ${accentColor} px-2.5 py-0.5 rounded-full font-normal`}>
              {currentModel.level}
            </span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            المدة: <span className="text-amber-600 dark:text-amber-400 font-medium">{currentModel.durationMin} دقيقة</span>
            {' · '}القراءة: {totalLesenQ} سؤال
            {' · '}القواعد: {totalSb} سؤال
          </p>
        </div>
        <div className="flex gap-1.5 overflow-x-auto nav-scroll">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#00b894] text-white shadow-lg'
                  : 'bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10'
              }`}
            >
              {tab.label}
              <span className={`mr-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100 dark:bg-white/5'
              }`}>{tab.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">

        {/* 1. LESEN TAB */}
        {activeTab === 'lesen' && (
          <div className="space-y-8 animate-fadeIn">
            {currentModel.readingPassages.map((passage, pIdx) => (
              <div key={passage.id} className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/5 space-y-6 shadow-md">
                <div className="border-b border-gray-200 dark:border-white/5 pb-3">
                  <span className={`text-xs ${accentColor} font-bold uppercase tracking-wider`}>Passage {pIdx + 1}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5" dir="ltr">{passage.titleDe}</h3>
                </div>

                {/* German Text */}
                <div
                  className="bg-gray-100 dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 p-5 rounded-xl text-sm leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-wrap select-text text-left font-sans"
                  dir="ltr"
                >
                  {passage.textDe}
                </div>

                {/* TTS button */}
                <button
                  onClick={() => speak(passage.textDe)}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#00b894] flex items-center gap-1.5 transition-colors"
                >
                  🔊 استمع للنص
                </button>

                {/* Questions */}
                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400">الأسئلة:</h4>
                  {passage.questions.map((q, qIdx) => {
                    const selectedOpt = selectedAnswers[q.id]
                    const showEx = showExplanation[q.id]
                    return (
                      <div key={q.id} className="border-t border-gray-200 dark:border-white/5 pt-4 space-y-3">
                        <div className="flex gap-2.5 items-start">
                          <span className="bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs mt-0.5 font-bold">
                            {qIdx + 1}
                          </span>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white text-left font-sans" dir="ltr">{q.promptDe}</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-2 mr-8">
                          {q.options.map(opt => {
                            const isSelected = selectedOpt === opt.id
                            const isCorrect = opt.id === q.correct
                            let optStyle = 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10'
                            if (selectedOpt) {
                              if (isCorrect) optStyle = 'bg-[#00b894]/10 border-[#00b894]/40 text-[#00b894] font-medium'
                              else if (isSelected) optStyle = 'bg-red-500/10 border-red-500/40 text-red-500 font-medium'
                              else optStyle = 'bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 opacity-60'
                            }
                            return (
                              <button
                                key={opt.id}
                                disabled={!!selectedOpt}
                                onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                                className={`w-full text-left font-sans px-4 py-2.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${optStyle}`}
                                dir="ltr"
                              >
                                <span><span className="font-bold mr-1.5 uppercase">{opt.id})</span> {opt.de}</span>
                                {selectedOpt && isCorrect && <span className="text-[#00b894] text-sm">✓</span>}
                                {selectedOpt && isSelected && !isCorrect && <span className="text-red-500 text-sm">✗</span>}
                              </button>
                            )
                          })}
                        </div>

                        {selectedOpt && (
                          <div className="mr-8 space-y-2">
                            <button
                              onClick={() => setShowExplanation(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
                            >
                              {showEx ? '🙈 إخفاء الشرح' : '💡 عرض الشرح بالعربية'}
                            </button>
                            {showEx && (
                              <div className="bg-amber-100 dark:bg-amber-900/5 border border-amber-200 dark:border-amber-700/20 p-3.5 rounded-xl text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                {q.explanationAr}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. SPRACHBAUSTEINE TAB */}
        {activeTab === 'sprachbausteine' && (
          <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/5 space-y-6 shadow-md animate-fadeIn">
            <div className="border-b border-gray-200 dark:border-white/5 pb-3">
              <span className={`text-xs ${accentColor} font-bold uppercase tracking-wider`}>Grammatik & Wortschatz</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">عناصر اللغة — أكمل الفراغات</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">اختر الإجابة الصحيحة لكل فراغ في الجمل التالية</p>
            </div>

            <div className="space-y-6">
              {currentModel.sprachbausteine.map((sb, sbIdx) => {
                const selectedOpt = selectedSbAnswers[sb.id]
                const showEx = showExplanation[sb.id]
                return (
                  <div key={sb.id} className="border-b border-gray-200 dark:border-white/5 pb-5 last:border-0 last:pb-0 space-y-3">
                    <div className="flex gap-3 items-start">
                      <span className={`${accentBg} border ${accentBorder} ${accentColor} w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-sans`}>
                        {sbIdx + 1}
                      </span>
                      <div className="text-left font-sans text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-0.5" dir="ltr">
                        {sb.contextDe.split('___')[0]}
                        <span className="bg-amber-100 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded mx-1.5 font-bold">
                          ({sbIdx + 1})
                        </span>
                        {sb.contextDe.split('___')[1]}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mr-10 pt-1">
                      {sb.options.map(opt => {
                        const isSelected = selectedOpt === opt.id
                        const isCorrect = opt.id === sb.correct
                        let optStyle = 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10'
                        if (selectedOpt) {
                          if (isCorrect) optStyle = 'bg-[#00b894]/10 border-[#00b894]/40 text-[#00b894] font-medium'
                          else if (isSelected) optStyle = 'bg-red-500/10 border-red-500/40 text-red-500 font-medium'
                          else optStyle = 'bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 opacity-60'
                        }
                        return (
                          <button
                            key={opt.id}
                            disabled={!!selectedOpt}
                            onClick={() => setSelectedSbAnswers(prev => ({ ...prev, [sb.id]: opt.id }))}
                            className={`px-3 py-2 text-center rounded-xl border text-xs font-sans transition-all cursor-pointer ${optStyle}`}
                            dir="ltr"
                          >
                            <span className="font-semibold uppercase mr-1">{opt.id})</span> {opt.de}
                          </button>
                        )
                      })}
                    </div>

                    {selectedOpt && (
                      <div className="mr-10 space-y-2 pt-1">
                        <button
                          onClick={() => setShowExplanation(prev => ({ ...prev, [sb.id]: !prev[sb.id] }))}
                          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
                        >
                          {showEx ? '🙈 إخفاء التحليل' : '💡 عرض التحليل النحوي'}
                        </button>
                        {showEx && (
                          <div className="bg-amber-100 dark:bg-amber-900/5 border border-amber-200 dark:border-amber-700/20 p-3.5 rounded-xl text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            {sb.explanationAr}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 3. SCHREIBEN TAB */}
        {activeTab === 'schreiben' && (
          <div className="space-y-8 animate-fadeIn">
            {currentModel.schreibenParts.map((part, idx) => {
              const writingKey = `${currentModel.id}-${part.id}`
              const writingInput = writingInputs[writingKey] || ''
              const showModel = showModelAnswers[writingKey] || false
              return (
                <div key={part.id} className="space-y-4">
                  <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-md">
                    <div className="border-b border-gray-200 dark:border-white/5 pb-3 mb-4">
                      <span className={`text-xs ${accentColor} font-bold uppercase tracking-wider`}>Aufgabe {idx + 1}</span>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mt-0.5">{part.promptAr}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-1 text-left" dir="ltr">{part.promptDe}</p>
                    </div>

                    {/* Redemittel */}
                    <div className="mb-4 space-y-2">
                      <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400">عبارات مفيدة (Redemittel):</h4>
                      <div className="grid sm:grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1 nav-scroll">
                        {part.redemittel.map((phrase, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => {
                              navigator.clipboard.writeText(phrase)
                              setWritingInputs(prev => ({ ...prev, [writingKey]: (prev[writingKey] || '') + ' ' + phrase }))
                            }}
                            className="text-left font-sans text-xs bg-white dark:bg-[#1a1a2e] hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10 px-3 py-2 rounded-xl text-gray-600 dark:text-gray-400 truncate transition-all flex items-center justify-between gap-1 group cursor-pointer"
                            dir="ltr"
                            title="انقر لإضافة العبارة"
                          >
                            <span className="truncate group-hover:text-[#00b894] transition-colors">{phrase}</span>
                            <span className="text-[10px] shrink-0">➕</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Writing Pad */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">لوحة الكتابة</h4>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                          getWordCount(writingInput) >= 80
                            ? 'bg-[#00b894]/10 text-[#00b894] border border-[#00b894]/20'
                            : 'bg-amber-100 dark:bg-amber-900/10 text-amber-600 border border-amber-200 dark:border-amber-700/20'
                        }`}>
                          الكلمات: {getWordCount(writingInput)}
                        </span>
                      </div>
                      <textarea
                        value={writingInput}
                        onChange={(e) => setWritingInputs(prev => ({ ...prev, [writingKey]: e.target.value }))}
                        placeholder="اكتب إجابتك هنا باللغة الألمانية..."
                        className="w-full h-48 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white text-left font-sans"
                        dir="ltr"
                      />

                      <button
                        onClick={() => setShowModelAnswers(prev => ({ ...prev, [writingKey]: !prev[writingKey] }))}
                        className="bg-amber-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-amber-400 transition-all cursor-pointer"
                      >
                        {showModel ? '🙈 إخفاء النموذج' : '🔑 عرض الإجابة النموذجية'}
                      </button>
                    </div>
                  </div>

                  {/* Model Answer */}
                  {showModel && (
                    <div className="grid sm:grid-cols-2 gap-4 animate-slideDown">
                      <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 space-y-3">
                        <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/5 pb-2">
                          <span className={`text-xs ${accentColor} font-bold`}>Modellantwort (DE)</span>
                          <button
                            onClick={() => speak(part.sampleDe)}
                            className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#00b894] flex items-center gap-1"
                          >
                            🔊 استمع
                          </button>
                        </div>
                        <div className="text-xs font-sans text-left leading-relaxed text-gray-900 dark:text-white whitespace-pre-wrap select-text" dir="ltr">
                          {part.sampleDe}
                        </div>
                      </div>
                      <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 space-y-3">
                        <div className="border-b border-gray-200 dark:border-white/5 pb-2">
                          <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">الترجمة العربية</span>
                        </div>
                        <div className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-wrap select-text">
                          {part.sampleAr}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* 4. SPRECHEN TAB */}
        {activeTab === 'sprechen' && (
          <div className="space-y-6 animate-fadeIn">
            {currentModel.sprechenParts.map((part, idx) => {
              const showAns = showSprechenAnswers[part.id] || false
              return (
                <div key={part.id} className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/5 space-y-4 shadow-md">
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-3">
                    <div>
                      <span className={`text-xs ${accentColor} font-bold uppercase tracking-wider`}>Teil {idx + 1}</span>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mt-0.5">{part.promptAr}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-0.5 text-left" dir="ltr">{part.titleDe}</p>
                    </div>
                    <button
                      onClick={() => speak(part.sampleDe)}
                      className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-[#00b894] hover:bg-[#00b894]/10 hover:border-[#00b894]/20 px-3.5 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      🔊 استمع
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    {/* Topic + Redemittel */}
                    <div className="md:col-span-1 space-y-3">
                      <div className="bg-gray-100 dark:bg-[#1a1a2e] p-4 border border-gray-200 dark:border-white/5 rounded-xl space-y-2">
                        <p className="text-xs font-bold text-amber-600 dark:text-amber-400">المطلوب:</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-sans text-left" dir="ltr">{part.promptDe}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-bold text-amber-600 dark:text-amber-400">تراكيب مفيدة:</p>
                        <div className="grid gap-1">
                          {part.redemittel.map((ph, pIdx) => (
                            <div
                              key={pIdx}
                              onClick={() => navigator.clipboard.writeText(ph)}
                              className="font-sans text-xs bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-[#00b894] transition-all cursor-pointer truncate text-left"
                              dir="ltr"
                              title="انقر للنسخ"
                            >
                              {ph}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sample Answer */}
                    <div className="md:col-span-2 space-y-3">
                      <button
                        onClick={() => setShowSprechenAnswers(prev => ({ ...prev, [part.id]: !prev[part.id] }))}
                        className={`w-full py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          showAns
                            ? 'bg-gray-100 dark:bg-white/5 text-gray-500'
                            : `${accentBg} border ${accentBorder} ${accentColor}`
                        }`}
                      >
                        {showAns ? '🙈 إخفاء الإجابة النموذجية' : '🔑 عرض الإجابة النموذجية'}
                      </button>

                      {showAns && (
                        <div className="space-y-3 animate-slideDown">
                          <div className="bg-gray-50 dark:bg-white/5 p-4 border border-gray-200 dark:border-white/5 rounded-xl space-y-2">
                            <p className={`text-xs font-bold ${accentColor}`}>Modellantwort:</p>
                            <p className="text-xs font-sans text-left leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-wrap select-text" dir="ltr">
                              {part.sampleDe}
                            </p>
                          </div>
                          <div className="bg-amber-50 dark:bg-amber-900/5 p-4 border border-amber-200 dark:border-amber-700/20 rounded-xl space-y-2">
                            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">الترجمة العربية:</p>
                            <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-wrap select-text">
                              {part.sampleAr}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}
