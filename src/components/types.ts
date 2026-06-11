export type WorkoutPlan = {
  id: string;
  name: string;
  goal: string;
  duration: string;
  intensity: 'Gentle' | 'Moderate' | 'Challenging';
  accent: string;
  steps: string[];
};
