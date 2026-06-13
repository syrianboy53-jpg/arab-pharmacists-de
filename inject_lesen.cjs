const fs = require('fs');
const orig = fs.readFileSync('public/assets/data-lesen-D_1VaT8K.js', 'utf8');

const start = orig.indexOf('var e=[');
if (start !== -1) {
  const a1a2 = [
    {
      id: "lesen-a1",
      title: "نص قراءة A1",
      description: "نص قراءة مبسط جداً لمستوى المبتدئين (A1). اقرأ النص ثم أجب بـ (صح) أو (خطأ).",
      parts: [
        {
          type: "true-false",
          title: "A1: معلومات شخصية",
          instructionsAr: "اقرأ رسالة التعارف التالية من \"توم\"، ثم أجب عن الأسئلة بـ صح أو خطأ.",
          textDe: "Hallo! Ich heiße Tom und ich bin 25 Jahre alt. Ich komme aus Berlin, aber ich wohne jetzt in München. Ich bin Student und lerne Informatik. In meiner Freizeit spiele ich gerne Fußball und lese Bücher. Ich spreche Deutsch, Englisch und ein bisschen Spanisch. Mein Lieblingsessen ist Pizza.",
          questions: [
            {
              id: "lesen-a1-1",
              statementDe: "Tom ist 25 Jahre alt.",
              correct: true,
              explanation: "في السطر الأول: ich bin 25 Jahre alt."
            },
            {
              id: "lesen-a1-2",
              statementDe: "Tom wohnt in Berlin.",
              correct: false,
              explanation: "قال إنه من برلين، ولكنه يسكن الآن في ميونخ: ich wohne jetzt in München."
            },
            {
              id: "lesen-a1-3",
              statementDe: "Tom arbeitet als Arzt.",
              correct: false,
              explanation: "قال إنه طالب في مجال المعلوماتية: Ich bin Student und lerne Informatik."
            },
            {
              id: "lesen-a1-4",
              statementDe: "Tom mag Pizza.",
              correct: true,
              explanation: "قال إن طعامه المفضل هو البيتزا: Mein Lieblingsessen ist Pizza."
            }
          ]
        }
      ]
    },
    {
      id: "lesen-a2",
      title: "نص قراءة A2",
      description: "نص قراءة لمستوى (A2) مع أسئلة اختيار من متعدد.",
      parts: [
        {
          type: "mc-article",
          title: "A2: في المطعم",
          instructionsAr: "اقرأ المقال القصير ثم أجب عن الأسئلة. اختر a أو b أو c.",
          textDe: "Das Restaurant „Zur alten Post\" ist ein sehr beliebtes Restaurant im Stadtzentrum. Viele Leute kommen hierher, weil das Essen sehr gut und günstig ist. Am Wochenende ist das Restaurant oft voll, deshalb muss man einen Tisch reservieren. Das Restaurant öffnet jeden Tag von 11:00 Uhr bis 23:00 Uhr, nur am Montag ist Ruhetag. Die Spezialität des Hauses ist der Apfelstrudel mit Vanillesauce.",
          questions: [
            {
              id: "lesen-a2-1",
              promptDe: "Warum kommen viele Leute in das Restaurant?",
              promptAr: "لماذا يأتي الكثير من الناس إلى المطعم؟",
              options: [
                {
                  id: "a",
                  de: "Weil es im Stadtzentrum ist."
                },
                {
                  id: "b",
                  de: "Weil das Essen lecker und billig ist."
                },
                {
                  id: "c",
                  de: "Weil es am Montag offen ist."
                }
              ],
              correct: "b",
              explanation: "النص يقول: weil das Essen sehr gut und günstig ist (لأن الطعام جيد ورخيص)."
            },
            {
              id: "lesen-a2-2",
              promptDe: "Was muss man am Wochenende machen?",
              promptAr: "ماذا يجب على المرء أن يفعل في عطلة نهاية الأسبوع؟",
              options: [
                {
                  id: "a",
                  de: "Man muss einen Tisch reservieren."
                },
                {
                  id: "b",
                  de: "Man muss vor 11 Uhr kommen."
                },
                {
                  id: "c",
                  de: "Man darf nur Apfelstrudel essen."
                }
              ],
              correct: "a",
              explanation: "النص يذكر أنه بسبب الازدحام يجب حجز طاولة: muss man einen Tisch reservieren."
            },
            {
              id: "lesen-a2-3",
              promptDe: "Wann hat das Restaurant geschlossen?",
              promptAr: "متى يكون المطعم مغلقاً؟",
              options: [
                {
                  id: "a",
                  de: "Jeden Tag um 22:00 Uhr."
                },
                {
                  id: "b",
                  de: "Am Wochenende."
                },
                {
                  id: "c",
                  de: "Am Montag."
                }
              ],
              correct: "c",
              explanation: "يقول النص إن يوم الاثنين هو يوم العطلة (Ruhetag)."
            }
          ]
        }
      ]
    }
  ];

  const injectStr = JSON.stringify(a1a2).slice(1, -1) + ',';
  
  // Inject right after 'var e=['
  const newChunk = orig.slice(0, start + 7) + injectStr + orig.slice(start + 7);
  fs.writeFileSync('public/assets/data-lesen-D_1VaT8K.js', newChunk);
  console.log('Successfully injected into lesen! New length:', newChunk.length);
} else {
  console.log('Could not find var e=[');
}
