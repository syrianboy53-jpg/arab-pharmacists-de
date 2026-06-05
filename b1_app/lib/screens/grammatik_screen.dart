import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
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
          title: const Text('القواعد - Grammatik'),
          centerTitle: true,
          bottom: const TabBar(
            isScrollable: true,
            tabs: [
              Tab(text: 'دروس القواعد', icon: Icon(Icons.book)),
              Tab(text: 'أخطاء شائعة', icon: Icon(Icons.warning_amber)),
              Tab(text: 'بناء الجمل', icon: Icon(Icons.format_list_numbered)),
              Tab(text: 'أفعال منفصلة', icon: Icon(Icons.call_split)),
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
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: grammarLessons.length,
      itemBuilder: (ctx, i) {
        final l = grammarLessons[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor: Theme.of(context).colorScheme.primaryContainer,
              child: Text('${i + 1}', style: TextStyle(color: Theme.of(context).colorScheme.onPrimaryContainer, fontWeight: FontWeight.bold)),
            ),
            title: Text(l['title'] as String, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
            subtitle: Text(l['titleAr'] as String, style: const TextStyle(fontSize: 12)),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => _LessonDetailScreen(lesson: l)),
              );
            },
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

    return Scaffold(
      appBar: AppBar(
        title: Text(l['title'] as String),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Explanation
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      l['titleAr'] as String,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      l['explanation'] as String,
                      style: const TextStyle(fontSize: 14, height: 1.5),
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
                    const Text(
                      '💡 أمثلة توضيحية (Beispiele):',
                      style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                    ),
                    const Divider(height: 20),
                    ...examples.map((ex) => Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(ex['de'] as String, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13), textDirection: TextDirection.ltr),
                              const SizedBox(height: 4),
                              Text(ex['ar'] as String, style: TextStyle(color: isDark ? Colors.white60 : Colors.grey[600], fontSize: 12)),
                            ],
                          ),
                        )),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),

            // Quizzes
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      '✏️ تمارين اختبار الفهم:',
                      style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                    ),
                    const Divider(height: 20),
                    ...List.generate(exercises.length, (idx) {
                      final ex = exercises[idx];
                      final options = List<String>.from(ex['options'] as List);
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '${idx + 1}. ${ex['question']}',
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                              textDirection: TextDirection.ltr,
                            ),
                            const SizedBox(height: 10),
                            ...List.generate(options.length, (optIdx) {
                              final opt = options[optIdx];
                              final isSelected = _selectedAnswers[idx] == optIdx;
                              final isCorrect = ex['correct'] == optIdx;
                              
                              Color? tileColor;
                              Widget? trailingIcon;
                              if (_showResults) {
                                if (isCorrect) {
                                  tileColor = Colors.green.withValues(alpha: 0.1);
                                  trailingIcon = const Icon(Icons.check, color: Colors.green);
                                } else if (isSelected) {
                                  tileColor = Colors.red.withValues(alpha: 0.1);
                                  trailingIcon = const Icon(Icons.close, color: Colors.red);
                                }
                              }

                              return Container(
                                margin: const EdgeInsets.only(bottom: 6),
                                decoration: BoxDecoration(
                                  color: tileColor,
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: RadioListTile<int>(
                                  value: optIdx,
                                  groupValue: _selectedAnswers[idx],
                                  onChanged: _showResults
                                      ? null
                                      : (v) {
                                          if (v != null) {
                                            setState(() {
                                              _selectedAnswers[idx] = v;
                                            });
                                          }
                                        },
                                  title: Text(opt, textDirection: TextDirection.ltr),
                                  secondary: trailingIcon,
                                  controlAffinity: ListTileControlAffinity.trailing,
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
                          backgroundColor: const Color(0xFF10B981),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
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
                        child: const Center(child: Text('تحقق من الإجابات 📝', style: TextStyle(fontWeight: FontWeight.bold))),
                      )
                    else
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: const Color(0xFF10B981).withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.emoji_events, color: Colors.orange),
                            const SizedBox(width: 8),
                            Text(
                              'أحرزت $_score من أصل ${exercises.length} نقاط! (+10 XP)',
                              style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
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
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: ExpansionTile(
            leading: CircleAvatar(
              backgroundColor: Colors.red[50],
              child: const Icon(Icons.close, color: Colors.red, size: 20),
            ),
            title: Text(m['titleAr'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            subtitle: Text('المستوى: ${m["level"] ?? "-"}', style: const TextStyle(fontSize: 12)),
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.close, color: Colors.red, size: 16),
                        const SizedBox(width: 8),
                        Expanded(child: Text(m['wrong'] as String? ?? '', style: const TextStyle(color: Colors.red, decoration: TextDecoration.lineThrough), textDirection: TextDirection.ltr)),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        const Icon(Icons.check, color: Colors.green, size: 16),
                        const SizedBox(width: 8),
                        Expanded(child: Text(m['right'] as String? ?? '', style: const TextStyle(color: Colors.green, fontWeight: FontWeight.bold), textDirection: TextDirection.ltr)),
                      ],
                    ),
                    if (m['whyAr'] != null) ...[const SizedBox(height: 12), Text('💡 ${m["whyAr"]}')],
                    if (m['ruleAr'] != null) ...[const SizedBox(height: 8), Text('📏 ${m["ruleAr"]}', style: TextStyle(color: Colors.grey[700], fontSize: 13))],
                  ],
                ),
              ),
            ],
          ),
        );
      },
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
        final tokens = List<String>.from(s['tokens'] as List? ?? []);
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('المستوى: ${s["level"] ?? "-"}', style: TextStyle(fontSize: 12, color: Colors.grey[600])),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 4,
                  children: tokens.map((t) => Chip(label: Text(t, style: const TextStyle(fontSize: 13)), padding: EdgeInsets.zero, visualDensity: VisualDensity.compact)).toList(),
                ),
                if (s['ar'] != null) ...[const SizedBox(height: 8), Text(s['ar'] as String, style: TextStyle(color: Colors.grey[700]))],
                if (s['tipAr'] != null) ...[const SizedBox(height: 4), Text('💡 ${s["tipAr"]}', style: const TextStyle(fontSize: 12))],
              ],
            ),
          ),
        );
      },
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
        Padding(
          padding: const EdgeInsets.all(12.0),
          child: Container(
            decoration: BoxDecoration(
              color: isDark ? Colors.grey[900] : Colors.grey[200],
              borderRadius: BorderRadius.circular(12),
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
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 10),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? const Color(0xFF10B981)
                            : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Center(
                        child: Text(
                          cat['titleAr'] as String? ?? '',
                          style: TextStyle(
                            color: isSelected
                                ? Colors.white
                                : (isDark ? Colors.white70 : Colors.black87),
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
                color: const Color(0xFF10B981).withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFF10B981).withOpacity(0.2)),
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
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                child: ExpansionTile(
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
                        style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
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
                        _buildBadge(context, v['hilfsverb'] ?? '', color: const Color(0xFF10B981)),
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
                                  padding: const EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                    color: isDark ? Colors.black26 : Colors.grey[100],
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      if (ex['context'] != null)
                                        Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                          margin: const EdgeInsets.only(bottom: 4),
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
                                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
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

