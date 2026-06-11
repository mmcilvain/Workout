import type { CSSProperties } from 'react';
import { formatTime } from '../utils/workout';

interface TimerProps {
  secondsRemaining: number;
  durationSeconds: number;
  isRunning: boolean;
}

export function Timer({ secondsRemaining, durationSeconds, isRunning }: TimerProps) {
  const elapsedPercent =
    durationSeconds === 0 ? 100 : ((durationSeconds - secondsRemaining) / durationSeconds) * 100;

  return (
    <div className="timer" aria-live="polite">
      <div
        className="timer__ring"
        style={{ '--timer-progress': `${Math.min(Math.max(elapsedPercent, 0), 100)}%` } as CSSProperties}
      >
        <span className="timer__time">{formatTime(secondsRemaining)}</span>
      </div>
      <p className="timer__status">{isRunning ? 'Keep moving' : 'Paused'}</p>
    </div>
  );
}
