import 'package:flutter/material.dart';

import '../models.dart';

class DialogueDetailScreen extends StatefulWidget {
  const DialogueDetailScreen({super.key, required this.dialogue});
  final Dialogue dialogue;

  @override
  State<DialogueDetailScreen> createState() => _DialogueDetailScreenState();
}

class _DialogueDetailScreenState extends State<DialogueDetailScreen> {
  // Which language is shown as the "headline" (always shown);
  // the other languages are revealed when the user taps a turn.
  String _primary = 'de';

  @override
  Widget build(BuildContext context) {
    final d = widget.dialogue;
    return Scaffold(
      appBar: AppBar(
        title: Text(d.scenarioDe, maxLines: 2, overflow: TextOverflow.ellipsis),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
            child: SegmentedButton<String>(
              segments: const [
                ButtonSegment(value: 'de', label: Text('DE')),
                ButtonSegment(value: 'en', label: Text('EN')),
                ButtonSegment(value: 'ar', label: Text('AR')),
              ],
              selected: {_primary},
              onSelectionChanged: (s) => setState(() => _primary = s.first),
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.fromLTRB(12, 4, 12, 24),
              itemCount: d.turns.length,
              itemBuilder: (_, i) => _TurnBubble(
                turn: d.turns[i],
                primary: _primary,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _TurnBubble extends StatefulWidget {
  const _TurnBubble({required this.turn, required this.primary});
  final DialogueTurn turn;
  final String primary;

  @override
  State<_TurnBubble> createState() => _TurnBubbleState();
}

class _TurnBubbleState extends State<_TurnBubble> {
  bool _expanded = false;

  String _textFor(String lang) => switch (lang) {
        'de' => widget.turn.de,
        'en' => widget.turn.en,
        _ => widget.turn.ar,
      };

  bool _isRtl(String lang) => lang == 'ar';

  @override
  Widget build(BuildContext context) {
    final isPharma = widget.turn.speaker == 'pharmacist';
    final scheme = Theme.of(context).colorScheme;
    final bg = isPharma ? scheme.primaryContainer : scheme.secondaryContainer;
    final fg =
        isPharma ? scheme.onPrimaryContainer : scheme.onSecondaryContainer;

    final secondaries = ['de', 'en', 'ar']..remove(widget.primary);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment:
            isPharma ? MainAxisAlignment.start : MainAxisAlignment.end,
        children: [
          Flexible(
            child: GestureDetector(
              onTap: () => setState(() => _expanded = !_expanded),
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: bg,
                  borderRadius: BorderRadius.only(
                    topLeft: const Radius.circular(14),
                    topRight: const Radius.circular(14),
                    bottomLeft: Radius.circular(isPharma ? 4 : 14),
                    bottomRight: Radius.circular(isPharma ? 14 : 4),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      isPharma ? 'Apotheker · صيدلي' : 'Patient · مريض',
                      style: TextStyle(
                        fontSize: 11,
                        color: fg.withOpacity(0.8),
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Directionality(
                      textDirection: _isRtl(widget.primary)
                          ? TextDirection.rtl
                          : TextDirection.ltr,
                      child: Text(
                        _textFor(widget.primary),
                        style: TextStyle(color: fg, fontSize: 15),
                      ),
                    ),
                    if (_expanded) ...[
                      const Divider(height: 16),
                      for (final lang in secondaries) ...[
                        Directionality(
                          textDirection: _isRtl(lang)
                              ? TextDirection.rtl
                              : TextDirection.ltr,
                          child: Padding(
                            padding: const EdgeInsets.only(bottom: 4),
                            child: Text(
                              '${lang.toUpperCase()}: ${_textFor(lang)}',
                              style: TextStyle(
                                  color: fg.withOpacity(0.85),
                                  fontSize: 13),
                            ),
                          ),
                        ),
                      ],
                    ] else ...[
                      const SizedBox(height: 4),
                      Text(
                        'Tap to translate',
                        style: TextStyle(
                          fontSize: 11,
                          color: fg.withOpacity(0.6),
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
