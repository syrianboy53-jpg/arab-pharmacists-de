export interface Achievement {
  id: string; title: string; description: string; emoji: string
  category: 'learning' | 'streak' | 'speed' | 'exploration' | 'champion'
  condition: string; rarity: 'common' | 'rare' | 'epic' | 'legendary'; xpReward: number
}

export const achievements: Achievement[] = [
  { id: 'first_word', title: 'أول كلمة', description: 'تعلمت أول كلمة ألمانية', emoji: '🌱', category: 'learning', condition: 'xp >= 10', rarity: 'common', xpReward: 20 },
  { id: 'vocab_100', title: 'قاموس صغير', description: 'جمعت 100 XP', emoji: '📖', category: 'learning', condition: 'xp >= 100', rarity: 'common', xpReward: 30 },
  { id: 'vocab_500', title: 'صياد الكلمات', description: 'جمعت 500 XP', emoji: '🎣', category: 'learning', condition: 'xp >= 500', rarity: 'rare', xpReward: 60 },
  { id: 'vocab_1000', title: 'موسوعة لغوية', description: 'جمعت 1000 XP', emoji: '📚', category: 'learning', condition: 'xp >= 1000', rarity: 'rare', xpReward: 100 },
  { id: 'vocab_5000', title: 'أستاذ اللغة', description: 'جمعت 5000 XP', emoji: '🎓', category: 'learning', condition: 'xp >= 5000', rarity: 'epic', xpReward: 300 },
  { id: 'story_first', title: 'قارئ مبتدئ', description: 'أنهيت أول قصة تفاعلية', emoji: '📰', category: 'learning', condition: 'stories >= 1', rarity: 'common', xpReward: 25 },
  { id: 'story_3', title: 'عاشق القراءة', description: 'أنهيت 3 قصص', emoji: '📜', category: 'learning', condition: 'stories >= 3', rarity: 'rare', xpReward: 80 },
  { id: 'story_all', title: 'روائي B1', description: 'أنهيت كل القصص الخمس', emoji: '🏛️', category: 'learning', condition: 'stories >= 5', rarity: 'epic', xpReward: 200 },
  { id: 'streak_3', title: 'بداية الطريق', description: 'ثلاثة أيام دراسة متتالية', emoji: '🔥', category: 'streak', condition: 'streak >= 3', rarity: 'common', xpReward: 30 },
  { id: 'streak_7', title: 'أسبوع من النار', description: 'سبعة أيام متتالية', emoji: '🌋', category: 'streak', condition: 'streak >= 7', rarity: 'common', xpReward: 70 },
  { id: 'streak_14', title: 'إصرار لا يتوقف', description: 'أسبوعان متتاليان', emoji: '⚡', category: 'streak', condition: 'streak >= 14', rarity: 'rare', xpReward: 140 },
  { id: 'streak_30', title: 'شهر من الإبداع', description: 'ثلاثون يوماً متتالياً', emoji: '🏆', category: 'streak', condition: 'streak >= 30', rarity: 'epic', xpReward: 300 },
  { id: 'streak_100', title: 'أسطورة الثبات', description: 'مئة يوم متتالياً', emoji: '💎', category: 'streak', condition: 'streak >= 100', rarity: 'legendary', xpReward: 1000 },
  { id: 'speed_first', title: 'بداية السرعة', description: 'لعبت تحدي السرعة للمرة الأولى', emoji: '🏃', category: 'speed', condition: 'speedPlayed >= 1', rarity: 'common', xpReward: 20 },
  { id: 'speed_50', title: 'خاطف البرق', description: 'سجّلت 50+ نقطة في تحدي السرعة', emoji: '⚡', category: 'speed', condition: 'speedScore >= 50', rarity: 'rare', xpReward: 80 },
  { id: 'speed_100', title: 'لا يُقهر', description: 'سجّلت 100+ نقطة في تحدي السرعة', emoji: '🚀', category: 'speed', condition: 'speedScore >= 100', rarity: 'epic', xpReward: 200 },
  { id: 'wheel_first', title: 'حظ مبتدئ', description: 'لعبت عجلة الحظ للمرة الأولى', emoji: '🎲', category: 'speed', condition: 'wheelPlayed >= 1', rarity: 'common', xpReward: 15 },
  { id: 'wheel_10', title: 'عاشق الحظ', description: 'لعبت عجلة الحظ 10 مرات', emoji: '🎡', category: 'speed', condition: 'wheelPlayed >= 10', rarity: 'rare', xpReward: 60 },
  { id: 'daily_first', title: 'بطل اليوم', description: 'أكملت أول تحدي يومي', emoji: '📅', category: 'exploration', condition: 'dailyCompleted >= 1', rarity: 'common', xpReward: 20 },
  { id: 'daily_7', title: 'أسبوع بطولي', description: 'أكملت 7 تحديات يومية', emoji: '📆', category: 'exploration', condition: 'dailyCompleted >= 7', rarity: 'rare', xpReward: 80 },
  { id: 'daily_30', title: 'مداوم كالشمس', description: 'أكملت 30 تحدياً يومياً', emoji: '☀️', category: 'exploration', condition: 'dailyCompleted >= 30', rarity: 'epic', xpReward: 250 },
  { id: 'level_5', title: 'مستوى متوسط', description: 'وصلت إلى المستوى 5', emoji: '🥉', category: 'champion', condition: 'level >= 5', rarity: 'common', xpReward: 50 },
  { id: 'level_10', title: 'مستوى متقدم', description: 'وصلت إلى المستوى 10', emoji: '🥈', category: 'champion', condition: 'level >= 10', rarity: 'rare', xpReward: 100 },
  { id: 'level_20', title: 'خبير B1', description: 'وصلت إلى المستوى 20', emoji: '🥇', category: 'champion', condition: 'level >= 20', rarity: 'epic', xpReward: 200 },
  { id: 'b1_ready', title: 'جاهز للامتحان', description: 'جمعت 2000 XP وأكملت 7 أيام streak', emoji: '🎯', category: 'champion', condition: 'xp >= 2000 && streak >= 7', rarity: 'epic', xpReward: 300 },
  { id: 'legend', title: 'أسطورة B1', description: 'جمعت 10000 XP', emoji: '👑', category: 'champion', condition: 'xp >= 10000', rarity: 'legendary', xpReward: 1000 },
]

export const categoryLabels: Record<string, string> = {
  learning: 'التعلم 📚', streak: 'الثبات 🔥', speed: 'السرعة ⚡', exploration: 'الاستكشاف 📅', champion: 'البطولة 🏆',
}
export const rarityColors: Record<string, string> = {
  common: 'from-gray-400 to-gray-500', rare: 'from-blue-500 to-indigo-600',
  epic: 'from-purple-500 to-violet-600', legendary: 'from-yellow-400 to-orange-500',
}
export const rarityLabels: Record<string, string> = {
  common: 'عادي', rare: 'نادر', epic: 'نادر جداً', legendary: 'أسطوري',
}
