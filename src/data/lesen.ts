export interface LesenQuestion {
  id: number
  text: string
  question: string
  options: string[]
  correct: number
  explanation?: string
}

export interface LesenModel {
  id: number
  title: string
  teil: number
  description: string
  questions: LesenQuestion[]
}

export const lesenModels: LesenModel[] = [
  {
    id: 1,
    title: 'Modell 1 – Teil 1: Globalverstehen',
    teil: 1,
    description: 'اقرأ النصوص القصيرة وحدّد المعنى العام.',
    questions: [
      {
        id: 1,
        text: 'Liebe Mitbewohner, am Samstag um 15 Uhr kommt der Hausmeister, um die Heizung zu reparieren. Bitte lassen Sie die Haustür offen. Danke, Ihr Vermieter K. Schulze',
        question: 'Was sollen die Mieter machen?',
        options: [
          'Die Heizung selbst reparieren',
          'Die Haustür offen lassen',
          'Am Samstag nicht zu Hause sein',
          'Den Vermieter anrufen'
        ],
        correct: 1,
        explanation: 'النص يطلب من السكّان ترك باب المبنى مفتوحاً لأنّ عامل الصيانة سيأتي.'
      },
      {
        id: 2,
        text: 'Sehr geehrte Eltern, am nächsten Freitag findet ein Elternabend statt. Thema: die Klassenfahrt nach München. Bitte kommen Sie um 19 Uhr in Raum 204. Mit freundlichen Grüßen, Frau Weber',
        question: 'Warum schreibt Frau Weber?',
        options: [
          'Sie lädt die Eltern zu einem Treffen ein',
          'Sie informiert über die Noten der Kinder',
          'Sie sucht Eltern für die Klassenfahrt',
          'Sie will die Klassenfahrt absagen'
        ],
        correct: 0,
        explanation: 'السيدة فيبر تدعو الأهالي لاجتماع حول الرحلة المدرسية إلى ميونيخ.'
      },
      {
        id: 3,
        text: 'Achtung! Ab Montag ist die Parkgarage wegen Renovierung für 2 Wochen geschlossen. Bitte benutzen Sie den Parkplatz hinter dem Gebäude.',
        question: 'Was wird mitgeteilt?',
        options: [
          'Die Parkgarage wird abgerissen',
          'Man soll woanders parken',
          'Das Gebäude wird renoviert',
          'Der Parkplatz ist kostenlos'
        ],
        correct: 1,
        explanation: 'الإعلان يُخبر أنّ المرآب مغلق بسبب التجديد ويجب استخدام الموقف خلف المبنى.'
      },
      {
        id: 4,
        text: 'Hallo zusammen! Ich verkaufe mein Fahrrad. Es ist 2 Jahre alt und in gutem Zustand. Preis: 120 Euro. Bei Interesse bitte melden unter 0176-3345678. Gruß, Tarek',
        question: 'Was möchte Tarek?',
        options: [
          'Ein neues Fahrrad kaufen',
          'Sein Fahrrad reparieren lassen',
          'Sein Fahrrad verkaufen',
          'Ein Fahrrad leihen'
        ],
        correct: 2,
        explanation: 'طارق يريد بيع دراجته الهوائية التي عمرها سنتان بسعر 120 يورو.'
      },
      {
        id: 5,
        text: 'Liebe Kursteilnehmer, morgen fällt der Deutschkurs aus, weil Frau Müller krank ist. Der nächste Unterricht ist am Donnerstag. Viele Grüße, VHS Wuppertal',
        question: 'Was bedeutet diese Nachricht?',
        options: [
          'Der Kurs ist für immer beendet',
          'Morgen gibt es keinen Unterricht',
          'Frau Müller sucht einen Vertreter',
          'Der Kurs wird nach Donnerstag verschoben'
        ],
        correct: 1,
        explanation: 'الرسالة تُخبر أنّ درس الغد ملغى بسبب مرض المعلّمة.'
      },
    ]
  },
  {
    id: 2,
    title: 'Modell 1 – Teil 2: Detailverstehen',
    teil: 2,
    description: 'اقرأ النص بتمعّن وأجب عن الأسئلة التفصيلية.',
    questions: [
      {
        id: 1,
        text: `Arbeiten im Homeoffice

Seit der Corona-Pandemie arbeiten viele Menschen von zu Hause aus. Eine neue Studie zeigt: 65% der Arbeitnehmer möchten auch nach der Pandemie mindestens zwei Tage pro Woche im Homeoffice arbeiten. Die Vorteile sind klar: keine Fahrtzeit, flexible Zeiteinteilung und mehr Zeit für die Familie. Allerdings gibt es auch Nachteile. Viele Beschäftigte berichten von Einsamkeit und Schwierigkeiten, Arbeit und Freizeit zu trennen. Experten empfehlen daher eine Mischung aus Büro- und Heimarbeit — das sogenannte "hybride Arbeiten".`,
        question: 'Was wünschen sich die meisten Arbeitnehmer?',
        options: [
          'Nur noch im Büro arbeiten',
          'Mindestens zwei Tage Homeoffice pro Woche',
          'Komplett von zu Hause arbeiten',
          'Jeden Tag ins Büro gehen'
        ],
        correct: 1,
        explanation: '65% من الموظّفين يريدون العمل من المنزل يومين على الأقل أسبوعياً.'
      },
      {
        id: 2,
        text: `Arbeiten im Homeoffice

Seit der Corona-Pandemie arbeiten viele Menschen von zu Hause aus. Eine neue Studie zeigt: 65% der Arbeitnehmer möchten auch nach der Pandemie mindestens zwei Tage pro Woche im Homeoffice arbeiten. Die Vorteile sind klar: keine Fahrtzeit, flexible Zeiteinteilung und mehr Zeit für die Familie. Allerdings gibt es auch Nachteile. Viele Beschäftigte berichten von Einsamkeit und Schwierigkeiten, Arbeit und Freizeit zu trennen. Experten empfehlen daher eine Mischung aus Büro- und Heimarbeit — das sogenannte "hybride Arbeiten".`,
        question: 'Was ist ein Nachteil vom Homeoffice?',
        options: [
          'Man verdient weniger Geld',
          'Man muss mehr arbeiten',
          'Es ist schwer, Arbeit und Freizeit zu trennen',
          'Man braucht teure Technik'
        ],
        correct: 2,
        explanation: 'أحد عيوب العمل من المنزل هو صعوبة الفصل بين العمل ووقت الفراغ.'
      },
    ]
  },
  {
    id: 3,
    title: 'Modell 2 – Teil 1: Globalverstehen',
    teil: 1,
    description: 'نموذج ثانٍ — اقرأ الإعلانات وحدّد المعنى الأساسي.',
    questions: [
      {
        id: 1,
        text: 'Wichtige Info für alle Mieter: Die Mülltonnen müssen ab sofort bis spätestens 7:00 Uhr morgens an die Straße gestellt werden. Die Abholung findet jetzt früher statt.',
        question: 'Was müssen die Mieter beachten?',
        options: [
          'Sie dürfen keinen Müll mehr produzieren',
          'Die Mülltonnen müssen früher rausgestellt werden',
          'Es gibt neue Mülltonnen',
          'Die Müllabfuhr kommt nicht mehr'
        ],
        correct: 1,
        explanation: 'يجب وضع حاويات القمامة أمام الشارع قبل الساعة 7 صباحاً لأنّ الجمع أصبح مبكراً.'
      },
      {
        id: 2,
        text: 'Liebe Nachbarn, wir feiern am Samstag unseren Einzug. Ab 18 Uhr sind Sie herzlich eingeladen! Falls die Musik zu laut wird, klingeln Sie bitte. Schöne Grüße aus dem 3. Stock!',
        question: 'Was passiert am Samstag?',
        options: [
          'Die Nachbarn ziehen aus',
          'Es gibt eine Einzugsfeier',
          'Die Polizei kommt wegen Lärm',
          'Der 3. Stock wird renoviert'
        ],
        correct: 1,
        explanation: 'الجيران يحتفلون بالانتقال لشقّتهم الجديدة ويدعون الجيران.'
      },
      {
        id: 3,
        text: 'Öffnungszeiten der Stadtbibliothek: Mo-Fr 9-18 Uhr, Sa 10-14 Uhr. In den Sommerferien: Mo-Fr 10-16 Uhr, Sa geschlossen.',
        question: 'Wann ist die Bibliothek in den Sommerferien geöffnet?',
        options: [
          'Montag bis Freitag, 10 bis 16 Uhr',
          'Montag bis Samstag, 9 bis 18 Uhr',
          'Nur am Wochenende',
          'Gar nicht'
        ],
        correct: 0,
        explanation: 'في العطلة الصيفية تفتح المكتبة من الاثنين للجمعة، من 10 إلى 16.'
      },
    ]
  },
]
