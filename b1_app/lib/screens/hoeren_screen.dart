import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';

class HoerenScreen extends StatefulWidget {
  const HoerenScreen({super.key});

  @override
  State<HoerenScreen> createState() => _HoerenScreenState();
}

class _HoerenScreenState extends State<HoerenScreen> {
  int? _selectedModel;
  int _questionIndex = 0;
  int? _selected;
  int _correct = 0;
  bool _done = false;

  static const _models = [
    _HoerenModel(
      title: 'نموذج 1 - Telc B1 Hören Teil 1',
      description: 'استمع للحوارات القصيرة واختر الإجابة الصحيحة',
      questions: [
        _HQuestion(transcript: 'Mann: Entschuldigung, wann fährt der nächste Zug nach München?\nFrau: Der nächste Zug fährt um 14:35 von Gleis 7.', transcriptAr: 'رجل: عفواً، متى يغادر القطار التالي إلى ميونخ؟\nامرأة: القطار التالي يغادر الساعة 14:35 من الرصيف 7.', q: 'Wann fährt der Zug?', qAr: 'متى يغادر القطار؟', options: ['Um 14:35', 'Um 15:35', 'Um 14:25'], correct: 0),
        _HQuestion(transcript: 'Frau: Ich möchte mich für den Deutschkurs anmelden. Gibt es noch freie Plätze?\nMann: Ja, der Kurs am Dienstag und Donnerstag hat noch 3 Plätze frei.', transcriptAr: 'امرأة: أريد التسجيل في دورة الألمانية. هل هناك أماكن شاغرة؟\nرجل: نعم، الدورة يوم الثلاثاء والخميس لديها 3 أماكن شاغرة.', q: 'Wann ist der Kurs?', qAr: 'متى الدورة؟', options: ['Montag und Mittwoch', 'Dienstag und Donnerstag', 'Mittwoch und Freitag'], correct: 1),
        _HQuestion(transcript: 'Mann: Guten Tag, ich habe einen Termin bei Dr. Schmidt um 10 Uhr.\nFrau: Dr. Schmidt hat heute leider einen Notfall. Können Sie um 11:30 kommen?', transcriptAr: 'رجل: مرحباً، لدي موعد عند الدكتور شميت الساعة 10.\nامرأة: الدكتور شميت لديه حالة طوارئ اليوم. هل يمكنك القدوم الساعة 11:30؟', q: 'Was ist das Problem?', qAr: 'ما المشكلة؟', options: ['Der Arzt ist krank', 'Der Arzt hat einen Notfall', 'Der Patient ist zu spät'], correct: 1),
        _HQuestion(transcript: 'Frau: Ich suche ein Geschenk für meine Mutter. Sie wird nächste Woche 60.\nMann: Wie wäre es mit einem Buch? Oder vielleicht einem Schal? Die sind gerade im Angebot.', transcriptAr: 'امرأة: أبحث عن هدية لأمي. ستبلغ 60 الأسبوع القادم.\nرجل: ما رأيك بكتاب؟ أو ربما وشاح؟ هي حالياً في العرض.', q: 'Was sucht die Frau?', qAr: 'ماذا تبحث عنه المرأة؟', options: ['Ein Geschenk für ihren Mann', 'Ein Geschenk für ihre Mutter', 'Ein Geschenk für ihre Freundin'], correct: 1),
        _HQuestion(transcript: 'Mann: Entschuldigung, wo ist hier der nächste Supermarkt?\nFrau: Gehen Sie hier geradeaus, dann die zweite Straße links. Der Supermarkt ist auf der rechten Seite.', transcriptAr: 'رجل: عفواً، أين أقرب سوبرماركت هنا؟\nامرأة: امشِ مباشرة للأمام، ثم الشارع الثاني يساراً. السوبرماركت على الجهة اليمنى.', q: 'Wo ist der Supermarkt?', qAr: 'أين السوبرماركت؟', options: ['Erste Straße rechts', 'Zweite Straße links, dann rechts', 'Dritte Straße geradeaus'], correct: 1),
      ],
    ),
    _HoerenModel(
      title: 'نموذج 2 - Hören Teil 2 (Durchsagen)',
      description: 'استمع للإعلانات العامة واختر الإجابة الصحيحة',
      questions: [
        _HQuestion(transcript: 'Achtung, eine Durchsage: Der ICE 578 nach Hamburg hat heute 20 Minuten Verspätung. Er fährt voraussichtlich um 15:45 ab Gleis 3.', transcriptAr: 'انتباه، إعلان: قطار ICE 578 إلى هامبورغ متأخر 20 دقيقة اليوم. سيغادر على الأرجح الساعة 15:45 من الرصيف 3.', q: 'Was erfahren die Fahrgäste?', qAr: 'ماذا يعرف المسافرون؟', options: ['Der Zug fällt aus', 'Der Zug hat Verspätung', 'Der Zug fährt früher'], correct: 1),
        _HQuestion(transcript: 'Liebe Kunden, unser Geschäft schließt in 15 Minuten. Bitte gehen Sie zur Kasse. Wir wünschen Ihnen einen schönen Abend!', transcriptAr: 'أعزاءنا العملاء، متجرنا يغلق خلال 15 دقيقة. يرجى التوجه للكاسة. نتمنى لكم مساءً جميلاً!', q: 'Was sollen die Kunden tun?', qAr: 'ماذا على العملاء فعله؟', options: ['Weiter einkaufen', 'Zur Kasse gehen', 'Morgen wiederkommen'], correct: 1),
        _HQuestion(transcript: 'Willkommen im Bürgerbüro. Für Passangelegenheiten drücken Sie die 1. Für Meldebescheinigungen die 2. Für alle anderen Anliegen die 3.', transcriptAr: 'مرحباً في مكتب المواطنين. لشؤون جواز السفر اضغط 1. لشهادات التسجيل اضغط 2. لجميع الاستفسارات الأخرى اضغط 3.', q: 'Was muss man für eine Meldebescheinigung drücken?', qAr: 'ماذا تضغط للحصول على شهادة تسجيل؟', options: ['Die 1', 'Die 2', 'Die 3'], correct: 1),
      ],
    ),
    _HoerenModel(
      title: 'نموذج 3 - Hören Teil 3 (Interview)',
      description: 'استمع لمقابلة واختر الإجابة الصحيحة',
      questions: [
        _HQuestion(transcript: 'Moderator: Herr Müller, Sie sind seit 10 Jahren Lehrer. Was hat sich verändert?\nMüller: Die Digitalisierung hat alles verändert. Heute arbeiten wir mit Tablets und Online-Plattformen.', transcriptAr: 'المذيع: سيد مولر، أنت مدرس منذ 10 سنوات. ما الذي تغير؟\nمولر: الرقمنة غيرت كل شيء. اليوم نعمل بالأجهزة اللوحية والمنصات الإلكترونية.', q: 'Was hat sich laut Herrn Müller verändert?', qAr: 'ما الذي تغير حسب السيد مولر؟', options: ['Die Schüler sind fleißiger', 'Die Technik im Unterricht', 'Die Arbeitszeiten'], correct: 1),
        _HQuestion(transcript: 'Moderator: Empfehlen Sie den Beruf jungen Menschen?\nMüller: Auf jeden Fall! Es ist anstrengend, aber die Arbeit mit jungen Menschen macht mir jeden Tag Freude.', transcriptAr: 'المذيع: هل توصي الشباب بهذه المهنة؟\nمولر: بالتأكيد! إنها مرهقة، لكن العمل مع الشباب يسعدني كل يوم.', q: 'Wie findet Herr Müller seinen Beruf?', qAr: 'كيف يجد السيد مولر مهنته؟', options: ['Langweilig', 'Anstrengend aber schön', 'Zu stressig'], correct: 1),
      ],
    ),
    _HoerenModel(
      title: 'نموذج 4 - Alltagsgespräche',
      description: 'حوارات يومية في ألمانيا',
      questions: [
        _HQuestion(transcript: 'Frau: Hallo, ich möchte mein Kind für die Grundschule anmelden. Was brauche ich?\nSekretärin: Sie brauchen die Geburtsurkunde, Ihren Ausweis und den Impfpass des Kindes.', transcriptAr: 'امرأة: مرحباً، أريد تسجيل طفلي في المدرسة الابتدائية. ماذا أحتاج؟\nالسكرتيرة: تحتاجين شهادة الميلاد، هويتك ودفتر تطعيم الطفل.', q: 'Was braucht die Mutter?', qAr: 'ماذا تحتاج الأم؟', options: ['Nur den Ausweis', 'Geburtsurkunde, Ausweis und Impfpass', 'Nur die Geburtsurkunde'], correct: 1),
        _HQuestion(transcript: 'Mann: Ich habe seit drei Tagen starke Kopfschmerzen.\nÄrztin: Nehmen Sie Medikamente? Trinken Sie genug Wasser? Ich schreibe Ihnen erstmal ein Rezept.', transcriptAr: 'رجل: لدي صداع شديد منذ ثلاثة أيام.\nالطبيبة: هل تتناول أدوية؟ هل تشرب ماء كافٍ؟ سأكتب لك وصفة طبية أولاً.', q: 'Was macht die Ärztin?', qAr: 'ماذا تفعل الطبيبة؟', options: ['Sie schickt ihn ins Krankenhaus', 'Sie schreibt ein Rezept', 'Sie gibt ihm sofort Medizin'], correct: 1),
        _HQuestion(transcript: 'Vermieter: Die Miete ist 750 Euro warm, inklusive Nebenkosten. Die Kaution beträgt zwei Monatsmieten.\nMieter: Und wann könnte ich einziehen?\nVermieter: Ab dem Ersten nächsten Monats.', transcriptAr: 'المؤجر: الإيجار 750 يورو شاملاً التكاليف الجانبية. التأمين شهران.\nالمستأجر: ومتى أستطيع الانتقال؟\nالمؤجر: من أول الشهر القادم.', q: 'Wie viel kostet die Wohnung?', qAr: 'كم تكلفة الشقة؟', options: ['750€ kalt', '750€ warm', '1500€ warm'], correct: 1),
      ],
    ),
    _HoerenModel(
      title: 'نموذج 5 - Hören Teil 4',
      description: 'محادثات هاتفية وإعلانات',
      questions: [
        _HQuestion(transcript: 'Guten Tag, hier ist die Praxis Dr. Weber. Leider sind wir heute nicht erreichbar. Unsere Öffnungszeiten sind Montag bis Freitag von 8 bis 17 Uhr. In dringenden Fällen rufen Sie bitte den ärztlichen Bereitschaftsdienst unter 116 117 an.', transcriptAr: 'مرحباً، هنا عيادة الدكتور فيبر. للأسف نحن غير متاحين اليوم. ساعات العمل من الاثنين للجمعة من 8 إلى 17. في الحالات العاجلة اتصلوا بخدمة الطوارئ الطبية على الرقم 116117.', q: 'Was soll man in dringenden Fällen tun?', qAr: 'ماذا يجب فعله في الحالات العاجلة؟', options: ['Ins Krankenhaus fahren', '116 117 anrufen', 'Am nächsten Tag kommen'], correct: 1),
        _HQuestion(transcript: 'Nachricht auf dem Anrufbeantworter: Hallo Frau Schmidt, hier ist die Sprachschule. Ihr Kurs beginnt nicht wie geplant am Montag, sondern erst am Mittwoch. Bitte bringen Sie ein Foto und Ihren Ausweis mit. Bis dann!', transcriptAr: 'رسالة على جهاز الرد: مرحباً سيدة شميت، هنا مدرسة اللغات. دورتك لا تبدأ الاثنين كما مخطط، بل الأربعاء. يرجى إحضار صورة وهويتك. إلى اللقاء!', q: 'Wann beginnt der Kurs?', qAr: 'متى تبدأ الدورة؟', options: ['Am Montag', 'Am Mittwoch', 'Am Freitag'], correct: 1),
      ],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('الاستماع - Hören')),
      body: _selectedModel == null ? _buildList() : (_done ? _buildResult() : _buildQuiz()),
    );
  }

  Widget _buildList() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _models.length,
      itemBuilder: (context, i) {
        final m = _models[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor: Theme.of(context).colorScheme.primaryContainer,
              child: const Icon(Icons.headphones),
            ),
            title: Text(m.title),
            subtitle: Text(m.description),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () => setState(() { _selectedModel = i; _questionIndex = 0; _correct = 0; _selected = null; _done = false; }),
          ),
        );
      },
    );
  }

  Widget _buildQuiz() {
    final model = _models[_selectedModel!];
    final q = model.questions[_questionIndex];
    final colorScheme = Theme.of(context).colorScheme;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          LinearProgressIndicator(value: (_questionIndex + 1) / model.questions.length),
          const SizedBox(height: 16),
          Card(
            color: colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  Row(
                    children: [
                      Icon(Icons.volume_up, color: colorScheme.primary),
                      const SizedBox(width: 8),
                      const Text('النص المسموع (Transkript)', style: TextStyle(fontWeight: FontWeight.bold)),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(q.transcript, textDirection: TextDirection.ltr, style: const TextStyle(height: 1.6)),
                  const Divider(height: 24),
                  Text(q.transcriptAr, style: TextStyle(color: colorScheme.onSurfaceVariant, height: 1.6)),
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
                  Text(q.q, textDirection: TextDirection.ltr, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                  const SizedBox(height: 4),
                  Text(q.qAr, style: TextStyle(color: colorScheme.onSurfaceVariant)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          ...List.generate(q.options.length, (i) {
            final isSelected = _selected == i;
            final isCorrect = i == q.correct;
            final show = _selected != null;
            Color? bg;
            if (show && isCorrect) bg = Colors.green.withValues(alpha: 0.15);
            if (show && isSelected && !isCorrect) bg = Colors.red.withValues(alpha: 0.15);
            return Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Card(
                color: bg,
                child: ListTile(
                  leading: CircleAvatar(
                    radius: 16,
                    backgroundColor: show && isCorrect ? Colors.green : (show && isSelected ? Colors.red : colorScheme.surfaceContainerHighest),
                    child: show && (isSelected || isCorrect)
                        ? Icon(isCorrect ? Icons.check : Icons.close, size: 16, color: Colors.white)
                        : Text(String.fromCharCode(65 + i), style: const TextStyle(fontSize: 14)),
                  ),
                  title: Text(q.options[i], textDirection: TextDirection.ltr),
                  onTap: _selected == null ? () {
                    setState(() {
                      _selected = i;
                      if (i == q.correct) { _correct++; context.read<AppProvider>().addXP(10); }
                    });
                  } : null,
                ),
              ),
            );
          }),
          if (_selected != null)
            Padding(
              padding: const EdgeInsets.only(top: 16),
              child: FilledButton(
                onPressed: () {
                  if (_questionIndex < model.questions.length - 1) {
                    setState(() { _questionIndex++; _selected = null; });
                  } else {
                    context.read<AppProvider>().incrementQuizzes();
                    setState(() => _done = true);
                  }
                },
                child: Text(_questionIndex < model.questions.length - 1 ? 'التالي' : 'النتيجة'),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildResult() {
    final total = _models[_selectedModel!].questions.length;
    final percent = _correct / total;
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(percent >= 0.6 ? Icons.emoji_events : Icons.refresh, size: 64, color: percent >= 0.6 ? Colors.amber : Colors.red),
          const SizedBox(height: 16),
          Text('$_correct / $total', style: Theme.of(context).textTheme.headlineMedium),
          Text('${(percent * 100).toInt()}%'),
          const SizedBox(height: 24),
          FilledButton(onPressed: () => setState(() => _selectedModel = null), child: const Text('رجوع')),
        ],
      ),
    );
  }
}

class _HoerenModel {
  final String title;
  final String description;
  final List<_HQuestion> questions;
  const _HoerenModel({required this.title, required this.description, required this.questions});
}

class _HQuestion {
  final String transcript;
  final String transcriptAr;
  final String q;
  final String qAr;
  final List<String> options;
  final int correct;
  const _HQuestion({required this.transcript, required this.transcriptAr, required this.q, required this.qAr, required this.options, required this.correct});
}
