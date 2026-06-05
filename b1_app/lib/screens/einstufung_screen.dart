import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:confetti/confetti.dart';
import '../providers/app_provider.dart';

class EinstufungScreen extends StatefulWidget {
  const EinstufungScreen({super.key});

  @override
  State<EinstufungScreen> createState() => _EinstufungScreenState();
}

class _EinstufungScreenState extends State<EinstufungScreen> {
  late ConfettiController _confettiController;
  int _currentIdx = 0;
  int _score = 0;
  int? _selectedAnswer;
  bool _answered = false;
  bool _finished = false;

  final List<Map<String, dynamic>> _questions = [
    {
      'q': 'Ich ___ ein Buch.',
      'level': 'A1',
      'opts': ['lesen', 'lese', 'liest', 'lest'],
      'correct': 1,
      'explain': 'الفاعل Ich يأخذ النهاية e للفعل المضارع (ich lese).'
    },
    {
      'q': 'Woher ___ du?',
      'level': 'A1',
      'opts': ['kommen', 'kommt', 'kommst', 'komme'],
      'correct': 2,
      'explain': 'الفاعل du يأخذ النهاية st للفعل المضارع (du kommst).'
    },
    {
      'q': 'Ich helfe ___ Kind.',
      'level': 'A2',
      'opts': ['das', 'dem', 'den', 'des'],
      'correct': 1,
      'explain': 'الفعل helfen يتطلب حالة المجرور Dativ. الاسم المحايد das Kind يصبح dem Kind.'
    },
    {
      'q': 'Ich gehe in ___ Stadt.',
      'level': 'A2',
      'opts': ['die', 'der', 'das', 'den'],
      'correct': 0,
      'explain': 'هنا حركة (Wohin) إلى أين؟ نستخدم حالة النصب Akkusativ. الاسم المؤنث die Stadt يبقى die Stadt.'
    },
    {
      'q': 'Ich habe das Auto ___ Vater gegeben.',
      'level': 'A2',
      'opts': ['meinem', 'meinen', 'meines', 'meinem'],
      'correct': 0,
      'explain': 'الفعل geben يعطي المفعول لأجله Dativ (الأب) ومفعولاً به Akkusativ (السيارة). الأب مذكر Dativ -> meinem Vater.'
    },
    {
      'q': 'Ich freue mich ___ deinen Brief.',
      'level': 'B1',
      'opts': ['auf', 'über', 'an', 'für'],
      'correct': 1,
      'explain': 'حرف الجر über مع sich freuen يعني الفرح بشيء حدث في الماضي أو الحاضر (رسالتك التي وصلتني).'
    },
    {
      'q': '___ des schlechten Wetters gingen wir spazieren.',
      'level': 'B1',
      'opts': ['Wegen', 'Trotz', 'Während', 'Anstatt'],
      'correct': 1,
      'explain': 'Trotz تعني بالرغم من وتطلب حالة المضاف إليه Genitiv. (بالرغم من الطقس السيء ذهبنا للمشي).'
    },
    {
      'q': 'Ich bin hier, ___ Deutsch zu lernen.',
      'level': 'B1',
      'opts': ['um', 'damit', 'weil', 'dass'],
      'correct': 0,
      'explain': 'التركيب um ... zu يعني من أجل القيام بشيء (um Deutsch zu lernen).'
    },
    {
      'q': 'Wenn ich Zeit ___ , würde ich reisen.',
      'level': 'B1',
      'opts': ['habe', 'hätte', 'hatte', 'hast'],
      'correct': 1,
      'explain': 'شرط افتراضي غير واقعي في الحاضر يستوجب استخدام Konjunktiv II للفعل haben وهو (hätte).'
    },
    {
      'q': 'Sie ist müde, ___ sie hat viel gearbeitet.',
      'level': 'B1',
      'opts': ['weil', 'denn', 'obwohl', 'dass'],
      'correct': 1,
      'explain': 'denn تعطي معنى "لأن" وتأتي بترتيب الجملة الأساسية (V2) بينما weil تأخذ الفعل للنهاية.'
    },
    {
      'q': 'Das ist der Mann, ___ Hund bellt.',
      'level': 'B2',
      'opts': ['den', 'dem', 'dessen', 'deren'],
      'correct': 2,
      'explain': 'dessen هي أداة موصول للملكية للمفرد المذكر (الذي ينبح كلبه).'
    },
    {
      'q': 'Je mehr du lernst, ___ besser wirst du.',
      'level': 'B2',
      'opts': ['desto', 'so', 'als', 'wie'],
      'correct': 0,
      'explain': 'التركيب المزدوج Je ... desto يعني كلما... كلما... ويتطلب الصفة بصيغة المقارنة.'
    },
    {
      'q': 'Er tut so, als ___ er krank.',
      'level': 'B2',
      'opts': ['ist', 'war', 'wäre', 'sei'],
      'correct': 2,
      'explain': 'als ob أو als تعني كأن وتتطلب حالة التمني/الافتراض Konjunktiv II (wäre).'
    },
    {
      'q': 'Nachdem er gegessen ___ , ging er schlafen.',
      'level': 'B2',
      'opts': ['hatte', 'hat', 'würde', 'war'],
      'correct': 0,
      'explain': 'بعد nachdem إذا كانت الجملة الأساسية في الماضي البسيط Präteritum (ging)، فإن جملة nachdem تأتي بالماضي التام Plusquamperfekt (hatte gegessen).'
    },
    {
      'q': 'Er wurde ___ einem Arzt untersucht.',
      'level': 'B2',
      'opts': ['von', 'durch', 'mit', 'bei'],
      'correct': 0,
      'explain': 'في المبني للمجهول Passiv، يشار للفاعل العاقل بـ von + Dativ (von einem Arzt).'
    }
  ];

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 3));
  }

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  String _calculateLevel(int score) {
    if (score <= 4) return 'A1';
    if (score <= 8) return 'A2';
    if (score <= 12) return 'B1';
    return 'B2';
  }

  void _answerQuestion(int index) {
    if (_answered) return;
    setState(() {
      _selectedAnswer = index;
      _answered = true;
      if (index == _questions[_currentIdx]['correct']) {
        _score++;
      }
    });
  }

  void _nextQuestion() {
    if (_currentIdx < _questions.length - 1) {
      setState(() {
        _currentIdx++;
        _selectedAnswer = null;
        _answered = false;
      });
    } else {
      setState(() {
        _finished = true;
      });
      _confettiController.play();
      // Reward user with 50 XP for completing placement test
      context.read<AppProvider>().addXP(50);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('اختبار تحديد المستوى 📊', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
      ),
      body: Stack(
        alignment: Alignment.center,
        children: [
          _finished ? _buildResultScreen(cardBg, textMain) : _buildQuizScreen(cardBg, textMain),
          Align(
            alignment: Alignment.topCenter,
            child: ConfettiWidget(
              confettiController: _confettiController,
              blastDirectionality: BlastDirectionality.explosive,
              shouldLoop: false,
              colors: const [Colors.green, Colors.blue, Colors.orange, Colors.red, Colors.amber],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildQuizScreen(Color cardBg, Color textMain) {
    final q = _questions[_currentIdx];
    final opts = q['opts'] as List<String>;
    final progress = (_currentIdx + 1) / _questions.length;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'سؤال ${_currentIdx + 1} من ${_questions.length}',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.grey),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.blue.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  q['level'],
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.blue),
                ),
              )
            ],
          ),
          const SizedBox(height: 12),
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: LinearProgressIndicator(
              value: progress,
              minHeight: 8,
              backgroundColor: Colors.grey[300],
              valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF10B981)),
            ),
          ),
          const SizedBox(height: 24),
          Card(
            color: cardBg,
            elevation: 2,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Text(
                q['q'],
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: textMain),
                textDirection: TextDirection.ltr,
                textAlign: TextAlign.center,
              ),
            ),
          ),
          const SizedBox(height: 24),
          ...List.generate(opts.length, (idx) {
            final opt = opts[idx];
            final isCorrect = idx == q['correct'];
            final isSelected = _selectedAnswer == idx;

            Color borderColor = Colors.grey[300]!;
            Color itemBg = cardBg;
            Widget? trailingIcon;

            if (_answered) {
              if (isCorrect) {
                borderColor = Colors.green;
                itemBg = Colors.green.withValues(alpha: 0.1);
                trailingIcon = const Icon(Icons.check_circle, color: Colors.green);
              } else if (isSelected) {
                borderColor = Colors.red;
                itemBg = Colors.red.withValues(alpha: 0.1);
                trailingIcon = const Icon(Icons.cancel, color: Colors.red);
              }
            } else if (isSelected) {
              borderColor = const Color(0xFF10B981);
            }

            return Padding(
              padding: const EdgeInsets.only(bottom: 12.0),
              child: InkWell(
                onTap: _answered ? null : () => _answerQuestion(idx),
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
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: textMain),
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
          if (_answered) ...[
            const SizedBox(height: 16),
            Card(
              color: Colors.amber.withValues(alpha: 0.05),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
                side: BorderSide(color: Colors.amber.withValues(alpha: 0.2)),
              ),
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Row(
                  children: [
                    const Text('💡', style: TextStyle(fontSize: 20)),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        q['explain'],
                        style: TextStyle(fontSize: 13, color: textMain.withValues(alpha: 0.8), height: 1.4),
                      ),
                    )
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF10B981),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: _nextQuestion,
                child: Text(
                  _currentIdx < _questions.length - 1 ? 'السؤال التالي ➡️' : 'عرض النتيجة 🏆',
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                ),
              ),
            ),
          ]
        ],
      ),
    );
  }

  Widget _buildResultScreen(Color cardBg, Color textMain) {
    final finalLevel = _calculateLevel(_score);

    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Card(
          color: cardBg,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
          elevation: 4,
          child: Padding(
            padding: const EdgeInsets.all(32.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.emoji_events, size: 72, color: Colors.amber),
                const SizedBox(height: 16),
                const Text(
                  'اكتمل اختبار تحديد المستوى! 🎉',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 12),
                Text(
                  'أجبت بشكل صحيح على $_score من أصل ${_questions.length} أسئلة.',
                  style: const TextStyle(fontSize: 14, color: Colors.grey),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 24),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                  decoration: BoxDecoration(
                    color: const Color(0xFF10B981).withValues(alpha: 0.1),
                    border: Border.all(color: const Color(0xFF10B981), width: 2),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    children: [
                      const Text(
                        'مستواك التقريبي هو:',
                        style: TextStyle(fontSize: 12, color: Colors.grey, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        finalLevel,
                        style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                const Text(
                  'تمت إضافة +50 XP لملفك الشخصي! 🔥',
                  style: TextStyle(fontWeight: FontWeight.bold, color: Colors.orange, fontSize: 13),
                ),
                const SizedBox(height: 32),
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF10B981),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    onPressed: () => Navigator.pop(context),
                    child: const Text('بدء الدراسة 📚', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                  ),
                ),
                const SizedBox(height: 12),
                TextButton(
                  onPressed: () {
                    setState(() {
                      _currentIdx = 0;
                      _score = 0;
                      _selectedAnswer = null;
                      _answered = false;
                      _finished = false;
                    });
                  },
                  child: const Text('إعادة الاختبار 🔄', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
