import type { ExamSection } from './a1Data'

export const goetheB1Exams: ExamSection[] = [
  {
    id: 'b1-lesen-1',
    title: 'Goethe B1 Lesen - Teil 1',
    description: 'قراءة نصوص قصيرة وفهم المعنى العام والتفاصيل.',
    type: 'lesen',
    questions: [
      {
        id: 'q1',
        text: 'اقرأ الإعلان التالي وأجب عما إذا كانت العبارة صحيحة أم خاطئة: Liebe Kursteilnehmer, der Deutschkurs fällt heute wegen Krankheit der Lehrerin aus.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Richtig'
      }
    ]
  },
  {
    id: 'b1-hoeren-1',
    title: 'Goethe B1 Hören - Teil 1',
    description: 'الاستماع لإعلانات قصيرة والمحادثات.',
    type: 'hoeren',
    questions: [
      {
        id: 'q1',
        text: 'ماذا يقول الإعلان في محطة القطار؟',
        options: ['القطار متأخر 10 دقائق', 'القطار ألغي', 'القطار سيغادر من رصيف آخر'],
        correctAnswer: 'القطار متأخر 10 دقائق'
      }
    ]
  },
  {
    id: 'b1-schreiben-1',
    title: 'Goethe B1 Schreiben',
    description: 'كتابة رسالة شخصية لصديق عن موضوع معين.',
    type: 'schreiben',
    questions: [
      {
        id: 'q1',
        text: 'اكتب رسالة لصديقك تخبره فيها عن حفل عيد ميلادك (متى، أين، من دعوت).',
        correctAnswer: ''
      }
    ]
  },
  {
    id: 'b1-sprechen-1',
    title: 'Goethe B1 Sprechen',
    description: 'التعريف بالنفس والتحدث عن موضوع مع شريك.',
    type: 'sprechen',
    questions: [
      {
        id: 'q1',
        text: 'خطط مع شريكك لرحلة في عطلة نهاية الأسبوع.',
        correctAnswer: ''
      }
    ]
  }
]
