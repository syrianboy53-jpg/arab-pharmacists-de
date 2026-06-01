import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:confetti/confetti.dart';

import '../data/leben_data.dart';
import '../models/question.dart';
import '../providers/app_provider.dart';

class LebenScreen extends StatefulWidget {
  const LebenScreen({super.key});

  @override
  State<LebenScreen> createState() => _LebenScreenState();
}

class _LebenScreenState extends State<LebenScreen> {
  String? _selectedCategory;

  @override
  Widget build(BuildContext context) {
    final categories = LebenData.categories;
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('الحياة في ألمانيا'),
      ),
      body: _selectedCategory == null
          ? _buildCategoryList(categories, colorScheme)
          : _buildQuizView(),
    );
  }

  Widget _buildCategoryList(List<String> categories, ColorScheme colorScheme) {
    final categoryIcons = {
      'Politik': Icons.gavel,
      'Geschichte': Icons.history_edu,
      'Gesellschaft': Icons.people,
      'Recht': Icons.balance,
      'Arbeit': Icons.work,
      'Bildung': Icons.school,
      'Kultur': Icons.theater_comedy,
      'Geographie': Icons.map,
    };

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          child: ListTile(
            leading: Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: colorScheme.primaryContainer,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(Icons.shuffle, color: colorScheme.primary),
            ),
            title: const Text('امتحان تجريبي (33 سؤال)'),
            subtitle: const Text('مثل الامتحان الحقيقي'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () => _startExam(context),
          ),
        ),
        const SizedBox(height: 16),
        Text(
          'حسب الفئة',
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        ...categories.map((cat) {
          final count = LebenData.getByCategory(cat).length;
          return Card(
            child: ListTile(
              leading: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: colorScheme.secondaryContainer,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  categoryIcons[cat] ?? Icons.quiz,
                  color: colorScheme.secondary,
                ),
              ),
              title: Text(_translateCategory(cat)),
              subtitle: Text('$count سؤال'),
              trailing: const Icon(Icons.arrow_forward_ios, size: 16),
              onTap: () {
                setState(() => _selectedCategory = cat);
              },
            ),
          );
        }),
      ],
    );
  }

  Widget _buildQuizView() {
    final questions = _selectedCategory == 'exam'
        ? (LebenData.allQuestions.toList()..shuffle()).take(33).toList()
        : LebenData.getByCategory(_selectedCategory!);

    return _QuizWidget(
      questions: questions,
      title: _selectedCategory == 'exam' ? 'امتحان تجريبي' : _translateCategory(_selectedCategory!),
      onBack: () => setState(() => _selectedCategory = null),
    );
  }

  void _startExam(BuildContext context) {
    setState(() => _selectedCategory = 'exam');
  }

  String _translateCategory(String cat) {
    const map = {
      'Politik': 'السياسة والديمقراطية',
      'Geschichte': 'التاريخ',
      'Gesellschaft': 'المجتمع',
      'Recht': 'القانون والحقوق',
      'Arbeit': 'العمل والاقتصاد',
      'Bildung': 'التعليم',
      'Kultur': 'الثقافة والحياة اليومية',
      'Geographie': 'الجغرافيا',
    };
    return map[cat] ?? cat;
  }
}

class _QuizWidget extends StatefulWidget {
  final List<Question> questions;
  final String title;
  final VoidCallback onBack;

  const _QuizWidget({
    required this.questions,
    required this.title,
    required this.onBack,
  });

  @override
  State<_QuizWidget> createState() => _QuizWidgetState();
}

class _QuizWidgetState extends State<_QuizWidget> {
  int _currentIndex = 0;
  int? _selectedAnswer;
  int _correctCount = 0;
  bool _showResult = false;
  late ConfettiController _confettiController;

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 3));
  }

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_showResult) return _buildResultView();

    final question = widget.questions[_currentIndex];
    final colorScheme = Theme.of(context).colorScheme;

    return Column(
      children: [
        AppBar(
          title: Text(widget.title),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: widget.onBack,
          ),
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(4),
            child: LinearProgressIndicator(
              value: (_currentIndex + 1) / widget.questions.length,
              backgroundColor: colorScheme.surfaceContainerHighest,
              valueColor: AlwaysStoppedAnimation(colorScheme.primary),
            ),
          ),
        ),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  'سؤال ${_currentIndex + 1} من ${widget.questions.length}',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 16),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      children: [
                        Text(
                          question.question,
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.center,
                          textDirection: TextDirection.ltr,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          question.questionAr,
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            color: colorScheme.onSurfaceVariant,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                ...List.generate(question.options.length, (i) {
                  final isSelected = _selectedAnswer == i;
                  final isCorrect = i == question.correctIndex;
                  final showCorrect = _selectedAnswer != null;

                  Color? cardColor;
                  if (showCorrect) {
                    if (isCorrect) {
                      cardColor = Colors.green.withValues(alpha: 0.15);
                    } else if (isSelected && !isCorrect) {
                      cardColor = Colors.red.withValues(alpha: 0.15);
                    }
                  }

                  return Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: Card(
                      color: cardColor,
                      child: InkWell(
                        onTap: _selectedAnswer == null ? () => _selectAnswer(i) : null,
                        borderRadius: BorderRadius.circular(16),
                        child: Padding(
                          padding: const EdgeInsets.all(16),
                          child: Row(
                            children: [
                              Container(
                                width: 32,
                                height: 32,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: isSelected
                                      ? (isCorrect ? Colors.green : Colors.red)
                                      : (showCorrect && isCorrect ? Colors.green : colorScheme.surfaceContainerHighest),
                                ),
                                child: Center(
                                  child: showCorrect && (isSelected || isCorrect)
                                      ? Icon(
                                          isCorrect ? Icons.check : Icons.close,
                                          size: 18,
                                          color: Colors.white,
                                        )
                                      : Text(
                                          String.fromCharCode(65 + i),
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            color: colorScheme.onSurfaceVariant,
                                          ),
                                        ),
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      question.options[i],
                                      style: const TextStyle(fontWeight: FontWeight.w500),
                                      textDirection: TextDirection.ltr,
                                    ),
                                    Text(
                                      question.optionsAr[i],
                                      style: TextStyle(
                                        fontSize: 13,
                                        color: colorScheme.onSurfaceVariant,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  );
                }),
                if (_selectedAnswer != null && question.explanation != null) ...[
                  const SizedBox(height: 12),
                  Card(
                    color: colorScheme.tertiaryContainer.withValues(alpha: 0.3),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          Icon(Icons.lightbulb, color: colorScheme.tertiary),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(
                              question.explanation!,
                              style: TextStyle(color: colorScheme.onTertiaryContainer),
                              textDirection: TextDirection.ltr,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
                if (_selectedAnswer != null) ...[
                  const SizedBox(height: 20),
                  FilledButton.icon(
                    onPressed: _nextQuestion,
                    icon: const Icon(Icons.arrow_back),
                    label: Text(_currentIndex < widget.questions.length - 1 ? 'السؤال التالي' : 'النتيجة'),
                  ),
                ],
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildResultView() {
    final percent = _correctCount / widget.questions.length;
    final passed = percent >= 0.5;
    final colorScheme = Theme.of(context).colorScheme;

    if (passed) _confettiController.play();

    return Stack(
      children: [
        Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(32),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  passed ? Icons.emoji_events : Icons.refresh,
                  size: 80,
                  color: passed ? Colors.amber : colorScheme.error,
                ),
                const SizedBox(height: 24),
                Text(
                  passed ? 'ممتاز! نجحت' : 'حاول مرة ثانية',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  '$_correctCount / ${widget.questions.length}',
                  style: Theme.of(context).textTheme.displaySmall?.copyWith(
                    color: passed ? Colors.green : colorScheme.error,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Text('${(percent * 100).toInt()}%'),
                const SizedBox(height: 32),
                FilledButton.icon(
                  onPressed: widget.onBack,
                  icon: const Icon(Icons.arrow_back),
                  label: const Text('رجوع'),
                ),
              ],
            ),
          ),
        ),
        Align(
          alignment: Alignment.topCenter,
          child: ConfettiWidget(
            confettiController: _confettiController,
            blastDirectionality: BlastDirectionality.explosive,
            shouldLoop: false,
          ),
        ),
      ],
    );
  }

  void _selectAnswer(int index) {
    setState(() {
      _selectedAnswer = index;
      if (index == widget.questions[_currentIndex].correctIndex) {
        _correctCount++;
        context.read<AppProvider>().addXP(10);
      }
    });
  }

  void _nextQuestion() {
    if (_currentIndex < widget.questions.length - 1) {
      setState(() {
        _currentIndex++;
        _selectedAnswer = null;
      });
    } else {
      context.read<AppProvider>().incrementQuizzes();
      setState(() => _showResult = true);
    }
  }
}
