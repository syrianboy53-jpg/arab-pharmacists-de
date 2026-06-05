import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class LibraryScreen extends StatelessWidget {
  const LibraryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final scaffoldBg = isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC);
    final appBarBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);

    return DefaultTabController(
      length: 4,
      child: Scaffold(
        backgroundColor: scaffoldBg,
        appBar: AppBar(
          backgroundColor: appBarBg,
          foregroundColor: textMain,
          elevation: 0,
          title: Text(
            'المكتبة والملخصات الذهبية (B1 - B2)',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: textMain),
          ),
          centerTitle: true,
          shape: Border(bottom: BorderSide(color: borderCol, width: 1)),
          bottom: const TabBar(
            isScrollable: true,
            indicatorColor: Color(0xFF10B981), // Emerald green
            labelColor: Color(0xFF10B981),
            unselectedLabelColor: Colors.grey,
            tabs: [
              Tab(text: 'قوالب الرسائل (Schreiben)', icon: Icon(Icons.email)),
              Tab(text: 'عبارات المحادثة (Sprechen)', icon: Icon(Icons.record_voice_over)),
              Tab(text: 'روابط وقواعد B2', icon: Icon(Icons.link)),
              Tab(text: 'ملخصات للتحميل (PDF)', icon: Icon(Icons.download)),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            WritingTemplatesTab(),
            SpeakingTemplatesTab(),
            GrammarB2Tab(),
            PdfDownloadsTab(),
          ],
        ),
      ),
    );
  }
}

// ------------------ TAB 1: Writing Templates (Schreiben) ------------------
class WritingTemplatesTab extends StatelessWidget {
  const WritingTemplatesTab({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final textMuted = isDark ? Colors.white70 : const Color(0xFF475569);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);
    final innerBg = isDark ? const Color(0xFF0F172A) : const Color(0xFFF1F5F9);

    final templates = [
      {
        'title': 'خطاب شكوى / اعتراض (Beschwerdebrief)',
        'level': 'B2 / B1',
        'situation': 'اعتراض على منتج لم يكن يعمل، أو خدمة فندق سيئة، أو دورة تعليمية فاشلة.',
        'intro': 'Sehr geehrte Damen und Herren,\n\nhiermit möchte ich mich über Ihren Service / Ihr Produkt beschweren, das ich am [Datum] bei Ihnen gebucht / gekauft habe. In Ihrer Anzeige haben Sie versprochen, dass..., aber die Realität sah leider ganz anders aus.',
        'points': [
          'Einer der wichtigsten Mängel war, dass...',
          'Zudem musste ich feststellen, dass...',
          'Ein weiterer Punkt ist, dass...',
          'Trotz meiner mehrmaligen Versuche, Ihren Kundenservice telefonisch zu erreichen, konnte mir niemand helfen.'
        ],
        'conclusion': 'Aus diesen Gründen fordere ich Sie auf, mir einen Teil der Kosten in Höhe von [Betrag] € zurückzuerstatten. Sollte ich innerhalb von zwei Wochen keine Antwort von Ihnen erhalten, werde ich rechtliche Schritte einleiten.\n\nMit freundlichen Grüßen\n[Ihr Name]'
      },
      {
        'title': 'خطاب طلب وظيفة (Bewerbungsschreiben)',
        'level': 'B2 / B1',
        'situation': 'التقديم على وظيفة أو تدريب مهني (Ausbildung).',
        'intro': 'Sehr geehrte(r) Frau/Herr [Name],\n\nmit großem Interesse habe ich Ihre Stellenanzeige für die Position als [Beruf] auf Ihrer Website gelesen. Da mein Profil und meine beruflichen Erfahrungen genau Ihren Anforderungen entsprechen, bewerbe ich mich hiermit um diese Stelle.',
        'points': [
          'In meiner letzten Tätigkeit bei [Firma] konnte ich wertvolle Erfahrungen im Bereich [Bereich] sammeln.',
          'Zu meinen Stärken gehören Teamfähigkeit, Zuverlässigkeit und eine schnelle Auffassungsgabe.',
          'Die Arbeit in Ihrem Unternehmen reizt mich besonders, da Sie einen hervorragenden Ruf genießen.'
        ],
        'conclusion': 'Über eine Einladung zu einem persönlichen Vorstellungsgespräch freue ich mich sehr. Für Rückfragen stehe ich Ihnen jederzeit gern zur Verfügung.\n\nMit freundlichen Grüßen\n[Ihr Name]'
      },
      {
        'title': 'خطاب اعتذار رسمي (Entschuldigungsschreiben)',
        'level': 'B1 / B2',
        'situation': 'الاعتذار عن عدم حضور موعد عمل أو دراسة بسبب ظروف طارئة.',
        'intro': 'Sehr geehrte(r) Frau/Herr [Name],\n\nich schreibe Ihnen, um mich für mein gestriges Fehlen beim Seminar / bei der Arbeit zu entschuldigen. Leider war es mir aufgrund eines plötzlichen Krankheitsfalls in meiner Familie nicht möglich, pünktlich zu erscheinen.',
        'points': [
          'Ich bedauere diesen Vorfall zutiefst, da mir die Besprechung sehr wichtig war.',
          'Um den verpassten Stoff nachzuholen, habe ich mich bereits mit meinem Kollegen [Name] in Verbindung gesetzt.',
          'Ich hoffe auf Ihr Verständnis für meine persönliche Ausnahmesituation.'
        ],
        'conclusion': 'Gerne würde ich den Termin nächste Woche nachholen, falls es Ihr Terminkalender zulässt. Vielen Dank im Voraus für Ihr Verständnis.\n\nMit freundlichen Grüßen\n[Ihr Name]'
      }
    ];

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: templates.length,
      itemBuilder: (context, index) {
        final t = templates[index];
        return Card(
          color: cardBg,
          surfaceTintColor: Colors.transparent,
          margin: const EdgeInsets.only(bottom: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: BorderSide(color: borderCol),
          ),
          child: ExpansionTile(
            title: Text(
              t['title'] as String,
              style: TextStyle(color: textMain, fontWeight: FontWeight.bold, fontSize: 16),
            ),
            subtitle: Text(
              'المستوى: ${t['level']} | ${t['situation']}',
              style: TextStyle(color: textMuted, fontSize: 13),
            ),
            collapsedIconColor: textMain,
            iconColor: const Color(0xFF10B981),
            childrenPadding: const EdgeInsets.all(16),
            expandedCrossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('🔸 المقدمة (Einleitung):', style: TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.bold)),
              const SizedBox(height: 4),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(color: innerBg, borderRadius: BorderRadius.circular(8)),
                child: Text(t['intro'] as String, style: TextStyle(color: textMain.withValues(alpha: 0.8), height: 1.5, fontSize: 14)),
              ),
              const SizedBox(height: 12),
              const Text('🔸 عبارات المتن (Hauptteil):', style: TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.bold)),
              const SizedBox(height: 4),
              ...((t['points'] as List<String>).map((p) => Padding(
                padding: const EdgeInsets.only(bottom: 6),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('• ', style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold)),
                    Expanded(child: Text(p, style: TextStyle(color: textMain.withValues(alpha: 0.8), fontSize: 14))),
                  ],
                ),
              ))),
              const SizedBox(height: 12),
              const Text('🔸 الخاتمة (Schluss):', style: TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.bold)),
              const SizedBox(height: 4),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(color: innerBg, borderRadius: BorderRadius.circular(8)),
                child: Text(t['conclusion'] as String, style: TextStyle(color: textMain.withValues(alpha: 0.8), height: 1.5, fontSize: 14)),
              ),
            ],
          ),
        );
      },
    );
  }
}

// ------------------ TAB 2: Speaking Templates (Sprechen) ------------------
class SpeakingTemplatesTab extends StatelessWidget {
  const SpeakingTemplatesTab({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final textMuted = isDark ? Colors.white60 : const Color(0xFF64748B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);

    final sections = [
      {
        'title': 'إبداء الرأي الشخصي (Meinungsäußerung)',
        'items': [
          {'de': 'Ich bin der Meinung, dass...', 'ar': 'أنا من الرأي أن...'},
          {'de': 'Meiner Ansicht nach...', 'ar': 'حسب وجهة نظري...'},
          {'de': 'Ich stehe auf dem Standpunkt, dass...', 'ar': 'أقف عند موقف أن...'},
          {'de': 'Für mich steht fest, dass...', 'ar': 'بالنسبة لي من المؤكد أن...'}
        ]
      },
      {
        'title': 'الموافقة على رأي الشريك (Zustimmung)',
        'items': [
          {'de': 'Da stimme ich Ihnen vollkommen zu.', 'ar': 'أنا أتفق معك في هذا تماماً.'},
          {'de': 'Das sehe ich ganz genauso.', 'ar': 'أرى ذلك تماماً بنفس الطريقة.'},
          {'de': 'Ich teile Ihre Meinung zu diesem Punkt.', 'ar': 'أشاركك رأيك في هذه النقطة.'},
          {'de': 'Das ist ein schlagendes Argument.', 'ar': 'هذه حجة قوية ومقنعة.'}
        ]
      },
      {
        'title': 'الرفض والاعتراض بأدب (Widerspruch)',
        'items': [
          {'de': 'Ich sehe das etwas anders, weil...', 'ar': 'أرى ذلك بطريقة مختلفة قليلاً، لأن...'},
          {'de': 'Da muss ich Ihnen leider widersprechen.', 'ar': 'هنا يجب علي للأسف مخالفتك الرأي.'},
          {'de': 'Das klingt überzeugend, aber man muss bedenken, dass...', 'ar': 'هذا يبدو مقنعاً، ولكن يجب أن نأخذ بالاعتبار أن...'},
          {'de': 'Ich bezweifle, dass das so einfach ist.', 'ar': 'أشك في أن هذا الأمر بهذه السهولة.'}
        ]
      },
      {
        'title': 'تقديم المقترحات والحلول المشتركة (Vorschläge machen)',
        'items': [
          {'de': 'Was halten Sie davon, wenn wir...?', 'ar': 'ما رأيك إذا قمنا بـ...؟'},
          {'de': 'Mein Vorschlag wäre, dass wir...', 'ar': 'اقتراحي هو أن نقوم بـ...'},
          {'de': 'Wir könnten auch Folgendes in Betracht ziehen: ...', 'ar': 'يمكننا أيضاً أخذ الآتي بعين الاعتبار: ...'},
          {'de': 'Lassen Sie uns vereinbaren, dass...', 'ar': 'دعنا نتفق على أن...'}
        ]
      }
    ];

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: sections.length,
      itemBuilder: (context, index) {
        final sec = sections[index];
        final items = sec['items'] as List<Map<String, String>>;
        return Card(
          color: cardBg,
          surfaceTintColor: Colors.transparent,
          margin: const EdgeInsets.only(bottom: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: BorderSide(color: borderCol),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  sec['title'] as String,
                  style: const TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold, fontSize: 16),
                ),
                Divider(color: borderCol, height: 20),
                ...items.map((item) => Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item['de']!,
                        style: TextStyle(color: textMain, fontWeight: FontWeight.w600, fontSize: 15),
                        textDirection: TextDirection.ltr,
                      ),
                      const SizedBox(height: 2),
                      Text(
                        item['ar']!,
                        style: TextStyle(color: textMuted, fontSize: 13),
                      ),
                    ],
                  ),
                )),
              ],
            ),
          ),
        );
      },
    );
  }
}

// ------------------ TAB 3: Grammar B2 Connectives ------------------
class GrammarB2Tab extends StatelessWidget {
  const GrammarB2Tab({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMuted = isDark ? Colors.white70 : const Color(0xFF64748B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);
    final innerBg = isDark ? const Color(0xFF0F172A) : const Color(0xFFF1F5F9);

    final rules = [
      {
        'title': 'الروابط الثنائية (Zweiteilige Konnektoren)',
        'explanation': 'روابط ممتازة لرفع مستوى المحادثة والكتابة إلى B2 وإظهار إتقان التراكيب المعقدة.',
        'details': [
          {
            'name': 'Je + Komparativ ..., desto + Komparativ ...',
            'desc': 'كلما... كلما... (الصفة تأتي بصيغة المقارنة). في جملة Je يأتي الفعل في النهاية، وفي جملة Desto يأتي الفعل مباشرة بعد الصفة.',
            'ex': 'Je schneller wir lernen, desto besser bestehen wir die Prüfung.\n(كلما تعلمنا أسرع، كلما نجحنا في الامتحان بشكل أفضل.)'
          },
          {
            'name': 'Nicht nur ..., sondern auch ...',
            'desc': 'ليس فقط... بل أيضاً... (تأتي للجمع بين ميزتين أو شيئين إيجابيين).',
            'ex': 'Deutsch lernen ist nicht nur nützlich, sondern auch interessant.\n(تعلم الألمانية ليس فقط مفيداً، بل ممتعاً أيضاً.)'
          },
          {
            'name': 'Entweder ... oder ...',
            'desc': 'إما... أو... (للاختيار بين أمرين).',
            'ex': 'Ich werde entweder heute lernen oder morgen arbeiten.\n(إما سأدرس اليوم أو سأعمل غداً.)'
          },
          {
            'name': 'Sowohl ... als auch ...',
            'desc': 'كلا من... و... معاً (لإثبات الأمرين معاً).',
            'ex': 'Er spricht sowohl Deutsch als auch Englisch fließend.\n(هو يتحدث كلاً من الألمانية والإنجليزية بطلاقة.)'
          }
        ]
      },
      {
        'title': 'أدوات ربط ذات أثر في ترتيب الجملة (Konnektoren mit Nebensatz)',
        'explanation': 'أدوات تربط جملتين وتجعل الفعل يذهب إلى النهاية (Nebensatz).',
        'details': [
          {
            'name': 'obwohl (على الرغم من أن)',
            'desc': 'تربط سبباً متناقضاً. يذهب الفعل للنهاية.',
            'ex': 'Er hat die Prüfung bestanden, obwohl er sehr wenig gelernt hat.\n(لقد نجح في الامتحان، على الرغم من أنه درس قليلاً جداً.)'
          },
          {
            'name': 'sodass (بحيث أن / لدرجة أن)',
            'desc': 'تفيد النتيجة والأثر. يذهب الفعل للنهاية.',
            'ex': 'Es hat den ganzen Tag geregnet, sodass wir zu Hause bleiben mussten.\n(لقد هطل المطر طوال اليوم، لدرجة أننا اضطررنا للبقاء في المنزل.)'
          }
        ]
      }
    ];

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: rules.length,
      itemBuilder: (context, index) {
        final r = rules[index];
        final details = r['details'] as List<Map<String, String>>;
        return Card(
          color: cardBg,
          surfaceTintColor: Colors.transparent,
          margin: const EdgeInsets.only(bottom: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: BorderSide(color: borderCol),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  r['title'] as String,
                  style: const TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.bold, fontSize: 16),
                ),
                const SizedBox(height: 4),
                Text(
                  r['explanation'] as String,
                  style: TextStyle(color: textMuted, fontSize: 13),
                ),
                Divider(color: borderCol, height: 24),
                ...details.map((d) => Padding(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        d['name']!,
                        style: const TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold, fontSize: 15),
                        textDirection: TextDirection.ltr,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        d['desc']!,
                        style: TextStyle(color: textMuted, fontSize: 13),
                      ),
                      const SizedBox(height: 6),
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(color: innerBg, borderRadius: BorderRadius.circular(6)),
                        child: Text(
                          d['ex']!,
                          style: const TextStyle(color: Color(0xFF0284C7), fontSize: 13, height: 1.4),
                          textDirection: TextDirection.ltr,
                        ),
                      ),
                    ],
                  ),
                )),
              ],
            ),
          ),
        );
      },
    );
  }
}

// ------------------ TAB 4: PDF Downloads ------------------
class PdfDownloadsTab extends StatelessWidget {
  const PdfDownloadsTab({super.key});

  Future<void> _openUrl(BuildContext context, String urlString) async {
    try {
      final uri = Uri.parse(urlString);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        throw 'Could not launch $urlString';
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('خطأ أثناء فتح الرابط: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final textMuted = isDark ? Colors.white60 : const Color(0xFF64748B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);

    final pdfs = [
      {
        'title': 'كتاب وقاموس مفردات B1 كامل مع الترجمة',
        'desc': 'أهم الكلمات التي يجب حفظها لاجتياز اختبار B1 مع جمل توضيحية بالعربية.',
        'url': 'https://raw.githubusercontent.com/syrianboy53-jpg/arab-pharmacists-de/main/landing/apk/files/b1_vocab.pdf'
      },
      {
        'title': 'قوالب رسائل الشكوى والطلب B2 الجاهزة للحفظ',
        'desc': 'ملخص PDF يحتوي على 10 رسائل مكتوبة باحترافية وتراعي معايير تصحيح معهد Telc.',
        'url': 'https://raw.githubusercontent.com/syrianboy53-jpg/arab-pharmacists-de/main/landing/apk/files/b2_letters.pdf'
      },
      {
        'title': 'ملخص قواعد اللغة الألمانية B1 - B2 بصفحتين',
        'desc': 'جدول مبسط يلخص أهم قواعد الأزمنة، حروف الجر المشتركة، وحالات الإعراب الأربعة.',
        'url': 'https://raw.githubusercontent.com/syrianboy53-jpg/arab-pharmacists-de/main/landing/apk/files/german_grammar_cheat_sheet.pdf'
      },
      {
        'title': 'كتاب التحضير لاختبار الحياة في ألمانيا (Leben in DE)',
        'desc': 'الـ 300 سؤال المشتركة للولايات الألمانية + الأسئلة المخصصة لكل ولاية مع الإجابات الصحيحة.',
        'url': 'https://raw.githubusercontent.com/syrianboy53-jpg/arab-pharmacists-de/main/landing/apk/files/leben_in_de_300q.pdf'
      }
    ];

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: pdfs.length,
      itemBuilder: (context, index) {
        final pdf = pdfs[index];
        return Card(
          color: cardBg,
          surfaceTintColor: Colors.transparent,
          margin: const EdgeInsets.only(bottom: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: BorderSide(color: borderCol),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEF4444).withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.picture_as_pdf, color: Color(0xFFEF4444), size: 30),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        pdf['title']!,
                        style: TextStyle(color: textMain, fontWeight: FontWeight.bold, fontSize: 14),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        pdf['desc']!,
                        style: TextStyle(color: textMuted, fontSize: 12),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                ElevatedButton(
                  onPressed: () => _openUrl(context, pdf['url']!),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                  child: const Row(
                    children: [
                      Icon(Icons.download, size: 16),
                      SizedBox(width: 4),
                      Text('تحميل', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
