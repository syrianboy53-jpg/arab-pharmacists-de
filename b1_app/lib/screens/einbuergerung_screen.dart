import 'package:flutter/material.dart';

class EinbuergerungScreen extends StatelessWidget {
  const EinbuergerungScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: AppBar(title: const Text('اختبار الجنسية - Einbürgerungstest')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Card(
              color: colorScheme.primaryContainer.withValues(alpha: 0.3),
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    Icon(Icons.account_balance, size: 48, color: colorScheme.primary),
                    const SizedBox(height: 12),
                    Text('Einbürgerungstest', style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold)),
                    const SizedBox(height: 8),
                    const Text('اختبار التجنس الألماني - 33 سؤال من أصل 310', textAlign: TextAlign.center),
                    const SizedBox(height: 4),
                    Text('يجب الإجابة على 17 سؤال بشكل صحيح للنجاح', style: TextStyle(color: colorScheme.onSurfaceVariant)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            Text('معلومات عن الاختبار', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            _infoTile(context, Icons.timer, 'المدة', '60 دقيقة'),
            _infoTile(context, Icons.quiz, 'عدد الأسئلة', '33 سؤال (30 عام + 3 عن ولايتك)'),
            _infoTile(context, Icons.check_circle, 'النجاح', '17 إجابة صحيحة من 33'),
            _infoTile(context, Icons.euro, 'التكلفة', '25 يورو'),
            _infoTile(context, Icons.calendar_today, 'المواعيد', 'كل شهر في VHS'),
            const SizedBox(height: 16),
            Text('شروط التجنس (قانون 2024)', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            _conditionTile(context, '5 سنوات إقامة قانونية (أو 3 سنوات مع اندماج خاص)'),
            _conditionTile(context, 'مستوى B1 في اللغة الألمانية'),
            _conditionTile(context, 'القدرة على إعالة النفس'),
            _conditionTile(context, 'عدم وجود سوابق جنائية'),
            _conditionTile(context, 'اجتياز اختبار الجنسية (Einbürgerungstest)'),
            _conditionTile(context, 'الاعتراف بالنظام الأساسي الحر الديمقراطي'),
            _conditionTile(context, 'الجنسية المزدوجة مسموحة (قانون 2024 الجديد)'),
            const SizedBox(height: 20),
            Card(
              color: Colors.green.withValues(alpha: 0.1),
              child: const Padding(
                padding: EdgeInsets.all(16),
                child: Row(
                  children: [
                    Icon(Icons.lightbulb, color: Colors.green),
                    SizedBox(width: 12),
                    Expanded(child: Text('نصيحة: أسئلة اختبار الجنسية متشابهة جداً مع أسئلة "الحياة في ألمانيا" (Leben in Deutschland). تدرّب عليها من القسم الرئيسي!')),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _infoTile(BuildContext context, IconData icon, String label, String value) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Icon(icon, color: Theme.of(context).colorScheme.primary),
        title: Text(label, style: const TextStyle(fontWeight: FontWeight.w500)),
        subtitle: Text(value),
      ),
    );
  }

  Widget _conditionTile(BuildContext context, String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.check, color: Theme.of(context).colorScheme.primary, size: 20),
          const SizedBox(width: 8),
          Expanded(child: Text(text)),
        ],
      ),
    );
  }
}
