export interface HoerenQuestion {
  id: number
  audioDescription: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface HoerenModel {
  id: number
  title: string
  questions: HoerenQuestion[]
}

export const hoerenModels: HoerenModel[] = [
  {
    id: 1,
    title: 'Modell 1 – Ansagen verstehen',
    questions: [
      {
        id: 1,
        audioDescription: '📢 Ansage am Bahnhof: "Achtung an Gleis 3. Der ICE 597 nach Hamburg hat heute ca. 15 Minuten Verspätung. Wir bitten um Entschuldigung."',
        question: 'Was wird am Bahnhof durchgesagt?',
        options: ['Der Zug fährt heute nicht', 'Der Zug kommt 15 Minuten später', 'Der Zug fährt von einem anderen Gleis', 'Der Zug fährt nach München'],
        correct: 1,
        explanation: 'القطار ICE 597 إلى هامبورغ متأخّر 15 دقيقة.'
      },
      {
        id: 2,
        audioDescription: '📢 Ansage im Supermarkt: "Liebe Kunden, heute haben wir ein Sonderangebot: Alle Bio-Produkte 20% reduziert. Das Angebot gilt nur heute bis Ladenschluss."',
        question: 'Was ist das Sonderangebot?',
        options: ['Alle Produkte sind billiger', 'Bio-Produkte kosten 20% weniger', 'Der Laden schließt früher', 'Es gibt kostenlose Produkte'],
        correct: 1,
        explanation: 'العرض الخاص: منتجات Bio أرخص بـ20% لهذا اليوم فقط.'
      },
      {
        id: 3,
        audioDescription: '📢 Ansage in der Arztpraxis: "Frau Yilmaz, bitte kommen Sie ins Zimmer 2. Dr. Schmidt ist jetzt für Sie bereit."',
        question: 'Was soll Frau Yilmaz tun?',
        options: ['Sie soll nach Hause gehen', 'Sie soll ins Behandlungszimmer 2 kommen', 'Sie soll einen neuen Termin machen', 'Sie soll im Wartezimmer bleiben'],
        correct: 1,
        explanation: 'يُطلب من السيّدة يلماز الذهاب للغرفة 2 لأنّ الطبيب جاهز.'
      },
      {
        id: 4,
        audioDescription: '📢 Telefonansage: "Die Praxis Dr. Weber ist zurzeit geschlossen. Unsere Öffnungszeiten sind Montag bis Freitag, 8 bis 17 Uhr. In dringenden Fällen wenden Sie sich bitte an den ärztlichen Bereitschaftsdienst: 116 117."',
        question: 'Was soll man bei einem Notfall tun?',
        options: ['Zur Praxis gehen', 'Am Montag anrufen', 'Die Nummer 116 117 anrufen', 'Ins Krankenhaus fahren'],
        correct: 2,
        explanation: 'في الحالات العاجلة يجب الاتصال بخدمة الطوارئ الطبية: 116 117.'
      },
    ]
  },
  {
    id: 2,
    title: 'Modell 2 – Gespräche verstehen',
    questions: [
      {
        id: 1,
        audioDescription: '🎙️ Dialog:\nA: "Entschuldigung, wissen Sie, wo der nächste Geldautomat ist?"\nB: "Ja, gehen Sie hier geradeaus, dann die zweite Straße links. Da ist eine Sparkasse."\nA: "Danke schön!"\nB: "Gerne, ist nicht weit, nur 5 Minuten zu Fuß."',
        question: 'Wo ist der Geldautomat?',
        options: ['Direkt hier um die Ecke', 'Geradeaus und dann die zweite links', 'Am Bahnhof', '10 Minuten mit dem Bus'],
        correct: 1,
        explanation: 'الصرّاف الآلي: مشي للأمام ثمّ الشارع الثاني يسار، عند بنك Sparkasse.'
      },
      {
        id: 2,
        audioDescription: '🎙️ Dialog:\nA: "Ich möchte mich für den B1-Kurs anmelden."\nB: "Der nächste Kurs beginnt am 3. März, montags und mittwochs von 9 bis 12 Uhr."\nA: "Was kostet der Kurs?"\nB: "390 Euro für 4 Monate. Bringen Sie bitte Ihren Ausweis und ein Passfoto mit."',
        question: 'Was kostet der Kurs?',
        options: ['290 Euro', '390 Euro', '490 Euro', 'Kostenlos'],
        correct: 1,
        explanation: 'تكلفة الكورس 390 يورو لمدّة 4 أشهر.'
      },
      {
        id: 3,
        audioDescription: '🎙️ Dialog:\nA: "Guten Tag, ich möchte ein Konto eröffnen."\nB: "Gerne. Haben Sie einen Personalausweis oder Pass dabei?"\nA: "Ja, hier bitte."\nB: "Und eine Meldebescheinigung?"\nA: "Die habe ich auch. Hier."\nB: "Sehr gut. Das Girokonto ist kostenlos für die ersten 6 Monate."',
        question: 'Was braucht man, um ein Konto zu eröffnen?',
        options: ['Nur einen Pass', 'Pass und Meldebescheinigung', 'Führerschein und Arbeitsvertrag', 'Nur eine Meldebescheinigung'],
        correct: 1,
        explanation: 'لفتح حساب بنكي يحتاج: جواز سفر + تأكيد تسجيل السكن (Meldebescheinigung).'
      },
    ]
  },
  {
    id: 3,
    title: 'Modell 3 – Radiobeiträge',
    questions: [
      {
        id: 1,
        audioDescription: '📻 Radionachricht: "Das Wetter für morgen: Im Norden Regen und Wind, Temperaturen um 8 Grad. Im Süden bewölkt, aber trocken, bis zu 14 Grad. Am Wochenende wird es überall sonnig und wärmer."',
        question: 'Wie wird das Wetter morgen im Süden?',
        options: ['Regen und Sturm', 'Bewölkt, aber kein Regen', 'Sonnig und warm', 'Schnee'],
        correct: 1,
        explanation: 'الطقس غداً في الجنوب: غائم لكن جاف (بدون مطر)، حتى 14 درجة.'
      },
      {
        id: 2,
        audioDescription: '📻 Verkehrsmeldung: "Auf der A1 zwischen Köln und Düsseldorf gibt es einen Stau von 8 Kilometern wegen eines Unfalls. Autofahrer sollten die Ausfahrt Leverkusen nehmen und über die B8 fahren."',
        question: 'Was wird den Autofahrern empfohlen?',
        options: ['Auf der A1 warten', 'Die Ausfahrt Leverkusen nehmen', 'Umkehren', 'Zu Hause bleiben'],
        correct: 1,
        explanation: 'يُنصح السائقون بأخذ مخرج ليفركوزن والقيادة عبر B8 لتجنّب الازدحام.'
      },
      {
        id: 3,
        audioDescription: '📻 Eventankündigung: "Am kommenden Samstag findet von 10 bis 18 Uhr ein internationales Straßenfest statt. Es gibt Essen aus 20 Ländern, Live-Musik und ein Kinderprogramm. Der Eintritt ist frei!"',
        question: 'Was kostet der Eintritt zum Straßenfest?',
        options: ['5 Euro', '10 Euro', 'Nichts, es ist kostenlos', '20 Euro für Familien'],
        correct: 2,
        explanation: 'الدخول مجاني — "Der Eintritt ist frei".'
      },
    ]
  },
  {
    id: 4,
    title: 'Modell 4 – Telefonanrufe',
    questions: [
      {
        id: 1,
        audioDescription: '📞 Telefonat:\nSekretärin: "Praxis Dr. Fischer, guten Tag."\nPatient: "Guten Tag, ich möchte einen Termin für nächste Woche."\nSekretärin: "Dienstag um 10 Uhr oder Donnerstag um 14:30?"\nPatient: "Donnerstag bitte."\nSekretärin: "In Ordnung. Bitte bringen Sie Ihre Versichertenkarte mit."',
        question: 'Wann ist der Termin?',
        options: ['Montag um 10 Uhr', 'Dienstag um 10 Uhr', 'Donnerstag um 14:30 Uhr', 'Freitag um 14:30 Uhr'],
        correct: 2,
        explanation: 'الموعد يوم الخميس الساعة 14:30.'
      },
      {
        id: 2,
        audioDescription: '📞 Anrufbeantworter: "Hier ist die Sprachschule LernPlus. Wir sind heute leider nicht erreichbar. Unsere Bürozeiten sind Montag bis Donnerstag von 9 bis 15 Uhr. Bitte hinterlassen Sie eine Nachricht nach dem Ton oder schreiben Sie uns eine E-Mail an info@lernplus.de."',
        question: 'Was soll man tun, wenn niemand ans Telefon geht?',
        options: ['Morgen nochmal anrufen', 'Eine Nachricht hinterlassen oder eine E-Mail schreiben', 'Direkt zur Schule gehen', 'Gar nichts — einfach warten'],
        correct: 1,
        explanation: 'إذا لم يردّ أحد: اترك رسالة صوتية أو أرسل إيميل.'
      },
      {
        id: 3,
        audioDescription: '📞 Telefonat:\nVermieter: "Hallo Herr Hassan, hier ist Frau Keller."\nMieter: "Guten Tag, Frau Keller!"\nVermieter: "Ich wollte Ihnen sagen: Am Freitag kommt ein Handwerker wegen der kaputten Heizung. Passt es Ihnen zwischen 10 und 12?"\nMieter: "Ja, das passt. Vielen Dank!"',
        question: 'Warum kommt der Handwerker?',
        options: ['Die Wohnung wird renoviert', 'Die Heizung ist kaputt', 'Die Tür ist kaputt', 'Der Wasserhahn tropft'],
        correct: 1,
        explanation: 'الحرفي سيأتي لإصلاح التدفئة المعطّلة.'
      },
    ]
  },
  {
    id: 5,
    title: 'Modell 5 – Alltagsgespräche',
    questions: [
      {
        id: 1,
        audioDescription: '🎙️ Im Geschäft:\nKunde: "Entschuldigung, haben Sie diese Hose auch in Größe 38?"\nVerkäuferin: "Moment, ich schaue nach... Leider nicht mehr in Blau, aber in Schwarz."\nKunde: "Kann ich die anprobieren?"\nVerkäuferin: "Natürlich, die Umkleidekabine ist dort hinten."',
        question: 'Was ist das Problem?',
        options: ['Die Hose ist zu teuer.', 'Die blaue Hose gibt es nicht mehr in Größe 38.', 'Das Geschäft schließt bald.', 'Die Umkleidekabine ist besetzt.'],
        correct: 1,
        explanation: 'الجينز الأزرق غير متوفّر بالمقاس 38، فقط الأسود.'
      },
      {
        id: 2,
        audioDescription: '🎙️ Beim Arzt:\nArzt: "Was fehlt Ihnen denn?"\nPatient: "Ich habe seit drei Tagen starke Halsschmerzen und etwas Fieber."\nArzt: "Lassen Sie mich mal schauen... Der Hals ist entzündet. Ich verschreibe Ihnen ein Antibiotikum. Nehmen Sie dreimal täglich eine Tablette."\nPatient: "Und muss ich zu Hause bleiben?"\nArzt: "Ja, mindestens drei Tage."',
        question: 'Was verschreibt der Arzt?',
        options: ['Hustensaft', 'Antibiotikum', 'Schmerztabletten', 'Nasenspray'],
        correct: 1,
        explanation: 'الطبيب يصف مضاد حيوي (Antibiotikum) — 3 حبّات يومياً.'
      },
      {
        id: 3,
        audioDescription: '🎙️ An der Kasse:\nKassiererin: "Das macht zusammen 23,47 Euro."\nKunde: "Kann ich mit Karte zahlen?"\nKassiererin: "Ab 10 Euro, ja. Stecken Sie bitte Ihre Karte ein... Und Ihre PIN bitte... Danke, Zahlung erfolgreich!"\nKunde: "Brauche ich den Bon?"\nKassiererin: "Hier, falls Sie etwas umtauschen möchten."',
        question: 'Ab wie viel Euro kann man mit Karte zahlen?',
        options: ['Ab 5 Euro', 'Ab 10 Euro', 'Ab 20 Euro', 'Immer'],
        correct: 1,
        explanation: 'الدفع بالبطاقة ممكن من 10 يورو فأكثر.'
      },
    ]
  },
]
