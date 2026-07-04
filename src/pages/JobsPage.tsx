import { useState } from 'react'
import { Link } from 'react-router-dom'

const vocab = [
  { de: 'die Bewerbung', ar: 'طلب التوظيف', ex: 'Ich schicke meine Bewerbung per E-Mail.' },
  { de: 'der Lebenslauf', ar: 'السيرة الذاتية', ex: 'Mein Lebenslauf ist zwei Seiten lang.' },
  { de: 'das Vorstellungsgespräch', ar: 'مقابلة العمل', ex: 'Das Vorstellungsgespräch ist morgen um 10 Uhr.' },
  { de: 'der Arbeitgeber', ar: 'صاحب العمل', ex: 'Mein Arbeitgeber ist sehr nett.' },
  { de: 'der Arbeitnehmer', ar: 'الموظف/العامل', ex: 'Als Arbeitnehmer habe ich viele Rechte.' },
  { de: 'das Gehalt', ar: 'الراتب', ex: 'Das Gehalt wird monatlich überwiesen.' },
  { de: 'der Vertrag', ar: 'العقد', ex: 'Ich habe einen Arbeitsvertrag unterschrieben.' },
  { de: 'die Kündigung', ar: 'إنهاء العقد/الفصل', ex: 'Die Kündigung muss schriftlich erfolgen.' },
  { de: 'der Urlaub', ar: 'الإجازة', ex: 'Ich habe 30 Tage Urlaub im Jahr.' },
  { de: 'die Krankmeldung', ar: 'إشعار المرض', ex: 'Bei Krankheit brauche ich eine Krankmeldung.' },
  { de: 'der Mindestlohn', ar: 'الحد الأدنى للأجر', ex: 'Der Mindestlohn beträgt über 12 Euro pro Stunde.' },
  { de: 'die Probezeit', ar: 'فترة التجربة', ex: 'Die Probezeit dauert 6 Monate.' },
  { de: 'die Überstunden', ar: 'ساعات إضافية', ex: 'Für Überstunden bekomme ich mehr Geld.' },
  { de: 'die Stellenanzeige', ar: 'إعلان وظيفة', ex: 'Ich habe eine interessante Stellenanzeige gefunden.' },
  { de: 'das Arbeitsamt', ar: 'مكتب العمل', ex: 'Das Arbeitsamt hilft bei der Jobsuche.' },
  { de: 'die Qualifikation', ar: 'المؤهل', ex: 'Meine Qualifikationen passen zur Stelle.' },
  { de: 'die Erfahrung', ar: 'الخبرة', ex: 'Ich habe 5 Jahre Erfahrung in diesem Bereich.' },
  { de: 'das Zeugnis', ar: 'شهادة العمل/التقدير', ex: 'Nach der Ausbildung bekomme ich ein Zeugnis.' },
  { de: 'der Kollege', ar: 'الزميل', ex: 'Meine Kollegen sind sehr hilfsbereit.' },
  { de: 'der Chef', ar: 'المدير/الرئيس', ex: 'Mein Chef ist fair und verständnisvoll.' },
  { de: 'das Büro', ar: 'المكتب', ex: 'Ich arbeite im Büro von 9 bis 17 Uhr.' },
  { de: 'die Besprechung', ar: 'الاجتماع', ex: 'Wir haben jeden Montag eine Besprechung.' },
  { de: 'das Praktikum', ar: 'التدريب/الإنترنشيب', ex: 'Ich mache ein Praktikum bei einer Firma.' },
  { de: 'die Ausbildung', ar: 'التدريب المهني', ex: 'Die Ausbildung dauert 3 Jahre.' },
  { de: 'der Betrieb', ar: 'المنشأة/الشركة', ex: 'Der Betrieb hat 50 Mitarbeiter.' },
  { de: 'die Fachkraft', ar: 'الكادر المتخصص', ex: 'Deutschland braucht viele Fachkräfte.' },
  { de: 'die Rentenversicherung', ar: 'تأمين التقاعد', ex: 'Alle Arbeitnehmer zahlen Rentenversicherung.' },
  { de: 'die Krankenversicherung', ar: 'التأمين الصحي', ex: 'Die Krankenversicherung ist Pflicht.' },
  { de: 'das Arbeitszeugnis', ar: 'شهادة الخبرة من صاحب العمل', ex: 'Ein gutes Arbeitszeugnis ist wichtig.' },
  { de: 'die Vollzeit / Teilzeit', ar: 'دوام كامل / جزئي', ex: 'Ich suche eine Teilzeitstelle.' },
]

const interviewQs = [
  { q: 'Erzählen Sie mir etwas über sich.', ar: 'حدثني عن نفسك.', ans: 'أنا [الاسم]، عملت لمدة X سنوات في مجال Y، وأجيد Z...' },
  { q: 'Warum möchten Sie bei uns arbeiten?', ar: 'لماذا تريد العمل عندنا؟', ans: 'لأن شركتكم رائدة في مجالها وأرى فيها فرصة للنمو المهني...' },
  { q: 'Was sind Ihre Stärken?', ar: 'ما هي نقاط قوتك؟', ans: 'أنا منظم، أعمل بشكل جيد ضمن الفريق وأتعلم بسرعة...' },
  { q: 'Was sind Ihre Schwächen?', ar: 'ما هي نقاط ضعفك؟', ans: 'أحياناً أكون مثالياً جداً، لكنني أعمل على تحسين ذلك...' },
  { q: 'Wo sehen Sie sich in 5 Jahren?', ar: 'أين ترى نفسك بعد 5 سنوات؟', ans: 'أريد تطوير مهاراتي وتحمل مسؤوليات أكبر في الشركة...' },
  { q: 'Warum haben Sie Ihren letzten Job verlassen?', ar: 'لماذا تركت عملك السابق؟', ans: 'أردت تحدياً جديداً وفرصة للنمو في بيئة مختلفة...' },
  { q: 'Welche Erfahrungen haben Sie?', ar: 'ما هي خبراتك؟', ans: 'عملت X سنوات في مجال Y حيث كنت مسؤولاً عن Z...' },
  { q: 'Was sind Ihre Gehaltsvorstellungen?', ar: 'ما توقعاتك من الراتب؟', ans: 'بناءً على خبرتي وبحوثي عن السوق، أتوقع راتباً بين X و Y...' },
  { q: 'Können Sie im Team arbeiten?', ar: 'هل تستطيع العمل ضمن فريق؟', ans: 'نعم، أعمل بشكل ممتاز ضمن الفريق. في عملي السابق...' },
  { q: 'Haben Sie Fragen an uns?', ar: 'هل لديك أسئلة لنا؟', ans: 'نعم، ما هي فرص التطوير المهني في شركتكم؟' },
]

const rights = [
  { title: 'الحد الأدنى للأجر', text: 'يحق لك الحصول على أجر لا يقل عن الحد الأدنى المقرر قانونياً (أكثر من 12 يورو/ساعة).', emoji: '💶' },
  { title: 'الإجازة السنوية', text: 'يحق لك على الأقل 20 يوم إجازة مدفوعة سنوياً (الأغلبية تحصل على 25-30 يوماً).', emoji: '🏖️' },
  { title: 'إجازة المرض', text: 'عند المرض تحصل على راتبك كاملاً لمدة 6 أسابيع من صاحب العمل، ثم من التأمين الصحي.', emoji: '🏥' },
  { title: 'مدة العمل', text: 'الحد الأقصى 8 ساعات يومياً (يمكن رفعه إلى 10 ساعات بشروط). العمل الليلي له مكافآت.', emoji: '⏰' },
  { title: 'حماية من الفصل', text: 'بعد فترة التجربة، لا يمكن فصلك إلا بإشعار مسبق وفق القانون (عادة 4 أسابيع).', emoji: '🛡️' },
  { title: 'التأمين الصحي', text: 'صاحب العمل يدفع نصف قسط التأمين الصحي. الاشتراك إلزامي.', emoji: '❤️‍🩹' },
  { title: 'تأمين المعاش', text: 'جزء من راتبك يذهب لتأمين التقاعد. الدولة وصاحب العمل يشاركان.', emoji: '👴' },
  { title: 'بيئة عمل آمنة', text: 'يجب أن يوفر صاحب العمل بيئة عمل آمنة وصحية. يمكنك رفع الأمر للسلطات.', emoji: '⛑️' },
  { title: 'منع التمييز', text: 'يُحظر التمييز بسبب الجنس أو الدين أو الجنسية أو الإعاقة.', emoji: '⚖️' },
  { title: 'إجازة الأمومة/الأبوة', text: 'يحق للوالدين الحصول على إجازة أبوة مدفوعة (Elterngeld) لمدة تصل إلى 14 شهراً.', emoji: '👶' },
]

export default function JobsPage() {
  const [tab, setTab] = useState(0)
  const [learned, setLearned] = useState<Set<number>>(new Set())

  const tabs = ['📖 مفردات العمل', '📝 رسالة التقديم', '🎤 المقابلة', '⚖️ حقوقك']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a] pb-16" dir="rtl">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-3">💼</div>
          <h1 className="text-3xl font-black mb-2">دليل سوق العمل في ألمانيا</h1>
          <p className="text-blue-100 text-lg">كل ما تحتاجه للبحث عن عمل وحضور المقابلات</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setTab(i)}
              className={`shrink-0 px-4 py-2 rounded-xl font-bold text-sm transition-all ${tab === i ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab 0: Vocabulary */}
        {tab === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">انقر لتمييز الكلمة كمتعلَّمة ✓</p>
            {vocab.map((v, i) => (
              <div key={i} onClick={() => setLearned(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s })}
                className={`cursor-pointer flex items-start gap-3 p-3 rounded-xl border transition-all ${learned.has(i) ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700' : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 hover:border-blue-300'}`}>
                <span className="text-lg mt-0.5">{learned.has(i) ? '✅' : '📌'}</span>
                <div className="flex-1">
                  <div className="font-black text-gray-900 dark:text-white">{v.de}</div>
                  <div className="text-blue-600 dark:text-blue-400 font-bold text-sm">{v.ar}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 italic">{v.ex}</div>
                </div>
              </div>
            ))}
            <div className="text-center mt-4 font-bold text-emerald-600 dark:text-emerald-400">تعلمت {learned.size}/{vocab.length} كلمة</div>
          </div>
        )}

        {/* Tab 1: Cover Letter */}
        {tab === 1 && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-gray-100 dark:border-white/10">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-3">🏢 هيكل رسالة التقديم (Bewerbungsschreiben)</h2>
              {[
                { part: '1. البيانات الشخصية', de: 'Vor- und Nachname, Adresse, Telefon, E-Mail', tip: 'ضعها في أعلى يمين الصفحة' },
                { part: '2. بيانات الشركة', de: 'Name der Firma, Ansprechpartner, Adresse', tip: 'ضعها تحت بياناتك على اليسار' },
                { part: '3. التاريخ والموضوع', de: 'Datum + "Bewerbung als [Stelle]"', tip: 'مثال: Bewerbung als Verkäufer' },
                { part: '4. التحية', de: 'Sehr geehrte Damen und Herren,', tip: 'إذا عرفت الاسم: Sehr geehrter Herr Müller,' },
                { part: '5. المقدمة', de: 'Mit großem Interesse habe ich Ihre Stellenanzeige gelesen...', tip: 'اذكر كيف وجدت الإعلان' },
                { part: '6. الصلب', de: 'Ich bin... und habe X Jahre Erfahrung in...', tip: 'اذكر مؤهلاتك المرتبطة بالوظيفة' },
                { part: '7. الخاتمة', de: 'Ich freue mich auf ein persönliches Gespräch...', tip: 'اطلب مقابلة' },
                { part: '8. التوقيع', de: 'Mit freundlichen Grüßen, [Unterschrift]', tip: 'لا تنسَ التوقيع!' },
              ].map((s, i) => (
                <div key={i} className="flex gap-3 mb-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-black flex items-center justify-center shrink-0 text-sm">{i + 1}</div>
                  <div>
                    <div className="font-black text-gray-900 dark:text-white text-sm">{s.part}</div>
                    <div className="font-bold text-blue-600 dark:text-blue-400 text-sm mt-0.5">{s.de}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">💡 {s.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Interview */}
        {tab === 2 && (
          <div className="space-y-3">
            {interviewQs.map((q, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/10">
                <div className="text-xs font-bold text-gray-400 mb-1">سؤال {i + 1}</div>
                <div className="font-black text-gray-900 dark:text-white mb-1">🇩🇪 {q.q}</div>
                <div className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-2">🌐 {q.ar}</div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl px-3 py-2 text-sm text-emerald-800 dark:text-emerald-300">
                  💡 {q.ans}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Rights */}
        {tab === 3 && (
          <div className="grid sm:grid-cols-2 gap-3">
            {rights.map((r, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/10">
                <div className="text-2xl mb-2">{r.emoji}</div>
                <div className="font-black text-gray-900 dark:text-white mb-1">{r.title}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{r.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 text-center">
        <Link to="/" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">← العودة للرئيسية</Link>
      </div>
    </div>
  )
}
