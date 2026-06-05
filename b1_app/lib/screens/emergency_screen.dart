import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_tts/flutter_tts.dart';
import '../data/extras_data.dart';

class EmergencyScreen extends StatefulWidget {
  const EmergencyScreen({super.key});

  @override
  State<EmergencyScreen> createState() => _EmergencyScreenState();
}

class _EmergencyScreenState extends State<EmergencyScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final FlutterTts _flutterTts = FlutterTts();
  bool _isPlaying = false;
  String? _playingId;

  // Custom everyday emergency phrases
  final List<Map<String, dynamic>> _everydayEmergencies = [
    {
      'id': 'ee-med1',
      'de': 'Rufen Sie einen Krankenwagen, bitte!',
      'ar': 'اتصل بسيارة إسعاف من فضلك!',
      'pronunciation': 'رووفن زي آينن كرانكن-فاغن بيته',
      'context': 'طوارئ طبية'
    },
    {
      'id': 'ee-med2',
      'de': 'Ich habe starke Schmerzen in der Brust.',
      'ar': 'عندي آلام شديدة في الصدر.',
      'pronunciation': 'إش هابه شتاركه شمرتسن إن دير بروست',
      'context': 'طوارئ طبية'
    },
    {
      'id': 'ee-police1',
      'de': 'Rufen Sie die Polizei, es gab einen Unfall!',
      'ar': 'اتصل بالشرطة، حدث حادث!',
      'pronunciation': 'رووفن زي دي بوليتساي، إس غاب آينن أون-فال',
      'context': 'شرطة وحوادث'
    },
    {
      'id': 'ee-police2',
      'de': 'Jemand hat meine Brieftasche gestohlen.',
      'ar': 'شخص ما سرق محفظتي.',
      'pronunciation': 'يماند هات ماينِه بريف-تاشه غشتولن',
      'context': 'شرطة وسرقة'
    },
    {
      'id': 'ee-fire1',
      'de': 'Es brennt! Rufen Sie die Feuerwehr!',
      'ar': 'حريق! اتصل بالإطفاء!',
      'pronunciation': 'إس برِنت! رووفن زي دي فوير-فير',
      'context': 'حريق'
    },
    {
      'id': 'ee-land1',
      'de': 'Es gibt einen Wasserschaden in meiner Wohnung.',
      'ar': 'هناك تسرب مياه (ضرر مياه) في شقتي.',
      'pronunciation': 'إس غيبت آينن فاسر-شادن إن ماينر فونونغ',
      'context': 'مع المؤجر'
    },
    {
      'id': 'ee-land2',
      'de': 'Die Heizung funktioniert seit zwei Tagen nicht.',
      'ar': 'التدفئة لا تعمل منذ يومين.',
      'pronunciation': 'دي هايتسونغ فونكتيونيرت زايت تسفاي تاغن نِشت',
      'context': 'مع المؤجر / الشتاء'
    },
  ];

  @override
  void initState() {
    super.initState();
    // 5 tabs from communicationStrategies + 1 for everyday emergencies = 6 tabs total
    _tabController = TabController(length: communicationStrategies.length + 1, vsync: this);
    _initTts();
  }

  void _initTts() async {
    await _flutterTts.setLanguage('de-DE');
    await _flutterTts.setSpeechRate(0.4); // slightly slower for learners
    await _flutterTts.setVolume(1.0);
    
    _flutterTts.setStartHandler(() {
      setState(() {
        _isPlaying = true;
      });
    });

    _flutterTts.setCompletionHandler(() {
      setState(() {
        _isPlaying = false;
        _playingId = null;
      });
    });

    _flutterTts.setErrorHandler((msg) {
      setState(() {
        _isPlaying = false;
        _playingId = null;
      });
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    _flutterTts.stop();
    super.dispose();
  }

  Future<void> _speak(String text, String id) async {
    if (_isPlaying && _playingId == id) {
      await _flutterTts.stop();
      setState(() {
        _isPlaying = false;
        _playingId = null;
      });
    } else {
      await _flutterTts.stop();
      setState(() {
        _playingId = id;
      });
      await _flutterTts.speak(text);
    }
  }

  void _copyToClipboard(String text) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('تم نسخ العبارة الألمانية للحافظة! 📋'),
        duration: Duration(milliseconds: 800),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scaffoldBg = isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC);
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final barBg = isDark ? const Color(0xFF1E293B) : Colors.white;

    // Build Tab headers dynamically
    final List<Tab> tabs = communicationStrategies.map((cat) {
      return Tab(text: cat['title'] as String);
    }).toList();
    tabs.add(const Tab(text: 'طوارئ يومية 🚨'));

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: AppBar(
        title: const Text('صندوق الإسعافات والنقل 🚨', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
        backgroundColor: barBg,
        foregroundColor: textMain,
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          labelColor: const Color(0xFFDC2626),
          unselectedLabelColor: isDark ? Colors.white38 : Colors.grey,
          indicatorColor: const Color(0xFFDC2626),
          indicatorWeight: 3,
          tabs: tabs,
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          ...communicationStrategies.map((cat) {
            final phrases = List<Map<String, dynamic>>.from(cat['phrases'] as List);
            return _buildPhraseList(phrases, cat['whyItMatters'] as String?);
          }),
          _buildPhraseList(_everydayEmergencies, 'عبارات هامة جداً للتعامل مع المواقف الطارئة واليومية الصعبة في ألمانيا (الشرطة، الطبيب، الإطفاء، السكن).'),
        ],
      ),
    );
  }

  Widget _buildPhraseList(List<Map<String, dynamic>> phrases, String? explanation) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final textMuted = isDark ? Colors.white60 : const Color(0xFF64748B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        if (explanation != null) ...[
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFFDC2626).withValues(alpha: 0.05),
              border: Border.all(color: const Color(0xFFDC2626).withValues(alpha: 0.15)),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('💡', style: TextStyle(fontSize: 22)),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    explanation,
                    style: TextStyle(
                      fontSize: 13,
                      height: 1.5,
                      fontWeight: FontWeight.bold,
                      color: textMain,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
        ],
        ...phrases.map((phrase) {
          final id = phrase['id'] as String;
          final de = phrase['de'] as String;
          final ar = phrase['ar'] as String;
          final pron = phrase['pronunciation'] as String?;
          final contextText = phrase['context'] as String?;
          final isCurrentlyPlaying = _playingId == id && _isPlaying;

          return Container(
            margin: const EdgeInsets.only(bottom: 12),
            decoration: BoxDecoration(
              color: cardBg,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: borderCol, width: 1),
            ),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // German phrase
                  SelectableText(
                    de,
                    style: TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.bold,
                      color: isCurrentlyPlaying ? const Color(0xFFDC2626) : textMain,
                    ),
                    textDirection: TextDirection.ltr,
                  ),
                  const SizedBox(height: 8),
                  // Arabic translation
                  Text(
                    ar,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF10B981),
                    ),
                  ),
                  if (pron != null) ...[
                    const SizedBox(height: 4),
                    // Phonetics
                    Text(
                      'نطق تقريبي: $pron',
                      style: TextStyle(
                        fontSize: 12,
                        color: textMuted,
                        fontStyle: FontStyle.italic,
                      ),
                    ),
                  ],
                  if (contextText != null) ...[
                    const SizedBox(height: 8),
                    // Context tag
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.grey.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        'السياق: $contextText',
                        style: TextStyle(fontSize: 11, color: textMuted),
                      ),
                    ),
                  ],
                  const SizedBox(height: 12),
                  const Divider(height: 1),
                  const SizedBox(height: 8),
                  // Row of actions
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.copy, size: 20),
                        tooltip: 'نسخ',
                        onPressed: () => _copyToClipboard(de),
                      ),
                      IconButton(
                        icon: Icon(
                          isCurrentlyPlaying ? Icons.stop_circle : Icons.play_circle_fill,
                          color: isCurrentlyPlaying ? Colors.red : const Color(0xFFDC2626),
                          size: 24,
                        ),
                        tooltip: 'استماع',
                        onPressed: () => _speak(de, id),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        }),
      ],
    );
  }
}
