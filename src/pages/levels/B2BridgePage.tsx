import { useState } from 'react'
import { Link } from 'react-router-dom'

const bridgeTopics = [
  {
    id: 'verben_praepositionen',
    titleAr: 'الأفعال مع حروف الجر',
    titleDe: 'Verben mit Präpositionen',
    icon: '🔗',
    description: 'تدريبات هامة للانتقال لـ B2. (مثال: sich interessieren für, warten auf)',
    questions: [
      { q: 'Ich interessiere mich sehr ___ moderne Kunst.', options: ['für', 'an', 'über', 'auf'], correct: 0, explanation: 'sich interessieren für (Akk) = يهتم بـ' },
      { q: 'Wir warten schon seit einer Stunde ___ den Bus.', options: ['an', 'auf', 'für', 'zu'], correct: 1, explanation: 'warten auf (Akk) = ينتظر' },
      { q: 'Er erinnert sich gerne ___ seine Schulzeit.', options: ['über', 'von', 'an', 'zu'], correct: 2, explanation: 'sich erinnern an (Akk) = يتذكر' }
    ]
  },
  {
    id: 'nomen_verb_verbindungen',
    titleAr: 'الأسماء المتصلة بأفعال',
    titleDe: 'Nomen-Verb-Verbindungen',
    icon: '🧩',
    description: 'تركيبات ضرورية لمستوى B2 والتحدث برسمية. (مثال: eine Entscheidung treffen)',
    questions: [
      { q: 'Der Chef muss bald eine Entscheidung ___.', options: ['machen', 'treffen', 'geben', 'nehmen'], correct: 1, explanation: 'eine Entscheidung treffen = يتخذ قراراً (وليس machen)' },
      { q: 'Wir müssen dieses Thema zur Sprache ___.', options: ['bringen', 'sagen', 'machen', 'kommen'], correct: 0, explanation: 'etwas zur Sprache bringen = يطرح الموضوع للنقاش' }
    ]
  },
  {
    id: 'zweiteilige_konnektoren',
    titleAr: 'الروابط المزدوجة',
    titleDe: 'Zweiteilige Konnektoren',
    icon: '⚖️',
    description: 'روابط هامة لربط الجمل المعقدة بأسلوب راقٍ. (مثال: nicht nur ... sondern auch)',
    questions: [
      { q: 'Er spricht ___ gut Englisch, sondern auch fließend Französisch.', options: ['weder', 'zwar', 'nicht nur', 'entweder'], correct: 2, explanation: 'nicht nur ... sondern auch = ليس فقط ... بل أيضاً' },
      { q: 'Ich habe ___ Zeit noch Lust, ins Kino zu gehen.', options: ['nicht nur', 'weder', 'zwar', 'entweder'], correct: 1, explanation: 'weder ... noch = لا ... ولا' },
      { q: 'Wir können ___ heute Abend essen gehen oder morgen grillen.', options: ['entweder', 'weder', 'sowohl', 'nicht nur'], correct: 0, explanation: 'entweder ... oder = إما ... أو' }
    ]
  },
  {
    id: 'passiv',
    titleAr: 'المبني للمجهول',
    titleDe: 'Das Passiv',
    icon: '🏗️',
    description: 'شائع جداً في النصوص الأكاديمية والعملية في مستوى B2.',
    questions: [
      { q: 'Das neue Krankenhaus ___ nächstes Jahr eröffnet.', options: ['ist', 'wird', 'wurde', 'hat'], correct: 1, explanation: 'wird ... eröffnet = سيتم افتتاحه (Passiv Futur)' },
      { q: 'Der Brief ___ gestern von meinem Kollegen geschrieben.', options: ['wird', 'ist', 'wurde', 'hat'], correct: 2, explanation: 'wurde ... geschrieben = كُتب (Präteritum Passiv)' }
    ]
  }
]

export default function B2BridgePage() {
  const [activeTopic, setActiveTopic] = useState<number | null>(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)

  const openQuiz = (index: number) => {
    setActiveTopic(index)
    setCurrentQ(0)
    setScore(0)
    setSelected(null)
    setIsAnswered(false)
  }

  const handleAnswer = (idx: number) => {
    if (isAnswered) return
    setSelected(idx)
    setIsAnswered(true)
    if (bridgeTopics[activeTopic!].questions[currentQ].correct === idx) {
      setScore(s => s + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQ < bridgeTopics[activeTopic!].questions.length - 1) {
      setCurrentQ(q => q + 1)
      setSelected(null)
      setIsAnswered(false)
    } else {
      alert(`انتهى التدريب! النتيجة: ${score} من ${bridgeTopics[activeTopic!].questions.length}`)
      setActiveTopic(null)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12" dir="rtl">
      <nav className="flex text-sm text-gray-500 dark:text-gray-400 mb-2 font-bold px-4">
        <ol className="flex items-center space-x-2 space-x-reverse">
          <li><Link to="/" className="hover:text-blue-500">🏠 الرئيسية</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link to="/b2-hub" className="hover:text-blue-500">B2 Hub</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-gray-900 dark:text-gray-200">دورة العبور</li>
        </ol>
      </nav>

      <div className="relative overflow-hidden glass mx-4 rounded-3xl p-8 border border-indigo-500/20 shadow-lg text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">دورة العبور B1 ➔ B2</h1>
        <p className="text-gray-600 dark:text-gray-300">أهم قواعد الانتقال والتراكيب لتأهيلك لمستوى B2.</p>
      </div>

      <div className="px-4">
        {activeTopic === null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bridgeTopics.map((topic, idx) => (
              <div key={topic.id} onClick={() => openQuiz(idx)} className="glass p-6 rounded-2xl border border-gray-200 cursor-pointer hover:border-indigo-500 transition-colors">
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="text-xl font-bold dark:text-white mb-1">{topic.titleAr}</h3>
                <h4 className="text-sm text-indigo-500 mb-2">{topic.titleDe}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{topic.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass p-8 rounded-2xl border border-indigo-500/30">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
              {bridgeTopics[activeTopic].titleAr}
            </h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-inner mb-8">
              <p className="text-xl font-bold text-center" dir="ltr">
                {bridgeTopics[activeTopic].questions[currentQ].q}
              </p>
            </div>
            <div className="space-y-4">
              {bridgeTopics[activeTopic].questions[currentQ].options.map((opt, idx) => {
                const isCorrect = bridgeTopics[activeTopic].questions[currentQ].correct === idx
                let btnClass = "w-full p-4 rounded-xl border-2 font-bold text-lg transition-colors "
                if (isAnswered) {
                  if (isCorrect) btnClass += "bg-green-100 border-green-500 text-green-700"
                  else if (selected === idx) btnClass += "bg-red-100 border-red-500 text-red-700"
                  else btnClass += "bg-gray-50 border-gray-200 text-gray-500"
                } else {
                  btnClass += "bg-white dark:bg-gray-800 border-gray-300 hover:border-indigo-500 dark:text-white"
                }
                return (
                  <button key={idx} onClick={() => handleAnswer(idx)} className={btnClass} dir="ltr">
                    {opt}
                  </button>
                )
              })}
            </div>
            {isAnswered && (
              <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                <p className="font-bold text-indigo-800 dark:text-indigo-200">💡 {bridgeTopics[activeTopic].questions[currentQ].explanation}</p>
                <button onClick={nextQuestion} className="mt-4 w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700">
                  التالي
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
