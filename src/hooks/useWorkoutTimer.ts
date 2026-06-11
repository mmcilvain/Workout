import { useCallback, useEffect, useMemo, useState } from 'react';
import { buildWorkoutSteps, type WorkoutExercise } from '../utils/workout';

export function useWorkoutTimer(exercises: WorkoutExercise[]) {
  const steps = useMemo(() => buildWorkoutSteps(exercises), [exercises]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(steps[0]?.durationSeconds ?? 0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentStep = steps[currentStepIndex];

  const goToStep = useCallback(
    (nextIndex: number) => {
      const clampedIndex = Math.min(Math.max(nextIndex, 0), Math.max(steps.length - 1, 0));
      setCurrentStepIndex(clampedIndex);
      setSecondsRemaining(steps[clampedIndex]?.durationSeconds ?? 0);
      setIsFinished(false);
    },
    [steps],
  );

  const finishWorkout = useCallback(() => {
    setIsRunning(false);
    setIsFinished(true);
    setSecondsRemaining(0);
  }, []);

  const next = useCallback(() => {
    if (currentStepIndex >= steps.length - 1) {
      finishWorkout();
      return;
    }

    goToStep(currentStepIndex + 1);
  }, [currentStepIndex, finishWorkout, goToStep, steps.length]);

  const previous = useCallback(() => {
    if (isFinished) {
      goToStep(steps.length - 1);
      return;
    }

    goToStep(currentStepIndex - 1);
  }, [currentStepIndex, goToStep, isFinished, steps.length]);

  const start = useCallback(() => {
    if (steps.length === 0) {
      return;
    }

    setIsStarted(true);
    setIsFinished(false);
    setIsRunning(true);
  }, [steps.length]);

  const pause = useCallback(() => setIsRunning(false), []);

  const toggle = useCallback(() => {
    if (!isStarted || isFinished) {
      start();
      return;
    }

    setIsRunning((running: boolean) => !running);
  }, [isFinished, isStarted, start]);

  const restart = useCallback(() => {
    setCurrentStepIndex(0);
    setSecondsRemaining(steps[0]?.durationSeconds ?? 0);
    setIsStarted(true);
    setIsFinished(false);
    setIsRunning(true);
  }, [steps]);

  useEffect(() => {
    if (!isRunning || isFinished || !currentStep) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setSecondsRemaining((remaining: number) => {
        if (remaining <= 1) {
          window.clearInterval(timerId);
          next();
          return 0;
        }

        return remaining - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [currentStep, isFinished, isRunning, next]);

  return {
    currentStep,
    currentStepIndex,
    isFinished,
    isRunning,
    isStarted,
    next,
    pause,
    previous,
    restart,
    secondsRemaining,
    start,
    steps,
    toggle,
  };
}
