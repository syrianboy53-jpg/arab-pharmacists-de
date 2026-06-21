import { ExamSection } from './a1Data'

export const dtzExams: ExamSection[] = [
  {
    id: 'dtz-lesen-1',
    title: 'DTZ Lesen Teil 1',
    description: 'اقرأ النصوص القصيرة (إعلانات، رسائل) الخاصة بالاندماج في ألمانيا وأجب.',
    type: 'lesen',
    questions: [
      {
        id: 'q1',
        text: 'نص: Ausländerbehörde: Bitte bringen Sie Ihren Pass und ein biometrisches Passbild mit.\nالسؤال: Was müssen Sie zur Behörde mitbringen?',
        options: ['Geld', 'Pass und Foto', 'Lebenslauf'],
        correctAnswer: 'Pass und Foto'
      }
    ]
  },
  {
    id: 'dtz-schreiben-1',
    title: 'DTZ Schreiben - Beschwerde / Entschuldigung',
    description: 'كتابة رسالة رسمية (الاعتذار عن المدرسة، شكوى للشركة، إلخ).',
    type: 'schreiben',
    questions: [
      {
        id: 'q2',
        text: 'Ihr Kind ist krank und kann nicht in die Schule gehen. Schreiben Sie eine Entschuldigung an die Klassenlehrerin.',
        correctAnswer: 'Sehr geehrte Frau Müller, mein Sohn ist heute leider krank. Er hat Fieber und kann nicht zur Schule kommen. Morgen geht er zum Arzt...'
      }
    ]
  }
]
