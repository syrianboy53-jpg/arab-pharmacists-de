import 'package:flutter/material.dart';

import '../ammaar_repository.dart';

class MaterialPricesScreen extends StatelessWidget {
  const MaterialPricesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final prices = AmmaarRepository.instance.materialPrices;
    final cs = Theme.of(context).colorScheme;
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(title: const Text('دليل أسعار المواد')),
        body: prices.isEmpty
            ? const Center(child: Text('لا توجد أسعار متوفرة'))
            : Column(
                children: [
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    color: cs.primaryContainer,
                    child: Row(
                      children: [
                        Icon(Icons.info_outline,
                            size: 18, color: cs.onPrimaryContainer),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            'الأسعار تقريبية وتختلف حسب المنطقة والمورّد',
                            style: TextStyle(
                                fontSize: 13,
                                color: cs.onPrimaryContainer),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                    child: ListView.separated(
                      padding: const EdgeInsets.all(16),
                      itemCount: prices.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 8),
                      itemBuilder: (context, i) {
                        final m = prices[i];
                        return Card(
                          child: Padding(
                            padding: const EdgeInsets.all(14),
                            child: Row(
                              children: [
                                CircleAvatar(
                                  backgroundColor:
                                      cs.secondaryContainer,
                                  child: Icon(Icons.construction,
                                      color: cs.onSecondaryContainer,
                                      size: 20),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(m.nameAr,
                                          style: const TextStyle(
                                              fontWeight: FontWeight.bold,
                                              fontSize: 15)),
                                      const SizedBox(height: 4),
                                      Text(
                                        '${_formatPrice(m.price)} ل.س / ${m.unit}',
                                        style: TextStyle(
                                          color: cs.primary,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                if (m.lastUpdated != null)
                                  Text(
                                    m.lastUpdated!,
                                    style: TextStyle(
                                        fontSize: 11, color: cs.outline),
                                  ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
      ),
    );
  }

  String _formatPrice(double price) {
    if (price >= 1000000) {
      final m = price / 1000000;
      return '${m.toStringAsFixed(m.truncateToDouble() == m ? 0 : 1)} مليون';
    }
    if (price >= 1000) {
      final k = price / 1000;
      return '${k.toStringAsFixed(k.truncateToDouble() == k ? 0 : 1)} ألف';
    }
    return price.toStringAsFixed(0);
  }
}
