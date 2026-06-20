export default function CoursesPage() {
  const institutes = [
    { name: 'Volkshochschule (VHS)', city: 'Berlin', type: 'BAMF', url: 'https://www.berlin.de/vhs/', note: 'أكبر شبكة معاهد في ألمانيا' },
    { name: 'Goethe-Institut', city: 'München', type: 'Goethe', url: 'https://www.goethe.de', note: 'معهد غوته الرسمي' },
    { name: 'Inlingua', city: 'Hamburg', type: 'BAMF', url: 'https://www.inlingua.de', note: 'كورسات مكثفة' },
    { name: 'Berlitz', city: 'Frankfurt', type: 'BAMF', url: 'https://www.berlitz.de', note: 'كورسات فردية وجماعية' },
    { name: 'DAA (Deutsche Angestellten-Akademie)', city: 'Köln', type: 'BAMF', url: 'https://www.daa.de', note: 'معهد معتمد من BAMF' },
    { name: 'Telc Language Tests', city: 'Online', type: 'telc', url: 'https://www.telc.net', note: 'اختبارات telc الرسمية' },
    { name: 'DW Learn German', city: 'Online', type: 'Online', url: 'https://learngerman.dw.com', note: 'Deutsche Welle مجاني' },
    { name: 'Lingoda', city: 'Online', type: 'Online', url: 'https://www.lingoda.com', note: 'كورسات أونلاين مع معلمين' },
    { name: 'VHS Stuttgart', city: 'Stuttgart', type: 'BAMF', url: 'https://vhs-stuttgart.de', note: 'كورسات اندماج' },
    { name: 'VHS Düsseldorf', city: 'Düsseldorf', type: 'BAMF', url: 'https://www.duesseldorf.de/vhs', note: 'كورسات B1/B2' },
  ]
  const typeColors: Record<string, string> = { BAMF: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', Goethe: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', telc: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', Online: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">📅 مواعيد الكورسات</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">معاهد معتمدة في ألمانيا + كورسات أونلاين</p>
      <div className="space-y-3">{institutes.map((inst, i) => (
        <a key={i} href={inst.url} target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-[#1a1a2e] rounded-xl p-4 border border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/15 transition-all">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-sm">{inst.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">📍 {inst.city} — {inst.note}</p>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${typeColors[inst.type] || ''}`}>{inst.type}</span>
          </div>
        </a>
      ))}</div>
    </div>
  )
}