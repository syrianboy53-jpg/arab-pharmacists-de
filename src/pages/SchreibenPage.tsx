import { useState, useMemo } from 'react'
import { schreibenModels } from '../data/schreiben'

// Types for AI correction result
interface CorrectionError {
  original: string
  corrected: string
  explanation: string
}

interface CorrectionResult {
  score: number
  scoreLabel: string
  scoreColor: string
  correctedText: string
  errors: CorrectionError[]
  improvements: string[]
  positives: string[]
  taskFulfillment: string
  taskFulfillmentNote: string
}

const scoreColorMap: Record<string, string> = {
  emerald: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  blue: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
  yellow: 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10',
  orange: 'text-orange-400 border-orange-500/40 bg-orange-500/10',
  red: 'text-red-400 border-red-500/40 bg-red-500/10',
}

const scoreRingMap: Record<string, string> = {
  emerald: '#10b981',
  blue: '#3b82f6',
  yellow: '#eab308',
  orange: '#f97316',
  red: '#ef4444',
}

export default function SchreibenPage() {
  const [selectedModelId, setSelectedModelId] = useState<string>(schreibenModels[0].id)
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0)
  const [userTextMap, setUserTextMap] = useState<Record<string, string>>({})
  const [showSample, setShowSample] = useState(false)

  // AI Correction state
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [correctionResult, setCorrectionResult] = useState<CorrectionResult | null>(null)
  const [correctionError, setCorrectionError] = useState<string | null>(null)

  // Find currently selected model
  const activeModel = useMemo(() => {
    return schreibenModels.find(m => m.id === selectedModelId) || schreibenModels[0]
  }, [selectedModelId])

  // Find currently selected task in the active model
  const activeTask = useMemo(() => {
    return activeModel.tasks[selectedTaskIndex] || activeModel.tasks[0]
  }, [activeModel, selectedTaskIndex])

  // Get current typed text for this task
  const typedText = userTextMap[activeTask.id] || ''

  // Word count helper
  const wordCount = useMemo(() => {
    return typedText.split(/\s+/).filter(Boolean).length
  }, [typedText])

  const handleTextChange = (text: string) => {
    setUserTextMap(prev => ({
      ...prev,
      [activeTask.id]: text
    }))
    // Reset correction when text changes
    if (correctionResult) {
      setCorrectionResult(null)
      setCorrectionError(null)
    }
  }

  const handleAnalyze = async () => {
    if (typedText.trim().length < 10) {
      setCorrectionError('يرجى كتابة نص أطول قبل طلب التصحيح.')
      return
    }
    setIsAnalyzing(true)
    setCorrectionResult(null)
    setCorrectionError(null)

    try {
      const res = await fetch('/api/correct-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userText: typedText,
          taskPromptDe: activeTask.promptDe,
          taskPromptAr: activeTask.promptAr,
          taskType: activeTask.typeDe,
        })
      })

      const data = await res.json() as any
      if (data.ok && data.result) {
        setCorrectionResult(data.result)
      } else {
        setCorrectionError(data.error || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.')
      }
    } catch {
      setCorrectionError('لا يمكن الاتصال بالخادم. يرجى التحقق من الاتصال بالإنترنت.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleTaskChange = (idx: number) => {
    setSelectedTaskIndex(idx)
    setShowSample(false)
    setCorrectionResult(null)
    setCorrectionError(null)
  }

  const handleModelChange = (id: string) => {
    setSelectedModelId(id)
    setSelectedTaskIndex(0)
    setShowSample(false)
    setCorrectionResult(null)
    setCorrectionError(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">✍️</span>
        <div>
          <h1 className="text-2xl font-bold grad-text">الكتابة — Schreiben</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">تدرّب على نماذج التعبير والرسائل الكتابية الرسمية وغير الرسمية لامتحان B1.</p>
        </div>
      </div>

      {/* Model Selection Dropdown */}
      <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl space-y-4">
        <div className="space-y-1">
          <label className="text-xs text-gray-500 dark:text-gray-400 block">اختر نموذج الامتحان:</label>
          <select
            value={selectedModelId}
            onChange={(e) => handleModelChange(e.target.value)}
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white"
          >
            {schreibenModels.map(model => (
              <option key={model.id} value={model.id}>
                {model.title} - ({model.description.substring(0, 45)}...)
              </option>
            ))}
          </select>
        </div>

        {/* Task Tabs (1, 2, 3) */}
        <div className="flex gap-2">
          {activeModel.tasks.map((task, idx) => (
            <button
              key={task.id}
              onClick={() => handleTaskChange(idx)}
              className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all border ${
                selectedTaskIndex === idx
                  ? 'bg-[#00b894]/20 border-[#00b894]/40 text-[#00b894] shadow-inner'
                  : 'bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10'
              }`}
            >
              المهمة {task.taskNumber} ({task.typeDe.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Task Content Card */}
      <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="text-right">
            <h2 className="text-lg font-bold text-[#00b894]">{activeTask.typeAr}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400" dir="ltr">{activeTask.typeDe}</p>
          </div>
          <span className="text-xs bg-gold/20 text-amber-600 dark:text-amber-400 border border-gold/30 px-3 py-1 rounded-full font-medium">
            📋 المتطلب: {activeTask.wordCount || 'حوالي 80 كلمة'}
          </span>
        </div>

        {/* Prompts Section */}
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/5">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-right">نص السؤال (بالعربية):</p>
            <p className="text-sm leading-relaxed text-right text-gray-900 dark:text-white">
              {activeTask.promptAr}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/5" dir="ltr">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-left">Aufgabe (auf Deutsch):</p>
            <p className="text-sm leading-relaxed text-left text-gray-900 dark:text-white font-medium">
              {activeTask.promptDe}
            </p>
          </div>
        </div>

        {/* Requirements Bullet Points */}
        {activeTask.requirements && activeTask.requirements.length > 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <h3 className="text-xs font-bold text-yellow-500 mb-2">📝 نقاط يجب أن تغطيها في موضوعك:</h3>
            <ul className="text-xs space-y-1.5 list-disc list-inside">
              {activeTask.requirements.map((req, i) => (
                <li key={i} className="text-gray-900 dark:text-white/90 text-right">
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Interactive Writing Area */}
      <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl space-y-4">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-bold text-gray-900 dark:text-white">لوحة الكتابة والتدريب:</label>
          <span className={`text-xs px-2.5 py-1 rounded-full ${
            wordCount >= 70 && wordCount <= 120 
              ? 'bg-[#00b894]/10 text-[#00b894] border border-[#00b894]/20' 
              : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400'
          }`}>
            عدد الكلمات: {wordCount}
          </span>
        </div>
        
        <textarea
          value={typedText}
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-full bg-slate-900/80 border border-gray-200 dark:border-white/10 rounded-xl p-4 min-h-[220px] text-sm focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white leading-relaxed font-sans"
          dir="ltr"
          placeholder="Sehr geehrte Damen und Herren, / Lieber Lukas, ..."
        />

        {/* AI Correction Button */}
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || typedText.trim().length < 10}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border ${
            isAnalyzing
              ? 'bg-gold/10 border-gold/20 text-amber-600 dark:text-amber-400/70 cursor-not-allowed'
              : typedText.trim().length < 10
              ? 'bg-gray-100 dark:bg-white/5 border-white/10 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-gold/20 to-amber-500/20 border-gold/40 text-amber-600 dark:text-amber-400 hover:from-gold/30 hover:to-amber-500/30 hover:border-gold/60 hover:shadow-gold/20 hover:shadow-xl active:scale-[0.99]'
          }`}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              جاري تحليل نصك بالذكاء الاصطناعي...
            </>
          ) : (
            <>
              ✨ تصحيح كتابتي بالذكاء الاصطناعي
            </>
          )}
        </button>

        {/* Error state */}
        {correctionError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-400 text-right">
            ⚠️ {correctionError}
          </div>
        )}
      </div>

      {/* AI Correction Results Card */}
      {correctionResult && (
        <div className="glass p-6 rounded-2xl border border-gold/20 shadow-2xl space-y-5 animate-fade-in">
          {/* Header with score */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">نتيجة التصحيح الذكي</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">تم التحليل بواسطة Google Gemini AI</p>
            </div>
            {/* Score Ring */}
            <div className="relative flex-shrink-0">
              <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8"/>
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke={scoreRingMap[correctionResult.scoreColor] || '#10b981'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - correctionResult.score / 100)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-xl font-black ${(scoreColorMap[correctionResult.scoreColor] || '').split(' ')[0]}`}>
                  {correctionResult.score}
                </span>
                <span className="text-[9px] text-gray-500 dark:text-gray-400">/100</span>
              </div>
            </div>
          </div>

          {/* Score Label + Task Fulfillment */}
          <div className="flex flex-wrap gap-3">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${scoreColorMap[correctionResult.scoreColor] || 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'}`}>
              {correctionResult.scoreLabel}
            </span>
            <span className={`text-xs px-3 py-1.5 rounded-full border ${
              correctionResult.taskFulfillment === 'نعم'
                ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'
                : correctionResult.taskFulfillment === 'جزئياً'
                ? 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10'
                : 'text-red-400 border-red-500/40 bg-red-500/10'
            }`}>
              استيفاء المطلوب: {correctionResult.taskFulfillment}
            </span>
          </div>

          {correctionResult.taskFulfillmentNote && (
            <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 rounded-xl p-3 text-right">
              💬 {correctionResult.taskFulfillmentNote}
            </p>
          )}

          {/* Positives */}
          {correctionResult.positives && correctionResult.positives.length > 0 && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400">✅ نقاط إيجابية في كتابتك:</h4>
              <ul className="space-y-1">
                {correctionResult.positives.map((pos, i) => (
                  <li key={i} className="text-xs text-gray-900 dark:text-white/80 text-right flex gap-2 items-start justify-end">
                    <span>{pos}</span>
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">◀</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Errors */}
          {correctionResult.errors && correctionResult.errors.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-red-400">🔴 الأخطاء والتصحيحات:</h4>
              <div className="space-y-2">
                {correctionResult.errors.map((err, i) => (
                  <div key={i} className="bg-red-500/5 border border-red-500/15 rounded-xl p-3 space-y-1">
                    <div className="flex flex-wrap items-center gap-2 justify-end" dir="ltr">
                      <span className="text-xs text-red-400 line-through bg-red-500/10 px-2 py-0.5 rounded-lg font-mono">{err.original}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs">→</span>
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg font-mono font-bold">{err.corrected}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-right">{err.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Improvements */}
          {correctionResult.improvements && correctionResult.improvements.length > 0 && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-blue-400">💡 اقتراحات لتحسين أسلوبك:</h4>
              <ul className="space-y-1.5">
                {correctionResult.improvements.map((imp, i) => (
                  <li key={i} className="text-xs text-gray-900 dark:text-white/80 text-right flex gap-2 items-start justify-end">
                    <span>{imp}</span>
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">◀</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Corrected Text */}
          {correctionResult.correctedText && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400">📄 النص بعد التصحيح الكامل:</h4>
              <pre
                className="text-sm whitespace-pre-wrap leading-relaxed bg-gray-100 dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 rounded-xl p-5 text-gray-900 dark:text-white/90 text-left font-sans"
                dir="ltr"
              >
                {correctionResult.correctedText}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Useful Phrases */}
      {activeTask.usefulPhrases && activeTask.usefulPhrases.length > 0 && (
        <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl">
          <h3 className="text-sm font-bold text-[#00b894] mb-3">💡 عبارات مساعدة مفيدة (Useful Phrases):</h3>
          <div className="grid md:grid-cols-2 gap-3" dir="ltr">
            {activeTask.usefulPhrases.map((phrase, idx) => (
              <div 
                key={idx} 
                className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 p-3 rounded-xl flex flex-col gap-1 text-left hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
              >
                <span className="text-gray-900 dark:text-white font-medium text-xs">{phrase.de}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs text-right" dir="rtl">{phrase.ar}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Model Answer Toggle */}
      <div className="space-y-4">
        <button
          onClick={() => setShowSample(!showSample)}
          className="w-full bg-[#00b894] text-white hover:bg-[#00a884] py-3.5 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          {showSample ? '🙈 إخفاء نموذج الإجابة' : '👁️ عرض نموذج الإجابة المقترح'}
        </button>

        {showSample && (
          <div className="glass p-6 rounded-2xl border border-[#00b894]/20 shadow-2xl space-y-4 animate-fade-in">
            <div>
              <h3 className="font-bold text-[#00b894] mb-1">Musterantwort (نموذج الإجابة):</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">يمكنك مقارنة إجابتك بهذا النموذج المقترح الحاصل على الدرجة الكاملة.</p>
            </div>
            
            <pre className="text-sm whitespace-pre-wrap leading-relaxed bg-gray-100 dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 rounded-xl p-5 text-gray-900 dark:text-white text-left font-mono" dir="ltr">
              {activeTask.sampleAnswer}
            </pre>

            {(activeTask as any).sampleAnswerNotes && (activeTask as any).sampleAnswerNotes.length > 0 && (
              <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400">🔍 تحليل نموذج الإجابة وملاحظات هامة:</h4>
                <ul className="text-xs space-y-1.5 list-disc list-inside text-gray-500 dark:text-gray-400">
                  {(activeTask as any).sampleAnswerNotes.map((note: any, i: number) => (
                    <li key={i} className="text-right">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
