import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useXP } from '../hooks/useXP';

/**
 * Get the last 7 days as YYYY-MM-DD strings, from 6 days ago → today.
 */
function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    );
  }
  return days;
}

/**
 * Short Arabic day-of-week labels.
 */
function getArabicDayLabel(dateStr: string): string {
  const dayNames = ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'];
  const d = new Date(dateStr + 'T12:00:00');
  return dayNames[d.getDay()];
}

/**
 * Get today's date as YYYY-MM-DD.
 */
function getTodayStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

/**
 * DailyStreak — A compact card showing the current streak, 7-day calendar,
 * and longest streak.
 *
 * Uses the useXP hook internally (no props needed).
 */
export default function DailyStreak() {
  const { streak, longestStreak, studyDates } = useXP();

  const today = getTodayStr();
  const last7 = useMemo(() => getLast7Days(), []);

  // Build a Set for O(1) lookups
  const studiedSet = useMemo(
    () => new Set(studyDates ?? []),
    [studyDates]
  );

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50">
      {/* ── Header: Streak number ──────────────────────────────────── */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.span
            className="text-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            🔥
          </motion.span>
          <div>
            <div className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
              {streak} {streak === 1 ? 'يوم' : 'أيام'}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">
              سلسلة التعلّم الحالية
            </div>
          </div>
        </div>

        {/* Longest streak */}
        <div className="text-left">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            🏆 أطول سلسلة
          </div>
          <div className="text-sm font-bold text-amber-600 dark:text-amber-400">
            {longestStreak} {longestStreak === 1 ? 'يوم' : 'أيام'}
          </div>
        </div>
      </div>

      {/* ── 7-day calendar dots ────────────────────────────────────── */}
      <div className="grid grid-cols-7 gap-1">
        {last7.map((dateStr) => {
          const isStudied = studiedSet.has(dateStr);
          const isCurrentDay = dateStr === today;

          return (
            <div key={dateStr} className="flex flex-col items-center gap-1">
              {/* Day label */}
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                {getArabicDayLabel(dateStr)}
              </span>

              {/* Dot */}
              <motion.div
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                  transition-colors
                  ${
                    isStudied
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }
                  ${isCurrentDay && !isStudied ? 'ring-2 ring-emerald-400/50 dark:ring-emerald-500/40' : ''}
                `}
                // Pulse animation on current day
                animate={
                  isCurrentDay
                    ? {
                        scale: [1, 1.1, 1],
                        boxShadow: isStudied
                          ? [
                              '0 0 0 0 rgba(16,185,129,0)',
                              '0 0 0 6px rgba(16,185,129,0.2)',
                              '0 0 0 0 rgba(16,185,129,0)',
                            ]
                          : [
                              '0 0 0 0 rgba(156,163,175,0)',
                              '0 0 0 6px rgba(156,163,175,0.15)',
                              '0 0 0 0 rgba(156,163,175,0)',
                            ],
                      }
                    : {}
                }
                transition={
                  isCurrentDay
                    ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                    : {}
                }
              >
                {isStudied ? '✓' : dateStr.slice(-2)}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── Motivational message ───────────────────────────────────── */}
      <div className="mt-3 text-center">
        <span className="text-[11px] text-gray-400 dark:text-gray-500">
          {streak === 0
            ? 'ابدأ التعلّم اليوم لبدء سلسلة جديدة! 💪'
            : streak >= 30
              ? 'أداء أسطوري! استمر هكذا 🌟'
              : streak >= 7
                ? 'أسبوع كامل! أنت رائع 🎉'
                : streak >= 3
                  ? 'ممتاز! حافظ على تقدمك 🔥'
                  : 'بداية رائعة! واصل التعلّم 🚀'}
        </span>
      </div>
    </div>
  );
}
