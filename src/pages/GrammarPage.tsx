import { useState, useMemo } from 'react'
import { commonMistakes, trennbareVerben } from '../data/grammar'
import { playCorrectSound, playWrongSound, playTadaSound, triggerConfetti } from '../utils/gamification'

interface LessonTopic {
  id: number
  title: string
  titleAr: string
  explanation: string
  examples: { de: string; ar: string }[]
  exercises: { question: string; options: string[]; correct: number }[]
}

import originalLessonsJson from '../data/grammarLessons.json'

const originalLessons = originalLessonsJson as LessonTopic[]

export default function GrammarPage() {
  const [activeTab, setActiveTab] = useState<'lessons' | 'mistakes' | 'verbs'>('lessons')
  
  // Lessons State
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  const [lessonAnswers, setLessonAnswers] = useState<Record<number, number>>({})
  const [showLessonResults, setShowLessonResults] = useState(false)

  // Mistakes State
  const [searchMistakeQuery, setSearchMistakeQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [revealedMistakes, setRevealedMistakes] = useState<Record<string, boolean>>({})

  // Verbs State
  const [selectedVerbType, setSelectedVerbType] = useState<'trennbar' | 'untrennbar'>('trennbar')
  const [expandedVerbs, setExpandedVerbs] = useState<Record<string, boolean>>({})

  // Get active verb list
  const activeVerbGroup = useMemo(() => {
    if (selectedVerbType === 'trennbar') {
      return trennbareVerben.find(v => v.id === 'trennbar-haeufig') || trennbareVerben[0]
    } else {
      return trennbareVerben.find(v => v.id === 'untrennbar') || trennbareVerben[1]
    }
  }, [selectedVerbType])

  // Get mistake categories for filter
  const mistakeCategories = useMemo(() => {
    const cats = new Set(commonMistakes.map(m => m.category))
    return ['all', ...Array.from(cats)]
  }, [])

  // Filter mistakes based on search and category
  const filteredMistakes = useMemo(() => {
    const q = searchMistakeQuery.toLowerCase().trim()
    return commonMistakes.filter(m => {
      const matchCat = selectedCategory === 'all' || m.category === selectedCategory
      const matchText = !q || 
        (m.titleAr && m.titleAr.toLowerCase().includes(q)) ||
        (m.wrong && m.wrong.toLowerCase().includes(q)) ||
        (m.right && m.right.toLowerCase().includes(q)) ||
        (m.ruleAr && m.ruleAr.toLowerCase().includes(q))
      return matchCat && matchText
    })
  }, [searchMistakeQuery, selectedCategory])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">📐</span>
        <div>
          <h1 className="text-2xl font-bold grad-text">القواعد والحلول — Grammatik</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">شرح تفاعلي لقواعد B1، الأخطاء اللغوية الشائعة، وقاعدة الأفعال المنفصلة.</p>
        </div>
      </div>

      {/* Main Tabs Segmented Control */}
      <div className="flex bg-gray-100 dark:bg-[#1a1a2e] p-1.5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-inner">
        <button
          onClick={() => setActiveTab('lessons')}
          className={`flex-1 text-center py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${
            activeTab === 'lessons'
              ? 'bg-[#00b894] text-white shadow-lg'
              : 'text-gray-500 dark:text-gray-400 hover:text-white'
          }`}
        >
          📖 شرح القواعد والتمارين
        </button>
        <button
          onClick={() => setActiveTab('mistakes')}
          className={`flex-1 text-center py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${
            activeTab === 'mistakes'
              ? 'bg-[#00b894] text-white shadow-lg'
              : 'text-gray-500 dark:text-gray-400 hover:text-white'
          }`}
        >
          ❌ الأخطاء الشائعة ({commonMistakes.length})
        </button>
        <button
          onClick={() => setActiveTab('verbs')}
          className={`flex-1 text-center py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${
            activeTab === 'verbs'
              ? 'bg-[#00b894] text-white shadow-lg'
              : 'text-gray-500 dark:text-gray-400 hover:text-white'
          }`}
        >
          🧩 الأفعال المركبة
        </button>
      </div>

      {/* TAB 1: LESSONS */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          {selectedLesson === null ? (
            <div className="grid gap-3">
              {originalLessons.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLesson(i)}
                  className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 text-right hover:border-[#00b894]/20 hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-md flex items-center justify-between"
                >
                  <span className="text-[#00b894] text-xs font-bold bg-[#00b894]/10 border border-[#00b894]/20 px-3 py-1.5 rounded-full">
                    شرح + اختبار 📝
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base" dir="ltr">{l.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{l.titleAr}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <button
                onClick={() => {
                  setSelectedLesson(null)
                  setLessonAnswers({})
                  setShowLessonResults(false)
                }}
                className="text-[#00b894] font-bold text-sm"
              >
                → العودة لقائمة القواعد
              </button>

              {/* Lesson Details */}
              <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 space-y-4">
                <div className="border-b border-gray-200 dark:border-white/10 pb-2">
                  <h2 className="text-lg font-bold text-[#00b894]" dir="ltr">{originalLessons[selectedLesson].title}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{originalLessons[selectedLesson].titleAr}</p>
                </div>
                <pre className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed bg-gray-100 dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-200 dark:border-white/5 font-sans">
                  {originalLessons[selectedLesson].explanation}
                </pre>
              </div>

              {/* Examples */}
              <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 space-y-3">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">💡 أمثلة توضيحية:</h3>
                <div className="grid md:grid-cols-2 gap-3" dir="ltr">
                  {originalLessons[selectedLesson].examples.map((ex, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/5 text-left">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{ex.de}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right" dir="rtl">{ex.ar}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quizzes */}
              <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">✏️ تمارّين اختبار الفهم:</h3>
                <div className="space-y-4">
                  {originalLessons[selectedLesson].exercises.map((ex, i) => (
                    <div key={i} className="border-b border-gray-200 dark:border-white/5 pb-4 last:border-b dark:border-white/10-0 last:pb-0">
                      <p className="text-sm text-gray-900 dark:text-white font-medium mb-3" dir="ltr">
                        {i + 1}. {ex.question}
                      </p>
                      <div className="flex gap-2.5">
                        {ex.options.map((opt, oi) => {
                          let cls = 'px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer '
                          if (showLessonResults) {
                            if (oi === ex.correct) cls += 'border-[#00b894] bg-[#00b894]/20 text-[#00b894]'
                            else if (lessonAnswers[i] === oi) cls += 'border-red-500 bg-red-500/20 text-red-500 shadow-inner'
                            else cls += 'border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400'
                          } else {
                            cls += lessonAnswers[i] === oi 
                              ? 'border-[#00b894] bg-[#00b894]/10 text-[#00b894]' 
                              : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:border-[#00b894]'
                          }
                          return (
                            <button
                              key={oi}
                              disabled={showLessonResults}
                              onClick={() => setLessonAnswers(p => ({ ...p, [i]: oi }))}
                              className={cls}
                              dir="ltr"
                            >
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {!showLessonResults && Object.keys(lessonAnswers).length > 0 && (
                  <button
                    onClick={() => {
                      setShowLessonResults(true)
                      const lesson = originalLessons[selectedLesson]
                      const total = lesson.exercises.length
                      let correctCount = 0
                      for (let i = 0; i < total; i++) {
                        if (lessonAnswers[i] === lesson.exercises[i].correct) correctCount++
                      }
                      if (correctCount === total && total > 0) {
                        playTadaSound()
                        triggerConfetti()
                      } else if (correctCount >= total / 2) {
                        playCorrectSound()
                      } else {
                        playWrongSound()
                      }
                    }}
                    className="mt-4 w-full bg-[#00b894] text-white hover:bg-[#00a884] py-3 rounded-xl font-bold transition-all shadow-md cursor-pointer"
                  >
                    تحقّق من الإجابات
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: COMMON MISTAKES */}
      {activeTab === 'mistakes' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 space-y-4 shadow-xl">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Category Filter */}
              <div className="space-y-1">
                <label className="text-xs text-gray-500 dark:text-gray-400 block">تصنيف الأخطاء:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white"
                >
                  <option value="all">📦 كل تصنيفات الأخطاء</option>
                  {mistakeCategories.filter(c => c !== 'all').map(cat => (
                    <option key={cat} value={cat}>
                      {cat.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Bar */}
              <div className="space-y-1">
                <label className="text-xs text-gray-500 dark:text-gray-400 block">ابحث في الأخطاء والقواعد:</label>
                <input
                  type="text"
                  value={searchMistakeQuery}
                  onChange={(e) => setSearchMistakeQuery(e.target.value)}
                  placeholder="ابحث عن كلمة، قاعدة، أو جملة..."
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white text-right"
                />
              </div>
            </div>
          </div>

          {/* Mistakes Grid */}
          <div className="space-y-4">
            {filteredMistakes.map(mistake => {
              const isRevealed = revealedMistakes[mistake.id]
              
              return (
                <div
                  key={mistake.id}
                  className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-gray-200 dark:border-white/10 transition-all shadow-md space-y-4"
                >
                  {/* Title & Level Badge */}
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-2.5">
                    <span className="text-xs bg-red-500/10 border border-red-500/20 text-red-500 px-2.5 py-1 rounded-full font-bold">
                      {mistake.level}
                    </span>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base text-right">
                      {mistake.titleAr}
                    </h3>
                  </div>

                  {/* Wrong vs Right */}
                  <div className="grid md:grid-cols-2 gap-3" dir="ltr">
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-left">
                      <span className="text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded mr-1">WRONG</span>
                      <p className="text-gray-900 dark:text-white font-medium text-sm mt-1">{mistake.wrong}</p>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-left">
                      <span className="text-[10px] bg-green-500 text-white font-bold px-1.5 py-0.5 rounded mr-1">RIGHT</span>
                      <p className="text-gray-900 dark:text-white font-medium text-sm mt-1">{mistake.right}</p>
                    </div>
                  </div>

                  {/* Collapsible details */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setRevealedMistakes(p => ({ ...p, [mistake.id]: !isRevealed }))}
                      className="w-full bg-white dark:bg-[#1a1a2e] hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-200 dark:border-white/5 py-2 rounded-xl text-xs font-bold transition-all text-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                    >
                      {isRevealed ? '🙈 إخفاء تفاصيل القاعدة' : '🔎 لماذا هذا الخطأ؟ وما هي القاعدة؟'}
                    </button>

                    {isRevealed && (
                      <div className="bg-gray-100 dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 rounded-xl p-4 text-right space-y-3.5 animate-fade-in">
                        {/* Why */}
                        <div>
                          <h4 className="text-xs font-bold text-red-500 mb-1">🤔 سبب الوقوع في هذا الخطأ:</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{mistake.whyAr}</p>
                        </div>
                        {/* Rule */}
                        <div>
                          <h4 className="text-xs font-bold text-[#00b894] mb-1">📖 القاعدة الصحيحة:</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{mistake.ruleAr}</p>
                        </div>
                        {/* Tip */}
                        {mistake.tipAr && (
                          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/20 p-3 rounded-lg">
                            <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">💡 نصيحة للحفظ والتركيز:</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{mistake.tipAr}</p>
                          </div>
                        )}
                        {/* Extra Examples */}
                        {mistake.examples && mistake.examples.length > 0 && (
                          <div className="border-t border-gray-200 dark:border-white/5 pt-3">
                            <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-2">📎 أمثلة إضافية صحيحة:</h4>
                            <div className="space-y-2" dir="ltr">
                              {mistake.examples.map((ex, idx) => (
                                <div key={idx} className="bg-gray-100 dark:bg-white/5 p-2.5 rounded-lg flex items-center justify-between gap-2 text-left">
                                  <div className="text-xs">
                                    <p className="text-red-500 line-through scale-90">{ex.wrong}</p>
                                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold">{ex.right}</p>
                                  </div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 text-right" dir="rtl">{ex.ar}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SEPARABLE VERBS */}
      {activeTab === 'verbs' && (
        <div className="space-y-6">
          {/* Verb Type Selector Switcher */}
          <div className="flex bg-gray-100 dark:bg-[#1a1a2e] p-1.5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-inner">
            <button
              onClick={() => {
                setSelectedVerbType('trennbar')
                setExpandedVerbs({})
              }}
              className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedVerbType === 'trennbar'
                  ? 'bg-[#00b894]/20 border border-[#00b894]/30 text-[#00b894] shadow-inner'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              🔄 الأفعال المنفصلة (Trennbare Verben)
            </button>
            <button
              onClick={() => {
                setSelectedVerbType('untrennbar')
                setExpandedVerbs({})
              }}
              className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedVerbType === 'untrennbar'
                  ? 'bg-[#00b894]/20 border border-[#00b894]/30 text-[#00b894] shadow-inner'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              🔒 الأفعال غير المنفصلة (Untrennbare Verben)
            </button>
          </div>

          {/* Intro description */}
          <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-4 text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {activeVerbGroup.intro}
            </p>
          </div>

          {/* Verbs List */}
          <div className="space-y-3">
            {activeVerbGroup.verbs.map((verb, idx) => {
              const key = `${selectedVerbType}-${idx}`
              const isExpanded = expandedVerbs[key]
              
              return (
                <div
                  key={key}
                  className="glass p-4 rounded-xl border border-gray-200 dark:border-white/5 hover:border-gray-200 dark:border-white/10 transition-all shadow-md"
                >
                  <div className="flex items-center justify-between gap-2 cursor-pointer" onClick={() => setExpandedVerbs(p => ({ ...p, [key]: !isExpanded }))}>
                    {/* Conjugation preview */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400" dir="ltr">
                      <span>P2: <strong className="text-gray-900 dark:text-white">{verb.partizip2}</strong></span>
                      <span className="hidden md:inline">Prät: <strong className="text-gray-900 dark:text-white">{verb.praeteritum}</strong></span>
                      <span className="bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700/30 px-2 py-0.5 rounded text-amber-700 dark:text-amber-400 font-mono text-xs font-bold scale-90">
                        {verb.hilfsverb}
                      </span>
                    </div>

                    {/* German Infinitiv & Arabic Translation */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium bg-[#00b894]/10 text-[#00b894] px-2 py-0.5 rounded border border-[#00b894]/20" dir="ltr">
                        {verb.type}
                      </span>
                      <span className="text-sm text-[#00b894] font-medium mr-2">{verb.ar}</span>
                      <h4 className="font-bold text-gray-900 dark:text-white text-base hover:text-[#00b894]" dir="ltr">
                        {verb.infinitiv}
                      </h4>
                    </div>
                  </div>

                  {/* Examples details collapsible */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/5 space-y-3 animate-fade-in text-right">
                      <h5 className="text-xs font-bold text-gray-500 dark:text-gray-400">أمثلة على الاستخدام في أزمنة مختلفة:</h5>
                      <div className="space-y-2.5" dir="ltr">
                        {verb.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="bg-gray-100 dark:bg-[#1a1a2e] p-3 rounded-xl border border-gray-200 dark:border-white/5 text-left space-y-1">
                            <span className="text-[10px] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-400 font-bold">
                              {ex.context}
                            </span>
                            <p className="text-xs text-gray-900 dark:text-white font-medium leading-relaxed">{ex.de}</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 text-right" dir="rtl">{ex.ar}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
