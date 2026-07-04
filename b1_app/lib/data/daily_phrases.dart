/// بيانات العبارات اليومية الألمانية - 60 عبارة مستوى B1

class DailyPhrase {
  final String german;
  final String arabic;
  final String example;
  final String category;
  final String emoji;
  const DailyPhrase({required this.german, required this.arabic, required this.example, required this.category, required this.emoji});
}

class PhraseCategory {
  final String name;
  final String emoji;
  final int color;
  final List<DailyPhrase> phrases;
  const PhraseCategory({required this.name, required this.emoji, required this.color, required this.phrases});
}

final List<PhraseCategory> phraseCategories = [
  PhraseCategory(
    name: 'عبارات يومية',
    emoji: '☀️',
    color: 0xFF00B894,
    phrases: [
      DailyPhrase(german: 'Es tut mir leid, das war nicht meine Absicht.', arabic: 'أنا آسف، لم تكن هذه نيتي.', example: 'Er sagte: "Es tut mir leid, das war nicht meine Absicht."', category: 'عبارات يومية', emoji: '😔'),
      DailyPhrase(german: 'Könnten Sie mir bitte helfen?', arabic: 'هل يمكنك مساعدتي من فضلك؟', example: 'Könnten Sie mir bitte helfen, den Weg zu finden?', category: 'عبارات يومية', emoji: '🙏'),
      DailyPhrase(german: 'Ich bin auf dem Weg.', arabic: 'أنا في الطريق.', example: 'Warte bitte, ich bin schon auf dem Weg.', category: 'عبارات يومية', emoji: '🚶'),
      DailyPhrase(german: 'Das macht nichts.', arabic: 'لا بأس / لا يهم.', example: '"Entschuldigung!" – "Das macht nichts."', category: 'عبارات يومية', emoji: '👌'),
      DailyPhrase(german: 'Ich habe leider keine Zeit.', arabic: 'للأسف ليس لدي وقت.', example: 'Ich habe leider keine Zeit für das Treffen.', category: 'عبارات يومية', emoji: '⏰'),
      DailyPhrase(german: 'Es hat mich gefreut, Sie kennenzulernen.', arabic: 'سعدت بمعرفتك.', example: 'Es hat mich gefreut, Sie kennenzulernen!', category: 'عبارات يومية', emoji: '🤝'),
      DailyPhrase(german: 'Ich bin total müde.', arabic: 'أنا متعب جداً.', example: 'Nach der Arbeit bin ich total müde.', category: 'عبارات يومية', emoji: '😴'),
      DailyPhrase(german: 'Wie geht es Ihnen?', arabic: 'كيف حالك؟ (رسمي)', example: 'Guten Morgen! Wie geht es Ihnen heute?', category: 'عبارات يومية', emoji: '💬'),
      DailyPhrase(german: 'Ich freue mich darauf!', arabic: 'أتطلع لذلك!', example: 'Die Party ist am Samstag – ich freue mich darauf!', category: 'عبارات يومية', emoji: '🎉'),
      DailyPhrase(german: 'Das stimmt.', arabic: 'هذا صحيح.', example: '"Berlin ist die Hauptstadt." – "Das stimmt."', category: 'عبارات يومية', emoji: '✅'),
    ],
  ),
  PhraseCategory(
    name: 'في العمل',
    emoji: '💼',
    color: 0xFF0984E3,
    phrases: [
      DailyPhrase(german: 'Ich hätte gerne einen Termin vereinbart.', arabic: 'أود ترتيب موعد.', example: 'Ich hätte gerne einen Termin für nächste Woche.', category: 'في العمل', emoji: '📅'),
      DailyPhrase(german: 'Können wir das auf morgen verschieben?', arabic: 'هل يمكننا تأجيل ذلك للغد؟', example: 'Können wir das Meeting auf morgen verschieben?', category: 'في العمل', emoji: '📆'),
      DailyPhrase(german: 'Ich bin für dieses Projekt verantwortlich.', arabic: 'أنا مسؤول عن هذا المشروع.', example: 'Seit Januar bin ich für dieses Projekt verantwortlich.', category: 'في العمل', emoji: '📊'),
      DailyPhrase(german: 'Darf ich eine Frage stellen?', arabic: 'هل يمكنني طرح سؤال؟', example: 'Entschuldigung, darf ich kurz eine Frage stellen?', category: 'في العمل', emoji: '❓'),
      DailyPhrase(german: 'Ich mache gerade eine Ausbildung.', arabic: 'أقوم بتدريب مهني حالياً.', example: 'Ich mache eine Ausbildung als Elektriker.', category: 'في العمل', emoji: '🔧'),
      DailyPhrase(german: 'Wann ist Feierabend?', arabic: 'متى ينتهي الدوام؟', example: 'Wann ist heute eigentlich Feierabend?', category: 'في العمل', emoji: '🕐'),
      DailyPhrase(german: 'Ich brauche eine Krankmeldung.', arabic: 'أحتاج إجازة مرضية.', example: 'Ich bin krank und brauche eine Krankmeldung.', category: 'في العمل', emoji: '🤒'),
      DailyPhrase(german: 'Das Gehalt wird am Monatsende überwiesen.', arabic: 'يتم تحويل الراتب نهاية الشهر.', example: 'Das Gehalt wird am letzten Tag überwiesen.', category: 'في العمل', emoji: '💰'),
      DailyPhrase(german: 'Ich möchte mich bewerben.', arabic: 'أريد التقدم بطلب توظيف.', example: 'Ich möchte mich für die Stelle bewerben.', category: 'في العمل', emoji: '📝'),
      DailyPhrase(german: 'Können Sie das bitte wiederholen?', arabic: 'هل يمكنك تكرار ذلك من فضلك؟', example: 'Können Sie das bitte noch einmal wiederholen?', category: 'في العمل', emoji: '🔄'),
    ],
  ),
  PhraseCategory(
    name: 'عند الطبيب',
    emoji: '🏥',
    color: 0xFFE17055,
    phrases: [
      DailyPhrase(german: 'Ich habe seit drei Tagen Kopfschmerzen.', arabic: 'لدي صداع منذ ثلاثة أيام.', example: 'Herr Doktor, ich habe seit drei Tagen Kopfschmerzen.', category: 'عند الطبيب', emoji: '🤕'),
      DailyPhrase(german: 'Ich brauche ein Rezept.', arabic: 'أحتاج وصفة طبية.', example: 'Können Sie mir ein Rezept ausstellen?', category: 'عند الطبيب', emoji: '💊'),
      DailyPhrase(german: 'Ich bin allergisch gegen Penicillin.', arabic: 'لدي حساسية من البنسلين.', example: 'Ich bin allergisch gegen Penicillin und Aspirin.', category: 'عند الطبيب', emoji: '⚠️'),
      DailyPhrase(german: 'Mir ist schwindelig.', arabic: 'أشعر بالدوار.', example: 'Wenn ich aufstehe, ist mir oft schwindelig.', category: 'عند الطبيب', emoji: '😵'),
      DailyPhrase(german: 'Ich muss mich krankschreiben lassen.', arabic: 'يجب أن آخذ إجازة مرضية.', example: 'Ich fühle mich nicht gut und muss mich krankschreiben.', category: 'عند الطبيب', emoji: '📋'),
      DailyPhrase(german: 'Die Versicherungskarte habe ich dabei.', arabic: 'بطاقة التأمين معي.', example: 'Hier, die Versicherungskarte habe ich dabei.', category: 'عند الطبيب', emoji: '💳'),
      DailyPhrase(german: 'Wie oft soll ich das Medikament nehmen?', arabic: 'كم مرة يجب أن آخذ الدواء؟', example: 'Wie oft soll ich das nehmen – dreimal am Tag?', category: 'عند الطبيب', emoji: '💉'),
      DailyPhrase(german: 'Ich habe Fieber und Halsschmerzen.', arabic: 'لدي حرارة وألم في الحلق.', example: 'Seit gestern habe ich Fieber und Halsschmerzen.', category: 'عند الطبيب', emoji: '🤒'),
      DailyPhrase(german: 'Wann bekomme ich die Ergebnisse?', arabic: 'متى أحصل على النتائج؟', example: 'Wann bekomme ich die Blutuntersuchungsergebnisse?', category: 'عند الطبيب', emoji: '🔬'),
      DailyPhrase(german: 'Ich brauche eine Überweisung zum Facharzt.', arabic: 'أحتاج تحويلة للأخصائي.', example: 'Können Sie mir eine Überweisung zum Augenarzt geben?', category: 'عند الطبيب', emoji: '👨‍⚕️'),
    ],
  ),
  PhraseCategory(
    name: 'التسوق',
    emoji: '🛒',
    color: 0xFFFDAA5E,
    phrases: [
      DailyPhrase(german: 'Was kostet das?', arabic: 'كم سعر هذا؟', example: 'Entschuldigung, was kostet dieses T-Shirt?', category: 'التسوق', emoji: '💶'),
      DailyPhrase(german: 'Gibt es das in einer anderen Größe?', arabic: 'هل يوجد بمقاس آخر؟', example: 'Die Hose ist zu klein. Gibt es eine andere Größe?', category: 'التسوق', emoji: '👕'),
      DailyPhrase(german: 'Kann ich mit Karte bezahlen?', arabic: 'هل يمكنني الدفع بالبطاقة؟', example: 'Ich habe kein Bargeld. Kann ich mit Karte bezahlen?', category: 'التسوق', emoji: '💳'),
      DailyPhrase(german: 'Ich möchte das umtauschen.', arabic: 'أريد استبدال هذا.', example: 'Das Gerät ist kaputt. Ich möchte es umtauschen.', category: 'التسوق', emoji: '🔄'),
      DailyPhrase(german: 'Haben Sie das auch in Rot?', arabic: 'هل لديكم باللون الأحمر؟', example: 'Dieses Kleid gefällt mir. Haben Sie es auch in Rot?', category: 'التسوق', emoji: '🔴'),
      DailyPhrase(german: 'Wo finde ich die Milchprodukte?', arabic: 'أين أجد منتجات الألبان؟', example: 'Wo finde ich die Milchprodukte im Supermarkt?', category: 'التسوق', emoji: '🥛'),
      DailyPhrase(german: 'Das ist mir zu teuer.', arabic: 'هذا غالي جداً بالنسبة لي.', example: '200 Euro? Das ist mir zu teuer.', category: 'التسوق', emoji: '💸'),
      DailyPhrase(german: 'Ich suche ein Geschenk.', arabic: 'أبحث عن هدية.', example: 'Ich suche ein schönes Geschenk für meine Mutter.', category: 'التسوق', emoji: '🎁'),
      DailyPhrase(german: 'Bis wann kann ich die Ware zurückgeben?', arabic: 'حتى متى يمكنني إرجاع البضاعة؟', example: 'Bis wann kann ich die Ware zurückgeben?', category: 'التسوق', emoji: '📦'),
      DailyPhrase(german: 'Haben Sie einen Kassenbon?', arabic: 'هل لديك الفاتورة؟', example: 'Für die Rückgabe brauche ich den Kassenbon.', category: 'التسوق', emoji: '🧾'),
    ],
  ),
  PhraseCategory(
    name: 'المشاعر والآراء',
    emoji: '💭',
    color: 0xFF6C5CE7,
    phrases: [
      DailyPhrase(german: 'Ich bin der Meinung, dass...', arabic: 'أنا من رأيي أن...', example: 'Ich bin der Meinung, dass Sport sehr wichtig ist.', category: 'المشاعر والآراء', emoji: '🗣️'),
      DailyPhrase(german: 'Das finde ich sehr interessant.', arabic: 'أجد ذلك مثيراً للاهتمام.', example: 'Ihr Vorschlag ist gut. Das finde ich interessant.', category: 'المشاعر والآراء', emoji: '🤩'),
      DailyPhrase(german: 'Ich stimme Ihnen völlig zu.', arabic: 'أوافقك الرأي تماماً.', example: 'Sie haben recht. Ich stimme Ihnen völlig zu.', category: 'المشاعر والآراء', emoji: '👍'),
      DailyPhrase(german: 'Das sehe ich anders.', arabic: 'أرى ذلك بشكل مختلف.', example: 'Tut mir leid, aber das sehe ich anders.', category: 'المشاعر والآراء', emoji: '🤷'),
      DailyPhrase(german: 'Ich bin enttäuscht.', arabic: 'أنا خائب الأمل.', example: 'Ich bin enttäuscht, weil ich nicht bestanden habe.', category: 'المشاعر والآراء', emoji: '😞'),
      DailyPhrase(german: 'Das macht mir Sorgen.', arabic: 'هذا يقلقني.', example: 'Die Situation macht mir große Sorgen.', category: 'المشاعر والآراء', emoji: '😟'),
      DailyPhrase(german: 'Ich bin stolz auf dich!', arabic: 'أنا فخور بك!', example: 'Du hast B1 bestanden! Ich bin stolz auf dich!', category: 'المشاعر والآراء', emoji: '🏆'),
      DailyPhrase(german: 'Einerseits... andererseits...', arabic: 'من ناحية... ومن ناحية أخرى...', example: 'Einerseits möchte ich studieren, andererseits arbeiten.', category: 'المشاعر والآراء', emoji: '⚖️'),
      DailyPhrase(german: 'Ich fühle mich hier wohl.', arabic: 'أشعر بالراحة هنا.', example: 'Deutschland ist schön. Ich fühle mich hier wohl.', category: 'المشاعر والآراء', emoji: '😊'),
      DailyPhrase(german: 'Das geht mich nichts an.', arabic: 'هذا لا يعنيني.', example: 'Was andere denken, das geht mich nichts an.', category: 'المشاعر والآراء', emoji: '🙅'),
    ],
  ),
];
