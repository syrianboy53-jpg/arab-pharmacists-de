// Data models for the Aman (أمان) community support sections.

/// An expert available for consultation.
class Expert {
  final String id;
  final String nameAr;
  final String specialty; // e.g. 'lawyer', 'psychologist', 'coach'
  final String specialtyAr;
  final String descriptionAr;
  final String? city;
  final String? phone;
  final String? email;
  final bool speaksArabic;
  final bool speaksGerman;
  final List<String> tags;

  const Expert({
    required this.id,
    required this.nameAr,
    required this.specialty,
    required this.specialtyAr,
    required this.descriptionAr,
    this.city,
    this.phone,
    this.email,
    this.speaksArabic = true,
    this.speaksGerman = false,
    this.tags = const [],
  });

  factory Expert.fromJson(Map<String, dynamic> j) => Expert(
        id: j['id'] as String,
        nameAr: j['name_ar'] as String,
        specialty: j['specialty'] as String,
        specialtyAr: j['specialty_ar'] as String,
        descriptionAr: j['description_ar'] as String,
        city: j['city'] as String?,
        phone: j['phone'] as String?,
        email: j['email'] as String?,
        speaksArabic: (j['speaks_arabic'] as bool?) ?? true,
        speaksGerman: (j['speaks_german'] as bool?) ?? false,
        tags: (j['tags'] as List?)?.cast<String>() ?? const [],
      );
}

/// Ticket status for the consulting system.
enum TicketStatus { open, pending, answered, closed }

/// An anonymous consultation ticket (upgraded from simple question).
class AnonQuestion {
  final String id;
  final int ticketNumber;
  final String questionAr;
  final String category; // 'legal', 'psychological', 'social'
  final String? answerAr;
  final String? answeredBy;
  final String date;
  final TicketStatus status;
  final List<String> attachmentNames;
  final bool isPremium;

  const AnonQuestion({
    required this.id,
    required this.ticketNumber,
    required this.questionAr,
    required this.category,
    this.answerAr,
    this.answeredBy,
    required this.date,
    this.status = TicketStatus.open,
    this.attachmentNames = const [],
    this.isPremium = false,
  });

  factory AnonQuestion.fromJson(Map<String, dynamic> j) => AnonQuestion(
        id: j['id'] as String,
        ticketNumber: (j['ticket_number'] as int?) ?? 0,
        questionAr: j['question_ar'] as String,
        category: j['category'] as String,
        answerAr: j['answer_ar'] as String?,
        answeredBy: j['answered_by'] as String?,
        date: j['date'] as String,
        status: TicketStatus.values.firstWhere(
          (s) => s.name == (j['status'] as String? ?? 'open'),
          orElse: () => TicketStatus.open,
        ),
        attachmentNames:
            (j['attachment_names'] as List?)?.cast<String>() ?? const [],
        isPremium: (j['is_premium'] as bool?) ?? false,
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'ticket_number': ticketNumber,
        'question_ar': questionAr,
        'category': category,
        'answer_ar': answerAr,
        'answered_by': answeredBy,
        'date': date,
        'status': status.name,
        'attachment_names': attachmentNames,
        'is_premium': isPremium,
      };
}

/// Subscription tier for Aman.
enum AmanTier { free, premium }

/// User subscription state.
class AmanSubscription {
  final AmanTier tier;
  final String? expiresAt; // ISO date, null for free
  final int questionsUsedThisMonth;
  final int maxQuestionsPerMonth; // 0 = unlimited for premium concept

  const AmanSubscription({
    this.tier = AmanTier.free,
    this.expiresAt,
    this.questionsUsedThisMonth = 0,
    this.maxQuestionsPerMonth = 2,
  });

  bool get isPremium => tier == AmanTier.premium;
  bool get canAskQuestion =>
      isPremium || questionsUsedThisMonth < maxQuestionsPerMonth;

  factory AmanSubscription.fromJson(Map<String, dynamic> j) =>
      AmanSubscription(
        tier: j['tier'] == 'premium' ? AmanTier.premium : AmanTier.free,
        expiresAt: j['expires_at'] as String?,
        questionsUsedThisMonth:
            (j['questions_used_this_month'] as int?) ?? 0,
        maxQuestionsPerMonth: (j['max_questions_per_month'] as int?) ?? 2,
      );

  Map<String, dynamic> toJson() => {
        'tier': tier.name,
        'expires_at': expiresAt,
        'questions_used_this_month': questionsUsedThisMonth,
        'max_questions_per_month': maxQuestionsPerMonth,
      };
}

/// A subscription plan offered to users.
class AmanPlan {
  final String id;
  final String nameAr;
  final String descriptionAr;
  final double priceEur;
  final String duration; // 'monthly' or 'yearly'
  final List<String> features;

  const AmanPlan({
    required this.id,
    required this.nameAr,
    required this.descriptionAr,
    required this.priceEur,
    required this.duration,
    this.features = const [],
  });

  factory AmanPlan.fromJson(Map<String, dynamic> j) => AmanPlan(
        id: j['id'] as String,
        nameAr: j['name_ar'] as String,
        descriptionAr: j['description_ar'] as String,
        priceEur: (j['price_eur'] as num).toDouble(),
        duration: j['duration'] as String,
        features: (j['features'] as List?)?.cast<String>() ?? const [],
      );
}

/// A Jugendamt risk detector question.
class JugendamtRiskQuestion {
  final String id;
  final String questionAr;
  final List<String> options;
  final List<int> riskScores; // per option (higher = more risk)

  const JugendamtRiskQuestion({
    required this.id,
    required this.questionAr,
    required this.options,
    required this.riskScores,
  });

  factory JugendamtRiskQuestion.fromJson(Map<String, dynamic> j) =>
      JugendamtRiskQuestion(
        id: j['id'] as String,
        questionAr: j['question_ar'] as String,
        options: (j['options'] as List).cast<String>(),
        riskScores: (j['risk_scores'] as List).cast<int>(),
      );
}

/// A legal guide article (Jugendamt, rights, duties, prevention).
class LegalArticle {
  final String id;
  final String titleAr;
  final String bodyAr;
  final String category; // 'jugendamt', 'rights', 'prevention', 'general'
  final String? iconName;
  final int sortOrder;

  const LegalArticle({
    required this.id,
    required this.titleAr,
    required this.bodyAr,
    required this.category,
    this.iconName,
    this.sortOrder = 0,
  });

  factory LegalArticle.fromJson(Map<String, dynamic> j) => LegalArticle(
        id: j['id'] as String,
        titleAr: j['title_ar'] as String,
        bodyAr: j['body_ar'] as String,
        category: j['category'] as String,
        iconName: j['icon_name'] as String?,
        sortOrder: (j['sort_order'] as int?) ?? 0,
      );
}

/// Emergency resource (Frauenhaus, hotlines, etc.).
class EmergencyResource {
  final String id;
  final String titleAr;
  final String descriptionAr;
  final String? phone;
  final String? website;
  final String type; // 'frauenhaus', 'hotline', 'legal_aid', 'police'
  final bool isEmergency;

  const EmergencyResource({
    required this.id,
    required this.titleAr,
    required this.descriptionAr,
    this.phone,
    this.website,
    required this.type,
    this.isEmergency = false,
  });

  factory EmergencyResource.fromJson(Map<String, dynamic> j) =>
      EmergencyResource(
        id: j['id'] as String,
        titleAr: j['title_ar'] as String,
        descriptionAr: j['description_ar'] as String,
        phone: j['phone'] as String?,
        website: j['website'] as String?,
        type: j['type'] as String,
        isEmergency: (j['is_emergency'] as bool?) ?? false,
      );
}

/// A legal explanation article (e.g. Gewaltschutzgesetz).
class LegalExplanation {
  final String id;
  final String titleAr;
  final String bodyAr;
  final String lawNameDe;

  const LegalExplanation({
    required this.id,
    required this.titleAr,
    required this.bodyAr,
    required this.lawNameDe,
  });

  factory LegalExplanation.fromJson(Map<String, dynamic> j) =>
      LegalExplanation(
        id: j['id'] as String,
        titleAr: j['title_ar'] as String,
        bodyAr: j['body_ar'] as String,
        lawNameDe: j['law_name_de'] as String,
      );
}

/// A real story for the "Stories & Lessons" section.
class RealStory {
  final String id;
  final String titleAr;
  final String bodyAr;
  final String category; // 'divorce_regret', 'reconciliation', 'lesson'
  final String? moral; // العبرة
  final bool isAnonymous;

  const RealStory({
    required this.id,
    required this.titleAr,
    required this.bodyAr,
    required this.category,
    this.moral,
    this.isAnonymous = true,
  });

  factory RealStory.fromJson(Map<String, dynamic> j) => RealStory(
        id: j['id'] as String,
        titleAr: j['title_ar'] as String,
        bodyAr: j['body_ar'] as String,
        category: j['category'] as String,
        moral: j['moral'] as String?,
        isAnonymous: (j['is_anonymous'] as bool?) ?? true,
      );
}

/// A "What if?" scenario for simulating divorce consequences.
class WhatIfScenario {
  final String id;
  final String titleAr;
  final String scenarioAr;
  final List<String> consequences; // list of consequence descriptions in Arabic

  const WhatIfScenario({
    required this.id,
    required this.titleAr,
    required this.scenarioAr,
    required this.consequences,
  });

  factory WhatIfScenario.fromJson(Map<String, dynamic> j) => WhatIfScenario(
        id: j['id'] as String,
        titleAr: j['title_ar'] as String,
        scenarioAr: j['scenario_ar'] as String,
        consequences: (j['consequences'] as List?)?.cast<String>() ?? const [],
      );
}

/// A relationship quiz question.
class RelationshipQuizQuestion {
  final String id;
  final String questionAr;
  final List<String> options;
  final List<int> scores; // score per option (higher = more tension)

  const RelationshipQuizQuestion({
    required this.id,
    required this.questionAr,
    required this.options,
    required this.scores,
  });

  factory RelationshipQuizQuestion.fromJson(Map<String, dynamic> j) =>
      RelationshipQuizQuestion(
        id: j['id'] as String,
        questionAr: j['question_ar'] as String,
        options: (j['options'] as List).cast<String>(),
        scores: (j['scores'] as List).cast<int>(),
      );
}

/// A podcast episode entry.
class PodcastEpisode {
  final String id;
  final String titleAr;
  final String descriptionAr;
  final String durationMinutes;
  final String topic;

  const PodcastEpisode({
    required this.id,
    required this.titleAr,
    required this.descriptionAr,
    required this.durationMinutes,
    required this.topic,
  });

  factory PodcastEpisode.fromJson(Map<String, dynamic> j) => PodcastEpisode(
        id: j['id'] as String,
        titleAr: j['title_ar'] as String,
        descriptionAr: j['description_ar'] as String,
        durationMinutes: j['duration_minutes'] as String,
        topic: j['topic'] as String,
      );
}

/// A help center on the interactive map.
class HelpCenter {
  final String id;
  final String nameAr;
  final String city;
  final String address;
  final String? phone;
  final String? website;
  final String type; // 'counseling', 'legal', 'psychological', 'social'
  final bool speaksArabic;

  const HelpCenter({
    required this.id,
    required this.nameAr,
    required this.city,
    required this.address,
    this.phone,
    this.website,
    required this.type,
    this.speaksArabic = true,
  });

  factory HelpCenter.fromJson(Map<String, dynamic> j) => HelpCenter(
        id: j['id'] as String,
        nameAr: j['name_ar'] as String,
        city: j['city'] as String,
        address: j['address'] as String,
        phone: j['phone'] as String?,
        website: j['website'] as String?,
        type: j['type'] as String,
        speaksArabic: (j['speaks_arabic'] as bool?) ?? true,
      );
}
