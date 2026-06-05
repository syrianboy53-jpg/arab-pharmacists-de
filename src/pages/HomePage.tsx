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
    title: 'نماذج Telc B1',
    items: [
      { label: 'القراءة (Lesen)', path: '/lesen', icon: '📖', count: '11 نموذج' },
      { label: 'الاستماع (Hören)', path: '/hoeren', icon: '🎧', count: '8 نماذج' },
      { label: 'الكتابة (Schreiben)', path: '/schreiben', icon: '✍️', count: '11 نموذج' },
      { label: 'Sprachbausteine', path: '/sprachbausteine', icon: '🧩', count: '5 نماذج' },
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

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-bl from-green to-green-dark rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-lg border border-green/10">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 text-xs font-bold opacity-90">
            <svg width="24" height="16" viewBox="0 0 24 16" aria-label="علم الثورة السورية" className="rounded-sm shadow-sm">
              <rect width="24" height="5.33" fill="#CE1126"/>
              <rect y="5.33" width="24" height="5.33" fill="#fff"/>
              <rect y="10.66" width="24" height="5.33" fill="#000"/>
              <circle cx="6" cy="8" r="1.5" fill="#CE1126"/>
              <circle cx="10" cy="8" r="1.5" fill="#CE1126"/>
              <circle cx="14" cy="8" r="1.5" fill="#CE1126"/>
            </svg>
            <span className="tracking-wide">🇸🇾 تطبيق سوري • دعم للعرب والسوريين في ألمانيا</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
            تحضير امتحان B1 الألماني
          </h1>
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl">
            مخصّص للعرب والسوريين في ألمانيا. كل أقسام الامتحان بطريقة تفاعلية، مع شرح بالعربية، نماذج كاملة، عبارات ذهبية للحفظ، وأخطاء شائعة لتجنّبها.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link to="/lesen" className="bg-red hover:bg-red-dark px-6 py-3 rounded-full font-black text-sm transition-all duration-300 shadow-md shadow-green-accent/10 hover:scale-102">
              🚀 ابدأ امتحاناً كاملاً
            </Link>
            <Link to="/premium" className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full font-black text-sm transition-all duration-300 border border-white/20 hover:scale-102">
              🔑 مفتاح النجاح (Premium)
            </Link>
          </div>
        </div>
        {/* Decorative Grid Overlay for Hero */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      </section>

      {/* Stats Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 text-center">
          <div className="text-3xl font-black text-green">{streak} أيام</div>
          <div className="text-xs text-muted font-bold mt-1">🔥 تتابع الدراسة الحالي</div>
        </div>
        <div className="glass-card p-5 text-center">
          <div className="text-3xl font-black text-green">{streak}</div>
          <div className="text-xs text-muted font-bold mt-1">🏆 أطول تتابع</div>
        </div>
        <div className="glass-card p-5 text-center">
          <div className="text-3xl font-black text-green">{streak}</div>
          <div className="text-xs text-muted font-bold mt-1">📅 إجمالي أيام الدراسة</div>
        </div>
        <div className="glass-card p-5 text-center flex flex-col justify-center">
          <div className="font-bold text-green text-sm tracking-wide">{todayWord.word}</div>
          <div className="text-[10px] text-muted font-bold mt-0.5">{todayWord.meaning}</div>
          <div className="text-[9px] text-txt-d mt-1.5 italic" dir="ltr">{todayWord.example}</div>
        </div>
      </section>

      {/* Features */}
      <section className="glass-card p-6 md:p-8">
        <p className="text-xs text-green font-black uppercase tracking-wider mb-1">لماذا B1-Syrer.de؟</p>
        <h2 className="text-xl md:text-2xl font-black mb-6">ما يميّزنا عن باقي التطبيقات</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: '🇸🇾', title: 'مصمَّم للسوريين والعرب', desc: 'كلّ شرح بالعربي الفصيح + اللهجة السوريّة.' },
            { icon: '📱', title: 'يعمل أوفلاين بالكامل', desc: 'ثبّت التطبيق مرّة واحدة — يعمل بدون إنترنت.' },
            { icon: '🎯', title: 'محاكاة كاملة للامتحان', desc: 'كلّ أقسام Lesen / Hören / Schreiben / Sprechen.' },
            { icon: '⚡', title: 'تقدّم سريع ومتابعة يوميّة', desc: 'XP، streak، شارات، خطّة دراسة شخصيّة.' },
            { icon: '🆓', title: '90% من المحتوى مجّاني', desc: 'استخدمه مجاناً وادفع فقط لو أردت ميزات إضافيّة.' },
            { icon: '🏆', title: 'مستندات Goethe / telc / DTZ', desc: 'محتوى مبنيّ على الامتحانات الرسميّة.' },
          ].map((f, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/40 border border-border/40 hover:border-gold/20 transition-all duration-300">
              <span className="text-3xl">{f.icon}</span>
              <div>
                <h3 className="font-bold text-sm text-txt">{f.title}</h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">📱</span>
          <h2 className="text-xl font-black text-txt">الأقسام الرئيسية</h2>
        </div>
        <p className="text-xs text-muted font-bold">تصميم iOS منظّم – اضغط على القسم لبدء المذاكرة الفورية.</p>
        <div className="space-y-8 mt-6">
          {sections.map((section, si) => (
            <div key={si} className="space-y-3">
              <h3 className="font-black text-green text-xs tracking-wider uppercase">{section.title}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {section.items.map((item, ii) => (
                  <Link
                    key={ii}
                    to={item.path}
                    className="glass-card flex items-center gap-4 p-5 group"
                  >
                    <span className="text-3xl bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-2xl border border-border/40 group-hover:scale-105 transition-transform duration-300">{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-txt group-hover:text-green transition-colors">{item.label}</div>
                      <div className="text-xs text-muted mt-1">{item.count}</div>
                    </div>
                    <span className="text-green font-bold text-lg transition-transform group-hover:translate-x-1">←</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
