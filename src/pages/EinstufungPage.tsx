import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

interface Question {
  q: string
  level: string
  opts: string[]
  correct: number
  explain: string
}

const questions: Question[] = [
  {
    q: 'Ich ___ ein Buch.',
    level: 'A1',
    opts: ['lesen', 'lese', 'liest', 'lest'],
    correct: 1,
    explain: 'الفاعل Ich يأخذ النهاية e للفعل المضارع (ich lese).'
  },
  {
    q: 'Woher ___ du?',
    level: 'A1',
    opts: ['kommen', 'kommt', 'kommst', 'komme'],
    correct: 2,
    explain: 'الفاعل du يأخذ النهاية st للفعل المضارع (du kommst).'
  },
  {
    q: 'Ich helfe ___ Kind.',
    level: 'A2',
    opts: ['das', 'dem', 'den', 'des'],
    correct: 1,
    explain: 'الفعل helfen يتطلب حالة المجرور Dativ. الاسم المحايد das Kind يصبح dem Kind.'
  },
  {
    q: 'Ich gehe in ___ Stadt.',
    level: 'A2',
    opts: ['die', 'der', 'das', 'den'],
    correct: 0,
    explain: 'هنا حركة (Wohin) إلى أين؟ نستخدم حالة النصب Akkusativ. الاسم المؤنث die Stadt يبقى die Stadt.'
  },
  {
    q: 'Ich habe das Auto ___ Vater gegeben.',
    level: 'A2',
    opts: ['meinen', 'meinem', 'meines', 'mein'],
    correct: 1,
    explain: 'الفعل geben يعطي المفعول لأجله Dativ (الأب) ومفعولاً به Akkusativ (السيارة). الأب مذكر Dativ -> meinem Vater.'
  },
  {
    q: 'Ich freue mich ___ deinen Brief.',
    level: 'B1',
    opts: ['auf', 'über', 'an', 'für'],
    correct: 1,
    explain: 'حرف الجر über مع sich freuen يعني الفرح بشيء حدث في الماضي أو الحاضر (رسالتك التي وصلتني).'
  },
  {
    q: '___ des schlechten Wetters gingen wir spazieren.',
    level: 'B1',
    opts: ['Wegen', 'Trotz', 'Während', 'Anstatt'],
    correct: 1,
    explain: 'Trotz تعني بالرغم من وتطلب حالة المضاف إليه Genitiv. (بالرغم من الطقس السيء ذهبنا للمشي).'
  },
  {
    q: 'Ich bin hier, ___ Deutsch zu lernen.',
    level: 'B1',
    opts: ['um', 'damit', 'weil', 'dass'],
    correct: 0,
    explain: 'التركيب um ... zu يعني من أجل القيام بشيء (um Deutsch zu lernen).'
  },
  {
    q: 'Wenn ich Zeit ___ , würde ich reisen.',
    level: 'B1',
    opts: ['habe', 'hätte', 'hatte', 'hast'],
    correct: 1,
    explain: 'شرط افتراضي غير واقعي في الحاضر يستوجب استخدام Konjunktiv II للفعل haben وهو (hätte).'
  },
  {
    q: 'Sie ist müde, ___ sie hat viel gearbeitet.',
    level: 'B1',
    opts: ['weil', 'denn', 'obwohl', 'dass'],
    correct: 1,
    explain: 'denn تعطي معنى "لأن" وتأتي بترتيب الجملة الأساسية (V2) بينما weil تأخذ الفعل للنهاية.'
  },
  {
    q: 'Das ist der Mann, ___ Hund bellt.',
    level: 'B2',
    opts: ['den', 'dem', 'dessen', 'deren'],
    correct: 2,
    explain: 'dessen هي أداة موصول للملكية للمفرد المذكر (الذي ينبح كلبه).'
  },
  {
    q: 'Je mehr du lernst, ___ besser wirst du.',
    level: 'B2',
    opts: ['desto', 'so', 'als', 'wie'],
    correct: 0,
    explain: 'التركيب المزدوج Je ... desto يعني كلما... كلما... ويتطلب الصفة بصيغة المقارنة.'
  },
  {
    q: 'Er tut so, als ___ er krank.',
    level: 'B2',
    opts: ['ist', 'war', 'wäre', 'sei'],
    correct: 2,
    explain: 'als ob أو als تعني كأن وتتطلب حالة التمني/الافتراض Konjunktiv II (wäre).'
  },
  {
    q: 'Nachdem er gegessen ___ , ging er schlafen.',
    level: 'B2',
    opts: ['hatte', 'hat', 'würde', 'war'],
    correct: 0,
    explain: 'بعد nachdem إذا كانت الجملة الأساسية في الماضي البسيط Präteritum (ging)، فإن جملة nachdem تأتي بالماضي التام Plusquamperfekt (hatte gegessen).'
  },
  {
    q: 'Er wurde ___ einem Arzt untersucht.',
    level: 'B2',
    opts: ['von', 'durch', 'mit', 'bei'],
    correct: 0,
    explain: 'في المبني للمجهول Passiv، يشار للفاعل العاقل بـ von + Dativ (von einem Arzt).'
  }
]

export default function EinstufungPage() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [finished, setFinished] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Canvas confetti animation
  useEffect(() => {
    if (finished && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const colors = ['#0F7B3E', '#CE1126', '#C9A96E', '#3b82f6', '#eab308']
      const particles = Array.from({ length: 150 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0
      }))

      let animationFrameId: number

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particles.forEach((p) => {
          p.tiltAngle += p.tiltAngleIncremental
          p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2
          p.x += Math.sin(p.tiltAngle)
          p.tilt = Math.sin(p.tiltAngle - p.r / 2) * 5

          ctx.beginPath()
          ctx.lineWidth = p.r
          ctx.strokeStyle = p.color
          ctx.moveTo(p.x + p.tilt + p.r / 2, p.y)
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2)
          ctx.stroke()
        })

        // loop particles that go below canvas
        particles.forEach((p) => {
          if (p.y > canvas.height) {
            p.x = Math.random() * canvas.width
            p.y = -20
            p.tilt = Math.random() * 10 - 5
          }
        })

        animationFrameId = requestAnimationFrame(draw)
      }

      draw()

      const handleResize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      window.addEventListener('resize', handleResize)

      // Stop confetti after 5 seconds
      const timer = setTimeout(() => {
        cancelAnimationFrame(animationFrameId)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }, 6000)

      return () => {
        cancelAnimationFrame(animationFrameId)
        window.removeEventListener('resize', handleResize)
        clearTimeout(timer)
      }
    }
  }, [finished])

  const handleAnswer = (idx: number) => {
    if (answered) return
    setSelectedAnswer(idx)
    setAnswered(true)
    if (idx === questions[currentIdx].correct) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      setFinished(true)
      // Save level locally
      const lvl = getLevel(score + (selectedAnswer === questions[currentIdx].correct ? 1 : 0))
      localStorage.setItem('b1_placement_level', lvl)
    }
  }

  const getLevel = (finalScore: number) => {
    if (finalScore <= 4) return 'A1'
    if (finalScore <= 8) return 'A2'
    if (finalScore <= 12) return 'B1'
    return 'B2'
  }

  const getLevelDescription = (lvl: string) => {
    switch (lvl) {
      case 'A1':
        return 'مستواك الحالي هو A1 (مبتدئ). ننصحك بالتركيز على حفظ المفردات الأساسية وتصريف الأفعال المضارعة وتكوين الجمل البسيطة.'
      case 'A2':
        return 'مستواك الحالي هو A2 (أساسي). أنت جاهز لدراسة حالات المجرور والمنصوب، الجمل الفرعية البسيطة، واستخدام الأفعال المنفصلة.'
      case 'B1':
        return 'مستواك الحالي هو B1 (متوسط). رائع! أنت على وشك إتقان الألمانية اللازمة لامتحان Telc B1. ركز على جمل الوصل (Relativsätze) وحروف الجرّ المعقدة.'
      default:
        return 'مستواك الحالي هو B2 (متقدم). ممتاز جداً! مستواك يتجاوز B1. يمكنك الانتقال مباشرة لدراسة موضوعات B2 وقراءة النصوص الطويلة.'
    }
  }

  const handleShare = () => {
    const finalLevel = getLevel(score)
    const shareText = `لقد أجريت اختبار تحديد مستوى اللغة الألمانية على موقع B1-Syrer، ومستواي التقريبي هو ${finalLevel}! جرّب الاختبار التفاعلي الآن مجاناً 🚀`
    if (navigator.share) {
      navigator
        .share({
          title: 'اختبار تحديد المستوى - B1-Syrer',
          text: shareText,
          url: window.location.origin + '/#/einstufung'
        })
        .catch((err) => console.log('Error sharing:', err))
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.origin + '/#/einstufung')
      alert('تم نسخ نص النتيجة ورابط المشاركة إلى الحافظة! 🎉')
    }
  }

  if (finished) {
    const finalLevel = getLevel(score)
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-8 relative">
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 w-full h-full" />
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 text-center shadow-xl border border-gray-100 dark:border-gray-700 animate-fadeIn">
          <div className="inline-block p-4 bg-gold/10 text-gold rounded-full mb-6">
            <span className="text-5xl">🏆</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">اكتمل اختبار تحديد المستوى!</h1>
          <p className="text-muted text-sm md:text-base mb-8">
            أجبت بشكل صحيح على <span className="font-bold text-green">{score}</span> من أصل <span className="font-bold">{questions.length}</span> أسئلة.
          </p>

          <div className="bg-green/5 dark:bg-green/10 border-2 border-green/30 rounded-2xl p-6 max-w-sm mx-auto mb-8">
            <div className="text-xs text-muted font-bold mb-1">مستواك التقريبي هو:</div>
            <div className="text-6xl font-black text-green leading-none">{finalLevel}</div>
          </div>

          <p className="text-sm md:text-base text-ink-soft dark:text-gray-300 leading-relaxed mb-8 max-w-md mx-auto">
            {getLevelDescription(finalLevel)}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleShare}
              className="bg-gold hover:bg-gold/90 text-white font-bold px-8 py-3 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              <span>📢 مشاركة النتيجة</span>
            </button>
            <Link
              to="/"
              className="bg-green hover:bg-green-dark text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              📚 بدء الدراسة الآن
            </Link>
          </div>

          <button
            onClick={() => {
              setCurrentIdx(0)
              setScore(0)
              setSelectedAnswer(null)
              setAnswered(false)
              setFinished(false)
            }}
            className="text-muted hover:text-ink text-sm font-bold mt-6 underline block mx-auto transition-colors"
          >
            إعادة الاختبار 🔄
          </button>
        </div>
      </div>
    )
  }

  const q = questions[currentIdx]
  const progress = (currentIdx + 1) / questions.length

  return (
    <div className="max-w-2xl mx-auto p-4 animate-fadeIn">
      {/* Navigation & Header */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="text-green hover:text-green-dark font-bold flex items-center gap-1">
          <span>←</span> <span>الرئيسية</span>
        </Link>
        <span className="text-muted text-sm font-bold">تحديد المستوى 📊</span>
      </div>

      {/* Progress Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-muted font-semibold">
            سؤال {currentIdx + 1} من {questions.length}
          </span>
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold px-2.5 py-1 rounded-md">
            {q.level}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden mb-6">
          <div
            className="bg-green h-full transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Question Text */}
        <h2 className="text-xl md:text-2xl font-bold text-center py-6 leading-relaxed border-b border-gray-50 dark:border-gray-700" dir="ltr">
          {q.q}
        </h2>

        {/* Options Grid */}
        <div className="grid gap-3 mt-6">
          {q.opts.map((opt, i) => {
            const isCorrect = i === q.correct
            const isSelected = selectedAnswer === i

            let btnClass =
              'w-full text-left p-4 rounded-xl font-bold border-2 transition-all flex justify-between items-center text-lg '

            if (answered) {
              if (isCorrect) {
                btnClass += 'border-green bg-green/10 text-green-dark dark:text-green-300'
              } else if (isSelected) {
                btnClass += 'border-red bg-red/10 text-red dark:text-red-300'
              } else {
                btnClass += 'border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 opacity-60 text-muted'
              }
            } else {
              btnClass += 'border-gray-200 dark:border-gray-700 hover:border-green hover:bg-green/5'
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={answered}
                className={btnClass}
                dir="ltr"
              >
                <span>{opt}</span>
                {answered && isCorrect && <span className="text-green text-xl">✓</span>}
                {answered && isSelected && !isCorrect && <span className="text-red text-xl">✗</span>}
              </button>
            )
          })}
        </div>

        {/* Explanation Card */}
        {answered && (
          <div className="mt-6 p-4 bg-gold/5 dark:bg-gold/10 border border-gold/20 rounded-xl flex gap-3 animate-fadeIn">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-bold text-gold text-sm mb-1">الشرح بالعربية:</h4>
              <p className="text-sm text-ink-soft dark:text-gray-300 leading-relaxed">{q.explain}</p>
            </div>
          </div>
        )}

        {/* Next Button */}
        {answered && (
          <button
            onClick={handleNext}
            className="w-full mt-6 bg-green hover:bg-green-dark text-white font-bold py-4 rounded-xl text-center transition-colors shadow-md text-lg"
          >
            {currentIdx < questions.length - 1 ? 'السؤال التالي ➡️' : 'عرض النتيجة 🏆'}
          </button>
        )}
      </div>
    </div>
  )
}
