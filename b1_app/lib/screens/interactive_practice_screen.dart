import 'dart:math';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../data/grammatik_data.dart';
import '../data/vocab_data.dart';
import 'conjugation_trainer_screen.dart';
import 'synonyms_screen.dart';
import 'drill_screen.dart';
import 'fehler_screen.dart';
import 'chat_simulator_screen.dart';
import 'einstufung_screen.dart';

class InteractivePracticeScreen extends StatefulWidget {
  const InteractivePracticeScreen({super.key});

  @override
  State<InteractivePracticeScreen> createState() => _InteractivePracticeScreenState();
}

class _InteractivePracticeScreenState extends State<InteractivePracticeScreen> {
  // Current game state
  String _activeMode = 'MENU'; // 'MENU', 'GRAMMAR_SELECT', 'VOCAB_SELECT', 'QUIZ_GAME', 'SATZBAU_GAME'
  
  // Game variables
  List<Map<String, dynamic>> _gameQuestions = [];
  int _currentQuestionIndex = 0;
  int _lives = 3;
  int _score = 0;
  bool _answered = false;
  int? _selectedAnswerIndex;
  int _correctAnswerIndex = 0;
  String _explanationText = '';
  
  // Sentence Builder variables
  List<String> _sentenceTokens = [];
  List<String> _userTokens = [];
  List<String> _scrambledTokens = [];
  String _sentenceSolution = '';
  String _sentenceTranslation = '';
  bool _sentenceChecked = false;
  bool? _sentenceIsCorrect;

  // Mascot quotes
  final List<String> _successQuotes = [
    'أنت مذهل! إجابة صحيحة 🦉',
    'عبقري! استمر هكذا 🌟',
    'إجابة دقيقة جداً! ممتاز 💪',
    'عمل رائع! فخور بك 🎓',
    'رائع! سرعتك ممتازة اليوم 🔥'
  ];

  final List<String> _failQuotes = [
    'لا بأس، تعلّم من هذا الخطأ 🦉',
    'ركز جيداً في السؤال القادم ✊',
    'أوه! خطأ بسيط. اقرأ التفسير بالأسفل 💡',
    'لا تقلق، المحاولة التالية ستكون أفضل! 📐',
    'الأخطاء تساعدك على الفهم والترسيخ! 📏'
  ];

  String _mascotQuote = 'اختر الإجابة الصحيحة لتكسب النقاط! 🦉';

  void _backToMenu() {
    setState(() {
      _activeMode = 'MENU';
    });
  }

  // --- GRAMMAR GAME STARTER ---
  void _startGrammarQuiz(int? lessonId) {
    List<Map<String, dynamic>> questions = [];
    final random = Random();

    if (lessonId == null) {
      // Random Mix from all lessons
      List<Map<String, dynamic>> allQuestions = [];
      for (var lesson in grammarLessons) {
        final exercises = List<Map<String, dynamic>>.from(lesson['exercises'] as List? ?? []);
        for (var ex in exercises) {
          allQuestions.add({
            'question': ex['question'],
            'options': List<String>.from(ex['options'] as List? ?? []),
            'correct': ex['correct'] as int? ?? 0,
            'explanation': 'من درس: ${lesson['title']}',
          });
        }
      }
      allQuestions.shuffle(random);
      questions = allQuestions.take(10).toList();
    } else {
      // Specific lesson
      final lesson = grammarLessons.firstWhere((l) => l['id'] == lessonId);
      final exercises = List<Map<String, dynamic>>.from(lesson['exercises'] as List? ?? []);
      for (var ex in exercises) {
        questions.add({
          'question': ex['question'],
          'options': List<String>.from(ex['options'] as List? ?? []),
          'correct': ex['correct'] as int? ?? 0,
          'explanation': lesson['titleAr'] as String? ?? 'تمرين القواعد والترسيخ.',
        });
      }
    }

    if (questions.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('عذراً، لا توجد أسئلة كافية في هذا القسم!')),
      );
      return;
    }

    setState(() {
      _gameQuestions = questions;
      _currentQuestionIndex = 0;
      _lives = 3;
      _score = 0;
      _answered = false;
      _selectedAnswerIndex = null;
      _activeMode = 'QUIZ_GAME';
      _mascotQuote = 'هيا بنا! أثبت مهارتك في القواعد الألمانية! 🦉';
    });
  }

  // --- VOCABULARY GAME STARTER ---
  void _startVocabQuiz(String? categoryId) {
    List<Map<String, dynamic>> questions = [];
    final random = Random();
    
    // Extract words
    List<Map<String, dynamic>> poolWords = [];
    if (categoryId == null) {
      // Random from all categories
      for (var cat in vocabCategories) {
        final wordsList = List<Map<String, dynamic>>.from(cat['words'] as List? ?? []);
        poolWords.addAll(wordsList);
      }
    } else {
      // Specific category
      final cat = vocabCategories.firstWhere((c) => c['id'] == categoryId);
      poolWords = List<Map<String, dynamic>>.from(cat['words'] as List? ?? []);
    }

    if (poolWords.length < 4) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('عذراً، تحتاج الفئة إلى 4 كلمات على الأقل لبدء التدريب!')),
      );
      return;
    }

    poolWords.shuffle(random);
    final selectedWords = poolWords.take(10).toList();

    for (var word in selectedWords) {
      final String german = word['de'] ?? '';
      final String arabic = word['ar'] ?? '';
      final String example = word['example'] ?? 'لا يوجد مثال متاح.';

      // Determine question type: 0 = German to Arabic, 1 = Arabic to German
      final int qType = random.nextInt(2);
      
      List<String> options = [];
      int correctIdx = 0;

      if (qType == 0) {
        options.add(arabic);
        // Add 3 incorrect Arabic answers
        List<Map<String, dynamic>> distractors = List.from(poolWords)..remove(word);
        distractors.shuffle(random);
        for (var d in distractors.take(3)) {
          options.add(d['ar'] ?? '');
        }
        options.shuffle(random);
        correctIdx = options.indexOf(arabic);
      } else {
        options.add(german);
        // Add 3 incorrect German answers
        List<Map<String, dynamic>> distractors = List.from(poolWords)..remove(word);
        distractors.shuffle(random);
        for (var d in distractors.take(3)) {
          options.add(d['de'] ?? '');
        }
        options.shuffle(random);
        correctIdx = options.indexOf(german);
      }

      questions.add({
        'question': qType == 0 ? 'ما معنى الكلمة التالية؟\n\n$german' : 'كيف نقول العبارة التالية بالألمانية؟\n\n$arabic',
        'options': options,
        'correct': correctIdx,
        'explanation': 'المثال: $example',
      });
    }

    setState(() {
      _gameQuestions = questions;
      _currentQuestionIndex = 0;
      _lives = 3;
      _score = 0;
      _answered = false;
      _selectedAnswerIndex = null;
      _activeMode = 'QUIZ_GAME';
      _mascotQuote = 'المفردات هي مفتاح التحدث بطلاقة! ركز جيداً 🦉';
    });
  }

  // --- SATZBAU (SENTENCE BUILDER) GAME STARTER ---
  void _startSatzbauGame() {
    if (satzbau.isEmpty) return;
    
    final random = Random();
    final item = satzbau[random.nextInt(satzbau.length)];
    
    final tokens = List<String>.from(item['tokens'] as List? ?? []);
    final translation = item['ar'] as String? ?? '';
    final solution = tokens.join(' ');

    setState(() {
      _sentenceTokens = tokens;
      _userTokens = [];
      _scrambledTokens = List<String>.from(tokens)..shuffle(random);
      _sentenceTranslation = translation;
      _sentenceSolution = solution;
      _sentenceChecked = false;
      _sentenceIsCorrect = null;
      _activeMode = 'SATZBAU_GAME';
      _mascotQuote = 'رتّب الكلمات المبعثرة لتكوين جملة ألمانية صحيحة قواعدياً! 🦉';
    });
  }

  // --- ANSWER QUIZ ---
  void _submitQuizAnswer(int index) {
    if (_answered) return;
    
    final q = _gameQuestions[_currentQuestionIndex];
    final correctIdx = q['correct'] as int;
    final isCorrect = index == correctIdx;
    final random = Random();

    setState(() {
      _selectedAnswerIndex = index;
      _correctAnswerIndex = correctIdx;
      _answered = true;
      _explanationText = q['explanation'] ?? '';

      if (isCorrect) {
        _score++;
        _mascotQuote = _successQuotes[random.nextInt(_successQuotes.length)];
        context.read<AppProvider>().addXP(5);
      } else {
        _lives--;
        _mascotQuote = _failQuotes[random.nextInt(_failQuotes.length)];
      }
    });
  }

  // --- NEXT QUIZ QUESTION ---
  void _nextQuizQuestion() {
    if (_currentQuestionIndex < _gameQuestions.length - 1 && _lives > 0) {
      setState(() {
        _currentQuestionIndex++;
        _selectedAnswerIndex = null;
        _answered = false;
        _mascotQuote = 'استعد للسؤال القادم! ركز جيداً 🦉';
      });
    } else {
      // Game ended
      setState(() {
        _currentQuestionIndex++;
      });
      // Increment completed quizzes
      context.read<AppProvider>().incrementQuizzes();
    }
  }

  // --- CHECK SENTENCE BUILDER ---
  void _checkSentence() {
    if (_userTokens.length < _sentenceTokens.length) return;
    
    final userStr = _userTokens.join(' ');
    final isCorrect = userStr == _sentenceSolution;

    setState(() {
      _sentenceIsCorrect = isCorrect;
      _sentenceChecked = true;
      if (isCorrect) {
        _score = 1; // Completed sentence
        _mascotQuote = 'رائع جداً! تركيب سليم 100% 🎉';
        context.read<AppProvider>().addXP(10);
      } else {
        _lives = 0; // Trigger fail UI
        _mascotQuote = 'الترتيب خاطئ! انظر إلى الترتيب الصحيح بالأسفل 🦉';
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF080D1A) : const Color(0xFFF1F5F9),
      body: Stack(
        children: [
          // Background Glows
          if (isDark) ...[
            Positioned(
              top: -80,
              right: -80,
              child: Container(
                width: 250,
                height: 250,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(color: const Color(0xFF0D9488).withOpacity(0.15), blurRadius: 120, spreadRadius: 20),
                  ],
                ),
              ),
            ),
            Positioned(
              bottom: -60,
              left: -60,
              child: Container(
                width: 260,
                height: 260,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(color: const Color(0xFF4F46E5).withOpacity(0.12), blurRadius: 130, spreadRadius: 30),
                  ],
                ),
              ),
            ),
          ],
          
          SafeArea(
            child: _buildCurrentView(isDark),
          ),
        ],
      ),
    );
  }

  Widget _buildCurrentView(bool isDark) {
    switch (_activeMode) {
      case 'MENU':
        return _buildPracticeMenu(isDark);
      case 'GRAMMAR_SELECT':
        return _buildGrammarSelection(isDark);
      case 'VOCAB_SELECT':
        return _buildVocabSelection(isDark);
      case 'QUIZ_GAME':
        return _buildQuizGame(isDark);
      case 'SATZBAU_GAME':
        return _buildSatzbauGameScreen(isDark);
      default:
        return _buildPracticeMenu(isDark);
    }
  }

  // ==================== VIEW 1: PRACTICE MENU ====================
  Widget _buildPracticeMenu(bool isDark) {
    final textMain = isDark ? Colors.white : const Color(0xFF0F172A);
    final textMuted = isDark ? Colors.white70 : const Color(0xFF475569);
    
    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 12),
                Text(
                  'مركز التدريب التفاعلي 🎮',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: textMain),
                ),
                const SizedBox(height: 6),
                Text(
                  'تدرّب بطريقة Duolingo الممتعة مع قلوب ومكافآت يومية!',
                  style: TextStyle(fontSize: 13, color: textMuted),
                ),
                const SizedBox(height: 24),
                
                // Streak Banner
                _buildMenuStreakCard(isDark),
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
        
        SliverPadding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          sliver: SliverGrid(
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 1,
              mainAxisSpacing: 16,
              childAspectRatio: 2.1,
            ),
            delegate: SliverChildListDelegate([
              _buildPracticeHubCard(
                'تدريب القواعد 🧠',
                'اختبر معلوماتك في 18 مستوى متدرج من القواعد المهمة للامتحان.',
                Icons.psychology,
                const Color(0xFF4F46E5),
                () => setState(() => _activeMode = 'GRAMMAR_SELECT'),
                isDark,
              ),
              _buildPracticeHubCard(
                'تحدي المفردات 🔤',
                'أجب على الأسئلة التفاعلية لترسيخ الكلمات ومرادفات المستويات.',
                Icons.translate,
                const Color(0xFF0D9488),
                () => setState(() => _activeMode = 'VOCAB_SELECT'),
                isDark,
              ),
              _buildPracticeHubCard(
                'بناء الجمل (Satzbau) 🔗',
                'تمرين ممتع لتركيب الكلمات المبعثرة لبناء جمل قواعدية سليمة.',
                Icons.extension,
                const Color(0xFFD97706),
                _startSatzbauGame,
                isDark,
              ),
              _buildPracticeHubCard(
                'مدرّب التصريف 🔁',
                'تحدي تصريف الأفعال الشاذة والناقصة والمساعدة في الأزمنة المختلفة.',
                Icons.autorenew,
                const Color(0xFFDC2626),
                () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const ConjugationTrainerScreen()),
                  );
                },
                isDark,
              ),
              _buildPracticeHubCard(
                'فخاخ المترادفات 🔀',
                'لعبة تفاعلية لمطابقة 90 زوجاً من المرادفات المهمة لمستويات اللغة.',
                Icons.compare_arrows,
                const Color(0xFF059669),
                () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const SynonymsScreen()),
                  );
                },
                isDark,
              ),
              _buildPracticeHubCard(
                'الأسئلة المكثّفة (Drill) ⚡',
                'أجب عن 220 سؤال قواعد واختبارات لغوية شاملة للامتحان.',
                Icons.offline_bolt,
                const Color(0xFFDB2777),
                () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const DrillScreen()),
                  );
                },
                isDark,
              ),
              _buildPracticeHubCard(
                'الأخطاء الشائعة ⚠️',
                'تعلّم كيفية تجنب 30 من الأخطاء القواعدية الأكثر شيوعاً في DaZ.',
                Icons.warning_amber_rounded,
                const Color(0xFFB45309),
                () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const FehlerScreen()),
                  );
                },
                isDark,
              ),
              _buildPracticeHubCard(
                'تحديد المستوى 📈',
                'اختبار تفاعلي متكامل لتقييم مستواك اللغوي من A1 إلى B2.',
                Icons.trending_up,
                const Color(0xFF0891B2),
                () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const EinstufungScreen()),
                  );
                },
                isDark,
              ),
              _buildPracticeHubCard(
                'محاكي المحادثة 💬',
                'حوارات محاكاة تفاعلية بالذكاء الاصطناعي للاستعداد لقسم Sprechen.',
                Icons.chat_bubble_outline,
                const Color(0xFF2563EB),
                () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const ChatSimulatorScreen()),
                  );
                },
                isDark,
              ),
            ]),
          ),
        ),
        const SliverToBoxAdapter(child: SizedBox(height: 40)),
      ],
    );
  }

  Widget _buildMenuStreakCard(bool isDark) {
    final provider = context.watch<AppProvider>();
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? Colors.white.withOpacity(0.04) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? Colors.white.withOpacity(0.08) : const Color(0xFFE2E8F0)),
      ),
      child: Row(
        children: [
          const Text('🦉', style: TextStyle(fontSize: 40)),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'مستعد لتحدي اليوم؟',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                ),
                const SizedBox(height: 4),
                Text(
                  'كل جولة مكتملة بنجاح تمنحك نقاط خبرة وتثبّت معلوماتك.',
                  style: TextStyle(color: isDark ? Colors.white60 : Colors.black54, fontSize: 11),
                ),
              ],
            ),
          ),
          Column(
            children: [
              const Icon(Icons.local_fire_department, color: Colors.orange, size: 30),
              Text(
                '${provider.streak} أيام',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.orange),
              )
            ],
          )
        ],
      ),
    );
  }

  Widget _buildPracticeHubCard(
    String title,
    String desc,
    IconData icon,
    Color accentColor,
    VoidCallback onTap,
    bool isDark,
  ) {
    final textMain = isDark ? Colors.white : const Color(0xFF0F172A);
    final textMuted = isDark ? Colors.white60 : const Color(0xFF64748B);

    return ClipRRect(
      borderRadius: BorderRadius.circular(24),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
        child: Container(
          decoration: BoxDecoration(
            color: isDark ? Colors.white.withOpacity(0.04) : Colors.white.withOpacity(0.85),
            borderRadius: BorderRadius.circular(24),
            border: Border.all(
              color: isDark ? Colors.white.withOpacity(0.06) : const Color(0xFFE2E8F0),
              width: 1.2,
            ),
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: onTap,
              splashColor: accentColor.withOpacity(0.12),
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: accentColor.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Icon(icon, color: accentColor, size: 36),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            title,
                            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: textMain),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            desc,
                            style: TextStyle(fontSize: 11, color: textMuted, height: 1.4),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                    Icon(Icons.arrow_forward_ios, color: textMuted.withOpacity(0.3), size: 16),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  // ==================== VIEW 2: GRAMMAR SELECTION ====================
  Widget _buildGrammarSelection(bool isDark) {
    final textMain = isDark ? Colors.white : const Color(0xFF0F172A);
    final completedList = context.watch<AppProvider>().completedGrammarLessons;

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            children: [
              IconButton(
                icon: const Icon(Icons.arrow_back_ios_rounded),
                onPressed: _backToMenu,
              ),
              const SizedBox(width: 8),
              Text(
                'اختر مستوى القواعد للتدريب',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: textMain),
              ),
            ],
          ),
        ),
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            itemCount: grammarLessons.length + 1,
            itemBuilder: (ctx, i) {
              if (i == 0) {
                // Random mix option card
                return Card(
                  color: const Color(0xFF4F46E5).withOpacity(0.1),
                  child: ListTile(
                    leading: const CircleAvatar(
                      backgroundColor: Color(0xFF4F46E5),
                      child: Icon(Icons.shuffle, color: Colors.white),
                    ),
                    title: const Text('تدريب عشوائي شامل 🎲', style: TextStyle(fontWeight: FontWeight.bold)),
                    subtitle: const Text('10 أسئلة مدمجة عشوائياً من كافة مستويات القواعد.'),
                    trailing: const Icon(Icons.play_arrow_rounded, color: Color(0xFF4F46E5), size: 30),
                    onTap: () => _startGrammarQuiz(null),
                  ),
                );
              }

              final lesson = grammarLessons[i - 1];
              final lessonId = lesson['id'] as int? ?? 0;
              final isCompleted = completedList.contains(lessonId);

              return Card(
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: isCompleted ? Colors.green : Colors.grey[200],
                    child: Text(
                      '$lessonId',
                      style: TextStyle(
                        color: isCompleted ? Colors.white : Colors.black87,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  title: Text(lesson['title'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  subtitle: Text(lesson['titleAr'] as String? ?? '', style: const TextStyle(fontSize: 11)),
                  trailing: const Icon(Icons.play_arrow_rounded, size: 24),
                  onTap: () => _startGrammarQuiz(lessonId),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  // ==================== VIEW 3: VOCABULARY SELECTION ====================
  Widget _buildVocabSelection(bool isDark) {
    final textMain = isDark ? Colors.white : const Color(0xFF0F172A);

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            children: [
              IconButton(
                icon: const Icon(Icons.arrow_back_ios_rounded),
                onPressed: _backToMenu,
              ),
              const SizedBox(width: 8),
              Text(
                'اختر تصنيف الكلمات للتدريب',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: textMain),
              ),
            ],
          ),
        ),
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            itemCount: vocabCategories.length + 1,
            itemBuilder: (ctx, i) {
              if (i == 0) {
                // Random mix option card
                return Card(
                  color: const Color(0xFF0D9488).withOpacity(0.1),
                  child: ListTile(
                    leading: const CircleAvatar(
                      backgroundColor: Color(0xFF0D9488),
                      child: Icon(Icons.shuffle, color: Colors.white),
                    ),
                    title: const Text('خلط الكلمات عشوائياً 🎲', style: TextStyle(fontWeight: FontWeight.bold)),
                    subtitle: const Text('10 كلمات عشوائية مختارة من جميع الفئات والمستويات.'),
                    trailing: const Icon(Icons.play_arrow_rounded, color: Color(0xFF0D9488), size: 30),
                    onTap: () => _startVocabQuiz(null),
                  ),
                );
              }

              final cat = vocabCategories[i - 1];
              final String catId = cat['id'] ?? '';
              final wordsList = List.from(cat['words'] as List? ?? []);

              return Card(
                child: ListTile(
                  leading: const CircleAvatar(
                    backgroundColor: Colors.teal,
                    child: Icon(Icons.translate, color: Colors.white, size: 18),
                  ),
                  title: Text(cat['titleAr'] as String? ?? catId, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  subtitle: Text('${cat['titleDe']} (${wordsList.length} كلمة)', style: const TextStyle(fontSize: 11)),
                  trailing: const Icon(Icons.play_arrow_rounded, size: 24),
                  onTap: () => _startVocabQuiz(catId),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  // ==================== VIEW 4: QUIZ GAME (DUOLINGO STYLE) ====================
  Widget _buildQuizGame(bool isDark) {
    // If lives are out or game is finished
    if (_lives <= 0) {
      return _buildGameOverScreen(isDark);
    }
    if (_currentQuestionIndex >= _gameQuestions.length) {
      return _buildVictoryScreen(isDark);
    }

    final q = _gameQuestions[_currentQuestionIndex];
    final options = List<String>.from(q['options'] as List? ?? []);
    final progress = _currentQuestionIndex / _gameQuestions.length;

    return Column(
      children: [
        // Top stats status bar
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 12.0),
          child: Row(
            children: [
              IconButton(
                icon: const Icon(Icons.close),
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (ctx) => AlertDialog(
                      title: const Text('هل تريد الخروج؟ 🦉'),
                      content: const Text('ستخسر تقدمك في هذه الجولة إذا خرجت الآن.'),
                      actions: [
                        TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('إلغاء')),
                        ElevatedButton(
                          onPressed: () {
                            Navigator.pop(ctx);
                            _backToMenu();
                          },
                          child: const Text('خروج'),
                        ),
                      ],
                    ),
                  );
                },
              ),
              const SizedBox(width: 8),
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
                '${_currentQuestionIndex + 1}/${_gameQuestions.length}',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
              ),
              const SizedBox(width: 12),
              Row(
                children: List.generate(3, (index) {
                  return Icon(
                    Icons.favorite,
                    color: index < _lives ? Colors.red : Colors.grey[400],
                    size: 22,
                  );
                }),
              ),
            ],
          ),
        ),
        const Divider(),

        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Mascot Bubble Row
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  textDirection: TextDirection.rtl,
                  children: [
                    Container(
                      width: 50,
                      height: 50,
                      decoration: BoxDecoration(
                        color: const Color(0xFF10B981).withOpacity(0.1),
                        shape: BoxShape.circle,
                        border: Border.all(color: const Color(0xFF10B981).withOpacity(0.3), width: 1.5),
                      ),
                      child: const Center(child: Text('🦉', style: TextStyle(fontSize: 28))),
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
                          border: Border.all(color: isDark ? Colors.white10 : Colors.grey[200]!),
                        ),
                        child: Text(
                          _mascotQuote,
                          style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.bold, height: 1.4),
                          textAlign: TextAlign.right,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),

                // Question Box
                ClipRRect(
                  borderRadius: BorderRadius.circular(20),
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                    child: Container(
                      padding: const EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        color: isDark ? Colors.white.withOpacity(0.03) : Colors.white.withOpacity(0.9),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: isDark ? Colors.white.withOpacity(0.06) : const Color(0xFFE2E8F0)),
                      ),
                      child: Text(
                        q['question'] as String? ?? '',
                        style: TextStyle(
                          fontSize: 18, 
                          fontWeight: FontWeight.bold, 
                          height: 1.5,
                          color: isDark ? Colors.white : const Color(0xFF1E293B)
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // Multiple choice options
                ...List.generate(options.length, (idx) {
                  final option = options[idx];
                  final isSelected = _selectedAnswerIndex == idx;
                  final isCorrect = idx == _correctAnswerIndex;

                  Color borderCol = isDark ? Colors.white10 : Colors.grey[300]!;
                  Color bgCol = isDark ? const Color(0xFF131C33) : Colors.white;
                  Widget? statusIcon;

                  if (_answered) {
                    if (isCorrect) {
                      borderCol = Colors.green;
                      bgCol = Colors.green.withOpacity(0.1);
                      statusIcon = const Icon(Icons.check_circle_rounded, color: Colors.green, size: 20);
                    } else if (isSelected) {
                      borderCol = Colors.red;
                      bgCol = Colors.red.withOpacity(0.1);
                      statusIcon = const Icon(Icons.cancel_rounded, color: Colors.red, size: 20);
                    } else {
                      bgCol = isDark ? const Color(0xFF131C33).withOpacity(0.4) : Colors.grey[50]!;
                    }
                  } else if (isSelected) {
                    borderCol = const Color(0xFF10B981);
                  }

                  return Padding(
                    padding: const EdgeInsets.only(bottom: 12.0),
                    child: InkWell(
                      onTap: _answered ? null : () => _submitQuizAnswer(idx),
                      borderRadius: BorderRadius.circular(16),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                        decoration: BoxDecoration(
                          color: bgCol,
                          border: Border.all(color: borderCol, width: isSelected || (_answered && isCorrect) ? 2 : 1),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Expanded(
                              child: Text(
                                option,
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14.5),
                              ),
                            ),
                            if (statusIcon != null) statusIcon,
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

        // Bottom action layout
        _buildQuizActionPanel(isDark),
      ],
    );
  }

  Widget _buildQuizActionPanel(bool isDark) {
    if (!_answered) {
      return Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF0F172A) : Colors.white,
          border: Border(top: BorderSide(color: isDark ? Colors.white10 : Colors.grey[200]!)),
        ),
        child: const SafeArea(
          child: Center(
            child: Text(
              'اختر إحدى الإجابات للتحقق 💡',
              style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold, fontSize: 13),
            ),
          ),
        ),
      );
    }

    final isCorrect = _selectedAnswerIndex == _correctAnswerIndex;
    final panelBg = isCorrect
        ? (isDark ? const Color(0xFF064E3B) : const Color(0xFFD1FAE5))
        : (isDark ? const Color(0xFF7F1D1D) : const Color(0xFFFEE2E2));

    final textCol = isCorrect
        ? (isDark ? Colors.green[200]! : Colors.green[800]!)
        : (isDark ? Colors.red[200]! : Colors.red[800]!);

    final buttonCol = isCorrect ? const Color(0xFF10B981) : Colors.red;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: panelBg,
        borderRadius: const BorderRadius.only(topLeft: Radius.circular(24), topRight: Radius.circular(24)),
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
                  size: 28,
                ),
                const SizedBox(width: 8),
                Text(
                  isCorrect ? 'رائع! إجابة صحيحة 🎉 (+5 XP)' : 'أوبس! الإجابة غير صحيحة ❌',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: textCol),
                )
              ],
            ),
            const SizedBox(height: 8),
            if (_explanationText.isNotEmpty) ...[
              Text(
                _explanationText,
                style: TextStyle(color: isDark ? Colors.white70 : Colors.black87, fontSize: 12.5, height: 1.4),
                textAlign: TextAlign.right,
              ),
              const SizedBox(height: 16),
            ],
            SizedBox(
              height: 48,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: buttonCol, foregroundColor: Colors.white),
                onPressed: _nextQuizQuestion,
                child: const Text('متابعة ➡️', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ==================== VIEW 5: SATZBAU SENTENCE BUILDER ====================
  Widget _buildSatzbauGameScreen(bool isDark) {
    if (_lives <= 0) {
      return _buildGameOverScreen(isDark);
    }
    if (_sentenceChecked && _sentenceIsCorrect == true) {
      return _buildVictoryScreen(isDark);
    }

    return Column(
      children: [
        // Top status
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 12.0),
          child: Row(
            children: [
              IconButton(icon: const Icon(Icons.close), onPressed: _backToMenu),
              const SizedBox(width: 12),
              const Expanded(
                child: Text('تركيب الجمل الألمانية 🔗', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              ),
            ],
          ),
        ),
        const Divider(),

        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Mascot
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  textDirection: TextDirection.rtl,
                  children: [
                    Container(
                      width: 45,
                      height: 45,
                      decoration: const BoxDecoration(color: Color(0xFF10B981), shape: BoxShape.circle),
                      child: const Center(child: Text('🦉', style: TextStyle(fontSize: 24))),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF1E293B) : Colors.white,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: isDark ? Colors.white10 : Colors.grey[200]!),
                        ),
                        child: Text(
                          _mascotQuote,
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                          textAlign: TextAlign.right,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),

                // Arabic Translation
                Center(
                  child: Text(
                    _sentenceTranslation,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.orange),
                    textAlign: TextAlign.center,
                  ),
                ),
                const SizedBox(height: 32),

                // User Built Sentence Slot
                Container(
                  constraints: const BoxConstraints(minHeight: 80),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: isDark ? Colors.white.withOpacity(0.02) : Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: isDark ? Colors.white10 : Colors.grey[300]!),
                  ),
                  child: _userTokens.isEmpty
                      ? const Center(child: Text('انقر الكلمات بالأسفل للترتيب هنا', style: TextStyle(color: Colors.grey, fontSize: 13)))
                      : Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: _userTokens.map((tok) {
                            return ActionChip(
                              label: Text(tok, style: const TextStyle(fontWeight: FontWeight.bold)),
                              backgroundColor: Colors.teal.withOpacity(0.15),
                              onPressed: _sentenceChecked ? null : () {
                                setState(() {
                                  _userTokens.remove(tok);
                                  _scrambledTokens.add(tok);
                                });
                              },
                            );
                          }).toList(),
                        ),
                ),
                const SizedBox(height: 32),

                // Scrambled Tokens Bank
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  alignment: WrapAlignment.center,
                  children: _scrambledTokens.map((tok) {
                    return ActionChip(
                      label: Text(tok, style: const TextStyle(fontWeight: FontWeight.bold)),
                      onPressed: () {
                        setState(() {
                          _scrambledTokens.remove(tok);
                          _userTokens.add(tok);
                        });
                      },
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
        ),

        // Satzbau Actions
        _buildSatzbauActionPanel(isDark),
      ],
    );
  }

  Widget _buildSatzbauActionPanel(bool isDark) {
    if (!_sentenceChecked) {
      return Container(
        padding: const EdgeInsets.all(20),
        child: SafeArea(
          child: SizedBox(
            height: 48,
            width: double.infinity,
            child: ElevatedButton(
              onPressed: _userTokens.length < _sentenceTokens.length ? null : _checkSentence,
              child: const Text('تحقق من الجملة 🔍', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ),
        ),
      );
    }

    return Container(
      padding: const EdgeInsets.all(20),
      color: _sentenceIsCorrect == true
          ? (isDark ? const Color(0xFF064E3B) : const Color(0xFFD1FAE5))
          : (isDark ? const Color(0xFF7F1D1D) : const Color(0xFFFEE2E2)),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              textDirection: TextDirection.rtl,
              children: [
                Icon(
                  _sentenceIsCorrect == true ? Icons.check_circle : Icons.error,
                  color: _sentenceIsCorrect == true ? Colors.green : Colors.red,
                  size: 28,
                ),
                const SizedBox(width: 8),
                Text(
                  _sentenceIsCorrect == true ? 'ممتاز! تركيب صحيح قواعدياً 🎉 (+10 XP)' : 'التركيب غير صحيح ❌',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                ),
              ],
            ),
            const SizedBox(height: 8),
            const Text(
              'الترتيب الصحيح هو:',
              style: TextStyle(fontSize: 11, color: Colors.grey),
              textAlign: TextAlign.right,
            ),
            const SizedBox(height: 4),
            Text(
              _sentenceSolution,
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Color(0xFF10B981)),
              textDirection: TextDirection.ltr,
            ),
            const SizedBox(height: 20),
            SizedBox(
              height: 48,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: _sentenceIsCorrect == true ? const Color(0xFF10B981) : Colors.red,
                  foregroundColor: Colors.white,
                ),
                onPressed: () {
                  if (_sentenceIsCorrect == true) {
                    _backToMenu();
                  } else {
                    _startSatzbauGame(); // retry a new one
                  }
                },
                child: Text(_sentenceIsCorrect == true ? 'حسناً' : 'جملة جديدة 🔄', style: const TextStyle(fontWeight: FontWeight.bold)),
              ),
            )
          ],
        ),
      ),
    );
  }

  // ==================== SUB-VIEWS: GAME OVER & VICTORY ====================
  Widget _buildGameOverScreen(bool isDark) {
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text('😢', style: TextStyle(fontSize: 80), textAlign: TextAlign.center),
            const SizedBox(height: 20),
            const Text(
              'انتهت المحاولات والقلوب!',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.red),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 12),
            Text(
              'لقد استهلكت جميع قلوبك الثلاثة في هذا التدريب. حاول مرة أخرى للتغلب على الصعاب ورسخ معلوماتك!',
              style: TextStyle(fontSize: 14, color: isDark ? Colors.white70 : Colors.black54),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 40),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF10B981), foregroundColor: Colors.white),
              onPressed: () {
                setState(() {
                  _lives = 3;
                  _score = 0;
                  _currentQuestionIndex = 0;
                  _answered = false;
                  _selectedAnswerIndex = null;
                  _sentenceChecked = false;
                });
                if (_activeMode == 'QUIZ_GAME') {
                  // restart same quiz pool
                  setState(() {
                    _mascotQuote = 'دعنا نثبت المحاولة مجدداً! 🦉';
                  });
                } else if (_activeMode == 'SATZBAU_GAME') {
                  _startSatzbauGame();
                }
              },
              child: const Text('إعادة المحاولة 🔄', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
            const SizedBox(height: 12),
            TextButton(
              onPressed: _backToMenu,
              child: const Text('خروج للقائمة 🏠', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
            )
          ],
        ),
      ),
    );
  }

  Widget _buildVictoryScreen(bool isDark) {
    final int xpReward = _activeMode == 'SATZBAU_GAME' ? 10 : (_score * 5);
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text('🏆', style: TextStyle(fontSize: 100), textAlign: TextAlign.center),
            const SizedBox(height: 20),
            const Text(
              'عمل رائع! اكتمل التحدي بنجاح 🎉',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 12),
            Text(
              'لقد أنهيت جولة التدريب التفاعلي بنجاح وعززت لهيب حماسك اليومي.',
              style: TextStyle(fontSize: 13, color: isDark ? Colors.white60 : Colors.black54),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            
            // Score stats
            Card(
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Column(
                      children: [
                        const Icon(Icons.star, color: Colors.amber, size: 28),
                        const SizedBox(height: 6),
                        Text(
                          '+$xpReward XP',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.amber),
                        ),
                        const Text('نقاط الخبرة', style: TextStyle(fontSize: 10, color: Colors.grey)),
                      ],
                    ),
                    Container(width: 1, height: 40, color: isDark ? Colors.white10 : Colors.grey[300]),
                    Column(
                      children: [
                        const Icon(Icons.check_circle, color: Color(0xFF10B981), size: 28),
                        const SizedBox(height: 6),
                        Text(
                          _activeMode == 'SATZBAU_GAME' ? '1/1' : '$_score/${_gameQuestions.length}',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Color(0xFF10B981)),
                        ),
                        const Text('الإجابات الصحيحة', style: TextStyle(fontSize: 10, color: Colors.grey)),
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
              ),
              onPressed: _backToMenu,
              child: const Text('العودة لمركز التدريب 🏠', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }
}
