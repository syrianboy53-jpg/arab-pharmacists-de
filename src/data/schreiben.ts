export const schreibenModels = [
  {
    "id": "schreiben-1",
    "title": "نموذج Schreiben رقم 1",
    "description": "ث�اث مهام كتابية: بريد إ�كتروني غير رسمي، مشاركة منتدى، رسا�ة رسمية.",
    "tasks": [
      {
        "id": "schreiben-1-1",
        "taskNumber": 1,
        "typeAr": "بريد إ�كتروني غير رسمي (إ�ى صديق)",
        "typeDe": "Informeller E-Mail",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "صديقك ا�أ�ماني \"�وكاس\" يسأ� عن ا�أك� ا�ذي تحبه. اكتب �ه بريداً قصيراً وأجب عن ا�نقاط ا�تا�ية:",
        "promptDe": "Ihr deutscher Freund Lukas fragt Sie nach Ihrem Lieblingsessen. Schreiben Sie ihm eine E-Mail.",
        "requirements": [
          "اذكر نوع طعام تحبه جداً و�ماذا.",
          "اكتب أين تأك�ه عادةً (في ا�بيت أم في ا�مطعم).",
          "اسأ�ه عن طعامه ا�مفض�.",
          "اقترح أن تطبخا معاً في نهاية ا�أسبوع."
        ],
        "usefulPhrases": [
          {
            "de": "Lieber Lukas, / Hallo Lukas,",
            "ar": "عزيزي �وكاس / مرحباً �وكاس"
          },
          {
            "de": "Vielen Dank für deine E-Mail.",
            "ar": "شكراً ع�ى إيمي�ك."
          },
          {
            "de": "Mein Lieblingsessen ist …, weil …",
            "ar": "أك�تي ا�مفض�ة هي ... �أن ..."
          },
          {
            "de": "Am liebsten esse ich …",
            "ar": "أحب أك� ... أكثر شيء."
          },
          {
            "de": "Normalerweise esse ich zu Hause.",
            "ar": "عادة آك� في ا�بيت."
          },
          {
            "de": "Was isst du am liebsten?",
            "ar": "ماذا تحب أن تأك�؟"
          },
          {
            "de": "Wollen wir am Samstag zusammen kochen?",
            "ar": "ه� نطبخ معاً يوم ا�سبت؟"
          },
          {
            "de": "Viele Grüße / Bis bald",
            "ar": "تحياتي / إ�ى ا��قاء قريباً"
          }
        ],
        "sampleAnswer": "Hallo Lukas,\n\nvielen Dank für deine E-Mail! Du fragst nach meinem Lieblingsessen. Ich esse am liebsten Maqluba. Das ist ein syrisches Gericht mit Reis, Hühnerfleisch, Auberginen und Kartoffeln. Es schmeckt einfach super und erinnert mich an meine Familie.\n\nNormalerweise esse ich zu Hause, weil meine Mutter sehr gut kocht. Ins Restaurant gehe ich nur am Wochenende.\n\nUnd was isst du am liebsten? Magst du arabisches Essen?\n\nIch habe eine Idee: Wollen wir am Samstag zusammen kochen? Dann zeige ich dir, wie man Maqluba macht.\n\nViele Grüße\nSamir",
        "sampleAnswerNotes": [
          "م�احظة: عدد ا�ك�مات ≈ 90، وهذا ممتاز.",
          "استُخدمت ك� ا�نقاط ا�أربع ا�مط�وبة.",
          "قواعد منوّعة: weil � زمن ا�مضارع � ins Restaurant � سؤا� مباشر � اقتراح باستخدام \"Wollen wir...?\"."
        ]
      },
      {
        "id": "schreiben-1-2",
        "taskNumber": 2,
        "typeAr": "مشاركة في منتدى (Forum)",
        "typeDe": "Forumbeitrag",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "قرأتَ هذا ا�سؤا� في منتدى: \"ه� تع�ّم ا�أطفا� �غة ثانية مفيد أم مُضرّ؟\" اكتب رأيك مع إعطاء مثا� من حياتك.",
        "promptDe": "In einem Internet-Forum finden Sie folgende Frage: „Sind zwei Sprachen gut oder schlecht für Kinder?\" Schreiben Sie Ihre Meinung.",
        "requirements": [
          "قدّم نفسك بجم�ة قصيرة.",
          "اكتب رأيك بوضوح (إيجابي أم س�بي).",
          "اذكر سببين ع�ى ا�أق�.",
          "أعطِ مثا�اً من حياتك أو عائ�تك."
        ],
        "usefulPhrases": [
          {
            "de": "Meiner Meinung nach …",
            "ar": "في رأيي ..."
          },
          {
            "de": "Ich finde, dass …",
            "ar": "أرى أن ..."
          },
          {
            "de": "Einerseits … andererseits …",
            "ar": "من جهة ... ومن جهة أخرى ..."
          },
          {
            "de": "Zum Beispiel …",
            "ar": "ع�ى سبي� ا�مثا� ..."
          },
          {
            "de": "Ein Vorteil ist, dass …",
            "ar": "من إيجابيات ذ�ك أن ..."
          },
          {
            "de": "Zum Schluss möchte ich sagen …",
            "ar": "في ا�ختام أودّ أن أقو� ..."
          }
        ],
        "sampleAnswer": "Hallo zusammen,\n\nich heiße Rania und komme aus Syrien. Ich lebe seit vier Jahren in Deutschland.\n\nMeiner Meinung nach ist es sehr gut, wenn Kinder zwei Sprachen sprechen. Erstens: Kinder lernen eine Sprache sehr schnell, besonders wenn sie jung sind. Zweitens: mit zwei Sprachen haben sie später bessere Chancen im Beruf und in der Familie.\n\nZum Beispiel spricht mein Sohn zu Hause Arabisch mit uns, und in der Kita spricht er Deutsch. Er ist jetzt 5 Jahre alt und versteht beides sehr gut. Er hat keine Probleme.\n\nNatürlich muss man geduldig sein. Aber am Ende ist das ein großer Vorteil für das Kind.\n\nViele Grüße\nRania",
        "sampleAnswerNotes": [
          "عدد ا�ك�مات ≈ 115 (مقبو�؛ ا�أفض� 80-120).",
          "تم استخدام: Meiner Meinung nach � Erstens/Zweitens � Zum Beispiel � Zum Schluss."
        ]
      },
      {
        "id": "schreiben-1-3",
        "taskNumber": 3,
        "typeAr": "رسا�ة رسمية (شكوى / استفسار)",
        "typeDe": "Formeller Brief / formelle E-Mail",
        "wordCount": "حوا�ي 40 ك�مة",
        "promptAr": "اشتريت هاتفاً جديداً من متجر إ�كتروني، و�كنه �ا يعم�. اكتب بريداً رسمياً إ�ى خدمة ا�زبائن. �ا تنسَ ا�تحية ا�رسمية وا�ختام.",
        "promptDe": "Sie haben ein Handy online bestellt. Das Gerät funktioniert nicht. Schreiben Sie eine formelle E-Mail an den Kundenservice.",
        "requirements": [
          "ابدأ بـ \"Sehr geehrte Damen und Herren\".",
          "اذكر رقم ا�ط�ب أو ا�تاريخ.",
          "اشرح ا�مشك�ة باختصار.",
          "اط�ب ح�اً (استبدا� أو استرجاع ا�ما�).",
          "اختم بـ \"Mit freundlichen Grüßen\"."
        ],
        "usefulPhrases": [
          {
            "de": "Sehr geehrte Damen und Herren,",
            "ar": "ا�سيدات وا�سادة ا�محترمون،"
          },
          {
            "de": "Ich habe am … bei Ihnen … bestellt.",
            "ar": "�قد ط�بت في ... من عندكم ..."
          },
          {
            "de": "Die Bestellnummer ist …",
            "ar": "رقم ا�ط�ب هو ..."
          },
          {
            "de": "Leider funktioniert das Gerät nicht.",
            "ar": "��أسف ا�جهاز �ا يعم�."
          },
          {
            "de": "Ich bitte Sie, … zu tun.",
            "ar": "أرجو منكم أن تفع�وا ..."
          },
          {
            "de": "Bitte antworten Sie mir bis zum …",
            "ar": "أرجو ا�ردّ قب� تاريخ ..."
          },
          {
            "de": "Mit freundlichen Grüßen",
            "ar": "مع خا�ص ا�تحية"
          }
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nam 05.10. habe ich bei Ihnen ein Handy bestellt (Bestellnummer: 78245). Leider funktioniert das Gerät nicht � es lässt sich nicht einschalten.\n\nIch bitte Sie, mir ein neues Gerät zu schicken oder mein Geld zurückzuerstatten.\n\nMit freundlichen Grüßen\nSamir Al-Ahmad",
        "sampleAnswerNotes": [
          "عدد ا�ك�مات ≈ 45 (ممتاز ��مهمة ا�ثا�ثة).",
          "يحتوي ك� ا�عناصر ا�رسمية: ا�تحية - رقم ا�ط�ب - ا�مشك�ة - ا�ط�ب - ا�ختام."
        ]
      }
    ]
  },
  {
    "id": "schreiben-2",
    "title": "نموذج Schreiben رقم 2",
    "description": "نموذج ثانٍ مع مواضيع ا�مدرسة وا�رياضة وا�عم�.",
    "tasks": [
      {
        "id": "schreiben-2-1",
        "taskNumber": 1,
        "typeAr": "بريد إ�كتروني إ�ى صديق",
        "typeDe": "Informeller E-Mail",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "صديقتك \"آنّا\" دعتك �حف�ة عيد مي�ادها يوم ا�سبت. اكتبي �ها إجابة.",
        "promptDe": "Ihre Freundin Anna hat Sie zu ihrer Geburtstagsparty am Samstag eingeladen. Antworten Sie.",
        "requirements": [
          "اشكريها ع�ى ا�دعوة.",
          "اكتبي ه� تأتين أم �ا، و�ماذا.",
          "اسأ�ي عن شيء يجب أن تحضريه.",
          "اكتبي ما ا�هدية ا�تي ستحضرينها."
        ],
        "usefulPhrases": [
          {
            "de": "Danke für deine Einladung!",
            "ar": "شكراً ع�ى دعوتك!"
          },
          {
            "de": "Ich komme gern.",
            "ar": "سآتي بك� سرور."
          },
          {
            "de": "Leider kann ich nicht kommen, weil …",
            "ar": "��أسف �ا أستطيع ا�مجيء �أن ..."
          },
          {
            "de": "Soll ich etwas mitbringen?",
            "ar": "ه� يجب أن أحضر شيئاً؟"
          },
          {
            "de": "Ich bringe dir …",
            "ar": "سأحضر �ك ..."
          }
        ],
        "sampleAnswer": "Liebe Anna,\n\ntausend Dank für deine Einladung! Natürlich komme ich sehr gern zu deiner Geburtstagsparty am Samstag. Ich freue mich schon!\n\nIch wollte dich fragen: Soll ich etwas mitbringen, zum Beispiel Salat oder Getränke? Ich kann auch gern einen Kuchen backen, wenn du möchtest.\n\nAls Geschenk bekommst du ein Buch. Ich weiß, du liest sehr gern Krimis.\n\nBis Samstag!\nDeine Leila"
      },
      {
        "id": "schreiben-2-2",
        "taskNumber": 2,
        "typeAr": "مشاركة في ا�منتدى",
        "typeDe": "Forumsbeitrag",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "تقرأ في منتدى: \"ه� يجب ع�ى ك� طف� أن يمارس رياضة في ا�مدرسة؟\" اكتب رأيك.",
        "promptDe": "Sie lesen im Forum: „Soll jedes Kind in der Schule Sport machen?\" Schreiben Sie Ihre Meinung.",
        "requirements": [
          "رحّب وعرّف نفسك.",
          "اكتب رأيك بوضوح.",
          "اذكر سببين.",
          "اكتب خ�اصة قصيرة."
        ],
        "sampleAnswer": "Hallo zusammen,\n\nich bin Khaled, 28 Jahre alt. Meiner Meinung nach ist Sport in der Schule sehr wichtig.\n\nErstens bleiben die Kinder so gesund. Heutzutage sitzen Kinder zu viel vor dem Handy oder am Computer. Zweitens lernen sie durch Sport in einer Gruppe zu arbeiten und Respekt zu zeigen.\n\nNatürlich sollten die Lehrer verstehen, wenn ein Kind krank ist. Aber im Allgemeinen ist Sport für alle gut.\n\nViele Grüße\nKhaled"
      },
      {
        "id": "schreiben-2-3",
        "taskNumber": 3,
        "typeAr": "رسا�ة رسمية (اعتذار)",
        "typeDe": "Formeller Brief",
        "wordCount": "حوا�ي 40 ك�مة",
        "promptAr": "�ديك موعد غداً في Jobcenter، �كن �ا تستطيع ا�حضور بسبب مرض ابنك. اعتذر واط�ب موعداً جديداً.",
        "promptDe": "Sie haben morgen einen Termin im Jobcenter, können aber nicht kommen, weil Ihr Kind krank ist. Entschuldigen Sie sich und bitten Sie um einen neuen Termin.",
        "requirements": [
          "استعم� ا�تحية ا�رسمية.",
          "اعتذر واذكر ا�سبب.",
          "اط�ب موعداً جديداً واقترح وقتاً.",
          "اختتم بشك� رسمي."
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nleider kann ich morgen nicht zu meinem Termin um 10:30 Uhr kommen, weil mein Sohn plötzlich krank geworden ist und ich zum Arzt muss.\n\nIch möchte mich dafür entschuldigen und bitte um einen neuen Termin. Nächste Woche am Dienstag oder Mittwoch wäre gut für mich.\n\nMit freundlichen Grüßen\nMaryam Al-Hassan"
      }
    ]
  },
  {
    "id": "schreiben-3",
    "title": "Schreiben � نموذج 3 (ا�حياة ا�يومية)",
    "description": "دعوة �عيد مي�اد، رأي في موضوع تع�يمي، شكوى رسمية.",
    "tasks": [
      {
        "id": "schreiben-3-1",
        "taskNumber": 1,
        "typeAr": "دعوة شخصية / Einladung an einen Freund",
        "typeDe": "E-Mail an einen Freund",
        "promptAr": "صديقك سيزور أ�مانيا �أو� مرة. اكتب �ه رسا�ة تدعوه ��إقامة عندك.",
        "promptDe": "Ihr Freund / Ihre Freundin Kareem aus Damaskus kommt zum ersten Mal nach Deutschland zu Besuch. Schreiben Sie eine E-Mail (ca. 80 Wörter):",
        "requirements": [
          "�ماذا فرحت برسا�ته؟",
          "متى يأتي وكم سيبقى؟",
          "ماذا ستفع�ون معاً؟",
          "ماذا يجب أن يحضر معه؟"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1527176930608-09cb256ab504?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "سفر با�طائرة",
        "usefulPhrases": [
          {
            "de": "Ich freue mich riesig, dass …",
            "ar": "أنا سعيد جداً أن ..."
          },
          {
            "de": "Du kannst gerne bei mir wohnen.",
            "ar": "يمكنك أن تسكن عندي."
          },
          {
            "de": "Bring bitte … mit.",
            "ar": "أحضر معك ... من فض�ك."
          },
          {
            "de": "Ich hole dich vom Flughafen ab.",
            "ar": "سأقاب�ك في ا�مطار."
          },
          {
            "de": "Wir können … besuchen.",
            "ar": "يمكننا زيارة ..."
          }
        ],
        "sampleAnswer": "Lieber Kareem,\n\nvielen Dank für deine Nachricht! Ich freue mich riesig, dass du nach Deutschland kommst. Ich kann es kaum erwarten, dich endlich wiederzusehen.\n\nDu kannst gerne bei mir wohnen. Wann genau kommst du und wie lange bleibst du? Wir können zusammen das Brandenburger Tor besuchen, in den Park gehen und natürlich richtig deutsches Essen probieren!\n\nBring bitte etwas Warmes mit, denn hier ist es im Oktober schon kalt. Schick mir bitte deine Flugdaten, dann hole ich dich vom Flughafen ab.\n\nBis bald,\ndein Ahmad"
      },
      {
        "id": "schreiben-3-2",
        "taskNumber": 2,
        "typeAr": "تع�يق في موقع تع�يمي",
        "typeDe": "Forenbeitrag",
        "promptAr": "في موقع تع�يمي يُسأ�: \"ه� تع�ّم �غة جديدة في ا�حياة ا�يومية أفض� من ا�مدرسة؟\" اكتب تع�يقك.",
        "promptDe": "Auf einer Sprachlern-Seite lesen Sie die Frage: \"Lernt man eine Sprache besser im Alltag als in der Schule?\" Schreiben Sie Ihre Meinung (ca. 80 Wörter).",
        "requirements": [
          "كيف تع�ّمت أنت ا�أ�مانية حتى ا�آن؟",
          "ماذا أفض� عند ا�تع�م في ا�حياة ا�يومية؟",
          "ماذا أفض� عند ا�تع�م في ا�مدرسة/ا�كورس؟",
          "ما رأيك أنت؟ و�ماذا؟"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "كتب وقاموس �تع�م ا��غة",
        "usefulPhrases": [
          {
            "de": "Meiner Meinung nach …",
            "ar": "برأيي ..."
          },
          {
            "de": "Auf der einen Seite …, auf der anderen Seite …",
            "ar": "من جهة ... ومن جهة أخرى ..."
          },
          {
            "de": "Im Alltag spricht man …",
            "ar": "في ا�حياة ا�يومية يتك�م ا�مرء ..."
          },
          {
            "de": "In der Schule lernt man die Grammatik …",
            "ar": "في ا�مدرسة يتع�م ا�مرء ا�قواعد ..."
          },
          {
            "de": "Ich finde es am besten, wenn man beides verbindet.",
            "ar": "أرى أنه من ا�أفض� دمج ا�طريقتين."
          }
        ],
        "sampleAnswer": "Hallo zusammen,\n\nich finde diese Frage sehr interessant. Ich lerne seit zwei Jahren Deutsch � im Kurs und im Alltag.\n\nAuf der einen Seite ist die Schule wichtig: Man lernt die Grammatik, das Schreiben und die Aussprache richtig. Ohne diese Basis spricht man immer falsch.\n\nAuf der anderen Seite ist der Alltag besser für das Sprechen. Man hat keine Angst, hört echte Sätze und kann direkt reagieren.\n\nMeiner Meinung nach ist beides nötig. Am besten lernt man, wenn man am Morgen einen Kurs besucht und am Nachmittag mit Deutschen spricht."
      },
      {
        "id": "schreiben-3-3",
        "taskNumber": 3,
        "typeAr": "شكوى رسمية",
        "typeDe": "Beschwerde-Brief",
        "promptAr": "اشتريت غسا�ة قب� أسبوعين، �كن صدرت أصواتاً غريبة منذ يومين. اكتب شكوى رسمية ��متجر.",
        "promptDe": "Sie haben vor zwei Wochen bei \"Elektro Schmidt\" eine neue Waschmaschine gekauft. Seit zwei Tagen macht sie laute Geräusche. Schreiben Sie eine Beschwerde (ca. 80 Wörter).",
        "requirements": [
          "متى وأين اشتريت ا�غسا�ة؟",
          "ما هي ا�مشك�ة با�ضبط؟",
          "ماذا تط�ب من ا�متجر؟",
          "حتى متى تنتظر ا�ردّ؟"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "غسا�ة كهربائية",
        "usefulPhrases": [
          {
            "de": "Sehr geehrte Damen und Herren,",
            "ar": "سيداتي وسادتي،"
          },
          {
            "de": "ich wende mich an Sie wegen …",
            "ar": "أتوجّه إ�يكم بشأن ..."
          },
          {
            "de": "leider funktioniert … nicht richtig.",
            "ar": "�سوء ا�حظ ... �ا يعم� بشك� صحيح."
          },
          {
            "de": "Ich bitte Sie, … zu reparieren / zu erstatten.",
            "ar": "أرجو منكم أن تص�حوا / تردّوا ..."
          },
          {
            "de": "Ich erwarte Ihre Antwort bis spätestens …",
            "ar": "أنتظر ردّكم في موعد أقصاه ..."
          }
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nich wende mich an Sie, weil ich am 5. März in Ihrem Geschäft \"Elektro Schmidt\" in Düsseldorf eine Waschmaschine der Marke Bosch gekauft habe. Die Rechnungsnummer lautet 2024-1234.\n\nLeider macht die Maschine seit zwei Tagen sehr laute Geräusche, besonders beim Schleudern. Ich habe alles richtig angeschlossen und die Bedienungsanleitung beachtet.\n\nIch bitte Sie, die Waschmaschine entweder schnell zu reparieren oder mir eine neue zu liefern. Da das Gerät noch in der Garantie ist, erwarte ich keine Kosten.\n\nBitte antworten Sie bis spätestens nächsten Freitag.\n\nMit freundlichen Grüßen\nMahmoud Ali"
      }
    ]
  },
  {
    "id": "schreiben-4",
    "title": "Schreiben � نموذج 4 (مواقف يومية)",
    "description": "تأخير في عم�، شكوى من جار، رد ع�ى إع�ان شقة. مع نصائح كتابة با�عربية �ك� مهمة.",
    "tasks": [
      {
        "id": "schreiben-4-1",
        "taskNumber": 1,
        "typeAr": "بريد رسمي ��مدير: تأخّر عن ا�عم�",
        "typeDe": "E-Mail an den Chef",
        "promptAr": "تأخّرت ا�يوم عن عم�ك بسبب ا�باصات. اكتب بريداً ��مدير تعتذر فيه وتشرح ا�سبب وتقترح ح�اً.",
        "promptDe": "Schreiben Sie eine E-Mail an Ihren Chef, Herrn Becker. Heute Morgen sind Sie zur Arbeit zu spät gekommen, weil die Busse Verspätung hatten.",
        "requirements": [
          "اعتذر بشك� مهذّب",
          "اشرح ماذا حدث",
          "اقترح كيف ستعوّض ذ�ك",
          "اط�ب رأيه أو موعداً ��حديث معه"
        ],
        "wordCount": "حوا�ي 80-100 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "محطة باصات في ا�صباح",
        "usefulPhrases": [
          {
            "de": "Sehr geehrter Herr …",
            "ar": "حضرة ا�سيد ا�محترم..."
          },
          {
            "de": "Ich möchte mich aufrichtig entschuldigen.",
            "ar": "أعتذر بصدق."
          },
          {
            "de": "Heute Morgen hatte der Bus große Verspätung.",
            "ar": "ا�يوم في ا�صباح كان ا�باص متأخراً جداً."
          },
          {
            "de": "Als Ausgleich werde ich heute länger bleiben.",
            "ar": "كتعويض سأبقى ا�يوم �مدة أطو�."
          },
          {
            "de": "Bitte teilen Sie mir mit, wann ich mit Ihnen sprechen kann.",
            "ar": "أرجو إع�امي متى يمكنني ا�تحدث معك."
          },
          {
            "de": "Mit freundlichen Grüßen",
            "ar": "مع أطيب ا�تحيات"
          }
        ],
        "sampleAnswerNotes": [
          "استخدم Sehr geehrter Herr Becker (�أنه رسمي).",
          "اعتذر **في ا�بداية**، اشرح ا�سبب بدقة، ثم قدّم ح�اً.",
          "تجنّب ا�أعذار ا�طوي�ة. كن واضحاً ومختصراً."
        ],
        "sampleAnswer": "Sehr geehrter Herr Becker,\n\nich möchte mich aufrichtig dafür entschuldigen, dass ich heute Morgen zu spät zur Arbeit gekommen bin.\n\nDer Grund war, dass mein Bus eine Verspätung von über 30 Minuten hatte. Auf der Anzeigetafel stand zuerst \"5 Minuten\", aber dann ist der Bus einfach nicht gekommen. Auch der nächste Bus war voll, sodass ich nicht einsteigen konnte.\n\nAls Ausgleich werde ich heute Abend gerne länger bleiben oder mein Mittagspause kürzen. In Zukunft werde ich früher aus dem Haus gehen, damit so etwas nicht wieder passiert.\n\nBitte teilen Sie mir mit, wann ich mit Ihnen darüber kurz sprechen kann.\n\nMit freundlichen Grüßen\nKhaled Ahmad"
      },
      {
        "id": "schreiben-4-2",
        "taskNumber": 2,
        "typeAr": "بريد �جارك: مشك�ة ا�ضوضاء",
        "typeDe": "E-Mail an den Nachbarn",
        "promptAr": "جارك في ا�طابق ا�ع�وي يصدر ضوضاء عا�ية في ا��ي�. اكتب رسا�ة مهذبة �تط�ب منه ا�تهدئة.",
        "promptDe": "Ihr Nachbar Herr Schmidt im Stockwerk über Ihnen macht abends nach 22 Uhr immer sehr laute Musik. Sie können nicht schlafen.",
        "requirements": [
          "حيِّه بشك� ودود",
          "اشرح ا�مشك�ة بدون إساءة",
          "اقترح ح�اً (ساعات معينة، خفض ا�صوت...)",
          "اشكره ع�ى تفهّمه"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "بناية سكنية في أ�مانيا",
        "usefulPhrases": [
          {
            "de": "Lieber Herr / liebe Frau …",
            "ar": "عزيزي ا�سيد / عزيزتي ا�سيدة"
          },
          {
            "de": "Ich wende mich an Sie, weil …",
            "ar": "أكتب إ�يك �أن..."
          },
          {
            "de": "Es stört mich, wenn …",
            "ar": "يزعجني عندما..."
          },
          {
            "de": "Könnten Sie bitte … leiser machen?",
            "ar": "ه� يمكنك جع� ... أهدأ؟"
          },
          {
            "de": "Vielen Dank für Ihr Verständnis.",
            "ar": "شكراً �تفهّمك."
          },
          {
            "de": "Mit freundlichen Grüßen / Viele Grüße",
            "ar": "مع أطيب ا�تحيات / تحيات"
          }
        ],
        "sampleAnswerNotes": [
          "كن **مهذباً جداً** — في أ�مانيا ا�جار جزء مهم من ا�حياة ا�يومية.",
          "�ا تتّهمه مباشرة. استخدم \"ich-Form\" بد� \"Sie machen...\".",
          "اقترح ح�اً واقعياً (مث�اً: تخفيض ا�صوت بعد ا�ـ22)."
        ],
        "sampleAnswer": "Lieber Herr Schmidt,\n\nich hoffe, es geht Ihnen gut. Ich wende mich an Sie wegen einer kleinen Sache, die mir wichtig ist.\n\nIn den letzten Wochen ist die Musik aus Ihrer Wohnung nach 22 Uhr ziemlich laut. Leider kann ich dann nicht schlafen, weil mein Schlafzimmer direkt unter Ihrem Wohnzimmer ist. Morgens muss ich um 6 Uhr aufstehen.\n\nKönnten Sie die Musik bitte ab 22 Uhr ein bisschen leiser machen? Tagsüber ist das natürlich kein Problem.\n\nVielen Dank für Ihr Verständnis und einen schönen Abend!\n\nViele Grüße\nHassan Othman (Wohnung 2A)"
      },
      {
        "id": "schreiben-4-3",
        "taskNumber": 3,
        "typeAr": "استفسار عن شقة من إع�ان",
        "typeDe": "Anfrage zu einer Wohnung",
        "promptAr": "رأيت إع�ان شقة في ا�إنترنت. اكتب بريداً �صاحب ا�إع�ان ��استفسار وتحديد موعد �رؤيتها.",
        "promptDe": "Sie haben im Internet eine Anzeige für eine 2-Zimmer-Wohnung in München gesehen. Schreiben Sie eine E-Mail an die Vermieterin Frau Roth.",
        "requirements": [
          "عرّف عن نفسك (ا�اسم، ا�مهنة)",
          "اسأ� أسئ�ة مهمة (ا�إيجار، ا�تأشيرة، تاريخ ا�انتقا�، ا�أثاث)",
          "اط�ب موعداً �معاينة ا�شقة",
          "اشكرها وودّعها بشك� رسمي"
        ],
        "wordCount": "حوا�ي 80-100 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "شقة فارغة بإيجار",
        "usefulPhrases": [
          {
            "de": "Sehr geehrte Frau Roth,",
            "ar": "حضرة ا�سيدة روت ا�محترمة،"
          },
          {
            "de": "Ich habe Ihre Anzeige im Internet gelesen.",
            "ar": "قرأت إع�انك ع�ى ا�إنترنت."
          },
          {
            "de": "Ich interessiere mich für die Wohnung.",
            "ar": "أنا مهتم با�شقة."
          },
          {
            "de": "Ich bin … von Beruf.",
            "ar": "أعم� ..."
          },
          {
            "de": "Ist die Wohnung möbliert?",
            "ar": "ه� ا�شقة مفروشة؟"
          },
          {
            "de": "Wie hoch sind die Nebenkosten?",
            "ar": "كم تب�غ ا�تكا�يف ا�إضافية؟"
          },
          {
            "de": "Wann könnte ich die Wohnung besichtigen?",
            "ar": "متى يمكنني معاينة ا�شقة؟"
          },
          {
            "de": "Mit freundlichen Grüßen",
            "ar": "مع أطيب ا�تحيات"
          }
        ],
        "sampleAnswerNotes": [
          "في أ�مانيا ما�ك ا�شقة يقرأ **عشرات ا�رسائ�** يومياً. كن واضحاً ومختصراً.",
          "اذكر **مهنتك ودخ�ك** — مهم جداً �قبو�ك.",
          "اقترح **3-4 مواعيد محددة** �زيارة ا�شقة، فهذا يسهّ� ا�موافقة."
        ],
        "sampleAnswer": "Sehr geehrte Frau Roth,\n\nich habe Ihre Anzeige für die 2-Zimmer-Wohnung in München-Schwabing gelesen und interessiere mich sehr dafür.\n\nMein Name ist Lara Khoury. Ich bin 28 Jahre alt und arbeite als Krankenschwester in einem städtischen Krankenhaus mit einem festen Vertrag. Ich suche eine Wohnung ab dem 1. März.\n\nIch habe noch ein paar Fragen:\n- Ist die Wohnung möbliert oder unmöbliert?\n- Wie hoch sind die Nebenkosten ungefähr?\n- Sind Haustiere erlaubt?\n\nKönnte ich die Wohnung bald besichtigen? Ich habe diese Woche am Mittwoch nach 17 Uhr und am Freitag den ganzen Tag Zeit.\n\nVielen Dank im Voraus für Ihre Antwort.\n\nMit freundlichen Grüßen\nLara Khoury"
      }
    ]
  },
  {
    "id": "schreiben-5",
    "title": "نموذج Schreiben رقم 5 (نمط Goethe � ا�توظيف)",
    "description": "ث�اث مهام: بريد �زمي�، مشاركة عن ا�عم� عن بُعد، رسا�ة ط�ب وظيفة.",
    "tasks": [
      {
        "id": "schreiben-5-1",
        "taskNumber": 1,
        "typeAr": "بريد إ�كتروني �زمي� عم�",
        "typeDe": "E-Mail an Kollegen",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "زمي�ك \"ماركوس\" غاب أمس عن ا�عم�. اكتب �ه بريداً تخبره ما حص� وتسأ�ه عن صحته.",
        "promptDe": "Ihr Kollege Markus war gestern nicht im Büro. Schreiben Sie ihm eine E-Mail.",
        "requirements": [
          "اسأ�ه عن سبب غيابه وعن صحته.",
          "أخبره بأهم شيء حص� في ا�اجتماع.",
          "اعرض ع�يه مساعدتك إذا احتاج.",
          "اقترح موعداً ��قاء قب� اجتماع ا�جمعة."
        ],
        "usefulPhrases": [
          {
            "de": "Hallo Markus,",
            "ar": "مرحباً ماركوس،"
          },
          {
            "de": "wie geht es dir? Bist du krank?",
            "ar": "كيف حا�ك؟ ه� أنت مريض؟"
          },
          {
            "de": "In der Sitzung gestern haben wir … besprochen.",
            "ar": "في اجتماع ا�أمس ناقشنا..."
          },
          {
            "de": "Falls du Hilfe brauchst, melde dich bei mir.",
            "ar": "إن احتجت مساعدة فأخبرني."
          },
          {
            "de": "Können wir uns am Donnerstag kurz treffen?",
            "ar": "ه� ن�تقي يوم ا�خميس باختصار؟"
          },
          {
            "de": "Gute Besserung!",
            "ar": "س�امتك / شفاء عاج�!"
          }
        ],
        "sampleAnswer": "Hallo Markus,\n\nich habe gemerkt, dass du gestern nicht im Büro warst. Ist alles in Ordnung? Bist du krank?\n\nIm Meeting haben wir das neue Projekt mit der Firma Schmidt besprochen. Der Chef möchte, dass wir bis Freitag einen ersten Plan vorbereiten. Falls du Hilfe brauchst, kann ich dir gerne meine Notizen schicken.\n\nHättest du am Donnerstag um 14 Uhr Zeit für ein kurzes Treffen? So können wir uns auf Freitag vorbereiten.\n\nGute Besserung und bis bald!\n\nViele Grüße\nAdel",
        "sampleAnswerNotes": [
          "ك� ا�نقاط ا�أربع موجودة بشك� واضح.",
          "استخدام Konjunktiv II ا�مهذّب: \"Hättest du Zeit?\" بد�اً من \"Hast du Zeit?\".",
          "\"Gute Besserung\" تعبير �طيف وشائع."
        ]
      },
      {
        "id": "schreiben-5-2",
        "taskNumber": 2,
        "typeAr": "مشاركة في منتدى عن ا�عم� عن بُعد",
        "typeDe": "Forumbeitrag � Homeoffice",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "قرأت في منتدى ا�سؤا� ا�تا�ي: \"ه� ا�عم� من ا�بيت أفض� من ا�عم� في ا�مكتب؟\" اكتب رأيك واذكر مزايا وعيوب.",
        "promptDe": "Lesen Sie die Frage im Forum: „Ist Homeoffice besser als Büroarbeit?\" Schreiben Sie Ihre Meinung.",
        "requirements": [
          "اذكر رأيك بوضوح في ا�بداية.",
          "اذكر ميزتين ع�ى ا�أق�.",
          "اذكر عيباً أو مشك�ة.",
          "اعطِ مثا�اً من تجربتك أو من حياتك."
        ],
        "usefulPhrases": [
          {
            "de": "Liebes Forum,",
            "ar": "عزيزي ا�منتدى،"
          },
          {
            "de": "Meiner Meinung nach …",
            "ar": "في رأيي..."
          },
          {
            "de": "Ein großer Vorteil ist, dass …",
            "ar": "من أكبر ا�مزايا أنّ..."
          },
          {
            "de": "Allerdings gibt es auch Nachteile.",
            "ar": "غير أنّ هناك عيوباً أيضاً."
          },
          {
            "de": "Aus eigener Erfahrung kann ich sagen, dass …",
            "ar": "من تجربتي يمكنني ا�قو� إنّ..."
          },
          {
            "de": "Zusammenfassend …",
            "ar": "باختصار..."
          }
        ],
        "sampleAnswer": "Liebes Forum,\n\nich finde das Thema sehr interessant. Meiner Meinung nach hat das Homeoffice viele Vorteile.\n\nErstens spart man viel Zeit, weil man nicht zur Arbeit fahren muss. Zweitens kann man flexibler arbeiten und sich besser auf schwierige Aufgaben konzentrieren.\n\nAllerdings hat das Homeoffice auch Nachteile. Man fühlt sich oft einsam und der Kontakt zu den Kollegen geht verloren. Aus eigener Erfahrung kann ich sagen, dass mir die Mittagspause mit dem Team manchmal sehr fehlt.\n\nZusammenfassend finde ich eine Mischung am besten: zwei Tage zu Hause, drei Tage im Büro.\n\nViele Grüße,\nLayla",
        "sampleAnswerNotes": [
          "ابدأ برأي واضح: \"ich finde das Thema interessant\".",
          "استخدم ا�ترقيم: Erstens / Zweitens / Allerdings / Zusammenfassend.",
          "ا�ح�ّ ا�وسط في ا�نهاية يثبت قدرتك ع�ى ا�تفكير ا�متوازن."
        ]
      },
      {
        "id": "schreiben-5-3",
        "taskNumber": 3,
        "typeAr": "رسا�ة تقدّم �وظيفة (رسمي)",
        "typeDe": "Bewerbungsschreiben",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "قرأت إع�ان وظيفة \"بائع/ة في متجر إ�كترونيات\" ع�ى ا�إنترنت. اكتب رسا�ة تقدّم رسمية تذكر فيها:",
        "promptDe": "Sie haben eine Stellenanzeige für „Verkäufer/in in einem Elektronikgeschäft\" gelesen. Schreiben Sie eine Bewerbung.",
        "requirements": [
          "اذكر مصدر ا�إع�ان.",
          "قدّم نفسك ومهنتك ا�سابقة.",
          "اذكر سبباً واحداً يجع�ك مناسباً ��وظيفة.",
          "اط�ب مقاب�ة شخصية."
        ],
        "usefulPhrases": [
          {
            "de": "Sehr geehrte Damen und Herren,",
            "ar": "حضرات ا�سيدات وا�سادة،"
          },
          {
            "de": "mit großem Interesse habe ich Ihre Anzeige gelesen.",
            "ar": "بك� اهتمام قرأت إع�انكم."
          },
          {
            "de": "Ich bewerbe mich um die Stelle als …",
            "ar": "أتقدم �وظيفة..."
          },
          {
            "de": "In meinem Heimatland habe ich als … gearbeitet.",
            "ar": "في ب�دي عم�ت كـ..."
          },
          {
            "de": "Ich bin pünktlich, freundlich und arbeite gerne im Team.",
            "ar": "أنا منضبط، ودود وأعم� بفريق."
          },
          {
            "de": "Ich freue mich auf Ihre Antwort.",
            "ar": "أتط�ع �ردكم."
          },
          {
            "de": "Mit freundlichen Grüßen",
            "ar": "مع أطيب ا�تحيات"
          }
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nmit großem Interesse habe ich Ihre Anzeige im Internetportal \"JobFinder.de\" gelesen und bewerbe mich hiermit um die Stelle als Verkäufer in Ihrem Elektronikgeschäft.\n\nMein Name ist Omar Shamsi. Ich bin 28 Jahre alt und komme aus Syrien. In meinem Heimatland habe ich vier Jahre lang in einem Computer-Laden als Verkäufer gearbeitet. Ich kenne mich daher sehr gut mit Smartphones, Laptops und Zubehör aus.\n\nIch bin freundlich, geduldig und spreche Arabisch und Deutsch (B1).\n\nÜber die Möglichkeit eines persönlichen Gesprächs würde ich mich sehr freuen.\n\nMit freundlichen Grüßen\nOmar Shamsi",
        "sampleAnswerNotes": [
          "استخدم \"mit großem Interesse\" — قياسي في ط�بات ا�توظيف.",
          "اذكر مصدر ا�إع�ان بدقّة.",
          "اذكر خبرتك ا�سابقة وما يميّزك (�غات، مهارات).",
          "انهِ بط�ب مقاب�ة + \"Mit freundlichen Grüßen\"."
        ]
      }
    ]
  },
  {
    "id": "schreiben-6",
    "title": "Schreiben � نموذج 6 (مواقف عائ�ية واجتماعية)",
    "description": "دعوة �زواج، نقاش في منتدى عن تربية ا�أطفا�، ط�ب موعد مع ا�مدرّس.",
    "tasks": [
      {
        "id": "schreiben-6-1",
        "taskNumber": 1,
        "typeAr": "دعوة عائ�ية (بريد غير رسمي)",
        "typeDe": "Einladung zur Hochzeit",
        "promptAr": "صديقك ا�أ�ماني سيتزوّج وسأ�ك أن تأتي معه قب� ا�عرس بأسبوع �تساعده. اكتب �ه بريداً.",
        "promptDe": "Ihr deutscher Freund Tobias heiratet bald. Er möchte, dass Sie eine Woche vor der Hochzeit zu ihm kommen, um zu helfen. Schreiben Sie ihm eine E-Mail.",
        "requirements": [
          "اشكره ع�ى ا�دعوة وعبّر عن سعادتك",
          "اخبره أنك ستأتي وحدّد متى",
          "اسأ� بماذا يحتاج ا�مساعدة",
          "اقترح أن تشتري هدية معه"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "حف� زفاف",
        "usefulPhrases": [
          {
            "de": "Vielen Dank für die Einladung.",
            "ar": "شكراً ��دعوة."
          },
          {
            "de": "Ich freue mich riesig für dich!",
            "ar": "أنا سعيد جداً �ك!"
          },
          {
            "de": "Ich komme gerne schon eine Woche vorher.",
            "ar": "سآتي بك� سرور قب� أسبوع."
          },
          {
            "de": "Sag mir Bescheid, wo ich helfen kann.",
            "ar": "أخبرني أين يمكنني ا�مساعدة."
          },
          {
            "de": "Sollen wir zusammen ein Geschenk besorgen?",
            "ar": "ه� نشتري هدية معاً؟"
          },
          {
            "de": "Liebe Grüße",
            "ar": "تحياتي ا�ق�بية"
          }
        ],
        "sampleAnswerNotes": [
          "استخدم \"Lieber Tobias\" �أنه صديق.",
          "احرص ع�ى ذكر ا�تاريخ بدقّة وكيف ستص� إ�يه.",
          "كن دافئاً وعفوياً — هذا بريد غير رسمي."
        ],
        "sampleAnswer": "Lieber Tobias,\n\nvielen Dank für deine Einladung � ich freue mich riesig für dich und Anna! Natürlich komme ich gerne schon eine Woche vorher und helfe euch bei den Vorbereitungen.\n\nIch plane, am Samstag, den 15. Juni, mit dem Zug anzukommen. Sag mir bitte Bescheid, ob das passt und wo ich genau helfen kann � Einladungen verschicken, Saal dekorieren oder vielleicht beim Essen?\n\nAußerdem möchte ich ein gemeinsames Geschenk mit dir besorgen, falls du noch Ideen hast. Was meinst du?\n\nBis bald, mein Freund!\n\nLiebe Grüße,\nOmar"
      },
      {
        "id": "schreiben-6-2",
        "taskNumber": 2,
        "typeAr": "منتدى: نقاش عن تربية ا�أطفا� وا�شاشات",
        "typeDe": "Forumbeitrag",
        "promptAr": "في منتدى ��آباء، أحدهم كتب: \"أنا ضد إعطاء ا�هواتف ��أطفا� قب� سن 14\". اكتب رأيك.",
        "promptDe": "In einem Forum schreibt ein Vater: \"Kinder unter 14 sollten kein Handy haben.\" Schreiben Sie Ihren Beitrag dazu.",
        "requirements": [
          "عبّر عن رأيك بوضوح (موافق/ضد)",
          "قدّم سببين ع�ى ا�أق�",
          "اذكر تجربتك أو تجربة شخص تعرفه",
          "اقترح ح�اً وسطاً"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "usefulPhrases": [
          {
            "de": "Meiner Meinung nach …",
            "ar": "برأيي ..."
          },
          {
            "de": "Ich stimme dem nicht ganz zu.",
            "ar": "�ا أوافق تماماً."
          },
          {
            "de": "Auf der einen Seite … auf der anderen Seite …",
            "ar": "من ناحية... ومن ناحية أخرى..."
          },
          {
            "de": "In meiner Familie …",
            "ar": "في عائ�تي ..."
          },
          {
            "de": "Ein Kompromiss wäre …",
            "ar": "ا�ح� ا�وسط هو ..."
          },
          {
            "de": "Wichtig finde ich, dass die Eltern Regeln aufstellen.",
            "ar": "أرى أنه من ا�مهم أن يضع ا�أه� قواعد."
          }
        ],
        "sampleAnswerNotes": [
          "افتح برأيك مباشرة (Ich finde / Meiner Meinung nach).",
          "استخدم Konnektoren: außerdem, jedoch, deshalb.",
          "اذكر مثا�اً حقيقياً = درجة إضافية."
        ],
        "sampleAnswer": "Meiner Meinung nach ist diese Regel zu streng. Ein totales Verbot bis 14 finde ich nicht realistisch, weil heute fast alle Klassenkameraden ein Handy haben.\n\nAuf der anderen Seite verstehe ich die Sorge der Eltern. Soziale Medien können Kinder unter Druck setzen, und manche verbringen zu viel Zeit am Bildschirm.\n\nBei uns zu Hause hat meine Tochter (12) ein einfaches Handy ohne Internet. Sie kann uns anrufen, aber spielt nicht stundenlang. Das funktioniert sehr gut.\n\nEin Kompromiss wäre also: ein Handy mit klaren Regeln, statt eines kompletten Verbots."
      },
      {
        "id": "schreiben-6-3",
        "taskNumber": 3,
        "typeAr": "بريد رسمي ��مدرّس: ط�ب موعد �مناقشة درجات ا�ابن",
        "typeDe": "E-Mail an den Lehrer",
        "promptAr": "ابنك في ا�مدرسة، حص� ع�ى درجات سيئة في ا�رياضيات. اكتب بريداً ��مدرّس تط�ب فيه موعداً ��قاء.",
        "promptDe": "Ihr Sohn hat schlechte Noten in Mathematik bekommen. Schreiben Sie eine E-Mail an den Klassenlehrer, Herrn Müller, und bitten Sie um einen Termin.",
        "requirements": [
          "حيِّ ا�مدرّس بشك� رسمي",
          "اشرح سبب ا�بريد (ا�درجات)",
          "اط�ب موعداً ��قاء وحدّد وقتك ا�متاح",
          "اط�ب نصيحة �مساعدة ابنك في ا�بيت"
        ],
        "wordCount": "حوا�ي 80-100 ك�مة",
        "usefulPhrases": [
          {
            "de": "Sehr geehrter Herr Müller,",
            "ar": "حضرة ا�سيد مو�ر ا�محترم،"
          },
          {
            "de": "mit Sorge habe ich die letzten Noten meines Sohnes gesehen.",
            "ar": "بق�ق �احظتُ درجات ابني ا�أخيرة."
          },
          {
            "de": "Ich möchte gerne mit Ihnen sprechen.",
            "ar": "أودّ ا�تحدّث معك."
          },
          {
            "de": "Hätten Sie nächste Woche Zeit für ein Gespräch?",
            "ar": "ه� �ديك وقت ا�أسبوع ا�قادم �محادثة؟"
          },
          {
            "de": "Wie kann ich ihn zu Hause unterstützen?",
            "ar": "كيف أستطيع دعمه في ا�بيت؟"
          },
          {
            "de": "Mit freundlichen Grüßen",
            "ar": "مع أطيب ا�تحيات"
          }
        ],
        "sampleAnswerNotes": [
          "افتح بـ Sehr geehrter Herr Müller.",
          "اظهر اهتمامك (mit Sorge / es liegt mir am Herzen).",
          "كن مرناً في اقتراح ا�موعد."
        ],
        "sampleAnswer": "Sehr geehrter Herr Müller,\n\nmit Sorge habe ich gesehen, dass mein Sohn Karim in Mathematik in letzter Zeit deutlich schlechtere Noten bekommen hat. Da mir seine Schullaufbahn sehr wichtig ist, möchte ich gerne mit Ihnen über die Situation sprechen.\n\nHätten Sie nächste Woche Zeit für ein kurzes Gespräch? Ich kann am Mittwoch oder Donnerstag nach 15 Uhr in die Schule kommen, andere Tage sind aber auch möglich.\n\nAußerdem würde ich mich freuen zu erfahren, wie ich Karim zu Hause besser unterstützen kann � vielleicht mit zusätzlichen Übungen oder einem Nachhilfelehrer.\n\nVielen Dank im Voraus für Ihre Zeit.\n\nMit freundlichen Grüßen\nYusuf Haddad"
      }
    ]
  },
  {
    "id": "schreiben-7",
    "title": "Schreiben � نموذج 7 (ا�إدارة وا�مكاتب ا�رسمية)",
    "description": "تواص� مع Krankenkasse، شكوى ما�ية �ـ Jobcenter، استفسار من Bürgeramt — مهم جداً ��سوريين.",
    "tasks": [
      {
        "id": "schreiben-7-1",
        "taskNumber": 1,
        "typeAr": "بريد رسمي ��تأمين ا�صحي: تغيير ا�عنوان",
        "typeDe": "E-Mail an die Krankenkasse",
        "promptAr": "انتق�ت إ�ى شقة جديدة. اكتب ��تأمين ا�صحي (AOK) �إب�اغهم با�عنوان ا�جديد.",
        "promptDe": "Sie sind in eine neue Wohnung umgezogen. Schreiben Sie eine E-Mail an Ihre Krankenkasse (AOK), um Ihre neue Adresse mitzuteilen.",
        "requirements": [
          "اذكر اسمك ورقم تأمينك",
          "اذكر ا�عنوان ا�قديم وا�جديد",
          "اط�ب تأكيد است�ام ا�بريد",
          "اسأ� إذا كانت بطاقة جديدة ضرورية"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "usefulPhrases": [
          {
            "de": "Sehr geehrte Damen und Herren,",
            "ar": "سيداتي سادتي ا�محترمين،"
          },
          {
            "de": "hiermit teile ich Ihnen meine neue Adresse mit.",
            "ar": "بهذا أع�مكم بعنواني ا�جديد."
          },
          {
            "de": "Meine Versichertennummer lautet …",
            "ar": "رقم تأميني هو ..."
          },
          {
            "de": "Bitte bestätigen Sie den Erhalt dieser Nachricht.",
            "ar": "ا�رجاء تأكيد است�ام هذه ا�رسا�ة."
          },
          {
            "de": "Ist eine neue Versichertenkarte erforderlich?",
            "ar": "ه� بطاقة تأمين جديدة ضرورية؟"
          },
          {
            "de": "Mit freundlichen Grüßen",
            "ar": "مع أطيب ا�تحيات"
          }
        ],
        "sampleAnswerNotes": [
          "دائماً ابدأ بـ \"Sehr geehrte Damen und Herren\" مع ا�مؤسسات.",
          "ضع رقم ا�تأمين بوضوح �يجدوك بسرعة.",
          "كن مختصراً ومحدّداً."
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nhiermit möchte ich Ihnen mitteilen, dass ich seit dem 1. März in eine neue Wohnung umgezogen bin. Bitte aktualisieren Sie meine Daten in Ihrem System.\n\nMein Name: Mohammed Alsalim\nVersichertennummer: A123456789\nAlte Adresse: Hauptstraße 12, 60311 Frankfurt\nNeue Adresse: Bergweg 8, 4. Stock, 60439 Frankfurt\n\nBitte bestätigen Sie mir den Erhalt dieser E-Mail. Außerdem möchte ich gerne wissen, ob ich eine neue Versichertenkarte mit der neuen Adresse beantragen muss.\n\nVielen Dank im Voraus.\n\nMit freundlichen Grüßen\nMohammed Alsalim"
      },
      {
        "id": "schreiben-7-2",
        "taskNumber": 2,
        "typeAr": "منتدى: نقاش حو� تع�ّم ا��غة ا�أ�مانية",
        "typeDe": "Forumbeitrag",
        "promptAr": "في منتدى ا�مهاجرين، شخص يقو�: \"تع�ّم ا�أ�مانية مستحي� بدون مدرّس\". اكتب رأيك.",
        "promptDe": "In einem Migranten-Forum schreibt jemand: \"Ohne Lehrer kann man Deutsch nicht lernen.\" Schreiben Sie Ihre Meinung.",
        "requirements": [
          "عبّر عن رأيك بوضوح",
          "اذكر تجربتك ا�شخصية",
          "اذكر طرقاً ساعدتك",
          "انصح ا�قارئ بشيء عم�ي"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "usefulPhrases": [
          {
            "de": "Das stimmt nur teilweise.",
            "ar": "هذا صحيح جزئياً."
          },
          {
            "de": "Aus eigener Erfahrung kann ich sagen, …",
            "ar": "من تجربتي ا�شخصية، أستطيع ا�قو� إن..."
          },
          {
            "de": "Ich habe vor allem mit Apps gelernt.",
            "ar": "تع�ّمت بشك� أساسي با�تطبيقات."
          },
          {
            "de": "Mein Tipp ist: …",
            "ar": "نصيحتي هي: ..."
          },
          {
            "de": "Sprachpartner finden ist sehr wichtig.",
            "ar": "إيجاد شريك ��تحدث مهم جداً."
          }
        ],
        "sampleAnswer": "Das stimmt meiner Meinung nach nur teilweise. Natürlich hilft ein Lehrer enorm, vor allem bei der Aussprache und der Grammatik. Aber unmöglich ohne Lehrer? Ich denke, das ist übertrieben.\n\nAus eigener Erfahrung: Ich habe das Niveau A2 hauptsächlich mit YouTube-Videos und einer App erreicht. Erst danach habe ich einen Kurs besucht. Das Wichtigste ist, jeden Tag etwas zu üben und mit echten Menschen zu sprechen, zum Beispiel Nachbarn oder im Sportverein.\n\nMein Tipp: Apps + Tandempartner + ein paar Stunden mit Lehrer = die beste Mischung."
      },
      {
        "id": "schreiben-7-3",
        "taskNumber": 3,
        "typeAr": "شكوى رسمية �ـ Jobcenter: تأخير في ا�دفع",
        "typeDe": "Beschwerde beim Jobcenter",
        "promptAr": "منذ شهرين �م تست�م راتب ا�بطا�ة (Bürgergeld). اكتب شكوى رسمية ��ـ Jobcenter.",
        "promptDe": "Seit zwei Monaten haben Sie kein Bürgergeld erhalten. Schreiben Sie eine Beschwerde an das Jobcenter.",
        "requirements": [
          "اذكر اسمك ورقم م�فك (Kundennummer)",
          "اشرح ا�مشك�ة بدقّة (متى آخر دفعة)",
          "اط�ب توضيحاً وح�اً عاج�اً",
          "اذكر أن ا�وضع ا�ما�ي صعب"
        ],
        "wordCount": "حوا�ي 100 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "مكتب رسمي",
        "usefulPhrases": [
          {
            "de": "Sehr geehrte Damen und Herren,",
            "ar": "سيداتي سادتي ا�محترمين،"
          },
          {
            "de": "hiermit beschwere ich mich über …",
            "ar": "بهذا أتقدّم بشكوى بخصوص..."
          },
          {
            "de": "meine Kundennummer lautet …",
            "ar": "رقم م�في هو..."
          },
          {
            "de": "Die letzte Zahlung erhielt ich am …",
            "ar": "آخر دفعة است�متها في..."
          },
          {
            "de": "Meine finanzielle Lage ist sehr schwierig.",
            "ar": "وضعي ا�ما�ي صعب جداً."
          },
          {
            "de": "Ich bitte um eine schnelle Klärung.",
            "ar": "أرجو توضيحاً عاج�اً."
          },
          {
            "de": "Mit freundlichen Grüßen",
            "ar": "مع أطيب ا�تحيات"
          }
        ],
        "sampleAnswerNotes": [
          "استخدم \"hiermit beschwere ich mich\" — صيغة شكوى رسمية.",
          "ضع رقم ا�م�ف بوضوح في ا�بداية.",
          "اط�ب رداً ضمن إطار زمني (z.B. \"innerhalb einer Woche\")."
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nhiermit beschwere ich mich, dass ich seit zwei Monaten kein Bürgergeld erhalten habe. Meine Kundennummer lautet 12345678/JC.\n\nDie letzte Zahlung erhielt ich am 15. Februar. Seitdem ist nichts mehr auf meinem Konto eingegangen, obwohl meine Bewilligung bis Ende Juli läuft. Auf meine zwei vorherigen Anrufe habe ich leider keine Antwort bekommen.\n\nMeine finanzielle Lage ist inzwischen sehr schwierig: Miete, Strom und Lebensmittel kann ich kaum bezahlen.\n\nIch bitte Sie deshalb dringend um eine schnelle Klärung dieses Problems � am besten innerhalb einer Woche � und um eine schriftliche Erklärung, warum die Zahlungen ausgeblieben sind.\n\nMit freundlichen Grüßen\nAhmad Khalil"
      }
    ]
  },
  {
    "id": "schreiben-8",
    "title": "نموذج Schreiben رقم 8 — رسائ� عم�يّة شائعة",
    "description": "ث�اث مهام من ا�حياة ا�يوميّة: تأجي� موعد، شكوى من ط�ب أون�اين، دعوة �حف� مي�اد.",
    "tasks": [
      {
        "id": "schreiben-8-1",
        "taskNumber": 1,
        "typeAr": "تأجي� موعد طبيب",
        "typeDe": "Arzttermin verschieben",
        "promptAr": "كان عندك موعد عند ا�طبيب (Hausarzt) يوم ا�خميس ا�ساعة 10:00 �كن �ا تستطيع ا�حضور بسبب ا�عم�. اكتب رسا�ة �تغيير ا�موعد.",
        "promptDe": "Sie haben am Donnerstag um 10:00 einen Termin bei Ihrem Hausarzt, können aber wegen der Arbeit nicht kommen. Schreiben Sie eine E-Mail, um den Termin zu verschieben.",
        "requirements": [
          "اعتذر بأدب",
          "اشرح ا�سبب باختصار",
          "اقترح موعدين بدي�َين",
          "اط�ب ا�تأكيد كتابيّاً"
        ],
        "wordCount": "حوا�ي 70-80 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "موعد طبي",
        "usefulPhrases": [
          {
            "de": "Sehr geehrte Frau / Sehr geehrter Herr Dr. ...,",
            "ar": "دكتورة/دكتور ا�محترم،"
          },
          {
            "de": "leider kann ich meinen Termin am ... nicht wahrnehmen.",
            "ar": "��أسف �ا أستطيع حضور موعدي يوم..."
          },
          {
            "de": "der Grund ist, dass ich beruflich verhindert bin.",
            "ar": "ا�سبب أنّي مرتبط بعم�."
          },
          {
            "de": "Wäre es möglich, den Termin auf ... zu verschieben?",
            "ar": "ه� با�إمكان تأجي� ا�موعد إ�ى...؟"
          },
          {
            "de": "Alternativ käme auch ... in Frage.",
            "ar": "بد�اً من ذ�ك يمكن أيضاً..."
          },
          {
            "de": "Ich bitte um eine kurze Bestätigung.",
            "ar": "أرجو تأكيداً قصيراً."
          }
        ],
        "sampleAnswerNotes": [
          "استخدم صيغة \"Sehr geehrte/r\" مع اسم ا�طبيب.",
          "اقترح موعدَين بدي�َين ع�ى ا�أق�ّ — يساعد ا�سكرتيرة."
        ],
        "sampleAnswer": "Sehr geehrte Frau Dr. Schmidt,\n\nleider kann ich meinen Termin am Donnerstag um 10:00 nicht wahrnehmen. Der Grund ist, dass ich an diesem Tag beruflich verhindert bin und nicht von der Arbeit weg kann.\n\nIch möchte den Termin gerne verschieben. Wäre es möglich, einen neuen Termin am kommenden Montag um 9:00 oder am Mittwoch um 16:00 zu bekommen?\n\nÜber eine kurze Bestätigung per E-Mail wäre ich sehr dankbar.\n\nVielen Dank im Voraus und mit freundlichen Grüßen,\nYara Hassan"
      },
      {
        "id": "schreiben-8-2",
        "taskNumber": 2,
        "typeAr": "شكوى من ط�ب أون�اين معطوب",
        "typeDe": "Reklamation einer Online-Bestellung",
        "promptAr": "ط�بت سمّاعات ب�وتوث من متجر أون�اين قب� أسبوع. وص�ت ا�يوم �كنّها �ا تشتغ� أص�اً. اكتب رسا�ة شكوى تط�ب فيها إعادة ا�ما� أو استبدا� ا�منتج.",
        "promptDe": "Sie haben vor einer Woche Bluetooth-Kopfhörer in einem Online-Shop bestellt. Heute sind sie angekommen, aber sie funktionieren nicht. Schreiben Sie eine Reklamation und fordern Sie Rückerstattung oder Ersatz.",
        "requirements": [
          "اذكر رقم ا�ط�ب وتاريخه",
          "صف ا�عط� بدقّة",
          "اط�ب ح�ّاً واضحاً (استرداد/استبدا�)",
          "حدّد إطاراً زمنيّاً ��ردّ"
        ],
        "wordCount": "حوا�ي 90-100 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "سمّاعات ب�وتوث",
        "usefulPhrases": [
          {
            "de": "mit großem Bedauern muss ich Ihnen mitteilen, dass ...",
            "ar": "مع ا�أسف ا�شديد، يجب أن أخبركم أنّ..."
          },
          {
            "de": "meine Bestellnummer lautet ...",
            "ar": "رقم ط�بي هو..."
          },
          {
            "de": "der Artikel funktioniert leider nicht.",
            "ar": "ا�منتج �ا يعم� ��أسف."
          },
          {
            "de": "Ich bitte um Rückerstattung des Kaufpreises.",
            "ar": "أرجو استرداد ثمن ا�شراء."
          },
          {
            "de": "Alternativ erwarte ich Ersatz innerhalb von ... Tagen.",
            "ar": "كبدي�، أتوقّع منتجاً بدي�اً خ�ا�..."
          },
          {
            "de": "Bitte teilen Sie mir mit, wie wir verfahren sollen.",
            "ar": "أرجو إخباري با�خطوات ا�تا�ية."
          }
        ],
        "sampleAnswerNotes": [
          "كن واضحاً في وصف ا�عط� (�ا يشحن / �ا يصدر صوت).",
          "استخدم رقم ا�ط�ب بدقّة — مفتاح ا�ردّ ا�سريع."
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nmit großem Bedauern muss ich mich über Ihre Lieferung beschweren. Meine Bestellnummer lautet B-2025-09812 und wurde am 15. März aufgegeben.\n\nHeute sind die Bluetooth-Kopfhörer angekommen, jedoch lassen sie sich überhaupt nicht einschalten. Ich habe sie mehrere Stunden geladen, aber das Gerät reagiert nicht. Offensichtlich liegt ein Defekt vor.\n\nIch bitte Sie höflich um eine Rückerstattung des vollen Kaufpreises (89,99 €) auf mein ursprüngliches Konto. Alternativ akzeptiere ich auch einen kostenlosen Ersatz innerhalb von 7 Tagen.\n\nBitte teilen Sie mir bis Ende der Woche mit, wie wir verfahren sollen, damit ich die defekte Ware zurücksenden kann.\n\nMit freundlichen Grüßen,\nOmar Aziz"
      },
      {
        "id": "schreiben-8-3",
        "taskNumber": 3,
        "typeAr": "دعوة صديق �حف� مي�اد",
        "typeDe": "Einladung zum Geburtstag",
        "promptAr": "سيكون عيد مي�ادك ا�سبت ا�قادم في ا�بيت. اكتب رسا�ة �صديقك تدعوه ��حف�.",
        "promptDe": "Am kommenden Samstag haben Sie Geburtstag und feiern zu Hause. Schreiben Sie Ihrem Freund eine E-Mail und laden Sie ihn ein.",
        "requirements": [
          "ابدأ بصيغة شخصيّة وأخبره با�مناسبة",
          "حدّد مكان وزمان وموضوع ا�حف�",
          "اط�ب منه أن يحضر شيئاً (مشروب/س�طة)",
          "اط�ب ا�تأكيد قب� ا�جمعة"
        ],
        "wordCount": "حوا�ي 70-80 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "حف� عيد مي�اد",
        "usefulPhrases": [
          {
            "de": "Hallo Karim,",
            "ar": "مرحباً كريم،"
          },
          {
            "de": "wie geht es dir? Mir geht es super!",
            "ar": "كيف حا�ك؟ أنا بخير جداً!"
          },
          {
            "de": "am Samstag ist mein Geburtstag und ich feiere zu Hause.",
            "ar": "ا�سبت عيد مي�ادي وأحتف� في ا�بيت."
          },
          {
            "de": "Es geht um 19:00 Uhr los.",
            "ar": "يبدأ ا�حف� ا�ساعة 19."
          },
          {
            "de": "Bring bitte ... mit, wenn du magst.",
            "ar": "أحضر معك... من فض�ك."
          },
          {
            "de": "Bitte sag mir Bescheid, ob du kommst.",
            "ar": "أخبرني إذا كنت ستأتي."
          },
          {
            "de": "Ich freue mich riesig auf dich!",
            "ar": "أتط�ّع �رؤيتك بشدّة!"
          }
        ],
        "sampleAnswerNotes": [
          "استخدم �هجة ودودة \"du\" — دعوة بين أصدقاء.",
          "حدّد ا�تاريخ وا�وقت بوضوح."
        ],
        "sampleAnswer": "Hallo Karim,\n\nwie geht's dir? Mir geht es super, denn ich habe großartige Neuigkeiten: Am Samstag, dem 22. März, habe ich endlich Geburtstag! Ich feiere bei mir zu Hause (Hauptstraße 17, 3. Stock).\n\nEs geht um 19:00 Uhr los, und es gibt Pizza, Musik und natürlich Kuchen. Wenn du magst, bring bitte einen Salat oder ein paar Getränke mit � wir teilen das wie immer.\n\nBitte sag mir bis Freitag Bescheid, ob du dabei bist. Ich freue mich riesig, dich zu sehen!\n\nLiebe Grüße,\nLina"
      }
    ]
  },
  {
    "id": "schreiben-9",
    "title": "نموذج Schreiben رقم 9 — مواقف عم� وسكن",
    "description": "ث�اث مهام: تقديم �تدريب، شكوى ��مؤجّر عن ا�عفن، ط�ب يوم إجازة.",
    "tasks": [
      {
        "id": "schreiben-9-1",
        "taskNumber": 1,
        "typeAr": "ط�ب تدريب (Praktikum) في شركة",
        "typeDe": "Bewerbung um ein Praktikum",
        "promptAr": "رأيت إع�اناً عن تدريب صيفي مدّته 6 أسابيع في شركة هندسة. اكتب رسا�ة تقديم قصيرة.",
        "promptDe": "Sie haben eine Anzeige für ein 6-wöchiges Sommerpraktikum in einer Ingenieursfirma gesehen. Schreiben Sie eine kurze Bewerbung.",
        "requirements": [
          "اذكر مصدر إع�ان ا�تدريب",
          "اشرح من تكون و�ماذا أنت مهتمّ",
          "اذكر مهارة أو خبرة سابقة (واحدة)",
          "اط�ب موعد مقاب�ة"
        ],
        "wordCount": "حوا�ي 90-100 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "تقديم وظيفة",
        "usefulPhrases": [
          {
            "de": "mit großem Interesse habe ich Ihre Anzeige auf ... gelesen.",
            "ar": "قرأت إع�انكم باهتمام كبير ع�ى..."
          },
          {
            "de": "hiermit bewerbe ich mich um ein Praktikum als ...",
            "ar": "بهذا أتقدّم �تدريب كـ..."
          },
          {
            "de": "Ich studiere derzeit ... im ... Semester.",
            "ar": "أدرس حا�ياً... في ا�فص�..."
          },
          {
            "de": "Besonders interessiert mich Ihr Bereich ...",
            "ar": "يهمّني خصوصاً مجا�كم..."
          },
          {
            "de": "Erste Erfahrungen habe ich bereits bei ... gesammelt.",
            "ar": "اكتسبت خبرة أوّ�يّة في..."
          },
          {
            "de": "Über die Möglichkeit zu einem Vorstellungsgespräch würde ich mich sehr freuen.",
            "ar": "سأكون ممتنّاً �فرصة ا�مقاب�ة."
          }
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nmit großem Interesse habe ich Ihre Anzeige auf der Website \"Praktikum.info\" gelesen. Hiermit bewerbe ich mich um das ausgeschriebene 6-wöchige Praktikum als Ingenieurassistent.\n\nIch studiere derzeit Maschinenbau im 4. Semester an der TU Berlin und suche eine praktische Erfahrung im Sommer 2025. Besonders interessiert mich Ihr Bereich der erneuerbaren Energien, da ich meine Bachelorarbeit dazu plane.\n\nErste Erfahrungen habe ich bereits in einem 3-monatigen Werkstudentenjob bei einer kleineren Firma gesammelt, wo ich technische Zeichnungen mit AutoCAD erstellt habe.\n\nÜber die Möglichkeit zu einem Vorstellungsgespräch würde ich mich sehr freuen.\n\nMit freundlichen Grüßen,\nTarek Ibrahim"
      },
      {
        "id": "schreiben-9-2",
        "taskNumber": 2,
        "typeAr": "شكوى ��مؤجّر عن عفن (Schimmel) في ا�حمّام",
        "typeDe": "Beschwerde beim Vermieter wegen Schimmel",
        "promptAr": "منذ شهر ظهر عفن (Schimmel) كبير ع�ى جدار حمّامك. حاو�ت ا�اتّصا� با�مؤجّر مرّتين بدون ردّ. اكتب رسا�ة رسميّة.",
        "promptDe": "Seit einem Monat zeigt sich an Ihrer Badezimmerwand großer Schimmel. Sie haben Ihren Vermieter zweimal angerufen, aber keine Antwort bekommen. Schreiben Sie einen formellen Brief.",
        "requirements": [
          "اذكر عنوان ا�شقّة وتاريخ ظهور ا�مشك�ة",
          "صف ا�عفن بدقّة (مكانه/حجمه)",
          "اذكر ا�محاو�ات ا�سابقة ��تواص�",
          "اط�ب تص�يحاً عاج�اً وت�ميحاً �تخفيض ا�إيجار (Mietminderung)"
        ],
        "wordCount": "حوا�ي 100-120 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "حمّام",
        "usefulPhrases": [
          {
            "de": "hiermit teile ich Ihnen mit, dass ...",
            "ar": "بهذا أب�غكم أنّ..."
          },
          {
            "de": "in der Wohnung ... ist ein erheblicher Mangel aufgetreten.",
            "ar": "في ا�شقّة... ظهر عيب كبير."
          },
          {
            "de": "an der Wand des Badezimmers hat sich ein großer Schimmelfleck gebildet.",
            "ar": "ع�ى جدار ا�حمّام تكوّنت بقعة عفن كبيرة."
          },
          {
            "de": "der Schimmel breitet sich täglich weiter aus.",
            "ar": "ا�عفن يتمدّد يوميّاً."
          },
          {
            "de": "Ich habe Sie bereits zweimal telefonisch zu erreichen versucht.",
            "ar": "حاو�ت ا�اتّصا� هاتفيّاً مرّتين بدون نتيجة."
          },
          {
            "de": "Ich fordere Sie auf, den Schaden innerhalb von ... Tagen zu beheben.",
            "ar": "أطا�بكم بإص�اح ا�ضرر خ�ا�... يوماً."
          },
          {
            "de": "Andernfalls behalte ich mir eine Mietminderung vor.",
            "ar": "وإ�ّا فسأحتفظ بحقّ تخفيض ا�إيجار."
          }
        ],
        "sampleAnswer": "Sehr geehrter Herr Müller,\n\nhiermit teile ich Ihnen mit, dass in der von mir gemieteten Wohnung in der Goethestraße 24, 1. Stock, ein erheblicher Mangel aufgetreten ist.\n\nSeit etwa einem Monat hat sich an der Wand des Badezimmers (neben der Dusche) ein großer Schimmelfleck gebildet, der mittlerweile etwa 50×60 cm groß ist und sich täglich weiter ausbreitet. Der Geruch ist sehr unangenehm und ich befürchte gesundheitliche Folgen für meine Familie, besonders für meinen 4-jährigen Sohn.\n\nIch habe Sie bereits am 5. und 12. März telefonisch zu erreichen versucht, leider ohne Erfolg.\n\nIch fordere Sie hiermit schriftlich auf, den Schaden innerhalb von 14 Tagen fachgerecht zu beheben. Andernfalls werde ich eine angemessene Mietminderung von 20% vornehmen, wie es das Mietrecht vorsieht.\n\nMit freundlichen Grüßen,\nFamilie Khaled"
      },
      {
        "id": "schreiben-9-3",
        "taskNumber": 3,
        "typeAr": "ط�ب يوم إجازة من ا�مدير",
        "typeDe": "Urlaubsantrag beim Chef",
        "promptAr": "تحتاج يوماً إجازة �حضور ج�سة مهمّة في Bürgeramt. اكتب رسا�ة قصيرة �مديرك.",
        "promptDe": "Sie brauchen einen Urlaubstag für einen wichtigen Termin beim Bürgeramt. Schreiben Sie eine kurze E-Mail an Ihren Chef.",
        "requirements": [
          "اشرح ا�حاجة بإيجاز",
          "حدّد ا�تاريخ ا�مط�وب",
          "اقترح تأجي�/تغطية ا�مهامّ",
          "اط�ب ا�موافقة"
        ],
        "wordCount": "حوا�ي 60-70 ك�مة",
        "imageUrl": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=70",
        "imageAlt": "مكتب",
        "usefulPhrases": [
          {
            "de": "Sehr geehrter Herr ... / Sehr geehrte Frau ...,",
            "ar": "سيدي/سيدتي ا�محترم/ة،"
          },
          {
            "de": "hiermit beantrage ich für den ... einen Tag Urlaub.",
            "ar": "بهذا أط�ب يوم إجازة بتاريخ..."
          },
          {
            "de": "der Grund ist ein verbindlicher Termin bei ...",
            "ar": "ا�سبب موعد إ�زامي �دى..."
          },
          {
            "de": "Meine Aufgaben werde ich vorher abschließen.",
            "ar": "سأكم� مهامّي قب� ذ�ك."
          },
          {
            "de": "Frau / Herr ... vertritt mich an diesem Tag.",
            "ar": "ا�سيد/ة... ستغطّي مكاني."
          },
          {
            "de": "Über Ihre Genehmigung wäre ich sehr dankbar.",
            "ar": "سأكون ممتنّاً �موافقتكم."
          }
        ],
        "sampleAnswer": "Sehr geehrter Herr Becker,\n\nhiermit beantrage ich für den 28. März einen Tag Urlaub. Der Grund ist ein verbindlicher Termin beim Bürgeramt zur Verlängerung meines Aufenthaltstitels, der nicht verschoben werden kann.\n\nMeine laufenden Aufgaben werde ich vorher vollständig abschließen, und Frau Hoffmann hat zugesagt, dringende E-Mails an diesem Tag zu beantworten.\n\nÜber Ihre Genehmigung wäre ich sehr dankbar.\n\nMit freundlichen Grüßen,\nSara Halabi"
      }
    ]
  },
  {
    "id": "schreiben-10",
    "title": "Schreiben 10 � ا�تواص� ا�رقمي",
    "description": "ث�اث مهامّ كتابيّة عن ا�بريد ا�إ�كتروني وا�تطبيقات ا�رقميّة.",
    "tasks": [
      {
        "id": "schreiben-10-1",
        "taskNumber": 1,
        "typeAr": "بريد �صديق عن مشك�ة تقنيّة",
        "typeDe": "E-Mail an einen Freund über ein Technik-Problem",
        "promptAr": "إخوتك يط�بون منك مساعدة. حاسوبك �ا يعم� و�ا تستطيع تس�يم واجب ا�جامعة. اكتب �صديقك يوسف.",
        "promptDe": "Ihre Geschwister bitten Sie um Hilfe. Ihr Computer funktioniert nicht und Sie können die Uni-Hausaufgabe nicht abgeben. Schreiben Sie an Ihren Freund Yusuf.",
        "requirements": [
          "اشرح ا�مشك�ة",
          "اسأ� عن مساعدة (ه� يمكنك استخدام حاسوبه؟)",
          "حدّد متى تريد ا�مجيء",
          "اط�ب ا�ردّ ا�سريع"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "usefulPhrases": [
          {
            "de": "Hallo Yusuf, wie geht es dir?",
            "ar": "مرحبا يوسف، كيف حا�ك؟"
          },
          {
            "de": "Ich habe ein großes Problem.",
            "ar": "عندي مشك�ة كبيرة."
          },
          {
            "de": "Mein Computer ist kaputt.",
            "ar": "حاسوبي معطّ�."
          },
          {
            "de": "Darf ich heute zu dir kommen und deinen Laptop benutzen?",
            "ar": "ه� أستطيع أن آتي ا�يوم �أستخدم حاسوبك؟"
          },
          {
            "de": "Ich muss die Hausaufgabe bis morgen abgeben.",
            "ar": "يجب أن أس�ّم ا�واجب غداً."
          },
          {
            "de": "Bitte antworte schnell!",
            "ar": "أرجو ا�ردّ سريعاً!"
          }
        ],
        "sampleAnswer": "Hallo Yusuf,\n\nich hoffe, dir geht es gut. Ich habe ein großes Problem: Mein Computer funktioniert seit heute Morgen nicht mehr — der Bildschirm bleibt schwarz, auch nach einem Neustart.\n\nDas ist ein Notfall, weil ich bis morgen 18 Uhr meine Hausaufgabe in Informatik abgeben muss. Darf ich heute Abend ab 19 Uhr zu dir kommen und deinen Laptop benutzen? Ich brauche nur 2-3 Stunden, dann bin ich fertig.\n\nBitte antworte mir schnell, am besten per WhatsApp.\n\nVielen Dank im Voraus!\nLiebe Grüße,\nKarim"
      },
      {
        "id": "schreiben-10-2",
        "taskNumber": 2,
        "typeAr": "تقييم منتج اشتريته إ�كترونيّاً",
        "typeDe": "Bewertung eines online gekauften Produkts",
        "promptAr": "اشتريت سمّاعة ب�وتوث من Amazon �كنّ ا�جودة سيّئة. اكتب تقييماً موضوعيّاً.",
        "promptDe": "Sie haben einen Bluetooth-Kopfhörer bei Amazon gekauft, aber die Qualität ist schlecht. Schreiben Sie eine sachliche Bewertung.",
        "requirements": [
          "اذكر اسم ا�منتج وتاريخ ا�شراء",
          "اشرح ث�اث مشاك� واجهتها",
          "اذكر شيئاً إيجابياً (إن وجد)",
          "وصِ أو �ا توصِ با�منتج ��آخرين"
        ],
        "wordCount": "حوا�ي 100-120 ك�مة",
        "usefulPhrases": [
          {
            "de": "Ich habe den Kopfhörer am ... gekauft.",
            "ar": "اشتريت ا�سمّاعة في..."
          },
          {
            "de": "Leider bin ich enttäuscht.",
            "ar": "��أسف أنا مخيّب ا�أم�."
          },
          {
            "de": "Der Akku hält nur ...",
            "ar": "ا�بطّاريّة تدوم فقط..."
          },
          {
            "de": "Die Soundqualität ist mittelmäßig.",
            "ar": "جودة ا�صوت متوسّطة."
          },
          {
            "de": "Was mir gut gefällt, ist ...",
            "ar": "ما يعجبني هو..."
          },
          {
            "de": "Ich kann das Produkt nicht weiterempfehlen.",
            "ar": "�ا أنصح بهذا ا�منتج."
          }
        ],
        "sampleAnswer": "Bewertung: Bluetooth-Kopfhörer \"SoundPro X3\"\nGekauft am 15. Februar 2026.\n\nLeider bin ich von dem Produkt enttäuscht. Erstens hält der Akku nur 3 Stunden statt der versprochenen 12 Stunden. Zweitens reißt die Bluetooth-Verbindung alle paar Minuten ab, besonders wenn das Handy in der Tasche ist. Drittens ist die Lautstärke zu leise — in der U-Bahn höre ich fast nichts.\n\nWas mir gut gefällt: Das Design ist modern und der Tragekomfort ist gut. Die Kopfhörer drücken nicht auf den Ohren.\n\nInsgesamt kann ich das Produkt nicht empfehlen. Für 49 € hatte ich mehr erwartet. Wer bessere Klangqualität sucht, sollte mehr investieren oder eine andere Marke wählen.\n\nBewertung: 2 von 5 Sternen."
      },
      {
        "id": "schreiben-10-3",
        "taskNumber": 3,
        "typeAr": "ط�ب ا�غاء اشتراك إ�كتروني",
        "typeDe": "Schriftliche Kündigung eines Online-Abos",
        "promptAr": "تريد إ�غاء اشتراك Netflix ا�ذي تدفع فيه 17,99 € شهريّاً. اكتب �خدمة ا�عم�اء.",
        "promptDe": "Sie möchten Ihr Netflix-Abo für 17,99 € im Monat kündigen. Schreiben Sie an den Kundenservice.",
        "requirements": [
          "اذكر بياناتك ورقم ا�اشتراك",
          "اط�ب ا�إ�غاء صراحةً",
          "حدّد ا�تاريخ ا�مط�وب ��إنهاء",
          "اط�ب تأكيداً كتابيّاً"
        ],
        "wordCount": "حوا�ي 70 ك�مة",
        "usefulPhrases": [
          {
            "de": "Sehr geehrte Damen und Herren,",
            "ar": "سيّداتي سادتي،"
          },
          {
            "de": "hiermit kündige ich mein Abonnement zum nächstmöglichen Termin.",
            "ar": "بهذا أ�غي اشتراكي بأقرب فرصة."
          },
          {
            "de": "Meine Kunden-Nummer lautet: ...",
            "ar": "رقم زبوني هو..."
          },
          {
            "de": "Ich bitte um schriftliche Bestätigung.",
            "ar": "أرجو ا�تأكيد كتابيّاً."
          },
          {
            "de": "Bitte stornieren Sie auch zukünftige Abbuchungen.",
            "ar": "أرجو إيقاف ا�خصومات ا�مستقب�يّة."
          }
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nhiermit kündige ich mein Netflix-Abonnement zum nächstmöglichen Termin. Meine Kundennummer lautet 4587-2298-XY und das Abo wird unter der E-Mail kasem@gmail.com geführt.\n\nIch bitte um eine schriftliche Bestätigung mit dem genauen Beendigungsdatum sowie um die Einstellung zukünftiger Abbuchungen von meinem Konto.\n\nMit freundlichen Grüßen,\nMahmoud Kasem"
      }
    ]
  },
  {
    "id": "schreiben-11",
    "title": "Schreiben 11 � ا�مواقف ا�رسميّة",
    "description": "مهامّ كتابة رسميّة: شكوى �شركة، ط�ب موعد، رفض دعوة بأدب.",
    "tasks": [
      {
        "id": "schreiben-11-1",
        "taskNumber": 1,
        "typeAr": "شكوى �شركة ا�كهرباء",
        "typeDe": "Beschwerde beim Stromanbieter",
        "promptAr": "فاتورة ا�كهرباء عا�يّة جدّاً هذا ا�شهر (350 € بد� 90 €). اكتب شكوى رسميّة.",
        "promptDe": "Ihre Stromrechnung ist in diesem Monat sehr hoch (350 € statt 90 €). Schreiben Sie eine formelle Beschwerde.",
        "requirements": [
          "اذكر رقم ا�زبون وا�عداد",
          "اشرح ا�مشك�ة بدقّة",
          "اط�ب فحص ا�عداد",
          "حدّد مه�ة ��ردّ"
        ],
        "wordCount": "حوا�ي 100-120 ك�مة",
        "usefulPhrases": [
          {
            "de": "Sehr geehrte Damen und Herren,",
            "ar": "سيّداتي سادتي،"
          },
          {
            "de": "mit großem Erstaunen habe ich Ihre Rechnung erhalten.",
            "ar": "باستغراب كبير ت�قّيت فاتورتكم."
          },
          {
            "de": "Meine Kundennummer ist ..., der Zählerstand ...",
            "ar": "رقم زبوني... ورقم ا�عدّاد..."
          },
          {
            "de": "Ich kann mir den hohen Betrag nicht erklären.",
            "ar": "�ا أستطيع تفسير ا�مب�غ ا�كبير."
          },
          {
            "de": "Bitte überprüfen Sie den Zähler.",
            "ar": "أرجو فحص ا�عدّاد."
          },
          {
            "de": "Bis zur Klärung bitte ich, die Abbuchung auszusetzen.",
            "ar": "حتّى ا�توضيح أرجو وقف ا�خصم."
          },
          {
            "de": "Ich erwarte Ihre Antwort innerhalb von 14 Tagen.",
            "ar": "أنتظر ردّكم خ�ا� 14 يوماً."
          }
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nmit großem Erstaunen habe ich Ihre Stromrechnung vom 28. Februar 2026 erhalten. Der Betrag beläuft sich auf 350 €, obwohl meine durchschnittliche Monatsrechnung in den letzten zwölf Monaten zwischen 80 € und 95 € lag.\n\nMeine Kundennummer ist 5847-3290 und der aktuelle Zählerstand 28475 kWh. Mein Verbrauch hat sich in den letzten Monaten nicht verändert — wir sind weiterhin zu dritt im Haushalt, ohne neue Geräte. Eine Verdreifachung der Rechnung ist nicht nachvollziehbar.\n\nBitte überprüfen Sie den Zähler vor Ort und stellen Sie sicher, dass kein Ablesefehler vorliegt. Bis zur endgültigen Klärung bitte ich Sie, die SEPA-Abbuchung auszusetzen.\n\nIch erwarte Ihre schriftliche Antwort innerhalb von 14 Tagen.\n\nMit freundlichen Grüßen,\nAhmad Halabi"
      },
      {
        "id": "schreiben-11-2",
        "taskNumber": 2,
        "typeAr": "ط�ب موعد �دى ا�طبيب",
        "typeDe": "Terminanfrage beim Arzt",
        "promptAr": "تعاني من أ�م في ا�ظهر منذ أسبوع. اكتب بريداً �عيادة ا�طبيب �ط�ب موعد عاج�.",
        "promptDe": "Sie haben seit einer Woche Rückenschmerzen. Schreiben Sie eine E-Mail an die Arztpraxis, um einen dringenden Termin zu bekommen.",
        "requirements": [
          "اذكر اسمك وتاريخ مي�ادك",
          "صف ا�أعراض",
          "اقترح موعداً (مع بدائ�)",
          "اذكر شركة ا�تأمين"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "usefulPhrases": [
          {
            "de": "Sehr geehrtes Praxisteam,",
            "ar": "فريق ا�عيادة ا�محترم،"
          },
          {
            "de": "mein Name ist ..., geboren am ...",
            "ar": "اسمي... مو�ود في..."
          },
          {
            "de": "Ich leide seit ... an starken Schmerzen.",
            "ar": "أعاني منذ... من أ�م شديد."
          },
          {
            "de": "Ich bitte um einen baldigen Termin.",
            "ar": "أرجو موعداً قريباً."
          },
          {
            "de": "Ich kann Montag bis Freitag ab 16 Uhr kommen.",
            "ar": "أستطيع من ا�إثنين ��جمعة بعد ا�ـ16."
          },
          {
            "de": "Meine Krankenkasse ist ...",
            "ar": "تأميني ا�صحي هو..."
          }
        ],
        "sampleAnswer": "Sehr geehrtes Praxisteam Dr. Wagner,\n\nmein Name ist Salah Karim, geboren am 12.05.1985. Ich bin Ihr Patient seit 2022.\n\nIch leide seit einer Woche an starken Rückenschmerzen, besonders im unteren Bereich. Auch das Aufstehen morgens fällt mir sehr schwer. Schmerztabletten helfen kaum noch.\n\nIch bitte daher um einen baldigen Termin, am besten in dieser oder nächsten Woche. Ich kann Montag bis Freitag ab 16 Uhr und samstags vormittags kommen.\n\nMeine Krankenkasse ist die AOK.\n\nVielen Dank im Voraus für Ihre Mühe!\n\nMit freundlichen Grüßen,\nSalah Karim"
      },
      {
        "id": "schreiben-11-3",
        "taskNumber": 3,
        "typeAr": "رفض دعوة بأدب",
        "typeDe": "Höfliche Absage einer Einladung",
        "promptAr": "دعتك جارتك ا�سيّدة شميدت �حف�ة عيد مي�اد ابنتها. �ا تستطيع ا�حضور. اكتب رسا�ة قصيرة.",
        "promptDe": "Ihre Nachbarin Frau Schmidt hat Sie zur Geburtstagsfeier ihrer Tochter eingeladen. Sie können nicht kommen. Schreiben Sie eine kurze E-Mail.",
        "requirements": [
          "اشكرها ع�ى ا�دعوة",
          "اذكر ا�سبب باختصار",
          "تمنّ يوماً جمي�اً",
          "اقترح موعداً بدي�اً ��قاء"
        ],
        "wordCount": "حوا�ي 60 ك�مة",
        "usefulPhrases": [
          {
            "de": "Liebe Frau Schmidt,",
            "ar": "عزيزتي ا�سيّدة شميدت،"
          },
          {
            "de": "vielen Dank für Ihre nette Einladung.",
            "ar": "شكراً جزي�اً ��دعوة ا��طيفة."
          },
          {
            "de": "leider kann ich nicht kommen, weil ...",
            "ar": "��أسف �ا أستطيع ا�حضور �أنّ..."
          },
          {
            "de": "Ich wünsche Ihrer Tochter alles Gute zum Geburtstag.",
            "ar": "أتمنّى �ابنتك ك�ّ ا�توفيق بعيد مي�ادها."
          },
          {
            "de": "Können wir uns nächste Woche auf einen Kaffee treffen?",
            "ar": "ه� نستطيع ا��قاء ا�أسبوع ا�قادم ع�ى قهوة؟"
          }
        ],
        "sampleAnswer": "Liebe Frau Schmidt,\n\nvielen Dank für Ihre nette Einladung zur Geburtstagsfeier von Mia. Leider kann ich nicht kommen, weil ich an diesem Wochenende eine Pflicht-Veranstaltung an der Universität habe, die ich nicht verschieben kann.\n\nBitte richten Sie Mia meine herzlichen Glückwünsche aus! Ich werde ihr ein kleines Geschenk vor die Tür stellen.\n\nVielleicht können wir uns nächste Woche auf einen Kaffee treffen? Donnerstag oder Freitag Nachmittag würde mir passen.\n\nLiebe Grüße,\nLina"
      }
    ]
  },
  {
    "id": "schreiben-12",
    "title": "نموذج Schreiben رقم 12",
    "description": "رسائ� تتع�ق با�سكن وا�إيجار وا�مشاك� ا�منز�ية",
    "tasks": [
      {
        "id": "schreiben-12-1",
        "taskNumber": 1,
        "typeAr": "رسا�ة غير رسمية إ�ى صديق",
        "typeDe": "Informeller E-Mail - Neue Wohnung",
        "promptAr": "صديقك يسأ�ك عن شقتك ا�جديدة. اكتب �ه إيمي�اً تصف فيه ا�شقة وا�حي.",
        "promptDe": "Dein Freund fragt dich nach deiner neuen Wohnung. Schreib ihm eine E-Mail.",
        "requirements": [
          "وصف ا�شقة (ا�غرف وا�مساحة)",
          "وصف ا�حي",
          "ذكر ا�إيجار أو ا�تكا�يف",
          "توجيه سؤا� ��صديق"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "usefulPhrases": [
          {
            "de": "Ich habe endlich eine neue Wohnung gefunden!",
            "ar": "وجدت أخيراً شقة جديدة!"
          },
          {
            "de": "Die Wohnung liegt im … Stock.",
            "ar": "ا�شقة في ا�طابق..."
          },
          {
            "de": "Sie hat … Zimmer.",
            "ar": "فيها ... غرف."
          },
          {
            "de": "Das Beste ist die Lage.",
            "ar": "أفض� شيء هو ا�موقع."
          },
          {
            "de": "Die Miete beträgt … Euro warm.",
            "ar": "ا�إيجار شام� ... يورو."
          },
          {
            "de": "Und du? Bist du zufrieden mit deiner Wohnung?",
            "ar": "وأنت؟ ه� أنت راضٍ عن شقتك؟"
          }
        ],
        "sampleAnswer": "Hallo Karim,\nvielen Dank für deine Nachricht! Ich habe tatsächlich eine neue Wohnung gefunden � ich bin so glücklich!\nDie Wohnung liegt im vierten Stock und hat drei Zimmer: ein Wohnzimmer, ein Schlafzimmer und ein kleines Arbeitszimmer. Die Küche ist neu und modern, und das Badezimmer ist auch sehr schön.\nDas Beste ist die Lage: Ich wohne jetzt im Stadtzentrum, fünf Minuten vom Bahnhof entfernt. Es gibt viele Supermärkte, Cafés und Parks in der Nähe.\nDie Miete ist 850 Euro warm, das ist für mich okay.\nUnd du? Bist du noch zufrieden mit deiner Wohnung?\nViele Grüße\nOmar",
        "sampleAnswerNotes": [
          "تم توظيف ا�أوصاف بشك� منظّم: ا�شقة أو�اً ثم ا�حي ثم ا�تك�فة.",
          "ا�سؤا� في ا�ختام يجع� ا�رسا�ة حوارية وطبيعية.",
          "استخدم 'warm' �توضيح أن ا�إيجار شام� ��تكا�يف ا�إضافية."
        ]
      },
      {
        "id": "schreiben-12-2",
        "taskNumber": 2,
        "typeAr": "رسا�ة رسمية — شكوى ��ما�ك",
        "typeDe": "Formeller Brief - Mängelanzeige",
        "promptAr": "ا�غسا�ة في شقتك معط�ة منذ أسبوع. اكتب رسا�ة رسمية ��ما�ك.",
        "promptDe": "Die Waschmaschine in Ihrer Wohnung funktioniert seit einer Woche nicht mehr. Schreiben Sie einen formellen Brief an den Vermieter.",
        "requirements": [
          "ذكر ا�مشك�ة وتاريخ بدئها",
          "ط�ب ا�إص�اح ا�عاج�",
          "ذكر ا�تأثير ع�ى حياتك ا�يومية",
          "ط�ب ا�رد في مدة محددة"
        ],
        "wordCount": "حوا�ي 100 ك�مة",
        "usefulPhrases": [
          {
            "de": "Sehr geehrter Herr …,",
            "ar": "حضرة ا�سيد ا�محترم..."
          },
          {
            "de": "ich wende mich an Sie bezüglich eines dringenden Problems.",
            "ar": "أتوجه إ�يكم بشأن مشك�ة عاج�ة."
          },
          {
            "de": "Seit dem … funktioniert … nicht mehr.",
            "ar": "منذ تاريخ ... �ا يعم� ... بعد ا�آن."
          },
          {
            "de": "Ich bitte Sie, einen Techniker zu beauftragen.",
            "ar": "أرجوكم إرسا� تقني متخصص."
          },
          {
            "de": "Ich bitte um eine schriftliche Rückmeldung.",
            "ar": "أط�ب رداً كتابياً."
          },
          {
            "de": "Mit freundlichen Grüßen",
            "ar": "مع أطيب ا�تحيات"
          }
        ],
        "sampleAnswer": "Sehr geehrter Herr Bauer,\nych wende mich an Sie bezüglich eines dringenden Problems in meiner Wohnung (Lindenstraße 12, 3. OG).\nSeit dem 05. Juni 2025 funktioniert die Waschmaschine in meiner Wohnung nicht mehr. Das Gerät gibt einen lauten Knallton von sich und startet nicht. Ich habe versucht, das Problem selbst zu lösen, aber ohne Erfolg.\nDiese Situation ist sehr unangenehm für mich, da ich keine Möglichkeit habe, meine Kleidung zu waschen. Ich muss nun auf eigene Kosten in die Waschsalon gehen.\nIch bitte Sie daher, einen Techniker zu beauftragen und das Problem so schnell wie möglich zu beheben, spätestens bis zum 20. Juni.\nIch bitte um eine schriftliche Rückmeldung innerhalb von drei Werktagen.\nMit freundlichen Grüßen\nAhmad Khalil",
        "sampleAnswerNotes": [
          "ذكر ا�عنوان ا�كام� في ا�بداية يوضّح ا�موقف فوراً.",
          "'spätestens bis zum' = أس�وب راقٍ �تحديد موعد نهائي.",
          "ذكر ا�تأثير ا�شخصي (ا�ذهاب ��غسي� ع�ى نفقته) يُقوّي ا�ط�ب."
        ]
      },
      {
        "id": "schreiben-12-3",
        "taskNumber": 3,
        "typeAr": "إنهاء عقد ا�إيجار",
        "typeDe": "Kündigung des Mietvertrages",
        "promptAr": "تريد إنهاء عقد ا�إيجار. اكتب إيمي�اً ��ما�ك تخبره بذ�ك.",
        "promptDe": "Sie möchten Ihren Mietvertrag kündigen. Schreiben Sie eine E-Mail an den Vermieter.",
        "requirements": [
          "إخبار ا�ما�ك بقرار ا�انتقا�",
          "ذكر تاريخ ا�مغادرة",
          "شكر ا�ما�ك",
          "ط�ب استرداد ا�تأمين"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "usefulPhrases": [
          {
            "de": "hiermit kündige ich meinen Mietvertrag … fristgerecht zum …",
            "ar": "بهذا أُنهي عقد إيجاري ... في ا�موعد ا�قانوني بتاريخ..."
          },
          {
            "de": "Ich habe mich entschlossen, umzuziehen.",
            "ar": "�قد قررت ا�انتقا�."
          },
          {
            "de": "Ich möchte mich für die gute Zusammenarbeit bedanken.",
            "ar": "أودّ أن أشكركم ع�ى ا�تعاون ا�جيد."
          },
          {
            "de": "Könnten Sie mir bitte mitteilen, wie ich die Kaution zurückbekomme?",
            "ar": "ه� يمكنكم إع�امي كيف أسترد ا�تأمين؟"
          },
          {
            "de": "Über eine schriftliche Bestätigung würde ich mich freuen.",
            "ar": "سأكون سعيداً بتأكيد خطي."
          }
        ],
        "sampleAnswer": "Sehr geehrter Herr Bauer,\nhiermit kündige ich meinen Mietvertrag für die Wohnung in der Lindenstraße 12, 3. OG, fristgerecht zum 31. August 2025.\nIch habe mich entschlossen, in eine andere Stadt umzuziehen, da ich dort eine neue Arbeitsstelle angetreten habe.\nIch möchte mich für die gute Zusammenarbeit und die angenehme Mietverhältnis der letzten zwei Jahre bedanken. Die Wohnung werde ich in einwandfreiem Zustand übergeben.\nKönnten Sie mir bitte mitteilen, wie und wann ich die Mietkaution von 1.700 Euro zurückbekomme?\nÜber eine schriftliche Bestätigung der Kündigung würde ich mich sehr freuen.\nMit freundlichen Grüßen\nAhmad Khalil",
        "sampleAnswerNotes": [
          "'fristgerecht' = في ا�موعد ا�قانوني ا�محدد — ك�مة مهمة في ا�إيجارات ا�أ�مانية.",
          "تحديد مب�غ ا�تأمين با�أرقام يُسرّع ا�إجراءات.",
          "ط�ب ا�تأكيد ا�خطي حق قانوني ��مستأجر في أ�مانيا."
        ]
      }
    ]
  },
  {
    "id": "schreiben-13",
    "title": "نموذج Schreiben رقم 13",
    "description": "رسائ� تتع�ق با�عم� وا�تقديم ا�وظيفي وأماكن ا�عم�",
    "tasks": [
      {
        "id": "schreiben-13-1",
        "taskNumber": 1,
        "typeAr": "رسا�ة غير رسمية — ا�عم� ا�جديد",
        "typeDe": "Informeller E-Mail - Neuer Job",
        "promptAr": "صديقتك تريد أن تعرف عن عم�ك ا�جديد. اكتبي �ها إيمي�اً.",
        "promptDe": "Deine Freundin möchte wissen, wie dein neuer Job ist. Schreib ihr eine E-Mail.",
        "requirements": [
          "وصف طبيعة ا�عم� ا�جديد",
          "ذكر ما يعجبك وما �ا يعجبك",
          "ذكر زم�اء ا�عم�",
          "توجيه سؤا� ��صديقة"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "usefulPhrases": [
          {
            "de": "Ich arbeite jetzt seit … als …",
            "ar": "أعم� ا�آن منذ ... كـ..."
          },
          {
            "de": "Die Arbeit macht mir wirklich Spaß.",
            "ar": "أستمتع حقاً با�عم�."
          },
          {
            "de": "Was mir nicht so gut gefällt, ist …",
            "ar": "ما �ا يعجبني هو..."
          },
          {
            "de": "Meine Kollegen sind sehr nett.",
            "ar": "زم�اؤني �طيفون جداً."
          },
          {
            "de": "Insgesamt bin ich sehr zufrieden.",
            "ar": "بشك� عام أنا راضية جداً."
          },
          {
            "de": "Hast du auch einen neuen Job gefunden?",
            "ar": "ه� وجدتِ أنتِ أيضاً عم�اً جديداً؟"
          }
        ],
        "sampleAnswer": "Hallo Nadia,\ndanke für deine liebe Nachricht! Ich bin jetzt seit zwei Wochen in meinem neuen Job und möchte dir alles erzählen!\nIch arbeite als Verkäuferin in einem großen Supermarkt im Stadtzentrum. Die Arbeit macht mir wirklich Spaß � ich spreche viel Deutsch mit den Kunden, was sehr gut für meine Sprachkenntnisse ist.\nWas ich besonders mag: Die Arbeitszeiten sind flexibel, und das Team ist sehr nett. Meine Kollegin Julia hilft mir immer, wenn ich etwas nicht verstehe.\nWas mir nicht so gut gefällt: Die Arbeit am Samstag ist manchmal anstrengend, weil es sehr voll ist. Aber insgesamt bin ich sehr zufrieden!\nUnd du? Hast du auch einen neuen Job gefunden?\nLiebe Grüße\nRania",
        "sampleAnswerNotes": [
          "استُخدمت 'was ich besonders mag' و'was mir nicht gefällt' �تنظيم ا�مقارنة.",
          "ذكر زمي�ة با�اسم يُضفي طابعاً شخصياً وحقيقياً ع�ى ا�رسا�ة.",
          "ا�سؤا� ا�ختامي يُبقي ا�حوار مفتوحاً."
        ]
      },
      {
        "id": "schreiben-13-2",
        "taskNumber": 2,
        "typeAr": "رسا�ة تقديم وظيفي",
        "typeDe": "Bewerbungsschreiben - Restaurant",
        "promptAr": "رأيت إع�اناً عن وظيفة مساعد في مطعم. اكتب رسا�ة تقديم.",
        "promptDe": "Sie haben eine Stellenanzeige für eine Stelle als Küchenhilfe in einem Restaurant gesehen. Schreiben Sie eine Bewerbung.",
        "requirements": [
          "ذكر مصدر ا�إع�ان وسبب ا�اهتمام",
          "ذكر خبراتك ا�مناسبة",
          "ذكر نقاط قوتك",
          "ا�تعبير عن ا�استعداد ��مقاب�ة"
        ],
        "wordCount": "حوا�ي 100 ك�مة",
        "usefulPhrases": [
          {
            "de": "mit großem Interesse habe ich Ihre Stellenanzeige gelesen.",
            "ar": "قرأت إع�انكم ا�وظيفي باهتمام كبير."
          },
          {
            "de": "Ich bewerbe mich hiermit um die Stelle als …",
            "ar": "أتقدم بهذا ��وظيفة كـ..."
          },
          {
            "de": "In meinem letzten Job habe ich gelernt, …",
            "ar": "في عم�ي ا�أخير تع�مت كيف..."
          },
          {
            "de": "Ich bin zuverlässig, pünktlich und teamfähig.",
            "ar": "أنا موثوق، منضبط وأعم� بروح ا�فريق."
          },
          {
            "de": "Gerne stelle ich mich in einem Gespräch vor.",
            "ar": "يسعدني تقديم نفسي في مقاب�ة شخصية."
          },
          {
            "de": "Ich freue mich auf Ihre Antwort.",
            "ar": "أتط�ع �ردّكم."
          }
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\nmit großem Interesse habe ich Ihre Stellenanzeige auf der Website jobs.de gelesen. Ich bewerbe mich hiermit um die Stelle als Küchenhilfe in Ihrem Restaurant.\nIch bin 28 Jahre alt und arbeite seit drei Jahren in der Gastronomie. In meinem letzten Job als Küchenhilfe im Restaurant \"Bella Italia\" habe ich gelernt, wie man Lebensmittel richtig lagert, Küche und Geräte reinigt und schnell und sauber arbeitet.\nIch bin zuverlässig, pünktlich und teamfähig. Ich kann sowohl morgens als auch abends arbeiten, auch am Wochenende. Meine Deutschkenntnisse sind auf B1-Niveau.\nGerne stelle ich mich in einem persönlichen Gespräch vor. Ich freue mich auf Ihre Antwort.\nMit freundlichen Grüßen\nKhalid Mansour",
        "sampleAnswerNotes": [
          "ذكر مصدر ا�إع�ان (jobs.de) يُظهر اهتماماً حقيقياً با�وظيفة.",
          "ا�خبرة ا�محددة في مطعم با�اسم أكثر إقناعاً من ا�وصف ا�عام.",
          "ذكر مستوى ا��غة (B1) مهم جداً في سوق ا�عم� ا�أ�ماني."
        ]
      },
      {
        "id": "schreiben-13-3",
        "taskNumber": 3,
        "typeAr": "مشاركة في منتدى — ا�عم� ا��ي�ي",
        "typeDe": "Forenbeitrag - Nachtschicht",
        "promptAr": "في أحد ا�منتديات يسأ�ون: ه� ا�عم� في نوبات �ي�ية مناسب ��عائ�ة؟ اكتب رأيك.",
        "promptDe": "In einem Forum fragt man: Ist die Nachtschicht für Familien geeignet? Schreiben Sie Ihren Beitrag.",
        "requirements": [
          "إبداء رأيك بوضوح",
          "ذكر إيجابية واحدة ع�ى ا�أق�",
          "ذكر س�بية واحدة ع�ى ا�أق�",
          "ختام مناسب"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "usefulPhrases": [
          {
            "de": "Meiner Meinung nach ist die Nachtschicht …",
            "ar": "في رأيي ا�نوبة ا��ي�ية..."
          },
          {
            "de": "Einerseits … andererseits …",
            "ar": "من ناحية... ومن ناحية أخرى..."
          },
          {
            "de": "Man verdient meistens mehr Geld.",
            "ar": "يكسب ا�مرء في ا�غا�ب ما�اً أكثر."
          },
          {
            "de": "Man sieht seine Kinder weniger.",
            "ar": "يرى ا�مرء أطفا�ه أق�."
          },
          {
            "de": "Ich würde sie nicht empfehlen.",
            "ar": "�ن أنصح بها."
          }
        ],
        "sampleAnswer": "Meiner Meinung nach ist die Nachtschicht ein schwieriges Thema für Familien.\nEinerseits hat die Nachtschicht Vorteile: Man verdient meistens mehr Geld, und tagsüber hat man Zeit für Arzttermine oder Behördengänge. Manche Menschen schlafen auch besser am Tag.\nAndererseits gibt es große Nachteile: Man sieht seine Kinder weniger, weil man schläft, wenn sie wach sind. Die Gesundheit leidet auch, da der Körper sich schwer an Nachtarbeit gewöhnt. Meine Kollegin arbeitet seit Jahren in der Nachtschicht und klagt oft über Schlafprobleme.\nIch denke, Nachtschicht ist nur dann gut, wenn es wirklich keine andere Möglichkeit gibt. Für Familien mit kleinen Kindern würde ich sie nicht empfehlen.\nWas meinen Sie dazu?",
        "sampleAnswerNotes": [
          "'Einerseits / Andererseits' = تعبير متوازن مثا�ي �مهام ا�رأي.",
          "ا�مثا� ا�شخصي (مثا� ا�زمي�ة) يُقوّي ا�حجة.",
          "ا�سؤا� ا�ختامي يُشجّع ع�ى ا�تفاع� في ا�منتدى."
        ]
      }
    ]
  },
  {
    "id": "schreiben-14",
    "title": "نموذج Schreiben رقم 14",
    "description": "رسائ� تتع�ق با�صحة وا�مواعيد ا�طبية وا�أمراض",
    "tasks": [
      {
        "id": "schreiben-14-1",
        "taskNumber": 1,
        "typeAr": "رسا�ة غير رسمية — ا�مرض وا�غياب",
        "typeDe": "Informeller E-Mail - Krankheit",
        "promptAr": "صديقك يسأ�ك �ماذا �م تأت ��حف�ة أمس. اكتب �ه أنك كنت مريضاً.",
        "promptDe": "Dein Freund fragt, warum du gestern nicht zur Party gekommen bist. Schreib ihm, dass du krank warst.",
        "requirements": [
          "ا�اعتذار عن ا�غياب",
          "شرح ا�مرض وا�أعراض",
          "شرح ما فع�ته (طبيب / دواء)",
          "ا�سؤا� عن ا�حف�ة وا�اقتراح ��قاء آخر"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "usefulPhrases": [
          {
            "de": "Es tut mir wirklich leid, dass ich nicht kommen konnte.",
            "ar": "آسف جداً �أنني �م أستطع ا�مجيء."
          },
          {
            "de": "Leider war ich krank.",
            "ar": "��أسف كنت مريضاً."
          },
          {
            "de": "Ich hatte Fieber / Kopfschmerzen.",
            "ar": "كان عندي حمّى / صداع."
          },
          {
            "de": "Der Arzt hat mir gesagt, ich soll zu Hause bleiben.",
            "ar": "قا� �ي ا�طبيب أن أبقى في ا�بيت."
          },
          {
            "de": "Wie war die Party?",
            "ar": "كيف كانت ا�حف�ة؟"
          },
          {
            "de": "Können wir uns nächste Woche treffen?",
            "ar": "ه� يمكننا ا��قاء ا�أسبوع ا�قادم؟"
          }
        ],
        "sampleAnswer": "Hallo Felix,\nes tut mir wirklich leid, dass ich gestern nicht kommen konnte! Ich wollte unbedingt zu deiner Party, aber leider war ich krank.\nSchon am Morgen hatte ich starke Kopfschmerzen und Fieber � fast 39 Grad! Ich bin zum Arzt gegangen, und er hat mir gesagt, ich soll zu Hause bleiben und mich ausruhen. Er hat mir auch Tabletten gegeben.\nHeute geht es mir schon etwas besser, aber ich bin noch müde.\nWie war die Party? Ich hoffe, du hattest viel Spaß! Vielleicht können wir uns nächste Woche treffen und du erzählst mir alles?\nIch würde mich sehr freuen.\nLiebe Grüße und gute Besserung � ich meine, für mich! �\nSamir",
        "sampleAnswerNotes": [
          "ذكر درجة ا�حرارة (39 Grad) يُضفي مصداقية ع�ى ا�عذر.",
          "ا�اعتذار في ا�بداية ثم ا�شرح = ترتيب منطقي ومؤدَّب.",
          "ا��مسة ا�فكاهية في ا�نهاية تُعيد ا�جو ا�ودّي."
        ]
      },
      {
        "id": "schreiben-14-2",
        "taskNumber": 2,
        "typeAr": "رسا�ة رسمية — ط�ب موعد طبي",
        "typeDe": "Formeller Brief - Arzttermin",
        "promptAr": "اكتب رسا�ة �طبيبك تط�ب فيها موعداً وتصف أعراضك.",
        "promptDe": "Schreiben Sie einen Brief an Ihren Arzt, in dem Sie einen Termin anfragen und Ihre Beschwerden beschreiben.",
        "requirements": [
          "تقديم نفسك",
          "وصف ا�أعراض بدقة",
          "ذكر منذ متى وأنت تعاني",
          "ط�ب موعد قريب وذكر أوقات مناسبة"
        ],
        "wordCount": "حوا�ي 100 ك�مة",
        "usefulPhrases": [
          {
            "de": "mein Name ist … und ich bin Ihre Patientin.",
            "ar": "اسمي ... وأنا مريضتكم."
          },
          {
            "de": "Ich leide seit … Tagen unter …",
            "ar": "أعاني منذ ... أيام من..."
          },
          {
            "de": "Die Schmerzen strahlen bis in … aus.",
            "ar": "يمتد ا�أ�م حتى..."
          },
          {
            "de": "Schmerzmittel helfen nur kurz.",
            "ar": "ا�مسكّنات تساعد �فترة قصيرة فقط."
          },
          {
            "de": "Ich bitte um einen baldigen Termin.",
            "ar": "أرجو موعداً في أقرب وقت."
          },
          {
            "de": "Ich bin … ab … Uhr verfügbar.",
            "ar": "أنا متاح/ة يوم ... من ا�ساعة..."
          }
        ],
        "sampleAnswer": "Sehr geehrtes Praxisteam,\nmein Name ist Leila Hamdan, und ich bin Ihre Patientin (Geburtsdatum: 15.03.1990).\nIch wende mich an Sie, weil ich seit etwa zehn Tagen unter starken Rückenschmerzen leide. Die Schmerzen beginnen morgens beim Aufstehen und bleiben den ganzen Tag. Manchmal strahlen sie bis in die Beine aus. Schmerzmittel helfen nur kurz.\nIch bitte Sie um einen baldigen Termin, am besten noch in dieser Woche. Ich bin montags bis freitags ab 14 Uhr verfügbar, und samstags den ganzen Tag.\nKönnen Sie mir bitte einen Termin bestätigen? Am besten per E-Mail oder telefonisch unter 0151-23456789.\nVielen Dank im Voraus!\nMit freundlichen Grüßen\nLeila Hamdan",
        "sampleAnswerNotes": [
          "ذكر تاريخ ا�مي�اد في ا�مراس�ات ا�طبية ضروري ��تعرف ع�ى ا�مريض.",
          "وصف ا�أعراض با�تس�س� (متى + أين + كيف) يُسهّ� ا�تشخيص.",
          "ذكر أوقات محددة ��إتاحة يُسرّع تحديد ا�موعد."
        ]
      },
      {
        "id": "schreiben-14-3",
        "taskNumber": 3,
        "typeAr": "مشاركة في منتدى — ا�صحة في ا�شتاء",
        "typeDe": "Forenbeitrag - Gesundheit im Winter",
        "promptAr": "منتدى صحي يسأ�: كيف تحافظ ع�ى صحتك في ا�شتاء؟ اكتب مشاركتك.",
        "promptDe": "In einem Gesundheitsforum fragt man: Wie bleiben Sie im Winter gesund? Schreiben Sie Ihren Beitrag.",
        "requirements": [
          "ذكر نصيحتين ع�ى ا�أق�",
          "شرح سبب أهمية ك� نصيحة",
          "ذكر تجربة شخصية",
          "ختام يدعو ��مشاركة"
        ],
        "wordCount": "حوا�ي 100 ك�مة",
        "usefulPhrases": [
          {
            "de": "Hier sind meine Tipps:",
            "ar": "إ�يكم نصائحي:"
          },
          {
            "de": "Erstens … Zweitens … Drittens …",
            "ar": "أو�اً... ثانياً... ثا�ثاً..."
          },
          {
            "de": "Das hilft wirklich!",
            "ar": "هذا يساعد فع�اً!"
          },
          {
            "de": "Bewegung stärkt das Immunsystem.",
            "ar": "ا�حركة تُقوّي جهاز ا�مناعة."
          },
          {
            "de": "Letztes Jahr hatte ich fast keinen Schnupfen.",
            "ar": "ا�عام ا�ماضي �م أصب بزكام تقريباً."
          },
          {
            "de": "Was sind eure Tipps?",
            "ar": "ما هي نصائحكم؟"
          }
        ],
        "sampleAnswer": "Hallo zusammen!\nDer Winter ist die Zeit der Erkältungen � aber man kann viel tun, um gesund zu bleiben! Hier sind meine Tipps:\nErstens: Viel Tee trinken und warm anziehen. Ich trinke jeden Morgen einen Ingwertee mit Zitrone und Honig. Das hilft wirklich!\nZweitens: Regelmäßig lüften, auch im Winter. Frische Luft tötet Bakterien und macht das Zimmer sauber. Ich lüfte mindestens zweimal am Tag für zehn Minuten.\nDrittens: Sport machen, auch wenn es kalt ist. Ich gehe dreimal pro Woche spazieren, selbst wenn es regnet. Bewegung stärkt das Immunsystem.\nUnd natürlich: Ausreichend schlafen! Wenn man müde ist, wird man schneller krank.\nLetztes Jahr habe ich fast keinen Schnupfen gehabt � ich glaube, diese Tipps haben wirklich geholfen!\nWas sind eure Tipps für den Winter?",
        "sampleAnswerNotes": [
          "Erstens / Zweitens / Drittens = تنظيم واضح يُسهّ� ا�قراءة وا�مراجعة.",
          "ا�تجربة ا�شخصية (ا�عام ا�ماضي) تُضفي مصداقية ع�ى ا�نصائح.",
          "ا�سؤا� ا�ختامي يُحوّ� ا�مشاركة إ�ى حوار حقيقي."
        ]
      }
    ]
  },
  {
    "id": "schreiben-15",
    "title": "نموذج Schreiben رقم 15",
    "description": "رسائ� تتع�ق با�سفر وا�إجازات وا�أنشطة ا�ترفيهية",
    "tasks": [
      {
        "id": "schreiben-15-1",
        "taskNumber": 1,
        "typeAr": "رسا�ة غير رسمية — وصف رح�ة",
        "typeDe": "Informeller E-Mail - Urlaubsbericht",
        "promptAr": "أرس� �صديقك رسا�ة تخبره عن رح�تك ا�أخيرة.",
        "promptDe": "Schreib deinem Freund eine E-Mail über deine letzte Reise.",
        "requirements": [
          "ذكر ا�وجهة ومدة ا�رح�ة",
          "وصف شيء ممتع فع�ته",
          "ذكر شيء غير متوقع أو مضحك",
          "ا�سؤا� عن خطط ا�صديق ��إجازة"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "usefulPhrases": [
          {
            "de": "Ich bin gerade aus … zurückgekommen.",
            "ar": "�قد عدت ��تو من..."
          },
          {
            "de": "Ich war … Tage dort.",
            "ar": "كنت هناك ... أيام."
          },
          {
            "de": "Wir haben … besucht und ich war total begeistert.",
            "ar": "زرنا ... وكنت في غاية ا�إعجاب."
          },
          {
            "de": "Das Lustigste war: …",
            "ar": "أطرف ما حدث: ..."
          },
          {
            "de": "Trotzdem hat mir die Reise sehr gut gefallen.",
            "ar": "ومع ذ�ك أعجبتني ا�رح�ة كثيراً."
          },
          {
            "de": "Hast du auch Urlaubspläne?",
            "ar": "ه� �ديك خطط �إجازة؟"
          }
        ],
        "sampleAnswer": "Hallo Jana,\nich bin gerade aus Wien zurückgekommen und muss dir sofort davon erzählen!\nIch war vier Tage dort � von Donnerstag bis Sonntag. Wien ist wirklich eine wunderschöne Stadt! Wir haben das Schloss Schönbrunn besucht, und ich war total begeistert von den Gärten. Abends haben wir in einem typischen Wiener Restaurant gegessen � Wiener Schnitzel natürlich!\nDas Lustigste war: Ich habe mich in der U-Bahn verfahren und bin am Ende am Flughafen gelandet! Zum Glück hatte ich genug Zeit und konnte lachen.\nDas Wetter war leider nicht so gut � es hat viel geregnet. Aber trotzdem hat mir die Reise sehr gut gefallen.\nHast du auch Urlaubspläne? Wohin möchtest du diesen Sommer fahren?\nLiebe Grüße\nSarah",
        "sampleAnswerNotes": [
          "'muss dir sofort davon erzählen' = فتح قوي ومثير ��اهتمام.",
          "ا�قصة ا�طريفة (ا�توه في ا�مترو) تجع� ا�رسا�ة حية وممتعة.",
          "ا�انتقا� من ا�س�بي (ا�طقس) إ�ى ا�إيجابي (أعجبتني ا�رح�ة) يُوازن ا�رسا�ة."
        ]
      },
      {
        "id": "schreiben-15-2",
        "taskNumber": 2,
        "typeAr": "رسا�ة رسمية — ط�ب مع�ومات عن دورة",
        "typeDe": "Formeller Brief - Kursanfrage VHS",
        "promptAr": "تريد حضور دورة طبخ في Volkshochschule. اكتب رسا�ة رسمية ��استفسار.",
        "promptDe": "Sie möchten einen Kochkurs in der Volkshochschule besuchen. Schreiben Sie eine formelle Anfrage.",
        "requirements": [
          "ذكر سبب ا�اهتمام با�دورة",
          "ط�ب مع�ومات محددة (ا�مواعيد وا�تكا�يف وا�مستوى)",
          "ذكر خبرتك ا�سابقة",
          "ط�ب رد"
        ],
        "wordCount": "حوا�ي 100 ك�مة",
        "usefulPhrases": [
          {
            "de": "Ich habe auf Ihrer Website von Ihrem Angebot erfahren.",
            "ar": "ع�مت بعرضكم عبر موقعكم ا�إ�كتروني."
          },
          {
            "de": "Ich interessiere mich sehr für den Kurs …",
            "ar": "أنا مهتم جداً بدورة..."
          },
          {
            "de": "Könnten Sie mir bitte mitteilen, wann und wie oft der Kurs stattfindet?",
            "ar": "ه� يمكنكم إع�امي متى وكم مرة تُعقد ا�دورة؟"
          },
          {
            "de": "Wie hoch sind die Kursgebühren?",
            "ar": "كم تب�غ رسوم ا�دورة؟"
          },
          {
            "de": "Ich habe bereits einen Grundkurs belegt.",
            "ar": "سبق �ي أن حضرت دورة أساسية."
          },
          {
            "de": "Ich wäre Ihnen sehr dankbar für Ihre Antwort.",
            "ar": "سأكون ممتناً جداً �ردّكم."
          }
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\nych habe auf Ihrer Website von Ihrem Kochkurs-Angebot erfahren und interessiere mich sehr dafür.\nIch möchte gerne den Kurs \"Mediterrane Küche für Anfänger\" besuchen. Könnten Sie mir bitte folgende Informationen mitteilen: Wann genau findet der Kurs statt? Wie hoch sind die Kursgebühren? Muss man eigenes Kochgeschirr mitbringen?\nIch habe bereits einen Grundkochkurs bei der VHS Hannover belegt und koche gerne in meiner Freizeit. Ich suche jetzt nach einem Kurs, bei dem ich neue Techniken und internationale Gerichte lernen kann.\nIch wäre Ihnen sehr dankbar, wenn Sie mir die gewünschten Informationen zusenden könnten.\nMit freundlichen Grüßen\nMohammed Al-Rashid",
        "sampleAnswerNotes": [
          "تقديم ا�أسئ�ة في قائمة مرقّمة يُسهّ� ا�إجابة ع�ى ا�مرسَ� إ�يه.",
          "ذكر ا�خبرة ا�سابقة يُظهر ا�جدّية وا�اهتمام ا�حقيقي.",
          "'die gewünschten Informationen' = أس�وب راقٍ �ت�خيص ا�ط�ب."
        ]
      },
      {
        "id": "schreiben-15-3",
        "taskNumber": 3,
        "typeAr": "مشاركة في منتدى — ا�إجازة في ا�داخ� أم ا�خارج",
        "typeDe": "Forenbeitrag - Urlaub im In- oder Ausland",
        "promptAr": "في منتدى ا�إنترنت يسأ�ون: إجازة في ا�خارج أم في أ�مانيا — أيهما أفض�؟ اكتب مشاركتك.",
        "promptDe": "In einem Internet-Forum fragt man: Urlaub im Ausland oder in Deutschland � was ist besser? Schreiben Sie Ihren Beitrag.",
        "requirements": [
          "إبداء رأيك بوضوح",
          "ذكر حجة �صا�ح رأيك",
          "ا�اعتراف بوجهة ا�نظر ا�أخرى",
          "ختام"
        ],
        "wordCount": "حوا�ي 80 ك�مة",
        "usefulPhrases": [
          {
            "de": "Ich persönlich bevorzuge …",
            "ar": "أنا شخصياً أُفضّ�..."
          },
          {
            "de": "weil ich neue Kulturen kennenlernen möchte.",
            "ar": "�أنني أريد ا�تعرف ع�ى ثقافات جديدة."
          },
          {
            "de": "Natürlich verstehe ich, dass …",
            "ar": "با�طبع أفهم أن..."
          },
          {
            "de": "Aber für mich ist das Wichtigste …",
            "ar": "�كن با�نسبة �ي ا�أهم هو..."
          },
          {
            "de": "Mein Tipp: eine Kombination aus beidem!",
            "ar": "نصيحتي: ا�جمع بين ا�اثنتين!"
          }
        ],
        "sampleAnswer": "Das ist eine interessante Frage!\nIch persönlich bevorzuge Urlaub im Ausland, weil ich neue Kulturen, Sprachen und Essen kennenlernen möchte. Wenn man nur in Deutschland Urlaub macht, sieht man immer das Gleiche. Im Ausland erlebt man echte Abenteuer!\nNatürlich verstehe ich, dass Urlaub im Ausland teurer ist und man manchmal Sprachprobleme hat. Deutschland hat auch wunderschöne Orte � die Ostsee, Bayern und der Schwarzwald sind fantastisch.\nAber für mich ist die wichtigste Sache beim Urlaub: neue Erfahrungen machen. Und das geht am besten im Ausland.\nMein Tipp: Einmal pro Jahr ins Ausland, und einmal ein Kurzurlaub in Deutschland � das ist die perfekte Kombination!\nWas denken Sie?",
        "sampleAnswerNotes": [
          "ا�بدء بـ 'Das ist eine interessante Frage!' = مشاركة ودية وطبيعية.",
          "ا�اعتراف با�حجة ا�معاكسة يُظهر ا�تفكير ا�نقدي وا�توازن.",
          "ا�اقتراح في ا�ختام (Kombination) يُعطي إجابة عم�ية ومُقنعة."
        ]
      }
    ]
  },
  {
    id: 'schreiben-9',
    title: 'نموذج Schreiben رقم 9 (ا�عم� وا�سكن)',
    description: 'نماذج عن ا�تقدم �عم�، مشك�ة مع إدارة ا�سكن، ورسا�ة �زمي�.',
    tasks: [
      {
        id: 'schreiben-9-1',
        taskNumber: 1,
        typeAr: 'بريد �زمي� ا�عم�',
        typeDe: 'E-Mail an einen Kollegen',
        wordCount: 'حوا�ي 80 ك�مة',
        promptAr: 'تريد أن تدعو زمي�ك ا�جديد في ا�عم� �تناو� ا�قهوة ��تعرف ع�يه أكثر.',
        promptDe: 'Sie möchten Ihren neuen Kollegen auf einen Kaffee einladen, um ihn besser kennenzulernen.',
        requirements: [
          'رحب به في ا�فريق.',
          'اقترح موعداً ومكاناً.',
          'اسأ�ه إن كان يفض� ا�شاي أم ا�قهوة.',
          'اط�ب منه ا�رد.'
        ],
        usefulPhrases: [
          { de: 'Herzlich willkommen im Team!', ar: 'أه�اً بك في ا�فريق!' },
          { de: 'Hättest du Lust, ...', ar: 'ه� �ديك رغبة...' },
          { de: 'Ich würde vorschlagen, dass...', ar: 'أقترح أن...' },
          { de: 'Lass mich wissen, ob...', ar: 'دعني أعرف إذا...' }
        ],
        sampleAnswer: "Hallo Markus,\n\nerstmal herzlich willkommen im Team! Ich freue mich, dass du da bist.\n\nDa wir jetzt zusammenarbeiten, dachte ich, wir könnten vielleicht nächste Woche in der Mittagspause zusammen einen Kaffee trinken gehen. So können wir uns besser kennenlernen.\n\nHättest du am Mittwoch oder Donnerstag Zeit? Direkt neben unserem Büro gibt es ein nettes Café. Trinkst du überhaupt Kaffee oder bevorzugst du Tee?\n\nLass mich einfach wissen, wann es dir am besten passt.\n\nViele Grüße,\nDein Kollege",
      },
      {
        id: 'schreiben-9-2',
        taskNumber: 2,
        typeAr: 'مشاركة في منتدى: ا�مواص�ات ا�عامة',
        typeDe: 'Forumsbeitrag: Öffentliche Verkehrsmittel',
        wordCount: 'حوا�ي 80 ك�مة',
        promptAr: 'تقرأ في منتدى: "ه� يجب أن تكون ا�مواص�ات ا�عامة مجانية ��جميع؟" اكتب رأيك.',
        promptDe: 'Sie lesen im Forum: "Sollen öffentliche Verkehrsmittel für alle kostenlos sein?"',
        requirements: [
          'اذكر رأيك بوضوح.',
          'اعط سببين.',
          'تحدث عن وضع ا�مواص�ات في مدينتك.',
          'ا�خاتمة.'
        ],
        usefulPhrases: [
          { de: 'Meiner Meinung nach...', ar: 'في رأيي...' },
          { de: 'Ein wichtiger Punkt ist...', ar: 'نقطة مهمة هي...' },
          { de: 'In meiner Stadt...', ar: 'في مدينتي...' },
          { de: 'Zusammenfassend...', ar: 'باختصار...' }
        ],
        sampleAnswer: "Hallo zusammen,\n\ndas ist eine sehr interessante Frage. Meiner Meinung nach sollten öffentliche Verkehrsmittel tatsächlich kostenlos sein.\n\nErstens würden dann mehr Menschen den Bus oder die Bahn nehmen. Das ist viel besser für die Umwelt und es gäbe weniger Stau. Zweitens ist das Ticket für viele Menschen mit wenig Geld momentan zu teuer.\n\nIn meiner Stadt fahren die Busse zwar oft, aber sie kosten fast 3 Euro pro Fahrt.\n\nZusammenfassend glaube ich, dass kostenlose Verkehrsmittel die Lebensqualität für alle verbessern würden.\n\nViele Grüße",
      },
      {
        id: 'schreiben-9-3',
        taskNumber: 3,
        typeAr: 'شكوى إ�ى إدارة ا�مبنى',
        typeDe: 'Beschwerde an die Hausverwaltung',
        wordCount: 'حوا�ي 40 ك�مة',
        promptAr: 'ا�تدفئة في شقتك معط�ة منذ يومين وا�جو بارد جداً. اكتب رسا�ة �إدارة ا�مبنى.',
        promptDe: 'Die Heizung in Ihrer Wohnung ist seit zwei Tagen kaputt und es ist sehr kalt. Schreiben Sie an die Hausverwaltung.',
        requirements: [
          'ا�تحية ا�رسمية.',
          'وصف ا�مشك�ة (ا�تدفئة معط�ة).',
          'ط�ب إرسا� فني بأسرع وقت.',
          'ا�ختام ا�رسمي.'
        ],
        usefulPhrases: [
          { de: 'Sehr geehrte Damen und Herren,', ar: 'حضرات ا�سيدات وا�سادة،' },
          { de: 'leider funktioniert meine Heizung nicht.', ar: '��أسف ا�تدفئة �ا تعم�.' },
          { de: 'Ich bitte Sie, ...', ar: 'أرجو منكم...' },
          { de: 'Mit freundlichen Grüßen', ar: 'مع أطيب ا�تحيات' }
        ],
        sampleAnswer: "Sehr geehrte Damen und Herren,\n\nleider funktioniert die Heizung in meiner Wohnung (Wohnung 4, 2. Stock) seit zwei Tagen überhaupt nicht mehr. Es ist sehr kalt.\n\nIch bitte Sie dringend, so schnell wie möglich einen Techniker zu schicken, um das Problem zu reparieren.\n\nMit freundlichen Grüßen,\nAhmad Ali",
      }
    ]
  },
  {
    id: 'schreiben-10',
    title: 'نموذج Schreiben رقم 10 (ا�تع�يم وا�رياضة)',
    description: 'شراء دراجة، رأي عن ا�رياضة ��أطفا�، واعتذار ��مدرسة.',
    tasks: [
      {
        id: 'schreiben-10-1',
        taskNumber: 1,
        typeAr: 'بريد �شراء دراجة مستعم�ة',
        typeDe: 'E-Mail: Gebrauchtes Fahrrad kaufen',
        wordCount: 'حوا�ي 80 ك�مة',
        promptAr: 'رأيت إع�اناً �بيع دراجة مستعم�ة. اكتب رسا�ة ��بائع.',
        promptDe: 'Sie haben eine Anzeige für ein gebrauchtes Fahrrad gesehen. Schreiben Sie dem Verkäufer.',
        requirements: [
          'عبر عن اهتمامك با�دراجة.',
          'اسأ� عن حا�تها وعمرها.',
          'استفسر عن ا�سعر ا�نهائي.',
          'اط�ب موعداً �تجربتها.'
        ],
        sampleAnswer: "Hallo,\n\nich habe Ihre Anzeige im Internet gesehen und interessiere mich sehr für das Fahrrad.\n\nKönnten Sie mir bitte sagen, wie alt das Fahrrad ist und ob es irgendwelche Mängel hat? Funktionieren die Bremsen und das Licht einwandfrei?\n\nMich würde auch interessieren, ob der Preis verhandelbar ist.\n\nWenn alles passt, würde ich das Fahrrad gerne einmal Probe fahren. Hätten Sie am Samstagvormittag Zeit dafür?\n\nVielen Dank und liebe Grüße,\nSamir",
      },
      {
        id: 'schreiben-10-2',
        taskNumber: 2,
        typeAr: 'منتدى: ا�هواتف ا�ذكية في ا�مدرسة',
        typeDe: 'Forumsbeitrag: Smartphones in der Schule',
        wordCount: 'حوا�ي 80 ك�مة',
        promptAr: 'تشارك في نقاش: ه� يجب منع ا�هواتف ا�ذكية في ا�مدرسة؟',
        promptDe: 'Diskussion: Sollen Smartphones in der Schule verboten werden?',
        requirements: [
          'رأيك ا�شخصي.',
          'أسباب (ا�تركيز، ا�تنمر ا�إ�كتروني...).',
          'استثناءات محتم�ة.',
          'ا�خ�اصة.'
        ],
        sampleAnswer: "Hallo in die Runde,\n\nich bin der Meinung, dass Smartphones während des Unterrichts verboten sein sollten.\n\nEin wichtiger Grund ist, dass die Kinder sich besser auf den Lehrer und die Aufgaben konzentrieren können, wenn sie kein Handy auf dem Tisch haben. Außerdem verringert es das Risiko von Cybermobbing auf dem Schulhof.\n\nAllerdings sollten die Kinder nach der Schule ihre Handys benutzen dürfen, um ihre Eltern anzurufen, wenn etwas passiert.\n\nInsgesamt ist ein klares Verbot im Unterricht der beste Weg.\n\nViele Grüße",
      },
      {
        id: 'schreiben-10-3',
        taskNumber: 3,
        typeAr: 'رسا�ة اعتذار �مدرسة ابنتك',
        typeDe: 'Entschuldigungsschreiben an die Schule',
        wordCount: 'حوا�ي 40 ك�مة',
        promptAr: 'ابنتك مريضة و�ن تستطيع ا�ذهاب ��مدرسة �عدة أيام. اكتب ��مدير.',
        promptDe: 'Ihre Tochter ist krank und kann mehrere Tage nicht zur Schule gehen. Schreiben Sie an den Schulleiter.',
        requirements: [
          'أخبره أن ابنتك مريضة.',
          'حدد ا�مدة (من وإ�ى).',
          'أخبره أنك سترس� ا�تقرير ا�طبي.',
          'ا�تحية وا�ختام ا�رسمي.'
        ],
        sampleAnswer: "Sehr geehrter Herr Direktor,\n\nhiermit möchte ich Ihnen mitteilen, dass meine Tochter Sara (Klasse 5b) leider krank ist und von Montag bis voraussichtlich Mittwoch nicht zur Schule kommen kann.\n\nDas ärztliche Attest werde ich Ihnen am Donnerstag mitgeben.\n\nVielen Dank für Ihr Verständnis.\n\nMit freundlichen Grüßen,\nYara Hassan",
      }
    ]
  },
  {
    "id": "schreiben-18",
    "title": "نموذج Schreiben رقم 18",
    "description": "تقديم ع�ى تدريب مهني — Bewerbung für ein Praktikum",
    "tasks": [
      {
        "id": "schreiben-18-1",
        "taskNumber": 1,
        "typeAr": "رسا�ة رسمية — تقديم ع�ى تدريب",
        "typeDe": "Formelle Bewerbung",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "رأيتَ إع�اناً عن فرصة تدريب (Praktikum) في مستشفى. اكتب رسا�ة تقديم.",
        "promptDe": "Sie haben eine Anzeige für ein Praktikum in einem Krankenhaus gelesen. Schreiben Sie eine Bewerbung.",
        "requirements": [
          "اذكر أين رأيت ا�إع�ان.",
          "قدّم نفسك (اسمك، عمرك، مستوى �غتك).",
          "اذكر خبرتك أو مؤه�اتك.",
          "اسأ� عن موعد ا�بدء."
        ],
        "usefulPhrases": [
          { "de": "Sehr geehrte Damen und Herren,", "ar": "ا�سيدات وا�سادة ا�أعزاء،" },
          { "de": "Ich bewerbe mich um das Praktikum als …", "ar": "أتقدم بط�ب ��تدريب في مجا�..." },
          { "de": "Ich habe Ihre Anzeige auf … gelesen.", "ar": "قرأت إع�انكم ع�ى..." },
          { "de": "Zurzeit besuche ich einen B1-Deutschkurs.", "ar": "حا�ياً أحضر كورس أ�ماني مستوى B1." },
          { "de": "Ich habe Erfahrung in/als …", "ar": "�ديّ خبرة في/كـ..." },
          { "de": "Wann könnte ich anfangen?", "ar": "متى يمكنني ا�بدء؟" },
          { "de": "Mit freundlichen Grüßen", "ar": "مع أطيب ا�تحيات" }
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nmit großem Interesse habe ich Ihre Anzeige auf der Webseite des Krankenhauses gelesen. Ich bewerbe mich hiermit um das Praktikum in der Pflege.\n\nMein Name ist Ahmad Al-Masri, ich bin 28 Jahre alt und lerne seit einem Jahr Deutsch. Zurzeit besuche ich einen B1-Deutschkurs an der VHS. In Syrien habe ich als Krankenpfleger gearbeitet und bringe daher Erfahrung in der Patientenbetreuung mit.\n\nKönnten Sie mir bitte mitteilen, wann das Praktikum beginnt und welche Unterlagen Sie benötigen?\n\nÜber eine positive Antwort würde ich mich sehr freuen.\n\nMit freundlichen Grüßen\nAhmad Al-Masri"
      },
      {
        "id": "schreiben-18-2",
        "taskNumber": 2,
        "typeAr": "رد ع�ى رسا�ة صديق — ا�حياة ا�مهنية",
        "typeDe": "Informeller Brief — Beruf",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "صديقك يسأ�ك عن خططك ا�مهنية في أ�مانيا. اكتب �ه.",
        "promptDe": "Ihr Freund fragt nach Ihren beruflichen Plänen in Deutschland.",
        "requirements": [
          "اذكر ماذا تريد أن تعم�.",
          "اشرح �ماذا اخترت هذا ا�مجا�.",
          "اذكر ما تفع�ه حا�ياً ��تحضير.",
          "اسأ�ه عن عم�ه."
        ],
        "sampleAnswer": "Hallo Omar,\n\nschön, dass du fragst! Ich möchte gern als Krankenpfleger in Deutschland arbeiten. Diesen Beruf habe ich in Syrien schon gemacht und er gefällt mir sehr.\n\nJetzt lerne ich Deutsch und mache bald ein Praktikum in einem Krankenhaus. Danach möchte ich die Anerkennung meines Abschlusses beantragen.\n\nUnd du? Arbeitest du schon oder suchst du noch?\n\nLiebe Grüße\nAhmad"
      }
    ]
  },
  {
    "id": "schreiben-19",
    "title": "نموذج Schreiben رقم 19",
    "description": "شكوى عن ط�بية — Beschwerde über eine Bestellung",
    "tasks": [
      {
        "id": "schreiben-19-1",
        "taskNumber": 1,
        "typeAr": "رسا�ة شكوى رسمية",
        "typeDe": "Formelle Beschwerde",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "ط�بتَ جهاز كمبيوتر من ا�إنترنت �كنه وص� مكسوراً. اكتب رسا�ة شكوى.",
        "promptDe": "Sie haben einen Laptop online bestellt, aber er kam kaputt an. Schreiben Sie eine Beschwerde.",
        "requirements": [
          "اذكر ماذا ط�بت ومتى.",
          "اشرح ا�مشك�ة با�تفصي�.",
          "اذكر ماذا تريد (استرداد ا�ما� أو استبدا�).",
          "حدد موعداً ��رد."
        ],
        "usefulPhrases": [
          { "de": "Ich möchte mich über … beschweren.", "ar": "أريد أن أشتكي عن..." },
          { "de": "Am … habe ich … bestellt.", "ar": "في ... ط�بت ..." },
          { "de": "Leider ist … kaputt/beschädigt angekommen.", "ar": "��أسف وص� ... مكسوراً/تا�فاً." },
          { "de": "Ich bitte Sie, mir … zu erstatten/umzutauschen.", "ar": "أط�ب منكم استرداد ا�مب�غ/ا�استبدا�." },
          { "de": "Ich erwarte Ihre Antwort bis zum …", "ar": "أنتظر ردكم حتى تاريخ..." }
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nam 10. Juni habe ich über Ihren Online-Shop einen Laptop bestellt (Bestellnummer: 456789). Leider habe ich festgestellt, dass der Bildschirm einen Riss hat und der Laptop nicht funktioniert.\n\nIch bitte Sie, mir entweder ein neues Gerät zu schicken oder den Kaufpreis in Höhe von 599 Euro zurückzuerstatten.\n\nBitte antworten Sie mir bis zum 25. Juni. Im Anhang finden Sie Fotos des Schadens.\n\nMit freundlichen Grüßen\nFadi Halawani"
      },
      {
        "id": "schreiben-19-2",
        "taskNumber": 2,
        "typeAr": "بريد �صديق — تجربة سيئة في ا�تسوق",
        "typeDe": "E-Mail an einen Freund — Einkaufserlebnis",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "اكتب �صديقك عن تجربتك ا�سيئة مع ا�ط�بية واسأ�ه عن نصيحته.",
        "promptDe": "Schreiben Sie Ihrem Freund über Ihre schlechte Erfahrung mit der Bestellung.",
        "requirements": [
          "اشرح ماذا حص�.",
          "اذكر شعورك.",
          "اسأ�ه إن كان عنده تجربة مشابهة.",
          "اط�ب نصيحته."
        ],
        "sampleAnswer": "Hallo Mustafa,\n\nstell dir vor, was passiert ist! Ich habe einen neuen Laptop online bestellt, und als er ankam, war der Bildschirm kaputt! Ich war so wütend!\n\nIch habe sofort eine Beschwerde geschrieben und hoffe, dass sie mir das Geld zurückgeben.\n\nHast du schon mal so etwas erlebt? Was würdest du an meiner Stelle tun?\n\nSchreib mir bald!\n\nLiebe Grüße\nFadi"
      }
    ]
  },
  {
    "id": "schreiben-20",
    "title": "نموذج Schreiben رقم 20",
    "description": "استفسار عن كورس أ�ماني — Anfrage für einen Deutschkurs",
    "tasks": [
      {
        "id": "schreiben-20-1",
        "taskNumber": 1,
        "typeAr": "رسا�ة استفسار رسمية",
        "typeDe": "Formelle Anfrage",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "تريد ا�تسجي� في كورس أ�ماني مستوى B2 في مدرسة �غات. اكتب رسا�ة استفسار.",
        "promptDe": "Sie möchten sich für einen B2-Deutschkurs an einer Sprachschule anmelden. Schreiben Sie eine Anfrage.",
        "requirements": [
          "اسأ� عن مواعيد ا�كورس.",
          "اسأ� عن ا�أسعار.",
          "اذكر مستواك ا�حا�ي.",
          "اسأ� عن امتحان تحديد ا�مستوى."
        ],
        "usefulPhrases": [
          { "de": "Ich interessiere mich für einen Deutschkurs.", "ar": "أنا مهتم بكورس أ�ماني." },
          { "de": "Wann beginnt der nächste Kurs?", "ar": "متى يبدأ ا�كورس ا�قادم؟" },
          { "de": "Was kostet der Kurs pro Monat?", "ar": "كم يك�ف ا�كورس شهرياً؟" },
          { "de": "Muss ich einen Einstufungstest machen?", "ar": "ه� يجب أن أعم� اختبار تحديد مستوى؟" },
          { "de": "Ich habe bereits die B1-Prüfung bestanden.", "ar": "�قد اجتزت امتحان B1." }
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nich interessiere mich für einen B2-Deutschkurs an Ihrer Sprachschule. Ich habe vor zwei Monaten die B1-Prüfung bei telc bestanden und möchte mein Deutsch weiter verbessern.\n\nKönnten Sie mir bitte folgende Informationen geben:\n- Wann beginnt der nächste B2-Kurs?\n- Wie viel kostet der Kurs?\n- An welchen Tagen findet der Unterricht statt?\n- Muss ich vorher einen Einstufungstest machen?\n\nÜber eine baldige Antwort würde ich mich freuen.\n\nMit freundlichen Grüßen\nSarah Ahmed"
      }
    ]
  },
  {
    "id": "schreiben-21",
    "title": "نموذج Schreiben رقم 21",
    "description": "إنهاء عقد — Kündigung eines Vertrags",
    "tasks": [
      {
        "id": "schreiben-21-1",
        "taskNumber": 1,
        "typeAr": "رسا�ة إنهاء عقد نادي رياضي",
        "typeDe": "Kündigung Fitnessstudio",
        "wordCount": "حوا�ي 60 ك�مة",
        "promptAr": "تريد إنهاء عقدك مع نادٍ رياضي. اكتب رسا�ة رسمية.",
        "promptDe": "Sie möchten Ihren Vertrag im Fitnessstudio kündigen.",
        "requirements": [
          "اذكر رقم عقدك أو عضويتك.",
          "حدد تاريخ ا�إنهاء ا�مط�وب.",
          "اذكر ا�سبب (اختياري).",
          "اط�ب تأكيداً كتابياً."
        ],
        "usefulPhrases": [
          { "de": "Hiermit kündige ich meinen Vertrag …", "ar": "بموجب هذا أنهي عقدي..." },
          { "de": "Meine Mitgliedsnummer lautet: …", "ar": "رقم عضويتي هو: ..." },
          { "de": "… zum nächstmöglichen Termin.", "ar": "... في أقرب موعد ممكن." },
          { "de": "Bitte bestätigen Sie die Kündigung schriftlich.", "ar": "أرجو تأكيد ا�إنهاء كتابياً." }
        ],
        "sampleAnswer": "Sehr geehrte Damen und Herren,\n\nhiermit kuendige ich meinen Vertrag im Fitnessstudio FitLife zum naechstmoeglichen Termin. Meine Mitgliedsnummer lautet: FL-20258.\n\nDer Grund fuer die Kuendigung ist, dass ich umziehe und das Studio fuer mich nicht mehr erreichbar ist.\n\nBitte senden Sie mir eine schriftliche Bestaetigung der Kuendigung.\n\nMit freundlichen Gruessen\nKhaled Mansour"
      },
      {
        "id": "schreiben-21-2",
        "taskNumber": 2,
        "typeAr": "بريد �صديق — ا�رياضة وا�صحة",
        "typeDe": "E-Mail — Sport und Gesundheit",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "اكتب �صديقك عن سبب تركك ��نادي وماذا تخطط بد�اً منه.",
        "promptDe": "Schreiben Sie Ihrem Freund, warum Sie das Fitnessstudio verlassen und was Sie stattdessen planen.",
        "requirements": [
          "اشرح �ماذا تركت ا�نادي.",
          "اذكر بدي�اً رياضياً.",
          "اسأ� صديقك عن اقتراحات.",
          "اقترح ممارسة ا�رياضة معاً."
        ],
        "sampleAnswer": "Hallo Rami,\n\nwie geht's dir? Ich wollte dir erzählen, dass ich mein Fitnessstudio gekündigt habe, weil ich nächsten Monat umziehe und das Studio zu weit weg ist.\n\nAber ich möchte natürlich weiter Sport machen! Ich überlege, im Park zu joggen oder Fahrrad zu fahren. Hast du vielleicht andere Ideen?\n\nWollen wir zusammen laufen gehen? Das wäre super!\n\nBis bald\nKhaled"
      }
    ]
  },
  {
    "id": "schreiben-22",
    "title": "نموذج Schreiben رقم 22",
    "description": "دعوة �عيد مي�اد — Einladung zum Geburtstag",
    "tasks": [
      {
        "id": "schreiben-22-1",
        "taskNumber": 1,
        "typeAr": "بريد غير رسمي — دعوة �حف�ة",
        "typeDe": "Informelle Einladung",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "ستحتف� بعيد مي�ادك وتريد دعوة صديقك ا�أ�ماني. اكتب �ه.",
        "promptDe": "Sie feiern Ihren Geburtstag und möchten Ihren deutschen Freund einladen.",
        "requirements": [
          "أخبره با�مناسبة.",
          "حدد ا�تاريخ وا�وقت وا�مكان.",
          "اذكر ما ا�ذي يمكنه إحضاره.",
          "اط�ب منه ا�رد."
        ],
        "usefulPhrases": [
          { "de": "Ich möchte dich herzlich zu … einladen.", "ar": "أريد أن أدعوك بحرارة �ـ..." },
          { "de": "Die Feier findet am … um … Uhr statt.", "ar": "ا�حف�ة ستكون يوم ... ا�ساعة ..." },
          { "de": "Du brauchst nur gute Laune mitzubringen!", "ar": "تحتاج فقط أن تحضر مزاجاً جيداً!" },
          { "de": "Sag mir bitte Bescheid, ob du kommen kannst.", "ar": "أخبرني من فض�ك إن كنت ستأتي." }
        ],
        "sampleAnswer": "Liebe Nada,\n\nich werde am Samstag, den 15. Juli, 30 Jahre alt und möchte das mit Freunden feiern! Deshalb lade ich dich herzlich zu meiner Geburtstagsparty ein.\n\nDie Feier findet bei mir zu Hause statt, ab 18 Uhr. Ich werde syrisches Essen kochen und Musik machen. Du brauchst nichts mitzubringen, nur gute Laune! 😊\n\nKannst du kommen? Sag mir bitte bis Mittwoch Bescheid.\n\nIch freue mich auf dich!\n\nLiebe Grüße\nLina"
      },
      {
        "id": "schreiben-22-2",
        "taskNumber": 2,
        "typeAr": "مشاركة في منتدى — ا�احتفا�ات",
        "typeDe": "Forumbeitrag — Feste feiern",
        "wordCount": "حوا�ي 80 ك�مة",
        "promptAr": "في منتدى: \"كيف تحتف�ون بأعياد ا�مي�اد في ب�دكم؟\" اكتب رأيك.",
        "promptDe": "Im Forum: „Wie feiern Sie Geburtstage in Ihrem Land?\"",
        "requirements": [
          "اشرح كيف يُحتف� بأعياد ا�مي�اد في ب�دك.",
          "قارن مع أ�مانيا.",
          "اذكر رأيك ا�شخصي.",
          "اسأ� ا�آخرين عن تجاربهم."
        ],
        "sampleAnswer": "Hallo zusammen,\n\ndas Thema finde ich sehr interessant! In Syrien feiert man Geburtstage meistens im Familienkreis. Man macht ein großes Essen und es gibt eine Torte. Die ganze Familie kommt zusammen.\n\nIn Deutschland ist es etwas anders: Hier feiert man oft mit Freunden, nicht nur mit der Familie. Das finde ich auch schön, weil man so verschiedene Leute kennenlernt.\n\nAm wichtigsten finde ich, dass man den Tag mit lieben Menschen verbringt. Wie feiert ihr in euren Ländern?\n\nViele Grüße\nLina"
      }
    ]
  }
];
