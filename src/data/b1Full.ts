// ============================================================
// b1Full.ts — Goethe B1 / telc B1 / DTZ Vollständige Modelltests
// Zielgruppe: Arabischsprachige Lernende in Deutschland
// CEFR-Niveau: B1
// ============================================================

export interface Option {
  id: string;
  de: string;
}

export interface Question {
  id: string;
  promptDe: string;
  options: Option[];
  correct: string;
  explanationAr: string;
}

export interface ReadingPassage {
  id: string;
  titleDe: string;
  textDe: string;
  questions: Question[];
}

export interface Sprachbaustein {
  id: string;
  contextDe: string;
  options: Option[];
  correct: string;
  explanationAr: string;
}

export interface SchreibenPart {
  id: string;
  titleDe: string;
  promptDe: string;
  promptAr: string;
  redemittel: string[];
  sampleDe: string;
  sampleAr: string;
}

export interface SprechenPart {
  id: string;
  titleDe: string;
  promptDe: string;
  promptAr: string;
  redemittel: string[];
  sampleDe: string;
  sampleAr: string;
}

export interface B1Model {
  id: string;
  titleAr: string;
  titleDe: string;
  level: string;
  durationMin: number;
  readingPassages: ReadingPassage[];
  sprachbausteine: Sprachbaustein[];
  schreibenParts: SchreibenPart[];
  sprechenParts: SprechenPart[];
}

// ============================================================
//  MODEL 1 — العمل والتعليم (Arbeit & Ausbildung)
// ============================================================

const model1ReadingPassages: ReadingPassage[] = [
  // ---- Lesetext 1: Praktikum in Deutschland ----
  {
    id: 'lese-1-1',
    titleDe: 'Praktikum in Deutschland',
    textDe:
      'Immer mehr junge Menschen entscheiden sich für ein Praktikum, bevor sie eine feste Stelle suchen. ' +
      'Ein Praktikum bietet die Möglichkeit, praktische Erfahrungen in einem Unternehmen zu sammeln und ' +
      'den Arbeitsalltag in Deutschland kennenzulernen. Viele Firmen bieten Praktikumsplätze für drei bis ' +
      'sechs Monate an. Während eines Praktikums arbeitet man meistens Vollzeit, also etwa 40 Stunden pro ' +
      'Woche. In manchen Fällen bekommt man ein kleines Gehalt, aber oft ist das Praktikum unbezahlt. ' +
      'Trotzdem lohnt es sich, weil man wichtige Kontakte knüpfen und seinen Lebenslauf verbessern kann. ' +
      'Besonders für Menschen, die neu in Deutschland sind, ist ein Praktikum ein guter Einstieg in den ' +
      'Arbeitsmarkt. Man lernt nicht nur fachliche Fähigkeiten, sondern auch die Arbeitskultur und die ' +
      'Kommunikation mit Kollegen. Nach einem erfolgreichen Praktikum bieten einige Unternehmen sogar ' +
      'eine Festanstellung an.',
    questions: [
      {
        id: 'q1-1-1',
        promptDe: 'Warum machen viele junge Menschen ein Praktikum?',
        options: [
          { id: 'a', de: 'Weil sie sofort viel Geld verdienen wollen.' },
          { id: 'b', de: 'Weil sie praktische Erfahrungen sammeln möchten.' },
          { id: 'c', de: 'Weil sie keine Ausbildung machen können.' },
          { id: 'd', de: 'Weil sie ins Ausland reisen wollen.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يذكر النص أن كثيرًا من الشباب يختارون التدريب العملي لاكتساب خبرات عملية في شركة ما والتعرف على الحياة المهنية اليومية في ألمانيا. لا يُذكر في النص أنهم يريدون كسب المال فورًا أو السفر.',
      },
      {
        id: 'q1-1-2',
        promptDe: 'Wie lange dauert ein Praktikum normalerweise?',
        options: [
          { id: 'a', de: 'Einen Monat.' },
          { id: 'b', de: 'Ein Jahr.' },
          { id: 'c', de: 'Drei bis sechs Monate.' },
          { id: 'd', de: 'Zwei Wochen.' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (c). يوضح النص أن العديد من الشركات تقدم أماكن تدريب لمدة ثلاثة إلى ستة أشهر (drei bis sechs Monate).',
      },
      {
        id: 'q1-1-3',
        promptDe: 'Was ist ein Vorteil eines Praktikums, auch wenn man kein Gehalt bekommt?',
        options: [
          { id: 'a', de: 'Man bekommt automatisch einen Studienplatz.' },
          { id: 'b', de: 'Man kann wichtige Kontakte knüpfen und den Lebenslauf verbessern.' },
          { id: 'c', de: 'Man muss nicht arbeiten.' },
          { id: 'd', de: 'Man bekommt immer einen Firmenwagen.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يذكر النص بوضوح أن التدريب يستحق العناء حتى بدون أجر لأن المتدرب يمكنه بناء علاقات مهمة (Kontakte knüpfen) وتحسين سيرته الذاتية (Lebenslauf verbessern).',
      },
      {
        id: 'q1-1-4',
        promptDe: 'Was passiert manchmal nach einem erfolgreichen Praktikum?',
        options: [
          { id: 'a', de: 'Man muss das Land verlassen.' },
          { id: 'b', de: 'Man bekommt ein Stipendium.' },
          { id: 'c', de: 'Einige Unternehmen bieten eine Festanstellung an.' },
          { id: 'd', de: 'Man muss ein neues Praktikum anfangen.' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (c). في نهاية النص يُذكر أن بعض الشركات تقدم عقد عمل دائم (Festanstellung) بعد تدريب ناجح.',
      },
    ],
  },

  // ---- Lesetext 2: Weiterbildung für Erwachsene ----
  {
    id: 'lese-1-2',
    titleDe: 'Weiterbildung für Erwachsene',
    textDe:
      'In Deutschland gibt es viele Möglichkeiten zur Weiterbildung für Erwachsene. Die Volkshochschulen (VHS) ' +
      'bieten Kurse in verschiedenen Bereichen an: Sprachen, Computer, Gesundheit und Beruf. Die Kurse finden ' +
      'oft abends oder am Wochenende statt, damit auch Berufstätige teilnehmen können. Die Kursgebühren sind ' +
      'meistens günstig, und manchmal übernimmt der Arbeitgeber die Kosten. Neben den Volkshochschulen gibt es ' +
      'auch private Bildungseinrichtungen und Online-Kurse. Besonders beliebt sind Sprachkurse, vor allem ' +
      'Deutsch als Fremdsprache. Viele Menschen nutzen die Weiterbildung, um ihre beruflichen Chancen zu ' +
      'verbessern oder einen neuen Beruf zu erlernen. Wer einen Integrationskurs besucht hat, kann danach ' +
      'spezielle berufsbezogene Sprachkurse (DeuFöV) besuchen. Diese Kurse werden vom Bundesamt für Migration ' +
      'und Flüchtlinge (BAMF) finanziert und sind für die Teilnehmer kostenlos.',
    questions: [
      {
        id: 'q1-2-1',
        promptDe: 'Wann finden die Kurse an der Volkshochschule meistens statt?',
        options: [
          { id: 'a', de: 'Nur morgens.' },
          { id: 'b', de: 'Abends oder am Wochenende.' },
          { id: 'c', de: 'Nur im Sommer.' },
          { id: 'd', de: 'Während der normalen Arbeitszeit.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يذكر النص أن الدورات تُقام غالبًا في المساء أو في نهاية الأسبوع (abends oder am Wochenende) حتى يتمكن العاملون أيضًا من المشاركة.',
      },
      {
        id: 'q1-2-2',
        promptDe: 'Was sind DeuFöV-Kurse?',
        options: [
          { id: 'a', de: 'Sportkurse für Erwachsene.' },
          { id: 'b', de: 'Berufsbezogene Sprachkurse nach dem Integrationskurs.' },
          { id: 'c', de: 'Kurse für Kinder an der Grundschule.' },
          { id: 'd', de: 'Private Nachhilfekurse.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يشرح النص أن دورات DeuFöV هي دورات لغوية متخصصة مرتبطة بالمهنة (berufsbezogene Sprachkurse) يمكن حضورها بعد دورة الاندماج.',
      },
      {
        id: 'q1-2-3',
        promptDe: 'Wer finanziert die DeuFöV-Kurse?',
        options: [
          { id: 'a', de: 'Die Teilnehmer selbst.' },
          { id: 'b', de: 'Die Volkshochschule.' },
          { id: 'c', de: 'Das Bundesamt für Migration und Flüchtlinge (BAMF).' },
          { id: 'd', de: 'Die Krankenkasse.' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (c). يذكر النص صراحةً أن هذه الدورات يموّلها المكتب الاتحادي للهجرة واللاجئين (BAMF) وهي مجانية للمشاركين.',
      },
      {
        id: 'q1-2-4',
        promptDe: 'Warum nutzen viele Menschen die Weiterbildung?',
        options: [
          { id: 'a', de: 'Weil es Pflicht ist.' },
          { id: 'b', de: 'Um ihre beruflichen Chancen zu verbessern oder einen neuen Beruf zu erlernen.' },
          { id: 'c', de: 'Weil die Kurse immer kostenlos sind.' },
          { id: 'd', de: 'Weil sie sonst kein Kindergeld bekommen.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يوضح النص أن كثيرين يستخدمون التعليم المستمر لتحسين فرصهم المهنية (berufliche Chancen verbessern) أو لتعلم مهنة جديدة.',
      },
    ],
  },

  // ---- Lesetext 3: Ein Tag im Kindergarten (Blogbeitrag) ----
  {
    id: 'lese-1-3',
    titleDe: 'Ein Tag im Kindergarten — Mein Erfahrungsbericht',
    textDe:
      'Hallo zusammen! Ich heiße Fatima und arbeite seit einem Jahr als Erzieherin in einem Kindergarten in ' +
      'München. Mein Arbeitstag beginnt um 7:30 Uhr. Zuerst begrüße ich die Kinder und ihre Eltern. Danach ' +
      'frühstücken wir gemeinsam. Nach dem Frühstück gibt es einen Morgenkreis, in dem wir singen und über ' +
      'den Tag sprechen. Vormittags machen wir verschiedene Aktivitäten: Basteln, Malen oder Turnen in der ' +
      'Turnhalle. Um 12 Uhr gibt es Mittagessen. Die jüngeren Kinder schlafen danach, während die älteren ' +
      'Kinder draußen im Garten spielen. Am Nachmittag kommen die Eltern und holen ihre Kinder ab. Ich finde ' +
      'meine Arbeit sehr schön, weil ich die Entwicklung der Kinder begleiten kann. Manchmal ist es ' +
      'anstrengend, besonders wenn viele Kinder gleichzeitig weinen. Aber die Freude der Kinder gibt mir ' +
      'viel Energie. Ich würde diesen Beruf jedem empfehlen, der gerne mit Kindern arbeitet.',
    questions: [
      {
        id: 'q1-3-1',
        promptDe: 'Was macht Fatima zuerst, wenn sie zur Arbeit kommt?',
        options: [
          { id: 'a', de: 'Sie macht Sport mit den Kindern.' },
          { id: 'b', de: 'Sie begrüßt die Kinder und ihre Eltern.' },
          { id: 'c', de: 'Sie kocht das Mittagessen.' },
          { id: 'd', de: 'Sie räumt die Turnhalle auf.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). تذكر فاطمة أنها تبدأ يومها باستقبال الأطفال وأولياء أمورهم (begrüße ich die Kinder und ihre Eltern).',
      },
      {
        id: 'q1-3-2',
        promptDe: 'Was passiert im Morgenkreis?',
        options: [
          { id: 'a', de: 'Die Kinder lernen Mathematik.' },
          { id: 'b', de: 'Die Kinder singen und sprechen über den Tag.' },
          { id: 'c', de: 'Die Kinder putzen die Räume.' },
          { id: 'd', de: 'Die Eltern erzählen Geschichten.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يوضح النص أنه في حلقة الصباح (Morgenkreis) يغني الأطفال ويتحدثون عن اليوم (singen und über den Tag sprechen).',
      },
      {
        id: 'q1-3-3',
        promptDe: 'Was machen die jüngeren Kinder nach dem Mittagessen?',
        options: [
          { id: 'a', de: 'Sie gehen nach Hause.' },
          { id: 'b', de: 'Sie spielen im Garten.' },
          { id: 'c', de: 'Sie schlafen.' },
          { id: 'd', de: 'Sie machen Hausaufgaben.' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (c). يذكر النص أن الأطفال الأصغر سنًا ينامون بعد الغداء (Die jüngeren Kinder schlafen danach) بينما يلعب الأكبر سنًا في الحديقة.',
      },
      {
        id: 'q1-3-4',
        promptDe: 'Was findet Fatima manchmal anstrengend?',
        options: [
          { id: 'a', de: 'Das Kochen.' },
          { id: 'b', de: 'Wenn viele Kinder gleichzeitig weinen.' },
          { id: 'c', de: 'Den Weg zur Arbeit.' },
          { id: 'd', de: 'Die Gespräche mit den Eltern.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). تقول فاطمة إنها تجد الأمر مرهقًا أحيانًا خاصة عندما يبكي كثير من الأطفال في نفس الوقت (wenn viele Kinder gleichzeitig weinen).',
      },
    ],
  },

  // ---- Lesetext 4: Ehrenamtliche Arbeit (Zeitungsartikel) ----
  {
    id: 'lese-1-4',
    titleDe: 'Ehrenamtliche Arbeit: Helfen ohne Bezahlung',
    textDe:
      'In Deutschland engagieren sich Millionen von Menschen ehrenamtlich. Das bedeutet, dass sie freiwillig ' +
      'und ohne Bezahlung arbeiten. Ehrenamtliche helfen zum Beispiel in Sportvereinen, bei der Feuerwehr, ' +
      'in Krankenhäusern oder in Flüchtlingsunterkünften. Besonders gefragt sind Ehrenamtliche, die ' +
      'Sprachkurse für Geflüchtete anbieten oder bei Behördengängen begleiten. Die Arbeit bringt viele ' +
      'Vorteile: Man lernt neue Menschen kennen, verbessert seine Deutschkenntnisse und sammelt wertvolle ' +
      'Erfahrungen für den Lebenslauf. Viele Städte haben eine Freiwilligenagentur, die Menschen bei der ' +
      'Suche nach einer passenden ehrenamtlichen Tätigkeit unterstützt. Wer sich ehrenamtlich engagiert, ' +
      'bekommt oft eine Ehrenamtskarte, mit der man Vergünstigungen in Museen, Schwimmbädern und im ' +
      'öffentlichen Nahverkehr erhalten kann.',
    questions: [
      {
        id: 'q1-4-1',
        promptDe: 'Was bedeutet „ehrenamtlich arbeiten"?',
        options: [
          { id: 'a', de: 'Man arbeitet nur am Wochenende.' },
          { id: 'b', de: 'Man arbeitet freiwillig und ohne Bezahlung.' },
          { id: 'c', de: 'Man arbeitet nur für den Staat.' },
          { id: 'd', de: 'Man arbeitet halbtags mit Gehalt.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يشرح النص في البداية أن العمل التطوعي يعني العمل طوعيًا وبدون أجر (freiwillig und ohne Bezahlung).',
      },
      {
        id: 'q1-4-2',
        promptDe: 'Wo helfen Ehrenamtliche zum Beispiel?',
        options: [
          { id: 'a', de: 'In Banken und Versicherungen.' },
          { id: 'b', de: 'In Sportvereinen, bei der Feuerwehr und in Krankenhäusern.' },
          { id: 'c', de: 'Nur in Schulen.' },
          { id: 'd', de: 'In Restaurants und Hotels.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يذكر النص عدة أماكن يساعد فيها المتطوعون مثل الأندية الرياضية وفرق الإطفاء والمستشفيات ومراكز إيواء اللاجئين.',
      },
      {
        id: 'q1-4-3',
        promptDe: 'Was bekommt man oft, wenn man sich ehrenamtlich engagiert?',
        options: [
          { id: 'a', de: 'Ein festes Gehalt.' },
          { id: 'b', de: 'Einen Firmenwagen.' },
          { id: 'c', de: 'Eine Ehrenamtskarte mit Vergünstigungen.' },
          { id: 'd', de: 'Einen Universitätsabschluss.' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (c). يوضح النص أن المتطوعين يحصلون غالبًا على بطاقة عمل تطوعي (Ehrenamtskarte) توفر لهم تخفيضات في المتاحف والمسابح ووسائل النقل العام.',
      },
    ],
  },
];

// ---- Sprachbausteine: Modell 1 ----

const model1Sprachbausteine: Sprachbaustein[] = [
  {
    id: 'sb-1-1',
    contextDe: 'Wenn ich genug Geld ___, würde ich eine Weltreise machen.',
    options: [
      { id: 'a', de: 'habe' },
      { id: 'b', de: 'hätte' },
      { id: 'c', de: 'hatte' },
      { id: 'd', de: 'haben' },
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (b) "hätte". هذه جملة شرطية غير حقيقية (Konjunktiv II). عندما نتحدث عن أمنية أو شيء غير واقعي نستخدم صيغة Konjunktiv II. الفعل "haben" في Konjunktiv II يصبح "hätte". الجملة الرئيسية تحتوي على "würde" مما يؤكد أن الجملة كلها في صيغة Konjunktiv II.',
  },
  {
    id: 'sb-1-2',
    contextDe: 'Das ist der Kollege, ___ mir bei der Arbeit geholfen hat.',
    options: [
      { id: 'a', de: 'den' },
      { id: 'b', de: 'dem' },
      { id: 'c', de: 'der' },
      { id: 'd', de: 'dessen' },
    ],
    correct: 'c',
    explanationAr:
      'الإجابة الصحيحة هي (c) "der". هذه جملة موصولة (Relativsatz). الضمير الموصول يعود على "der Kollege" (مذكر). في جملة الوصل، الضمير هو فاعل الفعل "geholfen hat"، لذلك نستخدم حالة الرفع Nominativ = "der".',
  },
  {
    id: 'sb-1-3',
    contextDe: 'Die E-Mails werden jeden Morgen von der Sekretärin ___.',
    options: [
      { id: 'a', de: 'beantwortet' },
      { id: 'b', de: 'beantworten' },
      { id: 'c', de: 'beantworte' },
      { id: 'd', de: 'beantwortete' },
    ],
    correct: 'a',
    explanationAr:
      'الإجابة الصحيحة هي (a) "beantwortet". هذه جملة في صيغة المبني للمجهول في المضارع (Passiv Präsens). تركيب المبني للمجهول هو: werden + Partizip II. الفعل "beantworten" في صيغة Partizip II يصبح "beantwortet". "werden" موجود بالفعل في الجملة.',
  },
  {
    id: 'sb-1-4',
    contextDe: '___ das Wetter schlecht war, sind wir spazieren gegangen.',
    options: [
      { id: 'a', de: 'Weil' },
      { id: 'b', de: 'Deshalb' },
      { id: 'c', de: 'Trotzdem' },
      { id: 'd', de: 'Obwohl' },
    ],
    correct: 'd',
    explanationAr:
      'الإجابة الصحيحة هي (d) "Obwohl". المعنى هو: رغم أن الطقس كان سيئًا، ذهبنا في نزهة. "Obwohl" هي أداة ربط تبعية (Subjunktion) تعني "بالرغم من أن" وتأتي مع جملة فرعية حيث يكون الفعل في النهاية. لاحظ أن "Trotzdem" هي ظرف وليست أداة ربط، ولا يمكن أن تبدأ جملة فرعية.',
  },
  {
    id: 'sb-1-5',
    contextDe: 'Ich lerne Deutsch, ___ ich in Deutschland arbeiten kann.',
    options: [
      { id: 'a', de: 'weil' },
      { id: 'b', de: 'damit' },
      { id: 'c', de: 'obwohl' },
      { id: 'd', de: 'trotzdem' },
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (b) "damit". نستخدم "damit" للتعبير عن الهدف أو الغرض (Finalsatz). الجملة تعني: أتعلم الألمانية لكي أستطيع العمل في ألمانيا. "damit" تُستخدم عندما يكون الفاعل في الجملة الرئيسية مختلفًا عن الفاعل في الجملة الفرعية، أو عندما يكون نفس الفاعل أيضًا.',
  },
  {
    id: 'sb-1-6',
    contextDe: 'Der Chef hat gesagt, dass die Besprechung um 14 Uhr ___ wird.',
    options: [
      { id: 'a', de: 'stattfinden' },
      { id: 'b', de: 'stattfindet' },
      { id: 'c', de: 'stattgefunden' },
      { id: 'd', de: 'stattfand' },
    ],
    correct: 'a',
    explanationAr:
      'الإجابة الصحيحة هي (a) "stattfinden". في جملة فرعية مع "dass" يكون الفعل المصرف في النهاية. هنا "wird" هو الفعل المصرف وهو موجود في نهاية الجملة بالفعل. الفعل الأصلي "stattfinden" يأتي بصيغة المصدر (Infinitiv) قبل "wird" لأن التركيب هو: wird + Infinitiv = مستقبل (Futur I).',
  },
  {
    id: 'sb-1-7',
    contextDe: 'Das ist die Firma, in ___ ich mein Praktikum gemacht habe.',
    options: [
      { id: 'a', de: 'die' },
      { id: 'b', de: 'der' },
      { id: 'c', de: 'dem' },
      { id: 'd', de: 'den' },
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (b) "der". هذه جملة موصولة مع حرف جر. "die Firma" مؤنث. حرف الجر "in" يتطلب هنا حالة Dativ لأننا نتحدث عن مكان (أين؟ Wo?). المؤنث في حالة Dativ = "der". لذلك: in der Firma.',
  },
  {
    id: 'sb-1-8',
    contextDe: 'Er hat den Kurs bestanden, ___ er nicht viel gelernt hat.',
    options: [
      { id: 'a', de: 'weil' },
      { id: 'b', de: 'damit' },
      { id: 'c', de: 'obwohl' },
      { id: 'd', de: 'um' },
    ],
    correct: 'c',
    explanationAr:
      'الإجابة الصحيحة هي (c) "obwohl". الجملة تعبر عن تناقض: لقد نجح في الدورة رغم أنه لم يدرس كثيرًا. "obwohl" = بالرغم من أن. هي أداة ربط تبعية والفعل يأتي في نهاية الجملة الفرعية.',
  },
];

// ---- Schreiben: Modell 1 ----

const model1SchreibenParts: SchreibenPart[] = [
  {
    id: 'sch-1-1',
    titleDe: 'Formeller Brief: Beschwerde an eine Sprachschule',
    promptDe:
      'Sie haben einen Deutschkurs an der Sprachschule „LinguaPlus" besucht. Sie waren mit dem Kurs nicht zufrieden. ' +
      'Schreiben Sie einen formellen Brief an die Schulleitung. Schreiben Sie zu folgenden Punkten: ' +
      '• Grund für Ihr Schreiben • Was war das Problem? • Was erwarten Sie von der Schule? • Wie ist Ihr Vorschlag?',
    promptAr:
      'لقد حضرت دورة لغة ألمانية في مدرسة اللغات "LinguaPlus" ولم تكن راضيًا عن الدورة. ' +
      'اكتب رسالة رسمية إلى إدارة المدرسة. اكتب عن النقاط التالية: ' +
      '• سبب كتابتك • ما هي المشكلة؟ • ماذا تتوقع من المدرسة؟ • ما هو اقتراحك؟',
    redemittel: [
      'Sehr geehrte Damen und Herren,',
      'ich schreibe Ihnen, weil ...',
      'Ich möchte mich über ... beschweren.',
      'Das Problem war, dass ...',
      'Ich erwarte, dass ...',
      'Ich schlage vor, dass ...',
      'Ich würde mich freuen, wenn ...',
      'Mit freundlichen Grüßen',
    ],
    sampleDe:
      'Sehr geehrte Damen und Herren,\n\n' +
      'ich schreibe Ihnen, weil ich mit dem B1-Deutschkurs, den ich im Mai bei Ihrer Sprachschule besucht habe, ' +
      'sehr unzufrieden war. Ich möchte mich über mehrere Probleme beschweren.\n\n' +
      'Erstens war der Kursraum zu klein für 20 Teilnehmer. Wir hatten nicht genug Platz und die Luft war ' +
      'schlecht. Zweitens hat der Lehrer oft den Unterricht zu spät begonnen und manchmal 15 Minuten früher ' +
      'beendet. Außerdem haben wir kaum Übungen zum Sprechen gemacht, obwohl das im Kursprogramm stand. ' +
      'Die Lehrmaterialien waren veraltet und nicht für das B1-Niveau geeignet.\n\n' +
      'Ich erwarte, dass die Schule mir einen Teil der Kursgebühren zurückerstattet oder mir die Möglichkeit ' +
      'gibt, den Kurs kostenlos zu wiederholen. Ich schlage vor, dass Sie die Qualität der Kurse regelmäßig ' +
      'kontrollieren und die Teilnehmerzahl pro Kurs begrenzen.\n\n' +
      'Ich würde mich freuen, wenn Sie mir bald antworten würden.\n\n' +
      'Mit freundlichen Grüßen\nAhmad Hassan',
    sampleAr:
      'سيداتي وسادتي الأعزاء،\n\n' +
      'أكتب إليكم لأنني كنت غير راضٍ جدًا عن دورة اللغة الألمانية B1 التي حضرتها في شهر مايو في مدرستكم. ' +
      'أود أن أشتكي من عدة مشاكل.\n\n' +
      'أولاً، كانت قاعة الدورة صغيرة جدًا لعشرين مشاركًا. لم يكن لدينا مساحة كافية وكان الهواء سيئًا. ' +
      'ثانيًا، كان المعلم غالبًا ما يبدأ الدرس متأخرًا وأحيانًا ينهيه قبل 15 دقيقة. بالإضافة إلى ذلك، ' +
      'بالكاد قمنا بتمارين للتحدث رغم أن ذلك كان مذكورًا في برنامج الدورة. كانت المواد التعليمية قديمة ' +
      'وغير مناسبة لمستوى B1.\n\n' +
      'أتوقع أن تعيد المدرسة جزءًا من رسوم الدورة أو تمنحني فرصة لإعادة الدورة مجانًا. أقترح أن ' +
      'تراقبوا جودة الدورات بانتظام وتحددوا عدد المشاركين في كل دورة.\n\n' +
      'سأكون سعيدًا إذا أجبتموني قريبًا.\n\n' +
      'مع أطيب التحيات\nأحمد حسن',
  },
  {
    id: 'sch-1-2',
    titleDe: 'Halbformelle E-Mail: Einen Freund um Hilfe bei der Jobsuche bitten',
    promptDe:
      'Sie suchen eine neue Arbeitsstelle. Ihr Freund Markus arbeitet in einer großen Firma. ' +
      'Schreiben Sie ihm eine E-Mail. Schreiben Sie zu folgenden Punkten: ' +
      '• Warum schreiben Sie? • Was für eine Stelle suchen Sie? • Wie kann Markus Ihnen helfen? • Bedanken Sie sich.',
    promptAr:
      'أنت تبحث عن وظيفة جديدة. صديقك ماركوس يعمل في شركة كبيرة. ' +
      'اكتب له بريدًا إلكترونيًا. اكتب عن النقاط التالية: ' +
      '• لماذا تكتب؟ • ما نوع الوظيفة التي تبحث عنها؟ • كيف يمكن لماركوس مساعدتك؟ • اشكره.',
    redemittel: [
      'Lieber Markus,',
      'ich hoffe, es geht dir gut.',
      'Ich schreibe dir, weil ...',
      'Ich suche eine Stelle als ...',
      'Könntest du mir vielleicht ...?',
      'Es wäre toll, wenn ...',
      'Vielen Dank im Voraus!',
      'Viele Grüße',
    ],
    sampleDe:
      'Lieber Markus,\n\n' +
      'ich hoffe, es geht dir gut! Ich schreibe dir, weil ich deine Hilfe brauche. Wie du weißt, habe ich ' +
      'letzten Monat meinen B1-Deutschkurs erfolgreich abgeschlossen und suche jetzt eine Arbeitsstelle.\n\n' +
      'Ich suche eine Stelle im Bereich Lager und Logistik, weil ich in meinem Heimatland drei Jahre ' +
      'Erfahrung in diesem Bereich gesammelt habe. Eine Teilzeitstelle würde mir auch passen, damit ich ' +
      'nebenbei noch einen B2-Kurs besuchen kann.\n\n' +
      'Könntest du vielleicht in deiner Firma fragen, ob es freie Stellen gibt? Es wäre auch sehr nett, ' +
      'wenn du mir den Kontakt von der Personalabteilung geben könntest. Vielleicht könnte ich meine ' +
      'Bewerbungsunterlagen direkt dorthin schicken.\n\n' +
      'Vielen Dank im Voraus für deine Hilfe! Lass uns bald mal wieder zusammen Kaffee trinken.\n\n' +
      'Viele Grüße\nKhalid',
    sampleAr:
      'عزيزي ماركوس،\n\n' +
      'أتمنى أن تكون بخير! أكتب إليك لأنني أحتاج مساعدتك. كما تعلم، أنهيت الشهر الماضي دورة اللغة ' +
      'الألمانية B1 بنجاح وأبحث الآن عن وظيفة.\n\n' +
      'أبحث عن وظيفة في مجال المستودعات والخدمات اللوجستية لأنني اكتسبت ثلاث سنوات من الخبرة في هذا المجال ' +
      'في بلدي. وظيفة بدوام جزئي ستناسبني أيضًا حتى أتمكن من حضور دورة B2 بجانب العمل.\n\n' +
      'هل يمكنك أن تسأل في شركتك إن كانت هناك وظائف شاغرة؟ سيكون لطيفًا جدًا أيضًا لو تعطيني ' +
      'بيانات الاتصال بقسم الموارد البشرية. ربما يمكنني إرسال أوراق التقديم مباشرة إلى هناك.\n\n' +
      'شكرًا جزيلاً مقدمًا على مساعدتك! دعنا نشرب القهوة معًا قريبًا.\n\n' +
      'أطيب التحيات\nخالد',
  },
];

// ---- Sprechen: Modell 1 ----

const model1SprechenParts: SprechenPart[] = [
  {
    id: 'spr-1-1',
    titleDe: 'Gemeinsam etwas planen: Abschiedsfeier für einen Kollegen',
    promptDe:
      'Ihr Kollege Ali verlässt die Firma. Sie und Ihre Kollegin Petra möchten eine Abschiedsfeier ' +
      'organisieren. Planen Sie gemeinsam die Feier. Sprechen Sie über: ' +
      '• Wann und wo? • Essen und Getränke • Geschenk • Wer wird eingeladen? • Musik und Dekoration',
    promptAr:
      'زميلكم علي سيترك الشركة. أنت وزميلتك بيترا تريدان تنظيم حفلة وداع. ' +
      'خططوا معًا للحفلة. تحدثوا عن: ' +
      '• متى وأين؟ • الطعام والمشروبات • الهدية • من سيُدعى؟ • الموسيقى والزينة',
    redemittel: [
      'Ich schlage vor, dass wir ...',
      'Was hältst du davon, wenn ...?',
      'Wir könnten ... machen.',
      'Das ist eine gute Idee, aber ...',
      'Ich bin damit einverstanden.',
      'Wie wäre es, wenn ...?',
      'Sollen wir ...?',
      'Ich finde, wir sollten ...',
      'Das klingt gut.',
      'Einverstanden! Dann machen wir das so.',
    ],
    sampleDe:
      'A: Hallo Petra, wie du weißt, verlässt Ali nächste Woche die Firma. Ich finde, wir sollten eine ' +
      'Abschiedsfeier für ihn organisieren.\n' +
      'B: Ja, das finde ich auch! Wann sollen wir die Feier machen?\n' +
      'A: Ich schlage vor, dass wir die Feier am Freitagnachmittag machen, nach der Arbeit. Was hältst du davon?\n' +
      'B: Das ist eine gute Idee. Und wo? Im Büro oder in einem Restaurant?\n' +
      'A: Wir könnten die Feier im Pausenraum machen, weil dort genug Platz ist und es nichts kostet.\n' +
      'B: Einverstanden. Und was machen wir mit dem Essen? Sollen wir etwas bestellen?\n' +
      'A: Wie wäre es, wenn jeder etwas mitbringt? Zum Beispiel Kuchen, Salate oder Snacks.\n' +
      'B: Das klingt gut. Und für die Getränke kaufen wir Saft, Wasser und Kaffee.\n' +
      'A: Ja, genau. Und wir sollten auch ein Geschenk kaufen. Was meinst du?\n' +
      'B: Ich finde, wir sollten Geld von allen Kollegen sammeln und ihm einen Gutschein schenken.\n' +
      'A: Super Idee! Dann machen wir das so.',
    sampleAr:
      'أ: مرحبًا بيترا، كما تعلمين، سيترك علي الشركة الأسبوع القادم. أعتقد أنه يجب أن ننظم حفلة وداع له.\n' +
      'ب: نعم، أنا أيضًا أعتقد ذلك! متى نقيم الحفلة؟\n' +
      'أ: أقترح أن نقيمها بعد ظهر يوم الجمعة بعد العمل. ما رأيك؟\n' +
      'ب: فكرة جيدة. وأين؟ في المكتب أم في مطعم؟\n' +
      'أ: يمكننا إقامتها في غرفة الاستراحة لأن هناك مساحة كافية ولا تكلف شيئًا.\n' +
      'ب: موافقة. وماذا عن الطعام؟ هل نطلب شيئًا؟\n' +
      'أ: ما رأيك لو يحضر كل شخص شيئًا؟ مثلاً كعك أو سلطات أو وجبات خفيفة.\n' +
      'ب: يبدو جيدًا. وللمشروبات نشتري عصيرًا وماءً وقهوة.\n' +
      'أ: نعم، بالضبط. ويجب أن نشتري هدية أيضًا. ما رأيك؟\n' +
      'ب: أعتقد أنه يجب أن نجمع المال من جميع الزملاء ونهديه قسيمة شراء.\n' +
      'أ: فكرة رائعة! إذن نفعل ذلك.',
  },
  {
    id: 'spr-1-2',
    titleDe: 'Ein Thema präsentieren: Ist Homeoffice besser als im Büro arbeiten?',
    promptDe:
      'Präsentieren Sie das Thema „Homeoffice oder Büro?". Sprechen Sie über: ' +
      '• Ihre persönliche Erfahrung • Vorteile von Homeoffice • Nachteile von Homeoffice ' +
      '• Die Situation in Ihrem Heimatland • Ihre Meinung',
    promptAr:
      'قدّم موضوع "العمل من المنزل أم في المكتب؟". تحدث عن: ' +
      '• تجربتك الشخصية • مزايا العمل من المنزل • عيوب العمل من المنزل ' +
      '• الوضع في بلدك الأصلي • رأيك الشخصي',
    redemittel: [
      'Ich möchte heute über das Thema ... sprechen.',
      'Meiner Meinung nach ...',
      'Ein Vorteil ist, dass ...',
      'Ein Nachteil ist, dass ...',
      'Auf der einen Seite ..., auf der anderen Seite ...',
      'In meinem Heimatland ...',
      'Aus meiner Erfahrung kann ich sagen, dass ...',
      'Zusammenfassend möchte ich sagen, dass ...',
      'Ich bin der Meinung, dass ...',
    ],
    sampleDe:
      'Ich möchte heute über das Thema „Homeoffice oder Büro" sprechen. Dieses Thema ist besonders seit ' +
      'der Corona-Pandemie sehr aktuell geworden.\n\n' +
      'Ich persönlich habe Erfahrung mit beiden Arbeitsformen. Als ich in meinem Heimatland gearbeitet habe, ' +
      'bin ich jeden Tag ins Büro gegangen. Hier in Deutschland habe ich ein kurzes Praktikum gemacht, bei ' +
      'dem ich teilweise von zu Hause arbeiten durfte.\n\n' +
      'Es gibt viele Vorteile beim Homeoffice. Man spart Zeit und Geld für den Weg zur Arbeit. Man kann ' +
      'sich seine Zeit flexibler einteilen und in Ruhe arbeiten. Außerdem ist es besser für die Umwelt, ' +
      'weil weniger Autos auf den Straßen fahren.\n\n' +
      'Aber es gibt auch Nachteile. Man hat weniger Kontakt zu den Kollegen und fühlt sich manchmal einsam. ' +
      'Es ist schwieriger, Arbeit und Privatleben zu trennen. Manche Menschen können sich zu Hause nicht ' +
      'gut konzentrieren, besonders wenn Kinder da sind.\n\n' +
      'In meinem Heimatland war Homeoffice vor einigen Jahren noch nicht üblich. Die meisten Menschen sind ' +
      'ins Büro gegangen. Aber jetzt ändert sich das langsam.\n\n' +
      'Zusammenfassend bin ich der Meinung, dass eine Mischung aus Homeoffice und Büroarbeit am besten ist. ' +
      'Man könnte zum Beispiel zwei Tage zu Hause und drei Tage im Büro arbeiten. So hat man die Vorteile ' +
      'von beiden Arbeitsformen.',
    sampleAr:
      'أود اليوم أن أتحدث عن موضوع "العمل من المنزل أم في المكتب". أصبح هذا الموضوع شائعًا جدًا خاصة ' +
      'منذ جائحة كورونا.\n\n' +
      'شخصيًا لدي خبرة في كلا الشكلين. عندما كنت أعمل في بلدي الأصلي كنت أذهب إلى المكتب كل يوم. ' +
      'هنا في ألمانيا قمت بتدريب قصير سُمح لي خلاله بالعمل جزئيًا من المنزل.\n\n' +
      'هناك مزايا كثيرة للعمل من المنزل. يوفر المرء الوقت والمال للطريق إلى العمل. يمكنه تنظيم وقته ' +
      'بمرونة أكبر والعمل بهدوء. كما أنه أفضل للبيئة لأن عددًا أقل من السيارات يسير في الشوارع.\n\n' +
      'لكن هناك أيضًا عيوب. يكون لدى المرء تواصل أقل مع الزملاء ويشعر أحيانًا بالوحدة. من الصعب الفصل ' +
      'بين العمل والحياة الخاصة. بعض الناس لا يستطيعون التركيز جيدًا في المنزل خاصة عندما يكون الأطفال موجودين.\n\n' +
      'في بلدي الأصلي لم يكن العمل من المنزل شائعًا قبل بضع سنوات. كان معظم الناس يذهبون إلى المكتب. ' +
      'لكن الآن يتغير الوضع ببطء.\n\n' +
      'في الختام أرى أن المزج بين العمل من المنزل والعمل في المكتب هو الأفضل. يمكن للمرء مثلاً أن يعمل ' +
      'يومين من المنزل وثلاثة أيام في المكتب. هكذا يستفيد من مزايا كلا الشكلين.',
  },
];

// ============================================================
//  MODEL 2 — السفر والسكن (Reisen & Wohnen)
// ============================================================

const model2ReadingPassages: ReadingPassage[] = [
  // ---- Lesetext 1: Hotelbewertung ----
  {
    id: 'lese-2-1',
    titleDe: 'Hotelbewertung: Stadthotel Müller, Berlin',
    textDe:
      'Wir haben im August eine Woche im Stadthotel Müller in Berlin verbracht. Das Hotel liegt zentral ' +
      'in der Nähe des Alexanderplatzes, deshalb konnte man viele Sehenswürdigkeiten zu Fuß erreichen. ' +
      'Das Zimmer war sauber und modern eingerichtet, aber leider sehr klein. Für zwei Personen mit Gepäck ' +
      'war es eng. Das Frühstücksbuffet war reichhaltig mit einer großen Auswahl an Brot, Käse, Wurst und ' +
      'frischem Obst. Das Personal war freundlich und hilfsbereit. Ein großer Nachteil war der Lärm von der ' +
      'Straße, besonders nachts. Obwohl die Fenster doppelt verglast waren, konnte man den Verkehr hören. ' +
      'Das WLAN funktionierte gut und war kostenlos. Der Preis von 85 Euro pro Nacht mit Frühstück war ' +
      'angemessen für die Lage. Insgesamt würde ich das Hotel empfehlen, wenn man eine günstige Unterkunft ' +
      'im Zentrum sucht und keinen leichten Schlaf hat.',
    questions: [
      {
        id: 'q2-1-1',
        promptDe: 'Wo liegt das Stadthotel Müller?',
        options: [
          { id: 'a', de: 'Am Stadtrand von Berlin.' },
          { id: 'b', de: 'In der Nähe des Alexanderplatzes im Zentrum.' },
          { id: 'c', de: 'Neben dem Flughafen.' },
          { id: 'd', de: 'In einem ruhigen Wohngebiet.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يذكر النص أن الفندق يقع في موقع مركزي بالقرب من ألكسندربلاتس (zentral in der Nähe des Alexanderplatzes).',
      },
      {
        id: 'q2-1-2',
        promptDe: 'Was war ein Problem mit dem Zimmer?',
        options: [
          { id: 'a', de: 'Es war schmutzig.' },
          { id: 'b', de: 'Es war zu klein.' },
          { id: 'c', de: 'Es gab kein Fenster.' },
          { id: 'd', de: 'Die Möbel waren kaputt.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يصف الكاتب الغرفة بأنها نظيفة وحديثة لكن صغيرة جدًا (leider sehr klein)، وكانت ضيقة لشخصين مع أمتعة.',
      },
      {
        id: 'q2-1-3',
        promptDe: 'Was war der größte Nachteil des Hotels?',
        options: [
          { id: 'a', de: 'Das schlechte Frühstück.' },
          { id: 'b', de: 'Das unfreundliche Personal.' },
          { id: 'c', de: 'Der Lärm von der Straße, besonders nachts.' },
          { id: 'd', de: 'Das teure WLAN.' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (c). يذكر النص بوضوح أن أكبر عيب (ein großer Nachteil) كان الضوضاء من الشارع خاصة في الليل.',
      },
      {
        id: 'q2-1-4',
        promptDe: 'Für wen empfiehlt der Autor das Hotel?',
        options: [
          { id: 'a', de: 'Für Familien mit kleinen Kindern.' },
          { id: 'b', de: 'Für Menschen, die eine günstige Unterkunft im Zentrum suchen.' },
          { id: 'c', de: 'Für Geschäftsreisende.' },
          { id: 'd', de: 'Für niemanden, weil das Hotel schlecht war.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يقول الكاتب في النهاية إنه يوصي بالفندق لمن يبحث عن إقامة رخيصة في المركز ولا يمانع الضوضاء (günstige Unterkunft im Zentrum sucht und keinen leichten Schlaf hat).',
      },
    ],
  },

  // ---- Lesetext 2: Hausordnung ----
  {
    id: 'lese-2-2',
    titleDe: 'Hausordnung der Wohnanlage Grüner Weg 12–16',
    textDe:
      'Liebe Mieterinnen und Mieter, bitte beachten Sie folgende Regeln für ein gutes Zusammenleben: ' +
      'Die Nachtruhe gilt von 22:00 bis 6:00 Uhr. In dieser Zeit dürfen Sie keinen Lärm machen, also keine ' +
      'laute Musik hören, nicht bohren und keine Waschmaschine benutzen. Das Treppenhaus muss frei bleiben ' +
      'und darf nicht als Abstellplatz für Kinderwagen, Fahrräder oder Schuhe benutzt werden. Haustiere sind ' +
      'erlaubt, aber Hunde müssen im Treppenhaus an der Leine geführt werden. Der Müll muss in die richtigen ' +
      'Tonnen sortiert werden: Papier, Plastik, Biomüll und Restmüll. Grillen ist nur im Garten erlaubt und ' +
      'nicht auf dem Balkon. Für Reparaturen in Ihrer Wohnung wenden Sie sich bitte an die Hausverwaltung ' +
      'unter Tel. 030-5678900. Vielen Dank für Ihr Verständnis! Ihre Hausverwaltung',
    questions: [
      {
        id: 'q2-2-1',
        promptDe: 'Von wann bis wann gilt die Nachtruhe?',
        options: [
          { id: 'a', de: 'Von 20:00 bis 7:00 Uhr.' },
          { id: 'b', de: 'Von 22:00 bis 6:00 Uhr.' },
          { id: 'c', de: 'Von 23:00 bis 8:00 Uhr.' },
          { id: 'd', de: 'Von 21:00 bis 5:00 Uhr.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). ينص نظام البيت بوضوح على أن وقت الهدوء الليلي (Nachtruhe) يسري من الساعة 22:00 حتى 6:00 صباحًا.',
      },
      {
        id: 'q2-2-2',
        promptDe: 'Was darf man NICHT im Treppenhaus abstellen?',
        options: [
          { id: 'a', de: 'Blumen und Pflanzen.' },
          { id: 'b', de: 'Kinderwagen, Fahrräder und Schuhe.' },
          { id: 'c', de: 'Briefkästen.' },
          { id: 'd', de: 'Fußmatten.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). ينص النظام على أن الدرج يجب أن يبقى حرًا ولا يُستخدم كمكان لتخزين عربات الأطفال أو الدراجات أو الأحذية.',
      },
      {
        id: 'q2-2-3',
        promptDe: 'Wo darf man grillen?',
        options: [
          { id: 'a', de: 'Auf dem Balkon.' },
          { id: 'b', de: 'Im Treppenhaus.' },
          { id: 'c', de: 'Nur im Garten.' },
          { id: 'd', de: 'In der Küche.' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (c). يذكر النص أن الشواء مسموح فقط في الحديقة (nur im Garten erlaubt) وليس على الشرفة.',
      },
      {
        id: 'q2-2-4',
        promptDe: 'Was soll man tun, wenn etwas in der Wohnung repariert werden muss?',
        options: [
          { id: 'a', de: 'Man soll es selbst reparieren.' },
          { id: 'b', de: 'Man soll die Polizei anrufen.' },
          { id: 'c', de: 'Man soll sich an die Hausverwaltung wenden.' },
          { id: 'd', de: 'Man soll den Nachbarn fragen.' },
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (c). يشير النص إلى أنه في حالة الحاجة إلى إصلاحات يجب التواصل مع إدارة المبنى (Hausverwaltung) على الرقم المذكور.',
      },
    ],
  },

  // ---- Lesetext 3: Bahnreise-Tipps ----
  {
    id: 'lese-2-3',
    titleDe: 'Tipps für die Bahnreise in Deutschland',
    textDe:
      'Wer in Deutschland mit dem Zug reisen möchte, sollte einige Tipps beachten. Erstens: Kaufen Sie Ihre ' +
      'Fahrkarte möglichst früh, denn die Sparpreise der Deutschen Bahn sind oft viel günstiger als der ' +
      'Normalpreis. Zweitens: Das Deutschlandticket für 49 Euro im Monat gilt für alle Regionalzüge, ' +
      'S-Bahnen, U-Bahnen und Busse im ganzen Land. Es lohnt sich, wenn man regelmäßig fährt. Drittens: ' +
      'Reservieren Sie einen Sitzplatz, wenn Sie einen ICE nehmen, besonders an Freitagen und vor Feiertagen. ' +
      'Eine Reservierung kostet nur 4,50 Euro und spart viel Stress. Viertens: Laden Sie die DB Navigator-App ' +
      'herunter. Damit können Sie Verbindungen suchen, Tickets kaufen und Verspätungen in Echtzeit sehen. ' +
      'Und schließlich: Wenn Ihr Zug mehr als 60 Minuten Verspätung hat, können Sie 25 Prozent des ' +
      'Fahrpreises zurückbekommen. Dafür müssen Sie ein Formular bei der DB ausfüllen.',
    questions: [
      {
        id: 'q2-3-1',
        promptDe: 'Warum sollte man die Fahrkarte früh kaufen?',
        options: [
          { id: 'a', de: 'Weil es dann mehr Züge gibt.' },
          { id: 'b', de: 'Weil die Sparpreise oft viel günstiger sind.' },
          { id: 'c', de: 'Weil man sonst keinen Zug nehmen darf.' },
          { id: 'd', de: 'Weil die Züge dann schneller fahren.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يوضح النص أن أسعار التوفير (Sparpreise) من شركة القطارات الألمانية تكون غالبًا أرخص بكثير من السعر العادي عند الحجز المبكر.',
      },
      {
        id: 'q2-3-2',
        promptDe: 'Für welche Verkehrsmittel gilt das Deutschlandticket?',
        options: [
          { id: 'a', de: 'Nur für ICE-Züge.' },
          { id: 'b', de: 'Für Regionalzüge, S-Bahnen, U-Bahnen und Busse.' },
          { id: 'c', de: 'Nur für Busse.' },
          { id: 'd', de: 'Für Flugzeuge und Züge.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يذكر النص أن تذكرة ألمانيا صالحة لجميع القطارات الإقليمية والقطارات الحضرية ومترو الأنفاق والحافلات في كل أنحاء البلاد.',
      },
      {
        id: 'q2-3-3',
        promptDe: 'Was kann man tun, wenn der Zug mehr als 60 Minuten Verspätung hat?',
        options: [
          { id: 'a', de: 'Man bekommt ein kostenloses Hotelzimmer.' },
          { id: 'b', de: 'Man kann 25 Prozent des Fahrpreises zurückbekommen.' },
          { id: 'c', de: 'Man darf kostenlos Erste Klasse fahren.' },
          { id: 'd', de: 'Man bekommt ein kostenloses Essen im Zug.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يوضح النص أنه في حالة تأخر القطار أكثر من 60 دقيقة يمكنك استرداد 25 بالمائة من سعر التذكرة عن طريق ملء استمارة لدى شركة القطارات الألمانية.',
      },
    ],
  },

  // ---- Lesetext 4: Mitteilung der Hausverwaltung ----
  {
    id: 'lese-2-4',
    titleDe: 'Mitteilung der Hausverwaltung: Sanierung des Gebäudes',
    textDe:
      'Sehr geehrte Mieterinnen und Mieter,\n\n' +
      'wir möchten Sie darüber informieren, dass ab dem 15. September Sanierungsarbeiten in unserem Gebäude ' +
      'stattfinden werden. Die Arbeiten umfassen die Erneuerung der Heizungsanlage, die Dämmung der ' +
      'Außenwände und den Einbau neuer Fenster. Die Sanierung wird voraussichtlich drei Monate dauern. ' +
      'Während der Arbeiten kann es zu Lärm und Staub kommen, besonders zwischen 8:00 und 17:00 Uhr. ' +
      'An manchen Tagen wird das Wasser für einige Stunden abgestellt. Wir werden Sie rechtzeitig darüber ' +
      'informieren. Bitte räumen Sie Ihre Balkone frei, damit die Handwerker an den Außenwänden arbeiten ' +
      'können. Nach der Sanierung werden die Heizkosten deutlich sinken. Für Fragen stehen wir Ihnen gerne ' +
      'unter info@hausverwaltung-berlin.de zur Verfügung.\n\n' +
      'Mit freundlichen Grüßen\nIhre Hausverwaltung Berlin-Mitte',
    questions: [
      {
        id: 'q2-4-1',
        promptDe: 'Ab wann beginnen die Sanierungsarbeiten?',
        options: [
          { id: 'a', de: 'Ab dem 1. Oktober.' },
          { id: 'b', de: 'Ab dem 15. September.' },
          { id: 'c', de: 'Ab dem 1. Januar.' },
          { id: 'd', de: 'Ab nächster Woche.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يذكر الإشعار أن أعمال الترميم ستبدأ اعتبارًا من 15 سبتمبر (ab dem 15. September).',
      },
      {
        id: 'q2-4-2',
        promptDe: 'Welche Arbeiten werden durchgeführt?',
        options: [
          { id: 'a', de: 'Erneuerung der Heizung, Dämmung der Wände und neue Fenster.' },
          { id: 'b', de: 'Bau eines neuen Aufzugs.' },
          { id: 'c', de: 'Renovierung der Küchen.' },
          { id: 'd', de: 'Installation eines Swimmingpools.' },
        ],
        correct: 'a',
        explanationAr:
          'الإجابة الصحيحة هي (a). يذكر النص ثلاثة أعمال: تجديد نظام التدفئة (Erneuerung der Heizungsanlage) وعزل الجدران الخارجية (Dämmung der Außenwände) وتركيب نوافذ جديدة (Einbau neuer Fenster).',
      },
      {
        id: 'q2-4-3',
        promptDe: 'Was sollen die Mieter mit ihren Balkonen machen?',
        options: [
          { id: 'a', de: 'Blumen pflanzen.' },
          { id: 'b', de: 'Die Balkone frei räumen.' },
          { id: 'c', de: 'Die Balkone streichen.' },
          { id: 'd', de: 'Neue Möbel kaufen.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). تطلب إدارة المبنى من المستأجرين إخلاء شرفاتهم (Balkone frei räumen) حتى يتمكن الحرفيون من العمل على الجدران الخارجية.',
      },
      {
        id: 'q2-4-4',
        promptDe: 'Was ist ein Vorteil der Sanierung für die Mieter?',
        options: [
          { id: 'a', de: 'Die Miete wird billiger.' },
          { id: 'b', de: 'Die Heizkosten werden deutlich sinken.' },
          { id: 'c', de: 'Jeder bekommt einen Parkplatz.' },
          { id: 'd', de: 'Es gibt einen neuen Aufzug.' },
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (b). يذكر النص أنه بعد الترميم ستنخفض تكاليف التدفئة بشكل ملحوظ (Heizkosten werden deutlich sinken).',
      },
    ],
  },
];

// ---- Sprachbausteine: Modell 2 ----

const model2Sprachbausteine: Sprachbaustein[] = [
  {
    id: 'sb-2-1',
    contextDe: 'Nachdem wir die Koffer ___, sind wir zum Bahnhof gefahren.',
    options: [
      { id: 'a', de: 'packen' },
      { id: 'b', de: 'gepackt hatten' },
      { id: 'c', de: 'gepackt haben' },
      { id: 'd', de: 'packten' },
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (b) "gepackt hatten". نستخدم هنا زمن الماضي التام (Plusquamperfekt) لأن "nachdem" تربط حدثين في الماضي: الأول (حزم الحقائب) حدث قبل الثاني (الذهاب إلى المحطة). الحدث الأسبق يكون في Plusquamperfekt = hatten + Partizip II.',
  },
  {
    id: 'sb-2-2',
    contextDe: '___ ich ein Kind war, haben wir jeden Sommer am Meer Urlaub gemacht.',
    options: [
      { id: 'a', de: 'Wenn' },
      { id: 'b', de: 'Als' },
      { id: 'c', de: 'Wann' },
      { id: 'd', de: 'Ob' },
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (b) "Als". نستخدم "als" للأحداث التي حدثت مرة واحدة في الماضي أو لفترة زمنية في الماضي. "عندما كنت طفلاً" تصف فترة في الماضي. بينما "wenn" تُستخدم للأحداث المتكررة أو في المضارع والمستقبل.',
  },
  {
    id: 'sb-2-3',
    contextDe: 'Wir suchen eine ___ Wohnung in der Nähe der U-Bahn.',
    options: [
      { id: 'a', de: 'große' },
      { id: 'b', de: 'großer' },
      { id: 'c', de: 'großes' },
      { id: 'd', de: 'großem' },
    ],
    correct: 'a',
    explanationAr:
      'الإجابة الصحيحة هي (a) "große". صرف الصفة مع أداة نكرة (eine): "die Wohnung" مؤنث وهنا في حالة النصب (Akkusativ) لأنها مفعول به للفعل "suchen". مع "eine" في Akkusativ المؤنث، نهاية الصفة تكون "-e": eine große Wohnung.',
  },
  {
    id: 'sb-2-4',
    contextDe: 'Ich interessiere mich ___ die Geschichte dieser Stadt.',
    options: [
      { id: 'a', de: 'auf' },
      { id: 'b', de: 'über' },
      { id: 'c', de: 'für' },
      { id: 'd', de: 'an' },
    ],
    correct: 'c',
    explanationAr:
      'الإجابة الصحيحة هي (c) "für". الفعل "sich interessieren" يتطلب حرف الجر "für" + Akkusativ. هذا من الأفعال مع حروف جر ثابتة (Verben mit festen Präpositionen) التي يجب حفظها. sich interessieren für = يهتم بـ.',
  },
  {
    id: 'sb-2-5',
    contextDe: '___ ich nach Deutschland kam, konnte ich kein Wort Deutsch.',
    options: [
      { id: 'a', de: 'Wenn' },
      { id: 'b', de: 'Weil' },
      { id: 'c', de: 'Als' },
      { id: 'd', de: 'Damit' },
    ],
    correct: 'c',
    explanationAr:
      'الإجابة الصحيحة هي (c) "Als". حدث المجيء إلى ألمانيا وقع مرة واحدة في الماضي، لذلك نستخدم "als" وليس "wenn". القاعدة: als = حدث واحد في الماضي، wenn = أحداث متكررة أو في المضارع/المستقبل.',
  },
  {
    id: 'sb-2-6',
    contextDe: 'Das Hotelzimmer war leider nicht so gut, wie wir es uns ___ hatten.',
    options: [
      { id: 'a', de: 'vorgestellt' },
      { id: 'b', de: 'vorstellen' },
      { id: 'c', de: 'vorstellten' },
      { id: 'd', de: 'vorstellt' },
    ],
    correct: 'a',
    explanationAr:
      'الإجابة الصحيحة هي (a) "vorgestellt". الزمن هنا هو Plusquamperfekt (الماضي التام): hatten + Partizip II. الفعل "sich vorstellen" (يتخيل/يتصور) في صيغة Partizip II يصبح "vorgestellt". الجملة تعني: لم تكن الغرفة جيدة كما كنا قد تصورنا.',
  },
  {
    id: 'sb-2-7',
    contextDe: 'Mein Nachbar hat sich ___ den Lärm beschwert.',
    options: [
      { id: 'a', de: 'auf' },
      { id: 'b', de: 'über' },
      { id: 'c', de: 'für' },
      { id: 'd', de: 'von' },
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (b) "über". الفعل "sich beschweren" يتطلب حرف الجر "über" + Akkusativ. sich beschweren über = يشتكي من. هذا أيضًا من الأفعال مع حروف جر ثابتة.',
  },
  {
    id: 'sb-2-8',
    contextDe: 'In dem ___ Hotel gibt es ein Schwimmbad und eine Sauna.',
    options: [
      { id: 'a', de: 'neue' },
      { id: 'b', de: 'neuem' },
      { id: 'c', de: 'neuen' },
      { id: 'd', de: 'neuer' },
    ],
    correct: 'c',
    explanationAr:
      'الإجابة الصحيحة هي (c) "neuen". صرف الصفة مع أداة التعريف "dem": "das Hotel" محايد (Neutrum) وهنا في حالة الجر (Dativ) بسبب حرف الجر "in" (أين؟ = Dativ). بعد "dem" في Dativ، تكون نهاية الصفة دائمًا "-en": in dem neuen Hotel.',
  },
];

// ---- Schreiben: Modell 2 ----

const model2SchreibenParts: SchreibenPart[] = [
  {
    id: 'sch-2-1',
    titleDe: 'Formeller Brief: Beschwerde an ein Hotel',
    promptDe:
      'Sie haben im „Seehotel Panorama" übernachtet und waren nicht zufrieden. ' +
      'Schreiben Sie einen formellen Brief an die Hotelleitung. Schreiben Sie zu folgenden Punkten: ' +
      '• Wann waren Sie im Hotel? • Was war das Problem? • Was erwarten Sie vom Hotel? • Wie soll das Hotel reagieren?',
    promptAr:
      'لقد أقمت في "فندق بانوراما البحيرة" ولم تكن راضيًا. ' +
      'اكتب رسالة رسمية إلى إدارة الفندق. اكتب عن النقاط التالية: ' +
      '• متى كنت في الفندق؟ • ما هي المشكلة؟ • ماذا تتوقع من الفندق؟ • كيف يجب أن يتصرف الفندق؟',
    redemittel: [
      'Sehr geehrte Damen und Herren,',
      'ich war vom ... bis ... Gast in Ihrem Hotel.',
      'Leider muss ich Ihnen mitteilen, dass ...',
      'Ich war sehr enttäuscht, weil ...',
      'Ich bitte Sie, ...',
      'Ich erwarte eine Antwort bis zum ...',
      'Sollte ich keine Antwort erhalten, werde ich ...',
      'Mit freundlichen Grüßen',
    ],
    sampleDe:
      'Sehr geehrte Damen und Herren,\n\n' +
      'ich war vom 10. bis 14. Juli Gast in Ihrem Seehotel Panorama und hatte ein Doppelzimmer mit ' +
      'Seeblick gebucht (Buchungsnummer: 45892). Leider muss ich Ihnen mitteilen, dass ich mit meinem ' +
      'Aufenthalt sehr unzufrieden war.\n\n' +
      'Als wir ankamen, war unser Zimmer noch nicht fertig, obwohl wir erst um 16 Uhr eincheckten. Wir ' +
      'mussten eine Stunde in der Lobby warten. Das Zimmer hatte keinen Seeblick, wie wir gebucht hatten, ' +
      'sondern einen Blick auf den Parkplatz. Außerdem funktionierte die Klimaanlage nicht, und es war ' +
      'im Juli sehr heiß. Ich habe mich an der Rezeption beschwert, aber niemand hat das Problem gelöst.\n\n' +
      'Ich bitte Sie, mir einen Teil des Preises zurückzuerstatten, weil ich nicht die Leistung bekommen ' +
      'habe, die ich gebucht und bezahlt hatte. Ich erwarte eine Antwort bis zum 30. Juli. Sollte ich ' +
      'keine Antwort erhalten, werde ich mich an eine Verbraucherzentrale wenden.\n\n' +
      'Mit freundlichen Grüßen\nSarah Al-Ahmad',
    sampleAr:
      'سيداتي وسادتي الأعزاء،\n\n' +
      'كنت نزيلة في فندق بانوراما البحيرة من 10 إلى 14 يوليو وحجزت غرفة مزدوجة بإطلالة على البحيرة ' +
      '(رقم الحجز: 45892). للأسف يجب أن أبلغكم بأنني كنت غير راضية جدًا عن إقامتي.\n\n' +
      'عندما وصلنا لم تكن غرفتنا جاهزة بعد رغم أننا سجلنا الدخول في الساعة الرابعة مساءً. اضطررنا ' +
      'للانتظار ساعة في الردهة. لم تكن الغرفة بإطلالة على البحيرة كما حجزنا بل كانت تطل على موقف ' +
      'السيارات. بالإضافة إلى ذلك لم يكن مكيف الهواء يعمل وكان الجو حارًا جدًا في يوليو. اشتكيت ' +
      'في الاستقبال لكن لم يحل أحد المشكلة.\n\n' +
      'أطلب منكم إعادة جزء من السعر لأنني لم أحصل على الخدمة التي حجزتها ودفعت ثمنها. أتوقع ردًا ' +
      'حتى 30 يوليو. إذا لم أتلقَ ردًا سأتوجه إلى مركز حماية المستهلك.\n\n' +
      'مع أطيب التحيات\nسارة الأحمد',
  },
  {
    id: 'sch-2-2',
    titleDe: 'Halbformelle E-Mail: Reparatur in der Wohnung',
    promptDe:
      'In Ihrer Mietwohnung ist die Heizung kaputt. Schreiben Sie eine E-Mail an Ihren Vermieter, Herrn Weber. ' +
      'Schreiben Sie zu folgenden Punkten: ' +
      '• Was ist das Problem? • Seit wann? • Warum ist es dringend? • Wann soll der Handwerker kommen?',
    promptAr:
      'نظام التدفئة في شقتك المستأجرة معطل. اكتب بريدًا إلكترونيًا إلى مالك الشقة السيد ويبر. ' +
      'اكتب عن النقاط التالية: ' +
      '• ما هي المشكلة؟ • منذ متى؟ • لماذا الأمر عاجل؟ • متى يجب أن يأتي الفني؟',
    redemittel: [
      'Sehr geehrter Herr Weber,',
      'ich schreibe Ihnen wegen ...',
      'Seit ... funktioniert ... nicht mehr.',
      'Das Problem ist, dass ...',
      'Ich bitte Sie dringend, ...',
      'Wäre es möglich, dass ...?',
      'Ich bin zu folgenden Zeiten zu Hause: ...',
      'Vielen Dank im Voraus.',
    ],
    sampleDe:
      'Sehr geehrter Herr Weber,\n\n' +
      'ich schreibe Ihnen wegen eines dringenden Problems in meiner Wohnung in der Schillerstraße 45, ' +
      '2. OG links. Seit drei Tagen funktioniert die Heizung in meiner Wohnung nicht mehr. Ich habe ' +
      'versucht, den Thermostat einzustellen, aber die Heizkörper bleiben kalt.\n\n' +
      'Das Problem ist besonders dringend, weil es draußen sehr kalt ist und die Temperaturen unter null ' +
      'Grad liegen. In der Wohnung sind es nur noch 14 Grad, und ich habe zwei kleine Kinder. Das ist ' +
      'für uns nicht zumutbar.\n\n' +
      'Ich bitte Sie dringend, so schnell wie möglich einen Handwerker zu schicken. Wäre es möglich, ' +
      'dass der Handwerker morgen oder übermorgen kommt? Ich bin vormittags zwischen 8 und 12 Uhr ' +
      'und nachmittags ab 15 Uhr zu Hause.\n\n' +
      'Bitte informieren Sie mich, wann der Handwerker kommen kann. Vielen Dank im Voraus für Ihre ' +
      'schnelle Hilfe.\n\n' +
      'Mit freundlichen Grüßen\nOmar Khalil\nTel: 0176-12345678',
    sampleAr:
      'السيد ويبر المحترم،\n\n' +
      'أكتب إليكم بخصوص مشكلة عاجلة في شقتي في شارع شيلر 45 الطابق الثاني يسار. منذ ثلاثة أيام ' +
      'لا يعمل نظام التدفئة في شقتي. حاولت ضبط منظم الحرارة لكن المشعات تبقى باردة.\n\n' +
      'المشكلة عاجلة بشكل خاص لأن الطقس بارد جدًا في الخارج ودرجات الحرارة تحت الصفر. في الشقة ' +
      'لم تعد الحرارة سوى 14 درجة ولدي طفلان صغيران. هذا الوضع لا يُحتمل بالنسبة لنا.\n\n' +
      'أرجو منكم بشكل عاجل إرسال فني في أسرع وقت ممكن. هل من الممكن أن يأتي الفني غدًا أو بعد ' +
      'غد؟ أنا موجود في المنزل صباحًا بين الساعة 8 و12 وبعد الظهر من الساعة 3.\n\n' +
      'يرجى إعلامي متى يمكن أن يأتي الفني. شكرًا جزيلاً مقدمًا على مساعدتكم السريعة.\n\n' +
      'مع أطيب التحيات\nعمر خليل\nهاتف: 0176-12345678',
  },
];

// ---- Sprechen: Modell 2 ----

const model2SprechenParts: SprechenPart[] = [
  {
    id: 'spr-2-1',
    titleDe: 'Gemeinsam etwas planen: Einen Wochenendausflug organisieren',
    promptDe:
      'Sie und Ihr Freund / Ihre Freundin möchten am Wochenende einen Ausflug machen. ' +
      'Planen Sie gemeinsam den Ausflug. Sprechen Sie über: ' +
      '• Wohin? • Wie kommen Sie dorthin? • Was nehmen Sie mit? • Was machen Sie dort? • Kosten',
    promptAr:
      'أنت وصديقك/صديقتك تريدان القيام برحلة في نهاية الأسبوع. ' +
      'خططوا معًا للرحلة. تحدثوا عن: ' +
      '• إلى أين؟ • كيف تصلون إلى هناك؟ • ماذا تأخذون معكم؟ • ماذا تفعلون هناك؟ • التكاليف',
    redemittel: [
      'Hast du Lust, am Wochenende ...?',
      'Ich würde gerne nach ... fahren.',
      'Wie wäre es mit ...?',
      'Wir könnten mit dem Zug / Auto fahren.',
      'Vergiss nicht, ... mitzunehmen.',
      'Das hört sich gut an!',
      'Ja, das machen wir!',
      'Ich kümmere mich um ...',
      'Wollen wir uns um ... Uhr treffen?',
    ],
    sampleDe:
      'A: Hast du Lust, am Wochenende einen Ausflug zu machen? Das Wetter soll schön werden!\n' +
      'B: Ja, sehr gerne! Wohin möchtest du fahren?\n' +
      'A: Ich würde gerne an den Bodensee fahren. Was meinst du?\n' +
      'B: Das hört sich toll an! Aber ist das nicht zu weit? Wie kommen wir dorthin?\n' +
      'A: Wir könnten mit dem Zug fahren. Mit dem Deutschlandticket kostet es nichts extra.\n' +
      'B: Stimmt, das ist praktisch. Und was machen wir dort?\n' +
      'A: Wir könnten am See spazieren gehen, die Altstadt besichtigen und vielleicht ein Boot mieten.\n' +
      'B: Wie wäre es, wenn wir auch ein Picknick am See machen? Ich könnte Sandwiches und Obst mitbringen.\n' +
      'A: Super Idee! Ich bringe Getränke und eine Decke mit. Vergiss nicht, Sonnencreme mitzunehmen.\n' +
      'B: Guter Punkt! Wollen wir uns um 8 Uhr am Hauptbahnhof treffen?\n' +
      'A: Ja, 8 Uhr passt gut. Dann haben wir den ganzen Tag Zeit. Ich freue mich schon!\n' +
      'B: Ich mich auch! Bis Samstag dann!',
    sampleAr:
      'أ: هل تريد القيام برحلة في نهاية الأسبوع؟ يُقال إن الطقس سيكون جميلاً!\n' +
      'ب: نعم، بكل سرور! إلى أين تريد أن تذهب؟\n' +
      'أ: أود الذهاب إلى بحيرة بودن. ما رأيك؟\n' +
      'ب: يبدو رائعًا! لكن أليس بعيدًا جدًا؟ كيف سنصل إلى هناك؟\n' +
      'أ: يمكننا الذهاب بالقطار. مع تذكرة ألمانيا لا تكلف إضافية.\n' +
      'ب: صحيح، هذا عملي. وماذا سنفعل هناك؟\n' +
      'أ: يمكننا التنزه بجانب البحيرة وزيارة البلدة القديمة وربما استئجار قارب.\n' +
      'ب: ما رأيك لو نقوم بنزهة على البحيرة أيضًا؟ يمكنني إحضار سندويشات وفاكهة.\n' +
      'أ: فكرة رائعة! أنا أحضر المشروبات وبطانية. لا تنسَ أن تحضر واقي الشمس.\n' +
      'ب: نقطة جيدة! هل نتقابل الساعة 8 في المحطة الرئيسية؟\n' +
      'أ: نعم، الساعة 8 مناسبة. عندها سيكون لدينا اليوم كله. أنا متحمس!\n' +
      'ب: أنا أيضًا! إلى يوم السبت إذن!',
  },
  {
    id: 'spr-2-2',
    titleDe: 'Ein Thema präsentieren: Wohnen in der Stadt oder auf dem Land?',
    promptDe:
      'Präsentieren Sie das Thema „Wohnen in der Stadt oder auf dem Land?". Sprechen Sie über: ' +
      '• Ihre persönliche Erfahrung • Vorteile des Stadtlebens • Vorteile des Landlebens ' +
      '• Die Situation in Ihrem Heimatland • Ihre Meinung',
    promptAr:
      'قدّم موضوع "السكن في المدينة أم في الريف؟". تحدث عن: ' +
      '• تجربتك الشخصية • مزايا الحياة في المدينة • مزايا الحياة في الريف ' +
      '• الوضع في بلدك الأصلي • رأيك الشخصي',
    redemittel: [
      'Mein Thema heute ist ...',
      'Ich selbst wohne in ...',
      'Ein großer Vorteil der Stadt ist, dass ...',
      'Auf dem Land hingegen ...',
      'In meinem Heimatland ist es so, dass ...',
      'Einerseits ..., andererseits ...',
      'Ich persönlich bevorzuge ..., weil ...',
      'Abschließend möchte ich sagen, dass ...',
      'Meiner Erfahrung nach ...',
    ],
    sampleDe:
      'Mein Thema heute ist die Frage, ob es besser ist, in der Stadt oder auf dem Land zu wohnen. ' +
      'Das ist eine wichtige Frage, besonders wenn man als Neuankömmling in Deutschland eine Wohnung sucht.\n\n' +
      'Ich selbst wohne seit zwei Jahren in einer Großstadt in Deutschland. Vorher habe ich in einer ' +
      'kleinen Stadt in meinem Heimatland gelebt, deshalb kenne ich beide Situationen.\n\n' +
      'Ein großer Vorteil der Stadt ist, dass es viele öffentliche Verkehrsmittel gibt. Man braucht kein ' +
      'Auto und kann alles schnell erreichen: Ärzte, Einkaufsmöglichkeiten, Behörden und Sprachschulen. ' +
      'Außerdem gibt es in der Stadt mehr Arbeitsmöglichkeiten und kulturelle Angebote wie Theater, ' +
      'Museen und Kinos.\n\n' +
      'Auf dem Land hingegen ist die Luft sauberer und es gibt mehr Natur und Ruhe. Die Mieten sind ' +
      'deutlich günstiger als in der Stadt. Für Familien mit Kindern ist das Land oft besser, weil die ' +
      'Kinder draußen spielen können und die Nachbarschaft ruhiger ist. Allerdings braucht man auf dem ' +
      'Land fast immer ein Auto, weil die Busse nur selten fahren.\n\n' +
      'In meinem Heimatland leben die meisten Menschen in Städten, weil dort die Universitäten und die ' +
      'Arbeitsplätze sind. Aber viele Familien haben auch ein Haus auf dem Land, wo sie am Wochenende ' +
      'hinfahren.\n\n' +
      'Ich persönlich bevorzuge das Stadtleben, weil ich die kurzen Wege und die vielen Angebote schätze. ' +
      'Aber ich verstehe auch, warum manche Menschen lieber auf dem Land wohnen. Abschließend möchte ich ' +
      'sagen, dass jeder selbst entscheiden muss, was besser zu seinem Leben passt. Es gibt keine ' +
      'richtige oder falsche Antwort.',
    sampleAr:
      'موضوعي اليوم هو مسألة هل الأفضل السكن في المدينة أم في الريف. هذا سؤال مهم خاصة عندما يبحث ' +
      'المرء كقادم جديد في ألمانيا عن شقة.\n\n' +
      'أنا شخصيًا أسكن منذ سنتين في مدينة كبيرة في ألمانيا. قبل ذلك عشت في مدينة صغيرة في بلدي ' +
      'الأصلي لذلك أعرف كلتا الحالتين.\n\n' +
      'ميزة كبيرة للمدينة هي وجود وسائل نقل عام كثيرة. لا يحتاج المرء سيارة ويمكنه الوصول إلى كل ' +
      'شيء بسرعة: الأطباء ومراكز التسوق والدوائر الحكومية ومدارس اللغات. كما توجد في المدينة فرص ' +
      'عمل أكثر وعروض ثقافية مثل المسارح والمتاحف ودور السينما.\n\n' +
      'في الريف من ناحية أخرى يكون الهواء أنظف وتوجد طبيعة وهدوء أكثر. الإيجارات أرخص بكثير من ' +
      'المدينة. للعائلات التي لديها أطفال يكون الريف أفضل غالبًا لأن الأطفال يمكنهم اللعب في الخارج ' +
      'والجوار أهدأ. لكن في الريف يحتاج المرء دائمًا تقريبًا سيارة لأن الحافلات تسير نادرًا.\n\n' +
      'في بلدي الأصلي يعيش معظم الناس في المدن لأن الجامعات وأماكن العمل هناك. لكن كثير من العائلات ' +
      'لديها أيضًا بيت في الريف يذهبون إليه في نهاية الأسبوع.\n\n' +
      'أنا شخصيًا أفضل حياة المدينة لأنني أقدر المسافات القصيرة والعروض الكثيرة. لكنني أفهم أيضًا ' +
      'لماذا يفضل بعض الناس العيش في الريف. في الختام أود أن أقول إن على كل شخص أن يقرر بنفسه ما ' +
      'يناسب حياته أكثر. لا توجد إجابة صحيحة أو خاطئة.',
  },
];

// ============================================================
//  ASSEMBLED MODELS
// ============================================================

export const b1Models: B1Model[] = [
  {
    id: 'goethe-b1-1',
    titleAr: 'نموذج 1 — العمل والتعليم',
    titleDe: 'Modelltest 1 — Arbeit & Ausbildung',
    level: 'B1',
    durationMin: 150,
    readingPassages: model1ReadingPassages,
    sprachbausteine: model1Sprachbausteine,
    schreibenParts: model1SchreibenParts,
    sprechenParts: model1SprechenParts,
  },
  {
    id: 'goethe-b1-2',
    titleAr: 'نموذج 2 — السفر والسكن',
    titleDe: 'Modelltest 2 — Reisen & Wohnen',
    level: 'B1',
    durationMin: 150,
    readingPassages: model2ReadingPassages,
    sprachbausteine: model2Sprachbausteine,
    schreibenParts: model2SchreibenParts,
    sprechenParts: model2SprechenParts,
  },
];
