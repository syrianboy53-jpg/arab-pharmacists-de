import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'dart:math';

class PronunciationLabScreen extends StatefulWidget {
  const PronunciationLabScreen({Key? key}) : super(key: key);

  @override
  _PronunciationLabScreenState createState() => _PronunciationLabScreenState();
}

class _PronunciationLabScreenState extends State<PronunciationLabScreen> {
  final stt.SpeechToText _speech = stt.SpeechToText();
  bool _isListening = false;
  bool _isSpeechAvailable = false;
  String _recognizedText = '';
  double _score = 0;
  bool _hasScored = false;

  final List<String> _sentences = [
    'Ich habe einen Termin beim Arzt.',
    'Können Sie mir bitte helfen?',
    'Ich möchte eine Fahrkarte nach Berlin kaufen.',
    'Das Wetter ist heute sehr schön.',
    'Wo finde ich den nächsten Supermarkt?',
    'Ich spreche ein bisschen Deutsch.',
  ];

  late String _currentSentence;

  @override
  void initState() {
    super.initState();
    _currentSentence = _sentences[Random().nextInt(_sentences.length)];
    _initSpeech();
  }

  void _initSpeech() async {
    _isSpeechAvailable = await _speech.initialize(
      onStatus: (status) => debugPrint('onStatus: $status'),
      onError: (errorNotification) => debugPrint('onError: $errorNotification'),
    );
    setState(() {});
  }

  void _listen() async {
    if (!_isListening) {
      if (_isSpeechAvailable) {
        setState(() {
          _isListening = true;
          _recognizedText = '';
          _hasScored = false;
        });
        _speech.listen(
          onResult: (val) => setState(() {
            _recognizedText = val.recognizedWords;
          }),
          localeId: 'de_DE',
        );
      } else {
        // Handle error if speech isn't available
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('ميزة التعرف على الصوت غير متوفرة أو لم تمنح الصلاحية.')),
        );
      }
    } else {
      setState(() => _isListening = false);
      _speech.stop();
      _calculateScore();
    }
  }

  void _calculateScore() {
    if (_recognizedText.isEmpty) {
      setState(() {
        _score = 0;
        _hasScored = true;
      });
      return;
    }

    // A very basic similarity algorithm (in reality, use Levenshtein distance)
    String target = _currentSentence.toLowerCase().replaceAll(RegExp(r'[^\w\s]'), '');
    String recognized = _recognizedText.toLowerCase().replaceAll(RegExp(r'[^\w\s]'), '');

    List<String> targetWords = target.split(' ');
    List<String> recognizedWords = recognized.split(' ');

    int matches = 0;
    for (String word in recognizedWords) {
      if (targetWords.contains(word)) {
        matches++;
      }
    }

    double accuracy = matches / targetWords.length;
    if (accuracy > 1.0) accuracy = 1.0;

    setState(() {
      _score = accuracy * 100;
      _hasScored = true;
    });
  }

  void _nextSentence() {
    setState(() {
      _currentSentence = _sentences[Random().nextInt(_sentences.length)];
      _recognizedText = '';
      _score = 0;
      _hasScored = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: Text('مختبر النطق 🎙️', style: GoogleFonts.cairo(fontWeight: FontWeight.bold)),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'اقرأ الجملة التالية بصوت عالٍ:',
                style: GoogleFonts.cairo(
                  fontSize: 18,
                  color: colorScheme.onSurfaceVariant,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: colorScheme.primaryContainer,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  _currentSentence,
                  style: GoogleFonts.cairo(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: colorScheme.onPrimaryContainer,
                  ),
                  textAlign: TextAlign.center,
                  textDirection: TextDirection.ltr,
                ),
              ),
              const SizedBox(height: 48),
              
              // Microphone Button
              GestureDetector(
                onTap: _listen,
                child: Container(
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: _isListening ? Colors.red : colorScheme.primary,
                    boxShadow: [
                      if (_isListening)
                        BoxShadow(
                          color: Colors.red.withOpacity(0.4),
                          blurRadius: 20,
                          spreadRadius: 10,
                        )
                    ],
                  ),
                  child: Icon(
                    _isListening ? Icons.stop : Icons.mic,
                    color: Colors.white,
                    size: 48,
                  ),
                ),
              ),
              
              const SizedBox(height: 16),
              Text(
                _isListening ? 'جاري الاستماع... اضغط للإيقاف' : 'اضغط للتسجيل',
                style: GoogleFonts.cairo(
                  color: _isListening ? Colors.red : colorScheme.onSurface,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              
              const SizedBox(height: 32),
              
              // Results Area
              if (_recognizedText.isNotEmpty) ...[
                Text(
                  'لقد قلت:',
                  style: GoogleFonts.cairo(fontWeight: FontWeight.bold, color: colorScheme.onSurfaceVariant),
                ),
                const SizedBox(height: 8),
                Text(
                  _recognizedText,
                  style: const TextStyle(fontSize: 18),
                  textDirection: TextDirection.ltr,
                ),
                const SizedBox(height: 24),
              ],
              
              if (_hasScored) ...[
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: _score >= 80 
                        ? Colors.green.withOpacity(0.1) 
                        : (_score >= 50 ? Colors.orange.withOpacity(0.1) : Colors.red.withOpacity(0.1)),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    children: [
                      Text(
                        'دقة النطق:',
                        style: GoogleFonts.cairo(fontWeight: FontWeight.bold),
                      ),
                      Text(
                        '${_score.toInt()}%',
                        style: GoogleFonts.cairo(
                          fontSize: 36,
                          fontWeight: FontWeight.bold,
                          color: _score >= 80 
                              ? Colors.green 
                              : (_score >= 50 ? Colors.orange : Colors.red),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: _nextSentence,
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: Text('جملة أخرى', style: GoogleFonts.cairo(fontSize: 16)),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
