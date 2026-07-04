import { useState } from 'react'
import { Link } from 'react-router-dom'

const states = [
  { id: 'bayern', de: 'Bayern', ar: 'بايرن', capital: 'ميونيخ', emoji: '🦁', color: 'from-blue-500 to-blue-700', fact: 'أكبر ولاية في ألمانيا، مشهورة بمهرجان أكتوبر وجبال الألب والبيرة.', vocab: [{ de: 'das Bier', ar: 'البيرة' }, { de: 'das Schloss', ar: 'القصر' }, { de: 'der Berg', ar: 'الجبل' }, { de: 'die Tracht', ar: 'الزي التقليدي' }] },
  { id: 'berlin', de: 'Berlin', ar: 'برلين', capital: 'برلين', emoji: '🐻', color: 'from-gray-600 to-gray-800', fact: 'العاصمة والمدينة الأكبر. مشهورة بجدار برلين التاريخي وبوابة براندنبورغ.', vocab: [{ de: 'die Mauer', ar: 'الجدار' }, { de: 'das Museum', ar: 'المتحف' }, { de: 'die Kunst', ar: 'الفن' }, { de: 'die Geschichte', ar: 'التاريخ' }] },
  { id: 'hamburg', de: 'Hamburg', ar: 'هامبورغ', capital: 'هامبورغ', emoji: '⚓', color: 'from-red-500 to-red-700', fact: 'أكبر ميناء في ألمانيا. مدينة التجارة والموسيقى وشارع الريبربان الشهير.', vocab: [{ de: 'der Hafen', ar: 'الميناء' }, { de: 'das Schiff', ar: 'السفينة' }, { de: 'der Fisch', ar: 'السمكة' }, { de: 'die Brücke', ar: 'الجسر' }] },
  { id: 'nrw', de: 'Nordrhein-Westfalen', ar: 'شمال الراين-وستفاليا', capital: 'دوسلدورف', emoji: '🏭', color: 'from-green-500 to-green-700', fact: 'أكثر الولايات اكتظاظاً بالسكان. فيها كولونيا ودوسلدورف وبون.', vocab: [{ de: 'die Industrie', ar: 'الصناعة' }, { de: 'der Dom', ar: 'الكاتدرائية' }, { de: 'der Fluss', ar: 'النهر' }, { de: 'die Mode', ar: 'الأزياء' }] },
  { id: 'bw', de: 'Baden-Württemberg', ar: 'بادن-فورتمبرغ', capital: 'شتوتغارت', emoji: '🚗', color: 'from-yellow-500 to-yellow-700', fact: 'مهد صناعة السيارات الألمانية — بنز وبورش. وفيها مدينة هايدلبرغ الجامعية.', vocab: [{ de: 'das Auto', ar: 'السيارة' }, { de: 'die Universität', ar: 'الجامعة' }, { de: 'der Schwarzwald', ar: 'الغابة السوداء' }, { de: 'der Wein', ar: 'النبيذ' }] },
  { id: 'sachsen', de: 'Sachsen', ar: 'ساكسونيا', capital: 'درسدن', emoji: '🎨', color: 'from-orange-500 to-orange-700', fact: 'مشهورة بالفن والثقافة. درسدن تُعرف بـ"فلورنسا ألمانيا" لجمالها المعماري.', vocab: [{ de: 'das Gemälde', ar: 'اللوحة الفنية' }, { de: 'die Galerie', ar: 'المعرض' }, { de: 'das Porzellan', ar: 'البورسلان' }, { de: 'die Oper', ar: 'الأوبرا' }] },
  { id: 'thuringen', de: 'Thüringen', ar: 'ثورينغيا', capital: 'إيرفورت', emoji: '🌲', color: 'from-emerald-500 to-emerald-700', fact: 'قلب ألمانيا الجغرافي. موطن غوته وشيلر وباخ، وغابة ثورينغيا الخضراء الجميلة.', vocab: [{ de: 'der Wald', ar: 'الغابة' }, { de: 'die Burg', ar: 'القلعة' }, { de: 'der Dichter', ar: 'الشاعر' }, { de: 'die Wiese', ar: 'المرج' }] },
  { id: 'hessen', de: 'Hessen', ar: 'هيسن', capital: 'فيسبادن', emoji: '💼', color: 'from-indigo-500 to-indigo-700', fact: 'مركز المال والأعمال في ألمانيا. فرانكفورت فيها البنك المركزي الأوروبي ومطار رئيسي.', vocab: [{ de: 'die Bank', ar: 'البنك' }, { de: 'der Flughafen', ar: 'المطار' }, { de: 'die Messe', ar: 'المعرض التجاري' }, { de: 'das Geld', ar: 'المال' }] },
  { id: 'brandenburg', de: 'Brandenburg', ar: 'براندنبورغ', capital: 'بوتسدام', emoji: '🏰', color: 'from-purple-500 to-purple-700', fact: 'تحيط ببرلين من كل الجهات. بوتسدام مشهورة بقصر سانسوسي والبحيرات الجميلة.', vocab: [{ de: 'der See', ar: 'البحيرة' }, { de: 'das Schloss', ar: 'القصر' }, { de: 'der Garten', ar: 'الحديقة' }, { de: 'die Ebene', ar: 'السهل' }] },
  { id: 'niedersachsen', de: 'Niedersachsen', ar: 'ساكسونيا السفلى', capital: 'هانوفر', emoji: '🐴', color: 'from-teal-500 to-teal-700', fact: 'الولاية الثانية في المساحة. فيها مدينة هانوفر ووولفسبورغ مقر شركة فولكسفاغن.', vocab: [{ de: 'das Pferd', ar: 'الحصان' }, { de: 'das Land', ar: 'الريف' }, { de: 'die Küste', ar: 'الساحل' }, { de: 'der Bauernhof', ar: 'المزرعة' }] },
  { id: 'sh', de: 'Schleswig-Holstein', ar: 'شليسفيغ-هولشتاين', capital: 'كيل', emoji: '⛵', color: 'from-sky-500 to-sky-700', fact: 'الولاية الشمالية الوحيدة بين بحرين: بحر الشمال وبحر البلطيق. مشهورة بالشواطئ.', vocab: [{ de: 'das Meer', ar: 'البحر' }, { de: 'der Strand', ar: 'الشاطئ' }, { de: 'das Segelboot', ar: 'القارب الشراعي' }, { de: 'der Wind', ar: 'الريح' }] },
  { id: 'mv', de: 'Mecklenburg-Vorpommern', ar: 'مكلنبورغ-فوربوميرن', capital: 'شفيرين', emoji: '🦢', color: 'from-cyan-500 to-cyan-700', fact: 'أقل الولايات كثافة سكانية. تُعرف بـ"أرض الألف بحيرة" وبطبيعتها البكر الرائعة.', vocab: [{ de: 'der See', ar: 'البحيرة' }, { de: 'der Schwan', ar: 'البجعة' }, { de: 'die Natur', ar: 'الطبيعة' }, { de: 'der Nationalpark', ar: 'المتنزه الوطني' }] },
  { id: 'rp', de: 'Rheinland-Pfalz', ar: 'راينلاند-بفالتس', capital: 'ماينتس', emoji: '🍷', color: 'from-rose-500 to-rose-700', fact: 'قلب منطقة الكروم الألمانية. نهر الراين يمر بها بجانب قلاع رومانية تاريخية.', vocab: [{ de: 'der Wein', ar: 'النبيذ' }, { de: 'die Traube', ar: 'العنب' }, { de: 'das Tal', ar: 'الوادي' }, { de: 'die Ruine', ar: 'الأطلال' }] },
  { id: 'saarland', de: 'Saarland', ar: 'زارلاند', capital: 'زاربريكن', emoji: '⛏️', color: 'from-stone-500 to-stone-700', fact: 'أصغر ولاية غير مدينية. كانت مركزاً لصناعة الفحم والصلب وتتأثر بثقافتها الفرنسية.', vocab: [{ de: 'die Kohle', ar: 'الفحم' }, { de: 'der Stahl', ar: 'الصلب' }, { de: 'die Grenze', ar: 'الحدود' }, { de: 'Frankreich', ar: 'فرنسا' }] },
  { id: 'sa', de: 'Sachsen-Anhalt', ar: 'ساكسونيا-أنهالت', capital: 'ماغدبورغ', emoji: '🏛️', color: 'from-amber-500 to-amber-700', fact: 'موطن مارتن لوثر مُصلح الدين. مدينة هاله مشهورة بجامعتها والموسيقار هاندل.', vocab: [{ de: 'die Reformation', ar: 'الإصلاح الديني' }, { de: 'die Kirche', ar: 'الكنيسة' }, { de: 'die Musik', ar: 'الموسيقى' }, { de: 'die Geschichte', ar: 'التاريخ' }] },
  { id: 'bremen', de: 'Bremen', ar: 'بريمن', capital: 'بريمن', emoji: '🚢', color: 'from-blue-400 to-blue-600', fact: 'أصغر ولاية ألمانية. ميناء تاريخي عريق وموطن حكاية موسيقيي بريمن الشهيرة.', vocab: [{ de: 'der Hafen', ar: 'الميناء' }, { de: 'der Kaufmann', ar: 'التاجر' }, { de: 'das Märchen', ar: 'الحكاية الخيالية' }, { de: 'die Maus', ar: 'الفأر' }] },
]

export default function GermanyMapPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof states[0] | null>(null)
  const [explored, setExplored] = useState<Set<string>>(new Set())

  const filtered = states.filter(s =>
    s.ar.includes(search) || s.de.toLowerCase().includes(search.toLowerCase()) || s.capital.includes(search)
  )

  const xp = explored.size * 50

  const explore = (state: typeof states[0]) => {
    setSelected(state)
    setExplored(prev => new Set([...prev, state.id]))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a] pb-16" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-3">🗺️</div>
          <h1 className="text-3xl font-black mb-2">خريطة ألمانيا التفاعلية</h1>
          <p className="text-emerald-100 text-lg">استكشف الـ 16 ولاية الألمانية وتعلم مفردات كل منطقة</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-2xl px-6 py-2 text-lg font-black">
            <span>⚡</span>
            <span>{xp} XP مكتسب</span>
            <span>•</span>
            <span>{explored.size}/16 ولاية</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 ابحث عن ولاية..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-6 px-5 py-3 rounded-2xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white text-right focus:outline-none focus:border-emerald-500"
        />

        {/* States Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map(state => (
            <button
              key={state.id}
              onClick={() => explore(state)}
              className={`relative rounded-2xl p-4 text-white text-right transition-all hover:scale-105 shadow-lg bg-gradient-to-br ${state.color} ${explored.has(state.id) ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}`}
            >
              {explored.has(state.id) && (
                <span className="absolute top-1 left-1 text-xs bg-yellow-400 text-yellow-900 font-black px-1 rounded-full">✓</span>
              )}
              <div className="text-3xl mb-1">{state.emoji}</div>
              <div className="font-black text-sm leading-tight">{state.ar}</div>
              <div className="text-xs opacity-80 mt-0.5">{state.capital}</div>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 bg-white dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/10">
          <div className="flex justify-between text-sm font-bold text-gray-600 dark:text-gray-300 mb-2">
            <span>التقدم</span>
            <span>{explored.size} / 16 ولاية</span>
          </div>
          <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
              style={{ width: `${(explored.size / 16) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className={`bg-gradient-to-r ${selected.color} rounded-2xl p-4 text-white text-center mb-4`}>
              <div className="text-4xl mb-1">{selected.emoji}</div>
              <h2 className="text-2xl font-black">{selected.ar}</h2>
              <p className="text-sm opacity-90">{selected.de} • العاصمة: {selected.capital}</p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">{selected.fact}</p>
            <h3 className="font-black text-gray-900 dark:text-white mb-3">📚 مفردات مرتبطة:</h3>
            <div className="grid grid-cols-2 gap-2">
              {selected.vocab.map((v, i) => (
                <div key={i} className="bg-gray-50 dark:bg-white/5 rounded-xl p-2 text-center">
                  <div className="font-black text-gray-900 dark:text-white text-sm">{v.de}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">{v.ar}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-emerald-600 dark:text-emerald-400 font-black">+50 XP مكتسب! 🎉</div>
            <button onClick={() => setSelected(null)} className="mt-4 w-full py-2 bg-gray-100 dark:bg-white/10 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
              إغلاق
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 mt-6 text-center">
        <Link to="/" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">← العودة للرئيسية</Link>
      </div>
    </div>
  )
}
