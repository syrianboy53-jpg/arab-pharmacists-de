import { useState } from 'react'
import { Link } from 'react-router-dom'

const transportTypes = [
  { name: 'U-Bahn', ar: 'مترو الأنفاق', emoji: '🚇', color: 'bg-blue-500', desc: 'قطار تحت الأرض داخل المدينة. سريع وموثوق.' },
  { name: 'S-Bahn', ar: 'قطار المدينة السريع', emoji: '🚆', color: 'bg-green-500', desc: 'يربط المدينة بالضواحي. أسرع من المترو لمسافات أطول.' },
  { name: 'Straßenbahn', ar: 'الترام', emoji: '🚃', color: 'bg-yellow-500', desc: 'يسير على السطح في الشوارع. هادئ وصديق للبيئة.' },
  { name: 'Bus', ar: 'الحافلة', emoji: '🚌', color: 'bg-orange-500', desc: 'يغطي مناطق لا تصلها القطارات. أبطأ في ساعات الذروة.' },
  { name: 'RE / RB', ar: 'قطار إقليمي', emoji: '🚂', color: 'bg-red-500', desc: 'يربط بين المدن القريبة. أرخص من ICE.' },
  { name: 'ICE / IC', ar: 'القطار السريع بين المدن', emoji: '🚄', color: 'bg-gray-700', desc: 'أسرع قطار في ألمانيا. يصل 300 كم/ساعة. مثالي للرحلات الطويلة.' },
]

const tickets = [
  { name: 'Einzelfahrschein', ar: 'تذكرة منفردة', desc: 'لرحلة واحدة ذهاباً. الأغلى للاستخدام المتكرر.' },
  { name: 'Tageskarte', ar: 'تذكرة يومية', desc: 'يوم كامل غير محدود. مثالية للسياحة أو التنقل الكثير.' },
  { name: 'Wochenkarte', ar: 'تذكرة أسبوعية', desc: 'أسبوع كامل. وفر مقارنة بالتذاكر المنفردة.' },
  { name: 'Monatskarte', ar: 'تذكرة شهرية', desc: 'الأوفر للمسافرين اليوميين.' },
  { name: '9-Euro-Ticket / Deutschlandticket', ar: 'تذكرة ألمانيا الوطنية', desc: 'تذكرة شهرية تغطي كامل ألمانيا بسعر موحد.' },
  { name: 'Streifenkarte', ar: 'بطاقة الشرائط', desc: 'بطاقة متعددة الرحلات (في بعض المدن).' },
]

const announcements = [
  { de: 'Nächste Haltestelle: Hauptbahnhof.', ar: 'المحطة القادمة: المحطة الرئيسية.' },
  { de: 'Bitte einsteigen und Türen schließen.', ar: 'يرجى الصعود وإغلاق الأبواب.' },
  { de: 'Achtung! Die Türen schließen.', ar: 'انتبه! الأبواب تُغلق.' },
  { de: 'Dieser Zug fährt nach Berlin Hauptbahnhof.', ar: 'هذا القطار متجه إلى محطة برلين الرئيسية.' },
  { de: 'Bitte beachten Sie: Kein Einsteigen.', ar: 'يرجى الانتباه: ممنوع الصعود.' },
  { de: 'Wegen einer Störung kommt es zu Verzögerungen.', ar: 'بسبب عطل هناك تأخيرات.' },
  { de: 'Bitte Fahrkarte bereithalten.', ar: 'يرجى إعداد التذكرة.' },
  { de: 'Aussteigen bitte!', ar: 'يرجى النزول!' },
  { de: 'Umsteigen in Richtung...', ar: 'التبديل باتجاه...' },
  { de: 'Der nächste Halt entfällt heute.', ar: 'المحطة القادمة ملغاة اليوم.' },
  { de: 'Gleis 5 — Abfahrt in 3 Minuten.', ar: 'الرصيف 5 — المغادرة بعد 3 دقائق.' },
  { de: 'Bitte zurückbleiben!', ar: 'يرجى البقاء خلف الخط!' },
  { de: 'Fahrkartenkontrolle — Bitte Ihre Karte zeigen.', ar: 'تفتيش التذاكر — يرجى إبراز بطاقتك.' },
  { de: 'Vorsicht, Stufe!', ar: 'انتبه، هناك درجة!' },
  { de: 'Bitte Platz nehmen.', ar: 'يرجى الجلوس.' },
  { de: 'Der Zug hat 10 Minuten Verspätung.', ar: 'القطار متأخر 10 دقائق.' },
  { de: 'Endstation — bitte aussteigen.', ar: 'المحطة الأخيرة — يرجى النزول.' },
  { de: 'Kinder unter 6 Jahren fahren kostenlos.', ar: 'الأطفال دون 6 سنوات يسافرون مجاناً.' },
  { de: 'Bitte für ältere Personen Platz machen.', ar: 'يرجى إخلاء المقاعد لكبار السن.' },
  { de: 'Nächste Haltestelle: Endstation.', ar: 'المحطة القادمة: المحطة الأخيرة.' },
]

const phrases = [
  { de: 'Wo ist der nächste Bahnhof?', ar: 'أين أقرب محطة قطار؟' },
  { de: 'Einmal nach [Ort], bitte.', ar: 'تذكرة واحدة إلى [المكان]، من فضلك.' },
  { de: 'Welcher Bus fährt zum Flughafen?', ar: 'أي باص يذهب إلى المطار؟' },
  { de: 'Wann fährt der nächste Zug?', ar: 'متى يغادر القطار القادم؟' },
  { de: 'Ich habe meine Karte verloren.', ar: 'فقدت تذكرتي.' },
  { de: 'Auf welchem Gleis fährt der Zug ab?', ar: 'من أي رصيف يغادر القطار؟' },
]

export default function TransportPage() {
  const [tab, setTab] = useState(0)
  const tabs = ['🚇 أنواع الخطوط', '🎫 أنواع التذاكر', '📢 إعلانات المحطة', '💬 جمل مفيدة']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a] pb-16" dir="rtl">
      <div className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-3">🚌</div>
          <h1 className="text-3xl font-black mb-2">دليل المواصلات العامة</h1>
          <p className="text-sky-100 text-lg">تنقّل في ألمانيا بثقة وسهولة</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setTab(i)}
              className={`shrink-0 px-4 py-2 rounded-xl font-bold text-sm transition-all ${tab === i ? 'bg-sky-500 text-white shadow-lg' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 0 && (
          <div className="grid sm:grid-cols-2 gap-3">
            {transportTypes.map((t, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/10 flex gap-3 items-start">
                <div className={`${t.color} w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0`}>{t.emoji}</div>
                <div>
                  <div className="font-black text-gray-900 dark:text-white">{t.name}</div>
                  <div className="text-sky-600 dark:text-sky-400 font-bold text-sm">{t.ar}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 1 && (
          <div className="space-y-3">
            {tickets.map((t, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎫</span>
                  <div>
                    <div className="font-black text-gray-900 dark:text-white">{t.name}</div>
                    <div className="text-sky-600 dark:text-sky-400 font-bold text-sm">{t.ar}</div>
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm mt-2">{t.desc}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 2 && (
          <div className="space-y-2">
            {announcements.map((a, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-xl p-3 border border-gray-100 dark:border-white/10">
                <div className="font-bold text-gray-900 dark:text-white text-sm" dir="ltr">🔊 {a.de}</div>
                <div className="text-sky-600 dark:text-sky-400 text-sm mt-0.5">🌐 {a.ar}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 3 && (
          <div className="space-y-3">
            {phrases.map((p, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/10">
                <div className="font-black text-gray-900 dark:text-white" dir="ltr">🇩🇪 {p.de}</div>
                <div className="text-sky-600 dark:text-sky-400 font-bold mt-1">🌐 {p.ar}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 text-center">
        <Link to="/" className="text-sky-600 dark:text-sky-400 font-bold hover:underline">← العودة للرئيسية</Link>
      </div>
    </div>
  )
}
