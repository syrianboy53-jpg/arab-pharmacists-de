export default function TopicsPage() {
  const topics = [
    { theme: 'Wohnen — السكن', vocab: ['die Miete', 'der Vermieter', 'die Nebenkosten', 'der Mietvertrag', 'die Kaution'], phrases: ['Ich suche eine Wohnung...', 'Die Miete beträgt...', 'Der Vertrag ist befristet auf...'] },
    { theme: 'Arbeit — العمل', vocab: ['der Lebenslauf', 'das Vorstellungsgespräch', 'der Arbeitgeber', 'das Gehalt', 'der Urlaub'], phrases: ['Ich habe mich beworben um...', 'Meine Stärken sind...', 'Ich arbeite seit...'] },
    { theme: 'Gesundheit — الصحة', vocab: ['der Arzt', 'das Rezept', 'die Krankenkasse', 'die Tablette', 'der Notfall'], phrases: ['Ich habe Schmerzen in...', 'Ich brauche einen Termin bei...', 'Ich bin seit Tagen krank...'] },
    { theme: 'Freizeit — أوقات الفراغ', vocab: ['das Hobby', 'der Sport', 'der Verein', 'die Veranstaltung', 'der Ausflug'], phrases: ['In meiner Freizeit...', 'Am Wochenende gehe ich...', 'Ich interessiere mich für...'] },
    { theme: 'Bildung — التعليم', vocab: ['die Schule', 'der Kurs', 'die Prüfung', 'das Zeugnis', 'die Nachhilfe'], phrases: ['Ich besuche einen Kurs...', 'Mein Kind geht in die...', 'Ich möchte mich weiterbilden...'] },
    { theme: 'Einkaufen — التسوق', vocab: ['das Angebot', 'der Kassenbon', 'umtauschen', 'die Reklamation', 'der Rabatt'], phrases: ['Ich möchte das umtauschen...', 'Haben Sie das in einer anderen Größe?', 'Wo finde ich...?'] },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">📑 بنك المواضيع</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">مواضيع Sprechen و Schreiben مع مفردات وعبارات</p>
      <div className="space-y-4">{topics.map((t, i) => (
        <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-100 dark:border-white/5">
          <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-200">{t.theme}</h3>
          <div className="mb-3"><p className="text-xs font-bold text-[#6c5ce7] mb-1.5">📚 مفردات</p><div className="flex flex-wrap gap-1.5">{t.vocab.map((v, j) => (<span key={j} className="text-xs bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-lg" dir="ltr">{v}</span>))}</div></div>
          <div><p className="text-xs font-bold text-[#00b894] mb-1.5">💬 عبارات</p><div className="space-y-1">{t.phrases.map((p, j) => (<p key={j} className="text-xs text-gray-500" dir="ltr">• {p}</p>))}</div></div>
        </div>
      ))}</div>
    </div>
  )
}