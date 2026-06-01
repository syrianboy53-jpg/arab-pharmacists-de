export default function PremiumPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-bl from-gold to-yellow-600 rounded-2xl p-8 text-white text-center">
        <span className="text-4xl mb-4 block">⭐</span>
        <h1 className="text-2xl font-bold mb-2">B1-Syrer Premium</h1>
        <p className="opacity-90">بدون إعلانات • محتوى B2 مبكر • بنك أسئلة موسّع • شهادات PDF</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <h3 className="font-bold text-lg mb-1">شهري</h3>
          <div className="text-3xl font-bold text-green my-3">€2.99<span className="text-sm font-normal text-muted">/شهر</span></div>
          <p className="text-xs text-muted mb-4">إلغاء في أيّ وقت</p>
          <a href="https://buy.stripe.com/test" className="block bg-green text-white py-3 rounded-xl font-bold hover:bg-green-dark transition-colors">اشترك شهرياً</a>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gold text-center relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-xs px-3 py-1 rounded-full font-bold">الأكثر شعبيّة</span>
          <h3 className="font-bold text-lg mb-1">سنوي</h3>
          <div className="text-3xl font-bold text-green my-3">€24.99<span className="text-sm font-normal text-muted">/سنة</span></div>
          <p className="text-xs text-gold font-bold mb-4">وفّر 30%</p>
          <a href="https://buy.stripe.com/test" className="block bg-gold text-white py-3 rounded-xl font-bold hover:bg-yellow-600 transition-colors">اشترك سنوياً</a>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-4">ماذا تحصل مع Premium:</h3>
        <ul className="space-y-3 text-sm">
          {[
            '🚫 بلا أيّ إعلان (تجربة كاملة)',
            '📚 +500 سؤال إضافي حصري',
            '🎓 شهادة معتمدة بـ QR للتحقّق',
            '💬 ردّ على أسئلتك خلال 24 ساعة من فادي',
            '📖 محتوى B2 مبكر (قبل الإصدار العام)',
            '🧠 بنك أسئلة موسّع (نماذج حصرية)',
            '📊 إحصائيات متقدّمة عن تقدّمك',
            '🎯 خطّة دراسة شخصية مع تنبيهات',
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-green">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center text-sm text-muted">
        <p>💳 Stripe · 🅿️ PayPal · 🍋 Lemon Squeezy · إلغاء في أيّ وقت</p>
        <p className="mt-2">أو ادعمنا بفنجان قهوة:</p>
        <a href="https://buymeacoffee.com/halawanyfav" className="inline-block mt-2 bg-yellow-400 text-black px-6 py-2 rounded-full font-bold text-sm">☕ Buy me a Coffee</a>
      </div>
    </div>
  )
}
