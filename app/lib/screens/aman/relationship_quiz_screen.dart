import 'package:flutter/material.dart';

import '../../aman_models.dart';
import '../../aman_repository.dart';

class RelationshipQuizScreen extends StatefulWidget {
  const RelationshipQuizScreen({super.key});

  @override
  State<RelationshipQuizScreen> createState() => _RelationshipQuizScreenState();
}

class _RelationshipQuizScreenState extends State<RelationshipQuizScreen> {
  final Map<String, int> _answers = {};
  bool _showResult = false;

  List<RelationshipQuizQuestion> get _questions =>
      AmanRepository.instance.quizQuestions;

  int get _totalScore {
    var total = 0;
    for (final entry in _answers.entries) {
      final q = _questions.firstWhere((q) => q.id == entry.key);
      if (entry.value >= 0 && entry.value < q.scores.length) {
        total += q.scores[entry.value];
      }
    }
    return total;
  }

  String get _resultTitle {
    final score = _totalScore;
    if (score <= 8) return 'علاقتكما بخير';
    if (score <= 18) return 'هناك توتر... لكن يمكن إصلاحه';
    if (score <= 28) return 'علاقتكما بحاجة لمساعدة متخصصة';
    return 'وضع حرج - اطلب المساعدة فوراً';
  }

  String get _resultDescription {
    final score = _totalScore;
    if (score <= 8) {
      return 'يبدو أن علاقتكما مستقرة. استمرا في التواصل والاهتمام ببعضكما. لا تنسيا أن العلاقة تحتاج رعاية مستمرة.';
    }
    if (score <= 18) {
      return 'هناك بعض التوتر في علاقتكما. الخبر الجيد أنه يمكن إصلاحه! ننصحكما بالتحدث بصراحة عن مشاعركما، أو زيارة مستشار أسري للحصول على أدوات تواصل أفضل.';
    }
    if (score <= 28) {
      return 'علاقتكما تمر بمرحلة صعبة. ننصحكما بشدة بزيارة مستشار أسري متخصص. لا تتركا الأمور تتفاقم. في قسم "اسأل خبيراً" يمكنكما إيجاد مختصين يتحدثون العربية.';
    }
    return 'وضعكما يحتاج تدخلاً سريعاً. إذا كان هناك عنف، اطلبي المساعدة فوراً عبر قسم "المرأة والبيت الآمن". إذا لم يكن هناك عنف، فالعلاقة بحاجة ماسة لمستشار متخصص.';
  }

  Color get _resultColor {
    final score = _totalScore;
    if (score <= 8) return Colors.green;
    if (score <= 18) return Colors.orange;
    if (score <= 28) return Colors.deepOrange;
    return Colors.red;
  }

  IconData get _resultIcon {
    final score = _totalScore;
    if (score <= 8) return Icons.favorite;
    if (score <= 18) return Icons.warning_amber;
    if (score <= 28) return Icons.error_outline;
    return Icons.emergency;
  }

  void _submit() {
    if (_answers.length < _questions.length) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('الرجاء الإجابة على جميع الأسئلة')),
      );
      return;
    }
    setState(() => _showResult = true);
  }

  void _reset() {
    setState(() {
      _answers.clear();
      _showResult = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(title: const Text('اختبار: هل نحن بخير؟')),
        body: _showResult ? _buildResult() : _buildQuiz(),
      ),
    );
  }

  Widget _buildQuiz() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          color: Theme.of(context).colorScheme.primaryContainer,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                Icon(Icons.psychology,
                    size: 40,
                    color: Theme.of(context).colorScheme.onPrimaryContainer),
                const SizedBox(height: 8),
                Text(
                  'اختبار بسيط لقياس درجة التوتر في العلاقة',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).colorScheme.onPrimaryContainer,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 4),
                Text(
                  'أجب بصدق. النتيجة سرية ولا يراها أحد غيرك.',
                  style: TextStyle(
                    fontSize: 13,
                    color: Theme.of(context).colorScheme.onPrimaryContainer,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        ..._questions.asMap().entries.map((entry) {
          final i = entry.key;
          final q = entry.value;
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'السؤال ${i + 1} من ${_questions.length}',
                    style: TextStyle(
                      fontSize: 12,
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    q.questionAr,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  const SizedBox(height: 12),
                  ...q.options.asMap().entries.map((opt) => RadioListTile<int>(
                        value: opt.key,
                        groupValue: _answers[q.id],
                        title: Text(opt.value),
                        onChanged: (v) {
                          if (v != null) {
                            setState(() => _answers[q.id] = v);
                          }
                        },
                        dense: true,
                      )),
                ],
              ),
            ),
          );
        }),
        const SizedBox(height: 8),
        SizedBox(
          width: double.infinity,
          height: 48,
          child: FilledButton.icon(
            onPressed: _submit,
            icon: const Icon(Icons.check_circle),
            label: const Text('عرض النتيجة',
                style: TextStyle(fontSize: 16)),
          ),
        ),
        const SizedBox(height: 24),
      ],
    );
  }

  Widget _buildResult() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          const SizedBox(height: 32),
          Icon(_resultIcon, size: 80, color: _resultColor),
          const SizedBox(height: 16),
          Text(
            _resultTitle,
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: _resultColor,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            'الدرجة: $_totalScore من ${_questions.length * 5}',
            style: TextStyle(
              fontSize: 16,
              color: Theme.of(context).colorScheme.onSurfaceVariant,
            ),
          ),
          const SizedBox(height: 24),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Text(
                _resultDescription,
                style: const TextStyle(fontSize: 16, height: 1.7),
                textAlign: TextAlign.center,
              ),
            ),
          ),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              onPressed: _reset,
              icon: const Icon(Icons.refresh),
              label: const Text('إعادة الاختبار'),
            ),
          ),
          const SizedBox(height: 32),
        ],
      ),
    );
  }
}
