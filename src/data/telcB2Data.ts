import type { ExamSection } from './a1Data'

export const telcB2Exams: ExamSection[] = [
  {
    id: 'b2-lesen-1',
    title: 'TELC B2 Lesen - Sprachbausteine',
    description: 'نصوص طويلة مع أسئلة استيعاب متقدمة وإكمال الفراغات.',
    type: 'lesen',
    questions: [
      {
        id: 'q1',
        text: 'اختر الكلمة المناسبة للفراغ: Sehr geehrte Damen und Herren, ___ beziehe ich mich auf Ihr Angebot.',
        options: ['hiermit', 'damit', 'womit'],
        correctAnswer: 'hiermit'
      }
    ]
  },
  {
    id: 'b2-hoeren-1',
    title: 'TELC B2 Hören',
    description: 'الاستماع لمقابلات إذاعية ونقاشات.',
    type: 'hoeren',
    questions: [
      {
        id: 'q1',
        text: 'ما هو رأي الخبير في التغير المناخي؟',
        options: ['إنه مبالغ فيه', 'يتطلب تدخلاً عاجلاً', 'مشكلة ثانوية'],
        correctAnswer: 'يتطلب تدخلاً عاجلاً'
      }
    ]
  },
  {
    id: 'b2-schreiben-1',
    title: 'TELC B2 Schreiben (Bitte um Informationen)',
    description: 'كتابة رسالة رسمية لطلب معلومات أو شكوى.',
    type: 'schreiben',
    questions: [
      {
        id: 'q1',
        text: 'اكتب رسالة إلى شركة سياحة تطلب فيها معلومات إضافية عن رحلة لغوية.',
        correctAnswer: ''
      }
    ]
  },
  {
    id: 'b2-sprechen-1',
    title: 'TELC B2 Sprechen',
    description: 'تقديم عرض تقديمي قصير ونقاش مع شريك.',
    type: 'sprechen',
    questions: [
      {
        id: 'q1',
        text: 'قدم عرضاً قصيراً حول موضوع "العمل من المنزل: المزايا والعيوب".',
        correctAnswer: ''
      }
    ]
  }
]
