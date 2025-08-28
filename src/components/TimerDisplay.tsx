import React from 'react';
import { formatMmSs, nowMs } from '../lib/time';

type Props = {
  remainingSeconds: number;
  blink?: boolean;
};

export const TimerDisplay: React.FC<Props> = ({ remainingSeconds, blink }) => {
  const [tick, setTick] = React.useState(0);
  const rafRef = React.useRef<number | null>(null);
  const baseRef = React.useRef<number>(nowMs());

  React.useEffect(() => {
    const loop = () => {
      setTick((t) => t + 1);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const display = formatMmSs(remainingSeconds);
  const className = `w-full h-full flex items-center justify-center select-none ${
    blink ? 'animate-blink' : ''
  }`;
  return (
    <div className={className} aria-live="polite">
      <span style={{ fontSize: '12vw', lineHeight: 1 }}>{display}</span>
    </div>
  );
};

