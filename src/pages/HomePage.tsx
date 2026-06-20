import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const dailyWords = [
  { word: 'das Formular', meaning: 'الاستمارة', example: 'Füllen Sie bitte das Formular aus.' },
  { word: 'der Termin', meaning: 'الموعد', example: 'Ich habe einen Termin beim Arzt.' },
  { word: 'die Bescheinigung', meaning: 'الشهادة/الإفادة', example: 'Ich brauche eine Bescheinigung vom Arbeitgeber.' },
  { word: 'der Antrag', meaning: 'الطلب', example: 'Ich möchte einen Antrag stellen.' },
  { word: 'die Unterlagen', meaning: 'الوثائق', example: 'Bringen Sie bitte alle Unterlagen mit.' },
  { word: 'die Anmeldung', meaning: 'التسجيل', example: 'Die Anmeldung ist kostenlos.' },
  { word: 'der Vertrag', meaning: 'العقد', example: 'Lesen Sie den Vertrag sorgfältig durch.' },
]

interface SectionItem {
  label: string
  path: string
  icon: string
  count: string
  isNew?: boolean
}

interface Section {
  title: string
  emoji: string
  subtitle: string
  color: string
  items: SectionItem[]
}

const sections: Section[] = [
  {
    title: 'الأساسيّات',
    emoji: '🆓',
    subtitle: 'كلّ ما تحتاجه للبدء — قواعد ومفردات وأمثلة مجاناً',
    color: 'from-emerald-500 to-teal-600',
    items: [
      { label: 'القواعد (Grammatik)', path: '/grammar', icon: '📚', count: 'أزمنة، حالات، أفعال — شرح كامل' },
      { label: 'المفردات (Wortschatz)', path: '/vocabulary', icon: '🗂️', count: '6000+ كلمة مترجَمة' },
      { label: 'القراءة (Lesen)', path: '/lesen', icon: '📖', count: 'نصوص + أسئلة' },
      { label: 'الاستماع (Hören)', path: '/hoeren', icon: '🎧', count: 'حوارات + إعلانات' },
      { label: 'الكتابة (Schreiben)', path: '/schreiben', icon: '✍️', count: 'نماذج رسائل + بريد' },
      { label: 'المحادثة (Sprechen)', path: '/sprechen', icon: '🎙️', count: 'الأجزاء الثلاثة' },
      { label: 'قوالب المحادثة', path: '/redemittel', icon: '💬', count: 'عبارات جاهزة + B2' },
      { label: 'بناء الجمل', path: '/satzbau', icon: '🧩', count: 'تمارين تركيب' },
    ],
  },
  {
    title: 'تدريبات تفاعليّة',
    emoji: '🎯',
    subtitle: 'تمارين قصيرة وذكيّة — كلّها مجّانية',
    color: 'from-violet-500 to-purple-600',
    items: [
      { label: 'مسابقات بجوائز', path: '/contests', icon: '🎁', count: 'فز بهدايا ومكافآت', isNew: true },
      { label: 'ادعُ صديقاً', path: '/referral', icon: '👥', count: 'صديق ينضمّ بكودك = مكافأة لكليكما', isNew: true },
      { label: 'خطّتي الشخصيّة لـB1', path: '/my-plan', icon: '🎯', count: 'أدخل تاريخ امتحانك → جدول يومي مفصّل', isNew: true },
      { label: 'تقييمات وتعليقات', path: '/reviews', icon: '⭐', count: 'قيّم التطبيق + اقرأ تجارب الآخرين', isNew: true },
      { label: 'تحدّي اليوم', path: '/daily', icon: '📅', count: '4 أسئلة جديدة كل يوم + 90 XP', isNew: true },
      { label: 'لوحة المتصدّرين', path: '/leaderboard', icon: '🏆', count: 'تنافس مع المتعلّمين كلّ أسبوع', isNew: true },
      { label: 'صندوق الإسعافات للامتحان', path: '/emergency', icon: '🚨', count: 'جمل تنقذك عند نسيان كلمة', isNew: true },
      { label: 'فخاخ المترادفات', path: '/synonyms', icon: '🎮', count: 'لعبة مطابقة 90+ زوج مرادفات', isNew: true },
      { label: 'ترتيب البطاقات', path: '/card-sort', icon: '🃏', count: 'لعبة Solitär — صنّف der/die/das', isNew: true },
      { label: 'مواعيد الكورسات', path: '/courses', icon: '📅', count: '30 معهداً في 13 مدينة + Online', isNew: true },
      { label: '30 خطأ شائع DaZ', path: '/fehler', icon: '⚠️', count: '30 خطأ مع الشرح والتصحيح', isNew: true },
      { label: 'Drill — Sprachbausteine', path: '/drill', icon: '🧠', count: '220 سؤال قواعد + SRS', isNew: true },
      { label: '5 نماذج B1 موضوعيّة', path: '/b1-models', icon: '📝', count: 'نماذج كاملة مع تصحيح', isNew: true },
      { label: 'موارد مجّانيّة موثوقة', path: '/resources', icon: '🌐', count: 'روابط DW + Goethe + telc + BAMF', isNew: true },
      { label: 'Sprachbausteine كاملة', path: '/sprachbausteine', icon: '🧩', count: '5 نماذج تدريب' },
      { label: 'مراجعة ذكيّة SRS', path: '/srs-review', icon: '🔄', count: 'مراجعة متباعدة ذكية', isNew: true },
      { label: 'مدرّب التصريف', path: '/conjugation', icon: '🔁', count: 'أفعال + Modalverben', isNew: true },
    ],
  },
  {
    title: 'الامتحان الكامل ومحاكاته',
    emoji: '📝',
    subtitle: 'محاكاة كاملة بالمؤقّت + امتحانات تجريبيّة',
    color: 'from-blue-500 to-indigo-600',
    items: [
      { label: 'محاكي Telc B1 الحقيقي', path: '/telc-sim', icon: '🎓', count: 'كلّ الأقسام + مؤقّت + تقييم', isNew: true },
      { label: 'امتحان كامل (مبسّط)', path: '/exam-simulation', icon: '🎯', count: 'نسخة سريعة' },
      { label: 'تحديد المستوى', path: '/einstufung', icon: '🎯', count: 'A1/A2/B1/B2' },
      { label: 'وصف صورة', path: '/bildbeschreibung', icon: '🖼️', count: 'Bildbeschreibung', isNew: true },
      { label: 'محاكي محادثة', path: '/chat-simulator', icon: '🎤', count: 'حوارات تفاعليّة' },
    ],
  },
  {
    title: 'الجنسيّة والاندماج',
    emoji: '🇩🇪',
    subtitle: 'محتوى متخصّص لاختبار الجنسيّة Leben in Deutschland',
    color: 'from-amber-500 to-orange-600',
    items: [
      { label: 'Leben in Deutschland', path: '/leben', icon: '🇩🇪', count: '310 سؤال' },
      { label: 'Einbürgerungstest', path: '/einbuergerung', icon: '🏛️', count: 'كتالوج كامل + 88 مترجَم', isNew: true },
      { label: 'مشاكل وحلول', path: '/problems', icon: '💡', count: 'دليل عملي', isNew: true },
    ],
  },
  {
    title: 'المستوى المتقدّم B2',
    emoji: '⭐',
    subtitle: 'قواعد متقدّمة + نماذج + أدوات ذكيّة — كلّها مجّانية',
    color: 'from-rose-500 to-pink-600',
    items: [
      { label: 'B2 كامل', path: '/b2', icon: '🇩🇪', count: 'قواعد متقدّمة + 300+ كلمة' },
      { label: '5 نماذج Telc B2', path: '/b2-models', icon: '🎓', count: 'كاملة مع تصحيح', isNew: true },
      { label: 'AI Writing Corrector', path: '/ai-corrector', icon: '🤖', count: 'تصحيح ذكي للنصوص', isNew: true },
      { label: 'وضع الضغط للاستماع', path: '/stress-listening', icon: '🔥', count: 'ضوضاء واقعيّة فوق التسجيل', isNew: true },
      { label: 'مدرّب القراءة السريعة', path: '/speed-reading', icon: '⏱', count: 'النصّ يختفي — تدريب Skimming', isNew: true },
    ],
  },
  {
    title: 'أدوات عمليّة',
    emoji: '🛠️',
    subtitle: 'أدوات تساعدك في إدارة تعلّمك',
    color: 'from-slate-500 to-gray-600',
    items: [
      { label: 'لوحتي الشخصيّة', path: '/dashboard', icon: '📊', count: 'تتبّع التقدّم', isNew: true },
      { label: 'مخطّط الدراسة', path: '/study-plan', icon: '📅', count: 'خطّة 4 أسابيع', isNew: true },
      { label: 'اطبع وذاكر', path: '/print', icon: '🖨️', count: 'PDF جاهز للطباعة', isNew: true },
      { label: 'شبكات الكلمات', path: '/word-web', icon: '🕸️', count: 'ربط المفردات', isNew: true },
      { label: 'بنك المواضيع', path: '/topics', icon: '📑', count: 'لـSprechen + Schreiben', isNew: true },
      { label: 'أدوات النجاح', path: '/tips', icon: '🧰', count: 'نصائح + استراتيجيّات', isNew: true },
      { label: 'اللهجة العامية', path: '/slang', icon: '🗣️', count: 'تعابير يوميّة' },
      { label: 'من نحن', path: '/about', icon: 'ℹ️', count: 'عن المشروع' },
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function HomePage() {
  const [todayWord, setTodayWord] = useState(dailyWords[0])
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [level, setLevel] = useState(1)

  useEffect(() => {
    const dayIndex = new Date().getDay() % dailyWords.length
    setTodayWord(dailyWords[dayIndex])

    // Load gamification data
    try {
      const saved = localStorage.getItem('b1_gamification')
      if (saved) {
        const data = JSON.parse(saved)
        setXp(data.xp || 0)
        setStreak(data.streak || 0)
        setLevel(Math.floor((data.xp || 0) / 500) + 1)
      }
    } catch {}
  }, [])

  const handleShareApp = () => {
    const shareText = 'أوصيك بتطبيق B1-Syrer الرائع للتحضير لامتحان اللغة الألمانية B1! يحتوي على 50+ قسم تفاعلي مجاني مع شرح بالعربية 🚀'
    if (navigator.share) {
      navigator.share({
        title: 'B1-Syrer - تحضير امتحان B1',
        text: shareText,
        url: window.location.origin
      }).catch(err => console.log('Error sharing:', err))
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.origin)
      alert('تم نسخ رابط المشاركة! شاركه مع أصدقائك 🎉')
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-bl from-emerald-600 to-teal-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-6xl">🇸🇾</div>
          <div className="absolute bottom-4 right-4 text-6xl">🇩🇪</div>
        </div>
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
            🆓 مجّاني بالكامل • مفتوح المصدر
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            تطبيق تحضير امتحان B1 الألماني
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-xl">
            50+ قسم تفاعلي مجاني — قواعد، مفردات، نماذج كاملة، ألعاب لغوية، محاكاة امتحان حقيقية، وأدوات ذكية. مصمّم للعرب والسوريين.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/einstufung" className="bg-white text-emerald-700 hover:bg-white/90 px-6 py-2.5 rounded-full font-bold text-sm transition-colors shadow-lg">
              🎯 حدّد مستواك الآن
            </Link>
            <Link to="/daily" className="bg-white/20 hover:bg-white/30 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors backdrop-blur-sm border border-white/30">
              📅 تحدّي اليوم
            </Link>
            <button onClick={handleShareApp} className="bg-white/20 hover:bg-white/30 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors backdrop-blur-sm border border-white/30 flex items-center gap-1.5 cursor-pointer">
              📢 شارك التطبيق
            </button>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-2xl font-bold text-emerald-600">{xp} XP</div>
          <div className="text-xs text-gray-500 mt-1">⚡ نقاط الخبرة</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-2xl font-bold text-orange-500">🔥 {streak}</div>
          <div className="text-xs text-gray-500 mt-1">تتابع الدراسة</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-2xl font-bold text-violet-600">Lv.{level}</div>
          <div className="text-xs text-gray-500 mt-1">🏆 مستواك الحالي</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="font-bold text-emerald-600 text-base" dir="ltr">{todayWord.word}</div>
          <div className="text-xs text-gray-500">{todayWord.meaning}</div>
          <div className="text-xs text-gray-400 mt-1 italic" dir="ltr">{todayWord.example}</div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <p className="text-sm text-emerald-600 font-bold mb-1">لماذا B1-Syrer.de؟</p>
        <h2 className="text-xl font-bold mb-4">ما يميّزنا عن باقي التطبيقات</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { icon: '🇸🇾', title: 'مصمَّم للسوريين والعرب', desc: 'كلّ شرح بالعربي الفصيح + اللهجة السوريّة.' },
            { icon: '📱', title: 'يعمل أوفلاين بالكامل', desc: 'ثبّت التطبيق مرّة واحدة — يعمل بدون إنترنت.' },
            { icon: '🎯', title: 'محاكاة كاملة للامتحان', desc: 'كلّ أقسام Lesen / Hören / Schreiben / Sprechen.' },
            { icon: '⚡', title: 'تقدّم سريع ومتابعة يوميّة', desc: 'XP، streak، شارات، خطّة دراسة شخصيّة.' },
            { icon: '🆓', title: 'مجّاني بالكامل', desc: '50+ قسم مفتوح المصدر بدون أيّ اشتراك أو دفع.' },
            { icon: '🏆', title: 'مستندات Goethe / telc / DTZ', desc: 'محتوى مبنيّ على الامتحانات الرسميّة.' },
          ].map((f, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <span className="text-2xl shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-bold text-sm">{f.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Banner */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-emerald-200 dark:border-emerald-800/30">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-inner">
              ف
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full animate-pulse"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white">الدعم المباشر — فادي</h3>
            <p className="text-sm text-emerald-600 font-medium flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              متاح — الردّ خلال ساعات قليلة
            </p>
          </div>
          <a href="https://t.me/b1syrer" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-[#229ED9] hover:bg-[#1C88BA] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-sm">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a5.8 5.8 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            تليغرام
          </a>
        </div>
      </section>

      {/* All Sections */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">📱 جميع الأقسام</h2>
          <p className="text-sm text-gray-500">50+ قسم تفاعلي — كلّها مجّانية ومفتوحة. اضغط للدخول.</p>
        </div>

        {sections.map((section, si) => (
          <motion.div
            key={si}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
          >
            {/* Section Header */}
            <div className={`bg-gradient-to-r ${section.color} rounded-xl p-4 mb-3 text-white`}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{section.emoji}</span>
                <div>
                  <h3 className="font-bold text-lg">{section.title}</h3>
                  <p className="text-white/80 text-xs">{section.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Section Items */}
            <div className="grid md:grid-cols-2 gap-3">
              {section.items.map((item, ii) => (
                <motion.div key={ii} variants={itemVariants}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 border border-gray-100 dark:border-gray-700 group"
                  >
                    <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm flex items-center gap-2">
                        {item.label}
                        {item.isNew && (
                          <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold shrink-0">جديد</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.count}</div>
                    </div>
                    <span className="text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 transition-colors">←</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Donate Banner */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 text-center border border-amber-200 dark:border-amber-800/30">
        <p className="text-lg font-bold mb-2">☕ ادعم استمرارية المشروع</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">هذا التطبيق مجّاني بالكامل. إذا أحببت دعمنا، يمكنك التبرّع بفنجان قهوة.</p>
        <a href="https://buymeacoffee.com/halawanyfav" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#FFDD00] text-black px-6 py-3 rounded-full font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          <span className="text-lg">☕</span> Buy me a Coffee
        </a>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 pt-6 pb-2 border-t border-gray-100 dark:border-gray-800">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          <a href="/impressum/" className="hover:text-emerald-600 transition-colors">Impressum</a>
          <a href="/datenschutz/" className="hover:text-emerald-600 transition-colors">Datenschutz</a>
          <a href="/agb/" className="hover:text-emerald-600 transition-colors">AGB</a>
          <a href="/privacy/" className="hover:text-emerald-600 transition-colors">Privacy</a>
        </div>
        <p>© 2026 B1-Syrer.de — Made with ❤️ in Germany 🇸🇾🇩🇪</p>
      </footer>
    </div>
  )
}
