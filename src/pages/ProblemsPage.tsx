export default function ProblemsPage() {
  const problems = [
    { problem: 'تجديد الإقامة', icon: '📋', solution: 'اذهب للـ Ausländerbehörde قبل شهرين من انتهاء الإقامة. أحضر: جواز سفر، عقد سكن، تأمين صحي، إثبات دخل.' },
    { problem: 'البحث عن سكن', icon: '🏠', solution: 'استخدم مواقع: WG-Gesucht, ImmoScout24, eBay Kleinanzeigen. جهّز Schufa-Auskunft ومعلومات الدخل.' },
    { problem: 'مشاكل مع صاحب العمل', icon: '💼', solution: 'تواصل مع Betriebsrat (مجلس العمال) أو Gewerkschaft (النقابة). Arbeitsagentur تقدم استشارات مجانية.' },
    { problem: 'مشاكل التأمين الصحي', icon: '🏥', solution: 'كل مقيم ملزم بالتأمين. AOK و TK أشهر الشركات. إذا كنت بلا عمل: Jobcenter يغطي التأمين.' },
    { problem: 'الاعتراف بالشهادات', icon: '🎓', solution: 'anabin.kmk.org للتحقق من الشهادة. IHK FOSA للمهن المهنية. تقديم عبر: anerkennung-in-deutschland.de' },
    { problem: 'مشاكل مع الجيران', icon: '🏢', solution: 'احترم Ruhezeiten (22:00-06:00). تواصل ودياً أولاً. إذا استمرت: اكتب للـ Hausverwaltung.' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">💡 مشاكل وحلول</h1>
      <p className="text-sm text-gray-500">دليل عملي لحل المشاكل الشائعة في ألمانيا</p>
      <div className="space-y-3">{problems.map((p, i) => (
        <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-100 dark:border-white/5">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-2">{p.icon} {p.problem}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.solution}</p>
        </div>
      ))}</div>
    </div>
  )
}