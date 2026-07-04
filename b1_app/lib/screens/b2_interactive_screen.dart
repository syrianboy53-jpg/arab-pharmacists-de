import 'dart:async';
import 'package:flutter/material.dart';

class B2InteractiveScreen extends StatefulWidget {
  final Map<String, dynamic> b2Model;

  const B2InteractiveScreen({super.key, required this.b2Model});

  @override
  State<B2InteractiveScreen> createState() => _B2InteractiveScreenState();
}

class _B2InteractiveScreenState extends State<B2InteractiveScreen> {
  int _activeTab = 0; // 0: Lesen, 1: Sprachbausteine, 2: Hören, 3: Schreiben, 4: Sprechen
  int _secondsRemaining = 165 * 60;
  Timer? _timer;
  bool _isSubmitted = false;

  Map<int, Map<int, int>> _selectedLesenAnswers = {};
  Map<int, int> _sprachAnswers = {};
  Map<String, int> _hoerenAnswers = {};

  int _scoreLesen = 0;
  int _scoreSprach = 0;
  int _scoreHoeren = 0;

  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _secondsRemaining = (widget.b2Model['durationMin'] ?? 165) * 60;
    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsRemaining > 0) {
        setState(() {
          _secondsRemaining--;
        });
      } else {
        _timer?.cancel();
        _showTimeUpDialog();
      }
    });
  }

  void _showTimeUpDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        title: const Text('انتهى الوقت! ⏰'),
        content: const Text('لقد نفد الوقت المخصص للامتحان.'),
        actions: [
          TextButton(onPressed: () {
            Navigator.pop(ctx);
            _submitExam();
          }, child: const Text('عرض النتيجة')),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _timer?.cancel();
    _scrollController.dispose();
    super.dispose();
  }

  String get _formattedTime {
    int h = _secondsRemaining ~/ 3600;
    int m = (_secondsRemaining % 3600) ~/ 60;
    int s = _secondsRemaining % 60;
    if (h > 0) {
      return '${h.toString().padLeft(2, '0')}:${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
    }
    return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }

  void _submitExam() {
    _timer?.cancel();
    int lScore = 0;
    final passages = widget.b2Model['readingPassages'] as List?;
    if (passages != null) {
      for (int pIdx = 0; pIdx < passages.length; pIdx++) {
        final qs = passages[pIdx]['questions'] as List;
        for (int qIdx = 0; qIdx < qs.length; qIdx++) {
          final selected = _selectedLesenAnswers[pIdx]?[qIdx];
          final correctStr = qs[qIdx]['correct'] as String;
          int correctIdx = _letterToIndex(correctStr);
          if (selected == correctIdx) {
            lScore++;
          }
        }
      }
    }

    int sScore = 0;
    var sprach = widget.b2Model['sprachbausteine'] as List?;
    for (int i = 0; i < (sprach?.length ?? 0); i++) {
      int correctIdx = _letterToIndex(sprach![i]['correct']);
      if (_sprachAnswers[i] == correctIdx) sScore++;
    }

    int hScore = 0;
    var hoeren = widget.b2Model['hoeren'] as List?;
    if (hoeren != null) {
      for (int h = 0; h < hoeren.length; h++) {
        var qs = hoeren[h]['questions'] as List?;
        if (qs != null) {
          for (int q = 0; q < qs.length; q++) {
            int correctIdx = _letterToIndex(qs[q]['correct']);
            if (_hoerenAnswers['$h-$q'] == correctIdx) hScore++;
          }
        }
      }
    }

    setState(() {
      _scoreLesen = lScore;
      _scoreSprach = sScore;
      _scoreHoeren = hScore;
      _isSubmitted = true;
    });
  }

  int _getTotalLesen() {
    int total = 0;
    var rp = widget.b2Model['readingPassages'] as List?;
    if (rp != null) {
      for (var p in rp) {
        total += (p['questions'] as List?)?.length ?? 0;
      }
    }
    return total;
  }

  int _getTotalHoeren() {
    int total = 0;
    var hoeren = widget.b2Model['hoeren'] as List?;
    if (hoeren != null) {
      for (var h in hoeren) {
        total += (h['questions'] as List?)?.length ?? 0;
      }
    }
    return total;
  }

  int _letterToIndex(String letter) {
    switch (letter.toLowerCase()) {
      case 'a': return 0;
      case 'b': return 1;
      case 'c': return 2;
      case 'd': return 3;
      case 'e': return 4;
      case 'f': return 5;
      case 'g': return 6;
      case 'h': return 7;
      case 'i': return 8;
      case 'j': return 9;
      default: return -1;
    }
  }

  Widget _buildResults() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('🎓', style: TextStyle(fontSize: 64)),
            const SizedBox(height: 16),
            const Text('نتائج الامتحان', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 32),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildScoreCard('القراءة', _scoreLesen, _getTotalLesen(), Colors.blue),
                _buildScoreCard('بناء اللغة', _scoreSprach, (widget.b2Model['sprachbausteine'] as List?)?.length ?? 0, Colors.purple),
                _buildScoreCard('الاستماع', _scoreHoeren, _getTotalHoeren(), Colors.amber),
              ],
            ),
            const SizedBox(height: 24),
            Text(
              'أقسام الكتابة والمحادثة تُقيّم ذاتياً عبر النماذج المتوفرة.',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey[600]),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildScoreCard(String title, int score, int total, Color color) {
    return Column(
      children: [
        Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
          child: Text('$score/$total', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: color)),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isSubmitted) return Scaffold(appBar: AppBar(title: const Text('النتيجة')), body: _buildResults());

    List<Widget> sections = [];
    if (widget.b2Model['readingPassages'] != null) sections.add(_buildLesenSection());
    if (widget.b2Model['sprachbausteine'] != null) sections.add(_buildSprachbausteineSection());
    if (widget.b2Model['hoeren'] != null) sections.add(_buildHoeren());
    if (widget.b2Model['schreiben'] != null) sections.add(_buildSchreibenSection());
    if (widget.b2Model['sprechen'] != null) sections.add(_buildSprechenSection());

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.b2Model['titleDe']),
        backgroundColor: const Color(0xFFEF4444),
        actions: [
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Text(_formattedTime, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
            ),
          )
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(60),
          child: SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                _buildTab(0, 'القراءة', Icons.menu_book),
                _buildTab(1, 'بناء اللغة', Icons.psychology),
                _buildTab(2, 'الاستماع', Icons.headphones),
                _buildTab(3, 'الكتابة', Icons.edit),
                _buildTab(4, 'المحادثة', Icons.record_voice_over),
              ],
            ),
          ),
        ),
      ),
      body: sections.isNotEmpty ? sections[_activeTab] : const SizedBox(),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            ElevatedButton(onPressed: _activeTab > 0 ? () => setState(() => _activeTab--) : null, child: const Text('السابق')),
            if (_activeTab < 4) 
              ElevatedButton(onPressed: () => setState(() => _activeTab++), child: const Text('التالي'))
            else 
              ElevatedButton(onPressed: _submitExam, style: ElevatedButton.styleFrom(backgroundColor: Colors.green), child: const Text('إنهاء الامتحان')),
          ],
        ),
      ),
    );
  }

  Widget _buildTab(int index, String title, IconData icon) {
    bool selected = _activeTab == index;
    return GestureDetector(
      onTap: () => setState(() => _activeTab = index),
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 8),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(color: selected ? Colors.white : Colors.black26, borderRadius: BorderRadius.circular(20)),
        child: Row(children: [Icon(icon, size: 16, color: selected ? Colors.red : Colors.white), const SizedBox(width: 4), Text(title, style: TextStyle(color: selected ? Colors.red : Colors.white))]),
      ),
    );
  }

  Widget _buildLesenSection() {
    final passages = widget.b2Model['readingPassages'] as List;
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: passages.length,
      itemBuilder: (context, pIdx) {
        final p = passages[pIdx];
        final qs = p['questions'] as List;
        return Card(
          margin: const EdgeInsets.only(bottom: 24),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(p['titleDe'], style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFFEF4444)), textDirection: TextDirection.ltr),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(8)),
                  child: Text(p['textDe'], style: const TextStyle(fontSize: 15, height: 1.5), textDirection: TextDirection.ltr),
                ),
                const SizedBox(height: 24),
                const Text('Fragen:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                const SizedBox(height: 12),
                ...List.generate(qs.length, (qIdx) {
                  final q = qs[qIdx];
                  final options = q['options'] as List;
                  final selectedOpt = _selectedLesenAnswers[pIdx]?[qIdx];

                  return Container(
                    margin: const EdgeInsets.only(bottom: 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('${qIdx + 1}. ${q["promptDe"]}', style: const TextStyle(fontWeight: FontWeight.bold), textDirection: TextDirection.ltr),
                        const SizedBox(height: 8),
                        ...List.generate(options.length, (optIdx) {
                          final opt = options[optIdx];
                          return RadioListTile<int>(
                            value: optIdx,
                            groupValue: selectedOpt,
                            title: Text(opt['de'], textDirection: TextDirection.ltr),
                            onChanged: (val) {
                              setState(() {
                                _selectedLesenAnswers.putIfAbsent(pIdx, () => {});
                                _selectedLesenAnswers[pIdx]![qIdx] = val!;
                              });
                            },
                          );
                        }),
                      ],
                    ),
                  );
                }),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildSprachbausteineSection() {
    final bausteine = widget.b2Model['sprachbausteine'] as List;
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: 1,
      itemBuilder: (context, index) {
        return Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Sprachbausteine B2', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFFEF4444))),
                const SizedBox(height: 24),
                ...List.generate(bausteine.length, (i) {
                  final b = bausteine[i];
                  final options = b['options'] as List;
                  return Container(
                    margin: const EdgeInsets.only(bottom: 24),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.grey[300]!),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        RichText(
                          textDirection: TextDirection.ltr,
                          text: TextSpan(
                            style: const TextStyle(fontSize: 16, color: Colors.black, height: 1.5),
                            children: [
                              TextSpan(text: '${i + 1}. '),
                              ...b['contextDe'].toString().split('___').expand((t) => [
                                TextSpan(text: t),
                                if (t != b['contextDe'].toString().split('___').last)
                                  const TextSpan(text: ' _________ ', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFEF4444))),
                              ]).toList(),
                            ],
                          ),
                        ),
                        const SizedBox(height: 12),
                        Wrap(
                          spacing: 8,
                          children: List.generate(options.length, (optIdx) {
                            final opt = options[optIdx];
                            final isSelected = _sprachAnswers[i] == optIdx;
                            return FilterChip(
                              label: Text(opt['de']),
                              selected: isSelected,
                              onSelected: (val) {
                                setState(() {
                                  _sprachAnswers[i] = optIdx;
                                });
                              },
                              selectedColor: const Color(0xFFEF4444).withOpacity(0.2),
                              checkmarkColor: const Color(0xFFEF4444),
                            );
                          }),
                        )
                      ],
                    ),
                  );
                })
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildHoeren() {
    var hoeren = widget.b2Model['hoeren'] as List?;
    if (hoeren == null) return const Center(child: Text('لا يوجد محتوى استماع لهذا النموذج'));

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: hoeren.length,
      itemBuilder: (context, index) {
        var h = hoeren[index];
        return Card(
          margin: const EdgeInsets.only(bottom: 24),
          elevation: 2,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(h['partDe'], style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.red)),
                const SizedBox(height: 4),
                Text(h['partAr'], style: TextStyle(color: Colors.grey[600], fontSize: 12)),
                const SizedBox(height: 16),
                
                // Audio player mock
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.red.withOpacity(0.05),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.red.withOpacity(0.2)),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.play_circle_fill, color: Colors.red, size: 40),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('مقطع صوتي للاستماع', style: TextStyle(fontWeight: FontWeight.bold)),
                            Text('اضغط للتشغيل (محاكاة)', style: TextStyle(fontSize: 12, color: Colors.grey[600])),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                const Text('Fragen:', style: TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(height: 16),
                ...(h['questions'] as List).asMap().entries.map((qEntry) {
                  int qIdx = qEntry.key;
                  var q = qEntry.value;
                  return _buildHoerenQuestion(index, qIdx, q);
                }).toList(),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildHoerenQuestion(int hIdx, int qIdx, dynamic q) {
    int correctIdx = _letterToIndex(q['correct']);
    
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('${qIdx + 1}. ${q['promptDe']}', style: const TextStyle(fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          ...(q['options'] as List).asMap().entries.map((optEntry) {
            int optIdx = optEntry.key;
            var opt = optEntry.value;
            
            bool isSelected = _hoerenAnswers['$hIdx-$qIdx'] == optIdx;
            bool isCorrect = _isSubmitted && correctIdx == optIdx;
            bool isWrong = _isSubmitted && isSelected && !isCorrect;

            Color bgColor = Colors.white;
            Color borderColor = Colors.grey[300]!;
            Color textColor = Colors.black87;

            if (_isSubmitted) {
              if (isCorrect) {
                bgColor = Colors.green[50]!;
                borderColor = Colors.green;
                textColor = Colors.green[800]!;
              } else if (isWrong) {
                bgColor = Colors.red[50]!;
                borderColor = Colors.red;
                textColor = Colors.red[800]!;
              } else {
                bgColor = Colors.grey[50]!;
                textColor = Colors.grey[400]!;
              }
            } else {
              if (isSelected) {
                bgColor = Colors.red[50]!;
                borderColor = Colors.red;
                textColor = Colors.red[800]!;
              }
            }

            return GestureDetector(
              onTap: () {
                if (!_isSubmitted) {
                  setState(() {
                    _hoerenAnswers['$hIdx-$qIdx'] = optIdx;
                  });
                }
              },
              child: Container(
                width: double.infinity,
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: bgColor,
                  border: Border.all(color: borderColor, width: 2),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  opt['de'],
                  style: TextStyle(color: textColor, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal),
                ),
              ),
            );
          }).toList(),
        ],
      ),
    );
  }

  Widget _buildSchreibenSection() {
    final sch = widget.b2Model['schreiben'] as Map;
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(sch['topicDe'], style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFFEF4444)), textDirection: TextDirection.ltr),
                const SizedBox(height: 8),
                Text(sch['topicAr'], style: const TextStyle(color: Colors.grey)),
                const Divider(height: 32),
                Text(sch['contextDe'], style: const TextStyle(fontSize: 16), textDirection: TextDirection.ltr),
                const SizedBox(height: 16),
                ...List.generate((sch['bulletPoints'] as List).length, (i) {
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: Row(
                      children: [
                        const Icon(Icons.circle, size: 8, color: Color(0xFFEF4444)),
                        const SizedBox(width: 8),
                        Expanded(child: Text(sch['bulletPoints'][i], textDirection: TextDirection.ltr)),
                      ],
                    ),
                  );
                }),
                const SizedBox(height: 24),
                const Text('📝 مساحة الكتابة:', style: TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                TextField(
                  maxLines: 15,
                  decoration: InputDecoration(
                    hintText: 'Schreiben Sie hier Ihren Text...',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  textDirection: TextDirection.ltr,
                ),
              ],
            ),
          ),
        ),
      ]
    );
  }

  Widget _buildSprechenSection() {
    final spList = widget.b2Model['sprechen'] as List;
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: spList.length,
      itemBuilder: (context, i) {
        final sp = spList[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 16),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(sp['partDe'], style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Color(0xFFEF4444)), textDirection: TextDirection.ltr),
                Text(sp['partAr'], style: const TextStyle(color: Colors.grey, fontSize: 12)),
                const SizedBox(height: 12),
                Text(sp['topicDe'], style: const TextStyle(fontSize: 15), textDirection: TextDirection.ltr),
                const SizedBox(height: 8),
                Text(sp['topicAr'], style: const TextStyle(fontSize: 14)),
                const SizedBox(height: 16),
                const Text('💡 Redemittel:', style: TextStyle(fontWeight: FontWeight.bold)),
                ...List.generate((sp['redemittel'] as List).length, (rIdx) {
                  return Padding(
                    padding: const EdgeInsets.only(top: 4),
                    child: Text('• ${sp["redemittel"][rIdx]}', textDirection: TextDirection.ltr, style: const TextStyle(color: Colors.black87)),
                  );
                }),
              ],
            ),
          ),
        );
      },
    );
  }
}
