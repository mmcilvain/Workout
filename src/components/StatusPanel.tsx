type StatusPanelProps = {
  title: string;
  message: string;
  variant: 'loading' | 'empty' | 'error';
  actionLabel?: string;
  onAction?: () => void;
};

export function StatusPanel({ title, message, variant, actionLabel, onAction }: StatusPanelProps) {
  return (
    <section className={`status-panel status-panel--${variant}`} aria-live="polite" aria-busy={variant === 'loading'}>
      <div className="status-panel__icon" aria-hidden="true">
        {variant === 'loading' ? '●' : variant === 'empty' ? '○' : '!'}
      </div>
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
        {actionLabel && onAction ? (
          <button className="button button--secondary" type="button" onClick={onAction}>
            {actionLabel}
          </button>
        ) : null}
      </div>
    </section>
  );
}
