import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Copy, RefreshCw, Mail, CheckCircle2 } from 'lucide-react'

// Define the letter types
type LetterType = 'apology' | 'invitation' | 'complaint' | 'information'

interface MagicLetterData {
  id: LetterType
  title: string
  icon: string
  salutation: { formal: string; informal: string }
  closing: { formal: string; informal: string }
  points: {
    id: string
    label: string
    formalSentence: string
    informalSentence: string
  }[]
}

const letterTemplates: MagicLetterData[] = [
  {
    id: 'apology',
    title: 'رسالة اعتذار (Entschuldigung)',
    icon: '😔',
    salutation: {
      formal: 'Sehr geehrte(r) Herr/Frau [Name],',
      informal: 'Liebe(r) [Name],'
    },
    closing: {
      formal: 'Mit freundlichen Grüßen\n[Dein Name]',
      informal: 'Liebe Grüße\n[Dein Name]'
    },
    points: [
      {
        id: 'p1',
        label: 'الاعتذار عن عدم الحضور اليوم',
        formalSentence: 'ich schreibe Ihnen, um mich dafür zu entschuldigen, dass ich heute leider nicht kommen kann.',
        informalSentence: 'es tut mir total leid, aber ich kann heute leider nicht kommen.'
      },
      {
        id: 'p2',
        label: 'السبب: أنا مريض جداً',
        formalSentence: 'Der Grund dafür ist, dass ich plötzlich sehr krank geworden bin und Fieber habe.',
        informalSentence: 'Ich bin leider plötzlich richtig krank geworden und liege mit Fieber im Bett.'
      },
      {
        id: 'p3',
        label: 'سأرسل التقرير الطبي غداً',
        formalSentence: 'Die ärztliche Bescheinigung werde ich Ihnen selbstverständlich morgen per Post schicken.',
        informalSentence: 'Das Attest vom Arzt schicke ich dir natürlich direkt morgen.'
      },
      {
        id: 'p4',
        label: 'طلب موعد جديد',
        formalSentence: 'Könnten wir bitte einen neuen Termin vereinbaren? Das wäre sehr freundlich von Ihnen.',
        informalSentence: 'Können wir vielleicht einen neuen Termin ausmachen? Das wäre super!'
      }
    ]
  },
  {
    id: 'invitation',
    title: 'رسالة دعوة (Einladung)',
    icon: '🎉',
    salutation: {
      formal: 'Sehr geehrte(r) Herr/Frau [Name],',
      informal: 'Hallo [Name],'
    },
    closing: {
      formal: 'Mit freundlichen Grüßen\n[Dein Name]',
      informal: 'Viele Grüße\n[Dein Name]'
    },
    points: [
      {
        id: 'i1',
        label: 'دعوة لحفلة عيد ميلاد',
        formalSentence: 'ich möchte Sie herzlich zu meiner Geburtstagsfeier am kommenden Samstag einladen.',
        informalSentence: 'ich lade dich ganz herzlich zu meiner Geburtstagsparty am Samstag ein.'
      },
      {
        id: 'i2',
        label: 'الزمان والمكان',
        formalSentence: 'Die Feier beginnt um 19:00 Uhr und findet in meiner Wohnung (Musterstraße 1) statt.',
        informalSentence: 'Wir fangen um 19 Uhr an. Die Party steigt bei mir zu Hause (Musterstraße 1).'
      },
      {
        id: 'i3',
        label: 'طلب جلب شيء (مشروبات أو طعام)',
        formalSentence: 'Wenn Sie möchten, können Sie gerne eine Kleinigkeit zu essen oder trinken mitbringen.',
        informalSentence: 'Es wäre super, wenn du noch was zu trinken oder einen kleinen Salat mitbringen könntest.'
      },
      {
        id: 'i4',
        label: 'طلب تأكيد الحضور',
        formalSentence: 'Bitte geben Sie mir bis Freitag Bescheid, ob Sie kommen können.',
        informalSentence: 'Bitte sag mir bis Freitag Bescheid, ob du dabei bist.'
      }
    ]
  },
  {
    id: 'complaint',
    title: 'رسالة شكوى (Beschwerde)',
    icon: '😠',
    salutation: {
      formal: 'Sehr geehrte Damen und Herren,',
      informal: 'Hallo zusammen,'
    },
    closing: {
      formal: 'Mit freundlichen Grüßen\n[Dein Name]',
      informal: 'Grüße\n[Dein Name]'
    },
    points: [
      {
        id: 'c1',
        label: 'سبب الكتابة (شكوى عن منتج/خدمة)',
        formalSentence: 'ich schreibe Ihnen, weil ich mich über Ihr Produkt / Ihre Dienstleistung beschweren möchte.',
        informalSentence: 'ich muss mich leider beschweren, weil etwas schiefgelaufen ist.'
      },
      {
        id: 'c2',
        label: 'المشكلة (لا يعمل كما في الإعلان)',
        formalSentence: 'Leider funktioniert das Gerät nicht so, wie es in Ihrer Anzeige beschrieben war.',
        informalSentence: 'Das Teil funktioniert leider überhaupt nicht so, wie ihr es versprochen habt.'
      },
      {
        id: 'c3',
        label: 'خيبة أمل',
        formalSentence: 'Ich bin sehr enttäuscht, da ich viel Geld dafür bezahlt habe.',
        informalSentence: 'Ich bin echt enttäuscht, besonders weil es nicht billig war.'
      },
      {
        id: 'c4',
        label: 'طلب تعويض أو إصلاح',
        formalSentence: 'Ich fordere Sie auf, das Gerät umgehend zu reparieren oder mir mein Geld zurückzuerstatten.',
        informalSentence: 'Bitte kümmert euch schnell um eine Reparatur, sonst hätte ich gern mein Geld zurück.'
      }
    ]
  }
]

export default function MagicLetterPage() {
  const [selectedType, setSelectedType] = useState<LetterType>('apology')
  const [tone, setTone] = useState<'formal' | 'informal'>('formal')
  const [selectedPoints, setSelectedPoints] = useState<string[]>([])
  const [receiverName, setReceiverName] = useState('Müller')
  const [senderName, setSenderName] = useState('Hadi')
  const [copied, setCopied] = useState(false)

  const activeTemplate = letterTemplates.find(t => t.id === selectedType)!

  const togglePoint = (id: string) => {
    if (selectedPoints.includes(id)) {
      setSelectedPoints(selectedPoints.filter(p => p !== id))
    } else {
      setSelectedPoints([...selectedPoints, id])
    }
  }

  // Auto-select all points when switching templates for convenience
  const handleTypeChange = (type: LetterType) => {
    setSelectedType(type)
    const t = letterTemplates.find(x => x.id === type)!
    setSelectedPoints(t.points.map(p => p.id))
  }

  // Generate the letter
  let generatedLetter = ''
  
  if (selectedPoints.length > 0) {
    let salutation = tone === 'formal' ? activeTemplate.salutation.formal : activeTemplate.salutation.informal
    salutation = salutation.replace('[Name]', receiverName)
    
    generatedLetter += salutation + '\n\n'
    
    const sentences = activeTemplate.points
      .filter(p => selectedPoints.includes(p.id))
      .map(p => tone === 'formal' ? p.formalSentence : p.informalSentence)
    
    generatedLetter += sentences.join(' ') + '\n\n'
    
    let closing = tone === 'formal' ? activeTemplate.closing.formal : activeTemplate.closing.informal
    closing = closing.replace('[Dein Name]', senderName)
    
    generatedLetter += closing
  } else {
    generatedLetter = 'يرجى تحديد نقطة واحدة على الأقل لتوليد الرسالة...'
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-fade-in" dir="rtl">
      
      {/* Header */}
      <div className="glass rounded-[2rem] p-8 border border-blue-500/20 shadow-xl relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#0984e3]/10 dark:to-[#6c5ce7]/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-4xl shadow-lg shrink-0">
            ✉️
          </div>
          <div className="text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-black rounded-full uppercase tracking-wider mb-3 shadow-md animate-pulse">
              ✨ جديد
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">صانع رسائل B1 الذكي</h1>
            <p className="text-gray-600 dark:text-gray-300 font-bold max-w-2xl">
              لا تعرف كيف تبدأ رسالتك في الفحص؟ اختر نوع الرسالة، حدد النقاط المطلوب منك كتابتها، وسيقوم هذا الساحر بتوليد رسالة B1 مثالية جاهزة للنسخ والحفظ!
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Controls Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Type Selection */}
          <div className="glass rounded-[2rem] p-6 border border-gray-200 dark:border-white/5 shadow-md">
            <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4">1. اختر موضوع الرسالة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {letterTemplates.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleTypeChange(t.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl font-bold transition-all border-2 ${
                    selectedType === t.id 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400 shadow-md' 
                      : 'bg-white dark:bg-[#1a1a2e] border-transparent hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <span className="text-3xl">{t.icon}</span>
                  <span className="text-sm">{t.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tone & Names */}
          <div className="glass rounded-[2rem] p-6 border border-gray-200 dark:border-white/5 shadow-md flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">2. أسلوب الرسالة (الصيغة)</label>
              <div className="flex bg-gray-100 dark:bg-black/20 p-1.5 rounded-xl">
                <button
                  onClick={() => setTone('formal')}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tone === 'formal' ? 'bg-white dark:bg-[#2d2d44] shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  رسمي (Sie) 👔
                </button>
                <button
                  onClick={() => setTone('informal')}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tone === 'informal' ? 'bg-white dark:bg-[#2d2d44] shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  غير رسمي (du) 👕
                </button>
              </div>
            </div>
            
            <div className="w-32">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">اسم المرسل إليه</label>
              <input 
                type="text" 
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                className="w-full bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 outline-none focus:border-blue-500 transition-colors font-mono text-left"
                dir="ltr"
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">اسمك أنت</label>
              <input 
                type="text" 
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 outline-none focus:border-blue-500 transition-colors font-mono text-left"
                dir="ltr"
              />
            </div>
          </div>

          {/* Points Selection */}
          <div className="glass rounded-[2rem] p-6 border border-gray-200 dark:border-white/5 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-black text-gray-900 dark:text-white">3. حدد النقاط المطلوبة منك في السؤال</h2>
              <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded-md font-bold">
                {selectedPoints.length} / {activeTemplate.points.length} نقاط
              </span>
            </div>
            <div className="space-y-3">
              {activeTemplate.points.map(p => {
                const isSelected = selectedPoints.includes(p.id)
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePoint(p.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' 
                        : 'border-gray-100 dark:border-white/5 bg-white dark:bg-[#1a1a2e] hover:border-emerald-200'
                    }`}
                  >
                    <span className={`font-bold text-right ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}>
                      {p.label}
                    </span>
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${isSelected ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      {isSelected && <Check size={16} strokeWidth={3} />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Output Panel (5 cols) */}
        <div className="lg:col-span-5">
          <div className="glass rounded-[2rem] p-6 border border-gray-200 dark:border-white/5 shadow-2xl sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                <Mail className="text-blue-500" /> النتيجة السحرية 🪄
              </h2>
              <button 
                onClick={handleCopy}
                disabled={selectedPoints.length === 0}
                className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400 px-4 py-2 rounded-xl text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                {copied ? 'تم النسخ!' : 'نسخ الرسالة'}
              </button>
            </div>

            <div className="bg-white dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 min-h-[300px] shadow-inner relative">
              {selectedPoints.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
                  <RefreshCw size={40} className="mb-4 opacity-20" />
                  <p className="font-bold text-sm text-center px-4">اختر النقاط من اليمين ليتم توليد الرسالة هنا مباشرة.</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`${selectedType}-${tone}-${selectedPoints.join('-')}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="whitespace-pre-wrap font-serif text-lg text-gray-800 dark:text-gray-200 leading-relaxed"
                    dir="ltr"
                  >
                    {generatedLetter}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-xl">
              <p className="text-xs font-bold text-yellow-800 dark:text-yellow-400 leading-relaxed">
                <span className="text-base">💡</span> نصيحة للفحص: لا تحفظ الرسالة كاملة بصم، بل احفظ **الجمل المعيارية** وكيفية ربطها ببعضها (Redemittel).
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
