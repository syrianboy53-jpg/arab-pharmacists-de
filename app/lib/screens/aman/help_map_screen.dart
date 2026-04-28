import 'package:flutter/material.dart';

import '../../aman_models.dart';
import '../../aman_repository.dart';

class HelpMapScreen extends StatefulWidget {
  const HelpMapScreen({super.key});

  @override
  State<HelpMapScreen> createState() => _HelpMapScreenState();
}

class _HelpMapScreenState extends State<HelpMapScreen> {
  String _searchQuery = '';
  String? _selectedType;
  String? _selectedCity;

  static const _typeLabels = {
    null: 'الكل',
    'counseling': 'استشارات',
    'legal': 'قانوني',
    'psychological': 'نفسي',
    'social': 'اجتماعي',
  };

  @override
  Widget build(BuildContext context) {
    var centers = AmanRepository.instance.searchHelpCenters(_searchQuery);
    if (_selectedType != null) {
      centers = centers.where((c) => c.type == _selectedType).toList();
    }
    if (_selectedCity != null) {
      centers = centers.where((c) => c.city == _selectedCity).toList();
    }

    final allCities =
        AmanRepository.instance.helpCenters.map((c) => c.city).toSet().toList()
          ..sort();
    final cs = Theme.of(context).colorScheme;

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('خريطة المساعدة'),
        ),
        body: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(12),
              child: TextField(
                decoration: const InputDecoration(
                  hintText: 'ابحث عن مركز أو مدينة...',
                  prefixIcon: Icon(Icons.search),
                  border: OutlineInputBorder(),
                ),
                onChanged: (v) => setState(() => _searchQuery = v),
              ),
            ),
            SizedBox(
              height: 40,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 12),
                children: _typeLabels.entries
                    .map((e) => Padding(
                          padding: const EdgeInsetsDirectional.only(end: 8),
                          child: FilterChip(
                            selected: _selectedType == e.key,
                            label: Text(e.value),
                            onSelected: (_) =>
                                setState(() => _selectedType = e.key),
                          ),
                        ))
                    .toList(),
              ),
            ),
            const SizedBox(height: 8),
            SizedBox(
              height: 40,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 12),
                children: [
                  Padding(
                    padding: const EdgeInsetsDirectional.only(end: 8),
                    child: FilterChip(
                      selected: _selectedCity == null,
                      label: const Text('كل المدن'),
                      onSelected: (_) =>
                          setState(() => _selectedCity = null),
                    ),
                  ),
                  ...allCities.map((city) => Padding(
                        padding: const EdgeInsetsDirectional.only(end: 8),
                        child: FilterChip(
                          selected: _selectedCity == city,
                          label: Text(city),
                          onSelected: (_) =>
                              setState(() => _selectedCity = city),
                        ),
                      )),
                ],
              ),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: centers.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.search_off,
                              size: 48, color: cs.onSurfaceVariant),
                          const SizedBox(height: 8),
                          Text('لم يتم العثور على نتائج',
                              style:
                                  TextStyle(color: cs.onSurfaceVariant)),
                        ],
                      ),
                    )
                  : ListView.builder(
                      padding: const EdgeInsets.all(12),
                      itemCount: centers.length,
                      itemBuilder: (context, i) =>
                          _HelpCenterCard(center: centers[i]),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

class _HelpCenterCard extends StatelessWidget {
  const _HelpCenterCard({required this.center});
  final HelpCenter center;

  IconData _iconForType(String type) {
    switch (type) {
      case 'counseling':
        return Icons.support_agent;
      case 'legal':
        return Icons.gavel;
      case 'psychological':
        return Icons.psychology;
      case 'social':
        return Icons.groups;
      default:
        return Icons.location_on;
    }
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(
                  backgroundColor: cs.primaryContainer,
                  child: Icon(_iconForType(center.type),
                      color: cs.onPrimaryContainer),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(center.nameAr,
                          style: const TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 15)),
                      Row(
                        children: [
                          Icon(Icons.location_on,
                              size: 14, color: cs.primary),
                          const SizedBox(width: 4),
                          Text(center.city,
                              style: TextStyle(
                                  color: cs.primary, fontSize: 13)),
                        ],
                      ),
                    ],
                  ),
                ),
                if (center.speaksArabic)
                  const Chip(
                    avatar: Icon(Icons.translate, size: 14),
                    label:
                        Text('عربي', style: TextStyle(fontSize: 11)),
                    visualDensity: VisualDensity.compact,
                  ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Icon(Icons.place, size: 14, color: cs.onSurfaceVariant),
                const SizedBox(width: 4),
                Expanded(
                  child: Text(
                    center.address,
                    style:
                        TextStyle(fontSize: 13, color: cs.onSurfaceVariant),
                  ),
                ),
              ],
            ),
            if (center.phone != null || center.website != null) ...[
              const Divider(),
              Row(
                children: [
                  if (center.phone != null)
                    TextButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.phone, size: 16),
                      label: Text(center.phone!),
                    ),
                  if (center.website != null)
                    TextButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.language, size: 16),
                      label: const Text('الموقع'),
                    ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }
}
