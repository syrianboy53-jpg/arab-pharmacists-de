import { useState, useEffect, useRef } from 'react'

const practiceSentences = [
  "Ich heiße Ahmad und ich komme aus Syrien.",
  "Ich wohne in Berlin seit drei Jahren.",
  "Ich lerne Deutsch, weil ich hier arbeiten möchte.",
  "Ich habe einen Termin beim Arzt.",
  "Entschuldigung, wie komme ich zum Bahnhof?",
  "Ich brauche eine Bescheinigung vom Arbeitgeber.",
  "Ich möchte einen Antrag stellen.",
  "Können Sie mir bitte helfen?",
  "Ich spreche ein bisschen Deutsch und fließend Arabisch.",
  "Das ist eine sehr gute Frage."
]

export default function PronunciationLabPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [score, setScore] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check browser support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError("متصفحك لا يدعم ميزة التعرف على الصوت. يرجى استخدام Google Chrome.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'de-DE'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript
      setTranscript(result)
      evaluatePronunciation(practiceSentences[currentIndex], result)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error)
      setIsRecording(false)
      setError("حدث خطأ أثناء الاستماع. تأكد من إعطاء صلاحية الميكروفون.")
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition
  }, [currentIndex])

  const evaluatePronunciation = (target: string, spoken: string) => {
    // Simple evaluation: normalize both strings and count matching words
    const normalize = (s: string) => s.toLowerCase().replace(/[.,?!]/g, '').trim().split(/\s+/)
    const targetWords = normalize(target)
    const spokenWords = normalize(spoken)

    let matchCount = 0
    targetWords.forEach(word => {
      if (spokenWords.includes(word)) matchCount++
    })

    const finalScore = Math.round((matchCount / targetWords.length) * 100)
    setScore(finalScore)
  }

  const toggleRecording = () => {
    setError(null)
    if (isRecording) {
      recognitionRef.current?.stop()
      setIsRecording(false)
    } else {
      setTranscript('')
      setScore(null)
      recognitionRef.current?.start()
      setIsRecording(true)
    }
  }

  const renderTargetWords = () => {
    if (!transcript) return <p className="text-2xl font-bold">{practiceSentences[currentIndex]}</p>

    const targetWords = practiceSentences[currentIndex].split(' ')
    const spokenWords = transcript.toLowerCase().replace(/[.,?!]/g, '').trim().split(/\s+/)

    return (
      <p className="text-2xl font-bold flex flex-wrap justify-center gap-2">
        {targetWords.map((word, i) => {
          const cleanWord = word.toLowerCase().replace(/[.,?!]/g, '')
          const isCorrect = spokenWords.includes(cleanWord)
          return (
            <span key={i} className={isCorrect ? "text-green-500" : "text-red-500 line-through opacity-70"}>
              {word}
            </span>
          )
        })}
      </p>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">مختبر النطق الذكي 🎙️</h1>
        <p className="text-gray-500 dark:text-gray-400">تدرب على النطق الصحيح للقسم الشفهي. اقرأ الجملة بصوت واضح.</p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6 text-center font-bold">
          {error}
        </div>
      )}

      <div className="glass-panel rounded-3xl p-8 text-center relative overflow-hidden">
        <div className="mb-12">
          <span className="text-sm font-bold text-gray-400 mb-4 block">الجملة المطلوبة:</span>
          {renderTargetWords()}
        </div>

        {transcript && (
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <span className="text-sm font-bold text-gray-400 mb-2 block">ما سمعناه:</span>
            <p className="text-lg italic text-gray-700 dark:text-gray-300">"{transcript}"</p>
          </div>
        )}

        {score !== null && (
          <div className="mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${score >= 80 ? 'border-green-500 text-green-500' : score >= 50 ? 'border-yellow-500 text-yellow-500' : 'border-red-500 text-red-500'}`}>
              <span className="text-3xl font-bold">{score}%</span>
            </div>
            <p className="mt-4 font-bold">
              {score >= 80 ? 'ممتاز! نطقك رائع 🌟' : score >= 50 ? 'جيد، لكن يمكنك التحسن 👍' : 'حاول مرة أخرى، اقرأ ببطء ووضوح 🔄'}
            </p>
          </div>
        )}

        <div className="flex justify-center items-center gap-6 mt-8">
          <button 
            onClick={() => {
              setCurrentIndex(prev => (prev > 0 ? prev - 1 : practiceSentences.length - 1))
              setTranscript('')
              setScore(null)
            }}
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            ← السابق
          </button>

          <button
            onClick={toggleRecording}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isRecording 
                ? 'bg-red-500 animate-pulse scale-110' 
                : 'bg-green hover:bg-green-dark'
            }`}
          >
            <span className="text-3xl text-white">{isRecording ? '⏹️' : '🎙️'}</span>
          </button>

          <button 
            onClick={() => {
              setCurrentIndex(prev => (prev < practiceSentences.length - 1 ? prev + 1 : 0))
              setTranscript('')
              setScore(null)
            }}
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            التالي →
          </button>
        </div>
      </div>
    </div>
  )
}
