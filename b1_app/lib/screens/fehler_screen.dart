import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../data/grammatik_data.dart';

class FehlerScreen extends StatefulWidget {
  const FehlerScreen({super.key});

  @override
  State<FehlerScreen> createState() => _FehlerScreenState();
}

class _FehlerScreenState extends State<FehlerScreen> {
  late List<Map<String, dynamic>> _mistakes;
  int _currentIndex = 0;
  bool _isFlipped = false;
  final Set<String> _masteredIds = {};

  @override
  void initState() {
    super.initState();
    _mistakes = List<Map<String, dynamic>>.from(commonMistakes);
  }

  void _flipCard() {
    setState(() {
      _isFlipped = !_isFlipped;
    });
  }

  void _markMastered(String id) {
    setState(() {
      _masteredIds.add(id);
      context.read<AppProvider>().addXP(10);
      _nextCard();
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('تم حفظ الخطأ الشائع في قائمة الإتقان! +10 XP 🎉'),
        duration: Duration(milliseconds: 1000),
        backgroundColor: Colors.green,
      ),
    );
  }

  void _nextCard() {
    if (_currentIndex < _mistakes.length - 1) {
      setState(() {
        _currentIndex++;
        _isFlipped = false;
      });
    } else {
      setState(() {
        _currentIndex = 0;
        _isFlipped = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('تهانينا! لقد تصفحت جميع الأخطاء الشائعة. أعد التدريب! 🔄'),
          backgroundColor: Colors.blue,
        ),
      );
    }
  }

  void _prevCard() {
    if (_currentIndex > 0) {
      setState(() {
        _currentIndex--;
        _isFlipped = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scaffoldBg = isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC);
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final textMuted = isDark ? Colors.white60 : const Color(0xFF64748B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);

    if (_mistakes.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('الأخطاء الشائعة ⚠️')),
        body: const Center(child: Text('لا توجد أخطاء حالياً.')),
      );
    }

    final current = _mistakes[_currentIndex];
    final progress = (_currentIndex + 1) / _mistakes.length;
    final isMastered = _masteredIds.contains(current['id']);

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: AppBar(
        title: const Text('30 خطأ شائع DaZ ⚠️', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
        backgroundColor: isDark ? const Color(0xFF1E293B) : Colors.white,
        foregroundColor: textMain,
        actions: [
          IconButton(
            icon: const Icon(Icons.info_outline),
            onPressed: () {
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  title: const Text('طريقة الدراسة 🧠', textAlign: TextAlign.center),
                  content: const Text(
                    'يحتوي هذا القسم على 30 خطأ لغوياً يقع فيه متعلمو الألمانية من العرب.\n\n• اقرأ الجملة الخاطئة أولاً وتخيل الحل.\n• اضغط على البطاقة لقلبها ومعرفة الصواب والسبب.\n• احفظ البطاقات التي أتقنتها لتحصل على نقاط إضافية.',
                    textAlign: TextAlign.center,
                    style: TextStyle(height: 1.5),
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('فهمت'),
                    )
                  ],
                ),
              );
            },
          )
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Progress Bar
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'البطاقة ${_currentIndex + 1} من ${_mistakes.length}',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: textMuted),
                  ),
                  if (current['level'] != null)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.orange.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        current['level'] as String,
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.orange),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 10),
              SizedBox(
                height: 8,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: LinearProgressIndicator(
                    value: progress,
                    backgroundColor: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                    valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF10B981)),
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Interactive Flip Card
              GestureDetector(
                onTap: _flipCard,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  curve: Curves.easeInOut,
                  constraints: const BoxConstraints(minHeight: 320),
                  decoration: BoxDecoration(
                    color: cardBg,
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(
                      color: _isFlipped ? const Color(0xFF10B981) : Colors.red.withValues(alpha: 0.5),
                      width: 2,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: isDark ? 0.4 : 0.06),
                        blurRadius: 15,
                        offset: const Offset(0, 8),
                      )
                    ],
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: _isFlipped ? _buildBackSide(current, isDark, textMain, textMuted) : _buildFrontSide(current, isDark, textMain, textMuted),
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Bottom Actions
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  IconButton(
                    icon: const Icon(Icons.arrow_back_ios_new, size: 28),
                    color: textMain,
                    onPressed: _prevCard,
                  ),
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: isMastered ? Colors.grey : const Color(0xFF10B981),
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      elevation: 2,
                    ),
                    onPressed: isMastered ? null : () => _markMastered(current['id'] as String),
                    icon: Icon(isMastered ? Icons.check : Icons.star_border),
                    label: Text(isMastered ? 'تم الحفظ' : 'أتقنت هذا الخطأ (+10 XP)'),
                  ),
                  IconButton(
                    icon: const Icon(Icons.arrow_forward_ios, size: 28),
                    color: textMain,
                    onPressed: _nextCard,
                  ),
                ],
              ),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFrontSide(Map<String, dynamic> item, bool isDark, Color textMain, Color textMuted) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.warning_amber_rounded, color: Colors.red, size: 50),
        const SizedBox(height: 16),
        Text(
          item['titleAr'] as String? ?? 'خطأ شائع',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: textMain),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 24),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.red.withValues(alpha: 0.05),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.red.withValues(alpha: 0.15)),
          ),
          child: Column(
            children: [
              const Text('الجملة الخاطئة ❌', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold, fontSize: 13)),
              const SizedBox(height: 8),
              Text(
                item['wrong'] as String? ?? '',
                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.red, fontStyle: FontStyle.italic),
                textAlign: TextAlign.center,
                textDirection: TextDirection.ltr,
              ),
            ],
          ),
        ),
        const SizedBox(height: 24),
        Text(
          '💡 اضغط على البطاقة لعرض الإجابة الصحيحة وتفسير القاعدة',
          style: TextStyle(fontSize: 12, color: textMuted, fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildBackSide(Map<String, dynamic> item, bool isDark, Color textMain, Color textMuted) {
    final List<dynamic> examples = item['examples'] as List<dynamic>? ?? [];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.check_circle, color: Colors.green, size: 24),
            const SizedBox(width: 8),
            Text(
              'الصواب والجملة الصحيحة ✅',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: textMain),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.green.withValues(alpha: 0.05),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.green.withValues(alpha: 0.15)),
          ),
          child: Text(
            item['right'] as String? ?? '',
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.green),
            textAlign: TextAlign.center,
            textDirection: TextDirection.ltr,
          ),
        ),
        const SizedBox(height: 16),
        if (item['whyAr'] != null) ...[
          const Text('لماذا يقع هذا الخطأ؟ 🤔', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.orange)),
          const SizedBox(height: 4),
          Text(
            item['whyAr'] as String,
            style: TextStyle(fontSize: 13, height: 1.4, color: textMain),
          ),
          const SizedBox(height: 12),
        ],
        if (item['ruleAr'] != null) ...[
          const Text('القاعدة اللغوية 📖', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Color(0xFF10B981))),
          const SizedBox(height: 4),
          Text(
            item['ruleAr'] as String,
            style: TextStyle(fontSize: 13, height: 1.4, color: textMain),
          ),
          const SizedBox(height: 12),
        ],
        if (item['tipAr'] != null) ...[
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.blue.withValues(alpha: 0.05),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.blue.withValues(alpha: 0.1)),
            ),
            child: Row(
              children: [
                const Text('💡', style: TextStyle(fontSize: 20)),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    item['tipAr'] as String,
                    style: TextStyle(fontSize: 12, height: 1.4, color: textMain, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
        ],
        if (examples.isNotEmpty) ...[
          const Text('أمثلة إضافية صحيحة 📝', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.blue)),
          const SizedBox(height: 6),
          ...examples.map((ex) {
            final e = ex as Map<String, dynamic>;
            return Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF0F172A) : Colors.grey[50],
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: isDark ? Colors.white10 : Colors.grey[200]!),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      '❌ ${e["wrong"]}',
                      style: const TextStyle(fontSize: 12, color: Colors.red, fontStyle: FontStyle.italic),
                      textDirection: TextDirection.ltr,
                    ),
                    Text(
                      '✅ ${e["right"]}',
                      style: const TextStyle(fontSize: 13, color: Colors.green, fontWeight: FontWeight.bold),
                      textDirection: TextDirection.ltr,
                    ),
                    const SizedBox(height: 2),
                    Text(
                      '👈 ${e["ar"]}',
                      style: TextStyle(fontSize: 11, color: textMuted),
                    ),
                  ],
                ),
              ),
            );
          }),
        ],
      ],
    );
  }
}
