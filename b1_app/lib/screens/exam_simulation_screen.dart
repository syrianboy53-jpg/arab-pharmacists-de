import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:provider/provider.dart';
import 'package:confetti/confetti.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import '../providers/app_provider.dart';
import '../utils/ad_manager.dart';
import '../data/lesen_data.dart';
import '../data/hoeren_data.dart';
import '../data/schreiben_data.dart';
import '../data/sprachbausteine_data.dart';
import '../data/mock_data.dart';

class ExamSimulationScreen extends StatefulWidget {
  const ExamSimulationScreen({super.key});

  @override
  State<ExamSimulationScreen> createState() => _ExamSimulationScreenState();
}

class _ExamSimulationScreenState extends State<ExamSimulationScreen> {
  // Exam phases: 'intro', 'lesen', 'sprachbausteine', 'hoeren', 'schreiben', 'result'
  String _phase = 'intro';
  Map<String, dynamic>? _selectedExam;

  // Active models loaded dynamically
  Map<String, dynamic>? _currentLesenModel;
  Map<String, dynamic>? _currentHoerenModel;
  Map<String, dynamic>? _currentSchreibenModel;
  List<Map<String, dynamic>> _currentBausteineQuestions = [];

  // Progress indexes
  int _currentPartIdx = 0; // index of part in lesen/hoeren
  int _currentQIdx = 0; // index of question in sprachbausteine

  // Current part answering state
  Map<String, dynamic> _partAnswers = {}; // e.g. { 'questionId': value }
  bool _partChecked = false;
  int _partCorrectCount = 0;

  // Writing task selections
  Map<String, dynamic>? _selectedSchreibenTask;
  final TextEditingController _schreibenController = TextEditingController();
  bool _schreibenSubmitted = false;

  // Scores
  int _scoreLesen = 0;
  int _totalLesenQ = 0;

  int _scoreSprach = 0;
  final int _totalSprachQ = 10;

  int _scoreHoeren = 0;
  int _totalHoerenQ = 0;

  // Timer
  Timer? _timer;
  int _secondsRemaining = 0;
  bool _timerExpired = false;

  InterstitialAd? _interstitialAd;
  bool _isInterstitialAdLoaded = false;

  late ConfettiController _confettiController;

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 3));
    _loadInterstitialAd();
  }

  void _loadInterstitialAd() {
    if (kIsWeb) return;
    AdManager.loadInterstitialAd(
      onAdLoaded: (ad) {
        _interstitialAd = ad;
        _isInterstitialAdLoaded = true;
      },
      onAdFailedToLoad: (error) {
        debugPrint('InterstitialAd failed to load: $error');
      },
    );
  }

  @override
  void dispose() {
    _timer?.cancel();
    _confettiController.dispose();
    _interstitialAd?.dispose();
    _schreibenController.dispose();
    super.dispose();
  }

  void _selectExam(Map<String, dynamic> exam) {
    // Dynamic lookups
    final lesenId = exam['lesenId'] as String;
    final hoerenId = exam['hoerenId'] as String;
    final schreibenId = exam['schreibenId'] as String;
    final examNumber = exam['number'] as int;

    final lesenModel = lesenModels.firstWhere((m) => m['id'] == lesenId, orElse: () => lesenModels[0]);
    final hoerenModel = hoerenModels.firstWhere((m) => m['id'] == hoerenId, orElse: () => hoerenModels[0]);
    final schreibenModel = schreibenModels.firstWhere((m) => m['id'] == schreibenId, orElse: () => schreibenModels[0]);

    // Slice 10 questions for Sprachbausteine
    final startIdx = (examNumber - 1) * 10;
    List<Map<String, dynamic>> bausteineQs = [];
    if (startIdx + 10 <= pruefungsFragen.length) {
      bausteineQs = pruefungsFragen.sublist(startIdx, startIdx + 10);
    } else {
      bausteineQs = pruefungsFragen.sublist(0, 10);
    }

    setState(() {
      _selectedExam = exam;
      _currentLesenModel = lesenModel;
      _currentHoerenModel = hoerenModel;
      _currentSchreibenModel = schreibenModel;
      _currentBausteineQuestions = bausteineQs;

      // Reset scores & totals
      _scoreLesen = 0;
      _totalLesenQ = 0;
      _scoreSprach = 0;
      _scoreHoeren = 0;
      _totalHoerenQ = 0;

      // Calculate total questions dynamically
      final lesenParts = lesenModel['parts'] as List;
      for (var part in lesenParts) {
        final type = part['type'] as String;
        if (type == 'match-blog') {
          _totalLesenQ += (part['statements'] as List).length;
        } else if (type == 'mc-article' || type == 'mc-rules') {
          _totalLesenQ += (part['questions'] as List).length;
        } else if (type == 'match-ads') {
          _totalLesenQ += (part['situations'] as List).length;
        } else if (type == 'tf-opinions') {
          _totalLesenQ += (part['questions'] as List).length;
        }
      }

      final hoerenParts = hoerenModel['parts'] as List;
      for (var part in hoerenParts) {
        final type = part['type'] as String;
        if (type == 'tf-mc') {
          _totalHoerenQ += (part['questions'] as List).length;
        } else if (type == 'match-speakers' || type == 'match-opinions') {
          _totalHoerenQ += (part['matchItems'] as List).length;
        } else if (type == 'tf-dialog') {
          _totalHoerenQ += (part['questions'] as List).length;
        }
      }

      _phase = 'lesen';
      _currentPartIdx = 0;
      _secondsRemaining = 60 * 20; // 20 mins for Lesen in simulator
      _timerExpired = false;
      _partChecked = false;
      _partAnswers = {};
    });

    _startTimer();
  }

  void _startTimer() {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsRemaining > 0) {
        setState(() {
          _secondsRemaining--;
        });
      } else {
        _timer?.cancel();
        _onTimerExpired();
      }
    });
  }

  void _onTimerExpired() {
    setState(() {
      _timerExpired = true;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('انتهى الوقت المخصص لهذا القسم! الانتقال للقسم التالي... ⚠️'),
        backgroundColor: Colors.red,
      ),
    );
    _advancePhase();
  }

  void _advancePhase() {
    _timer?.cancel();
    setState(() {
      _currentPartIdx = 0;
      _currentQIdx = 0;
      _partAnswers = {};
      _partChecked = false;

      if (_phase == 'lesen') {
        _phase = 'sprachbausteine';
        _secondsRemaining = 60 * 8; // 8 mins for grammar
        _startTimer();
      } else if (_phase == 'sprachbausteine') {
        _phase = 'hoeren';
        _secondsRemaining = 60 * 15; // 15 mins for listening
        _startTimer();
      } else if (_phase == 'hoeren') {
        _phase = 'schreiben';
        _secondsRemaining = 60 * 15; // 15 mins for writing
        _schreibenSubmitted = false;
        _schreibenController.clear();
        // Fallback or select first task
        final tasks = _currentSchreibenModel?['tasks'] as List? ?? [];
        if (tasks.isNotEmpty) {
          _selectedSchreibenTask = tasks[0];
        }
        _startTimer();
      } else if (_phase == 'schreiben') {
        _phase = 'result';
        _showResultSummary();
      }
    });
  }

  void _showResultSummary() {
    final double totalPercent = (((_scoreLesen + _scoreSprach + _scoreHoeren) / (_totalLesenQ + _totalSprachQ + _totalHoerenQ)) * 100);
    
    void triggerSuccess() {
      if (totalPercent >= 60) {
        _confettiController.play();
        context.read<AppProvider>().addXP(150); // XP reward
      }
    }

    if (_isInterstitialAdLoaded && _interstitialAd != null) {
      _interstitialAd!.fullScreenContentCallback = FullScreenContentCallback(
        onAdDismissedFullScreenContent: (ad) {
          ad.dispose();
          triggerSuccess();
        },
        onAdFailedToShowFullScreenContent: (ad, error) {
          ad.dispose();
          triggerSuccess();
        },
      );
      _interstitialAd!.show();
      _interstitialAd = null;
    } else {
      triggerSuccess();
    }
  }

  String _formatTime(int totalSeconds) {
    final minutes = (totalSeconds / 60).floor();
    final seconds = totalSeconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scaffoldBg = isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC);
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: AppBar(
        title: Text(_phase == 'intro' ? 'محاكي امتحان Telc B1 الحقيقي 🎓' : _getPhaseTitle(),
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
        backgroundColor: isDark ? const Color(0xFF1E293B) : Colors.white,
        foregroundColor: textMain,
        actions: [
          if (_phase != 'intro' && _phase != 'result')
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Center(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(
                    color: _secondsRemaining < 60
                        ? Colors.red.withValues(alpha: 0.1)
                        : Theme.of(context).colorScheme.primary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color: _secondsRemaining < 60 ? Colors.red : Theme.of(context).colorScheme.primary,
                      width: 1,
                    ),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.timer,
                          color: _secondsRemaining < 60 ? Colors.red : Theme.of(context).colorScheme.primary,
                          size: 16),
                      const SizedBox(width: 4),
                      Text(
                        _formatTime(_secondsRemaining),
                        style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: _secondsRemaining < 60 ? Colors.red : Theme.of(context).colorScheme.primary,
                            fontSize: 13),
                      ),
                    ],
                  ),
                ),
              ),
            )
        ],
      ),
      body: Stack(
        alignment: Alignment.center,
        children: [
          SafeArea(
            child: Column(
              children: [
                if (_phase != 'intro' && _phase != 'result') _buildProgressBar(),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(16.0),
                    child: _buildPhaseBody(isDark),
                  ),
                ),
                if (_phase != 'intro' && _phase != 'result') _buildBottomActionBar(isDark),
              ],
            ),
          ),
          ConfettiWidget(
            confettiController: _confettiController,
            blastDirectionality: BlastDirectionality.explosive,
            shouldLoop: false,
            colors: const [Colors.green, Colors.blue, Colors.amber, Colors.pink],
          )
        ],
      ),
    );
  }

  String _getPhaseTitle() {
    switch (_phase) {
      case 'lesen':
        return 'قسم القراءة (Lesen)';
      case 'sprachbausteine':
        return 'قسم القواعد (Sprachbausteine)';
      case 'hoeren':
        return 'قسم الاستماع (Hören)';
      case 'schreiben':
        return 'قسم الكتابة (Schreiben)';
      default:
        return 'النتيجة النهائية';
    }
  }

  Widget _buildProgressBar() {
    double progress = 0.0;
    String label = '';

    if (_phase == 'lesen') {
      final partsCount = _currentLesenModel?['parts']?.length ?? 1;
      progress = (_currentPartIdx + 1) / partsCount;
      label = 'جزء ${_currentPartIdx + 1} من $partsCount';
    } else if (_phase == 'hoeren') {
      final partsCount = _currentHoerenModel?['parts']?.length ?? 1;
      progress = (_currentPartIdx + 1) / partsCount;
      label = 'جزء ${_currentPartIdx + 1} من $partsCount';
    } else if (_phase == 'sprachbausteine') {
      progress = (_currentQIdx + 1) / 10;
      label = 'سؤال ${_currentQIdx + 1} من 10';
    } else if (_phase == 'schreiben') {
      progress = 1.0;
      label = 'الرسالة المطلوبة';
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      color: Theme.of(context).cardColor,
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
              Text(
                'النتيجة الحالية: ${_scoreLesen + _scoreSprach + _scoreHoeren}',
                style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.orange),
              ),
            ],
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: LinearProgressIndicator(
              value: progress,
              minHeight: 8,
              backgroundColor: Theme.of(context).brightness == Brightness.dark ? Colors.white10 : Colors.black12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPhaseBody(bool isDark) {
    switch (_phase) {
      case 'intro':
        return _buildIntro(isDark);
      case 'lesen':
        return _buildLesenSection(isDark);
      case 'sprachbausteine':
        return _buildSprachbausteineSection(isDark);
      case 'hoeren':
        return _buildHoerenSection(isDark);
      case 'schreiben':
        return _buildSchreibenSection(isDark);
      case 'result':
        return _buildResultSection(isDark);
      default:
        return const SizedBox();
    }
  }

  Widget _buildIntro(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Icon(Icons.stars_rounded, color: Colors.amber, size: 70),
        const SizedBox(height: 12),
        const Text(
          'محاكاة امتحانات شهادة Telc B1 🎓',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 8),
        const Text(
          'أقوى محاكاة في التطبيق. امتحانات كاملة تحتوي على نصوص قراءة ومطابقة إعلانات واستماع حقيقي ونماذج رسائل رسمية وقواعد شاملة.',
          style: TextStyle(color: Colors.grey, fontSize: 12, height: 1.5),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 24),
        ...mockExams.map((exam) {
          final isPremium = exam['premium'] as bool;
          final difficulty = exam['difficulty'] as int;

          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Row(
                    children: [
                      Text(exam['themeIcon'] as String? ?? '📝', style: const TextStyle(fontSize: 24)),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              exam['titleDe'] as String,
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                            ),
                            Text(
                              exam['titleAr'] as String,
                              style: const TextStyle(fontSize: 12, color: Colors.grey),
                            ),
                          ],
                        ),
                      ),
                      if (isPremium)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(color: Colors.orange, borderRadius: BorderRadius.circular(4)),
                          child: const Text('PRO',
                              style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                        )
                    ],
                  ),
                  const Divider(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: List.generate(5, (starIdx) {
                          return Icon(
                            starIdx < difficulty ? Icons.star : Icons.star_border,
                            color: Colors.amber,
                            size: 14,
                          );
                        }),
                      ),
                      Text(
                        'المدة: ${exam["durationMin"]} دقيقة',
                        style: const TextStyle(fontSize: 11, color: Colors.grey),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  ElevatedButton(
                    onPressed: () => _selectExam(exam),
                    child: const Text('ابدأ محاكاة النموذج الآن 🚀'),
                  )
                ],
              ),
            ),
          );
        }),
      ],
    );
  }

  // BOTTOM NAVIGATION & CHECK BAR
  Widget _buildBottomActionBar(bool isDark) {
    if (_phase == 'schreiben') {
      return const SizedBox(); // Schreiben uses internal buttons
    }

    final accentCol = Theme.of(context).colorScheme.primary;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1E293B) : Colors.white,
        border: Border(top: BorderSide(color: isDark ? Colors.white10 : Colors.black12)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Instant feedback banner when checked
          if (_partChecked) ...[
            Container(
              padding: const EdgeInsets.all(12),
              margin: const EdgeInsets.only(bottom: 12),
              decoration: BoxDecoration(
                color: _partCorrectCount > 0 ? Colors.green.withValues(alpha: 0.08) : Colors.amber.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(
                  color: _partCorrectCount > 0 ? Colors.green.withValues(alpha: 0.3) : Colors.amber.withValues(alpha: 0.3),
                ),
              ),
              child: Row(
                children: [
                  Icon(
                    _partCorrectCount > 0 ? Icons.check_circle_rounded : Icons.info_outline,
                    color: _partCorrectCount > 0 ? Colors.green : Colors.amber,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'أصبت في $_partCorrectCount إجابات في هذا القسم! تفقد التوضيح باللون الأخضر أدناه.',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: _partCorrectCount > 0 ? Colors.green : Colors.orange,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
          Row(
            children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: _isCheckEnabled()
                      ? _checkCurrentPart
                      : (_partChecked ? _nextPartOrPhase : null),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _partChecked ? Colors.green : accentCol,
                    foregroundColor: Colors.white,
                  ),
                  child: Text(
                    _partChecked
                        ? 'القسم التالي ➡️'
                        : (_phase == 'sprachbausteine' ? 'تحقق من السؤال 🔎' : 'تحقق من الإجابات 🔎'),
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }

  bool _isCheckEnabled() {
    if (_partChecked) return false;

    if (_phase == 'lesen') {
      final part = _currentLesenModel?['parts']?[_currentPartIdx];
      if (part == null) return false;
      final type = part['type'] as String;

      int expectedCount = 0;
      if (type == 'match-blog') {
        expectedCount = (part['statements'] as List).length;
      } else if (type == 'mc-article' || type == 'mc-rules') {
        expectedCount = (part['questions'] as List).length;
      } else if (type == 'match-ads') {
        expectedCount = (part['situations'] as List).length;
      } else if (type == 'tf-opinions') {
        expectedCount = (part['questions'] as List).length;
      }
      return _partAnswers.length >= expectedCount;
    } else if (_phase == 'hoeren') {
      final part = _currentHoerenModel?['parts']?[_currentPartIdx];
      if (part == null) return false;
      final type = part['type'] as String;

      int expectedCount = 0;
      if (type == 'tf-mc') {
        expectedCount = (part['questions'] as List).length;
      } else if (type == 'match-speakers' || type == 'match-opinions') {
        expectedCount = (part['matchItems'] as List).length;
      } else if (type == 'tf-dialog') {
        expectedCount = (part['questions'] as List).length;
      }
      return _partAnswers.length >= expectedCount;
    } else if (_phase == 'sprachbausteine') {
      return _partAnswers.containsKey('sb_$_currentQIdx');
    }
    return false;
  }

  void _checkCurrentPart() {
    int corrects = 0;

    if (_phase == 'lesen') {
      final part = _currentLesenModel?['parts']?[_currentPartIdx];
      final type = part['type'] as String;

      if (type == 'match-blog') {
        final statements = part['statements'] as List;
        for (var s in statements) {
          final id = s['id'] as String;
          if (_partAnswers[id] == s['correctAd']) corrects++;
        }
      } else if (type == 'mc-article' || type == 'mc-rules') {
        final questions = part['questions'] as List;
        for (var q in questions) {
          final id = q['id'] as String;
          final correctVal = q['correct'] as String? ?? q['correct'].toString();
          if (_partAnswers[id].toString() == correctVal) corrects++;
        }
      } else if (type == 'match-ads') {
        final situations = part['situations'] as List;
        for (var s in situations) {
          final id = s['id'] as String;
          if (_partAnswers[id] == s['correctAd']) corrects++;
        }
      } else if (type == 'tf-opinions') {
        final questions = part['questions'] as List;
        for (var q in questions) {
          final id = q['id'] as String;
          final correctVal = q['correct'] as bool;
          if (_partAnswers[id] == correctVal) corrects++;
        }
      }
      _scoreLesen += corrects;
    } else if (_phase == 'hoeren') {
      final part = _currentHoerenModel?['parts']?[_currentPartIdx];
      final type = part['type'] as String;

      if (type == 'tf-mc') {
        final questions = part['questions'] as List;
        for (var q in questions) {
          final id = q['id'] as String;
          if (q.containsKey('correct')) {
            final correctVal = q['correct'] as bool;
            if (_partAnswers[id] == correctVal) corrects++;
          } else {
            final correctVal = q['correct'] ?? q['correct'].toString();
            if (_partAnswers[id].toString() == correctVal) corrects++;
          }
        }
      } else if (type == 'match-speakers' || type == 'match-opinions') {
        final matchItems = part['matchItems'] as List;
        for (var item in matchItems) {
          final id = item['id'] as String;
          if (_partAnswers[id] == item['correctAd']) corrects++;
        }
      } else if (type == 'tf-dialog') {
        final questions = part['questions'] as List;
        for (var q in questions) {
          final id = q['id'] as String;
          final correctVal = q['correct'] as bool;
          if (_partAnswers[id] == correctVal) corrects++;
        }
      }
      _scoreHoeren += corrects;
    } else if (_phase == 'sprachbausteine') {
      final q = _currentBausteineQuestions[_currentQIdx];
      final correct = q['correct'] as int;
      if (_partAnswers['sb_$_currentQIdx'] == correct) {
        corrects = 1;
        _scoreSprach++;
      }
    }

    setState(() {
      _partCorrectCount = corrects;
      _partChecked = true;
    });
  }

  void _nextPartOrPhase() {
    if (_phase == 'lesen') {
      final parts = _currentLesenModel?['parts'] as List;
      if (_currentPartIdx < parts.length - 1) {
        setState(() {
          _currentPartIdx++;
          _partAnswers = {};
          _partChecked = false;
        });
      } else {
        _advancePhase();
      }
    } else if (_phase == 'hoeren') {
      final parts = _currentHoerenModel?['parts'] as List;
      if (_currentPartIdx < parts.length - 1) {
        setState(() {
          _currentPartIdx++;
          _partAnswers = {};
          _partChecked = false;
        });
      } else {
        _advancePhase();
      }
    } else if (_phase == 'sprachbausteine') {
      if (_currentQIdx < 9) {
        setState(() {
          _currentQIdx++;
          _partChecked = false;
        });
      } else {
        _advancePhase();
      }
    }
  }

  // LESEN BUILDER
  Widget _buildLesenSection(bool isDark) {
    final parts = _currentLesenModel?['parts'] as List? ?? [];
    if (_currentPartIdx >= parts.length) return const SizedBox();

    final part = parts[_currentPartIdx];
    final type = part['type'] as String;
    final title = part['title'] as String? ?? '';
    final instructions = part['instructionsAr'] as String? ?? '';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(title, style: TextStyle(fontWeight: FontWeight.bold, color: Theme.of(context).colorScheme.primary, fontSize: 16)),
        const SizedBox(height: 6),
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Colors.blue.withValues(alpha: 0.05),
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: Colors.blue.withValues(alpha: 0.2)),
          ),
          child: Text(instructions, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        if (part['textDe'] != null) ...[
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                part['textDe'] as String,
                style: const TextStyle(fontSize: 13, height: 1.5),
                textDirection: TextDirection.ltr,
              ),
            ),
          ),
          const SizedBox(height: 16),
        ],
        _buildLesenPartInputs(type, part, isDark),
      ],
    );
  }

  Widget _buildLesenPartInputs(String type, Map<String, dynamic> part, bool isDark) {
    if (type == 'match-blog') {
      final texts = part['texts'] as List;
      final statements = part['statements'] as List;

      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text('📚 مشاركات المدونة / المنتدى:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
          const SizedBox(height: 8),
          ...texts.map((t) {
            return Card(
              color: isDark ? const Color(0xFF1E293B) : Colors.white,
              margin: const EdgeInsets.only(bottom: 8),
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('${t["id"]}) ${t["titleDe"]} (${t["titleAr"]})',
                        style: TextStyle(fontWeight: FontWeight.bold, color: Theme.of(context).colorScheme.secondary, fontSize: 14)),
                    const SizedBox(height: 4),
                    Text(t['textDe'] as String, style: const TextStyle(fontSize: 15), textDirection: TextDirection.ltr),
                  ],
                ),
              ),
            );
          }),
          const SizedBox(height: 16),
          const Text('✏️ اربط الجمل بالشخص المناسب (A - E):', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
          const SizedBox(height: 8),
          ...statements.map((s) {
            final id = s['id'] as String;
            final selected = _partAnswers[id];
            final correctAd = s['correctAd'] as String;

            return Card(
              margin: const EdgeInsets.only(bottom: 12),
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(s['textAr'] as String, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    const SizedBox(height: 4),
                    Text(s['textDe'] as String, style: const TextStyle(fontSize: 14, color: Colors.grey), textDirection: TextDirection.ltr),
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: ['A', 'B', 'C', 'D', 'E'].map((letter) {
                        final isChosen = selected == letter;
                        final isCorrect = letter == correctAd;

                        Color btnColor = Colors.transparent;
                        Color borderCol = isDark ? Colors.white24 : Colors.black12;
                        Color textCol = isDark ? Colors.white : Colors.black87;

                        if (isChosen) {
                          btnColor = Theme.of(context).colorScheme.primary;
                          borderCol = Theme.of(context).colorScheme.primary;
                          textCol = Colors.white;
                        }
                        if (_partChecked) {
                          if (isCorrect) {
                            btnColor = Colors.green;
                            borderCol = Colors.green;
                            textCol = Colors.white;
                          } else if (isChosen) {
                            btnColor = Colors.red;
                            borderCol = Colors.red;
                            textCol = Colors.white;
                          }
                        }

                        return InkWell(
                          onTap: _partChecked
                              ? null
                              : () {
                                  setState(() {
                                    _partAnswers[id] = letter;
                                  });
                                },
                          child: Container(
                            width: 38,
                            height: 38,
                            decoration: BoxDecoration(
                              color: btnColor,
                              border: Border.all(color: borderCol, width: 2),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Center(
                                child: Text(letter,
                                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: textCol))),
                          ),
                        );
                      }).toList(),
                    ),
                    if (_partChecked && s['explanation'] != null) ...[
                      const SizedBox(height: 12),
                      Text('💡 توضيح: ${s["explanation"]}',
                          style: const TextStyle(color: Colors.green, fontSize: 14, fontWeight: FontWeight.bold))
                    ]
                  ],
                ),
              ),
            );
          }),
        ],
      );
    } else if (type == 'mc-article' || type == 'mc-rules') {
      final questions = part['questions'] as List;

      return Column(
        children: questions.map((q) {
          final id = q['id'] as String;
          final promptDe = q['promptDe'] as String? ?? '';
          final promptAr = q['promptAr'] as String? ?? '';
          final options = q['options'] as List;
          final correctVal = q['correct'] as String? ?? q['correct'].toString();

          return Card(
            margin: const EdgeInsets.only(bottom: 16),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  if (promptAr.isNotEmpty)
                    Text(promptAr, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  Text(promptDe,
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, fontStyle: FontStyle.italic),
                      textDirection: TextDirection.ltr),
                  const SizedBox(height: 12),
                  ...options.map((opt) {
                    final optId = opt['id'] as String? ?? opt.toString();
                    final optDe = opt['de'] as String? ?? opt.toString();
                    final isSelected = _partAnswers[id].toString() == optId.toString();

                    Color borderCol = isDark ? Colors.white10 : Colors.black12;
                    Color bgCol = Colors.transparent;

                    if (isSelected) {
                      borderCol = Theme.of(context).colorScheme.primary;
                      bgCol = Theme.of(context).colorScheme.primary.withValues(alpha: 0.05);
                    }

                    if (_partChecked) {
                      final isCorrect = optId.toString() == correctVal;
                      if (isCorrect) {
                        borderCol = Colors.green;
                        bgCol = Colors.green.withValues(alpha: 0.1);
                      } else if (isSelected) {
                        borderCol = Colors.red;
                        bgCol = Colors.red.withValues(alpha: 0.1);
                      }
                    }

                    return Padding(
                      padding: const EdgeInsets.only(bottom: 8.0),
                      child: InkWell(
                        onTap: _partChecked
                            ? null
                            : () {
                                setState(() {
                                  _partAnswers[id] = optId;
                                });
                              },
                        borderRadius: BorderRadius.circular(10),
                        child: Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: bgCol,
                            border: Border.all(color: borderCol, width: isSelected ? 2 : 1),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(optDe, style: const TextStyle(fontSize: 14), textDirection: TextDirection.ltr),
                        ),
                      ),
                    );
                  }),
                  if (_partChecked && q['explanation'] != null) ...[
                    const SizedBox(height: 8),
                    Text('💡 توضيح: ${q["explanation"]}',
                        style: const TextStyle(color: Colors.green, fontSize: 14, fontWeight: FontWeight.bold))
                  ]
                ],
              ),
            ),
          );
        }).toList(),
      );
    } else if (type == 'match-ads') {
      final situations = part['situations'] as List;
      final ads = part['ads'] as List;

      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text('📰 الإعلانات المتوفرة:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
          const SizedBox(height: 8),
          ...ads.map((ad) {
            return Card(
              color: isDark ? const Color(0xFF1E293B) : Colors.white,
              margin: const EdgeInsets.only(bottom: 8),
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('${ad["id"]?.toString().toUpperCase()}) ${ad["titleDe"]}',
                        style: TextStyle(fontWeight: FontWeight.bold, color: Theme.of(context).colorScheme.secondary, fontSize: 14)),
                    const SizedBox(height: 4),
                    Text(ad['textDe'] as String, style: const TextStyle(fontSize: 15), textDirection: TextDirection.ltr),
                  ],
                ),
              ),
            );
          }),
          const SizedBox(height: 16),
          const Text('✏️ طابق رغبات الأشخاص بالإعلان المناسب:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
          const SizedBox(height: 8),
          ...situations.map((s) {
            final id = s['id'] as String;
            final selected = _partAnswers[id];
            final correctAd = s['correctAd'] as String;

            return Card(
              margin: const EdgeInsets.only(bottom: 12),
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(s['textAr'] as String, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    const SizedBox(height: 4),
                    Text(s['textDe'] as String, style: const TextStyle(fontSize: 14, color: Colors.grey), textDirection: TextDirection.ltr),
                    const SizedBox(height: 10),
                    DropdownButtonFormField<String>(
                      initialValue: selected,
                      hint: const Text('اختر الإعلان المناسب...'),
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                      onChanged: _partChecked
                          ? null
                          : (v) {
                              setState(() {
                                _partAnswers[id] = v;
                              });
                            },
                      items: [
                        ...ads.map((ad) {
                          final adId = ad['id'] as String;
                          return DropdownMenuItem<String>(
                            value: adId,
                            child: Text('إعلان ${adId.toUpperCase()}: ${ad["titleDe"]}'),
                          );
                        }),
                        const DropdownMenuItem<String>(
                          value: 'لا يوجد',
                          child: Text('لا يوجد إعلان مناسب'),
                        )
                      ],
                    ),
                    if (_partChecked) ...[
                      const SizedBox(height: 8),
                      Text(
                        selected == correctAd ? '✅ إجابة صحيحة' : '❌ الإجابة الصحيحة هي: ${correctAd.toUpperCase()}',
                        style: TextStyle(
                            color: selected == correctAd ? Colors.green : Colors.red,
                            fontWeight: FontWeight.bold,
                            fontSize: 14),
                      ),
                      if (s['explanation'] != null) ...[
                        const SizedBox(height: 8),
                        Text('💡 توضيح: ${s["explanation"]}',
                            style: const TextStyle(color: Colors.green, fontSize: 14, fontWeight: FontWeight.bold))
                      ]
                    ]
                  ],
                ),
              ),
            );
          }),
        ],
      );
    } else if (type == 'tf-opinions') {
      final questions = part['questions'] as List;

      return Column(
        children: questions.map((q) {
          final id = q['id'] as String;
          final statementDe = q['statementDe'] as String;
          final statementAr = q['statementAr'] as String;
          final correctVal = q['correct'] as bool;
          final selected = _partAnswers[id] as bool?;

          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(statementAr, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                  Text(statementDe, style: const TextStyle(fontSize: 15, fontStyle: FontStyle.italic), textDirection: TextDirection.ltr),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          onPressed: _partChecked
                              ? null
                              : () => setState(() => _partAnswers[id] = true),
                          style: OutlinedButton.styleFrom(
                            backgroundColor: selected == true
                                ? (_partChecked
                                    ? (correctVal == true ? Colors.green : Colors.red)
                                    : Theme.of(context).colorScheme.primary)
                                : Colors.transparent,
                            foregroundColor: selected == true ? Colors.white : null,
                            side: _partChecked && correctVal == true
                                ? const BorderSide(color: Colors.green, width: 2)
                                : null,
                          ),
                          child: const Text('Richtig (صح)'),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: OutlinedButton(
                          onPressed: _partChecked
                              ? null
                              : () => setState(() => _partAnswers[id] = false),
                          style: OutlinedButton.styleFrom(
                            backgroundColor: selected == false
                                ? (_partChecked
                                    ? (correctVal == false ? Colors.green : Colors.red)
                                    : Theme.of(context).colorScheme.primary)
                                : Colors.transparent,
                            foregroundColor: selected == false ? Colors.white : null,
                            side: _partChecked && correctVal == false
                                ? const BorderSide(color: Colors.green, width: 2)
                                : null,
                          ),
                          child: const Text('Falsch (خطأ)'),
                        ),
                      ),
                    ],
                  ),
                  if (_partChecked && q['explanation'] != null) ...[
                    const SizedBox(height: 8),
                    Text('💡 توضيح: ${q["explanation"]}',
                        style: const TextStyle(color: Colors.green, fontSize: 14, fontWeight: FontWeight.bold))
                  ]
                ],
              ),
            ),
          );
        }).toList(),
      );
    }
    return const SizedBox();
  }

  // SPRACHBAUSTEINE BUILDER
  Widget _buildSprachbausteineSection(bool isDark) {
    if (_currentQIdx >= _currentBausteineQuestions.length) return const SizedBox();
    final q = _currentBausteineQuestions[_currentQIdx];
    final options = List<String>.from(q['options'] as List? ?? []);
    final correct = q['correct'] as int;
    final selected = _partAnswers['sb_$_currentQIdx'] as int?;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Text('القسم 2: القواعد (Sprachbausteine)', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.blue, fontSize: 16)),
        const SizedBox(height: 12),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Text(
              q['context'] as String,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
              textDirection: TextDirection.ltr,
            ),
          ),
        ),
        const SizedBox(height: 20),
        ...List.generate(options.length, (idx) {
          final opt = options[idx];
          final isSelected = selected == idx;

          Color borderCol = isDark ? Colors.white10 : Colors.black12;
          Color bgCol = Colors.transparent;

          if (isSelected) {
            borderCol = Theme.of(context).colorScheme.primary;
            bgCol = Theme.of(context).colorScheme.primary.withValues(alpha: 0.05);
          }

          if (_partChecked) {
            final isCorrect = idx == correct;
            if (isCorrect) {
              borderCol = Colors.green;
              bgCol = Colors.green.withValues(alpha: 0.1);
            } else if (isSelected) {
              borderCol = Colors.red;
              bgCol = Colors.red.withValues(alpha: 0.1);
            }
          }

          return Padding(
            padding: const EdgeInsets.only(bottom: 10.0),
            child: InkWell(
              onTap: _partChecked
                  ? null
                  : () {
                      setState(() {
                        _partAnswers['sb_$_currentQIdx'] = idx;
                      });
                    },
              borderRadius: BorderRadius.circular(12),
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: bgCol,
                  border: Border.all(color: borderCol, width: isSelected ? 2 : 1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(opt, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15), textDirection: TextDirection.ltr),
              ),
            ),
          );
        }),
        if (_partChecked && q['explanation'] != null) ...[
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(color: Colors.green.withValues(alpha: 0.05), borderRadius: BorderRadius.circular(8)),
            child: Text('💡 التوضيح: ${q["explanation"]}',
                style: const TextStyle(fontSize: 14, color: Colors.green, fontWeight: FontWeight.bold)),
          ),
        ]
      ],
    );
  }

  // HOEREN BUILDER
  Widget _buildHoerenSection(bool isDark) {
    final parts = _currentHoerenModel?['parts'] as List? ?? [];
    if (_currentPartIdx >= parts.length) return const SizedBox();

    final part = parts[_currentPartIdx];
    final type = part['type'] as String;
    final title = part['title'] as String? ?? '';
    final instructions = part['instructionsAr'] as String? ?? '';
    final transcripts = part['transcripts'] as List? ?? [];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(title, style: TextStyle(fontWeight: FontWeight.bold, color: Theme.of(context).colorScheme.primary, fontSize: 16)),
        const SizedBox(height: 6),
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Colors.blue.withValues(alpha: 0.05),
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: Colors.blue.withValues(alpha: 0.2)),
          ),
          child: Text(instructions, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        // Transcripts player-like view
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                const Icon(Icons.volume_up_rounded, color: Colors.blue, size: 48),
                const SizedBox(height: 12),
                const Text('🔊 تخيّل سماع المقاطع أو اقرأ نصوصها التالية لتجيب:', style: TextStyle(fontSize: 14, color: Colors.grey)),
                const Divider(height: 20),
                ...transcripts.map((t) {
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 12.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        if (t['speaker'] != null)
                          Text(t['speaker'] as String,
                              style: TextStyle(fontWeight: FontWeight.bold, color: Theme.of(context).colorScheme.secondary, fontSize: 14)),
                        Text(
                          t['textDe'] as String? ?? '',
                          style: const TextStyle(fontSize: 14, fontStyle: FontStyle.italic),
                          textDirection: TextDirection.ltr,
                        ),
                      ],
                    ),
                  );
                }),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        _buildHoerenPartInputs(type, part, isDark),
      ],
    );
  }

  Widget _buildHoerenPartInputs(String type, Map<String, dynamic> part, bool isDark) {
    if (type == 'tf-mc') {
      final questions = part['questions'] as List;

      return Column(
        children: questions.map((q) {
          final id = q['id'] as String;
          final isTf = q.containsKey('statementDe');
          final textDe = (q['statementDe'] ?? q['promptDe']) as String;
          final textAr = (q['statementAr'] ?? q['promptAr']) as String? ?? '';
          final selected = _partAnswers[id];

          return Card(
            margin: const EdgeInsets.only(bottom: 16),
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  if (textAr.isNotEmpty)
                    Text(textAr, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  Text(textDe, style: const TextStyle(fontSize: 15, fontStyle: FontStyle.italic), textDirection: TextDirection.ltr),
                  const SizedBox(height: 12),
                  if (isTf) ...[
                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton(
                            onPressed: _partChecked
                                ? null
                                : () => setState(() => _partAnswers[id] = true),
                            style: OutlinedButton.styleFrom(
                              backgroundColor: selected == true
                                  ? (_partChecked
                                      ? (q['correct'] == true ? Colors.green : Colors.red)
                                      : Theme.of(context).colorScheme.primary)
                                  : Colors.transparent,
                              foregroundColor: selected == true ? Colors.white : null,
                              side: _partChecked && q['correct'] == true
                                  ? const BorderSide(color: Colors.green, width: 2)
                                  : null,
                            ),
                            child: const Text('Richtig (صح)'),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: OutlinedButton(
                            onPressed: _partChecked
                                ? null
                                : () => setState(() => _partAnswers[id] = false),
                            style: OutlinedButton.styleFrom(
                              backgroundColor: selected == false
                                  ? (_partChecked
                                      ? (q['correct'] == false ? Colors.green : Colors.red)
                                      : Theme.of(context).colorScheme.primary)
                                  : Colors.transparent,
                              foregroundColor: selected == false ? Colors.white : null,
                              side: _partChecked && q['correct'] == false
                                  ? const BorderSide(color: Colors.green, width: 2)
                                  : null,
                            ),
                            child: const Text('Falsch (خطأ)'),
                          ),
                        ),
                      ],
                    ),
                  ] else ...[
                    // Multiple Choice
                    ...(q['options'] as List).map((opt) {
                      final optId = opt['id'] as String? ?? opt.toString();
                      final optDe = opt['de'] as String? ?? opt.toString();
                      final isSelected = _partAnswers[id].toString() == optId.toString();

                      Color borderCol = isDark ? Colors.white10 : Colors.black12;
                      Color bgCol = Colors.transparent;

                      if (isSelected) {
                        borderCol = Theme.of(context).colorScheme.primary;
                        bgCol = Theme.of(context).colorScheme.primary.withValues(alpha: 0.05);
                      }

                      if (_partChecked) {
                        final isCorrect = optId.toString() == q['correct'].toString();
                        if (isCorrect) {
                          borderCol = Colors.green;
                          bgCol = Colors.green.withValues(alpha: 0.1);
                        } else if (isSelected) {
                          borderCol = Colors.red;
                          bgCol = Colors.red.withValues(alpha: 0.1);
                        }
                      }

                      return Padding(
                        padding: const EdgeInsets.only(bottom: 6.0),
                        child: InkWell(
                          onTap: _partChecked
                              ? null
                              : () {
                                  setState(() {
                                    _partAnswers[id] = optId;
                                  });
                                },
                          borderRadius: BorderRadius.circular(10),
                          child: Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: bgCol,
                              border: Border.all(color: borderCol, width: isSelected ? 2 : 1),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Text(optDe, style: const TextStyle(fontSize: 14), textDirection: TextDirection.ltr),
                          ),
                        ),
                      );
                    }),
                  ],
                  if (_partChecked && q['explanation'] != null) ...[
                    const SizedBox(height: 8),
                    Text('💡 توضيح: ${q["explanation"]}',
                        style: const TextStyle(color: Colors.green, fontSize: 14, fontWeight: FontWeight.bold))
                  ]
                ],
              ),
            ),
          );
        }).toList(),
      );
    } else if (type == 'match-speakers' || type == 'match-opinions') {
      final matchItems = part['matchItems'] as List;
      final options = part['options'] as List;

      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text('✏️ طابق المتحدث بالخيار أو الرأي المناسب:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
          const SizedBox(height: 8),
          ...matchItems.map((item) {
            final id = item['id'] as String;
            final speakerText = item['textDe'] as String;
            final selected = _partAnswers[id];
            final correctAd = item['correctAd'] as String;

            return Card(
              margin: const EdgeInsets.only(bottom: 12),
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text('المتحدث: $speakerText', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    const SizedBox(height: 10),
                    DropdownButtonFormField<String>(
                      initialValue: selected,
                      hint: const Text('طابق الرأي...'),
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                      onChanged: _partChecked
                          ? null
                          : (v) {
                              setState(() {
                                _partAnswers[id] = v;
                              });
                            },
                      items: options.map((opt) {
                        final optId = opt['id'] as String;
                        final optTitle = opt['titleDe'] as String;
                        final optAr = opt['textDe'] as String? ?? '';
                        return DropdownMenuItem<String>(
                          value: optId,
                          child: Text('$optTitle ${optAr.isNotEmpty ? "($optAr)" : ""}', style: const TextStyle(fontSize: 14)),
                        );
                      }).toList(),
                    ),
                    if (_partChecked) ...[
                      const SizedBox(height: 8),
                      Text(
                        selected == correctAd ? '✅ إجابة صحيحة' : '❌ الإجابة الصحيحة هي: ${correctAd.toUpperCase()}',
                        style: TextStyle(
                            color: selected == correctAd ? Colors.green : Colors.red,
                            fontWeight: FontWeight.bold,
                            fontSize: 14),
                      ),
                    ]
                  ],
                ),
              ),
            );
          }),
        ],
      );
    } else if (type == 'tf-dialog') {
      final questions = part['questions'] as List;

      return Column(
        children: questions.map((q) {
          final id = q['id'] as String;
          final statementDe = q['statementDe'] as String;
          final correctVal = q['correct'] as bool;
          final selected = _partAnswers[id] as bool?;

          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(statementDe, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold), textDirection: TextDirection.ltr),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          onPressed: _partChecked
                              ? null
                              : () => setState(() => _partAnswers[id] = true),
                          style: OutlinedButton.styleFrom(
                            backgroundColor: selected == true
                                ? (_partChecked
                                    ? (correctVal == true ? Colors.green : Colors.red)
                                    : Theme.of(context).colorScheme.primary)
                                : Colors.transparent,
                            foregroundColor: selected == true ? Colors.white : null,
                            side: _partChecked && correctVal == true
                                ? const BorderSide(color: Colors.green, width: 2)
                                : null,
                          ),
                          child: const Text('Richtig (صح)'),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: OutlinedButton(
                          onPressed: _partChecked
                              ? null
                              : () => setState(() => _partAnswers[id] = false),
                          style: OutlinedButton.styleFrom(
                            backgroundColor: selected == false
                                ? (_partChecked
                                    ? (correctVal == false ? Colors.green : Colors.red)
                                    : Theme.of(context).colorScheme.primary)
                                : Colors.transparent,
                            foregroundColor: selected == false ? Colors.white : null,
                            side: _partChecked && correctVal == false
                                ? const BorderSide(color: Colors.green, width: 2)
                                : null,
                          ),
                          child: const Text('Falsch (خطأ)'),
                        ),
                      ),
                    ],
                  ),
                  if (_partChecked && q['explanation'] != null) ...[
                    const SizedBox(height: 8),
                    Text('💡 توضيح: ${q["explanation"]}',
                        style: const TextStyle(color: Colors.green, fontSize: 14, fontWeight: FontWeight.bold))
                  ]
                ],
              ),
            ),
          );
        }).toList(),
      );
    }
    return const SizedBox();
  }

  // SCHREIBEN BUILDER
  Widget _buildSchreibenSection(bool isDark) {
    final tasks = _currentSchreibenModel?['tasks'] as List? ?? [];
    if (tasks.isEmpty) return const SizedBox();

    final wordCount = _schreibenController.text.trim().split(RegExp(r'\s+')).where((e) => e.isNotEmpty).length;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Text('القسم 4: الكتابة (Schreiben)', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.blue, fontSize: 16)),
        const SizedBox(height: 12),
        // Task selection pills
        Row(
          children: List.generate(tasks.length, (idx) {
            final t = tasks[idx];
            final isSelected = _selectedSchreibenTask == t;
            return Expanded(
              child: GestureDetector(
                onTap: _schreibenSubmitted
                    ? null
                    : () {
                        setState(() {
                          _selectedSchreibenTask = t;
                          _schreibenController.clear();
                        });
                      },
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  decoration: BoxDecoration(
                    color: isSelected ? Theme.of(context).colorScheme.primary : (isDark ? Colors.white10 : Colors.grey[200]),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Center(
                    child: Text(
                      'المهمة ${idx + 1}',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: isSelected ? Colors.white : (isDark ? Colors.white70 : Colors.black87),
                        fontSize: 14,
                      ),
                    ),
                  ),
                ),
              ),
            );
          }),
        ),
        const SizedBox(height: 16),
        if (_selectedSchreibenTask != null) ...[
          Text(
            _selectedSchreibenTask!['typeAr'] as String? ?? '',
            style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 4),
          Text(
            _selectedSchreibenTask!['promptAr'] as String? ?? '',
            style: const TextStyle(fontSize: 14, color: Colors.grey, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          // Task points
          ...(_selectedSchreibenTask!['requirements'] as List? ?? []).map((p) => Padding(
                padding: const EdgeInsets.only(bottom: 6.0),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.circle, size: 8, color: Colors.blue),
                    const SizedBox(width: 8),
                    Expanded(child: Text(p as String, style: const TextStyle(fontSize: 15))),
                  ],
                ),
              )),
          const SizedBox(height: 16),
          if (!_schreibenSubmitted) ...[
            TextField(
              controller: _schreibenController,
              maxLines: 8,
              onChanged: (v) => setState(() {}),
              style: const TextStyle(fontSize: 13),
              decoration: InputDecoration(
                hintText: 'Sehr geehrte Damen und Herren, ...',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                counterText: 'عدد الكلمات: $wordCount (المطلوب: 80 - 100 كلمة)',
                counterStyle: TextStyle(
                  color: (wordCount >= 80 && wordCount <= 120) ? Colors.green : Colors.red,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: wordCount < 20
                  ? null
                  : () {
                      setState(() {
                        _schreibenSubmitted = true;
                      });
                    },
              child: const Text('تسليم ورقة الكتابة 📝', style: TextStyle(fontWeight: FontWeight.bold)),
            )
          ] else ...[
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.green.withValues(alpha: 0.05),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: Colors.green.withValues(alpha: 0.2)),
              ),
              child: const Text('✅ تم استلام إجابتك بنجاح! قارن نصك بالحل النموذجي المقترح أدناه:',
                  style: TextStyle(fontWeight: FontWeight.bold, color: Colors.green, fontSize: 13)),
            ),
            const SizedBox(height: 16),
            const Text('💡 الحل النموذجي المقترح:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.blue)),
            const SizedBox(height: 8),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text(
                  _selectedSchreibenTask!['sampleAnswer'] as String? ?? '',
                  style: const TextStyle(fontSize: 13, height: 1.5),
                  textDirection: TextDirection.ltr,
                ),
              ),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: _advancePhase,
              child: const Text('عرض نتائج الامتحان الإجمالية 📊'),
            )
          ]
        ]
      ],
    );
  }

  // RESULT BUILDER
  Widget _buildResultSection(bool isDark) {
    final totalCorrect = _scoreLesen + _scoreSprach + _scoreHoeren;
    final totalPossible = _totalLesenQ + _totalSprachQ + _totalHoerenQ;
    final totalPercent = totalPossible > 0 ? (totalCorrect / totalPossible) * 100 : 0.0;
    final passed = totalPercent >= 60;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Icon(
          passed ? Icons.emoji_events_rounded : Icons.sentiment_very_dissatisfied,
          color: passed ? Colors.amber : Colors.red,
          size: 80,
        ),
        const SizedBox(height: 16),
        Text(
          passed ? 'مبروك! لقد اجتزت امتحان المحاكاة! 🎉' : 'للأسف لم تجتز الامتحان هذه المرة. 💔',
          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 8),
        Text(
          passed ? 'لقد حصلت على علامة نجاح ممتازة. +150 XP لنقاطك!' : 'النجاح يتطلب 60% على الأقل. استمر في التدريب لتحسين مستواك.',
          style: const TextStyle(color: Colors.grey, fontSize: 12),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 24),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                _resultRow('علامة القراءة (Lesen)', '$_scoreLesen / $_totalLesenQ'),
                _resultRow('علامة القواعد (Sprachbausteine)', '$_scoreSprach / $_totalSprachQ'),
                _resultRow('علامة الاستماع (Hören)', '$_scoreHoeren / $_totalHoerenQ'),
                const Divider(height: 24),
                _resultRow('النسبة المئوية الإجمالية', '${totalPercent.toStringAsFixed(1)}%'),
                _resultRow('الحالة النهائية', passed ? 'ناجح ✅' : 'يحتاج تدريب ❌'),
              ],
            ),
          ),
        ),
        const SizedBox(height: 32),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _phase = 'intro';
              _selectedExam = null;
            });
          },
          child: const Text('لوحة التحكم والنماذج 🔄', style: TextStyle(fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 12),
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('العودة للشاشة الرئيسية'),
        )
      ],
    );
  }

  Widget _resultRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
          Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.orange)),
        ],
      ),
    );
  }
}
