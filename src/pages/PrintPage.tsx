export default function PrintPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🖨️ اطبع وذاكر</h1>
      <p className="text-sm text-gray-500">ملخصات جاهزة للطباعة — اضغط الزر وطبّع</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { title: 'ملخص القواعد', icon: '📚', items: ['الأزمنة الثلاثة', 'حالات الإعراب الأربع', 'الأفعال المنفصلة', 'الجمل الفرعية'] },
          { title: 'مفردات أساسية', icon: '🗂️', items: ['200 كلمة الأكثر شيوعاً', 'أفعال مع حروف جر', 'صفات + عكسها', 'تعابير يومية'] },
          { title: 'عبارات الامتحان', icon: '💬', items: ['عبارات Sprechen', 'بدايات الرسائل', 'روابط الجمل', 'عبارات الرأي'] },
          { title: 'نصائح الامتحان', icon: '🧰', items: ['نصائح Lesen', 'نصائح Hören', 'نصائح Schreiben', 'نصائح Sprechen'] },
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-100 dark:border-white/5">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">{card.icon} {card.title}</h3>
            <ul className="space-y-1 mb-4">{card.items.map((item, j) => (<li key={j} className="text-xs text-gray-500 flex items-center gap-1.5">• {item}</li>))}</ul>
            <button onClick={() => window.print()} className="w-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">🖨️ طباعة</button>
          </div>
        ))}
      </div>
    </div>
  )
}