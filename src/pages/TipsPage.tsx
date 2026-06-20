export default function TipsPage() {
  const sections = [
    { title: 'Lesen — نصائح القراءة', icon: '📖', tips: ['اقرأ العناوين أولاً قبل النص', 'ابحث عن الكلمات المفتاحية في السؤال', 'لا تحتاج فهم كل كلمة — المعنى العام كافٍ', 'انتبه للكلمات السلبية مثل nicht, kein, nie'] },
    { title: 'Hören — نصائح الاستماع', icon: '🎧', tips: ['اقرأ الأسئلة قبل بدء التسجيل', 'ركّز على الأرقام والتواريخ والأسماء', 'التسجيل يُشغّل مرتين — استخدم المرة الثانية للتحقق', 'لا تتوقف عند كلمة لم تفهمها'] },
    { title: 'Schreiben — نصائح الكتابة', icon: '✍️', tips: ['ابدأ دائماً بـ Sehr geehrte/r أو Liebe/r', 'اكتب 3-4 فقرات قصيرة', 'استخدم روابط: außerdem, deshalb, trotzdem', 'راجع الأفعال في نهاية الجمل الفرعية'] },
    { title: 'Sprechen — نصائح المحادثة', icon: '🎙️', tips: ['تدرّب بصوت عالٍ كل يوم', 'احفظ 5 جمل للبداية و5 للنهاية', 'لا تخف من الأخطاء — التواصل أهم', 'استخدم Redemittel الجاهزة'] },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🧰 أدوات النجاح</h1>
      <p className="text-sm text-gray-500">نصائح واستراتيجيّات لكل قسم من الامتحان</p>
      <div className="space-y-4">{sections.map((s, i) => (
        <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-100 dark:border-white/5">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">{s.icon} {s.title}</h3>
          <ul className="space-y-2">{s.tips.map((t, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-[#00b894] mt-0.5">✓</span>
              <span>{t}</span>
            </li>
          ))}</ul>
        </div>
      ))}</div>
    </div>
  )
}