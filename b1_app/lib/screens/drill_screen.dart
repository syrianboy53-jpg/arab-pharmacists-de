import 'dart:math';
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
  List<Map<String, dynamic>> _drillsPool = [];
  List<Map<String, dynamic>> _roundDrills = [];
  
  int _currentIdx = 0;
  int _lives = 3;
  int _score = 0;
  final int _totalRounds = 10;
  
  int? _selectedAnswer;
  bool _answered = false;

  // Mascot phrases
  final List<String> _correctPhrases = [
    'أنت مذهل! إجابة صحيحة 🦉',
    'عبقري! استمر هكذا 🌟',
    'إجابة دقيقة جداً! ممتاز 💪',
    'عمل رائع! فخور بك 🎓',
    'رائع! سرعتك ممتازة اليوم 🔥'
  ];

  final List<String> _incorrectPhrases = [
    'لا بأس، تعلّم من هذا الخطأ 🦉',
    'ركز جيداً في السؤال القادم ✊',
    'أوه! خطأ بسيط. اقرأ التفسير بالأسفل 💡',
    'لا تقلق، المحاولة التالية ستكون أفضل! 📐',
    'الأخطاء تساعدك على الفهم والترسيخ! 📏'
  ];

  String _currentMascotPhrase = 'اختر الكلمة أو الحرف الصحيح لإكمال الفراغ 🦉';

  @override
  void initState() {
    super.initState();
    _loadDrills();
  }

  void _loadDrills() {
    setState(() {
      _drillsPool = List<Map<String, dynamic>>.from(pruefungsFragen);
      if (_drillsPool.isNotEmpty) {
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
      final tempPool = List<Map<String, dynamic>>.from(_drillsPool)..shuffle(random);
      _roundDrills = tempPool.take(min(_totalRounds, tempPool.length)).toList();
      
      _currentMascotPhrase = 'اختر الكلمة أو الحرف المناسب لإكمال الفراغ! 🦉';
    });
  }

  void _answerQuestion(int index, int correct) {
    if (_answered) return;
    
    final isCorrect = index == correct;
    final random = Random();

    setState(() {
      _selectedAnswer = index;
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

  void _nextQuestion() {
    if (_currentIdx < _roundDrills.length - 1 && _lives > 0) {
      setState(() {
        _currentIdx++;
        _selectedAnswer = null;
        _answered = false;
        _currentMascotPhrase = 'سؤال جديد! هل أنت مستعد؟ 🦉';
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
    
    if (_drillsPool.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('قواعد مكثفة 🧠')),
        body: const Center(child: Text('لا توجد بيانات كافية.')),
      );
    }

    // Victory State
    if (_currentIdx >= _roundDrills.length && _lives > 0) {
      return _buildVictoryScreen(isDark);
    }

    // Game Over State
    if (_lives <= 0) {
      return _buildGameOverScreen(isDark);
    }

    final q = _roundDrills[_currentIdx];
    final options = List<Map<String, dynamic>>.from(q['options'] as List? ?? []);
    final progress = _currentIdx / _totalRounds;

    // Parse correct index
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

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: const Text('تدريب القواعد المكثف 🧠', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
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

          // Game elements
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

                  // Question Card
                  Card(
                    color: isDark ? const Color(0xFF1E293B) : Colors.white,
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
                            style: TextStyle(fontSize: 17, height: 1.5, fontWeight: FontWeight.bold, color: isDark ? Colors.white : const Color(0xFF1E293B)),
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

                    Color borderColor = isDark ? Colors.white10 : Colors.grey[300]!;
                    Color itemBg = isDark ? const Color(0xFF1E293B) : Colors.white;
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
                      } else {
                        itemBg = isDark ? const Color(0xFF1E293B).withValues(alpha: 0.5) : Colors.grey[100]!;
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
          _buildBottomActionPanel(isDark, q, correctIdx, options),
        ],
      ),
    );
  }

  Widget _buildBottomActionPanel(bool isDark, Map<String, dynamic> q, int correctIdx, List<Map<String, dynamic>> options) {
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

    final isCorrect = _selectedAnswer == correctIdx;
    final panelColor = isCorrect
        ? (isDark ? const Color(0xFF064E3B) : const Color(0xFFD1FAE5))
        : (isDark ? const Color(0xFF7F1D1D) : const Color(0xFFFEE2E2));
    
    final textColor = isCorrect
        ? (isDark ? Colors.green[200]! : Colors.green[800]!)
        : (isDark ? Colors.red[200]! : Colors.red[800]!);

    final buttonColor = isCorrect ? const Color(0xFF10B981) : Colors.red;
    final correctOptText = options[correctIdx]['text'] as String? ?? options[correctIdx]['de'] as String? ?? '';

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
            
            // Show correct answer and explanation
            const Text(
              'الإجابة الصحيحة هي:',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.grey),
              textAlign: TextAlign.right,
            ),
            const SizedBox(height: 4),
            Text(
              correctOptText,
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Color(0xFF10B981)),
              textDirection: TextDirection.ltr,
            ),
            
            const SizedBox(height: 8),
            Text(
              '💡 التوضيح: ${q['explanation'] as String? ?? q['explanationAr'] as String? ?? 'تصريف أو قاعدة صحيحة.'}',
              style: TextStyle(fontSize: 13, color: isDark ? Colors.white70 : Colors.black87, height: 1.4),
              textAlign: TextAlign.right,
            ),
            
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
                onPressed: _nextQuestion,
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
                'عمل ممتاز! أنهيت التدريب 🧠',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              Text(
                'لقد أكملت جولة التدريب المكثف للقواعد بنجاح وعززت معلوماتك.',
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
                'لقد خسرت قلوبك الثلاثة في هذا التدريب. حاول مرة أخرى للتغلب على التحدي!',
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
