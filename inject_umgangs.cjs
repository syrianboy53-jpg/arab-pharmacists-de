const fs = require('fs');
const orig = fs.readFileSync('public/assets/data-umgangs-D1CqX9w6.js', 'utf8');

const start = orig.indexOf('var e=[');
if (start !== -1) {
  const a1a2 = [
    {
      id: 'a1-basic',
      icon: '🗣️',
      titleAr: 'تعابير يومية أساسية (A1)',
      titleDe: 'A1 Grundlagen',
      subtitle: 'أهم التعابير لبدء المحادثة',
      premium: false,
      phrases: [
        {
          de: 'Wie heißen Sie?',
          ms: 'ما هو اسم حضرتك؟',
          sy: 'شو اسم حضرتك؟',
          tags: ['formal-safe']
        },
        {
          de: 'Woher kommen Sie?',
          ms: 'من أين تأتي حضرتك؟',
          sy: 'من وين حضرتك؟',
          tags: ['formal-safe']
        },
        {
          de: 'Es freut mich, Sie kennenzulernen.',
          ms: 'سعدت بلقائك.',
          sy: 'تشرّفنا.',
          tags: ['formal-safe']
        },
        {
          de: 'Können Sie das bitte wiederholen?',
          ms: 'هل يمكنك تكرار ذلك من فضلك؟',
          sy: 'ممكن تعيد لو سمحت؟',
          tags: ['formal-safe']
        },
        {
          de: 'Sprechen Sie Arabisch?',
          ms: 'هل تتحدث العربية؟',
          sy: 'بتحكي عربي؟',
          tags: ['formal-safe']
        }
      ]
    },
    {
      id: 'a2-restaurant',
      icon: '🍽️',
      titleAr: 'في المطعم والتسوق (A2)',
      titleDe: 'Restaurant & Einkaufen',
      subtitle: 'تعابير لطلب الطعام والتبضع',
      premium: false,
      phrases: [
        {
          de: 'Ich hätte gern einen Kaffee.',
          ms: 'أود الحصول على قهوة.',
          sy: 'يا ريت كاسة قهوة.',
          tags: ['formal-safe']
        },
        {
          de: 'Die Rechnung, bitte!',
          ms: 'الفاتورة من فضلك!',
          sy: 'الحساب لو سمحت!',
          tags: ['formal-safe']
        },
        {
          de: 'Kann ich mit Karte zahlen?',
          ms: 'هل يمكنني الدفع بالبطاقة؟',
          sy: 'فيني إدفع بالكرت؟',
          tags: ['formal-safe']
        },
        {
          de: 'Wo finde ich das Brot?',
          ms: 'أين أجد الخبز؟',
          sy: 'وين بلاقي الخبز؟',
          tags: ['formal-safe']
        },
        {
          de: 'Das ist mir zu teuer.',
          ms: 'هذا غالٍ جداً بالنسبة لي.',
          sy: 'هاد غالي كتير عليي.',
          tags: []
        }
      ]
    }
  ];

  const injectStr = JSON.stringify(a1a2).slice(1, -1) + ',';
  
  // Inject right after 'var e=['
  const newChunk = orig.slice(0, start + 7) + injectStr + orig.slice(start + 7);
  fs.writeFileSync('public/assets/data-umgangs-D1CqX9w6.js', newChunk);
  console.log('Successfully injected into umgangs! New length:', newChunk.length);
} else {
  console.log('Could not find var e=[');
}
