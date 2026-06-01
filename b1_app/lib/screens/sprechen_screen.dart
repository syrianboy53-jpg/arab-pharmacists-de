import 'package:flutter/material.dart';

class SprechenScreen extends StatelessWidget {
  const SprechenScreen({super.key});

  static const _topics = [
    _Topic(title: 'Sich vorstellen', titleAr: 'تقديم النفس', tips: ['Name, Alter, Herkunft', 'Beruf / Ausbildung', 'Familie', 'Hobbys', 'Warum Deutsch lernen?'], sampleAr: 'اسمي أحمد، عمري 28 سنة. أنا من سوريا وأعيش في ألمانيا منذ 3 سنوات. أنا أدرس حالياً في Ausbildung كـ Fachinformatiker. في وقت الفراغ أحب كرة القدم والقراءة.'),
    _Topic(title: 'Über ein Bild sprechen', titleAr: 'وصف صورة', tips: ['Was sehen Sie?', 'Wo ist das?', 'Was machen die Personen?', 'Eigene Erfahrung dazu', 'Was denken Sie darüber?'], sampleAr: 'في الصورة أرى... / يبدو أن... / الأشخاص يقومون بـ... / هذا يذكّرني بـ... / أعتقد أن...'),
    _Topic(title: 'Gemeinsam planen', titleAr: 'التخطيط المشترك', tips: ['Vorschläge machen: Ich schlage vor...', 'Zustimmen: Das finde ich gut', 'Ablehnen: Das ist leider nicht möglich', 'Kompromiss: Wie wäre es, wenn...?', 'Zusammenfassen: Also machen wir...'], sampleAr: 'أقترح أن... / ما رأيك في...؟ / هذا مناسب / للأسف هذا لا يمكن / ما رأيك لو...؟ / إذاً سنفعل...'),
    _Topic(title: 'Wohnen', titleAr: 'السكن', tips: ['Wo wohnen Sie?', 'Wie ist Ihre Wohnung?', 'Vorteile/Nachteile', 'Miete in Deutschland', 'Traumwohnung'], sampleAr: 'أسكن في شقة صغيرة في... / الإيجار هو... / المميزات... / العيوب... / شقة أحلامي...'),
    _Topic(title: 'Arbeit und Beruf', titleAr: 'العمل والمهنة', tips: ['Was arbeiten Sie?', 'Wie sind die Arbeitszeiten?', 'Was gefällt Ihnen?', 'Traumberuf', 'Arbeit in der Heimat vs. hier'], sampleAr: 'أنا أعمل كـ... / ساعات العمل من... إلى... / يعجبني أن... / وظيفة أحلامي هي... / في بلدي كنت...'),
    _Topic(title: 'Einkaufen', titleAr: 'التسوق', tips: ['Wo kaufen Sie ein?', 'Wie oft?', 'Online oder im Geschäft?', 'Tipps zum Sparen', 'Reklamation'], sampleAr: 'أتسوق عادة في... / أذهب للتسوق... مرات في الأسبوع / أفضل التسوق عبر الإنترنت لأن... / للتوفير...'),
    _Topic(title: 'Gesundheit', titleAr: 'الصحة', tips: ['Beim Arzt: Symptome beschreiben', 'Gesunde Lebensweise', 'Sport und Ernährung', 'Krankenversicherung', 'Apotheke'], sampleAr: 'عندي ألم في... / منذ... / أحاول أن أعيش بصحة عن طريق... / التأمين الصحي مهم لأن...'),
    _Topic(title: 'Reisen', titleAr: 'السفر', tips: ['Wohin reisen Sie gern?', 'Verkehrsmittel', 'Letzte Reise', 'Reiseplanung', 'Tipps für Touristen'], sampleAr: 'أحب السفر إلى... / عادة أسافر بـ... / آخر رحلة كانت إلى... / عند التخطيط أفعل...'),
    _Topic(title: 'Medien', titleAr: 'الإعلام', tips: ['Welche Medien nutzen Sie?', 'Soziale Medien', 'Vorteile und Nachteile', 'Nachrichten', 'Fernsehen vs. Internet'], sampleAr: 'أستخدم يومياً... / وسائل التواصل الاجتماعي... / المزايا... / العيوب... / أفضل متابعة الأخبار عبر...'),
    _Topic(title: 'Freizeit', titleAr: 'وقت الفراغ', tips: ['Was machen Sie in der Freizeit?', 'Sport', 'Hobbys', 'Mit wem?', 'Am Wochenende'], sampleAr: 'في وقت فراغي أحب أن... / أمارس رياضة... / هوايتي هي... / عادة مع... / في عطلة نهاية الأسبوع...'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('المحادثة - Sprechen')),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: _topics.length,
        itemBuilder: (context, i) {
          final t = _topics[i];
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: ListTile(
              leading: CircleAvatar(
                backgroundColor: Theme.of(context).colorScheme.primaryContainer,
                child: Text('${i + 1}'),
              ),
              title: Text(t.titleAr),
              subtitle: Text(t.title),
              trailing: const Icon(Icons.arrow_forward_ios, size: 16),
              onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => _TopicDetail(topic: t))),
            ),
          );
        },
      ),
    );
  }
}

class _TopicDetail extends StatelessWidget {
  final _Topic topic;
  const _TopicDetail({required this.topic});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: AppBar(title: Text(topic.titleAr)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Card(
              color: colorScheme.primaryContainer.withValues(alpha: 0.3),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('نقاط مهمة:', style: TextStyle(fontWeight: FontWeight.bold, color: colorScheme.primary, fontSize: 16)),
                    const SizedBox(height: 12),
                    ...topic.tips.map((tip) => Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        children: [
                          Icon(Icons.arrow_left, color: colorScheme.primary, size: 20),
                          const SizedBox(width: 8),
                          Expanded(child: Text(tip, textDirection: TextDirection.ltr, style: const TextStyle(fontSize: 15))),
                        ],
                      ),
                    )),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            Text('نموذج إجابة بالعربي:', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Text(topic.sampleAr, style: const TextStyle(height: 1.8, fontSize: 15)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Topic {
  final String title, titleAr, sampleAr;
  final List<String> tips;
  const _Topic({required this.title, required this.titleAr, required this.tips, required this.sampleAr});
}
