import 'package:flutter/material.dart';

class ProblemsScreen extends StatefulWidget {
  const ProblemsScreen({super.key});

  @override
  State<ProblemsScreen> createState() => _ProblemsScreenState();
}

class _ProblemsScreenState extends State<ProblemsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String _searchQuery = '';

  final List<Map<String, dynamic>> _guides = [
    // Jobcenter & Arbeit
    {
      'category': 'jobcenter',
      'title': 'التعامل مع الجوب سنتر وعقود العمل 💼',
      'titleDe': 'Jobcenter & Arbeitsvertrag',
      'problem': 'كيف تفهم رسائل الجوب سنتر وتتجنب العقوبات (Sanktionen)، وماذا تفعل قبل توقيع أي عقد عمل؟',
      'steps': [
        '1. الالتزام بالموعد (Termin): أي غياب بدون عذر طبي (Krankschreibung) قد يؤدي لخصم 10% إلى 30% من المعونة.',
        '2. تقديم الطلبات (Anträge): قدّم طلب التمديد (Weiterbewilligungsantrag - WBA) قبل 6 أسابيع من انتهاء الطلب الحالي لضمان عدم انقطاع الراتب.',
        '3. الإبلاغ عن التغييرات (Veränderungsmitteilung): يجب إبلاغهم فوراً عند بدء أي عمل جزئي، زواج، ولادة، أو تغيير السكن.',
        '4. عقود العمل (Arbeitsvertrag): لا توقع أي عقد عمل دون مراجعة ساعات العمل (Arbeitszeit)، الراتب الإجمالي (Bruttogehalt)، وفترة التجربة (Probezeit - عادة 6 أشهر).'
      ],
      'vocab': [
        {'de': 'die Sanktion, -en', 'ar': 'عقوبة (خصم من المعونة)'},
        {'de': 'der Bewilligungsbescheid', 'ar': 'قرار الموافقة على المعونة'},
        {'de': 'die Probezeit', 'ar': 'فترة التجربة (العمل)'},
        {'de': 'die Kündigungsfrist', 'ar': 'مهلة الاستقالة / الإقالة'}
      ]
    },
    // Housing
    {
      'category': 'housing',
      'title': 'البحث عن سكن وعقود الإيجار 🏠',
      'titleDe': 'Wohnungssuche & Mietvertrag',
      'problem': 'صعوبة العثور على شقة في المدن الكبرى، فهم مستندات الإيجار وفروقات الإيجار البارد والدافئ.',
      'steps': [
        '1. تجهيز ملف السكن: يضم الهوية، كشف الراتب لآخر 3 أشهر (Gehaltsnachweis) أو ورقة الجوب سنتر، وسجل Schufa الخالي من الديون.',
        '2. الإيجار البارد (Kaltmiete): هو تكلفة إيجار الجدران فقط بدون التدفئة والماء والخدمات.',
        '3. الإيجار الدافئ (Warmmiete): الإيجار البارد مضافاً إليه الخدمات التقديرية (Nebenkosten). الكهرباء والإنترنت تدفع منفصلة عادة.',
        '4. تأمين الشقة (Kaution): مبلغ يدفع للمالك كضمان (عادة إيجار 3 أشهر بارد)، ويسترد عند الخروج بشرط تسليم الشقة سليمة.'
      ],
      'vocab': [
        {'de': 'die Kaltmiete ↔ die Warmmiete', 'ar': 'الإيجار البارد ↔ الإيجار الدافئ'},
        {'de': 'die Kaution', 'ar': 'التأمين (الوديعة المالية)'},
        {'de': 'das Übergabeprotokoll', 'ar': 'محضر تسليم الشقة (هام جداً عند الدخول والخروج)'},
        {'de': 'die Hausordnung', 'ar': 'قانون النظام الداخلي للبناية'}
      ]
    },
    // Health & Insurance
    {
      'category': 'health',
      'title': 'التأمين الصحي وزيارة الأطباء 🏥',
      'titleDe': 'Krankenkasse & Arztbesuch',
      'problem': 'كيفية اختيار شركة التأمين الصحي، حجز المواعيد لدى طبيب العائلة والأخصائيين، والتعامل مع الطوارئ الطبية.',
      'steps': [
        '1. بطاقة التأمين (Gesundheitskarte): احملها معك دائماً؛ فهي المفتاح للحصول على العلاج المجاني.',
        '2. طبيب العائلة (Hausarzt): هو محطتك الأولى دائماً. هو من يعطيك ورقة التحويل (Überweisung) لرؤية طبيب أخصائي.',
        '3. الطوارئ خارج أوقات العمل: اتصل بالرقم 116117 للحالات غير الإسعافية الطارئة ليلاً أو في العطل، أو اتصل بـ 112 لحالات إنقاذ الحياة.',
        '4. الإجازة المرضية (AU-Bescheinigung): يجب تسليمها لصاحب العمل أو الجوب سنتر من اليوم الأول أو الثالث للغياب كحد أقصى.'
      ],
      'vocab': [
        {'de': 'die Überweisung', 'ar': 'ورقة التحويل لطبيب أخصائي'},
        {'de': 'die Arbeitsunfähigkeitsbescheinigung (AU)', 'ar': 'تقرير الإجازة المرضية للعمل'},
        {'de': 'der Notaufnahme', 'ar': 'قسم الطوارئ بالمستشفى'},
        {'de': 'die Zuzahlung', 'ar': 'المبلغ الإضافي الذي يدفعه المريض للدواء'}
      ]
    },
    // Anerkennung
    {
      'category': 'anerkennung',
      'title': 'تعديل الشهادات والاعتراف الأكاديمي 🎓',
      'titleDe': 'Anerkennung ausländischer Abschlüsse',
      'problem': 'تعديل الشهادات الجامعية والمهنية للعمل في الاختصاص الرسمي في ألمانيا.',
      'steps': [
        '1. التحقق من بوابة anabin: تحقق هل جامعتك مصنفة H+ وهل شهادتك معترف بها بشكل مباشر أم تحتاج لمعادلة.',
        '2. ترجمة المستندات: يجب ترجمة الشهادات وكشوف العلامات من مترجم معتمد ومحلف في ألمانيا (Vereidigter Übersetzer).',
        '3. إرسال الأوراق لجهة التعديل: تختلف الجهة حسب المهنة (مثلاً الأطباء والصيادلة يرسلون إلى Landesprüfungsamt بالولاية).',
        '4. كورس اللغة التخصصي (Fachsprachprüfung - FSP): للأطباء والصيادلة والمهندسين، تعديل الشهادة يتطلب تجاوز امتحان لغة الاختصاص الصعب.'
      ],
      'vocab': [
        {'de': 'die Anerkennung', 'ar': 'الاعتراف بالشهادة / التعديل'},
        {'de': 'die Beglaubigung', 'ar': 'تصديق الأوراق / مطابقة الأصل'},
        {'de': 'der vereidigte Übersetzer', 'ar': 'المترجم المحلف والمعتمد'},
        {'de': 'die Defizitbescheid', 'ar': 'رسالة النواقص (توضح الفروقات بين شهادتك والشهادة الألمانية)'}
      ]
    }
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
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
        title: const Text('دليل المشاكل والحلول في ألمانيا 💡', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
        backgroundColor: barBg,
        foregroundColor: textMain,
        bottom: TabBar(
          controller: _tabController,
          labelColor: const Color(0xFF059669),
          unselectedLabelColor: isDark ? Colors.white38 : Colors.grey,
          indicatorColor: const Color(0xFF059669),
          indicatorWeight: 3,
          tabs: const [
            Tab(text: 'الجوب سنتر'),
            Tab(text: 'السكن والإيجار'),
            Tab(text: 'الصحة والتأمين'),
            Tab(text: 'تعديل الشهادات'),
          ],
        ),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'بحث في الحلول والكلمات المفتاحية...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              ),
              onChanged: (v) => setState(() => _searchQuery = v.toLowerCase()),
            ),
          ),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildGuideList('jobcenter'),
                _buildGuideList('housing'),
                _buildGuideList('health'),
                _buildGuideList('anerkennung'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGuideList(String cat) {
    final filtered = _guides.where((g) {
      if (g['category'] != cat) return false;
      if (_searchQuery.isEmpty) return true;
      final title = g['title'].toString().toLowerCase();
      final problem = g['problem'].toString().toLowerCase();
      final deTitle = g['titleDe'].toString().toLowerCase();
      return title.contains(_searchQuery) || problem.contains(_searchQuery) || deTitle.contains(_searchQuery);
    }).toList();

    if (filtered.isEmpty) {
      return const Center(child: Text('لا توجد نتائج مطابقة لبحثك. 🔍'));
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: filtered.length,
      itemBuilder: (ctx, idx) {
        final g = filtered[idx];
        return _buildGuideCard(g);
      },
    );
  }

  Widget _buildGuideCard(Map<String, dynamic> guide) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final textMuted = isDark ? Colors.white60 : const Color(0xFF64748B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);

    final List<String> steps = List<String>.from(guide['steps'] as List);
    final List<Map<String, String>> vocab = List<Map<String, String>>.from(
      (guide['vocab'] as List).map((v) => Map<String, String>.from(v as Map)),
    );

    return Card(
      color: cardBg,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: borderCol, width: 1),
      ),
      margin: const EdgeInsets.only(bottom: 16),
      child: ExpansionTile(
        title: Text(
          guide['title'] as String,
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: textMain),
        ),
        subtitle: Text(
          guide['titleDe'] as String,
          style: const TextStyle(fontSize: 12, color: Colors.grey, fontStyle: FontStyle.italic),
          textDirection: TextDirection.ltr,
        ),
        iconColor: const Color(0xFF059669),
        collapsedIconColor: Colors.grey,
        childrenPadding: const EdgeInsets.all(16),
        children: [
          // Problem statement
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFF059669).withValues(alpha: 0.05),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: const Color(0xFF059669).withValues(alpha: 0.1)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('❓ المشكلة الأساسية:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Color(0xFF059669))),
                const SizedBox(height: 4),
                Text(
                  guide['problem'] as String,
                  style: TextStyle(fontSize: 13, height: 1.4, color: textMain),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          // Step-by-step checklist
          const Text('📝 خطوات الحل العملية:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.blue)),
          const SizedBox(height: 8),
          ...steps.map((step) => Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: Text(
                  step,
                  style: TextStyle(fontSize: 13, height: 1.5, color: textMain),
                ),
              )),
          const SizedBox(height: 16),
          // Essential vocabulary
          const Text('🗣️ مصطلحات ألمانية هامة للموقف:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.orange)),
          const SizedBox(height: 8),
          ...vocab.map((v) => Container(
                margin: const EdgeInsets.only(bottom: 6),
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF0F172A) : Colors.grey[50],
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: isDark ? Colors.white10 : Colors.grey[200]!),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      v['de']!,
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.orange),
                      textDirection: TextDirection.ltr,
                    ),
                    Text(
                      v['ar']!,
                      style: TextStyle(fontSize: 13, color: textMain),
                    ),
                  ],
                ),
              )),
        ],
      ),
    );
  }
}
