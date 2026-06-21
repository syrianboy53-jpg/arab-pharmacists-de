import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CorrectionResult {
  original: string;
  corrected: string;
  message: string;
  type: 'grammar' | 'spelling' | 'style' | 'capitalization';
}

export default function AiCorrectorPage() {
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [corrections, setCorrections] = useState<CorrectionResult[]>([])
  const [score, setScore] = useState<number | null>(null)
  const [hasRun, setHasRun] = useState(false)

  // Local Rule-Based "AI" Engine
  const analyzeText = (input: string) => {
    const foundCorrections: CorrectionResult[] = []
    let currentText = input

    // Rule 1: Capitalization of Nouns (Very simplified heuristic: words ending in ung, keit, heit, schaft, ion, or typical nouns)
    const nounRegex = /\b([a-zäöüß]+)(ung|keit|heit|schaft|ion)\b/g
    let match
    while ((match = nounRegex.exec(currentText)) !== null) {
      const orig = match[0]
      const fixed = orig.charAt(0).toUpperCase() + orig.slice(1)
      if (orig !== fixed) {
        foundCorrections.push({
          original: orig,
          corrected: fixed,
          message: 'الأسماء في اللغة الألمانية يجب أن تبدأ بحرف كبير (Großschreibung).',
          type: 'capitalization'
        })
      }
    }

    // Rule 2: "gehen" uses "sein", not "haben"
    if (/\bhabe\b.*?\bgegangen\b/i.test(currentText)) {
      foundCorrections.push({
        original: 'habe ... gegangen',
        corrected: 'bin ... gegangen',
        message: 'الفعل gehen يدل على حركة، لذلك يأخذ الفعل المساعد sein في الماضي (Perfekt).',
        type: 'grammar'
      })
    }
    
    // Rule 3: "fahren" uses "sein"
    if (/\bhabe\b.*?\bgefahren\b/i.test(currentText)) {
      foundCorrections.push({
        original: 'habe ... gefahren',
        corrected: 'bin ... gefahren',
        message: 'الفعل fahren يدل على حركة، يأخذ الفعل المساعد sein.',
        type: 'grammar'
      })
    }

    // Rule 4: "interessieren in" -> "interessieren für"
    if (/\binteressiere\b.*?\bin\b/i.test(currentText)) {
      foundCorrections.push({
        original: 'interessieren in',
        corrected: 'interessieren für',
        message: 'الفعل sich interessieren يأخذ حرف الجر für.',
        type: 'grammar'
      })
    }

    // Rule 5: "weil" verb position (Very basic check: if weil is followed by verb immediately)
    if (/\bweil\s+(ich|du|er|sie|es|wir|ihr|Sie)\s+(bin|ist|habe|hat|gehe|mache)\b/i.test(currentText)) {
      foundCorrections.push({
        original: 'weil + Subjekt + Verb',
        corrected: 'weil ... Verb (am Ende)',
        message: 'بعد رابطة weil يجب أن يأتي الفعل المصرّف في نهاية الجملة (Nebensatz).',
        type: 'grammar'
      })
    }

    // Rule 6: "dass" verb position
    if (/\bdass\s+(ich|du|er|sie|es|wir|ihr|Sie)\s+(bin|ist|habe|hat|gehe|mache)\b/i.test(currentText)) {
      foundCorrections.push({
        original: 'dass + Subjekt + Verb',
        corrected: 'dass ... Verb (am Ende)',
        message: 'بعد رابطة dass يجب أن يأتي الفعل المصرّف في نهاية الجملة (Nebensatz).',
        type: 'grammar'
      })
    }

    // Rule 7: Basic capitalization of first letter
    const firstChar = currentText.trim().charAt(0)
    if (firstChar && firstChar === firstChar.toLowerCase() && /[a-zäöü]/i.test(firstChar)) {
      foundCorrections.push({
        original: firstChar,
        corrected: firstChar.toUpperCase(),
        message: 'يجب أن تبدأ الجملة بحرف كبير.',
        type: 'capitalization'
      })
    }

    // Calculate score
    const baseScore = 100
    const wordCount = currentText.split(/\s+/).length
    let penalty = foundCorrections.length * 8
    
    // Penalize if too short
    if (wordCount < 10) penalty += 20
    
    const finalScore = Math.max(0, Math.min(100, baseScore - penalty))

    return { corrections: foundCorrections, score: finalScore }
  }

  const handleCorrect = () => {
    if (text.trim().length < 5) return
    
    setIsAnalyzing(true)
    setHasRun(false)
    setProgress(0)
    setCorrections([])
    
    // Simulate AI thinking and processing
    let p = 0
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 15) + 5
      if (p >= 100) {
        clearInterval(interval)
        setProgress(100)
        
        setTimeout(() => {
          const result = analyzeText(text)
          setCorrections(result.corrections)
          setScore(result.score)
          setIsAnalyzing(false)
          setHasRun(true)
        }, 500)
      } else {
        setProgress(p)
      }
    }, 200)
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      <div className="text-center space-y-3 py-6">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-3">
          <span className="text-5xl">🤖</span> المصحح الذكي
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          اكتب رسالتك (Brief) أو نصك بالألمانية وسيقوم مساعدنا الذكي بالبحث عن الأخطاء النحوية والإملائية وتصحيحها وتقييم مستواك.
        </p>
      </div>

      {/* Input Area */}
      <div className="glass p-6 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-xl relative overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-[#00b894]/5 to-[#0984e3]/5 rotate-12 pointer-events-none"></div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex justify-between items-end">
            <label className="font-bold text-gray-700 dark:text-gray-300">النص الألماني:</label>
            <span className={`text-xs font-bold ${text.length < 30 ? 'text-orange-500' : 'text-emerald-500'}`}>
              {text.split(/\s+/).filter(w => w.length > 0).length} كلمة
            </span>
          </div>
          
          <textarea
            value={text}
            onChange={e => { setText(e.target.value); setHasRun(false) }}
            placeholder="Schreiben Sie hier Ihren Text... (z.B. Ich habe gestern in die Schule gegangen, weil ich bin krank.)"
            className="w-full h-48 p-5 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-2xl border-2 border-gray-200 dark:border-white/10 text-base resize-none focus:outline-none focus:border-[#0984e3] dark:focus:border-[#0984e3] transition-all text-gray-900 dark:text-white placeholder-gray-400 custom-scrollbar leading-relaxed"
            dir="ltr"
            disabled={isAnalyzing}
          />
          
          <button 
            onClick={handleCorrect} 
            disabled={text.trim().length < 5 || isAnalyzing}
            className={`w-full py-4 rounded-xl font-black text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${
              text.trim().length < 5 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-white/5' 
                : 'bg-gradient-to-r from-[#0984e3] to-[#00cec9] text-white hover:opacity-90 active:scale-[0.98]'
            }`}
          >
            {isAnalyzing ? (
              <>
                <span className="animate-spin text-2xl">⚙️</span> جاري التحليل...
              </>
            ) : (
              <>
                <span>✨</span> فحص النص وتصحيحه
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Progress */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass p-6 rounded-2xl border border-blue-200 dark:border-blue-900/30 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold animate-pulse text-blue-600 dark:text-blue-400">
                الذكاء الاصطناعي يقرأ النص...
              </span>
              <span className="text-sm font-black text-blue-800 dark:text-blue-300">{progress}%</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {hasRun && !isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Score Card */}
            <div className="glass p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-xl flex flex-col sm:flex-row items-center gap-8">
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200 dark:text-gray-800" />
                  <motion.circle 
                    cx="50" cy="50" r="40" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="251.2" 
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * (score || 0)) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={score && score >= 80 ? 'text-emerald-500' : score && score >= 50 ? 'text-amber-500' : 'text-red-500'} 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-gray-900 dark:text-white">{score}</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">/ 100</span>
                </div>
              </div>
              <div className="text-center sm:text-right flex-1">
                <h2 className="text-2xl font-black mb-2 text-gray-900 dark:text-white">
                  {score === 100 ? 'نص مثالي! رائع جداً 🌟' :
                   score && score >= 80 ? 'نص جيد جداً مع أخطاء طفيفة 👍' :
                   score && score >= 50 ? 'مستوى متوسط، يحتاج للمزيد من التركيز 📚' :
                   'يوجد الكثير من الأخطاء الأساسية، استمر بالتدرب 💪'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  هذا التقييم يعتمد على تحليل القواعد، تكبير الأحرف، وبنية الجملة الخاصة بمستوى B1. 
                  {corrections.length === 0 ? ' لم يتم العثور على أية أخطاء ضمن القواعد التي تم فحصها.' : ` تم العثور على ${corrections.length} ملاحظة.`}
                </p>
              </div>
            </div>

            {/* Corrections List */}
            {corrections.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-black flex items-center gap-2 text-gray-900 dark:text-white">
                  🔍 التفاصيل والتصحيح
                </h3>
                {corrections.map((c, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="glass rounded-2xl p-5 border border-red-100 dark:border-red-900/20"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start gap-2 text-red-500 bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-100 dark:border-red-900/30">
                          <span className="font-bold mt-0.5">✗</span>
                          <span className="font-mono text-sm line-through" dir="ltr">{c.original}</span>
                        </div>
                        <div className="flex items-start gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                          <span className="font-bold mt-0.5">✓</span>
                          <span className="font-mono font-bold text-sm" dir="ltr">{c.corrected}</span>
                        </div>
                      </div>
                      <div className="md:w-1/3 bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 h-full">
                        <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">{c.type}</div>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300 leading-relaxed">{c.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Try standard examples if no text was written */}
            {text.length > 0 && corrections.length === 0 && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/30 text-center">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-black text-emerald-700 dark:text-emerald-400">ممتاز! لم يجد الذكاء الاصطناعي أي أخطاء شائعة.</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-500 mt-2">جرّب كتابة جملة خاطئة عمداً لاختبار قدرات المحرك (مثال: Ich habe in die Schule gegangen).</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}