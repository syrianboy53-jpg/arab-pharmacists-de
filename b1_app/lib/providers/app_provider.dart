import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AppProvider extends ChangeNotifier {
  bool _isDarkMode = false;
  int _xp = 0;
  int _streak = 0;
  int _completedQuizzes = 0;
  String _lastStudyDate = '';

  bool get isDarkMode => _isDarkMode;
  int get xp => _xp;
  int get streak => _streak;
  int get completedQuizzes => _completedQuizzes;

  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _isDarkMode = prefs.getBool('darkMode') ?? false;
    _xp = prefs.getInt('xp') ?? 0;
    _streak = prefs.getInt('streak') ?? 0;
    _completedQuizzes = prefs.getInt('completedQuizzes') ?? 0;
    _lastStudyDate = prefs.getString('lastStudyDate') ?? '';
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
}
