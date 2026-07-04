import { useState } from 'react'
import { Link } from 'react-router-dom'

const tipSections = [
  {
    title: 'نصائح عامة للامتحان',
    emoji: '🎯',
    color: 'from-emerald-500 to-teal-600',
    tips: [
      { title: 'نم جيداً قبل الامتحان', detail: 'النوم 7-8 ساعات يحسّن التركيز والذاكرة بشكل كبير. لا تسهر للمراجعة!', icon: '😴' },
      { title: 'اقرأ الأسئلة أولاً ثم النص', detail: 'في جزء القراءة، اقرأ الأسئلة قبل النص. ستعرف ماذا تبحث عنه بالضبط.', icon: '📋' },
      { title: 'لا تترك أي سؤال فارغاً', detail: 'حتى لو لم تعرف الإجابة، خمّن! لا توجد عقوبة على الإجابة الخاطئة.', icon: '✏️' },
      { title: 'راقب الوقت', detail: 'قسّم الوقت على الأجزاء. لا تقضِ وقتاً طويلاً على سؤال واحد.', icon: '⏱️' },
      { title: 'تدرب بظروف حقيقية', detail: 'استخدم مؤقتاً أثناء التدريب وأغلق الهاتف لمحاكاة جو الامتحان.', icon: '🏋️' },
    ]
  },
  {
    title: 'Lesen — القراءة',
    emoji: '📖',
    color: 'from-blue-500 to-indigo-600',
    tips: [
      { title: 'ابحث عن الكلمات المفتاحية', detail: 'لا تحتاج فهم كل كلمة. ركّز على الكلمات المفتاحية التي تجيب على السؤال.', icon: '🔍' },
      { title: 'انتبه لـ nicht و kein', detail: 'النفي يغيّر المعنى تماماً. ابحث عنه في الأسئلة والنص.', icon: '🚫' },
      { title: 'Richtig/Falsch — إذا شككت اختر Falsch', detail: 'إحصائياً، الإجابة الخاطئة أكثر شيوعاً في الامتحانات. لكن اقرأ بعناية!', icon: '✅' },
      { title: 'الجزء 4 (الإعلانات) سهل', detail: 'ابدأ بالجزء 4 إذا كنت متوتراً — مطابقة الإعلانات أسهل ويعطيك ثقة.', icon: '📰' },
      { title: 'الترادف مهم جداً', detail: 'السؤال يستخدم كلمات مختلفة عن النص (مرادفات). مثلاً: kaufen = erwerben', icon: '🔄' },
    ]
  },
  {
    title: 'Hören — الاستماع',
    emoji: '🎧',
    color: 'from-violet-500 to-purple-600',
    tips: [
      { title: 'اقرأ الأسئلة قبل التشغيل', detail: 'لديك وقت قبل كل تسجيل — استغله لقراءة الأسئلة والخيارات.', icon: '👀' },
      { title: 'في المرة الأولى: الفكرة العامة', detail: 'لا تحاول فهم كل كلمة. افهم الموضوع العام ثم ركّز في المرة الثانية.', icon: '1️⃣' },
      { title: 'في المرة الثانية: التفاصيل', detail: 'ركّز على الأرقام والأسماء والأماكن والتواريخ.', icon: '2️⃣' },
      { title: 'انتبه للنبرة', detail: 'أحياناً النبرة تدل على المعنى — هل الشخص سعيد؟ غاضب؟ متفاجئ؟', icon: '🗣️' },
      { title: 'تدرب يومياً 10 دقائق', detail: 'استمع لراديو ألماني أو بودكاست. Slow German و Deutsche Welle ممتازين.', icon: '📻' },
    ]
  },
  {
    title: 'Schreiben — الكتابة',
    emoji: '✍️',
    color: 'from-amber-500 to-orange-600',
    tips: [
      { title: 'احفظ هيكل الرسالة', detail: 'Anrede → Einleitung → Hauptteil → Schluss → Gruß. هذا الهيكل يعطيك نقاطاً!', icon: '📝' },
      { title: 'اكتب 3-4 نقاط على الأقل', detail: 'لكل نقطة مطلوبة اكتب 1-2 جملة. لا تكتب جملة واحدة فقط.', icon: '📌' },
      { title: 'استخدم Konnektoren', detail: 'weil, deshalb, trotzdem, außerdem, zum Beispiel — تعطيك نقاطاً إضافية!', icon: '🔗' },
      { title: 'لا تنسَ التحية النهائية', detail: 'Mit freundlichen Grüßen (رسمي) أو Viele Grüße (غير رسمي)', icon: '👋' },
      { title: 'اكتب 80+ كلمة', detail: 'المطلوب حوالي 80 كلمة. أقل من ذلك ينقص النقاط.', icon: '📊' },
      { title: 'راجع الأخطاء', detail: 'خصص 3-5 دقائق للمراجعة. تحقق من: أفعال، حالات، ترتيب الجملة.', icon: '🔎' },
    ]
  },
  {
    title: 'Sprechen — المحادثة',
    emoji: '🎙️',
    color: 'from-rose-500 to-pink-600',
    tips: [
      { title: 'قدّم نفسك بثقة (Teil 1)', detail: 'احفظ: اسمك، عمرك، بلدك، عملك/دراستك، هواياتك، لماذا تتعلم الألمانية.', icon: '👤' },
      { title: 'وصف الصورة (Teil 2)', detail: 'ابدأ بـ "Auf dem Bild sehe ich..." ثم وصف: من؟ أين؟ ماذا يفعل؟ ما رأيك؟', icon: '🖼️' },
      { title: 'خطط مع شريكك (Teil 3)', detail: 'استخدم: "Wir könnten...", "Was meinst du?", "Einverstanden!", "Gute Idee!"', icon: '🤝' },
      { title: 'لا تسكت أبداً', detail: 'حتى لو نسيت كلمة، قل: "Wie sagt man... ich meine..." — الاستمرار أفضل من السكوت.', icon: '💬' },
      { title: 'تدرب أمام المرآة', detail: 'تحدث بالألمانية 5 دقائق يومياً. وصف يومك، الطقس، أو خططك.', icon: '🪞' },
    ]
  },
  {
    title: 'Leben in Deutschland',
    emoji: '🏛️',
    color: 'from-slate-600 to-gray-700',
    tips: [
      { title: 'ركّز على 100 سؤال الأكثر تكراراً', detail: 'من أصل 310 سؤال، حوالي 100 تتكرر دائماً. ركّز عليها أولاً.', icon: '🎯' },
      { title: 'احفظ أسئلة ولايتك', detail: '3 أسئلة من أصل 33 تكون عن ولايتك. هذه سهلة ومضمونة!', icon: '🗺️' },
      { title: 'الدستور والحقوق الأساسية', detail: 'أسئلة المادة 1-19 من Grundgesetz تأتي دائماً. احفظها!', icon: '⚖️' },
      { title: 'تحتاج 15/33 فقط للنجاح', detail: 'النجاح يتطلب 15 إجابة صحيحة من 33. هذا ممكن جداً!', icon: '🏆' },
    ]
  },
]

export default function PruefungsTippsPage() {
  const [expanded, setExpanded] = useState<string | null>(tipSections[0].title)

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
        <span>›</span>
        <span className="text-[#00b894] font-bold">نصائح الامتحان</span>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] p-8 text-center" style={{ background: 'linear-gradient(135deg, #0c2461 0%, #1e3799 50%, #0c2461 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(72,126,176,0.5), transparent 70%)' }} />
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white mb-2">💡 نصائح ذهبية للامتحان</h1>
          <p className="text-sm text-white/60">{tipSections.reduce((s, t) => s + t.tips.length, 0)} نصيحة لكل أجزاء الامتحان — من الخبراء</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {tipSections.map(s => (
          <button key={s.title} onClick={() => setExpanded(expanded === s.title ? null : s.title)} className={`p-3 rounded-xl text-center transition-all cursor-pointer border ${expanded === s.title ? 'bg-[#00b894]/10 border-[#00b894]/30 shadow-md' : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 hover:border-[#00b894]/20'}`}>
            <span className="text-xl block mb-1">{s.emoji}</span>
            <span className="text-[9px] font-bold text-gray-600 dark:text-gray-400 leading-tight block">{s.tips.length} نصائح</span>
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {tipSections.map(section => (
          <div key={section.title} className="glass rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden">
            <button onClick={() => setExpanded(expanded === section.title ? null : section.title)} className="w-full p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-lg shadow-md`}>{section.emoji}</div>
                <div className="text-right">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{section.title}</h3>
                  <p className="text-[10px] text-gray-500">{section.tips.length} نصيحة</p>
                </div>
              </div>
              <span className={`text-gray-400 transition-transform ${expanded === section.title ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {expanded === section.title && (
              <div className="border-t border-gray-200 dark:border-white/5 p-4 space-y-3 animate-slideDown">
                {section.tips.map((tip, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10 flex items-start gap-3">
                    <span className="text-2xl shrink-0 mt-0.5">{tip.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{tip.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{tip.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
