import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:arab_pharmacists_de/ammaar_models.dart';
import 'package:arab_pharmacists_de/ammaar_repository.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  test('AmmaarRepository loads all bundled datasets', () async {
    await AmmaarRepository.instance.load();
    expect(AmmaarRepository.instance.paymentAccounts, isNotEmpty);
    expect(AmmaarRepository.instance.contactInfo, isNotEmpty);
    expect(AmmaarRepository.instance.materialPrices, isNotEmpty);
    expect(AmmaarRepository.instance.subscriptionPlans, isNotEmpty);
  });

  test('PaymentAccount serialization round-trip', () {
    final account = PaymentAccount(
      id: 'test_1',
      method: 'syriatel_cash',
      label: 'سيريتل كاش',
      accountNumber: '0991234567',
      holderName: 'أحمد',
    );
    final json = account.toJson();
    final restored = PaymentAccount.fromJson(json);
    expect(restored.id, account.id);
    expect(restored.method, account.method);
    expect(restored.label, account.label);
    expect(restored.accountNumber, account.accountNumber);
    expect(restored.holderName, account.holderName);
    expect(restored.enabled, isTrue);
  });

  test('ContactInfo serialization round-trip', () {
    final info = ContactInfo(
      id: 'ci_test',
      type: 'whatsapp',
      label: 'واتساب',
      value: '0991234567',
      enabled: false,
    );
    final json = info.toJson();
    final restored = ContactInfo.fromJson(json);
    expect(restored.id, info.id);
    expect(restored.type, info.type);
    expect(restored.enabled, isFalse);
  });

  test('UserProfile serialization round-trip', () {
    final profile = UserProfile(
      id: 'u_1',
      name: 'محمد',
      role: UserRole.worker,
      phone: '0991234567',
      city: 'دمشق',
      specialty: 'بلاط',
      isAvailable: true,
      subscriptionStatus: SubscriptionStatus.active,
      subscriptionPlan: 'شريك الإعمار',
    );
    final json = profile.toJson();
    final restored = UserProfile.fromJson(json);
    expect(restored.id, profile.id);
    expect(restored.name, profile.name);
    expect(restored.role, UserRole.worker);
    expect(restored.city, 'دمشق');
    expect(restored.specialty, 'بلاط');
    expect(restored.subscriptionStatus, SubscriptionStatus.active);
    expect(restored.subscriptionPlan, 'شريك الإعمار');
  });

  test('MaterialPrice serialization round-trip', () {
    final material = MaterialPrice(
      id: 'mp_test',
      nameAr: 'إسمنت',
      unit: 'طن',
      price: 1200000,
      lastUpdated: '2026-04-27',
      source: 'manual',
    );
    final json = material.toJson();
    final restored = MaterialPrice.fromJson(json);
    expect(restored.id, material.id);
    expect(restored.nameAr, 'إسمنت');
    expect(restored.price, 1200000);
    expect(restored.unit, 'طن');
  });

  test('SubscriptionPlan serialization round-trip', () {
    const plan = SubscriptionPlan(
      id: 'plan_test',
      nameAr: 'باقة شهرية',
      descriptionAr: 'اشتراك شهري',
      priceSyp: 200000,
      duration: 'monthly',
    );
    final json = plan.toJson();
    final restored = SubscriptionPlan.fromJson(json);
    expect(restored.id, plan.id);
    expect(restored.nameAr, 'باقة شهرية');
    expect(restored.priceSyp, 200000);
    expect(restored.duration, 'monthly');
  });

  test('Material prices seed data has at least 10 items', () async {
    await AmmaarRepository.instance.load();
    expect(
      AmmaarRepository.instance.materialPrices.length,
      greaterThanOrEqualTo(10),
    );
  });

  test('Every material price has valid fields', () async {
    await AmmaarRepository.instance.load();
    for (final m in AmmaarRepository.instance.materialPrices) {
      expect(m.nameAr, isNotEmpty, reason: 'Material ${m.id} missing name');
      expect(m.unit, isNotEmpty, reason: 'Material ${m.id} missing unit');
      expect(m.price, greaterThan(0),
          reason: 'Material ${m.id} has invalid price');
    }
  });
}
