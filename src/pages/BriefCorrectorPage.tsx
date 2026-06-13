import { useState } from 'react'
import { motion } from 'framer-motion'

const commonMistakes = [
  { wrong: /ich bin (gehen|essen|trinken|schreiben|machen)/gi, correct: 'ich $1e', feedback: 'نستخدم الفعل مباشرة، لا نستخدم "bin" مع الأفعال العادية إلا في حالة المبني للمجهول (Passiv) أو الماضي (Perfekt).' },
  { wrong: /weil ich (bin|habe|kann|muss) (.*)/gi, correct: 'weil ich $2 $1', feedback: 'بعد "weil" يأتي الفعل المصرف في نهاية الجملة.' },
  { wrong: /\b(die|das) brief\b/gi, correct: 'der Brief', feedback: 'كلمة Brief مذكر (der).' },
  { wrong: /\b(der|das) e-mail\b/gi, correct: 'die E-Mail', feedback: 'كلمة E-Mail مؤنث (die).' },
  { wrong: /\bsehr viel danke\b/gi, correct: 'vielen Dank', feedback: 'التعبير الصحيح هو "Vielen Dank" أو "Danke sehr".' },
  { wrong: /\bich freue mich auf (dich|euch|sie|ihn) zu sehen\b/gi, correct: 'ich freue mich darauf, $1 zu sehen', feedback: 'نستخدم "darauf" قبل الفعل المصدر مع zu.' }
]

export default function BriefCorrectorPage() {
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{ original: string, corrected: string, feedbacks: string[] } | null>(null)

  const analyzeText = () => {
    if (!text.trim()) return

    setIsAnalyzing(true)
    setResult(null)

    // Simulate AI delay
    setTimeout(() => {
      let corrected = text
      const feedbacks: string[] = []

      // Basic rule-based correction
      commonMistakes.forEach(rule => {
        if (rule.wrong.test(corrected)) {
          corrected = corrected.replace(rule.wrong, rule.correct)
          feedbacks.push(rule.feedback)
        }
      })

      // Capitalize first letters of sentences
      corrected = corrected.replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase())

      // Capitalize nouns (basic heuristic: words after articles)
      corrected = corrected.replace(/\b(der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines)\s+([a-zäöüß]+)/gi, (_match, article, noun) => {
        return `${article} ${noun.charAt(0).toUpperCase() + noun.slice(1)}`
      })

      if (corrected === text && feedbacks.length === 0) {
        feedbacks.push('ممتاز! النص يبدو جيداً ولا توجد أخطاء واضحة.')
      }

      setResult({ original: text, corrected, feedbacks })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">المصحح الذكي للرسائل 🤖</h1>
        <p className="text-gray-500 dark:text-gray-400">اكتب رسالة B1 (Brief) وسيقوم الذكاء الاصطناعي بتحليلها وتصحيحها وإعطائك نصائح.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">نص الرسالة:</label>
          <textarea
            className="w-full h-80 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green focus:border-transparent resize-none shadow-sm transition-all"
            placeholder="Sehr geehrte Damen und Herren,..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          
          <button
            onClick={analyzeText}
            disabled={isAnalyzing || !text.trim()}
            className="w-full py-4 bg-gradient-to-r from-green to-green-dark hover:from-green-dark hover:to-green text-white font-bold rounded-2xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                جاري التحليل...
              </>
            ) : (
              '🔍 فحص وتصحيح'
            )}
          </button>
        </div>

        <div>
          {result ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass-panel p-6 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30">
                <h3 className="font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                  <span>✨</span> النص المصحح:
                </h3>
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {result.corrected}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">💡 ملاحظات وتوجيهات:</h3>
                <ul className="space-y-3">
                  {result.feedbacks.map((feedback, idx) => (
                    <li key={idx} className="flex gap-3 text-sm">
                      <span className="text-blue-500 mt-0.5">ℹ️</span>
                      <span className="text-gray-600 dark:text-gray-300">{feedback}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
              <div>
                <span className="text-4xl block mb-4">📝</span>
                <p>اكتب رسالتك في المربع واضغط على فحص لعرض النتيجة هنا.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
