import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../providers/app_provider.dart';
import 'premium_screen.dart';
import 'login_screen.dart';
import 'contact_screen.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _isChecking = false;

  Future<void> _checkManualUpdates(BuildContext context) async {
    if (kIsWeb) return;
    setState(() => _isChecking = true);
    try {
      final client = HttpClient();
      client.connectionTimeout = const Duration(seconds: 5);
      final request = await client.getUrl(Uri.parse('https://www.b1-syrer.de/config?t=${DateTime.now().millisecondsSinceEpoch}'));
      final response = await request.close();
      if (response.statusCode == 200) {
        final responseBody = await response.transform(utf8.decoder).join();
        final config = json.decode(responseBody) as Map<String, dynamic>;
        
        final remoteVersion = int.tryParse(config['apk_version'] ?? '0') ?? 0;
        const localVersion = AppProvider.appVersion;
        
        if (mounted) {
          if (localVersion < remoteVersion) {
            final apkUrl = config['apk_url'] ?? 'https://b1-syrer.de';
            _showUpdateDialog(context, apkUrl);
          } else {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('أنت تستخدم أحدث إصدار بالفعل! (النسخة $localVersion) 🎉'),
                backgroundColor: Colors.green,
              ),
            );
          }
        }
      } else {
        throw 'خطأ في استجابة الخادم';
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('فشل التحقق من التحديثات: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isChecking = false);
      }
    }
  }

  void _showUpdateDialog(BuildContext context, String downloadUrl) {
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
        content: const Text(
          'يتوفر إصدار جديد يحتوي على دروس إضافية وملخصات وتحسينات هامة للأداء. يرجى تنزيل التحديث للاستمرار بأفضل تجربة تعليمية.',
          style: TextStyle(fontSize: 14, height: 1.5),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: Text('لاحقاً', style: TextStyle(color: isDark ? Colors.white38 : Colors.grey)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF10B981),
              foregroundColor: Colors.white,
            ),
            onPressed: () async {
              final uri = Uri.parse(downloadUrl);
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

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<AppProvider>();
    return Scaffold(
      appBar: AppBar(title: const Text('الإعدادات')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Profile section
          Card(
            child: provider.isLoggedIn
                ? ListTile(
                    leading: const CircleAvatar(
                      backgroundColor: Color(0xFF10B981),
                      child: Icon(Icons.person, color: Colors.white),
                    ),
                    title: Text(provider.userName ?? 'المستخدم', style: const TextStyle(fontWeight: FontWeight.bold)),
                    subtitle: Text(provider.userEmail ?? ''),
                    trailing: TextButton(
                      onPressed: () => provider.logout(),
                      child: const Text('خروج 🚪', style: TextStyle(color: Colors.red)),
                    ),
                  )
                : ListTile(
                    leading: const CircleAvatar(
                      backgroundColor: Colors.grey,
                      child: Icon(Icons.person_outline, color: Colors.white),
                    ),
                    title: const Text('حسابي (مزامنة التقدم)', style: TextStyle(fontWeight: FontWeight.bold)),
                    subtitle: const Text('سجل دخولك لحفظ مستواك ونقاطك'),
                    trailing: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF10B981),
                        foregroundColor: Colors.white,
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (_) => const LoginScreen()),
                        );
                      },
                      child: const Text('دخول'),
                    ),
                  ),
          ),
          const SizedBox(height: 12),
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
                ListTile(
                  leading: const Icon(Icons.info),
                  title: const Text('عن التطبيق'),
                  subtitle: Text('B1 Deutsch للسوريين v2.0 (إصدار ${AppProvider.appVersion})'),
                ),
                if (!kIsWeb)
                  ListTile(
                    leading: const Icon(Icons.system_update),
                    title: const Text('التحقق من وجود تحديثات'),
                    subtitle: const Text('تأكد من استخدامك لآخر إصدار'),
                    trailing: _isChecking
                        ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(strokeWidth: 2),
                          )
                        : const Icon(Icons.refresh),
                    onTap: _isChecking ? null : () => _checkManualUpdates(context),
                  ),
                const ListTile(
                  leading: Icon(Icons.person),
                  title: Text('المطوّر'),
                  subtitle: Text('فادي الحلواني - الحسكة، سوريا'),
                  trailing: Icon(Icons.favorite, color: Colors.red),
                ),
                ListTile(
                  leading: const Icon(Icons.support_agent),
                  title: const Text('تواصل مع الإدارة 💬'),
                  subtitle: const Text('أرسل اقتراحاتك واستفساراتك مباشرة'),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 16),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const ContactScreen()),
                    );
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
