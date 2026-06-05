import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:url_launcher/url_launcher.dart';

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

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {

  @override
  void initState() {
    super.initState();
    // Run update check on startup
    _checkUpdates();
  }

  Future<Map<String, dynamic>?> _fetchConfig() async {
    try {
      final client = HttpClient();
      // Set short connection timeout
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
    final config = await _fetchConfig();

    if (config != null) {
      final remoteVersion = int.tryParse(config['apk_version'] ?? '0') ?? 0;
      const localVersion = 54; // Native app version 54
      if (localVersion < remoteVersion) {
        final apkUrl = config['apk_url'] ?? 'https://www.b1-syrer.de/b1-deutsch.apk';
        _showUpdateDialog(apkUrl);
      }
    }
  }

  void _showUpdateDialog(String downloadUrl) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B), // Slate Dark
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Row(
          children: [
            Icon(Icons.system_update, color: Color(0xFF10B981)),
            SizedBox(width: 8),
            Text(
              'تحديث جديد متوفر! 🚀',
              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18),
            ),
          ],
        ),
        content: const Text(
          'يتوفر إصدار جديد يحتوي على دروس إضافية وملخصات وتحسينات هامة للأداء. يرجى تنزيل التحديث للاستمرار بأفضل تجربة تعليمية.',
          style: TextStyle(color: Colors.white70, fontSize: 14, height: 1.5),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('لاحقاً', style: TextStyle(color: Colors.white38)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF10B981),
              foregroundColor: Colors.white,
            ),
            onPressed: () async {
              final uri = Uri.parse(downloadUrl);
              if (await canLaunchUrl(uri)) {
                await launchUrl(uri, mode: LaunchMode.externalApplication);
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

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<AppProvider>();
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A), // Slate Dark background matching premium look
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: const Color(0xFF10B981),
                borderRadius: BorderRadius.circular(6),
              ),
              child: const Text(
                'B1-B2',
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
              ),
            ),
            const SizedBox(width: 8),
            const Text(
              'Deutsch للسوريين والعرب',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white),
            ),
          ],
        ),
        leading: IconButton(
          icon: Icon(
            provider.isDarkMode ? Icons.wb_sunny : Icons.nightlight_round,
            color: Colors.white,
          ),
          onPressed: () => provider.toggleDarkMode(),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings, color: Colors.white),
            onPressed: () => _navigate(const SettingsScreen()),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _checkUpdates,
        color: const Color(0xFF10B981),
        backgroundColor: const Color(0xFF1E293B),
        child: CustomScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          slivers: [
            // Hero Stats Dashboard Section
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: _buildStatsCard(context, provider, colorScheme),
              ),
            ),

            // Section 1: Telc B1 Preparation
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Row(
                  children: [
                    const Icon(Icons.quiz, color: Color(0xFF10B981), size: 20),
                    const SizedBox(width: 8),
                    Text(
                      'نماذج امتحان Telc B1',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                    ),
                  ],
                ),
              ),
            ),
            SliverPadding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              sliver: SliverGrid(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 1.35,
                ),
                delegate: SliverChildListDelegate([
                  _buildMenuCard(
                    title: 'القراءة (Lesen)',
                    subtitle: '11 نموذج كامل',
                    icon: Icons.menu_book,
                    color: const Color(0xFF2563EB), // Blue
                    onTap: () => _navigate(const LesenScreen()),
                  ),
                  _buildMenuCard(
                    title: 'الاستماع (Hören)',
                    subtitle: '8 نماذج صوتية',
                    icon: Icons.headphones,
                    color: const Color(0xFF7C3AED), // Purple
                    onTap: () => _navigate(const HoerenScreen()),
                  ),
                  _buildMenuCard(
                    title: 'الكتابة (Schreiben)',
                    subtitle: '11 نموذج رسائل',
                    icon: Icons.edit_note,
                    color: const Color(0xFF0D9488), // Teal
                    onTap: () => _navigate(const SchreibenScreen()),
                  ),
                  _buildMenuCard(
                    title: 'المحادثة (Sprechen)',
                    subtitle: '3 أجزاء تفاعلية',
                    icon: Icons.record_voice_over,
                    color: const Color(0xFFEA580C), // Orange
                    onTap: () => _navigate(const SprechenScreen()),
                  ),
                  _buildMenuCard(
                    title: 'Sprachbausteine',
                    subtitle: '5 اختبارات لغة',
                    icon: Icons.extension,
                    color: const Color(0xFF4F46E5), // Indigo
                    onTap: () => _navigate(const SprachbausteineScreen()),
                  ),
                ]),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 16)),

            // Section 2: Grammar & Vocab
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Row(
                  children: [
                    const Icon(Icons.bookmark, color: Color(0xFF10B981), size: 20),
                    const SizedBox(width: 8),
                    Text(
                      'القواعد والمفردات الأساسية',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                    ),
                  ],
                ),
              ),
            ),
            SliverPadding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              sliver: SliverGrid(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 1.35,
                ),
                delegate: SliverChildListDelegate([
                  _buildMenuCard(
                    title: 'قواعد اللغة (Grammatik)',
                    subtitle: '12 درس مع أمثلة',
                    icon: Icons.gavel,
                    color: const Color(0xFF059669), // Emerald
                    onTap: () => _navigate(const GrammatikScreen()),
                  ),
                  _buildMenuCard(
                    title: 'قاموس المفردات (Wortschatz)',
                    subtitle: '500+ كلمة مترجمة',
                    icon: Icons.translate,
                    color: const Color(0xFFDC2626), // Red
                    onTap: () => _navigate(const WortschatzScreen()),
                  ),
                ]),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 16)),

            // Section 3: B2 Upgrade & Golden Resources
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Row(
                  children: [
                    const Icon(Icons.school, color: Color(0xFF10B981), size: 20),
                    const SizedBox(width: 8),
                    Text(
                      'مستوى B2 والمكتبة الذهبية 🎓',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                    ),
                  ],
                ),
              ),
            ),
            SliverPadding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              sliver: SliverGrid(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 1.35,
                ),
                delegate: SliverChildListDelegate([
                  _buildMenuCard(
                    title: 'التحضير لـ B2',
                    subtitle: '5 نماذج امتحانات B2',
                    icon: Icons.auto_stories,
                    color: const Color(0xFFB45309), // Amber
                    onTap: () => _navigate(const B2Screen()),
                  ),
                  _buildMenuCard(
                    title: 'المكتبة والملخصات',
                    subtitle: 'رسائل وقوالب B1-B2',
                    icon: Icons.library_books,
                    color: const Color(0xFF0891B2), // Cyan
                    onTap: () => _navigate(const LibraryScreen()),
                  ),
                  _buildMenuCard(
                    title: 'الحياة في ألمانيا',
                    subtitle: '460+ سؤال وجواب',
                    icon: Icons.flag,
                    color: const Color(0xFF1E3A8A), // Dark Blue
                    onTap: () => _navigate(const LebenScreen()),
                  ),
                  _buildMenuCard(
                    title: 'اختبار الجنسية',
                    subtitle: 'Einbürgerungstest',
                    icon: Icons.account_balance,
                    color: const Color(0xFF475569), // Slate
                    onTap: () => _navigate(const EinbuergerungScreen()),
                  ),
                ]),
              ),
            ),
            const SliverToBoxAdapter(child: SizedBox(height: 32)),
          ],
        ),
      ),
    );
  }

  Widget _buildStatsCard(BuildContext context, AppProvider provider, ColorScheme colorScheme) {
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF334155), width: 1.5),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.3),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            // Circular level indicator
            CircularPercentIndicator(
              radius: 42,
              lineWidth: 7,
              percent: (provider.xp % 100) / 100,
              center: Text(
                '${provider.level}',
                style: const TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF10B981),
                ),
              ),
              progressColor: const Color(0xFF10B981),
              backgroundColor: const Color(0xFF334155),
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
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                      fontSize: 16,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'مجموع نقاط الخبرة: ${provider.xp} XP',
                    style: const TextStyle(
                      color: Colors.white60,
                      fontSize: 13,
                    ),
                  ),
                  const SizedBox(height: 4),
                  // Progress mini-text
                  Text(
                    'النقاط للمستوى التالي: ${100 - (provider.xp % 100)} XP',
                    style: const TextStyle(
                      color: Colors.white38,
                      fontSize: 11,
                    ),
                  ),
                ],
              ),
            ),
            // Fire streak indicator
            Column(
              children: [
                Row(
                  children: [
                    const Icon(Icons.local_fire_department, color: Colors.orange, size: 24),
                    const SizedBox(width: 4),
                    Text(
                      '${provider.streak}',
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
                const Text(
                  'يوم متتالي',
                  style: TextStyle(color: Colors.white38, fontSize: 10),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    const Icon(Icons.check_circle_outline, color: Color(0xFF10B981), size: 18),
                    const SizedBox(width: 4),
                    Text(
                      '${provider.completedQuizzes}',
                      style: const TextStyle(
                        fontSize: 14,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
                const Text(
                  'اختبار مكتمل',
                  style: TextStyle(color: Colors.white38, fontSize: 10),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMenuCard({
    required String title,
    required String subtitle,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF334155), width: 1),
      ),
      child: Card(
        margin: EdgeInsets.zero,
        color: const Color(0xFF1E293B), // Dark Slate
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: onTap,
          splashColor: color.withValues(alpha: 0.1),
          highlightColor: color.withValues(alpha: 0.05),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: color.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Icon(icon, color: color, size: 22),
                    ),
                    const Icon(Icons.arrow_forward_ios, size: 12, color: Colors.white24),
                  ],
                ),
                const SizedBox(height: 8),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 2),
                    Text(
                      subtitle,
                      style: const TextStyle(
                        color: Colors.white38,
                        fontSize: 10,
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
    );
  }
}
