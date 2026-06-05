import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../data/grammatik_data.dart';

class SatzbauScreen extends StatefulWidget {
  const SatzbauScreen({super.key});

  @override
  State<SatzbauScreen> createState() => _SatzbauScreenState();
}

class _SatzbauScreenState extends State<SatzbauScreen> {
  late List<Map<String, dynamic>> _sentences;
  int _currentIdx = 0;
  List<String> _shuffledWords = [];
  List<String> _userWords = [];
  bool? _isCorrect;
  bool _answered = false;

  @override
  void initState() {
    super.initState();
    _loadSentences();
  }

  void _loadSentences() {
    _sentences = [];
    for (var mistake in commonMistakes) {
      if (mistake['examples'] != null) {
        for (var ex in mistake['examples']) {
          if (ex['right'] != null && ex['ar'] != null) {
            _sentences.add({
              'right': ex['right'] as String,
              'ar': ex['ar'] as String,
              'explain': mistake['titleAr'] as String? ?? '',
            });
          }
        }
      }
    }
    // Shuffle sentences to give a fresh experience
    _sentences.shuffle();
    if (_sentences.isNotEmpty) {
      _initRound();
    }
  }

  void _initRound() {
    final right = _sentences[_currentIdx]['right'] as String;
    // Split sentence into words, remove empty, and trim punctuation if desired
    // (but let's keep them so they exactly match)
    final words = right.split(RegExp(r'\s+')).where((w) => w.isNotEmpty).toList();
    _shuffledWords = List<String>.from(words)..shuffle();
    _userWords = [];
    _isCorrect = null;
    _answered = false;
  }

  void _selectWord(String word) {
    if (_answered) return;
    setState(() {
      _userWords.add(word);
      _shuffledWords.remove(word);
    });
  }

  void _deselectWord(String word) {
    if (_answered) return;
    setState(() {
      _userWords.remove(word);
      _shuffledWords.add(word);
    });
  }

  void _checkAnswer() {
    final right = _sentences[_currentIdx]['right'] as String;
    final userSentence = _userWords.join(' ');
    // Clean string comparison (trim spaces, ignore trailing period if user forgot, but let's keep it simple)
    final cleanedRight = right.replaceAll(RegExp(r'\s+'), ' ').trim();
    final cleanedUser = userSentence.trim();

    setState(() {
      _answered = true;
      _isCorrect = cleanedRight == cleanedUser;
      if (_isCorrect!) {
        context.read<AppProvider>().addXP(5);
      }
    });
  }

  void _nextRound() {
    if (_currentIdx < _sentences.length - 1) {
      setState(() {
        _currentIdx++;
        _initRound();
      });
    } else {
      // Re-shuffle and start from 0
      setState(() {
        _sentences.shuffle();
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

    if (_sentences.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('بناء الجمل 🧩')),
        body: const Center(child: Text('لا توجد بيانات كافية.')),
      );
    }

    final current = _sentences[_currentIdx];

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('تركيب الجمل الألمانية 🧩', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'رتب الكلمات الألمانية لتترجم الجملة العربية التالية:',
              style: TextStyle(fontSize: 14, color: Colors.grey, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            Card(
              color: const Color(0xFF10B981).withValues(alpha: 0.1),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
                side: const BorderSide(color: Color(0xFF10B981), width: 1.5),
              ),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
                child: Text(
                  current['ar'],
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            const SizedBox(height: 24),
            // User assembled words area
            Container(
              constraints: const BoxConstraints(minHeight: 100),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: cardBg,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: _answered
                      ? (_isCorrect! ? Colors.green : Colors.red)
                      : Colors.grey[300]!,
                  width: 2,
                ),
              ),
              child: _userWords.isEmpty
                  ? Center(
                      child: Text(
                        'اضغط على الكلمات بالأسفل لتركيب الجملة',
                        style: TextStyle(color: Colors.grey[400], fontSize: 13),
                      ),
                    )
                  : Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: _userWords.map((word) {
                        return ActionChip(
                          backgroundColor: const Color(0xFF10B981).withValues(alpha: 0.1),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                            side: const BorderSide(color: Color(0xFF10B981)),
                          ),
                          label: Text(
                            word,
                            style: TextStyle(color: textMain, fontWeight: FontWeight.bold, fontSize: 15),
                          ),
                          onPressed: () => _deselectWord(word),
                        );
                      }).toList(),
                    ),
            ),
            const SizedBox(height: 24),
            // Word bubbles selector
            const Text(
              'الكلمات المتاحة:',
              style: TextStyle(fontSize: 12, color: Colors.grey, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF1E293B).withValues(alpha: 0.5) : Colors.grey[100],
                borderRadius: BorderRadius.circular(16),
              ),
              child: _shuffledWords.isEmpty && _userWords.isEmpty
                  ? const SizedBox(height: 60)
                  : Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      alignment: WrapAlignment.center,
                      children: _shuffledWords.map((word) {
                        return ActionChip(
                          backgroundColor: cardBg,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                            side: BorderSide(color: Colors.grey[300]!),
                          ),
                          label: Text(
                            word,
                            style: TextStyle(color: textMain, fontWeight: FontWeight.bold, fontSize: 15),
                          ),
                          onPressed: () => _selectWord(word),
                        );
                      }).toList(),
                    ),
            ),
            const SizedBox(height: 32),
            if (!_answered)
              SizedBox(
                height: 50,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    disabledBackgroundColor: Colors.grey[300],
                  ),
                  onPressed: _userWords.isEmpty ? null : _checkAnswer,
                  child: const Text('تحقق من صحة الإجابة 🔍', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                ),
              )
            else ...[
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: _isCorrect! ? Colors.green.withValues(alpha: 0.1) : Colors.red.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: _isCorrect! ? Colors.green : Colors.red,
                    width: 1.5,
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      _isCorrect! ? 'أحسنت! إجابة صحيحة 🎉 (+5 XP)' : 'إجابة خاطئة ❌',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: _isCorrect! ? Colors.green : Colors.red,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text('الجملة الصحيحة هي:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.grey)),
                    const SizedBox(height: 4),
                    Text(
                      current['right'],
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: textMain),
                      textDirection: TextDirection.ltr,
                    ),
                    if (current['explain'].isNotEmpty) ...[
                      const SizedBox(height: 8),
                      Text(
                        '💡 القاعدة: ${current["explain"]}',
                        style: TextStyle(fontSize: 13, color: textMain.withValues(alpha: 0.8)),
                      ),
                    ]
                  ],
                ),
              ),
              const SizedBox(height: 24),
              SizedBox(
                height: 50,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  onPressed: _nextRound,
                  child: const Text('الجملة التالية ➡️', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                ),
              ),
            ]
          ],
        ),
      ),
    );
  }
}
