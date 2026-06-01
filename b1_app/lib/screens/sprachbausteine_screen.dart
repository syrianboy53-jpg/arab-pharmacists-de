import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';

class SprachbausteineScreen extends StatefulWidget {
  const SprachbausteineScreen({super.key});

  @override
  State<SprachbausteineScreen> createState() => _SprachbausteineScreenState();
}

class _SprachbausteineScreenState extends State<SprachbausteineScreen> {
  int _index = 0;
  int? _selected;
  int _correct = 0;
  bool _done = false;

  static const _items = [
    _SBItem(text: 'Ich möchte mich ___ den Deutschkurs anmelden.', textAr: 'أريد التسجيل في دورة الألمانية.', options: ['für', 'auf', 'an', 'über'], correct: 0),
    _SBItem(text: 'Er hat sich ___ die neue Stelle beworben.', textAr: 'تقدّم للوظيفة الجديدة.', options: ['für', 'um', 'auf', 'an'], correct: 1),
    _SBItem(text: 'Wir freuen uns ___ Ihren Besuch.', textAr: 'نتطلّع لزيارتكم.', options: ['über', 'für', 'auf', 'an'], correct: 2),
    _SBItem(text: 'Ich bin ___ Montag nicht da.', textAr: 'لن أكون موجوداً يوم الاثنين.', options: ['am', 'im', 'um', 'an'], correct: 0),
    _SBItem(text: 'Könnten Sie mir bitte ___ ?', textAr: 'هل يمكنك مساعدتي من فضلك؟', options: ['helfen', 'geholfen', 'hilft', 'half'], correct: 0),
    _SBItem(text: 'Die Prüfung findet ___ 15. März statt.', textAr: 'الامتحان يُعقد في 15 مارس.', options: ['am', 'im', 'um', 'an dem'], correct: 0),
    _SBItem(text: 'Ich warte ___ den Bus.', textAr: 'أنتظر الحافلة.', options: ['auf', 'für', 'an', 'über'], correct: 0),
    _SBItem(text: 'Er interessiert sich ___ Musik.', textAr: 'يهتم بالموسيقى.', options: ['für', 'an', 'über', 'auf'], correct: 0),
    _SBItem(text: 'Ich habe Angst ___ der Prüfung.', textAr: 'أخاف من الامتحان.', options: ['vor', 'von', 'für', 'über'], correct: 0),
    _SBItem(text: 'Sie denkt oft ___ ihre Familie.', textAr: 'تفكّر كثيراً بعائلتها.', options: ['an', 'über', 'von', 'für'], correct: 0),
    _SBItem(text: 'Wir sind ___ dem Ergebnis zufrieden.', textAr: 'نحن راضون عن النتيجة.', options: ['mit', 'von', 'über', 'für'], correct: 0),
    _SBItem(text: 'Er hat ___ zwei Jahren Deutsch gelernt.', textAr: 'تعلّم الألمانية قبل سنتين.', options: ['vor', 'seit', 'ab', 'nach'], correct: 0),
    _SBItem(text: 'Ich lerne Deutsch, ___ ich in Deutschland arbeiten möchte.', textAr: 'أتعلم الألمانية لأنني أريد العمل في ألمانيا.', options: ['weil', 'dass', 'ob', 'wenn'], correct: 0),
    _SBItem(text: 'Er weiß nicht, ___ er morgen kommen kann.', textAr: 'لا يعرف إن كان يستطيع القدوم غداً.', options: ['ob', 'weil', 'dass', 'wenn'], correct: 0),
    _SBItem(text: '___ ich nach Hause komme, koche ich Abendessen.', textAr: 'عندما أصل للبيت، أطبخ العشاء.', options: ['Wenn', 'Weil', 'Ob', 'Dass'], correct: 0),
    _SBItem(text: 'Ich bin müde, ___ ich trotzdem arbeiten muss.', textAr: 'أنا متعب، لكن يجب أن أعمل رغم ذلك.', options: ['obwohl', 'weil', 'wenn', 'dass'], correct: 0),
    _SBItem(text: 'Der Film, ___ gestern im Kino lief, war toll.', textAr: 'الفيلم الذي عُرض أمس في السينما كان رائعاً.', options: ['der', 'den', 'dem', 'das'], correct: 0),
    _SBItem(text: 'Das ist die Frau, ___ ich gestern getroffen habe.', textAr: 'هذه المرأة التي التقيت بها أمس.', options: ['die', 'der', 'dem', 'den'], correct: 0),
    _SBItem(text: 'Ich ___ gern einen Kaffee bestellen.', textAr: 'أريد طلب قهوة.', options: ['möchte', 'mag', 'muss', 'kann'], correct: 0),
    _SBItem(text: 'Du ___ hier nicht rauchen.', textAr: 'لا يجوز لك التدخين هنا.', options: ['darfst', 'kannst', 'musst', 'sollst'], correct: 0),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sprachbausteine - تراكيب لغوية')),
      body: _done ? _buildResult() : _buildQuiz(),
    );
  }

  Widget _buildQuiz() {
    final item = _items[_index];
    final colorScheme = Theme.of(context).colorScheme;
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          LinearProgressIndicator(value: (_index + 1) / _items.length),
          const SizedBox(height: 8),
          Text('${_index + 1} / ${_items.length}', textAlign: TextAlign.center, style: TextStyle(color: colorScheme.onSurfaceVariant)),
          const SizedBox(height: 20),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  Text(item.text, textDirection: TextDirection.ltr, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600), textAlign: TextAlign.center),
                  const SizedBox(height: 12),
                  Text(item.textAr, style: TextStyle(color: colorScheme.onSurfaceVariant, fontSize: 15), textAlign: TextAlign.center),
                ],
              ),
            ),
          ),
          const SizedBox(height: 20),
          Wrap(
            spacing: 10,
            runSpacing: 10,
            alignment: WrapAlignment.center,
            children: List.generate(item.options.length, (i) {
              final isSelected = _selected == i;
              final isCorrect = i == item.correct;
              final show = _selected != null;
              Color? bg;
              Color? fg;
              if (show && isCorrect) { bg = Colors.green; fg = Colors.white; }
              else if (show && isSelected && !isCorrect) { bg = Colors.red; fg = Colors.white; }

              return ChoiceChip(
                label: Text(item.options[i], style: TextStyle(fontSize: 16, color: fg)),
                selected: isSelected,
                selectedColor: bg,
                onSelected: _selected == null ? (_) {
                  setState(() {
                    _selected = i;
                    if (i == item.correct) { _correct++; context.read<AppProvider>().addXP(5); }
                  });
                } : null,
              );
            }),
          ),
          if (_selected != null) ...[
            const SizedBox(height: 24),
            FilledButton(
              onPressed: () {
                if (_index < _items.length - 1) {
                  setState(() { _index++; _selected = null; });
                } else {
                  context.read<AppProvider>().incrementQuizzes();
                  setState(() => _done = true);
                }
              },
              child: Text(_index < _items.length - 1 ? 'التالي' : 'النتيجة'),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildResult() {
    final percent = _correct / _items.length;
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(percent >= 0.6 ? Icons.emoji_events : Icons.refresh, size: 64, color: percent >= 0.6 ? Colors.amber : Colors.red),
          const SizedBox(height: 16),
          Text('$_correct / ${_items.length}', style: Theme.of(context).textTheme.headlineMedium),
          Text('${(percent * 100).toInt()}%'),
          const SizedBox(height: 24),
          FilledButton(onPressed: () => Navigator.pop(context), child: const Text('رجوع')),
        ],
      ),
    );
  }
}

class _SBItem {
  final String text, textAr;
  final List<String> options;
  final int correct;
  const _SBItem({required this.text, required this.textAr, required this.options, required this.correct});
}
