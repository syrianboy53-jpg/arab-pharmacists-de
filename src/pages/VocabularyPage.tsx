import { useState } from 'react'

interface VocabCategory {
  id: number
  title: string
  icon: string
  words: { de: string; ar: string; example: string }[]
}

const categories: VocabCategory[] = [
  {
    id: 1, title: 'الصحة والطبيب', icon: '🏥',
    words: [
      { de: 'der Arzt / die Ärztin', ar: 'الطبيب / الطبيبة', example: 'Ich muss zum Arzt gehen.' },
      { de: 'das Rezept', ar: 'الوصفة الطبية', example: 'Der Arzt hat mir ein Rezept gegeben.' },
      { de: 'die Apotheke', ar: 'الصيدلية', example: 'Ich hole die Medizin aus der Apotheke.' },
      { de: 'die Krankenversicherung', ar: 'التأمين الصحي', example: 'In Deutschland braucht jeder eine Krankenversicherung.' },
      { de: 'der Notfall', ar: 'حالة طوارئ', example: 'Rufen Sie 112 bei einem Notfall.' },
      { de: 'die Überweisung', ar: 'التحويل الطبي', example: 'Ich brauche eine Überweisung zum Facharzt.' },
      { de: 'das Fieber', ar: 'الحرارة/الحمّى', example: 'Ich habe 38 Grad Fieber.' },
      { de: 'die Tablette', ar: 'الحبّة/القرص', example: 'Nehmen Sie dreimal täglich eine Tablette.' },
    ]
  },
  {
    id: 2, title: 'العمل والوظيفة', icon: '💼',
    words: [
      { de: 'die Bewerbung', ar: 'طلب التوظيف', example: 'Ich schreibe eine Bewerbung.' },
      { de: 'der Lebenslauf', ar: 'السيرة الذاتية', example: 'Mein Lebenslauf ist zwei Seiten lang.' },
      { de: 'das Vorstellungsgespräch', ar: 'مقابلة العمل', example: 'Morgen habe ich ein Vorstellungsgespräch.' },
      { de: 'der Arbeitsvertrag', ar: 'عقد العمل', example: 'Unterschreiben Sie den Arbeitsvertrag.' },
      { de: 'die Kündigung', ar: 'الاستقالة/الفسخ', example: 'Die Kündigung muss schriftlich sein.' },
      { de: 'das Gehalt', ar: 'الراتب', example: 'Das Gehalt wird am Ende des Monats überwiesen.' },
      { de: 'die Überstunden', ar: 'العمل الإضافي', example: 'Ich habe diese Woche viele Überstunden gemacht.' },
      { de: 'der Urlaub', ar: 'الإجازة', example: 'Ich habe 30 Tage Urlaub im Jahr.' },
    ]
  },
  {
    id: 3, title: 'السكن والمنزل', icon: '🏠',
    words: [
      { de: 'die Wohnung', ar: 'الشقة', example: 'Ich suche eine 3-Zimmer-Wohnung.' },
      { de: 'die Miete', ar: 'الإيجار', example: 'Die Miete beträgt 600 Euro warm.' },
      { de: 'der Vermieter', ar: 'المؤجّر', example: 'Der Vermieter ist sehr nett.' },
      { de: 'die Kaution', ar: 'التأمين/الكفالة', example: 'Die Kaution ist drei Monatsmieten.' },
      { de: 'der Mietvertrag', ar: 'عقد الإيجار', example: 'Lesen Sie den Mietvertrag genau.' },
      { de: 'die Nebenkosten', ar: 'التكاليف الإضافية', example: 'Die Nebenkosten sind 150 Euro.' },
      { de: 'die Kündigung', ar: 'الفسخ/الإخلاء', example: 'Die Kündigungsfrist ist 3 Monate.' },
      { de: 'der Umzug', ar: 'الانتقال/النقلة', example: 'Nächste Woche ist unser Umzug.' },
    ]
  },
  {
    id: 4, title: 'التعليم والتدريب', icon: '🎓',
    words: [
      { de: 'die Ausbildung', ar: 'التدريب المهني', example: 'Ich mache eine Ausbildung als Koch.' },
      { de: 'der Integrationskurs', ar: 'كورس الاندماج', example: 'Der Integrationskurs dauert 6 Monate.' },
      { de: 'die Prüfung', ar: 'الامتحان', example: 'Nächste Woche habe ich eine Prüfung.' },
      { de: 'das Zeugnis', ar: 'الشهادة', example: 'Ich brauche mein Zeugnis für die Bewerbung.' },
      { de: 'die Anerkennung', ar: 'المعادلة/الاعتراف', example: 'Die Anerkennung meines Abschlusses dauert lang.' },
      { de: 'der Abschluss', ar: 'الشهادة/التخرّج', example: 'Er hat einen Hochschulabschluss.' },
      { de: 'das Praktikum', ar: 'التدريب العملي', example: 'Ich mache ein Praktikum in einer Firma.' },
      { de: 'die Weiterbildung', ar: 'التعليم المستمر', example: 'Die Weiterbildung ist kostenlos.' },
    ]
  },
  {
    id: 5, title: 'الدوائر والمكاتب', icon: '🏛️',
    words: [
      { de: 'das Jobcenter', ar: 'مركز التوظيف', example: 'Ich habe einen Termin beim Jobcenter.' },
      { de: 'das Ausländeramt', ar: 'دائرة الأجانب', example: 'Die Aufenthaltserlaubnis bekommt man beim Ausländeramt.' },
      { de: 'die Aufenthaltserlaubnis', ar: 'إقامة', example: 'Meine Aufenthaltserlaubnis ist noch gültig.' },
      { de: 'das Einwohnermeldeamt', ar: 'مكتب تسجيل السكان', example: 'Nach dem Umzug muss man sich ummelden.' },
      { de: 'der Antrag', ar: 'الطلب الرسمي', example: 'Ich stelle einen Antrag auf Kindergeld.' },
      { de: 'die Bescheinigung', ar: 'الإفادة/الشهادة', example: 'Ich brauche eine Meldebescheinigung.' },
      { de: 'der Personalausweis', ar: 'البطاقة الشخصية', example: 'Bitte zeigen Sie Ihren Personalausweis.' },
      { de: 'die Gebühr', ar: 'الرسوم', example: 'Die Gebühr beträgt 28 Euro.' },
    ]
  },
]

export default function VocabularyPage() {
  const [selectedCat, setSelectedCat] = useState<number | null>(null)
  const [showMeaning, setShowMeaning] = useState<Record<number, boolean>>({})

  const cat = selectedCat !== null ? categories[selectedCat] : null

  if (!cat) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📚</span>
          <div>
            <h1 className="text-2xl font-bold">المفردات — Wortschatz</h1>
            <p className="text-muted text-sm">أهمّ الكلمات لامتحان B1 مرتّبة حسب الموضوع.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {categories.map((c, i) => (
            <button key={c.id} onClick={() => setSelectedCat(i)} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-right flex items-center gap-3">
              <span className="text-3xl">{c.icon}</span>
              <div>
                <h3 className="font-bold">{c.title}</h3>
                <p className="text-xs text-muted">{c.words.length} كلمة</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <button onClick={() => { setSelectedCat(null); setShowMeaning({}) }} className="text-green font-bold text-sm">→ العودة</button>
      <h2 className="text-xl font-bold">{cat.icon} {cat.title}</h2>
      <div className="space-y-3">
        {cat.words.map((w, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <button onClick={() => setShowMeaning(p => ({...p, [i]: !p[i]}))} className="text-xs bg-green/10 text-green px-3 py-1 rounded-full">
                {showMeaning[i] ? 'إخفاء' : 'أظهر المعنى'}
              </button>
              <h4 className="font-bold" dir="ltr">{w.de}</h4>
            </div>
            {showMeaning[i] && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-sm font-medium text-green">{w.ar}</p>
                <p className="text-xs text-muted mt-1 italic" dir="ltr">{w.example}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
