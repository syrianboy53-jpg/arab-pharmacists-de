import 'package:flutter/material.dart';

class GrammatikScreen extends StatelessWidget {
  const GrammatikScreen({super.key});

  static const _rules = [
    _Rule(title: 'Perfekt', titleAr: 'الماضي التام', explanation: 'haben/sein + Partizip II', explanationAr: 'يتكون من الفعل المساعد haben أو sein + التصريف الثالث', examples: ['Ich habe gegessen. (أكلت)', 'Er ist gegangen. (ذهب)', 'Wir haben gearbeitet. (عملنا)', 'Sie ist gefahren. (سافرت)']),
    _Rule(title: 'Nebensätze mit weil', titleAr: 'جمل ثانوية مع weil (لأن)', explanation: 'Verb steht am Ende', explanationAr: 'الفعل يأتي في النهاية', examples: ['Ich bleibe zu Hause, weil ich krank bin.', 'Er lernt Deutsch, weil er in Deutschland lebt.', 'Sie kommt nicht, weil sie arbeiten muss.']),
    _Rule(title: 'Konjunktiv II', titleAr: 'صيغة الشرط', explanation: 'würde + Infinitiv / hätte / wäre', explanationAr: 'للتعبير عن الأمنيات والطلبات المهذبة', examples: ['Ich würde gern nach Berlin fahren.', 'Hätten Sie einen Moment Zeit?', 'Wenn ich reich wäre, würde ich reisen.', 'Könnten Sie mir helfen?']),
    _Rule(title: 'Relativsätze', titleAr: 'جمل الوصل', explanation: 'der/die/das + Verb am Ende', explanationAr: 'تستخدم لوصف شيء أو شخص', examples: ['Der Mann, der dort steht, ist mein Lehrer.', 'Die Frau, die Deutsch spricht, ist Ärztin.', 'Das Buch, das ich lese, ist interessant.']),
    _Rule(title: 'Passiv', titleAr: 'المبني للمجهول', explanation: 'werden + Partizip II', explanationAr: 'يستخدم عندما يكون الفاعل غير معروف أو غير مهم', examples: ['Das Auto wird repariert. (السيارة تُصلَح)', 'Die Tür wurde geöffnet. (الباب فُتح)', 'Der Brief ist geschrieben worden. (الرسالة كُتبت)']),
    _Rule(title: 'Adjektivdeklination', titleAr: 'تصريف الصفات', explanation: 'Endungen nach Artikel', explanationAr: 'نهاية الصفة تتغير حسب أداة التعريف والحالة الإعرابية', examples: ['der große Mann (Nominativ)', 'einen großen Mann (Akkusativ)', 'dem großen Mann (Dativ)', 'ein großes Haus (Nominativ)']),
    _Rule(title: 'Präpositionen mit Dativ', titleAr: 'حروف الجر مع Dativ', explanation: 'aus, bei, mit, nach, seit, von, zu', explanationAr: 'هذه حروف الجر تأخذ دائماً حالة الـDativ', examples: ['Ich komme aus der Türkei.', 'Er wohnt bei seinem Bruder.', 'Sie fährt mit dem Bus.', 'Nach dem Essen gehen wir spazieren.']),
    _Rule(title: 'Präpositionen mit Akkusativ', titleAr: 'حروف الجر مع Akkusativ', explanation: 'für, durch, gegen, ohne, um', explanationAr: 'هذه حروف الجر تأخذ دائماً حالة الـAkkusativ', examples: ['Das Geschenk ist für meinen Vater.', 'Wir gehen durch den Park.', 'Er ist gegen den Vorschlag.', 'Sie geht ohne ihren Mann.']),
    _Rule(title: 'Wechselpräpositionen', titleAr: 'حروف الجر المتغيرة', explanation: 'an, auf, hinter, in, neben, über, unter, vor, zwischen', explanationAr: 'Akkusativ = حركة (wohin?) / Dativ = مكان (wo?)', examples: ['Ich stelle das Buch auf den Tisch. (Akk - wohin?)', 'Das Buch liegt auf dem Tisch. (Dat - wo?)', 'Er geht in die Schule. (Akk)', 'Er ist in der Schule. (Dat)']),
    _Rule(title: 'Konjunktionen', titleAr: 'أدوات الربط', explanation: 'und, aber, oder, denn, weil, dass, ob, wenn', explanationAr: 'أدوات الربط تصل بين الجمل', examples: ['Ich lerne Deutsch und arbeite. (و)', 'Er ist müde, aber er arbeitet. (لكن)', 'Ich weiß, dass er kommt. (أن)', 'Wenn es regnet, bleibe ich zu Hause. (إذا)']),
    _Rule(title: 'Verben mit Präpositionen', titleAr: 'أفعال مع حروف جر', explanation: 'Feste Verbindungen', explanationAr: 'بعض الأفعال مرتبطة بحروف جر معينة', examples: ['warten auf (ينتظر)', 'sich freuen über (يفرح بـ)', 'denken an (يفكر في)', 'sich interessieren für (يهتم بـ)', 'Angst haben vor (يخاف من)']),
    _Rule(title: 'Indirekte Fragen', titleAr: 'الأسئلة غير المباشرة', explanation: 'ob / Fragewort + Verb am Ende', explanationAr: 'الفعل يذهب إلى نهاية الجملة', examples: ['Ich weiß nicht, ob er kommt.', 'Können Sie mir sagen, wo der Bahnhof ist?', 'Ich frage mich, wann der Kurs beginnt.']),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('القواعد - Grammatik')),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: _rules.length,
        itemBuilder: (context, i) {
          final r = _rules[i];
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: ExpansionTile(
              leading: CircleAvatar(
                backgroundColor: Theme.of(context).colorScheme.primaryContainer,
                child: Text('${i + 1}', style: TextStyle(color: Theme.of(context).colorScheme.primary)),
              ),
              title: Text(r.titleAr, style: const TextStyle(fontWeight: FontWeight.bold)),
              subtitle: Text(r.title),
              children: [
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Theme.of(context).colorScheme.primaryContainer.withValues(alpha: 0.3),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Column(
                          children: [
                            Text(r.explanation, textDirection: TextDirection.ltr, style: const TextStyle(fontWeight: FontWeight.bold)),
                            const SizedBox(height: 4),
                            Text(r.explanationAr, style: TextStyle(color: Theme.of(context).colorScheme.onSurfaceVariant)),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),
                      const Text('أمثلة:', style: TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      ...r.examples.map((ex) => Padding(
                        padding: const EdgeInsets.only(bottom: 6),
                        child: Row(
                          children: [
                            Icon(Icons.circle, size: 6, color: Theme.of(context).colorScheme.primary),
                            const SizedBox(width: 8),
                            Expanded(child: Text(ex, textDirection: TextDirection.ltr)),
                          ],
                        ),
                      )),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _Rule {
  final String title, titleAr, explanation, explanationAr;
  final List<String> examples;
  const _Rule({required this.title, required this.titleAr, required this.explanation, required this.explanationAr, required this.examples});
}
