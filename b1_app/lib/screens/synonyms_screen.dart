import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../data/synonyms_data.dart';

class SynonymsScreen extends StatefulWidget {
  const SynonymsScreen({super.key});

  @override
  State<SynonymsScreen> createState() => _SynonymsScreenState();
}

class _SynonymsScreenState extends State<SynonymsScreen> {
  late List<Map<String, dynamic>> _quizItems;
  int _currentIdx = 0;
  List<String> _options = [];
  int? _selectedAnswer;
  bool _answered = false;
  int _score = 0;

  @override
  void initState() {
    super.initState();
    _loadQuiz();
  }

  void _loadQuiz() {
    _quizItems = List<Map<String, dynamic>>.from(synonyms);
    _quizItems.shuffle();
    if (_quizItems.isNotEmpty) {
      _initRound();
    }
  }

  void _initRound() {
    final current = _quizItems[_currentIdx];
    final String correct = current['b'] as String;

    // Generate options: correct answer + 3 random b values from other synonyms
    final Set<String> optsSet = {correct};
    final List<Map<String, dynamic>> pool = List<Map<String, dynamic>>.from(synonyms)..remove(current);
    pool.shuffle();

    for (var item in pool) {
      if (optsSet.length >= 4) break;
      optsSet.add(item['b'] as String);
    }

    _options = optsSet.toList()..shuffle();
    _selectedAnswer = null;
    _answered = false;
  }

  void _selectOption(int idx) {
    if (_answered) return;
    final current = _quizItems[_currentIdx];
    final String correct = current['b'] as String;
    final isCorrect = _options[idx] == correct;

    setState(() {
      _selectedAnswer = idx;
      _answered = true;
      if (isCorrect) {
        _score++;
        context.read<AppProvider>().addXP(5);
      }
    });
  }

  void _nextRound() {
    if (_currentIdx < _quizItems.length - 1) {
      setState(() {
        _currentIdx++;
        _initRound();
      });
    } else {
      // Re-shuffle and start from 0
      setState(() {
        _quizItems.shuffle();
        _currentIdx = 0;
        _initRound();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);

    if (_quizItems.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('فخاخ المترادفات 🎮')),
        body: const Center(child: Text('لا توجد مترادفات.')),
      );
    }

    final current = _quizItems[_currentIdx];
    final String correctWord = current['b'] as String;
    final progress = (_currentIdx + 1) / _quizItems.length;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('فخاخ المترادفات 🎮', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Center(
              child: Text(
                'النقاط: $_score',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.orange),
              ),
            ),
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'كلمة ${_currentIdx + 1} من ${_quizItems.length}',
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.grey),
                ),
                if (current['level'] != null)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: Colors.blue.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      current['level'] as String,
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 10, color: Colors.blue),
                    ),
                  )
              ],
            ),
            const SizedBox(height: 12),
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: LinearProgressIndicator(
                value: progress,
                minHeight: 6,
                backgroundColor: Colors.grey[300],
                valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF10B981)),
              ),
            ),
            const SizedBox(height: 24),
            // Word to Match Card
            Card(
              color: cardBg,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
                child: Column(
                  children: [
                    const Text('ما هو مرادف الكلمة التالية؟', style: TextStyle(fontSize: 12, color: Colors.grey)),
                    const SizedBox(height: 12),
                    Text(
                      current['a'] as String,
                      style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                      textDirection: TextDirection.ltr,
                    ),
                    if (current['hintAr'] != null) ...[
                      const SizedBox(height: 8),
                      Text(
                        'المعنى: ${current["hintAr"]}',
                        style: const TextStyle(fontSize: 14, color: Colors.grey, fontWeight: FontWeight.bold),
                      )
                    ]
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            // Options List
            ...List.generate(_options.length, (idx) {
              final opt = _options[idx];
              final isCorrectOpt = opt == correctWord;
              final isSelected = _selectedAnswer == idx;

              Color borderColor = Colors.grey[300]!;
              Color itemBg = cardBg;
              Widget? trailingIcon;

              if (_answered) {
                if (isCorrectOpt) {
                  borderColor = Colors.green;
                  itemBg = Colors.green.withValues(alpha: 0.1);
                  trailingIcon = const Icon(Icons.check_circle, color: Colors.green);
                } else if (isSelected) {
                  borderColor = Colors.red;
                  itemBg = Colors.red.withValues(alpha: 0.1);
                  trailingIcon = const Icon(Icons.cancel, color: Colors.red);
                }
              } else if (isSelected) {
                borderColor = const Color(0xFF10B981);
              }

              return Padding(
                padding: const EdgeInsets.only(bottom: 12.0),
                child: InkWell(
                  onTap: _answered ? null : () => _selectOption(idx),
                  borderRadius: BorderRadius.circular(12),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    decoration: BoxDecoration(
                      color: itemBg,
                      border: Border.all(color: borderColor, width: 2),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            opt,
                            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: textMain),
                            textDirection: TextDirection.ltr,
                          ),
                        ),
                        if (trailingIcon != null) trailingIcon,
                      ],
                    ),
                  ),
                ),
              );
            }),
            if (_answered) ...[
              if (current['example'] != null) ...[
                const SizedBox(height: 16),
                Card(
                  color: Colors.blue.withValues(alpha: 0.05),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                    side: BorderSide(color: Colors.blue.withValues(alpha: 0.15)),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          '💬 مثال الاستخدام:',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.blue),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          current['example'] as String,
                          style: TextStyle(fontSize: 14, height: 1.4, color: textMain),
                          textDirection: TextDirection.ltr,
                        ),
                      ],
                    ),
                  ),
                ),
              ],
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  onPressed: _nextRound,
                  child: const Text('الكلمة التالية ➡️', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                ),
              ),
            ]
          ],
        ),
      ),
    );
  }
}
