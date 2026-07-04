import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_tts/flutter_tts.dart';
import '../data/daily_phrases.dart';

class DailyPhrasesScreen extends StatefulWidget {
  const DailyPhrasesScreen({super.key});

  @override
  State<DailyPhrasesScreen> createState() => _DailyPhrasesScreenState();
}

class _DailyPhrasesScreenState extends State<DailyPhrasesScreen> {
  int _selectedCategory = 0;
  late PageController _pageController;
  int _currentPage = 0;
  final FlutterTts _tts = FlutterTts();
  bool _isSpeaking = false;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _initTts();
  }

  Future<void> _initTts() async {
    await _tts.setLanguage('de-DE');
    await _tts.setSpeechRate(0.45);
    _tts.setCompletionHandler(() {
      if (mounted) setState(() => _isSpeaking = false);
    });
  }

  @override
  void dispose() {
    _pageController.dispose();
    _tts.stop();
    super.dispose();
  }

  Future<void> _speak(String text) async {
    if (_isSpeaking) {
      await _tts.stop();
      setState(() => _isSpeaking = false);
      return;
    }
    setState(() => _isSpeaking = true);
    await _tts.speak(text);
  }

  DailyPhrase get _phraseOfDay {
    final allPhrases = phraseCategories.expand((c) => c.phrases).toList();
    final dayIndex = DateTime.now().difference(DateTime(2025, 1, 1)).inDays;
    return allPhrases[dayIndex % allPhrases.length];
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final category = phraseCategories[_selectedCategory];
    final phrases = category.phrases;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF060610) : const Color(0xFFF5F7FA),
      appBar: AppBar(
        title: const Text('العبارات اليومية 📝'),
        centerTitle: true,
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Color(category.color), Color(category.color).withValues(alpha: 0.7)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
        ),
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: Column(
        children: [
          // ── عبارة اليوم ──
          Container(
            margin: const EdgeInsets.all(16),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF6C5CE7), Color(0xFFA29BFE)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF6C5CE7).withValues(alpha: 0.3),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Text('⭐', style: TextStyle(fontSize: 20)),
                    SizedBox(width: 8),
                    Text('عبارة اليوم', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 15)),
                  ],
                ),
                const SizedBox(height: 10),
                GestureDetector(
                  onTap: () => _speak(_phraseOfDay.german),
                  child: Text(
                    _phraseOfDay.german,
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 17, height: 1.4),
                    textDirection: TextDirection.ltr,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  _phraseOfDay.arabic,
                  style: TextStyle(color: Colors.white.withValues(alpha: 0.85), fontSize: 13),
                ),
              ],
            ),
          ),

          // ── Category Tabs ──
          SizedBox(
            height: 44,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              itemCount: phraseCategories.length,
              itemBuilder: (context, index) {
                final cat = phraseCategories[index];
                final isSelected = index == _selectedCategory;
                return GestureDetector(
                  onTap: () {
                    setState(() {
                      _selectedCategory = index;
                      _currentPage = 0;
                    });
                    _pageController.jumpToPage(0);
                  },
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 250),
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: isSelected ? Color(cat.color) : (isDark ? Colors.white.withValues(alpha: 0.06) : Colors.white),
                      borderRadius: BorderRadius.circular(24),
                      border: isSelected ? null : Border.all(color: isDark ? Colors.white12 : Colors.grey.shade300),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(cat.emoji, style: const TextStyle(fontSize: 16)),
                        const SizedBox(width: 6),
                        Text(
                          cat.name,
                          style: TextStyle(
                            color: isSelected ? Colors.white : (isDark ? Colors.white70 : Colors.black87),
                            fontWeight: FontWeight.w700,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 12),

          // ── Phrase Cards PageView ──
          Expanded(
            child: PageView.builder(
              controller: _pageController,
              itemCount: phrases.length,
              onPageChanged: (i) => setState(() => _currentPage = i),
              itemBuilder: (context, index) {
                final phrase = phrases[index];
                return _buildPhraseCard(phrase, isDark, index, phrases.length);
              },
            ),
          ),

          // ── Progress Dots ──
          Padding(
            padding: const EdgeInsets.only(bottom: 20, top: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(phrases.length, (i) {
                return AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  margin: const EdgeInsets.symmetric(horizontal: 3),
                  width: i == _currentPage ? 24 : 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: i == _currentPage ? Color(category.color) : (isDark ? Colors.white24 : Colors.grey.shade300),
                    borderRadius: BorderRadius.circular(4),
                  ),
                );
              }),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPhraseCard(DailyPhrase phrase, bool isDark, int index, int total) {
    final catColor = Color(phraseCategories[_selectedCategory].color);

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF0E0E24) : Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: isDark ? Colors.white.withValues(alpha: 0.06) : Colors.grey.shade200),
        boxShadow: [
          if (!isDark)
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
        ],
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              children: [
                Text(phrase.emoji, style: const TextStyle(fontSize: 28)),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    '${index + 1} / $total',
                    style: TextStyle(
                      color: isDark ? Colors.white38 : Colors.grey,
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
                // TTS button
                IconButton(
                  onPressed: () => _speak(phrase.german),
                  icon: Icon(
                    _isSpeaking ? Icons.stop_circle_rounded : Icons.volume_up_rounded,
                    color: catColor,
                    size: 28,
                  ),
                ),
                // Copy button
                IconButton(
                  onPressed: () {
                    Clipboard.setData(ClipboardData(text: phrase.german));
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: const Text('تم نسخ العبارة! 📋'),
                        backgroundColor: catColor,
                        behavior: SnackBarBehavior.floating,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                    );
                  },
                  icon: Icon(Icons.copy_rounded, color: isDark ? Colors.white38 : Colors.grey, size: 22),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // German text
            GestureDetector(
              onTap: () => _speak(phrase.german),
              child: Text(
                phrase.german,
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                  color: isDark ? Colors.white : const Color(0xFF2D3436),
                  height: 1.5,
                ),
                textDirection: TextDirection.ltr,
              ),
            ),
            const SizedBox(height: 16),

            // Divider
            Container(
              height: 2,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [catColor, catColor.withValues(alpha: 0.1)],
                ),
                borderRadius: BorderRadius.circular(1),
              ),
            ),
            const SizedBox(height: 16),

            // Arabic translation
            Text(
              phrase.arabic,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: catColor,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 24),

            // Example sentence box
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: catColor.withValues(alpha: isDark ? 0.1 : 0.06),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: catColor.withValues(alpha: 0.15)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.lightbulb_outline, color: catColor, size: 18),
                      const SizedBox(width: 6),
                      Text(
                        'مثال في جملة:',
                        style: TextStyle(
                          color: catColor,
                          fontWeight: FontWeight.w800,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  GestureDetector(
                    onTap: () => _speak(phrase.example),
                    child: Text(
                      phrase.example,
                      style: TextStyle(
                        fontSize: 14,
                        color: isDark ? Colors.white70 : Colors.black87,
                        fontStyle: FontStyle.italic,
                        height: 1.5,
                      ),
                      textDirection: TextDirection.ltr,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Speak example button
            Center(
              child: ElevatedButton.icon(
                onPressed: () => _speak(phrase.example),
                icon: const Icon(Icons.record_voice_over, size: 18),
                label: const Text('استمع للمثال 🔊'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: catColor,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
