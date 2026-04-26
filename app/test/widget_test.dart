// Lightweight tests: parse bundled JSON datasets via the Repository
// and verify shape & invariants. Avoids a full app pump-and-settle
// which is flaky in this CI environment.

import 'package:flutter_test/flutter_test.dart';

import 'package:arab_pharmacists_de/models.dart';
import 'package:arab_pharmacists_de/repository.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('Repository loads all bundled datasets', () async {
    await Repository.instance.load();
    expect(Repository.instance.categories, isNotEmpty);
    expect(Repository.instance.terms.length, greaterThanOrEqualTo(200));
    expect(Repository.instance.dialogues.length, greaterThanOrEqualTo(20));
    expect(Repository.instance.drugs, isNotEmpty);
    expect(Repository.instance.quizzes, isNotEmpty);
  });

  test('Every term references a known category id', () async {
    await Repository.instance.load();
    final ids = Repository.instance.categories.map((c) => c.id).toSet();
    for (final t in Repository.instance.terms) {
      expect(ids, contains(t.category),
          reason: 'Term ${t.id} has unknown category "${t.category}"');
    }
  });

  test('Every term has non-empty EN/DE/AR labels', () async {
    await Repository.instance.load();
    for (final t in Repository.instance.terms) {
      expect(t.en, isNotEmpty, reason: 'Term ${t.id} missing EN');
      expect(t.de, isNotEmpty, reason: 'Term ${t.id} missing DE');
      expect(t.ar, isNotEmpty, reason: 'Term ${t.id} missing AR');
    }
  });

  test('Quiz answer_index is within options range', () async {
    await Repository.instance.load();
    for (final Quiz q in Repository.instance.quizzes) {
      expect(q.answerIndex, greaterThanOrEqualTo(0));
      expect(q.answerIndex, lessThan(q.options.length));
    }
  });

  test('Search matches across languages', () async {
    await Repository.instance.load();
    expect(
      Repository.instance.searchTerms('Hypertonie'),
      isNotEmpty,
      reason: 'German search should hit Hypertension',
    );
    expect(
      Repository.instance.searchTerms('السكري'),
      isNotEmpty,
      reason: 'Arabic search should hit Diabetes',
    );
    expect(
      Repository.instance.searchTerms('Headache'),
      isNotEmpty,
      reason: 'English search should hit Headache',
    );
  });
}
