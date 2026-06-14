import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class AiChatScreen extends StatefulWidget {
  const AiChatScreen({super.key});

  @override
  _AiChatScreenState createState() => _AiChatScreenState();
}

class _AiChatScreenState extends State<AiChatScreen> {
  final TextEditingController _textController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  final List<Map<String, String>> _messages = [];
  bool _isLoading = false;
  String _selectedPersona = 'auslaenderbehoerde';

  final Map<String, String> _personas = {
    'auslaenderbehoerde': 'موظف دائرة الأجانب (Ausländerbehörde)',
    'landlord': 'صاحب سكن (Vermieter)',
    'jobcenter': 'موظف الجوب سنتر (Jobcenter)',
    'friend': 'صديق ألماني (Lukas)'
  };

  @override
  void initState() {
    super.initState();
    _messages.add({
      'role': 'bot',
      'content': 'Hallo! Wie kann ich Ihnen heute helfen?'
    });
  }

  void _sendMessage() async {
    final text = _textController.text.trim();
    if (text.isEmpty) return;

    setState(() {
      _messages.add({'role': 'user', 'content': text});
      _textController.clear();
      _isLoading = true;
    });

    _scrollToBottom();

    try {
      final history = _messages
          .where((m) => m['role'] != 'system')
          .map((m) => {'role': m['role'], 'content': m['content']})
          .toList();
          
      // Remove the latest user message from history, as we send it separately
      history.removeLast();

      final response = await http.post(
        Uri.parse('https://www.b1-syrer.de/api/ai-chat'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'message': text,
          'persona': _selectedPersona,
          'history': history,
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          _messages.add({'role': 'bot', 'content': data['reply'] ?? 'Keine Antwort erhalten.'});
        });
      } else {
        setState(() {
          _messages.add({'role': 'bot', 'content': '[Serverfehler: ${response.statusCode}]'});
        });
      }
    } catch (e) {
      setState(() {
        _messages.add({'role': 'bot', 'content': '[Verbindungsfehler. Bitte überprüfen Sie Ihr Internet.]'});
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
      _scrollToBottom();
    }
  }

  void _scrollToBottom() {
    Future.delayed(const Duration(milliseconds: 100), () {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text('دردشة الذكاء الاصطناعي 🤖', style: GoogleFonts.cairo(fontWeight: FontWeight.bold)),
        actions: [
          DropdownButton<String>(
            value: _selectedPersona,
            dropdownColor: isDark ? const Color(0xFF1E293B) : Colors.white,
            style: GoogleFonts.cairo(color: colorScheme.onSurface),
            underline: Container(),
            icon: const Icon(Icons.person, color: Colors.blue),
            items: _personas.entries.map((e) {
              return DropdownMenuItem<String>(
                value: e.key,
                child: Text(e.value),
              );
            }).toList(),
            onChanged: (val) {
              if (val != null) {
                setState(() {
                  _selectedPersona = val;
                  _messages.clear();
                  _messages.add({
                    'role': 'bot',
                    'content': 'Hallo! Neues Gespräch gestartet. Wie kann ich helfen?'
                  });
                });
              }
            },
          ),
          const SizedBox(width: 8)
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                final isUser = msg['role'] == 'user';
                return Align(
                  alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    decoration: BoxDecoration(
                      color: isUser ? colorScheme.primary : (isDark ? const Color(0xFF334155) : Colors.grey[200]),
                      borderRadius: BorderRadius.only(
                        topLeft: const Radius.circular(16),
                        topRight: const Radius.circular(16),
                        bottomLeft: isUser ? const Radius.circular(16) : Radius.zero,
                        bottomRight: isUser ? Radius.zero : const Radius.circular(16),
                      ),
                    ),
                    child: Text(
                      msg['content'] ?? '',
                      style: GoogleFonts.cairo(
                        color: isUser ? colorScheme.onPrimary : colorScheme.onSurface,
                        fontSize: 16,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          if (_isLoading)
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: CircularProgressIndicator(),
            ),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF1E293B) : Colors.white,
              border: Border(top: BorderSide(color: isDark ? const Color(0xFF334155) : Colors.grey[300]!)),
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _textController,
                    decoration: InputDecoration(
                      hintText: 'اكتب رسالتك بالألمانية...',
                      hintStyle: GoogleFonts.cairo(),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(24),
                        borderSide: BorderSide.none,
                      ),
                      filled: true,
                      fillColor: isDark ? const Color(0xFF0F172A) : Colors.grey[100],
                      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
                    ),
                    onSubmitted: (_) => _sendMessage(),
                  ),
                ),
                const SizedBox(width: 8),
                CircleAvatar(
                  backgroundColor: colorScheme.primary,
                  radius: 24,
                  child: IconButton(
                    icon: const Icon(Icons.send, color: Colors.white),
                    onPressed: _sendMessage,
                  ),
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
