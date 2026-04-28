import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:arab_pharmacists_de/aman_models.dart';
import 'package:arab_pharmacists_de/aman_repository.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  test('AmanRepository loads all bundled datasets', () async {
    await AmanRepository.instance.load();
    expect(AmanRepository.instance.experts, isNotEmpty);
    expect(AmanRepository.instance.legalArticles, isNotEmpty);
    expect(AmanRepository.instance.emergencyResources, isNotEmpty);
    expect(AmanRepository.instance.legalExplanations, isNotEmpty);
    expect(AmanRepository.instance.stories, isNotEmpty);
    expect(AmanRepository.instance.whatIfScenarios, isNotEmpty);
    expect(AmanRepository.instance.quizQuestions, isNotEmpty);
    expect(AmanRepository.instance.podcasts, isNotEmpty);
    expect(AmanRepository.instance.helpCenters, isNotEmpty);
  });

  test('Every expert has required fields', () async {
    await AmanRepository.instance.load();
    for (final e in AmanRepository.instance.experts) {
      expect(e.id, isNotEmpty, reason: 'Expert missing id');
      expect(e.nameAr, isNotEmpty, reason: 'Expert ${e.id} missing name');
      expect(e.specialty, isNotEmpty,
          reason: 'Expert ${e.id} missing specialty');
      expect(e.specialtyAr, isNotEmpty,
          reason: 'Expert ${e.id} missing specialtyAr');
      expect(e.descriptionAr, isNotEmpty,
          reason: 'Expert ${e.id} missing description');
    }
  });

  test('Every legal article has required fields', () async {
    await AmanRepository.instance.load();
    for (final a in AmanRepository.instance.legalArticles) {
      expect(a.id, isNotEmpty, reason: 'Article missing id');
      expect(a.titleAr, isNotEmpty,
          reason: 'Article ${a.id} missing title');
      expect(a.bodyAr, isNotEmpty,
          reason: 'Article ${a.id} missing body');
      expect(a.category, isNotEmpty,
          reason: 'Article ${a.id} missing category');
    }
  });

  test('Emergency resources include at least one emergency item', () async {
    await AmanRepository.instance.load();
    final emergencies = AmanRepository.instance.emergencyResources
        .where((r) => r.isEmergency)
        .toList();
    expect(emergencies, isNotEmpty,
        reason: 'Should have at least one emergency resource');
  });

  test('Every story has required fields and moral', () async {
    await AmanRepository.instance.load();
    for (final s in AmanRepository.instance.stories) {
      expect(s.id, isNotEmpty, reason: 'Story missing id');
      expect(s.titleAr, isNotEmpty,
          reason: 'Story ${s.id} missing title');
      expect(s.bodyAr, isNotEmpty,
          reason: 'Story ${s.id} missing body');
      expect(s.category, isNotEmpty,
          reason: 'Story ${s.id} missing category');
    }
  });

  test('Relationship quiz questions have matching options and scores', () async {
    await AmanRepository.instance.load();
    for (final q in AmanRepository.instance.quizQuestions) {
      expect(q.options.length, q.scores.length,
          reason: 'Quiz ${q.id} options/scores length mismatch');
      expect(q.options, isNotEmpty,
          reason: 'Quiz ${q.id} has no options');
    }
  });

  test('What-if scenarios have consequences', () async {
    await AmanRepository.instance.load();
    for (final s in AmanRepository.instance.whatIfScenarios) {
      expect(s.consequences, isNotEmpty,
          reason: 'Scenario ${s.id} has no consequences');
    }
  });

  test('AnonQuestion serialization round-trip', () {
    final q = AnonQuestion(
      id: 'q-test',
      questionAr: 'سؤال تجريبي',
      category: 'legal',
      date: '2026-04-28',
    );
    final json = q.toJson();
    final restored = AnonQuestion.fromJson(json);
    expect(restored.id, q.id);
    expect(restored.questionAr, q.questionAr);
    expect(restored.category, q.category);
    expect(restored.date, q.date);
    expect(restored.answerAr, isNull);
  });

  test('Expert search matches by name, specialty and city', () async {
    await AmanRepository.instance.load();
    expect(AmanRepository.instance.searchExperts('Berlin'), isNotEmpty,
        reason: 'Should find expert in Berlin');
    expect(AmanRepository.instance.searchExperts('محامي'), isNotEmpty,
        reason: 'Should find lawyer expert');
  });

  test('Help center search matches by city', () async {
    await AmanRepository.instance.load();
    expect(AmanRepository.instance.searchHelpCenters('Berlin'), isNotEmpty,
        reason: 'Should find help center in Berlin');
  });
}
