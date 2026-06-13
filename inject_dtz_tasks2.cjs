const fs = require('fs');
const orig = fs.readFileSync('public/assets/data-dtz-CzCuJbSn.js', 'utf8');

let newChunk = orig;

const schreiben5 = {
  id: "dtz-schreiben-5",
  titleAr: "الاعتذار عن التأخير (إلى صاحب العمل)",
  titleDe: "Entschuldigung beim Arbeitgeber",
  scenarioAr: "لقد فاتك القطار اليوم وستتأخر عن العمل لمدة ساعة. اكتب رسالة قصيرة إلى مديرك في العمل.",
  scenarioDe: "Sie haben heute den Zug verpasst und werden eine Stunde später zur Arbeit kommen. Schreiben Sie eine kurze Nachricht an Ihren Chef / Ihre Chefin.",
  points: [
    { de: "Warum schreiben Sie?", ar: "لماذا تكتب؟ (السبب)" },
    { de: "Wann kommen Sie?", ar: "متى ستصل إلى العمل؟" },
    { de: "Was ist mit Ihren Terminen?", ar: "ماذا سيحدث لمواعيدك أو مهامك اليوم؟" },
    { de: "Entschuldigung", ar: "تقديم الاعتذار بوضوح." }
  ],
  greetings: [
    { de: "Sehr geehrte(r) Herr/Frau [Name],", ar: "السيد(ة) المحترم(ة) [الاسم]،", usage: "رسمي جداً" },
    { de: "Liebe(r) Herr/Frau [Name],", ar: "عزيزي/عزيزتي السيد(ة) [الاسم]،", usage: "رسمي لكن ودي (شائع في العمل)" }
  ],
  closings: [
    { de: "Mit freundlichen Grüßen", ar: "مع أطيب التحيات", usage: "رسمي" }
  ],
  sampleAnswerDe: "Sehr geehrte Frau Schmidt,\n\nich schreibe Ihnen, weil ich heute leider später zur Arbeit komme. Ich habe den Zug verpasst und der nächste Zug hat 40 Minuten Verspätung.\n\nIch werde wahrscheinlich erst um 10:00 Uhr im Büro sein.\n\nBitte sagen Sie Herrn Müller Bescheid, dass ich unser Meeting um 9:00 Uhr nicht schaffe. Wir können uns gerne um 11:00 Uhr treffen.\n\nEs tut mir sehr leid für die Umstände.\n\nMit freundlichen Grüßen\n[Ihr Name]",
  sampleAnswerAr: "السيدة شميدت المحترمة، أكتب لكِ لأنني للأسف سأتأخر عن العمل اليوم. لقد فاتني القطار والقطار التالي متأخر 40 دقيقة. سأكون على الأرجح في المكتب عند الساعة 10:00 فقط. أرجو إخبار السيد مولر أنني لن أستطيع حضور اجتماعنا الساعة 9:00. يمكننا أن نلتقي بكل سرور الساعة 11:00. أنا آسف جداً على هذا الإزعاج. مع أطيب التحيات.",
  usefulPhrases: [
    { de: "Ich werde später kommen.", ar: "سآتي متأخراً." },
    { de: "Ich habe den Bus/Zug verpasst.", ar: "لقد فاتني الباص/القطار." },
    { de: "Es tut mir leid.", ar: "أنا آسف." }
  ],
  wordCount: "~70 كلمة"
};

const schreiben6 = {
  id: "dtz-schreiben-6",
  titleAr: "رسالة لإدارة السكن (عطل في التدفئة)",
  titleDe: "Brief an die Hausverwaltung (Heizung kaputt)",
  scenarioAr: "التدفئة في شقتك لا تعمل منذ يومين والجو بارد جداً. اكتب رسالة إلى إدارة السكن (Hausverwaltung).",
  scenarioDe: "Die Heizung in Ihrer Wohnung funktioniert seit zwei Tagen nicht und es ist sehr kalt. Schreiben Sie einen Brief an die Hausverwaltung.",
  points: [
    { de: "Warum schreiben Sie?", ar: "لماذا تكتب؟ (المشكلة)" },
    { de: "Seit wann ist das Problem?", ar: "منذ متى توجد هذه المشكلة؟" },
    { de: "Was soll die Hausverwaltung tun?", ar: "ماذا يجب على الإدارة أن تفعل؟ (طلب إصلاح)" },
    { de: "Wann sind Sie zu Hause?", ar: "متى تكون في المنزل؟ (لاستقبال الفني)" }
  ],
  greetings: [
    { de: "Sehr geehrte Damen und Herren,", ar: "سيداتي وسادتي،", usage: "عند مراسلة جهة غير معروفة بالاسم" }
  ],
  closings: [
    { de: "Mit freundlichen Grüßen", ar: "مع أطيب التحيات", usage: "رسمي" }
  ],
  sampleAnswerDe: "Sehr geehrte Damen und Herren,\n\nich schreibe Ihnen, weil die Heizung in meiner Wohnung (Wohnung Nr. 12, 3. Stock) nicht funktioniert. Das Problem besteht schon seit zwei Tagen.\n\nEs ist sehr kalt in der Wohnung und ich habe kleine Kinder. Bitte schicken Sie so schnell wie möglich einen Handwerker, um die Heizung zu reparieren.\n\nIch bin jeden Tag ab 15:00 Uhr zu Hause. Sie können mich auch auf dem Handy unter 01761234567 anrufen.\n\nIch warte auf Ihre schnelle Antwort.\n\nMit freundlichen Grüßen\n[Ihr Name]",
  sampleAnswerAr: "سيداتي وسادتي، أكتب لكم لأن التدفئة في شقتي (رقم 12، الطابق 3) لا تعمل. المشكلة موجودة منذ يومين. الجو بارد جداً في الشقة ولدي أطفال صغار. أرجو إرسال فني في أسرع وقت ممكن لإصلاح التدفئة. أنا متواجد في المنزل كل يوم بدءاً من الساعة 15:00. يمكنكم أيضاً الاتصال بي على الهاتف المحمول. أنتظر ردكم السريع. مع أطيب التحيات.",
  usefulPhrases: [
    { de: "Die Heizung funktioniert nicht.", ar: "التدفئة لا تعمل." },
    { de: "Bitte schicken Sie einen Handwerker.", ar: "أرجو إرسال عامل/فني." },
    { de: "Ich bin ab ... Uhr zu Hause.", ar: "أنا في المنزل بدءاً من الساعة..." }
  ],
  wordCount: "~85 كلمة"
};

const sIdx = newChunk.indexOf('u=[{"id":"dtz-schreiben-4"');
if (sIdx !== -1) {
  const injectStr = JSON.stringify(schreiben5) + ',' + JSON.stringify(schreiben6) + ',';
  newChunk = newChunk.slice(0, sIdx + 3) + injectStr + newChunk.slice(sIdx + 3);
  console.log('Injected Schreiben 5 & 6!');
  fs.writeFileSync('public/assets/data-dtz-CzCuJbSn.js', newChunk);
} else {
  console.log('Could not find injection point!');
}
