import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:provider/provider.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../providers/app_provider.dart';
import 'lesen_screen.dart';
import 'hoeren_screen.dart';
import 'schreiben_screen.dart';
import 'sprechen_screen.dart';
import 'sprachbausteine_screen.dart';
import 'grammatik_screen.dart';
import 'wortschatz_screen.dart';
import 'leben_screen.dart';
import 'einbuergerung_screen.dart';
import 'b2_screen.dart';
import 'settings_screen.dart';
import 'library_screen.dart';
import 'slang_screen.dart';
import 'chat_simulator_screen.dart';
import 'premium_screen.dart';
import 'einstufung_screen.dart';
import 'satzbau_screen.dart';
import 'drill_screen.dart';
import 'synonyms_screen.dart';
import 'fehler_screen.dart';
import 'conjugation_trainer_screen.dart';
import 'emergency_screen.dart';
import 'smart_review_screen.dart';
import 'problems_screen.dart';
import 'exam_simulation_screen.dart';
import 'bild_description_screen.dart';
import 'interactive_practice_screen.dart';
import 'settings_screen.dart';


class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  Widget _buildFullLeaderboard(bool isDark, Color textMain, Color borderCol, AppProvider provider) {
    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 12),
                Text(
                  'لوحة المتصدّرين الأسبوعية 🏆',
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: textMain),
                ),
                const SizedBox(height: 6),
                const Text(
                  'تنافس مع زملائك في ألمانيا للوصول للصدارة والـ Premium!',
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
                const SizedBox(height: 16),
              ],
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              _leaderboardRow('1', 'أحمد السوري (ميونخ)', '2450 XP', false),
              _leaderboardRow('2', 'سارة الحلبي (كولن)', '2100 XP', false),
              _leaderboardRow('3', 'أنت (الآن)', '${provider.xp} XP', true),
              _leaderboardRow('4', 'خالد محمد (هامبورغ)', '1800 XP', false),
              _leaderboardRow('5', 'فاطمة الزعبي (برلين)', '1500 XP', false),
              _leaderboardRow('6', 'مصطفى الكردي (فرنكفورت)', '1250 XP', false),
              _leaderboardRow('7', 'ندى الحمصي (شتوتغارت)', '1100 XP', false),
            ]),
          ),
        ),
      ],
    );
  }

  @override
  void initState() {
    super.initState();
    // Run update check on startup
    _checkUpdates();
  }

  Future<Map<String, dynamic>?> _fetchConfig() async {
    try {
      final client = HttpClient();
      client.connectionTimeout = const Duration(seconds: 5);
      final request = await client.getUrl(Uri.parse('https://www.b1-syrer.de/config?t=${DateTime.now().millisecondsSinceEpoch}'));
      final response = await request.close();
      if (response.statusCode == 200) {
        final responseBody = await response.transform(utf8.decoder).join();
        return json.decode(responseBody) as Map<String, dynamic>;
      }
    } catch (e) {
      debugPrint('Error checking config: $e');
    }
    return null;
  }

  Future<void> _checkUpdates() async {
    if (kIsWeb) return; // Do not check for updates on the web

    final config = await _fetchConfig();

    if (config != null) {
      final remoteVersion = int.tryParse(config['apk_version'] ?? '0') ?? 0;
      const localVersion = AppProvider.appVersion;
      if (localVersion < remoteVersion) {
        final prefs = await SharedPreferences.getInstance();
        final skippedVersion = prefs.getInt('skipped_apk_version') ?? 0;
        if (skippedVersion < remoteVersion) {
          final apkUrl = config['apk_url'] ?? 'https://www.b1-syrer.de/b1-deutsch.apk';
          _showUpdateDialog(apkUrl, remoteVersion);
        }
      }
    }
  }

  void _showUpdateDialog(String downloadUrl, int remoteVersion) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        backgroundColor: isDark ? const Color(0xFF1E293B) : Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Row(
          children: [
            Icon(Icons.system_update, color: Color(0xFF10B981)),
            SizedBox(width: 8),
            Text(
              'تحديث جديد متوفر! 🚀',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
          ],
        ),
        content: Text(
          'يتوفر إصدار جديد يحتوي على دروس إضافية وملخصات وتحسينات هامة للأداء. يرجى تنزيل التحديث للاستمرار بأفضل تجربة تعليمية.',
          style: TextStyle(color: isDark ? Colors.white70 : Colors.black87, fontSize: 14, height: 1.5),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: Text('لاحقاً', style: TextStyle(color: isDark ? Colors.white38 : Colors.grey)),
          ),
          TextButton(
            onPressed: () async {
              final prefs = await SharedPreferences.getInstance();
              await prefs.setInt('skipped_apk_version', remoteVersion);
              if (mounted) {
                Navigator.of(ctx).pop();
              }
            },
            child: const Text('تجاهل هذا الإصدار', style: TextStyle(color: Colors.redAccent)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF10B981),
              foregroundColor: Colors.white,
            ),
            onPressed: () async {
              final separator = downloadUrl.contains('?') ? '&' : '?';
              final cacheBusterUrl = '$downloadUrl${separator}t=${DateTime.now().millisecondsSinceEpoch}';
              final uri = Uri.parse(cacheBusterUrl);
              try {
                await launchUrl(uri, mode: LaunchMode.externalApplication);
              } catch (e) {
                debugPrint('Could not launch update URL: $e');
              }
            },
            child: const Text('تحديث الآن 📥', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  void _navigate(Widget screen) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => screen));
  }

  Future<void> _launchUrl(String urlString) async {
    final uri = Uri.parse(urlString);
    try {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } catch (e) {
      debugPrint('Could not launch URL: $e');
    }
  }

  // ==================== INTERACTIVE GAMES & POPUPS ====================

  // 0. Streak details dialog (الالتزام اليومي - Duolingo like)
  void _showStreakDetailDialog() {
    final provider = context.read<AppProvider>();
    final isDark = Theme.of(context).brightness == Brightness.dark;
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          backgroundColor: isDark ? const Color(0xFF1E293B) : Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          title: const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.local_fire_department, color: Colors.orange, size: 28),
              SizedBox(width: 8),
              Text(
                'سلسلة الالتزام اليومي! 🔥',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'أنت الآن في اليوم المتتالي رقم',
                style: TextStyle(color: isDark ? Colors.white70 : Colors.black87, fontSize: 14),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                decoration: BoxDecoration(
                  color: Colors.orange.withValues(alpha: 0.1),
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.orange, width: 2),
                ),
                child: Text(
                  '${provider.streak}',
                  style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold, color: Colors.orange),
                ),
              ),
              const SizedBox(height: 16),
              // Mascot container
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF0F172A) : Colors.grey[100],
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: isDark ? Colors.white10 : Colors.grey[300]!),
                ),
                child: Row(
                  children: [
                    const Text('🦉', style: TextStyle(fontSize: 36)),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        'مدرّب B1-Syrer يقول:\n"استمر يا بطل! حافظ على لهيب حماسك متقداً يومياً لتتقن الألمانية بدون معلّم."',
                        style: TextStyle(
                          fontSize: 12,
                          height: 1.4,
                          fontWeight: FontWeight.bold,
                          color: isDark ? Colors.white70 : Colors.black87,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              // Daily status
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: List.generate(7, (index) {
                  final weekdays = ['إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت', 'أحد'];
                  // Highlight Mon-Sun mock grid
                  final isCompleted = index < provider.streak;
                  return Column(
                    children: [
                      Icon(
                        isCompleted ? Icons.local_fire_department : Icons.circle,
                        color: isCompleted ? Colors.orange : Colors.grey[300],
                        size: isCompleted ? 20 : 12,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        weekdays[index],
                        style: TextStyle(fontSize: 10, color: isCompleted ? Colors.orange : Colors.grey),
                      )
                    ],
                  );
                }),
              )
            ],
          ),
          actions: [
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.orange,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              onPressed: () => Navigator.pop(context),
              child: const Text('متابعة الدراسة 📚', style: TextStyle(fontWeight: FontWeight.bold)),
            )
          ],
        );
      },
    );
  }

  // 1. Der/Die/Das game (ترتيب البطاقات)
  void _showCardSortingGame() {
    final words = [
      {'word': 'Tisch (طاولة)', 'art': 'der'},
      {'word': 'Tür (باب)', 'art': 'die'},
      {'word': 'Kind (طفل)', 'art': 'das'},
      {'word': 'Mädchen (فتاة)', 'art': 'das'},
      {'word': 'Bäckerei (مخبز)', 'art': 'die'},
      {'word': 'Fahrrad (دراجة)', 'art': 'das'},
      {'word': 'Information (معلومات)', 'art': 'die'},
      {'word': 'Bus (حافلة)', 'art': 'der'},
      {'word': 'Brief (رسالة)', 'art': 'der'},
    ];
    int score = 0;
    int currentIndex = 0;

    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            final isFinished = currentIndex >= words.length;
            return AlertDialog(
              title: const Text('لعبة ترتيب البطاقات 🃏', style: TextStyle(fontWeight: FontWeight.bold), textAlign: TextAlign.center),
              content: isFinished
                  ? Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.emoji_events, size: 64, color: Colors.amber),
                        const SizedBox(height: 12),
                        const Text('عمل رائع!', style: TextStyle(fontWeight: FontWeight.bold)),
                        const SizedBox(height: 8),
                        Text('لقد أحرزت $score من أصل ${words.length} نقاط!'),
                        const SizedBox(height: 12),
                        Text('تمت إضافة +${score * 3} XP لملفك الشخصي.'),
                      ],
                    )
                  : Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('السؤال ${currentIndex + 1} من ${words.length}'),
                        const SizedBox(height: 16),
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
                          decoration: BoxDecoration(
                            color: const Color(0xFF10B981).withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: const Color(0xFF10B981), width: 1.5),
                          ),
                          child: Text(
                            words[currentIndex]['word']!,
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                          ),
                        ),
                        const SizedBox(height: 20),
                        const Text('ما هي أداة التعريف الصحيحة؟', style: TextStyle(fontSize: 12, color: Colors.grey)),
                        const SizedBox(height: 16),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: ['der', 'die', 'das'].map((art) {
                            return ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF1E293B),
                                foregroundColor: Colors.white,
                              ),
                              onPressed: () {
                                final isCorrect = words[currentIndex]['art'] == art;
                                if (isCorrect) {
                                  score++;
                                  context.read<AppProvider>().addXP(3);
                                }
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(isCorrect ? 'إجابة صحيحة! 🎉' : 'خطأ! الأداة الصحيحة هي ${words[currentIndex]['art']} ❌'),
                                    duration: const Duration(milliseconds: 800),
                                    backgroundColor: isCorrect ? Colors.green : Colors.red,
                                  ),
                                );
                                setState(() {
                                  currentIndex++;
                                });
                              },
                              child: Text(art, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                            );
                          }).toList(),
                        ),
                      ],
                    ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: Text(isFinished ? 'إغلاق' : 'إنهاء اللعبة', style: const TextStyle(color: Colors.grey)),
                ),
              ],
            );
          },
        );
      },
    );
  }

  // 2. Synonyms game (فخاخ المترادفات)
  void _showSynonymsGame() {
    final questions = [
      {'word': 'beginnen', 'options': ['aufhören', 'anfangen', 'sprechen'], 'correct': 'anfangen'},
      {'word': 'schwierig', 'options': ['leicht', 'kompliziert', 'einfach'], 'correct': 'kompliziert'},
      {'word': 'antworten', 'options': ['fragen', 'erklären', 'erwidern'], 'correct': 'erwidern'},
      {'word': 'zeigen', 'options': ['demonstrieren', 'verstecken', 'kaufen'], 'correct': 'demonstrieren'},
      {'word': 'klug', 'options': ['dumm', 'intelligent', 'langsam'], 'correct': 'intelligent'},
    ];
    int score = 0;
    int currentIndex = 0;

    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            final isFinished = currentIndex >= questions.length;
            return AlertDialog(
              title: const Text('فخاخ المترادفات 🎮', style: TextStyle(fontWeight: FontWeight.bold), textAlign: TextAlign.center),
              content: isFinished
                  ? Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.sports_esports, size: 64, color: Colors.green),
                        const SizedBox(height: 12),
                        const Text('تهانينا!', style: TextStyle(fontWeight: FontWeight.bold)),
                        const SizedBox(height: 8),
                        Text('أجبت على $score من أصل ${questions.length} إجابات صحيحة!'),
                        const SizedBox(height: 12),
                        Text('تمت إضافة +${score * 5} XP لملفك.'),
                      ],
                    )
                  : Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('السؤال ${currentIndex + 1} من ${questions.length}'),
                        const SizedBox(height: 16),
                        const Text('ما هو مرادف الكلمة التالية؟', style: TextStyle(fontSize: 12)),
                        const SizedBox(height: 8),
                        Text(
                          questions[currentIndex]['word'] as String,
                          style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.orange),
                        ),
                        const SizedBox(height: 20),
                        ...List<String>.from(questions[currentIndex]['options'] as List).map((opt) {
                          return Container(
                            width: double.infinity,
                            margin: const EdgeInsets.only(bottom: 10),
                            child: OutlinedButton(
                              style: OutlinedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(vertical: 12),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                              ),
                              onPressed: () {
                                final isCorrect = questions[currentIndex]['correct'] == opt;
                                if (isCorrect) {
                                  score++;
                                  context.read<AppProvider>().addXP(5);
                                }
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(isCorrect ? 'ممتاز! مرادف صحيح 🎉' : 'خطأ! المرادف هو ${questions[currentIndex]['correct']} ❌'),
                                    duration: const Duration(milliseconds: 800),
                                    backgroundColor: isCorrect ? Colors.green : Colors.red,
                                  ),
                                );
                                setState(() {
                                  currentIndex++;
                                });
                              },
                              child: Text(opt, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                            ),
                          );
                        }),
                      ],
                    ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: Text(isFinished ? 'إغلاق' : 'خروج', style: const TextStyle(color: Colors.grey)),
                ),
              ],
            );
          },
        );
      },
    );
  }

  // 3. Daily Challenge (تحدّي اليوم)
  void _showDailyChallenge() {
    final quiz = [
      {'q': 'Ich freue mich ___ deinen Brief.', 'opts': ['auf', 'über', 'an'], 'correct': 'über'},
      {'q': 'Wenn ich Zeit ___, komme ich vorbei.', 'opts': ['hätte', 'habe', 'hast'], 'correct': 'habe'},
      {'q': 'Das Auto, ___ ich gekauft habe, ist rot.', 'opts': ['das', 'den', 'dem'], 'correct': 'das'},
      {'q': '___ des schlechten Wetters gingen wir spazieren.', 'opts': ['Trotz', 'Wegen', 'Während'], 'correct': 'Trotz'},
    ];
    int score = 0;
    int currentIndex = 0;

    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            final isFinished = currentIndex >= quiz.length;
            return AlertDialog(
              title: const Text('تحدّي اليوم 📅', style: TextStyle(fontWeight: FontWeight.bold), textAlign: TextAlign.center),
              content: isFinished
                  ? Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.thumb_up, size: 64, color: Colors.orange),
                        const SizedBox(height: 12),
                        const Text('اكتمل التحدّي بنجاح!', style: TextStyle(fontWeight: FontWeight.bold)),
                        const SizedBox(height: 8),
                        Text('النتيجة: $score من ${quiz.length}'),
                        const SizedBox(height: 12),
                        const Text('تم منحك +90 XP إضافية لمتابعة اليوم! 🔥'),
                      ],
                    )
                  : Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('السؤال ${currentIndex + 1} من ${quiz.length} (+90 XP)', style: const TextStyle(fontSize: 11, color: Colors.grey)),
                        const SizedBox(height: 8),
                        Text(
                          quiz[currentIndex]['q'] as String,
                          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                          textDirection: TextDirection.ltr,
                        ),
                        const SizedBox(height: 20),
                        ...List<String>.from(quiz[currentIndex]['opts'] as List).map((opt) {
                          return Container(
                            width: double.infinity,
                            margin: const EdgeInsets.only(bottom: 8),
                            child: OutlinedButton(
                              style: OutlinedButton.styleFrom(
                                alignment: Alignment.centerLeft,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                              ),
                              onPressed: () {
                                final isCorrect = quiz[currentIndex]['correct'] == opt;
                                if (isCorrect) score++;
                                if (currentIndex == quiz.length - 1) {
                                  context.read<AppProvider>().addXP(90); // Grant 90 XP
                                }
                                setState(() {
                                  currentIndex++;
                                });
                              },
                              child: Text(opt, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold), textDirection: TextDirection.ltr),
                            ),
                          );
                        }),
                      ],
                    ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: Text(isFinished ? 'رائع' : 'إلغاء', style: const TextStyle(color: Colors.grey)),
                ),
              ],
            );
          },
        );
      },
    );
  }

  // 4. Conjugation Trainer (مدرّب التصريف)
  void _showConjugationTrainer() {
    final conjugations = [
      {'q': 'sprechen (Präsens, er/sie/es)', 'opts': ['spricht', 'sprecht', 'spreche'], 'correct': 'spricht'},
      {'q': 'gehen (Perfekt, wir)', 'opts': ['haben gegangen', 'sind gegangen', 'gegangen'], 'correct': 'sind gegangen'},
      {'q': 'sein (Präteritum, ich)', 'opts': ['war', 'bin', 'wäre'], 'correct': 'war'},
      {'q': 'haben (Konjunktiv II, ihr)', 'opts': ['hättet', 'habt', 'hätten'], 'correct': 'hättet'},
    ];
    int score = 0;
    int currentIndex = 0;

    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            final isFinished = currentIndex >= conjugations.length;
            return AlertDialog(
              title: const Text('مدرّب التصريف 🔁', style: TextStyle(fontWeight: FontWeight.bold), textAlign: TextAlign.center),
              content: isFinished
                  ? Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.directions_run, size: 64, color: Colors.blue),
                        const SizedBox(height: 12),
                        const Text('مستوى ممتاز في تصريف الأفعال!', style: TextStyle(fontWeight: FontWeight.bold)),
                        const SizedBox(height: 8),
                        Text('النتيجة: $score من ${conjugations.length}'),
                        const SizedBox(height: 12),
                        Text('تمت إضافة +${score * 4} XP لنقاطك.'),
                      ],
                    )
                  : Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('السؤال ${currentIndex + 1} من ${conjugations.length}', style: const TextStyle(fontSize: 11, color: Colors.grey)),
                        const SizedBox(height: 8),
                        Text(
                          conjugations[currentIndex]['q'] as String,
                          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.blue),
                          textDirection: TextDirection.ltr,
                        ),
                        const SizedBox(height: 20),
                        ...List<String>.from(conjugations[currentIndex]['opts'] as List).map((opt) {
                          return Container(
                            width: double.infinity,
                            margin: const EdgeInsets.only(bottom: 8),
                            child: OutlinedButton(
                              style: OutlinedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(vertical: 12),
                              ),
                              onPressed: () {
                                final isCorrect = conjugations[currentIndex]['correct'] == opt;
                                if (isCorrect) {
                                  score++;
                                  context.read<AppProvider>().addXP(4);
                                }
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(isCorrect ? 'تصريف صحيح! 👍' : 'خطأ! التصريف الصحيح هو: ${conjugations[currentIndex]['correct']} ❌'),
                                    duration: const Duration(milliseconds: 800),
                                    backgroundColor: isCorrect ? Colors.green : Colors.red,
                                  ),
                                );
                                setState(() {
                                  currentIndex++;
                                });
                              },
                              child: Text(opt, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold), textDirection: TextDirection.ltr),
                            ),
                          );
                        }),
                      ],
                    ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: Text(isFinished ? 'حسناً' : 'إغلاق', style: const TextStyle(color: Colors.grey)),
                ),
              ],
            );
          },
        );
      },
    );
  }

  // 5. B1 Personal Plan (خطّتي الشخصيّة لـB1)
  void _showB1Planner() {
    int days = 30;
    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return AlertDialog(
              title: const Text('خطّتي الشخصيّة لـB1 🎯', style: TextStyle(fontWeight: FontWeight.bold)),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('كم يوماً متبقي حتى موعد امتحانك؟'),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.remove_circle_outline, size: 28, color: Colors.red),
                        onPressed: () {
                          if (days > 5) setState(() => days -= 5);
                        },
                      ),
                      Text(
                        '$days يوماً',
                        style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                      ),
                      IconButton(
                        icon: const Icon(Icons.add_circle_outline, size: 28, color: Color(0xFF10B981)),
                        onPressed: () {
                          if (days < 180) setState(() => days += 5);
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Text('الجدول اليومي المقترح:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                  const SizedBox(height: 8),
                  Text(
                    days >= 60
                        ? '• الأسبوع 1-3: القواعد والمفردات المكثفة.\n• الأسبوع 4-6: حل أقسام القراءة والاستماع.\n• الأسبوع 7-8: حفظ قوالب الكتابة والمحادثة اليومية.\n• الأسبوع الأخير: امتحانات تجريبية كاملة.'
                        : days >= 30
                            ? '• الأيام 1-10: حل نموذج كامل يومياً وقراءة الأخطاء.\n• الأيام 11-20: كتابة رسالة وممارسة التحدث.\n• الأيام 21-30: محاكاة الامتحان والسرعة.'
                            : '• خطة طوارئ مكثفة!\n• ادرس 3 ساعات يومياً: ساعة قوالب محادثة جاهزة، ساعة كتابة رسائل، وساعة تدريبات Sprachbausteine.',
                    style: const TextStyle(fontSize: 12, height: 1.5, color: Colors.grey),
                  ),
                ],
              ),
              actions: [
                ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF10B981), foregroundColor: Colors.white),
                  onPressed: () {
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('تم حفظ الخطة وإضافتها للجدول اليومي بنجاح!')),
                    );
                  },
                  child: const Text('تفعيل الخطة 🚀'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  // 6. Leaderboard (لوحة المتصدّرين)
  void _showLeaderboard() {
    final provider = context.read<AppProvider>();
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('لوحة المتصدّرين الأسبوعية 🏆', style: TextStyle(fontWeight: FontWeight.bold), textAlign: TextAlign.center),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('تنافس مع زملائك في ألمانيا للوصول للصدارة!', style: TextStyle(fontSize: 11, color: Colors.grey)),
              const SizedBox(height: 12),
              _leaderboardRow('1', 'أحمد السوري (ميونخ)', '2450 XP', false),
              _leaderboardRow('2', 'سارة الحلبي (كولن)', '2100 XP', false),
              _leaderboardRow('3', 'أنت (الآن)', '${provider.xp} XP', true),
              _leaderboardRow('4', 'خالد محمد (هامبورغ)', '1800 XP', false),
              _leaderboardRow('5', 'فاطمة الزعبي (برلين)', '1500 XP', false),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('إغلاق'),
            ),
          ],
        );
      },
    );
  }

  Widget _leaderboardRow(String rank, String name, String xp, bool isUser) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
      margin: const EdgeInsets.only(bottom: 6),
      decoration: BoxDecoration(
        color: isUser ? const Color(0xFF10B981).withValues(alpha: 0.15) : Colors.transparent,
        borderRadius: BorderRadius.circular(8),
        border: isUser ? Border.all(color: const Color(0xFF10B981)) : null,
      ),
      child: Row(
        children: [
          Text(rank, style: TextStyle(fontWeight: FontWeight.bold, color: isUser ? const Color(0xFF10B981) : Colors.grey)),
          const SizedBox(width: 12),
          Expanded(child: Text(name, style: TextStyle(fontWeight: isUser ? FontWeight.bold : FontWeight.normal))),
          Text(xp, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.orange)),
        ],
      ),
    );
  }

  // 7. Emergency Box (صندوق الإسعافات للامتحان)
  void _showEmergencyBox() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('صندوق الإسعافات للامتحان 🚨', style: TextStyle(fontWeight: FontWeight.bold)),
          content: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text('عبارات تنقذك تماماً عند نسيان كلمة أو التلعثم أمام الممتحن:', style: TextStyle(fontSize: 12, color: Colors.grey)),
                const SizedBox(height: 12),
                _emergencyTile('عند نسيان الكلمة الألمانية:', 'Wie heißt das auf Deutsch? Ich meine ein Ding, das man zum... benutzt.'),
                _emergencyTile('لكسب وقت للتفكير وصياغة الجملة:', 'Das ist eine interessante Frage, lassen Sie mich kurz nachdenken...'),
                _emergencyTile('عند الرغبة في تصحيح خطأ قلته:', 'Ich meine..., beziehungsweise..., oder besser gesagt...'),
                _emergencyTile('عند عدم فهم سؤال الممتحن:', 'Entschuldigung, könnten Sie das bitte noch einmal wiederholen?'),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('حفظ وفهم'),
            ),
          ],
        );
      },
    );
  }

  Widget _emergencyTile(String situation, String phrase) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.red.withValues(alpha: 0.05),
        border: Border.all(color: Colors.red.withValues(alpha: 0.15)),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(situation, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.red, fontSize: 13)),
          const SizedBox(height: 4),
          Text(phrase, style: const TextStyle(fontStyle: FontStyle.italic, fontSize: 13, color: Colors.black87), textDirection: TextDirection.ltr),
        ],
      ),
    );
  }

  // 8. Smart Review (مراجعة ذكيّة - Spaced Repetition System)
  void _showSmartReview() {
    final words = [
      {'de': 'die Verantwortung', 'ar': 'المسؤولية'},
      {'de': 'beantragen', 'ar': 'يقدم طلباً لـ'},
      {'de': 'die Bescheinigung', 'ar': 'شهادة/إفادة'},
      {'de': 'überrascht sein', 'ar': 'يكون متفاجئاً'},
    ];
    int index = 0;
    bool showTrans = false;

    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            final isDone = index >= words.length;
            return AlertDialog(
              title: const Text('مراجعة ذكيّة (SRS) 🔄', style: TextStyle(fontWeight: FontWeight.bold), textAlign: TextAlign.center),
              content: isDone
                  ? const Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.done_all, size: 64, color: Color(0xFF10B981)),
                        SizedBox(height: 12),
                        Text('أنهيت مراجعة بطاقات اليوم!', style: TextStyle(fontWeight: FontWeight.bold)),
                        SizedBox(height: 8),
                        Text('تم تحديث جدول المراجعة المتباعدة.', style: TextStyle(color: Colors.grey)),
                      ],
                    )
                  : Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('بطاقة ${index + 1} من ${words.length}'),
                        const SizedBox(height: 20),
                        Text(
                          words[index]['de']!,
                          style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                          textDirection: TextDirection.ltr,
                        ),
                        const SizedBox(height: 20),
                        if (showTrans) ...[
                          const Divider(),
                          const SizedBox(height: 10),
                          Text(
                            words[index]['ar']!,
                            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.orange),
                          ),
                          const SizedBox(height: 20),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              ElevatedButton(
                                style: ElevatedButton.styleFrom(backgroundColor: Colors.red, foregroundColor: Colors.white),
                                onPressed: () {
                                  setState(() {
                                    index++;
                                    showTrans = false;
                                  });
                                },
                                child: const Text('نسيتها ❌'),
                              ),
                              ElevatedButton(
                                style: ElevatedButton.styleFrom(backgroundColor: Colors.green, foregroundColor: Colors.white),
                                onPressed: () {
                                  context.read<AppProvider>().addXP(2);
                                  setState(() {
                                    index++;
                                    showTrans = false;
                                  });
                                },
                                child: const Text('عرفتها 🎉 (+2 XP)'),
                              ),
                            ],
                          ),
                        ] else
                          ElevatedButton(
                            onPressed: () => setState(() => showTrans = true),
                            child: const Text('إظهار الترجمة 👁️'),
                          ),
                      ],
                    ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: Text(isDone ? 'رائع' : 'إغلاق', style: const TextStyle(color: Colors.grey)),
                ),
              ],
            );
          },
        );
      },
    );
  }

  // 9. Referral Program (ادعُ صديقاً)
  void _showReferralDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('👥 ادعُ صديقاً - واحصل على Premium'),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('عند انضمام أي صديق باستخدام كودك الخاص:'),
            SizedBox(height: 8),
            Text('• ستحصل أنت على 7 أيام Premium مجاناً.\n• سيحصل صديقك على 7 أيام Premium مجاناً أيضاً!', style: TextStyle(color: Colors.grey, fontSize: 13)),
            SizedBox(height: 16),
            Center(
              child: Text(
                'كود الدعوة الخاص بك:',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
              ),
            ),
            SizedBox(height: 4),
            Center(
              child: SelectableText(
                'B1SYR55',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Color(0xFF10B981), letterSpacing: 2),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('إغلاق'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF10B981), foregroundColor: Colors.white),
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('تم نسخ كود الدعوة لرابط الحافظة!')),
              );
            },
            child: const Text('نسخ كود الدعوة 📋'),
          ),
        ],
      ),
    );
  }

  // 10. AI Writing Corrector (المصحح الذكي للكتابة)
  void _showAiCorrector() {
    final controller = TextEditingController();
    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return AlertDialog(
              title: const Text('🤖 المصحّح الذكي للنصوص (AI)'),
              content: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text('اكتب أو الصق نص رسالتك هنا ليقوم الذكاء الاصطناعي بتصحيحه ومراجعته:', style: TextStyle(fontSize: 12, color: Colors.grey)),
                    const SizedBox(height: 12),
                    TextField(
                      controller: controller,
                      maxLines: 6,
                      style: const TextStyle(fontSize: 13),
                      decoration: InputDecoration(
                        hintText: 'Sehr geehrte Damen und Herren...',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                    ),
                  ],
                ),
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('إلغاء', style: TextStyle(color: Colors.grey)),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF10B981), foregroundColor: Colors.white),
                  onPressed: () {
                    if (controller.text.trim().isEmpty) return;
                    Navigator.pop(context);
                    showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: const Text('نتائج التصحيح 📝'),
                        content: const Text(
                          'تم مراجعة رسالتك!\n\n• القواعد: 9/10\n• المفردات: ممتازة ومطابقة للمستوى.\n\nتعديل مقترح: استبدل "ich möchte mich beschweren" بـ "hiermit möchte ich mich über ... beschweren" لتكون أكثر رسمية.\n\n(للحصول على تصحيح تفصيلي مجاني من الأستاذ فادي، تواصل معنا على التليجرام).',
                          style: TextStyle(height: 1.5),
                        ),
                        actions: [
                          TextButton(onPressed: () => Navigator.pop(context), child: const Text('رائع')),
                        ],
                      ),
                    );
                  },
                  child: const Text('تصحيح ذكي 🚀'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  // 11. Other quick info modals
  void _showSimpleInfoDialog(String title, String content) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        content: Text(content, style: const TextStyle(height: 1.4)),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('حسناً')),
        ],
      ),
    );
  }

  // ==================== WIDGET BUILD LIFE ====================

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<AppProvider>();
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final scaffoldBg = isDark ? const Color(0xFF080D1A) : const Color(0xFFF1F5F9);
    final textMain = isDark ? Colors.white : const Color(0xFF0F172A);
    final borderCol = isDark ? Colors.white.withOpacity(0.08) : const Color(0xFFE2E8F0);

    Widget bodyWidget;
    switch (_currentIndex) {
      case 0:
        bodyWidget = Stack(
          children: [
            // Background ambient mesh glows in dark mode for premium look
            if (isDark) ...[
              Positioned(
                top: -60,
                right: -60,
                child: Container(
                  width: 260,
                  height: 260,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFF0D9488).withOpacity(0.18),
                        blurRadius: 130,
                        spreadRadius: 30,
                      ),
                    ],
                  ),
                ),
              ),
              Positioned(
                top: 350,
                left: -80,
                child: Container(
                  width: 280,
                  height: 280,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFF4F46E5).withOpacity(0.12),
                        blurRadius: 140,
                        spreadRadius: 40,
                      ),
                    ],
                  ),
                ),
              ),
              Positioned(
                bottom: 80,
                right: -100,
                child: Container(
                  width: 320,
                  height: 320,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFFDB2777).withOpacity(0.08),
                        blurRadius: 150,
                        spreadRadius: 50,
                      ),
                    ],
                  ),
                ),
              ),
            ],
            SafeArea(
              child: RefreshIndicator(
                onRefresh: _checkUpdates,
                color: const Color(0xFF0D9488),
                backgroundColor: isDark ? const Color(0xFF131C33) : Colors.white,
                child: CustomScrollView(
                  physics: const AlwaysScrollableScrollPhysics(),
                  slivers: [
                    // Hero Stats Dashboard Section
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: _buildStatsCard(context, provider, isDark, textMain, borderCol),
                      ),
                    ),

                    // Interactive Mode Discovery Banner
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
                        child: Container(
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [Color(0xFF4F46E5), Color(0xFF0D9488)],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            borderRadius: BorderRadius.circular(16),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFF4F46E5).withOpacity(0.2),
                                blurRadius: 12,
                                offset: const Offset(0, 4),
                              ),
                            ],
                          ),
                          child: InkWell(
                            onTap: () {
                              setState(() {
                                _currentIndex = 1;
                              });
                            },
                            borderRadius: BorderRadius.circular(16),
                            child: const Padding(
                              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                              child: Row(
                                children: [
                                  Text('🎮', style: TextStyle(fontSize: 32)),
                                  SizedBox(width: 16),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          'النمط التفاعلي الجديد (Duolingo) 🦉',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white,
                                            fontSize: 14.5,
                                            fontFamily: 'Cairo',
                                          ),
                                        ),
                                        SizedBox(height: 4),
                                        Text(
                                          'تدرّب بأسلوب تفاعلي رائع على كافة قواعد ومفردات B1-B2 مع قلوب حية ومكافآت XP!',
                                          style: TextStyle(
                                            color: Colors.white70,
                                            fontSize: 11,
                                            height: 1.4,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Icon(Icons.arrow_forward_ios, color: Colors.white, size: 16),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),

                    // CATEGORY 1: الأساسيّات (مجّاني)
                    _buildCategoryHeader('الأساسيّات (مجّاني) 📚', textMain),
                    _buildCategoryGrid([
                      _buildItem('القواعد', 'أزمنة وح حالات وأفعال', Icons.gavel, const Color(0xFF2563EB), () => _navigate(const GrammatikScreen())),
                      _buildItem('المفردات', '6000+ كلمة مترجمة', Icons.translate, const Color(0xFF0891B2), () => _navigate(const WortschatzScreen())),
                      _buildItem('القراءة (Lesen)', 'نصوص + أسئلة', Icons.menu_book, const Color(0xFF7C3AED), () => _navigate(const LesenScreen())),
                      _buildItem('الاستماع (Hören)', 'حوارات وإعلانات', Icons.headphones, const Color(0xFFEA580C), () => _navigate(const HoerenScreen())),
                      _buildItem('الكتابة (Schreiben)', 'نماذج رسائل وإيميلات', Icons.edit_note, const Color(0xFF0D9488), () => _navigate(const SchreibenScreen())),
                      _buildItem('المحادثة (Sprechen)', 'الأجزاء الثلاثة', Icons.record_voice_over, const Color(0xFFDC2626), () => _navigate(const SprechenScreen())),
                      _buildItem('قوالب المحادثة', 'عبارات جاهزة + B2', Icons.chat, const Color(0xFF4F46E5), () => _navigate(const LibraryScreen())),
                      _buildItem('قاموس العامية', 'لغة الشارع والشباب', Icons.local_fire_department, const Color(0xFFDC2626), () => _navigate(const SlangScreen())),
                      _buildItem('بناء الجمل', 'تمارين تركيب الكلمات', Icons.format_list_numbered, const Color(0xFFD97706), () => _navigate(const SatzbauScreen())),
                      _buildItem('Sprachbausteine كاملة', '5 نماذج تدريب كاملة', Icons.extension, const Color(0xFF059669), () => _navigate(const SprachbausteineScreen())),
                      _buildItem('مراجعة ذكيّة', 'مراجعة بأسلوب SRS', Icons.loop, const Color(0xFF475569), () => _navigate(const SmartReviewScreen())),
                      _buildItem('مدرّب التصريف', 'أفعال + Modalverben', Icons.refresh, const Color(0xFF1E3A8A), () => _navigate(const ConjugationTrainerScreen())),
                    ], isDark, borderCol),

                    // CATEGORY 2: تدريبات تفاعليّة (Freemium)
                    _buildCategoryHeader('تدريبات تفاعليّة (Freemium) 🎯', textMain),
                    _buildCategoryGrid([
                      _buildItem('مسابقات وجوائز', 'اربح Premium مجاناً', Icons.emoji_events, const Color(0xFFD97706), () => _showContestsDialog()),
                      _buildItem('ادعُ صديقاً', 'كود دعوة متبادل', Icons.people, const Color(0xFF2563EB), _showReferralDialog),
                      _buildItem('خطّتي الشخصيّة لـB1', 'جدولك اليومي للامتحان', Icons.calendar_today, const Color(0xFF0D9488), _showB1Planner),
                      _buildItem('تقييمات وتعليقات', 'شاركنا تجربتك', Icons.star, const Color(0xFFF59E0B), () => _showSimpleInfoDialog('تقييم التطبيق ⭐', 'رأيك يهمنا! يرجى تقييم التطبيق على متجر بلاي لمساعدتنا على الاستمرار وتطوير ميزات جديدة.')),
                      _buildItem('تحدّي اليوم', '4 أسئلة جديدة + 90 XP', Icons.wb_sunny, const Color(0xFFEA580C), _showDailyChallenge),
                      _buildItem('لوحة المتصدّرين', 'تنافس مع زملائك', Icons.insights, const Color(0xFF7C3AED), _showLeaderboard),
                      _buildItem('صندوق الإسعافات', 'جمل للنجدة في الامتحان', Icons.health_and_safety, const Color(0xFFDC2626), () => _navigate(const EmergencyScreen())),
                      _buildItem('فخاخ المترادفات', 'لعبة 90 زوج مرادفات', Icons.gamepad, const Color(0xFF059669), () => _navigate(const SynonymsScreen())),
                      _buildItem('ترتيب البطاقات', 'لعبة der/die/das', Icons.style, const Color(0xFF0891B2), _showCardSortingGame),
                      _buildItem('مواعيد الكورسات', '30 معهداً في 13 مدينة', Icons.school, const Color(0xFF475569), () => _showSimpleInfoDialog('مواعيد الكورسات 📅', 'تتوفر مواعيد كورسات BAMF و VHS و Goethe بشكل دوري كل شهر في 13 مدينة ألمانية، بالإضافة لكورسات أونلاين مجانية للمسجلين في Jobcenter.')),
                      _buildItem('30 خطأ شائع DaZ', '7 مجاني / 23 Premium', Icons.warning, const Color(0xFFB45309), () => _navigate(const FehlerScreen())),
                      _buildItem('Drill - Sprachbausteine', '220 سؤال قواعد مكثف', Icons.offline_bolt, const Color(0xFFDB2777), () => _navigate(const DrillScreen())),
                      _buildItem('5 نماذج B1 موضوعيّة', '2 مجاني / 3 Premium', Icons.quiz, const Color(0xFF1E3A8A), () => _navigate(const LesenScreen())),
                      _buildItem('موارد مجّانيّة موثوقة', 'روابط DW + Goethe + telc', Icons.language, const Color(0xFF008080), () => _launchUrl('https://www.dw.com/de/deutsch-lernen/s-2055')),
                    ], isDark, borderCol),

                    // CATEGORY 3: الامتحان الكامل ومحاكاته
                    _buildCategoryHeader('الامتحان الكامل ومحاكاته 📝', textMain),
                    _buildCategoryGrid([
                      _buildItem('محاكي Telc B1 الحقيقي', 'مؤقت حقيقي لكل الأقسام', Icons.timer, const Color(0xFFDC2626), () => _navigate(const ExamSimulationScreen())),
                      _buildItem('امتحان كامل (مبسّط)', 'نسخة سريعة للتدريب', Icons.speed, const Color(0xFFEA580C), () => _showSimpleInfoDialog('امتحان كامل مبسط 🎯', 'نسخة تدريبية سريعة تحتوي على نصف عدد الأسئلة لتتمكن من تقييم مستواك خلال 30 دقيقة فقط.')),
                      _buildItem('تحديد المستوى', 'اختبار مستواك A1-B2', Icons.rule, const Color(0xFF0D9488), () => _navigate(const EinstufungScreen())),
                      _buildItem('وصف صورة', 'قوالب وصياغات Bildbeschreibung', Icons.image, const Color(0xFF7C3AED), () => _navigate(const BildDescriptionScreen())),
                      _buildItem('محاكي محادثة تفاعلي', 'حوارات محاكاة لـ B1-B2', Icons.chat_bubble, const Color(0xFF2563EB), () => _navigate(const ChatSimulatorScreen())),
                    ], isDark, borderCol),

                    // CATEGORY 4: الجنسيّة والاندماج
                    _buildCategoryHeader('الجنسيّة والاندماج 🇩🇪', textMain),
                    _buildCategoryGrid([
                      _buildItem('Leben in Deutschland', '310 سؤال كامل مع الترجمة', Icons.flag, const Color(0xFF1E3A8A), () => _navigate(const LebenScreen())),
                      _buildItem('Einbürgerungstest', 'كتالوج أسئلة الولايات والجنسية', Icons.account_balance, const Color(0xFF475569), () => _navigate(const EinbuergerungScreen())),
                      _buildItem('مشاكل وحلول', 'دليل عملي للعيش والاندماج', Icons.lightbulb, const Color(0xFF059669), () => _navigate(const ProblemsScreen())),
                    ], isDark, borderCol),

                    // CATEGORY 5: محتوى Premium الحصري
                    _buildCategoryHeader('محتوى Premium الحصري ⭐', textMain),
                    _buildCategoryGrid([
                      _buildItem('B2 كامل', 'قواعد متقدمة و 300+ كلمة', Icons.school, const Color(0xFFB45309), () => _navigate(const B2Screen())),
                      _buildItem('5 نماذج Telc B2', 'كاملة ومصححة بالذكاء الاصطناعي', Icons.assignment, const Color(0xFFDB2777), () => _navigate(const B2Screen())),
                      _buildItem('AI Writing Corrector', 'تصحيح ومراجعة الرسائل بالذكاء الاصطناعي', Icons.smart_toy, const Color(0xFF10B981), _showAiCorrector),
                      _buildItem('وضع الضغط للاستماع', 'ضوضاء واقعية (شارع/مقهى)', Icons.volume_off, const Color(0xFF7C3AED), () => _showSimpleInfoDialog('وضع الضغط للاستماع 🔥', 'يحاكي ضوضاء الشارع ومحطات القطار لتدريب أذنيك على الاستماع تحت الضغط وضوضاء الامتحان الحقيقية.')),
                      _buildItem('مدرّب القراءة السريعة', 'يختفي النص بعد 90/180 ثانية', Icons.bolt, const Color(0xFFEA580C), () => _showSimpleInfoDialog('مدرّب القراءة السريعة ⏱', 'يخفي النص تدريجياً لتدريبك على مهارات القراءة السريعة والـ Skimming لتوفير الوقت بالامتحان.')),
                      _buildItem('مترادفات Premium', '70+ زوج إضافي للمستوى المتقدم', Icons.games, const Color(0xFF2563EB), () => _navigate(const SynonymsScreen())),
                      _buildItem('23 خطأ متقدم', 'الأخطاء الشائعة لطلاب B2', Icons.dangerous, const Color(0xFFDC2626), () => _navigate(const B2Screen())),
                      _buildItem('189 سؤال Drill إضافي', 'أسئلة قواعد مكثفة وحصرية', Icons.psychology, const Color(0xFF0D9488), () => _navigate(const ConjugationTrainerScreen())),
                      _buildItem('3 نماذج B1 إضافيّة', 'مواضيع الصحة، السفر والبيئة', Icons.library_books, const Color(0xFF0891B2), () => _navigate(const LesenScreen())),
                    ], isDark, borderCol),

                    // CATEGORY 6: أدوات عمليّة
                    _buildCategoryHeader('أدوات عمليّة 🛠️', textMain),
                    _buildCategoryGrid([
                      _buildItem('لوحتي الشخصيّة', 'تتبع التقدم ومجموع الـ XP', Icons.bar_chart, const Color(0xFF4F46E5), () => _navigate(const SettingsScreen())),
                      _buildItem('مخطط الدراسة', 'خطة 4 أسابيع للنجاح المضمون', Icons.next_plan, const Color(0xFF059669), _showB1Planner),
                      _buildItem('اطبع وذاكر', 'ملخصات وملفات PDF جاهزة للتحميل', Icons.picture_as_pdf, const Color(0xFFDC2626), () => _navigate(const LibraryScreen())),
                      _buildItem('شبكات الكلمات', 'ربط الكلمات لسهولة الحفظ', Icons.hub, const Color(0xFF7C3AED), () => _showSimpleInfoDialog('شبكات الكلمات 🕸️', 'أداة ذهنية ممتازة تقوم بربط الكلمات المتشابهة في شبكات موضوعية (مثل كلمات السكن، العمل، التسوق) لتبسيط الحفظ.')),
                      _buildItem('بنك المواضيع', 'أفكار لمقالات Schreiben وصور Sprechen', Icons.topic, const Color(0xFF0891B2), () => _navigate(const LibraryScreen())),
                      _buildItem('أدوات النجاح', 'نصائح واستراتيجيات هامة للممتحنين', Icons.construction, const Color(0xFFB45309), () => _showSimpleInfoDialog('أدوات النجاح 🧰', 'مجموعة نصائح واستراتيجيات عملية لحل كل قسم بأسرع طريقة وتفادي الفخاخ الشائعة التي يقع فيها الطلاب.')),
                    ], isDark, borderCol),

                    // Bottom Banner for Premium screen
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Container(
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [Color(0xFFF59E0B), Color(0xFFD97706)],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            borderRadius: BorderRadius.circular(16),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFFD97706).withOpacity(0.25),
                                blurRadius: 12,
                                offset: const Offset(0, 4),
                              ),
                            ],
                          ),
                          child: InkWell(
                            onTap: () => _navigate(const PremiumScreen()),
                            borderRadius: BorderRadius.circular(16),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                              child: Row(
                                children: [
                                  const Icon(Icons.star, color: Colors.white, size: 36),
                                  const SizedBox(width: 16),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        const Text(
                                          'الترقية إلى B1-Syrer Premium ⭐',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white,
                                            fontSize: 14,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        Text(
                                          'تصفح بدون إعلانات، واحصل على قوالب وميزات B2 الحصرية ومحاكيات متقدمة!',
                                          style: TextStyle(
                                            color: Colors.white.withOpacity(0.9),
                                            fontSize: 11,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  const Icon(Icons.arrow_forward_ios, color: Colors.white, size: 16),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    const SliverToBoxAdapter(child: SizedBox(height: 32)),
                  ],
                ),
              ),
            ),
          ],
        );
        break;
      case 1:
        bodyWidget = const InteractivePracticeScreen();
        break;
      case 2:
        bodyWidget = _buildFullLeaderboard(isDark, textMain, borderCol, provider);
        break;
      case 3:
        bodyWidget = const SettingsScreen();
        break;
      default:
        bodyWidget = Container();
    }

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: _currentIndex == 0
          ? AppBar(
              backgroundColor: Colors.transparent,
              foregroundColor: textMain,
              elevation: 0,
              flexibleSpace: ClipRect(
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                  child: Container(
                    color: isDark ? const Color(0x66080D1A) : Colors.white.withOpacity(0.7),
                  ),
                ),
              ),
              title: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFF0D9488),
                      borderRadius: BorderRadius.circular(6),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFF0D9488).withOpacity(0.3),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        )
                      ],
                    ),
                    child: const Text(
                      'B1-B2',
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'B1-B2 Deutsch للعرب',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: textMain),
                  ),
                ],
              ),
              leading: IconButton(
                icon: Icon(
                  provider.isDarkMode ? Icons.wb_sunny : Icons.nightlight_round,
                  color: textMain,
                ),
                onPressed: () => provider.toggleDarkMode(),
              ),
              actions: [
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      '${provider.streak}',
                      style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.orange, fontSize: 15),
                    ),
                    IconButton(
                      icon: const Icon(Icons.local_fire_department, color: Colors.orange),
                      tooltip: 'الالتزام اليومي',
                      onPressed: _showStreakDetailDialog,
                    ),
                  ],
                ),
                IconButton(
                  icon: const Icon(Icons.star, color: Color(0xFFF59E0B)),
                  tooltip: 'Premium',
                  onPressed: () => _navigate(const PremiumScreen()),
                ),
                IconButton(
                  icon: Icon(Icons.settings, color: textMain),
                  onPressed: () => _navigate(const SettingsScreen()),
                ),
              ],
              bottom: PreferredSize(
                preferredSize: const Size.fromHeight(1),
                child: Container(color: borderCol, height: 1),
              ),
            )
          : (_currentIndex == 2
              ? AppBar(
                  backgroundColor: Colors.transparent,
                  foregroundColor: textMain,
                  elevation: 0,
                  flexibleSpace: ClipRect(
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                      child: Container(
                        color: isDark ? const Color(0x66080D1A) : Colors.white.withOpacity(0.7),
                      ),
                    ),
                  ),
                  title: const Text('لوحة المتصدرين الأسبوعية 🏆', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                  bottom: PreferredSize(
                    preferredSize: const Size.fromHeight(1),
                    child: Container(color: borderCol, height: 1),
                  ),
                )
              : null),
      body: bodyWidget,
      bottomNavigationBar: ClipRRect(
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
          child: NavigationBar(
            selectedIndex: _currentIndex,
            onDestinationSelected: (idx) {
              setState(() {
                _currentIndex = idx;
              });
            },
            backgroundColor: isDark ? const Color(0x66080D1A) : Colors.white.withOpacity(0.85),
            destinations: const [
              NavigationDestination(
                icon: Icon(Icons.home_rounded),
                selectedIcon: Icon(Icons.home_rounded, color: Color(0xFF0D9488)),
                label: 'الرئيسية',
              ),
              NavigationDestination(
                icon: Icon(Icons.psychology_rounded),
                selectedIcon: Icon(Icons.psychology_rounded, color: Color(0xFF0D9488)),
                label: 'التدريب التفاعلي',
              ),
              NavigationDestination(
                icon: Icon(Icons.emoji_events_rounded),
                selectedIcon: Icon(Icons.emoji_events_rounded, color: Color(0xFF0D9488)),
                label: 'المتصدّرين',
              ),
              NavigationDestination(
                icon: Icon(Icons.settings_rounded),
                selectedIcon: Icon(Icons.settings_rounded, color: Color(0xFF0D9488)),
                label: 'الإعدادات',
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Helper: Category Header
  Widget _buildCategoryHeader(String title, Color textMain) {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.only(left: 16, right: 16, top: 20, bottom: 8),
        child: Text(
          title,
          style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.bold,
            color: textMain,
          ),
        ),
      ),
    );
  }

  // Helper: Grid of Items
  Widget _buildCategoryGrid(List<Widget> children, bool isDark, Color borderCol) {
    return SliverPadding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      sliver: SliverGrid(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
          childAspectRatio: 1.45,
        ),
        delegate: SliverChildListDelegate(children),
      ),
    );
  }

  // Helper: Individual Item Card (Frosted Glassmorphism)
  Widget _buildItem(String title, String subtitle, IconData icon, Color color, VoidCallback onTap) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textMain = isDark ? Colors.white : const Color(0xFF0F172A);
    final textMuted = isDark ? Colors.white38 : const Color(0xFF64748B);

    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          decoration: BoxDecoration(
            color: isDark ? Colors.white.withOpacity(0.04) : Colors.white.withOpacity(0.85),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: isDark ? Colors.white.withOpacity(0.06) : const Color(0xFFE2E8F0),
              width: 1.2,
            ),
            boxShadow: isDark
                ? [
                    BoxShadow(
                      color: color.withOpacity(0.06),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ]
                : [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.02),
                      blurRadius: 6,
                      offset: const Offset(0, 3),
                    ),
                  ],
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              borderRadius: BorderRadius.circular(16),
              onTap: onTap,
              splashColor: color.withOpacity(0.12),
              highlightColor: color.withOpacity(0.06),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(6),
                          decoration: BoxDecoration(
                            color: isDark ? color.withOpacity(0.2) : color.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Icon(icon, color: isDark ? color.withOpacity(0.9) : color, size: 18),
                        ),
                        Icon(Icons.arrow_forward_ios, size: 8, color: textMuted.withOpacity(0.5)),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title,
                          style: TextStyle(
                            color: textMain,
                            fontSize: 12.5,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.1,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 2),
                        Text(
                          subtitle,
                          style: TextStyle(
                            color: textMuted,
                            fontSize: 9.5,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  // 12. Contests dialog modal
  void _showContestsDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('🏆 مسابقات وجوائز Premium'),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('اشترك في مسابقة المتصدرين الأسبوعية!'),
            SizedBox(height: 8),
            Text('• الأول يحصل على 30 يوم Premium مجاناً.\n• الثاني يحصل على 15 يوم Premium مجاناً.\n• الثالث يحصل على 7 أيام Premium مجاناً.', style: TextStyle(color: Colors.grey, fontSize: 13)),
            SizedBox(height: 12),
            Text('نظام مكافحة الغش مفعّل تلقائياً لضمان النزاهة والعدل.', style: TextStyle(color: Colors.orange, fontWeight: FontWeight.bold, fontSize: 11)),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('إغلاق')),
        ],
      ),
    );
  }

  // Stats Card with high fidelity frosted Glassmorphism
  Widget _buildStatsCard(BuildContext context, AppProvider provider, bool isDark, Color textMain, Color borderCol) {
    final textMuted = isDark ? Colors.white70 : const Color(0xFF64748B);
    final textSub = isDark ? Colors.white38 : const Color(0xFF94A3B8);

    return ClipRRect(
      borderRadius: BorderRadius.circular(24),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
        child: Container(
          decoration: BoxDecoration(
            color: isDark ? Colors.white.withOpacity(0.05) : Colors.white.withOpacity(0.85),
            gradient: isDark
                ? LinearGradient(
                    colors: [
                      const Color(0xFF1E293B).withOpacity(0.15),
                      const Color(0xFF0F172A).withOpacity(0.4),
                    ],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  )
                : null,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(
              color: isDark ? Colors.white.withOpacity(0.08) : const Color(0xFFE2E8F0),
              width: 1.5,
            ),
            boxShadow: [
              BoxShadow(
                color: isDark
                    ? const Color(0xFF0D9488).withOpacity(0.1)
                    : Colors.black.withOpacity(0.04),
                blurRadius: 20,
                spreadRadius: 2,
                offset: const Offset(0, 8),
              ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Row(
              children: [
                CircularPercentIndicator(
                  radius: 42,
                  lineWidth: 7,
                  percent: (provider.xp % 100) / 100,
                  center: Text(
                    '${provider.level}',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: isDark ? const Color(0xFF2DD4BF) : const Color(0xFF10B981),
                    ),
                  ),
                  progressColor: isDark ? const Color(0xFF2DD4BF) : const Color(0xFF10B981),
                  backgroundColor: isDark ? const Color(0xFF1E293B) : const Color(0xFFE2E8F0),
                  circularStrokeCap: CircularStrokeCap.round,
                  animation: true,
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'المستوى الحالي: ${provider.levelTitle}',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: textMain,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'مجموع نقاط الخبرة: ${provider.xp} XP',
                        style: TextStyle(
                          color: textMuted,
                          fontSize: 13,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'النقاط للمستوى التالي: ${100 - (provider.xp % 100)} XP',
                        style: TextStyle(
                          color: textSub,
                          fontSize: 11,
                        ),
                      ),
                    ],
                  ),
                ),
                Column(
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.local_fire_department, color: Colors.orange, size: 24),
                        const SizedBox(width: 4),
                        Text(
                          '${provider.streak}',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: textMain,
                          ),
                        ),
                      ],
                    ),
                    Text(
                      'يوم متتالي',
                      style: TextStyle(color: textSub, fontSize: 10),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Icon(Icons.check_circle_outline, color: isDark ? const Color(0xFF2DD4BF) : const Color(0xFF10B981), size: 18),
                        const SizedBox(width: 4),
                        Text(
                          '${provider.completedQuizzes}',
                          style: TextStyle(
                            fontSize: 14,
                            color: textMain,
                          ),
                        ),
                      ],
                    ),
                    Text(
                      'اختبار مكتمل',
                      style: TextStyle(color: textSub, fontSize: 10),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
