# Workout

Workout is a React + TypeScript + Vite app for browsing typed workout routines with exercise media, modifications, and safety guidance.

## Prerequisites

- Node.js 20.19+ or 22.12+
- npm

## Setup

Install dependencies:

```bash
npm install
```

## Available Scripts

Start the local development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

- `index.html` is the Vite HTML entry point.
- `src/main.tsx` mounts the React application.
- `src/App.tsx` renders the workout overview experience.
- `src/components/WorkoutOverview.tsx` displays a selected workout routine from the shared data model.
- `src/components/ExerciseCard.tsx` renders exercise prescriptions, instructions, modifications, safety tips, and media previews.
- `src/data/workouts.ts` contains sample workout routines.
- `src/types/workout.ts` defines shared workout and exercise types.
- `src/styles.css` loads Tailwind CSS directives and global styles.
- `tailwind.config.js` and `postcss.config.js` configure the styling pipeline.
