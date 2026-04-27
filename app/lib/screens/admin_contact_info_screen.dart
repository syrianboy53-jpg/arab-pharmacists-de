import 'package:flutter/material.dart';

import '../ammaar_models.dart';
import '../ammaar_repository.dart';

class AdminContactInfoScreen extends StatefulWidget {
  const AdminContactInfoScreen({super.key});

  @override
  State<AdminContactInfoScreen> createState() =>
      _AdminContactInfoScreenState();
}

class _AdminContactInfoScreenState extends State<AdminContactInfoScreen> {
  List<ContactInfo> get _items => AmmaarRepository.instance.contactInfo;

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(title: const Text('وسائل التواصل')),
        floatingActionButton: FloatingActionButton(
          onPressed: _addContact,
          child: const Icon(Icons.add),
        ),
        body: _items.isEmpty
            ? const Center(child: Text('لا توجد وسائل تواصل'))
            : ListView.separated(
                padding: const EdgeInsets.all(16),
                itemCount: _items.length,
                separatorBuilder: (_, __) => const SizedBox(height: 8),
                itemBuilder: (context, i) {
                  final c = _items[i];
                  return Card(
                    child: ListTile(
                      leading: CircleAvatar(
                        backgroundColor: Theme.of(context)
                            .colorScheme
                            .primaryContainer,
                        child: Icon(_typeIcon(c.type)),
                      ),
                      title: Text(c.label),
                      subtitle: Text(c.value),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Switch(
                            value: c.enabled,
                            onChanged: (v) async {
                              setState(() => c.enabled = v);
                              await AmmaarRepository.instance.saveContactInfo();
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.edit, size: 20),
                            onPressed: () => _editContact(c),
                          ),
                          IconButton(
                            icon: Icon(Icons.delete,
                                size: 20,
                                color:
                                    Theme.of(context).colorScheme.error),
                            onPressed: () => _deleteContact(c),
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

  IconData _typeIcon(String type) {
    switch (type) {
      case 'phone':
        return Icons.phone;
      case 'whatsapp':
        return Icons.chat;
      case 'telegram':
        return Icons.send;
      case 'facebook':
        return Icons.facebook;
      case 'email':
        return Icons.email;
      default:
        return Icons.link;
    }
  }

  Future<void> _addContact() async {
    final result = await _showContactDialog();
    if (result != null) {
      await AmmaarRepository.instance.addContactInfo(result);
      setState(() {});
    }
  }

  Future<void> _editContact(ContactInfo info) async {
    final result = await _showContactDialog(existing: info);
    if (result != null) {
      info.label = result.label;
      info.value = result.value;
      info.enabled = result.enabled;
      await AmmaarRepository.instance.saveContactInfo();
      setState(() {});
    }
  }

  Future<void> _deleteContact(ContactInfo info) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => Directionality(
        textDirection: TextDirection.rtl,
        child: AlertDialog(
          title: const Text('حذف وسيلة التواصل'),
          content: Text('هل تريد حذف "${info.label}"؟'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx, false),
              child: const Text('إلغاء'),
            ),
            TextButton(
              onPressed: () => Navigator.pop(ctx, true),
              style: TextButton.styleFrom(foregroundColor: Colors.red),
              child: const Text('حذف'),
            ),
          ],
        ),
      ),
    );
    if (confirm == true) {
      await AmmaarRepository.instance.removeContactInfo(info.id);
      setState(() {});
    }
  }

  Future<ContactInfo?> _showContactDialog({ContactInfo? existing}) async {
    final labelCtrl = TextEditingController(text: existing?.label ?? '');
    final valueCtrl = TextEditingController(text: existing?.value ?? '');
    String type = existing?.type ?? 'phone';

    return showDialog<ContactInfo>(
      context: context,
      builder: (ctx) => Directionality(
        textDirection: TextDirection.rtl,
        child: StatefulBuilder(
          builder: (ctx, setDialogState) => AlertDialog(
            title: Text(
                existing == null ? 'إضافة وسيلة تواصل' : 'تعديل وسيلة التواصل'),
            content: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  DropdownButtonFormField<String>(
                    value: type,
                    decoration: const InputDecoration(labelText: 'النوع'),
                    items: const [
                      DropdownMenuItem(value: 'phone', child: Text('هاتف')),
                      DropdownMenuItem(
                          value: 'whatsapp', child: Text('واتساب')),
                      DropdownMenuItem(
                          value: 'telegram', child: Text('تلغرام')),
                      DropdownMenuItem(
                          value: 'facebook', child: Text('فيسبوك')),
                      DropdownMenuItem(
                          value: 'email', child: Text('بريد إلكتروني')),
                      DropdownMenuItem(value: 'other', child: Text('أخرى')),
                    ],
                    onChanged: (v) => setDialogState(() => type = v ?? type),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: labelCtrl,
                    decoration: const InputDecoration(labelText: 'الاسم'),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: valueCtrl,
                    decoration:
                        const InputDecoration(labelText: 'الرقم / الرابط'),
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
                  if (labelCtrl.text.isEmpty || valueCtrl.text.isEmpty) return;
                  Navigator.pop(
                    ctx,
                    ContactInfo(
                      id: existing?.id ??
                          'ci_${DateTime.now().millisecondsSinceEpoch}',
                      type: type,
                      label: labelCtrl.text,
                      value: valueCtrl.text,
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
