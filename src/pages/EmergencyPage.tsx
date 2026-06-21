import { useState } from 'react'

const examPhrases = [
  { de: 'Können Sie die Frage bitte wiederholen?', ar: 'هل يمكنك تكرار السؤال من فضلك؟', type: 'fragen' },
  { de: 'Entschuldigung, ich habe das nicht richtig verstanden.', ar: 'عذراً، لم أفهم ذلك بشكل صحيح.', type: 'fragen' },
  { de: 'Können Sie das bitte etwas langsamer sagen?', ar: 'هل يمكنك قول ذلك ببطء أكثر من فضلك؟', type: 'fragen' },
  { de: 'Ich brauche einen Moment, bitte.', ar: 'أحتاج لحظة للتفكير من فضلك.', type: 'zeit' },
  { de: 'Lassen Sie mich kurz nachdenken.', ar: 'دعني أفكر للحظة.', type: 'zeit' },
  { de: 'Wie sagt man ... auf Deutsch?', ar: 'كيف نقول ... بالألمانية؟', type: 'wort' },
  { de: 'Mir fällt das Wort gerade nicht ein, aber ich meine...', ar: 'لا تحضرني الكلمه الآن، لكنني أقصد...', type: 'wort' },
  { de: 'Ich meine damit, dass...', ar: 'أقصد بذلك أن...', type: 'wort' },
  { de: 'Meiner Meinung nach...', ar: 'في رأيي...', type: 'meinung' },
  { de: 'Ich bin der Meinung, dass...', ar: 'أنا أرى أنّ...', type: 'meinung' },
  { de: 'Zum Beispiel...', ar: 'على سبيل المثال...', type: 'beispiel' },
  { de: 'Zusammenfassend kann man sagen, dass...', ar: 'يمكن تلخيص ذلك بأن...', type: 'zusammenfassung' },
]

const medicalPhrases = [
  { de: 'Ich brauche sofort einen Arzt!', ar: 'أحتاج إلى طبيب فوراً!', category: 'Notfall (طوارئ)' },
  { de: 'Rufen Sie einen Krankenwagen!', ar: 'اتصل بسيارة الإسعاف!', category: 'Notfall (طوارئ)' },
  { de: 'Wo tut es Ihnen weh?', ar: 'أين يؤلمك؟', category: 'Beim Arzt/Apotheker (عند الطبيب/الصيدلي)' },
  { de: 'Ich habe starke Schmerzen in der Brust.', ar: 'لدي ألم شديد في الصدر.', category: 'Symptome (أعراض)' },
  { de: 'Mir ist schwindelig / Mir ist übel.', ar: 'أشعر بالدوار / أشعر بالغثيان.', category: 'Symptome (أعراض)' },
  { de: 'Ich habe eine Allergie gegen dieses Medikament.', ar: 'لدي حساسية تجاه هذا الدواء.', category: 'Beim Arzt/Apotheker (عند الطبيب/الصيدلي)' },
  { de: 'Wie oft soll ich diese Tabletten einnehmen?', ar: 'كم مرة يجب أن أتناول هذه الحبوب؟', category: 'Apotheke (في الصيدلية)' },
  { de: 'Dreimal täglich nach dem Essen.', ar: 'ثلاث مرات يومياً بعد الأكل.', category: 'Apotheke (في الصيدلية)' },
]

const emergencyNumbers = [
  { number: '112', title: 'Feuerwehr & Rettungsdienst', ar: 'المطافئ والإسعاف', desc: 'للحالات المهددة للحياة، الحوادث الخطيرة، والحرائق.' },
  { number: '110', title: 'Polizei', ar: 'الشرطة', desc: 'للجرائم، الحوادث المرورية، أو إذا كنت في خطر.' },
  { number: '116117', title: 'Ärztlicher Bereitschaftsdienst', ar: 'الخدمة الطبية المناوبة', desc: 'للحالات الطبية غير المهددة للحياة، في عطلة نهاية الأسبوع أو ليلاً.' },
  { number: '19240', title: 'Giftnotruf', ar: 'مركز طوارئ السموم', desc: 'في حالات التسمم (الرقم يختلف قليلاً حسب الولاية، هذا لولاية NRW).' },
]

export default function EmergencyPage() {
  const [activeTab, setActiveTab] = useState<'exam' | 'medical'>('medical')

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl sm:text-4xl font-black mb-3 text-gray-900 dark:text-white">
          {activeTab === 'exam' ? '🗣️ صندوق إنقاذ الامتحان' : '🚨 دليل الطوارئ في ألمانيا'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {activeTab === 'exam' ? 'عبارات وجمل تنقذك حين تنسى الكلمات في الامتحان الشفهي.' : 'أهم أرقام الطوارئ والعبارات الطبية لإنقاذ الحياة.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl border border-gray-200 dark:border-white/10 w-full sm:w-fit mx-auto">
        <button 
          onClick={() => setActiveTab('medical')}
          className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === 'medical' ? 'bg-red-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10'}`}
        >
          🏥 طوارئ طبية
        </button>
        <button 
          onClick={() => setActiveTab('exam')}
          className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === 'exam' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10'}`}
        >
          🎓 طوارئ الامتحان
        </button>
      </div>

      {/* Medical Tab */}
      {activeTab === 'medical' && (
        <div className="space-y-8 animate-fade-in-up">
          {/* Emergency Numbers */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black flex items-center gap-2 text-gray-900 dark:text-white border-r-4 border-red-500 pr-3">
              📞 أرقام الطوارئ (Notrufnummern)
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {emergencyNumbers.map((num, idx) => (
                <div key={idx} className="glass p-5 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-sm relative overflow-hidden group hover:border-red-500 transition-colors">
                  <div className="absolute left-0 top-0 w-2 h-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">{num.title}</h3>
                    <div className="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 font-black text-xl px-3 py-1 rounded-lg" dir="ltr">{num.number}</div>
                  </div>
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">{num.ar}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{num.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Phrases */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black flex items-center gap-2 text-gray-900 dark:text-white border-r-4 border-emerald-500 pr-3">
              🩺 عبارات طبية (Medizinische Sätze)
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {medicalPhrases.map((p, i) => (
                <div key={i} className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-emerald-500/50 transition-colors">
                  <div className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded w-fit mb-3">
                    {p.category}
                  </div>
                  <p className="font-bold text-lg text-gray-900 dark:text-white mb-2" dir="ltr">{p.de}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{p.ar}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Exam Tab */}
      {activeTab === 'exam' && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800/30 flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-1">نصيحة للامتحان الشفهي</h3>
              <p className="text-sm text-indigo-700 dark:text-indigo-400">لا تصمت أبداً! إذا لم تفهم شيئاً أو نسيت كلمة، استخدم إحدى هذه الجمل. الفاحص يقدر قدرتك على إدارة الموقف باللغة الألمانية أكثر من حفظك للكلمات.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {examPhrases.map((p, i) => {
              const colors: Record<string, string> = {
                'fragen': 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30',
                'zeit': 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30',
                'wort': 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800/30',
                'meinung': 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/30',
                'beispiel': 'text-rose-600 bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800/30',
                'zusammenfassung': 'text-cyan-600 bg-cyan-50 border-cyan-200 dark:bg-cyan-900/20 dark:border-cyan-800/30',
              }
              const colorClass = colors[p.type] || 'text-gray-600 bg-gray-50 border-gray-200'

              return (
                <div key={i} className="glass rounded-xl p-5 border border-gray-200 dark:border-white/5 hover:shadow-md transition-all">
                  <div className={`text-[10px] font-bold px-2 py-1 rounded w-fit mb-3 border ${colorClass}`}>
                    {p.type.toUpperCase()}
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white mb-2" dir="ltr">{p.de}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{p.ar}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
