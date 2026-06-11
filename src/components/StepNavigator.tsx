import type { WorkoutPlan } from './types';

type StepNavigatorProps = {
  plan: WorkoutPlan;
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  onSelectStep: (stepIndex: number) => void;
};

export function StepNavigator({ plan, currentStep, onNext, onPrevious, onReset, onSelectStep }: StepNavigatorProps) {
  const totalSteps = plan.steps.length;
  const isFirstStep = currentStep === 0;
  const isFinalStep = currentStep === totalSteps - 1;

  return (
    <section className="step-card" aria-labelledby="current-step-heading">
      <div className="step-card__header">
        <p className="section-label">Today&apos;s flow</p>
        <h2 id="current-step-heading">{plan.name}</h2>
        <p>
          Step {currentStep + 1} of {totalSteps}
        </p>
      </div>

      <div className="progress" aria-label={`Workout progress: step ${currentStep + 1} of ${totalSteps}`}>
        {plan.steps.map((step, index) => (
          <button
            key={step}
            className={`progress__dot ${index === currentStep ? 'progress__dot--active' : ''}`}
            type="button"
            aria-label={index === currentStep ? `Current step ${index + 1}: ${step}` : `Go to step ${index + 1}: ${step}`}
            aria-current={index === currentStep ? 'step' : undefined}
            onClick={() => onSelectStep(index)}
            disabled={index === currentStep}
          />
        ))}
      </div>

      <div className="step-card__body" key={`${plan.id}-${currentStep}`}>
        <span aria-hidden="true">{String(currentStep + 1).padStart(2, '0')}</span>
        <p>{plan.steps[currentStep]}</p>
      </div>

      <div className="step-card__actions" aria-label="Workout step controls">
        <button className="button button--secondary" type="button" onClick={onPrevious} disabled={isFirstStep}>
          Previous
        </button>
        {isFinalStep ? (
          <button className="button button--primary" type="button" onClick={onReset}>
            Finish and restart
          </button>
        ) : (
          <button className="button button--primary" type="button" onClick={onNext}>
            Next step
          </button>
        )}
      </div>
    </section>
  );
}
