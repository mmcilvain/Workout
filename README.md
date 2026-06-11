# Workout

Workout is a frontend-only workout browser for exploring exercise routines and saving favorite workouts in the browser. It is intended to run entirely on the client: there is no backend service, database, or authentication layer required for normal use.

## Project overview

- Browse workout entries from the local workout data file.
- Mark workouts as favorites for quick access later.
- Persist favorites in the browser with `localStorage`.
- Use placeholder media URLs during development and replace them with real images, GIFs, or videos before publishing.

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally, if the project defines a preview script:

```bash
npm run preview
```

> If `npm run preview` is not available, check `package.json` for the scripts supported by this project.

## Workout data

Workout definitions are expected to live in:

```text
src/data/workouts.ts
```

Update this file when adding, removing, or editing workouts. Keep workout IDs stable once they are used by the app so saved favorites continue to point to the correct workouts.

## Replacing placeholder media

Some workout entries may use placeholder media URLs while the app is being developed. To replace them:

1. Open `src/data/workouts.ts`.
2. Find the media-related field for each workout, such as an image, GIF, video, thumbnail, or similar URL field.
3. Replace the placeholder URL with a production-ready URL for the real asset.
4. Prefer optimized media assets:
   - Images: compressed `.webp`, `.jpg`, or `.png` files.
   - GIFs: short, optimized exercise demonstrations.
   - Videos: hosted `.mp4`, `.webm`, or streaming URLs that load reliably in browsers.
5. Confirm that each URL is publicly reachable by the deployed frontend.
6. Run the app locally with `npm run dev` and verify that the media loads correctly.

If media files are stored inside the project, place them in the app's public/static asset location and reference them with the path expected by the frontend framework.

## Frontend-only storage notes

This app is frontend-only. Favorites are saved in the user's browser with `localStorage`, which means:

- Favorites are stored per browser and per device.
- Clearing browser site data removes saved favorites.
- Favorites do not sync across devices.
- No user account or server-side persistence is required.
