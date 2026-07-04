const List<Map<String, dynamic>> bridgeTopics = [
  {
    'id': 'verben_praepositionen',
    'titleAr': 'الأفعال مع حروف الجر',
    'titleDe': 'Verben mit Präpositionen',
    'icon': '🔗',
    'description': 'تدريبات هامة للانتقال لـ B2. (مثال: sich interessieren für, warten auf)',
    'questions': [
      {
        'q': 'Ich interessiere mich sehr ___ moderne Kunst.',
        'options': ['für', 'an', 'über', 'auf'],
        'correctIndex': 0,
        'explanation': 'sich interessieren für (Akk) = يهتم بـ',
      },
      {
        'q': 'Wir warten schon seit einer Stunde ___ den Bus.',
        'options': ['an', 'auf', 'für', 'zu'],
        'correctIndex': 1,
        'explanation': 'warten auf (Akk) = ينتظر',
      },
      {
        'q': 'Er erinnert sich gerne ___ seine Schulzeit.',
        'options': ['über', 'von', 'an', 'zu'],
        'correctIndex': 2,
        'explanation': 'sich erinnern an (Akk) = يتذكر',
      },
      {
        'q': 'Können Sie mir bitte ___ diesem Problem helfen?',
        'options': ['bei', 'mit', 'zu', 'von'],
        'correctIndex': 0,
        'explanation': 'helfen bei (Dat) = يساعد في',
      },
      {
        'q': 'Wir haben uns gestern ___ das Wetter unterhalten.',
        'options': ['auf', 'über', 'von', 'um'],
        'correctIndex': 1,
        'explanation': 'sich unterhalten über (Akk) = يتحدث عن',
      }
    ]
  },
  {
    'id': 'nomen_verb_verbindungen',
    'titleAr': 'الأسماء المتصلة بأفعال',
    'titleDe': 'Nomen-Verb-Verbindungen',
    'icon': '🧩',
    'description': 'تركيبات ضرورية لمستوى B2 والتحدث برسمية. (مثال: eine Entscheidung treffen)',
    'questions': [
      {
        'q': 'Der Chef muss bald eine Entscheidung ___.',
        'options': ['machen', 'treffen', 'geben', 'nehmen'],
        'correctIndex': 1,
        'explanation': 'eine Entscheidung treffen = يتخذ قراراً (وليس machen)',
      },
      {
        'q': 'Ich stehe Ihnen gerne zur Verfügung. (Das bedeutet: Ich ___ Ihnen helfen.)',
        'options': ['kann', 'muss', 'darf', 'soll'],
        'correctIndex': 0,
        'explanation': 'zur Verfügung stehen = متاح للمساعدة',
      },
      {
        'q': 'Wir müssen dieses Thema zur Sprache ___.',
        'options': ['bringen', 'sagen', 'machen', 'kommen'],
        'correctIndex': 0,
        'explanation': 'etwas zur Sprache bringen = يطرح الموضوع للنقاش',
      },
      {
        'q': 'Der neue Plan findet große ___. (Zustimmung)',
        'options': ['Hilfe', 'Zustimmung', 'Arbeit', 'Zeit'],
        'correctIndex': 1,
        'explanation': 'Zustimmung finden = يلقى القبول / الموافقة',
      }
    ]
  },
  {
    'id': 'passiv',
    'titleAr': 'المبني للمجهول المتقدم',
    'titleDe': 'Passiv in verschiedenen Zeiten',
    'icon': '🔄',
    'description': 'المبني للمجهول من أهم قواعد B2.',
    'questions': [
      {
        'q': 'Präsens Passiv: Das Auto ___ repariert.',
        'options': ['wurde', 'wird', 'ist', 'hat'],
        'correctIndex': 1,
        'explanation': 'wird + Partizip II للمضارع المبني للمجهول',
      },
      {
        'q': 'Präteritum Passiv: Das Haus ___ 1990 gebaut.',
        'options': ['wurde', 'wird', 'worden', 'ist'],
        'correctIndex': 0,
        'explanation': 'wurde + Partizip II للماضي البسيط',
      },
      {
        'q': 'Perfekt Passiv: Der Fehler ist schnell korrigiert ___.',
        'options': ['wurde', 'worden', 'geworden', 'wird'],
        'correctIndex': 1,
        'explanation': 'ist ... worden للماضي التام (Perfekt Passiv)',
      }
    ]
  },
  {
    'id': 'zweiteilige_konnektoren',
    'titleAr': 'الروابط المزدوجة',
    'titleDe': 'Zweiteilige Konnektoren',
    'icon': '⚖️',
    'description': 'روابط هامة لربط الجمل المعقدة بأسلوب راقٍ. (مثال: nicht nur ... sondern auch)',
    'questions': [
      {'q': 'Er spricht ___ gut Englisch, sondern auch fließend Französisch.', 'options': ['weder', 'zwar', 'nicht nur', 'entweder'], 'correct': 2, 'explanation': 'nicht nur ... sondern auch = ليس فقط ... بل أيضاً'},
      {'q': 'Ich habe ___ Zeit noch Lust, ins Kino zu gehen.', 'options': ['nicht nur', 'weder', 'zwar', 'entweder'], 'correct': 1, 'explanation': 'weder ... noch = لا ... ولا'},
      {'q': 'Wir können ___ heute Abend essen gehen oder morgen grillen.', 'options': ['entweder', 'weder', 'sowohl', 'nicht nur'], 'correct': 0, 'explanation': 'entweder ... oder = إما ... أو'}
    ]
  },
  {
    'id': 'passiv',
    'titleAr': 'المبني للمجهول',
    'titleDe': 'Das Passiv',
    'icon': '🏗️',
    'description': 'شائع جداً في النصوص الأكاديمية والعملية في مستوى B2.',
    'questions': [
      {'q': 'Das neue Krankenhaus ___ nächstes Jahr eröffnet.', 'options': ['ist', 'wird', 'wurde', 'hat'], 'correct': 1, 'explanation': 'wird ... eröffnet = سيتم افتتاحه (Passiv Futur)'},
      {'q': 'Der Brief ___ gestern von meinem Kollegen geschrieben.', 'options': ['wird', 'ist', 'wurde', 'hat'], 'correct': 2, 'explanation': 'wurde ... geschrieben = كُتب (Präteritum Passiv)'}
    ]
  }
];
