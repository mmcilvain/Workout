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

function escapeSvgText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createSvgPlaceholderDataUrl(label: string, mediaType: ExerciseMediaType): string {
  const normalizedLabel = escapeSvgText(label.trim() || 'Exercise demonstration');
  const badge = mediaType.toUpperCase();
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" role="img" aria-labelledby="title desc">',
    `<title id="title">${normalizedLabel}</title>`,
    `<desc id="desc">${badge} exercise demonstration placeholder</desc>`,
    '<defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#2563eb"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient></defs>',
    '<rect width="640" height="360" rx="28" fill="url(#bg)"/>',
    '<circle cx="516" cy="80" r="94" fill="#ffffff" opacity="0.12"/>',
    '<circle cx="106" cy="310" r="128" fill="#ffffff" opacity="0.1"/>',
    '<rect x="48" y="44" width="132" height="40" rx="20" fill="#ffffff" opacity="0.18"/>',
    `<text x="114" y="70" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="800" fill="#ffffff">${badge}</text>`,
    `<text x="320" y="178" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="800" fill="#ffffff">${normalizedLabel}</text>`,
    '<text x="320" y="224" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="600" fill="#dbeafe">Follow the written cues and move with control</text>',
    '</svg>',
  ].join('');

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const mediaFallbacks: Record<ExerciseMediaType, string> = {
  gif: createSvgPlaceholderDataUrl('Exercise GIF', 'gif'),
  video: createSvgPlaceholderDataUrl('Exercise Video', 'video'),
  image: createSvgPlaceholderDataUrl('Exercise Image', 'image'),
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
  const url = exercise.mediaUrl.trim() || mediaFallbacks[exercise.mediaType];

  return {
    type: exercise.mediaType,
    url,
    fallbackUrl: mediaFallbacks[exercise.mediaType],
  };
}

export function createPlaceholderMediaUrl(label: string, mediaType: ExerciseMediaType = 'gif'): string {
  return createSvgPlaceholderDataUrl(label, mediaType);
}
