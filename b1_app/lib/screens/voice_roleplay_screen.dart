import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:flutter_tts/flutter_tts.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class VoiceRoleplayCategoryScreen extends StatelessWidget {
  const VoiceRoleplayCategoryScreen({super.key});

  final List<Map<String, String>> scenarios = const [
    {
      'id': 'doctor',
      'title': 'عند الطبيب',
      'desc': 'أنت مريض وتحتاج لشرح أعراضك للطبيب وحجز موعد.',
      'icon': '🏥',
      'prompt': 'Du bist ein deutscher Arzt. Ein Patient (der Nutzer) kommt zu dir. Du musst fragen, was ihm fehlt, und am Ende ein Rezept oder eine Krankschreibung ausstellen. Antworte immer auf Deutsch, in kurzen und einfachen Sätzen (B1 Niveau). Beginne das Gespräch!'
    },
    {
      'id': 'jobcenter',
      'title': 'في الجوب سنتر',
      'desc': 'تتحدث مع الموظف عن بحثك عن عمل وتطلب دعماً لدورة لغة.',
      'icon': '🏢',
      'prompt': 'Du bist ein freundlicher Mitarbeiter im deutschen Jobcenter. Der Nutzer ist ein Asylbewerber oder Migrant, der Arbeit sucht oder einen Sprachkurs machen möchte. Stelle ihm einfache Fragen zu seinen Qualifikationen. B1 Niveau. Beginne das Gespräch!'
    },
    {
      'id': 'wohnung',
      'title': 'البحث عن سكن',
      'desc': 'تتصل بصاحب الشقة لتسأله عن تفاصيل الإيجار.',
      'icon': '🏠',
      'prompt': 'Du bist ein deutscher Vermieter. Du hast eine Wohnung inseriert (Kaltmiete 500 Euro, 2 Zimmer). Der Nutzer ruft dich an. Beantworte seine Fragen kurz und einfach auf B1 Niveau. Beginne das Gespräch mit: Hallo, hier ist Müller, Sie rufen wegen der Wohnung an?'
    },
    {
      'id': 'supermarkt',
      'title': 'في السوبرماركت',
      'desc': 'تسأل عن مكان المنتجات وتتحدث مع الكاشير.',
      'icon': '🛒',
      'prompt': 'Du bist ein Mitarbeiter in einem deutschen Supermarkt. Der Nutzer fragt dich, wo bestimmte Lebensmittel sind, oder er ist an der Kasse. Antworte freundlich und kurz (B1 Niveau). Beginne das Gespräch mit: Hallo, kann ich Ihnen helfen?'
    }
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('محادثات الذكاء الاصطناعي 🎙️'),
        backgroundColor: const Color(0xFF1E3A8A),
        foregroundColor: Colors.white,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: scenarios.length,
        itemBuilder: (context, index) {
          final sc = scenarios[index];
          return Card(
            elevation: 2,
            margin: const EdgeInsets.only(bottom: 12),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: ListTile(
              contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              leading: Text(sc['icon']!, style: const TextStyle(fontSize: 32)),
              title: Text(
                sc['title']!,
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
              subtitle: Text(
                sc['desc']!,
                style: const TextStyle(color: Colors.grey, height: 1.5),
              ),
              trailing: const Icon(Icons.arrow_forward_ios, color: Color(0xFF1E3A8A), size: 20),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => VoiceRoleplayScreen(scenario: sc),
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}

class VoiceRoleplayScreen extends StatefulWidget {
  final Map<String, String> scenario;
  const VoiceRoleplayScreen({super.key, required this.scenario});

  @override
  State<VoiceRoleplayScreen> createState() => _VoiceRoleplayScreenState();
}

class _VoiceRoleplayScreenState extends State<VoiceRoleplayScreen> {
  final List<Map<String, String>> _messages = [];
  bool _isLoading = true;
  
  // Audio
  late stt.SpeechToText _speech;
  bool _isListening = false;
  late FlutterTts _flutterTts;
  String _currentWords = "";

  @override
  void initState() {
    super.initState();
    _speech = stt.SpeechToText();
    _flutterTts = FlutterTts();
    _initTts();
    _startScenario();
  }

  void _initTts() async {
    await _flutterTts.setLanguage("de-DE");
    await _flutterTts.setPitch(1.0);
  }

  @override
  void dispose() {
    _flutterTts.stop();
    _speech.stop();
    super.dispose();
  }

  Future<void> _startScenario() async {
    setState(() => _isLoading = true);
    try {
      final provider = Provider.of<AppProvider>(context, listen: false);
      final url = Uri.parse('${provider.apiBaseUrl}/api/ai-chat');
      
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'history': [
            {'role': 'user', 'parts': widget.scenario['prompt']!}
          ]
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final reply = data['reply'] ?? 'Hallo!';
        setState(() {
          _messages.add({'role': 'bot', 'text': reply});
          _isLoading = false;
        });
        await _speak(reply);
      } else {
        _addError('خطأ في الاتصال بالخادم.');
      }
    } catch (e) {
      _addError('تعذر الاتصال بالخادم. تأكد من الإنترنت.');
    }
  }

  void _addError(String text) {
    setState(() {
      _messages.add({'role': 'bot', 'text': text});
      _isLoading = false;
    });
  }

  Future<void> _speak(String text) async {
    await _flutterTts.speak(text);
  }

  void _listen() async {
    if (!_isListening) {
      await _flutterTts.stop();
      bool available = await _speech.initialize(
        onStatus: (val) {
          if (val == 'done' || val == 'notListening') {
            setState(() => _isListening = false);
            if (_currentWords.isNotEmpty) {
              _sendMessage(_currentWords);
              _currentWords = "";
            }
          }
        },
        onError: (val) => print('onError: $val'),
      );
      if (available) {
        setState(() => _isListening = true);
        _speech.listen(
          onResult: (val) => setState(() {
            _currentWords = val.recognizedWords;
          }),
          localeId: 'de_DE',
        );
      }
    } else {
      setState(() => _isListening = false);
      _speech.stop();
      if (_currentWords.isNotEmpty) {
        _sendMessage(_currentWords);
        _currentWords = "";
      }
    }
  }

  Future<void> _sendMessage(String text) async {
    if (text.trim().isEmpty) return;
    
    setState(() {
      _messages.add({'role': 'user', 'text': text});
      _isLoading = true;
    });

    try {
      final provider = Provider.of<AppProvider>(context, listen: false);
      final url = Uri.parse('${provider.apiBaseUrl}/api/ai-chat');
      
      // Build history
      List<Map<String, dynamic>> history = [];
      history.add({'role': 'user', 'parts': widget.scenario['prompt']!});
      
      for (var msg in _messages) {
        history.add({
          'role': msg['role'] == 'bot' ? 'model' : 'user',
          'parts': msg['text']
        });
      }

      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'history': history}),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final reply = data['reply'] ?? '';
        setState(() {
          _messages.add({'role': 'bot', 'text': reply});
          _isLoading = false;
        });
        await _speak(reply);
      } else {
        _addError('خطأ في الاتصال.');
      }
    } catch (e) {
      _addError('مشكلة في الإنترنت.');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: Text(widget.scenario['title']!),
        backgroundColor: const Color(0xFF1E3A8A),
        foregroundColor: Colors.white,
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                final isBot = msg['role'] == 'bot';
                return Align(
                  alignment: isBot ? Alignment.centerLeft : Alignment.centerRight,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(16),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
                    decoration: BoxDecoration(
                      color: isBot ? Colors.white : const Color(0xFFDBEAFE),
                      borderRadius: BorderRadius.circular(16).copyWith(
                        topLeft: isBot ? const Radius.circular(0) : const Radius.circular(16),
                        topRight: !isBot ? const Radius.circular(0) : const Radius.circular(16),
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.05),
                          blurRadius: 5,
                          offset: const Offset(0, 2),
                        )
                      ],
                    ),
                    child: Text(
                      msg['text']!,
                      style: TextStyle(
                        fontSize: 16,
                        color: isBot ? Colors.black87 : const Color(0xFF1E3A8A),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          if (_isLoading)
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: CircularProgressIndicator(color: Color(0xFF1E3A8A)),
            ),
          if (_isListening)
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                _currentWords.isEmpty ? 'تحدث الآن...' : _currentWords,
                style: const TextStyle(color: Colors.red, fontStyle: FontStyle.italic),
              ),
            ),
          Container(
            padding: const EdgeInsets.all(24),
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
              boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 10)],
            ),
            child: Center(
              child: GestureDetector(
                onTapDown: (_) => _listen(),
                onTapUp: (_) => _listen(), // Toggle mode also works if they just tap
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  width: _isListening ? 90 : 80,
                  height: _isListening ? 90 : 80,
                  decoration: BoxDecoration(
                    color: _isListening ? Colors.red : const Color(0xFF1E3A8A),
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: (_isListening ? Colors.red : const Color(0xFF1E3A8A)).withValues(alpha: 0.3),
                        blurRadius: 20,
                        spreadRadius: 5,
                      )
                    ],
                  ),
                  child: const Icon(Icons.mic, color: Colors.white, size: 40),
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
