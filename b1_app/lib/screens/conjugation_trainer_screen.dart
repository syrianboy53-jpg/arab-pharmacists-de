import 'dart:math';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:confetti/confetti.dart';
import '../providers/app_provider.dart';
import '../data/grammatik_data.dart';

class ConjugationTrainerScreen extends StatefulWidget {
  const ConjugationTrainerScreen({super.key});

  @override
  State<ConjugationTrainerScreen> createState() => _ConjugationTrainerScreenState();
}

class _ConjugationTrainerScreenState extends State<ConjugationTrainerScreen> {
  late List<Map<String, dynamic>> _verbs;
  late ConfettiController _confettiController;
  final Random _rand = Random();

  int _currentIndex = 0;
  int _score = 0;
  bool _answered = false;
  int? _selectedIdx;

  // Round specific properties
  late Map<String, dynamic> _currentVerb;
  late String _questionText;
  late String _correctAnswer;
  late List<String> _options;
  late String _questionType; // 'praeteritum', 'partizip2', 'hilfsverb'

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 2));
    _setupVerbs();
    if (_verbs.isNotEmpty) {
      _nextRound(init: true);
    }
  }

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  void _setupVerbs() {
    // Combine trennbare and untrennbare verbs
    _verbs = [];
    if (trennbareVerben.isNotEmpty) {
      // Each category has a 'verbs' list
      for (var cat in trennbareVerben) {
        if (cat['verbs'] != null) {
          _verbs.addAll(List<Map<String, dynamic>>.from(cat['verbs'] as List));
        }
      }
    }
    _verbs.shuffle();
  }

  void _nextRound({bool init = false}) {
    if (!init) {
      if (_currentIndex < 9) {
        _currentIndex++;
      } else {
        // Finished 10 questions
        _confettiController.play();
        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (ctx) => AlertDialog(
            title: const Text('أحسنت التدريب! 🎉', textAlign: TextAlign.center),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text('🦉 مدرّب الأفعال يقول:', style: TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                Text('لقد أجبت بشكل صحيح على $_score من أصل 10 أسئلة.'),
                const SizedBox(height: 12),
                Text('حصلت على +${_score * 5} XP نقاط إضافية!'),
              ],
            ),
            actions: [
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(ctx);
                  setState(() {
                    _score = 0;
                    _currentIndex = 0;
                    _verbs.shuffle();
                    _nextRound(init: true);
                  });
                },
                child: const Text('تدريب جديد 🔄'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pop(ctx);
                  Navigator.pop(context);
                },
                child: const Text('رجوع للرئيسية'),
              )
            ],
          ),
        );
        return;
      }
    }

    _answered = false;
    _selectedIdx = null;

    // Pick current verb
    _currentVerb = _verbs[_currentIndex % _verbs.length];

    // Pick question type
    final types = ['praeteritum', 'partizip2', 'hilfsverb'];
    _questionType = types[_rand.nextInt(types.length)];

    final infinitiv = _currentVerb['infinitiv'] as String? ?? '';
    final meaning = _currentVerb['ar'] as String? ?? '';

    if (_questionType == 'praeteritum') {
      _questionText = 'ما هو تصريف Präteritum للفعل "$infinitiv" ($meaning)؟';
      _correctAnswer = _currentVerb['praeteritum'] as String? ?? '';
      _options = _generateOptions(_correctAnswer, 'praeteritum');
    } else if (_questionType == 'partizip2') {
      _questionText = 'ما هو Partizip II للفعل "$infinitiv" ($meaning)؟';
      _correctAnswer = _currentVerb['partizip2'] as String? ?? '';
      _options = _generateOptions(_correctAnswer, 'partizip2');
    } else {
      _questionText = 'ما هو الفعل المساعد (Hilfsverb) لـ "$infinitiv" في زمن الماضي التام (Perfekt)؟';
      _correctAnswer = _currentVerb['hilfsverb'] as String? ?? 'haben';
      _options = ['haben', 'sein'];
    }

    if (!init) setState(() {});
  }

  List<String> _generateOptions(String correct, String field) {
    final Set<String> opts = {correct};
    // Fetch random alternatives
    final List<Map<String, dynamic>> pool = List<Map<String, dynamic>>.from(_verbs)..removeWhere((v) => v[field] == correct);
    pool.shuffle();
    for (var v in pool) {
      if (opts.length >= 4) break;
      final val = v[field] as String?;
      if (val != null && val.isNotEmpty) {
        opts.add(val);
      }
    }
    // Make sure we have 4 options if possible
    while (opts.length < 4) {
      opts.add('$correct ${_rand.nextInt(100)}');
    }
    return opts.toList()..shuffle();
  }

  void _answerQuestion(int idx) {
    if (_answered) return;
    setState(() {
      _selectedIdx = idx;
      _answered = true;
      final isCorrect = _options[idx] == _correctAnswer;
      if (isCorrect) {
        _score++;
        context.read<AppProvider>().addXP(5);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scaffoldBg = isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC);
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final textMuted = isDark ? Colors.white60 : const Color(0xFF64748B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);

    if (_verbs.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('مدرّب الأفعال 🔁')),
        body: const Center(child: Text('تحميل البيانات...')),
      );
    }

    final progress = (_currentIndex + 1) / 10;

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: AppBar(
        title: const Text('مدرّب التصريف للأفعال 🔁', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
        backgroundColor: isDark ? const Color(0xFF1E293B) : Colors.white,
        foregroundColor: textMain,
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Center(
              child: Text(
                'النقاط: $_score/10',
                style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.orange),
              ),
            ),
          )
        ],
      ),
      body: Stack(
        alignment: Alignment.center,
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Top Progress
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('السؤال ${_currentIndex + 1} من 10', style: TextStyle(fontWeight: FontWeight.bold, color: textMuted)),
                    Text('نوع التدريب: ${_questionType.toUpperCase()}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.blue)),
                  ],
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: LinearProgressIndicator(
                    value: progress,
                    minHeight: 6,
                    backgroundColor: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                    valueColor: const AlwaysStoppedAnimation<Color>(Colors.blue),
                  ),
                ),
                const SizedBox(height: 24),

                // Question Card
                Card(
                  color: cardBg,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                    side: BorderSide(color: borderCol, width: 1.5),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 28, horizontal: 16),
                    child: Column(
                      children: [
                        const Text('اختر التصريف الصحيح للفعل التالي:', style: TextStyle(fontSize: 12, color: Colors.grey)),
                        const SizedBox(height: 12),
                        Text(
                          _currentVerb['infinitiv'] as String? ?? '',
                          style: const TextStyle(fontSize: 34, fontWeight: FontWeight.bold, color: Colors.blue),
                          textAlign: TextAlign.center,
                          textDirection: TextDirection.ltr,
                        ),
                        const SizedBox(height: 16),
                        Text(
                          _questionText,
                          style: TextStyle(fontSize: 15, color: textMain, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.center,
                        )
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // Options List
                ...List.generate(_options.length, (idx) {
                  final opt = _options[idx];
                  final isCorrectOpt = opt == _correctAnswer;
                  final isSelected = _selectedIdx == idx;

                  Color itemBorder = borderCol;
                  Color itemBg = cardBg;
                  Widget? icon;

                  if (_answered) {
                    if (isCorrectOpt) {
                      itemBorder = Colors.green;
                      itemBg = Colors.green.withValues(alpha: 0.1);
                      icon = const Icon(Icons.check_circle, color: Colors.green);
                    } else if (isSelected) {
                      itemBorder = Colors.red;
                      itemBg = Colors.red.withValues(alpha: 0.1);
                      icon = const Icon(Icons.cancel, color: Colors.red);
                    }
                  } else if (isSelected) {
                    itemBorder = Colors.blue;
                  }

                  return Padding(
                    padding: const EdgeInsets.only(bottom: 12.0),
                    child: InkWell(
                      onTap: _answered ? null : () => _answerQuestion(idx),
                      borderRadius: BorderRadius.circular(12),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                        decoration: BoxDecoration(
                          color: itemBg,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: itemBorder, width: 2),
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
                            if (icon != null) icon,
                          ],
                        ),
                      ),
                    ),
                  );
                }),

                if (_answered) ...[
                  const SizedBox(height: 12),
                  // Verb details
                  Card(
                    color: Colors.blue.withValues(alpha: 0.05),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                      side: BorderSide(color: Colors.blue.withValues(alpha: 0.15)),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('تفاصيل الفعل بالكامل 💡:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.blue)),
                          const SizedBox(height: 8),
                          _verbDetailRow('Infinitiv', _currentVerb['infinitiv'] as String? ?? ''),
                          _verbDetailRow('Präteritum', _currentVerb['praeteritum'] as String? ?? ''),
                          _verbDetailRow('Partizip II', _currentVerb['partizip2'] as String? ?? ''),
                          _verbDetailRow('Hilfsverb', _currentVerb['hilfsverb'] as String? ?? ''),
                          _verbDetailRow('المعنى بالعربي', _currentVerb['ar'] as String? ?? ''),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    height: 50,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      onPressed: _nextRound,
                      child: const Text('التالي ➡️', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                    ),
                  )
                ]
              ],
            ),
          ),
          ConfettiWidget(
            confettiController: _confettiController,
            blastDirectionality: BlastDirectionality.explosive,
            shouldLoop: false,
            colors: const [Colors.green, Colors.blue, Colors.orange, Colors.pink],
          )
        ],
      ),
    );
  }

  Widget _verbDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.grey)),
          Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13), textDirection: TextDirection.ltr),
        ],
      ),
    );
  }
}
