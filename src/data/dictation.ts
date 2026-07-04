export interface DictationSentence {
  id: string
  text: string
  translation: string
  level: 'A1' | 'A2' | 'B1' | 'B2'
}

export const dictationSentences: DictationSentence[] = [
  { id: 'd1', text: 'Guten Morgen, wie geht es Ihnen heute?', translation: 'صباح الخير، كيف حالك اليوم؟', level: 'A1' },
  { id: 'd2', text: 'Ich möchte gerne einen Termin vereinbaren.', translation: 'أود تحديد موعد.', level: 'A2' },
  { id: 'd3', text: 'Können Sie mir bitte sagen, wie ich zum Bahnhof komme?', translation: 'هل يمكنك أن تخبرني من فضلك كيف أصل إلى محطة القطار؟', level: 'A2' },
  { id: 'd4', text: 'Es tut mir leid, aber ich kann heute leider nicht kommen.', translation: 'أنا آسف، ولكن لا أستطيع المجيء اليوم للأسف.', level: 'B1' },
  { id: 'd5', text: 'Trotz des schlechten Wetters sind wir spazieren gegangen.', translation: 'على الرغم من الطقس السيء، ذهبنا للتمشي.', level: 'B1' },
  { id: 'd6', text: 'Ich habe mich sehr über deine Einladung gefreut.', translation: 'سعدت جداً بدعوتك.', level: 'B1' },
  { id: 'd7', text: 'Je mehr du übst, desto besser wirst du die Sprache sprechen.', translation: 'كلما تدربت أكثر، كلما تحدثت اللغة بشكل أفضل.', level: 'B2' },
  { id: 'd8', text: 'Es ist von großer Bedeutung, sich auf die Prüfung vorzubereiten.', translation: 'من الأهمية بمكان التحضير للامتحان.', level: 'B2' },
]
