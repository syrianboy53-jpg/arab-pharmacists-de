import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const dailyWords = [
  { word: 'das Formular', meaning: 'الاستمارة', example: 'Füllen Sie bitte das Formular aus.' },
  { word: 'der Termin', meaning: 'الموعد', example: 'Ich habe einen Termin beim Arzt.' },
  { word: 'die Bescheinigung', meaning: 'الشهادة/الإفادة', example: 'Ich brauche eine Bescheinigung vom Arbeitgeber.' },
  { word: 'der Antrag', meaning: 'الطلب', example: 'Ich möchte einen Antrag stellen.' },
  { word: 'die Unterlagen', meaning: 'الوثائق', example: 'Bringen Sie bitte alle Unterlagen mit.' },
  { word: 'die Anmeldung', meaning: 'التسجيل', example: 'Die Anmeldung ist kostenlos.' },
  { word: 'der Vertrag', meaning: 'العقد', example: 'Lesen Sie den Vertrag sorgfältig durch.' },
]

const sections = [
  {
    title: 'الميزات العصرية 🚀 (جديد)',
    items: [
      { label: 'بطاقات الذاكرة', path: '/flashcards', icon: '🃏', count: 'حفظ بأسلوب Tinder' },
      { label: 'مختبر النطق الذكي', path: '/pronunciation', icon: '🎙️', count: 'تدرب وقيم نطقك' },
      { label: 'المصحح الذكي للرسائل', path: '/brief-corrector', icon: '🤖', count: 'صحح أخطاء كتابتك' },
    ],
  },
  {
    title: 'نماذج Telc B1',
    items: [
      { label: 'القراءة (Lesen)', path: '/lesen', icon: '📖', count: '11 نموذج' },
      { label: 'الاستماع (Hören)', path: '/hoeren', icon: '🎧', count: '8 نماذج' },
      { label: 'الكتابة (Schreiben)', path: '/schreiben', icon: '✍️', count: '11 نموذج' },
      { label: 'Sprachbausteine', path: '/sprachbausteine', icon: '🧩', count: '5 نماذج' },
    ],
  },
  {
    title: 'ألعاب وأدوات تفاعلية',
    items: [
      { label: 'تحديد المستوى (Einstufung)', path: '/einstufung', icon: '📊', count: '15 سؤالاً تدريجياً' },
      { label: 'تركيب الجمل (Satzbau)', path: '/satzbau', icon: '🧱', count: 'ألعاب ترتيب بطاقات' },
      { label: 'تمارين القواعد (Drill)', path: '/drill', icon: '⚙️', count: 'تحدي القواعد التفاعلي' },
      { label: 'المترادفات (Synonyms)', path: '/synonyms', icon: '🃏', count: 'ألعاب مطابقة المترادفات' },
      { label: 'أخطاء شائعة (Fehler)', path: '/fehler', icon: '⚠️', count: 'بطاقات التعلّم الذكية' },
    ],
  },
  {
    title: 'القواعد والمفردات',
    items: [
      { label: 'القواعد (Grammatik)', path: '/grammar', icon: '📐', count: '12 درس' },
      { label: 'المفردات (Wortschatz)', path: '/vocabulary', icon: '📚', count: '500+ كلمة' },
    ],
  },
  {
    title: 'المحادثة والنجاح',
    items: [
      { label: 'المحادثة (Sprechen)', path: '/sprechen', icon: '🗣️', count: '3 أجزاء' },
      { label: 'B2 المتقدّم', path: '/b2', icon: '🎓', count: 'قريباً' },
    ],
  },
  {
    title: 'حياتك في ألمانيا',
    items: [
      { label: 'Leben in Deutschland', path: '/leben', icon: '🇩🇪', count: '460+ سؤال' },
    ],
  },
]

export default function HomePage() {
  const [streak, setStreak] = useState(0)
  const [todayWord, setTodayWord] = useState(dailyWords[0])

  useEffect(() => {
    const saved = localStorage.getItem('b1_streak')
    if (saved) setStreak(parseInt(saved))
    const dayIndex = new Date().getDay() % dailyWords.length
    setTodayWord(dailyWords[dayIndex])
  }, [])

  const handleShareApp = () => {
    const shareText = 'أوصيك بتطبيق B1-Syrer الرائع للتحضير لامتحان اللغة الألمانية B1! يحتوي على أقسام تفاعلية كاملة مع شرح بالعربية وألعاب لغوية تفاعلية 🚀'
    if (navigator.share) {
      navigator.share({
        title: 'B1-Syrer - تحضير امتحان B1',
        text: shareText,
        url: window.location.origin
      }).catch(err => console.log('Error sharing:', err))
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.origin)
      alert('تم نسخ رابط وتفاصيل المشاركة إلى الحافظة! شاركها الآن مع أصدقائك على واتساب أو فيسبوك 🎉')
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-bl from-green to-green-dark rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-sm mb-3 opacity-90">
            <svg width="24" height="16" viewBox="0 0 24 16" aria-label="علم الثورة السورية">
              <rect width="24" height="5.33" fill="#CE1126"/>
              <rect y="5.33" width="24" height="5.33" fill="#fff"/>
              <rect y="10.66" width="24" height="5.33" fill="#000"/>
              <circle cx="6" cy="8" r="1.5" fill="#CE1126"/>
              <circle cx="10" cy="8" r="1.5" fill="#CE1126"/>
              <circle cx="14" cy="8" r="1.5" fill="#CE1126"/>
            </svg>
            🇸🇾 تطبيق سوري • دعم للعرب والسوريين في ألمانيا
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            تطبيق تحضير امتحان B1 الألماني
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-xl">
            مخصّص للعرب والسوريين في ألمانيا. كل أقسام الامتحان بطريقة تفاعلية، مع شرح بالعربية، نماذج كاملة، عبارات ذهبية للحفظ، وأخطاء شائعة لتجنّبها.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/lesen" className="bg-red hover:bg-red-dark px-6 py-2.5 rounded-full font-bold text-sm transition-colors">
              🚀 ابدأ امتحاناً كاملاً
            </Link>
            <Link to="/premium" className="bg-white/20 hover:bg-white/30 px-6 py-2.5 rounded-full font-bold text-sm transition-colors">
              🔑 مفتاح النجاح
            </Link>
            <button onClick={handleShareApp} className="bg-gold hover:bg-gold/90 px-6 py-2.5 rounded-full font-bold text-sm transition-colors flex items-center gap-1.5 cursor-pointer">
              📢 شارك التطبيق
            </button>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-green">{streak} أيام</div>
          <div className="text-xs text-muted mt-1">🔥 تتابع الدراسة الحالي</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-green">{streak}</div>
          <div className="text-xs text-muted mt-1">🏆 أطول تتابع</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-green">{streak}</div>
          <div className="text-xs text-muted mt-1">📅 إجمالي أيام الدراسة</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm">
          <div className="font-bold text-green text-lg">{todayWord.word}</div>
          <div className="text-xs text-muted">{todayWord.meaning}</div>
          <div className="text-xs text-gray-400 mt-1 italic" dir="ltr">{todayWord.example}</div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-green font-bold mb-1">لماذا B1-Syrer.de؟</p>
        <h2 className="text-xl font-bold mb-4">ما يميّزنا عن باقي التطبيقات</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: '🇸🇾', title: 'مصمَّم للسوريين والعرب', desc: 'كلّ شرح بالعربي الفصيح + اللهجة السوريّة.' },
            { icon: '📱', title: 'يعمل أوفلاين بالكامل', desc: 'ثبّت التطبيق مرّة واحدة — يعمل بدون إنترنت.' },
            { icon: '🎯', title: 'محاكاة كاملة للامتحان', desc: 'كلّ أقسام Lesen / Hören / Schreiben / Sprechen.' },
            { icon: '⚡', title: 'تقدّم سريع ومتابعة يوميّة', desc: 'XP، streak، شارات، خطّة دراسة شخصيّة.' },
            { icon: '🆓', title: '90% من المحتوى مجّاني', desc: 'استخدمه مجاناً وادفع فقط لو أردت ميزات إضافيّة.' },
            { icon: '🏆', title: 'مستندات Goethe / telc / DTZ', desc: 'محتوى مبنيّ على الامتحانات الرسميّة.' },
          ].map((f, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <h3 className="font-bold text-sm">{f.title}</h3>
                <p className="text-xs text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section>
        <h2 className="text-xl font-bold mb-4">📱 الأقسام</h2>
        <p className="text-sm text-muted mb-6">تصميم iOS — كلّ قسم في مجموعة منظّمة. اضغط للدخول.</p>
        <div className="space-y-6">
          {sections.map((section, si) => (
            <div key={si}>
              <h3 className="font-bold text-green mb-3">{section.title}</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {section.items.map((item, ii) => (
                  <Link
                    key={ii}
                    to={item.path}
                    className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{item.label}</div>
                      <div className="text-xs text-muted">{item.count}</div>
                    </div>
                    <span className="text-gray-300">←</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Legal Footer for AdSense Compliance */}
      <footer className="text-center text-xs text-muted pt-6 pb-2 border-t border-gray-100 dark:border-gray-800">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          <a href="/impressum/" className="hover:text-green transition-colors">Impressum</a>
          <a href="/datenschutz/" className="hover:text-green transition-colors">Datenschutz</a>
          <a href="/agb/" className="hover:text-green transition-colors">AGB</a>
          <a href="/privacy/" className="hover:text-green transition-colors">Privacy</a>
        </div>
        <p>© 2026 B1-Syrer.de — Made with ❤️ in Germany</p>
      </footer>
    </div>
  )
}
