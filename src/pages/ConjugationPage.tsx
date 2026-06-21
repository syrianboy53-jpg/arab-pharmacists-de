import { useState, useMemo } from 'react'
import { verbsData } from '../data/conjugation'
import type { ConjugationTense } from '../data/conjugation'

export default function ConjugationPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVerbId, setSelectedVerbId] = useState<string>(verbsData[0].id)
  const [mode, setMode] = useState<'study'|'quiz'>('study')
  
  // Quiz states
  const [quizTense, setQuizTense] = useState<'praesens'|'praeteritum'|'perfekt'>('praesens')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  // Filter verbs based on category and search
  const filteredVerbs = useMemo(() => {
    return verbsData.filter(v => {
      const matchesCat = activeCategory === 'all' || v.type === activeCategory
      const matchesSearch = v.infinitive.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            v.meaningAr.includes(searchQuery)
      return matchesCat && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Get current verb
  const activeVerb = useMemo(() => {
    return verbsData.find(v => v.id === selectedVerbId) || verbsData[0]
  }, [selectedVerbId])

  const pronouns = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie']

  const handleQuizSubmit = () => {
    setShowResults(true)
  }

  const handleVerbSelect = (id: string) => {
    setSelectedVerbId(id)
    setAnswers({})
    setShowResults(false)
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'hilfsverb': return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/30'
      case 'modalverb': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30'
      case 'regelmäßig': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30'
      case 'unregelmäßig': return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/30'
      case 'trennbar': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-gray-200'
    }
  }

  const getPronounValue = (tenseObj: ConjugationTense, pronoun: string) => {
    return tenseObj[pronoun as keyof ConjugationTense]
  }

  const getPerfektValue = (pronoun: string) => {
    const hilfsverbObj = verbsData.find(v => v.id === activeVerb.perfektHilfsverb)?.praesens
    if (!hilfsverbObj) return ''
    const hilfs = getPronounValue(hilfsverbObj, pronoun)
    return `${hilfs} ... ${activeVerb.partizip2}`
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-2 grad-text">🔁 مصّرف الأفعال</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تدرّب على أهم الأفعال في المضارع، الماضي البسيط، والماضي التام.</p>
        </div>
        
        {/* Mode Toggle */}
        <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 w-fit">
          <button 
            onClick={() => setMode('study')} 
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'study' ? 'bg-white dark:bg-[#2d3436] text-[#00b894] shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
          >
            📖 دراسة
          </button>
          <button 
            onClick={() => { setMode('quiz'); setAnswers({}); setShowResults(false) }} 
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'quiz' ? 'bg-white dark:bg-[#2d3436] text-[#0984e3] shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
          >
            🧠 اختبار
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar - Verb List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass p-4 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl space-y-4">
            {/* Search */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="ابحث عن فعل..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white"
                dir="auto"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'hilfsverb', label: 'مساعدة' },
                { id: 'modalverb', label: 'ناقصة' },
                { id: 'regelmäßig', label: 'نظامية' },
                { id: 'unregelmäßig', label: 'شاذة' },
                { id: 'trennbar', label: 'منفصلة' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border ${
                    activeCategory === cat.id 
                      ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white' 
                      : 'bg-gray-50 dark:bg-white/5 text-gray-500 border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Verb List */}
            <div className="max-h-[500px] overflow-y-auto pr-1 space-y-1 custom-scrollbar">
              {filteredVerbs.length === 0 ? (
                <p className="text-center text-sm text-gray-500 py-4">لم يتم العثور على أفعال.</p>
              ) : (
                filteredVerbs.map(v => (
                  <button
                    key={v.id}
                    onClick={() => handleVerbSelect(v.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all border flex items-center justify-between ${
                      selectedVerbId === v.id
                        ? 'bg-[#00b894]/10 border-[#00b894]/30 shadow-inner'
                        : 'bg-white dark:bg-[#1a1a2e] border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className={`font-bold text-sm ${selectedVerbId === v.id ? 'text-[#00b894]' : 'text-gray-900 dark:text-white'}`} dir="ltr">{v.infinitive}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{v.meaningAr}</div>
                    </div>
                    <div className="text-[10px] text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-md">
                      {v.type.substring(0, 3)}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Content - Study / Quiz Area */}
        <div className="lg:col-span-8">
          <div className="glass p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-2xl relative overflow-hidden">
            
            {/* Verb Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-gray-200 dark:border-white/10 pb-6">
              <div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-3 ${getTypeColor(activeVerb.type)}`}>
                  {activeVerb.type}
                </div>
                <h2 className="text-4xl font-black text-gray-900 dark:text-white" dir="ltr">{activeVerb.infinitive}</h2>
                <p className="text-xl text-gray-500 dark:text-gray-400 mt-1">{activeVerb.meaningAr}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-xl p-3 sm:text-right">
                <div className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-1">Partizip II</div>
                <div className="text-sm font-bold text-blue-700 dark:text-blue-300" dir="ltr">
                  ({activeVerb.perfektHilfsverb}) {activeVerb.partizip2}
                </div>
              </div>
            </div>

            {/* Example sentence */}
            <div className="mb-8 bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border-l-4 border-[#00b894]">
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <span className="text-xl">💡</span> مثال (Beispiel):
              </p>
              <p className="text-lg font-serif mt-2 text-gray-900 dark:text-white pl-7" dir="ltr">{activeVerb.example}</p>
            </div>

            {/* Study Mode */}
            {mode === 'study' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Präsens */}
                <div className="space-y-3">
                  <h3 className="text-center font-bold text-sm bg-gray-100 dark:bg-white/5 py-2 rounded-lg text-gray-600 dark:text-gray-300">Präsens (المضارع)</h3>
                  <div className="space-y-1">
                    {pronouns.map(p => (
                      <div key={p} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-colors">
                        <span className="text-xs text-gray-400 font-bold w-16" dir="ltr">{p}</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white" dir="ltr">{getPronounValue(activeVerb.praesens, p)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Präteritum */}
                <div className="space-y-3">
                  <h3 className="text-center font-bold text-sm bg-gray-100 dark:bg-white/5 py-2 rounded-lg text-gray-600 dark:text-gray-300">Präteritum (الماضي)</h3>
                  <div className="space-y-1">
                    {pronouns.map(p => (
                      <div key={p} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-colors">
                        <span className="text-xs text-gray-400 font-bold w-16" dir="ltr">{p}</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white" dir="ltr">{getPronounValue(activeVerb.praeteritum, p)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Perfekt */}
                <div className="space-y-3">
                  <h3 className="text-center font-bold text-sm bg-gray-100 dark:bg-white/5 py-2 rounded-lg text-gray-600 dark:text-gray-300">Perfekt (الماضي التام)</h3>
                  <div className="space-y-1">
                    {pronouns.map(p => (
                      <div key={p} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-colors">
                        <span className="text-xs text-gray-400 font-bold w-16" dir="ltr">{p}</span>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400" dir="ltr">{getPerfektValue(p)}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Quiz Mode */}
            {mode === 'quiz' && (
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-2 mb-6 justify-center">
                  <span className="text-sm font-bold text-gray-500">اختر الزمن الذي تريد اختباره:</span>
                  <select 
                    value={quizTense}
                    onChange={(e) => { setQuizTense(e.target.value as any); setAnswers({}); setShowResults(false); }}
                    className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm font-bold text-[#0984e3] focus:outline-none"
                    dir="ltr"
                  >
                    <option value="praesens">Präsens</option>
                    <option value="praeteritum">Präteritum</option>
                    <option value="perfekt">Perfekt</option>
                  </select>
                </div>

                <div className="max-w-md mx-auto space-y-3">
                  {pronouns.map(p => {
                    const correctAns = quizTense === 'perfekt' 
                      ? getPerfektValue(p)
                      : getPronounValue(quizTense === 'praesens' ? activeVerb.praesens : activeVerb.praeteritum, p)
                    
                    const userAns = answers[p] || ''
                    // Normalize for comparison (remove spaces, dots)
                    const isCorrect = userAns.toLowerCase().replace(/\s|\./g, '') === correctAns.toLowerCase().replace(/\s|\./g, '')

                    return (
                      <div key={p} className="flex items-center gap-3">
                        <span className="w-20 text-right text-sm font-bold text-gray-500 dark:text-gray-400" dir="ltr">{p}</span>
                        <div className="relative flex-1">
                          <input 
                            dir="ltr" 
                            value={userAns} 
                            onChange={e => setAnswers(prev => ({ ...prev, [p]: e.target.value }))} 
                            disabled={showResults}
                            placeholder={quizTense === 'perfekt' ? 'z.B. habe ... gemacht' : '...'} 
                            className={`w-full px-4 py-3 rounded-xl border text-sm font-bold transition-all focus:outline-none focus:ring-2 ${
                              showResults 
                                ? (isCorrect ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300') 
                                : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:border-[#0984e3] focus:ring-[#0984e3]/20 text-gray-900 dark:text-white'
                            }`} 
                          />
                          {showResults && (
                            <div className="absolute left-3 top-3 text-lg">
                              {isCorrect ? '✅' : '❌'}
                            </div>
                          )}
                        </div>
                        {showResults && !isCorrect && (
                          <span className="text-xs font-bold text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-lg" dir="ltr">
                            {correctAns}
                          </span>
                        )}
                      </div>
                    )
                  })}
                  
                  {!showResults ? (
                    <button 
                      onClick={handleQuizSubmit} 
                      className="w-full mt-6 bg-gradient-to-r from-[#0984e3] to-[#74b9ff] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
                    >
                      تحقّق من الإجابات
                    </button>
                  ) : (
                    <button 
                      onClick={() => { setAnswers({}); setShowResults(false); }} 
                      className="w-full mt-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
                    >
                      إعادة الاختبار
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}