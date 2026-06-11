interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total === 0 ? 0 : (current / total) * 100;

  return (
    <div className="progress" aria-label={`Step ${current} of ${total}`}>
      <div className="progress__text">
        <span>Progress</span>
        <strong>
          {current} / {total}
        </strong>
      </div>
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
