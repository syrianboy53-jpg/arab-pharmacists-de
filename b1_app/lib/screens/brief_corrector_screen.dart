import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;


class BriefCorrectorScreen extends StatefulWidget {
  const BriefCorrectorScreen({super.key});

  @override
  _BriefCorrectorScreenState createState() => _BriefCorrectorScreenState();
}

class _BriefCorrectorScreenState extends State<BriefCorrectorScreen> {
  final TextEditingController _textController = TextEditingController();
  bool _isAnalyzing = false;
  
  String? _originalText;
  String? _correctedText;
  List<String> _feedbacks = [];
  int? _score;
  String? _scoreLabel;
  List<dynamic> _errors = [];
  List<dynamic> _improvements = [];
  List<dynamic> _positives = [];
  String? _engine;

  final List<Map<String, dynamic>> _commonMistakes = [
    {
      'wrong': RegExp(r'ich bin (gehen|essen|trinken|schreiben|machen)', caseSensitive: false),
      'replace': (Match m) => 'ich ${m.group(1)}e',
      'feedback': 'نستخدم الفعل مباشرة، لا نستخدم "bin" مع الأفعال العادية إلا في حالة المبني للمجهول أو الماضي.'
    },
    {
      'wrong': RegExp(r'weil ich (bin|habe|kann|muss|will|soll) (.*?)(?=\.|$)', caseSensitive: false),
      'replace': (Match m) => 'weil ich ${m.group(2)} ${m.group(1)}',
      'feedback': 'بعد "weil" يأتي الفعل المصرف في نهاية الجملة.'
    },
    {
      'wrong': RegExp(r'\b(die|das) brief\b', caseSensitive: false),
      'replace': (Match m) => 'der Brief',
      'feedback': 'كلمة Brief مذكر (der).'
    },
    {
      'wrong': RegExp(r'\b(der|das) e-mail\b', caseSensitive: false),
      'replace': (Match m) => 'die E-Mail',
      'feedback': 'كلمة E-Mail مؤنث (die).'
    },
    {
      'wrong': RegExp(r'\bsehr viel danke\b', caseSensitive: false),
      'replace': (Match m) => 'vielen Dank',
      'feedback': 'التعبير الصحيح هو "Vielen Dank" أو "Danke sehr".'
    },
    {
      'wrong': RegExp(r'\bich freue mich auf (dich|euch|sie|ihn) zu sehen\b', caseSensitive: false),
      'replace': (Match m) => 'ich freue mich darauf, ${m.group(1)} zu sehen',
      'feedback': 'نستخدم "darauf" قبل الفعل المصدر مع zu.'
    }
  ];

  void _analyzeText() async {
    final text = _textController.text.trim();
    if (text.isEmpty) return;

    setState(() {
      _isAnalyzing = true;
      _originalText = null;
      _correctedText = null;
      _feedbacks.clear();
      _errors.clear();
      _improvements.clear();
      _positives.clear();
      _score = null;
      _scoreLabel = null;
      _engine = null;
    });

    try {
      final response = await http.post(
        Uri.parse('https://www.b1-syrer.de/api/correct-writing'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'text': text,
          'taskType': 'Freier Text',
          'taskPromptDe': 'Korrigieren Sie diesen Text auf B1-Niveau',
          'taskPromptAr': 'صحح هذا النص لمستوى B1'
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['ok'] == true) {
          final result = data['result'];
          setState(() {
            _originalText = text;
            _correctedText = result['correctedText'] ?? text;
            _score = result['score'];
            _scoreLabel = result['scoreLabel'];
            _errors = result['errors'] ?? [];
            _improvements = result['improvements'] ?? [];
            _positives = result['positives'] ?? [];
            _engine = data['engine'];
            
            _feedbacks = _errors.map((e) => "${e['original']} -> ${e['corrected']}\n${e['explanation']}").toList().cast<String>();
          });
        } else {
          setState(() {
            _feedbacks = [data['error'] ?? 'حدث خطأ غير معروف'];
            _originalText = text;
          });
        }
      } else {
        setState(() {
          _feedbacks = ['فشل الاتصال بالخادم. يرجى التحقق من الإنترنت.'];
          _originalText = text;
        });
      }
    } catch (e) {
      setState(() {
        _feedbacks = ['حدث خطأ أثناء فحص النص: $e'];
        _originalText = text;
      });
    } finally {
      setState(() {
        _isAnalyzing = false;
      });
    }
  }

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    
    return Scaffold(
      appBar: AppBar(
        title: Text('المصحح الذكي 🤖', style: GoogleFonts.cairo(fontWeight: FontWeight.bold)),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'اكتب رسالة B1 وسيقوم الذكاء الاصطناعي بتحليلها وتصحيحها وإعطائك نصائح.',
                style: GoogleFonts.cairo(
                  fontSize: 14,
                  color: colorScheme.onSurfaceVariant,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),
              Text(
                'نص الرسالة:',
                style: GoogleFonts.cairo(fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const SizedBox(height: 8),
              Container(
                decoration: BoxDecoration(
                  color: Theme.of(context).cardTheme.color,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: colorScheme.outlineVariant),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.05),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    )
                  ],
                ),
                child: TextField(
                  controller: _textController,
                  maxLines: 8,
                  textDirection: TextDirection.ltr,
                  decoration: InputDecoration(
                    hintText: 'Sehr geehrte Damen und Herren,...',
                    hintStyle: TextStyle(color: Colors.grey.shade400),
                    contentPadding: const EdgeInsets.all(16),
                    border: InputBorder.none,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              ElevatedButton.icon(
                onPressed: _isAnalyzing ? null : _analyzeText,
                icon: _isAnalyzing 
                  ? const SizedBox(
                      width: 20, 
                      height: 20, 
                      child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)
                    )
                  : const Icon(Icons.search),
                label: Text(
                  _isAnalyzing ? 'جاري التحليل...' : 'فحص وتصحيح',
                  style: GoogleFonts.cairo(fontSize: 16),
                ),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  backgroundColor: const Color(0xFF10B981), // Green color for success
                  foregroundColor: Colors.white,
                ),
              ),
              const SizedBox(height: 32),
              if (_correctedText != null) ...[
                if (_score != null && _score! > 0) ...[
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: _score! >= 80 ? const Color(0xFF10B981).withValues(alpha: 0.1) : (_score! >= 60 ? Colors.orange.withValues(alpha: 0.1) : Colors.red.withValues(alpha: 0.1)),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: _score! >= 80 ? const Color(0xFF10B981).withValues(alpha: 0.3) : (_score! >= 60 ? Colors.orange.withValues(alpha: 0.3) : Colors.red.withValues(alpha: 0.3))),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'التقييم: $_score%',
                          style: GoogleFonts.cairo(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: _score! >= 80 ? const Color(0xFF047857) : (_score! >= 60 ? Colors.orange[800] : Colors.red[800]),
                          ),
                        ),
                        if (_scoreLabel != null && _scoreLabel!.isNotEmpty) ...[
                          const SizedBox(width: 12),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                            decoration: BoxDecoration(
                              color: _score! >= 80 ? const Color(0xFF10B981) : (_score! >= 60 ? Colors.orange : Colors.red),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text(
                              _scoreLabel!,
                              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                ],
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFF10B981).withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFF10B981).withValues(alpha: 0.3)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Text('✨', style: TextStyle(fontSize: 20)),
                          const SizedBox(width: 8),
                          Text(
                            'النص المصحح:',
                            style: GoogleFonts.cairo(
                              fontWeight: FontWeight.bold, 
                              color: const Color(0xFF047857)
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Text(
                        _correctedText!,
                        style: const TextStyle(fontSize: 16, height: 1.5),
                        textDirection: TextDirection.ltr,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Theme.of(context).cardTheme.color,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: colorScheme.outlineVariant),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '💡 ملاحظات وتوجيهات:',
                        style: GoogleFonts.cairo(
                          fontWeight: FontWeight.bold, 
                          fontSize: 16
                        ),
                      ),
                      const SizedBox(height: 16),
                      ..._feedbacks.map((feedback) => Padding(
                        padding: const EdgeInsets.only(bottom: 12.0),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('ℹ️', style: TextStyle(fontSize: 18)),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Text(
                                feedback,
                                style: GoogleFonts.cairo(
                                  fontSize: 14,
                                  color: colorScheme.onSurface,
                                ),
                              ),
                            ),
                          ],
                        ),
                      )),
                    ],
                  ),
                ),
              ] else if (!_isAnalyzing) ...[
                Center(
                  child: Column(
                    children: [
                      Icon(Icons.edit_document, size: 64, color: colorScheme.outline),
                      const SizedBox(height: 16),
                      Text(
                        'اكتب رسالتك في المربع أعلاه واضغط على فحص لعرض النتيجة هنا.',
                        style: GoogleFonts.cairo(color: colorScheme.outline),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
