export type WorkoutPhase = 'exercise' | 'rest';

export interface WorkoutExercise {
  id: string;
  name: string;
  description: string;
  durationSeconds: number;
  restSeconds: number;
}

export interface WorkoutStep {
  exercise: WorkoutExercise;
  exerciseIndex: number;
  phase: WorkoutPhase;
  durationSeconds: number;
}

export const demoWorkout: WorkoutExercise[] = [
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    description: 'Stay light on your toes and keep a steady breathing rhythm.',
    durationSeconds: 40,
    restSeconds: 20,
  },
  {
    id: 'squats',
    name: 'Bodyweight Squats',
    description: 'Send hips back, keep chest proud, and press through your heels.',
    durationSeconds: 45,
    restSeconds: 20,
  },
  {
    id: 'push-ups',
    name: 'Push-ups',
    description: 'Brace your core and lower with control. Drop to knees if needed.',
    durationSeconds: 35,
    restSeconds: 25,
  },
  {
    id: 'plank',
    name: 'Forearm Plank',
    description: 'Stack shoulders over elbows and make one long line from head to heels.',
    durationSeconds: 40,
    restSeconds: 0,
  },
];

export function buildWorkoutSteps(exercises: WorkoutExercise[]): WorkoutStep[] {
  return exercises.flatMap((exercise, exerciseIndex) => {
    const exerciseStep: WorkoutStep = {
      exercise,
      exerciseIndex,
      phase: 'exercise',
      durationSeconds: exercise.durationSeconds,
    };

    if (exercise.restSeconds <= 0 || exerciseIndex === exercises.length - 1) {
      return [exerciseStep];
    }

    return [
      exerciseStep,
      {
        exercise,
        exerciseIndex,
        phase: 'rest',
        durationSeconds: exercise.restSeconds,
      },
    ];
  });
}

export function formatTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.ceil(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function getStepLabel(step: WorkoutStep): string {
  return step.phase === 'exercise' ? step.exercise.name : 'Rest';
}
