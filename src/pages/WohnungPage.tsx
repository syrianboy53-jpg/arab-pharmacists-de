import { useState } from 'react'
import { Link } from 'react-router-dom'

const vocab = [
  { de: 'die Miete', ar: 'الإيجار', ex: 'Die Miete beträgt 900 Euro pro Monat.' },
  { de: 'die Kaltmiete', ar: 'الإيجار بدون تكاليف', ex: 'Kaltmiete: 750 Euro, Warmmiete: 900 Euro.' },
  { de: 'die Warmmiete', ar: 'الإيجار شامل التكاليف', ex: 'Die Warmmiete enthält Heizung und Nebenkosten.' },
  { de: 'die Kaution', ar: 'الوديعة/الضمان', ex: 'Die Kaution beträgt 3 Monatsmieten.' },
  { de: 'der Vermieter', ar: 'صاحب العقار/المؤجِّر', ex: 'Der Vermieter wohnt im Erdgeschoss.' },
  { de: 'der Mieter', ar: 'المستأجر', ex: 'Als Mieter habe ich viele Rechte.' },
  { de: 'die Nebenkosten', ar: 'التكاليف الإضافية (ماء، مصعد، نظافة)', ex: 'Nebenkosten kommen zur Miete dazu.' },
  { de: 'das Mietverhältnis', ar: 'علاقة الإيجار', ex: 'Das Mietverhältnis beginnt am 1. Oktober.' },
  { de: 'der Mietvertrag', ar: 'عقد الإيجار', ex: 'Beide Seiten unterschreiben den Mietvertrag.' },
  { de: 'die Wohnfläche', ar: 'مساحة السكن', ex: 'Die Wohnfläche beträgt 65 Quadratmeter.' },
  { de: 'das Quadratmeter (qm)', ar: 'المتر المربع', ex: 'Die Wohnung hat 80 qm.' },
  { de: 'die Besichtigung', ar: 'معاينة الشقة', ex: 'Ich möchte einen Besichtigungstermin vereinbaren.' },
  { de: 'der Balkon', ar: 'الشرفة', ex: 'Die Wohnung hat einen großen Balkon.' },
  { de: 'der Keller', ar: 'القبو/المستودع', ex: 'Jede Wohnung hat einen Kellerraum.' },
  { de: 'die Einbauküche', ar: 'مطبخ مدمج', ex: 'Die Wohnung hat eine Einbauküche.' },
  { de: 'die Schufa', ar: 'تقرير الائتمان الألماني', ex: 'Der Vermieter will eine Schufa-Auskunft.' },
  { de: 'die Nebenkostenabrechnung', ar: 'فاتورة التكاليف الإضافية السنوية', ex: 'Die Nebenkostenabrechnung kommt einmal im Jahr.' },
  { de: 'die Kündigung', ar: 'إشعار إنهاء العقد', ex: 'Kündigung muss 3 Monate vorher erfolgen.' },
  { de: 'der Hausmeister', ar: 'مسؤول الصيانة', ex: 'Der Hausmeister repariert den Aufzug.' },
  { de: 'die Hausverwaltung', ar: 'إدارة العقار', ex: 'Ich ruf die Hausverwaltung wegen des Schadens an.' },
  { de: 'der Aufzug', ar: 'المصعد', ex: 'Der Aufzug ist leider kaputt.' },
  { de: 'das Treppenhaus', ar: 'درج البناية', ex: 'Das Treppenhaus muss sauber gehalten werden.' },
  { de: 'die Müllentsorgung', ar: 'رمي القمامة', ex: 'Gelber Sack, Biotonne, Restmüll.' },
  { de: 'die Ruhezeiten', ar: 'ساعات الهدوء', ex: 'Ruhezeiten: 13–15 Uhr und ab 22 Uhr.' },
  { de: 'der Schimmel', ar: 'العفن', ex: 'Schimmel in der Wohnung muss sofort gemeldet werden.' },
]

const contracts = [
  { term: 'unbefristeter Mietvertrag', ar: 'عقد إيجار غير محدد المدة', desc: 'الأكثر شيوعاً. يستمر حتى يقرر أحد الطرفين إنهاءه.' },
  { term: 'befristeter Mietvertrag', ar: 'عقد إيجار محدد المدة', desc: 'له تاريخ انتهاء محدد. لا يمكن تمديده تلقائياً.' },
  { term: 'Mietkaution', ar: 'الوديعة الضمانية', desc: 'تُدفع عند بداية العقد، تُرجع عند الانتهاء إذا لم يكن هناك أضرار. بحد أقصى 3 أشهر.' },
  { term: 'Kündigungsfrist', ar: 'مهلة الإشعار بالإنهاء', desc: 'في العادة 3 أشهر للمستأجر. الإشعار يجب أن يكون كتابياً.' },
  { term: 'Schönheitsreparaturen', ar: 'إصلاحات الديكور', desc: 'بعض العقود تُلزم المستأجر بدهان الجدران عند الخروج.' },
  { term: 'Nebenkosten', ar: 'التكاليف الجانبية', desc: 'تشمل: الماء، والتدفئة، والمصعد، والنظافة، وأكثر.' },
  { term: 'Betriebskosten', ar: 'تكاليف التشغيل', desc: 'مصطلح قانوني للتكاليف الجانبية. يجب أن تكون مُفصَّلة في العقد.' },
  { term: 'Hausordnung', ar: 'لوائح البناية', desc: 'قواعد البناية من حيث الهدوء والنظافة والمصعد.' },
  { term: 'Wohnungsübergabeprotokoll', ar: 'محضر تسليم الشقة', desc: 'وثيقة توصّف حالة الشقة عند التسليم والاستلام.' },
  { term: 'Aufwandsentschädigung', ar: 'تعويض المصاريف', desc: 'مبالغ إضافية قد تُطلب مقابل خدمات خاصة.' },
]

const letters = [
  {
    title: 'الإبلاغ عن ضرر',
    de: `Sehr geehrte Hausverwaltung,\n\nhiermit möchte ich einen Schaden in meiner Wohnung melden.\n\nSeit dem [Datum] gibt es in meiner Wohnung folgendes Problem: [Beschreibung des Schadens, z.B. ein Wasserleck unter der Küche].\n\nIch bitte Sie, das Problem so schnell wie möglich zu beheben.\n\nMit freundlichen Grüßen,\n[Ihr Name]\n[Adresse]\n[Telefonnummer]`,
    ar: 'هذا نموذج رسالة للإبلاغ عن ضرر في الشقة مثل تسرب المياه أو العطل.'
  },
  {
    title: 'طلب إصلاح',
    de: `Sehr geehrter Herr/Frau [Name des Vermieters],\n\nIch wohne seit [Datum] in Ihrer Wohnung in der [Adresse].\n\nLeider funktioniert die Heizung in meiner Wohnung nicht mehr richtig. Besonders in den Schlaf- und Wohnzimmern ist es sehr kalt.\n\nIch bitte Sie dringend, diesen Mangel reparieren zu lassen.\n\nMit freundlichen Grüßen,\n[Ihr Name]`,
    ar: 'رسالة لطلب إصلاح عطل مثل التدفئة أو السباكة.'
  },
  {
    title: 'إشعار إنهاء العقد',
    de: `Sehr geehrter Herr/Frau [Name des Vermieters],\n\nhiermit kündige ich das bestehende Mietverhältnis für die Wohnung in der [Adresse] ordentlich und fristgerecht zum [Datum].\n\nIch bitte Sie um eine schriftliche Bestätigung der Kündigung.\n\nMit freundlichen Grüßen,\n[Ihr Name]\n[Datum, Unterschrift]`,
    ar: 'رسالة إنهاء عقد الإيجار. يجب أن تصل قبل 3 أشهر من تاريخ المغادرة.'
  },
  {
    title: 'شكوى من الضوضاء',
    de: `Sehr geehrter Herr/Frau [Name des Vermieters],\n\nleider muss ich mich über den Lärm meiner Nachbarn beschweren.\n\nSeit einigen Wochen gibt es in der Nacht (nach 22:00 Uhr) sehr lauten Lärm aus der Wohnung [Nummer], was gegen die Hausordnung verstößt.\n\nIch bitte Sie, die Mieter darauf hinzuweisen.\n\nMit freundlichen Grüßen,\n[Ihr Name]`,
    ar: 'شكوى رسمية من الضجيج المخالف لقواعد البناية.'
  },
]

export default function WohnungPage() {
  const [tab, setTab] = useState(0)
  const [copied, setCopied] = useState(-1)
  const tabs = ['📖 مفردات السكن', '📄 عقد الإيجار', '✉️ رسائل للمالك', '⚖️ حقوقك']

  const copy = (text: string, i: number) => {
    navigator.clipboard.writeText(text)
    setCopied(i)
    setTimeout(() => setCopied(-1), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a] pb-16" dir="rtl">
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-3">🏠</div>
          <h1 className="text-3xl font-black mb-2">دليل السكن والإيجار</h1>
          <p className="text-orange-100 text-lg">كل ما تحتاجه للعيش في ألمانيا بثقة</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setTab(i)}
              className={`shrink-0 px-4 py-2 rounded-xl font-bold text-sm transition-all ${tab === i ? 'bg-orange-500 text-white shadow-lg' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 0 && (
          <div className="space-y-2">
            {vocab.map((v, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-xl p-3 border border-gray-100 dark:border-white/10">
                <div className="font-black text-gray-900 dark:text-white">{v.de}</div>
                <div className="text-orange-600 dark:text-orange-400 font-bold text-sm">{v.ar}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 italic">{v.ex}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 1 && (
          <div className="space-y-3">
            {contracts.map((c, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/10">
                <div className="font-black text-gray-900 dark:text-white">{c.term}</div>
                <div className="text-orange-600 dark:text-orange-400 font-bold text-sm mb-1">{c.ar}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">{c.desc}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 2 && (
          <div className="space-y-4">
            {letters.map((l, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-gray-100 dark:border-white/10">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-white">{l.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{l.ar}</p>
                  </div>
                  <button onClick={() => copy(l.de, i)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${copied === i ? 'bg-emerald-500 text-white' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200'}`}>
                    {copied === i ? '✓ تم النسخ' : '📋 نسخ'}
                  </button>
                </div>
                <pre className="bg-gray-50 dark:bg-black/20 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap leading-relaxed text-left">
                  {l.de}
                </pre>
              </div>
            ))}
          </div>
        )}

        {tab === 3 && (
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { t: 'حق السكن الآمن', d: 'يجب أن تكون الشقة صالحة للسكن. التدفئة والماء الساخن حق أساسي.', e: '🏠' },
              { t: 'حد الكاution', d: 'الوديعة لا تتجاوز 3 أشهر إيجار قانونياً.', e: '💰' },
              { t: 'الحماية من الإخلاء', d: 'لا يمكن طردك دون إشعار قانوني. الإخلاء الفوري فقط في حالات استثنائية.', e: '🛡️' },
              { t: 'استرداد الكاution', d: 'بعد الانتهاء يجب استرداد الوديعة خلال 3-6 أشهر إذا لم يكن هناك أضرار.', e: '💵' },
              { t: 'الخصوصية', d: 'المالك لا يحق له الدخول دون إشعار مسبق (عادة 24-48 ساعة).', e: '🔒' },
              { t: 'الإيجار الملزم', d: 'لا يمكن رفع الإيجار أكثر من 10-20% كل 3 سنوات (Mietpreisbremse).', e: '📊' },
              { t: 'حق الإصلاح', d: 'صاحب العقار ملزم بإصلاح الأعطال الجوهرية مجاناً.', e: '🔧' },
              { t: 'مستشار قانوني', d: 'يمكنك الاستعانة بـ Mieterverein (جمعية المستأجرين) للاستشارة بسعر منخفض.', e: '⚖️' },
            ].map((r, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/10">
                <div className="text-2xl mb-2">{r.e}</div>
                <div className="font-black text-gray-900 dark:text-white mb-1">{r.t}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">{r.d}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 text-center">
        <Link to="/" className="text-orange-600 dark:text-orange-400 font-bold hover:underline">← العودة للرئيسية</Link>
      </div>
    </div>
  )
}
