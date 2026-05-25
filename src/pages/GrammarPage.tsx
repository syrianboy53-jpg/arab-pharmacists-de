import { useState } from 'react'

interface GrammarLesson {
  id: number
  title: string
  titleAr: string
  explanation: string
  examples: { de: string; ar: string }[]
  exercises: { question: string; options: string[]; correct: number }[]
}

const lessons: GrammarLesson[] = [
  {
    id: 1,
    title: 'Akkusativ vs. Dativ',
    titleAr: 'المفعول به مقابل المجرور',
    explanation: `الـAkkusativ يُجيب عن: wen? was? (مَن؟ ماذا؟) — المفعول به المباشر.
الـDativ يُجيب عن: wem? (لمَن؟) — المفعول به غير المباشر.

أدوات التعريف:
• Akkusativ: den (m), die (f), das (n), die (pl)
• Dativ: dem (m), der (f), dem (n), den+n (pl)

أفعال مع Akkusativ: haben, brauchen, sehen, finden, kaufen
أفعال مع Dativ: helfen, danken, gehören, gefallen, folgen`,
    examples: [
      { de: 'Ich sehe den Mann. (Akkusativ)', ar: 'أرى الرجل — مفعول به مباشر' },
      { de: 'Ich helfe dem Mann. (Dativ)', ar: 'أساعد الرجل — مفعول به غير مباشر' },
      { de: 'Sie kauft einen Laptop.', ar: 'هي تشتري لابتوب (Akk)' },
      { de: 'Das Buch gehört dem Kind.', ar: 'الكتاب يخصّ الطفل (Dat)' },
    ],
    exercises: [
      { question: 'Ich brauche ___ neuen Computer.', options: ['einen (Akk)', 'einem (Dat)'], correct: 0 },
      { question: 'Kannst du ___ Frau helfen?', options: ['die (Akk)', 'der (Dat)'], correct: 1 },
      { question: 'Ich schenke ___ Kind ein Buch.', options: ['das (Akk)', 'dem (Dat)'], correct: 1 },
      { question: 'Hast du ___ Schlüssel gefunden?', options: ['den (Akk)', 'dem (Dat)'], correct: 0 },
    ]
  },
  {
    id: 2,
    title: 'Nebensätze mit weil, dass, obwohl',
    titleAr: 'الجمل الثانوية',
    explanation: `في الجمل الثانوية (Nebensatz) الفعل يذهب للنهاية!

• weil = لأنّ (سبب)
• dass = أنّ (محتوى)
• obwohl = بالرغم من (تناقض)
• wenn = لو/عندما (شرط/زمن)
• als = عندما (ماضي مرّة واحدة)

الهيكل: Hauptsatz + Konnektor + ... + VERB`,
    examples: [
      { de: 'Ich bleibe zu Hause, weil ich krank bin.', ar: 'أبقى في البيت لأنّي مريض.' },
      { de: 'Ich glaube, dass er recht hat.', ar: 'أعتقد أنّه محقّ.' },
      { de: 'Obwohl es regnet, gehe ich spazieren.', ar: 'بالرغم من المطر، أمشي.' },
      { de: 'Wenn ich Zeit habe, lese ich ein Buch.', ar: 'لو عندي وقت، أقرأ كتاب.' },
    ],
    exercises: [
      { question: 'Ich lerne Deutsch, weil ich in Deutschland ___.', options: ['lebe', 'leben'], correct: 0 },
      { question: 'Er sagt, dass er morgen ___.', options: ['kommt', 'kommt er'], correct: 0 },
      { question: 'Obwohl sie müde ___, geht sie arbeiten.', options: ['ist', 'ist sie'], correct: 0 },
    ]
  },
  {
    id: 3,
    title: 'Perfekt (Partizip II)',
    titleAr: 'الماضي التام',
    explanation: `الـPerfekt هو الزمن الأكثر استخداماً للماضي في المحادثة.

الهيكل: haben/sein + Partizip II

• ge...t (أفعال منتظمة): machen → gemacht, kaufen → gekauft
• ge...en (أفعال شاذّة): fahren → gefahren, schreiben → geschrieben
• بدون ge-: أفعال بـbe-, er-, ver-, ent-: besuchen → besucht

sein مع أفعال الحركة والتغيير:
gehen → ist gegangen, fahren → ist gefahren, kommen → ist gekommen`,
    examples: [
      { de: 'Ich habe gestern viel gearbeitet.', ar: 'عملت كثيراً البارحة.' },
      { de: 'Wir sind nach Berlin gefahren.', ar: 'سافرنا إلى برلين.' },
      { de: 'Er hat ein Buch gelesen.', ar: 'قرأ كتاباً.' },
      { de: 'Sie ist um 7 Uhr aufgestanden.', ar: 'استيقظت الساعة 7.' },
    ],
    exercises: [
      { question: 'Ich ___ gestern ins Kino gegangen.', options: ['habe', 'bin'], correct: 1 },
      { question: 'Er ___ einen Brief geschrieben.', options: ['hat', 'ist'], correct: 0 },
      { question: 'Wir ___ Pizza bestellt. (bestellen → bestellt)', options: ['haben', 'sind'], correct: 0 },
    ]
  },
]

export default function GrammarPage() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const lesson = selectedLesson !== null ? lessons[selectedLesson] : null

  if (!lesson) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📐</span>
          <div>
            <h1 className="text-2xl font-bold">القواعد — Grammatik</h1>
            <p className="text-muted text-sm">أهمّ قواعد B1 مع شرح بالعربي وأمثلة وتمارين.</p>
          </div>
        </div>
        <div className="grid gap-3">
          {lessons.map((l, i) => (
            <button key={l.id} onClick={() => setSelectedLesson(i)} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-right">
              <h3 className="font-bold text-green" dir="ltr">{l.title}</h3>
              <p className="text-sm text-muted mt-1">{l.titleAr}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <button onClick={() => { setSelectedLesson(null); setAnswers({}); setShowResults(false) }} className="text-green font-bold text-sm">→ العودة</button>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-green mb-1" dir="ltr">{lesson.title}</h2>
        <p className="text-sm text-muted mb-4">{lesson.titleAr}</p>
        <pre className="text-sm whitespace-pre-wrap leading-relaxed bg-gray-50 rounded-lg p-4">{lesson.explanation}</pre>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-bold mb-3">📝 أمثلة:</h3>
        <div className="space-y-2">
          {lesson.examples.map((ex, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-medium" dir="ltr">{ex.de}</p>
              <p className="text-xs text-muted mt-1">{ex.ar}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-bold mb-3">✏️ تمارين:</h3>
        <div className="space-y-4">
          {lesson.exercises.map((ex, i) => (
            <div key={i}>
              <p className="text-sm font-medium mb-2" dir="ltr">{ex.question}</p>
              <div className="flex gap-2">
                {ex.options.map((opt, oi) => {
                  let cls = 'px-4 py-2 rounded-lg text-sm border transition-colors '
                  if (showResults) {
                    if (oi === ex.correct) cls += 'border-green bg-green/10 text-green font-bold'
                    else if (answers[i] === oi) cls += 'border-red bg-red/10 text-red'
                    else cls += 'border-gray-200'
                  } else {
                    cls += answers[i] === oi ? 'border-green bg-green/5' : 'border-gray-200 hover:border-green'
                  }
                  return <button key={oi} onClick={() => !showResults && setAnswers(p => ({...p, [i]: oi}))} className={cls} dir="ltr">{opt}</button>
                })}
              </div>
            </div>
          ))}
        </div>
        {!showResults && Object.keys(answers).length > 0 && (
          <button onClick={() => setShowResults(true)} className="mt-4 w-full bg-green text-white py-2 rounded-xl font-bold">تحقّق</button>
        )}
      </div>
    </div>
  )
}
