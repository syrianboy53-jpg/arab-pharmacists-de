export default function PremiumPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-bl from-green to-teal-600 rounded-2xl p-8 text-white text-center">
        <span className="text-5xl mb-4 block">🎉</span>
        <h1 className="text-3xl font-bold mb-3">كل شيء أصبح مجانياً!</h1>
        <p className="opacity-90 text-lg">قررنا إزالة جميع الاشتراكات. الموقع الآن مفتوح المصدر ومجاني بالكامل.</p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
        <div className="text-4xl font-bold text-green mb-4">€0.00 <span className="line-through text-gray-400 text-2xl">€24.99</span></div>
        <p className="text-muted text-lg mb-6">لا حاجة للدفع بعد اليوم. جميع الميزات التي كانت مدفوعة أصبحت متاحة للجميع لدعم المتعلمين السوريين والعرب.</p>
        <div className="inline-block bg-green/10 text-green px-6 py-3 rounded-xl font-bold">
          أنت الآن تملك صلاحيات Premium مجاناً 🚀
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-4 text-center">الميزات التي أصبحت متاحة للجميع:</h3>
        <ul className="space-y-3 text-sm max-w-md mx-auto">
          {[
            '🚫 تصفح بدون إعلانات مزعجة',
            '📚 الوصول الكامل لجميع نماذج الامتحانات',
            '🎓 محتوى B2 المتقدم',
            '💬 الاستفادة من المصحح الذكي ومختبر النطق',
            '🧠 بنك أسئلة غير محدود للاختبارات التفاعلية',
            '📊 إحصائيات وتتبع الأداء'
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-green text-xl">✓</span>
              <span className="font-medium text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center text-sm text-muted mt-8">
        <p className="mb-3">إذا أحببت دعم استمرارية هذا العمل التطوعي، يمكنك دعمنا بفنجان قهوة ☕</p>
        <a href="https://buymeacoffee.com/halawanyfav" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#FFDD00] text-black px-8 py-3 rounded-full font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          <span className="text-lg">☕</span> Buy me a Coffee
        </a>
      </div>
    </div>
  )
}
