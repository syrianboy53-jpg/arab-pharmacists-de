import 'package:flutter/material.dart';

import '../../aman_models.dart';
import '../../aman_repository.dart';

class StoriesScreen extends StatefulWidget {
  const StoriesScreen({super.key});

  @override
  State<StoriesScreen> createState() => _StoriesScreenState();
}

class _StoriesScreenState extends State<StoriesScreen>
    with SingleTickerProviderStateMixin {
  late final TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('قصص وعبر'),
          bottom: TabBar(
            controller: _tabController,
            tabs: const [
              Tab(icon: Icon(Icons.auto_stories), text: 'تجارب حقيقية'),
              Tab(icon: Icon(Icons.help_outline), text: 'ماذا لو؟'),
            ],
          ),
        ),
        body: TabBarView(
          controller: _tabController,
          children: const [
            _RealStoriesTab(),
            _WhatIfTab(),
          ],
        ),
      ),
    );
  }
}

class _RealStoriesTab extends StatelessWidget {
  const _RealStoriesTab();

  static const _categoryLabels = {
    'divorce_regret': 'طلقوا وندموا',
    'reconciliation': 'نجحوا في الترميم',
    'lesson': 'دروس وعبر',
  };

  static const _categoryIcons = {
    'divorce_regret': Icons.heart_broken,
    'reconciliation': Icons.favorite,
    'lesson': Icons.lightbulb,
  };

  static const _categoryColors = {
    'divorce_regret': Colors.red,
    'reconciliation': Colors.green,
    'lesson': Colors.orange,
  };

  @override
  Widget build(BuildContext context) {
    final stories = AmanRepository.instance.stories;

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: stories.length,
      itemBuilder: (context, i) {
        final story = stories[i];
        return _StoryCard(
          story: story,
          color: _categoryColors[story.category] ?? Colors.grey,
          icon: _categoryIcons[story.category] ?? Icons.article,
          label: _categoryLabels[story.category] ?? story.category,
        );
      },
    );
  }
}

class _StoryCard extends StatelessWidget {
  const _StoryCard({
    required this.story,
    required this.color,
    required this.icon,
    required this.label,
  });
  final RealStory story;
  final Color color;
  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: () => Navigator.push(
          context,
          MaterialPageRoute<void>(
            builder: (_) => _StoryDetailScreen(story: story),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(icon, color: color, size: 20),
                  const SizedBox(width: 8),
                  Chip(
                    label: Text(label, style: const TextStyle(fontSize: 12)),
                    visualDensity: VisualDensity.compact,
                    side: BorderSide(color: color),
                  ),
                  const Spacer(),
                  if (story.isAnonymous)
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.lock, size: 14, color: Colors.grey[500]),
                        const SizedBox(width: 2),
                        Text('مجهول',
                            style: TextStyle(
                                fontSize: 11, color: Colors.grey[500])),
                      ],
                    ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                story.titleAr,
                style: const TextStyle(
                    fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const SizedBox(height: 8),
              Text(
                story.bodyAr.length > 120
                    ? '${story.bodyAr.substring(0, 120)}...'
                    : story.bodyAr,
                style: TextStyle(color: Colors.grey[700], height: 1.5),
              ),
              const SizedBox(height: 8),
              Text(
                'اقرأ المزيد',
                style: TextStyle(
                    color: Theme.of(context).colorScheme.primary,
                    fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _StoryDetailScreen extends StatelessWidget {
  const _StoryDetailScreen({required this.story});
  final RealStory story;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(title: const Text('قصة وعبرة')),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                story.titleAr,
                style: const TextStyle(
                    fontSize: 22, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              Text(
                story.bodyAr,
                style: const TextStyle(fontSize: 16, height: 1.8),
              ),
              if (story.moral != null) ...[
                const SizedBox(height: 24),
                Card(
                  color: cs.tertiaryContainer,
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Icon(Icons.lightbulb,
                            color: cs.onTertiaryContainer),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'العبرة',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: cs.onTertiaryContainer,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                story.moral!,
                                style: TextStyle(
                                  color: cs.onTertiaryContainer,
                                  height: 1.5,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _WhatIfTab extends StatelessWidget {
  const _WhatIfTab();

  @override
  Widget build(BuildContext context) {
    final scenarios = AmanRepository.instance.whatIfScenarios;
    final cs = Theme.of(context).colorScheme;

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: scenarios.length,
      itemBuilder: (context, i) {
        final s = scenarios[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 16),
          child: ExpansionTile(
            leading: CircleAvatar(
              backgroundColor: cs.errorContainer,
              child: Icon(Icons.help_outline, color: cs.onErrorContainer),
            ),
            title: Text(s.titleAr,
                style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text(
              s.scenarioAr,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(fontSize: 13, color: cs.onSurfaceVariant),
            ),
            children: [
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'السيناريو:',
                      style: TextStyle(
                          fontWeight: FontWeight.bold, color: cs.primary),
                    ),
                    const SizedBox(height: 4),
                    Text(s.scenarioAr, style: const TextStyle(height: 1.5)),
                    const SizedBox(height: 16),
                    Text(
                      'العواقب المتوقعة:',
                      style: TextStyle(
                          fontWeight: FontWeight.bold, color: cs.error),
                    ),
                    const SizedBox(height: 8),
                    ...s.consequences.asMap().entries.map((e) => Padding(
                          padding: const EdgeInsets.only(bottom: 8),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Icon(Icons.warning_amber,
                                  color: cs.error, size: 18),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(e.value,
                                    style: const TextStyle(height: 1.4)),
                              ),
                            ],
                          ),
                        )),
                    const SizedBox(height: 8),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
