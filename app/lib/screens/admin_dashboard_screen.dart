import 'package:flutter/material.dart';

import 'admin_payment_accounts_screen.dart';
import 'admin_contact_info_screen.dart';
import 'admin_subscriptions_screen.dart';
import 'admin_material_prices_screen.dart';

class AdminDashboardScreen extends StatelessWidget {
  const AdminDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(title: const Text('لوحة التحكم — عمّار')),
        body: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _AdminTile(
              icon: Icons.account_balance_wallet,
              title: 'حسابات الدفع',
              subtitle: 'تعديل أرقام سيريتل كاش، شام كاش، الهرم',
              color: cs.primary,
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute<void>(
                  builder: (_) => const AdminPaymentAccountsScreen(),
                ),
              ),
            ),
            const SizedBox(height: 12),
            _AdminTile(
              icon: Icons.contacts,
              title: 'وسائل التواصل',
              subtitle: 'هاتف، واتساب، تلغرام، فيسبوك',
              color: cs.tertiary,
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute<void>(
                  builder: (_) => const AdminContactInfoScreen(),
                ),
              ),
            ),
            const SizedBox(height: 12),
            _AdminTile(
              icon: Icons.card_membership,
              title: 'إدارة الاشتراكات',
              subtitle: 'تفعيل / تعطيل اشتراكات المستخدمين',
              color: cs.secondary,
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute<void>(
                  builder: (_) => const AdminSubscriptionsScreen(),
                ),
              ),
            ),
            const SizedBox(height: 12),
            _AdminTile(
              icon: Icons.price_change,
              title: 'أسعار المواد',
              subtitle: 'تحديث أسعار مواد البناء يدوياً',
              color: cs.error,
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute<void>(
                  builder: (_) => const AdminMaterialPricesScreen(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AdminTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final Color color;
  final VoidCallback onTap;

  const _AdminTile({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: color.withOpacity(0.15),
          child: Icon(icon, color: color),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.chevron_left),
        onTap: onTap,
      ),
    );
  }
}
