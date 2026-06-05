import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:confetti/confetti.dart';
import '../providers/app_provider.dart';
import '../data/lesen_data.dart';
import '../data/hoeren_data.dart';
import '../data/schreiben_data.dart';
import '../data/sprachbausteine_data.dart';

class ExamSimulationScreen extends StatefulWidget {
  const ExamSimulationScreen({super.key});

  @override
  State<ExamSimulationScreen> createState() => _ExamSimulationScreenState();
}

class _ExamSimulationScreenState extends State<ExamSimulationScreen> {
  // Exam phases: 'intro', 'lesen', 'sprachbausteine', 'hoeren', 'schreiben', 'result'
  String _phase = 'intro';
  late ConfettiController _confettiController;
  
  // Timer settings
  Timer? _timer;
  int _secondsRemaining = 0;
  bool _timerExpired = false;

  // Active section data
  int _scoreLesen = 0;
  int _scoreSprach = 0;
  int _scoreHoeren = 0;
  bool _schreibenSubmitted = false;

  // Question indexes & answers
  int _currentIdx = 0;
  int? _selectedAns;
  bool _answered = false;

  // Schreiben prompt
  late Map<String, dynamic> _schreibenPrompt;
  final TextEditingController _schreibenController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 3));
    // Load random writing prompt
    if (schreibenLetters.isNotEmpty) {
      _schreibenPrompt = schreibenLetters[0];
    } else {
      _schreibenPrompt = {
        'titleDe': 'Beschwerdebrief',
        'promptAr': 'اكتب شكوى لشركة الإنترنت بسبب انقطاع الخدمة.',
        'points': ['متى انقطعت الخدمة', 'الأضرار التي لحقت بك', 'ماذا تطلب منهم', 'مهلة الحل'],
        'sampleAnswer': 'Sehr geehrte Damen und Herren...'
      };
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    _confettiController.dispose();
    _schreibenController.dispose();
    super.dispose();
  }

  void _startExam() {
    setState(() {
      _phase = 'lesen';
      _secondsRemaining = 60 * 15; // 15 mins for Lesen in simulation
      _scoreLesen = 0;
      _scoreSprach = 0;
      _scoreHoeren = 0;
      _currentIdx = 0;
      _answered = false;
      _selectedAns = null;
      _timerExpired = false;
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
      _currentIdx = 0;
      _answered = false;
      _selectedAns = null;

      if (_phase == 'lesen') {
        _phase = 'sprachbausteine';
        _secondsRemaining = 60 * 5; // 5 mins
        _startTimer();
      } else if (_phase == 'sprachbausteine') {
        _phase = 'hoeren';
        _secondsRemaining = 60 * 5; // 5 mins
        _startTimer();
      } else if (_phase == 'hoeren') {
        _phase = 'schreiben';
        _secondsRemaining = 60 * 10; // 10 mins
        _startTimer();
      } else if (_phase == 'schreiben') {
        _phase = 'result';
        _showResultSummary();
      }
    });
  }

  void _showResultSummary() {
    final double totalPercent = ((_scoreLesen + _scoreSprach + _scoreHoeren) / 15) * 100;
    if (totalPercent >= 60) {
      _confettiController.play();
      context.read<AppProvider>().addXP(150); // High XP reward for simulation
    }
  }

  String _formatTime(int totalSeconds) {
    final minutes = (totalSeconds / 60).floor();
    final seconds = totalSeconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
  }

  void _answerQuestion(int idx, int correctIdx) {
    if (_answered) return;
    setState(() {
      _selectedAns = idx;
      _answered = true;
      final isCorrect = idx == correctIdx;

      if (_phase == 'lesen') {
        if (isCorrect) _scoreLesen++;
      } else if (_phase == 'sprachbausteine') {
        if (isCorrect) _scoreSprach++;
      } else if (_phase == 'hoeren') {
        if (isCorrect) _scoreHoeren++;
      }
    });
  }

  void _nextQuestion(int totalQuestions) {
    if (_currentIdx < totalQuestions - 1) {
      setState(() {
        _currentIdx++;
        _answered = false;
        _selectedAns = null;
      });
    } else {
      _advancePhase();
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scaffoldBg = isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC);
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final textMuted = isDark ? Colors.white60 : const Color(0xFF64748B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: AppBar(
        title: const Text('محاكي امتحان Telc B1 الحقيقي 🎓', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
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
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.red.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.timer, color: Colors.red, size: 16),
                      const SizedBox(width: 4),
                      Text(
                        _formatTime(_secondsRemaining),
                        style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.red, fontSize: 13),
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
          if (_phase == 'intro') _buildIntro(isDark, textMain, textMuted, cardBg, borderCol),
          if (_phase == 'lesen') _buildLesenSection(isDark, textMain, textMuted, cardBg, borderCol),
          if (_phase == 'sprachbausteine') _buildSprachbausteineSection(isDark, textMain, textMuted, cardBg, borderCol),
          if (_phase == 'hoeren') _buildHoerenSection(isDark, textMain, textMuted, cardBg, borderCol),
          if (_phase == 'schreiben') _buildSchreibenSection(isDark, textMain, textMuted, cardBg, borderCol),
          if (_phase == 'result') _buildResultSection(isDark, textMain, textMuted, cardBg, borderCol),
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

  Widget _buildIntro(bool isDark, Color textMain, Color textMuted, Color cardBg, Color borderCol) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Icon(Icons.timer_sharp, color: Colors.red, size: 80),
          const SizedBox(height: 16),
          const Text(
            'استعد لمحاكاة الامتحان الكامل! 📝',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          const Text(
            'محاكاة كاملة تحاكي ضغط الوقت والامتحان الحقيقي تماماً. سيمر الاختبار بالأقسام التالية تلقائياً:',
            style: TextStyle(color: Colors.grey, fontSize: 13, height: 1.5),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          Card(
            color: cardBg,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: borderCol)),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  _introSectionRow('1. القراءة (Lesen)', '5 أسئلة - مؤقت 15 دقيقة'),
                  _introSectionRow('2. القواعد (Sprachbausteine)', '5 أسئلة - مؤقت 5 دقائق'),
                  _introSectionRow('3. الاستماع (Hören)', '5 أسئلة - مؤقت 5 دقائق'),
                  _introSectionRow('4. الكتابة (Schreiben)', 'رسالة واحدة - مؤقت 10 دقائق'),
                ],
              ),
            ),
          ),
          const SizedBox(height: 32),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              elevation: 3,
            ),
            onPressed: _startExam,
            child: const Text('ابدأ المحاكاة الآن 🚀', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          ),
        ],
      ),
    );
  }

  Widget _introSectionRow(String section, String duration) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(section, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
          Text(duration, style: const TextStyle(color: Colors.grey, fontSize: 12)),
        ],
      ),
    );
  }

  // LESEN SECTION
  Widget _buildLesenSection(bool isDark, Color textMain, Color textMuted, Color cardBg, Color borderCol) {
    final List<Map<String, dynamic>> questions = [
      {
        'title': 'الإعلانات والبحث عن وظيفة 📰',
        'question': 'أحمد مهندس حاسوب ذو خبرة، يبحث عن وظيفة بدوام كامل في برلين ولا يمانع السفر. أي إعلان يناسبه؟',
        'options': [
          'أ) مبرمج حاسوب بدوام جزئي في ميونخ.',
          'ب) مهندس شبكات بدوام كامل في برلين مع رغبة في السفر.',
          'ج) دورة تدريبية لتعليم أساسيات الكمبيوتر.'
        ],
        'correct': 1,
        'hint': 'الإعلان ب يتطابق مع شروط برلين، دوام كامل، السفر.'
      },
      {
        'title': 'إيجار شقة 🏠',
        'question': 'عائلة تبحث عن شقة لا تقل عن 3 غرف في كولن بسعر لا يتجاوز 900 يورو دافئ. أي خيار مناسب؟',
        'options': [
          'أ) شقة غرفتين في وسط كولن بـ 850 يورو دافئ.',
          'ب) شقة 4 غرف في كولن بـ 800 يورو بارد (الدافئ 1050 يورو).',
          'ج) شقة 3 غرف في كولن بـ 880 يورو دافئ.'
        ],
        'correct': 2,
        'hint': 'الشقة ج تناسب المساحة والموقع والسعر الدافئ.'
      },
    ];

    if (_currentIdx >= questions.length) {
      _advancePhase();
      return const SizedBox();
    }

    final q = questions[_currentIdx];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text('القسم 1: القراءة (Lesen)', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.blue)),
          const SizedBox(height: 8),
          Text(q['title'] as String, style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: textMain)),
          const SizedBox(height: 16),
          Card(
            color: cardBg,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: borderCol)),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                q['question'] as String,
                style: TextStyle(fontSize: 14, height: 1.5, color: textMain),
              ),
            ),
          ),
          const SizedBox(height: 20),
          ...List.generate((q['options'] as List).length, (idx) {
            final opt = (q['options'] as List)[idx] as String;
            final isCorrect = idx == q['correct'];
            final isSelected = _selectedAns == idx;

            Color itemBorder = borderCol;
            Color itemBg = cardBg;

            if (_answered) {
              if (isCorrect) {
                itemBorder = Colors.green;
                itemBg = Colors.green.withValues(alpha: 0.1);
              } else if (isSelected) {
                itemBorder = Colors.red;
                itemBg = Colors.red.withValues(alpha: 0.1);
              }
            }

            return Padding(
              padding: const EdgeInsets.only(bottom: 12.0),
              child: InkWell(
                onTap: _answered ? null : () => _answerQuestion(idx, q['correct'] as int),
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: itemBg,
                    border: Border.all(color: itemBorder, width: 2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(opt, style: TextStyle(fontWeight: FontWeight.bold, color: textMain)),
                ),
              ),
            );
          }),
          if (_answered) ...[
            const SizedBox(height: 12),
            Text('💡 التوضيح: ${q["hint"]}', style: const TextStyle(fontSize: 12, color: Colors.green, fontWeight: FontWeight.bold)),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => _nextQuestion(questions.length),
              child: const Text('السؤال التالي ➡️'),
            )
          ]
        ],
      ),
    );
  }

  // SPRACHBAUSTEINE SECTION
  Widget _buildSprachbausteineSection(bool isDark, Color textMain, Color textMuted, Color cardBg, Color borderCol) {
    final List<Map<String, dynamic>> questions = [
      {
        'sentence': 'Ich freue mich sehr ___ deinen Brief.',
        'options': ['auf', 'über', 'an', 'für'],
        'correct': 1,
        'hint': 'sich freuen über + Akk للماضي والحاضر (رسالة وصلت بالفعل).'
      },
      {
        'sentence': 'Wegen ___ schlechten Wetters bleiben wir heute zu Hause.',
        'options': ['dem', 'den', 'des', 'das'],
        'correct': 2,
        'hint': 'wegen يأخذ Genitiv للمحايد (das Wetter -> des Wetters).'
      }
    ];

    if (_currentIdx >= questions.length) {
      _advancePhase();
      return const SizedBox();
    }

    final q = questions[_currentIdx];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text('القسم 2: القواعد (Sprachbausteine)', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.blue)),
          const SizedBox(height: 16),
          Card(
            color: cardBg,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: borderCol)),
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Text(
                q['sentence'] as String,
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: textMain),
                textAlign: TextAlign.center,
                textDirection: TextDirection.ltr,
              ),
            ),
          ),
          const SizedBox(height: 20),
          ...List.generate((q['options'] as List).length, (idx) {
            final opt = (q['options'] as List)[idx] as String;
            final isCorrect = idx == q['correct'];
            final isSelected = _selectedAns == idx;

            Color itemBorder = borderCol;
            Color itemBg = cardBg;

            if (_answered) {
              if (isCorrect) {
                itemBorder = Colors.green;
                itemBg = Colors.green.withValues(alpha: 0.1);
              } else if (isSelected) {
                itemBorder = Colors.red;
                itemBg = Colors.red.withValues(alpha: 0.1);
              }
            }

            return Padding(
              padding: const EdgeInsets.only(bottom: 12.0),
              child: InkWell(
                onTap: _answered ? null : () => _answerQuestion(idx, q['correct'] as int),
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: itemBg,
                    border: Border.all(color: itemBorder, width: 2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(opt, style: TextStyle(fontWeight: FontWeight.bold, color: textMain), textDirection: TextDirection.ltr),
                ),
              ),
            );
          }),
          if (_answered) ...[
            const SizedBox(height: 12),
            Text('💡 التوضيح: ${q["hint"]}', style: const TextStyle(fontSize: 12, color: Colors.green, fontWeight: FontWeight.bold)),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => _nextQuestion(questions.length),
              child: const Text('السؤال التالي ➡️'),
            )
          ]
        ],
      ),
    );
  }

  // HOEREN SECTION
  Widget _buildHoerenSection(bool isDark, Color textMain, Color textMuted, Color cardBg, Color borderCol) {
    final List<Map<String, dynamic>> questions = [
      {
        'transcript': '„Gleis 4, bitte beachten Sie: Der ICE nach Frankfurt fällt heute wegen eines technischen Defekts aus.“',
        'question': 'ما هو التفسير الصحيح لهذا الإعلان الصوتي في المحطة؟',
        'options': [
          'أ) القطار سيتأخر 10 دقائق.',
          'ب) القطار سيسافر من رصيف آخر.',
          'ج) تم إلغاء رحلة القطار بالكامل.'
        ],
        'correct': 2,
        'hint': 'كلمة Ausfallen تعني الإلغاء.'
      },
      {
        'transcript': '„Liebe Kunden, besuchen Sie unsere Gemüseabteilung: Heute gibt es Tomaten zum halben Preis!“',
        'question': 'أين تسمع هذا الإعلان الصوتي؟',
        'options': [
          'أ) في محطة القطار.',
          'ب) في السوبرماركت.',
          'ج) في الصيدلية.'
        ],
        'correct': 1,
        'hint': 'الحديث عن الطماطم وقسم الخضار يدل على السوبرماركت.'
      }
    ];

    if (_currentIdx >= questions.length) {
      _advancePhase();
      return const SizedBox();
    }

    final q = questions[_currentIdx];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text('القسم 3: الاستماع (Hören)', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.blue)),
          const SizedBox(height: 16),
          Card(
            color: cardBg,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: borderCol)),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  const Icon(Icons.volume_up, color: Colors.blue, size: 40),
                  const SizedBox(height: 12),
                  const Text('🔊 تخيل سماع النص التالي:', style: TextStyle(fontSize: 12, color: Colors.grey)),
                  const SizedBox(height: 8),
                  Text(
                    q['transcript'] as String,
                    style: TextStyle(fontSize: 14, height: 1.5, color: textMain, fontStyle: FontStyle.italic),
                    textAlign: TextAlign.center,
                    textDirection: TextDirection.ltr,
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 20),
          Text(q['question'] as String, style: TextStyle(fontWeight: FontWeight.bold, color: textMain, fontSize: 14)),
          const SizedBox(height: 12),
          ...List.generate((q['options'] as List).length, (idx) {
            final opt = (q['options'] as List)[idx] as String;
            final isCorrect = idx == q['correct'];
            final isSelected = _selectedAns == idx;

            Color itemBorder = borderCol;
            Color itemBg = cardBg;

            if (_answered) {
              if (isCorrect) {
                itemBorder = Colors.green;
                itemBg = Colors.green.withValues(alpha: 0.1);
              } else if (isSelected) {
                itemBorder = Colors.red;
                itemBg = Colors.red.withValues(alpha: 0.1);
              }
            }

            return Padding(
              padding: const EdgeInsets.only(bottom: 12.0),
              child: InkWell(
                onTap: _answered ? null : () => _answerQuestion(idx, q['correct'] as int),
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: itemBg,
                    border: Border.all(color: itemBorder, width: 2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(opt, style: TextStyle(fontWeight: FontWeight.bold, color: textMain)),
                ),
              ),
            );
          }),
          if (_answered) ...[
            const SizedBox(height: 12),
            Text('💡 التوضيح: ${q["hint"]}', style: const TextStyle(fontSize: 12, color: Colors.green, fontWeight: FontWeight.bold)),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => _nextQuestion(questions.length),
              child: const Text('السؤال التالي ➡️'),
            )
          ]
        ],
      ),
    );
  }

  // SCHREIBEN SECTION
  Widget _buildSchreibenSection(bool isDark, Color textMain, Color textMuted, Color cardBg, Color borderCol) {
    final wordCount = _schreibenController.text.trim().split(RegExp(r'\s+')).where((e) => e.isNotEmpty).length;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text('القسم 4: الكتابة (Schreiben)', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.blue)),
          const SizedBox(height: 12),
          Text(
            _schreibenPrompt['titleDe'] as String? ?? '',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: textMain),
            textDirection: TextDirection.ltr,
          ),
          const SizedBox(height: 4),
          Text(
            _schreibenPrompt['promptAr'] as String? ?? '',
            style: const TextStyle(fontSize: 13, color: Colors.grey, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          // Prompt points
          ...(_schreibenPrompt['points'] as List? ?? []).map((p) => Padding(
                padding: const EdgeInsets.only(bottom: 4.0),
                child: Row(
                  children: [
                    const Icon(Icons.circle, size: 8, color: Colors.blue),
                    const SizedBox(width: 8),
                    Expanded(child: Text(p as String, style: TextStyle(fontSize: 12, color: textMain))),
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
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              onPressed: () {
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
                border: Border.all(color: Colors.green.withValues(alpha: 0.15)),
              ),
              child: const Text('✅ تم استلام إجابتك بنجاح! قارن نصك بالحل النموذجي أدناه:', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.green)),
            ),
            const SizedBox(height: 16),
            const Text('💡 الحل النموذجي المقترح:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.blue)),
            const SizedBox(height: 8),
            Card(
              color: cardBg,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: borderCol)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text(
                  _schreibenPrompt['sampleAnswer'] as String? ?? '',
                  style: TextStyle(fontSize: 13, height: 1.5, color: textMain),
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
        ],
      ),
    );
  }

  // RESULT SECTION
  Widget _buildResultSection(bool isDark, Color textMain, Color textMuted, Color cardBg, Color borderCol) {
    final totalCorrect = _scoreLesen + _scoreSprach + _scoreHoeren;
    final totalPercent = (totalCorrect / 6) * 100; // Out of 6 quiz questions
    final passed = totalPercent >= 60;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Icon(
            passed ? Icons.emoji_events : Icons.sentiment_very_dissatisfied,
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
            style: const TextStyle(color: Colors.grey, fontSize: 13),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          Card(
            color: cardBg,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: borderCol)),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  _resultRow('علامة القراءة (Lesen)', '$_scoreLesen / 2'),
                  _resultRow('علامة القواعد (Sprachbausteine)', '$_scoreSprach / 2'),
                  _resultRow('علامة الاستماع (Hören)', '$_scoreHoeren / 2'),
                  const Divider(),
                  _resultRow('النسبة المئوية الإجمالية', '${totalPercent.toStringAsFixed(1)}%'),
                  _resultRow('الحالة النهائية', passed ? 'ناجح ✅' : 'يحتاج تدريب ❌'),
                ],
              ),
            ),
          ),
          const SizedBox(height: 32),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF10B981),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 14),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            onPressed: () {
              setState(() {
                _phase = 'intro';
                _schreibenSubmitted = false;
                _schreibenController.clear();
              });
            },
            child: const Text('إعادة المحاكاة 🔄', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
          const SizedBox(height: 12),
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('العودة للشاشة الرئيسية'),
          )
        ],
      ),
    );
  }

  Widget _resultRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6.0),
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
