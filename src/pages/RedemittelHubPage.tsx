import { useState } from 'react'
import { Link } from 'react-router-dom'

const situations = [
  {
    id: 'arzt',
    title: 'عند الطبيب',
    titleDe: 'Beim Arzt',
    emoji: '🏥',
    color: 'from-red-500 to-rose-600',
    phrases: [
      { de: 'Ich habe starke Schmerzen.', ar: 'لدي آلام شديدة.' },
      { de: 'Mir ist schwindelig.', ar: 'أشعر بدوار.' },
      { de: 'Ich habe Fieber seit zwei Tagen.', ar: 'لدي حرارة منذ يومين.' },
      { de: 'Können Sie mir etwas verschreiben?', ar: 'هل يمكنك وصف شيء لي؟' },
      { de: 'Ich bin gegen Penicillin allergisch.', ar: 'لدي حساسية من البنسلين.' },
      { de: 'Wo tut es weh?', ar: 'أين يؤلمك؟' },
      { de: 'Ich brauche eine Krankmeldung.', ar: 'أحتاج إجازة مرضية.' },
      { de: 'Muss ich nüchtern kommen?', ar: 'هل يجب أن آتي صائماً؟' },
      { de: 'Wann bekomme ich die Ergebnisse?', ar: 'متى أحصل على النتائج؟' },
      { de: 'Ich nehme regelmäßig Medikamente.', ar: 'أتناول أدوية بانتظام.' },
    ]
  },
  {
    id: 'amt',
    title: 'في الدائرة الحكومية',
    titleDe: 'Beim Amt',
    emoji: '🏛️',
    color: 'from-blue-500 to-indigo-600',
    phrases: [
      { de: 'Ich möchte mich anmelden.', ar: 'أريد تسجيل سكني.' },
      { de: 'Ich brauche eine Meldebescheinigung.', ar: 'أحتاج شهادة تسجيل.' },
      { de: 'Wo muss ich unterschreiben?', ar: 'أين يجب أن أوقّع؟' },
      { de: 'Welche Unterlagen brauche ich?', ar: 'ما الوثائق التي أحتاجها؟' },
      { de: 'Ich habe einen Termin um 10 Uhr.', ar: 'لدي موعد الساعة العاشرة.' },
      { de: 'Können Sie das bitte wiederholen?', ar: 'هل يمكنك تكرار ذلك من فضلك؟' },
      { de: 'Ich verstehe das Formular nicht.', ar: 'لا أفهم الاستمارة.' },
      { de: 'Wann ist der nächste freie Termin?', ar: 'متى أقرب موعد فارغ؟' },
      { de: 'Mein Aufenthaltstitel läuft bald ab.', ar: 'إقامتي على وشك الانتهاء.' },
      { de: 'Ich möchte meinen Pass verlängern.', ar: 'أريد تمديد جواز سفري.' },
    ]
  },
  {
    id: 'arbeit',
    title: 'في العمل',
    titleDe: 'Bei der Arbeit',
    emoji: '💼',
    color: 'from-emerald-500 to-teal-600',
    phrases: [
      { de: 'Ich bin seit ... bei der Firma.', ar: 'أنا في الشركة منذ ...' },
      { de: 'Ich hätte gern Urlaub vom ... bis ...', ar: 'أريد إجازة من ... إلى ...' },
      { de: 'Können wir einen Termin vereinbaren?', ar: 'هل يمكننا تحديد موعد؟' },
      { de: 'Ich bin heute leider krank.', ar: 'أنا مريض اليوم للأسف.' },
      { de: 'Ich habe eine Frage zu meinem Vertrag.', ar: 'لدي سؤال عن عقدي.' },
      { de: 'Wann ist die nächste Besprechung?', ar: 'متى الاجتماع القادم؟' },
      { de: 'Ich mache gerade eine Ausbildung.', ar: 'أقوم حالياً بتدريب مهني.' },
      { de: 'Wie viele Überstunden habe ich?', ar: 'كم ساعة إضافية لدي؟' },
      { de: 'Ich suche eine Teilzeitstelle.', ar: 'أبحث عن عمل بدوام جزئي.' },
      { de: 'Mein Gehalt kommt am Monatsende.', ar: 'راتبي يأتي نهاية الشهر.' },
    ]
  },
  {
    id: 'wohnung',
    title: 'السكن والإيجار',
    titleDe: 'Wohnung & Miete',
    emoji: '🏠',
    color: 'from-amber-500 to-orange-600',
    phrases: [
      { de: 'Ich suche eine 2-Zimmer-Wohnung.', ar: 'أبحث عن شقة بغرفتين.' },
      { de: 'Wie hoch ist die Miete warm?', ar: 'كم الإيجار شاملاً المصاريف؟' },
      { de: 'Sind Haustiere erlaubt?', ar: 'هل الحيوانات الأليفة مسموحة؟' },
      { de: 'Die Heizung funktioniert nicht.', ar: 'التدفئة لا تعمل.' },
      { de: 'Kann ich die Wohnung besichtigen?', ar: 'هل يمكنني معاينة الشقة؟' },
      { de: 'Wann kann ich einziehen?', ar: 'متى يمكنني الانتقال؟' },
      { de: 'Wie hoch ist die Kaution?', ar: 'كم قيمة التأمين؟' },
      { de: 'Der Wasserhahn tropft.', ar: 'الصنبور يقطر ماءً.' },
      { de: 'Ich möchte den Mietvertrag kündigen.', ar: 'أريد إنهاء عقد الإيجار.' },
      { de: 'Die Nebenkostenabrechnung stimmt nicht.', ar: 'كشف المصاريف الجانبية غير صحيح.' },
    ]
  },
  {
    id: 'einkaufen',
    title: 'التسوق',
    titleDe: 'Einkaufen',
    emoji: '🛒',
    color: 'from-violet-500 to-purple-600',
    phrases: [
      { de: 'Wo finde ich ...?', ar: 'أين أجد ...؟' },
      { de: 'Haben Sie das auch in Größe M?', ar: 'هل لديكم هذا بمقاس M أيضاً؟' },
      { de: 'Kann ich das umtauschen?', ar: 'هل يمكنني استبدال هذا؟' },
      { de: 'Kann ich mit Karte bezahlen?', ar: 'هل يمكنني الدفع بالبطاقة؟' },
      { de: 'Gibt es das im Angebot?', ar: 'هل هذا في العرض؟' },
      { de: 'Ich hätte gern 200 Gramm Käse.', ar: 'أريد 200 غرام جبن من فضلك.' },
      { de: 'Brauchen Sie eine Tüte?', ar: 'هل تحتاج كيساً؟' },
      { de: 'Das ist zu teuer für mich.', ar: 'هذا غالٍ جداً بالنسبة لي.' },
      { de: 'Wo ist die Kasse?', ar: 'أين الصندوق/الكاشير؟' },
      { de: 'Kann ich den Kassenbon haben?', ar: 'هل يمكنني الحصول على الفاتورة؟' },
    ]
  },
  {
    id: 'schule',
    title: 'المدرسة والأطفال',
    titleDe: 'Schule & Kinder',
    emoji: '🎒',
    color: 'from-cyan-500 to-blue-600',
    phrases: [
      { de: 'Mein Kind ist heute krank.', ar: 'طفلي مريض اليوم.' },
      { de: 'Wann ist der Elternabend?', ar: 'متى اجتماع الأهل؟' },
      { de: 'Welche Schulsachen braucht mein Kind?', ar: 'ما الأدوات المدرسية التي يحتاجها طفلي؟' },
      { de: 'Kann ich mit dem Lehrer sprechen?', ar: 'هل يمكنني التحدث مع المعلم؟' },
      { de: 'Mein Kind hat Schwierigkeiten in Mathe.', ar: 'طفلي يعاني صعوبات في الرياضيات.' },
      { de: 'Wann sind die Sommerferien?', ar: 'متى العطلة الصيفية؟' },
      { de: 'Gibt es Nachhilfe in der Schule?', ar: 'هل يوجد دروس تقوية في المدرسة؟' },
      { de: 'Mein Kind wird in der Schule gemobbt.', ar: 'طفلي يتعرض للتنمر في المدرسة.' },
      { de: 'Ich möchte mein Kind anmelden.', ar: 'أريد تسجيل طفلي.' },
      { de: 'Hat mein Kind Hausaufgaben?', ar: 'هل لدى طفلي واجبات منزلية؟' },
    ]
  },
  {
    id: 'nachbarn',
    title: 'الجيران',
    titleDe: 'Nachbarn',
    emoji: '🏘️',
    color: 'from-pink-500 to-rose-600',
    phrases: [
      { de: 'Guten Tag, ich bin Ihr neuer Nachbar.', ar: 'مرحباً، أنا جارك الجديد.' },
      { de: 'Könnten Sie bitte leiser sein?', ar: 'هل يمكنك أن تكون أهدأ من فضلك؟' },
      { de: 'Darf ich Ihr WLAN benutzen?', ar: 'هل يمكنني استخدام الواي فاي الخاص بك؟' },
      { de: 'Können Sie mein Paket annehmen?', ar: 'هل يمكنك استلام طردي؟' },
      { de: 'Die Ruhezeiten sind von 22 bis 6 Uhr.', ar: 'أوقات الهدوء من 10 مساءً حتى 6 صباحاً.' },
      { de: 'Wann wird der Müll abgeholt?', ar: 'متى يتم جمع القمامة؟' },
      { de: 'Ich mache am Samstag eine Party.', ar: 'سأقيم حفلة يوم السبت.' },
      { de: 'Ihr Hund bellt die ganze Nacht.', ar: 'كلبكم ينبح طوال الليل.' },
    ]
  },
  {
    id: 'telefon',
    title: 'المكالمات الهاتفية',
    titleDe: 'Telefonieren',
    emoji: '📞',
    color: 'from-green-500 to-emerald-600',
    phrases: [
      { de: 'Könnte ich bitte mit ... sprechen?', ar: 'هل يمكنني التحدث مع ... من فضلك؟' },
      { de: 'Können Sie mich bitte verbinden?', ar: 'هل يمكنك توصيلي من فضلك؟' },
      { de: 'Ich rufe wegen ... an.', ar: 'أتصل بخصوص ...' },
      { de: 'Können Sie das bitte buchstabieren?', ar: 'هل يمكنك تهجئة ذلك من فضلك؟' },
      { de: 'Kann ich eine Nachricht hinterlassen?', ar: 'هل يمكنني ترك رسالة؟' },
      { de: 'Ich rufe später noch einmal an.', ar: 'سأتصل مرة أخرى لاحقاً.' },
      { de: 'Die Leitung ist besetzt.', ar: 'الخط مشغول.' },
      { de: 'Können Sie bitte langsamer sprechen?', ar: 'هل يمكنك التحدث أبطأ من فضلك؟' },
    ]
  },
  {
    id: 'notfall',
    title: 'حالات الطوارئ',
    titleDe: 'Notfälle',
    emoji: '🚨',
    color: 'from-red-600 to-red-700',
    phrases: [
      { de: 'Rufen Sie bitte einen Krankenwagen!', ar: 'اتصلوا بسيارة إسعاف من فضلكم!' },
      { de: 'Es gibt einen Unfall.', ar: 'هناك حادث.' },
      { de: 'Ich brauche sofort Hilfe!', ar: 'أحتاج مساعدة فوراً!' },
      { de: 'Wo ist das nächste Krankenhaus?', ar: 'أين أقرب مستشفى؟' },
      { de: 'Meine Adresse ist ...', ar: 'عنواني هو ...' },
      { de: 'Jemand ist bewusstlos.', ar: 'شخص ما فاقد الوعي.' },
      { de: 'Es brennt! Rufen Sie die Feuerwehr!', ar: 'حريق! اتصلوا بالإطفاء!' },
      { de: 'Ich wurde bestohlen.', ar: 'تعرضت للسرقة.' },
      { de: 'Notruf: 112 (Feuerwehr/Rettung), 110 (Polizei)', ar: 'أرقام الطوارئ: 112 (إطفاء/إسعاف)، 110 (شرطة)' },
    ]
  },
  {
    id: 'bank',
    title: 'في البنك',
    titleDe: 'Bei der Bank',
    emoji: '🏦',
    color: 'from-slate-500 to-gray-700',
    phrases: [
      { de: 'Ich möchte ein Konto eröffnen.', ar: 'أريد فتح حساب.' },
      { de: 'Kann ich Geld überweisen?', ar: 'هل يمكنني تحويل أموال؟' },
      { de: 'Meine Karte wurde gesperrt.', ar: 'تم حظر بطاقتي.' },
      { de: 'Ich möchte Geld abheben.', ar: 'أريد سحب أموال.' },
      { de: 'Wie ist mein Kontostand?', ar: 'ما رصيد حسابي؟' },
      { de: 'Ich brauche einen Kontoauszug.', ar: 'أحتاج كشف حساب.' },
      { de: 'Die PIN funktioniert nicht.', ar: 'الرقم السري لا يعمل.' },
      { de: 'Gibt es ein kostenloses Girokonto?', ar: 'هل يوجد حساب جاري مجاني؟' },
    ]
  },
]

const briefVorlagen = [
  {
    id: 'kuendigung',
    title: 'إنهاء عقد الإيجار',
    titleDe: 'Mietvertrag kündigen',
    emoji: '📄',
    textDe: `Sehr geehrte Damen und Herren,

hiermit kündige ich meinen Mietvertrag für die Wohnung in der Musterstraße 12, 10115 Berlin, fristgerecht zum nächstmöglichen Termin.

Bitte bestätigen Sie mir den Kündigungstermin schriftlich.

Ich bitte Sie, einen Termin für die Wohnungsübergabe zu vereinbaren.

Mit freundlichen Grüßen
[Ihr Name]`,
    textAr: `السادة المحترمون،

بموجب هذا أُنهي عقد إيجاري للشقة في شارع موستر 12، 10115 برلين، بالمهلة القانونية في أقرب موعد ممكن.

أرجو تأكيد موعد الإنهاء خطياً.

أطلب منكم تحديد موعد لتسليم الشقة.

مع أطيب التحيات
[اسمك]`
  },
  {
    id: 'reparatur',
    title: 'طلب إصلاح',
    titleDe: 'Reparatur melden',
    emoji: '🔧',
    textDe: `Sehr geehrte Hausverwaltung,

ich wohne in der Wohnung Nr. 5, 3. OG, Musterstraße 12.

Seit dem [Datum] funktioniert die Heizung in meinem Schlafzimmer nicht mehr. Ich bitte Sie, die Reparatur so schnell wie möglich zu veranlassen.

Ich bin telefonisch unter [Nummer] erreichbar.

Vielen Dank im Voraus.

Mit freundlichen Grüßen
[Ihr Name]`,
    textAr: `إدارة المبنى المحترمة،

أسكن في الشقة رقم 5، الطابق الثالث، شارع موستر 12.

منذ [التاريخ] لا تعمل التدفئة في غرفة نومي. أرجو منكم ترتيب الإصلاح في أسرع وقت ممكن.

يمكن الوصول إلي هاتفياً على الرقم [رقمك].

شكراً مقدماً.

مع أطيب التحيات
[اسمك]`
  },
  {
    id: 'krankschreibung',
    title: 'إبلاغ عن مرض',
    titleDe: 'Krankmeldung',
    emoji: '🤒',
    textDe: `Sehr geehrte/r Frau/Herr [Name des Chefs],

leider bin ich heute erkrankt und kann nicht zur Arbeit kommen.

Ich werde morgen zum Arzt gehen und Ihnen die Krankmeldung so schnell wie möglich zukommen lassen.

Voraussichtlich bin ich bis [Datum] wieder arbeitsfähig.

Mit freundlichen Grüßen
[Ihr Name]`,
    textAr: `السيد/السيدة [اسم المدير] المحترم/ة،

للأسف أنا مريض/ة اليوم ولا أستطيع الحضور للعمل.

سأذهب إلى الطبيب غداً وأرسل لكم الإجازة المرضية في أسرع وقت.

من المتوقع أن أعود للعمل بحلول [التاريخ].

مع أطيب التحيات
[اسمك]`
  },
  {
    id: 'termin',
    title: 'طلب موعد',
    titleDe: 'Termin vereinbaren',
    emoji: '📅',
    textDe: `Sehr geehrte Damen und Herren,

ich möchte gerne einen Termin bei Ihnen vereinbaren.

Mein Anliegen ist: [Grund].

Ich bin an folgenden Tagen verfügbar:
- Montag bis Mittwoch, 9:00-12:00 Uhr
- Donnerstag, 14:00-17:00 Uhr

Bitte teilen Sie mir einen passenden Termin mit.

Mit freundlichen Grüßen
[Ihr Name]
Tel.: [Ihre Telefonnummer]`,
    textAr: `السادة المحترمون،

أرغب في حجز موعد عندكم.

موضوعي هو: [السبب].

أنا متاح في الأيام التالية:
- الاثنين إلى الأربعاء، 9:00-12:00
- الخميس، 14:00-17:00

أرجو إبلاغي بموعد مناسب.

مع أطيب التحيات
[اسمك]
هاتف: [رقم هاتفك]`
  },
  {
    id: 'beschwerde',
    title: 'رسالة شكوى',
    titleDe: 'Beschwerde schreiben',
    emoji: '😤',
    textDe: `Sehr geehrte Damen und Herren,

am [Datum] habe ich bei Ihnen [Produkt/Dienstleistung] gekauft/bestellt (Bestellnummer: ...).

Leider ist [das Problem beschreiben]. Das entspricht nicht der vereinbarten Qualität.

Ich bitte Sie, [das Produkt umzutauschen / mir den Kaufpreis zu erstatten / das Problem zu beheben].

Bitte antworten Sie mir bis zum [Datum].

Mit freundlichen Grüßen
[Ihr Name]`,
    textAr: `السادة المحترمون،

في [التاريخ] اشتريت/طلبت عندكم [المنتج/الخدمة] (رقم الطلب: ...).

للأسف [وصف المشكلة]. هذا لا يتوافق مع الجودة المتفق عليها.

أرجو منكم [استبدال المنتج / استرداد المبلغ / حل المشكلة].

أرجو الرد علي بحلول [التاريخ].

مع أطيب التحيات
[اسمك]`
  },
]

export default function RedemittelPage() {
  const [activeSituation, setActiveSituation] = useState(situations[0].id)
  const [activeTab, setActiveTab] = useState<'phrases' | 'briefe'>('phrases')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedBrief, setExpandedBrief] = useState<string | null>(null)

  const currentSituation = situations.find(s => s.id === activeSituation)!

  const filteredPhrases = searchQuery
    ? situations.flatMap(s => s.phrases.map(p => ({ ...p, situation: s.title, emoji: s.emoji }))).filter(p =>
        p.de.toLowerCase().includes(searchQuery.toLowerCase()) || p.ar.includes(searchQuery)
      )
    : currentSituation.phrases.map(p => ({ ...p, situation: currentSituation.title, emoji: currentSituation.emoji }))

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
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

  return (
    <div className="space-y-6" dir="rtl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
        <span>›</span>
        <span className="text-[#00b894] font-bold">عبارات ونماذج رسائل</span>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2rem] p-8" style={{ background: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #0c0c1d 100%)' }}>
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,184,148,0.4), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(108,92,231,0.4), transparent 60%)' }} />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-black text-white mb-2">📋 عبارات ألمانية لكل موقف</h1>
          <p className="text-sm text-white/60">أكثر من 90 عبارة لـ 10 مواقف + 5 نماذج رسائل جاهزة</p>
          <div className="flex gap-2 justify-center mt-4">
            <button onClick={() => setActiveTab('phrases')} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'phrases' ? 'bg-[#00b894] text-white shadow-lg' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
              💬 عبارات ({situations.reduce((s, sit) => s + sit.phrases.length, 0)})
            </button>
            <button onClick={() => setActiveTab('briefe')} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'briefe' ? 'bg-[#00b894] text-white shadow-lg' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
              ✉️ نماذج رسائل ({briefVorlagen.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'phrases' && (
        <>
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث عن عبارة بالعربي أو الألماني..."
              className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white pr-12"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          {/* Situation Pills */}
          {!searchQuery && (
            <div className="flex gap-2 overflow-x-auto nav-scroll pb-2">
              {situations.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSituation(s.id)}
                  className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeSituation === s.id
                      ? 'bg-[#00b894] text-white shadow-lg shadow-[#00b894]/20'
                      : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-[#00b894]/30'
                  }`}
                >
                  <span>{s.emoji}</span>
                  <span>{s.title}</span>
                </button>
              ))}
            </div>
          )}

          {/* Phrases */}
          <div className="space-y-2">
            {searchQuery && <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">نتائج البحث: {filteredPhrases.length} عبارة</p>}
            {filteredPhrases.map((phrase, idx) => (
              <div
                key={idx}
                className="glass p-4 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-[#00b894]/30 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="bg-gray-100 dark:bg-white/5 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-gray-500 shrink-0 mt-0.5">{idx + 1}</span>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white text-left font-sans" dir="ltr">{phrase.de}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{phrase.ar}</p>
                    {searchQuery && <p className="text-[10px] text-gray-400">{phrase.emoji} {phrase.situation}</p>}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => speak(phrase.de)} className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-xs hover:bg-[#00b894]/10 hover:text-[#00b894] transition-all cursor-pointer" title="استمع">🔊</button>
                    <button onClick={() => copyText(phrase.de, `p-${idx}`)} className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-xs hover:bg-[#00b894]/10 hover:text-[#00b894] transition-all cursor-pointer" title="انسخ">
                      {copiedId === `p-${idx}` ? '✅' : '📋'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'briefe' && (
        <div className="space-y-4">
          {briefVorlagen.map(brief => (
            <div key={brief.id} className="glass rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden">
              <button
                onClick={() => setExpandedBrief(expandedBrief === brief.id ? null : brief.id)}
                className="w-full p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{brief.emoji}</span>
                  <div className="text-right">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{brief.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans" dir="ltr">{brief.titleDe}</p>
                  </div>
                </div>
                <span className={`text-gray-400 transition-transform ${expandedBrief === brief.id ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {expandedBrief === brief.id && (
                <div className="border-t border-gray-200 dark:border-white/5 p-5 space-y-4 animate-slideDown">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-[#00b894]">النص الألماني</span>
                        <div className="flex gap-1">
                          <button onClick={() => speak(brief.textDe)} className="text-xs text-gray-400 hover:text-[#00b894] transition-colors">🔊</button>
                          <button onClick={() => copyText(brief.textDe, brief.id)} className="text-xs text-gray-400 hover:text-[#00b894] transition-colors">
                            {copiedId === brief.id ? '✅ تم النسخ' : '📋 نسخ'}
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl text-xs font-sans text-left text-gray-700 dark:text-gray-300 whitespace-pre-wrap select-text leading-relaxed border border-gray-200 dark:border-white/10" dir="ltr">
                        {brief.textDe}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">الترجمة العربية</span>
                      <div className="bg-amber-50 dark:bg-amber-900/5 p-4 rounded-xl text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap select-text leading-relaxed border border-amber-200 dark:border-amber-700/20">
                        {brief.textAr}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
