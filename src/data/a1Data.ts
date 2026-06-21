export interface ExamSection {
  id: string
  title: string
  description: string
  type: 'lesen' | 'hoeren' | 'schreiben' | 'sprechen'
  questions: Array<{
    id: string
    text: string
    options?: string[]
    correctAnswer?: string | number
    audioUrl?: string
  }>
}

export const a1Exams: ExamSection[] = [
  {
    id: 'a1-lesen-1',
    title: 'A1 Lesen Teil 1',
    description: 'اقرأ النصائح أو الرسائل القصيرة وأجب بصح أو خطأ (Richtig oder Falsch).',
    type: 'lesen',
    questions: [
      {
        id: 'q1',
        text: 'نص: Hallo Anna, ich komme heute später. Mein Zug hat Verspätung. Bis später, Maria.\nالسؤال: Maria ist pünktlich.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch'
      },
      {
        id: 'q2',
        text: 'نص: Supermarkt Angebot! Äpfel heute nur 1 Euro pro Kilo.\nالسؤال: Die Äpfel sind teuer.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch'
      }
    ]
  },
  {
    id: 'a1-hoeren-1',
    title: 'A1 Hören Teil 1',
    description: 'استمع إلى الإعلانات القصيرة واختر الإجابة الصحيحة.',
    type: 'hoeren',
    questions: [
      {
        id: 'q3',
        text: 'Wo fährt der Zug nach München ab?',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_03d93b3f9b.mp3?filename=train-announcement.mp3',
        options: ['Gleis 10', 'Gleis 2', 'Gleis 5'],
        correctAnswer: 'Gleis 10'
      }
    ]
  },
  {
    id: 'a1-schreiben-1',
    title: 'A1 Schreiben - Formular',
    description: 'املأ الاستمارة بالمعلومات الصحيحة.',
    type: 'schreiben',
    questions: [
      {
        id: 'q4',
        text: 'Du bist Ali, wohnst in der Berliner Straße 10, 10115 Berlin. Du möchtest einen Deutschkurs besuchen. Fülle das Formular aus: Vorname, Familienname, Adresse, Postleitzahl.',
        correctAnswer: 'Vorname: Ali, Familienname: ..., Adresse: Berliner Straße 10, Postleitzahl: 10115'
      }
    ]
  },
  {
    id: 'a1-sprechen-1',
    title: 'A1 Sprechen - Sich vorstellen',
    description: 'عرّف عن نفسك بذكر النقاط الأساسية: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby.',
    type: 'sprechen',
    questions: [
      {
        id: 'q5',
        text: 'Stellen Sie sich bitte vor (Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby).'
      }
    ]
  }
]
