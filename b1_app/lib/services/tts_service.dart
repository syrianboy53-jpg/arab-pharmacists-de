import 'package:flutter_tts/flutter_tts.dart';

class TtsService {
  static final TtsService _instance = TtsService._internal();
  factory TtsService() => _instance;

  final FlutterTts _flutterTts = FlutterTts();
  bool _isInitialized = false;

  TtsService._internal() {
    _initTts();
  }

  Future<void> _initTts() async {
    try {
      await _flutterTts.setLanguage("de-DE");
      await _flutterTts.setSpeechRate(0.45); // Slightly slower for language learners
      await _flutterTts.setVolume(1.0);
      await _flutterTts.setPitch(1.0);
      
      // Some platforms require checking if language is available
      var isAvailable = await _flutterTts.isLanguageAvailable("de-DE");
      if (isAvailable) {
        _isInitialized = true;
      }
    } catch (e) {
      print("TTS Initialization Error: $e");
    }
  }

  Future<void> speak(String text) async {
    if (!_isInitialized) {
      await _initTts();
    }
    
    if (text.isNotEmpty) {
      await _flutterTts.stop(); // Stop current speech if any
      await _flutterTts.speak(text);
    }
  }

  Future<void> stop() async {
    await _flutterTts.stop();
  }
}
