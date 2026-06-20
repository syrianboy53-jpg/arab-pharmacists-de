import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useXP } from '../hooks/useXP';
import {
  getLevelTitle,
  getLevelColor,
  getProgressToNextLevel,
  getXPForLevel,
  XP_PER_LEVEL,
} from '../lib/gamification';

/**
 * XPBar — A compact, animated XP progress bar for the header/nav area.
 *
 * Shows: current level, Arabic title, XP progress to next level,
 *        streak fire emoji, and a level-up celebration on transition.
 */
export default function XPBar() {
  const { xp, level, streak } = useXP();

  const progress = getProgressToNextLevel(xp); // 0–100
  const title = getLevelTitle(level);
  const colorClasses = getLevelColor(level);
  const currentLevelXP = xp - getXPForLevel(level);
  const xpNeeded = XP_PER_LEVEL;

  // ── Level-up celebration ────────────────────────────────────────────────
  const prevLevelRef = useRef(level);
  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    if (prevLevelRef.current !== 0 && level > prevLevelRef.current) {
      setShowLevelUp(true);
      const timer = setTimeout(() => setShowLevelUp(false), 2500);
      return () => clearTimeout(timer);
    }
    prevLevelRef.current = level;
  }, [level]);

  return (
    <div className="relative w-full max-w-xs">
      {/* Main bar container */}
      <div className="flex items-center gap-2">
        {/* Level badge */}
        <div
          className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border-2 border-current ${colorClasses}`}
        >
          {level}
        </div>

        {/* Progress section */}
        <div className="flex-1 min-w-0">
          {/* Title + XP info row */}
          <div className="flex items-center justify-between text-[11px] mb-0.5">
            <span className="font-semibold text-gray-700 dark:text-gray-300 truncate">
              {title}
            </span>
            <span className="text-gray-500 dark:text-gray-400 tabular-nums shrink-0 mr-1" dir="ltr">
              {currentLevelXP}/{xpNeeded}
            </span>
          </div>

          {/* Progress bar track */}
          <div className="relative h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            {/* Animated fill */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-300"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-y-0 left-0 w-full rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Streak indicator */}
        {streak > 0 && (
          <motion.div
            className="shrink-0 flex items-center gap-0.5 text-xs font-bold text-orange-500 dark:text-orange-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <span>🔥</span>
            <span>{streak}</span>
          </motion.div>
        )}
      </div>

      {/* ── Level-up celebration overlay ──────────────────────────────── */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            initial={{ opacity: 0, y: 10, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          >
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap flex items-center gap-1">
              <span>🎉</span>
              <span>مستوى جديد!</span>
              <span className="bg-white/30 rounded-full px-1.5">{level}</span>
              <span>🎉</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration sparkles */}
      <AnimatePresence>
        {showLevelUp && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-sm pointer-events-none"
                style={{
                  left: `${15 + i * 14}%`,
                  top: '0%',
                }}
                initial={{ opacity: 1, y: 0, scale: 0 }}
                animate={{
                  opacity: [1, 1, 0],
                  y: [0, -25 - Math.random() * 15],
                  scale: [0, 1.2, 0.5],
                  x: [(i % 2 === 0 ? -1 : 1) * (5 + Math.random() * 10)],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              >
                {['✨', '⭐', '🌟', '💫', '🎊', '🏆'][i]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
