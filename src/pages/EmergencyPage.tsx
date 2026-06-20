

export default function EmergencyPage() {
  const phrases = [
    { de: 'Können Sie die Frage bitte wiederholen?', ar: 'هل يمكنك تكرار السؤال من فضلك؟' },
    { de: 'Ich brauche einen Moment, bitte.', ar: 'أحتاج لحظة من فضلك.' },
    { de: 'Wie sagt man ... auf Deutsch?', ar: 'كيف نقول ... بالألمانية؟' },
    { de: 'Ich meine damit, dass...', ar: 'أقصد بذلك أن...' },
    { de: 'Entschuldigung, ich habe das nicht verstanden.', ar: 'عذراً، لم أفهم ذلك.' },
    { de: 'Können Sie bitte langsamer sprechen?', ar: 'هل يمكنك التحدث ببطء أكثر؟' },
    { de: 'Meiner Meinung nach...', ar: 'في رأيي...' },
    { de: 'Ich bin der Meinung, dass...', ar: 'أنا أرى أنّ...' },
    { de: 'Zum Beispiel...', ar: 'على سبيل المثال...' },
    { de: 'Zusammenfassend kann man sagen, dass...', ar: 'يمكن تلخيص ذلك بأن...' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">🚨 صندوق الإسعافات للامتحان</h1>
      <p className="text-sm text-gray-500">جمل تنقذك في أي موقف أثناء الامتحان — احفظها جيداً!</p>
      <div className="space-y-3">{phrases.map((p, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-1" dir="ltr">{p.de}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{p.ar}</p>
        </div>
      ))}</div>
    </div>
  )
}
