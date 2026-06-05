import { useState, useMemo } from 'react'
import { schreibenModels } from '../data/schreiben'

export default function SchreibenPage() {
  const [selectedModelId, setSelectedModelId] = useState<string>(schreibenModels[0].id)
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0)
  const [userTextMap, setUserTextMap] = useState<Record<string, string>>({})
  const [showSample, setShowSample] = useState(false)

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
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">✍️</span>
        <div>
          <h1 className="text-2xl font-bold grad-text">الكتابة — Schreiben</h1>
          <p className="text-muted text-sm">تدرّب على نماذج التعبير والرسائل الكتابية الرسمية وغير الرسمية لامتحان B1.</p>
        </div>
      </div>

      {/* Model Selection Dropdown */}
      <div className="glass p-5 rounded-2xl border border-white/5 shadow-xl space-y-4">
        <div className="space-y-1">
          <label className="text-xs text-muted block">اختر نموذج الامتحان:</label>
          <select
            value={selectedModelId}
            onChange={(e) => {
              setSelectedModelId(e.target.value)
              setSelectedTaskIndex(0)
              setShowSample(false)
            }}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green text-ink"
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
              onClick={() => {
                setSelectedTaskIndex(idx)
                setShowSample(false)
              }}
              className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all border ${
                selectedTaskIndex === idx
                  ? 'bg-green/20 border-green/40 text-green shadow-inner'
                  : 'bg-white/5 border-white/5 text-muted hover:text-white hover:bg-white/10'
              }`}
            >
              المهمة {task.taskNumber} ({task.typeDe.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Task Content Card */}
      <div className="glass p-6 rounded-2xl border border-white/5 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="text-right">
            <h2 className="text-lg font-bold text-green">{activeTask.typeAr}</h2>
            <p className="text-xs text-muted" dir="ltr">{activeTask.typeDe}</p>
          </div>
          <span className="text-xs bg-gold/20 text-gold border border-gold/30 px-3 py-1 rounded-full font-medium">
            📋 المتطلب: {activeTask.wordCount || 'حوالي 80 كلمة'}
          </span>
        </div>

        {/* Prompts Section */}
        <div className="space-y-4">
          <div className="bg-slate-900/60 rounded-xl p-4 border border-white/5">
            <p className="text-xs text-muted mb-1 text-right">نص السؤال (بالعربية):</p>
            <p className="text-sm leading-relaxed text-right text-white">
              {activeTask.promptAr}
            </p>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-4 border border-white/5" dir="ltr">
            <p className="text-xs text-muted mb-1 text-left">Aufgabe (auf Deutsch):</p>
            <p className="text-sm leading-relaxed text-left text-white font-medium">
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
                <li key={i} className="text-white/90 text-right">
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Interactive Writing Area */}
      <div className="glass p-5 rounded-2xl border border-white/5 shadow-xl space-y-4">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-bold text-white">لوحة الكتابة والتدريب:</label>
          <span className={`text-xs px-2.5 py-1 rounded-full ${
            wordCount >= 70 && wordCount <= 120 
              ? 'bg-green/10 text-green border border-green/20' 
              : 'bg-white/5 text-muted'
          }`}>
            عدد الكلمات: {wordCount}
          </span>
        </div>
        
        <textarea
          value={typedText}
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-full bg-slate-900/80 border border-white/10 rounded-xl p-4 min-h-[220px] text-sm focus:outline-none focus:border-green text-ink leading-relaxed font-sans"
          dir="ltr"
          placeholder="Sehr geehrte Damen und Herren, / Lieber Lukas, ..."
        />
      </div>

      {/* Useful Phrases */}
      {activeTask.usefulPhrases && activeTask.usefulPhrases.length > 0 && (
        <div className="glass p-5 rounded-2xl border border-white/5 shadow-xl">
          <h3 className="text-sm font-bold text-green mb-3">💡 عبارات مساعدة مفيدة (Useful Phrases):</h3>
          <div className="grid md:grid-cols-2 gap-3" dir="ltr">
            {activeTask.usefulPhrases.map((phrase, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col gap-1 text-left hover:bg-white/10 transition-colors"
              >
                <span className="text-white font-medium text-xs">{phrase.de}</span>
                <span className="text-muted text-xs text-right" dir="rtl">{phrase.ar}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Model Answer Toggle */}
      <div className="space-y-4">
        <button
          onClick={() => setShowSample(!showSample)}
          className="w-full bg-green text-white hover:bg-green-600 py-3.5 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          {showSample ? '🙈 إخفاء نموذج الإجابة' : '👁️ عرض نموذج الإجابة المقترح'}
        </button>

        {showSample && (
          <div className="glass p-6 rounded-2xl border border-green/20 shadow-2xl space-y-4 animate-fade-in">
            <div>
              <h3 className="font-bold text-green mb-1">Musterantwort (نموذج الإجابة):</h3>
              <p className="text-xs text-muted">يمكنك مقارنة إجابتك بهذا النموذج المقترح الحاصل على الدرجة الكاملة.</p>
            </div>
            
            <pre className="text-sm whitespace-pre-wrap leading-relaxed bg-slate-950/80 border border-white/5 rounded-xl p-5 text-white text-left font-mono" dir="ltr">
              {activeTask.sampleAnswer}
            </pre>

            {(activeTask as any).sampleAnswerNotes && (activeTask as any).sampleAnswerNotes.length > 0 && (
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-gold">🔍 تحليل نموذج الإجابة وملاحظات هامة:</h4>
                <ul className="text-xs space-y-1.5 list-disc list-inside text-muted">
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
