import 'package:flutter/material.dart';

class WortschatzScreen extends StatelessWidget {
  const WortschatzScreen({super.key});

  static const _categories = [
    _VocabCategory(name: 'الحياة اليومية', nameDE: 'Alltag', words: [
      _Word(de: 'der Termin, -e', ar: 'الموعد', example: 'Ich habe einen Termin beim Arzt.'),
      _Word(de: 'die Rechnung, -en', ar: 'الفاتورة', example: 'Die Rechnung kommt per Post.'),
      _Word(de: 'der Vertrag, -¨e', ar: 'العقد', example: 'Ich habe einen Mietvertrag unterschrieben.'),
      _Word(de: 'die Versicherung, -en', ar: 'التأمين', example: 'Eine Krankenversicherung ist Pflicht.'),
      _Word(de: 'anmelden (sich)', ar: 'التسجيل', example: 'Ich muss mich beim Einwohnermeldeamt anmelden.'),
      _Word(de: 'kündigen', ar: 'الإنهاء/الفسخ', example: 'Ich möchte meinen Vertrag kündigen.'),
      _Word(de: 'überweisen', ar: 'التحويل', example: 'Ich überweise die Miete jeden Monat.'),
      _Word(de: 'beantragen', ar: 'التقديم/الطلب', example: 'Ich beantrage einen neuen Ausweis.'),
    ]),
    _VocabCategory(name: 'العمل', nameDE: 'Arbeit', words: [
      _Word(de: 'die Bewerbung, -en', ar: 'التقديم على وظيفة', example: 'Ich schicke meine Bewerbung per E-Mail.'),
      _Word(de: 'das Vorstellungsgespräch, -e', ar: 'مقابلة العمل', example: 'Morgen habe ich ein Vorstellungsgespräch.'),
      _Word(de: 'der Lebenslauf, -¨e', ar: 'السيرة الذاتية', example: 'Der Lebenslauf muss aktuell sein.'),
      _Word(de: 'das Gehalt, -¨er', ar: 'الراتب', example: 'Das Gehalt kommt am Ende des Monats.'),
      _Word(de: 'die Überstunden (Pl.)', ar: 'ساعات إضافية', example: 'Ich mache heute Überstunden.'),
      _Word(de: 'der Urlaub', ar: 'الإجازة', example: 'Ich habe 30 Tage Urlaub im Jahr.'),
      _Word(de: 'die Kündigung, -en', ar: 'الفصل/الاستقالة', example: 'Er hat seine Kündigung eingereicht.'),
      _Word(de: 'die Ausbildung, -en', ar: 'التدريب المهني', example: 'Ich mache eine Ausbildung als Mechatroniker.'),
    ]),
    _VocabCategory(name: 'الصحة', nameDE: 'Gesundheit', words: [
      _Word(de: 'das Rezept, -e', ar: 'الوصفة الطبية', example: 'Der Arzt schreibt ein Rezept.'),
      _Word(de: 'die Krankschreibung', ar: 'الإجازة المرضية', example: 'Ich brauche eine Krankschreibung für meinen Chef.'),
      _Word(de: 'die Apotheke, -n', ar: 'الصيدلية', example: 'Die Apotheke ist um die Ecke.'),
      _Word(de: 'die Überweisung, -en', ar: 'التحويل (لطبيب مختص)', example: 'Ich brauche eine Überweisung zum Facharzt.'),
      _Word(de: 'das Fieber', ar: 'الحرارة', example: 'Mein Kind hat Fieber.'),
      _Word(de: 'die Erkältung, -en', ar: 'الزكام', example: 'Ich habe eine starke Erkältung.'),
      _Word(de: 'die Sprechstunde, -n', ar: 'ساعات الاستقبال', example: 'Die Sprechstunde ist von 8 bis 12.'),
    ]),
    _VocabCategory(name: 'السكن', nameDE: 'Wohnen', words: [
      _Word(de: 'die Miete, -n', ar: 'الإيجار', example: 'Die Miete beträgt 700 Euro warm.'),
      _Word(de: 'die Nebenkosten (Pl.)', ar: 'التكاليف الإضافية', example: 'Die Nebenkosten sind inklusive.'),
      _Word(de: 'die Kaution, -en', ar: 'التأمين/الضمان', example: 'Die Kaution beträgt 3 Monatsmieten.'),
      _Word(de: 'der Vermieter, -', ar: 'المؤجر', example: 'Der Vermieter ist sehr nett.'),
      _Word(de: 'der Mieter, -', ar: 'المستأجر', example: 'Als Mieter habe ich Rechte.'),
      _Word(de: 'die Wohnungsanzeige, -n', ar: 'إعلان شقة', example: 'Ich suche in Wohnungsanzeigen.'),
      _Word(de: 'einziehen', ar: 'الانتقال (دخول)', example: 'Wir ziehen nächsten Monat ein.'),
      _Word(de: 'umziehen', ar: 'الانتقال (تغيير السكن)', example: 'Wir ziehen nach Berlin um.'),
    ]),
    _VocabCategory(name: 'التعليم', nameDE: 'Bildung', words: [
      _Word(de: 'die Prüfung, -en', ar: 'الامتحان', example: 'Nächste Woche habe ich eine Prüfung.'),
      _Word(de: 'der Kurs, -e', ar: 'الدورة', example: 'Ich besuche einen Deutschkurs.'),
      _Word(de: 'die Anmeldung, -en', ar: 'التسجيل', example: 'Die Anmeldung ist bis Freitag möglich.'),
      _Word(de: 'das Zeugnis, -se', ar: 'الشهادة', example: 'Mein Zeugnis muss übersetzt werden.'),
      _Word(de: 'die Nachhilfe', ar: 'الدروس الخصوصية', example: 'Mein Sohn braucht Nachhilfe in Mathe.'),
      _Word(de: 'bestehen', ar: 'النجاح', example: 'Ich habe die Prüfung bestanden!'),
      _Word(de: 'durchfallen', ar: 'الرسوب', example: 'Leider bin ich durchgefallen.'),
    ]),
    _VocabCategory(name: 'التسوق', nameDE: 'Einkaufen', words: [
      _Word(de: 'das Angebot, -e', ar: 'العرض', example: 'Diese Woche gibt es tolle Angebote.'),
      _Word(de: 'der Kassenbon, -s', ar: 'إيصال الدفع', example: 'Bewahren Sie den Kassenbon auf.'),
      _Word(de: 'umtauschen', ar: 'الاستبدال', example: 'Kann ich das umtauschen?'),
      _Word(de: 'die Garantie, -n', ar: 'الضمان', example: 'Die Garantie gilt 2 Jahre.'),
      _Word(de: 'bar zahlen', ar: 'الدفع نقداً', example: 'Ich zahle bar.'),
      _Word(de: 'die Quittung, -en', ar: 'الإيصال', example: 'Ich brauche eine Quittung.'),
    ]),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('المفردات - Wortschatz')),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: _categories.length,
        itemBuilder: (context, i) {
          final cat = _categories[i];
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: ExpansionTile(
              leading: CircleAvatar(
                backgroundColor: Theme.of(context).colorScheme.primaryContainer,
                child: Text('${cat.words.length}', style: TextStyle(color: Theme.of(context).colorScheme.primary, fontWeight: FontWeight.bold)),
              ),
              title: Text(cat.name, style: const TextStyle(fontWeight: FontWeight.bold)),
              subtitle: Text(cat.nameDE),
              children: cat.words.map((w) => ListTile(
                title: Text(w.de, textDirection: TextDirection.ltr, style: const TextStyle(fontWeight: FontWeight.w600)),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(w.ar),
                    Text(w.example, textDirection: TextDirection.ltr, style: TextStyle(fontSize: 13, color: Theme.of(context).colorScheme.onSurfaceVariant, fontStyle: FontStyle.italic)),
                  ],
                ),
                isThreeLine: true,
              )).toList(),
            ),
          );
        },
      ),
    );
  }
}

class _VocabCategory {
  final String name, nameDE;
  final List<_Word> words;
  const _VocabCategory({required this.name, required this.nameDE, required this.words});
}

class _Word {
  final String de, ar, example;
  const _Word({required this.de, required this.ar, required this.example});
}
