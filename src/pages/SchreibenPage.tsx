import { useState } from 'react'

interface SchreibenTask {
  id: number
  title: string
  situation: string
  points: string[]
  sampleAnswer: string
  tips: string[]
}

const tasks: SchreibenTask[] = [
  {
    id: 1,
    title: 'Krankmeldung an den Arbeitgeber',
    situation: 'Sie sind krank und können nicht zur Arbeit kommen. Schreiben Sie eine E-Mail an Ihren Chef.',
    points: ['Grund für die Abwesenheit', 'Wie lange Sie fehlen werden', 'Arztbesuch/Krankmeldung', 'Bitten Sie um Verständnis'],
    sampleAnswer: `Sehr geehrter Herr Müller,

leider muss ich Ihnen mitteilen, dass ich heute nicht zur Arbeit kommen kann. Ich habe seit gestern Abend starke Kopfschmerzen und Fieber.

Ich war heute Morgen beim Arzt. Er hat mich für drei Tage krankgeschrieben. Die Krankmeldung bringe ich Ihnen am Montag mit.

Ich hoffe, dass ich am Donnerstag wieder arbeiten kann. Bitte entschuldigen Sie die Unannehmlichkeiten.

Mit freundlichen Grüßen
Ahmad Hassan`,
    tips: [
      'ابدأ بـ "Sehr geehrter/Sehr geehrte" لأنّه رسمي',
      'اذكر السبب مباشرة',
      'حدّد المدّة المتوقّعة',
      'اختم بـ "Mit freundlichen Grüßen"',
    ]
  },
  {
    id: 2,
    title: 'Termin absagen',
    situation: 'Sie haben einen Termin beim Zahnarzt, aber können nicht kommen. Schreiben Sie und bitten Sie um einen neuen Termin.',
    points: ['Welchen Termin Sie absagen', 'Warum Sie nicht kommen können', 'Bitten Sie um einen neuen Termin', 'Bedanken Sie sich'],
    sampleAnswer: `Sehr geehrte Damen und Herren,

ich habe am Mittwoch, den 15. März um 10:00 Uhr einen Termin bei Dr. Fischer. Leider muss ich diesen Termin absagen, weil ich an diesem Tag einen wichtigen Termin beim Jobcenter habe.

Könnten Sie mir bitte einen neuen Termin geben? Am besten passt es mir nachmittags, am Donnerstag oder Freitag.

Vielen Dank für Ihr Verständnis.

Mit freundlichen Grüßen
Layla Al-Ahmad`,
    tips: [
      'حدّد الموعد الذي تلغيه بدقّة (التاريخ والساعة)',
      'أعطِ سبباً مقنعاً',
      'اقترح أوقاتاً بديلة',
      'استخدم "Könnten Sie..." للطلب المهذّب',
    ]
  },
  {
    id: 3,
    title: 'Beschwerde über eine Lieferung',
    situation: 'Sie haben online etwas bestellt. Das Produkt ist kaputt angekommen. Schreiben Sie eine Beschwerde.',
    points: ['Was Sie bestellt haben', 'Was das Problem ist', 'Was Sie erwarten (Lösung)', 'Frist setzen'],
    sampleAnswer: `Sehr geehrte Damen und Herren,

am 5. März habe ich über Ihren Online-Shop einen Laptop bestellt (Bestellnummer: 47829). Das Paket kam am 8. März an, aber leider ist der Bildschirm gesprungen.

Ich möchte das Gerät umtauschen oder mein Geld zurückbekommen. Bitte teilen Sie mir innerhalb von 7 Tagen mit, wie ich vorgehen soll.

Anbei sende ich Ihnen Fotos vom Schaden.

Mit freundlichen Grüßen
Omar Khalil`,
    tips: [
      'Bestellnummer ذكر رقم الطلب يُسرّع المعالجة',
      'صِف المشكلة بوضوح ودقّة',
      'اذكر ماذا تريد: استبدال أو استرجاع المال',
      'حدّد مهلة زمنية (Frist)',
    ]
  },
]

export default function SchreibenPage() {
  const [selectedTask, setSelectedTask] = useState<number | null>(null)
  const [userText, setUserText] = useState('')
  const [showSample, setShowSample] = useState(false)

  const task = selectedTask !== null ? tasks[selectedTask] : null

  if (!task) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">✍️</span>
          <div>
            <h1 className="text-2xl font-bold">الكتابة — Schreiben</h1>
            <p className="text-muted text-sm">تدرّب على كتابة الرسائل والإيميلات بالألمانية.</p>
          </div>
        </div>
        <div className="grid gap-3">
          {tasks.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setSelectedTask(i)}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-right"
            >
              <h3 className="font-bold text-green">{t.title}</h3>
              <p className="text-sm text-muted mt-1">{t.situation}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <button onClick={() => { setSelectedTask(null); setUserText(''); setShowSample(false) }} className="text-green font-bold text-sm">→ العودة</button>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-green mb-2">{task.title}</h2>
        <p className="text-sm mb-4" dir="ltr">{task.situation}</p>
        <div className="bg-yellow-50 rounded-lg p-3 mb-4">
          <p className="font-bold text-sm mb-2">📝 يجب أن تذكر:</p>
          <ul className="text-sm space-y-1">
            {task.points.map((p, i) => <li key={i} dir="ltr">• {p}</li>)}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <label className="font-bold text-sm mb-2 block">اكتب إجابتك هنا:</label>
        <textarea
          value={userText}
          onChange={e => setUserText(e.target.value)}
          className="w-full border rounded-lg p-3 min-h-[200px] text-sm"
          dir="ltr"
          placeholder="Sehr geehrte Damen und Herren, ..."
        />
        <div className="text-xs text-muted mt-2">عدد الكلمات: {userText.split(/\s+/).filter(Boolean).length}</div>
      </div>

      <div className="bg-green/5 rounded-xl p-4 border border-green/20">
        <h3 className="font-bold text-sm mb-2">💡 نصائح:</h3>
        <ul className="text-sm space-y-1">
          {task.tips.map((tip, i) => <li key={i}>• {tip}</li>)}
        </ul>
      </div>

      <button
        onClick={() => setShowSample(!showSample)}
        className="w-full bg-green text-white py-3 rounded-xl font-bold"
      >
        {showSample ? 'إخفاء النموذج' : '👁️ عرض نموذج الإجابة'}
      </button>

      {showSample && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-green/30">
          <h3 className="font-bold text-green mb-3">نموذج إجابة:</h3>
          <pre className="text-sm whitespace-pre-wrap leading-relaxed bg-gray-50 rounded-lg p-4" dir="ltr">
            {task.sampleAnswer}
          </pre>
        </div>
      )}
    </div>
  )
}
