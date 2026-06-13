import 'dart:math';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../data/grammatik_data.dart';

class DuelPlayScreen extends StatefulWidget {
  final String challengeCode;
  const DuelPlayScreen({super.key, required this.challengeCode});

  @override
  State<DuelPlayScreen> createState() => _DuelPlayScreenState();
}

class _DuelPlayScreenState extends State<DuelPlayScreen> {
  bool _loading = true;
  List<Map<String, dynamic>> _questions = [];
  int _currentIndex = 0;
  int _score = 0;
  bool _isAnswered = false;
  String _selectedAnswer = '';
  final Stopwatch _stopwatch = Stopwatch();

  @override
  void initState() {
    super.initState();
    _loadQuestions();
  }

  void _loadQuestions() {
    // 1. Collect all grammar questions
    final allQuestions = <Map<String, dynamic>>[];
    for (var lesson in grammarLessons) {
      if (lesson['exercises'] != null) {
        for (var ex in lesson['exercises']) {
          final opts = List<String>.from(ex['options'] as List);
          allQuestions.add({
            'q': ex['question'],
            'opts': opts,
            'correct': opts[ex['correct'] as int],
          });
        }
      }
    }

    // 2. Use the code as a seed to ensure both players get EXACTLY the same 10 questions
    final seed = widget.challengeCode.codeUnits.fold(0, (prev, curr) => prev + curr);
    final random = Random(seed);

    // Shuffle with the seeded random
    allQuestions.shuffle(random);

    // Pick top 10
    _questions = allQuestions.take(10).toList();

    setState(() {
      _loading = false;
    });

    _stopwatch.start();
  }

  void _submitAnswer(String answer) {
    if (_isAnswered) return;

    final currentQ = _questions[_currentIndex];
    final isCorrect = answer == currentQ['correct'];

    setState(() {
      _isAnswered = true;
      _selectedAnswer = answer;
      if (isCorrect) _score++;
    });

    Future.delayed(const Duration(milliseconds: 1200), () {
      if (!mounted) return;
      if (_currentIndex < _questions.length - 1) {
        setState(() {
          _currentIndex++;
          _isAnswered = false;
          _selectedAnswer = '';
        });
      } else {
        _stopwatch.stop();
        _showResult();
      }
    });
  }

  void _showResult() {
    final int secondsTaken = _stopwatch.elapsed.inSeconds;
    final bool won = _score >= 7;

    if (won) {
      context.read<AppProvider>().addXP(50);
    }

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        title: Text(
          won ? 'أداء رائع! 🎉' : 'نهاية التحدي 🏁',
          textAlign: TextAlign.center,
          style: TextStyle(color: won ? Colors.green : Colors.orange, fontWeight: FontWeight.bold),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('نتيجتك في تحدي الأصدقاء:', style: TextStyle(fontSize: 16)),
            const SizedBox(height: 16),
            Text('$_score / ${_questions.length}', style: const TextStyle(fontSize: 36, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Text('الوقت المستغرق: $secondsTaken ثانية', style: const TextStyle(fontSize: 14, color: Colors.grey)),
            const SizedBox(height: 16),
            Text(
              'شارك هذه النتيجة مع صديقك لتعرف من فاز في التحدي!',
              textAlign: TextAlign.center,
              style: TextStyle(color: Theme.of(context).colorScheme.primary),
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF10B981),
              foregroundColor: Colors.white,
              minimumSize: const Size(double.infinity, 45),
            ),
            onPressed: () {
              Navigator.pop(ctx);
              Navigator.pop(context); // back to duels screen
            },
            child: const Text('إنهاء ومغادرة', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_loading || _questions.isEmpty) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;

    final currentQ = _questions[_currentIndex];
    final progress = (_currentIndex + 1) / _questions.length;

    return Scaffold(
      appBar: AppBar(
        title: Text('تحدي: ${widget.challengeCode}'),
        centerTitle: true,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('سؤال ${_currentIndex + 1} من ${_questions.length}'),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.orange.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text('النتيجة: $_score', style: const TextStyle(color: Colors.orange, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              LinearProgressIndicator(
                value: progress,
                backgroundColor: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                valueColor: const AlwaysStoppedAnimation<Color>(Colors.orange),
              ),
              const SizedBox(height: 32),

              Card(
                color: cardBg,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                child: Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Text(
                    currentQ['q'] as String,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    textAlign: TextAlign.center,
                    textDirection: TextDirection.ltr,
                  ),
                ),
              ),
              const SizedBox(height: 32),

              ...List<String>.from(currentQ['opts'] as List).map((opt) {
                final isSelected = _selectedAnswer == opt;
                final isCorrect = opt == currentQ['correct'];
                
                Color btnColor = isDark ? const Color(0xFF334155) : Colors.white;
                Color textColor = isDark ? Colors.white : Colors.black87;

                if (_isAnswered) {
                  if (isCorrect) {
                    btnColor = Colors.green;
                    textColor = Colors.white;
                  } else if (isSelected) {
                    btnColor = Colors.red;
                    textColor = Colors.white;
                  }
                }

                return Padding(
                  padding: const EdgeInsets.only(bottom: 12.0),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: btnColor,
                      foregroundColor: textColor,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                        side: BorderSide(color: _isAnswered ? Colors.transparent : Colors.grey.withOpacity(0.3)),
                      ),
                      elevation: _isAnswered ? 0 : 1,
                    ),
                    onPressed: () => _submitAnswer(opt),
                    child: Text(
                      opt,
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      textDirection: TextDirection.ltr,
                    ),
                  ),
                );
              }),
            ],
          ),
        ),
      ),
    );
  }
}
