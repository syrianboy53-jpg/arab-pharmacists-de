import 'dart:convert';

import 'package:flutter/services.dart' show rootBundle;
import 'package:shared_preferences/shared_preferences.dart';

import 'ammaar_models.dart';

/// Manages Ammaar marketplace data: payment accounts, contact info,
/// user profiles, subscriptions, and material prices.
///
/// Seed data is loaded from bundled JSON assets. Admin edits are
/// persisted locally via SharedPreferences.
class AmmaarRepository {
  AmmaarRepository._();
  static final AmmaarRepository instance = AmmaarRepository._();

  static const _kPaymentAccounts = 'ammaar_payment_accounts';
  static const _kContactInfo = 'ammaar_contact_info';
  static const _kMaterialPrices = 'ammaar_material_prices';
  static const _kSubscriptionPlans = 'ammaar_subscription_plans';
  static const _kUserProfiles = 'ammaar_user_profiles';

  List<PaymentAccount> _paymentAccounts = [];
  List<ContactInfo> _contactInfo = [];
  List<MaterialPrice> _materialPrices = [];
  List<SubscriptionPlan> _subscriptionPlans = [];
  List<UserProfile> _userProfiles = [];

  List<PaymentAccount> get paymentAccounts => _paymentAccounts;
  List<ContactInfo> get contactInfo => _contactInfo;
  List<MaterialPrice> get materialPrices => _materialPrices;
  List<SubscriptionPlan> get subscriptionPlans => _subscriptionPlans;
  List<UserProfile> get userProfiles => _userProfiles;

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    _paymentAccounts = await _loadList<PaymentAccount>(
      prefs,
      _kPaymentAccounts,
      'assets/data/payment_accounts.json',
      PaymentAccount.fromJson,
    );
    _contactInfo = await _loadList<ContactInfo>(
      prefs,
      _kContactInfo,
      'assets/data/contact_info.json',
      ContactInfo.fromJson,
    );
    _materialPrices = await _loadList<MaterialPrice>(
      prefs,
      _kMaterialPrices,
      'assets/data/material_prices.json',
      MaterialPrice.fromJson,
    );
    _subscriptionPlans = await _loadList<SubscriptionPlan>(
      prefs,
      _kSubscriptionPlans,
      'assets/data/subscription_plans.json',
      SubscriptionPlan.fromJson,
    );
    final profilesJson = prefs.getString(_kUserProfiles);
    if (profilesJson != null) {
      _userProfiles = (jsonDecode(profilesJson) as List)
          .cast<Map<String, dynamic>>()
          .map(UserProfile.fromJson)
          .toList();
    }
  }

  Future<List<T>> _loadList<T>(
    SharedPreferences prefs,
    String key,
    String assetPath,
    T Function(Map<String, dynamic>) fromJson,
  ) async {
    final saved = prefs.getString(key);
    if (saved != null) {
      return (jsonDecode(saved) as List)
          .cast<Map<String, dynamic>>()
          .map(fromJson)
          .toList();
    }
    final raw = await rootBundle.loadString(assetPath);
    return (jsonDecode(raw) as List)
        .cast<Map<String, dynamic>>()
        .map(fromJson)
        .toList();
  }

  // --------------- Payment Accounts ---------------

  Future<void> savePaymentAccounts() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _kPaymentAccounts,
      jsonEncode(_paymentAccounts.map((e) => e.toJson()).toList()),
    );
  }

  Future<void> addPaymentAccount(PaymentAccount account) async {
    _paymentAccounts.add(account);
    await savePaymentAccounts();
  }

  Future<void> removePaymentAccount(String id) async {
    _paymentAccounts.removeWhere((a) => a.id == id);
    await savePaymentAccounts();
  }

  // --------------- Contact Info ---------------

  Future<void> saveContactInfo() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _kContactInfo,
      jsonEncode(_contactInfo.map((e) => e.toJson()).toList()),
    );
  }

  Future<void> addContactInfo(ContactInfo info) async {
    _contactInfo.add(info);
    await saveContactInfo();
  }

  Future<void> removeContactInfo(String id) async {
    _contactInfo.removeWhere((c) => c.id == id);
    await saveContactInfo();
  }

  // --------------- Material Prices ---------------

  Future<void> saveMaterialPrices() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _kMaterialPrices,
      jsonEncode(_materialPrices.map((e) => e.toJson()).toList()),
    );
  }

  Future<void> addMaterialPrice(MaterialPrice material) async {
    _materialPrices.add(material);
    await saveMaterialPrices();
  }

  Future<void> removeMaterialPrice(String id) async {
    _materialPrices.removeWhere((m) => m.id == id);
    await saveMaterialPrices();
  }

  // --------------- User Profiles ---------------

  Future<void> saveUserProfiles() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _kUserProfiles,
      jsonEncode(_userProfiles.map((e) => e.toJson()).toList()),
    );
  }

  Future<void> addUserProfile(UserProfile profile) async {
    _userProfiles.add(profile);
    await saveUserProfiles();
  }

  Future<void> removeUserProfile(String id) async {
    _userProfiles.removeWhere((p) => p.id == id);
    await saveUserProfiles();
  }

  UserProfile? profileById(String id) {
    for (final p in _userProfiles) {
      if (p.id == id) return p;
    }
    return null;
  }

  Future<void> updateSubscriptionStatus(
    String userId,
    SubscriptionStatus status, {
    String? plan,
  }) async {
    final profile = profileById(userId);
    if (profile != null) {
      profile.subscriptionStatus = status;
      if (plan != null) profile.subscriptionPlan = plan;
      await saveUserProfiles();
    }
  }
}
