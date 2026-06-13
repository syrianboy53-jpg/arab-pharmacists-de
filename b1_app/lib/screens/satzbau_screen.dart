import 'dart:math';
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
  List<Map<String, dynamic>> _sentences = [];
  List<Map<String, dynamic>> _roundSentences = [];
  
  int _currentIdx = 0;
  int _lives = 3;
  int _score = 0;
  final int _totalRounds = 10;
  
  List<String> _shuffledWords = [];
  List<String> _userWords = [];
  
  bool _answered = false;
  bool? _isCorrect;
  
  // Mascot phrases
  final List<String> _correctPhrases = [
    'مذهل! عمل رائع 🦉',
    'أنت بطل! إجابة صحيحة 🌟',
    'ممتاز! استمر هكذا 💪',
    'عبقري! إجابة دقيقة 🎓',
    'رائع جداً! أداء متقن 🔥'
  ];

  final List<String> _incorrectPhrases = [
    'لا بأس، تعلّم من الأخطاء 🦉',
    'لا تستسلم، حاول التركيز أكثر ✊',
    'خطأ بسيط، ستقوم بها في المرة القادمة! 📐',
    'أوه! انتبه لترتيب الأفعال (موقع 2) 📏',
    'ابذل جهدك، المحاولة القادمة أفضل! 💡'
  ];

  String _currentMascotPhrase = 'مرحباً بك! دعنا نركب هذه الجملة معاً 🦉';

  @override
  void initState() {
    super.initState();
    _loadSentences();
  }

  void _loadSentences() {
    _sentences = [];
    
    // 1. Load from satzbau list
    try {
      for (var item in satzbau) {
        final tokens = List<String>.from(item['tokens'] as List? ?? []);
        if (tokens.isNotEmpty) {
          _sentences.add({
            'right': tokens.join(' '),
            'ar': item['ar'] as String? ?? '',
            'explain': item['tipAr'] as String? ?? '',
          });
        }
      }
    } catch (e) {
      debugPrint('Error loading satzbau list: $e');
    }

    // 2. Load from commonMistakes
    try {
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
    } catch (e) {
      debugPrint('Error loading commonMistakes: $e');
    }

    if (_sentences.isNotEmpty) {
      _startNewGame();
    }
  }

  void _startNewGame() {
    setState(() {
      _lives = 3;
      _score = 0;
      _currentIdx = 0;
      _answered = false;
      _isCorrect = null;
      
      // Select 10 random sentences for this round
      final random = Random();
      final tempPool = List<Map<String, dynamic>>.from(_sentences)..shuffle(random);
      _roundSentences = tempPool.take(min(_totalRounds, tempPool.length)).toList();
      
      _currentMascotPhrase = 'رتب الكلمات لتصيغ الجملة الألمانية بشكل صحيح! 🦉';
      _initRound();
    });
  }

  void _initRound() {
    final right = _roundSentences[_currentIdx]['right'] as String;
    
    // Split into words and filter empty strings
    final words = right.split(RegExp(r'\s+')).where((w) => w.isNotEmpty).toList();
    
    setState(() {
      _shuffledWords = List<String>.from(words)..shuffle();
      _userWords = [];
      _isCorrect = null;
      _answered = false;
    });
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
    final right = _roundSentences[_currentIdx]['right'] as String;
    final userSentence = _userWords.join(' ');
    
    final cleanedRight = right.replaceAll(RegExp(r'\s+'), ' ').trim();
    final cleanedUser = userSentence.trim();
    
    final isCorrect = cleanedRight == cleanedUser;
    final random = Random();

    setState(() {
      _answered = true;
      _isCorrect = isCorrect;
      
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
    if (_currentIdx < _roundSentences.length - 1 && _lives > 0) {
      setState(() {
        _currentIdx++;
        _currentMascotPhrase = 'جملة جديدة! دعنا نركبها معاً 🦉';
        _initRound();
      });
    } else {
      // Handled in build: show victory or game over screen
      setState(() {
        _currentIdx++;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    if (_sentences.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('بناء الجمل 🧩')),
        body: const Center(child: Text('لا توجد بيانات كافية.')),
      );
    }

    // Victory State
    if (_currentIdx >= _roundSentences.length && _lives > 0) {
      return _buildVictoryScreen(isDark);
    }

    // Game Over State
    if (_lives <= 0) {
      return _buildGameOverScreen(isDark);
    }

    final current = _roundSentences[_currentIdx];
    final progress = (_currentIdx) / _totalRounds;
    final canCheck = _userWords.isNotEmpty;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: const Text('تدريب بناء الجمل 🧩', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
        backgroundColor: Colors.transparent,
      ),
      body: Column(
        children: [
          // Duolingo-like Top Header (Progress + Hearts)
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 8.0),
            child: Row(
              children: [
                // Hearts (Lives)
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
                // Progress Bar
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

          // Main Game Area (Scrollable to fit keys)
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Mascot Owl & Speech Bubble Row
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    textDirection: TextDirection.rtl,
                    children: [
                      // Mascot Avatar
                      Container(
                        width: 55,
                        height: 55,
                        decoration: BoxDecoration(
                          color: const Color(0xFF10B981).withValues(alpha: 0.1),
                          shape: BoxShape.circle,
                          border: Border.all(color: const Color(0xFF10B981).withValues(alpha: 0.3), width: 2),
                        ),
                        child: const Center(
                          child: Text(
                            '🦉',
                            style: TextStyle(fontSize: 32),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      // Speech Bubble
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
                            border: Border.all(
                              color: isDark ? Colors.white10 : Colors.grey[200]!,
                            ),
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

                  // Prompt text in Arabic
                  const Text(
                    'رتب الكلمات لترجمة الجملة التالية:',
                    style: TextStyle(fontSize: 12, color: Colors.grey, fontWeight: FontWeight.bold),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    current['ar'],
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),

                  // Workspace (Assembled Words)
                  DragTarget<String>(
                    onAcceptWithDetails: (details) {
                      if (_shuffledWords.contains(details.data)) {
                        _selectWord(details.data);
                      }
                    },
                    builder: (context, candidateData, rejectedData) {
                      return Container(
                        constraints: const BoxConstraints(minHeight: 120),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF1E293B) : Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: _answered
                                ? (_isCorrect! ? Colors.green : Colors.red)
                                : (candidateData.isNotEmpty ? const Color(0xFF10B981) : (isDark ? Colors.white10 : Colors.grey[300]!)),
                            width: candidateData.isNotEmpty ? 3.0 : 2.5,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.02),
                              blurRadius: 10,
                              offset: const Offset(0, 5),
                            )
                          ],
                        ),
                        child: _userWords.isEmpty
                            ? Center(
                                child: Text(
                                  'اضغط أو اسحب الكلمات إلى هنا',
                                  style: TextStyle(color: Colors.grey[400], fontSize: 13),
                                ),
                              )
                            : Wrap(
                                spacing: 8,
                                runSpacing: 8,
                                children: _userWords.map((word) {
                                  return _buildDraggableChip(
                                    word: word,
                                    isDark: isDark,
                                    isWorkspace: true,
                                    onTap: () => _deselectWord(word),
                                  );
                                }).toList(),
                              ),
                      );
                    },
                  ),

                  const SizedBox(height: 24),

                  // Available Words Pool
                  const Text(
                    'الكلمات المتاحة:',
                    style: TextStyle(fontSize: 12, color: Colors.grey, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  DragTarget<String>(
                    onAcceptWithDetails: (details) {
                      if (_userWords.contains(details.data)) {
                        _deselectWord(details.data);
                      }
                    },
                    builder: (context, candidateData, rejectedData) {
                      return Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF1E293B).withValues(alpha: 0.4) : Colors.grey[100],
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: candidateData.isNotEmpty ? const Color(0xFF10B981) : (isDark ? Colors.white10 : Colors.transparent),
                            width: candidateData.isNotEmpty ? 2.0 : 1.0,
                          ),
                        ),
                        child: _shuffledWords.isEmpty && _userWords.isEmpty
                            ? const SizedBox(height: 60)
                            : Wrap(
                                spacing: 8,
                                runSpacing: 8,
                                alignment: WrapAlignment.center,
                                children: _shuffledWords.map((word) {
                                  return _buildDraggableChip(
                                    word: word,
                                    isDark: isDark,
                                    isWorkspace: false,
                                    onTap: () => _selectWord(word),
                                  );
                                }).toList(),
                              ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),

          // Docked Bottom Panel (Duolingo-style)
          _buildBottomActionPanel(isDark, canCheck, current),
        ],
      ),
    );
  }

  Widget _buildBottomActionPanel(bool isDark, bool canCheck, Map<String, dynamic> current) {
    if (!_answered) {
      return Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF0F172A) : Colors.white,
          border: Border(top: BorderSide(color: isDark ? Colors.white10 : Colors.grey[200]!)),
        ),
        child: SafeArea(
          child: SizedBox(
            height: 50,
            width: double.infinity,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF10B981),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                disabledBackgroundColor: isDark ? Colors.grey[800] : Colors.grey[300],
                elevation: 2,
              ),
              onPressed: canCheck ? _checkAnswer : null,
              child: const Text('تحقق من صحة الإجابة 🔍', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            ),
          ),
        ),
      );
    }

    // Answered state: Green or Red panel sliding up
    final isCorrect = _isCorrect ?? false;
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
            
            // Show the correct answer
            const Text(
              'الجملة الصحيحة:',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.grey),
              textAlign: TextAlign.right,
            ),
            const SizedBox(height: 4),
            Text(
              current['right'],
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              textDirection: TextDirection.ltr,
              textAlign: TextAlign.left,
            ),
            
            if (!isCorrect && current['explain'].isNotEmpty) ...[
              const SizedBox(height: 8),
              Text(
                '💡 قاعدة: ${current["explain"]}',
                style: TextStyle(fontSize: 13, color: isDark ? Colors.white70 : Colors.black87, height: 1.4),
                textAlign: TextAlign.right,
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
              const Text(
                '🏆',
                style: TextStyle(fontSize: 100),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),
              const Text(
                'تهانينا! أكملت الجولة 🎉',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              Text(
                'لقد ركبت الجمل الألمانية بنجاح وتجاوزت التحدي.',
                style: TextStyle(fontSize: 14, color: isDark ? Colors.white60 : Colors.grey[600]),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 32),
              
              // Score details card
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
              const Text(
                '😢',
                style: TextStyle(fontSize: 100),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),
              const Text(
                'انتهت المحاولات!',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.red),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              Text(
                'نفدت قلوبك في هذه الجولة. لا تستسلم! الأخطاء هي أفضل طريقة للتعلّم.',
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
  Widget _buildDraggableChip({
    required String word,
    required bool isDark,
    required bool isWorkspace,
    required VoidCallback onTap,
  }) {
    final chip = ActionChip(
      backgroundColor: isWorkspace 
          ? const Color(0xFF10B981).withValues(alpha: 0.1) 
          : (isDark ? const Color(0xFF1E293B) : Colors.white),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
        side: BorderSide(
          color: isWorkspace 
              ? const Color(0xFF10B981) 
              : (isDark ? Colors.white10 : Colors.grey[300]!), 
          width: 1.5
        ),
      ),
      label: Text(
        word,
        style: TextStyle(
          color: isDark ? Colors.white : const Color(0xFF1E293B),
          fontWeight: FontWeight.bold,
          fontSize: 15,
        ),
        textDirection: TextDirection.ltr,
      ),
      onPressed: onTap,
    );

    return Draggable<String>(
      data: word,
      feedback: Material(
        color: Colors.transparent,
        child: Opacity(opacity: 0.8, child: chip),
      ),
      childWhenDragging: Opacity(
        opacity: 0.3,
        child: chip,
      ),
      child: chip,
    );
  }
}
