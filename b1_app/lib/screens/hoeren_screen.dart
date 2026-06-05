import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../data/hoeren_data.dart';

class HoerenScreen extends StatefulWidget {
  const HoerenScreen({super.key});
  @override
  State<HoerenScreen> createState() => _HoerenScreenState();
}

class _HoerenScreenState extends State<HoerenScreen> {
  int? _selectedModel;
  int _currentPart = 0;
  bool _showTranscript = false;
  int _currentQuestion = 0;
  int? _selectedAnswer;
  int _score = 0;
  bool _showResult = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('الاستماع - Hören'),
        centerTitle: true,
        actions: [
          if (_selectedModel != null)
            IconButton(
              icon: Icon(_showTranscript ? Icons.visibility_off : Icons.visibility),
              onPressed: () => setState(() => _showTranscript = !_showTranscript),
              tooltip: _showTranscript ? 'إخفاء النص' : 'إظهار النص',
            ),
        ],
      ),
      body: _selectedModel == null ? _buildModelList() : _buildExam(),
    );
  }

  Widget _buildModelList() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: hoerenModels.length,
      itemBuilder: (ctx, i) {
        final model = hoerenModels[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor: Theme.of(context).colorScheme.secondaryContainer,
              child: const Icon(Icons.headphones),
            ),
            title: Text(model['title'] as String, style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text(model['description'] as String? ?? '', maxLines: 2, overflow: TextOverflow.ellipsis),
            trailing: Text('${(model["parts"] as List).length} أجزاء'),
            onTap: () => setState(() {
              _selectedModel = i;
              _currentPart = 0;
              _currentQuestion = 0;
              _score = 0;
              _showResult = false;
              _showTranscript = false;
              _selectedAnswer = null;
            }),
          ),
        );
      },
    );
  }

  Widget _buildExam() {
    if (_showResult) return _buildResultScreen();
    final model = hoerenModels[_selectedModel!];
    final parts = List<Map<String, dynamic>>.from(model['parts'] as List);
    final part = parts[_currentPart];
    final questions = part['questions'] != null ? List<Map<String, dynamic>>.from(part['questions'] as List) : [];
    
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          LinearProgressIndicator(value: (_currentPart + 1) / parts.length),
          const SizedBox(height: 8),
          Text(part['title'] as String? ?? '', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
          if (part['instructionsAr'] != null) ...[
            const SizedBox(height: 8),
            Text(part['instructionsAr'] as String, style: Theme.of(context).textTheme.bodyMedium),
          ],
          const SizedBox(height: 16),
          // Transcripts
          if (_showTranscript && part['transcripts'] != null) ...[
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surfaceContainerHighest,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('📝 النص المكتوب (Transkript)', style: TextStyle(fontWeight: FontWeight.bold)),
                  const Divider(),
                  ...List<Map<String, dynamic>>.from(part['transcripts'] as List).map((t) => Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        if (t['speaker'] != null) Text(t['speaker'] as String, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13), textDirection: TextDirection.ltr),
                        Text(t['textDe'] as String? ?? '', style: const TextStyle(height: 1.5), textDirection: TextDirection.ltr),
                      ],
                    ),
                  )),
                ],
              ),
            ),
            const SizedBox(height: 16),
          ],
          // Questions
          if (part['questions'] != null) ...[
            _buildQuestions(List<Map<String, dynamic>>.from(part['questions'] as List)),
          ],
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              if (_currentPart > 0)
                TextButton.icon(onPressed: () => setState(() { _currentPart--; _currentQuestion = 0; _selectedAnswer = null; }), icon: const Icon(Icons.arrow_back), label: const Text('السابق')),
              ElevatedButton.icon(
                onPressed: (questions.isEmpty || _selectedAnswer != null) ? () => _nextQuestion(parts) : null,
                icon: const Icon(Icons.arrow_forward),
                label: Text(_isLastQuestion(parts) ? 'النتيجة' : 'التالي'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildQuestions(List<Map<String, dynamic>> questions) {
    if (_currentQuestion >= questions.length) return const SizedBox();
    final q = questions[_currentQuestion];
    final isTrue = q.containsKey('statementDe') && q['options'] == null;
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('السؤال ${_currentQuestion + 1} من ${questions.length}', style: Theme.of(context).textTheme.titleSmall),
        const SizedBox(height: 8),
        if (q['statementDe'] != null)
          Text(q['statementDe'] as String, style: const TextStyle(fontSize: 15), textDirection: TextDirection.ltr),
        if (q['promptDe'] != null)
          Text(q['promptDe'] as String, style: const TextStyle(fontSize: 15), textDirection: TextDirection.ltr),
        if (q['statementAr'] != null) Text(q['statementAr'] as String, style: TextStyle(color: Colors.grey[600], fontSize: 13)),
        const SizedBox(height: 12),
        if (isTrue) ...[
          RadioListTile<int>(value: 0, groupValue: _selectedAnswer, title: const Text('صح (Richtig)'), onChanged: (v) => setState(() => _selectedAnswer = v)),
          RadioListTile<int>(value: 1, groupValue: _selectedAnswer, title: const Text('خطأ (Falsch)'), onChanged: (v) => setState(() => _selectedAnswer = v)),
        ] else if (q['options'] != null) ...[
          ...List.generate((q['options'] as List).length, (i) {
            final opt = (q['options'] as List)[i];
            final text = opt is Map ? (opt['de'] ?? opt['text'] ?? '') : opt.toString();
            return RadioListTile<int>(value: i, groupValue: _selectedAnswer, title: Text(text, textDirection: TextDirection.ltr), onChanged: (v) => setState(() => _selectedAnswer = v));
          }),
        ],
      ],
    );
  }

  bool _isLastQuestion(List<Map<String, dynamic>> parts) {
    final questions = parts[_currentPart]['questions'] != null ? List<Map<String, dynamic>>.from(parts[_currentPart]['questions'] as List) : [];
    if (_currentPart < parts.length - 1) return false;
    if (questions.isEmpty) return true;
    return _currentQuestion == questions.length - 1;
  }

  void _nextQuestion(List<Map<String, dynamic>> parts) {
    final questions = List<Map<String, dynamic>>.from(parts[_currentPart]['questions'] as List? ?? []);
    // Score
    if (_currentQuestion < questions.length) {
      final q = questions[_currentQuestion];
      final correct = q['correct'];
      if (correct is bool) {
        if ((correct && _selectedAnswer == 0) || (!correct && _selectedAnswer == 1)) _score++;
      } else if (correct is String) {
        final options = q['options'] as List? ?? [];
        final idx = options.indexWhere((o) => o is Map ? o['id'] == correct : false);
        if (idx == _selectedAnswer) _score++;
      } else if (correct is int && correct == _selectedAnswer) {
        _score++;
      }
    }
    
    setState(() {
      if (_currentQuestion < questions.length - 1) {
        _currentQuestion++;
      } else if (_currentPart < parts.length - 1) {
        _currentPart++;
        _currentQuestion = 0;
      } else {
        _showResult = true;
        context.read<AppProvider>().addXP(10);
      }
      _selectedAnswer = null;
    });
  }

  Widget _buildResultScreen() {
    final model = hoerenModels[_selectedModel!];
    final parts = List<Map<String, dynamic>>.from(model['parts'] as List);
    final totalQ = parts.fold<int>(0, (sum, p) => sum + ((p['questions'] as List?)?.length ?? 0));
    final pct = totalQ > 0 ? (_score / totalQ * 100).round() : 0;
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(pct >= 60 ? Icons.celebration : Icons.refresh, size: 64, color: pct >= 60 ? Colors.green : Colors.orange),
          const SizedBox(height: 16),
          Text('$pct%', style: Theme.of(context).textTheme.displayMedium),
          Text('$_score / $totalQ إجابة صحيحة'),
          const SizedBox(height: 24),
          ElevatedButton(onPressed: () => setState(() { _selectedModel = null; }), child: const Text('العودة للنماذج')),
        ],
      ),
    );
  }
}
