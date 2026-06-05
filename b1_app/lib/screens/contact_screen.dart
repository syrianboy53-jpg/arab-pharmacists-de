import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';

class ContactScreen extends StatefulWidget {
  const ContactScreen({super.key});

  @override
  State<ContactScreen> createState() => _ContactScreenState();
}

class _ContactScreenState extends State<ContactScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _subjectController = TextEditingController();
  final _messageController = TextEditingController();
  
  String _selectedTopic = 'general';
  bool _isLoading = false;

  final Map<String, String> _topics = {
    'general': 'استفسار عام',
    'feedback': 'اقتراح أو ملاحظة',
    'premium': 'مشاكل الاشتراك / الدفع',
    'lessons': 'الدروس الخاصة والطلب الشفوي',
    'collab': 'شراكة / تعاون',
    'other': 'أخرى'
  };

  @override
  void initState() {
    super.initState();
    // Prefill user details if logged in
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final provider = Provider.of<AppProvider>(context, listen: false);
      if (provider.isLoggedIn) {
        setState(() {
          _nameController.text = provider.userName ?? '';
          _emailController.text = provider.userEmail ?? '';
        });
      }
    });
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _subjectController.dispose();
    _messageController.dispose();
    super.dispose();
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
    });

    final name = _nameController.text.trim();
    final email = _emailController.text.trim();
    final subject = _subjectController.text.trim();
    final message = _messageController.text.trim();
    final topic = _selectedTopic;

    try {
      final client = HttpClient();
      client.connectionTimeout = const Duration(seconds: 10);
      
      // Post to contact API
      final request = await client.postUrl(Uri.parse('https://b1-syrer.de/api/contact'));
      request.headers.set(HttpHeaders.contentTypeHeader, 'application/json');
      
      final body = json.encode({
        'name': name,
        'email': email,
        'subject': subject.isNotEmpty ? subject : null,
        'message': message,
        'topic': topic,
        'website': '' // Honeypot field must be empty
      });
      
      request.write(body);
      
      final response = await request.close();
      final responseBody = await response.transform(utf8.decoder).join();
      final data = json.decode(responseBody) as Map<String, dynamic>;

      setState(() {
        _isLoading = false;
      });

      if (response.statusCode == 200 && data['ok'] == true) {
        _showSuccessDialog();
      } else {
        _showErrorSnackBar(data['detail'] ?? 'فشل إرسال الرسالة، يرجى المحاولة لاحقاً.');
      }
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      _showErrorSnackBar('فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.');
    }
  }

  void _showErrorSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message, textAlign: TextAlign.right),
        backgroundColor: Colors.red,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _showSuccessDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Icon(Icons.check_circle, color: Color(0xFF10B981), size: 60),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'تم الإرسال بنجاح! 🎉',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 12),
            Text(
              'شكراً لتواصلك معنا. تم حفظ استفسارك في صندوق الإدارة وسنقوم بالرد عليك في أقرب وقت ممكن.',
              style: TextStyle(fontSize: 14, height: 1.5),
              textAlign: TextAlign.center,
            ),
          ],
        ),
        actions: [
          Center(
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF10B981),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
              ),
              onPressed: () {
                Navigator.of(ctx).pop(); // Dismiss dialog
                Navigator.of(context).pop(); // Back to previous screen
              },
              child: const Text('حسناً', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('تواصل معنا - Support'),
        centerTitle: true,
      ),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Info Banner
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: const Color(0xFF10B981).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: const Color(0xFF10B981).withOpacity(0.2)),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.support_agent, color: Color(0xFF10B981), size: 28),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            const Text(
                              'أرسل استفسارك مباشرة للإدارة',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                            ),
                            Text(
                              'نحن هنا لمساعدتك في استفساراتك حول الدروس، أو الاشتراك، أو أي مشاكل تقنية.',
                              style: TextStyle(fontSize: 11, color: isDark ? Colors.white70 : Colors.black54, height: 1.4),
                              textAlign: TextAlign.right,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // Name Field
                TextFormField(
                  controller: _nameController,
                  textAlign: TextAlign.right,
                  decoration: InputDecoration(
                    labelText: 'الاسم الكامل',
                    prefixIcon: const Icon(Icons.person),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  validator: (value) {
                    if (value == null || value.trim().isEmpty) {
                      return 'يرجى إدخال اسمك';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),

                // Email Field
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  textAlign: TextAlign.right,
                  decoration: InputDecoration(
                    labelText: 'البريد الإلكتروني',
                    prefixIcon: const Icon(Icons.email),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  validator: (value) {
                    if (value == null || value.trim().isEmpty) {
                      return 'يرجى إدخال بريدك الإلكتروني';
                    }
                    final emailRegex = RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$');
                    if (!emailRegex.hasMatch(value.trim())) {
                      return 'البريد الإلكتروني المدخل غير صالح';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),

                // Topic Field
                DropdownButtonFormField<String>(
                  value: _selectedTopic,
                  alignment: Alignment.centerRight,
                  decoration: InputDecoration(
                    labelText: 'قسم الاستفسار',
                    prefixIcon: const Icon(Icons.category),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  items: _topics.entries.map((entry) {
                    return DropdownMenuItem<String>(
                      value: entry.key,
                      child: Align(
                        alignment: Alignment.centerRight,
                        child: Text(entry.value),
                      ),
                    );
                  }).toList(),
                  onChanged: (value) {
                    if (value != null) {
                      setState(() {
                        _selectedTopic = value;
                      });
                    }
                  },
                ),
                const SizedBox(height: 16),

                // Subject Field
                TextFormField(
                  controller: _subjectController,
                  textAlign: TextAlign.right,
                  decoration: InputDecoration(
                    labelText: 'العنوان (اختياري)',
                    prefixIcon: const Icon(Icons.title),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
                const SizedBox(height: 16),

                // Message Field
                TextFormField(
                  controller: _messageController,
                  textAlign: TextAlign.right,
                  maxLines: 5,
                  decoration: InputDecoration(
                    labelText: 'تفاصيل الرسالة أو الاستفسار',
                    prefixIcon: const Icon(Icons.message),
                    alignLabelWithHint: true,
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  validator: (value) {
                    if (value == null || value.trim().isEmpty) {
                      return 'يرجى كتابة تفاصيل استفسارك';
                    }
                    if (value.trim().length < 10) {
                      return 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 24),

                // Submit Button
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    elevation: 2,
                  ),
                  onPressed: _isLoading ? null : _submitForm,
                  child: _isLoading
                      ? const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2.5),
                        )
                      : const Text(
                          'إرسال الرسالة 🚀',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
