const fs = require('fs');
const orig = fs.readFileSync('public/assets/data-redewendungen-C_P0Jxli.js', 'utf8');

const start = orig.indexOf('var e=[');
if (start !== -1) {
  const a1a2 = [
    {
      id: 'a1-idioms',
      titleAr: 'مصطلحات سهلة (A1)',
      titleDe: 'Einfache Redewendungen',
      items: [
        {
          de: 'Gott sei Dank!',
          literalAr: 'حرفياً: الشكر لله!',
          meaningAr: 'الحمد لله!',
          example: {
            de: 'Gott sei Dank bist du hier.',
            ar: 'الحمد لله أنك هنا.'
          }
        },
        {
          de: 'Kein Problem!',
          literalAr: 'حرفياً: لا مشكلة!',
          meaningAr: 'لا مشكلة / ولا يهمك.',
          example: {
            de: 'Danke für die Hilfe! – Kein Problem!',
            ar: 'شكراً على المساعدة! – لا مشكلة!'
          }
        },
        {
          de: 'Ach so!',
          literalAr: 'حرفياً: آه هكذا!',
          meaningAr: 'آها! (عند فهم شيء جديد أو مفاجئ).',
          example: {
            de: 'Die Tür ist kaputt. – Ach so!',
            ar: 'الرقم مكسور. – آها فهمت!'
          }
        }
      ]
    },
    {
      id: 'a2-idioms',
      titleAr: 'مصطلحات شائعة (A2)',
      titleDe: 'Bekannte Redewendungen',
      items: [
        {
          de: 'Das macht nichts.',
          literalAr: 'حرفياً: هذا لا يفعل شيئاً.',
          meaningAr: 'لا يهم / لا بأس (للرد على اعتذار).',
          example: {
            de: 'Entschuldigung für die Verspätung! – Das macht nichts.',
            ar: 'عذراً على التأخير! – لا بأس.'
          }
        },
        {
          de: 'Viel Glück!',
          literalAr: 'حرفياً: حظاً كثيراً!',
          meaningAr: 'بالتوفيق!',
          example: {
            de: 'Ich habe heute einen Test. – Viel Glück!',
            ar: 'لدي اختبار اليوم. – بالتوفيق!'
          }
        },
        {
          de: 'Mir ist kalt.',
          literalAr: 'حرفياً: لي هو بارد.',
          meaningAr: 'أشعر بالبرد (لا نقل Ich bin kalt).',
          example: {
            de: 'Mach bitte das Fenster zu, mir ist kalt.',
            ar: 'أغلق النافذة من فضلك، أشعر بالبرد.'
          }
        }
      ]
    }
  ];

  const injectStr = JSON.stringify(a1a2).slice(1, -1) + ',';
  
  // Inject right after 'var e=['
  const newChunk = orig.slice(0, start + 7) + injectStr + orig.slice(start + 7);
  fs.writeFileSync('public/assets/data-redewendungen-C_P0Jxli.js', newChunk);
  console.log('Successfully injected into redewendungen! New length:', newChunk.length);
} else {
  console.log('Could not find var e=[');
}
