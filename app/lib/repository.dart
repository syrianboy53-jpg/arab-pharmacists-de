import 'dart:convert';

import 'package:flutter/services.dart' show rootBundle;

import 'models.dart';

// Loads bundled JSON datasets exactly once and caches them in memory.
class Repository {
  Repository._();
  static final Repository instance = Repository._();

  List<Category>? _categories;
  List<Term>? _terms;
  List<Drug>? _drugs;
  List<Dialogue>? _dialogues;
  List<Quiz>? _quizzes;

  Future<void> load() async {
    if (_terms != null) return;
    final results = await Future.wait([
      rootBundle.loadString('assets/data/categories.json'),
      rootBundle.loadString('assets/data/terms.json'),
      rootBundle.loadString('assets/data/drugs.json'),
      rootBundle.loadString('assets/data/dialogues.json'),
      rootBundle.loadString('assets/data/quizzes.json'),
    ]);
    _categories = (jsonDecode(results[0]) as List)
        .cast<Map<String, dynamic>>()
        .map(Category.fromJson)
        .toList();
    _terms = (jsonDecode(results[1]) as List)
        .cast<Map<String, dynamic>>()
        .map(Term.fromJson)
        .toList();
    _drugs = (jsonDecode(results[2]) as List)
        .cast<Map<String, dynamic>>()
        .map(Drug.fromJson)
        .toList();
    _dialogues = (jsonDecode(results[3]) as List)
        .cast<Map<String, dynamic>>()
        .map(Dialogue.fromJson)
        .toList();
    _quizzes = (jsonDecode(results[4]) as List)
        .cast<Map<String, dynamic>>()
        .map(Quiz.fromJson)
        .toList();
  }

  List<Category> get categories => _categories ?? const [];
  List<Term> get terms => _terms ?? const [];
  List<Drug> get drugs => _drugs ?? const [];
  List<Dialogue> get dialogues => _dialogues ?? const [];
  List<Quiz> get quizzes => _quizzes ?? const [];

  Category? categoryById(String id) {
    for (final c in categories) {
      if (c.id == id) return c;
    }
    return null;
  }

  List<Term> searchTerms(String query, {String? categoryId}) {
    return terms.where((t) {
      if (categoryId != null && t.category != categoryId) return false;
      return t.matches(query);
    }).toList();
  }
}
