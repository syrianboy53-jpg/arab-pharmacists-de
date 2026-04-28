import 'package:flutter/material.dart';

import '../../aman_models.dart';
import '../../aman_repository.dart';

class AskExpertScreen extends StatefulWidget {
  const AskExpertScreen({super.key});

  @override
  State<AskExpertScreen> createState() => _AskExpertScreenState();
}

class _AskExpertScreenState extends State<AskExpertScreen>
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
          title: const Text('اسأل خبيراً'),
          bottom: TabBar(
            controller: _tabController,
            tabs: const [
              Tab(icon: Icon(Icons.question_answer), text: 'استشارة مجهولة'),
              Tab(icon: Icon(Icons.people), text: 'دليل المختصين'),
            ],
          ),
        ),
        body: TabBarView(
          controller: _tabController,
          children: const [
            _AnonymousQuestionsTab(),
            _ExpertDirectoryTab(),
          ],
        ),
      ),
    );
  }
}

class _AnonymousQuestionsTab extends StatefulWidget {
  const _AnonymousQuestionsTab();

  @override
  State<_AnonymousQuestionsTab> createState() => _AnonymousQuestionsTabState();
}

class _AnonymousQuestionsTabState extends State<_AnonymousQuestionsTab> {
  final _questionController = TextEditingController();
  String _selectedCategory = 'legal';

  static const _categories = {
    'legal': 'قانوني',
    'psychological': 'نفسي',
    'social': 'اجتماعي',
  };

  @override
  void dispose() {
    _questionController.dispose();
    super.dispose();
  }

  Future<void> _submitQuestion() async {
    final text = _questionController.text.trim();
    if (text.isEmpty) return;

    final q = AnonQuestion(
      id: 'q-${DateTime.now().millisecondsSinceEpoch}',
      questionAr: text,
      category: _selectedCategory,
      date: DateTime.now().toIso8601String().split('T').first,
    );
    await AmanRepository.instance.addAnonQuestion(q);
    _questionController.clear();
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('تم إرسال سؤالك بنجاح. سيتم الرد عليه قريباً.')),
    );
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final questions = AmanRepository.instance.anonQuestions;
    final cs = Theme.of(context).colorScheme;

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(Icons.lock, color: cs.primary),
                    const SizedBox(width: 8),
                    Text(
                      'اطرح سؤالك بخصوصية تامة',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  'هويتك محمية تماماً. لن يتم مشاركة أي معلومات شخصية.',
                  style: TextStyle(color: cs.onSurfaceVariant),
                ),
                const SizedBox(height: 16),
                DropdownButtonFormField<String>(
                  value: _selectedCategory,
                  decoration: const InputDecoration(
                    labelText: 'نوع الاستشارة',
                    border: OutlineInputBorder(),
                  ),
                  items: _categories.entries
                      .map((e) => DropdownMenuItem(
                            value: e.key,
                            child: Text(e.value),
                          ))
                      .toList(),
                  onChanged: (v) {
                    if (v != null) setState(() => _selectedCategory = v);
                  },
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _questionController,
                  maxLines: 4,
                  decoration: const InputDecoration(
                    hintText: 'اكتب سؤالك هنا...',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 12),
                SizedBox(
                  width: double.infinity,
                  child: FilledButton.icon(
                    onPressed: _submitQuestion,
                    icon: const Icon(Icons.send),
                    label: const Text('إرسال السؤال'),
                  ),
                ),
              ],
            ),
          ),
        ),
        if (questions.isNotEmpty) ...[
          const SizedBox(height: 24),
          Text(
            'أسئلتك السابقة',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 8),
          ...questions.reversed.map((q) => Card(
                margin: const EdgeInsets.only(bottom: 8),
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Chip(
                            label: Text(
                              _categories[q.category] ?? q.category,
                              style: const TextStyle(fontSize: 12),
                            ),
                            visualDensity: VisualDensity.compact,
                          ),
                          const Spacer(),
                          Text(q.date,
                              style: TextStyle(
                                  fontSize: 12, color: cs.onSurfaceVariant)),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(q.questionAr),
                      if (q.answerAr != null) ...[
                        const Divider(),
                        Row(
                          children: [
                            Icon(Icons.check_circle,
                                color: cs.primary, size: 16),
                            const SizedBox(width: 4),
                            Text('الرد:',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: cs.primary)),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(q.answerAr!),
                      ] else
                        Padding(
                          padding: const EdgeInsets.only(top: 8),
                          child: Text(
                            'في انتظار الرد...',
                            style: TextStyle(
                                color: cs.onSurfaceVariant,
                                fontStyle: FontStyle.italic),
                          ),
                        ),
                    ],
                  ),
                ),
              )),
        ],
      ],
    );
  }
}

class _ExpertDirectoryTab extends StatefulWidget {
  const _ExpertDirectoryTab();

  @override
  State<_ExpertDirectoryTab> createState() => _ExpertDirectoryTabState();
}

class _ExpertDirectoryTabState extends State<_ExpertDirectoryTab> {
  String _searchQuery = '';
  String? _selectedSpecialty;

  static const _specialties = {
    null: 'الكل',
    'lawyer': 'محامي',
    'psychologist': 'أخصائي نفسي',
    'coach': 'مدرب علاقات',
    'social_worker': 'أخصائي اجتماعي',
  };

  @override
  Widget build(BuildContext context) {
    var experts = AmanRepository.instance.searchExperts(_searchQuery);
    if (_selectedSpecialty != null) {
      experts =
          experts.where((e) => e.specialty == _selectedSpecialty).toList();
    }
    final cs = Theme.of(context).colorScheme;

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(12),
          child: TextField(
            decoration: const InputDecoration(
              hintText: 'ابحث عن مختص...',
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
            children: _specialties.entries
                .map((e) => Padding(
                      padding: const EdgeInsetsDirectional.only(end: 8),
                      child: FilterChip(
                        selected: _selectedSpecialty == e.key,
                        label: Text(e.value),
                        onSelected: (_) =>
                            setState(() => _selectedSpecialty = e.key),
                      ),
                    ))
                .toList(),
          ),
        ),
        const SizedBox(height: 8),
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.all(12),
            itemCount: experts.length,
            itemBuilder: (context, i) =>
                _ExpertCard(expert: experts[i], cs: cs),
          ),
        ),
      ],
    );
  }
}

class _ExpertCard extends StatelessWidget {
  const _ExpertCard({required this.expert, required this.cs});
  final Expert expert;
  final ColorScheme cs;

  IconData _iconForSpecialty(String s) {
    switch (s) {
      case 'lawyer':
        return Icons.gavel;
      case 'psychologist':
        return Icons.psychology;
      case 'coach':
        return Icons.favorite;
      case 'social_worker':
        return Icons.groups;
      default:
        return Icons.person;
    }
  }

  @override
  Widget build(BuildContext context) {
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
                  child: Icon(_iconForSpecialty(expert.specialty),
                      color: cs.onPrimaryContainer),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(expert.nameAr,
                          style: const TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 16)),
                      Text(expert.specialtyAr,
                          style: TextStyle(color: cs.primary)),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(expert.descriptionAr),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 4,
              children: [
                if (expert.city != null)
                  Chip(
                    avatar: const Icon(Icons.location_on, size: 16),
                    label: Text(expert.city!,
                        style: const TextStyle(fontSize: 12)),
                    visualDensity: VisualDensity.compact,
                  ),
                if (expert.speaksArabic)
                  const Chip(
                    avatar: Icon(Icons.translate, size: 16),
                    label:
                        Text('عربي', style: TextStyle(fontSize: 12)),
                    visualDensity: VisualDensity.compact,
                  ),
                if (expert.speaksGerman)
                  const Chip(
                    avatar: Icon(Icons.translate, size: 16),
                    label: Text('ألماني',
                        style: TextStyle(fontSize: 12)),
                    visualDensity: VisualDensity.compact,
                  ),
              ],
            ),
            if (expert.phone != null || expert.email != null) ...[
              const Divider(),
              Row(
                children: [
                  if (expert.phone != null)
                    TextButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.phone, size: 18),
                      label: Text(expert.phone!),
                    ),
                  if (expert.email != null)
                    TextButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.email, size: 18),
                      label: Text(expert.email!),
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
