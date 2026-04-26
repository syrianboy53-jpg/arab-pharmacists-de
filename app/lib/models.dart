// Data models for the app. Plain immutable Dart classes parsed from JSON.

class Category {
  final String id;
  final String en;
  final String de;
  final String ar;

  const Category({
    required this.id,
    required this.en,
    required this.de,
    required this.ar,
  });

  factory Category.fromJson(Map<String, dynamic> j) => Category(
        id: j['id'] as String,
        en: j['en'] as String,
        de: j['de'] as String,
        ar: j['ar'] as String,
      );
}

class Term {
  final String id;
  final String category;
  final String en;
  final String de;
  final String ar;
  final String? definitionEn;
  final String? definitionDe;
  final String? definitionAr;
  final String? exampleDe;

  const Term({
    required this.id,
    required this.category,
    required this.en,
    required this.de,
    required this.ar,
    this.definitionEn,
    this.definitionDe,
    this.definitionAr,
    this.exampleDe,
  });

  factory Term.fromJson(Map<String, dynamic> j) => Term(
        id: j['id'] as String,
        category: j['category'] as String,
        en: j['en'] as String,
        de: j['de'] as String,
        ar: j['ar'] as String,
        definitionEn: j['definition_en'] as String?,
        definitionDe: j['definition_de'] as String?,
        definitionAr: j['definition_ar'] as String?,
        exampleDe: j['example_de'] as String?,
      );

  // True if any of the multilingual fields contains [q] (case-insensitive).
  bool matches(String q) {
    final n = q.trim().toLowerCase();
    if (n.isEmpty) return true;
    return en.toLowerCase().contains(n) ||
        de.toLowerCase().contains(n) ||
        ar.contains(q.trim()) ||
        (definitionEn?.toLowerCase().contains(n) ?? false) ||
        (definitionDe?.toLowerCase().contains(n) ?? false) ||
        (definitionAr?.contains(q.trim()) ?? false);
  }
}

class Drug {
  final String id;
  final String tradeName;
  final String activeIngredient;
  final String? drugClass;
  final String? indicationsDe;
  final String? indicationsAr;
  final String? dosageAdultDe;
  final bool rx;
  final String? warningsDe;

  const Drug({
    required this.id,
    required this.tradeName,
    required this.activeIngredient,
    this.drugClass,
    this.indicationsDe,
    this.indicationsAr,
    this.dosageAdultDe,
    required this.rx,
    this.warningsDe,
  });

  factory Drug.fromJson(Map<String, dynamic> j) => Drug(
        id: j['id'] as String,
        tradeName: j['trade_name'] as String,
        activeIngredient: j['active_ingredient'] as String,
        drugClass: j['drug_class'] as String?,
        indicationsDe: j['indications_de'] as String?,
        indicationsAr: j['indications_ar'] as String?,
        dosageAdultDe: j['dosage_adult_de'] as String?,
        rx: (j['rx'] as bool?) ?? false,
        warningsDe: j['warnings_de'] as String?,
      );

  bool matches(String q) {
    final n = q.trim().toLowerCase();
    if (n.isEmpty) return true;
    return tradeName.toLowerCase().contains(n) ||
        activeIngredient.toLowerCase().contains(n) ||
        (drugClass?.toLowerCase().contains(n) ?? false);
  }
}

class DialogueTurn {
  final String speaker; // 'patient' | 'pharmacist'
  final String de;
  final String en;
  final String ar;

  const DialogueTurn({
    required this.speaker,
    required this.de,
    required this.en,
    required this.ar,
  });

  factory DialogueTurn.fromJson(Map<String, dynamic> j) => DialogueTurn(
        speaker: j['speaker'] as String,
        de: j['de'] as String,
        en: j['en'] as String,
        ar: j['ar'] as String,
      );
}

class Dialogue {
  final String id;
  final String scenarioEn;
  final String scenarioDe;
  final String scenarioAr;
  final List<String> tags;
  final List<DialogueTurn> turns;

  const Dialogue({
    required this.id,
    required this.scenarioEn,
    required this.scenarioDe,
    required this.scenarioAr,
    required this.tags,
    required this.turns,
  });

  factory Dialogue.fromJson(Map<String, dynamic> j) => Dialogue(
        id: j['id'] as String,
        scenarioEn: j['scenario_en'] as String,
        scenarioDe: j['scenario_de'] as String,
        scenarioAr: j['scenario_ar'] as String,
        tags: (j['tags'] as List?)?.cast<String>() ?? const [],
        turns: ((j['turns'] as List?) ?? const [])
            .cast<Map<String, dynamic>>()
            .map(DialogueTurn.fromJson)
            .toList(),
      );
}

class Quiz {
  final String id;
  final String category;
  final String questionDe;
  final String questionAr;
  final List<String> options;
  final int answerIndex;
  final String? explanationDe;

  const Quiz({
    required this.id,
    required this.category,
    required this.questionDe,
    required this.questionAr,
    required this.options,
    required this.answerIndex,
    this.explanationDe,
  });

  factory Quiz.fromJson(Map<String, dynamic> j) => Quiz(
        id: j['id'] as String,
        category: j['category'] as String,
        questionDe: j['question_de'] as String,
        questionAr: j['question_ar'] as String,
        options: ((j['options'] as List?) ?? const []).cast<String>(),
        answerIndex: j['answer_index'] as int,
        explanationDe: j['explanation_de'] as String?,
      );
}
