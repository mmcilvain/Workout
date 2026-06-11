import type { ReactNode } from "react";
import type { WorkoutCategory } from "../App";

type AppShellProps = {
  children: ReactNode;
  categories: WorkoutCategory[];
  selectedCategory: WorkoutCategory;
  onSelectCategory: (categoryId: string) => void;
};

function AppShell({
  children,
  categories,
  selectedCategory,
  onSelectCategory,
}: AppShellProps) {
  const currentIndex = categories.findIndex(
    (category) => category.id === selectedCategory.id,
  );
  const nextCategory = categories[(currentIndex + 1) % categories.length];

  return (
    <main className="app-shell">
      <section className="hero-card" aria-labelledby="app-title">
        <div className="hero-card__content">
          <p className="eyebrow">Fit plan</p>
          <h1 id="app-title">Pick a workout that matches your energy.</h1>
          <p className="hero-card__copy">
            Browse focused routines with clear blocks, realistic durations, and
            no guessing once you tap a category.
          </p>
          <div
            className="hero-card__stats"
            aria-label="Workout library summary"
          >
            <span>
              <strong>{categories.length}</strong> categories
            </span>
            <span>
              <strong>18–45</strong> minutes
            </span>
            <span>
              <strong>All</strong> levels
            </span>
          </div>
        </div>
      </section>

      <div className="app-shell__layout">
        {children}

        <aside className="routine-panel" aria-labelledby="routine-heading">
          <div className="routine-panel__header">
            <span className="routine-panel__icon" aria-hidden="true">
              {selectedCategory.icon}
            </span>
            <div>
              <p className="eyebrow">Routine overview</p>
              <h2 id="routine-heading">{selectedCategory.name}</h2>
            </div>
          </div>

          <p className="routine-panel__overview">
            {selectedCategory.routine.overview}
          </p>

          <dl className="routine-panel__details">
            <div>
              <dt>Duration</dt>
              <dd>{selectedCategory.duration}</dd>
            </div>
            <div>
              <dt>Intensity</dt>
              <dd>{selectedCategory.intensity}</dd>
            </div>
          </dl>

          <div className="focus-list" aria-label="Workout focus areas">
            {selectedCategory.focus.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="routine-steps">
            <article>
              <h3>Warm up</h3>
              <p>{selectedCategory.routine.warmup}</p>
            </article>
            <article>
              <h3>Main blocks</h3>
              <ol>
                {selectedCategory.routine.blocks.map((block) => (
                  <li key={block}>{block}</li>
                ))}
              </ol>
            </article>
            <article>
              <h3>Cool down</h3>
              <p>{selectedCategory.routine.cooldown}</p>
            </article>
          </div>

          <button
            className="next-button"
            type="button"
            onClick={() => onSelectCategory(nextCategory.id)}
          >
            Try {nextCategory.name} next
          </button>
        </aside>
      </div>
    </main>
  );
}

export default AppShell;
