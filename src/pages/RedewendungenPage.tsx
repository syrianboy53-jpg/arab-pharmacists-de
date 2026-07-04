import { useState } from 'react'
import { Link } from 'react-router-dom'

const idioms = [
  { de: 'Daumen drücken', literal: 'الضغط على الإبهام', meaning: 'تمنّي الحظ الجيد', example: 'Ich drücke dir die Daumen für die Prüfung!', exampleAr: 'أتمنى لك الحظ في الامتحان!', emoji: '👍' },
  { de: 'die Nase voll haben', literal: 'الأنف ممتلئ', meaning: 'طفح الكيل / ملّ من شيء', example: 'Ich habe die Nase voll von diesem Wetter!', exampleAr: 'طفح كيلي من هذا الطقس!', emoji: '😤' },
  { de: 'Schwein haben', literal: 'عنده خنزير', meaning: 'كان محظوظاً', example: 'Du hast Schwein gehabt — der Zug war fast weg!', exampleAr: 'كنت محظوظاً — القطار كان على وشك المغادرة!', emoji: '🐷' },
  { de: 'den Faden verlieren', literal: 'فقد الخيط', meaning: 'نسي ما كان يقوله', example: 'Entschuldigung, ich habe den Faden verloren.', exampleAr: 'عذراً، نسيت ما كنت أقوله.', emoji: '🧵' },
  { de: 'auf dem Holzweg sein', literal: 'على الطريق الخشبي', meaning: 'مخطئ تماماً', example: 'Wenn du das denkst, bist du auf dem Holzweg.', exampleAr: 'إذا كنت تظن ذلك، فأنت مخطئ تماماً.', emoji: '🌲' },
  { de: 'ins Fettnäpfchen treten', literal: 'الدوس في وعاء الدهن', meaning: 'ارتكب خطأ اجتماعياً', example: 'Ich bin ins Fettnäpfchen getreten, als ich nach seinem Alter gefragt habe.', exampleAr: 'ارتكبت خطأ اجتماعياً عندما سألت عن عمره.', emoji: '😬' },
  { de: 'Tomaten auf den Augen haben', literal: 'عنده طماطم على عيونه', meaning: 'لا يرى الواضح', example: 'Hast du Tomaten auf den Augen? Das Schild ist riesig!', exampleAr: 'ألا ترى؟ اللافتة ضخمة!', emoji: '🍅' },
  { de: 'um den heißen Brei reden', literal: 'يتحدث حول العصيدة الساخنة', meaning: 'يتحدث بلف ودوران', example: 'Hör auf, um den heißen Brei zu reden!', exampleAr: 'توقف عن اللف والدوران!', emoji: '🥣' },
  { de: 'jemandem die Daumen drücken', literal: 'يضغط الإبهام لشخص', meaning: 'يتمنى له النجاح', example: 'Wir drücken dir die Daumen!', exampleAr: 'نتمنى لك التوفيق!', emoji: '🤞' },
  { de: 'Ich verstehe nur Bahnhof', literal: 'لا أفهم إلا محطة قطار', meaning: 'لا أفهم أي شيء!', example: 'Der Professor redet so schnell — ich verstehe nur Bahnhof.', exampleAr: 'البروفيسور يتكلم بسرعة — لا أفهم شيئاً.', emoji: '🚂' },
  { de: 'Das ist nicht mein Bier', literal: 'هذه ليست بيرتي', meaning: 'هذا ليس من شأني', example: 'Was er in seiner Freizeit macht, ist nicht mein Bier.', exampleAr: 'ما يفعله في وقت فراغه ليس من شأني.', emoji: '🍺' },
  { de: 'die Kirche im Dorf lassen', literal: 'ترك الكنيسة في القرية', meaning: 'لا تبالغ!', example: 'Lass mal die Kirche im Dorf — es ist nicht so schlimm.', exampleAr: 'لا تبالغ — الأمر ليس بهذا السوء.', emoji: '⛪' },
  { de: 'auf Wolke sieben schweben', literal: 'يطفو على السحابة السابعة', meaning: 'في السحاب من السعادة', example: 'Seit sie verliebt ist, schwebt sie auf Wolke sieben.', exampleAr: 'منذ أن وقعت في الحب وهي في قمة السعادة.', emoji: '☁️' },
  { de: 'alles in Butter', literal: 'كل شيء في الزبدة', meaning: 'كل شيء على ما يرام', example: 'Mach dir keine Sorgen, alles in Butter!', exampleAr: 'لا تقلق، كل شيء تمام!', emoji: '🧈' },
  { de: 'jemandem auf den Keks gehen', literal: 'يمشي على الكعكة', meaning: 'يزعج شخصاً', example: 'Dein Lärm geht mir auf den Keks!', exampleAr: 'ضجيجك يزعجني!', emoji: '🍪' },
  { de: 'Hals- und Beinbruch!', literal: 'كسر الرقبة والساق!', meaning: 'بالتوفيق! (تمنّي ساخر)', example: 'Morgen ist die Prüfung? Hals- und Beinbruch!', exampleAr: 'غداً الامتحان؟ بالتوفيق!', emoji: '🍀' },
  { de: 'das Handtuch werfen', literal: 'يرمي المنشفة', meaning: 'يستسلم', example: 'Nach drei Stunden hat er das Handtuch geworfen.', exampleAr: 'بعد ثلاث ساعات استسلم.', emoji: '🏳️' },
  { de: 'den Nagel auf den Kopf treffen', literal: 'يصيب المسمار في الرأس', meaning: 'أصاب الحقيقة بالضبط', example: 'Mit deiner Analyse hast du den Nagel auf den Kopf getroffen.', exampleAr: 'بتحليلك أصبت كبد الحقيقة.', emoji: '🔨' },
  { de: 'unter vier Augen', literal: 'تحت أربع عيون', meaning: 'على انفراد', example: 'Können wir das unter vier Augen besprechen?', exampleAr: 'هل يمكننا مناقشة هذا على انفراد؟', emoji: '👀' },
  { de: 'aus der Haut fahren', literal: 'يخرج من جلده', meaning: 'يغضب بشدة / ينفجر', example: 'Wenn er das noch einmal macht, fahre ich aus der Haut!', exampleAr: 'إذا فعل ذلك مرة أخرى، سأنفجر غضباً!', emoji: '🤯' },
]

export default function RedewendungenPage() {
  const [search, setSearch] = useState('')
  const [flipped, setFlipped] = useState<Set<number>>(new Set())
  const [mode, setMode] = useState<'browse' | 'quiz'>('browse')
  const [quizIdx, setQuizIdx] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  const filtered = search
    ? idioms.filter(i => i.de.toLowerCase().includes(search.toLowerCase()) || i.meaning.includes(search) || i.literal.includes(search))
    : idioms

  const toggleFlip = (idx: number) => {
    const newFlipped = new Set(flipped)
    if (newFlipped.has(idx)) newFlipped.delete(idx)
    else newFlipped.add(idx)
    setFlipped(newFlipped)
  }

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'de-DE'
      u.rate = 0.8
      window.speechSynthesis.speak(u)
    }
  }

  const shuffledIdioms = [...idioms].sort(() => Math.random() - 0.5)

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
        <span>›</span>
        <span className="text-[#00b894] font-bold">التعبيرات الاصطلاحية</span>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] p-8 text-center" style={{ background: 'linear-gradient(135deg, #4a0072 0%, #6a1b9a 50%, #4a0072 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(206,147,216,0.5), transparent 70%)' }} />
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white mb-2">🎭 تعبيرات ألمانية اصطلاحية</h1>
          <p className="text-sm text-white/60">{idioms.length} تعبير مع الترجمة الحرفية والمعنى الحقيقي والأمثلة</p>
          <div className="flex gap-2 justify-center mt-4">
            <button onClick={() => setMode('browse')} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${mode === 'browse' ? 'bg-white text-purple-700' : 'bg-white/10 text-white/60'}`}>📖 تصفح</button>
            <button onClick={() => { setMode('quiz'); setQuizIdx(0); setShowAnswer(false); setQuizScore(0) }} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${mode === 'quiz' ? 'bg-white text-purple-700' : 'bg-white/10 text-white/60'}`}>🧠 اختبر نفسك</button>
          </div>
        </div>
      </div>

      {mode === 'browse' && (
        <>
          <div className="relative">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن تعبير..." className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-purple-500 text-gray-900 dark:text-white pr-12" />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {filtered.map((idiom, idx) => (
              <div key={idx} onClick={() => toggleFlip(idx)} className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-purple-400/30 transition-all cursor-pointer group">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{idiom.emoji}</span>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white font-sans" dir="ltr">{idiom.de}</h3>
                      <button onClick={e => { e.stopPropagation(); speak(idiom.de) }} className="text-xs text-gray-400 hover:text-purple-500">🔊</button>
                    </div>
                    <p className="text-xs text-gray-400">الترجمة الحرفية: <span className="text-gray-600 dark:text-gray-300">{idiom.literal}</span></p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-bold">المعنى: {idiom.meaning}</p>
                    {flipped.has(idx) && (
                      <div className="pt-2 border-t border-gray-200 dark:border-white/10 space-y-1 animate-slideDown">
                        <p className="text-xs text-gray-600 dark:text-gray-300 font-sans text-left" dir="ltr">"{idiom.example}"</p>
                        <p className="text-xs text-gray-500">{idiom.exampleAr}</p>
                      </div>
                    )}
                    {!flipped.has(idx) && <p className="text-[10px] text-gray-400">اضغط لرؤية المثال</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {mode === 'quiz' && quizIdx < shuffledIdioms.length && (
        <div className="glass p-8 rounded-[2rem] border border-gray-200 dark:border-white/5 text-center space-y-6 max-w-lg mx-auto">
          <p className="text-xs text-gray-500">{quizIdx + 1} من {shuffledIdioms.length} · النقاط: {quizScore}</p>
          <span className="text-5xl block">{shuffledIdioms[quizIdx].emoji}</span>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white font-sans" dir="ltr">"{shuffledIdioms[quizIdx].de}"</h2>
          <p className="text-sm text-gray-400">ما المعنى الحقيقي لهذا التعبير؟</p>

          {!showAnswer ? (
            <button onClick={() => setShowAnswer(true)} className="bg-purple-600 text-white font-bold px-8 py-3 rounded-2xl hover:bg-purple-700 transition-all cursor-pointer shadow-lg shadow-purple-600/20">
              أظهر الإجابة
            </button>
          ) : (
            <div className="space-y-4 animate-slideDown">
              <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-700/20 space-y-2">
                <p className="text-xs text-gray-400">الترجمة الحرفية: <span className="text-gray-600 dark:text-gray-300">{shuffledIdioms[quizIdx].literal}</span></p>
                <p className="text-sm font-bold text-purple-600 dark:text-purple-400">المعنى: {shuffledIdioms[quizIdx].meaning}</p>
                <p className="text-xs text-gray-500 font-sans text-left" dir="ltr">"{shuffledIdioms[quizIdx].example}"</p>
                <p className="text-xs text-gray-400">{shuffledIdioms[quizIdx].exampleAr}</p>
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={() => { setQuizIdx(prev => prev + 1); setShowAnswer(false) }} className="px-6 py-2 rounded-xl bg-red-100 text-red-600 font-bold text-sm cursor-pointer hover:bg-red-200 transition-all">❌ لم أعرف</button>
                <button onClick={() => { setQuizScore(prev => prev + 1); setQuizIdx(prev => prev + 1); setShowAnswer(false) }} className="px-6 py-2 rounded-xl bg-emerald-100 text-emerald-600 font-bold text-sm cursor-pointer hover:bg-emerald-200 transition-all">✅ كنت أعرف</button>
              </div>
            </div>
          )}
        </div>
      )}

      {mode === 'quiz' && quizIdx >= shuffledIdioms.length && (
        <div className="glass p-8 rounded-[2rem] border border-gray-200 dark:border-white/5 text-center space-y-4">
          <span className="text-5xl block">🎉</span>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">انتهى الاختبار!</h2>
          <p className="text-4xl font-black text-purple-600">{quizScore} / {shuffledIdioms.length}</p>
          <p className="text-sm text-gray-500">{Math.round((quizScore / shuffledIdioms.length) * 100)}% — {quizScore >= shuffledIdioms.length * 0.8 ? 'ممتاز! 🌟' : quizScore >= shuffledIdioms.length * 0.5 ? 'جيد! استمر 💪' : 'تحتاج مراجعة 📖'}</p>
          <button onClick={() => { setQuizIdx(0); setShowAnswer(false); setQuizScore(0) }} className="bg-purple-600 text-white font-bold px-8 py-3 rounded-2xl cursor-pointer hover:bg-purple-700 transition-all">أعد الاختبار</button>
        </div>
      )}
    </div>
  )
}
