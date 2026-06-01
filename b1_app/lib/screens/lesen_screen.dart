import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../data/lesen_data.dart';

class LesenScreen extends StatefulWidget {
  const LesenScreen({super.key});
  @override
  State<LesenScreen> createState() => _LesenScreenState();
}

class _LesenScreenState extends State<LesenScreen> {
  int? _selectedModel;
  int _currentPart = 0;
  int _currentQuestion = 0;
  int? _selectedAnswer;
  int _score = 0;
  bool _showResult = false;

  List<Map<String, dynamic>> get _parts =>
      List<Map<String, dynamic>>.from(lesenModels[_selectedModel!]['parts'] as List);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('القراءة - Lesen'),
        centerTitle: true,
      ),
      body: _selectedModel == null ? _buildModelList() : _buildExam(),
    );
  }

  Widget _buildModelList() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: lesenModels.length,
      itemBuilder: (ctx, i) {
        final model = lesenModels[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor: Theme.of(context).colorScheme.primaryContainer,
              child: Text('${i + 1}', style: TextStyle(color: Theme.of(context).colorScheme.onPrimaryContainer)),
            ),
            title: Text(model['title'] as String, style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text(model['description'] as String, maxLines: 2, overflow: TextOverflow.ellipsis),
            trailing: Text('${(model["parts"] as List).length} أجزاء'),
            onTap: () => setState(() {
              _selectedModel = i;
              _currentPart = 0;
              _currentQuestion = 0;
              _score = 0;
              _showResult = false;
              _selectedAnswer = null;
            }),
          ),
        );
      },
    );
  }

  Widget _buildExam() {
    final parts = _parts;
    if (_showResult) return _buildResultScreen();
    final part = parts[_currentPart];
    final questions = part['questions'] as List? ?? [];
    
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Progress
          LinearProgressIndicator(
            value: (_currentPart + 1) / parts.length,
            backgroundColor: Colors.grey[200],
          ),
          const SizedBox(height: 8),
          Text('الجزء ${_currentPart + 1} من ${parts.length}', style: Theme.of(context).textTheme.bodySmall),
          const SizedBox(height: 16),
          // Part title
          Text(part['title'] as String? ?? '', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
          if (part['instructionsAr'] != null) ...[
            const SizedBox(height: 8),
            Text(part['instructionsAr'] as String, style: Theme.of(context).textTheme.bodyMedium),
          ],
          if (part['textDe'] != null) ...[
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surfaceContainerHighest,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(part['textDe'] as String, style: const TextStyle(fontSize: 15, height: 1.6), textDirection: TextDirection.ltr),
            ),
          ],
          const SizedBox(height: 20),
          // Questions
          if (questions.isNotEmpty) ...[
            Text('السؤال ${_currentQuestion + 1} من ${questions.length}', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 12),
            _buildQuestion(questions[_currentQuestion] as Map<String, dynamic>),
          ],
          const SizedBox(height: 20),
          // Navigation
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              if (_currentQuestion > 0 || _currentPart > 0)
                TextButton.icon(
                  onPressed: _goBack,
                  icon: const Icon(Icons.arrow_back),
                  label: const Text('السابق'),
                ),
              ElevatedButton.icon(
                onPressed: _selectedAnswer != null ? _goNext : null,
                icon: const Icon(Icons.arrow_forward),
                label: Text(_isLastQuestion() ? 'النتيجة' : 'التالي'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildQuestion(Map<String, dynamic> q) {
    final options = q['options'] as List? ?? [];
    final questionText = q['questionDe'] ?? q['statementDe'] ?? q['promptDe'] ?? '';
    final questionAr = q['questionAr'] ?? q['statementAr'] ?? '';
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (questionText.toString().isNotEmpty)
          Text(questionText.toString(), style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500), textDirection: TextDirection.ltr),
        if (questionAr.toString().isNotEmpty) ...[
          const SizedBox(height: 4),
          Text(questionAr.toString(), style: TextStyle(color: Colors.grey[600], fontSize: 13)),
        ],
        const SizedBox(height: 12),
        ...List.generate(options.length, (i) {
          final opt = options[i];
          final optText = opt is Map ? (opt['de'] ?? opt['text'] ?? opt.toString()) : opt.toString();
          return RadioListTile<int>(
            value: i,
            groupValue: _selectedAnswer,
            title: Text(optText, textDirection: TextDirection.ltr),
            onChanged: (v) => setState(() => _selectedAnswer = v),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
          );
        }),
      ],
    );
  }

  bool _isLastQuestion() {
    final parts = _parts;
    final questions = parts[_currentPart]['questions'] as List? ?? [];
    return _currentPart == parts.length - 1 && _currentQuestion == questions.length - 1;
  }

  void _goBack() {
    setState(() {
      if (_currentQuestion > 0) {
        _currentQuestion--;
      } else if (_currentPart > 0) {
        _currentPart--;
        final prevQuestions = _parts[_currentPart]['questions'] as List? ?? [];
        _currentQuestion = prevQuestions.isEmpty ? 0 : prevQuestions.length - 1;
      }
      _selectedAnswer = null;
    });
  }

  void _goNext() {
    final parts = _parts;
    final questions = parts[_currentPart]['questions'] as List? ?? [];
    final q = questions.isNotEmpty ? questions[_currentQuestion] as Map<String, dynamic> : null;
    
    // Check answer
    if (q != null) {
      final correct = q['correct'];
      if (correct is int && correct == _selectedAnswer) {
        _score++;
      } else if (correct is String) {
        final options = q['options'] as List? ?? [];
        final correctIdx = options.indexWhere((o) => o is Map ? o['id'] == correct : false);
        if (correctIdx == _selectedAnswer) _score++;
      }
    }

    setState(() {
      if (_isLastQuestion()) {
        _showResult = true;
        context.read<AppProvider>().addXP(10);
      } else if (_currentQuestion < questions.length - 1) {
        _currentQuestion++;
      } else {
        _currentPart++;
        _currentQuestion = 0;
      }
      _selectedAnswer = null;
    });
  }

  Widget _buildResultScreen() {
    final totalQ = _parts.fold<int>(0, (sum, p) => sum + ((p['questions'] as List?)?.length ?? 0));
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
