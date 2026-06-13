const fs = require('fs');
const orig = fs.readFileSync('public/assets/data-grammar-CqkqFCxM.js', 'utf8');

const startStr = '{"id":"a1-pronomen"';
const endStr = '{id:`perfekt`';

const start = orig.indexOf(startStr);
const end = orig.indexOf(endStr);

console.log('start:', start, 'end:', end);

if (start !== -1 && end !== -1) {
  const a1a2 = [
    {
      id: 'a1-pronomen',
      titleAr: 'الضمائر الشخصية (A1)',
      titleDe: 'Personalpronomen',
      summaryAr: 'الضمائر الشخصية هي أساس بناء الجملة.',
      arabicContrast: 'في العربية نتصل الضمائر بالأفعال أحياناً، لكن في الألمانية تكون منفصلة دائماً وتأتي كفاعل.',
      whenToUseAr: 'نستخدمها للإشارة للأشخاص أو الأشياء كفاعل في الجملة.',
      rules: [
        {
          title: "ضمائر المتكلم والمخاطب",
          contentAr: "ich (أنا)، du (أنتَ/أنتِ)، wir (نحن)، ihr (أنتم/أنتن).",
          examples: [
            { de: "Ich bin Arzt.", ar: "أنا طبيب." },
            { de: "Du bist nett.", ar: "أنت لطيف." }
          ]
        },
        {
          title: "ضمائر الغائب وصيغة الاحترام",
          contentAr: "er (هو)، sie (هي)، es (للمحايد)، sie (هم)، Sie (حضرتك - بحرف كبير دائماً).",
          examples: [
            { de: "Er lernt Deutsch.", ar: "هو يتعلم الألمانية." },
            { de: "Sprechen Sie Englisch?", ar: "هل تتحدث حضرتك الإنجليزية؟" }
          ]
        }
      ],
      commonMistakes: [
        {
          wrong: "ich bist",
          right: "ich bin",
          explanationAr: "يجب تصريف الفعل بشكل صحيح مع كل ضمير."
        }
      ],
      tipsAr: [
        'الضمير Sie بحرف كبير يُستخدم للاحترام (حضرتك) للمفرد والجمع.'
      ],
      exercises: [
        {
          id: "a1-pro-1",
          promptAr: "اختر الضمير الصحيح:",
          promptDe: "____ lerne Deutsch.",
          options: [
            { id: "a", de: "Ich" },
            { id: "b", de: "Er" }
          ],
          correct: "a",
          explanationAr: "الفعل lerne ينتهي بـ e، مما يدل على الضمير Ich."
        }
      ]
    },
    {
      id: 'a2-modalverben',
      titleAr: 'الأفعال المساعدة (A2)',
      titleDe: 'Modalverben',
      summaryAr: 'الأفعال المساعدة تغيّر معنى الفعل الأساسي في الجملة.',
      arabicContrast: 'في العربية نقول (أستطيع أن ألعب)، في الألمانية الفعل الأساسي (ألعب) يذهب لآخر الجملة بصيغة المصدر.',
      whenToUseAr: 'للتعبير عن الاستطاعة، الإرادة، الوجوب، السماح.',
      rules: [
        {
          title: "الأفعال المساعدة الأساسية",
          contentAr: "können (يستطيع)، müssen (يجب)، wollen (يريد)، dürfen (يُسمح له)، sollen (ينبغي)، mögen (يحب/يود).",
          examples: [
            { de: "Ich kann schwimmen.", ar: "أستطيع السباحة." },
            { de: "Er muss heute arbeiten.", ar: "يجب عليه العمل اليوم." }
          ]
        },
        {
          title: "موقع الفعل في الجملة",
          contentAr: "الفعل المساعد يأتي في المركز الثاني ويُصرّف مع الفاعل. أما الفعل الأساسي فيذهب إلى نهاية الجملة ويكون في حالة المصدر (Infinitiv).",
          examples: [
            { de: "Wir wollen am Wochenende Fußball spielen.", ar: "نريد أن نلعب كرة القدم في عطلة نهاية الأسبوع." }
          ]
        }
      ],
      commonMistakes: [
        {
          wrong: "Ich kann schwimme.",
          right: "Ich kann schwimmen.",
          explanationAr: "الفعل الأساسي في النهاية يجب أن يكون في حالة المصدر (ينتهي بـ en)."
        }
      ],
      tipsAr: [
        'تذكر دائماً: الفعل المساعد يرمي الفعل الأساسي لآخر الجملة!'
      ],
      exercises: [
        {
          id: "a2-mod-1",
          promptAr: "اختر الترتيب الصحيح:",
          promptDe: "Ich ____ heute Deutsch ____.",
          options: [
            { id: "a", de: "lernen / muss" },
            { id: "b", de: "muss / lernen" }
          ],
          correct: "b",
          explanationAr: "الفعل المساعد muss في المركز الثاني، والمصدر lernen في النهاية."
        }
      ]
    }
  ];

  const injectStr = JSON.stringify(a1a2).slice(1, -1) + ',';
  
  const newChunk = orig.slice(0, start) + injectStr + orig.slice(end);
  fs.writeFileSync('public/assets/data-grammar-CqkqFCxM.js', newChunk);
  console.log('Successfully fixed! New length:', newChunk.length);
} else {
  console.log('Could not find boundaries!');
}
