

export default function ReviewsPage() {
  const reviews = [
    { name: 'أحمد', stars: 5, text: 'أفضل تطبيق لتحضير B1! نجحت من أول مرة بفضله.' },
    { name: 'سارة', stars: 5, text: 'الشرح بالعربي سهّل عليّ كثير. شكراً فادي!' },
    { name: 'محمد', stars: 4, text: 'ممتاز جداً، أتمنى إضافة المزيد من نماذج الاستماع.' },
    { name: 'نور', stars: 5, text: 'التطبيق مجاني وفيه كل شي. ما في أحسن منه.' },
    { name: 'عمر', stars: 5, text: 'الألعاب التفاعلية خلّت الدراسة ممتعة!' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2 text-gray-900 dark:text-white">⭐ تقييمات وتعليقات</h1>
      <div className="space-y-4">{reviews.map((r, i) => (
        <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2 mb-2"><span className="font-bold text-gray-800 dark:text-gray-200">{r.name}</span><span className="text-amber-400">{'⭐'.repeat(r.stars)}</span></div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{r.text}</p>
        </div>
      ))}</div>
    </div>
  )
}
