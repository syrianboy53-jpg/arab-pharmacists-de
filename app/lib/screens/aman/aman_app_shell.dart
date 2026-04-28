import 'package:flutter/material.dart';

import 'aman_home_screen.dart';
import 'ask_expert_screen.dart';
import 'consultant_dashboard_screen.dart';
import 'emergency_support_screen.dart';
import 'help_map_screen.dart';
import 'jugendamt_risk_screen.dart';
import 'legal_compliance_screen.dart';
import 'legal_guide_screen.dart';
import 'podcast_screen.dart';
import 'private_session_booking_screen.dart';
import 'relationship_quiz_screen.dart';
import 'stories_screen.dart';
import 'subscription_screen.dart';

/// Root shell for the أمان app — provides bottom navigation + drawer.
class AmanAppShell extends StatefulWidget {
  const AmanAppShell({super.key});

  @override
  State<AmanAppShell> createState() => _AmanAppShellState();
}

class _AmanAppShellState extends State<AmanAppShell> {
  int _tabIndex = 0;

  static const _tabTitles = ['أمان', 'اسأل خبيراً', 'القانون', 'الطوارئ', 'المزيد'];

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: Row(
            children: [
              const Icon(Icons.shield, size: 24),
              const SizedBox(width: 8),
              Text(_tabTitles[_tabIndex]),
            ],
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.lock_outline, size: 20),
              tooltip: 'الجلسة السرية',
              onPressed: () => _push(const PrivateSessionBookingScreen()),
            ),
          ],
        ),
        drawer: _buildDrawer(context, cs),
        body: IndexedStack(
          index: _tabIndex,
          children: const [
            AmanHomeScreen(),
            AskExpertScreen(embedded: true),
            LegalGuideScreen(embedded: true),
            EmergencySupportScreen(embedded: true),
            _MoreTab(),
          ],
        ),
        bottomNavigationBar: NavigationBar(
          selectedIndex: _tabIndex,
          onDestinationSelected: (i) => setState(() => _tabIndex = i),
          destinations: const [
            NavigationDestination(
              icon: Icon(Icons.home_outlined),
              selectedIcon: Icon(Icons.home),
              label: 'الرئيسية',
            ),
            NavigationDestination(
              icon: Icon(Icons.question_answer_outlined),
              selectedIcon: Icon(Icons.question_answer),
              label: 'اسأل خبيراً',
            ),
            NavigationDestination(
              icon: Icon(Icons.gavel_outlined),
              selectedIcon: Icon(Icons.gavel),
              label: 'القانون',
            ),
            NavigationDestination(
              icon: Icon(Icons.emergency_outlined),
              selectedIcon: Icon(Icons.emergency),
              label: 'الطوارئ',
            ),
            NavigationDestination(
              icon: Icon(Icons.apps_outlined),
              selectedIcon: Icon(Icons.apps),
              label: 'المزيد',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDrawer(BuildContext context, ColorScheme cs) {
    return Drawer(
      child: Directionality(
        textDirection: TextDirection.rtl,
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(color: cs.primary),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Icon(Icons.shield, size: 40, color: cs.onPrimary),
                  const SizedBox(height: 8),
                  Text(
                    'أمان',
                    style: TextStyle(
                      color: cs.onPrimary,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'صديقك الناصح في ألمانيا',
                    style: TextStyle(
                      color: cs.onPrimary.withOpacity(0.8),
                      fontSize: 13,
                    ),
                  ),
                ],
              ),
            ),
            ListTile(
              leading: const Icon(Icons.shield_outlined),
              title: const Text('الجلسة السرية'),
              subtitle: const Text('جلسة مشفرة 25 دقيقة بـ 1€'),
              onTap: () {
                Navigator.pop(context);
                _push(const PrivateSessionBookingScreen());
              },
            ),
            ListTile(
              leading: const Icon(Icons.shield_outlined),
              title: const Text('كاشف خطر اليوجند أمت'),
              subtitle: const Text('هل تصرفاتي تستدعي تدخل السلطات؟'),
              onTap: () {
                Navigator.pop(context);
                _push(const JugendamtRiskScreen());
              },
            ),
            const Divider(),
            ListTile(
              leading: const Icon(Icons.star),
              title: const Text('خطط الاشتراك'),
              subtitle: const Text('مجاني / مميز'),
              onTap: () {
                Navigator.pop(context);
                _push(const SubscriptionScreen());
              },
            ),
            ListTile(
              leading: const Icon(Icons.dashboard),
              title: const Text('لوحة المستشار'),
              subtitle: const Text('إدارة الاستشارات'),
              onTap: () {
                Navigator.pop(context);
                _push(const ConsultantDashboardScreen());
              },
            ),
            const Divider(),
            ListTile(
              leading: const Icon(Icons.gavel),
              title: const Text('الشروط القانونية'),
              subtitle: const Text('Impressum, DSGVO, AGB'),
              onTap: () {
                Navigator.pop(context);
                _push(const LegalComplianceScreen());
              },
            ),
          ],
        ),
      ),
    );
  }

  void _push(Widget screen) {
    Navigator.push(
      context,
      MaterialPageRoute<void>(builder: (_) => screen),
    );
  }
}

/// "More" tab showing additional features in a grid/list.
class _MoreTab extends StatelessWidget {
  const _MoreTab();

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(
            'ميزات إضافية',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 12),

          _MoreItem(
            icon: Icons.auto_stories,
            title: 'قصص وعبر',
            subtitle: 'تجارب حقيقية ومحاكاة نتائج الطلاق',
            color: Colors.orange,
            onTap: () => _push(context, const StoriesScreen()),
          ),
          _MoreItem(
            icon: Icons.psychology,
            title: 'هل نحن بخير؟',
            subtitle: 'اختبار العلاقة بين الزوجين',
            color: Colors.purple,
            onTap: () => _push(context, const RelationshipQuizScreen()),
          ),
          _MoreItem(
            icon: Icons.podcasts,
            title: 'بودكاست أمان',
            subtitle: 'حلقات صوتية قصيرة عن مشاكل شائعة',
            color: Colors.teal,
            onTap: () => _push(context, const PodcastScreen()),
          ),
          _MoreItem(
            icon: Icons.map,
            title: 'خريطة المساعدة',
            subtitle: 'أقرب مراكز استشارية عربية في مدينتك',
            color: Colors.green,
            onTap: () => _push(context, const HelpMapScreen()),
          ),
          _MoreItem(
            icon: Icons.shield_outlined,
            title: 'كاشف خطر اليوجند أمت',
            subtitle: 'هل تصرفاتي تستدعي تدخل السلطات؟',
            color: Colors.deepOrange,
            onTap: () => _push(context, const JugendamtRiskScreen()),
          ),

          const SizedBox(height: 20),
          Text(
            'الإدارة والشروط',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 12),

          _MoreItem(
            icon: Icons.lock,
            title: 'الجلسة السرية',
            subtitle: 'جلسة مشفرة 25 دقيقة بـ 1€',
            color: Colors.teal.shade800,
            onTap: () => _push(context, const PrivateSessionBookingScreen()),
          ),
          _MoreItem(
            icon: Icons.star,
            title: 'خطط الاشتراك',
            subtitle: 'مجاني / مميز — 4€ شهرياً أو 40€ سنوياً',
            color: Colors.amber.shade700,
            onTap: () => _push(context, const SubscriptionScreen()),
          ),
          _MoreItem(
            icon: Icons.dashboard,
            title: 'لوحة المستشار',
            subtitle: 'إدارة الاستشارات الواردة',
            color: Colors.blueGrey,
            onTap: () => _push(context, const ConsultantDashboardScreen()),
          ),
          _MoreItem(
            icon: Icons.gavel,
            title: 'الشروط القانونية',
            subtitle: 'Impressum, DSGVO, AGB',
            color: Colors.grey,
            onTap: () => _push(context, const LegalComplianceScreen()),
          ),
        ],
      ),
    );
  }

  void _push(BuildContext context, Widget screen) {
    Navigator.push(
      context,
      MaterialPageRoute<void>(builder: (_) => screen),
    );
  }
}

class _MoreItem extends StatelessWidget {
  const _MoreItem({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.color,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final Color color;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 10),
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(
            children: [
              CircleAvatar(
                radius: 22,
                backgroundColor: color.withOpacity(0.15),
                child: Icon(icon, color: color, size: 24),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title,
                        style: const TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 15)),
                    const SizedBox(height: 2),
                    Text(subtitle,
                        style: TextStyle(
                            fontSize: 12,
                            color: Theme.of(context)
                                .colorScheme
                                .onSurfaceVariant)),
                  ],
                ),
              ),
              const Icon(Icons.chevron_left),
            ],
          ),
        ),
      ),
    );
  }
}
