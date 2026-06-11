import { FavoriteButton } from './components/FavoriteButton';
import { useLocalFavorites } from './hooks/useLocalFavorites';
import './styles.css';

type Workout = {
  id: string;
  name: string;
  duration: string;
  description: string;
};

const workouts: Workout[] = [
  {
    id: 'full-body-strength',
    name: 'Full Body Strength',
    duration: '45 min',
    description: 'Build foundational strength with compound movements and short rests.',
  },
  {
    id: 'morning-mobility',
    name: 'Morning Mobility',
    duration: '20 min',
    description: 'Wake up your joints with a gentle mobility flow.',
  },
  {
    id: 'hiit-cardio',
    name: 'HIIT Cardio',
    duration: '30 min',
    description: 'Alternate high-intensity intervals with recovery windows.',
  },
];

export const App = () => {
  const { favoriteIds, isFavorite, toggleFavorite } = useLocalFavorites();
  const favoriteWorkouts = workouts.filter((workout) => favoriteIds.includes(workout.id));

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Workout Library</p>
        <h1>Find and save workouts for later</h1>
        <p>Use the save button to keep a local list of favorite workouts that persists across refreshes.</p>
      </section>

      <section aria-labelledby="workouts-heading" className="panel">
        <h2 id="workouts-heading">All workouts</h2>
        <div className="workout-grid">
          {workouts.map((workout) => (
            <article className="workout-card" key={workout.id}>
              <div>
                <h3>{workout.name}</h3>
                <p className="duration">{workout.duration}</p>
                <p>{workout.description}</p>
              </div>
              <FavoriteButton
                isFavorite={isFavorite(workout.id)}
                onToggle={() => toggleFavorite(workout.id)}
                workoutName={workout.name}
              />
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="favorites-heading" className="panel">
        <h2 id="favorites-heading">Saved workouts</h2>
        {favoriteWorkouts.length > 0 ? (
          <ul className="favorites-list">
            {favoriteWorkouts.map((workout) => (
              <li key={workout.id}>
                <span>{workout.name}</span>
                <FavoriteButton
                  isFavorite
                  onToggle={() => toggleFavorite(workout.id)}
                  workoutName={workout.name}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state" role="status">
            <h3>No saved workouts yet</h3>
            <p>Save a workout from the library above and it will appear here.</p>
          </div>
        )}
      </section>
    </main>
  );
};
