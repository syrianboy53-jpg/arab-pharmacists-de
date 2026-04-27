import 'package:flutter/material.dart';

import '../ammaar_models.dart';
import '../ammaar_repository.dart';

class AdminPaymentAccountsScreen extends StatefulWidget {
  const AdminPaymentAccountsScreen({super.key});

  @override
  State<AdminPaymentAccountsScreen> createState() =>
      _AdminPaymentAccountsScreenState();
}

class _AdminPaymentAccountsScreenState
    extends State<AdminPaymentAccountsScreen> {
  List<PaymentAccount> get _accounts =>
      AmmaarRepository.instance.paymentAccounts;

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(title: const Text('حسابات الدفع')),
        floatingActionButton: FloatingActionButton(
          onPressed: _addAccount,
          child: const Icon(Icons.add),
        ),
        body: _accounts.isEmpty
            ? const Center(child: Text('لا توجد حسابات دفع'))
            : ListView.separated(
                padding: const EdgeInsets.all(16),
                itemCount: _accounts.length,
                separatorBuilder: (_, __) => const SizedBox(height: 8),
                itemBuilder: (context, i) {
                  final a = _accounts[i];
                  return Card(
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              _methodIcon(a.method),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  a.label,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 16,
                                  ),
                                ),
                              ),
                              Switch(
                                value: a.enabled,
                                onChanged: (v) async {
                                  setState(() => a.enabled = v);
                                  await AmmaarRepository.instance
                                      .savePaymentAccounts();
                                },
                              ),
                            ],
                          ),
                          const Divider(),
                          _infoRow('رقم الحساب', a.accountNumber),
                          _infoRow('اسم صاحب الحساب', a.holderName),
                          const SizedBox(height: 8),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              TextButton.icon(
                                icon: const Icon(Icons.edit, size: 18),
                                label: const Text('تعديل'),
                                onPressed: () => _editAccount(a),
                              ),
                              TextButton.icon(
                                icon: const Icon(Icons.delete, size: 18),
                                label: const Text('حذف'),
                                style: TextButton.styleFrom(
                                  foregroundColor:
                                      Theme.of(context).colorScheme.error,
                                ),
                                onPressed: () => _deleteAccount(a),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
      ),
    );
  }

  Widget _methodIcon(String method) {
    IconData icon;
    switch (method) {
      case 'syriatel_cash':
        icon = Icons.phone_android;
      case 'sham_cash':
        icon = Icons.phone_iphone;
      case 'al_haram':
        icon = Icons.send;
      default:
        icon = Icons.account_balance;
    }
    return Icon(icon, color: Theme.of(context).colorScheme.primary);
  }

  Widget _infoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Row(
        children: [
          Text('$label: ',
              style: TextStyle(color: Colors.grey[600], fontSize: 13)),
          Expanded(
            child: Text(value,
                style:
                    const TextStyle(fontWeight: FontWeight.w500, fontSize: 14)),
          ),
        ],
      ),
    );
  }

  Future<void> _addAccount() async {
    final result = await _showAccountDialog();
    if (result != null) {
      await AmmaarRepository.instance.addPaymentAccount(result);
      setState(() {});
    }
  }

  Future<void> _editAccount(PaymentAccount account) async {
    final result = await _showAccountDialog(existing: account);
    if (result != null) {
      account.label = result.label;
      account.accountNumber = result.accountNumber;
      account.holderName = result.holderName;
      account.enabled = result.enabled;
      await AmmaarRepository.instance.savePaymentAccounts();
      setState(() {});
    }
  }

  Future<void> _deleteAccount(PaymentAccount account) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => Directionality(
        textDirection: TextDirection.rtl,
        child: AlertDialog(
          title: const Text('حذف الحساب'),
          content: Text('هل تريد حذف "${account.label}"؟'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx, false),
              child: const Text('إلغاء'),
            ),
            TextButton(
              onPressed: () => Navigator.pop(ctx, true),
              style:
                  TextButton.styleFrom(foregroundColor: Colors.red),
              child: const Text('حذف'),
            ),
          ],
        ),
      ),
    );
    if (confirm == true) {
      await AmmaarRepository.instance.removePaymentAccount(account.id);
      setState(() {});
    }
  }

  Future<PaymentAccount?> _showAccountDialog({
    PaymentAccount? existing,
  }) async {
    final labelCtrl = TextEditingController(text: existing?.label ?? '');
    final numCtrl =
        TextEditingController(text: existing?.accountNumber ?? '');
    final holderCtrl =
        TextEditingController(text: existing?.holderName ?? '');
    String method = existing?.method ?? 'syriatel_cash';

    return showDialog<PaymentAccount>(
      context: context,
      builder: (ctx) => Directionality(
        textDirection: TextDirection.rtl,
        child: StatefulBuilder(
          builder: (ctx, setDialogState) => AlertDialog(
            title: Text(existing == null ? 'إضافة حساب دفع' : 'تعديل الحساب'),
            content: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  DropdownButtonFormField<String>(
                    value: method,
                    decoration: const InputDecoration(labelText: 'نوع الوسيلة'),
                    items: const [
                      DropdownMenuItem(
                          value: 'syriatel_cash', child: Text('سيريتل كاش')),
                      DropdownMenuItem(
                          value: 'sham_cash', child: Text('شام كاش')),
                      DropdownMenuItem(
                          value: 'al_haram', child: Text('الهرم للحوالات')),
                      DropdownMenuItem(
                          value: 'other', child: Text('أخرى')),
                    ],
                    onChanged: (v) =>
                        setDialogState(() => method = v ?? method),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: labelCtrl,
                    decoration: const InputDecoration(labelText: 'الاسم'),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: numCtrl,
                    decoration: const InputDecoration(labelText: 'رقم الحساب'),
                    keyboardType: TextInputType.phone,
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: holderCtrl,
                    decoration:
                        const InputDecoration(labelText: 'اسم صاحب الحساب'),
                  ),
                ],
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('إلغاء'),
              ),
              FilledButton(
                onPressed: () {
                  if (labelCtrl.text.isEmpty || numCtrl.text.isEmpty) return;
                  Navigator.pop(
                    ctx,
                    PaymentAccount(
                      id: existing?.id ??
                          'pa_${DateTime.now().millisecondsSinceEpoch}',
                      method: method,
                      label: labelCtrl.text,
                      accountNumber: numCtrl.text,
                      holderName: holderCtrl.text,
                      enabled: existing?.enabled ?? true,
                    ),
                  );
                },
                child: const Text('حفظ'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
