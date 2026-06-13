import 'package:audioplayers/audioplayers.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SoundService {
  static final SoundService _instance = SoundService._internal();
  factory SoundService() => _instance;
  SoundService._internal();

  final AudioPlayer _player = AudioPlayer();
  bool _isSoundEnabled = true;

  bool get isSoundEnabled => _isSoundEnabled;

  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _isSoundEnabled = prefs.getBool('sound_enabled') ?? true;
  }

  Future<void> toggleSound() async {
    _isSoundEnabled = !_isSoundEnabled;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('sound_enabled', _isSoundEnabled);
  }

  Future<void> playCorrect() async {
    if (!_isSoundEnabled) return;
    try {
      await _player.stop();
      await _player.play(AssetSource('audio/correct.ogg'), volume: 0.8);
    } catch (e) {
      // Ignore
    }
  }

  Future<void> playWrong() async {
    if (!_isSoundEnabled) return;
    try {
      await _player.stop();
      await _player.play(AssetSource('audio/wrong.ogg'), volume: 0.8);
    } catch (e) {
      // Ignore
    }
  }

  Future<void> playTada() async {
    if (!_isSoundEnabled) return;
    try {
      await _player.stop();
      await _player.play(AssetSource('audio/tada.ogg'), volume: 1.0);
    } catch (e) {
      // Ignore
    }
  }
}
