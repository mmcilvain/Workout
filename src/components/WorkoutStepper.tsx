import { useWorkoutTimer } from '../hooks/useWorkoutTimer';
import { type WorkoutExercise, getStepLabel } from '../utils/workout';
import { ProgressBar } from './ProgressBar';
import { Timer } from './Timer';

interface WorkoutStepperProps {
  exercises: WorkoutExercise[];
}

export function WorkoutStepper({ exercises }: WorkoutStepperProps) {
  const workout = useWorkoutTimer(exercises);
  const totalExercises = exercises.length;
  const currentExerciseNumber = workout.currentStep
    ? workout.currentStep.exerciseIndex + 1
    : totalExercises;

  if (workout.isFinished) {
    return (
      <section className="player player--finished" aria-labelledby="finished-heading">
        <p className="eyebrow">Workout complete</p>
        <h2 id="finished-heading">Nice work — routine finished!</h2>
        <p>You completed {totalExercises} exercises. Take a minute to cool down and hydrate.</p>
        <div className="control-grid control-grid--single">
          <button className="button button--primary" type="button" onClick={workout.restart}>
            Restart workout
          </button>
        </div>
      </section>
    );
  }

  if (!workout.isStarted || !workout.currentStep) {
    return (
      <section className="overview" aria-labelledby="overview-heading">
        <p className="eyebrow">Guided workout</p>
        <h1 id="overview-heading">Full-body starter routine</h1>
        <p className="overview__summary">
          Follow timed exercise blocks with built-in rests, large controls, and step-by-step
          guidance you can use one-handed.
        </p>
        <div className="overview__stats">
          <div>
            <strong>{totalExercises}</strong>
            <span>Exercises</span>
          </div>
          <div>
            <strong>{workout.steps.length}</strong>
            <span>Total steps</span>
          </div>
        </div>
        <ol className="exercise-list">
          {exercises.map((exercise) => (
            <li key={exercise.id}>
              <span>{exercise.name}</span>
              <small>
                {exercise.durationSeconds}s work
                {exercise.restSeconds > 0 ? ` · ${exercise.restSeconds}s rest` : ''}
              </small>
            </li>
          ))}
        </ol>
        <button className="button button--primary button--start" type="button" onClick={workout.start}>
          Start workout
        </button>
      </section>
    );
  }

  const phase = workout.currentStep.phase;
  const nextExercise = exercises[workout.currentStep.exerciseIndex + 1];

  return (
    <section className={`player player--${phase}`} aria-labelledby="workout-step-heading">
      <ProgressBar current={workout.currentStepIndex + 1} total={workout.steps.length} />

      <div className="step-card">
        <p className="eyebrow">
          {phase === 'exercise' ? `Exercise ${currentExerciseNumber} of ${totalExercises}` : 'Rest'}
        </p>
        <h2 id="workout-step-heading">{getStepLabel(workout.currentStep)}</h2>
        <p>{phase === 'exercise' ? workout.currentStep.exercise.description : 'Breathe, shake it out, and get ready for the next move.'}</p>
        {phase === 'rest' && nextExercise ? (
          <p className="up-next">Up next: {nextExercise.name}</p>
        ) : null}
      </div>

      <Timer
        durationSeconds={workout.currentStep.durationSeconds}
        isRunning={workout.isRunning}
        secondsRemaining={workout.secondsRemaining}
      />

      <div className="control-grid" aria-label="Workout controls">
        <button
          className="button button--secondary"
          type="button"
          onClick={workout.previous}
          disabled={workout.currentStepIndex === 0}
        >
          Previous
        </button>
        <button className="button button--primary" type="button" onClick={workout.toggle}>
          {workout.isRunning ? 'Pause' : 'Resume'}
        </button>
        <button className="button button--secondary" type="button" onClick={workout.next}>
          Next
        </button>
        <button className="button button--ghost" type="button" onClick={workout.restart}>
          Restart
        </button>
      </div>
    </section>
  );
}
