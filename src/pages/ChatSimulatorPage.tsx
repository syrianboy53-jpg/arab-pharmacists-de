import { useState, useEffect, useRef } from 'react'
import { speakingColloquialData } from '../data/speakingColloquial'
import { useXP } from '../hooks/useXP'

interface MessageItem {
  id: string
  speaker: 'bot' | 'user' | 'system'
  german?: string
  arabic?: string
  phonetic?: string
  feedback?: string
  points?: number
  timestamp?: string
}

function getFormattedTime() {
  const d = new Date()
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export default function ChatSimulatorPage() {
  const { addXP } = useXP()
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
  
  // Realism States
  const [isTyping, setIsTyping] = useState<boolean>(false)

  const chatEndRef = useRef<HTMLDivElement>(null)

  // Start/Reset conversation
  const startConversation = () => {
    if (!scenario || !scenario.steps) return

    const firstStep = scenario.steps.find(s => s.id === 1)
    if (!firstStep) return

    // Calculate max potential score
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
    setIsTyping(false)

    // Delay first message for realism
    setChatHistory([])
    setIsTyping(true)
    setTimeout(() => {
      setChatHistory([
        {
          id: `bot-1`,
          speaker: 'bot',
          german: firstStep.german,
          arabic: firstStep.arabic,
          phonetic: firstStep.phonetic,
          timestamp: getFormattedTime()
        }
      ])
      setIsTyping(false)
      speak(firstStep.german || '')
    }, 1500)
  }

  useEffect(() => {
    startConversation()
  }, [selectedScenarioId])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory, isTyping])

  if (!scenario || !scenario.steps) {
    return (
      <div className="glass p-10 text-center rounded-2xl border border-gray-200 dark:border-white/5">
        <p className="text-gray-500 dark:text-gray-400 text-sm">لا توجد محاكيات محادثة متاحة حالياً.</p>
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
  const handleSelectOption = (option: any) => {
    const userMsgId = `user-${Date.now()}`
    const userMsg: MessageItem = {
      id: userMsgId,
      speaker: 'user',
      german: option.textDe,
      arabic: option.textAr,
      timestamp: getFormattedTime()
    }

    const feedbackMsgId = `feedback-${Date.now()}`
    const feedbackMsg: MessageItem = {
      id: feedbackMsgId,
      speaker: 'system',
      feedback: option.feedback,
      points: option.points
    }

    setScore(prev => prev + (option.points || 0))
    setChatHistory(prev => [...prev, userMsg, feedbackMsg])

    // Typing effect for next message
    if (option.nextStep === null) {
      setTimeout(() => {
        setIsFinished(true)
        addXP((option.points || 0) + 100) // Give big bonus XP at the end
      }, 500)
    } else {
      setIsTyping(true)
      const nextStep = scenario.steps.find(s => s.id === option.nextStep)
      
      // Calculate realistic typing time based on string length (min 1.5s, max 4s)
      const typingDuration = nextStep ? Math.min(Math.max((nextStep.german.length * 50), 1500), 4000) : 1000

      setTimeout(() => {
        if (nextStep) {
          const nextBotMsg: MessageItem = {
            id: `bot-${nextStep.id}-${Date.now()}`,
            speaker: 'bot',
            german: nextStep.german,
            arabic: nextStep.arabic,
            phonetic: nextStep.phonetic,
            timestamp: getFormattedTime()
          }
          setCurrentStepId(option.nextStep)
          setChatHistory(prev => [...prev, nextBotMsg])
          speak(nextStep.german || '')
        } else {
          setIsFinished(true)
          addXP((option.points || 0) + 100)
        }
        setIsTyping(false)
      }, typingDuration)
    }
  }

  const getPerformanceBadge = () => {
    const percent = maxScore > 0 ? (score / maxScore) * 100 : 0
    if (percent >= 90) return { text: 'ألماني فصيح (Profi) 🌟', color: 'bg-[#00b894]/10 text-[#00b894] border-[#00b894]/20' }
    if (percent >= 70) return { text: 'متحدث جيد جداً (Gut) 👍', color: 'bg-amber-100 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700/20' }
    return { text: 'مبتدئ يحتاج للتدريب (Übung) 📚', color: 'bg-red-500/10 text-red-500 border-red-500/20' }
  }

  // Chat Wallpaper CSS
  const chatBackground = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83-26.626 26.626-26.627-26.626.83-.83 25.797 25.797 25.796-25.797zm0 59.17l.83-.83-26.626-26.627-26.627 26.627.83.83 25.797-25.797 25.796 25.797zm-53.797-28.34l.83.83-26.626 26.626-26.627-26.626.83-.83 25.797 25.797 25.796-25.797z' fill='%239C92AC' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`
  }

  return (
    <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto pb-10">
      
      {/* Sidebar: List of Scenarios */}
      <div className="md:col-span-1 space-y-4">
        <div className="glass p-5 rounded-3xl border border-gray-200 dark:border-white/5 space-y-4 shadow-sm">
          <h2 className="text-base font-black text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/5 pb-3 flex items-center gap-2">
            <span>💬</span> 
            قائمة المحادثات
          </h2>
          
          <div className="flex flex-col gap-2">
            {speakingColloquialData.chatScenarios.map(sc => {
              const isActive = sc.id === selectedScenarioId
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`w-full text-right p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                    isActive
                      ? 'bg-[#00b894] border-[#00b894] text-white shadow-md'
                      : 'bg-gray-50 dark:bg-white/5 border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-white dark:bg-black/20 shadow-sm'}`}>
                      {sc.icon}
                    </span>
                    <div className="text-right">
                      <p className="font-bold text-sm leading-tight">{sc.titleAr}</p>
                      <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-gray-400'}`} dir="ltr">{sc.difficulty}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="md:col-span-3 flex flex-col h-[75vh] min-h-[600px] bg-gray-100 dark:bg-[#0f172a] rounded-[2rem] shadow-2xl border-4 border-white dark:border-gray-800 overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-2xl w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-inner">
                {scenario.icon}
              </span>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
            </div>
            <div>
              <h3 className="font-black text-gray-900 dark:text-white">{scenario.titleAr}</h3>
              <p className="text-xs text-[#00b894] font-bold">
                {isTyping ? 'يكتب الآن...' : 'متصل'}
              </p>
            </div>
          </div>
          <div className="bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 rounded-full text-amber-600 dark:text-amber-400 font-black text-sm flex items-center gap-1 shadow-sm">
            <span>🏆</span> {score}
          </div>
        </div>

        {/* Conversation Screen (WhatsApp style) */}
        <div 
          className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar" 
          style={chatBackground}
        >
          {chatHistory.map((msg, index) => {
            const isBot = msg.speaker === 'bot'
            const isUser = msg.speaker === 'user'
            const isSystem = msg.speaker === 'system'

            // System feedback block
            if (isSystem) {
              return (
                <div key={msg.id || index} className="flex justify-center my-4 animate-fadeIn">
                  <div className="bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-500/20 text-gray-700 dark:text-gray-300 text-xs rounded-2xl px-5 py-2.5 text-center max-w-[85%] shadow-sm">
                    <span className="font-black text-amber-600 dark:text-amber-400 block mb-1">نقاط الاختيار: +{msg.points} 🌟</span>
                    <p className="leading-relaxed">{msg.feedback}</p>
                  </div>
                </div>
              )
            }

            // Chat bubble
            return (
              <div
                key={msg.id || index}
                className={`flex w-full animate-fadeIn ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`relative max-w-[85%] md:max-w-[70%] p-3.5 shadow-sm text-[13px] sm:text-sm ${
                  isUser 
                    ? 'bg-[#dcf8c6] dark:bg-[#005c4b] text-gray-900 dark:text-white rounded-[20px] rounded-br-none' 
                    : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white rounded-[20px] rounded-tl-none'
                }`}>
                  
                  {/* German Text */}
                  <div className="font-semibold leading-relaxed" dir="ltr">
                    {msg.german}
                  </div>

                  {/* Audio Button for Bot */}
                  {isBot && (
                    <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-4">
                       <button
                        onClick={() => speak(msg.german || '')}
                        className="bg-gray-100 dark:bg-gray-700 hover:bg-[#00b894] hover:text-white text-gray-600 dark:text-gray-300 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-inner"
                        title="استمع"
                      >
                        ▶️
                      </button>
                      
                      {msg.phonetic && (
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-serif flex-1">
                          {msg.phonetic}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Arabic Translation Toggle */}
                  {msg.arabic && (
                    <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700/50">
                      <button
                        onClick={() => setShowTranslations(prev => ({ ...prev, [msg.id]: !prev[msg.id] }))}
                        className="text-[10px] font-bold text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        {showTranslations[msg.id] ? 'إخفاء الترجمة' : 'عرض الترجمة'}
                      </button>
                      {showTranslations[msg.id] && (
                        <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">{msg.arabic}</p>
                      )}
                    </div>
                  )}

                  {/* Meta: Time and Ticks */}
                  <div className="flex items-center justify-end gap-1 mt-1 opacity-70">
                    <span className="text-[9px] font-mono">{msg.timestamp}</span>
                    {isUser && <span className="text-[10px] text-blue-500">✔✔</span>}
                  </div>

                  {/* Tail triangle */}
                  <svg viewBox="0 0 8 13" width="8" height="13" className={`absolute top-0 ${isUser ? '-right-[8px] text-[#dcf8c6] dark:text-[#005c4b]' : '-left-[8px] text-white dark:text-gray-800'} fill-current`}>
                    {isUser 
                      ? <path d="M5.188 1H0v11.156l5.188-5.188c1.378-1.378 2.375-3.181 2.812-5.156L8 1H5.188z"/> 
                      : <path d="M1.533 3.153C.388 4.319 0 5.86 0 7.424V14h7.525V1.261L2.813 1.26a4.116 4.116 0 00-1.28.193z"/>
                    }
                  </svg>
                </div>
              </div>
            )
          })}
          
          {/* Typing Indicator */}
          {isTyping && (
             <div className="flex w-full justify-start animate-fadeIn">
              <div className="bg-white dark:bg-gray-800 rounded-[20px] rounded-tl-none p-4 shadow-sm relative text-gray-500 dark:text-gray-400">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <svg viewBox="0 0 8 13" width="8" height="13" className="absolute top-0 -left-[8px] fill-current text-white dark:text-gray-800">
                  <path d="M1.533 3.153C.388 4.319 0 5.86 0 7.424V14h7.525V1.261L2.813 1.26a4.116 4.116 0 00-1.28.193z"/>
                </svg>
              </div>
            </div>
          )}

          {/* Completion summary */}
          {isFinished && (
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 border border-[#00b894]/30 rounded-3xl max-w-sm mx-auto text-center space-y-4 shadow-2xl mt-8">
              <div className="w-16 h-16 bg-[#00b894]/10 text-[#00b894] rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
                🏆
              </div>
              <div>
                <h4 className="text-xl font-black text-gray-900 dark:text-white">المحادثة انتهت!</h4>
                <p className="text-xs text-gray-500 mt-1">لقد تم إضافة نقاط الخبرة <strong className="text-[#00b894]">XP</strong> لحسابك بنجاح.</p>
              </div>

              <div className={`px-4 py-3 rounded-xl border text-sm font-black ${getPerformanceBadge().color}`}>
                التقييم: {getPerformanceBadge().text}
              </div>

              <button
                onClick={startConversation}
                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm py-3.5 rounded-xl hover:scale-[1.02] transition-transform cursor-pointer shadow-lg"
              >
                🔄 محادثة جديدة
              </button>
            </div>
          )}
          <div ref={chatEndRef} className="h-4" />
        </div>

        {/* Input Drawer */}
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-white/10 p-4 shrink-0 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
          {isFinished ? (
            <p className="text-center text-xs font-bold text-emerald-500 py-2">المحادثة مغلقة. يمكنك إعادة تقييم نفسك.</p>
          ) : isTyping ? (
            <p className="text-center text-xs font-bold text-gray-400 py-2 animate-pulse">جاري الرد...</p>
          ) : currentStep ? (
            <div className="space-y-3">
              <p className="text-xs font-bold text-[#00b894] text-center mb-3">💬 اختر الرد المناسب للاستمرار:</p>
              
              <div className="grid gap-2">
                {currentStep.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className="w-full text-right bg-gray-50 dark:bg-[#1a1a2e] hover:bg-emerald-50 dark:hover:bg-[#00b894]/10 hover:border-emerald-200 dark:hover:border-[#00b894]/30 border border-gray-200 dark:border-white/5 p-4 rounded-2xl transition-all flex flex-col gap-1.5 group cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-2 w-full justify-between" dir="ltr">
                      <span className="font-bold text-gray-800 dark:text-gray-200 text-left group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {opt.textDe}
                      </span>
                      <span className="text-[10px] font-black text-amber-500 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                        +{opt.points}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      💡 {opt.textAr}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="text-xs text-gray-500">جاري تحميل الخطوة...</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
