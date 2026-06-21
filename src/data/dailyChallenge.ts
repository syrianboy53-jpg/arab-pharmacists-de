export interface DailyQuestion {
  id: string;
  type: 'grammar' | 'vocabulary' | 'situation';
  question: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
}

export const dailyQuestionPool: DailyQuestion[] = [
  // Grammar
  { id: 'q1', type: 'grammar', question: 'Ich ___ gestern ins Kino gegangen.', options: ['bin', 'habe', 'war', 'wurde'], correctIndex: 0, explanationAr: 'الفعل gehen يأخذ المساعد sein في الماضي.' },
  { id: 'q2', type: 'grammar', question: 'Er hat mir ___ Buch geschenkt.', options: ['ein', 'einen', 'eine', 'einem'], correctIndex: 0, explanationAr: 'كلمة Buch محايدة (das) وفي حالة النصب (Akkusativ) تأخذ ein.' },
  { id: 'q3', type: 'grammar', question: 'Wir warten ___ den Bus.', options: ['auf', 'für', 'an', 'über'], correctIndex: 0, explanationAr: 'الفعل warten يأخذ حرف الجر auf.' },
  { id: 'q4', type: 'grammar', question: '___ du morgen Zeit?', options: ['Hast', 'Bist', 'Wirst', 'Kannst'], correctIndex: 0, explanationAr: 'للسؤال عن الوقت نستخدم فعل الملكية haben.' },
  { id: 'q5', type: 'grammar', question: 'Das ist der Mann, ___ Auto gestohlen wurde.', options: ['dessen', 'dem', 'den', 'der'], correctIndex: 0, explanationAr: 'نحتاج لضمير وصل في حالة المضاف إليه (Genitiv) وهو dessen.' },
  { id: 'q6', type: 'grammar', question: 'Ich freue mich ___ meinen Geburtstag nächste Woche.', options: ['auf', 'über', 'an', 'für'], correctIndex: 0, explanationAr: 'للمستقبل نستخدم freuen auf.' },
  { id: 'q7', type: 'grammar', question: 'Obwohl es regnet, ___ wir spazieren.', options: ['gehen', 'wir gehen', 'gingen', 'gegangen'], correctIndex: 0, explanationAr: 'بعد obwohl (جملة جانبية) يأتي الفعل في النهاية، ثم في الجملة الرئيسية نبدأ بالفعل.' },
  { id: 'q8', type: 'grammar', question: 'Könnten Sie mir bitte sagen, wie spät es ___?', options: ['ist', 'sei', 'wäre', 'war'], correctIndex: 0, explanationAr: 'في السؤال غير المباشر يأتي الفعل في نهاية الجملة.' },
  { id: 'q9', type: 'grammar', question: 'Sie hat gesagt, dass sie heute nicht ___ kann.', options: ['kommen', 'kommt', 'gekommen', 'kam'], correctIndex: 0, explanationAr: 'في الجملة الجانبية مع فعلين (مساعد وأساسي) يأتي الفعل المساعد في النهاية.' },
  { id: 'q10', type: 'grammar', question: 'Ich hätte dir geholfen, wenn ich Zeit ___.', options: ['gehabt hätte', 'habe', 'hätte gehabt', 'hatte'], correctIndex: 0, explanationAr: 'حالة Konjunktiv II في الماضي (الماضي التام الافتراضي).' },
  // Vocabulary
  { id: 'v1', type: 'vocabulary', question: 'ما هو المقابل الألماني لكلمة "موعد"؟', options: ['der Termin', 'die Zeit', 'der Platz', 'das Treffen'], correctIndex: 0, explanationAr: 'Termin تعني موعد رسمي أو طبي.' },
  { id: 'v2', type: 'vocabulary', question: 'ماذا تعني كلمة "Entscheidung"؟', options: ['قرار', 'اعتذار', 'تأخير', 'نجاح'], correctIndex: 0, explanationAr: 'die Entscheidung = القرار.' },
  { id: 'v3', type: 'vocabulary', question: 'عكس كلمة "teuer" هو:', options: ['billig', 'schnell', 'klein', 'schlecht'], correctIndex: 0, explanationAr: 'teuer (غالي) عكسها billig (رخيص).' },
  { id: 'v4', type: 'vocabulary', question: 'ما الأداة الصحيحة لكلمة "Mädchen"؟', options: ['das', 'die', 'der', 'den'], correctIndex: 0, explanationAr: 'جميع الكلمات التي تنتهي بـ chen تكون أداتها das.' },
  { id: 'v5', type: 'vocabulary', question: 'ماذا يسمى "المستشفى" بالألمانية؟', options: ['das Krankenhaus', 'die Apotheke', 'der Arzt', 'das Rathaus'], correctIndex: 0, explanationAr: 'Krankenhaus هو المستشفى.' },
  { id: 'v6', type: 'vocabulary', question: 'Er arbeitet als ___ in einem Restaurant.', options: ['Kellner', 'Arzt', 'Lehrer', 'Maler'], correctIndex: 0, explanationAr: 'Kellner تعني نادل.' },
  { id: 'v7', type: 'vocabulary', question: 'Ich habe starke ___ im Rücken.', options: ['Schmerzen', 'Krankheit', 'Fieber', 'Husten'], correctIndex: 0, explanationAr: 'Schmerzen تعني آلام.' },
  { id: 'v8', type: 'vocabulary', question: 'Die Miete für die ___ ist sehr hoch.', options: ['Wohnung', 'Auto', 'Arbeit', 'Zeit'], correctIndex: 0, explanationAr: 'Wohnung تعني شقة، وMiete هي الإيجار.' },
  { id: 'v9', type: 'vocabulary', question: 'Wir müssen die Umwelt ___.', options: ['schützen', 'zerstören', 'kaufen', 'vergessen'], correctIndex: 0, explanationAr: 'schützen تعني حماية.' },
  { id: 'v10', type: 'vocabulary', question: 'Ich möchte ein Konto bei der Bank ___.', options: ['eröffnen', 'schließen', 'bezahlen', 'arbeiten'], correctIndex: 0, explanationAr: 'eröffnen تعني فتح (حساب بنكي).' },
  // Situations
  { id: 's1', type: 'situation', question: 'ماذا تقول عندما تريد أن تتمنى لشخص عطلة نهاية أسبوع سعيدة؟', options: ['Schönes Wochenende!', 'Gute Reise!', 'Herzlichen Glückwunsch!', 'Gute Besserung!'], correctIndex: 0, explanationAr: 'نقول Schönes Wochenende لتمني عطلة سعيدة.' },
  { id: 's2', type: 'situation', question: 'كيف تعتذر لتأخرك عن موعد العمل؟', options: ['Entschuldigen Sie meine Verspätung.', 'Das macht nichts.', 'Kein Problem.', 'Vielen Dank.'], correctIndex: 0, explanationAr: 'هذه هي الجملة الرسمية للاعتذار عن التأخير.' },
  { id: 's3', type: 'situation', question: 'شخص عطس (يعطس) أمامك، ماذا تقول له؟', options: ['Gesundheit!', 'Prost!', 'Guten Appetit!', 'Mahlzeit!'], correctIndex: 0, explanationAr: 'Gesundheit (صحة) تُقال عند العطس.' },
  { id: 's4', type: 'situation', question: 'تريد أن تطلب الفاتورة في المطعم. ماذا تقول؟', options: ['Zahlen, bitte!', 'Ich möchte essen.', 'Die Karte, bitte.', 'Wo ist die Toilette?'], correctIndex: 0, explanationAr: 'Zahlen, bitte أو Die Rechnung, bitte.' },
  { id: 's5', type: 'situation', question: 'صديقك مريض، ماذا تقول له؟', options: ['Gute Besserung!', 'Viel Glück!', 'Schöne Ferien!', 'Prost!'], correctIndex: 0, explanationAr: 'Gute Besserung تعني تمنياتي بالشفاء العاجل.' },
  { id: 's6', type: 'situation', question: 'في الباص وتريد من شخص أن يسمح لك بالمرور. ماذا تقول؟', options: ['Darf ich mal vorbei, bitte?', 'Setzen Sie sich!', 'Halt an!', 'Wo bin ich?'], correctIndex: 0, explanationAr: 'هذا طلب مهذب للمرور.' },
  { id: 's7', type: 'situation', question: 'لم تفهم ما قاله الشخص لك. ماذا تقول؟', options: ['Wie bitte?', 'Was machst du?', 'Natürlich!', 'Genau.'], correctIndex: 0, explanationAr: 'Wie bitte? تستخدم عند عدم سماع أو فهم ما قيل لطلب الإعادة.' },
  { id: 's8', type: 'situation', question: 'تريد شراء تذكرة قطار إلى برلين. ماذا تقول؟', options: ['Eine Fahrkarte nach Berlin, bitte.', 'Ich fliege nach Berlin.', 'Wo ist Berlin?', 'Ein Ticket ins Kino, bitte.'], correctIndex: 0, explanationAr: 'طلب تذكرة سفر لبرلين.' },
  { id: 's9', type: 'situation', question: 'شخص يشكرك قائلاً "Vielen Dank". ماذا ترد؟', options: ['Gerne! / Bitte sehr!', 'Entschuldigung!', 'Keine Ahnung.', 'Macht nichts.'], correctIndex: 0, explanationAr: 'Gerne أو Bitte أو Nichts zu danken هي الردود المعتادة للشكر.' },
  { id: 's10', type: 'situation', question: 'أنت في مقابلة عمل ويسألك المدير: "Warum möchten Sie bei uns arbeiten?". ماذا يقصد؟', options: ['لماذا تريد العمل لدينا؟', 'أين عملت سابقاً؟', 'متى يمكنك البدء؟', 'كم الراتب الذي تريده؟'], correctIndex: 0, explanationAr: 'سؤال عن سبب الرغبة بالعمل في هذه الشركة.' }
];

// Seeded random number generator
function xmur3(str: string) {
    let h = 1779033703 ^ str.length;
    for(let i = 0; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
    } return function() {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

function sfc32(a: number, b: number, c: number, d: number) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
      let t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}

export function getDailyChallengeQuestions(): DailyQuestion[] {
  // Use today's date string as seed
  const dateStr = new Date().toISOString().split('T')[0];
  const seed = xmur3(dateStr);
  const rand = sfc32(seed(), seed(), seed(), seed());

  // Copy the pool
  const pool = [...dailyQuestionPool];
  
  // Shuffle using Fisher-Yates with seeded random
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  
  // To ensure variety, we could filter by type or just pick the top 5
  // For simplicity, just pick the top 5 after shuffle.
  return pool.slice(0, 5);
}
