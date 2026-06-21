import type { ExamSection } from './a1Data'

export const a2Exams: ExamSection[] = [
  {
    id: 'a2-lesen-1',
    title: 'A2 Lesen Teil 1',
    description: 'اقرأ النص في الصحيفة أو البريد الإلكتروني وأجب عن الأسئلة.',
    type: 'lesen',
    questions: [
      {
        id: 'q1',
        text: 'نص: Sehr geehrter Herr Müller, hiermit bestätigen wir Ihren Termin am 15. Oktober um 10 Uhr. Bitte bringen Sie Ihren Ausweis mit.\nالسؤال: Herr Müller muss seinen Ausweis mitbringen.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Richtig'
      }
    ]
  },
  {
    id: 'a2-hoeren-1',
    title: 'A2 Hören Teil 1',
    description: 'استمع إلى الراديو أو الرسائل الصوتية.',
    type: 'hoeren',
    questions: [
      {
        id: 'q2',
        text: 'Wann kommt der Bus?',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_03d93b3f9b.mp3?filename=bus-announcement.mp3',
        options: ['In 5 Minuten', 'In 10 Minuten', 'In einer Stunde'],
        correctAnswer: 'In 5 Minuten'
      }
    ]
  },
  {
    id: 'a2-schreiben-1',
    title: 'A2 Schreiben - Kurze Nachricht',
    description: 'اكتب رسالة قصيرة أو إيميل.',
    type: 'schreiben',
    questions: [
      {
        id: 'q3',
        text: 'Sie können heute nicht zum Deutschkurs kommen. Schreiben Sie eine E-Mail an Ihre Lehrerin Frau Schmidt. (Grund? Wann wieder da? Entschuldigung?)',
        correctAnswer: 'Sehr geehrte Frau Schmidt, ich kann heute leider nicht kommen, weil ich krank bin. Ich komme morgen wieder. Entschuldigen Sie bitte. Viele Grüße...'
      }
    ]
  }
]
