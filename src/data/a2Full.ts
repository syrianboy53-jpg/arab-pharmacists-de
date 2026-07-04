// ============================================================
// A2 Full Model Tests — Goethe A2 / telc A2
// Target audience: Arabic speakers living in Germany
// ============================================================

export const a2Models = [
  // ============================================================
  // MODEL 1: العمل والتقديم — Arbeit & Bewerbung
  // ============================================================
  {
    id: 'goethe-a2-1',
    titleAr: 'نموذج 1 — العمل والتقديم',
    titleDe: 'Modelltest 1 — Arbeit & Bewerbung',
    level: 'A2',
    durationMin: 80,

    // --------------------------------------------------------
    // LESEN (Reading) — 4 passages, 12 questions
    // --------------------------------------------------------
    readingPassages: [
      // ---- Passage 1: Stellenanzeige (Job Advertisement) ----
      {
        id: 'lese-1-1',
        titleDe: 'Stellenanzeige: Verkäufer/in gesucht',
        textDe:
          'Bäckerei Sonnenschein sucht ab sofort eine/n Verkäufer/in in Teilzeit (20 Stunden pro Woche). ' +
          'Sie arbeiten montags bis freitags von 6:00 bis 10:00 Uhr. ' +
          'Sie sollten freundlich sein und gerne mit Menschen arbeiten. ' +
          'Erfahrung im Verkauf ist gut, aber nicht notwendig. Wir bieten eine gute Bezahlung (13 Euro pro Stunde) und nette Kollegen. ' +
          'Bitte schicken Sie Ihre Bewerbung mit Lebenslauf per E-Mail an: jobs@baeckerei-sonnenschein.de. ' +
          'Ansprechpartnerin: Frau Müller. Telefon: 030 / 123 456 78.',
        questions: [
          {
            id: 'q1-1-1',
            promptDe: 'Wie viele Stunden pro Woche soll man arbeiten?',
            options: [
              { id: 'a', de: '10 Stunden' },
              { id: 'b', de: '20 Stunden' },
              { id: 'c', de: '30 Stunden' },
              { id: 'd', de: '40 Stunden' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي 20 ساعة في الأسبوع. النص يقول بوضوح "Teilzeit (20 Stunden pro Woche)" أي دوام جزئي 20 ساعة أسبوعياً.',
          },
          {
            id: 'q1-1-2',
            promptDe: 'Wann beginnt die Arbeit?',
            options: [
              { id: 'a', de: 'Um 5:00 Uhr' },
              { id: 'b', de: 'Um 6:00 Uhr' },
              { id: 'c', de: 'Um 7:00 Uhr' },
              { id: 'd', de: 'Um 8:00 Uhr' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي الساعة 6:00 صباحاً. النص يذكر "von 6:00 bis 10:00 Uhr" أي من الساعة السادسة حتى العاشرة.',
          },
          {
            id: 'q1-1-3',
            promptDe: 'Braucht man Erfahrung im Verkauf?',
            options: [
              { id: 'a', de: 'Ja, man muss viel Erfahrung haben.' },
              { id: 'b', de: 'Erfahrung ist gut, aber nicht notwendig.' },
              { id: 'c', de: 'Nein, Erfahrung ist verboten.' },
              { id: 'd', de: 'Man braucht mindestens 3 Jahre Erfahrung.' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي أن الخبرة مفيدة لكنها ليست ضرورية. النص يقول "Erfahrung im Verkauf ist gut, aber nicht notwendig" وهذا يعني أن الخبرة في البيع جيدة ولكنها غير مطلوبة.',
          },
        ],
      },

      // ---- Passage 2: Email from Jobcenter ----
      {
        id: 'lese-1-2',
        titleDe: 'E-Mail vom Jobcenter',
        textDe:
          'Sehr geehrter Herr Ahmad,\n\n' +
          'wir möchten Sie zu einem Beratungsgespräch einladen. Der Termin ist am Dienstag, den 15. März, um 9:30 Uhr. ' +
          'Bitte kommen Sie zum Jobcenter Berlin-Mitte, Zimmer 214, zweiter Stock. ' +
          'Bringen Sie bitte folgende Unterlagen mit: Ihren Personalausweis oder Reisepass, Ihren Lebenslauf und Ihre Zeugnisse. ' +
          'Wenn Sie den Termin nicht wahrnehmen können, rufen Sie uns bitte vorher an: 030 / 987 654 32. ' +
          'Bitte kommen Sie pünktlich.\n\n' +
          'Mit freundlichen Grüßen\nFrau Schmidt\nJobcenter Berlin-Mitte',
        questions: [
          {
            id: 'q1-2-1',
            promptDe: 'Wann ist der Termin?',
            options: [
              { id: 'a', de: 'Am Montag um 9:00 Uhr' },
              { id: 'b', de: 'Am Dienstag um 9:30 Uhr' },
              { id: 'c', de: 'Am Mittwoch um 10:00 Uhr' },
              { id: 'd', de: 'Am Donnerstag um 8:30 Uhr' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي يوم الثلاثاء الساعة 9:30. النص يذكر "am Dienstag, den 15. März, um 9:30 Uhr" أي يوم الثلاثاء 15 مارس الساعة التاسعة والنصف.',
          },
          {
            id: 'q1-2-2',
            promptDe: 'Was soll Herr Ahmad mitbringen?',
            options: [
              { id: 'a', de: 'Nur seinen Reisepass' },
              { id: 'b', de: 'Personalausweis, Lebenslauf und Zeugnisse' },
              { id: 'c', de: 'Nur seinen Lebenslauf' },
              { id: 'd', de: 'Fotos und Bewerbung' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي بطاقة الهوية والسيرة الذاتية والشهادات. النص يذكر "Ihren Personalausweis oder Reisepass, Ihren Lebenslauf und Ihre Zeugnisse" أي جواز السفر أو الهوية والسيرة الذاتية والشهادات.',
          },
          {
            id: 'q1-2-3',
            promptDe: 'Was soll Herr Ahmad machen, wenn er nicht kommen kann?',
            options: [
              { id: 'a', de: 'Er soll eine E-Mail schreiben.' },
              { id: 'b', de: 'Er soll einfach nicht kommen.' },
              { id: 'c', de: 'Er soll vorher anrufen.' },
              { id: 'd', de: 'Er soll einen Brief schicken.' },
            ],
            correct: 'c',
            explanationAr:
              'الإجابة الصحيحة هي أنه يجب أن يتصل مسبقاً. النص يقول "rufen Sie uns bitte vorher an" أي اتصلوا بنا من فضلكم مسبقاً.',
          },
        ],
      },

      // ---- Passage 3: Company notice about working hours ----
      {
        id: 'lese-1-3',
        titleDe: 'Betriebsmitteilung: Neue Arbeitszeiten',
        textDe:
          'Liebe Mitarbeiterinnen und Mitarbeiter,\n\n' +
          'ab dem 1. April gelten neue Arbeitszeiten in unserer Firma. ' +
          'Die Kernarbeitszeit ist von 9:00 bis 15:00 Uhr. In dieser Zeit müssen alle Mitarbeiter im Büro sein. ' +
          'Sie können aber flexibel zwischen 7:00 und 9:00 Uhr anfangen und zwischen 15:00 und 18:00 Uhr aufhören. ' +
          'Die Mittagspause dauert 45 Minuten und ist zwischen 12:00 und 13:30 Uhr. ' +
          'Bitte sprechen Sie mit Ihrem Teamleiter, wenn Sie Fragen haben. ' +
          'Am Freitag endet die Arbeit für alle um 14:00 Uhr.\n\n' +
          'Ihre Geschäftsleitung',
        questions: [
          {
            id: 'q1-3-1',
            promptDe: 'Was ist die Kernarbeitszeit?',
            options: [
              { id: 'a', de: 'Von 7:00 bis 18:00 Uhr' },
              { id: 'b', de: 'Von 8:00 bis 16:00 Uhr' },
              { id: 'c', de: 'Von 9:00 bis 15:00 Uhr' },
              { id: 'd', de: 'Von 10:00 bis 14:00 Uhr' },
            ],
            correct: 'c',
            explanationAr:
              'الإجابة الصحيحة هي من الساعة 9:00 حتى 15:00. النص يذكر "Die Kernarbeitszeit ist von 9:00 bis 15:00 Uhr" وهي الفترة الأساسية التي يجب أن يكون فيها جميع الموظفين في المكتب. كلمة Kernarbeitszeit تعني وقت العمل الأساسي.',
          },
          {
            id: 'q1-3-2',
            promptDe: 'Wie lange ist die Mittagspause?',
            options: [
              { id: 'a', de: '30 Minuten' },
              { id: 'b', de: '45 Minuten' },
              { id: 'c', de: '60 Minuten' },
              { id: 'd', de: '90 Minuten' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي 45 دقيقة. النص يقول "Die Mittagspause dauert 45 Minuten" أي استراحة الغداء تستغرق 45 دقيقة.',
          },
          {
            id: 'q1-3-3',
            promptDe: 'Wann endet die Arbeit am Freitag?',
            options: [
              { id: 'a', de: 'Um 13:00 Uhr' },
              { id: 'b', de: 'Um 14:00 Uhr' },
              { id: 'c', de: 'Um 15:00 Uhr' },
              { id: 'd', de: 'Um 16:00 Uhr' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي الساعة 14:00. النص يقول "Am Freitag endet die Arbeit für alle um 14:00 Uhr" أي يوم الجمعة ينتهي العمل للجميع الساعة الثانية ظهراً.',
          },
        ],
      },

      // ---- Passage 4: Newspaper article about part-time jobs ----
      {
        id: 'lese-1-4',
        titleDe: 'Zeitungsartikel: Teilzeitjobs in Deutschland',
        textDe:
          'Immer mehr Menschen in Deutschland arbeiten in Teilzeit. Besonders Frauen mit Kindern arbeiten oft nur 20 bis 25 Stunden pro Woche. ' +
          'Aber auch viele Studenten haben einen Minijob neben dem Studium. Ein Minijob bedeutet, dass man maximal 520 Euro im Monat verdient. ' +
          'Teilzeitarbeit hat Vorteile: Man hat mehr Zeit für die Familie oder für Hobbys. ' +
          'Aber es gibt auch Nachteile: Man verdient weniger Geld und bekommt später eine kleinere Rente. ' +
          'Experten sagen, dass man bei einem Teilzeitjob genau auf den Arbeitsvertrag schauen soll. ' +
          'Dort steht, wie viele Stunden man arbeiten muss und wie viel Urlaub man bekommt. ' +
          'In Deutschland hat jeder Arbeitnehmer Recht auf mindestens 20 Tage Urlaub im Jahr bei einer 5-Tage-Woche.',
        questions: [
          {
            id: 'q1-4-1',
            promptDe: 'Wer arbeitet besonders oft in Teilzeit?',
            options: [
              { id: 'a', de: 'Männer ohne Kinder' },
              { id: 'b', de: 'Frauen mit Kindern' },
              { id: 'c', de: 'Rentner' },
              { id: 'd', de: 'Ärzte' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي النساء اللواتي لديهن أطفال. النص يقول "Besonders Frauen mit Kindern arbeiten oft nur 20 bis 25 Stunden" أي خاصة النساء مع الأطفال يعملن في الغالب 20-25 ساعة فقط.',
          },
          {
            id: 'q1-4-2',
            promptDe: 'Wie viel verdient man maximal bei einem Minijob?',
            options: [
              { id: 'a', de: '450 Euro im Monat' },
              { id: 'b', de: '520 Euro im Monat' },
              { id: 'c', de: '600 Euro im Monat' },
              { id: 'd', de: '800 Euro im Monat' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي 520 يورو في الشهر كحد أقصى. النص يقول "maximal 520 Euro im Monat verdient" أي يكسب 520 يورو كحد أقصى شهرياً. هذا هو الحد الأعلى للميني جوب في ألمانيا.',
          },
          {
            id: 'q1-4-3',
            promptDe: 'Was ist ein Nachteil von Teilzeitarbeit?',
            options: [
              { id: 'a', de: 'Man hat zu viel Urlaub.' },
              { id: 'b', de: 'Man verdient weniger und bekommt eine kleinere Rente.' },
              { id: 'c', de: 'Man muss am Wochenende arbeiten.' },
              { id: 'd', de: 'Man bekommt keinen Arbeitsvertrag.' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي أنك تكسب أقل وتحصل على معاش تقاعدي أصغر. النص يذكر "Man verdient weniger Geld und bekommt später eine kleinere Rente" أي تكسب مالاً أقل وتحصل لاحقاً على معاش تقاعدي أقل.',
          },
        ],
      },
    ],

    // --------------------------------------------------------
    // SPRACHBAUSTEINE — 8 exercises
    // --------------------------------------------------------
    sprachbausteine: [
      {
        id: 'sb-1-1',
        contextDe: 'Ich ___ gestern einen Brief an das Jobcenter geschrieben.',
        options: [
          { id: 'a', de: 'bin' },
          { id: 'b', de: 'habe' },
          { id: 'c', de: 'hat' },
          { id: 'd', de: 'ist' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي "habe" لأن الفعل "schreiben" (يكتب) يستخدم الفعل المساعد "haben" في صيغة الماضي التام (Perfekt). القاعدة: معظم الأفعال تستخدم "haben" في الـ Perfekt. الجملة الكاملة: "Ich habe gestern einen Brief geschrieben" = كتبتُ رسالة أمس.',
      },
      {
        id: 'sb-1-2',
        contextDe: 'Er ___ gestern zur Arbeit gefahren.',
        options: [
          { id: 'a', de: 'hat' },
          { id: 'b', de: 'bin' },
          { id: 'c', de: 'ist' },
          { id: 'd', de: 'haben' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي "ist" لأن الفعل "fahren" (يسافر/يقود) يدل على حركة وانتقال من مكان لآخر، لذلك يستخدم الفعل المساعد "sein" في الـ Perfekt. القاعدة: أفعال الحركة مثل fahren, gehen, kommen, fliegen تستخدم "sein". الجملة: "Er ist zur Arbeit gefahren" = ذهب إلى العمل.',
      },
      {
        id: 'sb-1-3',
        contextDe: 'Ich ___ morgen früh aufstehen, weil ich einen Termin habe.',
        options: [
          { id: 'a', de: 'kann' },
          { id: 'b', de: 'muss' },
          { id: 'c', de: 'darf' },
          { id: 'd', de: 'soll' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي "muss" (يجب) لأن هناك موعداً محدداً يجعل الاستيقاظ المبكر ضرورياً. "muss" تعني الإلزام والضرورة. "kann" = يستطيع، "darf" = مسموح له، "soll" = ينبغي. المعنى: يجب أن أستيقظ باكراً غداً لأن لدي موعداً.',
      },
      {
        id: 'sb-1-4',
        contextDe: 'Sie ___ nicht so spät kommen, hat der Chef gesagt.',
        options: [
          { id: 'a', de: 'muss' },
          { id: 'b', de: 'sollen' },
          { id: 'c', de: 'soll' },
          { id: 'd', de: 'will' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي "soll" لأن المدير طلب منها ذلك. "soll" تُستخدم عندما يطلب شخص آخر شيئاً ما (توصية أو طلب من الغير). الضمير "Sie" هنا مفرد مؤنث لذلك الفعل "soll". لو كان الضمير "sie" (هم) لكان "sollen". الجملة تعني: قال المدير إنها لا ينبغي أن تأتي متأخرة.',
      },
      {
        id: 'sb-1-5',
        contextDe: 'Ich bin müde, ___ ich gestern lange gearbeitet habe.',
        options: [
          { id: 'a', de: 'dass' },
          { id: 'b', de: 'ob' },
          { id: 'c', de: 'weil' },
          { id: 'd', de: 'wenn' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي "weil" (لأن) لأن الجملة تعبّر عن سبب التعب. "weil" تربط جملة السبب بالجملة الرئيسية. لاحظ أن الفعل "habe" يأتي في نهاية الجملة الفرعية بعد "weil". القاعدة: بعد weil يذهب الفعل المصرّف إلى نهاية الجملة. المعنى: أنا متعب لأنني عملت طويلاً أمس.',
      },
      {
        id: 'sb-1-6',
        contextDe: 'Mein Chef hat gesagt, ___ ich nächste Woche Urlaub nehmen kann.',
        options: [
          { id: 'a', de: 'weil' },
          { id: 'b', de: 'dass' },
          { id: 'c', de: 'ob' },
          { id: 'd', de: 'wenn' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي "dass" (أنّ) لأن الجملة تنقل كلام المدير. "dass" تُستخدم بعد أفعال القول والاعتقاد مثل sagen, denken, glauben, meinen. لاحظ أن الفعل "kann" يأتي في نهاية الجملة بعد "dass". المعنى: قال مديري إنني أستطيع أن آخذ إجازة الأسبوع القادم.',
      },
      {
        id: 'sb-1-7',
        contextDe: 'Können Sie ___ bitte helfen? Ich verstehe das Formular nicht.',
        options: [
          { id: 'a', de: 'mich' },
          { id: 'b', de: 'mir' },
          { id: 'c', de: 'ich' },
          { id: 'd', de: 'mein' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي "mir" (لي) في حالة الـ Dativ. الفعل "helfen" يتطلب دائماً حالة الـ Dativ. القاعدة: بعض الأفعال في الألمانية تأخذ Dativ وليس Akkusativ مثل: helfen, danken, gefallen, gehören. "mir" هو ضمير المتكلم في الـ Dativ. المعنى: هل يمكنك مساعدتي من فضلك؟',
      },
      {
        id: 'sb-1-8',
        contextDe: 'Ich schicke ___ Teamleiter eine E-Mail mit meiner Bewerbung.',
        options: [
          { id: 'a', de: 'den' },
          { id: 'b', de: 'der' },
          { id: 'c', de: 'dem' },
          { id: 'd', de: 'des' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي "dem" لأن "Teamleiter" هنا في حالة الـ Dativ. الفعل "schicken" يأخذ مفعولين: مفعول مباشر (Akkusativ) = eine E-Mail ومفعول غير مباشر (Dativ) = dem Teamleiter. أداة التعريف المذكر في الـ Dativ هي "dem". المعنى: أرسل لقائد الفريق بريداً إلكترونياً مع طلب التوظيف خاصتي.',
      },
    ],

    // --------------------------------------------------------
    // SCHREIBEN (Writing) — 2 tasks
    // --------------------------------------------------------
    schreibenParts: [
      {
        id: 'sch-1-1',
        titleDe: 'Antwort auf eine Stellenanzeige',
        promptDe:
          'Sie haben eine Stellenanzeige für eine Stelle als Lagerarbeiter bei der Firma "Schnell-Logistik" gelesen. ' +
          'Schreiben Sie eine E-Mail an die Firma. Schreiben Sie etwas zu folgenden Punkten:\n' +
          '- Warum schreiben Sie?\n' +
          '- Welche Erfahrung haben Sie?\n' +
          '- Wann können Sie anfangen?\n' +
          '- Wann können Sie zu einem Vorstellungsgespräch kommen?',
        promptAr:
          'قرأت إعلان وظيفة لعامل مستودع في شركة "شنيل لوجيستيك". ' +
          'اكتب بريداً إلكترونياً للشركة. اكتب شيئاً عن النقاط التالية:\n' +
          '- لماذا تكتب؟\n' +
          '- ما هي خبرتك؟\n' +
          '- متى يمكنك أن تبدأ؟\n' +
          '- متى يمكنك الحضور لمقابلة عمل؟',
        redemittel: [
          'Sehr geehrte Damen und Herren,',
          'ich habe Ihre Stellenanzeige gelesen und möchte mich bewerben.',
          'Ich interessiere mich für die Stelle als ...',
          'Ich habe ... Jahre Erfahrung als ...',
          'Ich habe bei der Firma ... gearbeitet.',
          'Ich kann ab dem ... anfangen.',
          'Ich kann sofort / ab nächsten Monat anfangen.',
          'Für ein Vorstellungsgespräch habe ich am ... Zeit.',
          'Ich freue mich auf Ihre Antwort.',
          'Mit freundlichen Grüßen',
        ],
        sampleDe:
          'Sehr geehrte Damen und Herren,\n\n' +
          'ich habe Ihre Stellenanzeige für die Stelle als Lagerarbeiter gelesen. Ich möchte mich gerne bewerben.\n\n' +
          'Ich habe zwei Jahre Erfahrung als Lagerarbeiter. Ich habe bei einer kleinen Firma in Berlin gearbeitet. ' +
          'Dort habe ich Pakete sortiert und Waren kontrolliert. Ich bin pünktlich und arbeite gerne im Team.\n\n' +
          'Ich kann ab dem 1. Mai anfangen. Für ein Vorstellungsgespräch habe ich jederzeit Zeit. ' +
          'Am besten passt es mir am Vormittag.\n\n' +
          'Ich freue mich auf Ihre Antwort.\n\n' +
          'Mit freundlichen Grüßen\nAhmad Hassan',
        sampleAr:
          'سيداتي وسادتي الأعزاء،\n\n' +
          'لقد قرأت إعلانكم عن وظيفة عامل مستودع. أود أن أتقدم بطلبي.\n\n' +
          'لدي سنتان من الخبرة كعامل مستودع. عملت في شركة صغيرة في برلين. ' +
          'هناك كنت أقوم بفرز الطرود ومراقبة البضائع. أنا دقيق في المواعيد وأحب العمل ضمن فريق.\n\n' +
          'يمكنني البدء من الأول من مايو. لدي وقت لمقابلة العمل في أي وقت. ' +
          'يناسبني الصباح أفضل.\n\n' +
          'أتطلع إلى ردكم.\n\n' +
          'مع أطيب التحيات\nأحمد حسن',
      },
      {
        id: 'sch-1-2',
        titleDe: 'Brief an den Vermieter: Problem in der Wohnung',
        promptDe:
          'In Ihrer Wohnung gibt es ein Problem: Die Heizung funktioniert seit drei Tagen nicht. ' +
          'Es ist Winter und sehr kalt. Schreiben Sie einen Brief an Ihren Vermieter, Herrn Weber. ' +
          'Schreiben Sie etwas zu folgenden Punkten:\n' +
          '- Was ist das Problem?\n' +
          '- Seit wann gibt es das Problem?\n' +
          '- Was soll der Vermieter machen?\n' +
          '- Wann sind Sie zu Hause?',
        promptAr:
          'يوجد مشكلة في شقتك: التدفئة لا تعمل منذ ثلاثة أيام. ' +
          'إنه فصل الشتاء والجو بارد جداً. اكتب رسالة إلى مالك الشقة السيد فيبر. ' +
          'اكتب شيئاً عن النقاط التالية:\n' +
          '- ما هي المشكلة؟\n' +
          '- منذ متى توجد المشكلة؟\n' +
          '- ماذا يجب أن يفعل المالك؟\n' +
          '- متى تكون في المنزل؟',
        redemittel: [
          'Sehr geehrter Herr ...,',
          'ich schreibe Ihnen, weil ich ein Problem in meiner Wohnung habe.',
          'Die Heizung / Die Waschmaschine / Der Wasserhahn funktioniert nicht.',
          'Das Problem gibt es seit ... Tagen / seit letzter Woche.',
          'Können Sie bitte einen Handwerker schicken?',
          'Bitte reparieren Sie ... so schnell wie möglich.',
          'Ich bin von ... bis ... Uhr zu Hause.',
          'Sie können mich unter der Nummer ... erreichen.',
          'Vielen Dank im Voraus.',
          'Mit freundlichen Grüßen',
        ],
        sampleDe:
          'Sehr geehrter Herr Weber,\n\n' +
          'ich schreibe Ihnen, weil ich ein großes Problem in meiner Wohnung habe. ' +
          'Die Heizung funktioniert seit drei Tagen nicht mehr. Es ist Winter und in der Wohnung ist es sehr kalt. ' +
          'Meine Kinder sind krank geworden, weil es so kalt ist.\n\n' +
          'Können Sie bitte so schnell wie möglich einen Handwerker schicken? ' +
          'Das Problem muss dringend repariert werden.\n\n' +
          'Ich bin jeden Tag von 8:00 bis 17:00 Uhr zu Hause. ' +
          'Sie können mich auch unter der Telefonnummer 0176 / 123 456 78 erreichen.\n\n' +
          'Vielen Dank im Voraus.\n\n' +
          'Mit freundlichen Grüßen\nAhmad Hassan',
        sampleAr:
          'السيد فيبر المحترم،\n\n' +
          'أكتب إليكم لأن لدي مشكلة كبيرة في شقتي. ' +
          'التدفئة لا تعمل منذ ثلاثة أيام. إنه فصل الشتاء والشقة باردة جداً. ' +
          'أطفالي مرضوا لأن الجو بارد جداً.\n\n' +
          'هل يمكنكم من فضلكم إرسال فني تصليح بأسرع وقت ممكن؟ ' +
          'يجب إصلاح المشكلة بشكل عاجل.\n\n' +
          'أنا في المنزل كل يوم من الساعة 8:00 إلى 17:00. ' +
          'يمكنكم أيضاً الاتصال بي على الرقم 0176 / 123 456 78.\n\n' +
          'شكراً جزيلاً مقدماً.\n\n' +
          'مع أطيب التحيات\nأحمد حسن',
      },
    ],

    // --------------------------------------------------------
    // SPRECHEN (Speaking) — 2 tasks
    // --------------------------------------------------------
    sprechenParts: [
      {
        id: 'spr-1-1',
        titleDe: 'Bildbeschreibung: Auf dem Wochenmarkt',
        promptDe:
          'Beschreiben Sie das Bild. Was sehen Sie? Was machen die Personen? Wie ist das Wetter? ' +
          'Waren Sie schon einmal auf einem Wochenmarkt in Deutschland? Was kann man dort kaufen?',
        promptAr:
          'صِف الصورة. ماذا ترى؟ ماذا يفعل الأشخاص؟ كيف هو الطقس؟ ' +
          'هل زرت سوقاً أسبوعياً في ألمانيا من قبل؟ ماذا يمكن شراؤه هناك؟',
        redemittel: [
          'Auf dem Bild sehe ich ...',
          'Im Vordergrund / Im Hintergrund sieht man ...',
          'Es gibt viele / einige / wenige ...',
          'Die Personen ... / Eine Frau ... / Ein Mann ...',
          'Das Wetter ist sonnig / regnerisch / bewölkt.',
          'Ich war schon einmal auf einem Wochenmarkt.',
          'Dort kann man frisches Obst und Gemüse kaufen.',
          'Ich finde Wochenmärkte toll, weil ...',
          'In meiner Heimat gibt es auch Märkte.',
          'Der Markt auf dem Bild sieht ... aus.',
        ],
        sampleDe:
          'Auf dem Bild sehe ich einen Wochenmarkt. Es gibt viele Stände mit Obst, Gemüse, Blumen und Käse. ' +
          'Im Vordergrund steht eine Frau. Sie kauft Tomaten und Äpfel. Sie hat eine große Tasche in der Hand. ' +
          'Der Verkäufer lächelt und gibt ihr das Obst. Im Hintergrund sehe ich andere Leute. Sie gehen zwischen den Ständen. ' +
          'Das Wetter sieht sonnig aus. Es ist wahrscheinlich Sommer.\n\n' +
          'Ich war schon einmal auf einem Wochenmarkt in meiner Stadt. Dort habe ich frisches Gemüse und Brot gekauft. ' +
          'Ich finde Wochenmärkte toll, weil das Essen dort frisch ist. In meiner Heimat Syrien gibt es auch viele Märkte. ' +
          'Die Märkte in Syrien sind sehr groß und es gibt dort auch Gewürze und Nüsse.',
        sampleAr:
          'في الصورة أرى سوقاً أسبوعياً. هناك العديد من الأكشاك مع الفواكه والخضروات والزهور والجبن. ' +
          'في المقدمة تقف امرأة. تشتري طماطم وتفاح. تحمل حقيبة كبيرة في يدها. ' +
          'البائع يبتسم ويعطيها الفاكهة. في الخلفية أرى أشخاصاً آخرين يمشون بين الأكشاك. ' +
          'الطقس يبدو مشمساً. ربما يكون فصل الصيف.\n\n' +
          'لقد زرت سوقاً أسبوعياً في مدينتي. اشتريت هناك خضروات طازجة وخبزاً. ' +
          'أجد الأسواق الأسبوعية رائعة لأن الطعام هناك طازج. في وطني سوريا هناك أيضاً أسواق كثيرة. ' +
          'الأسواق في سوريا كبيرة جداً ويوجد فيها أيضاً بهارات ومكسرات.',
      },
      {
        id: 'spr-1-2',
        titleDe: 'Etwas gemeinsam planen: Eine Party organisieren',
        promptDe:
          'Sie und Ihr Partner / Ihre Partnerin möchten eine Party organisieren. ' +
          'Planen Sie die Party zusammen. Sprechen Sie über folgende Punkte:\n' +
          '- Wann soll die Party sein? (Tag und Uhrzeit)\n' +
          '- Wo soll die Party stattfinden?\n' +
          '- Wen wollen Sie einladen?\n' +
          '- Was soll es zu essen und trinken geben?\n' +
          '- Wer bringt was mit?',
        promptAr:
          'أنت وشريكك / شريكتك تريدان تنظيم حفلة. ' +
          'خططوا للحفلة معاً. تحدثوا عن النقاط التالية:\n' +
          '- متى ستكون الحفلة؟ (اليوم والوقت)\n' +
          '- أين ستقام الحفلة؟\n' +
          '- من تريدون دعوته؟\n' +
          '- ماذا سيكون هناك للأكل والشرب؟\n' +
          '- من سيحضر ماذا؟',
        redemittel: [
          'Ich schlage vor, dass wir ...',
          'Was meinst du? / Was denkst du?',
          'Das ist eine gute Idee!',
          'Ich bin einverstanden. / Ich bin nicht einverstanden.',
          'Vielleicht können wir ...',
          'Wollen wir ... oder lieber ...?',
          'Ich kann ... mitbringen.',
          'Kannst du bitte ... kaufen / organisieren?',
          'Lass uns ... machen.',
          'Wir sollten auch an ... denken.',
        ],
        sampleDe:
          'A: Hallo! Wir wollen eine Party organisieren. Wann soll die Party sein?\n' +
          'B: Ich schlage vor, dass wir die Party am Samstag machen. Am Abend, vielleicht um 18 Uhr?\n' +
          'A: Ja, das ist eine gute Idee. Samstag um 18 Uhr passt gut. Wo soll die Party stattfinden?\n' +
          'B: Wir können die Party bei mir zu Hause machen. Ich habe ein großes Wohnzimmer.\n' +
          'A: Super! Wen wollen wir einladen?\n' +
          'B: Wir können unsere Freunde aus dem Deutschkurs einladen. Und auch unsere Nachbarn.\n' +
          'A: Gute Idee. Und was gibt es zu essen?\n' +
          'B: Ich kann Salat und Kuchen machen. Kannst du Brot und Käse kaufen?\n' +
          'A: Ja, das mache ich gerne. Und ich bringe auch Saft und Wasser mit.\n' +
          'B: Perfekt! Wir sollten auch an Musik denken. Ich habe eine gute Playlist.\n' +
          'A: Toll, dann ist alles geplant!',
        sampleAr:
          'أ: مرحباً! نريد تنظيم حفلة. متى يجب أن تكون الحفلة؟\n' +
          'ب: أقترح أن نقيم الحفلة يوم السبت. في المساء، ربما الساعة 6 مساءً؟\n' +
          'أ: نعم، هذه فكرة جيدة. السبت الساعة 6 مناسب. أين ستقام الحفلة؟\n' +
          'ب: يمكننا إقامة الحفلة عندي في البيت. لدي غرفة جلوس كبيرة.\n' +
          'أ: رائع! من نريد أن ندعو؟\n' +
          'ب: يمكننا دعوة أصدقائنا من دورة اللغة الألمانية. وأيضاً جيراننا.\n' +
          'أ: فكرة جيدة. وماذا سيكون هناك للأكل؟\n' +
          'ب: يمكنني تحضير سلطة وكعكة. هل يمكنك شراء خبز وجبن؟\n' +
          'أ: نعم، بكل سرور. وسأحضر أيضاً عصيراً وماءً.\n' +
          'ب: ممتاز! يجب أن نفكر أيضاً بالموسيقى. لدي قائمة أغاني جيدة.\n' +
          'أ: رائع، إذاً كل شيء مخطط!',
      },
    ],
  },

  // ============================================================
  // MODEL 2: الصحة والسكن — Gesundheit & Wohnen
  // ============================================================
  {
    id: 'goethe-a2-2',
    titleAr: 'نموذج 2 — الصحة والسكن',
    titleDe: 'Modelltest 2 — Gesundheit & Wohnen',
    level: 'A2',
    durationMin: 80,

    // --------------------------------------------------------
    // LESEN (Reading) — 4 passages, 12 questions
    // --------------------------------------------------------
    readingPassages: [
      // ---- Passage 1: Doctor's office information sheet ----
      {
        id: 'lese-2-1',
        titleDe: 'Informationsblatt: Arztpraxis Dr. Hoffmann',
        textDe:
          'Willkommen in der Arztpraxis Dr. Hoffmann!\n\n' +
          'Sprechzeiten:\n' +
          'Montag, Dienstag, Donnerstag: 8:00 – 12:00 Uhr und 14:00 – 18:00 Uhr\n' +
          'Mittwoch: 8:00 – 12:00 Uhr (nachmittags geschlossen)\n' +
          'Freitag: 8:00 – 13:00 Uhr\n\n' +
          'Bitte bringen Sie zu jedem Besuch Ihre Versichertenkarte mit. ' +
          'Wenn Sie einen Termin absagen möchten, rufen Sie bitte mindestens 24 Stunden vorher an. ' +
          'Ohne Termin können Sie in unsere offene Sprechstunde kommen: jeden Dienstag und Donnerstag von 11:00 bis 12:00 Uhr. ' +
          'Für Notfälle sind wir auch außerhalb der Sprechzeiten telefonisch erreichbar: 0151 / 999 888 77.\n\n' +
          'Bitte kommen Sie 10 Minuten vor Ihrem Termin, damit Sie die Formulare ausfüllen können.',
        questions: [
          {
            id: 'q2-1-1',
            promptDe: 'Wann ist die Praxis am Mittwochnachmittag geöffnet?',
            options: [
              { id: 'a', de: 'Von 14:00 bis 18:00 Uhr' },
              { id: 'b', de: 'Von 14:00 bis 16:00 Uhr' },
              { id: 'c', de: 'Die Praxis ist am Mittwochnachmittag geschlossen.' },
              { id: 'd', de: 'Von 13:00 bis 17:00 Uhr' },
            ],
            correct: 'c',
            explanationAr:
              'الإجابة الصحيحة هي أن العيادة مغلقة يوم الأربعاء بعد الظهر. النص يذكر "Mittwoch: 8:00 – 12:00 Uhr (nachmittags geschlossen)" أي الأربعاء من 8 إلى 12 ظهراً وبعد الظهر مغلق.',
          },
          {
            id: 'q2-1-2',
            promptDe: 'Wann kann man ohne Termin kommen?',
            options: [
              { id: 'a', de: 'Jeden Tag von 8:00 bis 9:00 Uhr' },
              { id: 'b', de: 'Am Dienstag und Donnerstag von 11:00 bis 12:00 Uhr' },
              { id: 'c', de: 'Nur am Freitag' },
              { id: 'd', de: 'Man kann nie ohne Termin kommen.' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي يوم الثلاثاء والخميس من 11:00 إلى 12:00. النص يقول "offene Sprechstunde: jeden Dienstag und Donnerstag von 11:00 bis 12:00 Uhr". الـ offene Sprechstunde تعني ساعة الاستشارة المفتوحة بدون موعد.',
          },
          {
            id: 'q2-1-3',
            promptDe: 'Was muss man zu jedem Besuch mitbringen?',
            options: [
              { id: 'a', de: 'Einen Personalausweis' },
              { id: 'b', de: 'Die Versichertenkarte' },
              { id: 'c', de: 'Ein Rezept' },
              { id: 'd', de: 'Geld' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي بطاقة التأمين الصحي (Versichertenkarte). النص يقول "Bitte bringen Sie zu jedem Besuch Ihre Versichertenkarte mit" أي من فضلك أحضر بطاقة التأمين الصحي في كل زيارة. هذه البطاقة مهمة جداً عند زيارة الطبيب في ألمانيا.',
          },
        ],
      },

      // ---- Passage 2: Apartment rental ad ----
      {
        id: 'lese-2-2',
        titleDe: 'Wohnungsanzeige: 3-Zimmer-Wohnung in Hamburg',
        textDe:
          'Zu vermieten: Schöne 3-Zimmer-Wohnung in Hamburg-Altona\n\n' +
          'Größe: 75 m² | Stockwerk: 3. OG (mit Aufzug)\n' +
          'Kaltmiete: 850 Euro | Nebenkosten: 200 Euro | Kaution: 2.550 Euro (3 Monatsmieten)\n\n' +
          'Die Wohnung hat ein großes Wohnzimmer, zwei Schlafzimmer, eine Einbauküche, ein Badezimmer mit Badewanne und einen Balkon. ' +
          'Die Wohnung ist hell und ruhig. Sie liegt in der Nähe vom Bahnhof Altona (5 Minuten zu Fuß). ' +
          'Ein Supermarkt, eine Schule und ein Kindergarten sind auch in der Nähe.\n\n' +
          'Die Wohnung ist ab dem 1. August frei. Haustiere sind nicht erlaubt.\n\n' +
          'Kontakt: Herr Petersen, Tel: 040 / 555 666 77, E-Mail: petersen@wohnen-hh.de',
        questions: [
          {
            id: 'q2-2-1',
            promptDe: 'Wie viel muss man insgesamt pro Monat bezahlen (Miete + Nebenkosten)?',
            options: [
              { id: 'a', de: '850 Euro' },
              { id: 'b', de: '1.050 Euro' },
              { id: 'c', de: '1.200 Euro' },
              { id: 'd', de: '2.550 Euro' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي 1.050 يورو. الإيجار البارد (Kaltmiete) هو 850 يورو والتكاليف الإضافية (Nebenkosten) هي 200 يورو. المجموع: 850 + 200 = 1.050 يورو شهرياً. في ألمانيا يُذكر الإيجار عادة بالإيجار البارد والتكاليف الإضافية منفصلة.',
          },
          {
            id: 'q2-2-2',
            promptDe: 'Darf man ein Haustier in der Wohnung haben?',
            options: [
              { id: 'a', de: 'Ja, alle Haustiere sind erlaubt.' },
              { id: 'b', de: 'Nur kleine Haustiere sind erlaubt.' },
              { id: 'c', de: 'Nein, Haustiere sind nicht erlaubt.' },
              { id: 'd', de: 'Nur Katzen sind erlaubt.' },
            ],
            correct: 'c',
            explanationAr:
              'الإجابة الصحيحة هي أن الحيوانات الأليفة غير مسموح بها. النص يقول "Haustiere sind nicht erlaubt" أي الحيوانات الأليفة غير مسموح بها. هذا شائع في كثير من الشقق المستأجرة في ألمانيا.',
          },
          {
            id: 'q2-2-3',
            promptDe: 'Wie kommt man zum Bahnhof Altona?',
            options: [
              { id: 'a', de: 'Mit dem Bus, 20 Minuten' },
              { id: 'b', de: 'Zu Fuß, 5 Minuten' },
              { id: 'c', de: 'Mit der U-Bahn, 10 Minuten' },
              { id: 'd', de: 'Mit dem Auto, 15 Minuten' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي 5 دقائق مشياً على الأقدام. النص يقول "in der Nähe vom Bahnhof Altona (5 Minuten zu Fuß)" أي بالقرب من محطة ألتونا (5 دقائق سيراً على الأقدام).',
          },
        ],
      },

      // ---- Passage 3: Health insurance letter ----
      {
        id: 'lese-2-3',
        titleDe: 'Brief von der Krankenkasse',
        textDe:
          'AOK Nordost\nKundenservice\n10115 Berlin\n\n' +
          'Sehr geehrter Herr Khalil,\n\n' +
          'vielen Dank für Ihre Anmeldung bei der AOK Nordost. Ihre Versichertenkarte schicken wir Ihnen in den nächsten zwei Wochen per Post zu.\n\n' +
          'Bis Sie Ihre neue Karte bekommen, können Sie mit diesem Brief zum Arzt gehen. ' +
          'Zeigen Sie diesen Brief bitte in der Arztpraxis vor.\n\n' +
          'Ihre Versicherungsnummer: K 123 456 789\n\n' +
          'Als Mitglied der AOK haben Sie folgende Leistungen:\n' +
          '- Arztbesuche und Krankenhausbehandlung\n' +
          '- Medikamente (mit Zuzahlung von 5-10 Euro)\n' +
          '- Zahnbehandlung\n' +
          '- Vorsorgeuntersuchungen (einmal im Jahr kostenlos)\n\n' +
          'Wenn Sie Fragen haben, rufen Sie uns an: 0800 / 111 222 33 (kostenlos) oder besuchen Sie uns in unserer Filiale in der Friedrichstraße 55.\n\n' +
          'Mit freundlichen Grüßen\nAOK Nordost – Kundenservice',
        questions: [
          {
            id: 'q2-3-1',
            promptDe: 'Wann bekommt Herr Khalil seine Versichertenkarte?',
            options: [
              { id: 'a', de: 'Sofort' },
              { id: 'b', de: 'In den nächsten zwei Wochen' },
              { id: 'c', de: 'In einem Monat' },
              { id: 'd', de: 'Er muss sie selbst abholen.' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي خلال الأسبوعين القادمين. النص يقول "Ihre Versichertenkarte schicken wir Ihnen in den nächsten zwei Wochen per Post zu" أي سنرسل لك بطاقة التأمين الصحي بالبريد خلال أسبوعين.',
          },
          {
            id: 'q2-3-2',
            promptDe: 'Was soll Herr Khalil machen, wenn er vor der Karte zum Arzt muss?',
            options: [
              { id: 'a', de: 'Er soll die AOK anrufen.' },
              { id: 'b', de: 'Er kann nicht zum Arzt gehen.' },
              { id: 'c', de: 'Er soll diesen Brief in der Arztpraxis zeigen.' },
              { id: 'd', de: 'Er muss selbst bezahlen.' },
            ],
            correct: 'c',
            explanationAr:
              'الإجابة الصحيحة هي أنه يجب أن يُظهر هذه الرسالة في عيادة الطبيب. النص يقول "können Sie mit diesem Brief zum Arzt gehen. Zeigen Sie diesen Brief bitte in der Arztpraxis vor" أي يمكنك الذهاب للطبيب بهذه الرسالة وأظهرها في العيادة.',
          },
          {
            id: 'q2-3-3',
            promptDe: 'Was muss man bei Medikamenten zuzahlen?',
            options: [
              { id: 'a', de: 'Nichts, alles ist kostenlos.' },
              { id: 'b', de: '5 bis 10 Euro' },
              { id: 'c', de: '20 bis 30 Euro' },
              { id: 'd', de: 'Den vollen Preis' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي من 5 إلى 10 يورو. النص يذكر "Medikamente (mit Zuzahlung von 5-10 Euro)" أي الأدوية مع دفعة إضافية من 5 إلى 10 يورو. Zuzahlung تعني المبلغ الذي يدفعه المؤمّن عليه بالإضافة إلى ما يغطيه التأمين.',
          },
        ],
      },

      // ---- Passage 4: Brochure about healthy eating ----
      {
        id: 'lese-2-4',
        titleDe: 'Broschüre: Gesund essen – gesund leben',
        textDe:
          'Gesund essen ist wichtig für den Körper und den Geist. Hier sind einige Tipps für eine gesunde Ernährung:\n\n' +
          '1. Essen Sie jeden Tag mindestens fünf Portionen Obst und Gemüse. Am besten frisch und nicht aus der Dose.\n' +
          '2. Trinken Sie genug Wasser – mindestens 1,5 Liter am Tag. Süße Getränke wie Cola oder Limonade haben viel Zucker.\n' +
          '3. Essen Sie Vollkornbrot statt Weißbrot. Vollkorn hat mehr Vitamine und hält länger satt.\n' +
          '4. Kochen Sie öfter selbst zu Hause. Fertiges Essen (Fertiggerichte) hat oft zu viel Salz und Fett.\n' +
          '5. Essen Sie nicht zu spät am Abend. Die letzte Mahlzeit sollte mindestens zwei Stunden vor dem Schlafen sein.\n\n' +
          'Wenn Sie Fragen zur Ernährung haben, können Sie bei Ihrer Krankenkasse einen Ernährungsberater fragen. ' +
          'Viele Krankenkassen bezahlen auch Ernährungskurse.',
        questions: [
          {
            id: 'q2-4-1',
            promptDe: 'Wie viel Wasser soll man mindestens am Tag trinken?',
            options: [
              { id: 'a', de: '1 Liter' },
              { id: 'b', de: '1,5 Liter' },
              { id: 'c', de: '2 Liter' },
              { id: 'd', de: '3 Liter' },
            ],
            correct: 'b',
            explanationAr:
              'الإجابة الصحيحة هي 1,5 لتر على الأقل يومياً. النص يقول "Trinken Sie genug Wasser – mindestens 1,5 Liter am Tag" أي اشربوا ماءً كافياً، على الأقل 1,5 لتر في اليوم.',
          },
          {
            id: 'q2-4-2',
            promptDe: 'Warum soll man Vollkornbrot essen?',
            options: [
              { id: 'a', de: 'Es ist billiger.' },
              { id: 'b', de: 'Es schmeckt besser.' },
              { id: 'c', de: 'Es hat mehr Vitamine und hält länger satt.' },
              { id: 'd', de: 'Es hat weniger Kalorien.' },
            ],
            correct: 'c',
            explanationAr:
              'الإجابة الصحيحة هي أن خبز الحبوب الكاملة يحتوي على فيتامينات أكثر ويُشبع لفترة أطول. النص يقول "Vollkorn hat mehr Vitamine und hält länger satt" أي الحبوب الكاملة تحتوي على المزيد من الفيتامينات وتبقيك شبعاناً لوقت أطول.',
          },
          {
            id: 'q2-4-3',
            promptDe: 'Wann soll man die letzte Mahlzeit essen?',
            options: [
              { id: 'a', de: 'Direkt vor dem Schlafen' },
              { id: 'b', de: 'Mindestens eine Stunde vor dem Schlafen' },
              { id: 'c', de: 'Mindestens zwei Stunden vor dem Schlafen' },
              { id: 'd', de: 'Mindestens drei Stunden vor dem Schlafen' },
            ],
            correct: 'c',
            explanationAr:
              'الإجابة الصحيحة هي قبل ساعتين على الأقل من النوم. النص يقول "Die letzte Mahlzeit sollte mindestens zwei Stunden vor dem Schlafen sein" أي الوجبة الأخيرة يجب أن تكون قبل ساعتين على الأقل من النوم.',
          },
        ],
      },
    ],

    // --------------------------------------------------------
    // SPRACHBAUSTEINE — 8 exercises
    // --------------------------------------------------------
    sprachbausteine: [
      {
        id: 'sb-2-1',
        contextDe: 'Diese Wohnung ist ___ als meine alte Wohnung.',
        options: [
          { id: 'a', de: 'groß' },
          { id: 'b', de: 'größer' },
          { id: 'c', de: 'am größten' },
          { id: 'd', de: 'größe' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي "größer" (أكبر) لأن الجملة تقارن بين شيئين: الشقة الجديدة والشقة القديمة. عندما نقارن بين شيئين نستخدم صيغة المقارنة (Komparativ) + "als". groß → größer. لاحظ أن الحرف "o" يتحول إلى "ö" في المقارنة. المعنى: هذه الشقة أكبر من شقتي القديمة.',
      },
      {
        id: 'sb-2-2',
        contextDe: 'Ich finde, Berlin ist die ___ Stadt in Deutschland.',
        options: [
          { id: 'a', de: 'interessanter' },
          { id: 'b', de: 'interessantest' },
          { id: 'c', de: 'interessanteste' },
          { id: 'd', de: 'mehr interessant' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي "interessanteste" لأننا نستخدم صيغة التفضيل (Superlativ) عندما نقول إن شيئاً هو الأفضل أو الأكثر من بين مجموعة. مع أداة التعريف "die" نستخدم الصفة بصيغة التفضيل مع نهاية "-este". interessant → interessanteste. المعنى: أعتقد أن برلين هي المدينة الأكثر إثارة في ألمانيا.',
      },
      {
        id: 'sb-2-3',
        contextDe: 'Ich gehe heute nicht zur Arbeit, ___ ich krank bin.',
        options: [
          { id: 'a', de: 'denn' },
          { id: 'b', de: 'weil' },
          { id: 'c', de: 'aber' },
          { id: 'd', de: 'und' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي "weil" (لأن). بعد "weil" يأتي الفعل المصرّف في نهاية الجملة الفرعية: "weil ich krank bin". لو استخدمنا "denn" لكان الفعل في الموقع الثاني: "denn ich bin krank". هنا الفعل "bin" في النهاية، لذلك "weil" هي الصحيحة. المعنى: لن أذهب اليوم إلى العمل لأنني مريض.',
      },
      {
        id: 'sb-2-4',
        contextDe: 'Der Arzt hat gesagt, ___ ich mehr Sport machen soll.',
        options: [
          { id: 'a', de: 'weil' },
          { id: 'b', de: 'wenn' },
          { id: 'c', de: 'ob' },
          { id: 'd', de: 'dass' },
        ],
        correct: 'd',
        explanationAr:
          'الإجابة الصحيحة هي "dass" (أنّ) لأننا ننقل كلام الطبيب. بعد أفعال القول مثل "sagen" نستخدم "dass" لتقديم المحتوى. لاحظ أن الفعل "soll" يأتي في نهاية الجملة الفرعية. المعنى: قال الطبيب إنني يجب أن أمارس المزيد من الرياضة.',
      },
      {
        id: 'sb-2-5',
        contextDe: '___ du morgen zum Arzt gehst, vergiss deine Versichertenkarte nicht.',
        options: [
          { id: 'a', de: 'Weil' },
          { id: 'b', de: 'Dass' },
          { id: 'c', de: 'Wenn' },
          { id: 'd', de: 'Ob' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي "Wenn" (عندما/إذا). تُستخدم "wenn" للتعبير عن شرط أو وقت في المستقبل. الجملة تقول: عندما تذهب غداً للطبيب، لا تنسَ بطاقة التأمين الصحي. لاحظ أن الفعل "gehst" يأتي في نهاية الجملة الفرعية بعد "wenn".',
      },
      {
        id: 'sb-2-6',
        contextDe: 'Ich dusche ___ jeden Morgen, bevor ich zur Arbeit gehe.',
        options: [
          { id: 'a', de: 'mich' },
          { id: 'b', de: 'mir' },
          { id: 'c', de: 'sich' },
          { id: 'd', de: 'uns' },
        ],
        correct: 'a',
        explanationAr:
          'الإجابة الصحيحة هي "mich" لأن "sich duschen" فعل انعكاسي (reflexives Verb) ويأخذ ضمير الـ Akkusativ. مع الضمير "ich" نستخدم "mich" في الـ Akkusativ. تصريف الضمائر الانعكاسية: ich → mich, du → dich, er/sie/es → sich, wir → uns, ihr → euch, sie/Sie → sich. المعنى: أستحم كل صباح قبل أن أذهب للعمل.',
      },
      {
        id: 'sb-2-7',
        contextDe: 'Er fühlt ___ heute nicht gut. Er hat Kopfschmerzen.',
        options: [
          { id: 'a', de: 'mich' },
          { id: 'b', de: 'sich' },
          { id: 'c', de: 'ihm' },
          { id: 'd', de: 'ihn' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي "sich" لأن "sich fühlen" (يشعر) فعل انعكاسي. مع الضمير "er" (هو) نستخدم الضمير الانعكاسي "sich". القاعدة: في الأفعال الانعكاسية، الضمير الانعكاسي لـ er/sie/es هو دائماً "sich". المعنى: هو لا يشعر بحال جيدة اليوم. لديه صداع.',
      },
      {
        id: 'sb-2-8',
        contextDe: 'Meine Nachbarin hat ___ über den Lärm beschwert.',
        options: [
          { id: 'a', de: 'mich' },
          { id: 'b', de: 'ihr' },
          { id: 'c', de: 'sich' },
          { id: 'd', de: 'sie' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي "sich" لأن "sich beschweren" (يشتكي) فعل انعكاسي. الفاعل هنا "Meine Nachbarin" (جارتي) وهي مؤنث مفرد (sie)، والضمير الانعكاسي لـ sie هو "sich". الفعل يُستخدم مع "über + Akkusativ" للتعبير عما نشتكي منه. المعنى: جارتي اشتكت من الضوضاء.',
      },
    ],

    // --------------------------------------------------------
    // SCHREIBEN (Writing) — 2 tasks
    // --------------------------------------------------------
    schreibenParts: [
      {
        id: 'sch-2-1',
        titleDe: 'Termin beim Arzt absagen',
        promptDe:
          'Sie haben einen Termin beim Zahnarzt am Freitag, den 20. Juni, um 10:00 Uhr. ' +
          'Aber Sie können nicht kommen, weil Sie an diesem Tag arbeiten müssen. ' +
          'Schreiben Sie eine E-Mail an die Zahnarztpraxis Dr. Klein. ' +
          'Schreiben Sie etwas zu folgenden Punkten:\n' +
          '- Warum schreiben Sie?\n' +
          '- Warum können Sie nicht kommen?\n' +
          '- Bitten Sie um einen neuen Termin.\n' +
          '- Wann haben Sie Zeit?',
        promptAr:
          'لديك موعد عند طبيب الأسنان يوم الجمعة 20 يونيو الساعة 10:00. ' +
          'لكنك لا تستطيع الحضور لأنك يجب أن تعمل في ذلك اليوم. ' +
          'اكتب بريداً إلكترونياً لعيادة طبيب الأسنان د. كلاين. ' +
          'اكتب شيئاً عن النقاط التالية:\n' +
          '- لماذا تكتب؟\n' +
          '- لماذا لا تستطيع الحضور؟\n' +
          '- اطلب موعداً جديداً.\n' +
          '- متى لديك وقت؟',
        redemittel: [
          'Sehr geehrte Damen und Herren,',
          'ich schreibe Ihnen wegen meines Termins am ...',
          'Leider kann ich den Termin nicht wahrnehmen.',
          'Der Grund ist, dass ich ... muss.',
          'Ich muss an diesem Tag arbeiten / verreisen.',
          'Können Sie mir bitte einen neuen Termin geben?',
          'Ich habe am ... / in der nächsten Woche Zeit.',
          'Am besten passt es mir am Vormittag / Nachmittag.',
          'Vielen Dank für Ihr Verständnis.',
          'Mit freundlichen Grüßen',
        ],
        sampleDe:
          'Sehr geehrte Damen und Herren,\n\n' +
          'ich schreibe Ihnen wegen meines Termins am Freitag, den 20. Juni, um 10:00 Uhr. ' +
          'Leider kann ich diesen Termin nicht wahrnehmen, weil ich an diesem Tag arbeiten muss. ' +
          'Mein Chef hat mir gesagt, dass ich am Freitag einen wichtigen Termin bei der Arbeit habe.\n\n' +
          'Können Sie mir bitte einen neuen Termin geben? ' +
          'Ich habe in der nächsten Woche Zeit. Am besten passt es mir am Montag oder Mittwoch am Vormittag. ' +
          'Am Nachmittag habe ich ab 14:00 Uhr auch Zeit.\n\n' +
          'Vielen Dank für Ihr Verständnis.\n\n' +
          'Mit freundlichen Grüßen\nFatima Al-Hussein',
        sampleAr:
          'سيداتي وسادتي الأعزاء،\n\n' +
          'أكتب إليكم بخصوص موعدي يوم الجمعة 20 يونيو الساعة 10:00. ' +
          'للأسف لا أستطيع الحضور لهذا الموعد لأنني يجب أن أعمل في ذلك اليوم. ' +
          'أخبرني مديري أن لدي موعداً مهماً في العمل يوم الجمعة.\n\n' +
          'هل يمكنكم من فضلكم إعطائي موعداً جديداً؟ ' +
          'لدي وقت في الأسبوع القادم. يناسبني أفضل يوم الاثنين أو الأربعاء صباحاً. ' +
          'بعد الظهر لدي وقت أيضاً من الساعة 14:00.\n\n' +
          'شكراً جزيلاً على تفهمكم.\n\n' +
          'مع أطيب التحيات\nفاطمة الحسين',
      },
      {
        id: 'sch-2-2',
        titleDe: 'Brief an den Nachbarn: Lärm',
        promptDe:
          'Ihr Nachbar in der Wohnung über Ihnen macht jeden Abend ab 22:00 Uhr sehr laute Musik. ' +
          'Sie können nicht schlafen und Ihre Kinder werden davon wach. ' +
          'Schreiben Sie einen freundlichen Brief an Ihren Nachbarn, Herrn Fischer. ' +
          'Schreiben Sie etwas zu folgenden Punkten:\n' +
          '- Was ist das Problem?\n' +
          '- Warum stört es Sie?\n' +
          '- Was soll Ihr Nachbar machen?\n' +
          '- Schlagen Sie ein Gespräch vor.',
        promptAr:
          'جارك في الشقة فوقك يشغّل موسيقى عالية جداً كل مساء من الساعة 22:00. ' +
          'لا تستطيع النوم وأطفالك يستيقظون من ذلك. ' +
          'اكتب رسالة ودية لجارك السيد فيشر. ' +
          'اكتب شيئاً عن النقاط التالية:\n' +
          '- ما هي المشكلة؟\n' +
          '- لماذا يزعجك ذلك؟\n' +
          '- ماذا يجب أن يفعل جارك؟\n' +
          '- اقترح محادثة.',
        redemittel: [
          'Lieber Herr / Liebe Frau ...,',
          'ich schreibe Ihnen, weil ich ein Problem habe.',
          'Leider ist es in Ihrer Wohnung abends sehr laut.',
          'Die Musik stört mich / meine Familie / meine Kinder.',
          'Ich kann leider nicht schlafen, weil ...',
          'Könnten Sie bitte die Musik leiser machen?',
          'Ab 22:00 Uhr gilt die Nachtruhe.',
          'Können wir vielleicht darüber sprechen?',
          'Ich würde mich über ein Gespräch freuen.',
          'Vielen Dank für Ihr Verständnis.',
        ],
        sampleDe:
          'Lieber Herr Fischer,\n\n' +
          'ich schreibe Ihnen, weil ich ein Problem habe, und ich hoffe, dass wir eine gute Lösung finden können. ' +
          'Leider ist es in Ihrer Wohnung abends oft sehr laut. Seit einigen Wochen höre ich ab 22:00 Uhr laute Musik. ' +
          'Das stört mich und meine Familie sehr. Meine Kinder sind noch klein und werden von der Musik wach. ' +
          'Ich muss auch früh aufstehen, weil ich um 6:00 Uhr zur Arbeit fahre.\n\n' +
          'Ich habe nichts gegen Musik, aber könnten Sie bitte ab 22:00 Uhr die Musik leiser machen? ' +
          'Ab 22:00 Uhr gilt in Deutschland die Nachtruhe.\n\n' +
          'Vielleicht können wir uns einmal treffen und darüber sprechen? ' +
          'Ich würde mich über ein kurzes Gespräch freuen. Sie können gerne bei mir klingeln oder mir schreiben.\n\n' +
          'Vielen Dank für Ihr Verständnis.\n\n' +
          'Viele Grüße\nIhr Nachbar, Omar Saleh\n(Wohnung 3a, 2. Stock)',
        sampleAr:
          'السيد فيشر العزيز،\n\n' +
          'أكتب إليك لأن لدي مشكلة وآمل أن نتمكن من إيجاد حل جيد. ' +
          'للأسف الصوت في شقتك مرتفع جداً في المساء. منذ عدة أسابيع أسمع موسيقى عالية بعد الساعة 22:00. ' +
          'هذا يزعجني وعائلتي كثيراً. أطفالي ما زالوا صغاراً ويستيقظون من الموسيقى. ' +
          'كما أنني يجب أن أستيقظ باكراً لأنني أذهب للعمل الساعة 6:00.\n\n' +
          'ليس لدي شيء ضد الموسيقى، لكن هل يمكنك من فضلك تخفيض صوت الموسيقى بعد الساعة 22:00؟ ' +
          'في ألمانيا يبدأ وقت الهدوء الليلي (Nachtruhe) من الساعة 22:00.\n\n' +
          'ربما يمكننا أن نلتقي ونتحدث عن ذلك؟ ' +
          'سأكون سعيداً بمحادثة قصيرة. يمكنك أن تطرق بابي أو تكتب لي.\n\n' +
          'شكراً جزيلاً على تفهمك.\n\n' +
          'مع تحياتي\nجارك، عمر صالح\n(شقة 3أ، الطابق الثاني)',
      },
    ],

    // --------------------------------------------------------
    // SPRECHEN (Speaking) — 2 tasks
    // --------------------------------------------------------
    sprechenParts: [
      {
        id: 'spr-2-1',
        titleDe: 'Beim Arzt: Symptome beschreiben',
        promptDe:
          'Sie sind krank und gehen zum Arzt. Der Arzt fragt: "Was fehlt Ihnen?" ' +
          'Beschreiben Sie Ihre Symptome. Beantworten Sie die Fragen des Arztes:\n' +
          '- Was für Schmerzen haben Sie?\n' +
          '- Seit wann sind Sie krank?\n' +
          '- Haben Sie Fieber?\n' +
          '- Nehmen Sie Medikamente?\n' +
          '- Haben Sie Allergien?',
        promptAr:
          'أنت مريض وتذهب إلى الطبيب. يسألك الطبيب: "ما الذي يؤلمك؟" ' +
          'صِف أعراضك. أجب على أسئلة الطبيب:\n' +
          '- ما نوع الألم الذي لديك؟\n' +
          '- منذ متى أنت مريض؟\n' +
          '- هل لديك حرارة؟\n' +
          '- هل تتناول أدوية؟\n' +
          '- هل لديك حساسية؟',
        redemittel: [
          'Ich habe Kopfschmerzen / Bauchschmerzen / Halsschmerzen / Rückenschmerzen.',
          'Mir tut der Kopf / der Bauch / der Rücken weh.',
          'Ich habe seit ... Tagen / seit gestern / seit letzter Woche Schmerzen.',
          'Ich habe Fieber / Husten / Schnupfen.',
          'Ich fühle mich nicht gut / schwach / müde.',
          'Mir ist schwindelig / übel.',
          'Ich nehme keine Medikamente / Ich nehme ... gegen ...',
          'Ich habe eine Allergie gegen ...',
          'Ich bin gegen ... allergisch.',
          'Können Sie mir bitte ein Rezept / eine Krankschreibung geben?',
        ],
        sampleDe:
          'Arzt: Guten Tag, was fehlt Ihnen?\n' +
          'Patient: Guten Tag, Herr Doktor. Ich fühle mich nicht gut. Ich habe starke Kopfschmerzen und Halsschmerzen. ' +
          'Und ich habe auch Husten und Schnupfen.\n\n' +
          'Arzt: Seit wann haben Sie diese Beschwerden?\n' +
          'Patient: Seit drei Tagen. Es wird leider nicht besser.\n\n' +
          'Arzt: Haben Sie Fieber gemessen?\n' +
          'Patient: Ja, ich habe gestern Abend 38,5 Grad gemessen. Heute Morgen war es 38,2 Grad.\n\n' +
          'Arzt: Nehmen Sie Medikamente?\n' +
          'Patient: Ja, ich habe Ibuprofen gegen die Kopfschmerzen genommen. Aber es hilft nicht so gut.\n\n' +
          'Arzt: Haben Sie Allergien?\n' +
          'Patient: Ja, ich bin gegen Penicillin allergisch.\n\n' +
          'Arzt: Gut, das notiere ich. Ich verschreibe Ihnen ein Medikament. Und Sie brauchen Ruhe. ' +
          'Ich schreibe Sie für eine Woche krank.\n' +
          'Patient: Vielen Dank, Herr Doktor. Können Sie mir bitte auch eine Krankschreibung für meinen Arbeitgeber geben?\n' +
          'Arzt: Ja, natürlich. Die bekommen Sie an der Rezeption.',
        sampleAr:
          'الطبيب: يوم سعيد، ما الذي يؤلمك؟\n' +
          'المريض: يوم سعيد يا دكتور. لا أشعر بحال جيدة. لدي صداع شديد وألم في الحلق. ' +
          'ولدي أيضاً سعال وزكام.\n\n' +
          'الطبيب: منذ متى لديك هذه الأعراض؟\n' +
          'المريض: منذ ثلاثة أيام. للأسف لا يتحسن.\n\n' +
          'الطبيب: هل قست حرارتك؟\n' +
          'المريض: نعم، قست أمس مساءً 38.5 درجة. هذا الصباح كانت 38.2 درجة.\n\n' +
          'الطبيب: هل تتناول أدوية؟\n' +
          'المريض: نعم، تناولت إيبوبروفين ضد الصداع. لكنه لا يساعد كثيراً.\n\n' +
          'الطبيب: هل لديك حساسية؟\n' +
          'المريض: نعم، لدي حساسية من البنسلين.\n\n' +
          'الطبيب: حسناً، سأدوّن ذلك. سأصف لك دواءً. وأنت بحاجة للراحة. ' +
          'سأكتب لك إجازة مرضية لمدة أسبوع.\n' +
          'المريض: شكراً جزيلاً يا دكتور. هل يمكنك إعطائي أيضاً تقرير مرضي لصاحب العمل؟\n' +
          'الطبيب: نعم بالطبع. ستحصل عليه في الاستقبال.',
      },
      {
        id: 'spr-2-2',
        titleDe: 'Etwas gemeinsam planen: Umzug organisieren',
        promptDe:
          'Sie ziehen nächsten Monat in eine neue Wohnung um. Ihr Freund / Ihre Freundin hilft Ihnen. ' +
          'Planen Sie den Umzug zusammen. Sprechen Sie über folgende Punkte:\n' +
          '- Wann soll der Umzug sein?\n' +
          '- Brauchen Sie ein Umzugsunternehmen oder machen Sie es selbst?\n' +
          '- Was muss man vor dem Umzug erledigen?\n' +
          '- Wer kann noch helfen?\n' +
          '- Was brauchen Sie am Umzugstag?',
        promptAr:
          'ستنتقل الشهر القادم إلى شقة جديدة. صديقك / صديقتك يساعدك. ' +
          'خططوا للانتقال معاً. تحدثوا عن النقاط التالية:\n' +
          '- متى يجب أن يكون الانتقال؟\n' +
          '- هل تحتاج شركة نقل أم ستفعل ذلك بنفسك؟\n' +
          '- ما الذي يجب إنجازه قبل الانتقال؟\n' +
          '- من يستطيع المساعدة أيضاً؟\n' +
          '- ما الذي تحتاجه يوم الانتقال؟',
        redemittel: [
          'Ich schlage vor, dass wir den Umzug am ... machen.',
          'Am Wochenende / Am Samstag passt es am besten.',
          'Wir könnten ein Umzugsunternehmen engagieren.',
          'Das ist aber teuer. Vielleicht machen wir es selbst.',
          'Wir brauchen einen Transporter / ein großes Auto.',
          'Vor dem Umzug müssen wir ... / muss ich ...',
          'Ich muss mich bei der neuen Adresse anmelden.',
          'Wir sollten Kartons und Klebeband kaufen.',
          'Ich kann ... fragen, ob er/sie helfen kann.',
          'Am Umzugstag brauchen wir ...',
        ],
        sampleDe:
          'A: Hi! Ich ziehe nächsten Monat um. Kannst du mir helfen?\n' +
          'B: Ja klar, gerne! Wann soll der Umzug sein?\n' +
          'A: Ich denke, am Samstag, den 5. Juli. Am Wochenende haben alle Zeit.\n' +
          'B: Gute Idee. Brauchst du ein Umzugsunternehmen?\n' +
          'A: Nein, das ist zu teuer. Ich möchte es selbst machen. Aber ich brauche einen Transporter.\n' +
          'B: Mein Bruder hat einen großen Transporter. Ich kann ihn fragen.\n' +
          'A: Das wäre toll! Was muss ich vor dem Umzug noch machen?\n' +
          'B: Du musst Kartons kaufen und alles einpacken. Und du musst die alte Wohnung kündigen.\n' +
          'A: Stimmt. Und ich muss mich bei der neuen Adresse beim Einwohnermeldeamt anmelden.\n' +
          'B: Genau. Du musst auch den Strom und das Internet ummelden. Wer kann noch helfen?\n' +
          'A: Ich frage unsere Freunde Hassan und Maria. Vielleicht können sie auch kommen.\n' +
          'B: Super. Am Umzugstag brauchen wir Klebeband, eine Sackkarre und vielleicht Decken für die Möbel.\n' +
          'A: Und wir brauchen Essen und Trinken für die Helfer! Ich bestelle Pizza für alle.\n' +
          'B: Perfekt, das klingt nach einem guten Plan!',
        sampleAr:
          'أ: مرحباً! سأنتقل الشهر القادم. هل يمكنك مساعدتي؟\n' +
          'ب: نعم بالطبع، بكل سرور! متى يجب أن يكون الانتقال؟\n' +
          'أ: أعتقد يوم السبت 5 يوليو. في نهاية الأسبوع لدى الجميع وقت.\n' +
          'ب: فكرة جيدة. هل تحتاج شركة نقل؟\n' +
          'أ: لا، هذا غالي جداً. أريد أن أفعل ذلك بنفسي. لكنني أحتاج سيارة نقل.\n' +
          'ب: أخي لديه سيارة نقل كبيرة. يمكنني أن أسأله.\n' +
          'أ: سيكون ذلك رائعاً! ماذا يجب أن أفعل قبل الانتقال؟\n' +
          'ب: يجب أن تشتري صناديق كرتونية وتحزم كل شيء. ويجب أن تُلغي عقد الشقة القديمة.\n' +
          'أ: صحيح. ويجب أن أسجّل نفسي في العنوان الجديد في مكتب تسجيل السكان.\n' +
          'ب: بالضبط. يجب أيضاً أن تُغيّر عنوان الكهرباء والإنترنت. من يستطيع المساعدة أيضاً؟\n' +
          'أ: سأسأل أصدقاءنا حسن وماريا. ربما يستطيعان أيضاً الحضور.\n' +
          'ب: ممتاز. يوم الانتقال نحتاج شريط لاصق وعربة يدوية وربما أغطية للأثاث.\n' +
          'أ: ونحتاج طعاماً وشراباً للمساعدين! سأطلب بيتزا للجميع.\n' +
          'ب: ممتاز، يبدو خطة جيدة!',
      },
    ],
  },
];
