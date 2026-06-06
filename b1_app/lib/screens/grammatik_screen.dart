import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import '../data/grammatik_data.dart';
import '../providers/app_provider.dart';

class GrammatikScreen extends StatelessWidget {
  const GrammatikScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('القواعد - Grammatik', style: TextStyle(fontWeight: FontWeight.bold)),
          centerTitle: true,
          bottom: TabBar(
            isScrollable: true,
            tabAlignment: TabAlignment.start,
            indicatorColor: Theme.of(context).colorScheme.primary,
            labelColor: Theme.of(context).colorScheme.primary,
            unselectedLabelColor: Theme.of(context).colorScheme.onSurfaceVariant,
            labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
            tabs: const [
              Tab(text: 'دروس القواعد', icon: Icon(Icons.menu_book_rounded)),
              Tab(text: 'أخطاء شائعة', icon: Icon(Icons.do_not_disturb_on_rounded)),
              Tab(text: 'بناء الجمل (تفاعلي)', icon: Icon(Icons.extension_rounded)),
              Tab(text: 'أفعال مركّبة', icon: Icon(Icons.transform_rounded)),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            _LessonsList(),
            _MistakesList(),
            _SatzbauList(),
            _TrennbarList(),
          ],
        ),
      ),
    );
  }
}

class _LessonsList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      itemCount: grammarLessons.length,
      itemBuilder: (ctx, i) {
        final l = grammarLessons[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          clipBehavior: Clip.antiAlias,
          child: Container(
            decoration: BoxDecoration(
              border: Border(
                right: BorderSide(
                  color: Theme.of(context).colorScheme.primary,
                  width: 4,
                ),
              ),
            ),
            child: ListTile(
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              leading: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primaryContainer,
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Text(
                    '${i + 1}',
                    style: TextStyle(
                      color: Theme.of(context).colorScheme.onPrimaryContainer,
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                    ),
                  ),
                ),
              ),
              title: Text(
                l['title'] as String,
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15, fontFamily: 'Cairo'),
              ),
              subtitle: Padding(
                padding: const EdgeInsets.only(top: 4.0),
                child: Text(
                  l['titleAr'] as String,
                  style: TextStyle(
                    fontSize: 12,
                    color: isDark ? Colors.white70 : Colors.black54,
                  ),
                ),
              ),
              trailing: Icon(
                Icons.arrow_forward_ios_rounded,
                size: 16,
                color: Theme.of(context).colorScheme.primary,
              ),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => _LessonDetailScreen(lesson: l)),
                );
              },
            ),
          ),
        );
      },
    );
  }
}

class _LessonDetailScreen extends StatefulWidget {
  final Map<String, dynamic> lesson;
  const _LessonDetailScreen({required this.lesson});

  @override
  State<_LessonDetailScreen> createState() => _LessonDetailScreenState();
}

class _LessonDetailScreenState extends State<_LessonDetailScreen> {
  final Map<int, int> _selectedAnswers = {};
  bool _showResults = false;
  int _score = 0;

  @override
  Widget build(BuildContext context) {
    final l = widget.lesson;
    final exercises = List<Map<String, dynamic>>.from(l['exercises'] as List);
    final examples = List<Map<String, dynamic>>.from(l['examples'] as List);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final accentCol = Theme.of(context).colorScheme.primary;

    return Scaffold(
      appBar: AppBar(
        title: Text(l['title'] as String, style: const TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Title & Explanation
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      l['titleAr'] as String,
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: accentCol),
                    ),
                    const Divider(height: 24),
                    Text(
                      l['explanation'] as String,
                      style: const TextStyle(fontSize: 14, height: 1.6),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),

            // Examples
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.lightbulb_outline_rounded, color: Theme.of(context).colorScheme.secondary),
                        const SizedBox(width: 8),
                        const Text(
                          '💡 أمثلة توضيحية (Beispiele):',
                          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const Divider(height: 24),
                    ...examples.map((ex) => Container(
                          margin: const EdgeInsets.only(bottom: 12),
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: isDark ? Colors.black26 : Colors.grey[50],
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                ex['de'] as String,
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 14,
                                  color: Theme.of(context).colorScheme.primary,
                                ),
                                textDirection: TextDirection.ltr,
                              ),
                              const SizedBox(height: 6),
                              Text(
                                ex['ar'] as String,
                                style: TextStyle(
                                  color: isDark ? Colors.white60 : Colors.grey[700],
                                  fontSize: 12,
                                ),
                              ),
                            ],
                          ),
                        )),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),

            // Exercises
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.edit_note_rounded, color: Theme.of(context).colorScheme.primary),
                        const SizedBox(width: 8),
                        const Text(
                          '✏️ تمارين اختبار الفهم:',
                          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const Divider(height: 24),
                    ...List.generate(exercises.length, (idx) {
                      final ex = exercises[idx];
                      final options = List<String>.from(ex['options'] as List);
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 24),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                              decoration: BoxDecoration(
                                color: Theme.of(context).colorScheme.secondary.withOpacity(0.1),
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: Text(
                                'السؤال ${idx + 1}',
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                  color: Theme.of(context).colorScheme.secondary,
                                ),
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              ex['question'] as String,
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                              textDirection: TextDirection.ltr,
                            ),
                            const SizedBox(height: 12),
                            ...List.generate(options.length, (optIdx) {
                              final opt = options[optIdx];
                              final isSelected = _selectedAnswers[idx] == optIdx;
                              final isCorrect = ex['correct'] == optIdx;

                              Color borderCol = isSelected ? accentCol : (isDark ? Colors.white10 : Colors.black12);
                              Color bgCol = isSelected ? accentCol.withOpacity(0.05) : Colors.transparent;
                              Widget? icon;

                              if (_showResults) {
                                if (isCorrect) {
                                  borderCol = Colors.green;
                                  bgCol = Colors.green.withOpacity(0.1);
                                  icon = const Icon(Icons.check_circle_rounded, color: Colors.green, size: 20);
                                } else if (isSelected) {
                                  borderCol = Colors.red;
                                  bgCol = Colors.red.withOpacity(0.1);
                                  icon = const Icon(Icons.cancel_rounded, color: Colors.red, size: 20);
                                }
                              }

                              return Padding(
                                padding: const EdgeInsets.only(bottom: 8.0),
                                child: InkWell(
                                  onTap: _showResults
                                      ? null
                                      : () {
                                          setState(() {
                                            _selectedAnswers[idx] = optIdx;
                                          });
                                        },
                                  borderRadius: BorderRadius.circular(12),
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                                    decoration: BoxDecoration(
                                      color: bgCol,
                                      border: Border.all(color: borderCol, width: isSelected || (_showResults && isCorrect) ? 2 : 1),
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    child: Row(
                                      children: [
                                        Expanded(
                                          child: Text(
                                            opt,
                                            style: TextStyle(
                                              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                                              fontSize: 13,
                                            ),
                                            textDirection: TextDirection.ltr,
                                          ),
                                        ),
                                        if (icon != null) icon,
                                      ],
                                    ),
                                  ),
                                ),
                              );
                            }),
                          ],
                        ),
                      );
                    }),
                    if (!_showResults)
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          minimumSize: const Size.fromHeight(50),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        onPressed: _selectedAnswers.length < exercises.length
                            ? null
                            : () {
                                int score = 0;
                                for (int i = 0; i < exercises.length; i++) {
                                  if (_selectedAnswers[i] == exercises[i]['correct']) {
                                    score++;
                                  }
                                }
                                setState(() {
                                  _score = score;
                                  _showResults = true;
                                });
                                context.read<AppProvider>().addXP(10);
                                context.read<AppProvider>().incrementQuizzes();
                              },
                        child: const Text('تحقق من الإجابات 📝', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                      )
                    else
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.green.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.green.withOpacity(0.3)),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.emoji_events_rounded, color: Colors.amber, size: 28),
                            const SizedBox(width: 8),
                            Text(
                              'أحرزت $_score من أصل ${exercises.length} نقاط! (+10 XP)',
                              style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.green, fontSize: 14),
                            ),
                          ],
                        ),
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MistakesList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: commonMistakes.length,
      itemBuilder: (ctx, i) {
        final m = commonMistakes[i];
        return _MistakeCard(mistake: m);
      },
    );
  }
}

class _MistakeCard extends StatefulWidget {
  final Map<String, dynamic> mistake;
  const _MistakeCard({required this.mistake});

  @override
  State<_MistakeCard> createState() => _MistakeCardState();
}

class _MistakeCardState extends State<_MistakeCard> {
  bool _expanded = false;

  @override
  Widget build(BuildContext context) {
    final m = widget.mistake;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        m['titleAr'] as String? ?? '',
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: Theme.of(context).colorScheme.primaryContainer,
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        m['level'] as String? ?? '-',
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: Theme.of(context).colorScheme.onPrimaryContainer,
                        ),
                      ),
                    )
                  ],
                ),
                const SizedBox(height: 16),

                // Wrong Block
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.red.withOpacity(0.05),
                    border: Border.all(color: Colors.red.withOpacity(0.2)),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.cancel_rounded, color: Colors.red, size: 20),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          m['wrong'] as String? ?? '',
                          style: const TextStyle(
                            color: Colors.red,
                            decoration: TextDecoration.lineThrough,
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                          ),
                          textDirection: TextDirection.ltr,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 8),

                // Right Block
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.green.withOpacity(0.05),
                    border: Border.all(color: Colors.green.withOpacity(0.2)),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.check_circle_rounded, color: Colors.green, size: 20),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          m['right'] as String? ?? '',
                          style: const TextStyle(
                            color: Colors.green,
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                          ),
                          textDirection: TextDirection.ltr,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Action Expander Bar
          InkWell(
            onTap: () {
              setState(() {
                _expanded = !_expanded;
              });
            },
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
              decoration: BoxDecoration(
                color: isDark ? Colors.white10 : Colors.grey[50],
                borderRadius: const BorderRadius.vertical(bottom: Radius.circular(20)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    _expanded ? 'إخفاء التفاصيل' : 'لماذا وكيف؟ (القاعدة والتلميح)',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Theme.of(context).colorScheme.primary,
                    ),
                  ),
                  const SizedBox(width: 4),
                  Icon(
                    _expanded ? Icons.keyboard_arrow_up_rounded : Icons.keyboard_arrow_down_rounded,
                    size: 18,
                    color: Theme.of(context).colorScheme.primary,
                  ),
                ],
              ),
            ),
          ),

          if (_expanded)
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (m['whyAr'] != null) ...[
                    const Text('💡 لماذا؟', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.orange)),
                    const SizedBox(height: 4),
                    Text(m['whyAr'] as String, style: const TextStyle(fontSize: 12, height: 1.5)),
                    const SizedBox(height: 12),
                  ],
                  if (m['ruleAr'] != null) ...[
                    const Text('📏 القاعدة:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.blue)),
                    const SizedBox(height: 4),
                    Text(m['ruleAr'] as String, style: const TextStyle(fontSize: 12, height: 1.5)),
                    const SizedBox(height: 12),
                  ],
                  if (m['tipAr'] != null) ...[
                    const Text('🎯 نصيحة سريعة:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.green)),
                    const SizedBox(height: 4),
                    Text(m['tipAr'] as String, style: const TextStyle(fontSize: 12, height: 1.5)),
                  ],
                ],
              ),
            ),
        ],
      ),
    );
  }
}

class _SatzbauList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: satzbau.length,
      itemBuilder: (ctx, i) {
        final s = satzbau[i];
        return _SatzbauGameCard(sentenceData: s, index: i);
      },
    );
  }
}

class _SatzbauGameCard extends StatefulWidget {
  final Map<String, dynamic> sentenceData;
  final int index;
  const _SatzbauGameCard({required this.sentenceData, required this.index});

  @override
  State<_SatzbauGameCard> createState() => _SatzbauGameCardState();
}

class _SatzbauGameCardState extends State<_SatzbauGameCard> {
  late List<String> _correctTokens;
  List<String> _userTokens = [];
  List<String> _scrambledTokens = [];
  bool? _isCorrect;
  bool _checked = false;

  @override
  void initState() {
    super.initState();
    _correctTokens = List<String>.from(widget.sentenceData['tokens'] as List? ?? []);
    _resetGame();
  }

  void _resetGame() {
    setState(() {
      _userTokens = [];
      _scrambledTokens = List<String>.from(_correctTokens)..shuffle();
      _isCorrect = null;
      _checked = false;
    });
  }

  void _checkAnswer() {
    final userStr = _userTokens.join(' ');
    final correctStr = _correctTokens.join(' ');
    final correct = userStr == correctStr;

    setState(() {
      _isCorrect = correct;
      _checked = true;
    });

    if (correct) {
      context.read<AppProvider>().addXP(5);
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.sentenceData;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'تحدي بناء الجملة #${widget.index + 1}',
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.blue),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: Colors.blue.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    s['level'] as String? ?? '-',
                    style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.blue),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              s['ar'] as String? ?? '',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, height: 1.4),
            ),
            const SizedBox(height: 16),

            // User Assembly Slot
            Container(
              constraints: const BoxConstraints(minHeight: 60),
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: isDark ? Colors.black26 : Colors.grey[50],
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: _checked
                      ? (_isCorrect! ? Colors.green : Colors.red)
                      : (isDark ? Colors.white10 : Colors.black12),
                  width: _checked ? 2 : 1,
                ),
              ),
              child: _userTokens.isEmpty
                  ? Center(
                      child: Text(
                        'انقر على الكلمات بالأسفل لتركيب الجملة',
                        style: TextStyle(color: isDark ? Colors.white30 : Colors.black38, fontSize: 12),
                      ),
                    )
                  : Wrap(
                      spacing: 6,
                      runSpacing: 6,
                      children: _userTokens.map((token) {
                        return GestureDetector(
                          onTap: _checked
                              ? null
                              : () {
                                  setState(() {
                                    _userTokens.remove(token);
                                    _scrambledTokens.add(token);
                                  });
                                },
                          child: Chip(
                            label: Text(token, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                            backgroundColor: Theme.of(context).colorScheme.primaryContainer,
                            labelStyle: TextStyle(color: Theme.of(context).colorScheme.onPrimaryContainer),
                            side: BorderSide.none,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                            visualDensity: VisualDensity.compact,
                          ),
                        );
                      }).toList(),
                    ),
            ),
            const SizedBox(height: 16),

            // Scrambled Tokens Pool
            if (!_checked)
              Wrap(
                spacing: 8,
                runSpacing: 8,
                alignment: WrapAlignment.center,
                children: _scrambledTokens.map((token) {
                  return GestureDetector(
                    onTap: () {
                      setState(() {
                        _scrambledTokens.remove(token);
                        _userTokens.add(token);
                      });
                    },
                    child: Chip(
                      label: Text(token, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                      side: BorderSide(color: isDark ? Colors.white10 : Colors.black12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      visualDensity: VisualDensity.compact,
                    ),
                  );
                }).toList(),
              ),

            // Check feedback box
            if (_checked) ...[
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: _isCorrect! ? Colors.green.withOpacity(0.1) : Colors.red.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: _isCorrect! ? Colors.green : Colors.red, width: 0.5),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(
                          _isCorrect! ? Icons.check_circle_rounded : Icons.cancel_rounded,
                          color: _isCorrect! ? Colors.green : Colors.red,
                          size: 20,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          _isCorrect! ? 'أحسنت! إجابة صحيحة (+5 XP) 🎉' : 'خطأ! الترتيب الصحيح هو:',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: _isCorrect! ? Colors.green : Colors.red,
                            fontSize: 13,
                          ),
                        ),
                      ],
                    ),
                    if (!_isCorrect!) ...[
                      const SizedBox(height: 8),
                      Text(
                        _correctTokens.join(' '),
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.red),
                        textDirection: TextDirection.ltr,
                      ),
                    ],
                  ],
                ),
              ),
              if (s['tipAr'] != null) ...[
                const SizedBox(height: 10),
                Text(
                  '📏 ${s['tipAr']}',
                  style: const TextStyle(fontSize: 12, fontStyle: FontStyle.italic),
                ),
              ]
            ],
            const SizedBox(height: 16),

            // Action Buttons
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                if (_checked || _userTokens.isNotEmpty)
                  TextButton(
                    onPressed: _resetGame,
                    child: const Row(
                      children: [
                        Icon(Icons.refresh_rounded, size: 16),
                        SizedBox(width: 4),
                        Text('إعادة المحاولة'),
                      ],
                    ),
                  ),
                const SizedBox(width: 8),
                if (!_checked)
                  ElevatedButton(
                    onPressed: _userTokens.length < _correctTokens.length ? null : _checkAnswer,
                    child: const Text('تحقق من الترتيب'),
                  ),
              ],
            )
          ],
        ),
      ),
    );
  }
}

class _TrennbarList extends StatefulWidget {
  @override
  State<_TrennbarList> createState() => _TrennbarListState();
}

class _TrennbarListState extends State<_TrennbarList> {
  int _selectedCategoryIndex = 0;

  @override
  Widget build(BuildContext context) {
    if (trennbareVerben.isEmpty) {
      return const Center(child: Text('لا توجد أفعال حالياً'));
    }
    final category = trennbareVerben[_selectedCategoryIndex < trennbareVerben.length ? _selectedCategoryIndex : 0];
    final verbs = List<Map<String, dynamic>>.from(category['verbs'] as List? ?? []);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        // Category Pill Selectors
        Padding(
          padding: const EdgeInsets.all(12.0),
          child: Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              color: isDark ? Colors.grey[900] : Colors.grey[100],
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
            ),
            child: Row(
              children: List.generate(trennbareVerben.length, (index) {
                final cat = trennbareVerben[index];
                final isSelected = _selectedCategoryIndex == index;
                return Expanded(
                  child: GestureDetector(
                    onTap: () {
                      setState(() {
                        _selectedCategoryIndex = index;
                      });
                    },
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: const EdgeInsets.symmetric(vertical: 10),
                      decoration: BoxDecoration(
                        color: isSelected ? Theme.of(context).colorScheme.primary : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Center(
                        child: Text(
                          cat['titleAr'] as String? ?? '',
                          style: TextStyle(
                            color: isSelected ? Colors.white : (isDark ? Colors.white70 : Colors.black87),
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                  ),
                );
              }),
            ),
          ),
        ),
        if (category['intro'] != null)
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.primary.withOpacity(0.08),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Theme.of(context).colorScheme.primary.withOpacity(0.15)),
              ),
              child: Text(
                category['intro'] as String,
                style: const TextStyle(fontSize: 12, height: 1.5),
                textAlign: TextAlign.right,
              ),
            ),
          ),
        const SizedBox(height: 8),
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            itemCount: verbs.length,
            itemBuilder: (ctx, verbIdx) {
              final v = verbs[verbIdx];
              final examples = List<Map<String, dynamic>>.from(v['examples'] as List? ?? []);

              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                child: ExpansionTile(
                  expandedCrossAxisAlignment: CrossAxisAlignment.stretch,
                  title: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          v['ar'] as String? ?? '',
                          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.right,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        v['infinitiv'] as String? ?? '',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Theme.of(context).colorScheme.primary),
                        textDirection: TextDirection.ltr,
                      ),
                    ],
                  ),
                  subtitle: Padding(
                    padding: const EdgeInsets.only(top: 8.0),
                    child: Wrap(
                      spacing: 8,
                      runSpacing: 4,
                      children: [
                        _buildBadge(context, 'Prät: ${v['praeteritum'] ?? ''}'),
                        _buildBadge(context, 'P2: ${v['partizip2'] ?? ''}'),
                        _buildBadge(context, v['hilfsverb'] ?? '', color: Theme.of(context).colorScheme.secondary),
                      ],
                    ),
                  ),
                  children: [
                    if (examples.isEmpty)
                      const Padding(
                        padding: EdgeInsets.all(12.0),
                        child: Text('لا توجد أمثلة حالياً', style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic)),
                      )
                    else
                      Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            const Text(
                              '💡 أمثلة توضيحية (Beispiele):',
                              style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                              textAlign: TextAlign.right,
                            ),
                            const Divider(height: 16),
                            ...examples.map((ex) {
                              return Padding(
                                padding: const EdgeInsets.only(bottom: 10.0),
                                child: Container(
                                  padding: const EdgeInsets.all(12),
                                  decoration: BoxDecoration(
                                    color: isDark ? Colors.black26 : Colors.grey[50],
                                    borderRadius: BorderRadius.circular(8),
                                    border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
                                  ),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      if (ex['context'] != null)
                                        Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                          margin: const EdgeInsets.only(bottom: 6),
                                          decoration: BoxDecoration(
                                            color: Colors.blue.withOpacity(0.1),
                                            borderRadius: BorderRadius.circular(4),
                                          ),
                                          child: Text(
                                            ex['context'] as String,
                                            style: const TextStyle(fontSize: 10, color: Colors.blue, fontWeight: FontWeight.bold),
                                          ),
                                        ),
                                      Text(
                                        ex['de'] as String? ?? '',
                                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Theme.of(context).colorScheme.primary),
                                        textDirection: TextDirection.ltr,
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        ex['ar'] as String? ?? '',
                                        style: TextStyle(fontSize: 12, color: isDark ? Colors.white60 : Colors.grey[700]),
                                        textAlign: TextAlign.right,
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            }),
                          ],
                        ),
                      ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildBadge(BuildContext context, String text, {Color? color}) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final badgeColor = color ?? (isDark ? Colors.white30 : Colors.black12);
    final textColor = color != null ? Colors.white : (isDark ? Colors.white70 : Colors.black87);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: color != null ? badgeColor : badgeColor.withOpacity(0.1),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: badgeColor.withOpacity(0.3)),
      ),
      child: Text(
        text,
        style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: textColor),
      ),
    );
  }
}
