import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';

class LesenScreen extends StatefulWidget {
  const LesenScreen({super.key});

  @override
  State<LesenScreen> createState() => _LesenScreenState();
}

class _LesenScreenState extends State<LesenScreen> {
  int? _selectedModel;

  static const _models = [
    _LesenModel(
      title: 'نموذج 1 - Telc B1',
      parts: [
        _LesenPart(
          title: 'Teil 1 - Zeitungsmeldungen',
          text: 'Lesen Sie die Überschriften (a–h) und die Texte (1–5). Finden Sie für jeden Text die passende Überschrift.',
          textAr: 'اقرأ العناوين (a-h) والنصوص (1-5). اعثر على العنوان المناسب لكل نص.',
          questions: [
            _QuizItem(q: 'Text 1: "Die Zahl der Fahrradunfälle in Berlin ist im vergangenen Jahr um 15% gestiegen..."', qAr: 'عدد حوادث الدراجات في برلين ارتفع بنسبة 15%...', options: ['Mehr Unfälle mit Fahrrädern', 'Neue Radwege geplant', 'Fahrradverbot in der Innenstadt', 'Weniger Autos auf den Straßen'], correct: 0),
            _QuizItem(q: 'Text 2: "Ab nächstem Monat wird die U-Bahn-Linie U5 wegen Bauarbeiten für 3 Wochen gesperrt..."', qAr: 'من الشهر القادم سيتم إغلاق خط المترو U5 لمدة 3 أسابيع بسبب أعمال البناء...', options: ['U-Bahn fährt nicht mehr', 'Sperrung wegen Bauarbeiten', 'Neue U-Bahn-Station eröffnet', 'Fahrkarten werden teurer'], correct: 1),
            _QuizItem(q: 'Text 3: "Das neue Einkaufszentrum am Alexanderplatz öffnet am Samstag seine Türen..."', qAr: 'المركز التجاري الجديد في ألكسندربلاتس يفتح أبوابه يوم السبت...', options: ['Einkaufszentrum schließt', 'Neues Einkaufszentrum eröffnet', 'Protest gegen Neubau', 'Alexanderplatz wird umgebaut'], correct: 1),
            _QuizItem(q: 'Text 4: "Die Stadtbibliothek bietet ab Mai kostenlose Deutschkurse für Anfänger an..."', qAr: 'مكتبة المدينة تقدم من مايو دورات ألمانية مجانية للمبتدئين...', options: ['Bibliothek wird geschlossen', 'Bücher werden teurer', 'Kostenlose Sprachkurse in der Bibliothek', 'Neue Bibliothek geplant'], correct: 2),
            _QuizItem(q: 'Text 5: "Wegen des Streiks der Busfahrer fallen morgen alle Buslinien in der Stadt aus..."', qAr: 'بسبب إضراب سائقي الحافلات ستتوقف جميع خطوط الحافلات غداً...', options: ['Neue Buslinien eingeführt', 'Busfahrer bekommen mehr Gehalt', 'Kein Busverkehr wegen Streik', 'Busse fahren öfter'], correct: 2),
          ],
        ),
        _LesenPart(
          title: 'Teil 2 - Zeitungsartikel',
          text: 'Lesen Sie den Text und die Aufgaben 6–10. Wählen Sie bei jeder Aufgabe die richtige Lösung.',
          textAr: 'اقرأ النص والأسئلة 6-10. اختر الحل الصحيح لكل سؤال.',
          questions: [
            _QuizItem(q: 'Der Artikel handelt von...', qAr: 'المقال يتحدث عن...', options: ['einer neuen Schule', 'einem Integrationsprojekt', 'einem Sportverein'], correct: 1),
            _QuizItem(q: 'Das Projekt richtet sich an...', qAr: 'المشروع موجّه لـ...', options: ['alle Bürger', 'Migranten und Deutsche gemeinsam', 'nur Kinder'], correct: 1),
            _QuizItem(q: 'Die Teilnahme ist...', qAr: 'المشاركة...', options: ['sehr teuer', 'kostenlos', 'nur mit Anmeldung möglich'], correct: 1),
          ],
        ),
        _LesenPart(
          title: 'Teil 3 - Anzeigen',
          text: 'Lesen Sie die Anzeigen und die Aufgaben. Welche Anzeige passt?',
          textAr: 'اقرأ الإعلانات والأسئلة. أي إعلان مناسب؟',
          questions: [
            _QuizItem(q: 'Sie suchen eine günstige Wohnung in der Innenstadt.', qAr: 'تبحث عن شقة رخيصة في وسط المدينة.', options: ['Anzeige A: 2-Zi-Wohnung, Stadtmitte, 450€ kalt', 'Anzeige B: Haus am Stadtrand, 1200€', 'Anzeige C: WG-Zimmer, 30km vom Zentrum'], correct: 0),
            _QuizItem(q: 'Sie möchten am Wochenende einen Deutschkurs besuchen.', qAr: 'تريد حضور دورة ألمانية في عطلة نهاية الأسبوع.', options: ['Intensivkurs Mo-Fr, 9-13 Uhr', 'Abendkurs Di+Do, 18-20 Uhr', 'Wochenendkurs Sa, 10-14 Uhr'], correct: 2),
          ],
        ),
      ],
    ),
    _LesenModel(
      title: 'نموذج 2 - Telc B1',
      parts: [
        _LesenPart(
          title: 'Teil 1 - Zuordnung',
          text: 'Ordnen Sie die Überschriften den Texten zu.',
          textAr: 'طابق العناوين مع النصوص.',
          questions: [
            _QuizItem(q: 'Text 1: "Immer mehr Deutsche arbeiten von zu Hause aus..."', qAr: 'المزيد من الألمان يعملون من المنزل...', options: ['Homeoffice wird beliebter', 'Büros werden größer', 'Arbeitslosigkeit steigt', 'Neue Bürogebäude'], correct: 0),
            _QuizItem(q: 'Text 2: "Die Mieten in München sind auch dieses Jahr wieder gestiegen..."', qAr: 'الإيجارات في ميونخ ارتفعت مجدداً هذا العام...', options: ['Wohnungen werden billiger', 'Mieten steigen weiter', 'Neue Wohnungen gebaut', 'München verliert Einwohner'], correct: 1),
            _QuizItem(q: 'Text 3: "Ab Januar 2025 gilt das neue Heizungsgesetz..."', qAr: 'اعتباراً من يناير 2025 يسري قانون التدفئة الجديد...', options: ['Heizkosten sinken', 'Neues Gesetz für Heizungen', 'Strom wird günstiger', 'Gas wird verboten'], correct: 1),
          ],
        ),
        _LesenPart(
          title: 'Teil 2 - Leseverstehen',
          text: 'Lesen Sie den Text über das deutsche Schulsystem.',
          textAr: 'اقرأ النص عن النظام المدرسي الألماني.',
          questions: [
            _QuizItem(q: 'Nach der Grundschule gehen die Kinder...', qAr: 'بعد المدرسة الابتدائية يذهب الأطفال إلى...', options: ['direkt zur Universität', 'auf verschiedene weiterführende Schulen', 'alle auf das Gymnasium'], correct: 1),
            _QuizItem(q: 'Das Abitur braucht man für...', qAr: 'الأبيتور يُحتاج لـ...', options: ['eine Ausbildung', 'ein Studium an der Universität', 'die Grundschule'], correct: 1),
            _QuizItem(q: 'Die Schulpflicht dauert...', qAr: 'إلزامية التعليم تستمر...', options: ['6 Jahre', '9-10 Jahre', '12 Jahre'], correct: 1),
          ],
        ),
      ],
    ),
    _LesenModel(
      title: 'نموذج 3 - Goethe B1',
      parts: [
        _LesenPart(
          title: 'Teil 1 - Blog',
          text: 'Lesen Sie den Blogbeitrag über das Leben in Deutschland.',
          textAr: 'اقرأ مقال المدونة عن الحياة في ألمانيا.',
          questions: [
            _QuizItem(q: 'Die Autorin findet Deutschland...', qAr: 'الكاتبة تجد ألمانيا...', options: ['langweilig', 'anders als erwartet', 'genau wie in den Filmen'], correct: 1),
            _QuizItem(q: 'Am meisten überrascht hat sie...', qAr: 'ما فاجأها أكثر هو...', options: ['das Wetter', 'die Pünktlichkeit der Deutschen', 'das Essen'], correct: 1),
            _QuizItem(q: 'Sie empfiehlt anderen Migranten...', qAr: 'توصي المهاجرين الآخرين بـ...', options: ['schnell Deutsch zu lernen', 'nur mit Landsleuten zu sprechen', 'sofort zu arbeiten'], correct: 0),
          ],
        ),
      ],
    ),
    _LesenModel(
      title: 'نموذج 4 - DTZ',
      parts: [
        _LesenPart(
          title: 'Teil 1 - Kurzmeldungen',
          text: 'Was passt? Ordnen Sie zu.',
          textAr: 'ما المناسب؟ طابق.',
          questions: [
            _QuizItem(q: '"Wir suchen für unseren Kindergarten eine Erzieherin (m/w/d)..."', qAr: 'نبحث عن مربية لروضة الأطفال لدينا...', options: ['Stellenanzeige', 'Wohnungsanzeige', 'Veranstaltung', 'Nachrichten'], correct: 0),
            _QuizItem(q: '"Großes Familienfest im Stadtpark: Samstag, 14-18 Uhr, Eintritt frei..."', qAr: 'حفل عائلي كبير في حديقة المدينة: السبت 14-18، الدخول مجاني...', options: ['Stellenanzeige', 'Wohnungsanzeige', 'Veranstaltungshinweis', 'Nachrichten'], correct: 2),
            _QuizItem(q: '"3-Zimmer-Wohnung, 75qm, Balkon, ab sofort, 680€ warm..."', qAr: 'شقة 3 غرف، 75 م²، شرفة، متاحة فوراً، 680€ شاملة...', options: ['Stellenanzeige', 'Wohnungsanzeige', 'Veranstaltung', 'Kursangebot'], correct: 1),
          ],
        ),
      ],
    ),
    _LesenModel(
      title: 'نموذج 5 - Telc B1',
      parts: [
        _LesenPart(
          title: 'Teil 1 - Überschriften zuordnen',
          text: 'Finden Sie die passende Überschrift für jeden Text.',
          textAr: 'اعثر على العنوان المناسب لكل نص.',
          questions: [
            _QuizItem(q: '"Die Deutsche Bahn plant ab 2025 neue Schnellzugverbindungen..."', qAr: 'السكك الحديدية الألمانية تخطط لخطوط قطارات سريعة جديدة...', options: ['Neue Schnellzüge geplant', 'Bahnhof wird geschlossen', 'Tickets werden billiger'], correct: 0),
            _QuizItem(q: '"Forscher an der Universität Heidelberg haben ein neues Medikament..."', qAr: 'باحثون في جامعة هايدلبرغ اكتشفوا دواءً جديداً...', options: ['Universität schließt', 'Neues Medikament entdeckt', 'Studenten protestieren'], correct: 1),
          ],
        ),
      ],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('القراءة - Lesen')),
      body: _selectedModel == null ? _buildModelList() : _buildModelDetail(),
    );
  }

  Widget _buildModelList() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _models.length,
      itemBuilder: (context, index) {
        final model = _models[index];
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor: Theme.of(context).colorScheme.primaryContainer,
              child: Text('${index + 1}'),
            ),
            title: Text(model.title),
            subtitle: Text('${model.parts.length} أجزاء'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () => setState(() => _selectedModel = index),
          ),
        );
      },
    );
  }

  Widget _buildModelDetail() {
    final model = _models[_selectedModel!];
    return _LesenQuizWidget(
      model: model,
      onBack: () => setState(() => _selectedModel = null),
    );
  }
}

class _LesenQuizWidget extends StatefulWidget {
  final _LesenModel model;
  final VoidCallback onBack;

  const _LesenQuizWidget({required this.model, required this.onBack});

  @override
  State<_LesenQuizWidget> createState() => _LesenQuizWidgetState();
}

class _LesenQuizWidgetState extends State<_LesenQuizWidget> {
  int _partIndex = 0;
  int _questionIndex = 0;
  int? _selected;
  int _correct = 0;
  int _total = 0;
  bool _done = false;

  @override
  Widget build(BuildContext context) {
    if (_done) return _buildResult();

    final part = widget.model.parts[_partIndex];
    final question = part.questions[_questionIndex];
    final colorScheme = Theme.of(context).colorScheme;

    return Column(
      children: [
        AppBar(
          title: Text(part.title),
          leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: widget.onBack),
        ),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Card(
                  color: colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        Text(part.text, textDirection: TextDirection.ltr, style: const TextStyle(fontWeight: FontWeight.w500)),
                        const SizedBox(height: 8),
                        Text(part.textAr, style: TextStyle(color: colorScheme.onSurfaceVariant)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        Text(question.q, textDirection: TextDirection.ltr, style: const TextStyle(fontWeight: FontWeight.w600)),
                        const SizedBox(height: 8),
                        Text(question.qAr, style: TextStyle(color: colorScheme.onSurfaceVariant, fontSize: 14)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                ...List.generate(question.options.length, (i) {
                  final isSelected = _selected == i;
                  final isCorrect = i == question.correct;
                  final showResult = _selected != null;
                  Color? bgColor;
                  if (showResult && isCorrect) bgColor = Colors.green.withValues(alpha: 0.15);
                  if (showResult && isSelected && !isCorrect) bgColor = Colors.red.withValues(alpha: 0.15);

                  return Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: Card(
                      color: bgColor,
                      child: ListTile(
                        leading: CircleAvatar(
                          radius: 16,
                          backgroundColor: showResult && isCorrect ? Colors.green : (showResult && isSelected ? Colors.red : colorScheme.surfaceContainerHighest),
                          child: showResult && (isSelected || isCorrect)
                              ? Icon(isCorrect ? Icons.check : Icons.close, size: 16, color: Colors.white)
                              : Text(String.fromCharCode(65 + i), style: const TextStyle(fontSize: 14)),
                        ),
                        title: Text(question.options[i], textDirection: TextDirection.ltr),
                        onTap: _selected == null ? () => _answer(i) : null,
                      ),
                    ),
                  );
                }),
                if (_selected != null)
                  Padding(
                    padding: const EdgeInsets.only(top: 16),
                    child: FilledButton(
                      onPressed: _next,
                      child: const Text('التالي'),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildResult() {
    final percent = _total > 0 ? _correct / _total : 0.0;
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(percent >= 0.6 ? Icons.emoji_events : Icons.refresh, size: 64, color: percent >= 0.6 ? Colors.amber : Colors.red),
          const SizedBox(height: 16),
          Text('$_correct / $_total', style: Theme.of(context).textTheme.headlineMedium),
          Text('${(percent * 100).toInt()}%'),
          const SizedBox(height: 24),
          FilledButton(onPressed: widget.onBack, child: const Text('رجوع')),
        ],
      ),
    );
  }

  void _answer(int i) {
    setState(() {
      _selected = i;
      _total++;
      if (i == widget.model.parts[_partIndex].questions[_questionIndex].correct) {
        _correct++;
        context.read<AppProvider>().addXP(10);
      }
    });
  }

  void _next() {
    final part = widget.model.parts[_partIndex];
    if (_questionIndex < part.questions.length - 1) {
      setState(() { _questionIndex++; _selected = null; });
    } else if (_partIndex < widget.model.parts.length - 1) {
      setState(() { _partIndex++; _questionIndex = 0; _selected = null; });
    } else {
      context.read<AppProvider>().incrementQuizzes();
      setState(() => _done = true);
    }
  }
}

class _LesenModel {
  final String title;
  final List<_LesenPart> parts;
  const _LesenModel({required this.title, required this.parts});
}

class _LesenPart {
  final String title;
  final String text;
  final String textAr;
  final List<_QuizItem> questions;
  const _LesenPart({required this.title, required this.text, required this.textAr, required this.questions});
}

class _QuizItem {
  final String q;
  final String qAr;
  final List<String> options;
  final int correct;
  const _QuizItem({required this.q, required this.qAr, required this.options, required this.correct});
}
