import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_tts/flutter_tts.dart';

class AppProvider extends ChangeNotifier {
  static const int appVersion = 82;

  bool _isDarkMode = false;
  int _xp = 0;
  int _streak = 0;
  int _completedQuizzes = 0;
  String _lastStudyDate = '';
  List<int> _completedGrammarLessons = [];

  String? _token;
  String? _userId;
  String? _userEmail;
  String? _userName;

  bool get isDarkMode => _isDarkMode;
  int get xp => _xp;
  int get streak => _streak;
  int get completedQuizzes => _completedQuizzes;
  List<int> get completedGrammarLessons => _completedGrammarLessons;

  String? get token => _token;
  String? get userId => _userId;
  String? get userEmail => _userEmail;
  String? get userName => _userName;
  bool get isLoggedIn => _token != null;

  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _isDarkMode = prefs.getBool('darkMode') ?? false;
    _xp = prefs.getInt('xp') ?? 0;
    _streak = prefs.getInt('streak') ?? 0;
    _completedQuizzes = prefs.getInt('completedQuizzes') ?? 0;
    _lastStudyDate = prefs.getString('lastStudyDate') ?? '';
    final completedList = prefs.getStringList('completedGrammarLessons') ?? [];
    _completedGrammarLessons = completedList.map((idStr) => int.tryParse(idStr) ?? 0).where((id) => id > 0).toList();
    
    _token = prefs.getString('token');
    _userId = prefs.getString('userId');
    _userEmail = prefs.getString('userEmail');
    _userName = prefs.getString('userName');
    
    _checkStreak();
    notifyListeners();
  }

  void toggleDarkMode() async {
    _isDarkMode = !_isDarkMode;
    final prefs = await SharedPreferences.getInstance();
    prefs.setBool('darkMode', _isDarkMode);
    notifyListeners();
  }

  void addXP(int points) async {
    _xp += points;
    final prefs = await SharedPreferences.getInstance();
    prefs.setInt('xp', _xp);
    _updateStreak();
    notifyListeners();
  }

  void incrementQuizzes() async {
    _completedQuizzes++;
    final prefs = await SharedPreferences.getInstance();
    prefs.setInt('completedQuizzes', _completedQuizzes);
    notifyListeners();
  }

  void _checkStreak() {
    final today = DateTime.now().toIso8601String().substring(0, 10);
    final yesterday = DateTime.now()
        .subtract(const Duration(days: 1))
        .toIso8601String()
        .substring(0, 10);
    if (_lastStudyDate != today && _lastStudyDate != yesterday) {
      _streak = 0;
    }
  }

  void _updateStreak() async {
    final today = DateTime.now().toIso8601String().substring(0, 10);
    if (_lastStudyDate != today) {
      final yesterday = DateTime.now()
          .subtract(const Duration(days: 1))
          .toIso8601String()
          .substring(0, 10);
      if (_lastStudyDate == yesterday) {
        _streak++;
      } else {
        _streak = 1;
      }
      _lastStudyDate = today;
      final prefs = await SharedPreferences.getInstance();
      prefs.setInt('streak', _streak);
      prefs.setString('lastStudyDate', _lastStudyDate);
    }
  }

  int get level {
    if (_xp < 100) return 1;
    if (_xp < 300) return 2;
    if (_xp < 600) return 3;
    if (_xp < 1000) return 4;
    if (_xp < 1500) return 5;
    return 6 + (_xp - 1500) ~/ 500;
  }

  String get levelTitle {
    switch (level) {
      case 1:
        return 'مبتدئ';
      case 2:
        return 'متعلّم';
      case 3:
        return 'متقدّم';
      case 4:
        return 'متمكّن';
      case 5:
        return 'خبير';
      default:
        return 'محترف';
    }
  }

  Future<String?> login(String email, String password) async {
    try {
      final client = HttpClient();
      client.connectionTimeout = const Duration(seconds: 8);
      final request = await client.postUrl(Uri.parse('https://b1-syrer.de/auth/login'));
      request.headers.set(HttpHeaders.contentTypeHeader, 'application/json');
      
      final body = json.encode({'email': email, 'password': password});
      request.write(body);
      
      final response = await request.close();
      final responseBody = await response.transform(utf8.decoder).join();
      final data = json.decode(responseBody) as Map<String, dynamic>;
      
      if (response.statusCode == 200) {
        _token = data['access_token'];
        final user = data['user'] as Map<String, dynamic>;
        _userId = user['id']?.toString();
        _userEmail = user['email'];
        _userName = user['display_name'];
        
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', _token!);
        await prefs.setString('userId', _userId!);
        await prefs.setString('userEmail', _userEmail!);
        await prefs.setString('userName', _userName!);
        
        notifyListeners();
        return null; // Success
      } else {
        return data['error'] ?? 'بيانات الدخول غير صحيحة';
      }
    } catch (e) {
      return 'فشل الاتصال بالخادم: $e';
    }
  }

  Future<String?> signup(String name, String email, String password) async {
    try {
      final client = HttpClient();
      client.connectionTimeout = const Duration(seconds: 8);
      final request = await client.postUrl(Uri.parse('https://b1-syrer.de/auth/signup'));
      request.headers.set(HttpHeaders.contentTypeHeader, 'application/json');
      
      final body = json.encode({'name': name, 'email': email, 'password': password});
      request.write(body);
      
      final response = await request.close();
      final responseBody = await response.transform(utf8.decoder).join();
      final data = json.decode(responseBody) as Map<String, dynamic>;
      
      if (response.statusCode == 200 || response.statusCode == 201) {
        _token = data['access_token'];
        final user = data['user'] as Map<String, dynamic>;
        _userId = user['id']?.toString();
        _userEmail = user['email'];
        _userName = user['display_name'];
        
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', _token!);
        await prefs.setString('userId', _userId!);
        await prefs.setString('userEmail', _userEmail!);
        await prefs.setString('userName', _userName!);
        
        notifyListeners();
        return null; // Success
      } else {
        return data['error'] ?? 'حدث خطأ أثناء إنشاء الحساب';
      }
    } catch (e) {
      return 'فشل الاتصال بالخادم: $e';
    }
  }

  void logout() async {
    _token = null;
    _userId = null;
    _userEmail = null;
    _userName = null;
    
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    await prefs.remove('userId');
    await prefs.remove('userEmail');
    await prefs.remove('userName');
    
    notifyListeners();
  }

  // ==================== Text-to-Speech (TTS) ====================
  final FlutterTts _flutterTts = FlutterTts();
  bool _ttsInitialized = false;

  Future<void> _initTts() async {
    if (_ttsInitialized) return;
    try {
      await _flutterTts.setLanguage('de-DE');
      await _flutterTts.setSpeechRate(0.4); // slightly slower for learners
      await _flutterTts.setVolume(1.0);
      _ttsInitialized = true;
    } catch (e) {
      debugPrint('Error initializing TTS: $e');
    }
  }

  Future<void> speak(String text) async {
    await _initTts();
    try {
      await _flutterTts.stop();
      await _flutterTts.speak(text);
    } catch (e) {
      debugPrint('TTS speak error: $e');
    }
  }

  void completeGrammarLesson(int lessonId) async {
    if (!_completedGrammarLessons.contains(lessonId)) {
      _completedGrammarLessons.add(lessonId);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setStringList('completedGrammarLessons', _completedGrammarLessons.map((id) => id.toString()).toList());
      notifyListeners();
    }
  }
}
