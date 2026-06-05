import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';

class BildDescriptionScreen extends StatefulWidget {
  const BildDescriptionScreen({super.key});

  @override
  State<BildDescriptionScreen> createState() => _BildDescriptionScreenState();
}

class _BildDescriptionScreenState extends State<BildDescriptionScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  // Mock exam topics with descriptive cards instead of raw local assets to ensure offline robustness
  final List<Map<String, dynamic>> _topics = [
    {
      'titleAr': 'العائلة والأطفال 👨‍👩‍👧‍👦',
      'titleDe': 'Familie und Kinder',
      'description': 'صورة تظهر عائلة تتناول العشاء معاً في أجواء سعيدة ودافئة.',
      'vocabulary': [
        {'de': 'gemeinsam essen', 'ar': 'يأكلون معاً'},
        {'de': 'die Atmosphäre', 'ar': 'الأجواء / الغلاف الجوي'},
        {'de': 'glücklich aussehen', 'ar': 'يبدون سعداء'},
        {'de': 'das Familienleben', 'ar': 'الحياة العائلية'}
      ],
      'intro': 'Auf dem Bild sehe ich eine glückliche Familie, die zusammen am Tisch sitzt und isst.',
      'details': 'Im Vordergrund gibt es einen großen Holztisch mit viel Essen. Im Hintergrund kann man ein gemütliches Wohnzimmer sehen. Rechts sitzt der Vater und lacht, links die Mutter mit zwei Kindern.',
      'opinion': 'Ich denke, das Thema ist die Bedeutung der Familie. Meiner Meinung nach ist das gemeinsame Essen sehr wichtig für die Kommunikation.',
      'comparison': 'In meinem Heimatland Syrien ist es auch sehr üblich, dass die ganze Familie jeden Tag zusammen isst. Das stärkt die Beziehungen.'
    },
    {
      'titleAr': 'العمل المكتبي والكمبيوتر 💻',
      'titleDe': 'Arbeit am Computer / Büro',
      'question': 'صورة تظهر أشخاصاً يعملون في مكتب حديث على أجهزة الكمبيوتر.',
      'vocabulary': [
        {'de': 'der Arbeitsplatz', 'ar': 'مكان العمل'},
        {'de': 'konzentriert arbeiten', 'ar': 'يعمل بتركيز'},
        {'de': 'die Digitalisierung', 'ar': 'الرقمنة / التطور الرقمي'},
        {'de': 'der Bildschirm', 'ar': 'الشاشة'}
      ],
      'intro': 'Das Bild zeigt ein modernes Büro, in dem mehrere Personen konzentriert an ihren Computern arbeiten.',
      'details': 'Im Vordergrund sieht man eine junge Frau, die auf ihren Bildschirm schaut und tippt. Im Hintergrund stehen andere Schreibtische und Aktenregale. Die Atmosphäre wirkt sehr professionell.',
      'opinion': 'Meiner Meinung nach hat die Arbeit im Büro sowohl Vorteile als auch Nachteile. Man kann schnell mit Kollegen kommunizieren, aber es kann auch stressig sein.',
      'comparison': 'In Syrien arbeiten viele Menschen auch im Büro, aber wir trinken während der Arbeit viel mehr Tee und Kaffee zusammen, was die Arbeit sozialer macht.'
    },
    {
      'titleAr': 'فرز النفايات وحماية البيئة ♻️',
      'titleDe': 'Mülltrennung und Umweltschutz',
      'question': 'صورة تظهر سلال نفايات ملونة مختلفة لفرز القمامة في ألمانيا.',
      'vocabulary': [
        {'de': 'die Mülltrennung', 'ar': 'فرز النفايات'},
        {'de': 'den Müll sortieren', 'ar': 'يفرز القمامة'},
        {'de': 'der Umweltschutz', 'ar': 'حماية البيئة'},
        {'de': 'die Tonne, -n', 'ar': 'حاوية القمامة'}
      ],
      'intro': 'Auf diesem Bild sieht man verschiedene farbige Mülltonnen, die nebeneinander stehen.',
      'details': 'Es gibt eine blaue Tonne für Papier, eine gelbe Tonne für Plastik und eine braune Tonne für Bioabfall. Im Hintergrund sieht man ein sauberes Wohngebiet.',
      'opinion': 'Ich finde Mülltrennung sehr sinnvoll, weil wir so die Umwelt schützen und Rohstoffe recyceln können.',
      'comparison': 'In Syrien haben wir leider keine so strenge Mülltrennung wie in Deutschland. Meistens werfen wir allen Müll in eine Tonne, aber wir sollten das in Zukunft verbessern.'
    }
  ];

  // Structure cards
  final List<Map<String, dynamic>> _structure = [
    {
      'step': '1. Einleitung (المقدمة) 🎬',
      'desc': 'ابدأ دائماً بذكر ما تراه بشكل عام في الصورة.',
      'templates': [
        'Auf dem Bild sehe ich...',
        'Das Bild zeigt...',
        'Auf diesem Foto kann man... sehen.'
      ]
    },
    {
      'step': '2. Details beschreiben (وصف التفاصيل) 🔍',
      'desc': 'تحدث عن العناصر المختلفة وموقعها (الأمام، الخلف، اليمين، اليسار).',
      'templates': [
        'Im Vordergrund gibt es...',
        'Im Hintergrund sieht man...',
        'Auf der linken / rechten Seite befindet sich...',
        'In der Mitte kann man... erkennen.'
      ]
    },
    {
      'step': '3. Thema & Vermutung (الموضوع والتخمين) 💭',
      'desc': 'عبّر عن موضوع الصورة وخمن مشاعر الأشخاص أو الأسباب.',
      'templates': [
        'Ich denke, das Thema des Bildes ist...',
        'Es sieht so aus, als ob...',
        'Ich vermute, dass...',
        'Die Personen sehen glücklich / gestresst aus.'
      ]
    },
    {
      'step': '4. Eigene Meinung & Heimatland (الرأي والبلد الأم) 🇸🇾',
      'desc': 'أعطِ رأيك الشخصي وقارن الوضع مع بلدك الأم.',
      'templates': [
        'Meiner Meinung nach...',
        'Ich finde, dass...',
        'In meinem Heimatland (Syrien) ist das anders / ähnlich...',
        'Im Vergleich zu Deutschland gibt es in Syrien...'
      ]
    }
  ];

  // Timer for Practice Tab
  Timer? _practiceTimer;
  int _practiceSeconds = 0;
  bool _isRecording = false;

  void _toggleRecording() {
    if (_isRecording) {
      _practiceTimer?.cancel();
      setState(() {
        _isRecording = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('تم إنهاء التدريب بنجاح! +15 XP 🎉')),
      );
      context.read<AppProvider>().addXP(15);
    } else {
      setState(() {
        _isRecording = true;
        _practiceSeconds = 0;
      });
      _practiceTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
        setState(() {
          _practiceSeconds++;
        });
      });
    }
  }

  String _formatDuration(int secs) {
    final minutes = (secs / 60).floor();
    final seconds = secs % 60;
    return '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
  }

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _practiceTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scaffoldBg = isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC);
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final barBg = isDark ? const Color(0xFF1E293B) : Colors.white;

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: AppBar(
        title: const Text('وصف الصور - Bildbeschreibung 🖼️', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
        centerTitle: true,
        elevation: 0,
        backgroundColor: barBg,
        foregroundColor: textMain,
        bottom: TabBar(
          controller: _tabController,
          labelColor: const Color(0xFF7C3AED),
          unselectedLabelColor: isDark ? Colors.white38 : Colors.grey,
          indicatorColor: const Color(0xFF7C3AED),
          indicatorWeight: 3,
          tabs: const [
            Tab(text: 'مواضيع شائعة'),
            Tab(text: 'هيكل الوصف'),
            Tab(text: 'تدرّب الآن'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildTopicsTab(),
          _buildStructureTab(),
          _buildPracticeTab(),
        ],
      ),
    );
  }

  Widget _buildTopicsTab() {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _topics.length,
      itemBuilder: (ctx, idx) {
        final t = _topics[idx];
        return Card(
          color: cardBg,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: borderCol)),
          margin: const EdgeInsets.only(bottom: 16),
          child: ExpansionTile(
            title: Text(t['titleAr'] as String, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: textMain)),
            subtitle: Text(t['titleDe'] as String, style: const TextStyle(fontSize: 12, color: Colors.grey, fontStyle: FontStyle.italic), textDirection: TextDirection.ltr),
            iconColor: const Color(0xFF7C3AED),
            collapsedIconColor: Colors.grey,
            childrenPadding: const EdgeInsets.all(16),
            children: [
              // Topic mock illustration card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: const Color(0xFF7C3AED).withValues(alpha: 0.05),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: const Color(0xFF7C3AED).withValues(alpha: 0.15)),
                ),
                child: Column(
                  children: [
                    const Icon(Icons.image_outlined, color: Color(0xFF7C3AED), size: 36),
                    const SizedBox(height: 8),
                    Text(
                      t['description'] as String,
                      style: TextStyle(fontSize: 13, color: textMain, fontWeight: FontWeight.bold),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              // Vocab list
              const Text('🗣️ مفردات مفتاحية:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.orange)),
              const SizedBox(height: 6),
              ...(t['vocabulary'] as List).map((v) => Padding(
                    padding: const EdgeInsets.symmetric(vertical: 3),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(v['de'] as String, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13), textDirection: TextDirection.ltr),
                        Text(v['ar'] as String, style: TextStyle(fontSize: 13, color: textMain)),
                      ],
                    ),
                  )),
              const SizedBox(height: 16),
              // Step-by-step description templates
              _templateBlock('1. المقدمة (Einleitung)', t['intro'] as String),
              _templateBlock('2. التفاصيل (Details)', t['details'] as String),
              _templateBlock('3. الرأي الشخصي (Meinung)', t['opinion'] as String),
              _templateBlock('4. المقارنة مع البلد الأم (Syrien)', t['comparison'] as String),
            ],
          ),
        );
      },
    );
  }

  Widget _templateBlock(String label, String content) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);

    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.blue)),
          const SizedBox(height: 4),
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF0F172A) : Colors.grey[50],
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: isDark ? Colors.white10 : Colors.grey[200]!),
            ),
            child: SelectableText(
              content,
              style: TextStyle(fontSize: 13, height: 1.4, color: textMain),
              textDirection: TextDirection.ltr,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStructureTab() {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _structure.length,
      itemBuilder: (ctx, idx) {
        final step = _structure[idx];
        final List<String> templates = List<String>.from(step['templates'] as List);

        return Card(
          color: cardBg,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: borderCol)),
          margin: const EdgeInsets.only(bottom: 16),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  step['step'] as String,
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: textMain),
                ),
                const SizedBox(height: 4),
                Text(
                  step['desc'] as String,
                  style: const TextStyle(fontSize: 12, color: Colors.grey),
                ),
                const SizedBox(height: 12),
                const Divider(),
                const SizedBox(height: 8),
                const Text('قوالب جمل جاهزة للحفظ:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Color(0xFF7C3AED))),
                const SizedBox(height: 8),
                ...templates.map((t) => Padding(
                      padding: const EdgeInsets.only(bottom: 6.0),
                      child: Container(
                        width: double.infinity,
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF0F172A) : Colors.grey[50],
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: SelectableText(
                          t,
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: textMain),
                          textDirection: TextDirection.ltr,
                        ),
                      ),
                    )),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildPracticeTab() {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Icon(Icons.mic, color: Color(0xFF7C3AED), size: 70),
          const SizedBox(height: 16),
          const Text(
            'تدرّب على وصف الصورة وتحدث بصوتك! 🎙️',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          const Text(
            'اختر موضوعاً عشوائياً، وابدأ المؤقت لتجربة التحدث ووصف الصورة لمدة 3 دقائق كاملة كما في الامتحان الحقيقي.',
            style: TextStyle(color: Colors.grey, fontSize: 12, height: 1.5),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          if (_isRecording) ...[
            Center(
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.red.withValues(alpha: 0.1),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.fiber_manual_record, color: Colors.red, size: 40),
              ),
            ),
            const SizedBox(height: 12),
            Center(
              child: Text(
                _formatDuration(_practiceSeconds),
                style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Colors.red),
              ),
            ),
            const SizedBox(height: 24),
          ],
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: _isRecording ? Colors.red : const Color(0xFF7C3AED),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            onPressed: _toggleRecording,
            child: Text(
              _isRecording ? 'إيقاف وحفظ التحدي ⏹️' : 'ابدأ مؤقت التحدث والتسجيل 🎙️',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
          ),
        ],
      ),
    );
  }
}
