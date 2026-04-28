import 'package:flutter/material.dart';

import '../../aman_models.dart';
import '../../aman_repository.dart';

class JugendamtRiskScreen extends StatefulWidget {
  const JugendamtRiskScreen({super.key});

  @override
  State<JugendamtRiskScreen> createState() => _JugendamtRiskScreenState();
}

class _JugendamtRiskScreenState extends State<JugendamtRiskScreen> {
  late final List<JugendamtRiskQuestion> _questions;
  final Map<int, int> _answers = {};
  bool _showResult = false;

  @override
  void initState() {
    super.initState();
    _questions = AmanRepository.instance.jugendamtRiskQuestions;
  }

  int get _totalScore {
    var sum = 0;
    for (final entry in _answers.entries) {
      sum += _questions[entry.key].riskScores[entry.value];
    }
    return sum;
  }

  int get _maxScore => _questions.fold(
      0, (sum, q) => sum + q.riskScores.reduce((a, b) => a > b ? a : b));

  _RiskLevel get _riskLevel {
    final pct = _maxScore > 0 ? _totalScore / _maxScore : 0.0;
    if (pct < 0.25) return _RiskLevel.green;
    if (pct < 0.55) return _RiskLevel.yellow;
    return _RiskLevel.red;
  }

  void _submit() {
    if (_answers.length < _questions.length) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('يرجى الإجابة على جميع الأسئلة')),
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
    final cs = Theme.of(context).colorScheme;

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('كاشف خطر اليوجند أمت'),
          actions: [
            if (_showResult)
              IconButton(
                icon: const Icon(Icons.refresh),
                onPressed: _reset,
                tooltip: 'إعادة الاختبار',
              ),
          ],
        ),
        body: _showResult ? _buildResult(cs) : _buildQuiz(cs),
      ),
    );
  }

  Widget _buildQuiz(ColorScheme cs) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          color: cs.secondaryContainer,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Icon(Icons.shield_outlined, color: cs.onSecondaryContainer),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    'هذا الاختبار يساعدك على تقييم وضعك العائلي ومعرفة '
                    'ما إذا كانت تصرفاتك قد تستدعي تدخل اليوجند أمت. '
                    'أجب بصراحة — جميع إجاباتك محفوظة محلياً ولا تُرسل لأي جهة.',
                    style: TextStyle(color: cs.onSecondaryContainer),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        for (var i = 0; i < _questions.length; i++) ...[
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${i + 1}. ${_questions[i].questionAr}',
                    style: Theme.of(context).textTheme.titleSmall?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  const SizedBox(height: 12),
                  for (var j = 0; j < _questions[i].options.length; j++)
                    RadioListTile<int>(
                      value: j,
                      groupValue: _answers[i],
                      title: Text(_questions[i].options[j]),
                      dense: true,
                      onChanged: (v) {
                        if (v != null) setState(() => _answers[i] = v);
                      },
                    ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 8),
        ],
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          child: FilledButton.icon(
            onPressed: _submit,
            icon: const Icon(Icons.assessment),
            label: Text(
                'عرض النتيجة (${_answers.length}/${_questions.length})'),
          ),
        ),
        const SizedBox(height: 32),
      ],
    );
  }

  Widget _buildResult(ColorScheme cs) {
    final risk = _riskLevel;

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const SizedBox(height: 24),
        Center(
          child: Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: risk.color.withOpacity(0.15),
              border: Border.all(color: risk.color, width: 4),
            ),
            child: Icon(risk.icon, size: 56, color: risk.color),
          ),
        ),
        const SizedBox(height: 24),
        Center(
          child: Text(
            risk.labelAr,
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: risk.color,
                ),
          ),
        ),
        const SizedBox(height: 8),
        Center(
          child: Text(
            'الدرجة: $_totalScore من $_maxScore',
            style: TextStyle(color: cs.onSurfaceVariant),
          ),
        ),
        const SizedBox(height: 24),
        Card(
          color: risk.color.withOpacity(0.08),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              risk.descriptionAr,
              style: Theme.of(context).textTheme.bodyLarge,
            ),
          ),
        ),
        const SizedBox(height: 16),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'نصائح فورية:',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                ),
                const SizedBox(height: 8),
                ...risk.tipsAr.map((tip) => Padding(
                      padding: const EdgeInsets.only(bottom: 6),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Icon(Icons.arrow_back_ios,
                              size: 14, color: cs.primary),
                          const SizedBox(width: 6),
                          Expanded(child: Text(tip)),
                        ],
                      ),
                    )),
              ],
            ),
          ),
        ),
        if (risk != _RiskLevel.green) ...[
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: FilledButton.icon(
              onPressed: () => Navigator.of(context).pop(),
              style: FilledButton.styleFrom(
                backgroundColor: risk.color,
              ),
              icon: const Icon(Icons.support_agent),
              label: const Text('تحدث مع مستشار الآن'),
            ),
          ),
        ],
        const SizedBox(height: 16),
        OutlinedButton.icon(
          onPressed: _reset,
          icon: const Icon(Icons.refresh),
          label: const Text('إعادة الاختبار'),
        ),
        const SizedBox(height: 32),
      ],
    );
  }
}

enum _RiskLevel {
  green(
    labelAr: 'وضع آمن',
    descriptionAr:
        'بناءً على إجاباتك، وضعك العائلي يبدو مستقراً وآمناً. '
        'استمر في التواصل الجيد مع أطفالك ومدرستهم.',
    tipsAr: [
      'حافظ على التواصل المنتظم مع المدرسة والروضة',
      'استمر في بناء علاقة صحية مع أطفالك',
      'تابع القراءة عن حقوقك وواجباتك في ألمانيا',
    ],
    color: Colors.green,
    icon: Icons.check_circle,
  ),
  yellow(
    labelAr: 'يحتاج انتباه',
    descriptionAr:
        'هناك بعض النقاط التي تحتاج انتباهك. لا داعي للقلق الشديد، '
        'لكن من المهم أن تبدأ بتغيير بعض السلوكيات قبل أن تتفاقم الأمور.',
    tipsAr: [
      'تحدث مع مستشار أسري عربي لفهم وضعك بشكل أفضل',
      'تواصل بشكل أفضل مع المدرسة — احضر الاجتماعات وأجب على الرسائل',
      'تجنب العقاب الجسدي تماماً — القانون الألماني يمنعه',
      'إذا كنت تمر بضغط نفسي، اطلب المساعدة المتخصصة',
    ],
    color: Colors.orange,
    icon: Icons.warning_amber,
  ),
  red(
    labelAr: 'خطر — تصرّف الآن',
    descriptionAr:
        'إجاباتك تشير إلى وجود مخاطر حقيقية قد تؤدي لتدخل اليوجند أمت. '
        'من المهم جداً أن تتحدث مع مستشار متخصص فوراً لترميم الوضع.',
    tipsAr: [
      'تحدث مع مستشار قانوني أو اجتماعي فوراً',
      'أوقف أي سلوك عنيف أو صراخ في المنزل',
      'تأكد من حضور أطفالك المنتظم للمدرسة أو الروضة',
      'اطلب المساعدة النفسية إذا كنت تعاني من ضغط',
      'تواصل مع مركز استشاري عربي — استخدم خريطة المساعدة',
    ],
    color: Colors.red,
    icon: Icons.error,
  );

  final String labelAr;
  final String descriptionAr;
  final List<String> tipsAr;
  final Color color;
  final IconData icon;

  const _RiskLevel({
    required this.labelAr,
    required this.descriptionAr,
    required this.tipsAr,
    required this.color,
    required this.icon,
  });
}
