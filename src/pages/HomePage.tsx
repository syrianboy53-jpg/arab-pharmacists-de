import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flame, Star, Zap, Trophy, ChevronLeft, BookOpen, Gamepad2, GraduationCap, Globe } from 'lucide-react'
import { useXP } from '../hooks/useXP'
import { usePWA } from '../hooks/usePWA'
import { getLevelFromXP, getLevelTitle, getProgressToNextLevel } from '../lib/gamification'

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
  highlight?: boolean
  color?: string
}

interface Section {
  title: string
  emoji: string
  subtitle: string
  gradient: string
  hoverClass: string
  borderColor: string
  accentColor: string
  LucideIcon: React.ElementType
  items: SectionItem[]
}



const sections: Section[] = [
  {
    title: 'الأساسيّات',
    emoji: '📚',
    subtitle: 'قواعد ومفردات للبدء بقوة',
    gradient: 'from-emerald-500 to-teal-500',
    hoverClass: 'card-hover-green',
    borderColor: 'hover:border-emerald-400/40',
    accentColor: 'text-emerald-600 dark:text-emerald-400',
    LucideIcon: BookOpen,
    items: [
      { label: 'القواعد (Grammatik)', path: '/grammar', icon: '📝', count: 'أزمنة، حالات، أفعال', color: 'from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30' },
      { label: 'المفردات (Wortschatz)', path: '/vocabulary', icon: '🗂️', count: '6000+ كلمة', color: 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30' },
      { label: 'القراءة (Lesen)', path: '/lesen', icon: '📖', count: 'نصوص وأسئلة', color: 'from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30' },
      { label: 'الاستماع (Hören)', path: '/hoeren', icon: '🎧', count: 'حوارات وإعلانات', color: 'from-cyan-100 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/30' },
      { label: 'الكتابة (Schreiben)', path: '/schreiben', icon: '✍️', count: 'نماذج رسائل', color: 'from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30' },
      { label: 'المحادثة (Sprechen)', path: '/sprechen', icon: '🎙️', count: 'الأجزاء الثلاثة', color: 'from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30' },
      { label: 'قوالب المحادثة', path: '/redemittel', icon: '💬', count: 'عبارات جاهزة', color: 'from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30' },
      { label: 'بناء الجمل', path: '/satzbau', icon: '🧩', count: 'تمارين تركيب', color: 'from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30' },
      { label: 'مدرب الأرقام', path: '/zahlen', icon: '🔢', count: '6 مستويات تفاعلية', isNew: true, color: 'from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30' },
      { label: 'تعبيرات اصطلاحية', path: '/redewendungen', icon: '🎭', count: '20 تعبير + اختبار', isNew: true, color: 'from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30' },
    ],
  },
  {
    title: 'تدريبات تفاعليّة',
    emoji: '🎮',
    subtitle: 'تمارين ذكية وألعاب تعليمية',
    gradient: 'from-violet-500 to-purple-600',
    hoverClass: 'card-hover-purple',
    borderColor: 'hover:border-violet-400/40',
    accentColor: 'text-violet-600 dark:text-violet-400',
    LucideIcon: Gamepad2,
    items: [
      { label: 'تحدّي اليوم', path: '/daily', icon: '📅', count: '+150 XP يومياً', highlight: true, color: 'from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30' },
      { label: '🎲 عجلة الحظ اللغوية', path: '/wheel', icon: '🎲', count: '8 تحديات عشوائية', isNew: true, color: 'from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30' },
      { label: '⚡ تحدي السرعة', path: '/speed-rush', icon: '⚡', count: '60 ثانية من النار!', isNew: true, color: 'from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30' },
      { label: '📖 قصص B1 التفاعلية', path: '/stories', icon: '📖', count: '5 قصص + فهم + XP', isNew: true, color: 'from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30' },
      { label: '🏅 غرفة الإنجازات', path: '/achievements', icon: '🏅', count: '26 شارة للفتح', isNew: true, color: 'from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30' },
      { label: 'غرفة الهروب 🔐', path: '/escape-room', icon: '🚪', count: 'ألغاز قواعدية مثيرة', color: 'from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30' },
      { label: 'صانع رسائل B1', path: '/magic-letter', icon: '✉️', count: 'توليد رسائل تلقائياً', isNew: true, color: 'from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30' },
      { label: 'لعبة المشنقة', path: '/hangman', icon: '🧗', count: 'خمن الكلمة وانجُ', isNew: true, color: 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30' },
      { label: 'الإملاء الصوتي', path: '/dictation', icon: '🎧', count: 'استمع واكتب بدقة', isNew: true, color: 'from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30' },
      { label: 'مدرّب التصريف', path: '/conjugation', icon: '🔁', count: 'أفعال و أزمنة', color: 'from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30' },
      { label: 'فخاخ المترادفات', path: '/synonyms', icon: '🪤', count: '90+ زوج مرادفات', color: 'from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30' },
      { label: 'ترتيب البطاقات', path: '/card-sort', icon: '🃏', count: 'der/die/das', color: 'from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30' },
      { label: 'مراجعة ذكيّة', path: '/srs-review', icon: '🔄', count: 'مراجعة متباعدة', color: 'from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30' },
      { label: 'Drill — Bausteine', path: '/drill', icon: '🧠', count: '220 سؤال', color: 'from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30' },
      { label: '30 خطأ شائع', path: '/fehler', icon: '⚠️', count: 'تجنبها بالامتحان', color: 'from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30' },
      { label: 'الأسئلة الموضوعيّة', path: '/b1-models', icon: '📋', count: '5 نماذج كاملة', color: 'from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30' },
    ],
  },
  {
    title: 'الامتحان والتقييم',
    emoji: '🎓',
    subtitle: 'محاكاة كاملة وتصحيح ذكي',
    gradient: 'from-sky-500 to-blue-600',
    hoverClass: 'card-hover-blue',
    borderColor: 'hover:border-sky-400/40',
    accentColor: 'text-sky-600 dark:text-sky-400',
    LucideIcon: GraduationCap,
    items: [
      { label: 'بوابة امتحان DTZ', path: '/dtz', icon: '🇩🇪', count: 'تدريب شامل', highlight: true, color: 'from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30' },
      { label: 'محاكي Telc B1', path: '/telc-sim', icon: '⏱️', count: 'امتحان كامل بمؤقت', color: 'from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30' },
      { label: 'المصحح الذكي', path: '/ai-corrector', icon: '🤖', count: 'تصحيح الرسائل بـ AI', color: 'from-sky-100 to-cyan-100 dark:from-sky-900/30 dark:to-cyan-900/30' },
      { label: 'امتحان (مبسّط)', path: '/exam-simulation', icon: '🎯', count: 'نسخة سريعة', color: 'from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30' },
      { label: 'تحديد المستوى', path: '/einstufung', icon: '📊', count: 'A1 → B2', color: 'from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30' },
      { label: 'محاكي المحادثة', path: '/chat-simulator', icon: '💬', count: 'حوارات تفاعليّة', color: 'from-cyan-100 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/30' },
      { label: 'وصف صورة', path: '/bildbeschreibung', icon: '🖼️', count: 'تدريب النطق', color: 'from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30' },
      { label: 'صندوق الإسعافات', path: '/emergency', icon: '🚨', count: 'طوارئ الامتحان', color: 'from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30' },
    ],
  },
  {
    title: 'الاندماج والمجتمع',
    emoji: '🌍',
    subtitle: 'كل ما تحتاجه للحياة في ألمانيا',
    gradient: 'from-amber-500 to-orange-500',
    hoverClass: 'card-hover-orange',
    borderColor: 'hover:border-amber-400/40',
    accentColor: 'text-amber-600 dark:text-amber-400',
    LucideIcon: Globe,
    items: [
      { label: 'اختبار التجنس', path: '/einbuergerung', icon: '🏛️', count: 'محاكاة 33 سؤال', color: 'from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30' },
      { label: 'Leben in Deutschland', path: '/leben', icon: '🇩🇪', count: '300 سؤال', color: 'from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30' },
      { label: 'دليل الطوارئ', path: '/emergency', icon: '🏥', count: 'أرقام طبية عاجلة', color: 'from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30' },
      { label: 'مسابقات', path: '/contests', icon: '🎁', count: 'هدايا ومكافآت', color: 'from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30' },
      { label: 'لوحة المتصدّرين', path: '/leaderboard', icon: '🏆', count: 'التنافس الأسبوعي', color: 'from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30' },
      { label: 'خطّتي الشخصيّة', path: '/my-plan', icon: '🗺️', count: 'جدول دراسي', color: 'from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30' },
    ],
  },
  {
    title: 'الحياة في ألمانيا',
    emoji: '🇩🇪',
    subtitle: 'دليلك الشامل للعيش والعمل والتنقل',
    gradient: 'from-rose-500 to-pink-600',
    hoverClass: 'card-hover-pink',
    borderColor: 'hover:border-rose-400/40',
    accentColor: 'text-rose-600 dark:text-rose-400',
    LucideIcon: Globe,
    items: [
      { label: 'خريطة ألمانيا', path: '/germany-map', icon: '🗺️', count: '16 ولاية تفاعلية', isNew: true, color: 'from-emerald-100 to-teal-100' },
      { label: 'سوق العمل', path: '/jobs', icon: '💼', count: 'مقابلات وحقوق', isNew: true, color: 'from-blue-100 to-indigo-100' },
      { label: 'السكن والإيجار', path: '/wohnung', icon: '🏠', count: 'عقود ورسائل', isNew: true, color: 'from-orange-100 to-amber-100' },
      { label: 'المواصلات العامة', path: '/transport', icon: '🚌', count: 'قطارات وباصات', isNew: true, color: 'from-sky-100 to-blue-100' },
      { label: 'قاموس الطعام', path: '/food', icon: '🍽️', count: '80+ أكلة ألمانية', isNew: true, color: 'from-red-100 to-orange-100' },
      { label: 'وثائق رسمية', path: '/docs', icon: '📋', count: '20 وثيقة مشروحة', isNew: true, color: 'from-gray-100 to-slate-100' },
      { label: 'تعلم بالأغاني', path: '/songs', icon: '🎵', count: '8 أغاني ألمانية', isNew: true, color: 'from-violet-100 to-purple-100' },
      { label: 'لعبة الذاكرة', path: '/memory', icon: '🧠', count: '4 مستويات صعوبة', isNew: true, color: 'from-fuchsia-100 to-pink-100' },
      { label: 'عبارات ونماذج رسائل', path: '/redemittel-hub', icon: '📋', count: '90+ عبارة + 5 رسائل', isNew: true, color: 'from-teal-100 to-emerald-100' },
      { label: 'حوارات يومية', path: '/dialoge', icon: '💬', count: '6 حوارات واقعية', isNew: true, color: 'from-green-100 to-lime-100' },
      { label: 'دليل الثقافة', path: '/kultur', icon: '🇩🇪', count: '23 نصيحة عملية', isNew: true, color: 'from-amber-100 to-yellow-100' },
    ],
  },
]

const levels = [
  { code: 'A1', label: 'مبتدئ', path: '/a1', from: 'from-emerald-400', to: 'to-green-500', ring: 'ring-emerald-400/50', glow: 'rgba(52,211,153,0.4)' },
  { code: 'A2', label: 'أساسي', path: '/a2', from: 'from-yellow-400', to: 'to-amber-500', ring: 'ring-yellow-400/50', glow: 'rgba(251,191,36,0.4)' },
  { code: 'B1', label: 'متوسط', path: '/b1', from: 'from-sky-400', to: 'to-blue-600', ring: 'ring-sky-400/50', glow: 'rgba(56,189,248,0.4)', active: true },
  { code: 'B2', label: 'متقدم', path: '/b2-hub', from: 'from-orange-400', to: 'to-red-500', ring: 'ring-orange-400/50', glow: 'rgba(251,146,60,0.4)' },
  { code: 'C1', label: 'احتراف', path: '/c1', from: 'from-rose-500', to: 'to-pink-600', ring: 'ring-rose-400/50', glow: 'rgba(251,113,133,0.4)' },
]

export default function HomePage() {
  const { xp, streak, todayCompleted } = useXP()
  const { isInstallable, promptInstall } = usePWA()
  const [dailyWordIdx, setDailyWordIdx] = useState(0)
  const currentLevelNum = getLevelFromXP(xp)
  const levelTitle = getLevelTitle(currentLevelNum)
  const xpProgress = getProgressToNextLevel(xp)

  useEffect(() => {
    const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
    setDailyWordIdx(day % dailyWords.length)
  }, [])

  const word = dailyWords[dailyWordIdx]

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 relative z-10">

      {/* PWA Install Banner */}
      {isInstallable && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 shadow-2xl shadow-blue-500/30"
        >
          <div className="bg-sky-600/90 dark:bg-[#0a0a1a]/80 backdrop-blur-xl rounded-[20px] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-3xl shadow-inner border border-white/20">📲</div>
              <div>
                <h3 className="text-lg font-black text-white">حمّل التطبيق الآن!</h3>
                <p className="text-sm text-white/70 font-semibold">تجربة أسرع بدون إنترنت</p>
              </div>
            </div>
            <button
              onClick={promptInstall}
              className="w-full sm:w-auto bg-white text-blue-600 px-6 py-2.5 rounded-xl font-black shadow-lg hover:scale-105 transition-transform"
            >
              تثبيت 📥
            </button>
          </div>
        </motion.div>
      )}

      {/* Free Downloads Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-[20px] p-6 shadow-xl border border-emerald-500/30"
        style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center md:text-right">
            <h2 className="text-2xl font-black text-white mb-2 flex items-center justify-center md:justify-start gap-2">
              <span>🎁</span> هدايا مجانية وحصرية للمتعلمين!
            </h2>
            <p className="text-gray-400 text-sm max-w-lg">
              حمل الآن كتاب تعلّم اللغة الألمانية B1 ونماذج امتحانات Telc مجاناً للمساعدة في التحضير السريع والمضمون.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center w-full md:w-auto">
            <a
              href="/B1-Syrer-Book.docx"
              download
              className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 px-5 py-2.5 rounded-xl font-bold transition-colors"
            >
              <span className="text-xl">📘</span> حمل كتاب B1
            </a>
            <a
              href="/B1-Modelltests.zip"
              download
              className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/50 text-blue-400 hover:bg-blue-500/20 px-5 py-2.5 rounded-xl font-bold transition-colors"
            >
              <span className="text-xl">📂</span> نماذج الامتحانات
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── HERO SECTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2.5rem] p-1 shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #00b894, #0984e3, #6c5ce7, #00b894)', backgroundSize: '300% 300%', animation: 'gradient-x 6s ease infinite' }}
      >
        <div className="relative rounded-[2rem] overflow-hidden bg-white/85 dark:bg-[#0d0d22]/90 backdrop-blur-2xl p-8 md:p-10 border border-white/40 dark:border-white/[0.04]">
          {/* Decorative blobs */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br from-emerald-400/20 to-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-gradient-to-br from-violet-400/20 to-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-5 gap-8 items-center">
            {/* Left: Welcome + Info */}
            <div className="lg:col-span-3 space-y-5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-black rounded-full shadow-md">
                  <Star size={12} fill="currentColor" /> المستوى {currentLevelNum}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-bold">{levelTitle}</span>
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-3">
                  أهلاً بك في{' '}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(135deg, #00b894, #0984e3, #6c5ce7)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
                  >
                    B1 Syrer
                  </span>{' '}
                  🚀
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-xl">
                  منصتك الشاملة للنجاح في امتحان اللغة الألمانية والحياة في ألمانيا. تدرب بذكاء!
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Zap size={20} className="text-emerald-400" />, value: `${xp}`, label: 'نقطة XP', bg: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/40' },
                  { icon: <Flame size={20} className="text-orange-400" />, value: `${streak}`, label: 'يوم متتالي', bg: 'bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800/40' },
                  { icon: <Trophy size={20} className="text-violet-400" />, value: `#${currentLevelNum}`, label: 'مستواك الآن', bg: 'bg-violet-50 dark:bg-violet-950/50 border-violet-200 dark:border-violet-800/40' },
                ].map((s, i) => (
                  <div key={i} className={`flex flex-col items-center gap-1 p-3 rounded-2xl border ${s.bg} text-center`}>
                    {s.icon}
                    <span className="text-2xl font-black text-gray-900 dark:text-white">{s.value}</span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 font-bold">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: XP Bar + Today's Word */}
            <div className="lg:col-span-2 space-y-4">
              {/* XP Progress */}
              <Link
                to="/profile"
                className="block bg-gray-50/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5 rounded-2xl hover:bg-white dark:hover:bg-white/10 transition-all group cursor-pointer shadow-inner"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black text-gray-600 dark:text-gray-300">تقدم المستوى</span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                    ملفي <ChevronLeft size={14} />
                  </span>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(xpProgress, 100)}%` }}
                    transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ background: 'linear-gradient(90deg, #00b894, #55efc4)' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2 text-left font-mono">
                  {Math.round(xpProgress)}% → المستوى التالي
                </p>
              </Link>

              {/* Daily Word */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/40 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-900/30 p-5 rounded-2xl shadow-inner">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-sm">💡</div>
                  <span className="font-black text-emerald-700 dark:text-emerald-400 text-sm">كلمة اليوم</span>
                </div>
                <div className="text-2xl font-black text-gray-900 dark:text-white" dir="ltr">{word.word}</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-2">{word.meaning}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 italic font-serif" dir="ltr">"{word.example}"</div>
                <Link to="/vocabulary" className="mt-3 flex items-center gap-1 text-xs font-black text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors">
                  تصفح المزيد <ChevronLeft size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── QUICK ACCESS ── */}
      <div>
        <h2 className="text-lg font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2 px-1">
          <span className="inline-flex w-7 h-7 rounded-lg bg-yellow-400 items-center justify-center text-sm shadow">⚡</span>
          وصول سريع
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: 'تحدي اليوم', icon: todayCompleted ? '✅' : '🎯', path: '/daily', gradient: todayCompleted ? 'from-emerald-500 to-green-600' : 'from-orange-500 to-rose-600', badge: todayCompleted ? 'مكتمل 🏆' : undefined, glow: todayCompleted ? '0 8px 30px rgba(52,211,153,0.4)' : '0 8px 30px rgba(249,115,22,0.4)' },
            { title: 'المصحح الذكي', icon: '🤖', path: '/ai-corrector', gradient: 'from-blue-500 to-indigo-600', glow: '0 8px 30px rgba(99,102,241,0.3)' },
            { title: 'محاكي Telc', icon: '⏱️', path: '/telc-sim', gradient: 'from-teal-500 to-emerald-600', glow: '0 8px 30px rgba(20,184,166,0.3)' },
            { title: 'تصريف الأفعال', icon: '🔁', path: '/conjugation', gradient: 'from-violet-500 to-purple-600', glow: '0 8px 30px rgba(139,92,246,0.3)' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.2 }}>
              <Link
                to={item.path}
                className="group relative overflow-hidden rounded-2xl flex items-center justify-between p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1.5"
                style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`, boxShadow: item.glow }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-95 group-hover:opacity-100 transition-opacity`} />
                {item.badge && (
                  <div className="absolute top-2 left-2 bg-black/20 px-2 py-0.5 rounded-md text-[9px] font-black text-white backdrop-blur-sm">
                    {item.badge}
                  </div>
                )}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="font-black text-white text-sm sm:text-base drop-shadow">{item.title}</span>
                  <span className="text-2xl sm:text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-all filter drop-shadow-lg">{item.icon}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── LEVEL SELECTOR ── */}
      <div>
        <h2 className="text-lg font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2 px-1">
          <span className="inline-flex w-7 h-7 rounded-lg bg-blue-500 items-center justify-center text-white text-sm shadow">🌍</span>
          اختر مستواك
        </h2>
        <div className="grid grid-cols-5 gap-3">
          {levels.map((lvl, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i + 0.3 }}>
              <Link
                to={lvl.path}
                className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all hover:-translate-y-1.5 text-center overflow-hidden ${
                  lvl.active
                    ? 'border-sky-400 bg-sky-50 dark:bg-sky-950/40 shadow-xl'
                    : 'border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20'
                }`}
                style={lvl.active ? { boxShadow: `0 8px 30px ${lvl.glow}` } : {}}
              >
                {lvl.active && (
                  <div className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
                  </div>
                )}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${lvl.from} ${lvl.to} flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform`}>
                  <span className="text-white font-black text-sm">{lvl.code}</span>
                </div>
                <span className="text-[11px] font-black text-gray-500 dark:text-gray-400">{lvl.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── NEW CONTENT SHOWCASE ── */}
      <div>
        <h2 className="text-lg font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2 px-1">
          <span className="inline-flex w-7 h-7 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 items-center justify-center text-white text-sm shadow">✨</span>
          محتوى جديد
          <span className="badge-new mr-2">NEW</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { title: 'عبارات ونماذج رسائل', desc: '90+ عبارة + 5 رسائل جاهزة', icon: '📋', path: '/redemittel-hub', gradient: 'from-teal-500 to-emerald-600', glow: 'rgba(20,184,166,0.3)' },
            { title: 'مدرب الأرقام', desc: '6 مستويات تفاعلية', icon: '🔢', path: '/zahlen', gradient: 'from-blue-500 to-indigo-600', glow: 'rgba(99,102,241,0.3)' },
            { title: 'حوارات يومية', desc: '6 حوارات واقعية', icon: '💬', path: '/dialoge', gradient: 'from-green-500 to-emerald-600', glow: 'rgba(34,197,94,0.3)' },
            { title: 'دليل الثقافة', desc: '23 نصيحة عملية', icon: '🇩🇪', path: '/kultur', gradient: 'from-amber-500 to-orange-600', glow: 'rgba(245,158,11,0.3)' },
            { title: 'تعبيرات اصطلاحية', desc: '20 تعبير + اختبار', icon: '🎭', path: '/redewendungen', gradient: 'from-purple-500 to-violet-600', glow: 'rgba(168,85,247,0.3)' },
            { title: 'مدرب تصريف الأفعال', desc: '18 فعل + تدريب كتابي', icon: '🔄', path: '/verb-trainer', gradient: 'from-sky-500 to-blue-600', glow: 'rgba(14,165,233,0.3)' },
            { title: 'نصائح ذهبية للامتحان', desc: '30 نصيحة من الخبراء', icon: '💡', path: '/tipps', gradient: 'from-rose-500 to-pink-600', glow: 'rgba(244,63,94,0.3)' },
            { title: 'لعبة مطابقة المفردات', desc: '36 زوج كلمات', icon: '🃏', path: '/wortschatz-spiel', gradient: 'from-fuchsia-500 to-purple-600', glow: 'rgba(192,38,211,0.3)' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i + 0.2 }}>
              <Link
                to={item.path}
                className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1.5 border border-white/10"
                style={{ boxShadow: `0 8px 30px ${item.glow}` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                <span className="relative z-10 text-3xl sm:text-4xl transform group-hover:scale-110 group-hover:rotate-3 transition-all filter drop-shadow-lg">{item.icon}</span>
                <span className="relative z-10 font-black text-white text-xs sm:text-sm drop-shadow leading-tight">{item.title}</span>
                <span className="relative z-10 text-white/60 text-[10px] sm:text-xs font-semibold">{item.desc}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── MAIN SECTIONS GRID ── */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {sections.map((section, sIdx) => (
          <div
            key={sIdx}
            className={`relative overflow-hidden rounded-[2rem] border border-gray-200/60 dark:border-white/[0.04] shadow-lg hover:shadow-xl bg-white/85 dark:bg-[#0e0e24]/85 backdrop-blur-xl transition-all duration-300 ${section.hoverClass} ${section.borderColor} hover:-translate-y-1 ${sIdx === sections.length - 1 ? 'md:col-span-2' : ''}`}
          >
            {/* Top gradient bar */}
            <div className={`h-[3px] bg-gradient-to-r ${section.gradient} w-full opacity-80`} />

            <div className="p-6 sm:p-8">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className={`relative w-12 h-12 rounded-[14px] bg-gradient-to-br ${section.gradient} flex items-center justify-center text-xl shadow-lg shrink-0`}>
                  <span>{section.emoji}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-black text-gray-900 dark:text-white">{section.title}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{section.subtitle}</p>
                </div>
                <section.LucideIcon size={18} className={`${section.accentColor} shrink-0 opacity-40`} />
              </div>

              {/* Items Grid — last section uses 4 columns on desktop, 2 on mobile */}
              <div className={`grid gap-2 ${sIdx === sections.length - 1 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'}`}>
                {section.items.map((item, iIdx) => (
                  <Link
                    key={iIdx}
                    to={item.path}
                    className={`group flex flex-col items-center gap-1.5 p-2.5 rounded-[14px] transition-all duration-200 border relative text-center ${
                      item.highlight
                        ? 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-200/60 dark:border-violet-700/30 shadow-sm'
                        : `bg-gradient-to-br ${item.color || 'from-gray-50 to-gray-50 dark:from-white/[0.03] dark:to-white/[0.02]'} border-gray-100/80 dark:border-white/[0.05] hover:border-gray-300/60 dark:hover:border-white/10 hover:shadow-md hover:-translate-y-0.5`
                    }`}
                  >
                    {/* Icon */}
                    <div className="w-8 h-8 rounded-[10px] bg-white/70 dark:bg-white/10 flex items-center justify-center text-lg transition-transform duration-200 group-hover:scale-110 shadow-sm">
                      {item.icon}
                    </div>
                    {/* Label */}
                    <span className="font-bold text-[10px] leading-tight text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white w-full transition-colors">
                      {item.label}
                    </span>
                    {/* NEW badge */}
                    {item.isNew && (
                      <span className="absolute -top-0.5 -right-0.5 text-[7px] font-black bg-gradient-to-r from-emerald-400 to-teal-500 text-white w-3.5 h-3.5 flex items-center justify-center rounded-full leading-none shadow-sm">★</span>
                    )}
                    {item.highlight && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── MOTIVATIONAL BANNER ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2rem] p-8 text-center"
        style={{ background: 'linear-gradient(135deg, #1a1a3e 0%, #0d2a1a 50%, #1a1a3e 100%)' }}
      >
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,184,148,0.4), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(108,92,231,0.4), transparent 60%)' }} />
        <div className="relative z-10 space-y-4">
          <div className="text-5xl mb-2">🏆</div>
          <h2 className="text-2xl md:text-3xl font-black text-white">أنت أقرب مما تظن!</h2>
          <p className="text-gray-300 max-w-xl mx-auto leading-relaxed">
            كل سؤال تحله يقربك خطوة من الشهادة. النجاح في B1 ليس حظاً — هو نتيجة لممارسة يومية ذكية.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link to="/daily" className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black rounded-xl shadow-lg hover:scale-105 transition-transform">
              ابدأ تحدي اليوم ⚡
            </Link>
            <Link to="/telc-sim" className="px-6 py-3 bg-white/10 border border-white/20 text-white font-black rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm">
              محاكاة امتحان كامل ⏱️
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  )
}
