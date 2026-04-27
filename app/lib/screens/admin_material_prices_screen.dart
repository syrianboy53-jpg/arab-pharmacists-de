import 'package:flutter/material.dart';

import '../ammaar_models.dart';
import '../ammaar_repository.dart';

class AdminMaterialPricesScreen extends StatefulWidget {
  const AdminMaterialPricesScreen({super.key});

  @override
  State<AdminMaterialPricesScreen> createState() =>
      _AdminMaterialPricesScreenState();
}

class _AdminMaterialPricesScreenState extends State<AdminMaterialPricesScreen> {
  List<MaterialPrice> get _prices => AmmaarRepository.instance.materialPrices;

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(title: const Text('تحديث أسعار المواد')),
        floatingActionButton: FloatingActionButton(
          onPressed: _addMaterial,
          child: const Icon(Icons.add),
        ),
        body: _prices.isEmpty
            ? const Center(child: Text('لا توجد مواد'))
            : ListView.separated(
                padding: const EdgeInsets.all(16),
                itemCount: _prices.length,
                separatorBuilder: (_, __) => const SizedBox(height: 8),
                itemBuilder: (context, i) {
                  final m = _prices[i];
                  return Card(
                    child: ListTile(
                      title: Text(m.nameAr,
                          style: const TextStyle(fontWeight: FontWeight.bold)),
                      subtitle: Text(
                        '${_formatPrice(m.price)} ل.س / ${m.unit}'
                        '${m.lastUpdated != null ? "\nآخر تحديث: ${m.lastUpdated}" : ""}',
                      ),
                      isThreeLine: m.lastUpdated != null,
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: const Icon(Icons.edit, size: 20),
                            onPressed: () => _editMaterial(m),
                          ),
                          IconButton(
                            icon: Icon(Icons.delete,
                                size: 20,
                                color: Theme.of(context).colorScheme.error),
                            onPressed: () => _deleteMaterial(m),
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

  String _formatPrice(double price) {
    if (price >= 1000000) {
      final millions = price / 1000000;
      return '${millions.toStringAsFixed(millions.truncateToDouble() == millions ? 0 : 1)} مليون';
    }
    if (price >= 1000) {
      final thousands = price / 1000;
      return '${thousands.toStringAsFixed(thousands.truncateToDouble() == thousands ? 0 : 1)} ألف';
    }
    return price.toStringAsFixed(0);
  }

  Future<void> _addMaterial() async {
    final result = await _showMaterialDialog();
    if (result != null) {
      await AmmaarRepository.instance.addMaterialPrice(result);
      setState(() {});
    }
  }

  Future<void> _editMaterial(MaterialPrice material) async {
    final result = await _showMaterialDialog(existing: material);
    if (result != null) {
      material.nameAr = result.nameAr;
      material.unit = result.unit;
      material.price = result.price;
      material.lastUpdated = result.lastUpdated;
      material.source = result.source;
      await AmmaarRepository.instance.saveMaterialPrices();
      setState(() {});
    }
  }

  Future<void> _deleteMaterial(MaterialPrice material) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => Directionality(
        textDirection: TextDirection.rtl,
        child: AlertDialog(
          title: const Text('حذف المادة'),
          content: Text('هل تريد حذف "${material.nameAr}"؟'),
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
      await AmmaarRepository.instance.removeMaterialPrice(material.id);
      setState(() {});
    }
  }

  Future<MaterialPrice?> _showMaterialDialog({
    MaterialPrice? existing,
  }) async {
    final nameCtrl = TextEditingController(text: existing?.nameAr ?? '');
    final unitCtrl = TextEditingController(text: existing?.unit ?? '');
    final priceCtrl = TextEditingController(
        text: existing != null ? existing.price.toStringAsFixed(0) : '');

    return showDialog<MaterialPrice>(
      context: context,
      builder: (ctx) => Directionality(
        textDirection: TextDirection.rtl,
        child: AlertDialog(
          title: Text(existing == null ? 'إضافة مادة' : 'تعديل السعر'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: nameCtrl,
                  decoration:
                      const InputDecoration(labelText: 'اسم المادة بالعربي'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: unitCtrl,
                  decoration: const InputDecoration(
                      labelText: 'وحدة القياس (طن، كيس، متر...)'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: priceCtrl,
                  decoration:
                      const InputDecoration(labelText: 'السعر (ليرة سورية)'),
                  keyboardType: TextInputType.number,
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
                final price = double.tryParse(priceCtrl.text);
                if (nameCtrl.text.isEmpty ||
                    unitCtrl.text.isEmpty ||
                    price == null) {
                  return;
                }
                final now = DateTime.now();
                Navigator.pop(
                  ctx,
                  MaterialPrice(
                    id: existing?.id ??
                        'mp_${now.millisecondsSinceEpoch}',
                    nameAr: nameCtrl.text,
                    unit: unitCtrl.text,
                    price: price,
                    lastUpdated:
                        '${now.year}-${now.month.toString().padLeft(2, '0')}-${now.day.toString().padLeft(2, '0')}',
                    source: 'manual',
                  ),
                );
              },
              child: const Text('حفظ'),
            ),
          ],
        ),
      ),
    );
  }
}
