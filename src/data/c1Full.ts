// =============================================================================
// C1 Full Model Tests — telc C1 Hochschule / TestDaF
// Target Audience: Arabic Speakers
// =============================================================================

export interface C1Option {
  id: string;
  de: string;
}

export interface C1Question {
  id: string;
  promptDe: string;
  options: C1Option[];
  correct: string;
  explanationAr: string;
}

export interface C1ReadingPassage {
  id: string;
  titleDe: string;
  textDe: string;
  questions: C1Question[];
}

export interface C1Sprachbaustein {
  id: string;
  contextDe: string;
  options: C1Option[];
  correct: string;
  explanationAr: string;
}

export interface C1SchreibenPart {
  id: string;
  titleDe: string;
  promptDe: string;
  promptAr: string;
  redemittel: string[];
  sampleDe: string;
  sampleAr: string;
}

export interface C1SprechenPart {
  id: string;
  titleDe: string;
  promptDe: string;
  promptAr: string;
  redemittel: string[];
  sampleDe: string;
  sampleAr: string;
}

export interface C1Model {
  id: string;
  titleAr: string;
  titleDe: string;
  level: string;
  durationMin: number;
  readingPassages: C1ReadingPassage[];
  sprachbausteine: C1Sprachbaustein[];
  schreibenParts: C1SchreibenPart[];
  sprechenParts: C1SprechenPart[];
}

// =============================================================================
// MODEL 1: العلم والتكنولوجيا — Wissenschaft & Technologie
// =============================================================================

const model1ReadingPassages: C1ReadingPassage[] = [
  // ─── Reading Passage 1: Digitalisierung und Bildung ───
  {
    id: 'lese-1-1',
    titleDe: 'Digitalisierung und Bildung — Chancen und Herausforderungen für das deutsche Schulsystem',
    textDe:
      'Die Digitalisierung hat in den vergangenen Jahren nahezu alle Lebensbereiche durchdrungen und ' +
      'dabei tiefgreifende Veränderungen in der Art und Weise hervorgerufen, wie Menschen arbeiten, ' +
      'kommunizieren und lernen. Insbesondere im Bildungsbereich wird seit geraumer Zeit eine intensive ' +
      'Debatte darüber geführt, inwieweit digitale Technologien den Unterricht bereichern oder ob sie ' +
      'womöglich traditionelle Lernformen verdrängen könnten. Befürworter der Digitalisierung argumentieren, ' +
      'dass der Einsatz von Tablets, interaktiven Whiteboards und Lernplattformen die individuelle ' +
      'Förderung von Schülerinnen und Schülern erheblich verbessern könne. Durch adaptive Lernsoftware ' +
      'sei es möglich, den Lernstoff an das jeweilige Leistungsniveau anzupassen und somit sowohl ' +
      'leistungsstarke als auch leistungsschwächere Lernende optimal zu unterstützen. Kritiker hingegen ' +
      'warnen vor einer zunehmenden Abhängigkeit von technischen Geräten und befürchten, dass die ' +
      'sozialen Kompetenzen der Kinder darunter leiden könnten. Zudem bestehe die Gefahr einer ' +
      'digitalen Spaltung, da nicht alle Familien über die gleichen technischen Voraussetzungen ' +
      'verfügten. Eine Studie der Bertelsmann-Stiftung aus dem Jahr 2023 kam zu dem Ergebnis, dass ' +
      'rund 40 Prozent der deutschen Schulen noch immer über keine ausreichende digitale Infrastruktur ' +
      'verfügen. Darüber hinaus fehle es vielen Lehrkräften an der notwendigen Fortbildung, um digitale ' +
      'Medien gewinnbringend im Unterricht einzusetzen. Die Kultusministerkonferenz hat daher einen ' +
      'umfassenden Digitalpakt beschlossen, der die technische Ausstattung der Schulen verbessern und ' +
      'die Medienkompetenz der Lehrkräfte stärken soll. Experten sind sich einig, dass die erfolgreiche ' +
      'Integration digitaler Medien in den Schulalltag nicht nur eine Frage der Technik, sondern vor ' +
      'allem eine pädagogische Herausforderung darstellt, die ein durchdachtes Konzept erfordert.',
    questions: [
      {
        id: 'q1-1-1',
        promptDe: 'Was wird laut Text als Hauptvorteil der Digitalisierung im Bildungsbereich genannt?',
        options: [
          { id: 'a', de: 'Die Senkung der Kosten für Schulbücher' },
          { id: 'b', de: 'Die Möglichkeit der individuellen Förderung durch adaptive Lernsoftware' },
          { id: 'c', de: 'Die vollständige Ersetzung der Lehrkräfte durch Computer' },
          { id: 'd', de: 'Die Verkürzung der Schulzeit auf zehn Jahre' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يذكر النص صراحةً أن المؤيدين يرون أن البرامج التعليمية التكيفية (adaptive Lernsoftware) ' +
          'تُمكّن من تكييف المادة الدراسية مع مستوى أداء كل طالب على حدة، مما يدعم الطلاب الأقوياء والأضعف على حد سواء. ' +
          'لاحظ استخدام صيغة الـ Konjunktiv I (könne, sei) للإشارة إلى الكلام غير المباشر — وهذا أسلوب أكاديمي شائع في المستوى C1. ' +
          'الخيارات الأخرى لا تُذكر في النص على الإطلاق.'
      },
      {
        id: 'q1-1-2',
        promptDe: 'Welche Befürchtung äußern die Kritiker der Digitalisierung im Bildungsbereich?',
        options: [
          { id: 'a', de: 'Dass die Schüler zu viel Sport treiben' },
          { id: 'b', de: 'Dass die Lehrkräfte arbeitslos werden' },
          { id: 'c', de: 'Dass die sozialen Kompetenzen der Kinder leiden könnten und eine digitale Spaltung entstehe' },
          { id: 'd', de: 'Dass die Schulgebäude renoviert werden müssen' }
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (ج). يوضح النص أن النقّاد يخشون تأثيراً سلبياً على الكفاءات الاجتماعية للأطفال، ' +
          'فضلاً عن خطر الانقسام الرقمي (digitale Spaltung) لأن ليس كل الأسر تمتلك نفس الإمكانيات التقنية. ' +
          'لاحظ التركيب النحوي: "warnen vor + Dativ" (يحذّرون من) و"befürchten, dass..." (يخشون أن...). ' +
          'هذه أفعال مهمة للتعبير عن المخاوف في المستوى C1.'
      },
      {
        id: 'q1-1-3',
        promptDe: 'Was ergab die Studie der Bertelsmann-Stiftung?',
        options: [
          { id: 'a', de: 'Alle Schulen in Deutschland sind vollständig digitalisiert' },
          { id: 'b', de: 'Etwa 40 Prozent der Schulen verfügen über keine ausreichende digitale Infrastruktur' },
          { id: 'c', de: 'Die meisten Lehrkräfte lehnen digitale Medien kategorisch ab' },
          { id: 'd', de: 'Der Digitalpakt wurde von den Schulen nicht angenommen' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يذكر النص حرفياً أن حوالي 40 بالمائة من المدارس الألمانية لا تزال تفتقر إلى ' +
          'بنية تحتية رقمية كافية. لاحظ الفعل "verfügen über + Akkusativ" الذي يعني "يمتلك/يتوفر لديه". ' +
          'وكذلك استخدام "noch immer" (لا يزال) التي تعبر عن استمرار الحالة. ' +
          'هذا النوع من الأسئلة يختبر فهمك التفصيلي للمعلومات الرقمية والإحصائية في النص.'
      },
      {
        id: 'q1-1-4',
        promptDe: 'Was hat die Kultusministerkonferenz beschlossen?',
        options: [
          { id: 'a', de: 'Die Abschaffung aller digitalen Geräte an Schulen' },
          { id: 'b', de: 'Die Einführung einer einheitlichen Schuluniform' },
          { id: 'c', de: 'Einen umfassenden Digitalpakt zur Verbesserung der technischen Ausstattung und Lehrerfortbildung' },
          { id: 'd', de: 'Die Verlängerung der Sommerferien um zwei Wochen' }
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (ج). يشير النص إلى أن مؤتمر وزراء التعليم (Kultusministerkonferenz — وهو اختصاره KMK) ' +
          'قرر ميثاقاً رقمياً شاملاً (umfassenden Digitalpakt) لتحسين التجهيزات التقنية وتعزيز الكفاءة الإعلامية للمعلمين. ' +
          'لاحظ البنية: "hat...beschlossen" (Perfekt) و"der...verbessern und...stärken soll" (جملة موصولة مع sollen). ' +
          'الكلمة "umfassend" تعني "شامل" وهي صفة مهمة في المستوى C1.'
      },
      {
        id: 'q1-1-5',
        promptDe: 'Was ist laut Experten die wichtigste Voraussetzung für eine erfolgreiche Digitalisierung der Schulen?',
        options: [
          { id: 'a', de: 'Schnelleres Internet in allen Klassenzimmern' },
          { id: 'b', de: 'Ein durchdachtes pädagogisches Konzept, nicht nur technische Ausstattung' },
          { id: 'c', de: 'Die Einstellung von IT-Fachkräften an jeder Schule' },
          { id: 'd', de: 'Die Reduktion der Klassengröße auf maximal 15 Schüler' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يختتم النص بالإشارة إلى أن الخبراء يتفقون على أن الدمج الناجح للوسائط الرقمية ' +
          'ليس مجرد مسألة تقنية بل هو في المقام الأول تحدٍّ تربوي يتطلب مفهوماً مدروساً. ' +
          'لاحظ التركيب: "nicht nur...sondern vor allem" (ليس فقط...بل في المقام الأول) — ' +
          'وهو من الروابط المهمة في المستوى C1. كذلك "ein durchdachtes Konzept" تعني "مفهوم/خطة مدروسة" ' +
          'وهي عبارة أكاديمية شائعة.'
      }
    ]
  },

  // ─── Reading Passage 2: Klimawandel und Verantwortung ───
  {
    id: 'lese-1-2',
    titleDe: 'Klimawandel und Verantwortung — Zwischen individuellem Handeln und politischer Steuerung',
    textDe:
      'Der Klimawandel gehört zweifellos zu den drängendsten Herausforderungen unserer Zeit und erfordert ' +
      'ein grundlegendes Umdenken in Politik, Wirtschaft und Gesellschaft. Während die wissenschaftlichen ' +
      'Erkenntnisse über die Ursachen und Folgen der globalen Erwärmung weitgehend unstrittig sind, ' +
      'herrscht nach wie vor Uneinigkeit darüber, wer die Hauptverantwortung für die Bekämpfung des ' +
      'Klimawandels tragen sollte. Auf der einen Seite wird argumentiert, dass vor allem die Industrieländer, ' +
      'die historisch den größten Anteil an den Treibhausgasemissionen haben, eine besondere Verpflichtung ' +
      'zur Reduktion ihres CO₂-Ausstoßes hätten. Auf der anderen Seite betonen Vertreter der Schwellen- ' +
      'und Entwicklungsländer, dass eine einseitige Belastung ihrer Volkswirtschaften das wirtschaftliche ' +
      'Wachstum gefährde und die soziale Ungleichheit verschärfe. Die Bundesregierung hat sich im Rahmen ' +
      'des Pariser Klimaabkommens dazu verpflichtet, die Treibhausgasemissionen bis 2045 auf netto null ' +
      'zu reduzieren. Um dieses ambitionierte Ziel zu erreichen, wurde das Klimaschutzgesetz verabschiedet, ' +
      'das verbindliche Emissionsminderungsziele für verschiedene Sektoren wie Energie, Verkehr, Industrie ' +
      'und Gebäude festlegt. Dennoch bleibt die Umsetzung eine gewaltige Aufgabe, zumal der Ausbau ' +
      'erneuerbarer Energien vielerorts auf Widerstand in der Bevölkerung stößt. Gleichzeitig gewinnt ' +
      'die Debatte über die individuelle Verantwortung an Bedeutung: Können Verbraucherinnen und ' +
      'Verbraucher durch bewusste Konsumentscheidungen — etwa den Verzicht auf Flugreisen oder den ' +
      'Umstieg auf pflanzliche Ernährung — tatsächlich einen messbaren Beitrag zum Klimaschutz leisten? ' +
      'Oder lenkt die Fokussierung auf individuelles Verhalten von der Notwendigkeit struktureller ' +
      'Veränderungen ab? Kritische Stimmen weisen darauf hin, dass die hundert größten Konzerne weltweit ' +
      'für über 70 Prozent der globalen Emissionen verantwortlich seien und dass ohne eine grundlegende ' +
      'Transformation des Wirtschaftssystems keine nachhaltigen Fortschritte erzielt werden könnten.',
    questions: [
      {
        id: 'q1-2-1',
        promptDe: 'Worüber besteht laut Text nach wie vor Uneinigkeit?',
        options: [
          { id: 'a', de: 'Ob der Klimawandel tatsächlich existiert' },
          { id: 'b', de: 'Wer die Hauptverantwortung für die Bekämpfung des Klimawandels tragen sollte' },
          { id: 'c', de: 'Ob erneuerbare Energien technisch möglich sind' },
          { id: 'd', de: 'Ob das Pariser Abkommen unterzeichnet werden sollte' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يذكر النص أنه بينما المعارف العلمية حول أسباب وعواقب الاحتباس الحراري غير متنازع عليها ' +
          'إلى حد كبير (weitgehend unstrittig)، لا يزال هناك خلاف حول من يجب أن يتحمل المسؤولية الرئيسية. ' +
          'لاحظ العبارة "nach wie vor" (لا يزال) — وهي بديل أنيق لـ "immer noch" في المستوى C1. ' +
          'كذلك "herrscht Uneinigkeit darüber, wer..." — تركيب مهم: فعل + حرف جر + جملة فرعية.'
      },
      {
        id: 'q1-2-2',
        promptDe: 'Was argumentieren die Industrieländer und was die Schwellenländer?',
        options: [
          { id: 'a', de: 'Beide Seiten fordern höhere Steuern auf fossile Brennstoffe' },
          { id: 'b', de: 'Die Industrieländer sollen mehr reduzieren, die Schwellenländer warnen vor einseitiger wirtschaftlicher Belastung' },
          { id: 'c', de: 'Alle Länder sollen die gleichen Emissionsziele haben' },
          { id: 'd', de: 'Die Schwellenländer wollen mehr emittieren als die Industrieländer' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يوضح النص وجهتي نظر متقابلتين: من جهة يُقال إن الدول الصناعية تتحمل التزاماً خاصاً ' +
          'بسبب مساهمتها التاريخية الكبرى في الانبعاثات، ومن جهة أخرى تؤكد الدول الناشئة أن التحميل الأحادي الجانب ' +
          'يهدد نموها الاقتصادي ويفاقم التفاوت الاجتماعي. لاحظ البنية البلاغية: "Auf der einen Seite...auf der anderen Seite" ' +
          '(من جهة...من جهة أخرى) — وهي أداة بلاغية أساسية لعرض الحجج المتقابلة في النصوص الأكاديمية.'
      },
      {
        id: 'q1-2-3',
        promptDe: 'Bis wann will Deutschland die Treibhausgasemissionen auf netto null reduzieren?',
        options: [
          { id: 'a', de: 'Bis 2030' },
          { id: 'b', de: 'Bis 2040' },
          { id: 'c', de: 'Bis 2045' },
          { id: 'd', de: 'Bis 2050' }
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (ج). يذكر النص أن الحكومة الفيدرالية التزمت في إطار اتفاقية باريس للمناخ بخفض ' +
          'انبعاثات غازات الدفيئة إلى صافي صفر بحلول عام 2045. لاحظ التركيب: "sich verpflichten zu + Dativ" ' +
          '(يلتزم بـ) — وهو فعل انعكاسي مع حرف جر ثابت. كذلك "netto null" هو مصطلح تقني يعني أن صافي الانبعاثات يساوي صفراً.'
      },
      {
        id: 'q1-2-4',
        promptDe: 'Welches Problem beim Ausbau erneuerbarer Energien wird im Text erwähnt?',
        options: [
          { id: 'a', de: 'Die Technologie ist noch nicht ausgereift' },
          { id: 'b', de: 'Der Ausbau stößt vielerorts auf Widerstand in der Bevölkerung' },
          { id: 'c', de: 'Die Kosten für Solaranlagen sind zu hoch' },
          { id: 'd', de: 'Es gibt nicht genug Fachkräfte in diesem Bereich' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يشير النص إلى أن توسيع الطاقات المتجددة يواجه في كثير من الأماكن مقاومة من السكان. ' +
          'لاحظ الفعل "stoßen auf + Akkusativ" (يصطدم بـ / يواجه) — وهو فعل قوي غير منتظم مهم في المستوى C1. ' +
          'كذلك "vielerorts" (في كثير من الأماكن) هو ظرف مكان أكاديمي. ' +
          'والرابط "zumal" (خاصة وأن) يربط الجملة بما قبلها سببياً.'
      },
      {
        id: 'q1-2-5',
        promptDe: 'Was sagen die kritischen Stimmen über die individuelle Verantwortung?',
        options: [
          { id: 'a', de: 'Jeder Einzelne muss seinen CO₂-Fußabdruck auf null reduzieren' },
          { id: 'b', de: 'Die Fokussierung auf individuelles Verhalten lenkt von strukturellen Veränderungen ab, da die größten Konzerne für über 70 % der Emissionen verantwortlich seien' },
          { id: 'c', de: 'Individuelles Handeln ist der einzig wirksame Weg zum Klimaschutz' },
          { id: 'd', de: 'Verbraucher sollten mehr Flugreisen unternehmen, um die Wirtschaft anzukurbeln' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يطرح النص سؤالاً بلاغياً: هل يمكن للمستهلكين فعلاً المساهمة بشكل قابل للقياس ' +
          'في حماية المناخ من خلال قراراتهم الاستهلاكية الواعية؟ ثم يشير إلى أن الأصوات النقدية تلفت الانتباه إلى أن ' +
          'أكبر مائة شركة في العالم مسؤولة عن أكثر من 70% من الانبعاثات العالمية. ' +
          'لاحظ استخدام Konjunktiv I: "verantwortlich seien" و"erzielt werden könnten" — ' +
          'وهذا يدل على كلام منقول غير مباشر (indirekte Rede)، وهو سمة أساسية للنصوص الأكاديمية C1.'
      }
    ]
  },

  // ─── Reading Passage 3: Soziale Medien und Demokratie ───
  {
    id: 'lese-1-3',
    titleDe: 'Soziale Medien und Demokratie — Fluch oder Segen für die politische Teilhabe?',
    textDe:
      'In den vergangenen zwei Jahrzehnten haben soziale Medien die politische Kommunikation grundlegend ' +
      'verändert. Plattformen wie Twitter, Facebook und Instagram ermöglichen es Bürgerinnen und Bürgern, ' +
      'sich unmittelbar an politischen Diskussionen zu beteiligen, ohne auf die Vermittlung durch ' +
      'traditionelle Medien angewiesen zu sein. Diese Demokratisierung des öffentlichen Diskurses wird ' +
      'von vielen als ein Gewinn für die politische Teilhabe angesehen. Gleichzeitig mehren sich jedoch ' +
      'die Stimmen, die vor den Gefahren der sozialen Medien für die demokratische Meinungsbildung ' +
      'warnen. Algorithmen, die darauf ausgelegt sind, die Verweildauer der Nutzer zu maximieren, ' +
      'begünstigen die Verbreitung emotionalisierender und polarisierender Inhalte. Sogenannte ' +
      'Filterblasen führen dazu, dass Menschen vorwiegend mit Meinungen konfrontiert werden, die ihre ' +
      'eigene Weltsicht bestätigen, was den gesellschaftlichen Dialog erschwert. Darüber hinaus stellt ' +
      'die Verbreitung von Desinformation und Fake News eine ernsthafte Bedrohung für das Vertrauen ' +
      'in demokratische Institutionen dar. Eine Untersuchung des Reuters Institute zeigte, dass in ' +
      'Deutschland rund 38 Prozent der Befragten angaben, regelmäßig auf Falschinformationen in sozialen ' +
      'Medien zu stoßen. Die Bundesregierung hat mit dem Netzwerkdurchsetzungsgesetz (NetzDG) einen ' +
      'rechtlichen Rahmen geschaffen, der Plattformbetreiber zur Löschung rechtswidriger Inhalte ' +
      'verpflichtet. Ob diese Maßnahme ausreichend ist, um die Integrität des demokratischen Diskurses ' +
      'zu schützen, bleibt indes umstritten.',
    questions: [
      {
        id: 'q1-3-1',
        promptDe: 'Was wird als positiver Aspekt der sozialen Medien für die Demokratie genannt?',
        options: [
          { id: 'a', de: 'Sie ersetzen die traditionellen Medien vollständig' },
          { id: 'b', de: 'Sie ermöglichen eine unmittelbare Beteiligung an politischen Diskussionen' },
          { id: 'c', de: 'Sie garantieren die Qualität der politischen Informationen' },
          { id: 'd', de: 'Sie verhindern die Verbreitung von Fake News' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يوضح النص أن وسائل التواصل الاجتماعي تُتيح للمواطنين المشاركة المباشرة ' +
          'في النقاشات السياسية دون الاعتماد على وساطة وسائل الإعلام التقليدية. ' +
          'لاحظ التركيب: "es ermöglichen + Dativ + zu + Infinitiv" — هذا تركيب شائع جداً في C1. ' +
          'وكلمة "unmittelbar" (مباشرة) هي بديل أكاديمي لـ "direkt".'
      },
      {
        id: 'q1-3-2',
        promptDe: 'Was sind laut Text "Filterblasen"?',
        options: [
          { id: 'a', de: 'Spezielle Softwareprogramme zum Schutz vor Viren' },
          { id: 'b', de: 'Situationen, in denen Menschen vorwiegend mit Meinungen konfrontiert werden, die ihre eigene Weltsicht bestätigen' },
          { id: 'c', de: 'Technische Fehler auf Social-Media-Plattformen' },
          { id: 'd', de: 'Werbeanzeigen, die auf das Profil der Nutzer zugeschnitten sind' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يوضح النص أن "فقاعات الترشيح" (Filterblasen) تؤدي إلى أن يتعرض الناس ' +
          'بشكل رئيسي لآراء تؤكد رؤيتهم الخاصة للعالم، مما يُصعّب الحوار المجتمعي. ' +
          'لاحظ التركيب: "führen dazu, dass..." (تؤدي إلى أن...) — وهو من أهم التراكيب للتعبير عن السببية في C1. ' +
          'كذلك "vorwiegend" (بشكل رئيسي) و"erschwert" (يُصعّب) — مفردات أكاديمية مهمة.'
      },
      {
        id: 'q1-3-3',
        promptDe: 'Wie hoch ist der Anteil der Befragten in Deutschland, die regelmäßig auf Falschinformationen stoßen?',
        options: [
          { id: 'a', de: 'Rund 25 Prozent' },
          { id: 'b', de: 'Rund 38 Prozent' },
          { id: 'c', de: 'Rund 50 Prozent' },
          { id: 'd', de: 'Rund 65 Prozent' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يذكر النص أن حوالي 38 بالمائة من المشاركين في الاستطلاع أفادوا بأنهم يصادفون ' +
          'معلومات مضللة بانتظام في وسائل التواصل الاجتماعي. لاحظ الفعل "angeben" (يفيد/يذكر) وهو فعل منفصل. ' +
          'كذلك "stoßen auf + Akkusativ" (يصادف) يظهر مرة أخرى في هذا النص.'
      },
      {
        id: 'q1-3-4',
        promptDe: 'Was regelt das Netzwerkdurchsetzungsgesetz (NetzDG)?',
        options: [
          { id: 'a', de: 'Die staatliche Kontrolle aller Internetinhalte' },
          { id: 'b', de: 'Die Pflicht der Plattformbetreiber zur Löschung rechtswidriger Inhalte' },
          { id: 'c', de: 'Das Verbot aller sozialen Medien in Deutschland' },
          { id: 'd', de: 'Die Besteuerung von Online-Werbung' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يوضح النص أن الحكومة الفيدرالية أوجدت مع قانون تطبيق الشبكات (NetzDG) ' +
          'إطاراً قانونياً يُلزم مشغّلي المنصات بحذف المحتويات المخالفة للقانون. ' +
          'لاحظ البناء للمجهول: "einen rechtlichen Rahmen geschaffen, der...verpflichtet" — ' +
          'حيث "verpflichten zu + Dativ" يعني "يُلزم بـ". ' +
          'كلمة "rechtswidrig" (مخالف للقانون) هي كلمة مركبة: Recht (قانون) + s + widrig (مخالف).'
      },
      {
        id: 'q1-3-5',
        promptDe: 'Wie wird die Wirksamkeit des NetzDG im Text bewertet?',
        options: [
          { id: 'a', de: 'Es wird als vollkommen erfolgreich dargestellt' },
          { id: 'b', de: 'Es wird als gescheitert bezeichnet' },
          { id: 'c', de: 'Seine Wirksamkeit bleibt umstritten' },
          { id: 'd', de: 'Es wird nicht im Text erwähnt' }
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (ج). يختتم النص بالقول إن ما إذا كان هذا الإجراء كافياً لحماية نزاهة الخطاب الديمقراطي ' +
          'يظل موضع خلاف (bleibt umstritten). لاحظ الكلمة "indes" (مع ذلك/بيد أن) — ' +
          'وهي رابط أكاديمي بديل لـ "jedoch" أو "allerdings". ' +
          'كذلك "Ob diese Maßnahme ausreichend ist, um...zu..." — هذا تركيب ob-Satz مع um...zu (جملة غائية).'
      }
    ]
  }
];

// ─── Model 1: Sprachbausteine ───
const model1Sprachbausteine: C1Sprachbaustein[] = [
  {
    id: 'sb-1-1',
    contextDe: 'Hätte die Regierung frühzeitig gehandelt, ___ die Krise vermieden werden können.',
    options: [
      { id: 'a', de: 'hätte' },
      { id: 'b', de: 'wäre' },
      { id: 'c', de: 'würde' },
      { id: 'd', de: 'könnte' }
    ],
    correct: 'a',
    explanationAr:
      'الإجابة الصحيحة هي (أ) "hätte". هذه جملة شرطية غير واقعية في الماضي (irrealer Konditionalsatz der Vergangenheit). ' +
      'البنية هي: Hätte + Subjekt + Partizip II, hätte + Subjekt + Partizip II + werden können. ' +
      'نستخدم "hätte" لأن الفعل الأصلي هو "vermeiden" وهو فعل متعدٍّ (transitiv) يبني الماضي مع haben. ' +
      'مع "werden können" في النهاية نحصل على بنية المبني للمجهول مع الفعل المشروط: hätte vermieden werden können.'
  },
  {
    id: 'sb-1-2',
    contextDe: 'Die von der Universität ___ Studie belegt den Zusammenhang zwischen Bildung und Einkommen.',
    options: [
      { id: 'a', de: 'durchgeführte' },
      { id: 'b', de: 'durchführende' },
      { id: 'c', de: 'durchzuführende' },
      { id: 'd', de: 'durchgeführt' }
    ],
    correct: 'a',
    explanationAr:
      'الإجابة الصحيحة هي (أ) "durchgeführte". هذا صفة مشتقة من اسم المفعول (Partizipialattribut mit Partizip II). ' +
      'نستخدم Partizip II لأن الدراسة قد أُجريت بالفعل (الفعل مكتمل). ' +
      'البنية الكاملة: "die von der Universität durchgeführte Studie" = "الدراسة التي أجرتها الجامعة". ' +
      'هذا يعادل جملة موصولة: "die Studie, die von der Universität durchgeführt wurde". ' +
      'في المستوى C1 يُفضل استخدام Partizipialattribut بدلاً من الجملة الموصولة لأنه أكثر إيجازاً وأكاديمية.'
  },
  {
    id: 'sb-1-3',
    contextDe: 'Die Ergebnisse lassen sich nicht ohne Weiteres auf andere Kontexte ___.',
    options: [
      { id: 'a', de: 'übernehmen' },
      { id: 'b', de: 'übertragen' },
      { id: 'c', de: 'übersetzen' },
      { id: 'd', de: 'übermitteln' }
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (ب) "übertragen". التركيب "sich auf etwas übertragen lassen" يعني "يمكن نقله/تعميمه على شيء". ' +
      'في السياق الأكاديمي: "die Ergebnisse lassen sich nicht auf andere Kontexte übertragen" = ' +
      '"لا يمكن تعميم النتائج على سياقات أخرى". لاحظ أن "sich lassen + Infinitiv" هو بديل للمبني للمجهول ' +
      'مع الفعل المشروط können: = "können nicht übertragen werden". ' +
      '"ohne Weiteres" تعني "بسهولة/دون مزيد من التفكير" — عبارة أكاديمية شائعة.'
  },
  {
    id: 'sb-1-4',
    contextDe: 'Die Nominalisierung komplexer Sachverhalte ___ in wissenschaftlichen Texten häufig anzutreffen.',
    options: [
      { id: 'a', de: 'ist' },
      { id: 'b', de: 'wird' },
      { id: 'c', de: 'hat' },
      { id: 'd', de: 'kann' }
    ],
    correct: 'a',
    explanationAr:
      'الإجابة الصحيحة هي (أ) "ist". التركيب هو: "ist...anzutreffen" = "sein + zu + Infinitiv" ' +
      'وهو يعبر عن إمكانية المبني للمجهول (passive Möglichkeit): "kann angetroffen werden". ' +
      'المعنى: "تحويل الحقائق المعقدة إلى أسماء يمكن مصادفته/هو شائع في النصوص العلمية". ' +
      'لاحظ أن "Nominalisierung" (التحويل الاسمي) هو نفسه مثال على التحويل الاسمي — ' +
      'من الفعل nominalisieren إلى الاسم die Nominalisierung. هذه مهارة أساسية في C1.'
  },
  {
    id: 'sb-1-5',
    contextDe: 'Es bedarf ___ grundlegenden Umstrukturierung des gesamten Bildungssystems.',
    options: [
      { id: 'a', de: 'eine' },
      { id: 'b', de: 'einer' },
      { id: 'c', de: 'einem' },
      { id: 'd', de: 'einen' }
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (ب) "einer". الفعل "bedürfen" يتطلب حالة المضاف إليه (Genitiv). ' +
      'لذلك: "es bedarf einer grundlegenden Umstrukturierung" (يحتاج الأمر إلى إعادة هيكلة جذرية). ' +
      '"Umstrukturierung" مؤنث (die Umstrukturierung)، لذا في Genitiv تصبح "einer". ' +
      'الفعل "bedürfen + Genitiv" هو بديل رسمي وأكاديمي لـ "brauchen + Akkusativ". ' +
      'هذا من أهم التراكيب في المستوى C1 لأنه يظهر بكثرة في النصوص الأكاديمية والرسمية.'
  },
  {
    id: 'sb-1-6',
    contextDe: '___ der Tatsache, dass die Forschungsergebnisse eindeutig sind, wird weiterhin kontrovers diskutiert.',
    options: [
      { id: 'a', de: 'Trotz' },
      { id: 'b', de: 'Wegen' },
      { id: 'c', de: 'Ungeachtet' },
      { id: 'd', de: 'Aufgrund' }
    ],
    correct: 'c',
    explanationAr:
      'الإجابة الصحيحة هي (ج) "Ungeachtet". حرف الجر "ungeachtet + Genitiv" يعني "بصرف النظر عن / بالرغم من". ' +
      'وهو بديل أكاديمي راقٍ لـ "trotz". الفرق الدقيق: "trotz" تعبّر عن التناقض البسيط، ' +
      'بينما "ungeachtet" تضيف معنى "التجاهل المتعمد" — أي أنه رغم وضوح الحقائق يُتجاهل ذلك ويستمر النقاش. ' +
      '"Trotz" صحيحة نحوياً لكن "ungeachtet" أدق في هذا السياق الأكاديمي وتتناسب مع "der Tatsache" (Genitiv). ' +
      'كلا الحرفين يأخذان Genitiv.'
  },
  {
    id: 'sb-1-7',
    contextDe: 'Die zunehmende Digitalisierung ___ eine Anpassung der Lehrpläne nach sich.',
    options: [
      { id: 'a', de: 'bringt' },
      { id: 'b', de: 'zieht' },
      { id: 'c', de: 'führt' },
      { id: 'd', de: 'nimmt' }
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (ب) "zieht". العبارة "etwas nach sich ziehen" هي تركيب ثابت (Funktionsverbgefüge) ' +
      'يعني "يستتبع / يترتب عليه شيء". المعنى: "الرقمنة المتزايدة تستتبع تعديل المناهج الدراسية". ' +
      'هذا التركيب أكاديمي ومكافئ لـ "zur Folge haben" أو "bewirken". ' +
      'لاحظ أن "nach sich ziehen" فعل منفصل: zieht...nach sich. ' +
      'هذا مثال على Funktionsverbgefüge — وهي تراكيب فعلية ثابتة شائعة جداً في لغة C1 الأكاديمية.'
  },
  {
    id: 'sb-1-8',
    contextDe: 'Der Referent betonte, die Ergebnisse ___ noch einer weiteren Überprüfung.',
    options: [
      { id: 'a', de: 'bedürfen' },
      { id: 'b', de: 'bedürften' },
      { id: 'c', de: 'bedürfet' },
      { id: 'd', de: 'bedarf' }
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (ب) "bedürften". هذا هو Konjunktiv I من الفعل "bedürfen" في صيغة الجمع ' +
      'ولكن بما أن شكل Konjunktiv I (bedürfen) مطابق لشكل المضارع (Indikativ)، نستخدم Konjunktiv II ' +
      '(bedürften) كبديل — وهذه قاعدة مهمة في الكلام غير المباشر (indirekte Rede). ' +
      'القاعدة: عندما يتطابق Konjunktiv I مع Indikativ، نستخدم Konjunktiv II. ' +
      'المعنى: "أكد المحاضر أن النتائج تحتاج إلى مراجعة إضافية".'
  },
  {
    id: 'sb-1-9',
    contextDe: 'Die in diesem Zusammenhang ___ Maßnahmen wurden bereits im vergangenen Jahr beschlossen.',
    options: [
      { id: 'a', de: 'zu ergreifenden' },
      { id: 'b', de: 'ergriffenen' },
      { id: 'c', de: 'ergreifende' },
      { id: 'd', de: 'ergriffene' }
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (ب) "ergriffenen". هذا Partizipialattribut مع Partizip II. ' +
      'البنية: "die...ergriffenen Maßnahmen" = "الإجراءات المُتخذة". ' +
      'نستخدم Partizip II لأن الإجراءات قد اتُخذت بالفعل (تم وصفها). ' +
      'لاحظ أننا نضيف "-en" لأن الاسم في الجمع مع أداة التعريف (die Maßnahmen — Nominativ Plural). ' +
      'التصريف بعد أداة التعريف في الجمع دائماً "-en" (schwache Deklination). ' +
      'الفعل "Maßnahmen ergreifen" (اتخاذ إجراءات) هو تركيب ثابت مهم.'
  },
  {
    id: 'sb-1-10',
    contextDe: 'Die Forschungsergebnisse waren ___ aufschlussreich, ___ sie neue Perspektiven eröffneten.',
    options: [
      { id: 'a', de: 'so ... dass' },
      { id: 'b', de: 'weder ... noch' },
      { id: 'c', de: 'insofern ... als' },
      { id: 'd', de: 'sowohl ... als auch' }
    ],
    correct: 'c',
    explanationAr:
      'الإجابة الصحيحة هي (ج) "insofern...als" (من حيث أن / بقدر ما أن). هذا رابط معقد ' +
      'يعبر عن علاقة سببية-تفسيرية: "كانت نتائج البحث مفيدة من حيث أنها فتحت آفاقاً جديدة". ' +
      'هذا الرابط المزدوج (zweiteiliger Konnektor) من أهم الروابط في المستوى C1 الأكاديمي. ' +
      '"so...dass" (بحيث أن) يعبر عن نتيجة بحتة، بينما "insofern...als" يعبر عن توضيح وتحديد. ' +
      '"aufschlussreich" (مفيد/كاشف) كلمة مركبة: Aufschluss (كشف) + reich (غني) = غني بالمعلومات.'
  }
];

// ─── Model 1: Schreiben ───
const model1Schreiben: C1SchreibenPart[] = [
  {
    id: 'sch-1-1',
    titleDe: 'Erörterung: Künstliche Intelligenz in der Schule',
    promptDe:
      'Schreiben Sie eine Erörterung zum Thema: „Sollte Künstliche Intelligenz (KI) in der Schule eingesetzt werden?" ' +
      'Gehen Sie dabei auf folgende Aspekte ein:\n' +
      '• Welche Vorteile könnte der Einsatz von KI im Unterricht haben?\n' +
      '• Welche Risiken und Nachteile sind zu bedenken?\n' +
      '• Wie ist Ihre persönliche Meinung dazu?\n\n' +
      'Schreiben Sie einen zusammenhängenden Text von mindestens 250 Wörtern. Achten Sie auf eine klare Gliederung ' +
      '(Einleitung, Hauptteil mit Pro- und Kontra-Argumenten, Schluss) und einen angemessenen Sprachstil.',
    promptAr:
      'اكتب مقالاً جدلياً حول الموضوع: "هل ينبغي استخدام الذكاء الاصطناعي في المدرسة؟"\n' +
      'تناول الجوانب التالية:\n' +
      '• ما المزايا المحتملة لاستخدام الذكاء الاصطناعي في التدريس؟\n' +
      '• ما المخاطر والعيوب التي يجب مراعاتها؟\n' +
      '• ما رأيك الشخصي في ذلك؟\n\n' +
      'اكتب نصاً متماسكاً من 250 كلمة على الأقل مع بنية واضحة (مقدمة، جزء رئيسي بحجج مؤيدة ومعارضة، خاتمة) ' +
      'وأسلوب لغوي مناسب.',
    redemittel: [
      'In der vorliegenden Erörterung soll die Frage diskutiert werden, ob...',
      'Zunächst ist festzuhalten, dass...',
      'Ein wesentlicher Vorteil besteht darin, dass...',
      'Dem steht jedoch entgegen, dass...',
      'Darüber hinaus ist zu bedenken, dass...',
      'Es lässt sich nicht leugnen, dass...',
      'Kritiker weisen darauf hin, dass...',
      'Angesichts der dargelegten Argumente bin ich der Auffassung, dass...',
      'Zusammenfassend lässt sich sagen, dass...',
      'Meines Erachtens überwiegen die Vorteile, sofern...'
    ],
    sampleDe:
      'In der vorliegenden Erörterung soll die Frage diskutiert werden, ob Künstliche Intelligenz ' +
      'in der Schule eingesetzt werden sollte. Dieses Thema gewinnt angesichts der rasanten technologischen ' +
      'Entwicklung zunehmend an Bedeutung und wird in der Öffentlichkeit kontrovers debattiert.\n\n' +
      'Zunächst ist festzuhalten, dass der Einsatz von KI im Bildungsbereich zahlreiche Vorteile bieten ' +
      'kann. Ein wesentlicher Vorteil besteht darin, dass KI-gestützte Lernprogramme den Unterricht ' +
      'individualisieren können, indem sie den Lernstoff an das jeweilige Leistungsniveau der Schülerinnen ' +
      'und Schüler anpassen. Darüber hinaus ermöglicht es die Technologie, Lehrkräfte von administrativen ' +
      'Aufgaben wie der Korrektur standardisierter Tests zu entlasten, sodass diese sich stärker auf die ' +
      'pädagogische Betreuung konzentrieren können. Ferner könnte KI dazu beitragen, Lernschwierigkeiten ' +
      'frühzeitig zu erkennen und gezielte Fördermaßnahmen einzuleiten.\n\n' +
      'Dem steht jedoch entgegen, dass der übermäßige Einsatz von Technologie die Entwicklung sozialer ' +
      'Kompetenzen beeinträchtigen könnte. Kritiker weisen darauf hin, dass Schülerinnen und Schüler ' +
      'verlernen könnten, eigenständig zu denken und Probleme ohne technische Hilfsmittel zu lösen. ' +
      'Überdies bestehe die Gefahr, dass eine zu starke Abhängigkeit von KI-Systemen den kritischen ' +
      'Umgang mit Informationen erschwere. Nicht zuletzt werfen datenschutzrechtliche Bedenken die Frage ' +
      'auf, inwieweit die erhobenen Schülerdaten missbraucht werden könnten.\n\n' +
      'Angesichts der dargelegten Argumente bin ich der Auffassung, dass Künstliche Intelligenz ' +
      'durchaus ein wertvolles Werkzeug für den schulischen Unterricht darstellen kann, sofern ihr Einsatz ' +
      'von einem durchdachten pädagogischen Konzept begleitet wird. Es bedarf klarer Richtlinien für den ' +
      'Datenschutz und einer umfassenden Fortbildung der Lehrkräfte. Zusammenfassend lässt sich sagen, ' +
      'dass KI den Unterricht bereichern kann, jedoch niemals den menschlichen Kontakt zwischen Lehrenden ' +
      'und Lernenden ersetzen sollte.',
    sampleAr:
      'في هذا المقال الجدلي سيتم مناقشة مسألة ما إذا كان ينبغي استخدام الذكاء الاصطناعي في المدرسة. ' +
      'يكتسب هذا الموضوع أهمية متزايدة في ظل التطور التكنولوجي السريع ويُناقش بشكل مثير للجدل في الرأي العام.\n\n' +
      'أولاً، تجدر الإشارة إلى أن استخدام الذكاء الاصطناعي في مجال التعليم يمكن أن يوفر مزايا عديدة. ' +
      'تتمثل ميزة جوهرية في أن برامج التعلم المدعومة بالذكاء الاصطناعي يمكنها تفريد التعليم من خلال تكييف ' +
      'المادة الدراسية مع مستوى أداء كل طالب. علاوة على ذلك، تُتيح التكنولوجيا تخفيف العبء عن المعلمين من ' +
      'المهام الإدارية كتصحيح الاختبارات الموحدة، بحيث يتمكنون من التركيز بشكل أكبر على الرعاية التربوية. ' +
      'كما يمكن أن يسهم الذكاء الاصطناعي في اكتشاف صعوبات التعلم مبكراً واتخاذ تدابير دعم مستهدفة.\n\n' +
      'في المقابل، يُعارض ذلك أن الاستخدام المفرط للتكنولوجيا قد يضر بتنمية الكفاءات الاجتماعية. ' +
      'يشير النقاد إلى أن الطلاب قد يفقدون القدرة على التفكير المستقل وحل المشكلات دون وسائل تقنية مساعدة. ' +
      'فضلاً عن ذلك، هناك خطر أن يُصعّب الاعتماد المفرط على أنظمة الذكاء الاصطناعي التعامل النقدي مع المعلومات. ' +
      'وأخيراً وليس آخراً، تثير مخاوف حماية البيانات تساؤلات حول مدى إمكانية إساءة استخدام بيانات الطلاب المُجمّعة.\n\n' +
      'في ضوء الحجج المعروضة، أرى أن الذكاء الاصطناعي يمكن أن يمثل أداة قيّمة للتعليم المدرسي، ' +
      'شريطة أن يكون استخدامه مصحوباً بمفهوم تربوي مدروس. يحتاج الأمر إلى إرشادات واضحة لحماية البيانات ' +
      'وتأهيل شامل للمعلمين. خلاصة القول، يمكن للذكاء الاصطناعي إثراء التعليم، لكنه لا ينبغي أبداً أن يحل محل ' +
      'التواصل الإنساني بين المعلمين والمتعلمين.'
  }
];

// ─── Model 1: Sprechen ───
const model1Sprechen: C1SprechenPart[] = [
  {
    id: 'spr-1-1',
    titleDe: 'Vortrag: Die Rolle der Universitäten in der Gesellschaft',
    promptDe:
      'Halten Sie einen Vortrag zum Thema „Die Rolle der Universitäten in der modernen Gesellschaft". ' +
      'Gehen Sie dabei auf die folgenden Punkte ein:\n' +
      '• Welche Aufgaben haben Universitäten neben der Lehre?\n' +
      '• Wie hat sich die Rolle der Universitäten in den letzten Jahrzehnten verändert?\n' +
      '• Welche Herausforderungen stehen den Universitäten in Zukunft bevor?\n' +
      'Ihr Vortrag sollte circa 5 Minuten dauern.',
    promptAr:
      'ألقِ محاضرة حول موضوع "دور الجامعات في المجتمع الحديث".\n' +
      'تناول النقاط التالية:\n' +
      '• ما المهام التي تقوم بها الجامعات إلى جانب التدريس؟\n' +
      '• كيف تغيّر دور الجامعات في العقود الأخيرة؟\n' +
      '• ما التحديات التي تواجه الجامعات في المستقبل؟\n' +
      'يجب أن تستمر محاضرتك حوالي 5 دقائق.',
    redemittel: [
      'In meinem Vortrag möchte ich auf das Thema ... eingehen.',
      'Zunächst möchte ich einen kurzen Überblick über ... geben.',
      'In diesem Zusammenhang ist es wichtig zu erwähnen, dass...',
      'Ein weiterer Aspekt, den ich hervorheben möchte, ist...',
      'Daraus ergibt sich die Frage, ob...',
      'Abschließend möchte ich festhalten, dass...',
      'Ich bin der Überzeugung, dass...',
      'Lassen Sie mich nun zum nächsten Punkt übergehen.',
      'Wie ich bereits erwähnt habe, ...',
      'Zusammenfassend kann man sagen, dass...'
    ],
    sampleDe:
      'Sehr geehrte Damen und Herren, in meinem Vortrag möchte ich auf die Rolle der Universitäten in der ' +
      'modernen Gesellschaft eingehen. Universitäten erfüllen neben der akademischen Lehre eine Vielzahl ' +
      'weiterer gesellschaftlich relevanter Aufgaben. Sie sind Zentren der Forschung und Innovation, die ' +
      'durch ihre wissenschaftlichen Erkenntnisse zur Lösung gesellschaftlicher Probleme beitragen. ' +
      'Darüber hinaus fungieren sie als Orte des kulturellen Austauschs und der intellektuellen Debatte, ' +
      'an denen verschiedene Perspektiven aufeinandertreffen und kritisch hinterfragt werden.\n\n' +
      'In den vergangenen Jahrzehnten hat sich die Rolle der Universitäten erheblich gewandelt. Während ' +
      'sie früher vorwiegend der Ausbildung einer akademischen Elite dienten, haben sie sich zu Masseninstitutionen ' +
      'entwickelt, die einem breiten Bevölkerungsquerschnitt offenstehen. Der Bologna-Prozess hat zudem ' +
      'zu einer stärkeren Standardisierung und Internationalisierung der Studiengänge geführt.\n\n' +
      'Was die Herausforderungen der Zukunft betrifft, so stehen Universitäten vor der Aufgabe, die ' +
      'Digitalisierung in Lehre und Forschung voranzutreiben und gleichzeitig den persönlichen Kontakt ' +
      'zwischen Lehrenden und Studierenden zu bewahren. Überdies müssen sie Wege finden, um die ' +
      'zunehmende Ökonomisierung der Wissenschaft kritisch zu reflektieren, ohne die Anschlussfähigkeit ' +
      'an wirtschaftliche Erfordernisse zu verlieren. Abschließend möchte ich festhalten, dass ' +
      'Universitäten auch in Zukunft unverzichtbare Institutionen bleiben werden, die den gesellschaftlichen ' +
      'Fortschritt maßgeblich mitgestalten.',
    sampleAr:
      'سيداتي سادتي، أود في محاضرتي أن أتناول دور الجامعات في المجتمع الحديث. تؤدي الجامعات إلى جانب ' +
      'التدريس الأكاديمي مجموعة متنوعة من المهام ذات الصلة المجتمعية. فهي مراكز للبحث والابتكار تسهم من خلال ' +
      'معارفها العلمية في حل المشكلات المجتمعية. علاوة على ذلك، تعمل كأماكن للتبادل الثقافي والنقاش الفكري.\n\n' +
      'في العقود الماضية تغيّر دور الجامعات بشكل كبير. بينما كانت تخدم في السابق بشكل رئيسي تأهيل نخبة أكاديمية، ' +
      'تطورت إلى مؤسسات جماهيرية مفتوحة لشريحة واسعة من السكان. كما أدت عملية بولونيا إلى مزيد من التوحيد ' +
      'والتدويل في البرامج الدراسية.\n\n' +
      'فيما يتعلق بتحديات المستقبل، تواجه الجامعات مهمة دفع الرقمنة في التدريس والبحث مع الحفاظ في الوقت نفسه ' +
      'على التواصل الشخصي. في الختام، أود التأكيد على أن الجامعات ستظل مؤسسات لا غنى عنها تُشارك بشكل ' +
      'حاسم في تشكيل التقدم المجتمعي.'
  },
  {
    id: 'spr-1-2',
    titleDe: 'Diskussion: Soziale Medien im Bildungsbereich — Pro und Kontra',
    promptDe:
      'Diskutieren Sie mit Ihrem Gesprächspartner / Ihrer Gesprächspartnerin über die folgende Frage:\n' +
      '„Sollten soziale Medien aktiv im Schulunterricht eingesetzt werden?"\n\n' +
      'Tauschen Sie Argumente aus und versuchen Sie, zu einem gemeinsamen Ergebnis zu kommen.\n' +
      'Dauer: circa 5 Minuten.',
    promptAr:
      'ناقش مع شريك/شريكة الحوار السؤال التالي:\n' +
      '"هل ينبغي استخدام وسائل التواصل الاجتماعي بنشاط في التدريس المدرسي؟"\n\n' +
      'تبادلا الحجج وحاولا التوصل إلى نتيجة مشتركة.\n' +
      'المدة: حوالي 5 دقائق.',
    redemittel: [
      'Ich bin der Meinung, dass...',
      'Da muss ich Ihnen widersprechen, denn...',
      'Ich stimme Ihnen grundsätzlich zu, möchte aber hinzufügen, dass...',
      'Das sehe ich etwas anders, und zwar weil...',
      'Einerseits haben Sie recht, andererseits...',
      'Ich möchte noch einen weiteren Punkt ansprechen, nämlich...',
      'Wenn ich Sie richtig verstanden habe, meinen Sie, dass...',
      'Könnten wir uns darauf einigen, dass...?',
      'Ich möchte Ihren Punkt aufgreifen und ergänzen, dass...',
      'Letzten Endes kommt es darauf an, dass...'
    ],
    sampleDe:
      'A: Ich bin der Meinung, dass soziale Medien durchaus im Schulunterricht eingesetzt werden sollten. ' +
      'Sie gehören zur Lebenswelt der Jugendlichen und bieten vielfältige Möglichkeiten, den Unterricht ' +
      'interaktiver zu gestalten. Beispielsweise können Schülerinnen und Schüler über Plattformen wie ' +
      'Instagram oder YouTube eigene Projekte präsentieren und so ihre Medienkompetenz stärken.\n\n' +
      'B: Da muss ich Ihnen teilweise widersprechen. Zwar stimme ich zu, dass Medienkompetenz wichtig ist, ' +
      'jedoch bergen soziale Medien im schulischen Kontext erhebliche Risiken. Die Ablenkungsgefahr ist ' +
      'enorm, und Cybermobbing könnte durch die schulische Nutzung sogar verstärkt werden.\n\n' +
      'A: Das sehe ich ein, allerdings ließe sich dem durch klare Regeln und eine pädagogische Begleitung ' +
      'entgegenwirken. Es geht ja nicht darum, dass Schüler unkontrolliert soziale Medien nutzen, sondern ' +
      'darum, einen kritischen und reflektierten Umgang damit zu erlernen.\n\n' +
      'B: Ich möchte Ihren Punkt aufgreifen. Vielleicht könnten wir uns darauf einigen, dass der Einsatz ' +
      'sozialer Medien im Unterricht sinnvoll sein kann, sofern er von einem klaren pädagogischen Konzept ' +
      'begleitet wird und der Datenschutz gewährleistet ist.\n\n' +
      'A: Dem stimme ich vollkommen zu. Letzten Endes kommt es darauf an, dass die Lehrkräfte entsprechend ' +
      'geschult werden und die Nutzung sozialer Medien einen echten Mehrwert für den Unterricht bietet.',
    sampleAr:
      'أ: أرى أنه ينبغي بالتأكيد استخدام وسائل التواصل الاجتماعي في التدريس المدرسي. فهي تنتمي إلى عالم الشباب ' +
      'وتوفر إمكانيات متنوعة لجعل الدرس أكثر تفاعلاً. على سبيل المثال، يمكن للطلاب تقديم مشاريعهم الخاصة عبر ' +
      'منصات مثل إنستغرام أو يوتيوب وبذلك تعزيز كفاءتهم الإعلامية.\n\n' +
      'ب: يجب أن أعارضك جزئياً. صحيح أنني أوافق على أن الكفاءة الإعلامية مهمة، إلا أن وسائل التواصل الاجتماعي ' +
      'تنطوي على مخاطر كبيرة في السياق المدرسي. خطر التشتت هائل، وقد يتفاقم التنمر الإلكتروني بسبب الاستخدام المدرسي.\n\n' +
      'أ: أقر بذلك، لكن يمكن مواجهة هذا من خلال قواعد واضحة ومرافقة تربوية. لا يتعلق الأمر بأن يستخدم الطلاب ' +
      'وسائل التواصل الاجتماعي بدون رقابة، بل بتعلم التعامل النقدي والمتأمل معها.\n\n' +
      'ب: أود أن أستند إلى نقطتك. ربما يمكننا الاتفاق على أن استخدام وسائل التواصل الاجتماعي في الدرس يمكن أن يكون ' +
      'مفيداً شريطة أن يكون مصحوباً بمفهوم تربوي واضح ومع ضمان حماية البيانات.\n\n' +
      'أ: أوافق تماماً. في نهاية المطاف، يعتمد الأمر على تأهيل المعلمين بشكل مناسب وأن يوفر استخدام ' +
      'وسائل التواصل الاجتماعي قيمة مضافة حقيقية للدرس.'
  }
];

// =============================================================================
// MODEL 2: المجتمع والثقافة — Gesellschaft & Kultur
// =============================================================================

const model2ReadingPassages: C1ReadingPassage[] = [
  // ─── Reading Passage 1: Migration und Integration ───
  {
    id: 'lese-2-1',
    titleDe: 'Migration und Integration in Deutschland — Herausforderungen und Perspektiven',
    textDe:
      'Deutschland hat sich in den vergangenen Jahrzehnten von einem Land, das sich lange nicht als ' +
      'Einwanderungsland verstand, zu einer der vielfältigsten Gesellschaften Europas entwickelt. Die ' +
      'Anwerbung ausländischer Arbeitskräfte in den 1960er-Jahren, der Zuzug von Spätaussiedlern nach ' +
      'dem Fall der Mauer und die verstärkte Flüchtlingszuwanderung seit 2015 haben das demographische ' +
      'und kulturelle Profil des Landes nachhaltig geprägt. Heute leben rund 22 Millionen Menschen mit ' +
      'Migrationshintergrund in Deutschland, was einem Anteil von etwa 27 Prozent der Gesamtbevölkerung ' +
      'entspricht. Die Integration dieser Menschen in die Gesellschaft stellt eine der zentralen ' +
      'Herausforderungen der deutschen Politik dar. Während die sprachliche Integration durch umfangreiche ' +
      'Angebote an Integrationskursen und Sprachförderungsmaßnahmen erhebliche Fortschritte gemacht hat, ' +
      'bestehen in den Bereichen Bildung und Arbeitsmarkt nach wie vor signifikante Unterschiede zwischen ' +
      'Menschen mit und ohne Migrationshintergrund. Studien belegen, dass Kinder aus Zuwandererfamilien ' +
      'im deutschen Bildungssystem trotz gleicher Leistungen seltener eine Gymnasialempfehlung erhalten ' +
      'als ihre Mitschülerinnen und Mitschüler ohne Migrationshintergrund. Auf dem Arbeitsmarkt sind ' +
      'Zugewanderte überdurchschnittlich häufig von Arbeitslosigkeit betroffen und arbeiten vielfach in ' +
      'Berufen, die nicht ihrer Qualifikation entsprechen, da im Ausland erworbene Abschlüsse nicht ' +
      'immer anerkannt werden. Die Bundesregierung hat mit dem Fachkräfteeinwanderungsgesetz und der ' +
      'Reform des Staatsangehörigkeitsrechts wichtige Weichen gestellt, um die Zuwanderung qualifizierter ' +
      'Arbeitskräfte zu erleichtern und die gesellschaftliche Teilhabe von Migrantinnen und Migranten ' +
      'zu stärken. Experten betonen jedoch, dass erfolgreiche Integration ein wechselseitiger Prozess ist, ' +
      'der sowohl die Bereitschaft der Zugewanderten zur Anpassung als auch die Offenheit der ' +
      'Aufnahmegesellschaft erfordert.',
    questions: [
      {
        id: 'q2-1-1',
        promptDe: 'Wie viele Menschen mit Migrationshintergrund leben laut Text in Deutschland?',
        options: [
          { id: 'a', de: 'Rund 15 Millionen (etwa 18 Prozent)' },
          { id: 'b', de: 'Rund 22 Millionen (etwa 27 Prozent)' },
          { id: 'c', de: 'Rund 30 Millionen (etwa 35 Prozent)' },
          { id: 'd', de: 'Rund 10 Millionen (etwa 12 Prozent)' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يذكر النص أن حوالي 22 مليون شخص من ذوي الخلفية المهاجرة يعيشون في ألمانيا، ' +
          'وهو ما يعادل نسبة 27 بالمائة تقريباً من إجمالي السكان. ' +
          'لاحظ التركيب: "was einem Anteil von...entspricht" (وهو ما يعادل نسبة...) — ' +
          'جملة موصولة مع "was" التي تشير إلى الجملة بأكملها (nicht-restriktiver Relativsatz). ' +
          'كذلك "Migrationshintergrund" (خلفية مهاجرة) هو مصطلح رسمي ألماني يشمل الأشخاص الذين هاجروا بأنفسهم ' +
          'أو أحد والديهم على الأقل.'
      },
      {
        id: 'q2-1-2',
        promptDe: 'Welche Probleme bestehen laut Text im Bildungsbereich für Kinder mit Migrationshintergrund?',
        options: [
          { id: 'a', de: 'Sie dürfen keine Universitäten besuchen' },
          { id: 'b', de: 'Sie erhalten trotz gleicher Leistungen seltener eine Gymnasialempfehlung' },
          { id: 'c', de: 'Sie müssen doppelt so hohe Schulgebühren zahlen' },
          { id: 'd', de: 'Sie können keine Ausbildung beginnen' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يذكر النص أن الدراسات تثبت أن أطفال عائلات المهاجرين يحصلون — رغم تحقيقهم ' +
          'نفس الأداء — على توصية للالتحاق بالمدرسة الثانوية (Gymnasium) بشكل أقل تكراراً. ' +
          'لاحظ البنية: "trotz gleicher Leistungen" — حرف الجر "trotz + Genitiv" (رغم). ' +
          'كذلك "seltener...als" (أقل تكراراً من) — صيغة المقارنة مع "als". ' +
          'المصطلح "Gymnasialempfehlung" (توصية Gymnasium) مهم: في ألمانيا يحصل الطلاب بعد الصف الرابع ' +
          'على توصية تحدد نوع المدرسة الثانوية المناسبة لهم.'
      },
      {
        id: 'q2-1-3',
        promptDe: 'Warum arbeiten viele Zugewanderte in Berufen, die nicht ihrer Qualifikation entsprechen?',
        options: [
          { id: 'a', de: 'Weil sie keine Berufserfahrung haben' },
          { id: 'b', de: 'Weil sie die deutsche Sprache nicht beherrschen' },
          { id: 'c', de: 'Weil im Ausland erworbene Abschlüsse nicht immer anerkannt werden' },
          { id: 'd', de: 'Weil sie keine Arbeitserlaubnis besitzen' }
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (ج). يوضح النص أن المهاجرين يعملون في كثير من الأحيان في مهن لا تتوافق مع مؤهلاتهم ' +
          'لأن الشهادات المكتسبة في الخارج لا تُعترف بها دائماً. ' +
          'لاحظ البناء للمجهول: "anerkannt werden" (تُعترف بها). ' +
          'كذلك الصفة المشتقة: "im Ausland erworbene Abschlüsse" = "الشهادات المكتسبة في الخارج" — ' +
          'هذا Partizipialattribut مع Partizip II. ' +
          'هذه مشكلة حقيقية يعاني منها كثير من المهاجرين العرب في ألمانيا، ولذلك يوجد ' +
          'مصطلح "Anerkennung ausländischer Abschlüsse" (الاعتراف بالشهادات الأجنبية).'
      },
      {
        id: 'q2-1-4',
        promptDe: 'Welche Gesetze hat die Bundesregierung zur Verbesserung der Situation von Migranten verabschiedet?',
        options: [
          { id: 'a', de: 'Das Fachkräfteeinwanderungsgesetz und die Reform des Staatsangehörigkeitsrechts' },
          { id: 'b', de: 'Das Grundgesetz und das Bürgerliche Gesetzbuch' },
          { id: 'c', de: 'Das Netzwerkdurchsetzungsgesetz und das Datenschutzgesetz' },
          { id: 'd', de: 'Das Erneuerbare-Energien-Gesetz und das Klimaschutzgesetz' }
        ],
        correct: 'a',
        explanationAr:
          'الإجابة الصحيحة هي (أ). يذكر النص أن الحكومة الفيدرالية وضعت مع قانون هجرة العمالة الماهرة ' +
          '(Fachkräfteeinwanderungsgesetz) وإصلاح قانون الجنسية (Staatsangehörigkeitsrecht) ' +
          'أسساً مهمة لتسهيل هجرة العمالة المؤهلة وتعزيز المشاركة المجتمعية للمهاجرين. ' +
          'لاحظ التعبير: "Weichen stellen" (يضع الأسس/يمهّد الطريق) — وهو تعبير مجازي مأخوذ من عالم السكك الحديدية. ' +
          'كذلك "um...zu + Infinitiv" (من أجل...) — جملة غائية.'
      },
      {
        id: 'q2-1-5',
        promptDe: 'Was betonen die Experten in Bezug auf Integration?',
        options: [
          { id: 'a', de: 'Nur die Zugewanderten müssen sich anpassen' },
          { id: 'b', de: 'Integration ist ausschließlich eine Aufgabe des Staates' },
          { id: 'c', de: 'Integration ist ein wechselseitiger Prozess, der Bereitschaft von beiden Seiten erfordert' },
          { id: 'd', de: 'Integration ist in Deutschland bereits vollständig gelungen' }
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (ج). يختتم النص بالتأكيد على أن الاندماج الناجح عملية متبادلة (wechselseitiger Prozess) ' +
          'تتطلب استعداد المهاجرين للتكيف وانفتاح المجتمع المستقبِل. ' +
          'هذا مفهوم مهم جداً: الاندماج ليس طريقاً باتجاه واحد. ' +
          'لاحظ التركيب: "sowohl...als auch" (كلا...و) — رابط مزدوج يربط عنصرين متساويين. ' +
          'كذلك "die Bereitschaft zu + Dativ" (الاستعداد لـ) و"die Offenheit" (الانفتاح) — ' +
          'مفردات أساسية في النقاش حول الاندماج.'
      }
    ]
  },

  // ─── Reading Passage 2: Work-Life-Balance ───
  {
    id: 'lese-2-2',
    titleDe: 'Work-Life-Balance — Zwischen Leistungsgesellschaft und Selbstfürsorge',
    textDe:
      'Der Begriff „Work-Life-Balance" hat sich in den vergangenen Jahren zu einem zentralen Schlagwort ' +
      'in der öffentlichen Debatte über die Gestaltung moderner Arbeitsverhältnisse entwickelt. Gemeint ' +
      'ist damit das Streben nach einem ausgewogenen Verhältnis zwischen beruflichen Anforderungen und ' +
      'privaten Bedürfnissen, das eine zufriedenstellende Lebensqualität gewährleisten soll. Die ' +
      'zunehmende Flexibilisierung der Arbeitswelt — insbesondere durch die Möglichkeiten des Homeoffice ' +
      'und der mobilen Arbeit — hat zwar einerseits die Vereinbarkeit von Familie und Beruf erleichtert, ' +
      'andererseits aber zu einer Entgrenzung der Arbeitszeit geführt, die die Grenzen zwischen Berufs- ' +
      'und Privatleben zunehmend verwischt. Einer Studie der Hans-Böckler-Stiftung zufolge gaben 56 ' +
      'Prozent der im Homeoffice Beschäftigten an, regelmäßig auch außerhalb der regulären Arbeitszeit ' +
      'berufliche E-Mails zu beantworten oder an Videokonferenzen teilzunehmen. Diese ständige ' +
      'Erreichbarkeit kann langfristig zu chronischem Stress, Erschöpfung und im schlimmsten Fall zu ' +
      'einem Burnout führen. Besonders betroffen sind laut einer Untersuchung des Robert Koch-Instituts ' +
      'Frauen im Alter zwischen 30 und 50 Jahren, die neben ihrer Berufstätigkeit häufig den ' +
      'Großteil der unbezahlten Sorgearbeit übernehmen. Die gewerkschaftliche Forderung nach einem ' +
      'Recht auf Nichterreichbarkeit, wie es in Frankreich bereits gesetzlich verankert ist, wird auch ' +
      'in Deutschland zunehmend diskutiert. Arbeitgeberverbände hingegen warnen davor, die ' +
      'Flexibilität der Arbeitnehmer einzuschränken, und betonen, dass starre Regelungen der ' +
      'Wettbewerbsfähigkeit der deutschen Wirtschaft schaden könnten. Eine einvernehmliche Lösung, die ' +
      'sowohl die Gesundheit der Beschäftigten als auch die betrieblichen Erfordernisse berücksichtigt, ' +
      'scheint dringend geboten.',
    questions: [
      {
        id: 'q2-2-1',
        promptDe: 'Was versteht man laut Text unter „Work-Life-Balance"?',
        options: [
          { id: 'a', de: 'Die vollständige Trennung von Beruf und Privatleben' },
          { id: 'b', de: 'Das Streben nach einem ausgewogenen Verhältnis zwischen beruflichen Anforderungen und privaten Bedürfnissen' },
          { id: 'c', de: 'Die Reduktion der Arbeitszeit auf 20 Stunden pro Woche' },
          { id: 'd', de: 'Die Abschaffung des Homeoffice' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يعرّف النص مفهوم "التوازن بين العمل والحياة" بأنه السعي إلى علاقة متوازنة ' +
          'بين المتطلبات المهنية والاحتياجات الخاصة. لاحظ الكلمة "ausgewogen" (متوازن) — وهي صفة مهمة في C1. ' +
          'كذلك "Gemeint ist damit" (يُقصد بذلك) — تركيب شائع لتعريف المصطلحات في النصوص الأكاديمية.'
      },
      {
        id: 'q2-2-2',
        promptDe: 'Welches Problem hat die Flexibilisierung der Arbeitswelt laut Text verursacht?',
        options: [
          { id: 'a', de: 'Höhere Arbeitslosigkeit' },
          { id: 'b', de: 'Eine Entgrenzung der Arbeitszeit, die die Grenzen zwischen Berufs- und Privatleben verwischt' },
          { id: 'c', de: 'Niedrigere Gehälter für alle Beschäftigten' },
          { id: 'd', de: 'Den Mangel an qualifizierten Arbeitskräften' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يوضح النص أن مرونة عالم العمل أدت إلى "Entgrenzung der Arbeitszeit" ' +
          '(تلاشي حدود وقت العمل) التي تطمس الحدود بين الحياة المهنية والشخصية بشكل متزايد. ' +
          'لاحظ الرابط المزدوج: "zwar einerseits...andererseits aber" (من جهة...لكن من جهة أخرى) — ' +
          'وهو تركيب أساسي لعرض الإيجابيات والسلبيات في المستوى C1. ' +
          'كلمة "Entgrenzung" (تلاشي الحدود) مشتقة من: ent- (إزالة) + Grenze (حد) + -ung (تحويل اسمي).'
      },
      {
        id: 'q2-2-3',
        promptDe: 'Wie hoch ist der Anteil der Homeoffice-Beschäftigten, die außerhalb der Arbeitszeit arbeiten?',
        options: [
          { id: 'a', de: '38 Prozent' },
          { id: 'b', de: '45 Prozent' },
          { id: 'c', de: '56 Prozent' },
          { id: 'd', de: '72 Prozent' }
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (ج). يذكر النص أن 56 بالمائة من العاملين في المكتب المنزلي أفادوا بأنهم يردون بانتظام ' +
          'على رسائل البريد الإلكتروني المهنية أو يشاركون في مؤتمرات الفيديو خارج ساعات العمل الاعتيادية. ' +
          'لاحظ التركيب: "einer Studie zufolge" (وفقاً لدراسة) — حرف الجر "zufolge + Dativ" يأتي بعد الاسم. ' +
          'كذلك "die im Homeoffice Beschäftigten" — استخدام اسم الفاعل كاسم (substantiviertes Partizip).'
      },
      {
        id: 'q2-2-4',
        promptDe: 'Welche Bevölkerungsgruppe ist laut Text besonders von Burnout betroffen?',
        options: [
          { id: 'a', de: 'Männer über 60 Jahre' },
          { id: 'b', de: 'Studierende an Universitäten' },
          { id: 'c', de: 'Frauen zwischen 30 und 50 Jahren, die zusätzlich unbezahlte Sorgearbeit leisten' },
          { id: 'd', de: 'Selbstständige in der IT-Branche' }
        ],
        correct: 'c',
        explanationAr:
          'الإجابة الصحيحة هي (ج). يشير النص إلى أن النساء بين 30 و50 عاماً يتأثرن بشكل خاص، ' +
          'لأنهن إلى جانب عملهن المهني يتحملن غالباً الجزء الأكبر من أعمال الرعاية غير المدفوعة الأجر. ' +
          'لاحظ المصطلح "Sorgearbeit" (أعمال الرعاية) — وهو مصطلح اجتماعي يشمل رعاية الأطفال والمسنين والأعمال المنزلية. ' +
          'كذلك "neben ihrer Berufstätigkeit" (إلى جانب عملهن المهني) — حرف الجر "neben + Dativ" بمعنى "إلى جانب".'
      },
      {
        id: 'q2-2-5',
        promptDe: 'Was fordern die Gewerkschaften und was befürchten die Arbeitgeberverbände?',
        options: [
          { id: 'a', de: 'Gewerkschaften fordern höhere Löhne, Arbeitgeber wollen weniger Urlaub' },
          { id: 'b', de: 'Gewerkschaften fordern ein Recht auf Nichterreichbarkeit, Arbeitgeber warnen vor starren Regelungen' },
          { id: 'c', de: 'Beide Seiten fordern mehr Homeoffice-Tage' },
          { id: 'd', de: 'Gewerkschaften wollen die Rente mit 60, Arbeitgeber die Rente mit 70' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يوضح النص أن النقابات تطالب بحق "عدم الاتاحة" (Recht auf Nichterreichbarkeit) — ' +
          'أي حق العامل في عدم الرد على رسائل العمل خارج ساعات الدوام — كما هو مُقنن قانونياً في فرنسا بالفعل. ' +
          'في المقابل، تحذر اتحادات أصحاب العمل من أن القواعد الصارمة قد تضر بالقدرة التنافسية للاقتصاد الألماني. ' +
          'لاحظ: "warnen davor + zu-Infinitiv" (يحذرون من) و"gesetzlich verankert" (مُثبت/مُقنن قانونياً) ' +
          '— تعابير قانونية مهمة في المستوى C1.'
      }
    ]
  },

  // ─── Reading Passage 3: Kulturelle Vielfalt als Chance ───
  {
    id: 'lese-2-3',
    titleDe: 'Kulturelle Vielfalt als Chance — Wie Diversität die Gesellschaft bereichert',
    textDe:
      'In einer zunehmend globalisierten Welt ist kulturelle Vielfalt längst zu einer gesellschaftlichen ' +
      'Realität geworden, der sich kein Land mehr entziehen kann. Während manche in der kulturellen ' +
      'Heterogenität eine Bedrohung für den gesellschaftlichen Zusammenhalt sehen, betonen Befürworter ' +
      'eines offenen Gesellschaftsmodells die zahlreichen Vorteile, die eine diverse Gesellschaft mit ' +
      'sich bringt. Untersuchungen aus der Wirtschaftsforschung belegen, dass kulturell diverse Teams ' +
      'in Unternehmen häufig kreativer und innovativer arbeiten als homogene Gruppen, da sie ' +
      'unterschiedliche Perspektiven und Erfahrungen einbringen. Auch im kulturellen Bereich hat die ' +
      'Begegnung verschiedener Traditionen zu einer Bereicherung geführt: Die deutsche Literatur-, ' +
      'Musik- und Gastronomieszene profitiert in erheblichem Maße von den Einflüssen zugewanderter ' +
      'Kulturschaffender. Dennoch darf nicht verschwiegen werden, dass kulturelle Vielfalt auch ' +
      'Herausforderungen mit sich bringt. Sprachliche Barrieren, unterschiedliche Wertvorstellungen ' +
      'und das Phänomen der Parallelgesellschaften können den sozialen Zusammenhalt gefährden. ' +
      'Entscheidend ist daher die Frage, wie eine Gesellschaft mit Vielfalt umgeht: Gelingt es, ' +
      'einen gemeinsamen Werterahmen zu schaffen, der individuelle kulturelle Identitäten respektiert ' +
      'und gleichzeitig ein Fundament für das friedliche Zusammenleben bietet? Bildungseinrichtungen ' +
      'spielen bei der Vermittlung interkultureller Kompetenzen eine Schlüsselrolle, denn nur wer ' +
      'die kulturellen Hintergründe seines Gegenübers versteht, kann Vorurteile abbauen und ' +
      'einen konstruktiven Dialog auf Augenhöhe führen.',
    questions: [
      {
        id: 'q2-3-1',
        promptDe: 'Welchen Vorteil kultureller Diversität belegen Studien aus der Wirtschaftsforschung?',
        options: [
          { id: 'a', de: 'Diverse Teams sind billiger als homogene Teams' },
          { id: 'b', de: 'Diverse Teams arbeiten häufig kreativer und innovativer als homogene Gruppen' },
          { id: 'c', de: 'Diverse Teams haben weniger Konflikte als homogene Gruppen' },
          { id: 'd', de: 'Diverse Teams brauchen weniger Führungskräfte' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يذكر النص أن أبحاث الاقتصاد تثبت أن الفرق المتنوعة ثقافياً في الشركات ' +
          'تعمل غالباً بشكل أكثر إبداعاً وابتكاراً من المجموعات المتجانسة. ' +
          'لاحظ صيغة المقارنة: "kreativer und innovativer...als" (أكثر إبداعاً وابتكاراً من). ' +
          'كذلك "da sie unterschiedliche Perspektiven einbringen" — جملة سببية مع "da" (لأن).'
      },
      {
        id: 'q2-3-2',
        promptDe: 'Welche Herausforderungen der kulturellen Vielfalt werden im Text genannt?',
        options: [
          { id: 'a', de: 'Höhere Steuern und weniger Arbeitsplätze' },
          { id: 'b', de: 'Sprachliche Barrieren, unterschiedliche Wertvorstellungen und Parallelgesellschaften' },
          { id: 'c', de: 'Umweltverschmutzung und Verkehrsprobleme' },
          { id: 'd', de: 'Mangelnde technische Infrastruktur' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يذكر النص ثلاثة تحديات: الحواجز اللغوية (sprachliche Barrieren)، ' +
          'اختلاف القيم (unterschiedliche Wertvorstellungen)، وظاهرة المجتمعات الموازية (Parallelgesellschaften). ' +
          'مصطلح "Parallelgesellschaften" مهم في النقاش الألماني حول الاندماج — يشير إلى مجموعات تعيش ' +
          'منعزلة عن المجتمع الأوسع بقيمها وقواعدها الخاصة. ' +
          'لاحظ: "darf nicht verschwiegen werden" (لا يجوز السكوت عنه) — بناء مجهول مع الفعل المشروط.'
      },
      {
        id: 'q2-3-3',
        promptDe: 'Was ist laut Text die entscheidende Frage in Bezug auf kulturelle Vielfalt?',
        options: [
          { id: 'a', de: 'Ob die Zuwanderung gestoppt werden sollte' },
          { id: 'b', de: 'Wie eine Gesellschaft mit Vielfalt umgeht und ob ein gemeinsamer Werterahmen geschaffen werden kann' },
          { id: 'c', de: 'Ob die deutsche Sprache durch andere Sprachen ersetzt werden sollte' },
          { id: 'd', de: 'Wie viele Einwanderer Deutschland jährlich aufnehmen sollte' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يطرح النص السؤال الحاسم: كيف يتعامل مجتمع ما مع التنوع — ' +
          'هل ينجح في إيجاد إطار قيمي مشترك يحترم الهويات الثقافية الفردية ويوفر في الوقت نفسه ' +
          'أساساً للتعايش السلمي؟ لاحظ التركيب: "Gelingt es + zu-Infinitiv" (هل ينجح في...) — ' +
          'فعل غير شخصي مهم. كذلك "der...respektiert und gleichzeitig...bietet" — ' +
          'جملة موصولة مع فعلين متوازيين.'
      },
      {
        id: 'q2-3-4',
        promptDe: 'In welchem Bereich profitiert Deutschland laut Text konkret von kultureller Vielfalt?',
        options: [
          { id: 'a', de: 'Im Bereich der Rüstungsindustrie' },
          { id: 'b', de: 'In der Literatur-, Musik- und Gastronomieszene' },
          { id: 'c', de: 'Im Bereich des Profisports' },
          { id: 'd', de: 'In der Automobilindustrie' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يذكر النص أن المشهد الأدبي والموسيقي وعالم المطاعم في ألمانيا يستفيد بشكل كبير ' +
          'من تأثيرات المبدعين المهاجرين (zugewanderte Kulturschaffende). ' +
          'لاحظ التعبير: "in erheblichem Maße" (بشكل كبير/إلى حد كبير) — ' +
          'وهو بديل أكاديمي لـ "sehr" أو "viel". ' +
          'كذلك "profitieren von + Dativ" (يستفيد من) — فعل مع حرف جر ثابت.'
      },
      {
        id: 'q2-3-5',
        promptDe: 'Welche Rolle spielen Bildungseinrichtungen laut Text?',
        options: [
          { id: 'a', de: 'Sie sollen ausländische Sprachen verbieten' },
          { id: 'b', de: 'Sie spielen eine Schlüsselrolle bei der Vermittlung interkultureller Kompetenzen und dem Abbau von Vorurteilen' },
          { id: 'c', de: 'Sie sollen nur deutsche Kultur und Geschichte unterrichten' },
          { id: 'd', de: 'Sie haben keine besondere Rolle bei der Integration' }
        ],
        correct: 'b',
        explanationAr:
          'الإجابة الصحيحة هي (ب). يختتم النص بأن المؤسسات التعليمية تلعب دوراً محورياً (Schlüsselrolle) ' +
          'في نقل الكفاءات بين الثقافات، لأن من يفهم الخلفيات الثقافية لمحاوره فقط يستطيع تفكيك الأحكام المسبقة ' +
          'وقيادة حوار بنّاء على قدم المساواة. لاحظ التعبير: "auf Augenhöhe" (على قدم المساواة) — ' +
          'حرفياً "على ارتفاع العين"، وهو تعبير مجازي شائع. ' +
          'كذلك "nur wer...versteht, kann...abbauen" — جملة شرطية مع "nur wer" (فقط من...).'
      }
    ]
  }
];

// ─── Model 2: Sprachbausteine ───
const model2Sprachbausteine: C1Sprachbaustein[] = [
  {
    id: 'sb-2-1',
    contextDe: 'Der Wissenschaftler behauptete, die Ergebnisse ___ eindeutig.',
    options: [
      { id: 'a', de: 'sind' },
      { id: 'b', de: 'seien' },
      { id: 'c', de: 'wären' },
      { id: 'd', de: 'werden' }
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (ب) "seien". هذا هو Konjunktiv I من الفعل "sein" في صيغة الجمع. ' +
      'يُستخدم في الكلام غير المباشر (indirekte Rede) بعد أفعال القول والادعاء. ' +
      'القاعدة: بعد "behauptete, dass..." أو بدون "dass" نستخدم Konjunktiv I. ' +
      'تصريف sein في Konjunktiv I: ich sei, du sei(e)st, er/sie/es sei, wir seien, ihr seiet, sie seien. ' +
      'لاحظ أن "seien" مختلف عن "sind" (Indikativ) و"wären" (Konjunktiv II). ' +
      'في C1 يجب أن تميز بين الأشكال الثلاثة وتستخدم كل منها في سياقه الصحيح.'
  },
  {
    id: 'sb-2-2',
    contextDe: 'Das Ergebnis steht im ___ mit den bisherigen Forschungsergebnissen.',
    options: [
      { id: 'a', de: 'Einklang' },
      { id: 'b', de: 'Zusammenhang' },
      { id: 'c', de: 'Widerspruch' },
      { id: 'd', de: 'Verhältnis' }
    ],
    correct: 'a',
    explanationAr:
      'الإجابة الصحيحة هي (أ) "Einklang". التركيب "im Einklang stehen mit + Dativ" يعني "يتوافق مع / ينسجم مع". ' +
      'هذا Funktionsverbgefüge (تركيب فعلي وظيفي) أكاديمي مهم. ' +
      'الخيارات الأخرى: "im Zusammenhang stehen mit" (يرتبط بـ)، "im Widerspruch stehen zu" (يتعارض مع) — ' +
      'لاحظ أن "Widerspruch" يأخذ "zu" وليس "mit"! ' +
      '"im Verhältnis stehen zu" (يتناسب مع). ' +
      'هذه التراكيب الوظيفية شائعة جداً في النصوص الأكاديمية الألمانية وتعتبر من أسس المستوى C1.'
  },
  {
    id: 'sb-2-3',
    contextDe: 'Die ___ Faktoren müssen bei der Analyse berücksichtigt werden.',
    options: [
      { id: 'a', de: 'oben genannte' },
      { id: 'b', de: 'oben genannten' },
      { id: 'c', de: 'oben gennante' },
      { id: 'd', de: 'oben gennanten' }
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (ب) "oben genannten". بعد أداة التعريف "die" في الجمع (Nominativ Plural) ' +
      'نستخدم التصريف الضعيف (schwache Deklination) وبالتالي ننهي الصفة بـ "-en". ' +
      'القاعدة: بعد أداة التعريف (der, die, das) تنتهي الصفة دائماً بـ "-e" (مفرد Nom/Akk) أو "-en" (كل الحالات الأخرى). ' +
      'في الجمع بعد "die": دائماً "-en" (Nom, Akk, Dat, Gen). ' +
      'لاحظ أن "oben genannt" (المذكور أعلاه) هي صفة مركبة من ظرف + Partizip II — ' +
      'وهي شائعة في النصوص الأكاديمية. كذلك لاحظ الهجاء الصحيح: "genannt" وليس "gennant".'
  },
  {
    id: 'sb-2-4',
    contextDe: 'Die Regierung brachte eine Reform ___ den Weg, die weitreichende Konsequenzen haben dürfte.',
    options: [
      { id: 'a', de: 'auf' },
      { id: 'b', de: 'in' },
      { id: 'c', de: 'an' },
      { id: 'd', de: 'über' }
    ],
    correct: 'a',
    explanationAr:
      'الإجابة الصحيحة هي (أ) "auf". التركيب "etwas auf den Weg bringen" يعني "يبدأ شيئاً / يُطلق شيئاً". ' +
      'هذا Funktionsverbgefüge (تركيب فعلي وظيفي) شائع في اللغة السياسية والإعلامية. ' +
      'المعنى الحرفي: "يضع شيئاً على الطريق" = "يضعه قيد التنفيذ". ' +
      'لاحظ أيضاً: "dürfte" هنا ليست بمعنى "يُسمح له" بل بمعنى "من المرجح أن" — ' +
      'وهذا استخدام خاص لـ Konjunktiv II من "dürfen" للتعبير عن الاحتمال/الترجيح. ' +
      '"weitreichende Konsequenzen" = "عواقب بعيدة المدى".'
  },
  {
    id: 'sb-2-5',
    contextDe: 'Die Professorin erklärte, sie ___ die Studie im kommenden Semester veröffentlichen.',
    options: [
      { id: 'a', de: 'wird' },
      { id: 'b', de: 'werde' },
      { id: 'c', de: 'würde' },
      { id: 'd', de: 'wolle' }
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (ب) "werde". في الكلام غير المباشر (indirekte Rede) نستخدم Konjunktiv I ' +
      'من "werden" للتعبير عن المستقبل. تصريف werden في Konjunktiv I: ich werde, du werdest, er/sie/es werde. ' +
      'لاحظ أن شكل المتكلم "ich werde" متطابق مع Indikativ، لذا في هذه الحالة يمكن استخدام Konjunktiv II (würde). ' +
      'لكن بما أن الفاعل هنا "sie" (هي)، فإن "werde" هو الشكل الصحيح لـ Konjunktiv I. ' +
      'هذه القاعدة مهمة جداً: "wird" = Indikativ، "werde" = Konjunktiv I، "würde" = Konjunktiv II.'
  },
  {
    id: 'sb-2-6',
    contextDe: 'Die im Rahmen der Untersuchung ___ Daten wurden sorgfältig ausgewertet.',
    options: [
      { id: 'a', de: 'erhobene' },
      { id: 'b', de: 'erhobenen' },
      { id: 'c', de: 'erhebenden' },
      { id: 'd', de: 'zu erhebenden' }
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (ب) "erhobenen". هذا Partizipialattribut مع Partizip II من الفعل "erheben" (يجمع بيانات). ' +
      'البنية: "die...erhobenen Daten" = "البيانات المُجمّعة". ' +
      'نستخدم Partizip II لأن البيانات قد جُمعت بالفعل. ' +
      'ونضيف "-en" لأن "die Daten" جمع مع أداة التعريف (schwache Deklination → immer -en im Plural). ' +
      'لو كان السؤال عن بيانات لم تُجمع بعد ويجب جمعها، لاستخدمنا "zu erhebenden" (Gerundiv). ' +
      'الفرق: "erhobenen" = تم جمعها، "zu erhebenden" = يجب جمعها.'
  },
  {
    id: 'sb-2-7',
    contextDe: 'Die Maßnahme dient ___ Verbesserung der sozialen Teilhabe aller Bevölkerungsgruppen.',
    options: [
      { id: 'a', de: 'der' },
      { id: 'b', de: 'die' },
      { id: 'c', de: 'den' },
      { id: 'd', de: 'zur' }
    ],
    correct: 'a',
    explanationAr:
      'الإجابة الصحيحة هي (أ) "der". الفعل "dienen + Dativ" (يخدم / يهدف إلى). ' +
      '"die Verbesserung" مؤنث، وفي حالة Dativ تصبح أداة التعريف "der". ' +
      'لاحظ الفرق: "dient der Verbesserung" = "يخدم التحسين" (dienen + Dativ بدون حرف جر). ' +
      'لو كان الفعل "beitragen"، لقلنا: "trägt zur Verbesserung bei" (يساهم في التحسين) — ' +
      'هنا "zur" = "zu + der". لكن مع "dienen" نستخدم Dativ مباشرة. ' +
      '"soziale Teilhabe" (المشاركة الاجتماعية) مصطلح سياسي-اجتماعي مهم في ألمانيا.'
  },
  {
    id: 'sb-2-8',
    contextDe: 'Es ist ___ auszuschließen, dass die Reform auch negative Auswirkungen haben könnte.',
    options: [
      { id: 'a', de: 'nicht' },
      { id: 'b', de: 'kaum' },
      { id: 'c', de: 'keineswegs' },
      { id: 'd', de: 'niemals' }
    ],
    correct: 'c',
    explanationAr:
      'الإجابة الصحيحة هي (ج) "keineswegs" (بأي حال من الأحوال / بتاتاً). ' +
      'التركيب: "es ist keineswegs auszuschließen, dass..." = "لا يمكن بأي حال من الأحوال استبعاد أن...". ' +
      '"sein + zu + Infinitiv" هنا يعبر عن إمكانية المبني للمجهول: = "es kann keineswegs ausgeschlossen werden". ' +
      'الفرق بين الخيارات: "nicht" (لا) — نفي بسيط، "kaum" (بالكاد) — نفي جزئي، ' +
      '"keineswegs" (بتاتاً) — نفي قاطع ومؤكد، "niemals" (أبداً) — نفي زمني. ' +
      'في هذا السياق الأكاديمي، "keineswegs" هو الأنسب لأنه يعبر عن نفي قاطع لكن بأسلوب رسمي.'
  },
  {
    id: 'sb-2-9',
    contextDe: 'Die Studie kommt zu dem ___, dass interkulturelle Kompetenz erlernbar ist.',
    options: [
      { id: 'a', de: 'Schluss' },
      { id: 'b', de: 'Ergebnis' },
      { id: 'c', de: 'Resultat' },
      { id: 'd', de: 'Fazit' }
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (ب) "Ergebnis". التركيب الثابت هو "zu dem Ergebnis kommen, dass..." ' +
      '(يتوصل إلى نتيجة مفادها أن...). هذا Funktionsverbgefüge أكاديمي مهم. ' +
      'لاحظ: "zu dem Schluss kommen" (يتوصل إلى استنتاج) صحيح نحوياً أيضاً لكن "Ergebnis" أدق في سياق الدراسات. ' +
      '"Ergebnis" (نتيجة بحثية)، "Schluss" (استنتاج)، "Fazit" (خلاصة). ' +
      'الفعل الثابت هنا هو "kommen zu + Dativ": لذلك "zu dem Ergebnis" (Dativ من "das Ergebnis").'
  },
  {
    id: 'sb-2-10',
    contextDe: '___ der demografische Wandel Deutschland vor große Herausforderungen stellt, ist unbestritten.',
    options: [
      { id: 'a', de: 'Ob' },
      { id: 'b', de: 'Dass' },
      { id: 'c', de: 'Weil' },
      { id: 'd', de: 'Wenn' }
    ],
    correct: 'b',
    explanationAr:
      'الإجابة الصحيحة هي (ب) "Dass". جملة "Dass...stellt" هي Subjektsatz (جملة فاعلية) — ' +
      'أي أنها تحل محل الفاعل في الجملة الرئيسية: "Das ist unbestritten" → "Dass...stellt, ist unbestritten". ' +
      'المعنى: "أن التغير الديموغرافي يضع ألمانيا أمام تحديات كبيرة — أمر لا جدال فيه". ' +
      'لاحظ أن "ob" (هل/ما إذا) يُستخدم عندما يكون هناك شك، لكن هنا النص يقول "unbestritten" (لا جدال فيه) — ' +
      'لذلك نستخدم "dass" (أن) وليس "ob" (هل). ' +
      'كذلك "vor Herausforderungen stellen" (يضع أمام تحديات) — تركيب ثابت مهم.'
  }
];

// ─── Model 2: Schreiben ───
const model2Schreiben: C1SchreibenPart[] = [
  {
    id: 'sch-2-1',
    titleDe: 'Erörterung: Braucht Deutschland mehr Zuwanderung?',
    promptDe:
      'Schreiben Sie eine Erörterung zum Thema: „Braucht Deutschland mehr Zuwanderung?" ' +
      'Gehen Sie dabei auf folgende Aspekte ein:\n' +
      '• Welche wirtschaftlichen und demografischen Gründe sprechen für mehr Zuwanderung?\n' +
      '• Welche Herausforderungen bringt verstärkte Zuwanderung mit sich?\n' +
      '• Wie beurteilen Sie die Situation?\n\n' +
      'Schreiben Sie einen zusammenhängenden Text von mindestens 250 Wörtern. Achten Sie auf eine klare Gliederung ' +
      '(Einleitung, Hauptteil mit Pro- und Kontra-Argumenten, Schluss) und einen angemessenen Sprachstil.',
    promptAr:
      'اكتب مقالاً جدلياً حول الموضوع: "هل تحتاج ألمانيا إلى مزيد من الهجرة؟"\n' +
      'تناول الجوانب التالية:\n' +
      '• ما الأسباب الاقتصادية والديموغرافية التي تتحدث لصالح المزيد من الهجرة؟\n' +
      '• ما التحديات التي تجلبها الهجرة المتزايدة معها؟\n' +
      '• كيف تقيّم الوضع؟\n\n' +
      'اكتب نصاً متماسكاً من 250 كلمة على الأقل مع بنية واضحة وأسلوب لغوي مناسب.',
    redemittel: [
      'Die Frage, ob Deutschland mehr Zuwanderung braucht, wird derzeit intensiv diskutiert.',
      'Aus wirtschaftlicher Sicht spricht vieles dafür, dass...',
      'Ein zentrales Argument für mehr Zuwanderung ist...',
      'Dem ist allerdings entgegenzuhalten, dass...',
      'Nicht außer Acht gelassen werden darf, dass...',
      'Es liegt auf der Hand, dass...',
      'Die Erfahrung zeigt, dass...',
      'Nach Abwägung aller Argumente komme ich zu dem Schluss, dass...',
      'Es wäre wünschenswert, wenn...',
      'Abschließend bleibt festzuhalten, dass...'
    ],
    sampleDe:
      'Die Frage, ob Deutschland mehr Zuwanderung braucht, wird derzeit intensiv und kontrovers diskutiert. ' +
      'Angesichts des demografischen Wandels und des zunehmenden Fachkräftemangels gewinnt diese Debatte ' +
      'an Dringlichkeit und Relevanz.\n\n' +
      'Aus wirtschaftlicher Sicht spricht vieles für eine gesteuerte Zuwanderung. Ein zentrales Argument ' +
      'ist der akute Fachkräftemangel, der zahlreiche Branchen — von der Pflege über das Handwerk bis ' +
      'zur Informationstechnologie — vor existenzielle Herausforderungen stellt. Prognosen des Instituts ' +
      'für Arbeitsmarkt- und Berufsforschung zufolge benötigt Deutschland jährlich mindestens 400.000 ' +
      'Zuwanderer, um den demografisch bedingten Rückgang der Erwerbsbevölkerung auszugleichen. Darüber ' +
      'hinaus tragen Zugewanderte durch ihre Steuer- und Sozialversicherungsbeiträge zur Stabilisierung ' +
      'der sozialen Sicherungssysteme bei, die durch die alternde Gesellschaft zunehmend unter Druck geraten.\n\n' +
      'Dem ist allerdings entgegenzuhalten, dass verstärkte Zuwanderung auch Herausforderungen mit sich ' +
      'bringt. Nicht außer Acht gelassen werden darf, dass die Integration der Zugewanderten erhebliche ' +
      'finanzielle und organisatorische Ressourcen erfordert. Kommunen berichten von Engpässen bei der ' +
      'Bereitstellung von Wohnraum, Schulplätzen und Sprachkursangeboten. Überdies besteht die Gefahr, ' +
      'dass eine ungesteuerte Zuwanderung den Niedriglohnsektor vergrößert und somit den sozialen ' +
      'Zusammenhalt gefährdet. Auch die gesellschaftliche Akzeptanz stellt eine Herausforderung dar, ' +
      'da populistische Strömungen die Ängste der Bevölkerung instrumentalisieren und das gesellschaftliche ' +
      'Klima vergiften.\n\n' +
      'Nach Abwägung aller Argumente komme ich zu dem Schluss, dass Deutschland zweifellos auf ' +
      'Zuwanderung angewiesen ist, um seinen Wohlstand und seine sozialen Sicherungssysteme langfristig ' +
      'zu sichern. Es wäre jedoch wünschenswert, wenn die Zuwanderung durch klare Regelungen gesteuert ' +
      'und von umfassenden Integrationsmaßnahmen begleitet würde. Abschließend bleibt festzuhalten, dass ' +
      'erfolgreiche Zuwanderungspolitik stets das Gleichgewicht zwischen wirtschaftlichen Erfordernissen, ' +
      'humanitärer Verantwortung und der Aufnahmefähigkeit der Gesellschaft wahren muss.',
    sampleAr:
      'تُناقش مسألة ما إذا كانت ألمانيا بحاجة إلى مزيد من الهجرة حالياً بشكل مكثف ومثير للجدل. ' +
      'في ظل التغير الديموغرافي والنقص المتزايد في العمالة الماهرة تكتسب هذه المناقشة إلحاحاً وأهمية.\n\n' +
      'من الناحية الاقتصادية، هناك حجج كثيرة تؤيد الهجرة الموجّهة. الحجة المركزية هي النقص الحاد في العمالة الماهرة ' +
      'الذي يضع قطاعات عديدة — من التمريض إلى الحرف اليدوية وصولاً إلى تكنولوجيا المعلومات — أمام تحديات وجودية. ' +
      'وفقاً لتوقعات معهد أبحاث سوق العمل والمهن، تحتاج ألمانيا سنوياً إلى ما لا يقل عن 400 ألف مهاجر ' +
      'لتعويض التراجع الديموغرافي في السكان العاملين. علاوة على ذلك، يساهم المهاجرون من خلال مساهماتهم الضريبية ' +
      'وتأميناتهم الاجتماعية في استقرار أنظمة الضمان الاجتماعي التي تتعرض لضغوط متزايدة بسبب شيخوخة المجتمع.\n\n' +
      'في المقابل، يجب الاعتراف بأن الهجرة المتزايدة تجلب تحديات أيضاً. لا يجوز تجاهل أن اندماج المهاجرين يتطلب ' +
      'موارد مالية وتنظيمية كبيرة. تُبلغ البلديات عن اختناقات في توفير المساكن وأماكن المدارس وعروض دورات اللغة. ' +
      'فضلاً عن ذلك، هناك خطر أن تُوسّع الهجرة غير الموجّهة قطاع الأجور المنخفضة وتهدد التماسك الاجتماعي.\n\n' +
      'بعد موازنة جميع الحجج، أتوصل إلى أن ألمانيا بلا شك تعتمد على الهجرة لضمان رفاهيتها وأنظمة ضمانها الاجتماعي ' +
      'على المدى الطويل. لكن من المستحسن أن تُنظَّم الهجرة بقواعد واضحة وتُرافَق بتدابير اندماج شاملة. ' +
      'في الختام، تجدر الإشارة إلى أن سياسة الهجرة الناجحة يجب أن تحافظ دائماً على التوازن بين المتطلبات الاقتصادية ' +
      'والمسؤولية الإنسانية وقدرة المجتمع على الاستيعاب.'
  }
];

// ─── Model 2: Sprechen ───
const model2Sprechen: C1SprechenPart[] = [
  {
    id: 'spr-2-1',
    titleDe: 'Vortrag: Ehrenamt — Warum sollte man sich engagieren?',
    promptDe:
      'Halten Sie einen Vortrag zum Thema „Ehrenamt — Warum sollte man sich freiwillig engagieren?" ' +
      'Gehen Sie dabei auf die folgenden Punkte ein:\n' +
      '• Welche Formen ehrenamtlichen Engagements gibt es?\n' +
      '• Welche Vorteile hat ehrenamtliche Arbeit für die Gesellschaft und für den Einzelnen?\n' +
      '• Wie kann man mehr Menschen für das Ehrenamt gewinnen?\n' +
      'Ihr Vortrag sollte circa 5 Minuten dauern.',
    promptAr:
      'ألقِ محاضرة حول موضوع "العمل التطوعي — لماذا ينبغي أن يشارك المرء طوعياً؟"\n' +
      'تناول النقاط التالية:\n' +
      '• ما أشكال المشاركة التطوعية الموجودة؟\n' +
      '• ما فوائد العمل التطوعي للمجتمع وللفرد؟\n' +
      '• كيف يمكن كسب مزيد من الناس للعمل التطوعي؟\n' +
      'يجب أن تستمر محاضرتك حوالي 5 دقائق.',
    redemittel: [
      'Ich möchte heute über ein Thema sprechen, das mir persönlich am Herzen liegt.',
      'Unter Ehrenamt versteht man...',
      'Es gibt vielfältige Möglichkeiten, sich ehrenamtlich zu engagieren, beispielsweise...',
      'Ein häufig unterschätzter Aspekt des Ehrenamts ist...',
      'Aus meiner Sicht profitieren davon nicht nur die Empfänger, sondern auch...',
      'Um mehr Menschen für das Ehrenamt zu begeistern, könnte man...',
      'In diesem Kontext möchte ich auch auf die Situation von Zugewanderten eingehen.',
      'Abschließend lässt sich festhalten, dass...',
      'Ich möchte mit einem Appell schließen: ...',
      'Vielen Dank für Ihre Aufmerksamkeit.'
    ],
    sampleDe:
      'Sehr geehrte Damen und Herren, ich möchte heute über ein Thema sprechen, das mir persönlich am ' +
      'Herzen liegt: das Ehrenamt. Unter ehrenamtlichem Engagement versteht man eine freiwillige, ' +
      'unentgeltliche Tätigkeit zum Wohle der Gemeinschaft. In Deutschland engagieren sich laut dem ' +
      'aktuellen Freiwilligensurvey rund 40 Prozent der Bevölkerung ehrenamtlich — ein beeindruckender ' +
      'Wert, der die Bedeutung dieses gesellschaftlichen Pfeilers unterstreicht.\n\n' +
      'Es gibt vielfältige Möglichkeiten, sich ehrenamtlich zu engagieren. Das Spektrum reicht von der ' +
      'Mitarbeit in Sportvereinen und kulturellen Einrichtungen über die Betreuung von Geflüchteten und ' +
      'älteren Menschen bis hin zum Engagement in Umweltschutzorganisationen und der Freiwilligen ' +
      'Feuerwehr. Besonders bemerkenswert ist, dass sich in jüngster Zeit auch immer mehr Menschen mit ' +
      'Migrationshintergrund ehrenamtlich engagieren und damit einen wertvollen Beitrag zur Integration ' +
      'leisten.\n\n' +
      'Die Vorteile des Ehrenamts sind vielfältig. Für die Gesellschaft ist ehrenamtliches Engagement ' +
      'unverzichtbar, da es Aufgaben übernimmt, die vom Staat allein nicht bewältigt werden könnten. Für ' +
      'den Einzelnen bietet es die Möglichkeit, neue Kompetenzen zu erwerben, soziale Kontakte zu knüpfen ' +
      'und ein Gefühl der Zugehörigkeit zu entwickeln. Gerade für Zugewanderte kann das Ehrenamt eine ' +
      'wichtige Brücke zur Aufnahmegesellschaft darstellen.\n\n' +
      'Um mehr Menschen für das Ehrenamt zu gewinnen, bedarf es einer stärkeren gesellschaftlichen ' +
      'Anerkennung und einer besseren Infrastruktur. Möglich wäre beispielsweise die steuerliche ' +
      'Begünstigung ehrenamtlicher Arbeit oder die Anrechnung ehrenamtlicher Tätigkeiten bei ' +
      'Bewerbungsverfahren. Abschließend lässt sich festhalten, dass das Ehrenamt das Fundament einer ' +
      'solidarischen Gesellschaft bildet und jeder Einzelne durch sein Engagement die Welt ein Stück ' +
      'besser machen kann.',
    sampleAr:
      'سيداتي سادتي، أود اليوم أن أتحدث عن موضوع يقع قريباً من قلبي: العمل التطوعي. يُقصد بالمشاركة التطوعية ' +
      'نشاط طوعي غير مدفوع الأجر لصالح المجتمع. في ألمانيا يشارك حوالي 40 بالمائة من السكان في العمل التطوعي ' +
      'وفقاً لأحدث مسح للمتطوعين — وهو رقم مثير للإعجاب يؤكد أهمية هذا الركيزة المجتمعية.\n\n' +
      'هناك إمكانيات متنوعة للمشاركة التطوعية. يمتد الطيف من العمل في الأندية الرياضية والمؤسسات الثقافية ' +
      'إلى رعاية اللاجئين وكبار السن وصولاً إلى الانخراط في منظمات حماية البيئة والإطفاء التطوعي. ' +
      'من اللافت أن المزيد من الأشخاص ذوي الخلفية المهاجرة يشاركون في العمل التطوعي ويقدمون بذلك ' +
      'مساهمة قيّمة في الاندماج.\n\n' +
      'فوائد العمل التطوعي متعددة. بالنسبة للمجتمع، المشاركة التطوعية لا غنى عنها لأنها تتولى مهاماً لا يستطيع ' +
      'الدولة وحدها التعامل معها. بالنسبة للفرد، يوفر العمل التطوعي فرصة لاكتساب كفاءات جديدة وبناء علاقات اجتماعية ' +
      'وتطوير شعور بالانتماء. خاصة بالنسبة للمهاجرين يمكن أن يكون العمل التطوعي جسراً مهماً للمجتمع المستقبِل.\n\n' +
      'لكسب المزيد من الناس للعمل التطوعي، يحتاج الأمر إلى اعتراف مجتمعي أقوى وبنية تحتية أفضل. ' +
      'في الختام، يمكن القول إن العمل التطوعي يشكّل أساس مجتمع تضامني وأن كل فرد بمشاركته يمكنه أن يجعل ' +
      'العالم مكاناً أفضل قليلاً.'
  },
  {
    id: 'spr-2-2',
    titleDe: 'Diskussion: Sollte der Einbürgerungstest schwieriger werden?',
    promptDe:
      'Diskutieren Sie mit Ihrem Gesprächspartner / Ihrer Gesprächspartnerin über die folgende Frage:\n' +
      '„Sollte Deutschland den Einbürgerungstest schwieriger gestalten?"\n\n' +
      'Tauschen Sie Argumente aus und versuchen Sie, zu einem gemeinsamen Ergebnis zu kommen.\n' +
      'Dauer: circa 5 Minuten.',
    promptAr:
      'ناقش مع شريك/شريكة الحوار السؤال التالي:\n' +
      '"هل ينبغي لألمانيا أن تجعل اختبار التجنس أصعب؟"\n\n' +
      'تبادلا الحجج وحاولا التوصل إلى نتيجة مشتركة.\n' +
      'المدة: حوالي 5 دقائق.',
    redemittel: [
      'Das ist eine vielschichtige Frage, die verschiedene Aspekte berührt.',
      'Grundsätzlich bin ich der Ansicht, dass...',
      'Man könnte allerdings auch argumentieren, dass...',
      'Ich sehe das differenzierter, denn...',
      'Was mich an Ihrer Argumentation überzeugt, ist...',
      'Ich möchte zu bedenken geben, dass...',
      'Aus der Perspektive der Zugewanderten lässt sich sagen, dass...',
      'Vielleicht liegt die Lösung in einem Mittelweg, nämlich...',
      'Wenn wir beide Seiten berücksichtigen, dann...',
      'Ich denke, wir sind uns einig, dass...'
    ],
    sampleDe:
      'A: Das ist eine vielschichtige Frage. Grundsätzlich bin ich der Ansicht, dass der Einbürgerungstest ' +
      'in seiner jetzigen Form angemessen ist. Er prüft grundlegende Kenntnisse über die deutsche ' +
      'Geschichte, das politische System und die Rechtsordnung. Eine Verschärfung könnte dazu führen, ' +
      'dass Menschen, die seit Jahren in Deutschland leben und gut integriert sind, von der ' +
      'Staatsbürgerschaft ausgeschlossen werden.\n\n' +
      'B: Ich sehe das differenzierter. Man könnte argumentieren, dass ein anspruchsvollerer Test die ' +
      'Wertschätzung für die deutsche Staatsbürgerschaft erhöhen würde. In Ländern wie der Schweiz oder ' +
      'Kanada sind die Anforderungen deutlich höher, und dennoch funktioniert die Integration dort ' +
      'vergleichsweise gut. Zudem würde ein schwierigerer Test sicherstellen, dass die Bewerber sich ' +
      'tatsächlich mit den Grundwerten des Grundgesetzes auseinandergesetzt haben.\n\n' +
      'A: Was mich an Ihrer Argumentation überzeugt, ist der Aspekt der Wertevermittlung. Allerdings möchte ' +
      'ich zu bedenken geben, dass Integration nicht an einem Test gemessen werden kann. Viele Menschen ' +
      'mit Migrationshintergrund engagieren sich seit Jahren ehrenamtlich, sprechen fließend Deutsch und ' +
      'zahlen Steuern — ihr Beitrag zur Gesellschaft geht weit über das hinaus, was ein Test abfragen kann.\n\n' +
      'B: Das stimmt. Aus der Perspektive der Zugewanderten lässt sich sagen, dass ein zu schwieriger Test ' +
      'als Hürde empfunden werden könnte, die Menschen entmutigt statt motiviert. Vielleicht liegt die ' +
      'Lösung in einem Mittelweg: Der Test könnte um Fragen zu demokratischen Werten erweitert werden, ' +
      'ohne das Niveau insgesamt drastisch anzuheben.\n\n' +
      'A: Ich denke, wir sind uns einig, dass der Fokus weniger auf der Schwierigkeit des Tests als ' +
      'vielmehr auf der Qualität der Integrationskurse liegen sollte, die auf den Test vorbereiten. ' +
      'Wenn die Kurse besser werden, steigt automatisch auch das Niveau der Bewerber.',
    sampleAr:
      'أ: هذا سؤال متعدد الأوجه. من حيث المبدأ أرى أن اختبار التجنس في شكله الحالي مناسب. فهو يختبر معارف أساسية ' +
      'حول التاريخ الألماني والنظام السياسي والنظام القانوني. قد يؤدي التشديد إلى استبعاد أشخاص يعيشون في ألمانيا ' +
      'منذ سنوات ومندمجين جيداً من الحصول على الجنسية.\n\n' +
      'ب: أرى الأمر بشكل أكثر تمايزاً. يمكن القول إن اختباراً أكثر تطلباً سيزيد من تقدير الجنسية الألمانية. ' +
      'في دول مثل سويسرا أو كندا المتطلبات أعلى بكثير، ومع ذلك يعمل الاندماج هناك بشكل جيد نسبياً. ' +
      'كما أن اختباراً أصعب سيضمن أن المتقدمين قد تعاملوا فعلاً مع القيم الأساسية للقانون الأساسي.\n\n' +
      'أ: ما يقنعني في حجتك هو جانب نقل القيم. لكن أود أن ألفت الانتباه إلى أن الاندماج لا يمكن قياسه باختبار. ' +
      'كثير من الأشخاص ذوي الخلفية المهاجرة يشاركون منذ سنوات في العمل التطوعي ويتحدثون الألمانية بطلاقة ' +
      'ويدفعون الضرائب — مساهمتهم في المجتمع تتجاوز بكثير ما يمكن لاختبار أن يسأل عنه.\n\n' +
      'ب: هذا صحيح. من منظور المهاجرين يمكن القول إن اختباراً صعباً جداً قد يُنظر إليه كعقبة تُثبط الهمم بدلاً ' +
      'من أن تحفز. ربما يكمن الحل في طريق وسط: يمكن توسيع الاختبار بأسئلة حول القيم الديمقراطية دون رفع ' +
      'المستوى بشكل جذري.\n\n' +
      'أ: أعتقد أننا متفقون على أن التركيز يجب أن يكون أقل على صعوبة الاختبار وأكثر على جودة دورات الاندماج ' +
      'التي تحضّر للاختبار. إذا تحسنت الدورات، يرتفع تلقائياً مستوى المتقدمين أيضاً.'
  }
];

// =============================================================================
// EXPORT: Combine all models
// =============================================================================

export const c1Models: C1Model[] = [
  {
    id: 'telc-c1-1',
    titleAr: 'نموذج 1 — العلم والتكنولوجيا',
    titleDe: 'Modelltest 1 — Wissenschaft & Technologie',
    level: 'C1',
    durationMin: 200,
    readingPassages: model1ReadingPassages,
    sprachbausteine: model1Sprachbausteine,
    schreibenParts: model1Schreiben,
    sprechenParts: model1Sprechen
  },
  {
    id: 'telc-c1-2',
    titleAr: 'نموذج 2 — المجتمع والثقافة',
    titleDe: 'Modelltest 2 — Gesellschaft & Kultur',
    level: 'C1',
    durationMin: 200,
    readingPassages: model2ReadingPassages,
    sprachbausteine: model2Sprachbausteine,
    schreibenParts: model2Schreiben,
    sprechenParts: model2Sprechen
  }
];
