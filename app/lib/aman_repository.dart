import 'dart:convert';

import 'package:flutter/services.dart' show rootBundle;
import 'package:shared_preferences/shared_preferences.dart';

import 'aman_models.dart';

/// Loads and caches Aman (أمان) community support data.
class AmanRepository {
  AmanRepository._();
  static final AmanRepository instance = AmanRepository._();

  static const _kAnonQuestions = 'aman_anon_questions';

  List<Expert>? _experts;
  List<LegalArticle>? _legalArticles;
  List<EmergencyResource>? _emergencyResources;
  List<LegalExplanation>? _legalExplanations;
  List<RealStory>? _stories;
  List<WhatIfScenario>? _whatIfScenarios;
  List<RelationshipQuizQuestion>? _quizQuestions;
  List<PodcastEpisode>? _podcasts;
  List<HelpCenter>? _helpCenters;
  List<AnonQuestion> _anonQuestions = [];

  Future<void> load() async {
    if (_experts != null) return;
    final results = await Future.wait([
      rootBundle.loadString('assets/data/aman_experts.json'),
      rootBundle.loadString('assets/data/aman_legal_guide.json'),
      rootBundle.loadString('assets/data/aman_emergency.json'),
      rootBundle.loadString('assets/data/aman_legal_explanations.json'),
      rootBundle.loadString('assets/data/aman_stories.json'),
      rootBundle.loadString('assets/data/aman_whatif.json'),
      rootBundle.loadString('assets/data/aman_relationship_quiz.json'),
      rootBundle.loadString('assets/data/aman_podcasts.json'),
      rootBundle.loadString('assets/data/aman_help_centers.json'),
    ]);
    _experts = (jsonDecode(results[0]) as List)
        .cast<Map<String, dynamic>>()
        .map(Expert.fromJson)
        .toList();
    _legalArticles = (jsonDecode(results[1]) as List)
        .cast<Map<String, dynamic>>()
        .map(LegalArticle.fromJson)
        .toList();
    _emergencyResources = (jsonDecode(results[2]) as List)
        .cast<Map<String, dynamic>>()
        .map(EmergencyResource.fromJson)
        .toList();
    _legalExplanations = (jsonDecode(results[3]) as List)
        .cast<Map<String, dynamic>>()
        .map(LegalExplanation.fromJson)
        .toList();
    _stories = (jsonDecode(results[4]) as List)
        .cast<Map<String, dynamic>>()
        .map(RealStory.fromJson)
        .toList();
    _whatIfScenarios = (jsonDecode(results[5]) as List)
        .cast<Map<String, dynamic>>()
        .map(WhatIfScenario.fromJson)
        .toList();
    _quizQuestions = (jsonDecode(results[6]) as List)
        .cast<Map<String, dynamic>>()
        .map(RelationshipQuizQuestion.fromJson)
        .toList();
    _podcasts = (jsonDecode(results[7]) as List)
        .cast<Map<String, dynamic>>()
        .map(PodcastEpisode.fromJson)
        .toList();
    _helpCenters = (jsonDecode(results[8]) as List)
        .cast<Map<String, dynamic>>()
        .map(HelpCenter.fromJson)
        .toList();

    // Load locally saved anonymous questions.
    final prefs = await SharedPreferences.getInstance();
    final savedQ = prefs.getString(_kAnonQuestions);
    if (savedQ != null) {
      _anonQuestions = (jsonDecode(savedQ) as List)
          .cast<Map<String, dynamic>>()
          .map(AnonQuestion.fromJson)
          .toList();
    }
  }

  List<Expert> get experts => _experts ?? const [];
  List<LegalArticle> get legalArticles => _legalArticles ?? const [];
  List<EmergencyResource> get emergencyResources =>
      _emergencyResources ?? const [];
  List<LegalExplanation> get legalExplanations =>
      _legalExplanations ?? const [];
  List<RealStory> get stories => _stories ?? const [];
  List<WhatIfScenario> get whatIfScenarios => _whatIfScenarios ?? const [];
  List<RelationshipQuizQuestion> get quizQuestions =>
      _quizQuestions ?? const [];
  List<PodcastEpisode> get podcasts => _podcasts ?? const [];
  List<HelpCenter> get helpCenters => _helpCenters ?? const [];
  List<AnonQuestion> get anonQuestions => _anonQuestions;

  // --------------- Anonymous Questions ---------------

  Future<void> addAnonQuestion(AnonQuestion q) async {
    _anonQuestions.add(q);
    await _saveAnonQuestions();
  }

  Future<void> _saveAnonQuestions() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _kAnonQuestions,
      jsonEncode(_anonQuestions.map((e) => e.toJson()).toList()),
    );
  }

  // --------------- Search helpers ---------------

  List<Expert> searchExperts(String query) {
    final q = query.trim().toLowerCase();
    if (q.isEmpty) return experts;
    return experts.where((e) {
      return e.nameAr.contains(query.trim()) ||
          e.specialtyAr.contains(query.trim()) ||
          e.specialty.toLowerCase().contains(q) ||
          e.city?.toLowerCase().contains(q) == true ||
          e.tags.any((t) => t.toLowerCase().contains(q));
    }).toList();
  }

  List<HelpCenter> searchHelpCenters(String query) {
    final q = query.trim().toLowerCase();
    if (q.isEmpty) return helpCenters;
    return helpCenters.where((h) {
      return h.nameAr.contains(query.trim()) ||
          h.city.toLowerCase().contains(q) ||
          h.type.toLowerCase().contains(q);
    }).toList();
  }
}
