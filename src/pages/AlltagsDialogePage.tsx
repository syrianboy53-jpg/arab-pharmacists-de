import { useState } from 'react'
import { Link } from 'react-router-dom'

const dialogues = [
  {
    id: 'supermarkt',
    title: 'في السوبرماركت',
    titleDe: 'Im Supermarkt',
    emoji: '🛒',
    lines: [
      { speaker: 'Kassierer', de: 'Guten Tag! Haben Sie eine Kundenkarte?', ar: 'مرحباً! هل لديك بطاقة عميل؟' },
      { speaker: 'Sie', de: 'Nein, leider nicht. Was kostet das alles zusammen?', ar: 'لا، للأسف. كم يكلف كل شيء معاً؟' },
      { speaker: 'Kassierer', de: 'Das macht 23,45 Euro. Möchten Sie eine Tüte?', ar: 'المجموع 23,45 يورو. هل تريد كيساً؟' },
      { speaker: 'Sie', de: 'Ja, bitte. Kann ich mit Karte bezahlen?', ar: 'نعم، من فضلك. هل يمكنني الدفع بالبطاقة؟' },
      { speaker: 'Kassierer', de: 'Natürlich. Bitte halten Sie Ihre Karte an das Gerät.', ar: 'طبعاً. ضع بطاقتك على الجهاز من فضلك.' },
      { speaker: 'Sie', de: 'Danke schön! Auf Wiedersehen.', ar: 'شكراً جزيلاً! مع السلامة.' },
    ],
    vocab: [
      { de: 'die Kundenkarte', ar: 'بطاقة العميل' },
      { de: 'die Tüte', ar: 'الكيس' },
      { de: 'das Gerät', ar: 'الجهاز' },
      { de: 'bezahlen', ar: 'يدفع' },
    ]
  },
  {
    id: 'arzt-termin',
    title: 'حجز موعد عند الطبيب',
    titleDe: 'Arzttermin vereinbaren',
    emoji: '📞',
    lines: [
      { speaker: 'Sprechstundenhilfe', de: 'Praxis Dr. Müller, guten Tag. Was kann ich für Sie tun?', ar: 'عيادة الدكتور مولر، مرحباً. كيف أستطيع مساعدتك؟' },
      { speaker: 'Sie', de: 'Guten Tag. Ich möchte gern einen Termin machen. Ich habe seit drei Tagen Halsschmerzen.', ar: 'مرحباً. أريد حجز موعد. لدي ألم في الحلق منذ ثلاثة أيام.' },
      { speaker: 'Sprechstundenhilfe', de: 'Waren Sie schon mal bei uns?', ar: 'هل زرتنا من قبل؟' },
      { speaker: 'Sie', de: 'Nein, ich bin zum ersten Mal hier.', ar: 'لا، هذه أول مرة.' },
      { speaker: 'Sprechstundenhilfe', de: 'Kein Problem. Können Sie morgen um 10 Uhr kommen?', ar: 'لا مشكلة. هل يمكنك المجيء غداً الساعة العاشرة؟' },
      { speaker: 'Sie', de: 'Ja, das passt. Was soll ich mitbringen?', ar: 'نعم، يناسبني. ماذا يجب أن أحضر؟' },
      { speaker: 'Sprechstundenhilfe', de: 'Bitte bringen Sie Ihre Versichertenkarte und Ihren Ausweis mit.', ar: 'أحضر بطاقة التأمين والهوية من فضلك.' },
      { speaker: 'Sie', de: 'Alles klar. Vielen Dank!', ar: 'حسناً. شكراً جزيلاً!' },
    ],
    vocab: [
      { de: 'die Sprechstundenhilfe', ar: 'مساعدة الطبيب' },
      { de: 'die Halsschmerzen', ar: 'ألم الحلق' },
      { de: 'die Versichertenkarte', ar: 'بطاقة التأمين' },
      { de: 'der Ausweis', ar: 'الهوية' },
    ]
  },
  {
    id: 'wohnung-besichtigung',
    title: 'معاينة شقة',
    titleDe: 'Wohnungsbesichtigung',
    emoji: '🏠',
    lines: [
      { speaker: 'Vermieter', de: 'Willkommen! Die Wohnung hat zwei Zimmer, eine Küche und ein Bad.', ar: 'أهلاً وسهلاً! الشقة فيها غرفتان ومطبخ وحمام.' },
      { speaker: 'Sie', de: 'Wie hoch ist die Miete?', ar: 'كم الإيجار؟' },
      { speaker: 'Vermieter', de: '750 Euro warm, inklusive Nebenkosten.', ar: '750 يورو شامل المصاريف الجانبية.' },
      { speaker: 'Sie', de: 'Gibt es einen Keller oder einen Stellplatz?', ar: 'هل يوجد قبو أو موقف سيارات؟' },
      { speaker: 'Vermieter', de: 'Ja, ein Kellerabteil gehört dazu. Ein Stellplatz kostet 50 Euro extra.', ar: 'نعم، هناك قسم في القبو. موقف السيارات يكلف 50 يورو إضافي.' },
      { speaker: 'Sie', de: 'Sind Haustiere erlaubt?', ar: 'هل الحيوانات الأليفة مسموحة؟' },
      { speaker: 'Vermieter', de: 'Kleine Haustiere sind kein Problem. Für Hunde brauche ich die Zustimmung.', ar: 'الحيوانات الصغيرة لا مشكلة. للكلاب أحتاج موافقة.' },
      { speaker: 'Sie', de: 'Wann kann ich einziehen?', ar: 'متى يمكنني الانتقال؟' },
      { speaker: 'Vermieter', de: 'Ab dem 1. nächsten Monats.', ar: 'من أول الشهر القادم.' },
    ],
    vocab: [
      { de: 'die Nebenkosten', ar: 'المصاريف الجانبية' },
      { de: 'der Keller', ar: 'القبو' },
      { de: 'der Stellplatz', ar: 'موقف السيارات' },
      { de: 'einziehen', ar: 'ينتقل (للسكن)' },
      { de: 'die Zustimmung', ar: 'الموافقة' },
    ]
  },
  {
    id: 'bewerbung',
    title: 'مقابلة عمل',
    titleDe: 'Vorstellungsgespräch',
    emoji: '💼',
    lines: [
      { speaker: 'Chef', de: 'Guten Tag, Herr Hassan. Nehmen Sie bitte Platz. Erzählen Sie uns etwas über sich.', ar: 'مرحباً سيد حسن. تفضل بالجلوس. أخبرنا عن نفسك.' },
      { speaker: 'Sie', de: 'Ich heiße Ahmad Hassan, bin 32 Jahre alt und habe in Syrien Informatik studiert.', ar: 'اسمي أحمد حسن، عمري 32 سنة ودرست المعلوماتية في سوريا.' },
      { speaker: 'Chef', de: 'Warum interessieren Sie sich für diese Stelle?', ar: 'لماذا تهتم بهذا المنصب؟' },
      { speaker: 'Sie', de: 'Ich habe Erfahrung in der IT und möchte meine Kenntnisse in Ihrem Unternehmen einsetzen.', ar: 'لدي خبرة في تكنولوجيا المعلومات وأريد استخدام معرفتي في شركتكم.' },
      { speaker: 'Chef', de: 'Wie sind Ihre Deutschkenntnisse?', ar: 'كيف هي معرفتك بالألمانية؟' },
      { speaker: 'Sie', de: 'Ich habe B1 bestanden und lerne weiter. Im Alltag komme ich gut zurecht.', ar: 'اجتزت B1 وأستمر بالتعلم. في الحياة اليومية أتدبر أموري جيداً.' },
      { speaker: 'Chef', de: 'Sehr gut. Wann könnten Sie anfangen?', ar: 'جيد جداً. متى يمكنك البدء؟' },
      { speaker: 'Sie', de: 'Ich könnte sofort anfangen oder ab dem nächsten Monat.', ar: 'يمكنني البدء فوراً أو من الشهر القادم.' },
    ],
    vocab: [
      { de: 'das Vorstellungsgespräch', ar: 'مقابلة العمل' },
      { de: 'die Stelle', ar: 'المنصب/الوظيفة' },
      { de: 'die Erfahrung', ar: 'الخبرة' },
      { de: 'die Kenntnisse', ar: 'المعارف/المهارات' },
      { de: 'zurechtkommen', ar: 'يتدبر أموره' },
    ]
  },
  {
    id: 'bahnhof',
    title: 'في محطة القطار',
    titleDe: 'Am Bahnhof',
    emoji: '🚆',
    lines: [
      { speaker: 'Sie', de: 'Entschuldigung, wann fährt der nächste Zug nach München?', ar: 'عفواً، متى يغادر القطار التالي إلى ميونيخ؟' },
      { speaker: 'Mitarbeiter', de: 'Der nächste ICE nach München fährt um 14:32 von Gleis 7.', ar: 'القطار السريع التالي إلى ميونيخ يغادر الساعة 14:32 من الرصيف 7.' },
      { speaker: 'Sie', de: 'Muss ich umsteigen?', ar: 'هل يجب أن أغيّر القطار؟' },
      { speaker: 'Mitarbeiter', de: 'Nein, das ist eine Direktverbindung. Sie sind in 4 Stunden da.', ar: 'لا، هذا خط مباشر. ستكون هناك خلال 4 ساعات.' },
      { speaker: 'Sie', de: 'Was kostet eine Fahrkarte zweiter Klasse?', ar: 'كم تكلف تذكرة الدرجة الثانية؟' },
      { speaker: 'Mitarbeiter', de: 'Eine einfache Fahrt kostet 79 Euro. Mit BahnCard 25 zahlen Sie 59 Euro.', ar: 'الذهاب فقط 79 يورو. مع بطاقة BahnCard 25 تدفع 59 يورو.' },
      { speaker: 'Sie', de: 'Ich nehme die günstigere Option. Kann ich am Automaten bezahlen?', ar: 'آخذ الخيار الأرخص. هل يمكنني الدفع من الجهاز؟' },
      { speaker: 'Mitarbeiter', de: 'Ja, oder Sie können auch die DB-App benutzen.', ar: 'نعم، أو يمكنك استخدام تطبيق DB أيضاً.' },
    ],
    vocab: [
      { de: 'umsteigen', ar: 'يغيّر (القطار)' },
      { de: 'die Direktverbindung', ar: 'خط مباشر' },
      { de: 'die Fahrkarte', ar: 'تذكرة السفر' },
      { de: 'die einfache Fahrt', ar: 'ذهاب فقط' },
      { de: 'der Automat', ar: 'الجهاز الآلي' },
    ]
  },
  {
    id: 'nachbar',
    title: 'مع الجيران',
    titleDe: 'Mit den Nachbarn',
    emoji: '🏘️',
    lines: [
      { speaker: 'Nachbar', de: 'Hallo! Sie sind neu hier, oder? Ich bin Thomas aus der Wohnung nebenan.', ar: 'مرحباً! أنت جديد هنا، صح؟ أنا توماس من الشقة المجاورة.' },
      { speaker: 'Sie', de: 'Ja, wir sind letzte Woche eingezogen. Ich heiße Ahmad. Freut mich!', ar: 'نعم، انتقلنا الأسبوع الماضي. اسمي أحمد. تشرفنا!' },
      { speaker: 'Nachbar', de: 'Willkommen! Wenn Sie Fragen haben, klopfen Sie einfach bei mir.', ar: 'أهلاً! إذا عندك أسئلة، اطرق بابي ببساطة.' },
      { speaker: 'Sie', de: 'Danke! Können Sie mir sagen, wann der Müll abgeholt wird?', ar: 'شكراً! هل يمكنك إخباري متى يتم جمع القمامة؟' },
      { speaker: 'Nachbar', de: 'Die gelbe Tonne am Montag, die schwarze am Donnerstag, und Papier alle zwei Wochen.', ar: 'الحاوية الصفراء الاثنين، السوداء الخميس، والورق كل أسبوعين.' },
      { speaker: 'Sie', de: 'Sehr hilfreich! Und die Ruhezeiten?', ar: 'مفيد جداً! وأوقات الهدوء؟' },
      { speaker: 'Nachbar', de: 'Von 22 Uhr bis 6 Uhr und Sonntag den ganzen Tag. Dann bitte kein Lärm.', ar: 'من 10 مساءً حتى 6 صباحاً ويوم الأحد طوال اليوم. لا ضجيج حينها.' },
    ],
    vocab: [
      { de: 'einziehen', ar: 'ينتقل للسكن' },
      { de: 'klopfen', ar: 'يطرق الباب' },
      { de: 'die Tonne', ar: 'الحاوية' },
      { de: 'die Ruhezeiten', ar: 'أوقات الهدوء' },
      { de: 'der Lärm', ar: 'الضجيج' },
    ]
  },
]

export default function AlltagsDialogePage() {
  const [selectedDialogue, setSelectedDialogue] = useState<string | null>(null)
  const [revealedLines, setRevealedLines] = useState<number>(0)
  const [showVocab, setShowVocab] = useState(false)

  const current = dialogues.find(d => d.id === selectedDialogue)

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'de-DE'
      u.rate = 0.8
      window.speechSynthesis.speak(u)
    }
  }

  if (!selectedDialogue || !current) {
    return (
      <div className="space-y-6" dir="rtl">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
          <span>›</span>
          <span className="text-[#00b894] font-bold">حوارات يومية</span>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] p-8 text-center" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #064e3b 100%)' }}>
          <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.5), transparent 70%)' }} />
          <div className="relative z-10">
            <h1 className="text-3xl font-black text-white mb-2">💬 حوارات ألمانية يومية</h1>
            <p className="text-sm text-white/60">{dialogues.length} حوار واقعي لمواقف الحياة في ألمانيا — مع ترجمة ونطق</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dialogues.map(d => (
            <button
              key={d.id}
              onClick={() => { setSelectedDialogue(d.id); setRevealedLines(0); setShowVocab(false) }}
              className="p-5 rounded-2xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-[#00b894]/50 hover:-translate-y-1 transition-all text-right cursor-pointer group"
            >
              <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">{d.emoji}</span>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">{d.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-1" dir="ltr">{d.titleDe}</p>
              <p className="text-[10px] text-gray-400 mt-2">{d.lines.length} جملة · {d.vocab.length} مفردات</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const visibleLines = current.lines.slice(0, revealedLines || current.lines.length)

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
        <span>›</span>
        <button onClick={() => setSelectedDialogue(null)} className="hover:text-gray-900 dark:hover:text-white transition-colors">حوارات يومية</button>
        <span>›</span>
        <span className="text-[#00b894] font-bold">{current.title}</span>
      </div>

      <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{current.emoji}</span>
          <div>
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">{current.title}</h2>
            <p className="text-xs text-gray-500 font-sans" dir="ltr">{current.titleDe}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setRevealedLines(revealedLines === 0 ? 1 : 0)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${revealedLines > 0 ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'}`}>
            {revealedLines > 0 ? '🎭 وضع التدريب' : '👁️ إظهار الكل'}
          </button>
          <button onClick={() => setShowVocab(!showVocab)} className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-[#00b894]/10 hover:text-[#00b894] transition-all cursor-pointer">
            📚 المفردات
          </button>
        </div>
      </div>

      {/* Dialogue */}
      <div className="space-y-3">
        {visibleLines.map((line, idx) => (
          <div key={idx} className={`flex gap-3 ${line.speaker === 'Sie' ? 'flex-row-reverse' : ''}`}>
            <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-bold ${
              line.speaker === 'Sie' ? 'bg-[#00b894]/10 text-[#00b894] border border-[#00b894]/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
            }`}>
              {line.speaker === 'Sie' ? '👤' : '🧑'}
            </div>
            <div className={`flex-1 max-w-[80%] glass p-4 rounded-2xl border border-gray-200 dark:border-white/5 space-y-1 ${
              line.speaker === 'Sie' ? 'rounded-tr-md' : 'rounded-tl-md'
            }`}>
              <p className="text-[10px] font-bold text-gray-400">{line.speaker}</p>
              <p className="text-sm text-gray-900 dark:text-white font-sans text-left" dir="ltr">{line.de}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{line.ar}</p>
              <button onClick={() => speak(line.de)} className="text-[10px] text-gray-400 hover:text-[#00b894] transition-colors">🔊 استمع</button>
            </div>
          </div>
        ))}
      </div>

      {revealedLines > 0 && revealedLines < current.lines.length && (
        <button onClick={() => setRevealedLines(prev => prev + 1)} className="w-full py-3 rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/10 text-sm font-bold text-gray-500 hover:border-[#00b894] hover:text-[#00b894] transition-all cursor-pointer">
          أظهر الجملة التالية ↓
        </button>
      )}

      {/* Vocabulary */}
      {showVocab && (
        <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 space-y-3 animate-slideDown">
          <h3 className="font-bold text-sm text-amber-600 dark:text-amber-400">📚 مفردات هذا الحوار</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {current.vocab.map((v, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-200 dark:border-white/10">
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white font-sans" dir="ltr">{v.de}</p>
                  <p className="text-[10px] text-gray-500">{v.ar}</p>
                </div>
                <button onClick={() => speak(v.de)} className="text-xs text-gray-400 hover:text-[#00b894] cursor-pointer">🔊</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
