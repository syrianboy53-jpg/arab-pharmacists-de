import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';

import '../providers/app_provider.dart';
import 'lesen_screen.dart';
import 'hoeren_screen.dart';
import 'schreiben_screen.dart';
import 'sprechen_screen.dart';
import 'grammatik_screen.dart';
import 'wortschatz_screen.dart';
import 'sprachbausteine_screen.dart';
import 'leben_screen.dart';
import 'einbuergerung_screen.dart';
import 'b2_screen.dart';
import 'settings_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<AppProvider>();
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar.large(
            title: const Text('B1 Deutsch'),
            actions: [
              IconButton(
                icon: Icon(provider.isDarkMode ? Icons.light_mode : Icons.dark_mode),
                onPressed: provider.toggleDarkMode,
              ),
              IconButton(
                icon: const Icon(Icons.settings),
                onPressed: () => Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const SettingsScreen()),
                ),
              ),
            ],
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: _buildStatsCard(context, provider, colorScheme),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Text(
                'أقسام الامتحان',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.all(16),
            sliver: SliverGrid(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                childAspectRatio: 1.1,
              ),
              delegate: SliverChildListDelegate([
                _buildSectionCard(
                  context,
                  icon: Icons.auto_stories,
                  title: 'القراءة',
                  subtitle: 'Lesen',
                  color: const Color(0xFF1565C0),
                  onTap: () => _navigate(context, const LesenScreen()),
                ),
                _buildSectionCard(
                  context,
                  icon: Icons.headphones,
                  title: 'الاستماع',
                  subtitle: 'Hören',
                  color: const Color(0xFF7B1FA2),
                  onTap: () => _navigate(context, const HoerenScreen()),
                ),
                _buildSectionCard(
                  context,
                  icon: Icons.edit_note,
                  title: 'الكتابة',
                  subtitle: 'Schreiben',
                  color: const Color(0xFF00695C),
                  onTap: () => _navigate(context, const SchreibenScreen()),
                ),
                _buildSectionCard(
                  context,
                  icon: Icons.record_voice_over,
                  title: 'المحادثة',
                  subtitle: 'Sprechen',
                  color: const Color(0xFFE65100),
                  onTap: () => _navigate(context, const SprechenScreen()),
                ),
                _buildSectionCard(
                  context,
                  icon: Icons.extension,
                  title: 'Sprachbausteine',
                  subtitle: 'تراكيب لغوية',
                  color: const Color(0xFF4527A0),
                  onTap: () => _navigate(context, const SprachbausteineScreen()),
                ),
                _buildSectionCard(
                  context,
                  icon: Icons.menu_book,
                  title: 'القواعد',
                  subtitle: 'Grammatik',
                  color: const Color(0xFF1B5E20),
                  onTap: () => _navigate(context, const GrammatikScreen()),
                ),
                _buildSectionCard(
                  context,
                  icon: Icons.translate,
                  title: 'المفردات',
                  subtitle: 'Wortschatz',
                  color: const Color(0xFFC62828),
                  onTap: () => _navigate(context, const WortschatzScreen()),
                ),
                _buildSectionCard(
                  context,
                  icon: Icons.flag,
                  title: 'الحياة في ألمانيا',
                  subtitle: 'Leben in DE',
                  color: const Color(0xFF283593),
                  onTap: () => _navigate(context, const LebenScreen()),
                ),
              ]),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Text(
                'أقسام إضافية',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.all(16),
            sliver: SliverGrid(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                childAspectRatio: 1.1,
              ),
              delegate: SliverChildListDelegate([
                _buildSectionCard(
                  context,
                  icon: Icons.account_balance,
                  title: 'اختبار الجنسية',
                  subtitle: 'Einbürgerungstest',
                  color: const Color(0xFF37474F),
                  onTap: () => _navigate(context, const EinbuergerungScreen()),
                ),
                _buildSectionCard(
                  context,
                  icon: Icons.trending_up,
                  title: 'مستوى B2',
                  subtitle: 'B2 Prüfung',
                  color: const Color(0xFF880E4F),
                  onTap: () => _navigate(context, const B2Screen()),
                ),
              ]),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 32)),
        ],
      ),
    );
  }

  Widget _buildStatsCard(BuildContext context, AppProvider provider, ColorScheme colorScheme) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            CircularPercentIndicator(
              radius: 40,
              lineWidth: 8,
              percent: (provider.xp % 100) / 100,
              center: Text(
                '${provider.level}',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: colorScheme.primary,
                ),
              ),
              progressColor: colorScheme.primary,
              backgroundColor: colorScheme.primaryContainer,
              circularStrokeCap: CircularStrokeCap.round,
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    provider.levelTitle,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${provider.xp} XP',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            Column(
              children: [
                Row(
                  children: [
                    Icon(Icons.local_fire_department, color: Colors.orange, size: 20),
                    const SizedBox(width: 4),
                    Text('${provider.streak}', style: Theme.of(context).textTheme.titleMedium),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.quiz, color: colorScheme.primary, size: 20),
                    const SizedBox(width: 4),
                    Text('${provider.completedQuizzes}', style: Theme.of(context).textTheme.titleMedium),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionCard(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [color, color.withValues(alpha: 0.7)],
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon, size: 40, color: Colors.white),
                const SizedBox(height: 12),
                Text(
                  title,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: TextStyle(
                    color: Colors.white.withValues(alpha: 0.8),
                    fontSize: 12,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _navigate(BuildContext context, Widget screen) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => screen));
  }
}
