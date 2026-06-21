import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useXP } from '../hooks/useXP'
import { usePWA } from '../hooks/usePWA'
import { getLevelFromXP, getLevelTitle, getXPForLevel, getProgressToNextLevel } from '../lib/gamification'

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
    emoji: '📚',
    subtitle: 'قواعد ومفردات وأمثلة للبدء بقوة',
    gradient: 'from-[#00b894] to-[#00cec9]',
    iconBg: 'bg-[#00b894]/10 text-[#00b894]',
    items: [
      { label: 'القواعد (Grammatik)', path: '/grammar', icon: '📝', count: 'أزمنة، حالات، أفعال' },
      { label: 'المفردات (Wortschatz)', path: '/vocabulary', icon: '🗂️', count: '6000+ كلمة' },
      { label: 'القراءة (Lesen)', path: '/lesen', icon: '📖', count: 'نصوص وأسئلة' },
      { label: 'الاستماع (Hören)', path: '/hoeren', icon: '🎧', count: 'حوارات وإعلانات' },
      { label: 'الكتابة (Schreiben)', path: '/schreiben', icon: '✍️', count: 'نماذج رسائل' },
      { label: 'المحادثة (Sprechen)', path: '/sprechen', icon: '🎙️', count: 'الأجزاء الثلاثة' },
      { label: 'قوالب المحادثة', path: '/redemittel', icon: '💬', count: 'عبارات جاهزة' },
      { label: 'بناء الجمل', path: '/satzbau', icon: '🧩', count: 'تمارين تركيب' },
    ],
  },
  {
    title: 'تدريبات تفاعليّة',
    emoji: '🎮',
    subtitle: 'تمارين قصيرة وذكية وممتعة',
    gradient: 'from-[#6c5ce7] to-[#a29bfe]',
    iconBg: 'bg-[#6c5ce7]/10 text-[#6c5ce7]',
    items: [
      { label: 'تحدّي اليوم', path: '/daily', icon: '📅', count: '+150 XP يومياً', highlight: true },
      { label: 'مدرّب التصريف', path: '/conjugation', icon: '🔁', count: 'أفعال و أزمنة', isNew: true },
      { label: 'فخاخ المترادفات', path: '/synonyms', icon: '🪤', count: '90+ زوج مرادفات' },
      { label: 'ترتيب البطاقات', path: '/card-sort', icon: '🃏', count: 'der/die/das' },
      { label: 'مراجعة ذكيّة', path: '/srs-review', icon: '🔄', count: 'مراجعة متباعدة' },
      { label: 'Drill — Bausteine', path: '/drill', icon: '🧠', count: '220 سؤال' },
      { label: '30 خطأ شائع', path: '/fehler', icon: '⚠️', count: 'تجنبها بالامتحان' },
      { label: 'الأسئلة الموضوعيّة', path: '/b1-models', icon: '📋', count: '5 نماذج كاملة' },
    ],
  },
  {
    title: 'الامتحان والتقييم',
    emoji: '🎓',
    subtitle: 'محاكاة كاملة وتصحيح ذكي',
    gradient: 'from-[#0984e3] to-[#74b9ff]',
    iconBg: 'bg-[#0984e3]/10 text-[#0984e3]',
    items: [
      { label: 'محاكي Telc B1', path: '/telc-sim', icon: '⏱️', count: 'امتحان كامل بمؤقت' },
      { label: 'المصحح الذكي', path: '/ai-corrector', icon: '🤖', count: 'تصحيح الرسائل بـ AI', isNew: true, highlight: true },
      { label: 'امتحان (مبسّط)', path: '/exam-simulation', icon: '🎯', count: 'نسخة سريعة' },
      { label: 'تحديد المستوى', path: '/einstufung', icon: '📊', count: 'A1 → B2' },
      { label: 'محاكي المحادثة', path: '/chat-simulator', icon: '💬', count: 'حوارات تفاعليّة' },
      { label: 'وصف صورة', path: '/bildbeschreibung', icon: '🖼️', count: 'تدريب النطق' },
      { label: 'صندوق الإسعافات', path: '/emergency', icon: '🚨', count: 'طوارئ الامتحان' },
    ],
  },
  {
    title: 'الاندماج والمجتمع',
    emoji: '🇩🇪',
    subtitle: 'كل ما تحتاجه للحياة في ألمانيا',
    gradient: 'from-[#fdcb6e] to-[#e17055]',
    iconBg: 'bg-[#fdcb6e]/10 text-[#e17055]',
    items: [
      { label: 'اختبار التجنس', path: '/einbuergerung', icon: '🏛️', count: 'محاكاة 33 سؤال', isNew: true },
      { label: 'Leben in Deutschland', path: '/leben', icon: '🇩🇪', count: '300 سؤال' },
      { label: 'دليل الطوارئ', path: '/emergency', icon: '🏥', count: 'أرقام طبية عاجلة', isNew: true },
      { label: 'مسابقات', path: '/contests', icon: '🎁', count: 'هدايا ومكافآت' },
      { label: 'لوحة المتصدّرين', path: '/leaderboard', icon: '🏆', count: 'التنافس الأسبوعي' },
      { label: 'خطّتي الشخصيّة', path: '/my-plan', icon: '🗺️', count: 'جدول دراسي' },
    ],
  },
]

export default function HomePage() {
  const { xp, streak, todayCompleted } = useXP()
  const { isInstallable, promptInstall } = usePWA()
  const [dailyWordIdx, setDailyWordIdx] = useState(0)
  const currentLevelNum = getLevelFromXP(xp)
  const levelTitle = getLevelTitle(currentLevelNum)
  const nextLevelXP = getXPForLevel(currentLevelNum + 1)
  const xpProgress = getProgressToNextLevel(xp)

  useEffect(() => {
    // Change word every day based on date
    const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
    setDailyWordIdx(day % dailyWords.length)
  }, [])

  const word = dailyWords[dailyWordIdx]

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-10">
      
      {/* PWA Install Banner */}
      {isInstallable && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#0984e3] to-[#74b9ff] text-white p-4 sm:p-6 rounded-[2rem] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl bg-white/20 p-3 rounded-2xl shadow-inner">📲</div>
            <div>
              <h3 className="text-lg sm:text-xl font-black">حمّل التطبيق على هاتفك الآن!</h3>
              <p className="text-sm text-white/80 mt-1 font-semibold">احصل على تجربة أسرع بدون إنترنت وأيقونة على الشاشة الرئيسية.</p>
            </div>
          </div>
          <button 
            onClick={promptInstall}
            className="w-full sm:w-auto bg-white text-[#0984e3] px-6 py-3 rounded-xl font-black shadow-md hover:scale-105 transition-transform"
          >
            تثبيت التطبيق 📥
          </button>
        </motion.div>
      )}

      {/* Hero Dashboard Section */}
      <div className="grid lg:grid-cols-3 gap-6 relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00b894]/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6c5ce7]/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        {/* Welcome & Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0984e3]/20 to-transparent blur-3xl rounded-full"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-black shadow-lg">
                  المستوى {currentLevelNum}
                </span>
                <span className="text-gray-500 font-bold">{levelTitle}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
                مرحباً بك في <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b894] to-[#0984e3]">B1 Syrer</span> 🚀
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl leading-relaxed">
                منصتك الشاملة والذكية للنجاح في امتحان اللغة الألمانية والحياة في ألمانيا. تدرب بذكاء، وليس بجهد!
              </p>
            </div>

            {/* XP Bar */}
            <div className="bg-gray-50 dark:bg-[#1a1a2e] p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-inner">
              <div className="flex justify-between items-end mb-3">
                <div className="flex gap-6">
                  <div className="font-black text-[#00b894] text-3xl flex items-center gap-2">
                    <span className="text-xl">🌟</span> {xp} <span className="text-sm text-gray-500 uppercase tracking-widest">XP</span>
                  </div>
                  <div className="font-black text-amber-500 text-3xl flex items-center gap-2" title="أيام الدراسة المتتالية">
                    <span className="text-xl">🔥</span> {streak}
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-500">
                  {nextLevelXP === Infinity ? 'الحد الأقصى' : `${nextLevelXP} للترقية`}
                </div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(xpProgress, 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#00b894] to-[#55efc4] rounded-full shadow-[0_0_10px_rgba(0,184,148,0.5)]"
                ></motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daily Word Widget */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8 rounded-[2rem] border border-emerald-200 dark:border-emerald-900/30 shadow-xl bg-gradient-to-br from-emerald-50 to-white dark:from-[#00b894]/10 dark:to-transparent"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl">
              💡
            </div>
            <h3 className="font-black text-emerald-800 dark:text-emerald-400">كلمة اليوم</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-black text-gray-900 dark:text-white mb-1" dir="ltr">{word.word}</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">{word.meaning}</div>
            </div>
            
            <div className="p-4 bg-white/60 dark:bg-black/20 rounded-xl border border-emerald-100 dark:border-emerald-900/20 backdrop-blur-sm">
              <p className="text-sm font-serif text-gray-700 dark:text-gray-300 italic" dir="ltr">"{word.example}"</p>
            </div>
            
            <Link to="/vocabulary" className="block text-center w-full py-3 mt-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-xl transition-colors border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800">
              تصفح المزيد من الكلمات &larr;
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-xl font-black mb-4 text-gray-900 dark:text-white px-2">⚡ وصول سريع</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'تحدي اليوم', icon: todayCompleted ? '✅' : '🎯', path: '/daily', color: todayCompleted ? 'from-emerald-400 to-green-500' : 'from-orange-400 to-rose-400', badge: todayCompleted ? 'مكتمل' : undefined },
            { title: 'المصحح الذكي', icon: '🤖', path: '/ai-corrector', color: 'from-blue-400 to-indigo-500' },
            { title: 'محاكي Telc', icon: '⏱️', path: '/telc-sim', color: 'from-emerald-400 to-teal-500' },
            { title: 'تصريف الأفعال', icon: '🔁', path: '/conjugation', color: 'from-purple-400 to-pink-500' },
          ].map((item, i) => (
            <Link 
              key={i} 
              to={item.path}
              className="group relative overflow-hidden rounded-2xl aspect-[2/1] flex items-center p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              {item.badge && (
                <div className="absolute top-2 left-2 bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-sm backdrop-blur-sm">
                  {item.badge}
                </div>
              )}
              <div className="relative z-10 flex items-center justify-between w-full">
                <span className="font-black text-white text-base sm:text-lg drop-shadow-md">{item.title}</span>
                <span className="text-3xl sm:text-4xl filter drop-shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all">{item.icon}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Grid Modules */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {sections.map((section, sIdx) => (
          <motion.div 
            key={sIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * sIdx }}
            className="glass rounded-[2rem] p-6 sm:p-8 border border-gray-200 dark:border-white/5 shadow-xl flex flex-col h-full hover:border-gray-300 dark:hover:border-white/10 transition-colors"
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-2xl shadow-lg shrink-0`}>
                {section.emoji}
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">{section.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{section.subtitle}</p>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
              {section.items.map((item, iIdx) => (
                <Link
                  key={iIdx}
                  to={item.path}
                  className={`group flex items-start gap-3 p-3 rounded-xl transition-all border ${
                    item.highlight 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30 hover:bg-blue-100 dark:hover:bg-blue-900/40' 
                      : 'bg-gray-50/50 dark:bg-white/5 border-transparent hover:border-gray-200 dark:hover:border-white/10 hover:bg-white dark:hover:bg-white/10'
                  }`}
                >
                  <span className={`text-xl shrink-0 mt-0.5 ${item.highlight ? 'animate-bounce' : ''}`}>{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold truncate ${item.highlight ? 'text-blue-700 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200 group-hover:text-[#00b894] transition-colors'}`}>
                        {item.label}
                      </span>
                      {item.isNew && (
                        <span className="px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-black rounded uppercase tracking-wider shrink-0 animate-pulse">
                          جديد
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 block truncate mt-0.5">
                      {item.count}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  )
}
