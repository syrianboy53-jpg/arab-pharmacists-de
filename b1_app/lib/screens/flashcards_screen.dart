import 'dart:math';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:confetti/confetti.dart';
import '../data/vocab_data.dart';
import '../providers/app_provider.dart';

class FlashcardsCategoryScreen extends StatelessWidget {
  const FlashcardsCategoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('بطاقات الذاكرة (Flashcards)'),
        backgroundColor: const Color(0xFF166534),
        foregroundColor: Colors.white,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: vocabCategories.length,
        itemBuilder: (context, index) {
          final cat = vocabCategories[index];
          final wordsCount = (cat['words'] as List).length;
          return Card(
            elevation: 2,
            margin: const EdgeInsets.only(bottom: 12),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: ListTile(
              contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              leading: Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: const Color(0xFFECFDF5),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(Icons.style, color: Color(0xFF059669)),
              ),
              title: Text(
                cat['titleAr'],
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
              subtitle: Text(
                '${cat['titleDe']} • $wordsCount كلمة',
                style: const TextStyle(color: Colors.grey),
              ),
              trailing: const Icon(Icons.arrow_forward_ios, color: Colors.grey, size: 20),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => FlashcardsPlayScreen(category: cat),
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}

class FlashcardsPlayScreen extends StatefulWidget {
  final Map<String, dynamic> category;

  const FlashcardsPlayScreen({super.key, required this.category});

  @override
  State<FlashcardsPlayScreen> createState() => _FlashcardsPlayScreenState();
}

class _FlashcardsPlayScreenState extends State<FlashcardsPlayScreen> {
  late List<Map<String, dynamic>> _activeDeck;
  late int _totalCards;
  int _currentIndex = 0;
  bool _isFlipped = false;
  late ConfettiController _confettiController;

  @override
  void initState() {
    super.initState();
    // Copy the words to an active deck
    _activeDeck = List<Map<String, dynamic>>.from(widget.category['words']);
    _activeDeck.shuffle();
    _totalCards = _activeDeck.length;
    _confettiController = ConfettiController(duration: const Duration(seconds: 2));
  }

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  void _markKnown() {
    setState(() {
      _activeDeck.removeAt(_currentIndex);
      _isFlipped = false;
      if (_activeDeck.isNotEmpty) {
        if (_currentIndex >= _activeDeck.length) {
          _currentIndex = 0;
        }
      } else {
        // Deck finished!
        _confettiController.play();
      }
    });
  }

  void _markNeedPractice() {
    setState(() {
      _currentIndex++;
      _isFlipped = false;
      if (_currentIndex >= _activeDeck.length) {
        _currentIndex = 0;
      }
    });
  }

  void _flipCard() {
    setState(() {
      _isFlipped = !_isFlipped;
    });
  }

  Widget _buildFinishedView() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ConfettiWidget(
            confettiController: _confettiController,
            blastDirectionality: BlastDirectionality.explosive,
            shouldLoop: false,
            colors: const [Colors.green, Colors.blue, Colors.orange, Colors.purple],
          ),
          const Icon(Icons.emoji_events, size: 100, color: Colors.amber),
          const SizedBox(height: 24),
          const Text(
            'عمل رائع! 🎉',
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Color(0xFF166534)),
          ),
          const SizedBox(height: 12),
          const Text(
            'لقد حفظت جميع كلمات هذه المجموعة.',
            style: TextStyle(fontSize: 16, color: Colors.grey),
          ),
          const SizedBox(height: 32),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF166534),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            child: const Text('العودة للمجموعات', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_activeDeck.isEmpty) {
      return Scaffold(
        backgroundColor: const Color(0xFFF8FAFC),
        appBar: AppBar(
          title: Text(widget.category['titleAr']),
          backgroundColor: const Color(0xFF166534),
          foregroundColor: Colors.white,
        ),
        body: _buildFinishedView(),
      );
    }

    final currentCard = _activeDeck[_currentIndex];
    final progress = (_totalCards - _activeDeck.length) / _totalCards;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: Text('${_totalCards - _activeDeck.length} / $_totalCards'),
        backgroundColor: const Color(0xFF166534),
        foregroundColor: Colors.white,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(6),
          child: LinearProgressIndicator(
            value: progress,
            backgroundColor: Colors.white24,
            valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF34D399)),
          ),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 32),
            Expanded(
              child: GestureDetector(
                onTap: _flipCard,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: AnimatedSwitcher(
                    duration: const Duration(milliseconds: 400),
                    transitionBuilder: (Widget child, Animation<double> animation) {
                      final rotateAnim = Tween(begin: pi, end: 0.0).animate(animation);
                      return AnimatedBuilder(
                        animation: rotateAnim,
                        child: child,
                        builder: (context, widget) {
                          final isUnder = (ValueKey(_isFlipped) != widget?.key);
                          var tilt = ((animation.value - 0.5).abs() - 0.5) * 0.003;
                          tilt *= isUnder ? -1.0 : 1.0;
                          final value = isUnder ? min(rotateAnim.value, pi / 2) : rotateAnim.value;
                          return Transform(
                            transform: Matrix4.rotationY(value)..setEntry(3, 0, tilt),
                            alignment: Alignment.center,
                            child: widget,
                          );
                        },
                      );
                    },
                    child: _isFlipped ? _buildBackSide(currentCard) : _buildFrontSide(currentCard),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 32),
            if (_isFlipped)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
                child: Row(
                  children: [
                    Expanded(
                      child: ElevatedButton.icon(
                        onPressed: _markNeedPractice,
                        icon: const Icon(Icons.refresh),
                        label: const Text('أحتاج تدريب'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.orange.shade50,
                          foregroundColor: Colors.orange.shade800,
                          padding: const EdgeInsets.symmetric(vertical: 20),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          elevation: 0,
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: ElevatedButton.icon(
                        onPressed: _markKnown,
                        icon: const Icon(Icons.check),
                        label: const Text('حفظتها'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF166534),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 20),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          elevation: 2,
                        ),
                      ),
                    ),
                  ],
                ),
              )
            else
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 40),
                child: Text(
                  'اضغط على البطاقة لقلبها',
                  style: TextStyle(color: Colors.grey.shade500, fontSize: 16),
                ),
              )
          ],
        ),
      ),
    );
  }

  Widget _buildFrontSide(Map<String, dynamic> card) {
    return Container(
      key: const ValueKey(false),
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 15,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                card['de'],
                style: const TextStyle(fontSize: 36, fontWeight: FontWeight.bold, color: Color(0xFF1F2937)),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: Colors.grey.shade100,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Text('ألماني', style: TextStyle(color: Colors.grey)),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBackSide(Map<String, dynamic> card) {
    return Container(
      key: const ValueKey(true),
      width: double.infinity,
      decoration: BoxDecoration(
        color: const Color(0xFFECFDF5),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFF34D399), width: 2),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF34D399).withValues(alpha: 0.2),
            blurRadius: 15,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                card['ar'],
                style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Color(0xFF065F46)),
                textAlign: TextAlign.center,
              ),
              if (card['example'] != null) ...[
                const SizedBox(height: 32),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    children: [
                      const Text(
                        'مثال:',
                        style: TextStyle(fontSize: 14, color: Colors.grey, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        card['example'],
                        style: const TextStyle(fontSize: 18, color: Color(0xFF1F2937), fontStyle: FontStyle.italic),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ]
            ],
          ),
        ),
      ),
    );
  }
}
