import 'package:flutter/material.dart';
import '../data/grammatik_data.dart';

class GrammatikScreen extends StatelessWidget {
  const GrammatikScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('القواعد - Grammatik'),
          centerTitle: true,
          bottom: const TabBar(
            tabs: [
              Tab(text: 'أخطاء شائعة', icon: Icon(Icons.warning_amber)),
              Tab(text: 'بناء الجمل', icon: Icon(Icons.format_list_numbered)),
              Tab(text: 'أفعال منفصلة', icon: Icon(Icons.call_split)),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            _MistakesList(),
            _SatzbauList(),
            _TrennbarList(),
          ],
        ),
      ),
    );
  }
}

class _MistakesList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: commonMistakes.length,
      itemBuilder: (ctx, i) {
        final m = commonMistakes[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: ExpansionTile(
            leading: CircleAvatar(
              backgroundColor: Colors.red[50],
              child: const Icon(Icons.close, color: Colors.red, size: 20),
            ),
            title: Text(m['titleAr'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            subtitle: Text('المستوى: ${m["level"] ?? "-"}', style: const TextStyle(fontSize: 12)),
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.close, color: Colors.red, size: 16),
                        const SizedBox(width: 8),
                        Expanded(child: Text(m['wrong'] as String? ?? '', style: const TextStyle(color: Colors.red, decoration: TextDecoration.lineThrough), textDirection: TextDirection.ltr)),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        const Icon(Icons.check, color: Colors.green, size: 16),
                        const SizedBox(width: 8),
                        Expanded(child: Text(m['right'] as String? ?? '', style: const TextStyle(color: Colors.green, fontWeight: FontWeight.bold), textDirection: TextDirection.ltr)),
                      ],
                    ),
                    if (m['whyAr'] != null) ...[const SizedBox(height: 12), Text('💡 ${m["whyAr"]}')],
                    if (m['ruleAr'] != null) ...[const SizedBox(height: 8), Text('📏 ${m["ruleAr"]}', style: TextStyle(color: Colors.grey[700], fontSize: 13))],
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

class _SatzbauList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: satzbau.length,
      itemBuilder: (ctx, i) {
        final s = satzbau[i];
        final tokens = List<String>.from(s['tokens'] as List? ?? []);
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('المستوى: ${s["level"] ?? "-"}', style: TextStyle(fontSize: 12, color: Colors.grey[600])),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 4,
                  children: tokens.map((t) => Chip(label: Text(t, style: const TextStyle(fontSize: 13)), padding: EdgeInsets.zero, visualDensity: VisualDensity.compact)).toList(),
                ),
                if (s['ar'] != null) ...[const SizedBox(height: 8), Text(s['ar'] as String, style: TextStyle(color: Colors.grey[700]))],
                if (s['tipAr'] != null) ...[const SizedBox(height: 4), Text('💡 ${s["tipAr"]}', style: const TextStyle(fontSize: 12))],
              ],
            ),
          ),
        );
      },
    );
  }
}

class _TrennbarList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: trennbareVerben.length,
      itemBuilder: (ctx, i) {
        final item = trennbareVerben[i];
        final verbs = List<Map<String, dynamic>>.from(item['verbs'] as List? ?? []);
        return Card(
          margin: const EdgeInsets.only(bottom: 16),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(item['titleAr'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Text(item['titleDe'] as String? ?? '', style: TextStyle(color: Colors.grey[600]), textDirection: TextDirection.ltr),
                if (item['intro'] != null) ...[const SizedBox(height: 8), Text(item['intro'] as String)],
                const Divider(height: 16),
                ...verbs.map((v) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('• ', style: TextStyle(color: Theme.of(context).colorScheme.primary, fontWeight: FontWeight.bold)),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(v['de'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold), textDirection: TextDirection.ltr),
                            if (v['ar'] != null) Text(v['ar'] as String, style: const TextStyle(fontSize: 13)),
                            if (v['example'] != null) Text(v['example'] as String, style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: Colors.grey[600]), textDirection: TextDirection.ltr),
                          ],
                        ),
                      ),
                    ],
                  ),
                )),
              ],
            ),
          ),
        );
      },
    );
  }
}
