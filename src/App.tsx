import { useMemo, useState } from 'react';
import { PlanCard } from './components/PlanCard';
import { StatusPanel } from './components/StatusPanel';
import { StepNavigator } from './components/StepNavigator';
import type { WorkoutPlan } from './components/types';

const workoutPlans: WorkoutPlan[] = [
  {
    id: 'mobility-reset',
    name: 'Mobility Reset',
    goal: 'Loosen tight hips, shoulders, and spine with steady, joint-friendly movement.',
    duration: '18 min',
    intensity: 'Gentle',
    accent: '#2563eb',
    steps: ['Box breathing for one minute', 'Cat-cow spinal waves', 'Half-kneeling hip flexor stretch', 'Thread-the-needle shoulder opener'],
  },
  {
    id: 'strength-builder',
    name: 'Strength Builder',
    goal: 'A compact bodyweight session that builds confidence without equipment.',
    duration: '28 min',
    intensity: 'Moderate',
    accent: '#047857',
    steps: ['Tempo squats', 'Incline push-ups', 'Reverse lunges', 'Forearm plank hold', 'Cool-down walk'],
  },
  {
    id: 'cardio-spark',
    name: 'Cardio Spark',
    goal: 'Raise your heart rate with short intervals and generous recovery windows.',
    duration: '22 min',
    intensity: 'Challenging',
    accent: '#b45309',
    steps: ['Marching warm-up', 'Low-impact jumping jacks', 'Mountain climber taps', 'Fast-feet intervals', 'Standing forward fold'],
  },
];

type AppMode = 'ready' | 'loading' | 'empty' | 'error';

function App() {
  const [selectedPlanId, setSelectedPlanId] = useState(workoutPlans[0]?.id ?? '');
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState<AppMode>('ready');

  const selectedPlan = useMemo(
    () => workoutPlans.find((plan) => plan.id === selectedPlanId) ?? workoutPlans[0],
    [selectedPlanId],
  );

  const showStatusDemo = (nextMode: AppMode) => {
    setMode(nextMode);
    setCurrentStep(0);
  };

  const selectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    setCurrentStep(0);
    setMode('ready');
  };

  const restorePlans = () => setMode('ready');

  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="page-title">
        <div>
          <p className="section-label">Workout planner</p>
          <h1 id="page-title">Choose a session that fits real life.</h1>
          <p>
            Clear steps, reachable controls, and calm feedback make it easier to start and finish a workout on any screen.
          </p>
        </div>
        <div className="hero__actions" aria-label="Preview app states">
          <button className="button button--secondary" type="button" onClick={() => showStatusDemo('loading')}>
            Preview loading
          </button>
          <button className="button button--secondary" type="button" onClick={() => showStatusDemo('empty')}>
            Preview empty
          </button>
          <button className="button button--secondary" type="button" onClick={() => showStatusDemo('error')}>
            Preview error
          </button>
        </div>
      </section>

      <div className="screen-frame" data-state={mode}>
        {mode === 'loading' ? (
          <StatusPanel title="Building your plan" message="We are checking your preferences and arranging the safest first step." variant="loading" actionLabel="Show plans" onAction={restorePlans} />
        ) : null}

        {mode === 'empty' ? (
          <StatusPanel title="No saved workouts yet" message="Choose one of the starter sessions to create your first workout flow." variant="empty" actionLabel="Browse starter plans" onAction={restorePlans} />
        ) : null}

        {mode === 'error' ? (
          <StatusPanel title="Workout plans did not load" message="Your last view is still available. Retry to return to the local starter plans." variant="error" actionLabel="Retry" onAction={restorePlans} />
        ) : null}

        {mode === 'ready' ? (
          <div className="dashboard">
            <section className="plan-picker" aria-labelledby="plans-heading">
              <div className="section-heading">
                <p className="section-label">Starter plans</p>
                <h2 id="plans-heading">Pick your focus</h2>
              </div>
              <div className="plan-grid">
                {workoutPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} isSelected={plan.id === selectedPlan.id} onSelect={selectPlan} />
                ))}
              </div>
            </section>

            <StepNavigator
              plan={selectedPlan}
              currentStep={currentStep}
              onNext={() => setCurrentStep((step) => Math.min(step + 1, selectedPlan.steps.length - 1))}
              onPrevious={() => setCurrentStep((step) => Math.max(step - 1, 0))}
              onReset={() => setCurrentStep(0)}
              onSelectStep={setCurrentStep}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default App;
