import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { commonMistakes } from '../data/grammar'

interface MistakeItem {
  id: string
  category: string
  level: string
  titleAr: string
  wrong: string
  right: string
  whyAr: string
  ruleAr: string
  tipAr?: string
  examples?: { wrong: string; right: string; ar: string }[]
}

export default function FehlerPage() {
  const [mistakesPool, setMistakesPool] = useState<MistakeItem[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    if (Array.isArray(commonMistakes)) {
      setMistakesPool(commonMistakes as MistakeItem[])
    }
  }, [])

  const handleNext = () => {
    if (currentIdx < mistakesPool.length - 1) {
      setCurrentIdx((i) => i + 1)
      setFlipped(false)
    }
  }

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((i) => i - 1)
      setFlipped(false)
    }
  }

  const handleShare = () => {
    const item = mistakesPool[currentIdx]
    const shareText = `تعلّم تجنّب هذا الخطأ الشائع في الألمانية:
❌ خطأ: ${item.wrong}
✅ صحيح: ${item.right}
شاهد الشرح والتفاصيل على B1-Syrer! 📚`
    if (navigator.share) {
      navigator
        .share({
          title: 'أخطاء شائعة في الألمانية - B1-Syrer',
          text: shareText,
          url: window.location.origin + '/#/fehler'
        })
        .catch((err) => console.log('Error sharing:', err))
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.origin + '/#/fehler')
      alert('تم نسخ نص الخطأ ورابط المشاركة إلى الحافظة! 🎉')
    }
  }

  if (mistakesPool.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green border-t-transparent"></div>
      </div>
    )
  }

  const item = mistakesPool[currentIdx]

  return (
    <div className="max-w-2xl mx-auto p-4 animate-fadeIn">
      {/* Navigation & Header */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="text-green hover:text-green-dark font-bold flex items-center gap-1">
          <span>←</span> <span>الرئيسية</span>
        </Link>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full hover:bg-gold/20 transition-colors"
          >
            📢 مشاركة البطاقة
          </button>
          <span className="text-muted text-sm font-bold">أخطاء شائعة 📐</span>
        </div>
      </div>

      {/* Progress Info */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-muted font-bold">
          البطاقة {currentIdx + 1} من {mistakesPool.length}
        </span>
        <div className="flex gap-2">
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold px-2 py-0.5 rounded-md">
            {item.level}
          </span>
          <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs font-bold px-2 py-0.5 rounded-md capitalize">
            {item.category}
          </span>
        </div>
      </div>

      {/* Flip Card Container */}
      <div
        className="relative min-h-[380px] w-full cursor-pointer perspective-1000 mb-8"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`absolute inset-0 w-full h-full rounded-3xl shadow-lg border border-gray-100 dark:border-white/5 transition-transform duration-500 transform-style-3d ${
            flipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* CARD FRONT */}
          <div className="absolute inset-0 w-full h-full rounded-3xl bg-white dark:bg-[#1a1a2e] backface-hidden p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="text-center mb-6">
                <span className="bg-red/10 text-red text-xs font-bold px-3 py-1 rounded-full">خطأ شائع احذره! ⚠️</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-ink-soft dark:text-gray-200 text-center leading-relaxed mb-8">
                {item.titleAr}
              </h3>

              {/* Wrong Sentence Box */}
              <div className="bg-red/5 border border-red/20 rounded-2xl p-4 mb-4 flex items-center gap-3">
                <span className="text-2xl text-red">❌</span>
                <div className="flex-1">
                  <div className="text-xs text-red font-bold mb-0.5" dir="ltr">Falsch:</div>
                  <p className="text-base font-bold text-red dark:text-red-400 font-mono" dir="ltr">
                    {item.wrong}
                  </p>
                </div>
              </div>

              {/* Right Sentence Box */}
              <div className="bg-green/5 border border-green/20 rounded-2xl p-4 flex items-center gap-3">
                <span className="text-2xl text-green">✓</span>
                <div className="flex-1">
                  <div className="text-xs text-green font-bold mb-0.5" dir="ltr">Richtig:</div>
                  <p className="text-base font-bold text-green-dark dark:text-green-400 font-mono" dir="ltr">
                    {item.right}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-muted font-bold mt-4 animate-pulse">
              اضغط على البطاقة لعرض الشرح والقاعدة النحوية 🔄
            </div>
          </div>

          {/* CARD BACK */}
          <div className="absolute inset-0 w-full h-full rounded-3xl bg-gray-50 dark:bg-gray-750 backface-hidden rotate-y-180 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <h3 className="font-bold text-green mb-3 border-b border-gray-200 dark:border-white/5 pb-2">
                لماذا حدث هذا الخطأ؟ 🧐
              </h3>
              <p className="text-sm text-ink-soft dark:text-gray-300 leading-relaxed mb-4">
                {item.whyAr}
              </p>

              <h3 className="font-bold text-gold mb-2">القاعدة النحوية 📝</h3>
              <p className="text-sm text-ink-soft dark:text-gray-300 leading-relaxed mb-4">
                {item.ruleAr}
              </p>

              {item.tipAr && (
                <div className="p-3 bg-green/5 rounded-xl border border-green/10 text-xs text-green-dark dark:text-green-300 leading-relaxed">
                  💡 <strong>نصيحة للحفظ:</strong> {item.tipAr}
                </div>
              )}
            </div>

            <div className="text-center text-xs text-muted font-bold mt-4">
              اضغط للعودة إلى واجهة البطاقة 🔄
            </div>
          </div>
        </div>
      </div>

      {/* Additional Examples list */}
      {item.examples && item.examples.length > 0 && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 mb-8 animate-fadeIn">
          <h3 className="font-bold text-base mb-4 border-b border-gray-100 dark:border-white/5 pb-2">
            📋 أمثلة وتطبيقات إضافية:
          </h3>
          <div className="space-y-4">
            {item.examples.map((ex, idx) => (
              <div key={idx} className="p-3 bg-gray-50 dark:bg-[#1a1a2e]/30 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center text-xs text-muted mb-1">
                  <span>مثال {idx + 1}</span>
                  <span className="font-bold">{ex.ar}</span>
                </div>
                <div className="flex flex-col gap-1 mt-1 font-mono text-xs md:text-sm" dir="ltr">
                  <div className="text-red-600 dark:text-red-400">❌ {ex.wrong}</div>
                  <div className="text-green-700 dark:text-green-400 font-bold">✓ {ex.right}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-4 justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className={`px-6 py-3 rounded-xl font-bold transition-colors border-2 ${
            currentIdx === 0
              ? 'border-gray-200 dark:border-gray-750 text-gray-300 cursor-not-allowed'
              : 'border-green text-green hover:bg-green hover:text-white'
          }`}
        >
          ⬅️ السابق
        </button>

        <button
          onClick={handleNext}
          disabled={currentIdx === mistakesPool.length - 1}
          className={`px-6 py-3 rounded-xl font-bold transition-colors border-2 ${
            currentIdx === mistakesPool.length - 1
              ? 'border-gray-200 dark:border-gray-750 text-gray-300 cursor-not-allowed'
              : 'border-green text-green hover:bg-green hover:text-white'
          }`}
        >
          التالي ➡️
        </button>
      </div>
    </div>
  )
}
