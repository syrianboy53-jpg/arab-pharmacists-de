import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, XCircle, Award } from 'lucide-react'
import { useXP } from '../../hooks/useXP'

import { a1Exams } from '../../data/a1Data'
import { a2Exams } from '../../data/a2Data'
import { c1Exams } from '../../data/c1Data'
import { dtzExams } from '../../data/dtzData'

const allExams = [...a1Exams, ...a2Exams, ...c1Exams, ...dtzExams]

export default function MockExamPlayer() {
  const { examId } = useParams()
  const navigate = useNavigate()
  const { addXP } = useXP()

  const [exam] = useState(allExams.find(e => e.id === examId))
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [writtenAnswer, setWrittenAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!exam) {
      // Handle not found
      navigate('/')
    }
  }, [exam, navigate])

  if (!exam) return null

  const question = exam.questions[currentQuestion]

  const handleCheck = () => {
    if (exam.type === 'schreiben' || exam.type === 'sprechen') {
      // Manual self-grading or simple completion
      setShowResult(true)
      setScore(s => s + 1)
      addXP(50)
      return
    }

    if (selectedAnswer === question.correctAnswer) {
      setScore(s => s + 1)
      addXP(10)
    }
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(c => c + 1)
      setSelectedAnswer(null)
      setWrittenAnswer('')
      setShowResult(false)
    } else {
      setFinished(true)
      addXP(100) // completion bonus
    }
  }

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="glass p-8 rounded-[2rem] border border-green-500/20 shadow-2xl">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award size={48} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-black mb-4">أحسنت! أتممت التدريب</h2>
          <p className="text-gray-500 mb-8">لقد حصلت على {score} إجابات صحيحة واكتسبت نقاط خبرة جديدة.</p>
          <Link to="/" className="inline-block bg-[#00b894] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#00a884] transition-colors">
            العودة للرئيسية
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 font-bold">
        <ArrowRight size={18} />
        عودة
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">{exam.title}</h1>
        <p className="text-gray-500">{exam.description}</p>
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden">
        {/* Progress */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
          <div className="h-full bg-[#00b894] transition-all" style={{ width: `${((currentQuestion + 1) / exam.questions.length) * 100}%` }} />
        </div>

        <div className="mt-4">
          <span className="text-sm font-bold text-[#00b894] mb-4 block">
            السؤال {currentQuestion + 1} من {exam.questions.length}
          </span>

          <div className="text-lg mb-6 whitespace-pre-wrap leading-relaxed">{question.text}</div>

          {question.audioUrl && (
            <div className="mb-6">
              <audio controls src={question.audioUrl} className="w-full" />
            </div>
          )}

          {(exam.type === 'schreiben' || exam.type === 'sprechen') ? (
            <div className="space-y-4">
              <textarea
                value={writtenAnswer}
                onChange={(e) => setWrittenAnswer(e.target.value)}
                placeholder="اكتب إجابتك هنا للتدريب..."
                className="w-full h-32 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#00b894]"
              />
            </div>
          ) : (
            <div className="space-y-3">
              {question.options?.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => !showResult && setSelectedAnswer(opt)}
                  disabled={showResult}
                  className={`w-full text-right p-4 rounded-xl border-2 transition-all font-bold ${
                    showResult
                      ? opt === question.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : opt === selectedAnswer
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-100 opacity-50'
                      : selectedAnswer === opt
                      ? 'border-[#00b894] bg-[#00b894]/5'
                      : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
          {showResult ? (
            <div className="flex-1 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {exam.type === 'schreiben' || exam.type === 'sprechen' ? (
                  <div className="text-blue-600 font-bold text-sm">
                    إجابة مقترحة: <span className="font-normal text-gray-600">{question.correctAnswer || 'تدريب حر'}</span>
                  </div>
                ) : selectedAnswer === question.correctAnswer ? (
                  <span className="text-green-500 font-bold flex items-center gap-1"><CheckCircle size={18} /> إجابة صحيحة</span>
                ) : (
                  <span className="text-red-500 font-bold flex items-center gap-1"><XCircle size={18} /> إجابة خاطئة</span>
                )}
              </div>
              <button onClick={handleNext} className="bg-[#00b894] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#00a884] transition-colors">
                {currentQuestion < exam.questions.length - 1 ? 'التالي' : 'إنهاء التدريب'}
              </button>
            </div>
          ) : (
            <div className="flex-1 flex justify-end">
              <button 
                onClick={handleCheck} 
                disabled={exam.type !== 'schreiben' && exam.type !== 'sprechen' && !selectedAnswer}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                تحقق
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
