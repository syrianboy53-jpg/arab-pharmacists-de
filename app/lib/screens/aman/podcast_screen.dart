import 'package:flutter/material.dart';

import '../../aman_models.dart';
import '../../aman_repository.dart';

class PodcastScreen extends StatelessWidget {
  const PodcastScreen({super.key});

  static const _topicLabels = {
    'household': 'الحياة المنزلية',
    'parenting': 'تربية الأطفال',
    'mental_health': 'الصحة النفسية',
    'roles': 'الأدوار في الأسرة',
    'divorce_prevention': 'الوقاية من الطلاق',
    'violence_prevention': 'الوقاية من العنف',
  };

  static const _topicIcons = {
    'household': Icons.home,
    'parenting': Icons.child_care,
    'mental_health': Icons.psychology,
    'roles': Icons.people,
    'divorce_prevention': Icons.healing,
    'violence_prevention': Icons.shield,
  };

  @override
  Widget build(BuildContext context) {
    final podcasts = AmanRepository.instance.podcasts;
    final cs = Theme.of(context).colorScheme;

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('بودكاست أمان'),
        ),
        body: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Card(
              color: cs.primaryContainer,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    Icon(Icons.podcasts,
                        size: 40, color: cs.onPrimaryContainer),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'بودكاست أمان',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                              color: cs.onPrimaryContainer,
                            ),
                          ),
                          Text(
                            'حلقات قصيرة (٥ دقائق) عن المشاكل الشائعة',
                            style: TextStyle(
                              color: cs.onPrimaryContainer,
                              fontSize: 13,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            ...podcasts.asMap().entries.map((entry) {
              final i = entry.key;
              final pod = entry.value;
              return _PodcastCard(
                episode: pod,
                index: i + 1,
                topicLabel: _topicLabels[pod.topic] ?? pod.topic,
                topicIcon: _topicIcons[pod.topic] ?? Icons.podcasts,
              );
            }),
          ],
        ),
      ),
    );
  }
}

class _PodcastCard extends StatelessWidget {
  const _PodcastCard({
    required this.episode,
    required this.index,
    required this.topicLabel,
    required this.topicIcon,
  });

  final PodcastEpisode episode;
  final int index;
  final String topicLabel;
  final IconData topicIcon;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            CircleAvatar(
              radius: 24,
              backgroundColor: cs.primaryContainer,
              child: Text(
                '$index',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: cs.onPrimaryContainer,
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    episode.titleAr,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 15),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    episode.descriptionAr,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                        fontSize: 13, color: cs.onSurfaceVariant),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(topicIcon, size: 14, color: cs.primary),
                      const SizedBox(width: 4),
                      Text(
                        topicLabel,
                        style:
                            TextStyle(fontSize: 12, color: cs.primary),
                      ),
                      const SizedBox(width: 16),
                      Icon(Icons.timer, size: 14, color: cs.onSurfaceVariant),
                      const SizedBox(width: 4),
                      Text(
                        '${episode.durationMinutes} دقائق',
                        style: TextStyle(
                            fontSize: 12, color: cs.onSurfaceVariant),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            IconButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                      content: Text('ميزة الاستماع ستتوفر قريباً')),
                );
              },
              icon: Icon(Icons.play_circle_filled,
                  size: 40, color: cs.primary),
            ),
          ],
        ),
      ),
    );
  }
}
