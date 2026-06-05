import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import 'premium_screen.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<AppProvider>();
    return Scaffold(
      appBar: AppBar(title: const Text('الإعدادات')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: SwitchListTile(
              secondary: const Icon(Icons.dark_mode),
              title: const Text('الوضع الداكن'),
              subtitle: const Text('Dark Mode'),
              value: provider.isDarkMode,
              onChanged: (_) => provider.toggleDarkMode(),
            ),
          ),
          const SizedBox(height: 12),
          Card(
            child: ListTile(
              leading: const Icon(Icons.star, color: Color(0xFFF59E0B)),
              title: const Text('B1-Syrer Premium'),
              subtitle: const Text('تصفح بدون إعلانات وميزات حصرية ⭐'),
              trailing: const Icon(Icons.arrow_forward_ios, size: 16),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const PremiumScreen()),
                );
              },
            ),
          ),
          const SizedBox(height: 12),
          Card(
            child: Column(
              children: [
                ListTile(
                  leading: const Icon(Icons.emoji_events),
                  title: const Text('إحصائياتي'),
                  subtitle: Text('المستوى ${provider.level} - ${provider.levelTitle}'),
                ),
                ListTile(
                  leading: const Icon(Icons.star),
                  title: Text('${provider.xp} XP'),
                  subtitle: const Text('نقاط الخبرة'),
                ),
                ListTile(
                  leading: const Icon(Icons.local_fire_department),
                  title: Text('${provider.streak} يوم'),
                  subtitle: const Text('أيام متتالية'),
                ),
                ListTile(
                  leading: const Icon(Icons.quiz),
                  title: Text('${provider.completedQuizzes} اختبار'),
                  subtitle: const Text('اختبارات مكتملة'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          Card(
            child: Column(
              children: [
                const ListTile(
                  leading: Icon(Icons.info),
                  title: Text('عن التطبيق'),
                  subtitle: Text('B1 Deutsch للسوريين v2.0'),
                ),
                ListTile(
                  leading: const Icon(Icons.person),
                  title: const Text('المطوّر'),
                  subtitle: const Text('فادي الحلواني - الحسكة، سوريا'),
                  trailing: const Icon(Icons.favorite, color: Colors.red),
                ),
                const ListTile(
                  leading: Icon(Icons.email),
                  title: Text('تواصل'),
                  subtitle: Text('shami.fadi@gmx.de'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
