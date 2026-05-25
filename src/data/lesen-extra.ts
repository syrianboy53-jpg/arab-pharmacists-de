import type { LesenModel } from './lesen'

export const lesenModelsExtra: LesenModel[] = [
  {
    id: 4,
    title: 'Modell 3 – Teil 1: Kurztexte',
    teil: 1,
    description: 'اقرأ الإعلانات والرسائل القصيرة وأجب.',
    questions: [
      {
        id: 1,
        text: 'Achtung an alle Hausbewohner: Am Dienstag zwischen 8 und 12 Uhr wird das Wasser abgestellt. Bitte füllen Sie vorher Wasserflaschen. Ihre Hausverwaltung',
        question: 'Was sollen die Bewohner tun?',
        options: ['Kein Wasser mehr trinken', 'Vorher Wasser aufbewahren', 'Am Dienstag nicht zu Hause sein', 'Die Hausverwaltung anrufen'],
        correct: 1,
        explanation: 'يجب على السكان تعبئة زجاجات مياه قبل إيقاف المياه يوم الثلاثاء.'
      },
      {
        id: 2,
        text: 'Liebe Eltern, bitte geben Sie Ihrem Kind am Freitag Sportkleidung mit. Wir machen einen Ausflug zum Sportplatz. Bei Regen entfällt der Ausflug.',
        question: 'Was ist richtig?',
        options: ['Der Ausflug ist bei jedem Wetter.', 'Die Kinder brauchen Sportkleidung.', 'Der Ausflug ist am Montag.', 'Die Eltern kommen mit.'],
        correct: 1,
        explanation: 'يجب أن يُحضر الأطفال ملابس رياضية يوم الجمعة للرحلة.'
      },
      {
        id: 3,
        text: 'Sonderangebot! Nur diese Woche: Alle Winterjacken 50% reduziert. Gültig in allen Filialen. Nicht mit anderen Rabatten kombinierbar.',
        question: 'Was stimmt?',
        options: ['Man bekommt 50 Euro zurück.', 'Die Jacken kosten die Hälfte.', 'Das Angebot gilt einen Monat.', 'Man kann andere Rabatte dazu nehmen.'],
        correct: 1,
        explanation: 'جميع جاكيتات الشتاء بنصف السعر هذا الأسبوع فقط.'
      },
      {
        id: 4,
        text: 'Sehr geehrte Fahrgäste, wegen Bauarbeiten fährt die S-Bahn zwischen Hauptbahnhof und Flughafen nicht. Bitte nutzen Sie den Ersatzbus Linie E3.',
        question: 'Was wird mitgeteilt?',
        options: ['Die S-Bahn fährt schneller.', 'Man muss den Bus nehmen statt der S-Bahn.', 'Der Flughafen ist geschlossen.', 'Die Bauarbeiten sind fertig.'],
        correct: 1,
        explanation: 'بسبب أعمال البناء يجب استخدام الباص البديل E3 بدلاً من القطار.'
      },
      {
        id: 5,
        text: 'Gesucht: Nachhilfelehrerin für Mathe, Klasse 8. 2x pro Woche, je 1 Stunde. Bezahlung: 15 Euro/Stunde. Bitte melden bei Frau Kamal: 0163-2445566',
        question: 'Was sucht Frau Kamal?',
        options: ['Eine Mathelehrerin für Nachhilfe', 'Eine Schülerin für ihre Klasse', 'Einen Job als Lehrerin', 'Eine Wohnung in der Nähe der Schule'],
        correct: 0,
        explanation: 'السيّدة كمال تبحث عن معلّمة رياضيات خصوصية مرّتين أسبوعياً.'
      },
    ]
  },
  {
    id: 5,
    title: 'Modell 4 – Teil 2: Zeitungsartikel',
    teil: 2,
    description: 'اقرأ مقالاً وأجب عن أسئلة تفصيلية.',
    questions: [
      {
        id: 1,
        text: `Ehrenamt in Deutschland

In Deutschland engagieren sich über 30 Millionen Menschen ehrenamtlich — also freiwillig und ohne Bezahlung. Sie arbeiten zum Beispiel in Sportvereinen, bei der Feuerwehr, in Flüchtlingshilfen oder in Nachbarschaftsprojekten.

Warum machen sie das? Die meisten sagen: "Es macht Spaß, anderen zu helfen." Außerdem lernt man neue Leute kennen und fühlt sich als Teil der Gemeinschaft.

Besonders bei der Integration von Geflüchteten spielt das Ehrenamt eine wichtige Rolle. Viele Freiwillige helfen beim Deutschlernen, bei Behördengängen oder beim Finden einer Wohnung.`,
        question: 'Wie viele Menschen arbeiten in Deutschland ehrenamtlich?',
        options: ['3 Millionen', '13 Millionen', '30 Millionen', '300 Millionen'],
        correct: 2,
        explanation: 'أكثر من 30 مليون شخص يعملون تطوّعياً في ألمانيا.'
      },
      {
        id: 2,
        text: `Ehrenamt in Deutschland

In Deutschland engagieren sich über 30 Millionen Menschen ehrenamtlich — also freiwillig und ohne Bezahlung. Sie arbeiten zum Beispiel in Sportvereinen, bei der Feuerwehr, in Flüchtlingshilfen oder in Nachbarschaftsprojekten.

Warum machen sie das? Die meisten sagen: "Es macht Spaß, anderen zu helfen." Außerdem lernt man neue Leute kennen und fühlt sich als Teil der Gemeinschaft.

Besonders bei der Integration von Geflüchteten spielt das Ehrenamt eine wichtige Rolle. Viele Freiwillige helfen beim Deutschlernen, bei Behördengängen oder beim Finden einer Wohnung.`,
        question: 'Warum engagieren sich die meisten ehrenamtlich?',
        options: ['Weil sie Geld verdienen wollen', 'Weil es Spaß macht und man Leute kennenlernt', 'Weil der Staat es verlangt', 'Weil sie arbeitslos sind'],
        correct: 1,
        explanation: 'السبب الرئيسي هو المتعة ومعرفة أشخاص جدد والشعور بالانتماء.'
      },
      {
        id: 3,
        text: `Ehrenamt in Deutschland

In Deutschland engagieren sich über 30 Millionen Menschen ehrenamtlich — also freiwillig und ohne Bezahlung. Sie arbeiten zum Beispiel in Sportvereinen, bei der Feuerwehr, in Flüchtlingshilfen oder in Nachbarschaftsprojekten.

Warum machen sie das? Die meisten sagen: "Es macht Spaß, anderen zu helfen." Außerdem lernt man neue Leute kennen und fühlt sich als Teil der Gemeinschaft.

Besonders bei der Integration von Geflüchteten spielt das Ehrenamt eine wichtige Rolle. Viele Freiwillige helfen beim Deutschlernen, bei Behördengängen oder beim Finden einer Wohnung.`,
        question: 'Wie helfen Ehrenamtliche bei der Integration?',
        options: ['Sie geben Geflüchteten Geld.', 'Sie helfen beim Deutschlernen und bei Behördengängen.', 'Sie bringen sie zum Flughafen.', 'Sie finden ihnen Jobs.'],
        correct: 1,
        explanation: 'المتطوّعون يساعدون اللاجئين في تعلّم الألمانية ومراجعة الدوائر وإيجاد سكن.'
      },
    ]
  },
  {
    id: 6,
    title: 'Modell 5 – Teil 1: Alltagstexte',
    teil: 1,
    description: 'نصوص من الحياة اليومية — إعلانات، بريد إلكتروني، لافتات.',
    questions: [
      {
        id: 1,
        text: 'Lieber Herr Al-Ahmad, Ihr bestellter Laptop ist in unserer Filiale angekommen. Sie können ihn ab morgen (Dienstag) abholen. Bitte bringen Sie Ihren Personalausweis mit. Mit freundlichen Grüßen, Media Markt Wuppertal',
        question: 'Was soll Herr Al-Ahmad tun?',
        options: ['Den Laptop online bestellen', 'Den Laptop im Geschäft abholen', 'Den Laptop zurückschicken', 'Einen neuen Personalausweis machen'],
        correct: 1,
        explanation: 'يجب على السيد الأحمد استلام اللابتوب من الفرع مع إحضار بطاقته الشخصية.'
      },
      {
        id: 2,
        text: 'Sprechstunde von Dr. Müller: Mo-Fr 8-12 Uhr und Mo+Do 15-18 Uhr. Mittwochnachmittag geschlossen. Termine nur nach Vereinbarung.',
        question: 'Wann kann man am Mittwoch zum Arzt?',
        options: ['Nur vormittags (8-12 Uhr)', 'Den ganzen Tag', 'Nur nachmittags', 'Mittwoch ist ganz geschlossen'],
        correct: 0,
        explanation: 'يوم الأربعاء فقط صباحاً من 8 إلى 12، لأنّ فترة بعد الظهر مغلقة.'
      },
      {
        id: 3,
        text: 'Deutschkurs A2/B1 — Start: 5. September, Mo-Fr 9:00-12:15 Uhr, Dauer: 6 Monate, Kosten: 0€ (vom BAMF gefördert). Anmeldung: VHS Wuppertal, Raum 201.',
        question: 'Was kostet der Deutschkurs?',
        options: ['200 Euro', '600 Euro', 'Nichts (kostenlos)', '50 Euro pro Monat'],
        correct: 2,
        explanation: 'الكورس مجاني لأنّه ممول من الـBAMF (الهجرة واللاجئين).'
      },
      {
        id: 4,
        text: 'ACHTUNG: Fahrradfahren auf dem Gehweg verboten! Benutzen Sie den Radweg (rote Markierung). Bußgeld: 25 Euro.',
        question: 'Was ist verboten?',
        options: ['Radfahren auf der Straße', 'Radfahren auf dem Gehweg', 'Radfahren auf dem Radweg', 'Zu Fuß gehen'],
        correct: 1,
        explanation: 'ركوب الدراجة على الرصيف ممنوع، يجب استخدام مسار الدراجات.'
      },
    ]
  },
  {
    id: 7,
    title: 'Modell 6 – Richtig/Falsch',
    teil: 3,
    description: 'Teil 3: اقرأ النصوص وحدّد إذا كانت العبارات صحيحة أو خاطئة.',
    questions: [
      {
        id: 1,
        text: `Stellenanzeige: Pizzeria "Bella Italia" sucht Aushilfe für Freitag und Samstag, 17-22 Uhr. Aufgaben: Bestellungen aufnehmen, Getränke servieren. Erfahrung nicht nötig. Bewerbung per E-Mail an: info@bellaitalia-wtal.de`,
        question: 'Man muss Erfahrung haben, um sich zu bewerben.',
        options: ['Richtig', 'Falsch'],
        correct: 1,
        explanation: 'النص يقول "Erfahrung nicht nötig" أي الخبرة غير مطلوبة.'
      },
      {
        id: 2,
        text: `Stellenanzeige: Pizzeria "Bella Italia" sucht Aushilfe für Freitag und Samstag, 17-22 Uhr. Aufgaben: Bestellungen aufnehmen, Getränke servieren. Erfahrung nicht nötig. Bewerbung per E-Mail an: info@bellaitalia-wtal.de`,
        question: 'Die Arbeit ist nur am Wochenende.',
        options: ['Richtig', 'Falsch'],
        correct: 0,
        explanation: 'العمل يومي الجمعة والسبت فقط، أي نهاية الأسبوع.'
      },
      {
        id: 3,
        text: `Der Stadtpark ist täglich von 6 bis 22 Uhr geöffnet. Hunde müssen an der Leine geführt werden. Grillen ist nur auf den markierten Grillplätzen erlaubt. Das Schwimmen im Teich ist verboten.`,
        question: 'Man darf überall im Park grillen.',
        options: ['Richtig', 'Falsch'],
        correct: 1,
        explanation: 'الشوي مسموح فقط في الأماكن المخصّصة، ليس في أيّ مكان.'
      },
      {
        id: 4,
        text: `Der Stadtpark ist täglich von 6 bis 22 Uhr geöffnet. Hunde müssen an der Leine geführt werden. Grillen ist nur auf den markierten Grillplätzen erlaubt. Das Schwimmen im Teich ist verboten.`,
        question: 'Hunde dürfen frei im Park laufen.',
        options: ['Richtig', 'Falsch'],
        correct: 1,
        explanation: 'الكلاب يجب أن تكون مربوطة بالمقود (an der Leine).'
      },
    ]
  },
  {
    id: 8,
    title: 'Modell 7 – Teil 1: Alltagskommunikation',
    teil: 1,
    description: 'إعلانات ورسائل من الحياة اليومية في ألمانيا.',
    questions: [
      {
        id: 1,
        text: 'Hallo Aya, ich bin am Freitag in Wuppertal. Hast du Zeit für einen Kaffee? Ich bin ab 14 Uhr frei. Wir können uns im Café am Bahnhof treffen. Sag mir Bescheid! LG, Mona',
        question: 'Was möchte Mona?',
        options: ['Sie sucht eine Wohnung in Wuppertal.', 'Sie möchte sich mit Aya treffen.', 'Sie lädt Aya nach Hause ein.', 'Sie hat am Freitag keine Zeit.'],
        correct: 1,
        explanation: 'مونا تريد لقاء آية يوم الجمعة في مقهى عند محطة القطار.'
      },
      {
        id: 2,
        text: 'Sehr geehrter Herr Mansour, wir bestätigen Ihren Termin am 15. März um 9:30 Uhr. Bitte bringen Sie folgende Unterlagen mit: Pass, Meldebescheinigung, Arbeitsvertrag. Ihr Ausländeramt Wuppertal',
        question: 'Was muss Herr Mansour mitbringen?',
        options: ['Nur seinen Pass', 'Pass, Meldebescheinigung und Arbeitsvertrag', 'Geld für die Gebühr', 'Ein Foto und einen Führerschein'],
        correct: 1,
        explanation: 'يجب إحضار: جواز السفر، تأكيد تسجيل السكن، وعقد العمل.'
      },
      {
        id: 3,
        text: 'Information: Die Stadtbücherei bietet jeden Donnerstag von 16-17 Uhr kostenloses Vorlesen für Kinder (3-6 Jahre). Anmeldung nicht erforderlich.',
        question: 'Muss man sich anmelden?',
        options: ['Ja, per E-Mail', 'Ja, per Telefon', 'Nein, keine Anmeldung nötig', 'Ja, im Internet'],
        correct: 2,
        explanation: 'لا يحتاج تسجيل مسبق — يمكن الحضور مباشرة.'
      },
    ]
  },
]
