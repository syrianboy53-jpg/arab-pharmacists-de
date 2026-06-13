import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../providers/app_provider.dart';
import '../data/vocab_data.dart';

class SmartReviewScreen extends StatefulWidget {
  const SmartReviewScreen({super.key});

  @override
  State<SmartReviewScreen> createState() => _SmartReviewScreenState();
}

class _SmartReviewScreenState extends State<SmartReviewScreen> {
  late List<Map<String, dynamic>> _allWords;
  List<Map<String, dynamic>> _reviewQueue = [];
  int _currentIndex = 0;
  bool _showTranslation = false;
  bool _loading = true;

  // Box statistics
  Map<int, int> _boxCounts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

  @override
  void initState() {
    super.initState();
    _loadWordsAndSrs();
  }

  void _loadWordsAndSrs() async {
    // 1. Flatten all words from vocab categories
    _allWords = [];
    for (var cat in vocabCategories) {
      if (cat['words'] != null) {
        final categoryTitle = cat['titleAr'] as String? ?? cat['titleDe'] as String? ?? 'عام';
        for (var w in cat['words'] as List) {
          final wordMap = Map<String, dynamic>.from(w as Map);
          wordMap['category'] = categoryTitle;
          _allWords.add(wordMap);
        }
      }
    }

    if (_allWords.isEmpty) {
      setState(() {
        _loading = false;
      });
      return;
    }

    // 2. Load SharedPreferences to see box levels
    final prefs = await SharedPreferences.getInstance();
    
    // Reset stats
    _boxCounts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    final List<Map<String, dynamic>> pendingReview = [];

    for (var w in _allWords) {
      final de = w['de'] as String? ?? '';
      final boxKey = 'srs_box_$de';
      final timeKey = 'srs_next_review_$de';

      final int currentBox = prefs.getInt(boxKey) ?? 1;
      final int nextReviewTimestamp = prefs.getInt(timeKey) ?? 0;
      
      // Update box stats
      _boxCounts[currentBox] = (_boxCounts[currentBox] ?? 0) + 1;

      final now = DateTime.now().millisecondsSinceEpoch;
      // If due for review, or never reviewed (timestamp is 0)
      if (now >= nextReviewTimestamp) {
        final wCopy = Map<String, dynamic>.from(w);
        wCopy['box'] = currentBox;
        pendingReview.add(wCopy);
      }
    }

    // Shuffle and limit to 20 cards for today's review session
    pendingReview.shuffle();
    _reviewQueue = pendingReview.take(20).toList();

    setState(() {
      _loading = false;
    });
  }

  void _markCard(bool known) async {
    if (_reviewQueue.isEmpty) return;
    
    final current = _reviewQueue[_currentIndex];
    final de = current['de'] as String? ?? '';
    final int oldBox = current['box'] as int? ?? 1;

    int newBox = 1;
    int holdDays = 0;

    if (known) {
      newBox = (oldBox < 5) ? oldBox + 1 : 5;
      // Define Spaced intervals
      switch (newBox) {
        case 2: holdDays = 1; break;
        case 3: holdDays = 3; break;
        case 4: holdDays = 7; break;
        case 5: holdDays = 14; break;
      }
      context.read<AppProvider>().addXP(2);
    } else {
      newBox = 1; // reset to box 1
      holdDays = 0; // review today again
    }

    final nextReviewDate = DateTime.now().add(Duration(days: holdDays)).millisecondsSinceEpoch;

    // Persist in SharedPreferences
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('srs_box_$de', newBox);
    await prefs.setInt('srs_next_review_$de', nextReviewDate);

    if (!mounted) return;

    // Show feedback
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(known ? 'أتقنتها! تم نقلها إلى الصندوق $newBox 🎉' : 'تمت إعادتها إلى الصندوق 1 للمراجعة قريباً 🔄'),
        duration: const Duration(milliseconds: 650),
        backgroundColor: known ? Colors.green : Colors.red,
      ),
    );

    setState(() {
      _showTranslation = false;
      if (_currentIndex < _reviewQueue.length - 1) {
        _currentIndex++;
      } else {
        // Session ended
        _reviewQueue.clear();
        _currentIndex = 0;
        _loadWordsAndSrs(); // Reload stats and new queue
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scaffoldBg = isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC);
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: AppBar(
        title: const Text('مراجعة ذكيّة (SRS) 🔄', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
        backgroundColor: isDark ? const Color(0xFF1E293B) : Colors.white,
        foregroundColor: textMain,
        actions: [
          IconButton(
            icon: const Icon(Icons.insights),
            tooltip: 'إحصائيات الصناديق',
            onPressed: _showStatsDialog,
          )
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(20.0),
              child: _reviewQueue.isEmpty ? _buildEmptyState() : _buildReviewCard(),
            ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.done_all_rounded, size: 80, color: Color(0xFF10B981)),
          const SizedBox(height: 16),
          const Text(
            'لا توجد كلمات مستحقة للمراجعة حالياً! 🎉',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          const Text(
            'لقد راجعت كل البطاقات المطلوبة لليوم. عد غداً لمتابعة مراجعة الذاكرة طويلة المدى.',
            style: TextStyle(color: Colors.grey, fontSize: 13),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF10B981),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            onPressed: () {
              // Force loading 20 random words regardless of due date for extra practice
              setState(() {
                _loading = true;
              });
              _loadExtraPractice();
            },
            child: const Text('بدء تدريب إضافي (عشوائي) 🔄', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  void _loadExtraPractice() {
    _reviewQueue = List<Map<String, dynamic>>.from(_allWords)..shuffle();
    _reviewQueue = _reviewQueue.take(20).map((w) {
      final copy = Map<String, dynamic>.from(w);
      copy['box'] = 1;
      return copy;
    }).toList();
    _currentIndex = 0;
    _showTranslation = false;
    setState(() {
      _loading = false;
    });
  }

  Widget _buildReviewCard() {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final textMuted = isDark ? Colors.white60 : const Color(0xFF64748B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);

    final current = _reviewQueue[_currentIndex];
    final de = current['de'] as String? ?? '';
    final ar = current['ar'] as String? ?? '';
    final ex = current['example'] as String?;
    final cat = current['category'] as String? ?? '';
    final box = current['box'] as int? ?? 1;

    final progress = (_currentIndex + 1) / _reviewQueue.length;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Progress Row
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('بطاقة ${_currentIndex + 1} من ${_reviewQueue.length}', style: TextStyle(fontWeight: FontWeight.bold, color: textMuted)),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: const Color(0xFF10B981).withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(6),
              ),
              child: Text(
                'صندوق $box',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Color(0xFF10B981)),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: LinearProgressIndicator(
            value: progress,
            minHeight: 6,
            backgroundColor: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
            valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF10B981)),
          ),
        ),
        const SizedBox(height: 24),

        // Interactive Card
        Expanded(
          child: GestureDetector(
            onTap: () => setState(() => _showTranslation = !_showTranslation),
            child: Card(
              color: cardBg,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(24),
                side: BorderSide(color: borderCol, width: 1.5),
              ),
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      cat,
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.blue),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      de,
                      style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                      textAlign: TextAlign.center,
                      textDirection: TextDirection.ltr,
                    ),
                    const SizedBox(height: 16),
                    if (_showTranslation) ...[
                      const Divider(),
                      const SizedBox(height: 16),
                      Text(
                        ar,
                        style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: textMain),
                        textAlign: TextAlign.center,
                      ),
                      if (ex != null && ex.isNotEmpty) ...[
                        const SizedBox(height: 16),
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: Colors.blue.withValues(alpha: 0.05),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            ex,
                            style: const TextStyle(fontSize: 13, fontStyle: FontStyle.italic, color: Colors.blue),
                            textAlign: TextAlign.center,
                            textDirection: TextDirection.ltr,
                          ),
                        ),
                      ]
                    ] else ...[
                      const SizedBox(height: 30),
                      Text(
                        '👁️ اضغط لإظهار الترجمة والمثال',
                        style: TextStyle(fontSize: 12, color: textMuted, fontWeight: FontWeight.bold),
                      )
                    ]
                  ],
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 24),

        // Action Buttons (only show when translation is revealed)
        Row(
          children: [
            Expanded(
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                onPressed: _showTranslation ? () => _markCard(false) : null,
                icon: const Icon(Icons.close),
                label: const Text('نسيتها ❌', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                onPressed: _showTranslation ? () => _markCard(true) : null,
                icon: const Icon(Icons.check),
                label: const Text('عرفتها 🎉', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
      ],
    );
  }

  void _showStatsDialog() {
    showDialog(
      context: context,
      builder: (context) {
        final total = _boxCounts.values.reduce((a, b) => a + b);
        return AlertDialog(
          title: const Text('إحصائيات الذاكرة التكرارية 📊', textAlign: TextAlign.center),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('إجمالي الكلمات المحفوظة: $total', style: const TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 16),
              _boxStatRow('الصندوق 1 (تعلم جديد)', _boxCounts[1] ?? 0, Colors.red),
              _boxStatRow('الصندوق 2 (مراجعة بعد يوم)', _boxCounts[2] ?? 0, Colors.orange),
              _boxStatRow('الصندوق 3 (مراجعة 3 أيام)', _boxCounts[3] ?? 0, Colors.blue),
              _boxStatRow('الصندوق 4 (مراجعة أسبوع)', _boxCounts[4] ?? 0, Colors.teal),
              _boxStatRow('الصندوق 5 (ذاكرة دائمة)', _boxCounts[5] ?? 0, Colors.green),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('إغلاق'),
            ),
          ],
        );
      },
    );
  }

  Widget _boxStatRow(String label, int count, Color color) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Container(width: 12, height: 12, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
              const SizedBox(width: 8),
              Text(label, style: const TextStyle(fontSize: 13)),
            ],
          ),
          Text('$count كلمة', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
        ],
      ),
    );
  }
}
