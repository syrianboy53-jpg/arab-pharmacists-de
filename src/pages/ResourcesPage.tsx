export default function ResourcesPage() {
  const resources = [
    { name: 'Deutsche Welle — Learn German', url: 'https://learngerman.dw.com', icon: '📺', desc: 'كورسات مجانية من A1 إلى B2 مع فيديوهات', type: 'مجاني' },
    { name: 'Goethe-Institut', url: 'https://www.goethe.de/de/spr/ueb.html', icon: '🏛️', desc: 'تمارين رسمية من معهد غوته', type: 'مجاني' },
    { name: 'telc Übungstests', url: 'https://www.telc.net/pruefungsteilnehmende/uebungsmaterial.html', icon: '📋', desc: 'نماذج امتحانات telc الرسمية PDF', type: 'مجاني' },
    { name: 'BAMF — Integrationskurse', url: 'https://www.bamf.de/DE/Themen/Integration/integration_node.html', icon: '🏢', desc: 'معلومات كورسات الاندماج', type: 'رسمي' },
    { name: 'ÖSD Modellprüfungen', url: 'https://www.osd.at/die-pruefungen/sd-zertifikat-b1/', icon: '🇦🇹', desc: 'نماذج ÖSD النمساوية', type: 'مجاني' },
    { name: 'Schubert Verlag', url: 'https://www.schubert-verlag.de/aufgaben/', icon: '📖', desc: 'تمارين قواعد تفاعلية A1-C2', type: 'مجاني' },
    { name: 'Hueber Verlag', url: 'https://www.hueber.de/seite/pg_online_uebungen_mnr', icon: '📚', desc: 'تمارين إضافية لكتب Menschen & Co.', type: 'مجاني' },
    { name: 'Lingolia', url: 'https://deutsch.lingolia.com/de/', icon: '🧠', desc: 'شرح قواعد مفصّل مع تمارين', type: 'مجاني' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🌐 موارد مجّانيّة موثوقة</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">مواقع رسمية وموثوقة لتعلّم الألمانية</p>
      <div className="space-y-3">{resources.map((r, i) => (
        <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 bg-white dark:bg-[#1a1a2e] rounded-xl p-4 border border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/15 transition-all">
          <span className="text-2xl shrink-0">{r.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2"><h3 className="font-bold text-sm">{r.name}</h3><span className="text-[9px] bg-[#00b894]/10 text-[#00b894] px-1.5 py-0.5 rounded font-bold">{r.type}</span></div>
            <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
          </div>
          <span className="text-gray-300 dark:text-gray-600 dark:text-gray-400 shrink-0">🔗</span>
        </a>
      ))}</div>
    </div>
  )
}