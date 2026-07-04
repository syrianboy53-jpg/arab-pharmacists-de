import { useState } from 'react'
import { Link } from 'react-router-dom'

const dosDonts = [
  {
    category: 'التحية والتعامل',
    emoji: '🤝',
    items: [
      { do: 'قل "Guten Tag" عند الدخول وعند الخروج', dont: 'لا تدخل مكاناً بدون تحية', tip: 'الألمان يأخذون التحية بجدية كبيرة' },
      { do: 'استخدم Sie مع الغرباء والمسؤولين', dont: 'لا تستخدم du مع أشخاص لا تعرفهم', tip: 'Sie = رسمي، du = غير رسمي' },
      { do: 'صافح بقوة معتدلة وانظر في العينين', dont: 'لا تصافح بيد ضعيفة', tip: 'المصافحة الضعيفة تُعتبر غير لائقة' },
      { do: 'التزم بالمواعيد — 5 دقائق قبل الموعد', dont: 'التأخر يُعتبر عدم احترام', tip: 'Pünktlichkeit (الدقة) قيمة ألمانية أساسية' },
    ]
  },
  {
    category: 'في السكن',
    emoji: '🏠',
    items: [
      { do: 'التزم بأوقات الهدوء (Ruhezeiten) 22:00-6:00', dont: 'لا تُحدث ضجيجاً أيام الأحد', tip: 'الأحد يوم راحة — حتى الغسيل ممنوع في بعض المباني!' },
      { do: 'افصل القمامة: أصفر، أسود، أزرق، بني', dont: 'لا ترمِ كل شيء في حاوية واحدة', tip: 'Mülltrennung (فصل القمامة) قانون وليس اختيارياً' },
      { do: 'نظّف الدرج عندما يحين دورك (Kehrwoche)', dont: 'لا تترك حذاءك أمام الباب في الممر المشترك', tip: 'بعض المباني لديها جدول تنظيف مشترك' },
      { do: 'قدّم نفسك للجيران الجدد', dont: 'لا تزور الجيران بدون إعلان مسبق', tip: 'يمكنك ترك رسالة صغيرة في صندوق البريد' },
    ]
  },
  {
    category: 'العمل والوظيفة',
    emoji: '💼',
    items: [
      { do: 'كن في المكان قبل 5 دقائق على الأقل', dont: 'لا تغادر قبل موعد الانتهاء', tip: 'Pünktlich = لا مبكراً جداً ولا متأخراً' },
      { do: 'أبلغ فوراً عن المرض (Krankmeldung)', dont: 'لا تذهب للعمل مريضاً بدون إخبار أحد', tip: 'بعد 3 أيام مرض تحتاج شهادة طبية' },
      { do: 'اسأل بأدب وباستخدام Konjunktiv II', dont: 'لا تتحدث بصوت عالٍ في المكتب', tip: '"Könnten Sie..." أفضل بكثير من "Können Sie..."' },
      { do: 'احترم التسلسل الهرمي في العمل', dont: 'لا تتجاوز مديرك المباشر', tip: 'تحدث مع مديرك أولاً قبل التصعيد' },
    ]
  },
  {
    category: 'المواصلات',
    emoji: '🚌',
    items: [
      { do: 'اشترِ تذكرة دائماً قبل الركوب', dont: 'الركوب بدون تذكرة = 60 يورو غرامة!', tip: 'Schwarzfahren (الركوب بدون تذكرة) يُراقب بشكل صارم' },
      { do: 'قف على يمين السلّم المتحرك', dont: 'لا تقف على اليسار — فهو للعجلة', tip: 'rechts stehen, links gehen (يمين وقوف، يسار مشي)' },
      { do: 'دع الناس ينزلون قبل أن تصعد', dont: 'لا تتدافع عند الباب', tip: 'هذه قاعدة عامة في كل المواصلات' },
    ]
  },
  {
    category: 'الطعام والمطاعم',
    emoji: '🍽️',
    items: [
      { do: 'قل "Guten Appetit" قبل الأكل', dont: 'لا تبدأ الأكل قبل أن يُقدَّم للجميع', tip: 'ينتظرون حتى يحصل الجميع على طعامهم' },
      { do: 'البقشيش 5-10% من الحساب', dont: 'لا تترك البقشيش على الطاولة', tip: 'قل المبلغ الذي تريد دفعه: "15 Euro, bitte"' },
      { do: 'ماء الصنبور آمن ونظيف للشرب', dont: 'لا تطلب ماء مجاني في المطعم — غير معتاد', tip: 'Leitungswasser (ماء الصنبور) ممتاز في ألمانيا' },
    ]
  },
  {
    category: 'القوانين والقواعد',
    emoji: '⚖️',
    items: [
      { do: 'احمل هويتك دائماً', dont: 'لا تعبر الشارع بالأحمر — حتى لو فارغ!', tip: 'العبور بالأحمر = غرامة + مثال سيء للأطفال' },
      { do: 'سجّل عنوانك خلال أسبوعين من الانتقال', dont: 'لا تنسَ تجديد إقامتك في الوقت المحدد', tip: 'Anmeldung واجبة قانونياً عند كل انتقال' },
      { do: 'ادفع GEZ (رسوم الإذاعة) — 18,36€/شهر', dont: 'تجاهل رسائل GEZ لن يُلغي الرسوم', tip: 'حتى لو لا تشاهد التلفزيون، الرسوم واجبة' },
      { do: 'احتفظ بكل الأوراق والفواتير', dont: 'لا ترمِ أي وثيقة رسمية', tip: 'الألمان يحتفظون بكل شيء — ستحتاجها لاحقاً' },
    ]
  },
]

const funFacts = [
  { fact: 'ألمانيا لديها أكثر من 1500 نوع من البيرة 🍺', factDe: 'Deutschland hat über 1.500 Biersorten' },
  { fact: 'الألمان يفصلون القمامة إلى 6 أنواع مختلفة ♻️', factDe: 'Deutsche trennen Müll in 6 verschiedene Kategorien' },
  { fact: 'Autobahn — بعض أجزاء الأوتوبان بدون حد سرعة! 🏎️', factDe: 'Auf Teilen der Autobahn gibt es kein Tempolimit' },
  { fact: 'يوم الأحد معظم المتاجر مغلقة بالقانون 🚫', factDe: 'Sonntags sind die meisten Geschäfte geschlossen' },
  { fact: 'Pfand — تسترجع مالاً عند إرجاع الزجاجات الفارغة 🫙', factDe: 'Für leere Flaschen bekommt man Pfand zurück' },
  { fact: 'الخبز الألماني مسجل في تراث اليونسكو — 3200 نوع! 🍞', factDe: 'Deutsches Brot ist UNESCO-Kulturerbe — über 3.200 Sorten' },
]

export default function KulturGuidePage() {
  const [expandedCat, setExpandedCat] = useState<string | null>(dosDonts[0].category)
  const [factIdx, setFactIdx] = useState(0)

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
        <span>›</span>
        <span className="text-[#00b894] font-bold">دليل الثقافة الألمانية</span>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2rem] p-8 text-center" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(255,193,7,0.4), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(239,68,68,0.3), transparent 60%)' }} />
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white mb-2">🇩🇪 دليل الثقافة الألمانية</h1>
          <p className="text-sm text-white/60">ما يجب فعله وتجنبه — {dosDonts.reduce((s, c) => s + c.items.length, 0)} نصيحة عملية</p>
        </div>
      </div>

      {/* Fun Fact Carousel */}
      <div className="glass p-5 rounded-2xl border border-amber-500/20 bg-amber-50/50 dark:bg-amber-900/10">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">هل تعلم؟</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{funFacts[factIdx].fact}</p>
            <p className="text-xs text-gray-500 font-sans mt-1" dir="ltr">{funFacts[factIdx].factDe}</p>
          </div>
          <button onClick={() => setFactIdx((factIdx + 1) % funFacts.length)} className="shrink-0 w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-xs hover:bg-amber-500/20 transition-all cursor-pointer">→</button>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {dosDonts.map(cat => (
          <div key={cat.category} className="glass rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden">
            <button
              onClick={() => setExpandedCat(expandedCat === cat.category ? null : cat.category)}
              className="w-full p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.emoji}</span>
                <div className="text-right">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{cat.category}</h3>
                  <p className="text-[10px] text-gray-500">{cat.items.length} نصيحة</p>
                </div>
              </div>
              <span className={`text-gray-400 transition-transform ${expandedCat === cat.category ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {expandedCat === cat.category && (
              <div className="border-t border-gray-200 dark:border-white/5 p-4 space-y-3 animate-slideDown">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 space-y-2 border border-gray-200 dark:border-white/10">
                    <div className="flex items-start gap-2">
                      <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold shrink-0">✓ افعل</span>
                      <p className="text-sm text-gray-900 dark:text-white">{item.do}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-bold shrink-0">✗ تجنّب</span>
                      <p className="text-sm text-gray-900 dark:text-white">{item.dont}</p>
                    </div>
                    <div className="flex items-start gap-2 pt-1 border-t border-gray-200 dark:border-white/10">
                      <span className="text-xs">💡</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.tip}</p>
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
