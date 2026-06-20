import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  type SRSCard,
  calculateNextReview,
  isCardDue,
  getInitialCard,
} from '../lib/srs';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SRSState {
  cards: SRSCard[];
}

interface SRSStats {
  totalCards: number;
  dueToday: number;
  mastered: number; // cards with interval >= 21 days
}

interface UseSRSReturn {
  addCard: (id: string, category: string) => void;
  getCardsToReview: () => SRSCard[];
  reviewCard: (id: string, quality: 0 | 1 | 2 | 3 | 4 | 5) => void;
  stats: SRSStats;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'b1_srs';
const MASTERED_INTERVAL = 21; // days — card is considered "mastered"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDefaultState(): SRSState {
  return { cards: [] };
}

function loadState(): SRSState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && 'cards' in parsed) {
      return parsed as SRSState;
    }
    return getDefaultState();
  } catch {
    return getDefaultState();
  }
}

function saveState(state: SRSState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSRS(): UseSRSReturn {
  const [state, setState] = useState<SRSState>(loadState);

  // Persist on every state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  /**
   * Add a new card to the SRS deck.
   * If a card with the same ID already exists, it is skipped.
   */
  const addCard = useCallback((id: string, category: string) => {
    setState((prev) => {
      // Don't add duplicates
      if (prev.cards.some((c) => c.id === id)) {
        return prev;
      }

      const card = getInitialCard(id, category);
      return { cards: [...prev.cards, card] };
    });
  }, []);

  /**
   * Get all cards that are due for review today.
   */
  const getCardsToReview = useCallback((): SRSCard[] => {
    return state.cards.filter(isCardDue);
  }, [state.cards]);

  /**
   * Review a card with a quality score (0–5) and update its schedule.
   */
  const reviewCard = useCallback(
    (id: string, quality: 0 | 1 | 2 | 3 | 4 | 5) => {
      setState((prev) => {
        const cardIndex = prev.cards.findIndex((c) => c.id === id);
        if (cardIndex === -1) return prev;

        const card = prev.cards[cardIndex];
        const updatedCard = calculateNextReview(card, quality);

        const newCards = [...prev.cards];
        newCards[cardIndex] = updatedCard;

        return { cards: newCards };
      });
    },
    []
  );

  /**
   * Computed stats about the SRS deck.
   */
  const stats: SRSStats = useMemo(() => {
    const totalCards = state.cards.length;
    const dueToday = state.cards.filter(isCardDue).length;
    const mastered = state.cards.filter(
      (c) => c.interval >= MASTERED_INTERVAL
    ).length;

    return { totalCards, dueToday, mastered };
  }, [state.cards]);

  return {
    addCard,
    getCardsToReview,
    reviewCard,
    stats,
  };
}
