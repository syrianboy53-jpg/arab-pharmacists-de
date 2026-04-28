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
  final String? activePlanId; // e.g. 'plan-monthly', 'plan-yearly'
  final String? expiresAt; // ISO date, null for free
  final int questionsUsedThisMonth;
  final int maxQuestionsPerMonth; // 0 = unlimited for premium concept
  final String? questionsResetMonth; // e.g. '2026-04' for monthly reset

  const AmanSubscription({
    this.tier = AmanTier.free,
    this.activePlanId,
    this.expiresAt,
    this.questionsUsedThisMonth = 0,
    this.maxQuestionsPerMonth = 2,
    this.questionsResetMonth,
  });

  bool get isPremium => tier == AmanTier.premium;
  bool get canAskQuestion =>
      isPremium || questionsUsedThisMonth < maxQuestionsPerMonth;

  AmanSubscription copyWith({
    AmanTier? tier,
    String? activePlanId,
    String? expiresAt,
    int? questionsUsedThisMonth,
    int? maxQuestionsPerMonth,
    String? questionsResetMonth,
  }) =>
      AmanSubscription(
        tier: tier ?? this.tier,
        activePlanId: activePlanId ?? this.activePlanId,
        expiresAt: expiresAt ?? this.expiresAt,
        questionsUsedThisMonth:
            questionsUsedThisMonth ?? this.questionsUsedThisMonth,
        maxQuestionsPerMonth:
            maxQuestionsPerMonth ?? this.maxQuestionsPerMonth,
        questionsResetMonth:
            questionsResetMonth ?? this.questionsResetMonth,
      );

  factory AmanSubscription.fromJson(Map<String, dynamic> j) =>
      AmanSubscription(
        tier: j['tier'] == 'premium' ? AmanTier.premium : AmanTier.free,
        activePlanId: j['active_plan_id'] as String?,
        expiresAt: j['expires_at'] as String?,
        questionsUsedThisMonth:
            (j['questions_used_this_month'] as int?) ?? 0,
        maxQuestionsPerMonth: (j['max_questions_per_month'] as int?) ?? 2,
        questionsResetMonth: j['questions_reset_month'] as String?,
      );

  Map<String, dynamic> toJson() => {
        'tier': tier.name,
        'active_plan_id': activePlanId,
        'expires_at': expiresAt,
        'questions_used_this_month': questionsUsedThisMonth,
        'max_questions_per_month': maxQuestionsPerMonth,
        'questions_reset_month': questionsResetMonth,
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

// --------------- Private Session (الجلسة السرية) ---------------

/// Status of a private consulting session.
enum PrivateSessionStatus { booked, active, ended, destroyed }

/// A private (secret) consulting session.
class PrivateSession {
  final String id;
  final String alias; // user-chosen pseudonym
  final String date; // ISO date e.g. '2026-05-01'
  final String timeSlot; // e.g. '14:00'
  final int durationMinutes;
  final double priceEur;
  final PrivateSessionStatus status;
  final String? consultantAlias;
  final List<ChatMessage> messages;
  final String createdAt; // ISO datetime

  const PrivateSession({
    required this.id,
    required this.alias,
    required this.date,
    required this.timeSlot,
    this.durationMinutes = 25,
    this.priceEur = 1.0,
    this.status = PrivateSessionStatus.booked,
    this.consultantAlias,
    this.messages = const [],
    required this.createdAt,
  });

  factory PrivateSession.fromJson(Map<String, dynamic> j) => PrivateSession(
        id: j['id'] as String,
        alias: j['alias'] as String,
        date: j['date'] as String,
        timeSlot: j['time_slot'] as String,
        durationMinutes: (j['duration_minutes'] as int?) ?? 25,
        priceEur: (j['price_eur'] as num?)?.toDouble() ?? 1.0,
        status: PrivateSessionStatus.values.firstWhere(
          (s) => s.name == j['status'],
          orElse: () => PrivateSessionStatus.booked,
        ),
        consultantAlias: j['consultant_alias'] as String?,
        messages: ((j['messages'] as List?) ?? [])
            .cast<Map<String, dynamic>>()
            .map(ChatMessage.fromJson)
            .toList(),
        createdAt: j['created_at'] as String,
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'alias': alias,
        'date': date,
        'time_slot': timeSlot,
        'duration_minutes': durationMinutes,
        'price_eur': priceEur,
        'status': status.name,
        'consultant_alias': consultantAlias,
        'messages': messages.map((m) => m.toJson()).toList(),
        'created_at': createdAt,
      };
}

/// A single chat message in a private session.
class ChatMessage {
  final String id;
  final String senderAlias;
  final String text;
  final String timestamp; // ISO datetime
  final bool isConsultant;

  const ChatMessage({
    required this.id,
    required this.senderAlias,
    required this.text,
    required this.timestamp,
    this.isConsultant = false,
  });

  factory ChatMessage.fromJson(Map<String, dynamic> j) => ChatMessage(
        id: j['id'] as String,
        senderAlias: j['sender_alias'] as String,
        text: j['text'] as String,
        timestamp: j['timestamp'] as String,
        isConsultant: (j['is_consultant'] as bool?) ?? false,
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'sender_alias': senderAlias,
        'text': text,
        'timestamp': timestamp,
        'is_consultant': isConsultant,
      };
}

/// An available time slot for booking private sessions.
class AvailableTimeSlot {
  final String id;
  final String dayOfWeek; // e.g. 'monday'
  final String dayAr; // e.g. 'الاثنين'
  final String time; // e.g. '14:00'
  final String consultantAlias;

  const AvailableTimeSlot({
    required this.id,
    required this.dayOfWeek,
    required this.dayAr,
    required this.time,
    required this.consultantAlias,
  });

  factory AvailableTimeSlot.fromJson(Map<String, dynamic> j) =>
      AvailableTimeSlot(
        id: j['id'] as String,
        dayOfWeek: j['day_of_week'] as String,
        dayAr: j['day_ar'] as String,
        time: j['time'] as String,
        consultantAlias: j['consultant_alias'] as String,
      );
}
