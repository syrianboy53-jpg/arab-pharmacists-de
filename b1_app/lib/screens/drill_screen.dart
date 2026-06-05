import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../data/sprachbausteine_data.dart';

class DrillScreen extends StatefulWidget {
  const DrillScreen({super.key});

  @override
  State<DrillScreen> createState() => _DrillScreenState();
}

class _DrillScreenState extends State<DrillScreen> {
  late List<Map<String, dynamic>> _drills;
  int _currentIdx = 0;
  int? _selectedAnswer;
  bool _answered = false;
  int _correctCount = 0;
  int _totalAttempted = 0;

  @override
  void initState() {
    super.initState();
    _loadDrills();
  }

  void _loadDrills() {
    // We import pruefungsFragen and copy them
    _drills = List<Map<String, dynamic>>.from(pruefungsFragen);
    _drills.shuffle();
  }

  void _answerQuestion(int index, int correct) {
    if (_answered) return;
    setState(() {
      _selectedAnswer = index;
      _answered = true;
      _totalAttempted++;
      if (index == correct) {
        _correctCount++;
        context.read<AppProvider>().addXP(5);
      }
    });
  }

  void _nextQuestion() {
    if (_currentIdx < _drills.length - 1) {
      setState(() {
        _currentIdx++;
        _selectedAnswer = null;
        _answered = false;
      });
    } else {
      // Re-shuffle and restart
      setState(() {
        _drills.shuffle();
        _currentIdx = 0;
        _selectedAnswer = null;
        _answered = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);

    if (_drills.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('Drill - قواعد مكثفة 🧠')),
        body: const Center(child: Text('لا توجد أسئلة حالياً.')),
      );
    }

    final q = _drills[_currentIdx];
    final options = List<Map<String, dynamic>>.from(q['options'] as List? ?? []);
    
    // Some formats store correct as an integer index, others as a string like 'a', 'b'. Let's parse both.
    int correctIdx = 0;
    if (q['correct'] is int) {
      correctIdx = q['correct'] as int;
    } else if (q['correct'] is String) {
      final letter = (q['correct'] as String).toLowerCase();
      if (letter == 'a') correctIdx = 0;
      if (letter == 'b') correctIdx = 1;
      if (letter == 'c') correctIdx = 2;
      if (letter == 'd') correctIdx = 3;
    }

    final accuracy = _totalAttempted > 0 ? (_correctCount / _totalAttempted * 100).round() : 100;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Drill - قواعد مكثفة 🧠', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Stats Row
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildStatTile('الأسئلة المجابة', '$_totalAttempted', Colors.blue),
                _buildStatTile('الإجابات الصحيحة', '$_correctCount', Colors.green),
                _buildStatTile('نسبة الدقة', '$accuracy%', Colors.orange),
              ],
            ),
            const SizedBox(height: 24),
            // Question Context Card
            Card(
              color: cardBg,
              elevation: 2,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'سؤال ${_currentIdx + 1}',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.grey),
                        ),
                        if (q['level'] != null)
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: Colors.blue.withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              q['level'] as String,
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 10, color: Colors.blue),
                            ),
                          )
                      ],
                    ),
                    const SizedBox(height: 16),
                    Text(
                      q['context'] as String? ?? q['question'] as String? ?? '',
                      style: TextStyle(fontSize: 16, height: 1.5, fontWeight: FontWeight.bold, color: textMain),
                      textDirection: TextDirection.ltr,
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            // Options List
            ...List.generate(options.length, (idx) {
              final opt = options[idx];
              final isCorrect = idx == correctIdx;
              final isSelected = _selectedAnswer == idx;

              Color borderColor = Colors.grey[300]!;
              Color itemBg = cardBg;
              Widget? trailingIcon;

              if (_answered) {
                if (isCorrect) {
                  borderColor = Colors.green;
                  itemBg = Colors.green.withValues(alpha: 0.1);
                  trailingIcon = const Icon(Icons.check_circle, color: Colors.green, size: 20);
                } else if (isSelected) {
                  borderColor = Colors.red;
                  itemBg = Colors.red.withValues(alpha: 0.1);
                  trailingIcon = const Icon(Icons.cancel, color: Colors.red, size: 20);
                }
              } else if (isSelected) {
                borderColor = const Color(0xFF10B981);
              }

              final String optText = opt['text'] as String? ?? opt['de'] as String? ?? opt.toString();

              return Padding(
                padding: const EdgeInsets.only(bottom: 12.0),
                child: InkWell(
                  onTap: _answered ? null : () => _answerQuestion(idx, correctIdx),
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
                            optText,
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
              const SizedBox(height: 16),
              Card(
                color: Colors.amber.withValues(alpha: 0.05),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                  side: BorderSide(color: Colors.amber.withValues(alpha: 0.2)),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Row(
                    children: [
                      const Text('💡', style: TextStyle(fontSize: 20)),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          q['explanation'] as String? ?? q['explanationAr'] as String? ?? 'تصريف أو قاعدة صحيحة.',
                          style: TextStyle(fontSize: 13, color: textMain.withValues(alpha: 0.8), height: 1.4),
                        ),
                      )
                    ],
                  ),
                ),
              ),
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
                  onPressed: _nextQuestion,
                  child: const Text('السؤال التالي ➡️', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                ),
              ),
            ]
          ],
        ),
      ),
    );
  }

  Widget _buildStatTile(String label, String value, Color color) {
    return Column(
      children: [
        Text(
          value,
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: color),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: const TextStyle(fontSize: 10, color: Colors.grey, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }
}
