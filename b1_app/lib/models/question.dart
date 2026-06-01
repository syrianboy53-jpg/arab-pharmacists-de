class Question {
  final int id;
  final String question;
  final String questionAr;
  final List<String> options;
  final List<String> optionsAr;
  final int correctIndex;
  final String? explanation;
  final String? category;
  final String? state;

  const Question({
    required this.id,
    required this.question,
    required this.questionAr,
    required this.options,
    required this.optionsAr,
    required this.correctIndex,
    this.explanation,
    this.category,
    this.state,
  });

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
      id: json['id'] as int,
      question: json['question'] as String,
      questionAr: json['questionAr'] as String,
      options: List<String>.from(json['options'] as List),
      optionsAr: List<String>.from(json['optionsAr'] as List),
      correctIndex: json['correctIndex'] as int,
      explanation: json['explanation'] as String?,
      category: json['category'] as String?,
      state: json['state'] as String?,
    );
  }
}

class ExamModel {
  final String id;
  final String title;
  final String titleAr;
  final String type;
  final String description;
  final List<ReadingPart>? readingParts;
  final List<ListeningPart>? listeningParts;

  const ExamModel({
    required this.id,
    required this.title,
    required this.titleAr,
    required this.type,
    required this.description,
    this.readingParts,
    this.listeningParts,
  });
}

class ReadingPart {
  final String title;
  final String text;
  final String textAr;
  final List<Question> questions;

  const ReadingPart({
    required this.title,
    required this.text,
    required this.textAr,
    required this.questions,
  });
}

class ListeningPart {
  final String title;
  final String audioUrl;
  final String transcript;
  final String transcriptAr;
  final List<Question> questions;

  const ListeningPart({
    required this.title,
    required this.audioUrl,
    required this.transcript,
    required this.transcriptAr,
    required this.questions,
  });
}

class WritingTemplate {
  final String id;
  final String title;
  final String titleAr;
  final String type;
  final String prompt;
  final String promptAr;
  final String sampleAnswer;
  final String sampleAnswerAr;
  final List<String> tips;

  const WritingTemplate({
    required this.id,
    required this.title,
    required this.titleAr,
    required this.type,
    required this.prompt,
    required this.promptAr,
    required this.sampleAnswer,
    required this.sampleAnswerAr,
    required this.tips,
  });
}

class GrammarRule {
  final String id;
  final String title;
  final String titleAr;
  final String explanation;
  final String explanationAr;
  final List<String> examples;
  final List<String> examplesAr;

  const GrammarRule({
    required this.id,
    required this.title,
    required this.titleAr,
    required this.explanation,
    required this.explanationAr,
    required this.examples,
    required this.examplesAr,
  });
}

class VocabWord {
  final String german;
  final String arabic;
  final String example;
  final String exampleAr;
  final String category;

  const VocabWord({
    required this.german,
    required this.arabic,
    required this.example,
    required this.exampleAr,
    required this.category,
  });
}
