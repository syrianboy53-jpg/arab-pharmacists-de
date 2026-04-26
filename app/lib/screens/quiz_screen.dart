import 'dart:math';

import 'package:flutter/material.dart';

import '../models.dart';
import '../repository.dart';

class QuizScreen extends StatefulWidget {
  const QuizScreen({super.key});

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  late List<Quiz> _deck;
  int _index = 0;
  int? _selected;
  int _correct = 0;
  bool _finished = false;

  @override
  void initState() {
    super.initState();
    _newDeck();
  }

  void _newDeck() {
    final all = List<Quiz>.from(Repository.instance.quizzes);
    all.shuffle(Random());
    setState(() {
      _deck = all;
      _index = 0;
      _selected = null;
      _correct = 0;
      _finished = false;
    });
  }

  void _selectOption(int i) {
    if (_selected != null) return;
    setState(() {
      _selected = i;
      if (i == _deck[_index].answerIndex) _correct++;
    });
  }

  void _next() {
    if (_index + 1 >= _deck.length) {
      setState(() => _finished = true);
      return;
    }
    setState(() {
      _index++;
      _selected = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_deck.isEmpty) {
      return const Scaffold(
        body: Center(child: Text('No quizzes available.')),
      );
    }

    if (_finished) {
      return Scaffold(
        appBar: AppBar(title: const Text('Quiz · اختبار')),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(32),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.emoji_events,
                    size: 96, color: Theme.of(context).colorScheme.primary),
                const SizedBox(height: 16),
                Text(
                  '$_correct / ${_deck.length}',
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
                const SizedBox(height: 8),
                Text(
                  'Done! · انتهى الاختبار',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
                const SizedBox(height: 24),
                FilledButton.icon(
                  onPressed: _newDeck,
                  icon: const Icon(Icons.refresh),
                  label: const Text('Try again · أعد المحاولة'),
                ),
              ],
            ),
          ),
        ),
      );
    }

    final q = _deck[_index];
    return Scaffold(
      appBar: AppBar(
        title: Text('Quiz ${_index + 1}/${_deck.length}'),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: Center(
              child: Text(
                'Score: $_correct',
                style: const TextStyle(fontWeight: FontWeight.w600),
              ),
            ),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    q.questionDe,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                  const SizedBox(height: 6),
                  Directionality(
                    textDirection: TextDirection.rtl,
                    child: Text(
                      q.questionAr,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: Theme.of(context).colorScheme.primary,
                          ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          for (int i = 0; i < q.options.length; i++) ...[
            _OptionTile(
              label: q.options[i],
              state: _stateFor(i, q.answerIndex),
              onTap: () => _selectOption(i),
            ),
            const SizedBox(height: 8),
          ],
          if (_selected != null && q.explanationDe != null) ...[
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surfaceContainerHighest,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(q.explanationDe!),
            ),
          ],
          const SizedBox(height: 16),
          if (_selected != null)
            FilledButton(
              onPressed: _next,
              child: Text(
                _index + 1 >= _deck.length
                    ? 'Finish · إنهاء'
                    : 'Next · التالي',
              ),
            ),
        ],
      ),
    );
  }

  _OptionState _stateFor(int i, int correct) {
    if (_selected == null) return _OptionState.idle;
    if (i == correct) return _OptionState.correct;
    if (i == _selected) return _OptionState.wrong;
    return _OptionState.idle;
  }
}

enum _OptionState { idle, correct, wrong }

class _OptionTile extends StatelessWidget {
  const _OptionTile({
    required this.label,
    required this.state,
    required this.onTap,
  });

  final String label;
  final _OptionState state;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    Color? bg;
    Color? fg;
    IconData? icon;
    switch (state) {
      case _OptionState.idle:
        bg = scheme.surface;
        fg = scheme.onSurface;
      case _OptionState.correct:
        bg = scheme.primaryContainer;
        fg = scheme.onPrimaryContainer;
        icon = Icons.check_circle;
      case _OptionState.wrong:
        bg = scheme.errorContainer;
        fg = scheme.onErrorContainer;
        icon = Icons.cancel;
    }
    return Material(
      color: bg,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(color: scheme.outlineVariant),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: state == _OptionState.idle ? onTap : null,
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(
            children: [
              Expanded(
                child: Text(
                  label,
                  style: TextStyle(color: fg, fontSize: 15),
                ),
              ),
              if (icon != null) Icon(icon, color: fg),
            ],
          ),
        ),
      ),
    );
  }
}
