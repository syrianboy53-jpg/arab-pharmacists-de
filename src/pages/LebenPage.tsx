import { useState } from 'react'

interface LebenQuestion {
  id: number
  question: string
  questionAr: string
  options: string[]
  correct: number
}

const lebenQuestions: LebenQuestion[] = [
  { id: 1, question: 'Was steht im Grundgesetz?', questionAr: 'ماذا ينصّ الدستور الألماني؟', options: ['Deutschland ist eine Diktatur.', 'Die Würde des Menschen ist unantastbar.', 'Alle Menschen müssen die gleiche Religion haben.', 'Der König bestimmt die Gesetze.'], correct: 1 },
  { id: 2, question: 'Welches Recht gehört zu den Grundrechten in Deutschland?', questionAr: 'أيّ حقّ ينتمي للحقوق الأساسية في ألمانيا؟', options: ['Waffenbesitz', 'Religionsfreiheit', 'Faustrecht', 'Recht auf Rache'], correct: 1 },
  { id: 3, question: 'Was versteht man unter dem Recht auf "freie Entfaltung der Persönlichkeit"?', questionAr: 'ما المقصود بحقّ "التطوّر الحر للشخصية"؟', options: ['Man darf alles tun, ohne die Rechte anderer zu beachten.', 'Man darf seine Meinung sagen, sich versammeln und sein Leben frei gestalten.', 'Man muss sich dem Staat unterordnen.', 'Nur Deutsche haben dieses Recht.'], correct: 1 },
  { id: 4, question: 'Was ist die Hauptstadt von Deutschland?', questionAr: 'ما هي عاصمة ألمانيا؟', options: ['München', 'Hamburg', 'Berlin', 'Frankfurt'], correct: 2 },
  { id: 5, question: 'Wie heißt die deutsche Verfassung?', questionAr: 'ما اسم الدستور الألماني؟', options: ['Bundesgesetz', 'Grundgesetz', 'Volksgesetz', 'Verfassungsgesetz'], correct: 1 },
  { id: 6, question: 'Welches Tier ist das Wappentier Deutschlands?', questionAr: 'ما هو الحيوان الموجود على شعار ألمانيا؟', options: ['Löwe', 'Adler', 'Bär', 'Wolf'], correct: 1 },
  { id: 7, question: 'Was für eine Staatsform hat Deutschland?', questionAr: 'ما هو شكل الدولة في ألمانيا؟', options: ['Monarchie', 'Diktatur', 'Republik', 'Anarchie'], correct: 2 },
  { id: 8, question: 'Wer wählt den Bundeskanzler / die Bundeskanzlerin?', questionAr: 'مَن ينتخب المستشار الاتحادي؟', options: ['das Volk direkt', 'der Bundestag', 'der Bundesrat', 'der Bundespräsident'], correct: 1 },
  { id: 9, question: 'Wie viele Bundesländer hat Deutschland?', questionAr: 'كم ولاية اتحادية في ألمانيا؟', options: ['12', '14', '16', '18'], correct: 2 },
  { id: 10, question: 'Was ist kein Bundesland?', questionAr: 'ما الذي ليس ولاية اتحادية؟', options: ['Bayern', 'Franken', 'Hessen', 'Sachsen'], correct: 1 },
  { id: 11, question: 'Die deutschen Gesetze gelten...', questionAr: 'القوانين الألمانية تسري...', options: ['nur für Deutsche', 'für alle Männer', 'für alle Menschen in Deutschland', 'nur für Erwachsene'], correct: 2 },
  { id: 12, question: 'Was bedeutet "Rechtsstaat"?', questionAr: 'ما معنى "دولة القانون"؟', options: ['Der Staat hat immer Recht.', 'Es gibt nur rechte Parteien.', 'Der Staat muss sich an die Gesetze halten.', 'Alle müssen rechts fahren.'], correct: 2 },
  { id: 13, question: 'Was ist in Deutschland ab 18 Jahren erlaubt?', questionAr: 'ما المسموح به في ألمانيا من عمر 18؟', options: ['Autofahren ohne Führerschein', 'An Wahlen teilnehmen', 'Alkohol an Kinder verkaufen', 'Die Schule verlassen'], correct: 1 },
  { id: 14, question: 'Deutschland ist...', questionAr: 'ألمانيا هي...', options: ['ein Zentralstaat', 'ein Bundesstaat', 'eine Monarchie', 'eine Diktatur'], correct: 1 },
  { id: 15, question: 'Was gehört NICHT zu den Aufgaben des Bundespräsidenten?', questionAr: 'ما الذي لا يعدّ من مهام رئيس الجمهورية الاتحادي؟', options: ['Gesetze unterschreiben', 'Regierungsarbeit leiten', 'Deutschland im Ausland vertreten', 'Richter ernennen'], correct: 1 },
  { id: 16, question: 'Was ist der Bundestag?', questionAr: 'ما هو البوندستاغ؟', options: ['Die Regierung', 'Das Parlament', 'Das Gericht', 'Die Polizei'], correct: 1 },
  { id: 17, question: 'Wer ist das Staatsoberhaupt in Deutschland?', questionAr: 'مَن هو رئيس الدولة في ألمانيا؟', options: ['Der Bundeskanzler', 'Der Bundespräsident', 'Der Bundestagspräsident', 'Der Ministerpräsident'], correct: 1 },
  { id: 18, question: 'Was passiert bei einer Bundestagswahl?', questionAr: 'ماذا يحصل عند انتخابات البوندستاغ؟', options: ['Man wählt den Bundespräsidenten.', 'Man wählt Abgeordnete.', 'Man wählt den Bundesrat.', 'Man wählt Richter.'], correct: 1 },
  { id: 19, question: 'Ab welchem Alter darf man in Deutschland wählen?', questionAr: 'من أيّ عمر يحقّ للمرء التصويت في ألمانيا؟', options: ['16', '18', '21', '25'], correct: 1 },
  { id: 20, question: 'Was bedeutet "Meinungsfreiheit"?', questionAr: 'ما معنى "حرية الرأي"؟', options: ['Man darf nur positive Meinungen haben.', 'Jeder darf seine Meinung frei äußern.', 'Nur Politiker dürfen ihre Meinung sagen.', 'Man muss immer der Regierung zustimmen.'], correct: 1 },
]

export default function LebenPage() {
  const [currentSet, setCurrentSet] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const questionsPerPage = 10
  const totalSets = Math.ceil(lebenQuestions.length / questionsPerPage)
  const currentQuestions = lebenQuestions.slice(currentSet * questionsPerPage, (currentSet + 1) * questionsPerPage)

  const score = currentQuestions.filter(q => answers[q.id] === q.correct).length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🇩🇪</span>
        <div>
          <h1 className="text-2xl font-bold">الحياة في ألمانيا — Leben in Deutschland</h1>
          <p className="text-muted text-sm">أسئلة اختبار الجنسية الألمانية مع ترجمة عربية. ({lebenQuestions.length} سؤال)</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: totalSets }, (_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentSet(i); setAnswers({}); setShowResults(false) }}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${currentSet === i ? 'bg-green text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            المجموعة {i + 1}
          </button>
        ))}
      </div>

      {showResults && (
        <div className={`rounded-xl p-4 text-center font-bold ${score >= currentQuestions.length * 0.7 ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}>
          النتيجة: {score} / {currentQuestions.length} {score >= currentQuestions.length * 0.7 ? '🎉' : '💪'}
        </div>
      )}

      {currentQuestions.map(q => (
        <div key={q.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <p className="font-bold text-sm mb-1" dir="ltr">{q.id}. {q.question}</p>
          <p className="text-xs text-muted mb-3">{q.questionAr}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              let cls = 'border rounded-lg p-3 text-sm block w-full text-right transition-colors cursor-pointer '
              if (showResults) {
                if (oi === q.correct) cls += 'border-green bg-green/10 text-green font-bold'
                else if (answers[q.id] === oi) cls += 'border-red bg-red/10 text-red'
                else cls += 'border-gray-200 text-gray-400'
              } else {
                cls += answers[q.id] === oi ? 'border-green bg-green/5 font-bold' : 'border-gray-200 hover:border-green'
              }
              return <button key={oi} onClick={() => !showResults && setAnswers(p => ({...p, [q.id]: oi}))} className={cls} dir="ltr">{opt}</button>
            })}
          </div>
        </div>
      ))}

      {!showResults && Object.keys(answers).length > 0 && (
        <button onClick={() => setShowResults(true)} className="w-full bg-green text-white py-3 rounded-xl font-bold">✅ تحقّق ({Object.keys(answers).length}/{currentQuestions.length})</button>
      )}
    </div>
  )
}
