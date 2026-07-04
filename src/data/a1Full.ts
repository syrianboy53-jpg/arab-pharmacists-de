// A1 Full Model Tests - Start Deutsch 1 / Goethe A1
// 2 complete exam models for Arabic speakers

export const a1Models = [
  {
    id: "goethe-a1-1",
    titleAr: "نموذج 1 — الحياة اليومية",
    titleDe: "Modelltest 1 — Alltag",
    level: "A1",
    durationMin: 65,
    readingPassages: [
      {
        id: "lese-1",
        titleDe: "Schwarzes Brett im Supermarkt",
        textDe: "Anzeige 1: Hallo! Ich heisse Monika. Ich suche eine Babysitterin fuer meine Tochter (3 Jahre). Montag und Mittwoch, 14:00-18:00 Uhr. Bitte rufen Sie mich an: 0176 234 56 78.\n\nAnzeige 2: Verkaufe Fahrrad, blau, sehr gut. Preis: 50 Euro. Nur Abholung! Berliner Strasse 12. Tel.: 0151 987 65 43.\n\nAnzeige 3: Deutschkurs fuer Anfaenger! Ab 1. Oktober, jeden Dienstag und Donnerstag, 18:00-19:30 Uhr. Volkshochschule, Raum 201. Kosten: 80 Euro (8 Wochen).",
        questions: [
          { id: "q1", promptDe: "Wann braucht Monika eine Babysitterin?", options: [{ id: "a", de: "Am Wochenende" }, { id: "b", de: "Montag und Mittwoch nachmittags" }, { id: "c", de: "Jeden Tag" }, { id: "d", de: "Dienstag und Donnerstag" }], correct: "b", explanationAr: "مونيكا تحتاج جليسة يومي الاثنين والأربعاء من 14:00 إلى 18:00" },
          { id: "q2", promptDe: "Wie viel kostet das Fahrrad?", options: [{ id: "a", de: "30 Euro" }, { id: "b", de: "40 Euro" }, { id: "c", de: "50 Euro" }, { id: "d", de: "80 Euro" }], correct: "c", explanationAr: "السعر مكتوب بوضوح: Preis: 50 Euro" },
          { id: "q3", promptDe: "Wann beginnt der Deutschkurs?", options: [{ id: "a", de: "Am 1. September" }, { id: "b", de: "Am 1. Oktober" }, { id: "c", de: "Am 1. November" }, { id: "d", de: "Am 1. Dezember" }], correct: "b", explanationAr: "الإعلان يقول: Ab 1. Oktober = من أول أكتوبر" }
        ]
      },
      {
        id: "lese-2",
        titleDe: "E-Mail von einer Freundin",
        textDe: "Liebe Sara,\n\nam Samstag mache ich eine Party! Ich habe Geburtstag. Die Party beginnt um 19:00 Uhr. Meine Adresse ist: Hauptstrasse 45, 2. Stock. Bitte bring etwas zu trinken mit. Es gibt Pizza und Kuchen.\n\nKannst du kommen? Bitte antworte bis Donnerstag.\n\nViele Gruesse\nAnna",
        questions: [
          { id: "q4", promptDe: "Warum macht Anna eine Party?", options: [{ id: "a", de: "Sie hat eine neue Wohnung." }, { id: "b", de: "Sie hat Geburtstag." }, { id: "c", de: "Sie hat einen neuen Job." }, { id: "d", de: "Es ist Silvester." }], correct: "b", explanationAr: "آنا تقول: Ich habe Geburtstag = عندي عيد ميلاد" },
          { id: "q5", promptDe: "Was soll Sara mitbringen?", options: [{ id: "a", de: "Pizza" }, { id: "b", de: "Kuchen" }, { id: "c", de: "Etwas zu trinken" }, { id: "d", de: "Blumen" }], correct: "c", explanationAr: "طلبت آنا: Bitte bring etwas zu trinken mit = أحضري شيئاً للشرب" },
          { id: "q6", promptDe: "Wann beginnt die Party?", options: [{ id: "a", de: "Um 18:00 Uhr" }, { id: "b", de: "Um 19:00 Uhr" }, { id: "c", de: "Um 20:00 Uhr" }, { id: "d", de: "Um 21:00 Uhr" }], correct: "b", explanationAr: "Die Party beginnt um 19:00 Uhr = الحفلة تبدأ الساعة 7 مساءً" }
        ]
      },
      {
        id: "lese-3",
        titleDe: "Busfahrplan",
        textDe: "Linie 42 — Richtung Hauptbahnhof\n\nHaltestelle Marktplatz:\nMontag-Freitag: 6:15, 6:45, 7:15, 7:45, dann alle 30 Minuten bis 22:15\nSamstag: 7:00, 8:00, dann jede Stunde bis 23:00\nSonntag: 9:00, 10:00, dann jede Stunde bis 21:00\n\nFahrzeit bis Hauptbahnhof: ca. 25 Minuten\nEinzelfahrt: 2,80 Euro\nTageskarte: 7,50 Euro",
        questions: [
          { id: "q7", promptDe: "Wann faehrt der erste Bus am Montag?", options: [{ id: "a", de: "Um 6:00 Uhr" }, { id: "b", de: "Um 6:15 Uhr" }, { id: "c", de: "Um 7:00 Uhr" }, { id: "d", de: "Um 7:15 Uhr" }], correct: "b", explanationAr: "أول باص يوم الاثنين: 6:15" },
          { id: "q8", promptDe: "Wie lange dauert die Fahrt zum Hauptbahnhof?", options: [{ id: "a", de: "15 Minuten" }, { id: "b", de: "20 Minuten" }, { id: "c", de: "25 Minuten" }, { id: "d", de: "30 Minuten" }], correct: "c", explanationAr: "الرحلة تستغرق حوالي 25 دقيقة: ca. 25 Minuten" },
          { id: "q9", promptDe: "Wie viel kostet eine Tageskarte?", options: [{ id: "a", de: "2,80 Euro" }, { id: "b", de: "5,00 Euro" }, { id: "c", de: "7,50 Euro" }, { id: "d", de: "10,00 Euro" }], correct: "c", explanationAr: "بطاقة اليوم الكامل: Tageskarte: 7,50 Euro" },
          { id: "q10", promptDe: "Wann faehrt am Sonntag der erste Bus?", options: [{ id: "a", de: "Um 6:15 Uhr" }, { id: "b", de: "Um 7:00 Uhr" }, { id: "c", de: "Um 8:00 Uhr" }, { id: "d", de: "Um 9:00 Uhr" }], correct: "d", explanationAr: "يوم الأحد أول باص الساعة 9:00" }
        ]
      }
    ],
    sprachbausteine: [
      { id: "sb-1", contextDe: "Ich ___ heute meine Mutter.", options: [{ id: "a", de: "besuche" }, { id: "b", de: "besuchst" }, { id: "c", de: "besucht" }, { id: "d", de: "besuchen" }], correct: "a", explanationAr: "مع ich نستخدم التصريف الأول: ich besuche (أنا أزور)" },
      { id: "sb-2", contextDe: "Das ist ___ Buch.", options: [{ id: "a", de: "ein" }, { id: "b", de: "eine" }, { id: "c", de: "einer" }, { id: "d", de: "einen" }], correct: "a", explanationAr: "Buch محايد (das Buch) لذلك نستخدم ein في حالة Nominativ" },
      { id: "sb-3", contextDe: "Wir wohnen ___ Berlin.", options: [{ id: "a", de: "auf" }, { id: "b", de: "in" }, { id: "c", de: "an" }, { id: "d", de: "nach" }], correct: "b", explanationAr: "نستخدم in مع المدن: Wir wohnen in Berlin = نسكن في برلين" },
      { id: "sb-4", contextDe: "Er ___ zwei Kinder.", options: [{ id: "a", de: "hast" }, { id: "b", de: "haben" }, { id: "c", de: "hat" }, { id: "d", de: "habt" }], correct: "c", explanationAr: "مع er نستخدم hat: er hat zwei Kinder = لديه طفلان" },
      { id: "sb-5", contextDe: "Ich trinke gern ___ Kaffee.", options: [{ id: "a", de: "der" }, { id: "b", de: "die" }, { id: "c", de: "das" }, { id: "d", de: "-" }], correct: "d", explanationAr: "مع الأشياء العامة بدون أداة: Ich trinke gern Kaffee (بدون أداة تعريف)" },
      { id: "sb-6", contextDe: "Meine Schwester ___ Lehrerin.", options: [{ id: "a", de: "ist" }, { id: "b", de: "bin" }, { id: "c", de: "bist" }, { id: "d", de: "sind" }], correct: "a", explanationAr: "مع المفرد المؤنث (sie/meine Schwester) نستخدم ist" }
    ],
    schreibenParts: [
      {
        id: "sch-1",
        titleDe: "Anmeldeformular ausfuellen",
        promptDe: "Sie melden sich fuer einen Deutschkurs an. Fuellen Sie das Formular aus.",
        promptAr: "سجّل نفسك في دورة لغة ألمانية. املأ الاستمارة.",
        redemittel: ["Mein Name ist...", "Ich wohne in...", "Meine Telefonnummer ist...", "Ich bin ... Jahre alt.", "Ich komme aus...", "Meine E-Mail-Adresse ist..."],
        sampleDe: "Vorname: Ahmad\nNachname: Hassan\nGeburtsdatum: 15.03.1990\nAdresse: Berliner Strasse 23, 10115 Berlin\nTelefon: 0176 123 45 67\nE-Mail: ahmad.hassan@email.de\nStaatsangehoerigkeit: Syrisch\nBeruf: Ingenieur\nSprachkenntnisse: Arabisch (Muttersprache), Englisch (gut)\nGewuenschter Kurs: A1 Integrationskurs\nBeginn: 1. Oktober 2024",
        sampleAr: "الاسم الأول: أحمد\nاسم العائلة: حسن\nتاريخ الميلاد: 15.03.1990\nالعنوان: شارع برلينر 23، 10115 برلين\nالهاتف: 0176 123 45 67\nالبريد الإلكتروني: ahmad.hassan@email.de\nالجنسية: سوري\nالمهنة: مهندس\nالمعارف اللغوية: العربية (لغة أم)، الإنجليزية (جيد)\nالدورة المطلوبة: A1 دورة اندماج\nالبداية: 1 أكتوبر 2024"
      },
      {
        id: "sch-2",
        titleDe: "E-Mail an einen Freund",
        promptDe: "Schreiben Sie eine E-Mail an Ihren Freund. Laden Sie ihn zum Kaffee ein.",
        promptAr: "اكتب بريداً إلكترونياً لصديقك. ادعُه لشرب القهوة.",
        redemittel: ["Lieber/Liebe...", "Wie geht es dir?", "Hast du am ... Zeit?", "Wir koennen ... gehen.", "Ich freue mich auf dich!", "Viele Gruesse"],
        sampleDe: "Lieber Omar,\n\nwie geht es dir? Ich hoffe, dir geht es gut.\n\nHast du am Samstag Nachmittag Zeit? Ich moechte dich zum Kaffee einladen. Wir koennen in das Cafe am Marktplatz gehen. Es ist sehr schoen dort. Das Cafe heisst 'Kaffeepause'.\n\nWir koennen um 15:00 Uhr dort sein. Magst du Kuchen? Sie haben sehr guten Apfelkuchen!\n\nBitte schreib mir, ob du kommen kannst.\n\nViele Gruesse\nAhmad",
        sampleAr: "عزيزي عمر،\n\nكيف حالك؟ أتمنى أنك بخير.\n\nهل لديك وقت يوم السبت بعد الظهر؟ أريد أن أدعوك لشرب القهوة. يمكننا الذهاب إلى المقهى في ساحة السوق. إنه جميل جداً هناك. اسم المقهى 'استراحة القهوة'.\n\nيمكننا أن نكون هناك الساعة 3:00. هل تحب الكعك؟ لديهم كعكة تفاح ممتازة!\n\nأرجو أن تكتب لي إذا كنت تستطيع المجيء.\n\nتحيات كثيرة\nأحمد"
      }
    ],
    sprechenParts: [
      {
        id: "spr-1",
        titleDe: "Sich vorstellen",
        promptDe: "Stellen Sie sich bitte vor: Name, Alter, Herkunft, Wohnort, Beruf, Hobbys.",
        promptAr: "قدّم نفسك: الاسم، العمر، البلد الأصلي، مكان السكن، المهنة، الهوايات.",
        redemittel: ["Mein Name ist...", "Ich bin ... Jahre alt.", "Ich komme aus...", "Ich wohne in...", "Ich bin ... von Beruf.", "Mein Hobby ist...", "Ich spreche..."],
        sampleDe: "Guten Tag, mein Name ist Ahmad Hassan. Ich bin 34 Jahre alt. Ich komme aus Syrien, aus Damaskus. Jetzt wohne ich in Berlin. Ich bin Ingenieur von Beruf, aber jetzt lerne ich Deutsch. Ich besuche einen Deutschkurs an der Volkshochschule. Meine Hobbys sind Fussball spielen und Kochen. Ich spreche Arabisch und ein bisschen Englisch. Ich lerne seit drei Monaten Deutsch. Ich bin verheiratet und habe zwei Kinder.",
        sampleAr: "مساء الخير، اسمي أحمد حسن. عمري 34 سنة. أنا من سوريا، من دمشق. الآن أسكن في برلين. أنا مهندس بالمهنة، لكن الآن أتعلم الألمانية. أحضر دورة ألمانية في مدرسة الشعب. هواياتي كرة القدم والطبخ. أتكلم العربية وقليلاً من الإنجليزية. أتعلم الألمانية منذ ثلاثة أشهر. أنا متزوج ولدي طفلان."
      },
      {
        id: "spr-2",
        titleDe: "Fragen zum Alltag",
        promptDe: "Beantworten Sie Fragen zu Ihrem Tagesablauf: Wann stehen Sie auf? Was fruehstuecken Sie? Was machen Sie am Wochenende?",
        promptAr: "أجب عن أسئلة حول يومك: متى تستيقظ؟ ماذا تتناول في الفطور؟ ماذا تفعل في نهاية الأسبوع؟",
        redemittel: ["Ich stehe um ... Uhr auf.", "Zum Fruehstueck esse ich...", "Dann gehe ich...", "Am Nachmittag...", "Am Abend...", "Am Wochenende..."],
        sampleDe: "Ich stehe normalerweise um 7 Uhr auf. Dann dusche ich und fruehstuecke. Zum Fruehstueck esse ich Brot mit Kaese und trinke Tee. Um 8:30 Uhr gehe ich zum Deutschkurs. Der Kurs ist von 9 bis 12 Uhr. Nach dem Kurs gehe ich einkaufen. Am Nachmittag mache ich Hausaufgaben und lerne neue Woerter. Am Abend koche ich fuer meine Familie. Wir essen zusammen. Am Wochenende gehe ich mit meinen Kindern in den Park oder besuche Freunde.",
        sampleAr: "أستيقظ عادة الساعة 7. ثم أستحم وأتناول الفطور. في الفطور آكل خبزاً مع جبن وأشرب شاياً. الساعة 8:30 أذهب إلى دورة الألمانية. الدورة من 9 إلى 12. بعد الدورة أذهب للتسوق. بعد الظهر أعمل الواجبات وأتعلم كلمات جديدة. في المساء أطبخ لعائلتي. نأكل معاً. في نهاية الأسبوع أذهب مع أطفالي إلى الحديقة أو أزور أصدقاء."
      }
    ]
  },
  {
    id: "goethe-a1-2",
    titleAr: "نموذج 2 — التسوق والطعام",
    titleDe: "Modelltest 2 — Einkaufen und Essen",
    level: "A1",
    durationMin: 65,
    readingPassages: [
      {
        id: "lese-4",
        titleDe: "Speisekarte — Restaurant Zum goldenen Loeffel",
        textDe: "Mittagskarte\n\nVorspeisen:\nTomatensuppe ................. 4,50 Euro\nGemischter Salat ............. 5,20 Euro\n\nHauptgerichte:\nSchnitzel mit Pommes ......... 11,90 Euro\nSpaghetti Bolognese .......... 9,80 Euro\nGemuese-Risotto (vegetarisch)  10,50 Euro\nHaehnchen mit Reis ........... 10,90 Euro\n\nGetraenke:\nApfelsaft (0,3 l) ........... 3,20 Euro\nCola (0,3 l) ................ 2,80 Euro\nMineralwasser (0,5 l) ....... 2,50 Euro\nKaffee ...................... 2,90 Euro\n\nNachspeisen:\nSchokoladenkuchen ........... 4,80 Euro\nEis (3 Kugeln) .............. 3,90 Euro\n\nMittagsmenue (Suppe + Hauptgericht + Getraenk): 14,90 Euro\nOeffnungszeiten: Mo-Sa 11:30-22:00 Uhr, Sonntag Ruhetag",
        questions: [
          { id: "q11", promptDe: "Sie essen kein Fleisch. Was koennen Sie bestellen?", options: [{ id: "a", de: "Schnitzel mit Pommes" }, { id: "b", de: "Haehnchen mit Reis" }, { id: "c", de: "Gemuese-Risotto" }, { id: "d", de: "Spaghetti Bolognese" }], correct: "c", explanationAr: "الوحيد بدون لحم هو ريزوتو الخضار (vegetarisch = نباتي)" },
          { id: "q12", promptDe: "Was kostet das Mittagsmenue?", options: [{ id: "a", de: "9,80 Euro" }, { id: "b", de: "11,90 Euro" }, { id: "c", de: "14,90 Euro" }, { id: "d", de: "19,90 Euro" }], correct: "c", explanationAr: "قائمة الغداء: Mittagsmenue = 14,90 Euro" },
          { id: "q13", promptDe: "Kann man am Sonntag essen gehen?", options: [{ id: "a", de: "Ja, von 11:30 bis 22:00 Uhr" }, { id: "b", de: "Ja, von 9:00 bis 20:00 Uhr" }, { id: "c", de: "Nein, Sonntag ist Ruhetag" }, { id: "d", de: "Ja, aber nur mittags" }], correct: "c", explanationAr: "Sonntag Ruhetag = يوم الأحد يوم راحة (المطعم مغلق)" }
        ]
      },
      {
        id: "lese-5",
        titleDe: "Einkaufszettel und Kassenbon",
        textDe: "Einkaufszettel von Maria:\n- 1 kg Aepfel\n- 500 g Kaese\n- 1 Liter Milch\n- 6 Eier\n- 1 Brot\n- Butter\n- Tomaten\n\nKassenbon REWE:\nAepfel 1 kg ............ 2,49 Euro\nGouda Kaese 500 g ...... 3,29 Euro\nVollmilch 1 L .......... 1,19 Euro\nEier 6 Stueck .......... 1,89 Euro\nVollkornbrot ........... 2,79 Euro\nButter 250 g ........... 1,99 Euro\nTomaten 500 g .......... 1,49 Euro\n----------------------------\nGesamt: 15,13 Euro\nBezahlt: 20,00 Euro (bar)\nRueckgeld: 4,87 Euro",
        questions: [
          { id: "q14", promptDe: "Wie viel hat Maria insgesamt bezahlt?", options: [{ id: "a", de: "15,13 Euro" }, { id: "b", de: "20,00 Euro" }, { id: "c", de: "4,87 Euro" }, { id: "d", de: "25,00 Euro" }], correct: "a", explanationAr: "المجموع الفعلي هو Gesamt: 15,13 Euro. دفعت 20 واسترجعت 4,87" },
          { id: "q15", promptDe: "Was war am teuersten?", options: [{ id: "a", de: "Die Aepfel" }, { id: "b", de: "Der Kaese" }, { id: "c", de: "Das Brot" }, { id: "d", de: "Die Eier" }], correct: "b", explanationAr: "الجبن كان الأغلى: Gouda Kaese = 3,29 Euro" },
          { id: "q16", promptDe: "Wie viel Rueckgeld bekommt Maria?", options: [{ id: "a", de: "3,87 Euro" }, { id: "b", de: "4,13 Euro" }, { id: "c", de: "4,87 Euro" }, { id: "d", de: "5,87 Euro" }], correct: "c", explanationAr: "الباقي: Rueckgeld: 4,87 Euro (دفعت 20 ناقص 15,13)" }
        ]
      },
      {
        id: "lese-6",
        titleDe: "Apotheke — Oeffnungszeiten",
        textDe: "Stadt-Apotheke\nHauptstrasse 15\nTel.: 030 / 123 456\n\nOeffnungszeiten:\nMontag - Freitag: 8:00 - 18:30 Uhr\nSamstag: 9:00 - 14:00 Uhr\nSonntag und Feiertage: geschlossen\n\nNotdienst-Apotheke (24 Stunden):\nBahnhof-Apotheke, Am Bahnhof 3\nTel.: 030 / 789 012\n\nWichtig: Fuer Rezepte bringen Sie bitte Ihre Versichertenkarte mit!",
        questions: [
          { id: "q17", promptDe: "Wann schliesst die Apotheke am Freitag?", options: [{ id: "a", de: "Um 14:00 Uhr" }, { id: "b", de: "Um 16:00 Uhr" }, { id: "c", de: "Um 18:00 Uhr" }, { id: "d", de: "Um 18:30 Uhr" }], correct: "d", explanationAr: "من الاثنين للجمعة تغلق الساعة 18:30" },
          { id: "q18", promptDe: "Was braucht man fuer ein Rezept?", options: [{ id: "a", de: "Einen Personalausweis" }, { id: "b", de: "Eine Versichertenkarte" }, { id: "c", de: "Bargeld" }, { id: "d", de: "Einen Termin" }], correct: "b", explanationAr: "مكتوب: Versichertenkarte mitbringen = أحضر بطاقة التأمين" },
          { id: "q19", promptDe: "Welche Apotheke hat am Sonntag geoeffnet?", options: [{ id: "a", de: "Die Stadt-Apotheke" }, { id: "b", de: "Keine Apotheke" }, { id: "c", de: "Die Bahnhof-Apotheke" }, { id: "d", de: "Beide Apotheken" }], correct: "c", explanationAr: "صيدلية الطوارئ (Notdienst-Apotheke) مفتوحة 24 ساعة = Bahnhof-Apotheke" }
        ]
      }
    ],
    sprachbausteine: [
      { id: "sb-7", contextDe: "Maria ___ gern Tee.", options: [{ id: "a", de: "trinke" }, { id: "b", de: "trinkst" }, { id: "c", de: "trinkt" }, { id: "d", de: "trinken" }], correct: "c", explanationAr: "Maria = sie، لذلك: sie trinkt" },
      { id: "sb-8", contextDe: "Ich kaufe ___ Apfel.", options: [{ id: "a", de: "ein" }, { id: "b", de: "eine" }, { id: "c", de: "einen" }, { id: "d", de: "einer" }], correct: "c", explanationAr: "Apfel مذكر (der Apfel) وهنا مفعول به (Akkusativ): einen Apfel" },
      { id: "sb-9", contextDe: "Die Kinder ___ im Park.", options: [{ id: "a", de: "spielt" }, { id: "b", de: "spielen" }, { id: "c", de: "spielst" }, { id: "d", de: "spiele" }], correct: "b", explanationAr: "die Kinder = sie (جمع): sie spielen" },
      { id: "sb-10", contextDe: "Wir gehen ___ Supermarkt.", options: [{ id: "a", de: "in den" }, { id: "b", de: "in die" }, { id: "c", de: "in das" }, { id: "d", de: "auf den" }], correct: "a", explanationAr: "Supermarkt مذكر (der Supermarkt) + حركة = Akkusativ: in den Supermarkt" },
      { id: "sb-11", contextDe: "Das Brot ___ 2,79 Euro.", options: [{ id: "a", de: "kosten" }, { id: "b", de: "koste" }, { id: "c", de: "kostet" }, { id: "d", de: "kostest" }], correct: "c", explanationAr: "das Brot = es: es kostet (يكلف)" },
      { id: "sb-12", contextDe: "___ du Kaffee oder Tee?", options: [{ id: "a", de: "Moechte" }, { id: "b", de: "Moechtest" }, { id: "c", de: "Moechten" }, { id: "d", de: "Moechtet" }], correct: "b", explanationAr: "مع du نستخدم moechtest: Moechtest du...? = هل تريد/تودّ؟" }
    ],
    schreibenParts: [
      {
        id: "sch-3",
        titleDe: "Einkaufsliste per E-Mail",
        promptDe: "Ihre Freundin geht einkaufen. Schreiben Sie ihr eine E-Mail mit einer Einkaufsliste.",
        promptAr: "صديقتك ستذهب للتسوق. اكتبي لها بريداً إلكترونياً بقائمة مشتريات.",
        redemittel: ["Liebe...", "Kannst du bitte ... kaufen?", "Ich brauche...", "Vergiss bitte nicht...", "Danke dir!", "Bis spaeter"],
        sampleDe: "Liebe Fatima,\n\nkannst du bitte fuer mich einkaufen? Ich bin heute krank und kann nicht aus dem Haus gehen.\n\nIch brauche bitte:\n- 1 Liter Milch\n- 6 Eier\n- 1 Brot (Vollkorn)\n- 500 g Haehnchen\n- Tomaten und Gurken\n- 1 Packung Reis\n\nVergiss bitte nicht die Milch! Die Kinder brauchen sie fuer das Fruehstueck.\n\nDas Geld liegt auf dem Kuechentisch.\n\nVielen Dank!\nSara",
        sampleAr: "عزيزتي فاطمة،\n\nهل يمكنك التسوق من أجلي؟ أنا مريضة اليوم ولا أستطيع الخروج.\n\nأحتاج من فضلك:\n- 1 لتر حليب\n- 6 بيضات\n- 1 خبز (قمح كامل)\n- 500 غرام دجاج\n- طماطم وخيار\n- 1 علبة أرز\n\nلا تنسي الحليب من فضلك! الأطفال يحتاجونه للفطور.\n\nالمال على طاولة المطبخ.\n\nشكراً جزيلاً!\nسارة"
      },
      {
        id: "sch-4",
        titleDe: "Arzttermin vereinbaren",
        promptDe: "Rufen Sie beim Arzt an und vereinbaren Sie einen Termin. Fuellen Sie das Formular aus.",
        promptAr: "اتصل بالطبيب واحجز موعداً. املأ الاستمارة.",
        redemittel: ["Ich moechte einen Termin.", "Ich habe Schmerzen.", "Wann haben Sie einen freien Termin?", "Ist ... Uhr moeglich?", "Meine Versichertenkarte..."],
        sampleDe: "Patientenformular:\n\nName: Sara Mahmoud\nGeburtsdatum: 22.06.1988\nAdresse: Friedrichstrasse 45, 10117 Berlin\nTelefon: 0151 234 56 78\nKrankenkasse: AOK Berlin\nVersichertennummer: A123456789\nGrund des Besuchs: starke Kopfschmerzen seit 3 Tagen\nAllergien: keine\nMedikamente: keine\nGewuenschter Termin: Montag oder Dienstag Vormittag",
        sampleAr: "استمارة المريض:\n\nالاسم: سارة محمود\nتاريخ الميلاد: 22.06.1988\nالعنوان: شارع فريدريش 45، 10117 برلين\nالهاتف: 0151 234 56 78\nالتأمين الصحي: AOK برلين\nرقم التأمين: A123456789\nسبب الزيارة: صداع شديد منذ 3 أيام\nالحساسيات: لا يوجد\nالأدوية: لا يوجد\nالموعد المطلوب: الاثنين أو الثلاثاء صباحاً"
      }
    ],
    sprechenParts: [
      {
        id: "spr-3",
        titleDe: "Im Restaurant bestellen",
        promptDe: "Sie sind im Restaurant. Bestellen Sie Essen und Trinken.",
        promptAr: "أنت في المطعم. اطلب طعاماً وشراباً.",
        redemittel: ["Ich moechte bitte...", "Fuer mich bitte...", "Kann ich ... haben?", "Die Rechnung, bitte.", "Zusammen oder getrennt?", "Das schmeckt sehr gut!"],
        sampleDe: "Kellner: Guten Tag! Was moechten Sie bestellen?\n\nIch: Guten Tag! Ich moechte bitte die Speisekarte sehen. ... Ich nehme die Tomatensuppe als Vorspeise und dann das Schnitzel mit Pommes. Und zum Trinken ein Mineralwasser, bitte.\n\nKellner: Sehr gern. Moechten Sie auch eine Nachspeise?\n\nIch: Ja, ich nehme den Schokoladenkuchen, bitte.\n\nKellner: Kommt sofort!\n\nIch: Entschuldigung, kann ich bitte die Rechnung haben?\n\nKellner: Zusammen oder getrennt?\n\nIch: Zusammen, bitte. Kann ich mit Karte bezahlen?\n\nKellner: Ja, natuerlich!",
        sampleAr: "النادل: مساء الخير! ماذا تريدون أن تطلبوا؟\n\nأنا: مساء الخير! أريد أن أرى قائمة الطعام من فضلك. ... آخذ شوربة الطماطم كمقبلة ثم الشنيتسل مع البطاطا المقلية. وللشرب ماء معدني من فضلك.\n\nالنادل: بكل سرور. هل تريدون أيضاً حلوى؟\n\nأنا: نعم، آخذ كعكة الشوكولاتة من فضلك.\n\nالنادل: حالاً!\n\nأنا: عفواً، هل يمكنني الحساب من فضلك؟\n\nالنادل: معاً أم كل واحد لحاله؟\n\nأنا: معاً من فضلك. هل يمكنني الدفع بالبطاقة؟\n\nالنادل: نعم، طبعاً!"
      },
      {
        id: "spr-4",
        titleDe: "Nach dem Preis fragen",
        promptDe: "Sie sind im Geschaeft. Fragen Sie nach Preisen und kaufen Sie ein.",
        promptAr: "أنت في المتجر. اسأل عن الأسعار واشترِ.",
        redemittel: ["Was kostet...?", "Wie viel kostet...?", "Haben Sie auch...?", "Ich suche...", "Gibt es das in...?", "Ich nehme das.", "Das ist zu teuer."],
        sampleDe: "Ich: Entschuldigung, ich suche eine Winterjacke. Haben Sie Winterjacken?\n\nVerkaeufer: Ja, die Winterjacken sind dort hinten. Welche Groesse brauchen Sie?\n\nIch: Groesse M, bitte. Was kostet die blaue Jacke?\n\nVerkaeufer: Die kostet 89,90 Euro.\n\nIch: Haben Sie die auch in Schwarz?\n\nVerkaeufer: Ja, einen Moment. Hier bitte. Die schwarze Jacke kostet 79,90 Euro. Sie ist im Angebot.\n\nIch: Oh, das ist gut! Kann ich die anprobieren?\n\nVerkaeufer: Natuerlich. Die Umkleidekabine ist rechts.\n\nIch: Die passt gut. Ich nehme die schwarze Jacke. Kann ich mit Karte bezahlen?",
        sampleAr: "أنا: عفواً، أبحث عن جاكيت شتوي. هل عندكم جاكيتات شتوية؟\n\nالبائع: نعم، الجاكيتات الشتوية هناك في الخلف. أي مقاس تحتاج؟\n\nأنا: مقاس M من فضلك. كم يكلف الجاكيت الأزرق؟\n\nالبائع: يكلف 89,90 يورو.\n\nأنا: هل عندكم نفسه باللون الأسود؟\n\nالبائع: نعم، لحظة. تفضل. الجاكيت الأسود يكلف 79,90 يورو. إنه في العرض.\n\nأنا: أوه، هذا جيد! هل يمكنني تجربته؟\n\nالبائع: طبعاً. غرفة القياس على اليمين.\n\nأنا: يناسبني جيداً. آخذ الجاكيت الأسود. هل يمكنني الدفع بالبطاقة؟"
      }
    ]
  }
]
