import { useState } from 'react'

const webs = [
  { center: 'Wohnung', meaning: 'السكن', related: [
    { word: 'die Miete', meaning: 'الإيجار' }, { word: 'der Vermieter', meaning: 'المؤجر' },
    { word: 'die Küche', meaning: 'المطبخ' }, { word: 'das Schlafzimmer', meaning: 'غرفة النوم' },
    { word: 'der Balkon', meaning: 'الشرفة' }, { word: 'die Nebenkosten', meaning: 'التكاليف الإضافية' },
    { word: 'der Mietvertrag', meaning: 'عقد الإيجار' }, { word: 'die Kaution', meaning: 'التأمين' },
  ]},
  { center: 'Arbeit', meaning: 'العمل', related: [
    { word: 'der Arbeitgeber', meaning: 'صاحب العمل' }, { word: 'das Gehalt', meaning: 'الراتب' },
    { word: 'der Vertrag', meaning: 'العقد' }, { word: 'die Bewerbung', meaning: 'التقديم' },
    { word: 'der Urlaub', meaning: 'الإجازة' }, { word: 'die Kündigung', meaning: 'الإنهاء' },
    { word: 'das Vorstellungsgespräch', meaning: 'مقابلة العمل' }, { word: 'die Überstunden', meaning: 'الساعات الإضافية' },
  ]},
  { center: 'Gesundheit', meaning: 'الصحة', related: [
    { word: 'der Arzt', meaning: 'الطبيب' }, { word: 'das Krankenhaus', meaning: 'المستشفى' },
    { word: 'das Rezept', meaning: 'الوصفة' }, { word: 'die Tablette', meaning: 'الحبة' },
    { word: 'die Krankenkasse', meaning: 'التأمين الصحي' }, { word: 'der Notfall', meaning: 'الطوارئ' },
    { word: 'die Sprechstunde', meaning: 'ساعات العمل' }, { word: 'die Überweisung', meaning: 'التحويل' },
  ]},
  { center: 'Einkaufen', meaning: 'التسوق', related: [
    { word: 'der Supermarkt', meaning: 'السوبرماركت' }, { word: 'die Kasse', meaning: 'الصندوق' },
    { word: 'das Angebot', meaning: 'العرض' }, { word: 'der Preis', meaning: 'السعر' },
    { word: 'die Quittung', meaning: 'الإيصال' }, { word: 'umtauschen', meaning: 'استبدال' },
    { word: 'der Rabatt', meaning: 'الخصم' }, { word: 'die Abteilung', meaning: 'القسم' },
  ]},
]

export default function WordWebPage() {
  const [activeWeb, setActiveWeb] = useState(0)
  const web = webs[activeWeb]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🕸️ شبكات الكلمات</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">ربط المفردات ببعضها لتسهيل الحفظ</p>

      <div className="flex flex-wrap gap-2">
        {webs.map((w, i) => (
          <button key={i} onClick={() => setActiveWeb(i)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
              activeWeb === i ? 'bg-[#6c5ce7] text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'
            }`} dir="ltr">{w.center}</button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-200 dark:border-white/5">
        {/* Center word */}
        <div className="text-center mb-6">
          <div className="inline-block bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] text-white px-6 py-3 rounded-2xl">
            <span className="text-xl font-black" dir="ltr">{web.center}</span>
            <p className="text-xs text-gray-900 dark:text-white/70">{web.meaning}</p>
          </div>
        </div>

        {/* Related words */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {web.related.map((r, i) => (
            <div key={i} className="bg-gray-50 dark:bg-white/5 rounded-xl p-3 text-center border border-gray-200 dark:border-white/10 hover:border-[#6c5ce7] transition-colors">
              <p className="font-bold text-xs text-gray-800 dark:text-gray-200" dir="ltr">{r.word}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{r.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}