import { useState } from 'react'

const sprechenParts = [
  {
    id: 1,
    title: 'Teil 1: Sich vorstellen',
    description: 'قدّم نفسك في 1-2 دقيقة. تحدّث عن المواضيع التالية:',
    topics: ['Name / Herkunft', 'Wohnort', 'Familie', 'Beruf / Ausbildung', 'Sprachen', 'Hobbys'],
    sampleAnswer: `Guten Tag, mein Name ist Ahmad Al-Hassan. Ich komme aus Syrien, aus der Stadt Homs. Seit drei Jahren lebe ich in Deutschland, in Wuppertal.

Ich bin verheiratet und habe zwei Kinder. Mein Sohn ist 8 Jahre alt und meine Tochter ist 5.

In Syrien war ich Elektriker. Hier in Deutschland mache ich gerade eine Ausbildung als Elektroniker. 

Ich spreche Arabisch als Muttersprache und lerne seit drei Jahren Deutsch. Ich kann auch ein bisschen Englisch.

In meiner Freizeit koche ich gern und spiele Fußball mit meinen Freunden. Am Wochenende gehe ich oft mit meiner Familie in den Park.`,
    tips: [
      'تحدّث بوتيرة هادئة ومرتّبة',
      'استخدم جمل قصيرة وواضحة',
      'لا تحفظ النص — تحدّث بطبيعية',
      'ابتسم وانظر للممتحن',
    ],
    goldenPhrases: [
      'Ich komme ursprünglich aus...',
      'Seit [Zeitraum] lebe ich in...',
      'Ich bin verheiratet / ledig / geschieden',
      'Von Beruf bin ich...',
      'In meiner Freizeit...',
      'Ich spreche... als Muttersprache',
    ]
  },
  {
    id: 2,
    title: 'Teil 2: Über ein Thema sprechen',
    description: 'تحدّث عن موضوع مُعطى لـ2-3 دقائق. عادةً 4 نقاط يجب تغطيتها.',
    topics: ['Reisen', 'Gesundheit', 'Einkaufen', 'Medien', 'Lernen', 'Arbeit'],
    sampleAnswer: `Thema: Einkaufen

Ich möchte über das Thema "Einkaufen" sprechen.

Erstens: In meinem Heimatland, in Syrien, haben wir oft auf dem Markt eingekauft. Die Märkte waren sehr lebendig und man konnte mit den Verkäufern über den Preis verhandeln.

Zweitens: Hier in Deutschland kaufe ich meistens im Supermarkt ein, zum Beispiel bei Aldi oder Rewe. Manchmal bestelle ich auch online, besonders Kleidung.

Drittens: Ich finde, dass Online-Shopping praktisch ist, weil man Zeit spart. Aber ich gehe lieber in den Laden, weil ich die Produkte sehen und anfassen möchte.

Zum Schluss möchte ich sagen: Einkaufen ist in jedem Land anders, aber am wichtigsten ist, dass man gut auf sein Geld achtet.`,
    tips: [
      'قسّم إجابتك: Erstens / Zweitens / Drittens / Zum Schluss',
      'قارن بين بلدك وألمانيا',
      'أعطِ رأيك الشخصي',
      'استخدم أمثلة من حياتك',
    ],
    goldenPhrases: [
      'Ich möchte über das Thema ... sprechen.',
      'In meinem Heimatland...',
      'Hier in Deutschland...',
      'Ich finde, dass...',
      'Meiner Meinung nach...',
      'Zum Schluss möchte ich sagen...',
      'Einerseits... andererseits...',
    ]
  },
  {
    id: 3,
    title: 'Teil 3: Gemeinsam planen',
    description: 'خطّط مع شريكك نشاطاً معيّناً. ناقش التفاصيل واتّفقا على الحلول.',
    topics: ['Geburtstagsfeier planen', 'Ausflug organisieren', 'Abschiedsparty vorbereiten'],
    sampleAnswer: `Thema: Eine Geburtstagsfeier planen

A: Hallo! Unser Freund Ali hat nächste Woche Geburtstag. Sollen wir eine Party organisieren?
B: Ja, gute Idee! Wann sollen wir die Party machen?
A: Wie wäre es am Samstag? Da haben die meisten Leute frei.
B: Einverstanden. Und wo?
A: Wir könnten bei mir zu Hause feiern. Ich habe einen großen Balkon.
B: Super! Was sollen wir zum Essen machen?
A: Ich könnte Salate vorbereiten. Kannst du einen Kuchen backen?
B: Ja, kein Problem. Und was schenken wir ihm?
A: Vielleicht ein Buch? Er liest gern.
B: Gute Idee! Dann kaufe ich das Buch und du machst die Einladungen.
A: Perfekt, so machen wir das!`,
    tips: [
      'اطرح أسئلة: Wie wäre es...? / Was meinst du?',
      'وافق وأضف: Ja, gute Idee! Und...',
      'اقترح حلول: Wir könnten... / Ich schlage vor...',
      'وزّع المهام: Ich mache... und du machst...',
    ],
    goldenPhrases: [
      'Wie wäre es, wenn wir...?',
      'Was meinst du / Was hältst du davon?',
      'Ich schlage vor, dass...',
      'Einverstanden! / Gute Idee!',
      'Wir könnten...',
      'Ich könnte... und du könntest...',
      'So machen wir das!',
    ]
  },
]

export default function SprechenPage() {
  const [selectedPart, setSelectedPart] = useState<number | null>(null)
  const [showSample, setShowSample] = useState(false)
  const [showPhrases, setShowPhrases] = useState(false)

  const part = selectedPart !== null ? sprechenParts[selectedPart] : null

  if (!part) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🗣️</span>
          <div>
            <h1 className="text-2xl font-bold">المحادثة — Sprechen</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">تدرّب على أقسام المحادثة الثلاثة في الامتحان.</p>
          </div>
        </div>
        <div className="grid gap-3">
          {sprechenParts.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setSelectedPart(i)}
              className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-white/5 text-right"
            >
              <h3 className="font-bold text-[#00b894]">{p.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{p.description}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <button onClick={() => { setSelectedPart(null); setShowSample(false); setShowPhrases(false) }} className="text-[#00b894] font-bold text-sm">→ العودة</button>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 shadow-sm border border-gray-200 dark:border-white/5">
        <h2 className="text-lg font-bold text-[#00b894] mb-2">{part.title}</h2>
        <p className="text-sm mb-3">{part.description}</p>
        <div className="flex flex-wrap gap-2">
          {part.topics.map((t, i) => (
            <span key={i} className="bg-[#00b894]/10 text-[#00b894] text-xs px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>

      <div className="bg-[#00b894]/5 rounded-xl p-4 border border-[#00b894]/20">
        <h3 className="font-bold text-sm mb-2">💡 نصائح:</h3>
        <ul className="text-sm space-y-1">
          {part.tips.map((tip, i) => <li key={i}>• {tip}</li>)}
        </ul>
      </div>

      <button onClick={() => setShowPhrases(!showPhrases)} className="w-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-700/30 py-3 rounded-xl font-bold">
        {showPhrases ? 'إخفاء' : '🌟'} العبارات الذهبية
      </button>
      {showPhrases && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 shadow-sm border border-amber-200 dark:border-amber-700/30">
          <ul className="space-y-2">
            {part.goldenPhrases.map((ph, i) => (
              <li key={i} className="text-sm bg-amber-100 dark:bg-amber-900/5 rounded-lg p-2" dir="ltr">✨ {ph}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={() => setShowSample(!showSample)} className="w-full bg-[#00b894] text-white py-3 rounded-xl font-bold">
        {showSample ? 'إخفاء' : '👁️'} نموذج الإجابة
      </button>
      {showSample && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 shadow-sm border border-[#00b894]/30">
          <pre className="text-sm whitespace-pre-wrap leading-relaxed" dir="ltr">{part.sampleAnswer}</pre>
        </div>
      )}
    </div>
  )
}
