export interface StoryParagraph { de: string; ar: string }
export interface StoryWord { word: string; meaning: string; example: string }
export interface StoryQuestion { question: string; options: string[]; correct: number; explanation: string }
export interface Story {
  id: string; title: string; titleDe: string; topic: string; emoji: string
  level: 'A2' | 'B1' | 'B2'; estimatedMinutes: number; xpReward: number
  paragraphs: StoryParagraph[]; vocabulary: StoryWord[]; questions: StoryQuestion[]
}

export const stories: Story[] = [
  {
    id: 'shopping', title: 'يوم في السوق', titleDe: 'Ein Tag auf dem Markt',
    topic: 'التسوق', emoji: '🛒', level: 'B1', estimatedMinutes: 8, xpReward: 80,
    paragraphs: [
      { de: 'Jeden Samstag geht Maria auf den Wochenmarkt in der Stadtmitte. Der Markt ist sehr groß und bunt. Es gibt viele Stände mit frischem Gemüse, Obst, Fleisch und Blumen.', ar: 'كل يوم سبت تذهب ماريا إلى السوق الأسبوعي في وسط المدينة. السوق كبير جداً وملوّن. هناك أكشاك كثيرة بالخضروات الطازجة والفواكه واللحوم والزهور.' },
      { de: 'Heute möchte Maria Tomaten, Kartoffeln und frische Kräuter kaufen. Sie fragt den Verkäufer: „Was kostet ein Kilo Tomaten?" Der Verkäufer antwortet: „Drei Euro das Kilo, heute im Angebot!"', ar: 'اليوم تريد ماريا شراء طماطم وبطاطا وأعشاب طازجة. تسأل البائع: "كم يكلف كيلو الطماطم؟" يجيب البائع: "ثلاثة يورو للكيلو، في العرض اليوم!"' },
      { de: 'Maria kauft zwei Kilo Tomaten und ein Kilo Kartoffeln. Sie bezahlt mit einem Zehn-Euro-Schein. Der Verkäufer gibt ihr das Wechselgeld zurück: „Hier sind vier Euro zurück."', ar: 'تشتري ماريا كيلوين من الطماطم وكيلو من البطاطا. تدفع بورقة عشرة يورو. يعيد لها البائع الباقي: "هذه أربعة يورو باقيها."' },
      { de: 'Am Ende des Marktbesuchs kauft Maria noch einen frischen Blumenstrauß für ihre Mutter. Sie ist sehr zufrieden mit ihrem Einkauf und kommt nächste Woche wieder.', ar: 'في نهاية زيارة السوق تشتري ماريا أيضاً باقة زهور طازجة لأمها. هي راضية جداً عن مشترياتها وستعود الأسبوع القادم.' },
    ],
    vocabulary: [
      { word: 'der Wochenmarkt', meaning: 'السوق الأسبوعي', example: 'Der Wochenmarkt findet jeden Samstag statt.' },
      { word: 'der Stand (die Stände)', meaning: 'الكشك/البسطة', example: 'An diesem Stand gibt es frisches Gemüse.' },
      { word: 'der Verkäufer', meaning: 'البائع', example: 'Der Verkäufer wiegt das Obst.' },
      { word: 'das Angebot', meaning: 'العرض/الخصم', example: 'Heute sind Äpfel im Angebot.' },
      { word: 'das Wechselgeld', meaning: 'الباقي من المال', example: 'Haben Sie Wechselgeld für 50 Euro?' },
      { word: 'der Blumenstrauß', meaning: 'باقة الزهور', example: 'Er kaufte einen schönen Blumenstrauß.' },
      { word: 'zufrieden', meaning: 'راضٍ/مسرور', example: 'Die Kunden sind zufrieden mit dem Service.' },
    ],
    questions: [
      { question: 'متى تذهب ماريا إلى السوق؟', options: ['كل يوم جمعة', 'كل يوم سبت', 'كل يوم أحد', 'مرة في الشهر'], correct: 1, explanation: 'الجملة الأولى تقول: "Jeden Samstag" = كل سبت' },
      { question: 'كم كلّف كيلو الطماطم؟', options: ['يورو واحد', 'يوروان', 'ثلاثة يورو', 'أربعة يورو'], correct: 2, explanation: 'قال البائع: "Drei Euro das Kilo" = ثلاثة يورو للكيلو' },
      { question: 'كم دفعت ماريا واسترجعت؟', options: ['دفعت 5، استرجعت 1', 'دفعت 10، استرجعت 4', 'دفعت 20، استرجعت 14', 'دفعت 10، استرجعت 6'], correct: 1, explanation: 'دفعت 10 يورو واسترجعت 4 يورو، أي أنها دفعت 6 يورو فعلياً' },
      { question: 'لمن اشترت ماريا الزهور؟', options: ['لنفسها', 'لصديقتها', 'لأمها', 'لجارتها'], correct: 2, explanation: '"für ihre Mutter" = لأمها' },
    ],
  },
  {
    id: 'doctor', title: 'عند الطبيب', titleDe: 'Beim Arzt',
    topic: 'الطب والصحة', emoji: '🏥', level: 'B1', estimatedMinutes: 7, xpReward: 80,
    paragraphs: [
      { de: 'Ahmad fühlt sich seit drei Tagen nicht wohl. Er hat Kopfschmerzen, Halsschmerzen und leichtes Fieber. Seine Frau rät ihm, zum Arzt zu gehen.', ar: 'أحمد لا يشعر بخير منذ ثلاثة أيام. لديه صداع وألم في الحلق وحرارة خفيفة. زوجته تنصحه بالذهاب إلى الطبيب.' },
      { de: 'Er ruft in der Arztpraxis an und macht einen Termin für den nächsten Morgen. Die Sprechstundenhilfe sagt: „Der Arzt hat um 9 Uhr eine freie Zeit."', ar: 'يتصل بعيادة الطبيب ويحجز موعداً للصباح التالي. تقول المساعدة: "الطبيب لديه وقت فراغ الساعة التاسعة."' },
      { de: 'Am nächsten Tag geht Ahmad in die Praxis. Er füllt ein Formular aus und wartet im Wartezimmer. Nach zwanzig Minuten ruft die Arzthelferin seinen Namen.', ar: 'في اليوم التالي يذهب أحمد إلى العيادة. يملأ استمارة وينتظر في غرفة الانتظار. بعد عشرين دقيقة تنادي المساعدة اسمه.' },
      { de: 'Der Arzt untersucht Ahmad und sagt: „Sie haben eine Erkältung. Ich verschreibe Ihnen ein Antibiotikum und empfehle Ihnen, viel zu trinken und sich auszuruhen."', ar: 'يفحص الطبيب أحمد ويقول: "لديك نزلة برد. سأصف لك مضاداً حيوياً وأوصيك بشرب الكثير والراحة."' },
      { de: 'Ahmad geht zur Apotheke und holt das Medikament ab. Nach drei Tagen geht es ihm viel besser. Er dankt seinem Arzt.', ar: 'يذهب أحمد إلى الصيدلية ويحضر الدواء. بعد ثلاثة أيام يشعر بتحسن كبير. يشكر طبيبه.' },
    ],
    vocabulary: [
      { word: 'die Arztpraxis', meaning: 'عيادة الطبيب', example: 'Die Arztpraxis öffnet um 8 Uhr.' },
      { word: 'der Termin', meaning: 'الموعد', example: 'Ich brauche einen Termin beim Zahnarzt.' },
      { word: 'das Wartezimmer', meaning: 'غرفة الانتظار', example: 'Im Wartezimmer sitzen viele Patienten.' },
      { word: 'untersuchen', meaning: 'يفحص', example: 'Der Arzt untersucht den Patienten.' },
      { word: 'verschreiben', meaning: 'يصف/يوصف دواء', example: 'Der Arzt verschreibt mir ein Rezept.' },
      { word: 'das Antibiotikum', meaning: 'المضاد الحيوي', example: 'Antibiotika helfen gegen Bakterien.' },
      { word: 'sich ausruhen', meaning: 'يرتاح', example: 'Nach der Arbeit muss ich mich ausruhen.' },
    ],
    questions: [
      { question: 'ما أعراض أحمد؟', options: ['ألم في البطن فقط', 'صداع وألم الحلق وحرارة', 'ألم في الظهر', 'ضغط مرتفع'], correct: 1, explanation: 'النص ذكر: Kopfschmerzen (صداع)، Halsschmerzen (ألم الحلق)، Fieber (حرارة)' },
      { question: 'متى كان موعد أحمد عند الطبيب؟', options: ['الساعة 8', 'الساعة 9', 'الساعة 10', 'الساعة 11'], correct: 1, explanation: '"um 9 Uhr" = الساعة التاسعة' },
      { question: 'كم انتظر أحمد في العيادة؟', options: ['عشر دقائق', 'ربع ساعة', 'عشرين دقيقة', 'نصف ساعة'], correct: 2, explanation: '"Nach zwanzig Minuten" = بعد عشرين دقيقة' },
      { question: 'ما تشخيص الطبيب؟', options: ['إنفلونزا', 'التهاب رئوي', 'نزلة برد', 'حساسية'], correct: 2, explanation: '"Sie haben eine Erkältung" = لديك نزلة برد' },
    ],
  },
  {
    id: 'bank', title: 'في البنك', titleDe: 'Bei der Bank',
    topic: 'المال والبنك', emoji: '🏦', level: 'B1', estimatedMinutes: 7, xpReward: 80,
    paragraphs: [
      { de: 'Fatima ist neu in Deutschland und muss ein Bankkonto eröffnen. Sie geht zur nächsten Bank in ihrer Stadt. Am Eingang fragt sie den Sicherheitsmann nach dem Weg zum Kundendienst.', ar: 'فاطمة جديدة في ألمانيا وتحتاج لفتح حساب بنكي. تذهب إلى أقرب بنك في مدينتها. عند المدخل تسأل رجل الأمن عن طريق خدمة العملاء.' },
      { de: 'Die Bankangestellte begrüßt sie freundlich: „Guten Tag, womit kann ich Ihnen helfen?" Fatima erklärt, dass sie ein Girokonto eröffnen möchte.', ar: 'ترحب بها موظفة البنك بودية: "مساء الخير، كيف أستطيع مساعدتك؟" تشرح فاطمة أنها تريد فتح حساب جارٍ.' },
      { de: 'Die Angestellte bittet Fatima um ihren Reisepass, ihre Meldebestätigung und einen Einkommensnachweis. Fatima hat alle Dokumente dabei.', ar: 'تطلب منها الموظفة جواز سفرها وتأكيد التسجيل وإثبات الدخل. فاطمة معها جميع الوثائق.' },
      { de: 'Nach zwanzig Minuten ist alles fertig. Die Angestellte sagt: „Ihre Karte kommt in fünf bis sieben Werktagen per Post." Fatima freut sich und bedankt sich herzlich.', ar: 'بعد عشرين دقيقة ينتهي كل شيء. تقول الموظفة: "بطاقتك ستصل بالبريد خلال خمسة إلى سبعة أيام عمل." تفرح فاطمة وتشكر بحرارة.' },
    ],
    vocabulary: [
      { word: 'das Bankkonto eröffnen', meaning: 'فتح حساب بنكي', example: 'Ich möchte ein Konto eröffnen.' },
      { word: 'der Kundendienst', meaning: 'خدمة العملاء', example: 'Der Kundendienst ist im zweiten Stock.' },
      { word: 'das Girokonto', meaning: 'الحساب الجاري', example: 'Ein Girokonto braucht man für die Miete.' },
      { word: 'die Meldebestätigung', meaning: 'تأكيد التسجيل', example: 'Die Meldebestätigung bekommt man im Einwohnermeldeamt.' },
      { word: 'der Einkommensnachweis', meaning: 'إثبات الدخل', example: 'Der Vermieter braucht einen Einkommensnachweis.' },
      { word: 'der Werktag', meaning: 'يوم العمل', example: 'Montag bis Freitag sind Werktage.' },
    ],
    questions: [
      { question: 'لماذا ذهبت فاطمة إلى البنك؟', options: ['لسحب مال', 'لإيداع مال', 'لفتح حساب', 'لدفع فاتورة'], correct: 2, explanation: 'فاطمة أرادت "ein Girokonto eröffnen" = فتح حساب جارٍ' },
      { question: 'ما الوثائق التي طلبتها الموظفة؟', options: ['فقط الجواز', 'الجواز وشهادة العمل', 'الجواز والتسجيل وإثبات الدخل', 'البطاقة الصحية فقط'], correct: 2, explanation: 'طُلب: Reisepass + Meldebestätigung + Einkommensnachweis' },
      { question: 'متى ستصل البطاقة؟', options: ['فوراً', 'غداً', 'خلال 5-7 أيام عمل', 'بعد شهر'], correct: 2, explanation: '"in fünf bis sieben Werktagen" = خلال خمسة إلى سبعة أيام عمل' },
    ],
  },
  {
    id: 'train', title: 'رحلة بالقطار', titleDe: 'Eine Reise mit dem Zug',
    topic: 'السفر والمواصلات', emoji: '🚆', level: 'B1', estimatedMinutes: 9, xpReward: 90,
    paragraphs: [
      { de: 'Omar will nächste Woche seine Schwester in München besuchen. Er kauft online ein Bahnticket. Eine Fahrt von Hamburg nach München kostet mit dem Sparticket 29 Euro.', ar: 'عمر يريد زيارة أخته في ميونيخ الأسبوع القادم. يشتري تذكرة قطار أونلاين. الرحلة من هامبورغ إلى ميونيخ بالتذكرة المخفضة تكلف 29 يورو.' },
      { de: 'Am Reisetag kommt Omar mit großem Koffer zum Hauptbahnhof. Er sucht auf der Anzeigetafel seinen Zug. Der ICE nach München fährt von Gleis 7 um 10:32 Uhr ab.', ar: 'في يوم السفر يصل عمر بحقيبة كبيرة إلى المحطة الرئيسية. يبحث عن قطاره على لوحة المعلومات. القطار السريع إلى ميونيخ يغادر من الرصيف 7 الساعة 10:32.' },
      { de: 'Im Zug findet Omar seinen Sitzplatz im Großraumwagen. Neben ihm sitzt eine ältere Dame. Sie führen ein nettes Gespräch über das Wetter und die schönen Landschaften.', ar: 'في القطار يجد عمر مقعده في عربة المقاعد المفتوحة. بجانبه تجلس سيدة عجوز. يتحدثان بودية عن الطقس والمناظر الجميلة.' },
      { de: 'Nach 6 Stunden und 10 Minuten erreicht der Zug den Münchner Hauptbahnhof. Omars Schwester wartet schon vor dem Ausgang auf ihn. Sie freut sich sehr, ihn zu sehen.', ar: 'بعد 6 ساعات و10 دقائق يصل القطار إلى المحطة الرئيسية في ميونيخ. أخت عمر تنتظره بالفعل أمام المخرج. هي سعيدة جداً برؤيته.' },
    ],
    vocabulary: [
      { word: 'das Sparticket', meaning: 'التذكرة المخفضة', example: 'Mit dem Sparticket fährt man günstiger.' },
      { word: 'der Hauptbahnhof', meaning: 'المحطة الرئيسية', example: 'Der Zug fährt vom Hauptbahnhof ab.' },
      { word: 'die Anzeigetafel', meaning: 'لوحة المعلومات', example: 'Auf der Anzeigetafel sehe ich die Abfahrtszeit.' },
      { word: 'das Gleis', meaning: 'الرصيف/المسار', example: 'Der Zug fährt von Gleis 3 ab.' },
      { word: 'der Großraumwagen', meaning: 'عربة المقاعد المفتوحة', example: 'Im Großraumwagen gibt es viele Sitzplätze.' },
      { word: 'die Landschaft', meaning: 'المنظر الطبيعي', example: 'Deutschland hat viele schöne Landschaften.' },
    ],
    questions: [
      { question: 'إلى أين يسافر عمر؟', options: ['برلين', 'فرانكفورت', 'ميونيخ', 'هامبورغ'], correct: 2, explanation: 'يزور أخته في "München" = ميونيخ' },
      { question: 'من أي رصيف يغادر القطار؟', options: ['رصيف 3', 'رصيف 5', 'رصيف 7', 'رصيف 9'], correct: 2, explanation: '"von Gleis 7" = من الرصيف 7' },
      { question: 'كم استغرقت الرحلة؟', options: ['4 ساعات', '5 ساعات', 'ست ساعات وعشر دقائق', 'سبع ساعات'], correct: 2, explanation: '"Nach 6 Stunden und 10 Minuten" = بعد 6 ساعات و10 دقائق' },
    ],
  },
  {
    id: 'apartment', title: 'البحث عن شقة', titleDe: 'Eine Wohnung suchen',
    topic: 'السكن والمعيشة', emoji: '🏠', level: 'B1', estimatedMinutes: 8, xpReward: 85,
    paragraphs: [
      { de: 'Leila sucht eine neue Wohnung in Köln. Sie liest die Wohnungsanzeigen in der Zeitung und im Internet. Eine Wohnung mit zwei Zimmern kostet dort durchschnittlich 900 Euro im Monat.', ar: 'ليلى تبحث عن شقة جديدة في كولونيا. تقرأ إعلانات الشقق في الجريدة والإنترنت. شقة بغرفتين تكلف هناك في المتوسط 900 يورو شهرياً.' },
      { de: 'Sie findet eine interessante Anzeige: „2-Zimmer-Wohnung, 65 qm, ruhige Lage, 850 Euro warm." Sie ruft sofort beim Vermieter an und vereinbart einen Besichtigungstermin.', ar: 'تجد إعلاناً مثيراً للاهتمام: "شقة بغرفتين، 65 متراً، موقع هادئ، 850 يورو شاملاً." تتصل فوراً بالمالك وتحجز موعد المعاينة.' },
      { de: 'Bei der Besichtigung ist die Wohnung sehr schön. Es gibt einen kleinen Balkon und die Nachbarschaft ist ruhig. Leila fragt: „Sind Haustiere erlaubt?" Der Vermieter antwortet: „Kleine Tiere sind kein Problem."', ar: 'عند المعاينة الشقة جميلة جداً. هناك شرفة صغيرة والحي هادئ. تسأل ليلى: "هل الحيوانات الأليفة مسموحة؟" يجيب المالك: "الحيوانات الصغيرة لا مشكلة."' },
      { de: 'Leila entscheidet sich für die Wohnung. Der Vermieter braucht eine Mietkaution von zwei Monatsmieten und eine Schufa-Auskunft. Leila freut sich auf ihr neues Zuhause.', ar: 'تقرر ليلى الشقة. المالك يحتاج ضماناً بقيمة إيجار شهرين وتقرير شوفا. ليلى تتطلع لمنزلها الجديد.' },
    ],
    vocabulary: [
      { word: 'die Wohnungsanzeige', meaning: 'إعلان الشقة', example: 'Ich lese die Wohnungsanzeigen in der Zeitung.' },
      { word: 'der Vermieter', meaning: 'المالك/المؤجِّر', example: 'Der Vermieter wohnt im Erdgeschoss.' },
      { word: 'die Besichtigung', meaning: 'المعاينة', example: 'Kann ich einen Besichtigungstermin machen?' },
      { word: 'das Haustier', meaning: 'الحيوان الأليف', example: 'Mein Haustier ist ein kleiner Hund.' },
      { word: 'die Mietkaution', meaning: 'ضمان الإيجار', example: 'Die Mietkaution beträgt zwei Monatsmieten.' },
      { word: 'die Schufa-Auskunft', meaning: 'تقرير الجدارة الائتمانية', example: 'Für eine Wohnung braucht man eine Schufa-Auskunft.' },
    ],
    questions: [
      { question: 'في أي مدينة تبحث ليلى عن شقة؟', options: ['برلين', 'ميونيخ', 'كولونيا', 'هامبورغ'], correct: 2, explanation: '"in Köln" = في كولونيا' },
      { question: 'ما مساحة الشقة التي وجدتها؟', options: ['45 متراً', '55 متراً', '65 متراً', '75 متراً'], correct: 2, explanation: '"65 qm" = 65 متراً مربعاً' },
      { question: 'عمَّ سألت ليلى المالك؟', options: ['عن مواعيد الصيانة', 'عن الجيران', 'عن الحيوانات الأليفة', 'عن مواقف السيارات'], correct: 2, explanation: 'سألت عن الحيوانات الأليفة: "Sind Haustiere erlaubt?"' },
    ],
  },
]
