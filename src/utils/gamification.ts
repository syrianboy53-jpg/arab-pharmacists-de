import confetti from 'canvas-confetti';

// Audio instances
let correctAudio: HTMLAudioElement | null = null;
let wrongAudio: HTMLAudioElement | null = null;
let tadaAudio: HTMLAudioElement | null = null;

if (typeof window !== 'undefined') {
  correctAudio = new Audio('/audio/correct.ogg');
  wrongAudio = new Audio('/audio/wrong.ogg');
  tadaAudio = new Audio('/audio/tada.ogg');
  
  // Preload
  correctAudio.load();
  wrongAudio.load();
  tadaAudio.load();
}

export const playCorrectSound = () => {
  if (correctAudio) {
    correctAudio.currentTime = 0;
    correctAudio.play().catch(e => console.warn('Audio play failed:', e));
  }
};

export const playWrongSound = () => {
  if (wrongAudio) {
    wrongAudio.currentTime = 0;
    wrongAudio.play().catch(e => console.warn('Audio play failed:', e));
  }
};

export const playTadaSound = () => {
  if (tadaAudio) {
    tadaAudio.currentTime = 0;
    tadaAudio.play().catch(e => console.warn('Audio play failed:', e));
  }
};

export const triggerConfetti = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
};
