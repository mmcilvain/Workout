import type { WorkoutPlan } from './types';

type PlanCardProps = {
  plan: WorkoutPlan;
  isSelected: boolean;
  onSelect: (planId: string) => void;
};

export function PlanCard({ plan, isSelected, onSelect }: PlanCardProps) {
  return (
    <article className={`plan-card ${isSelected ? 'plan-card--selected' : ''}`}>
      <div className="plan-card__content">
        <span className="plan-card__eyebrow" style={{ color: plan.accent }}>
          {plan.intensity}
        </span>
        <h3>{plan.name}</h3>
        <p>{plan.goal}</p>
        <dl className="plan-card__meta" aria-label={`${plan.name} details`}>
          <div>
            <dt>Duration</dt>
            <dd>{plan.duration}</dd>
          </div>
          <div>
            <dt>Steps</dt>
            <dd>{plan.steps.length}</dd>
          </div>
        </dl>
      </div>
      <button
        className="button button--card"
        type="button"
        aria-pressed={isSelected}
        onClick={() => onSelect(plan.id)}
      >
        {isSelected ? 'Selected' : 'Choose plan'}
      </button>
    </article>
  );
}
