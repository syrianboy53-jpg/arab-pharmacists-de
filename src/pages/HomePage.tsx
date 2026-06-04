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
    <div className="space-y-10 relative z-10">
      {/* Hero Section - Syrian Flag / Awwwards Premium Banner */}
      <section className="relative overflow-hidden rounded-3xl p-8 md:p-12 border border-green/20 bg-gradient-to-br from-green-deep/90 via-green-dark/80 to-surface/40 backdrop-blur-md shadow-2xl">
        {/* Animated Inner Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-accent/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gold/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-full px-4 py-1.5 text-xs font-bold text-white mb-5 backdrop-blur-sm">
            <svg width="20" height="13" viewBox="0 0 24 16" className="rounded-sm shadow-sm" aria-label="علم الثورة السورية">
              <rect width="24" height="5.33" fill="#CE1126"/>
              <rect y="5.33" width="24" height="5.33" fill="#fff"/>
              <rect y="10.66" width="24" height="5.33" fill="#000"/>
              <circle cx="6" cy="8" r="1.5" fill="#CE1126"/>
              <circle cx="10" cy="8" r="1.5" fill="#CE1126"/>
              <circle cx="14" cy="8" r="1.5" fill="#CE1126"/>
            </svg>
            <span>🇸🇾 تطبيق سوري • دعم كامل ومجاني للعرب والسوريين في ألمانيا</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
            بوابتك للنجاح في <span className="text-gold-accent">امتحان B1</span> الألماني
          </h1>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
            مخصّص لمساعدة العرب والسوريين في ألمانيا والنمسا. يحتوي على كل أقسام الامتحان الرسمية (Lesen / Hören / Schreiben / Sprechen) بطريقة تفاعلية ذكية، مع ترجمة كاملة للعربية وشرح القواعد.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/lesen" className="bg-red hover:bg-red-dark text-white px-8 py-3 rounded-2xl font-extrabold text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-red/20">
              🚀 ابدأ الدراسة الآن
            </Link>
            <Link to="/premium" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-2xl font-extrabold text-sm transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm">
              🔑 النسخة المميزة (Premium)
            </Link>
          </div>
        </div>
      </section>

      {/* Stats & Word of the Day Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="glass-card p-5 text-center bg-surface/40 backdrop-blur-md border-border/40 hover:border-green/30">
          <div className="text-3xl font-black text-green-accent mb-1">{streak} أيام</div>
          <div className="text-xs font-bold text-ink-soft">🔥 تتابع الدراسة الحالي</div>
        </div>
        <div className="glass-card p-5 text-center bg-surface/40 backdrop-blur-md border-border/40 hover:border-green/30">
          <div className="text-3xl font-black text-green-accent mb-1">{streak}</div>
          <div className="text-xs font-bold text-ink-soft">🏆 أطول تتابع دراسي</div>
        </div>
        <div className="glass-card p-5 text-center bg-surface/40 backdrop-blur-md border-border/40 hover:border-green/30">
          <div className="text-3xl font-black text-green-accent mb-1">{streak}</div>
          <div className="text-xs font-bold text-ink-soft">📅 إجمالي الأيام المسجلة</div>
        </div>
        <div className="glass-card p-5 text-center bg-surface/40 backdrop-blur-md border-border/40 hover:border-gold/30">
          <div className="font-black text-gold-accent text-base truncate mb-0.5" dir="ltr">{todayWord.word}</div>
          <div className="text-xs font-bold text-ink mb-1.5">{todayWord.meaning}</div>
          <div className="text-[10px] text-ink-soft italic truncate" dir="ltr">{todayWord.example}</div>
        </div>
      </section>

      {/* Why Us / Features section */}
      <section className="glass-card p-8 border border-border/40 bg-surface/50 backdrop-blur-md">
        <div className="mb-8">
          <span className="text-xs font-black text-green-accent uppercase tracking-wider bg-green-glow px-3 py-1 rounded-full border border-green/20">مميزات المنصة</span>
          <h2 className="text-2xl font-black text-ink mt-3">ما الذي يجعل منصة B1-Syrer فريدة؟</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🇸🇾', title: 'دعم كامل بالعربية', desc: 'شروحات مبسطة باللغة العربية الفصحى واللهجة السورية للمساعدة على الفهم.' },
            { icon: '📱', title: 'تطبيق ويب متجاوب (PWA)', desc: 'يعمل بكفاءة عالية على الهواتف والأجهزة اللوحية والكمبيوتر.' },
            { icon: '🎯', title: 'محاكاة واقعية للامتحان', desc: 'اختبارات تفاعلية تحاكي أنظمة امتحانات telc و Goethe و DTZ.' },
            { icon: '⚡', title: 'متابعة يومية تفاعلية', desc: 'نظام نقاط تتابع دراسي ومكافآت لزيادة الحماس للتعلم اليومي.' },
            { icon: '🆓', title: 'محتوى دراسي مجاني', desc: 'أكثر من 90% من نماذج امتحانات B1 متوفرة مجاناً للجميع.' },
            { icon: '🏆', title: 'شروحات القواعد والعبارات', desc: 'تجميع لأهم القوالب اللغوية الذهبية وأكثر الأخطاء الشائعة لتفاديها.' },
          ].map((f, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-surface-2/40 border border-border/20 hover:border-green-accent/20 hover:bg-green-glow transition-all duration-300">
              <span className="text-3xl flex-shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-extrabold text-sm text-ink mb-1">{f.title}</h3>
                <p className="text-xs text-ink-soft leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Page Sections Grid */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-black text-ink">📱 أقسام الدراسة والتدريب</h2>
          <p className="text-sm text-ink-soft mt-1">اختر القسم الذي ترغب بالتدرب عليه لبدء محاكاة الامتحان:</p>
        </div>
        <div className="space-y-8">
          {sections.map((section, si) => (
            <div key={si} className="space-y-4">
              <h3 className="text-sm font-black text-green-accent uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-3 rounded-full bg-green"></span>
                {section.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {section.items.map((item, ii) => (
                  <Link
                    key={ii}
                    to={item.path}
                    className="group glass-card flex items-center justify-between p-5 border border-border/40 hover:border-green-accent/30 bg-surface/30 hover:bg-surface-2/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-glow to-gold-glow border border-border/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-ink group-hover:text-green transition-colors">{item.label}</div>
                        <div className="text-xs text-ink-soft mt-0.5">{item.count}</div>
                      </div>
                    </div>
                    <span className="text-xl text-ink-soft/40 group-hover:text-green group-hover:translate-x-[-4px] transition-all">
                      ←
                    </span>
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
