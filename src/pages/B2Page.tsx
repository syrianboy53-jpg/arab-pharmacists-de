import { useState } from 'react'
import { telcB2Models } from '../data/b2'

export default function B2Page() {
  const [selectedModelId, setSelectedModelId] = useState<string>(telcB2Models[0]?.id || '')
  const [activeTab, setActiveTab] = useState<'lesen' | 'sprachbausteine' | 'schreiben' | 'sprechen'>('lesen')
  
  // Quiz states
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({}) // e.g., { 'q1': 'c' }
  const [selectedSbAnswers, setSelectedSbAnswers] = useState<Record<string, string>>({}) // e.g., { 'sb1': 'a' }
  const [writingInput, setWritingInput] = useState<string>('')
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false)
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({})

  const currentModel = telcB2Models.find(m => m.id === selectedModelId)

  if (!currentModel) {
    return (
      <div className="glass p-10 text-center rounded-2xl border border-gray-200 dark:border-white/5">
        <p className="text-gray-500 dark:text-gray-400 text-sm">لا توجد نماذج B2 متاحة حالياً.</p>
      </div>
    )
  }

  // Text-To-Speech function
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'de-DE'
      utterance.rate = 0.85
      window.speechSynthesis.speak(utterance)
    }
  }

  // Word count helper
  const getWordCount = (text: string) => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  }

  const handleModelChange = (id: string) => {
    setSelectedModelId(id)
    setSelectedAnswers({})
    setSelectedSbAnswers({})
    setWritingInput('')
    setShowModelAnswer(false)
    setShowExplanation({})
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎓</span>
          <div>
            <h1 className="font-bold text-2xl grad-text">امتحانات B2 المتقدّمة — Telc B2 Simulation</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">نماذج تدريبية كاملة ومحاكاة حقيقية لأقسام امتحان اللغة الألمانية B2.</p>
          </div>
        </div>

        {/* Model Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">النموذج الحالي:</label>
          <select
            value={selectedModelId}
            onChange={(e) => handleModelChange(e.target.value)}
            className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white"
          >
            {telcB2Models.map(model => (
              <option key={model.id} value={model.id}>
                {model.titleAr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Model Overview Card */}
      <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 flex justify-between items-center flex-wrap gap-4 shadow-xl">
        <div>
          <h2 className="text-lg font-bold text-[#00b894] flex items-center gap-2">
            <span>{currentModel.titleDe}</span>
            <span className="text-xs bg-[#00b894]/10 border border-[#00b894]/20 text-[#00b894] px-2.5 py-0.5 rounded-full font-normal">
              مستوى {currentModel.level}
            </span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            المدة الزمنية الموصى بها للامتحان: <span className="text-amber-600 dark:text-amber-400 font-medium">{currentModel.durationMin} دقيقة</span>
          </p>
        </div>
        <div className="flex gap-1.5 overflow-x-auto nav-scroll">
          {(['lesen', 'sprachbausteine', 'schreiben', 'sprechen'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#00b894] text-white shadow-lg'
                  : 'bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10'
              }`}
            >
              {tab === 'lesen' && '📖 Lesen'}
              {tab === 'sprachbausteine' && '🧩 Sprachbausteine'}
              {tab === 'schreiben' && '✍️ Schreiben'}
              {tab === 'sprechen' && '🗣️ Sprechen'}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="space-y-6">

        {/* 1. LESEN TAB */}
        {activeTab === 'lesen' && (
          <div className="space-y-8 animate-fadeIn">
            {currentModel.readingPassages.map((passage, pIdx) => (
              <div key={passage.id} className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/5 space-y-6 shadow-md">
                <div className="border-b border-gray-200 dark:border-white/5 pb-3">
                  <span className="text-xs text-[#00b894] font-bold uppercase tracking-wider">Passage {pIdx + 1}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5" dir="ltr">{passage.titleDe}</h3>
                </div>

                {/* German Text Box */}
                <div 
                  className="bg-gray-100 dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 p-5 rounded-xl text-sm leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-wrap select-text text-left font-sans"
                  dir="ltr"
                >
                  {passage.textDe}
                </div>

                {/* Questions Grid */}
                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400">الأسئلة المتعلقة بالنص:</h4>
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

                        {/* Options */}
                        <div className="grid sm:grid-cols-2 gap-2 mr-8">
                          {q.options.map(opt => {
                            const isSelected = selectedOpt === opt.id
                            const isCorrect = opt.id === q.correct
                            
                            let optStyle = 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10'
                            if (selectedOpt) {
                              if (isCorrect) {
                                optStyle = 'bg-[#00b894]/10 border-[#00b894]/40 text-[#00b894] font-medium'
                              } else if (isSelected) {
                                optStyle = 'bg-red-500/10 border-red-500/40 text-red-500 font-medium'
                              } else {
                                optStyle = 'bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 opacity-60'
                              }
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

                        {/* Explanation Box */}
                        {selectedOpt && (
                          <div className="mr-8 space-y-2">
                            <button
                              onClick={() => setShowExplanation(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white flex items-center gap-1.5 transition-colors"
                            >
                              <span>{showEx ? '🙈 إخفاء الشرح والترجمة' : '💡 عرض الشرح والترجمة العربية'}</span>
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
              <span className="text-xs text-[#00b894] font-bold uppercase tracking-wider">Teil 1 — Grammatik & Wortschatz</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">عناصر اللغة وتطبيقات القواعد</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">اختر الكلمة أو القاعدة الصحيحة لإكمال الفراغات في سياق الجمل التالية.</p>
            </div>

            <div className="space-y-6">
              {currentModel.sprachbausteine.map((sb, sbIdx) => {
                const selectedOpt = selectedSbAnswers[sb.id]
                const showEx = showExplanation[sb.id]
                return (
                  <div key={sb.id} className="border-b border-gray-200 dark:border-white/5 pb-5 last:border-0 last:pb-0 space-y-3">
                    {/* Sentence Context */}
                    <div className="flex gap-3 items-start">
                      <span className="bg-[#00b894]/10 border border-[#00b894]/20 text-[#00b894] w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-sans">
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

                    {/* Options Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mr-10 pt-1">
                      {sb.options.map(opt => {
                        const isSelected = selectedOpt === opt.id
                        const isCorrect = opt.id === sb.correct

                        let optStyle = 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10'
                        if (selectedOpt) {
                          if (isCorrect) {
                            optStyle = 'bg-[#00b894]/10 border-[#00b894]/40 text-[#00b894] font-medium'
                          } else if (isSelected) {
                            optStyle = 'bg-red-500/10 border-red-500/40 text-red-500 font-medium'
                          } else {
                            optStyle = 'bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 opacity-60'
                          }
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

                    {/* Explanation */}
                    {selectedOpt && (
                      <div className="mr-10 space-y-2 pt-1">
                        <button
                          onClick={() => setShowExplanation(prev => ({ ...prev, [sb.id]: !prev[sb.id] }))}
                          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white flex items-center gap-1.5 transition-colors"
                        >
                          <span>{showEx ? '🙈 إخفاء التحليل النحوي' : '💡 عرض التحليل النحوي والترجمة العربية'}</span>
                        </button>

                        {showEx && (
                          <div className="bg-amber-100 dark:bg-amber-900/5 border border-amber-200 dark:border-amber-700/20 p-3.5 rounded-xl text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            <p className="font-bold text-amber-600 dark:text-amber-400 mb-1">البلانك: <span className="text-gray-900 dark:text-white font-normal" dir="ltr">{sb.blank}</span></p>
                            <div className="text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: sb.explanationAr.replace(/\n/g, '<br/>') }} />
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
        {activeTab === 'schreiben' && currentModel.schreiben && (
          <div className="grid md:grid-cols-3 gap-6 animate-fadeIn">
            {/* Task prompt panel */}
            <div className="md:col-span-1 space-y-4">
              <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 space-y-4 shadow-md">
                <div>
                  <span className="text-xs text-[#00b894] font-bold uppercase tracking-wider">Teil 1 — Forumsbeitrag</span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mt-0.5">{currentModel.schreiben.topicAr}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-1" dir="ltr">{currentModel.schreiben.topicDe}</p>
                </div>

                <div className="bg-gray-100 dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 p-4 rounded-xl text-xs text-gray-600 dark:text-gray-400 leading-relaxed space-y-3">
                  <p className="font-semibold text-amber-600 dark:text-amber-400">التعليمات المطلوبة (150–200 كلمة):</p>
                  <p className="font-sans italic mb-2 text-left" dir="ltr">{currentModel.schreiben.contextDe}</p>
                  <ul className="list-disc list-inside space-y-1 text-xs" dir="ltr">
                    {currentModel.schreiben.bulletPoints.map((point, idx) => (
                      <li key={idx} className="text-left font-sans">{point}</li>
                    ))}
                  </ul>
                </div>

                {/* Useful phrases grid */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400">جمل وتراكيب مفيدة (Redemittel):</h4>
                  <div className="grid gap-1.5 max-h-48 overflow-y-auto pr-1 nav-scroll">
                    {currentModel.schreiben.redemittel.map((phrase, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          navigator.clipboard.writeText(phrase)
                          alert('تم نسخ الجملة بنجاح!')
                        }}
                        className="text-left font-sans text-xs bg-white dark:bg-[#1a1a2e] hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10 px-3 py-2 rounded-xl text-gray-600 dark:text-gray-400 truncate transition-all flex items-center justify-between gap-1 group cursor-pointer"
                        dir="ltr"
                        title="انقر لنسخ الجملة"
                      >
                        <span className="truncate group-hover:text-[#00b894] transition-colors">{phrase}</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-normal shrink-0">📋</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive writing pad */}
            <div className="md:col-span-2 space-y-4">
              <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">لوحة الكتابة والتدريب (Writing Pad)</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                    getWordCount(writingInput) >= 150 && getWordCount(writingInput) <= 200
                      ? 'bg-[#00b894]/10 text-[#00b894] border border-[#00b894]/20'
                      : 'bg-amber-100 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-700/20'
                  }`}>
                    عدد الكلمات: {getWordCount(writingInput)} / 200
                  </span>
                </div>

                <textarea
                  value={writingInput}
                  onChange={(e) => setWritingInput(e.target.value)}
                  placeholder="اكتب موضوعك هنا باللغة الألمانية للتدريب الشخصي وحساب الكلمات..."
                  className="w-full h-80 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white text-left font-sans"
                  dir="ltr"
                />

                <div className="flex justify-between items-center flex-wrap gap-3">
                  <button
                    onClick={() => {
                      if (confirm('هل أنت متأكد من مسح كتابتك بالكامل؟')) {
                        setWritingInput('')
                      }
                    }}
                    className="text-xs text-red-500 hover:text-red-dark transition-colors px-3 py-2"
                  >
                    🗑️ مسح المحتوى
                  </button>

                  <button
                    onClick={() => setShowModelAnswer(!showModelAnswer)}
                    className="bg-amber-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-amber-500-accent transition-all cursor-pointer"
                  >
                    {showModelAnswer ? '🙈 إخفاء النموذج الإرشادي' : '🔑 عرض نموذج الحل والترجمة'}
                  </button>
                </div>
              </div>

              {/* Model essay display */}
              {showModelAnswer && (
                <div className="grid sm:grid-cols-2 gap-4 animate-slideDown">
                  {/* German Model Essay */}
                  <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 space-y-3">
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/5 pb-2">
                      <span className="text-xs text-[#00b894] font-bold">Modellantwort (DE)</span>
                      <button
                        onClick={() => speak(currentModel.schreiben.sampleEssayDe)}
                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#00b894] flex items-center gap-1"
                      >
                        <span>🔊 استمع للمقال</span>
                      </button>
                    </div>
                    <div 
                      className="text-xs font-sans text-left leading-relaxed text-gray-900 dark:text-white whitespace-pre-wrap select-text" 
                      dir="ltr"
                    >
                      {currentModel.schreiben.sampleEssayDe}
                    </div>
                  </div>

                  {/* Arabic translation of essay */}
                  <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 space-y-3">
                    <div className="border-b border-gray-200 dark:border-white/5 pb-2">
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">الترجمة والشرح (AR)</span>
                    </div>
                    <div 
                      className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-wrap select-text"
                    >
                      {currentModel.schreiben.sampleEssayAr}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. SPRECHEN TAB */}
        {activeTab === 'sprechen' && currentModel.sprechen && (
          <div className="space-y-6 animate-fadeIn">
            {currentModel.sprechen.map((part, idx) => (
              <div key={part.id} className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/5 space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-3">
                  <div>
                    <span className="text-xs text-[#00b894] font-bold uppercase tracking-wider">Teil {idx + 1}</span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mt-0.5">{part.partAr}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-0.5" dir="ltr">{part.partDe}</p>
                  </div>
                  <button
                    onClick={() => speak(part.sampleAnswerDe)}
                    className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-[#00b894] hover:bg-[#00b894]/10 hover:border-[#00b894]/20 px-3.5 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>🔊 استمع للإجابة النموذجية</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  {/* Topic prompt details */}
                  <div className="md:col-span-1 space-y-3">
                    <div className="bg-gray-100 dark:bg-[#1a1a2e] p-4 border border-gray-200 dark:border-white/5 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-amber-600 dark:text-amber-400">المطلوب مناقشته:</p>
                      <p className="text-sm text-gray-900 dark:text-white font-medium">{part.topicAr}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-sans text-left" dir="ltr">{part.topicDe}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-bold text-amber-600 dark:text-amber-400">تراكيب شائعة مفيدة (Redemittel):</p>
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

                  {/* Sample Answer Speech response */}
                  <div className="md:col-span-2">
                    <div className="bg-gray-50 dark:bg-white/5 p-4 border border-gray-200 dark:border-white/5 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-[#00b894]">الإجابة والتقديم الإرشادي (Modellantwort):</p>
                      <p 
                        className="text-xs font-sans text-left leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-wrap select-text" 
                        dir="ltr"
                      >
                        {part.sampleAnswerDe}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
