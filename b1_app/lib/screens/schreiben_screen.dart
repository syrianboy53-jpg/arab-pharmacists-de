import 'package:flutter/material.dart';

class SchreibenScreen extends StatelessWidget {
  const SchreibenScreen({super.key});

  static const _templates = [
    _Template(title: 'Krankmeldung', titleAr: 'إبلاغ عن مرض', type: 'Brief', prompt: 'Sie sind krank und können nicht zur Arbeit kommen. Schreiben Sie eine E-Mail an Ihren Chef.', promptAr: 'أنت مريض ولا تستطيع الذهاب للعمل. اكتب بريداً إلكترونياً لرئيسك.', sample: 'Sehr geehrter Herr Müller,\n\nleider kann ich heute nicht zur Arbeit kommen, da ich krank bin. Ich war beim Arzt und habe eine Krankschreibung bekommen. Ich werde voraussichtlich am Mittwoch wieder da sein.\n\nMit freundlichen Grüßen\nAhmad Hassan', tips: ['Betreff: Krankmeldung', 'Formelle Anrede', 'Grund nennen', 'Voraussichtliche Dauer', 'Höflicher Abschluss']),
    _Template(title: 'Terminvereinbarung', titleAr: 'حجز موعد', type: 'Brief', prompt: 'Sie möchten einen Termin beim Arzt vereinbaren.', promptAr: 'تريد حجز موعد عند الطبيب.', sample: 'Sehr geehrte Damen und Herren,\n\nich möchte gerne einen Termin bei Dr. Weber vereinbaren. Ich habe seit einer Woche Rückenschmerzen. Haben Sie nächste Woche einen freien Termin? Am besten wäre nachmittags ab 14 Uhr.\n\nVielen Dank im Voraus.\nMit freundlichen Grüßen\nMohammad Ali', tips: ['Problem beschreiben', 'Zeitwunsch angeben', 'Höflich formulieren']),
    _Template(title: 'Beschwerde', titleAr: 'شكوى', type: 'Brief', prompt: 'Ihre Waschmaschine ist kaputt. Sie haben sie vor 3 Monaten gekauft. Schreiben Sie an das Geschäft.', promptAr: 'غسالتك معطلة. اشتريتها قبل 3 أشهر. اكتب للمحل.', sample: 'Sehr geehrte Damen und Herren,\n\nam 15. März habe ich bei Ihnen eine Waschmaschine (Modell XY) gekauft. Leider ist sie seit gestern kaputt – sie wäscht nicht mehr richtig. Da ich noch Garantie habe, bitte ich Sie um eine Reparatur oder einen Austausch.\n\nBitte kontaktieren Sie mich unter 0176-12345678.\n\nMit freundlichen Grüßen\nFatima Al-Hassan', tips: ['Kaufdatum nennen', 'Problem genau beschreiben', 'Garantie erwähnen', 'Lösung vorschlagen', 'Kontaktdaten angeben']),
    _Template(title: 'Wohnungssuche', titleAr: 'البحث عن شقة', type: 'Brief', prompt: 'Sie haben eine Wohnungsanzeige gelesen und möchten die Wohnung besichtigen.', promptAr: 'قرأت إعلان شقة وتريد مشاهدتها.', sample: 'Sehr geehrte Damen und Herren,\n\nmit großem Interesse habe ich Ihre Anzeige für die 3-Zimmer-Wohnung in der Berliner Straße gelesen. Ich bin 32 Jahre alt, berufstätig und suche eine Wohnung für meine Familie (2 Erwachsene, 1 Kind).\n\nIch würde die Wohnung gerne besichtigen. Wann wäre ein Termin möglich?\n\nMit freundlichen Grüßen\nKhalil Ibrahim', tips: ['Interesse zeigen', 'Sich kurz vorstellen', 'Nach Besichtigung fragen', 'Kontaktdaten hinterlassen']),
    _Template(title: 'Einladung absagen', titleAr: 'الاعتذار عن دعوة', type: 'Brief', prompt: 'Ihr Freund hat Sie zu seiner Geburtstagsfeier eingeladen. Leider können Sie nicht kommen.', promptAr: 'صديقك دعاك لحفلة عيد ميلاده. للأسف لا تستطيع الحضور.', sample: 'Lieber Thomas,\n\nvielen Dank für die Einladung zu deiner Geburtstagsfeier am Samstag! Leider kann ich nicht kommen, weil ich an diesem Tag arbeiten muss. Das tut mir wirklich leid.\n\nIch wünsche dir alles Gute zum Geburtstag! Vielleicht können wir uns nächste Woche auf einen Kaffee treffen?\n\nHerzliche Grüße\nAhmed', tips: ['Danke für Einladung', 'Grund für Absage', 'Bedauern ausdrücken', 'Alternative vorschlagen']),
    _Template(title: 'Kündigung', titleAr: 'إنهاء عقد', type: 'Brief', prompt: 'Sie möchten Ihren Handyvertrag kündigen.', promptAr: 'تريد إنهاء عقد الهاتف المحمول.', sample: 'Sehr geehrte Damen und Herren,\n\nhiermit kündige ich meinen Mobilfunkvertrag (Vertragsnummer: 123456789) fristgerecht zum nächstmöglichen Termin.\n\nBitte senden Sie mir eine schriftliche Bestätigung der Kündigung an meine Adresse.\n\nMit freundlichen Grüßen\nOmar Khalil', tips: ['Vertragsnummer angeben', 'Kündigungstermin', 'Bestätigung verlangen']),
    _Template(title: 'Bewerbung', titleAr: 'تقديم على وظيفة', type: 'Brief', prompt: 'Sie haben eine Stellenanzeige als Verkäufer/in gelesen und möchten sich bewerben.', promptAr: 'قرأت إعلان وظيفة كبائع/ة وتريد التقديم.', sample: 'Sehr geehrte Damen und Herren,\n\nmit großem Interesse habe ich Ihre Stellenanzeige für die Position als Verkäufer/in gelesen. Ich bin 28 Jahre alt und habe bereits 2 Jahre Erfahrung im Verkauf. Ich spreche Deutsch (B1), Arabisch und Englisch.\n\nIch bin teamfähig, zuverlässig und freundlich. Über eine Einladung zu einem Vorstellungsgespräch würde ich mich sehr freuen.\n\nMit freundlichen Grüßen\nLayla Hassan', tips: ['Bezug auf Anzeige', 'Erfahrung nennen', 'Qualifikationen', 'Stärken', 'Interesse zeigen']),
    _Template(title: 'Entschuldigung Schule', titleAr: 'اعتذار للمدرسة', type: 'Brief', prompt: 'Ihr Kind war krank und konnte nicht zur Schule gehen. Schreiben Sie eine Entschuldigung.', promptAr: 'طفلك كان مريضاً ولم يستطع الذهاب للمدرسة. اكتب رسالة اعتذار.', sample: 'Sehr geehrte Frau Schmidt,\n\nmein Sohn Ali (Klasse 3b) konnte am Montag, den 15. Mai, und Dienstag, den 16. Mai, nicht zur Schule kommen, da er krank war (Fieber und Erkältung). Anbei finden Sie die ärztliche Bescheinigung.\n\nMit freundlichen Grüßen\nHassan Al-Ahmad', tips: ['Name und Klasse', 'Datum der Abwesenheit', 'Grund', 'Ärztliche Bescheinigung erwähnen']),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('الكتابة - Schreiben')),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: _templates.length,
        itemBuilder: (context, i) {
          final t = _templates[i];
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: ListTile(
              leading: CircleAvatar(
                backgroundColor: Theme.of(context).colorScheme.primaryContainer,
                child: const Icon(Icons.edit_note),
              ),
              title: Text(t.titleAr),
              subtitle: Text(t.title),
              trailing: const Icon(Icons.arrow_forward_ios, size: 16),
              onTap: () => _showTemplate(context, t),
            ),
          );
        },
      ),
    );
  }

  void _showTemplate(BuildContext context, _Template t) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => _TemplateDetail(template: t)));
  }
}

class _TemplateDetail extends StatelessWidget {
  final _Template template;
  const _TemplateDetail({required this.template});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: AppBar(title: Text(template.titleAr)),
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
                    Text('المهمة:', style: TextStyle(fontWeight: FontWeight.bold, color: colorScheme.primary)),
                    const SizedBox(height: 8),
                    Text(template.prompt, textDirection: TextDirection.ltr),
                    const SizedBox(height: 8),
                    Text(template.promptAr, style: TextStyle(color: colorScheme.onSurfaceVariant)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            Text('نموذج الإجابة:', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Text(template.sample, textDirection: TextDirection.ltr, style: const TextStyle(height: 1.8, fontSize: 15)),
              ),
            ),
            const SizedBox(height: 16),
            Text('نصائح:', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            ...template.tips.map((tip) => Padding(
              padding: const EdgeInsets.only(bottom: 6),
              child: Row(
                children: [
                  Icon(Icons.check_circle, size: 18, color: colorScheme.primary),
                  const SizedBox(width: 8),
                  Expanded(child: Text(tip, textDirection: TextDirection.ltr)),
                ],
              ),
            )),
          ],
        ),
      ),
    );
  }
}

class _Template {
  final String title, titleAr, type, prompt, promptAr, sample;
  final List<String> tips;
  const _Template({required this.title, required this.titleAr, required this.type, required this.prompt, required this.promptAr, required this.sample, required this.tips});
}
