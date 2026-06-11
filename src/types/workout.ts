export const workoutCategories = [
  'Full Body',
  'Upper Body',
  'Lower Body',
  'Core',
  'Cardio',
  'Mobility / Stretching',
  'Beginner',
  'At Home',
  'Gym',
] as const;

export type WorkoutCategory = (typeof workoutCategories)[number];

export const exerciseCategories = [
  'Strength',
  'Cardio',
  'Core',
  'Mobility',
  'Warm Up',
  'Cool Down',
] as const;

export type ExerciseCategory = (typeof exerciseCategories)[number];

export const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'] as const;

export type DifficultyLevel = (typeof difficultyLevels)[number];

export const exerciseMediaTypes = ['gif', 'video', 'image'] as const;

export type ExerciseMediaType = (typeof exerciseMediaTypes)[number];

export const mediaFallbacks: Record<ExerciseMediaType, string> = {
  gif: 'https://placehold.co/640x360/gif?text=Exercise+GIF',
  video: 'https://placehold.co/640x360/mp4?text=Exercise+Video',
  image: 'https://placehold.co/640x360/png?text=Exercise+Image',
};

export interface ExerciseMedia {
  type: ExerciseMediaType;
  url: string;
  fallbackUrl: string;
}

export interface WorkoutExercise {
  name: string;
  category: ExerciseCategory;
  muscleGroup: string;
  instructions: string[];
  mediaType: ExerciseMediaType;
  mediaUrl: string;
  sets: number | null;
  reps: string | null;
  duration: string | null;
  rest: string;
  difficulty: DifficultyLevel;
  equipment: string[];
  modification: string;
  safetyTip: string;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  category: WorkoutCategory;
  description: string;
  estimatedDuration: string;
  difficulty: DifficultyLevel;
  equipment: string[];
  exercises: WorkoutExercise[];
}

export function resolveExerciseMedia(exercise: Pick<WorkoutExercise, 'mediaType' | 'mediaUrl'>): ExerciseMedia {
  return {
    type: exercise.mediaType,
    url: exercise.mediaUrl || mediaFallbacks[exercise.mediaType],
    fallbackUrl: mediaFallbacks[exercise.mediaType],
  };
}

export function createPlaceholderMediaUrl(label: string, mediaType: ExerciseMediaType = 'gif'): string {
  const encodedLabel = encodeURIComponent(label.trim().replace(/\s+/g, '+'));
  const extension = mediaType === 'video' ? 'mp4' : mediaType;

  return `https://placehold.co/640x360/${extension}?text=${encodedLabel}`;
}
