export default function StudyPlanPage() {
  const weeks = [
    { week: 'الأسبوع 1', title: 'الأساسيات', color: 'border-[#00b894]', tasks: ['📚 القواعد: الأزمنة الثلاثة', '🗂️ المفردات: 200 كلمة أساسية', '📖 قراءة: نموذجان Lesen', '✍️ كتابة: رسالة شخصية'] },
    { week: 'الأسبوع 2', title: 'أقسام الامتحان', color: 'border-[#0984e3]', tasks: ['🎧 استماع: 3 نماذج Hören', '🧩 Sprachbausteine: نموذجان', '🎙️ محادثة: Teil 1 + 2', '⚠️ أخطاء شائعة: 15 خطأ'] },
    { week: 'الأسبوع 3', title: 'التدريب المكثف', color: 'border-[#6c5ce7]', tasks: ['🧠 Drill: 100 سؤال قواعد', '🃏 بطاقات ذاكرة: 50 بطاقة', '📝 كتابة: 3 رسائل رسمية', '🎯 امتحان تجريبي كامل'] },
    { week: 'الأسبوع 4', title: 'المراجعة النهائية', color: 'border-[#e17055]', tasks: ['🔄 مراجعة SRS: كل البطاقات', '📅 تحدي يومي: 4 أسئلة/يوم', '🎓 محاكي Telc: امتحان كامل بالمؤقت', '🚨 صندوق الإسعافات: حفظ الجمل'] },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">📅 مخطّط الدراسة</h1>
      <p className="text-sm text-gray-500">خطّة 4 أسابيع للتحضير الكامل لامتحان B1</p>
      <div className="space-y-4">{weeks.map((w, i) => (
        <div key={i} className={`bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border-r-4 ${w.color} border border-gray-100 dark:border-white/5`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-gray-100 dark:bg-white/5 px-2 py-1 rounded font-bold">{w.week}</span>
            <h3 className="font-bold text-sm">{w.title}</h3>
          </div>
          <div className="space-y-1.5">{w.tasks.map((t, j) => (
            <label key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>{t}</span>
            </label>
          ))}</div>
        </div>
      ))}</div>
    </div>
  )
}