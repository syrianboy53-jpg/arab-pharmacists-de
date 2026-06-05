import { useState, useMemo, useEffect } from 'react'
import { speakingColloquialData } from '../data/speakingColloquial'

interface ScoreFeedback {
  score: number
  spokenText: string
  wordPills: { word: string; correct: boolean }[]
  ratingLabel: string
  ratingClass: string
}

export default function SlangPage() {
  const [selectedCatId, setSelectedCatId] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const slowRate = 0.5
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({})

  // Speech Recognition state
  const [isListening, setIsListening] = useState<boolean>(false)
  const [activePhraseId, setActivePhraseId] = useState<string | null>(null)
  const [recognitionObj, setRecognitionObj] = useState<any>(null)
  const [feedbacks, setFeedbacks] = useState<Record<string, ScoreFeedback>>({})
  const [micError, setMicError] = useState<string | null>(null)

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      const rec = new SpeechRecognition()
      rec.lang = 'de-DE'
      rec.interimResults = false
      rec.maxAlternatives = 1
      setRecognitionObj(rec)
    }
  }, [])

  // Text-To-Speech function
  const speak = (text: string, rate: number = 1.0) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'de-DE'
      utterance.rate = rate
      window.speechSynthesis.speak(utterance)
    }
  }

  // Start speech recognition listening for a specific phrase
  const startListening = (phraseText: string, phraseId: string) => {
    if (!recognitionObj) {
      alert('عذراً، ميزة التعرف على الصوت (الميكروفون) متوفرة فقط في متصفحات Google Chrome و Microsoft Edge على الكمبيوتر أو الأندرويد.')
      return
    }

    if (isListening) {
      recognitionObj.stop()
      return
    }

    setMicError(null)
    setIsListening(true)
    setActivePhraseId(phraseId)

    // Bind results
    recognitionObj.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript
      evaluatePronunciation(spokenText, phraseText, phraseId)
    }

    recognitionObj.onerror = (e: any) => {
      console.error('Speech recognition error:', e.error)
      setIsListening(false)
      setActivePhraseId(null)
      
      let msg = 'عذراً، لم أستطع سماعك بوضوح. يرجى المحاولة مجدداً.'
      if (e.error === 'not-allowed') {
        msg = 'يرجى إعطاء صلاحية استخدام الميكروفون للموقع لتتمكن من التدرب.'
      }
      setMicError(msg)
    }

    recognitionObj.onend = () => {
      setIsListening(false)
      setActivePhraseId(null)
    }

    recognitionObj.start()
  }

  // Pronunciation Evaluation Logic
  const evaluatePronunciation = (spokenText: string, targetText: string, phraseId: string) => {
    // Clean texts for comparison: lowercase, remove punctuation
    const cleanSpoken = spokenText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim()
    const cleanTarget = targetText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim()
    
    const spokenWords = cleanSpoken.split(/\s+/)
    const targetWords = cleanTarget.split(/\s+/)
    
    // Original target words (preserving punctuation for display)
    const originalWords = targetText.split(/\s+/)
    
    let matchedCount = 0
    let wordPills: { word: string; correct: boolean }[] = []
    
    originalWords.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim()
      if (spokenWords.includes(cleanWord)) {
        matchedCount++
        wordPills.push({ word, correct: true })
      } else {
        wordPills.push({ word, correct: false })
      }
    })
    
    const score = Math.round((matchedCount / targetWords.length) * 100)
    
    // Determine rating
    let ratingLabel = ''
    let ratingClass = ''
    if (score >= 90) {
      ratingLabel = '🌟 ممتاز جداً!'
      ratingClass = 'border-green-400/30 text-green bg-green/5'
    } else if (score >= 60) {
      ratingLabel = '👍 لفظ مقبول وجيد'
      ratingClass = 'border-gold/30 text-gold bg-gold/5'
    } else {
      ratingLabel = '💪 حاول مجدداً بنطق أوضح'
      ratingClass = 'border-red-400/30 text-red bg-red/5'
    }

    setFeedbacks(prev => ({
      ...prev,
      [phraseId]: {
        score,
        spokenText,
        wordPills,
        ratingLabel,
        ratingClass
      }
    }))
  }

  // Get total slang phrases count
  const totalPhrasesCount = useMemo(() => {
    return speakingColloquialData.categories.reduce((sum, cat) => sum + (cat.phrases?.length || 0), 0)
  }, [])

  // Filtered phrases data
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    
    return speakingColloquialData.categories.map(cat => {
      if (selectedCatId !== 'all' && cat.id !== selectedCatId) {
        return null
      }

      const matchingPhrases = cat.phrases.filter(p => 
        p.german.toLowerCase().includes(q) || 
        p.hochdeutsch.toLowerCase().includes(q) || 
        p.arabic.toLowerCase().includes(q) ||
        (p.context && p.context.toLowerCase().includes(q))
      )

      if (matchingPhrases.length > 0) {
        return {
          ...cat,
          phrases: matchingPhrases
        }
      }
      return null
    }).filter(Boolean) as typeof speakingColloquialData.categories
  }, [selectedCatId, searchQuery])

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔥</span>
          <div>
            <h1 className="text-2xl font-bold grad-text">قاموس العامية الألمانية — Umgangssprache</h1>
            <p className="text-muted text-sm">أكثر من {totalPhrasesCount} تعبير شارع ولغة شبابية للاندماج اليومي مع النطق والتقييم.</p>
          </div>
        </div>
      </div>

      {/* Controls Container */}
      <div className="glass p-5 rounded-2xl border border-white/5 space-y-4 shadow-xl">
        <div className="grid md:grid-cols-2 gap-4">
          
          {/* Category Filter */}
          <div className="space-y-1">
            <label className="text-xs text-muted block">تصنيف التعبيرات:</label>
            <select
              value={selectedCatId}
              onChange={(e) => {
                setSelectedCatId(e.target.value)
                setFeedbacks({})
                setShowExplanation({})
              }}
              className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green text-ink"
            >
              <option value="all">📦 جميع الفئات ({speakingColloquialData.categories.length})</option>
              {speakingColloquialData.categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.nameAr} - {cat.nameDe} ({cat.phrases?.length || 0} تعبير)
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="space-y-1">
            <label className="text-xs text-muted block">بحث في القاموس:</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="مثال: Bock, Wurst, فرطان, قهوة..."
                className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-green text-ink text-left"
                dir="ltr"
              />
              <span className="absolute right-3 top-3 text-muted text-xs">🔍</span>
            </div>
          </div>
        </div>
      </div>

      {/* Speech mic error banner */}
      {micError && (
        <div className="bg-red/10 border border-red/20 text-red px-4 py-3 rounded-xl text-xs text-center animate-fadeIn">
          ⚠️ {micError}
        </div>
      )}

      {/* List display */}
      {filteredData.length === 0 ? (
        <div className="glass p-10 text-center rounded-2xl border border-white/5">
          <p className="text-muted text-sm">لم نجد أي تعبيرات تطابق بحثك الحالي.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredData.map(cat => (
            <div key={cat.id} className="space-y-4">
              
              {/* Category Subheader */}
              <div className="flex items-center gap-2.5 border-b border-white/15 pb-2">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h3 className="font-bold text-green">{cat.nameAr}</h3>
                  <p className="text-[11px] text-muted">{cat.descriptionAr}</p>
                </div>
                <span className="mr-auto text-xs bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-muted font-mono">
                  {cat.phrases.length} تعبير
                </span>
              </div>

              {/* Phrases Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {cat.phrases.map((phrase, idx) => {
                  const phraseId = `${cat.id}-${idx}`
                  const isRecActive = activePhraseId === phraseId
                  const phraseFeedback = feedbacks[phraseId]
                  
                  return (
                    <div
                      key={phraseId}
                      className="glass p-5 rounded-2xl border border-white/5 hover:border-green/20 transition-all flex flex-col justify-between gap-4 shadow-md group relative overflow-hidden"
                    >
                      {/* Badge and title */}
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] bg-slate-900 border border-white/10 px-2 py-0.5 rounded-full text-muted font-mono" dir="ltr">
                          {phrase.difficulty}
                        </span>
                        
                        {/* Syrian vs German flag icon indicator */}
                        {cat.id === 'german_vs_syrian' && (
                          <span className="text-xs text-muted flex items-center gap-1">
                            <span>🇩🇪</span>
                            <span className="text-[10px]">ضد</span>
                            <span>🇸🇾</span>
                          </span>
                        )}
                      </div>

                      {/* Phrase content block */}
                      <div className="space-y-2 text-left" dir="ltr">
                        <h4 className="font-bold text-white text-base font-sans select-all leading-snug">
                          {phrase.german}
                        </h4>
                        
                        <div className="space-y-1">
                          <p className="text-[11px] text-muted font-sans font-medium">
                            <span className="text-gold">Standard:</span> {phrase.hochdeutsch}
                          </p>
                          <p className="text-xs text-ink-soft text-right font-medium" dir="rtl">
                            💬 {phrase.arabic}
                          </p>
                          <p className="text-[10px] text-muted font-sans font-light">
                            🔊 <span className="italic">{phrase.phonetic}</span>
                          </p>
                        </div>
                      </div>

                      {/* Action buttons controls */}
                      <div className="flex items-center gap-2 border-t border-white/5 pt-3 justify-between flex-wrap">
                        
                        {/* Audio controls */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => speak(phrase.german, 1.0)}
                            className="bg-white/5 border border-white/10 text-muted hover:text-green hover:bg-green/10 hover:border-green/20 p-2 rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer"
                            title="نطق طبيعي"
                          >
                            🔊
                          </button>
                          <button
                            onClick={() => speak(phrase.german, slowRate)}
                            className="bg-white/5 border border-white/10 text-muted hover:text-red hover:bg-red/10 hover:border-red/20 p-2 rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer"
                            title="نطق بطيء 🐌"
                          >
                            🐌
                          </button>
                        </div>

                        {/* Mic practice trigger */}
                        <button
                          onClick={() => startListening(phrase.german, phraseId)}
                          className={`px-4 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            isRecActive
                              ? 'bg-red border-red text-white animate-pulse'
                              : 'bg-green/10 border-green/20 text-green hover:bg-green hover:text-white'
                          }`}
                        >
                          {isRecActive ? '🎤 استمع...' : '🎙️ تدرّب'}
                        </button>

                        {/* Arabic explanation toggle */}
                        <button
                          onClick={() => setShowExplanation(prev => ({ ...prev, [phraseId]: !prev[phraseId] }))}
                          className="text-[10px] text-muted hover:text-white px-2 py-1"
                        >
                          {showExplanation[phraseId] ? '🙈 إخفاء السياق' : '💡 سياق الشرح'}
                        </button>
                      </div>

                      {/* Explanation box popup */}
                      {showExplanation[phraseId] && phrase.context && (
                        <div className="bg-gold/5 border border-gold/15 p-3 rounded-xl text-[11px] text-ink-soft leading-relaxed animate-fadeIn">
                          <p className="font-semibold text-gold mb-1">الاستعمال والشرح العامي:</p>
                          {phrase.context}
                        </div>
                      )}

                      {/* Pronunciation feedback scoring visual */}
                      {phraseFeedback && (
                        <div className={`border p-3.5 rounded-xl flex flex-col gap-2 animate-slideDown ${phraseFeedback.ratingClass}`}>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold">لفظك: {phraseFeedback.score}%</span>
                            <span className="text-[10px] font-bold">{phraseFeedback.ratingLabel}</span>
                          </div>
                          
                          <p className="text-[10px] italic" dir="ltr">
                            مسموع: "{phraseFeedback.spokenText || 'لم ينطق'}"
                          </p>

                          {/* Word pills display analysis */}
                          <div className="flex flex-wrap gap-1 mt-1 justify-start" dir="ltr">
                            {phraseFeedback.wordPills.map((wp, wIdx) => (
                              <span
                                key={wIdx}
                                className={`text-[9px] px-1.5 py-0.5 rounded font-sans font-medium ${
                                  wp.correct
                                    ? 'bg-green/20 text-green border border-green/30'
                                    : 'bg-red/20 text-red border border-red/30'
                                }`}
                              >
                                {wp.word}
                              </span>
                            ))}
                          </div>
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

    </div>
  )
}
