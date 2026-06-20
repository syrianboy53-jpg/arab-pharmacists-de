/**
 * Gamification utility functions
 * XP, levels, titles, and visual theming
 */

export const XP_PER_LEVEL = 500;

/**
 * Calculate level from total XP.
 * Every 500 XP = 1 level, starting from level 1.
 */
export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

/**
 * Get the total XP required to reach a given level.
 * Level 1 requires 0 XP, level 2 requires 500 XP, etc.
 */
export function getXPForLevel(level: number): number {
  return (level - 1) * XP_PER_LEVEL;
}

/**
 * Get progress percentage (0–100) toward the next level.
 */
export function getProgressToNextLevel(xp: number): number {
  const currentLevelXP = xp % XP_PER_LEVEL;
  return Math.round((currentLevelXP / XP_PER_LEVEL) * 100);
}

/**
 * Get an Arabic title for the player's level tier.
 */
export function getLevelTitle(level: number): string {
  if (level >= 20) return 'أسطورة'; // Legend
  if (level >= 15) return 'محترف'; // Professional
  if (level >= 10) return 'خبير'; // Expert
  if (level >= 5) return 'متقدم'; // Advanced
  if (level >= 3) return 'متعلم'; // Learner
  return 'مبتدئ'; // Beginner
}

/**
 * Get Tailwind color classes for the player's level tier.
 * Returns a string with text and background color utilities.
 */
export function getLevelColor(level: number): string {
  if (level >= 20) return 'text-amber-400 bg-amber-400/10';
  if (level >= 15) return 'text-purple-400 bg-purple-400/10';
  if (level >= 10) return 'text-red-400 bg-red-400/10';
  if (level >= 5) return 'text-blue-400 bg-blue-400/10';
  if (level >= 3) return 'text-emerald-400 bg-emerald-400/10';
  return 'text-gray-400 bg-gray-400/10';
}
