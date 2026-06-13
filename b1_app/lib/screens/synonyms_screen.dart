import 'dart:math';
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
  List<Map<String, dynamic>> _quizPool = [];
  List<Map<String, dynamic>> _roundItems = [];
  
  int _currentIdx = 0;
  int _lives = 3;
  int _score = 0;
  final int _totalRounds = 10;
  
  List<String> _options = [];
  int? _selectedAnswer;
  bool _answered = false;

  // Mascot phrases
  final List<String> _correctPhrases = [
    'رائع! تطابق مثالي 🦉',
    'أنت لا تُقهر! إجابة صحيحة 🌟',
    'ممتاز! معجمك اللغوي قوي جداً 💪',
    'أحسنت! مرادف دقيق 🎓',
    'إجابة صحيحة! استمر في التقدم 🔥'
  ];

  final List<String> _incorrectPhrases = [
    'أوه! مرادف مختلف. تعلّم منه 🦉',
    'لا تقلق، ركز في الكلمة التالية ✊',
    'خطأ بسيط. اقرأ المثال التوضيحي 💡',
    'المحاولة القادمة ستصيب بالتأكيد! 📐',
    'الألمانيّة مليئة بالمترادفات، استمر في التعلّم! 📏'
  ];

  String _currentMascotPhrase = 'ما هو المرادف الصحيح للكلمة المحددة؟ 🦉';

  @override
  void initState() {
    super.initState();
    _loadQuiz();
  }

  void _loadQuiz() {
    setState(() {
      _quizPool = List<Map<String, dynamic>>.from(synonyms);
      if (_quizPool.isNotEmpty) {
        _startNewGame();
      }
    });
  }

  void _startNewGame() {
    setState(() {
      _lives = 3;
      _score = 0;
      _currentIdx = 0;
      _answered = false;
      _selectedAnswer = null;
      
      final random = Random();
      final tempPool = List<Map<String, dynamic>>.from(_quizPool)..shuffle(random);
      _roundItems = tempPool.take(min(_totalRounds, tempPool.length)).toList();
      
      _currentMascotPhrase = 'ما هو المرادف الصحيح للكلمة المحددة بالأسفل؟ 🦉';
      _initRound();
    });
  }

  void _initRound() {
    final current = _roundItems[_currentIdx];
    final String correct = current['b'] as String;

    // Generate options: correct answer + 3 random b values from other synonyms
    final Set<String> optsSet = {correct};
    final List<Map<String, dynamic>> pool = List<Map<String, dynamic>>.from(synonyms)
      ..removeWhere((item) => item['id'] == current['id']);
    pool.shuffle();

    for (var item in pool) {
      if (optsSet.length >= 4) break;
      optsSet.add(item['b'] as String);
    }

    setState(() {
      _options = optsSet.toList()..shuffle();
      _selectedAnswer = null;
      _answered = false;
    });
  }

  void _selectOption(int idx) {
    if (_answered) return;
    
    final current = _roundItems[_currentIdx];
    final String correct = current['b'] as String;
    final isCorrect = _options[idx] == correct;
    final random = Random();

    setState(() {
      _selectedAnswer = idx;
      _answered = true;
      
      if (isCorrect) {
        _score++;
        _currentMascotPhrase = _correctPhrases[random.nextInt(_correctPhrases.length)];
        context.read<AppProvider>().addXP(5);
      } else {
        _lives--;
        _currentMascotPhrase = _incorrectPhrases[random.nextInt(_incorrectPhrases.length)];
      }
    });
  }

  void _nextRound() {
    if (_currentIdx < _roundItems.length - 1 && _lives > 0) {
      setState(() {
        _currentIdx++;
        _currentMascotPhrase = 'كلمة جديدة! ما هو مرادفها؟ 🦉';
        _initRound();
      });
    } else {
      setState(() {
        _currentIdx++;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    if (_quizPool.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('فخاخ المترادفات 🎮')),
        body: const Center(child: Text('لا توجد بيانات كافية.')),
      );
    }

    // Victory State
    if (_currentIdx >= _roundItems.length && _lives > 0) {
      return _buildVictoryScreen(isDark);
    }

    // Game Over State
    if (_lives <= 0) {
      return _buildGameOverScreen(isDark);
    }

    final current = _roundItems[_currentIdx];
    final String correctWord = current['b'] as String;
    final progress = _currentIdx / _totalRounds;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: const Text('فخاخ المترادفات اللغوية 🎮', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
        backgroundColor: Colors.transparent,
      ),
      body: Column(
        children: [
          // Duolingo status bar
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 8.0),
            child: Row(
              children: [
                Row(
                  children: List.generate(3, (index) {
                    return Icon(
                      Icons.favorite,
                      color: index < _lives ? Colors.red : Colors.grey[400],
                      size: 24,
                    );
                  }),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: LinearProgressIndicator(
                      value: progress,
                      backgroundColor: isDark ? Colors.grey[800] : Colors.grey[300],
                      valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF10B981)),
                      minHeight: 12,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Text(
                  '$_currentIdx/$_totalRounds',
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                ),
              ],
            ),
          ),
          
          const Divider(),

          // Main contents
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Mascot Row
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    textDirection: TextDirection.rtl,
                    children: [
                      Container(
                        width: 55,
                        height: 55,
                        decoration: BoxDecoration(
                          color: const Color(0xFF10B981).withValues(alpha: 0.1),
                          shape: BoxShape.circle,
                          border: Border.all(color: const Color(0xFF10B981).withValues(alpha: 0.3), width: 2),
                        ),
                        child: const Center(
                          child: Text('🦉', style: TextStyle(fontSize: 32)),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: isDark ? const Color(0xFF1E293B) : Colors.white,
                            borderRadius: const BorderRadius.only(
                              topLeft: Radius.circular(16),
                              bottomLeft: Radius.circular(16),
                              bottomRight: Radius.circular(16),
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.05),
                                blurRadius: 6,
                                offset: const Offset(0, 3),
                              )
                            ],
                            border: Border.all(color: isDark ? Colors.white10 : Colors.grey[200]!),
                          ),
                          child: Text(
                            _currentMascotPhrase,
                            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, height: 1.4),
                            textAlign: TextAlign.right,
                          ),
                        ),
                      ),
                    ],
                  ),
                  
                  const SizedBox(height: 24),

                  // Word to Match Card
                  Card(
                    color: isDark ? const Color(0xFF1E293B) : Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text('ما هو مرادف الكلمة التالية؟', style: TextStyle(fontSize: 11, color: Colors.grey)),
                              if (current['level'] != null)
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                  decoration: BoxDecoration(
                                    color: Colors.blue.withValues(alpha: 0.1),
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: Text(
                                    current['level'] as String,
                                    style: const TextStyle(fontSize: 9, color: Colors.blue, fontWeight: FontWeight.bold),
                                  ),
                                ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Text(
                            current['a'] as String,
                            style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                            textDirection: TextDirection.ltr,
                          ),
                          if (current['hintAr'] != null) ...[
                            const SizedBox(height: 8),
                            Text(
                              'المعنى بالعربية: ${current["hintAr"]}',
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

                    Color borderColor = isDark ? Colors.white10 : Colors.grey[300]!;
                    Color itemBg = isDark ? const Color(0xFF1E293B) : Colors.white;
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
                      } else {
                        itemBg = isDark ? const Color(0xFF1E293B).withValues(alpha: 0.5) : Colors.grey[100]!;
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
                                  style: TextStyle(
                                    fontSize: 16, 
                                    fontWeight: FontWeight.bold, 
                                    color: isDark ? Colors.white : const Color(0xFF1E293B)
                                  ),
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
                ],
              ),
            ),
          ),

          // Docked Bottom Panel
          _buildBottomActionPanel(isDark, current, correctWord),
        ],
      ),
    );
  }

  Widget _buildBottomActionPanel(bool isDark, Map<String, dynamic> current, String correctWord) {
    if (!_answered) {
      return Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF0F172A) : Colors.white,
          border: Border(top: BorderSide(color: isDark ? Colors.white10 : Colors.grey[200]!)),
        ),
        child: const SafeArea(
          child: SizedBox(
            height: 50,
            width: double.infinity,
            child: Center(
              child: Text(
                'اختر إجابة للتحقق 🔍',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Colors.grey),
              ),
            ),
          ),
        ),
      );
    }

    final isCorrect = _options[_selectedAnswer!] == correctWord;
    final panelColor = isCorrect
        ? (isDark ? const Color(0xFF064E3B) : const Color(0xFFD1FAE5))
        : (isDark ? const Color(0xFF7F1D1D) : const Color(0xFFFEE2E2));
    
    final textColor = isCorrect
        ? (isDark ? Colors.green[200]! : Colors.green[800]!)
        : (isDark ? Colors.red[200]! : Colors.red[800]!);

    final buttonColor = isCorrect ? const Color(0xFF10B981) : Colors.red;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: panelColor,
        borderRadius: const BorderRadius.only(topLeft: Radius.circular(24), topRight: Radius.circular(24)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 10,
            offset: const Offset(0, -5),
          )
        ],
      ),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              textDirection: TextDirection.rtl,
              children: [
                Icon(
                  isCorrect ? Icons.check_circle : Icons.error,
                  color: isCorrect ? Colors.green : Colors.red,
                  size: 32,
                ),
                const SizedBox(width: 12),
                Text(
                  isCorrect ? 'أحسنت! إجابة صحيحة 🎉 (+5 XP)' : 'أوبس! إجابة خاطئة ❌',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: textColor),
                ),
              ],
            ),
            const SizedBox(height: 12),
            
            // Show correct synonym and example
            const Text(
              'المرادف الصحيح هو:',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.grey),
              textAlign: TextAlign.right,
            ),
            const SizedBox(height: 4),
            Text(
              correctWord,
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Color(0xFF10B981)),
              textDirection: TextDirection.ltr,
            ),
            
            if (current['example'] != null) ...[
              const SizedBox(height: 8),
              const Text(
                '💬 مثال على الاستخدام:',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.grey),
                textAlign: TextAlign.right,
              ),
              const SizedBox(height: 4),
              Text(
                current['example'] as String,
                style: TextStyle(fontSize: 14, color: isDark ? Colors.white70 : Colors.black87, height: 1.4),
                textDirection: TextDirection.ltr,
              ),
            ],
            
            const SizedBox(height: 20),
            
            SizedBox(
              height: 50,
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: buttonColor,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  elevation: 2,
                ),
                onPressed: _nextRound,
                child: const Text('متابعة ➡️', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildVictoryScreen(bool isDark) {
    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text('🏆', style: TextStyle(fontSize: 100), textAlign: TextAlign.center),
              const SizedBox(height: 24),
              const Text(
                'عمل رائع! أكملت التحدي 🎉',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              Text(
                'لقد نجحت في تجاوز فخاخ المترادفات اللغوية وحققت نتيجة ممتازة.',
                style: TextStyle(fontSize: 14, color: isDark ? Colors.white60 : Colors.grey[600]),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 32),
              
              Card(
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                child: Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Column(
                        children: [
                          const Icon(Icons.star, color: Colors.amber, size: 32),
                          const SizedBox(height: 8),
                          Text(
                            '+${_score * 5} XP',
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.amber),
                          ),
                          const Text('نقاط الخبرة', style: TextStyle(fontSize: 11, color: Colors.grey)),
                        ],
                      ),
                      Container(
                        height: 50,
                        width: 1,
                        color: isDark ? Colors.white10 : Colors.grey[300],
                      ),
                      Column(
                        children: [
                          const Icon(Icons.check_circle, color: Color(0xFF10B981), size: 32),
                          const SizedBox(height: 8),
                          Text(
                            '$_score/$_totalRounds',
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Color(0xFF10B981)),
                          ),
                          const Text('الإجابات الصحيحة', style: TextStyle(fontSize: 11, color: Colors.grey)),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              
              const SizedBox(height: 48),
              
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF10B981),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: () => Navigator.of(context).pop(),
                child: const Text('العودة للرئيسية 🏠', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              ),
              const SizedBox(height: 12),
              TextButton(
                onPressed: _startNewGame,
                child: const Text('جولة جديدة 🔄', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Color(0xFF10B981))),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildGameOverScreen(bool isDark) {
    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text('😢', style: TextStyle(fontSize: 100), textAlign: TextAlign.center),
              const SizedBox(height: 24),
              const Text(
                'انتهت المحاولات!',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.red),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              Text(
                'لقد نفدت قلوبك في هذه الجولة. حاول مجدداً لاكتساب المزيد من المترادفات اللغوية!',
                style: TextStyle(fontSize: 14, color: isDark ? Colors.white60 : Colors.grey[600]),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 48),
              
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF10B981),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: _startNewGame,
                child: const Text('إعادة المحاولة 🔄', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              ),
              const SizedBox(height: 12),
              TextButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text('خروج 🏠', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.grey)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
