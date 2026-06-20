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
  gradient: string
  iconBg: string
  items: SectionItem[]
}

const sections: Section[] = [
  {
    title: 'الأساسيّات',
    emoji: '🆓',
    subtitle: 'كلّ ما تحتاجه للبدء — قواعد ومفردات وأمثلة مجاناً',
    gradient: 'from-[#00b894] to-[#00cec9]',
    iconBg: 'bg-[#00b894]/10 text-[#00b894]',
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
    gradient: 'from-[#6c5ce7] to-[#a29bfe]',
    iconBg: 'bg-[#6c5ce7]/10 text-[#6c5ce7]',
    items: [
      { label: 'مسابقات بجوائز', path: '/contests', icon: '🎁', count: 'فز بهدايا ومكافآت', isNew: true },
      { label: 'ادعُ صديقاً', path: '/referral', icon: '👥', count: 'صديق ينضمّ = مكافأة لكليكما', isNew: true },
      { label: 'خطّتي الشخصيّة لـB1', path: '/my-plan', icon: '🎯', count: 'جدول يومي مفصّل حتى الامتحان', isNew: true },
      { label: 'تقييمات وتعليقات', path: '/reviews', icon: '⭐', count: 'قيّم التطبيق + تجارب الآخرين', isNew: true },
      { label: 'تحدّي اليوم', path: '/daily', icon: '📅', count: '4 أسئلة يومية + 90 XP', isNew: true },
      { label: 'لوحة المتصدّرين', path: '/leaderboard', icon: '🏆', count: 'تنافس أسبوعي', isNew: true },
      { label: 'صندوق الإسعافات', path: '/emergency', icon: '🚨', count: 'جمل تنقذك في الامتحان', isNew: true },
      { label: 'فخاخ المترادفات', path: '/synonyms', icon: '🎮', count: '90+ زوج مرادفات', isNew: true },
      { label: 'ترتيب البطاقات', path: '/card-sort', icon: '🃏', count: 'der/die/das', isNew: true },
      { label: 'مواعيد الكورسات', path: '/courses', icon: '📅', count: '30 معهد في 13 مدينة', isNew: true },
      { label: '30 خطأ شائع DaZ', path: '/fehler', icon: '⚠️', count: 'مع الشرح والتصحيح', isNew: true },
      { label: 'Drill — Sprachbausteine', path: '/drill', icon: '🧠', count: '220 سؤال + SRS', isNew: true },
      { label: '5 نماذج B1 موضوعيّة', path: '/b1-models', icon: '📝', count: 'نماذج كاملة', isNew: true },
      { label: 'موارد مجّانيّة', path: '/resources', icon: '🌐', count: 'DW + Goethe + telc', isNew: true },
      { label: 'Sprachbausteine', path: '/sprachbausteine', icon: '🧩', count: '5 نماذج تدريب' },
      { label: 'مراجعة ذكيّة SRS', path: '/srs-review', icon: '🔄', count: 'مراجعة متباعدة', isNew: true },
      { label: 'مدرّب التصريف', path: '/conjugation', icon: '🔁', count: 'أفعال + Modalverben', isNew: true },
    ],
  },
  {
    title: 'الامتحان الكامل',
    emoji: '📝',
    subtitle: 'محاكاة كاملة بالمؤقّت + امتحانات تجريبيّة',
    gradient: 'from-[#0984e3] to-[#74b9ff]',
    iconBg: 'bg-[#0984e3]/10 text-[#0984e3]',
    items: [
      { label: 'محاكي Telc B1 الحقيقي', path: '/telc-sim', icon: '🎓', count: 'كلّ الأقسام + مؤقّت', isNew: true },
      { label: 'امتحان كامل (مبسّط)', path: '/exam-simulation', icon: '🎯', count: 'نسخة سريعة' },
      { label: 'تحديد المستوى', path: '/einstufung', icon: '📊', count: 'A1 → B2' },
      { label: 'وصف صورة', path: '/bildbeschreibung', icon: '🖼️', count: 'Bildbeschreibung', isNew: true },
      { label: 'محاكي محادثة', path: '/chat-simulator', icon: '🎤', count: 'حوارات تفاعليّة' },
    ],
  },
  {
    title: 'الجنسيّة والاندماج',
    emoji: '🇩🇪',
    subtitle: 'محتوى متخصّص لاختبار الجنسيّة',
    gradient: 'from-[#fdcb6e] to-[#e17055]',
    iconBg: 'bg-[#fdcb6e]/10 text-[#e17055]',
    items: [
      { label: 'Leben in Deutschland', path: '/leben', icon: '🇩🇪', count: '310 سؤال' },
      { label: 'Einbürgerungstest', path: '/einbuergerung', icon: '🏛️', count: '88 سؤال مترجَم', isNew: true },
      { label: 'مشاكل وحلول', path: '/problems', icon: '💡', count: 'دليل عملي', isNew: true },
    ],
  },
  {
    title: 'المستوى المتقدّم B2',
    emoji: '⭐',
    subtitle: 'قواعد متقدّمة + نماذج + أدوات ذكيّة',
    gradient: 'from-[#e84393] to-[#fd79a8]',
    iconBg: 'bg-[#e84393]/10 text-[#e84393]',
    items: [
      { label: 'B2 كامل', path: '/b2', icon: '🇩🇪', count: 'قواعد + 300+ كلمة' },
      { label: '5 نماذج Telc B2', path: '/b2-models', icon: '🎓', count: 'كاملة مع تصحيح', isNew: true },
      { label: 'AI Writing Corrector', path: '/ai-corrector', icon: '🤖', count: 'تصحيح ذكي', isNew: true },
      { label: 'وضع الضغط للاستماع', path: '/stress-listening', icon: '🔥', count: 'ضوضاء واقعيّة', isNew: true },
      { label: 'مدرّب القراءة السريعة', path: '/speed-reading', icon: '⏱', count: 'تدريب Skimming', isNew: true },
    ],
  },
  {
    title: 'أدوات عمليّة',
    emoji: '🛠️',
    subtitle: 'أدوات تساعدك في إدارة تعلّمك',
    gradient: 'from-[#636e72] to-[#b2bec3]',
    iconBg: 'bg-[#636e72]/10 text-[#636e72]',
    items: [
      { label: 'لوحتي الشخصيّة', path: '/dashboard', icon: '📊', count: 'تتبّع التقدّم', isNew: true },
      { label: 'مخطّط الدراسة', path: '/study-plan', icon: '📅', count: 'خطّة 4 أسابيع', isNew: true },
      { label: 'اطبع وذاكر', path: '/print', icon: '🖨️', count: 'PDF جاهز', isNew: true },
      { label: 'شبكات الكلمات', path: '/word-web', icon: '🕸️', count: 'ربط المفردات', isNew: true },
      { label: 'بنك المواضيع', path: '/topics', icon: '📑', count: 'Sprechen + Schreiben', isNew: true },
      { label: 'أدوات النجاح', path: '/tips', icon: '🧰', count: 'نصائح واستراتيجيّات', isNew: true },
      { label: 'اللهجة العامية', path: '/slang', icon: '🗣️', count: 'تعابير يوميّة' },
      { label: 'من نحن', path: '/about', icon: 'ℹ️', count: 'عن المشروع' },
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export default function HomePage() {
  const [todayWord, setTodayWord] = useState(dailyWords[0])
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [level, setLevel] = useState(1)

  useEffect(() => {
    const dayIndex = new Date().getDay() % dailyWords.length
    setTodayWord(dailyWords[dayIndex])
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
    const shareText = 'أوصيك بتطبيق B1-Syrer للتحضير لامتحان B1! 50+ قسم تفاعلي مجاني 🚀'
    if (navigator.share) {
      navigator.share({ title: 'B1-Syrer', text: shareText, url: window.location.origin }).catch(() => {})
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.origin)
      alert('تم نسخ الرابط! 🎉')
    }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* ── Hero ── */}
      <section className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#0f2940] to-[#0a1628]" />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #00b894 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6c5ce7 0%, transparent 50%)' }} />
        <div className="relative z-10 p-6 sm:p-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-white dark:bg-[#1a1a2e]/10 backdrop-blur-sm text-white/90 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#00b894] animate-pulse" />
              مجّاني ومفتوح المصدر
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-3 leading-tight">
            تطبيق تحضير امتحان<br />
            <span className="bg-gradient-to-r from-[#00b894] to-[#00cec9] bg-clip-text text-transparent">B1 الألماني</span>
          </h1>
          <p className="text-gray-900 dark:text-white/60 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
            50+ قسم تفاعلي — قواعد، مفردات، نماذج كاملة، ألعاب لغوية، محاكاة امتحان. مصمّم للعرب والسوريين 🇸🇾
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/einstufung" className="inline-flex items-center gap-2 bg-[#00b894] hover:bg-[#00a884] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-[#00b894]/25">
              🎯 حدّد مستواك
            </Link>
            <Link to="/daily" className="inline-flex items-center gap-2 bg-white dark:bg-[#1a1a2e]/10 hover:bg-white dark:bg-[#1a1a2e]/15 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all backdrop-blur-sm border border-gray-200 dark:border-white/10">
              📅 تحدّي اليوم
            </Link>
            <button onClick={handleShareApp} className="inline-flex items-center gap-2 bg-white dark:bg-[#1a1a2e]/10 hover:bg-white dark:bg-[#1a1a2e]/15 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all backdrop-blur-sm border border-gray-200 dark:border-white/10 cursor-pointer">
              📢 شارك
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-4 gap-2 sm:gap-3">
        {[
          { value: `${xp}`, label: 'XP', color: 'text-[#00b894]', icon: '⚡' },
          { value: `${streak}`, label: 'تتابع', color: 'text-[#e17055]', icon: '🔥' },
          { value: `Lv.${level}`, label: 'مستوى', color: 'text-[#6c5ce7]', icon: '🏆' },
          { value: todayWord.word, label: todayWord.meaning, color: 'text-[#0984e3]', icon: '' },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-3 text-center border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:border-white/10 dark:hover:border-white/10 transition-colors">
            <div className={`text-lg sm:text-xl font-black ${s.color}`}>{s.icon} {s.value}</div>
            <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── Features ── */}
      <section className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-5 border border-gray-100 dark:border-white/5">
        <h2 className="text-base font-black mb-4 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-[#00b894]" />
          لماذا B1-Syrer؟
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { icon: '🇸🇾', title: 'للسوريين والعرب' },
            { icon: '📱', title: 'يعمل أوفلاين' },
            { icon: '🎯', title: 'محاكاة الامتحان' },
            { icon: '⚡', title: 'تقدّم يومي' },
            { icon: '🆓', title: 'مجّاني 100%' },
            { icon: '🏆', title: 'Goethe / telc' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5">
              <span className="text-lg">{f.icon}</span>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{f.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Support ── */}
      <section className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00b894] to-[#00cec9] flex items-center justify-center text-white text-lg font-black">ف</div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#1a1a2e] rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-gray-900 dark:text-gray-900 dark:text-white">فادي — الدعم المباشر</p>
            <p className="text-xs text-green-500 flex items-center gap-1">● متاح</p>
          </div>
          <a href="https://t.me/b1syrer" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-[#229ED9] hover:bg-[#1a8ac4] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors">
            تليغرام
          </a>
        </div>
      </section>

      {/* ── All Sections ── */}
      <div className="space-y-5">
        <h2 className="text-lg font-black text-center">جميع الأقسام · <span className="text-[#00b894]">50+</span></h2>

        {sections.map((section, si) => (
          <motion.section
            key={si}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            variants={containerVariants}
          >
            {/* Section header */}
            <div className="flex items-center gap-3 mb-3 px-1">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-white text-lg shadow-lg`}>
                {section.emoji}
              </div>
              <div>
                <h3 className="font-black text-sm text-gray-900 dark:text-gray-900 dark:text-white">{section.title}</h3>
                <p className="text-[11px] text-gray-400">{section.subtitle}</p>
              </div>
            </div>

            {/* Items grid */}
            <div className="grid sm:grid-cols-2 gap-2">
              {section.items.map((item, ii) => (
                <motion.div key={ii} variants={itemVariants}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 bg-white dark:bg-[#1a1a2e] rounded-xl p-3.5 border border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/15 transition-all group hover:shadow-sm"
                  >
                    <div className={`w-9 h-9 rounded-lg ${section.iconBg} flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[13px] text-gray-800 dark:text-gray-200">{item.label}</span>
                        {item.isNew && (
                          <span className="text-[9px] bg-[#e84393] text-white px-1.5 py-0.5 rounded font-bold leading-none">جديد</span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 truncate">{item.count}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 dark:text-gray-400 group-hover:text-[#00b894] transition-colors shrink-0 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* ── Donate ── */}
      <section className="bg-gradient-to-r from-[#fdcb6e]/10 to-[#e17055]/10 dark:from-[#fdcb6e]/5 dark:to-[#e17055]/5 rounded-2xl p-6 text-center border border-[#fdcb6e]/20">
        <p className="text-base font-black mb-1">☕ ادعم المشروع</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">تطبيق مجّاني بالكامل. دعمك يساعدنا نستمر.</p>
        <a href="https://buymeacoffee.com/halawanyfav" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#FFDD00] hover:bg-[#f5d400] text-black px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all">
          ☕ Buy me a Coffee
        </a>
      </section>

      {/* ── Footer ── */}
      <footer className="text-center text-[11px] text-gray-400 pt-4 border-t border-gray-100 dark:border-white/5">
        <div className="flex flex-wrap justify-center gap-3 mb-2">
          <a href="/impressum/" className="hover:text-[#00b894] transition-colors">Impressum</a>
          <a href="/datenschutz/" className="hover:text-[#00b894] transition-colors">Datenschutz</a>
          <a href="/agb/" className="hover:text-[#00b894] transition-colors">AGB</a>
          <a href="/privacy/" className="hover:text-[#00b894] transition-colors">Privacy</a>
        </div>
        <p>© 2026 B1-Syrer.de — Made with ❤️ in Germany 🇸🇾🇩🇪</p>
      </footer>
    </div>
  )
}
