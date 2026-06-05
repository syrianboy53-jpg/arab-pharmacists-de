import { useState, useEffect, useRef } from 'react'
import { speakingColloquialData } from '../data/speakingColloquial'

interface MessageItem {
  id: string
  speaker: 'bot' | 'user' | 'system'
  german?: string
  arabic?: string
  phonetic?: string
  feedback?: string
  points?: number
}

export default function ChatSimulatorPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(speakingColloquialData.chatScenarios[0]?.id || '')
  
  // Active scenario state
  const scenario = speakingColloquialData.chatScenarios.find(s => s.id === selectedScenarioId)
  
  // Game/Chat state
  const [currentStepId, setCurrentStepId] = useState<number>(1)
  const [chatHistory, setChatHistory] = useState<MessageItem[]>([])
  const [score, setScore] = useState<number>(0)
  const [maxScore, setMaxScore] = useState<number>(0)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({})

  const chatEndRef = useRef<HTMLDivElement>(null)

  // Start/Reset conversation
  const startConversation = () => {
    if (!scenario) return

    const firstStep = scenario.steps.find(s => s.id === 1)
    if (!firstStep) return

    // Calculate max potential score for the scenario
    let calculatedMax = 0
    scenario.steps.forEach(step => {
      const stepMax = Math.max(...step.options.map(o => o.points || 0))
      calculatedMax += stepMax
    })
    setMaxScore(calculatedMax)

    setCurrentStepId(1)
    setScore(0)
    setIsFinished(false)
    setShowTranslations({})

    // Initialize with first bot message
    setChatHistory([
      {
        id: `bot-1`,
        speaker: 'bot',
        german: firstStep.german,
        arabic: firstStep.arabic,
        phonetic: firstStep.phonetic
      }
    ])
  }

  // Restart when scenario changes
  useEffect(() => {
    startConversation()
  }, [selectedScenarioId])

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory])

  if (!scenario) {
    return (
      <div className="glass p-10 text-center rounded-2xl border border-white/5">
        <p className="text-muted text-sm">لا توجد محاكيات محادثة متاحة حالياً.</p>
      </div>
    )
  }

  const currentStep = scenario.steps.find(s => s.id === currentStepId)

  // TTS helper
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'de-DE'
      utterance.rate = 0.85
      window.speechSynthesis.speak(utterance)
    }
  }

  // Handle Option Select
  const handleSelectOption = (option: typeof scenario.steps[0]['options'][0]) => {
    // 1. Add user message
    const userMsgId = `user-${Date.now()}`
    const userMsg: MessageItem = {
      id: userMsgId,
      speaker: 'user',
      german: option.textDe,
      arabic: option.textAr
    }

    // 2. Add system feedback message
    const feedbackMsgId = `feedback-${Date.now()}`
    const feedbackMsg: MessageItem = {
      id: feedbackMsgId,
      speaker: 'system',
      feedback: option.feedback,
      points: option.points
    }

    // Update score
    setScore(prev => prev + (option.points || 0))

    // 3. Check next step
    if (option.nextStep === null) {
      // Finished
      setChatHistory(prev => [...prev, userMsg, feedbackMsg])
      setIsFinished(true)
    } else {
      const nextStep = scenario.steps.find(s => s.id === option.nextStep)
      if (nextStep) {
        const nextBotMsg: MessageItem = {
          id: `bot-${nextStep.id}-${Date.now()}`,
          speaker: 'bot',
          german: nextStep.german,
          arabic: nextStep.arabic,
          phonetic: nextStep.phonetic
        }
        setCurrentStepId(option.nextStep)
        setChatHistory(prev => [...prev, userMsg, feedbackMsg, nextBotMsg])
      } else {
        // Fallback if step not found
        setChatHistory(prev => [...prev, userMsg, feedbackMsg])
        setIsFinished(true)
      }
    }
  }

  // Calculate user performance level
  const getPerformanceBadge = () => {
    const percent = maxScore > 0 ? (score / maxScore) * 100 : 0
    if (percent >= 90) return { text: 'ألماني فصيح (Profi) 🌟', color: 'bg-green/10 text-green border-green/20' }
    if (percent >= 70) return { text: 'متحدث جيد جداً (Gut) 👍', color: 'bg-gold/10 text-gold border-gold/20' }
    return { text: 'مبتدئ يحتاج للتدريب (Übung) 📚', color: 'bg-red/10 text-red border-red/20' }
  }

  return (
    <div className="grid md:grid-cols-4 gap-6">
      
      {/* Sidebar: List of Scenarios */}
      <div className="md:col-span-1 space-y-4">
        <div className="glass p-5 rounded-2xl border border-white/5 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white border-b border-white/5 pb-2">📂 محاكيات المحادثة</h2>
          
          <div className="flex flex-col gap-2">
            {speakingColloquialData.chatScenarios.map(sc => {
              const isActive = sc.id === selectedScenarioId
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`w-full text-right p-3 rounded-xl border transition-all text-xs flex items-center justify-between gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-green/10 border-green/30 text-green font-bold'
                      : 'bg-white/5 border-white/5 text-muted hover:text-ink-soft hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{sc.icon}</span>
                    <div className="text-right">
                      <p className="font-semibold">{sc.titleAr}</p>
                      <span className="text-[10px] opacity-80" dir="ltr">{sc.difficulty}</span>
                    </div>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 bg-green rounded-full shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="md:col-span-3 space-y-4 flex flex-col h-[calc(100vh-170px)] min-h-[500px]">
        {/* Chat Header */}
        <div className="glass p-4 rounded-2xl border border-white/5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl w-10 h-10 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-center">
              {scenario.icon}
            </span>
            <div>
              <h3 className="font-bold text-white text-sm">{scenario.titleAr}</h3>
              <p className="text-[10px] text-muted">{scenario.descriptionAr}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-muted font-mono" dir="ltr">
              Diff: {scenario.difficulty}
            </span>
            <span className="bg-gold/10 border border-gold/20 px-2 py-0.5 rounded text-gold font-bold">
              النقاط: {score}
            </span>
          </div>
        </div>

        {/* Conversation Message Screen */}
        <div className="flex-1 glass border border-white/5 rounded-2xl p-5 overflow-y-auto space-y-4 shadow-inner relative min-h-[250px]">
          {chatHistory.map((msg, index) => {
            const isBot = msg.speaker === 'bot'
            const isUser = msg.speaker === 'user'
            const isSystem = msg.speaker === 'system'

            // System feedback block
            if (isSystem) {
              return (
                <div key={msg.id || index} className="flex justify-center my-2 animate-fadeIn">
                  <div className="bg-gold/5 border border-gold/20 text-ink-soft text-[11px] rounded-xl px-4 py-2 text-center max-w-[85%] leading-relaxed">
                    <span className="font-bold text-gold">نقاط الاختيار: +{msg.points} 🌟</span>
                    <p className="mt-0.5">{msg.feedback}</p>
                  </div>
                </div>
              )
            }

            // Chat bubble
            return (
              <div
                key={msg.id || index}
                className={`flex gap-2.5 max-w-[80%] items-start animate-fadeIn ${
                  isUser ? 'mr-auto flex-row-reverse' : 'ml-auto'
                }`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                  isUser 
                    ? 'bg-green/10 border border-green/20 text-green' 
                    : 'bg-white/5 border border-white/10 text-muted'
                }`}>
                  {isUser ? '👤' : scenario.icon}
                </div>

                {/* Message Body */}
                <div className="space-y-1">
                  <div className={`p-3.5 rounded-2xl text-xs space-y-1.5 shadow-sm border ${
                    isUser 
                      ? 'bg-green/10 border-green/25 text-ink-soft rounded-tr-none' 
                      : 'bg-slate-900/60 border-white/5 text-ink-soft rounded-tl-none'
                  }`}>
                    
                    {/* German Text */}
                    <div className="flex items-center justify-between gap-4" dir="ltr">
                      <p className="font-semibold text-white font-sans text-left">{msg.german}</p>
                      {isBot && (
                        <button
                          onClick={() => speak(msg.german || '')}
                          className="text-[10px] text-muted hover:text-green shrink-0 cursor-pointer"
                          title="استمع للنطق"
                        >
                          🔊
                        </button>
                      )}
                    </div>

                    {/* Phonetic Pronunciation Helper */}
                    {isBot && msg.phonetic && (
                      <p className="text-[10px] text-muted border-t border-white/5 pt-1">
                        🗣️ <span className="font-serif">{msg.phonetic}</span>
                      </p>
                    )}

                    {/* Arabic Toggle translation */}
                    {msg.arabic && (
                      <div className="border-t border-white/5 pt-1.5 space-y-1">
                        <button
                          onClick={() => setShowTranslations(prev => ({ ...prev, [msg.id]: !prev[msg.id] }))}
                          className="text-[9px] text-muted hover:text-white transition-colors cursor-pointer"
                        >
                          {showTranslations[msg.id] ? '🙈 إخفاء الترجمة' : '👁️ عرض الترجمة'}
                        </button>
                        {showTranslations[msg.id] && (
                          <p className="text-[10px] text-ink-soft leading-normal">{msg.arabic}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          
          {/* Completion summary */}
          {isFinished && (
            <div className="glass p-5 border border-gold/30 rounded-2xl max-w-md mx-auto text-center space-y-4 animate-slideDown shadow-xl mt-6">
              <span className="text-3xl">🏆</span>
              <div>
                <h4 className="text-base font-bold text-white">اكتملت المحاكاة بنجاح!</h4>
                <p className="text-xs text-muted mt-1">لقد أكملت جميع الخطوات وسجلت النقاط التالية:</p>
              </div>

              <div className="flex justify-center gap-3 items-center">
                <div className="bg-slate-900 border border-white/15 px-4 py-2 rounded-xl text-center">
                  <p className="text-[10px] text-muted">مجموع نقاطك</p>
                  <p className="text-lg font-bold text-gold">{score}</p>
                </div>
                <span className="text-muted">من أصل</span>
                <div className="bg-slate-900 border border-white/15 px-4 py-2 rounded-xl text-center">
                  <p className="text-[10px] text-muted">أعلى تقييم</p>
                  <p className="text-lg font-bold text-muted">{maxScore}</p>
                </div>
              </div>

              <div className={`px-4 py-2 rounded-xl border text-xs font-bold ${getPerformanceBadge().color}`}>
                التقييم المستحق: {getPerformanceBadge().text}
              </div>

              <button
                onClick={startConversation}
                className="w-full bg-green text-white font-bold text-xs py-2.5 rounded-xl hover:bg-green-dark transition-all cursor-pointer"
              >
                🔄 إعادة المحاكاة والتدريب
              </button>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input/Options Options Drawer */}
        <div className="shrink-0 animate-fadeIn">
          {isFinished ? null : currentStep ? (
            <div className="glass p-4 rounded-2xl border border-white/5 space-y-3 shadow-lg">
              <p className="text-xs font-bold text-gold text-right">اختر ردك أو إجابتك المناسبة للتكملة:</p>
              
              <div className="grid gap-2">
                {currentStep.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className="w-full text-right bg-white/5 hover:bg-white/10 hover:border-green/20 border border-white/10 p-3.5 rounded-xl text-xs transition-all flex flex-col gap-1.5 group cursor-pointer"
                  >
                    {/* German Option */}
                    <div className="flex items-center gap-2 w-full justify-between" dir="ltr">
                      <span className="font-sans font-bold text-white text-left group-hover:text-green transition-colors leading-relaxed">
                        {opt.textDe}
                      </span>
                      <span className="text-[10px] text-muted whitespace-nowrap opacity-60">
                        {opt.points} ن
                      </span>
                    </div>

                    {/* Arabic hint */}
                    <span className="text-[10px] text-muted leading-relaxed select-none">
                      💡 {opt.textAr}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass p-4 text-center rounded-2xl border border-white/5">
              <p className="text-xs text-muted">جاري تحميل الخطوة...</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
