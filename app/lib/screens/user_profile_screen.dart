import 'package:flutter/material.dart';

import '../ammaar_models.dart';
import '../ammaar_repository.dart';

class UserProfileScreen extends StatefulWidget {
  const UserProfileScreen({super.key});

  @override
  State<UserProfileScreen> createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends State<UserProfileScreen> {
  UserProfile? _profile;
  bool _isNew = false;

  final _nameCtrl = TextEditingController();
  final _phoneCtrl = TextEditingController();
  final _cityCtrl = TextEditingController();
  final _addressCtrl = TextEditingController();
  final _bioCtrl = TextEditingController();
  final _specialtyCtrl = TextEditingController();
  UserRole _role = UserRole.worker;
  bool _isAvailable = true;

  @override
  void initState() {
    super.initState();
    final profiles = AmmaarRepository.instance.userProfiles;
    if (profiles.isNotEmpty) {
      _profile = profiles.first;
      _populateFields(_profile!);
    } else {
      _isNew = true;
    }
  }

  void _populateFields(UserProfile p) {
    _nameCtrl.text = p.name;
    _phoneCtrl.text = p.phone;
    _cityCtrl.text = p.city ?? '';
    _addressCtrl.text = p.address ?? '';
    _bioCtrl.text = p.bio ?? '';
    _specialtyCtrl.text = p.specialty ?? '';
    _role = p.role;
    _isAvailable = p.isAvailable;
  }

  @override
  void dispose() {
    _nameCtrl.dispose();
    _phoneCtrl.dispose();
    _cityCtrl.dispose();
    _addressCtrl.dispose();
    _bioCtrl.dispose();
    _specialtyCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: Text(_isNew ? 'إنشاء حساب — عمّار' : 'ملفي الشخصي'),
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Profile avatar
              Center(
                child: Stack(
                  children: [
                    CircleAvatar(
                      radius: 50,
                      backgroundColor: cs.primaryContainer,
                      child: Icon(Icons.person,
                          size: 50, color: cs.onPrimaryContainer),
                    ),
                    Positioned(
                      bottom: 0,
                      left: 0,
                      child: CircleAvatar(
                        radius: 18,
                        backgroundColor: cs.primary,
                        child: IconButton(
                          icon: Icon(Icons.camera_alt,
                              size: 16, color: cs.onPrimary),
                          onPressed: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                  content: Text(
                                      'ميزة رفع الصور ستكون متاحة قريباً')),
                            );
                          },
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Role selector
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('نوع الحساب',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      SegmentedButton<UserRole>(
                        segments: const [
                          ButtonSegment(
                            value: UserRole.worker,
                            icon: Icon(Icons.construction),
                            label: Text('صنايعي'),
                          ),
                          ButtonSegment(
                            value: UserRole.employer,
                            icon: Icon(Icons.business),
                            label: Text('صاحب عمل'),
                          ),
                        ],
                        selected: {_role},
                        onSelectionChanged: (s) =>
                            setState(() => _role = s.first),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Basic info
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('المعلومات الأساسية',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 12),
                      TextField(
                        controller: _nameCtrl,
                        decoration: const InputDecoration(
                          labelText: 'الاسم الكامل',
                          prefixIcon: Icon(Icons.person_outline),
                        ),
                      ),
                      const SizedBox(height: 12),
                      TextField(
                        controller: _phoneCtrl,
                        decoration: const InputDecoration(
                          labelText: 'رقم الهاتف',
                          prefixIcon: Icon(Icons.phone_outlined),
                        ),
                        keyboardType: TextInputType.phone,
                      ),
                      const SizedBox(height: 12),
                      TextField(
                        controller: _cityCtrl,
                        decoration: const InputDecoration(
                          labelText: 'المدينة',
                          prefixIcon: Icon(Icons.location_city_outlined),
                        ),
                      ),
                      const SizedBox(height: 12),
                      TextField(
                        controller: _addressCtrl,
                        decoration: const InputDecoration(
                          labelText: 'العنوان التفصيلي',
                          prefixIcon: Icon(Icons.map_outlined),
                        ),
                        maxLines: 2,
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Worker-specific fields
              if (_role == UserRole.worker) ...[
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('معلومات العمل',
                            style: TextStyle(fontWeight: FontWeight.bold)),
                        const SizedBox(height: 12),
                        TextField(
                          controller: _specialtyCtrl,
                          decoration: const InputDecoration(
                            labelText: 'التخصص (بلاط، دهان، كهرباء...)',
                            prefixIcon: Icon(Icons.handyman_outlined),
                          ),
                        ),
                        const SizedBox(height: 12),
                        SwitchListTile(
                          title: const Text('متاح للعمل'),
                          subtitle: Text(_isAvailable
                              ? 'أنا متاح حالياً'
                              : 'مشغول حالياً'),
                          value: _isAvailable,
                          onChanged: (v) =>
                              setState(() => _isAvailable = v),
                          secondary: Icon(
                            _isAvailable
                                ? Icons.check_circle
                                : Icons.pause_circle,
                            color: _isAvailable ? Colors.green : Colors.grey,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
              ],

              // Bio / about
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('نبذة تعريفية',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 12),
                      TextField(
                        controller: _bioCtrl,
                        decoration: const InputDecoration(
                          hintText:
                              'اكتب نبذة عنك أو عن أعمالك السابقة...',
                          border: OutlineInputBorder(),
                        ),
                        maxLines: 4,
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Subscription status (read-only for user)
              if (_profile != null)
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('حالة الاشتراك',
                            style: TextStyle(fontWeight: FontWeight.bold)),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Icon(
                              _profile!.subscriptionStatus ==
                                      SubscriptionStatus.active
                                  ? Icons.star
                                  : Icons.star_outline,
                              color: _profile!.subscriptionStatus ==
                                      SubscriptionStatus.active
                                  ? Colors.amber
                                  : Colors.grey,
                            ),
                            const SizedBox(width: 8),
                            Text(
                              _subscriptionLabel(
                                  _profile!.subscriptionStatus),
                              style: const TextStyle(fontSize: 15),
                            ),
                          ],
                        ),
                        if (_profile!.subscriptionPlan != null) ...[
                          const SizedBox(height: 4),
                          Text('الباقة: ${_profile!.subscriptionPlan}',
                              style: TextStyle(color: cs.outline)),
                        ],
                      ],
                    ),
                  ),
                ),
              const SizedBox(height: 24),

              // Save button
              FilledButton.icon(
                icon: const Icon(Icons.save),
                label: Text(_isNew ? 'إنشاء الحساب' : 'حفظ التعديلات'),
                onPressed: _save,
                style: FilledButton.styleFrom(
                  minimumSize: const Size.fromHeight(48),
                ),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }

  String _subscriptionLabel(SubscriptionStatus status) {
    switch (status) {
      case SubscriptionStatus.free:
        return 'حساب مجاني';
      case SubscriptionStatus.pending:
        return 'بانتظار التفعيل';
      case SubscriptionStatus.active:
        return 'حساب VIP فعّال';
      case SubscriptionStatus.expired:
        return 'اشتراك منتهي';
    }
  }

  Future<void> _save() async {
    if (_nameCtrl.text.isEmpty || _phoneCtrl.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('الرجاء إدخال الاسم ورقم الهاتف')),
      );
      return;
    }

    if (_isNew) {
      final profile = UserProfile(
        id: 'user_${DateTime.now().millisecondsSinceEpoch}',
        name: _nameCtrl.text,
        role: _role,
        phone: _phoneCtrl.text,
        city: _cityCtrl.text.isNotEmpty ? _cityCtrl.text : null,
        address: _addressCtrl.text.isNotEmpty ? _addressCtrl.text : null,
        bio: _bioCtrl.text.isNotEmpty ? _bioCtrl.text : null,
        specialty:
            _specialtyCtrl.text.isNotEmpty ? _specialtyCtrl.text : null,
        isAvailable: _isAvailable,
      );
      await AmmaarRepository.instance.addUserProfile(profile);
      setState(() {
        _profile = profile;
        _isNew = false;
      });
    } else {
      _profile!.name = _nameCtrl.text;
      _profile!.role = _role;
      _profile!.phone = _phoneCtrl.text;
      _profile!.city = _cityCtrl.text.isNotEmpty ? _cityCtrl.text : null;
      _profile!.address =
          _addressCtrl.text.isNotEmpty ? _addressCtrl.text : null;
      _profile!.bio = _bioCtrl.text.isNotEmpty ? _bioCtrl.text : null;
      _profile!.specialty =
          _specialtyCtrl.text.isNotEmpty ? _specialtyCtrl.text : null;
      _profile!.isAvailable = _isAvailable;
      await AmmaarRepository.instance.saveUserProfiles();
    }

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('تم الحفظ بنجاح')),
      );
    }
  }
}
