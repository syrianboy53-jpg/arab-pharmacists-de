import 'package:flutter/material.dart';

import '../models.dart';
import '../repository.dart';
import 'dialogue_detail_screen.dart';

class DialoguesScreen extends StatelessWidget {
  const DialoguesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final dialogues = Repository.instance.dialogues;
    return Scaffold(
      appBar: AppBar(title: const Text('Dialogues · المحادثات')),
      body: ListView.separated(
        padding: const EdgeInsets.all(12),
        itemCount: dialogues.length,
        separatorBuilder: (_, __) => const SizedBox(height: 8),
        itemBuilder: (_, i) => _DialogueCard(dialogue: dialogues[i]),
      ),
    );
  }
}

class _DialogueCard extends StatelessWidget {
  const _DialogueCard({required this.dialogue});
  final Dialogue dialogue;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: () => Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => DialogueDetailScreen(dialogue: dialogue),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                dialogue.scenarioDe,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
              const SizedBox(height: 4),
              Text(dialogue.scenarioEn,
                  style: Theme.of(context).textTheme.bodyMedium),
              const SizedBox(height: 2),
              Directionality(
                textDirection: TextDirection.rtl,
                child: Text(
                  dialogue.scenarioAr,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Theme.of(context).colorScheme.primary,
                      ),
                ),
              ),
              if (dialogue.tags.isNotEmpty) ...[
                const SizedBox(height: 10),
                Wrap(
                  spacing: 6,
                  runSpacing: 4,
                  children: [
                    for (final t in dialogue.tags)
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: Theme.of(context)
                              .colorScheme
                              .secondaryContainer,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          t,
                          style: TextStyle(
                            fontSize: 12,
                            color: Theme.of(context)
                                .colorScheme
                                .onSecondaryContainer,
                          ),
                        ),
                      ),
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
