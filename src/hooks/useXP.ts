import { useState, useCallback, useEffect } from 'react';
import { getLevelFromXP } from '../lib/gamification';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Badge {
  id: string;
  name: string;
  icon: string;
  earnedAt: string; // ISO date string
}

interface GamificationState {
  xp: number;
  streak: number;
  longestStreak: number;
  lastStudyDate: string | null; // ISO date string (date only: YYYY-MM-DD)
  studyDates: string[]; // Array of YYYY-MM-DD dates the user studied
  badges: Badge[];
}

interface UseXPReturn {
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  todayCompleted: boolean;
  studyDates: string[];
  badges: Badge[];
  addXP: (amount: number) => void;
  checkStreak: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'b1_gamification';

const BADGE_DEFINITIONS: Record<string, { name: string; icon: string }> = {
  first_lesson: { name: 'الدرس الأول', icon: '🎯' },
  week_streak: { name: 'أسبوع متواصل', icon: '🔥' },
  month_streak: { name: 'شهر متواصل', icon: '⭐' },
  xp_500: { name: '500 نقطة', icon: '💎' },
  xp_1000: { name: '1000 نقطة', icon: '🏆' },
  xp_5000: { name: '5000 نقطة', icon: '👑' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDefaultState(): GamificationState {
  return {
    xp: 0,
    streak: 0,
    longestStreak: 0,
    lastStudyDate: null,
    studyDates: [],
    badges: [],
  };
}

function loadState(): GamificationState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed as GamificationState;
    }
    return getDefaultState();
  } catch {
    return getDefaultState();
  }
}

function saveState(state: GamificationState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getTodayDateString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function hasBadge(badges: Badge[], id: string): boolean {
  return badges.some((b) => b.id === id);
}

function awardBadge(badges: Badge[], id: string): Badge[] {
  if (hasBadge(badges, id)) return badges;
  const def = BADGE_DEFINITIONS[id];
  if (!def) return badges;
  return [
    ...badges,
    { id, name: def.name, icon: def.icon, earnedAt: new Date().toISOString() },
  ];
}

/**
 * Check and auto-award badges based on current state.
 * Returns a new badges array with any newly earned badges added.
 */
function checkBadges(state: GamificationState): Badge[] {
  let { badges } = state;

  // First XP ever earned
  if (state.xp > 0) {
    badges = awardBadge(badges, 'first_lesson');
  }

  // Streak badges
  if (state.streak >= 7) {
    badges = awardBadge(badges, 'week_streak');
  }
  if (state.streak >= 30) {
    badges = awardBadge(badges, 'month_streak');
  }

  // XP milestones
  if (state.xp >= 500) {
    badges = awardBadge(badges, 'xp_500');
  }
  if (state.xp >= 1000) {
    badges = awardBadge(badges, 'xp_1000');
  }
  if (state.xp >= 5000) {
    badges = awardBadge(badges, 'xp_5000');
  }

  return badges;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useXP(): UseXPReturn {
  const [state, setState] = useState<GamificationState>(loadState);

  // Persist on every state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const todayCompleted = state.lastStudyDate === getTodayDateString();
  const level = getLevelFromXP(state.xp);

  const addXP = useCallback((amount: number) => {
    setState((prev) => {
      const today = getTodayDateString();
      const yesterday = getYesterdayDateString();

      let newStreak = prev.streak;

      // Update streak based on last study date
      if (prev.lastStudyDate === today) {
        // Already studied today — streak stays the same
      } else if (prev.lastStudyDate === yesterday) {
        // Studied yesterday — continue the streak
        newStreak += 1;
      } else {
        // Missed a day or first time — start new streak
        newStreak = 1;
      }

      const newLongestStreak = Math.max(prev.longestStreak, newStreak);
      const newXP = prev.xp + Math.max(0, amount);

      // Track study dates (keep last 90 days)
      const newStudyDates = prev.studyDates ? [...prev.studyDates] : [];
      if (!newStudyDates.includes(today)) {
        newStudyDates.push(today);
      }
      // Trim to last 90 entries
      while (newStudyDates.length > 90) {
        newStudyDates.shift();
      }

      const updatedState: GamificationState = {
        xp: newXP,
        streak: newStreak,
        longestStreak: newLongestStreak,
        lastStudyDate: today,
        studyDates: newStudyDates,
        badges: prev.badges,
      };

      // Check for new badges
      updatedState.badges = checkBadges(updatedState);

      return updatedState;
    });
  }, []);

  const checkStreak = useCallback(() => {
    setState((prev) => {
      const today = getTodayDateString();
      const yesterday = getYesterdayDateString();

      // If last study was today or yesterday, streak is still alive
      if (prev.lastStudyDate === today || prev.lastStudyDate === yesterday) {
        return prev;
      }

      // Streak broken — reset to 0 but keep longestStreak
      if (prev.streak === 0) return prev; // already reset

      return {
        ...prev,
        streak: 0,
      };
    });
  }, []);

  return {
    xp: state.xp,
    level,
    streak: state.streak,
    longestStreak: state.longestStreak,
    todayCompleted,
    studyDates: state.studyDates ?? [],
    badges: state.badges,
    addXP,
    checkStreak,
  };
}
