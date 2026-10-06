import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';
import { cn } from '../../lib/utils';
import { isReducedMotion } from '../../lib/motion';

/**
 * D3/M5 — NumberTicker. Counts once when in view (~1.2s spring ease-out).
 * Screen readers get the FINAL value (sr-only), never the count-up; the
 * animated span is aria-hidden. Instant under reduced motion.
 * tabular-nums — the width never jumps.
 */
interface NumberTickerProps {
  value: number;
  direction?: 'up' | 'down';
  className?: string;
  delay?: number;
  decimalPlaces?: number;
}

export const NumberTicker: React.FC<NumberTickerProps> = ({
  value,
  direction = 'up',
  delay = 0,
  className,
  decimalPlaces = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const formattedValue = Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);

  const motionValue = useMotionValue(direction === 'down' ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 120,
  });
  const isInView = useInView(ref, { once: true, margin: '50px' });

  useEffect(() => {
    if (isReducedMotion()) {
      if (ref.current) {
        ref.current.textContent = formattedValue;
      }
      return;
    }

    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === 'down' ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [motionValue, isInView, delay, value, direction, formattedValue]);

  useEffect(() => {
    if (isReducedMotion()) return;

    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US', {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(latest.toFixed(decimalPlaces)));
      }
    });
  }, [springValue, decimalPlaces]);

  return (
    <>
      <span
        className={cn('inline-block tabular-nums', className)}
        ref={ref}
        aria-hidden="true"
      >
        {formattedValue}
      </span>
      <span className="sr-only">{formattedValue}</span>
    </>
  );
};

export default NumberTicker;
