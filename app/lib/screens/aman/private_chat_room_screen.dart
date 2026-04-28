import 'dart:async';

import 'package:flutter/material.dart';

import '../../aman_models.dart';
import '../../aman_repository.dart';

/// Encrypted-style private chat room with a 25-minute countdown timer
/// and self-destruct capability.
class PrivateChatRoomScreen extends StatefulWidget {
  final PrivateSession session;

  const PrivateChatRoomScreen({super.key, required this.session});

  @override
  State<PrivateChatRoomScreen> createState() => _PrivateChatRoomScreenState();
}

class _PrivateChatRoomScreenState extends State<PrivateChatRoomScreen> {
  final _messageController = TextEditingController();
  final _scrollController = ScrollController();
  late PrivateSession _session;
  late int _remainingSeconds;
  Timer? _timer;

  // Simulated consultant auto-replies for demo.
  static const _autoReplies = [
    'مرحباً، أنا هنا للاستماع إليك. تحدث بحرية تامة.',
    'أفهم مشاعرك. هل يمكنك إخباري بالمزيد عن الموقف؟',
    'هذا وضع يمكن التعامل معه. دعني أوضح لك حقوقك القانونية.',
    'نصيحتي: لا توقع على أي ورقة قبل استشارة محامٍ مختص.',
    'تذكر: اليوجند أمت ليس عدوك. الهدف هو حماية الأطفال وليس معاقبة الأهل.',
    'أنصحك بالتواصل مع مركز استشاري عربي في مدينتك. يمكنني مساعدتك في إيجاد واحد.',
    'خطوتك الأولى: اجمع كل الوثائق المتعلقة بالموضوع واحتفظ بها في مكان آمن.',
    'الجلسة تقترب من نهايتها. هل لديك أسئلة أخيرة؟',
  ];
  int _replyIndex = 0;

  @override
  void initState() {
    super.initState();
    _session = widget.session;
    _remainingSeconds = _session.durationMinutes * 60;

    // Activate session if it's still booked.
    if (_session.status == PrivateSessionStatus.booked) {
      _session = PrivateSession(
        id: _session.id,
        alias: _session.alias,
        date: _session.date,
        timeSlot: _session.timeSlot,
        durationMinutes: _session.durationMinutes,
        priceEur: _session.priceEur,
        status: PrivateSessionStatus.active,
        consultantAlias: _session.consultantAlias,
        messages: List.of(_session.messages),
        createdAt: _session.createdAt,
      );
      AmanRepository.instance.updatePrivateSession(_session);
    }

    _startTimer();

    // Send welcome message from consultant after a short delay.
    if (_session.messages.isEmpty) {
      Future.delayed(const Duration(seconds: 2), () {
        if (!mounted) return;
        _addConsultantMessage(_autoReplies[0]);
        _replyIndex = 1;
      });
    }
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (_remainingSeconds <= 0) {
        _endSession();
        return;
      }
      setState(() => _remainingSeconds--);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _messageController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  String get _timerDisplay {
    final m = _remainingSeconds ~/ 60;
    final s = _remainingSeconds % 60;
    return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }

  Color get _timerColor {
    if (_remainingSeconds > 300) return Colors.green;
    if (_remainingSeconds > 60) return Colors.orange;
    return Colors.red;
  }

  void _sendMessage() {
    final text = _messageController.text.trim();
    if (text.isEmpty) return;

    final msg = ChatMessage(
      id: 'msg-${DateTime.now().millisecondsSinceEpoch}',
      senderAlias: _session.alias,
      text: text,
      timestamp: DateTime.now().toIso8601String(),
    );

    setState(() {
      _session = PrivateSession(
        id: _session.id,
        alias: _session.alias,
        date: _session.date,
        timeSlot: _session.timeSlot,
        durationMinutes: _session.durationMinutes,
        priceEur: _session.priceEur,
        status: _session.status,
        consultantAlias: _session.consultantAlias,
        messages: [..._session.messages, msg],
        createdAt: _session.createdAt,
      );
    });

    _messageController.clear();
    AmanRepository.instance.updatePrivateSession(_session);
    _scrollToBottom();

    // Simulated consultant auto-reply after a delay.
    if (_replyIndex < _autoReplies.length) {
      final replyIdx = _replyIndex;
      _replyIndex++;
      Future.delayed(const Duration(seconds: 3), () {
        if (!mounted || _session.status != PrivateSessionStatus.active) return;
        _addConsultantMessage(_autoReplies[replyIdx]);
      });
    }
  }

  void _addConsultantMessage(String text) {
    final msg = ChatMessage(
      id: 'msg-c-${DateTime.now().millisecondsSinceEpoch}',
      senderAlias: _session.consultantAlias ?? 'مستشار أمان',
      text: text,
      timestamp: DateTime.now().toIso8601String(),
      isConsultant: true,
    );

    setState(() {
      _session = PrivateSession(
        id: _session.id,
        alias: _session.alias,
        date: _session.date,
        timeSlot: _session.timeSlot,
        durationMinutes: _session.durationMinutes,
        priceEur: _session.priceEur,
        status: _session.status,
        consultantAlias: _session.consultantAlias,
        messages: [..._session.messages, msg],
        createdAt: _session.createdAt,
      );
    });

    AmanRepository.instance.updatePrivateSession(_session);
    _scrollToBottom();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  Future<void> _endSession() async {
    _timer?.cancel();
    _session = PrivateSession(
      id: _session.id,
      alias: _session.alias,
      date: _session.date,
      timeSlot: _session.timeSlot,
      durationMinutes: _session.durationMinutes,
      priceEur: _session.priceEur,
      status: PrivateSessionStatus.ended,
      consultantAlias: _session.consultantAlias,
      messages: List.of(_session.messages),
      createdAt: _session.createdAt,
    );
    await AmanRepository.instance.updatePrivateSession(_session);
    if (!mounted) return;
    setState(() {});
  }

  Future<void> _destroySession() async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('تدمير الجلسة', textDirection: TextDirection.rtl),
        content: const Text(
          'سيتم حذف جميع الرسائل نهائياً من جهازك. '
          'هذا الإجراء لا يمكن التراجع عنه.',
          textDirection: TextDirection.rtl,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('إلغاء'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(ctx, true),
            style: FilledButton.styleFrom(backgroundColor: Colors.red),
            child: const Text('تدمير نهائي'),
          ),
        ],
      ),
    );

    if (confirm == true) {
      await AmanRepository.instance.destroySession(_session.id);
      if (!mounted) return;
      Navigator.of(context).pop();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('تم تدمير الجلسة بالكامل')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final isActive = _session.status == PrivateSessionStatus.active;

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: Row(
            children: [
              const Icon(Icons.shield, size: 20),
              const SizedBox(width: 8),
              const Text('جلسة سرية'),
              const Spacer(),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: _timerColor.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: _timerColor),
                ),
                child: Text(
                  _timerDisplay,
                  style: TextStyle(
                    color: _timerColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ),
            ],
          ),
          actions: [
            IconButton(
              onPressed: _destroySession,
              icon: const Icon(Icons.delete_forever, color: Colors.red),
              tooltip: 'تدمير الجلسة',
            ),
          ],
        ),
        body: Column(
          children: [
            // Security banner
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 16),
              color: cs.primaryContainer,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.lock, size: 14, color: cs.onPrimaryContainer),
                  const SizedBox(width: 6),
                  Text(
                    'محادثة مشفرة — تُحذف تلقائياً عند الانتهاء',
                    style: TextStyle(
                        fontSize: 12, color: cs.onPrimaryContainer),
                  ),
                ],
              ),
            ),

            // Messages
            Expanded(
              child: _session.messages.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.chat_bubble_outline,
                              size: 48, color: cs.outline),
                          const SizedBox(height: 8),
                          Text('جلستك بدأت. تحدث بحرية.',
                              style: TextStyle(color: cs.outline)),
                          const SizedBox(height: 4),
                          Text(
                            'أنت: ${_session.alias}  •  '
                            'المستشار: ${_session.consultantAlias ?? "مستشار أمان"}',
                            style:
                                TextStyle(fontSize: 12, color: cs.outline),
                          ),
                        ],
                      ),
                    )
                  : ListView.builder(
                      controller: _scrollController,
                      padding: const EdgeInsets.all(12),
                      itemCount: _session.messages.length,
                      itemBuilder: (_, i) =>
                          _MessageBubble(message: _session.messages[i]),
                    ),
            ),

            // Session ended banner
            if (!isActive)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(12),
                color: Colors.orange.withOpacity(0.1),
                child: Column(
                  children: [
                    const Text(
                      'انتهت الجلسة',
                      style: TextStyle(
                          fontWeight: FontWeight.bold, color: Colors.orange),
                    ),
                    const SizedBox(height: 8),
                    FilledButton.icon(
                      onPressed: _destroySession,
                      icon: const Icon(Icons.delete_forever),
                      label: const Text('تدمير المحادثة نهائياً'),
                      style:
                          FilledButton.styleFrom(backgroundColor: Colors.red),
                    ),
                  ],
                ),
              ),

            // Input bar
            if (isActive)
              Container(
                padding: const EdgeInsets.fromLTRB(8, 8, 8, 12),
                decoration: BoxDecoration(
                  color: cs.surface,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 4,
                      offset: const Offset(0, -2),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _messageController,
                        decoration: InputDecoration(
                          hintText: 'اكتب رسالتك...',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(24),
                          ),
                          contentPadding: const EdgeInsets.symmetric(
                              horizontal: 16, vertical: 10),
                          isDense: true,
                        ),
                        onSubmitted: (_) => _sendMessage(),
                        textInputAction: TextInputAction.send,
                      ),
                    ),
                    const SizedBox(width: 8),
                    IconButton.filled(
                      onPressed: _sendMessage,
                      icon: const Icon(Icons.send),
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _MessageBubble extends StatelessWidget {
  final ChatMessage message;

  const _MessageBubble({required this.message});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final isConsultant = message.isConsultant;

    return Align(
      alignment:
          isConsultant ? Alignment.centerLeft : Alignment.centerRight,
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        constraints:
            BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
        decoration: BoxDecoration(
          color: isConsultant
              ? cs.secondaryContainer
              : cs.primaryContainer,
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(16),
            topRight: const Radius.circular(16),
            bottomLeft:
                isConsultant ? Radius.zero : const Radius.circular(16),
            bottomRight:
                isConsultant ? const Radius.circular(16) : Radius.zero,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              message.senderAlias,
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.bold,
                color: isConsultant
                    ? cs.onSecondaryContainer
                    : cs.onPrimaryContainer,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              message.text,
              style: TextStyle(
                color: isConsultant
                    ? cs.onSecondaryContainer
                    : cs.onPrimaryContainer,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
