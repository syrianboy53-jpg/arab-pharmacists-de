import 'package:flutter/material.dart';

import '../../aman_models.dart';
import '../../aman_repository.dart';

class EmergencySupportScreen extends StatelessWidget {
  const EmergencySupportScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final resources = AmanRepository.instance.emergencyResources;
    final explanations = AmanRepository.instance.legalExplanations;
    final cs = Theme.of(context).colorScheme;
    final emergency = resources.where((r) => r.isEmergency).toList();
    final other = resources.where((r) => !r.isEmergency).toList();

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('المرأة والبيت الآمن'),
        ),
        body: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            // Emergency banner
            Card(
              color: cs.errorContainer,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Icon(Icons.emergency, color: cs.onErrorContainer, size: 40),
                    const SizedBox(height: 8),
                    Text(
                      'إذا كنتِ في خطر الآن',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: cs.onErrorContainer,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'اتصلي فوراً بأحد الأرقام أدناه',
                      style: TextStyle(color: cs.onErrorContainer),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Emergency resources
            Text(
              'أرقام الطوارئ',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: cs.error,
                  ),
            ),
            const SizedBox(height: 8),
            ...emergency.map((r) => _EmergencyCard(resource: r)),

            const SizedBox(height: 24),

            // Other resources
            Text(
              'مراكز المساعدة والدعم',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
            ),
            const SizedBox(height: 8),
            ...other.map((r) => _ResourceCard(resource: r)),

            const SizedBox(height: 24),

            // Legal explanations
            Text(
              'شرح القوانين المتعلقة',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
            ),
            const SizedBox(height: 8),
            ...explanations.map((e) => _LegalExplanationTile(explanation: e)),
          ],
        ),
      ),
    );
  }
}

class _EmergencyCard extends StatelessWidget {
  const _EmergencyCard({required this.resource});
  final EmergencyResource resource;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      color: cs.errorContainer.withOpacity(0.3),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.phone_in_talk, color: cs.error),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    resource.titleAr,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                      color: cs.error,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(resource.descriptionAr),
            if (resource.phone != null) ...[
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: FilledButton.icon(
                  style: FilledButton.styleFrom(
                    backgroundColor: cs.error,
                    foregroundColor: cs.onError,
                  ),
                  onPressed: () {},
                  icon: const Icon(Icons.call),
                  label: Text(
                    resource.phone!,
                    style: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _ResourceCard extends StatelessWidget {
  const _ResourceCard({required this.resource});
  final EmergencyResource resource;

  IconData _iconForType(String type) {
    switch (type) {
      case 'counseling':
        return Icons.support_agent;
      case 'legal_aid':
        return Icons.gavel;
      case 'hotline':
        return Icons.phone;
      default:
        return Icons.help;
    }
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(_iconForType(resource.type), color: cs.primary),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    resource.titleAr,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 15),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(resource.descriptionAr),
            if (resource.phone != null || resource.website != null) ...[
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                children: [
                  if (resource.phone != null)
                    TextButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.phone, size: 16),
                      label: Text(resource.phone!),
                    ),
                  if (resource.website != null)
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

class _LegalExplanationTile extends StatelessWidget {
  const _LegalExplanationTile({required this.explanation});
  final LegalExplanation explanation;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ExpansionTile(
        title: Text(explanation.titleAr,
            style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(explanation.lawNameDe,
            style: const TextStyle(fontSize: 12)),
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              explanation.bodyAr,
              style: const TextStyle(height: 1.7),
            ),
          ),
        ],
      ),
    );
  }
}
