import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import 'package:flutter/material.dart';
import '../data/schreiben_data.dart';

class SchreibenScreen extends StatefulWidget {
  const SchreibenScreen({super.key});
  @override
  State<SchreibenScreen> createState() => _SchreibenScreenState();
}

class _SchreibenScreenState extends State<SchreibenScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  int? _selectedModel;
  int? _selectedTemplate;

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
    return Scaffold(
      appBar: AppBar(
        title: const Text('الكتابة - Schreiben'),
        centerTitle: true,
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'نماذج الامتحان', icon: Icon(Icons.quiz)),
            Tab(text: 'قوالب الرسائل', icon: Icon(Icons.mail)),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _selectedModel == null ? _buildModelList() : _buildModelDetail(),
          _selectedTemplate == null ? _buildTemplateList() : _buildTemplateDetail(),
        ],
      ),
    );
  }

  Widget _buildModelList() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: schreibenModels.length,
      itemBuilder: (ctx, i) {
        final model = schreibenModels[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: ListTile(
            leading: CircleAvatar(child: Text('${i + 1}')),
            title: Text(model['title'] as String, style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text(model['description'] as String? ?? '', maxLines: 2, overflow: TextOverflow.ellipsis),
            onTap: () => setState(() => _selectedModel = i),
          ),
        );
      },
    );
  }

  Widget _buildModelDetail() {
    final model = schreibenModels[_selectedModel!];
    final tasks = List<Map<String, dynamic>>.from(model['tasks'] as List? ?? []);
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => setState(() => _selectedModel = null)),
              Expanded(child: Text(model['title'] as String, style: Theme.of(context).textTheme.titleLarge)),
            ],
          ),
          const SizedBox(height: 16),
          ...tasks.asMap().entries.map((entry) {
            final i = entry.key;
            final task = entry.value;
            return Card(
              margin: const EdgeInsets.only(bottom: 16),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('المهمة ${i + 1}: ${task["titleAr"] ?? task["title"] ?? ""}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                    if (task['promptAr'] != null) ...[const SizedBox(height: 8), Text(task['promptAr'] as String)],
                    if (task['promptDe'] != null) ...[const SizedBox(height: 8), Text(task['promptDe'] as String, textDirection: TextDirection.ltr, style: TextStyle(color: Colors.grey[700]))],
                    if (task['sampleAnswer'] != null) ...[
                      const Divider(height: 24),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('✍️ نموذج إجابة:', style: TextStyle(fontWeight: FontWeight.bold)),
                          IconButton(
                            icon: const Icon(Icons.volume_up, color: Color(0xFF58CC02)),
                            onPressed: () => Provider.of<AppProvider>(context, listen: false).speak(task['sampleAnswer'] as String),
                          ),
                        ],
                      ),
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Theme.of(context).colorScheme.surfaceContainerHighest,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: const Color(0xFFE5E5E5)),
                        ),
                        child: Text(task['sampleAnswer'] as String, textDirection: TextDirection.ltr, style: const TextStyle(height: 1.6, fontSize: 15)),
                      ),
                    ],
                    if (task['tips'] != null) ...[
                      const SizedBox(height: 12),
                      ...List<String>.from(task['tips'] as List).map((t) => Padding(
                        padding: const EdgeInsets.only(bottom: 4),
                        child: Row(children: [const Text('💡 ', style: TextStyle(fontSize: 12)), Expanded(child: Text(t, style: const TextStyle(fontSize: 13)))]),
                      )),
                    ],
                  ],
                ),
              ),
            );
          }),
        ],
      ),
    );
  }

  Widget _buildTemplateList() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: schreibenTemplates.length,
      itemBuilder: (ctx, i) {
        final tmpl = schreibenTemplates[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: ListTile(
            leading: CircleAvatar(backgroundColor: Theme.of(context).colorScheme.tertiaryContainer, child: Text(tmpl['typ']?.toString().substring(0, 1).toUpperCase() ?? '📝')),
            title: Text(tmpl['titleAr'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text(tmpl['titleDe'] as String? ?? ''),
            trailing: Text(tmpl['typ'] as String? ?? ''),
            onTap: () => setState(() => _selectedTemplate = i),
          ),
        );
      },
    );
  }

  Widget _buildTemplateDetail() {
    final tmpl = schreibenTemplates[_selectedTemplate!];
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => setState(() => _selectedTemplate = null)),
              Expanded(child: Text(tmpl['titleAr'] as String? ?? '', style: Theme.of(context).textTheme.titleLarge)),
            ],
          ),
          if (tmpl['scenario'] != null) ...[const SizedBox(height: 12), Text('📋 ${tmpl["scenario"]}', style: const TextStyle(fontSize: 15))],
          if (tmpl['body'] != null) ...[
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('📝 نص الرسالة:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                IconButton(
                  icon: const Icon(Icons.volume_up, color: Color(0xFF58CC02)),
                  onPressed: () => Provider.of<AppProvider>(context, listen: false).speak(tmpl['body'] as String),
                ),
              ],
            ),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surfaceContainerHighest,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFE5E5E5)),
              ),
              child: Text(tmpl['body'] as String, textDirection: TextDirection.ltr, style: const TextStyle(height: 1.6, fontSize: 15)),
            ),
          ],
          if (tmpl['hinweise'] != null) ...[
            const SizedBox(height: 16),
            const Text('💡 ملاحظات:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(height: 8),
            ...List<String>.from(tmpl['hinweise'] as List).map((h) => Padding(
              padding: const EdgeInsets.only(bottom: 4),
              child: Text('• $h'),
            )),
          ],
        ],
      ),
    );
  }
}
