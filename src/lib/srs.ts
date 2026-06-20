/**
 * SM-2 Spaced Repetition Algorithm
 * Based on the SuperMemo SM-2 algorithm by Piotr Wozniak
 */

export interface SRSCard {
  id: string;
  category: string;
  interval: number; // days until next review
  repetitions: number; // number of consecutive correct reviews
  easeFactor: number; // ease factor (minimum 1.3)
  nextReview: string; // ISO date string
  lastReview: string; // ISO date string
}

/**
 * Calculate the next review date and updated card parameters
 * based on the SM-2 algorithm.
 *
 * @param card - The current SRS card
 * @param quality - Quality of response (0-5)
 *   0 - Complete blackout
 *   1 - Incorrect, but remembered upon seeing answer
 *   2 - Incorrect, but answer seemed easy to recall
 *   3 - Correct with serious difficulty
 *   4 - Correct with some hesitation
 *   5 - Perfect response
 */
export function calculateNextReview(card: SRSCard, quality: number): SRSCard {
  const clampedQuality = Math.max(0, Math.min(5, Math.round(quality)));

  let { repetitions, easeFactor, interval } = card;

  // Calculate new ease factor
  const newEaseFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - clampedQuality) * (0.08 + (5 - clampedQuality) * 0.02))
  );

  if (clampedQuality < 3) {
    // Failed review — reset repetitions and interval
    repetitions = 0;
    interval = 1;
  } else {
    // Successful review
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * newEaseFactor);
    }
    repetitions += 1;
  }

  const now = new Date();
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    ...card,
    interval,
    repetitions,
    easeFactor: newEaseFactor,
    nextReview: nextReview.toISOString(),
    lastReview: now.toISOString(),
  };
}

/**
 * Check if a card is due for review (next review date is today or in the past).
 */
export function isCardDue(card: SRSCard): boolean {
  const now = new Date();
  const reviewDate = new Date(card.nextReview);

  // Compare dates only (ignore time)
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const reviewStart = new Date(
    reviewDate.getFullYear(),
    reviewDate.getMonth(),
    reviewDate.getDate()
  );

  return reviewStart <= todayStart;
}

/**
 * Create an initial SRS card with default SM-2 parameters.
 * The card is immediately due for its first review.
 */
export function getInitialCard(id: string, category: string): SRSCard {
  const now = new Date().toISOString();

  return {
    id,
    category,
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    nextReview: now, // due immediately
    lastReview: now,
  };
}
