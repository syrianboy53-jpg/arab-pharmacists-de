export interface EscapePuzzle {
  id: number;
  title: string;
  story: string;
  question: string;
  type: 'passcode' | 'word-order' | 'multiple-choice';
  options?: string[];
  words?: string[];
  correctAnswer: string | string[];
  hint: string;
}

export const escapeRooms: EscapePuzzle[] = [
  {
    id: 1,
    title: "الغرفة الأولى: الباب الخشبي",
    story: "تستيقظ في غرفة صغيرة ومظلمة، لا يوجد فيها سوى باب خشبي قديم ومغلق. على الباب توجد لوحة خشبية محفور عليها لغز لغوي. يجب أن تحل اللغز لكي يُفتح الباب.",
    question: "أكمل الجملة بحرف الجر الصحيح: 'Ich freue mich _____ das Wochenende.'",
    type: "multiple-choice",
    options: ["auf", "über", "für", "an"],
    correctAnswer: "auf",
    hint: "نتحدث عن شيء في المستقبل (عطلة نهاية الأسبوع)، لذلك نستخدم حرف جر محدد مع الفعل freuen."
  },
  {
    id: 2,
    title: "الغرفة الثانية: فوضى المكتبة",
    story: "يُفتح الباب الخشبي بصوت صرير مرعب، وتدخل إلى غرفة مليئة بالكتب المبعثرة على الأرض. لتفتح الباب السري، يجب أن ترتب التعويذة الألمانية المكتوبة على الورقة الممزقة.",
    question: "رتب الجملة بشكل صحيح لتفتح الباب:",
    type: "word-order",
    words: ["ich", "bleibe", "zu Hause", ",", "weil", "ich", "krank", "bin"],
    correctAnswer: ["ich", "bleibe", "zu Hause", ",", "weil", "ich", "krank", "bin"],
    hint: "تذكر أن 'weil' ترسل الفعل المُصرف إلى نهاية الجملة!"
  },
  {
    id: 3,
    title: "الغرفة الثالثة: خزانة الأرقام",
    story: "تصل إلى خزانة حديدية ضخمة مقفلة بقفل إلكتروني يطلب كوداً من 4 أرقام. تجد بجانبها قصاصة ورق تحتوي على تلميحات للرقم السري.",
    question: "1. عدد أحرف كلمة 'مستشفى' (Krankenhaus)\n2. عدد أحرف تصريف الفعل (sein) مع الضمير (ihr)\n3. عدد أحرف أداة التعريف للكلمة (Mädchen)",
    type: "passcode",
    correctAnswer: "1143",
    hint: "Krankenhaus (11 حرف)، تصريف sein مع ihr هو seid (4 أحرف)، أداة Mädchen هي das (3 أحرف). اكتب الأرقام متصلة."
  },
  {
    id: 4,
    title: "الممر المميت: ليزر القواعد",
    story: "تدخل ممراً طويلاً مليئاً بأشعة الليزر. فجأة يتحدث إليك صوت آلي ويخبرك أنه سيسمح لك بالمرور فقط إذا أثبتّ فهمك لقواعد B1 الأساسية.",
    question: "ما هو الفرق الصحيح بين (als) و (wenn) في الجمل الزمنية؟",
    type: "multiple-choice",
    options: [
      "als للماضي مرة واحدة، wenn للحاضر والمستقبل والماضي المتكرر",
      "als للمستقبل فقط، wenn للماضي فقط",
      "لا يوجد فرق، يمكن استخدام كلاهما في كل مكان",
      "als للجمع، wenn للمفرد"
    ],
    correctAnswer: "als للماضي مرة واحدة، wenn للحاضر والمستقبل والماضي المتكرر",
    hint: "تذكر: 'Als ich ein Kind war...' (عندما كنت طفلاً - حدث لمرة واحدة في الماضي)."
  },
  {
    id: 5,
    title: "بوابة الحرية: الكلمة الأخيرة",
    story: "أخيراً، ترى ضوء الشمس يتسرب من الباب الأخير! الباب مقفل بقفل إلكتروني يطلب كلمة مرور تتكون من 4 أحرف ألمانية.",
    question: "ما هو عكس كلمة 'heiß' (حار) بالألمانية؟",
    type: "passcode",
    correctAnswer: "kalt",
    hint: "كلمة من 4 أحرف تبدأ بحرف k وتعني (بارد)."
  }
];
