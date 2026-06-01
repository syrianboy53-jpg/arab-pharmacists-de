import 'package:flutter/material.dart';

class B2Screen extends StatelessWidget {
  const B2Screen({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: AppBar(title: const Text('مستوى B2')),
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
                    Icon(Icons.trending_up, size: 48, color: colorScheme.primary),
                    const SizedBox(height: 12),
                    Text('B2 Prüfung', style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold)),
                    const SizedBox(height: 8),
                    const Text('للمتقدمين - بعد اجتياز B1', textAlign: TextAlign.center),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            _sectionCard(context, 'القراءة B2', 'Lesen', Icons.auto_stories, [
              'نصوص أطول وأكثر تعقيداً',
              'مقالات صحفية ورأي',
              'فهم التفاصيل والاستنتاج',
              '5 أجزاء، 65 دقيقة',
            ]),
            _sectionCard(context, 'الاستماع B2', 'Hören', Icons.headphones, [
              'محادثات أطول وأسرع',
              'مقابلات ومحاضرات',
              'فهم الآراء والحجج',
              '4 أجزاء، 40 دقيقة',
            ]),
            _sectionCard(context, 'الكتابة B2', 'Schreiben', Icons.edit_note, [
              'رسائل رسمية معقدة',
              'مقال رأي (Erörterung)',
              'تصحيح نص',
              '3 أجزاء، 75 دقيقة',
            ]),
            _sectionCard(context, 'المحادثة B2', 'Sprechen', Icons.record_voice_over, [
              'عرض تقديمي (Vortrag)',
              'مناقشة موضوع',
              'التعبير عن رأي مبرر',
              '3 أجزاء، 15 دقيقة',
            ]),
            _sectionCard(context, 'القواعد B2', 'Grammatik', Icons.menu_book, [
              'Konjunktiv I (الخطاب غير المباشر)',
              'Partizipialattribute (صفات مشتقة)',
              'Nominalisierung (التحويل الاسمي)',
              'Konnektoren (أدوات ربط متقدمة)',
              'Passiv mit Modalverben',
            ]),
            const SizedBox(height: 16),
            Card(
              color: Colors.amber.withValues(alpha: 0.1),
              child: const Padding(
                padding: EdgeInsets.all(16),
                child: Row(
                  children: [
                    Icon(Icons.construction, color: Colors.amber),
                    SizedBox(width: 12),
                    Expanded(child: Text('قسم B2 قيد التطوير - سيتم إضافة نماذج امتحان كاملة ومحتوى تفاعلي قريباً!')),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _sectionCard(BuildContext context, String title, String subtitle, IconData icon, List<String> points) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ExpansionTile(
        leading: Icon(icon, color: Theme.of(context).colorScheme.primary),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle),
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: points.map((p) => Padding(
                padding: const EdgeInsets.only(bottom: 6),
                child: Row(
                  children: [
                    Icon(Icons.circle, size: 6, color: Theme.of(context).colorScheme.primary),
                    const SizedBox(width: 8),
                    Expanded(child: Text(p)),
                  ],
                ),
              )).toList(),
            ),
          ),
        ],
      ),
    );
  }
}
