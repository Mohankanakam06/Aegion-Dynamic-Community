import confetti from 'canvas-confetti';
import { isReducedMotion } from './motion';

export const triggerEmberConfetti = () => {
  if (isReducedMotion()) return;

  const colors = ['#E85D1A', '#FF783A', '#F2C9A5', '#C4460E', '#FF9E66', '#FFFFFF'];

  // Left cannon
  confetti({
    particleCount: 45,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.8 },
    colors,
  });

  // Right cannon
  confetti({
    particleCount: 45,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.8 },
    colors,
  });

  // Center starburst
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { y: 0.6 },
      colors,
      shapes: ['circle', 'square'],
      ticks: 200,
      gravity: 1.1,
      scalar: 1.1,
    });
  }, 180);
};
