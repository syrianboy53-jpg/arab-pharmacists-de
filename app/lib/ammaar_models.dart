// Data models for the Ammaar (عمّار) construction marketplace features.

/// Payment account displayed on the VIP subscription page.
class PaymentAccount {
  final String id;
  final String method; // e.g. 'syriatel_cash', 'sham_cash', 'al_haram'
  String label; // display name in Arabic
  String accountNumber;
  String holderName;
  bool enabled;

  PaymentAccount({
    required this.id,
    required this.method,
    required this.label,
    required this.accountNumber,
    required this.holderName,
    this.enabled = true,
  });

  factory PaymentAccount.fromJson(Map<String, dynamic> j) => PaymentAccount(
        id: j['id'] as String,
        method: j['method'] as String,
        label: j['label'] as String,
        accountNumber: j['account_number'] as String,
        holderName: j['holder_name'] as String,
        enabled: (j['enabled'] as bool?) ?? true,
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'method': method,
        'label': label,
        'account_number': accountNumber,
        'holder_name': holderName,
        'enabled': enabled,
      };
}

/// Social / contact channel shown in the app's contact section.
class ContactInfo {
  final String id;
  final String type; // e.g. 'phone', 'whatsapp', 'telegram', 'facebook', 'email'
  String label;
  String value;
  bool enabled;

  ContactInfo({
    required this.id,
    required this.type,
    required this.label,
    required this.value,
    this.enabled = true,
  });

  factory ContactInfo.fromJson(Map<String, dynamic> j) => ContactInfo(
        id: j['id'] as String,
        type: j['type'] as String,
        label: j['label'] as String,
        value: j['value'] as String,
        enabled: (j['enabled'] as bool?) ?? true,
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'type': type,
        'label': label,
        'value': value,
        'enabled': enabled,
      };
}

/// Role of a registered user in the Ammaar marketplace.
enum UserRole { worker, employer }

/// A user profile (صنايعي or صاحب عمل).
class UserProfile {
  final String id;
  String name;
  UserRole role;
  String phone;
  String? city;
  String? address;
  String? bio;
  String? photoUrl;
  String? specialty; // only for workers (e.g. بلاط، دهان، كهرباء)
  bool isAvailable; // only for workers – availability toggle
  bool isVerified;
  SubscriptionStatus subscriptionStatus;
  String? subscriptionPlan;

  UserProfile({
    required this.id,
    required this.name,
    required this.role,
    required this.phone,
    this.city,
    this.address,
    this.bio,
    this.photoUrl,
    this.specialty,
    this.isAvailable = true,
    this.isVerified = false,
    this.subscriptionStatus = SubscriptionStatus.free,
    this.subscriptionPlan,
  });

  factory UserProfile.fromJson(Map<String, dynamic> j) => UserProfile(
        id: j['id'] as String,
        name: j['name'] as String,
        role: j['role'] == 'employer' ? UserRole.employer : UserRole.worker,
        phone: j['phone'] as String,
        city: j['city'] as String?,
        address: j['address'] as String?,
        bio: j['bio'] as String?,
        photoUrl: j['photo_url'] as String?,
        specialty: j['specialty'] as String?,
        isAvailable: (j['is_available'] as bool?) ?? true,
        isVerified: (j['is_verified'] as bool?) ?? false,
        subscriptionStatus: SubscriptionStatus.values.firstWhere(
          (s) => s.name == (j['subscription_status'] as String? ?? 'free'),
          orElse: () => SubscriptionStatus.free,
        ),
        subscriptionPlan: j['subscription_plan'] as String?,
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'role': role.name,
        'phone': phone,
        'city': city,
        'address': address,
        'bio': bio,
        'photo_url': photoUrl,
        'specialty': specialty,
        'is_available': isAvailable,
        'is_verified': isVerified,
        'subscription_status': subscriptionStatus.name,
        'subscription_plan': subscriptionPlan,
      };
}

enum SubscriptionStatus { free, pending, active, expired }

/// A construction material with its current price.
class MaterialPrice {
  final String id;
  String nameAr;
  String unit; // e.g. 'طن', 'كيس', 'متر'
  double price; // in SYP
  String? lastUpdated; // ISO date string
  String? source; // e.g. 'manual', 'online'

  MaterialPrice({
    required this.id,
    required this.nameAr,
    required this.unit,
    required this.price,
    this.lastUpdated,
    this.source,
  });

  factory MaterialPrice.fromJson(Map<String, dynamic> j) => MaterialPrice(
        id: j['id'] as String,
        nameAr: j['name_ar'] as String,
        unit: j['unit'] as String,
        price: (j['price'] as num).toDouble(),
        lastUpdated: j['last_updated'] as String?,
        source: j['source'] as String?,
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'name_ar': nameAr,
        'unit': unit,
        'price': price,
        'last_updated': lastUpdated,
        'source': source,
      };
}

/// VIP subscription plan definition.
class SubscriptionPlan {
  final String id;
  final String nameAr;
  final String descriptionAr;
  final double priceSyp;
  final String duration; // e.g. 'monthly', 'yearly', 'lifetime'

  const SubscriptionPlan({
    required this.id,
    required this.nameAr,
    required this.descriptionAr,
    required this.priceSyp,
    required this.duration,
  });

  factory SubscriptionPlan.fromJson(Map<String, dynamic> j) =>
      SubscriptionPlan(
        id: j['id'] as String,
        nameAr: j['name_ar'] as String,
        descriptionAr: j['description_ar'] as String,
        priceSyp: (j['price_syp'] as num).toDouble(),
        duration: j['duration'] as String,
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'name_ar': nameAr,
        'description_ar': descriptionAr,
        'price_syp': priceSyp,
        'duration': duration,
      };
}
