export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">عن التطبيق</h1>
        <p className="text-muted">B1 Deutsch للعرب والسوريين</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-lg mb-3">🇸🇾 القصّة</h2>
        <p className="text-sm leading-relaxed">
          بدأ هذا المشروع كفكرة بسيطة: مساعدة السوريين والعرب في ألمانيا على اجتياز امتحان B1 بشرح بالعربي وبأسلوب قريب من حياتهم اليومية. اليوم أصبح تطبيقاً شاملاً يغطّي كل أقسام الامتحان.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-lg mb-3">👨‍💻 المؤسّس</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center text-white text-2xl font-bold">ف</div>
          <div>
            <h3 className="font-bold">فادي الحلواني</h3>
            <p className="text-sm text-muted">مدرّس B1 — من الحسكة، سوريا</p>
            <p className="text-xs text-muted mt-1">Schnurstraße 29, 42289 Wuppertal</p>
          </div>
        </div>
        <blockquote className="mt-4 border-r-4 border-green pr-4 text-sm italic text-muted">
          "هدفي تبسيط رحلة كلّ سوري نحو B1 — لتبدأ حياتك في ألمانيا بثقة."
        </blockquote>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-lg mb-3">📊 إحصائيات</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green">2,400+</div>
            <div className="text-xs text-muted">متعلّم</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green">460+</div>
            <div className="text-xs text-muted">سؤال</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green">92%</div>
            <div className="text-xs text-muted">نسبة النجاح</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-lg mb-3">📬 تواصل معنا</h2>
        <div className="space-y-2 text-sm">
          <p>📧 <a href="mailto:shami.fadi@gmx.de" className="text-green hover:underline">shami.fadi@gmx.de</a></p>
          <p>📱 <a href="https://t.me/b1syrer" className="text-green hover:underline">@b1syrer</a> (تليغرام)</p>
        </div>
      </div>

      <div className="text-center text-xs text-muted">
        <p>الإصدار: v19 (ويب) • v52 (APK)</p>
        <p className="mt-1">© 2026 B1 Deutsch للعرب والسوريين</p>
      </div>
    </div>
  )
}
