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

class _TrennbarList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: trennbareVerben.length,
      itemBuilder: (ctx, i) {
        final item = trennbareVerben[i];
        final verbs = List<Map<String, dynamic>>.from(item['verbs'] as List? ?? []);
        return Card(
          margin: const EdgeInsets.only(bottom: 16),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(item['titleAr'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Text(item['titleDe'] as String? ?? '', style: TextStyle(color: Colors.grey[600]), textDirection: TextDirection.ltr),
                if (item['intro'] != null) ...[const SizedBox(height: 8), Text(item['intro'] as String)],
                const Divider(height: 16),
                ...verbs.map((v) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('• ', style: TextStyle(color: Theme.of(context).colorScheme.primary, fontWeight: FontWeight.bold)),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(v['de'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold), textDirection: TextDirection.ltr),
                            if (v['ar'] != null) Text(v['ar'] as String, style: const TextStyle(fontSize: 13)),
                            if (v['example'] != null) Text(v['example'] as String, style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: Colors.grey[600]), textDirection: TextDirection.ltr),
                          ],
                        ),
                      ),
                    ],
                  ),
                )),
              ],
            ),
          ),
        );
      },
    );
  }
}
