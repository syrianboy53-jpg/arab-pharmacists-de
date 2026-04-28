import 'dart:convert';

import 'package:flutter/services.dart' show rootBundle;
import 'package:shared_preferences/shared_preferences.dart';

import 'aman_models.dart';

/// Loads and caches Aman (أمان) community support data.
class AmanRepository {
  AmanRepository._();
  static final AmanRepository instance = AmanRepository._();

  static const _kAnonQuestions = 'aman_anon_questions';
  static const _kSubscription = 'aman_subscription';
  static const _kTicketCounter = 'aman_ticket_counter';

  List<Expert>? _experts;
  List<LegalArticle>? _legalArticles;
  List<EmergencyResource>? _emergencyResources;
  List<LegalExplanation>? _legalExplanations;
  List<RealStory>? _stories;
  List<WhatIfScenario>? _whatIfScenarios;
  List<RelationshipQuizQuestion>? _quizQuestions;
  List<PodcastEpisode>? _podcasts;
  List<HelpCenter>? _helpCenters;
  List<JugendamtRiskQuestion>? _jugendamtRiskQuestions;
  List<AmanPlan>? _plans;
  List<AnonQuestion> _anonQuestions = [];
  AmanSubscription _subscription = const AmanSubscription();
  int _ticketCounter = 1000;

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
      rootBundle.loadString('assets/data/aman_jugendamt_risk.json'),
      rootBundle.loadString('assets/data/aman_plans.json'),
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
    _jugendamtRiskQuestions = (jsonDecode(results[9]) as List)
        .cast<Map<String, dynamic>>()
        .map(JugendamtRiskQuestion.fromJson)
        .toList();
    _plans = (jsonDecode(results[10]) as List)
        .cast<Map<String, dynamic>>()
        .map(AmanPlan.fromJson)
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

    // Load subscription state.
    final savedSub = prefs.getString(_kSubscription);
    if (savedSub != null) {
      _subscription = AmanSubscription.fromJson(
          jsonDecode(savedSub) as Map<String, dynamic>);
    }

    // Load ticket counter.
    _ticketCounter = prefs.getInt(_kTicketCounter) ?? 1000;
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
  List<JugendamtRiskQuestion> get jugendamtRiskQuestions =>
      _jugendamtRiskQuestions ?? const [];
  List<AmanPlan> get plans => _plans ?? const [];
  List<AnonQuestion> get anonQuestions => _anonQuestions;
  AmanSubscription get subscription => _subscription;

  // --------------- Anonymous Questions ---------------

  int nextTicketNumber() {
    _ticketCounter++;
    SharedPreferences.getInstance().then((prefs) {
      prefs.setInt(_kTicketCounter, _ticketCounter);
    });
    return _ticketCounter;
  }

  Future<void> addAnonQuestion(AnonQuestion q) async {
    _anonQuestions.add(q);
    await _saveAnonQuestions();
  }

  Future<void> updateSubscription(AmanSubscription sub) async {
    _subscription = sub;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kSubscription, jsonEncode(sub.toJson()));
  }

  /// Returns the current subscription with monthly question counter reset if
  /// the stored month differs from the current month.
  AmanSubscription get activeSubscription {
    final now = DateTime.now();
    final currentMonth =
        '${now.year}-${now.month.toString().padLeft(2, '0')}';
    if (_subscription.questionsResetMonth != currentMonth &&
        !_subscription.isPremium) {
      _subscription = _subscription.copyWith(
        questionsUsedThisMonth: 0,
        questionsResetMonth: currentMonth,
      );
      updateSubscription(_subscription);
    }
    return _subscription;
  }

  Future<void> incrementQuestionCount() async {
    final now = DateTime.now();
    final currentMonth =
        '${now.year}-${now.month.toString().padLeft(2, '0')}';
    await updateSubscription(_subscription.copyWith(
      questionsUsedThisMonth: _subscription.questionsUsedThisMonth + 1,
      questionsResetMonth: currentMonth,
    ));
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
      return e.nameAr.toLowerCase().contains(q) ||
          e.specialtyAr.toLowerCase().contains(q) ||
          e.specialty.toLowerCase().contains(q) ||
          e.city?.toLowerCase().contains(q) == true ||
          e.tags.any((t) => t.toLowerCase().contains(q));
    }).toList();
  }

  List<HelpCenter> searchHelpCenters(String query) {
    final q = query.trim().toLowerCase();
    if (q.isEmpty) return helpCenters;
    return helpCenters.where((h) {
      return h.nameAr.toLowerCase().contains(q) ||
          h.city.toLowerCase().contains(q) ||
          h.type.toLowerCase().contains(q);
    }).toList();
  }
}
