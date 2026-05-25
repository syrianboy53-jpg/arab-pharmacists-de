import { useState } from 'react'

interface HoerenQuestion {
  id: number
  audioDescription: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

const hoerenModels: { id: number; title: string; questions: HoerenQuestion[] }[] = [
  {
    id: 1,
    title: 'Modell 1 – Ansagen verstehen',
    questions: [
      {
        id: 1,
        audioDescription: '📢 Ansage am Bahnhof: "Achtung an Gleis 3. Der ICE 597 nach Hamburg hat heute ca. 15 Minuten Verspätung. Wir bitten um Entschuldigung."',
        question: 'Was wird am Bahnhof durchgesagt?',
        options: ['Der Zug fährt heute nicht', 'Der Zug kommt 15 Minuten später', 'Der Zug fährt von einem anderen Gleis', 'Der Zug fährt nach München'],
        correct: 1,
        explanation: 'القطار ICE 597 إلى هامبورغ متأخّر 15 دقيقة.'
      },
      {
        id: 2,
        audioDescription: '📢 Ansage im Supermarkt: "Liebe Kunden, heute haben wir ein Sonderangebot: Alle Bio-Produkte 20% reduziert. Das Angebot gilt nur heute bis Ladenschluss."',
        question: 'Was ist das Sonderangebot?',
        options: ['Alle Produkte sind billiger', 'Bio-Produkte kosten 20% weniger', 'Der Laden schließt früher', 'Es gibt kostenlose Produkte'],
        correct: 1,
        explanation: 'العرض الخاص: منتجات Bio أرخص بـ20% لهذا اليوم فقط.'
      },
      {
        id: 3,
        audioDescription: '📢 Ansage in der Arztpraxis: "Frau Yilmaz, bitte kommen Sie ins Zimmer 2. Dr. Schmidt ist jetzt für Sie bereit."',
        question: 'Was soll Frau Yilmaz tun?',
        options: ['Sie soll nach Hause gehen', 'Sie soll ins Behandlungszimmer 2 kommen', 'Sie soll einen neuen Termin machen', 'Sie soll im Wartezimmer bleiben'],
        correct: 1,
        explanation: 'يُطلب من السيّدة يلماز الذهاب للغرفة 2 لأنّ الطبيب جاهز.'
      },
    ]
  },
  {
    id: 2,
    title: 'Modell 2 – Gespräche verstehen',
    questions: [
      {
        id: 1,
        audioDescription: '🎙️ Dialog:\nA: "Entschuldigung, wissen Sie, wo der nächste Geldautomat ist?"\nB: "Ja, gehen Sie hier geradeaus, dann die zweite Straße links. Da ist eine Sparkasse."\nA: "Danke schön!"\nB: "Gerne, ist nicht weit, nur 5 Minuten zu Fuß."',
        question: 'Wo ist der Geldautomat?',
        options: ['Direkt hier um die Ecke', 'Geradeaus und dann die zweite links', 'Am Bahnhof', '10 Minuten mit dem Bus'],
        correct: 1,
        explanation: 'الصرّاف الآلي: مشي للأمام ثمّ الشارع الثاني يسار، عند بنك Sparkasse.'
      },
      {
        id: 2,
        audioDescription: '🎙️ Dialog:\nA: "Ich möchte mich für den B1-Kurs anmelden."\nB: "Der nächste Kurs beginnt am 3. März, montags und mittwochs von 9 bis 12 Uhr."\nA: "Was kostet der Kurs?"\nB: "390 Euro für 4 Monate. Bringen Sie bitte Ihren Ausweis und ein Passfoto mit."',
        question: 'Wann findet der Kurs statt?',
        options: ['Jeden Tag von 9-12', 'Montags und mittwochs, 9-12 Uhr', 'Am Wochenende', 'Freitags 14-17 Uhr'],
        correct: 1,
        explanation: 'الكورس أيام الاثنين والأربعاء من 9 إلى 12 ظهراً.'
      },
    ]
  },
]

export default function HoerenPage() {
  const [selectedModel, setSelectedModel] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const model = selectedModel !== null ? hoerenModels[selectedModel] : null

  if (!model) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🎧</span>
          <div>
            <h1 className="text-2xl font-bold">الاستماع — Hören</h1>
            <p className="text-muted text-sm">تدرّب على فهم الإعلانات والمحادثات الألمانية.</p>
          </div>
        </div>
        <div className="grid gap-3">
          {hoerenModels.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setSelectedModel(i)}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-right"
            >
              <h3 className="font-bold text-green">{m.title}</h3>
              <p className="text-xs text-gray-400 mt-2">{m.questions.length} أسئلة</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const score = model.questions.filter(q => answers[q.id] === q.correct).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => { setSelectedModel(null); setAnswers({}); setShowResults(false) }} className="text-green font-bold text-sm">→ العودة</button>
        <h1 className="text-lg font-bold">{model.title}</h1>
      </div>

      {showResults && (
        <div className={`rounded-xl p-4 text-center font-bold ${score >= model.questions.length * 0.7 ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}>
          النتيجة: {score} / {model.questions.length}
        </div>
      )}

      {model.questions.map(q => (
        <div key={q.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="bg-purple-50 rounded-lg p-4 mb-4 text-sm whitespace-pre-line" dir="ltr">
            {q.audioDescription}
          </div>
          <p className="font-bold mb-3">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              let cls = 'border rounded-lg p-3 text-sm block w-full text-right transition-colors '
              if (showResults) {
                if (oi === q.correct) cls += 'border-green bg-green/10 text-green font-bold'
                else if (answers[q.id] === oi) cls += 'border-red bg-red/10 text-red'
                else cls += 'border-gray-200 text-gray-400'
              } else {
                cls += answers[q.id] === oi ? 'border-green bg-green/5 font-bold' : 'border-gray-200 hover:border-green'
              }
              return <button key={oi} onClick={() => !showResults && setAnswers(p => ({...p, [q.id]: oi}))} className={cls} dir="ltr">{String.fromCharCode(65+oi)}. {opt}</button>
            })}
          </div>
          {showResults && <div className="mt-3 bg-blue-50 rounded-lg p-3 text-sm text-blue-800">💡 {q.explanation}</div>}
        </div>
      ))}

      {!showResults && Object.keys(answers).length > 0 && (
        <button onClick={() => setShowResults(true)} className="w-full bg-green text-white py-3 rounded-xl font-bold">✅ تحقّق</button>
      )}
    </div>
  )
}
