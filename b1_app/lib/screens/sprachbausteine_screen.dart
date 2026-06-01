import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../data/sprachbausteine_data.dart';

class SprachbausteineScreen extends StatefulWidget {
  const SprachbausteineScreen({super.key});
  @override
  State<SprachbausteineScreen> createState() => _SprachbausteineScreenState();
}

class _SprachbausteineScreenState extends State<SprachbausteineScreen> {
  int _currentQ = 0;
  int? _selectedAnswer;
  int _score = 0;
  bool _showResult = false;
  bool _answered = false;

  @override
  Widget build(BuildContext context) {
    if (_showResult) return _buildResult();
    if (_currentQ >= pruefungsFragen.length) {
      return const Center(child: Text('لا توجد أسئلة'));
    }
    final q = pruefungsFragen[_currentQ];
    final options = List<Map<String, dynamic>>.from(q['options'] as List? ?? []);
    final correct = q['correct'] as int? ?? 0;
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('تمارين القواعد'),
        centerTitle: true,
        actions: [
          Padding(
            padding: const EdgeInsets.all(8),
            child: Center(child: Text('${_currentQ + 1}/${pruefungsFragen.length}', style: const TextStyle(fontWeight: FontWeight.bold))),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            LinearProgressIndicator(value: (_currentQ + 1) / pruefungsFragen.length),
            const SizedBox(height: 16),
            if (q['context'] != null) ...[
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.surfaceContainerHighest,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(q['context'] as String, textDirection: TextDirection.ltr, style: const TextStyle(height: 1.5)),
              ),
              const SizedBox(height: 16),
            ],
            Text('المستوى: ${q["level"] ?? "-"}', style: TextStyle(fontSize: 12, color: Colors.grey[600])),
            const SizedBox(height: 12),
            ...List.generate(options.length, (i) {
              final opt = options[i];
              final isCorrect = i == correct;
              final isSelected = _selectedAnswer == i;
              Color? tileColor;
              if (_answered) {
                if (isCorrect) {
                  tileColor = Colors.green[50];
                } else if (isSelected) {
                  tileColor = Colors.red[50];
                }
              }
              return Card(
                color: tileColor,
                margin: const EdgeInsets.only(bottom: 8),
                child: RadioListTile<int>(
                  value: i,
                  groupValue: _selectedAnswer,
                  title: Text(opt['text'] as String? ?? opt.toString(), textDirection: TextDirection.ltr),
                  onChanged: _answered ? null : (v) => setState(() => _selectedAnswer = v),
                ),
              );
            }),
            const SizedBox(height: 16),
            if (!_answered && _selectedAnswer != null)
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _answered = true;
                      if (_selectedAnswer == correct) _score++;
                    });
                  },
                  child: const Text('تحقّق'),
                ),
              ),
            if (_answered) ...[
              if (q['explanation'] != null) ...[
                const SizedBox(height: 8),
                Text('💡 ${q["explanation"]}', style: const TextStyle(fontSize: 14)),
              ],
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    setState(() {
                      if (_currentQ < pruefungsFragen.length - 1) {
                        _currentQ++;
                        _selectedAnswer = null;
                        _answered = false;
                      } else {
                        _showResult = true;
                        context.read<AppProvider>().addXP(_score * 5);
                      }
                    });
                  },
                  child: Text(_currentQ < pruefungsFragen.length - 1 ? 'التالي' : 'النتيجة'),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildResult() {
    final pct = (pruefungsFragen.isNotEmpty) ? (_score / pruefungsFragen.length * 100).round() : 0;
    return Scaffold(
      appBar: AppBar(title: const Text('النتيجة')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(pct >= 60 ? Icons.celebration : Icons.refresh, size: 64, color: pct >= 60 ? Colors.green : Colors.orange),
            const SizedBox(height: 16),
            Text('$pct%', style: Theme.of(context).textTheme.displayMedium),
            Text('$_score / ${pruefungsFragen.length}'),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => setState(() { _currentQ = 0; _score = 0; _showResult = false; _selectedAnswer = null; _answered = false; }),
              child: const Text('إعادة'),
            ),
          ],
        ),
      ),
    );
  }
}
