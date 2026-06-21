export interface ExamQuestion {
  id: string;
  text?: string;
  audioText?: string; // For TTS in Hören
  options?: string[];
  correctAnswer?: number; // index of options
  type: 'multiple-choice' | 'true-false' | 'matching';
}

export interface ExamSection {
  title: string;
  description: string;
  text?: string; // For reading comprehension
  questions: ExamQuestion[];
}

export interface ExamWritingTask {
  title: string;
  prompt: string;
  promptDe: string;
  sampleAnswer: string;
}

export interface ExamSpeakingTask {
  part: number;
  title: string;
  description: string;
  image?: string;
  prompts: string[];
}

export interface Exam {
  id: string;
  title: string;
  type: 'Telc B1' | 'Goethe B1' | 'DTZ';
  durationMinutes: number;
  hoeren: ExamSection[];
  lesen: ExamSection[];
  schreiben: ExamWritingTask;
  sprechen: ExamSpeakingTask[];
}

export const examsData: Exam[] = [
  {
    id: "telc-b1-mock-1",
    title: "امتحان Telc B1 التجريبي الشامل (رقم 1)",
    type: "Telc B1",
    durationMinutes: 150,
    hoeren: [
      {
        title: "Teil 1: Richtig oder Falsch",
        description: "استمع إلى الإعلانات الصوتية وحدد ما إذا كانت الجمل صحيحة أم خاطئة.",
        questions: [
          {
            id: "h1",
            audioText: "Achtung Fahrgäste! Der ICE 405 nach München fährt heute außerplanmäßig von Gleis 7 ab. Wir bitten um Entschuldigung.",
            text: "Der Zug nach München fährt von Gleis 7 ab.",
            options: ["Richtig", "Falsch"],
            correctAnswer: 0,
            type: "true-false"
          },
          {
            id: "h2",
            audioText: "Liebe Kunden, unser Supermarkt schließt heute wegen Umbauarbeiten bereits um 18 Uhr. Bitte beenden Sie Ihren Einkauf.",
            text: "Der Supermarkt ist heute bis 20 Uhr geöffnet.",
            options: ["Richtig", "Falsch"],
            correctAnswer: 1,
            type: "true-false"
          }
        ]
      },
      {
        title: "Teil 2: Multiple Choice",
        description: "استمع إلى المحادثة واختر الإجابة الصحيحة.",
        questions: [
          {
            id: "h3",
            audioText: "Hallo Maria! Hast du am Samstag Zeit? Wir wollen eine kleine Grillparty machen. Jeder bringt etwas mit. Ich mache einen Salat. Bringst du vielleicht Getränke mit?",
            text: "Was soll Maria zur Party mitbringen?",
            options: ["Einen Salat", "Getränke", "Fleisch"],
            correctAnswer: 1,
            type: "multiple-choice"
          }
        ]
      }
    ],
    lesen: [
      {
        title: "Teil 1: Leseverstehen",
        description: "اقرأ النص التالي ثم أجب عن الأسئلة المرفقة.",
        text: "Liebe Nachbarn, ich lade Sie herzlich zu einem Sommerfest in unserem Innenhof ein. Das Fest findet am kommenden Samstag ab 15 Uhr statt. Für Kaffee und Kuchen ist gesorgt. Wer möchte, kann gerne am Abend etwas zum Grillen mitbringen. Bei Regen müssen wir das Fest leider auf nächsten Monat verschieben. Bitte geben Sie mir bis Donnerstag Bescheid, ob Sie kommen können. Liebe Grüße, Ihr Nachbar Müller.",
        questions: [
          {
            id: "l1",
            text: "Wann findet das Sommerfest statt?",
            options: ["Am Freitag", "Am Samstag ab 15 Uhr", "Am Sonntag"],
            correctAnswer: 1,
            type: "multiple-choice"
          },
          {
            id: "l2",
            text: "Was passiert, wenn es regnet?",
            options: ["Wir feiern in der Wohnung.", "Das Fest fällt komplett aus.", "Das Fest wird verschoben."],
            correctAnswer: 2,
            type: "multiple-choice"
          },
          {
            id: "l3",
            text: "Die Nachbarn müssen bis Donnerstag antworten.",
            options: ["Richtig", "Falsch"],
            correctAnswer: 0,
            type: "true-false"
          }
        ]
      }
    ],
    schreiben: {
      title: "Schriftlicher Ausdruck (Brief)",
      prompt: "لديك موعد مع طبيب الأسنان غداً صباحاً، لكنك مريض جداً ولا تستطيع الذهاب. اكتب رسالة إيميل إلى العيادة: اعتذر، اشرح السبب، واطلب موعداً جديداً الأسبوع القادم.",
      promptDe: "Sie haben morgen einen Termin beim Zahnarzt. Sie sind aber krank und können nicht kommen. Schreiben Sie eine E-Mail an die Praxis: Entschuldigen Sie sich, erklären Sie den Grund und bitten Sie um einen neuen Termin in der nächsten Woche.",
      sampleAnswer: "Sehr geehrte Damen und Herren,\n\nich habe morgen um 9 Uhr einen Termin bei Ihnen. Leider bin ich stark erkältet und habe Fieber, deshalb kann ich leider nicht kommen.\n\nEs tut mir sehr leid, dass ich so kurzfristig absagen muss. Könnten Sie mir bitte einen neuen Termin in der nächsten Woche geben? Am besten passt es mir am Dienstagnachmittag oder Mittwochvormittag.\n\nVielen Dank für Ihr Verständnis.\n\nMit freundlichen Grüßen\n[Dein Name]"
    },
    sprechen: [
      {
        part: 1,
        title: "Teil 1: Gemeinsam etwas planen",
        description: "تخطيط لشيء مشترك مع شريكك في الامتحان.",
        prompts: [
          "Ein Freund hat am Wochenende Geburtstag. Planen Sie gemeinsam eine Überraschungsparty.",
          "Was kaufen Sie als Geschenk?",
          "Wer lädt die Gäste ein?",
          "Wo findet die Party statt?"
        ]
      },
      {
        part: 2,
        title: "Teil 2: Ein Thema präsentieren",
        description: "تحدث عن موضوع وقدم رأيك الشخصي وتجربتك.",
        prompts: [
          "Thema: Einkaufen im Internet",
          "Ihre persönlichen Erfahrungen",
          "Vor- und Nachteile",
          "Ihre Meinung dazu"
        ]
      }
    ]
  }
];
