import 'package:flutter/material.dart';
import '../data/b1_b2_bridge_data.dart';
import 'package:shared_preferences/shared_preferences.dart';

class B1B2BridgeScreen extends StatefulWidget {
  const B1B2BridgeScreen({super.key});
  @override
  State<B1B2BridgeScreen> createState() => _B1B2BridgeScreenState();
}

class _B1B2BridgeScreenState extends State<B1B2BridgeScreen> {
  int _xp = 0;

  @override
  void initState() {
    super.initState();
    _loadXP();
  }

  Future<void> _loadXP() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _xp = prefs.getInt('user_xp') ?? 0;
    });
  }

  void _openQuiz(BuildContext context, Map<String, dynamic> topic) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => BridgeQuizScreen(topic: topic)),
    ).then((_) => _loadXP());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('دورة العبور B1 ➔ B2'),
        centerTitle: true,
        backgroundColor: const Color(0xFF4F46E5),
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF4F46E5), Color(0xFF312E81)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('أهم قواعد الانتقال لمستوى B2', style: TextStyle(color: Colors.white, fontSize: 16)),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(color: Colors.amber, borderRadius: BorderRadius.circular(20)),
                      child: Row(
                        children: [
                          const Icon(Icons.star, color: Colors.white, size: 16),
                          const SizedBox(width: 4),
                          Text('$_xp XP', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: bridgeTopics.length,
                  itemBuilder: (ctx, i) {
                    final topic = bridgeTopics[i];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 16),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      child: InkWell(
                        onTap: () => _openQuiz(context, topic),
                        borderRadius: BorderRadius.circular(16),
                        child: Padding(
                          padding: const EdgeInsets.all(16),
                          child: Row(
                            children: [
                              Container(
                                width: 50,
                                height: 50,
                                alignment: Alignment.center,
                                decoration: BoxDecoration(
                                  color: const Color(0xFF4F46E5).withOpacity(0.1),
                                  shape: BoxShape.circle,
                                ),
                                child: Text(topic['icon'], style: const TextStyle(fontSize: 24)),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(topic['titleAr'], style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                                    Text(topic['titleDe'], style: const TextStyle(color: Colors.grey, fontSize: 14)),
                                    const SizedBox(height: 4),
                                    Text(topic['description'], style: const TextStyle(fontSize: 12, color: Colors.black54)),
                                  ],
                                ),
                              ),
                              const Icon(Icons.chevron_right, color: Colors.grey),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class BridgeQuizScreen extends StatefulWidget {
  final Map<String, dynamic> topic;
  const BridgeQuizScreen({super.key, required this.topic});

  @override
  State<BridgeQuizScreen> createState() => _BridgeQuizScreenState();
}

class _BridgeQuizScreenState extends State<BridgeQuizScreen> {
  int _currentIndex = 0;
  int? _selectedAnswer;
  bool _isAnswered = false;
  int _score = 0;

  Future<void> _addXP(int points) async {
    final prefs = await SharedPreferences.getInstance();
    final current = prefs.getInt('user_xp') ?? 0;
    await prefs.setInt('user_xp', current + points);
  }

  void _submitAnswer(int index) {
    if (_isAnswered) return;
    setState(() {
      _selectedAnswer = index;
      _isAnswered = true;
    });

    final q = widget.topic['questions'][_currentIndex];
    if (index == q['correctIndex']) {
      _score++;
      _addXP(10);
    }
  }

  void _nextQuestion() {
    if (_currentIndex < (widget.topic['questions'] as List).length - 1) {
      setState(() {
        _currentIndex++;
        _isAnswered = false;
        _selectedAnswer = null;
      });
    } else {
      _showResult();
    }
  }

  void _showResult() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        title: const Text('🎉 اكتمل التدريب!'),
        content: Text('أجبت بشكل صحيح على $_score من أصل ${(widget.topic['questions'] as List).length}.\nكسبت: ${_score * 10} XP'),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              Navigator.pop(context);
            },
            child: const Text('عودة'),
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final questions = widget.topic['questions'] as List;
    final q = questions[_currentIndex];

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.topic['titleAr']),
        backgroundColor: const Color(0xFF4F46E5),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            LinearProgressIndicator(
              value: (_currentIndex + 1) / questions.length,
              backgroundColor: Colors.grey[300],
              color: const Color(0xFF4F46E5),
            ),
            const SizedBox(height: 24),
            Text(
              'السؤال ${_currentIndex + 1} / ${questions.length}',
              style: const TextStyle(color: Colors.grey, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, spreadRadius: 2),
                ],
              ),
              child: Text(
                q['q'],
                style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
                textDirection: TextDirection.ltr,
              ),
            ),
            const SizedBox(height: 24),
            ...(q['options'] as List).asMap().entries.map((entry) {
              final idx = entry.key;
              final text = entry.value;

              Color bgColor = Colors.white;
              Color borderColor = Colors.grey[300]!;
              Color textColor = Colors.black87;

              if (_isAnswered) {
                if (idx == q['correctIndex']) {
                  bgColor = Colors.green[100]!;
                  borderColor = Colors.green;
                  textColor = Colors.green[800]!;
                } else if (idx == _selectedAnswer) {
                  bgColor = Colors.red[100]!;
                  borderColor = Colors.red;
                  textColor = Colors.red[800]!;
                }
              }

              return Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: InkWell(
                  onTap: () => _submitAnswer(idx),
                  borderRadius: BorderRadius.circular(12),
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: bgColor,
                      border: Border.all(color: borderColor, width: 2),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      text,
                      style: TextStyle(fontSize: 18, color: textColor, fontWeight: FontWeight.bold),
                      textAlign: TextAlign.center,
                      textDirection: TextDirection.ltr,
                    ),
                  ),
                ),
              );
            }).toList(),
            if (_isAnswered) ...[
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: Colors.blue[50], borderRadius: BorderRadius.circular(8)),
                child: Row(
                  children: [
                    const Icon(Icons.info, color: Colors.blue),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        q['explanation'],
                        style: TextStyle(color: Colors.blue[900], fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
              ),
              const Spacer(),
              ElevatedButton(
                onPressed: _nextQuestion,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF4F46E5),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text('التالي', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              ),
            ] else const Spacer(),
          ],
        ),
      ),
    );
  }
}
