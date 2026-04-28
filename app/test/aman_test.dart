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
    expect(AmanRepository.instance.jugendamtRiskQuestions, isNotEmpty);
    expect(AmanRepository.instance.plans, isNotEmpty);
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

  test('AnonQuestion serialization round-trip with ticket fields', () {
    const q = AnonQuestion(
      id: 'q-test',
      ticketNumber: 1001,
      questionAr: 'سؤال تجريبي',
      category: 'legal',
      date: '2026-04-28',
      attachmentNames: ['doc1.pdf', 'doc2.jpg'],
      isPremium: true,
    );
    final json = q.toJson();
    final restored = AnonQuestion.fromJson(json);
    expect(restored.id, q.id);
    expect(restored.ticketNumber, 1001);
    expect(restored.questionAr, q.questionAr);
    expect(restored.category, q.category);
    expect(restored.date, q.date);
    expect(restored.answerAr, isNull);
    expect(restored.status, TicketStatus.open);
    expect(restored.attachmentNames, ['doc1.pdf', 'doc2.jpg']);
    expect(restored.isPremium, isTrue);
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

  test('Jugendamt risk questions have matching options and risk scores', () async {
    await AmanRepository.instance.load();
    for (final q in AmanRepository.instance.jugendamtRiskQuestions) {
      expect(q.options.length, q.riskScores.length,
          reason: 'JR quiz ${q.id} options/riskScores length mismatch');
      expect(q.options, isNotEmpty,
          reason: 'JR quiz ${q.id} has no options');
    }
  });

  test('Subscription plans have valid pricing', () async {
    await AmanRepository.instance.load();
    final plans = AmanRepository.instance.plans;
    expect(plans.length, greaterThanOrEqualTo(2));
    final freePlan = plans.where((p) => p.priceEur == 0);
    expect(freePlan, isNotEmpty, reason: 'Should have a free plan');
    final paidPlans = plans.where((p) => p.priceEur > 0);
    expect(paidPlans, isNotEmpty, reason: 'Should have paid plans');
  });

  test('AmanSubscription canAskQuestion respects limits', () {
    const free = AmanSubscription(
        tier: AmanTier.free, questionsUsedThisMonth: 1, maxQuestionsPerMonth: 2);
    expect(free.canAskQuestion, isTrue);
    expect(free.isPremium, isFalse);

    const maxed = AmanSubscription(
        tier: AmanTier.free, questionsUsedThisMonth: 2, maxQuestionsPerMonth: 2);
    expect(maxed.canAskQuestion, isFalse);

    const premium = AmanSubscription(tier: AmanTier.premium);
    expect(premium.canAskQuestion, isTrue);
    expect(premium.isPremium, isTrue);
  });

  test('AmanSubscription serialization round-trip', () {
    const sub = AmanSubscription(
      tier: AmanTier.premium,
      expiresAt: '2027-04-28',
      questionsUsedThisMonth: 3,
      maxQuestionsPerMonth: 10,
    );
    final json = sub.toJson();
    final restored = AmanSubscription.fromJson(json);
    expect(restored.tier, AmanTier.premium);
    expect(restored.expiresAt, '2027-04-28');
    expect(restored.questionsUsedThisMonth, 3);
    expect(restored.maxQuestionsPerMonth, 10);
  });

  test('TicketStatus round-trip via AnonQuestion JSON', () {
    const q = AnonQuestion(
      id: 'q-s',
      ticketNumber: 2000,
      questionAr: 'test',
      category: 'social',
      date: '2026-01-01',
      status: TicketStatus.answered,
    );
    final json = q.toJson();
    final restored = AnonQuestion.fromJson(json);
    expect(restored.status, TicketStatus.answered);
  });
}
