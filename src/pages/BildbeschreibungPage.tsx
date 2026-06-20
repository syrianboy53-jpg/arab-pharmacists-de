export default function BildbeschreibungPage() {
  const phrases = [
    { de: 'Auf dem Bild sehe ich...', ar: 'في الصورة أرى...', type: 'بداية' },
    { de: 'Im Vordergrund / Im Hintergrund...', ar: 'في المقدمة / في الخلفية...', type: 'موقع' },
    { de: 'Links / Rechts / In der Mitte...', ar: 'يسار / يمين / في الوسط...', type: 'موقع' },
    { de: 'Die Person trägt...', ar: 'الشخص يرتدي...', type: 'وصف' },
    { de: 'Es sieht so aus, als ob...', ar: 'يبدو وكأن...', type: 'تفسير' },
    { de: 'Ich vermute, dass...', ar: 'أعتقد أن...', type: 'رأي' },
    { de: 'Das Bild erinnert mich an...', ar: 'الصورة تذكّرني بـ...', type: 'ربط' },
    { de: 'Meiner Meinung nach zeigt das Bild...', ar: 'في رأيي الصورة تُظهر...', type: 'رأي' },
  ]
  const typeColors: Record<string, string> = { 'بداية': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', 'موقع': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', 'وصف': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', 'تفسير': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', 'رأي': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400', 'ربط': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🖼️ وصف صورة — Bildbeschreibung</h1>
      <p className="text-sm text-gray-500">تعلّم كيف تصف صورة بالألمانية — عبارات مفيدة مع الترجمة</p>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-5 border border-gray-100 dark:border-white/5">
        <h3 className="font-bold text-sm mb-4">📝 خطوات وصف الصورة</h3>
        <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside">
          <li>ابدأ بوصف عام للصورة</li>
          <li>صِف الأشخاص والأشياء</li>
          <li>حدّد المواقع (يسار، يمين، وسط)</li>
          <li>أعطِ رأيك الشخصي</li>
          <li>اربط الصورة بتجربتك</li>
        </ol>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold text-sm">💬 عبارات مفيدة</h3>
        {phrases.map((p, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 border border-gray-100 dark:border-white/5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-sm text-[#0984e3]" dir="ltr">{p.de}</p>
                <p className="text-xs text-gray-500 mt-1">{p.ar}</p>
              </div>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 ${typeColors[p.type] || ''}`}>{p.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}