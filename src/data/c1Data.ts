import type { ExamSection } from './a1Data'

export const c1Exams: ExamSection[] = [
  {
    id: 'c1-lesen-1',
    title: 'C1 Lesen - Wissenschaftlicher Text',
    description: 'اقرأ النص الأكاديمي المتقدم وأجب عن الأسئلة بدقة.',
    type: 'lesen',
    questions: [
      {
        id: 'q1',
        text: 'نص: Die kognitive Entwicklung im frühen Kindesalter wird maßgeblich durch sprachliche Reize aus dem sozialen Umfeld determiniert...\nالسؤال: Was beeinflusst die kognitive Entwicklung?',
        options: ['Soziale Reize', 'Ernährung', 'Genetik', 'Technologie'],
        correctAnswer: 'Soziale Reize'
      }
    ]
  },
  {
    id: 'c1-schreiben-1',
    title: 'C1 Schreiben - Grafikbeschreibung',
    description: 'وصف الرسوم البيانية الإحصائية (Grafikbeschreibung) مع إبداء الرأي.',
    type: 'schreiben',
    questions: [
      {
        id: 'q2',
        text: 'Schreiben Sie einen zusammenhängenden Text zur vorliegenden Grafik "Erneuerbare Energien in Deutschland". Beschreiben Sie die Hauptaussagen und nehmen Sie Stellung.',
        correctAnswer: 'Die vorliegende Grafik illustriert die Entwicklung... Es lässt sich feststellen, dass... Meiner Auffassung nach...'
      }
    ]
  }
]
