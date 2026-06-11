import ExerciseCard from './ExerciseCard'
import { workouts } from '../data/workouts'
import type { WorkoutExercise, WorkoutRoutine } from '../types/workout'

export interface WorkoutOverviewProps {
  workout?: WorkoutRoutine
}

const featuredWorkout = workouts[0]

function ExerciseSection({ exercises }: { exercises: WorkoutExercise[] }) {
  const exercisesByCategory = exercises.reduce(
    (groups, exercise) => {
      const categoryExercises = groups.get(exercise.category) ?? []
      categoryExercises.push(exercise)
      groups.set(exercise.category, categoryExercises)
      return groups
    },
    new Map<WorkoutExercise['category'], WorkoutExercise[]>(),
  )

  return (
    <div className="grid gap-6">
      {[...exercisesByCategory.entries()].map(([category, categoryExercises]) => (
        <section
          aria-labelledby={`${category.toLowerCase().replace(/\s+/g, '-')}-heading`}
          className="grid gap-4"
          key={category}
        >
          <h2
            className="m-0 text-3xl font-bold text-slate-900"
            id={`${category.toLowerCase().replace(/\s+/g, '-')}-heading`}
          >
            {category}
          </h2>
          {categoryExercises.map((exercise) => (
            <ExerciseCard exercise={exercise} key={exercise.name} />
          ))}
        </section>
      ))}
    </div>
  )
}

export function WorkoutOverview({ workout = featuredWorkout }: WorkoutOverviewProps) {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10">
      <div className="mx-auto grid max-w-6xl gap-7">
        <header className="rounded-[1.75rem] bg-gradient-to-br from-blue-700 to-violet-700 p-8 text-white shadow-2xl shadow-blue-900/25">
          <p className="m-0 mb-2.5 text-sm font-extrabold uppercase tracking-[0.12em] text-blue-100">
            {workout.category} workout routine
          </p>
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="grid gap-3">
              <h1 className="m-0 text-5xl font-bold leading-none tracking-tight">
                {workout.title}
              </h1>
              <p className="m-0 max-w-3xl text-lg leading-8 text-blue-50">
                {workout.description}
              </p>
            </div>
            <span className="w-fit rounded-full bg-white/20 px-4 py-2 text-sm font-extrabold uppercase tracking-wide">
              {workout.difficulty}
            </span>
          </div>

          <dl className="m-0 mt-7 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-white/15 p-4">
              <dt className="text-xs font-extrabold uppercase text-blue-100">
                Estimated duration
              </dt>
              <dd className="m-0 mt-1.5 text-xl font-extrabold">
                {workout.estimatedDuration}
              </dd>
            </div>
            <div className="rounded-2xl bg-white/15 p-4">
              <dt className="text-xs font-extrabold uppercase text-blue-100">
                Exercises
              </dt>
              <dd className="m-0 mt-1.5 text-xl font-extrabold">
                {workout.exercises.length} movements
              </dd>
            </div>
            <div className="rounded-2xl bg-white/15 p-4">
              <dt className="text-xs font-extrabold uppercase text-blue-100">
                Equipment
              </dt>
              <dd className="m-0 mt-2">
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {workout.equipment.map((item) => (
                    <li
                      className="rounded-full bg-white/20 px-2.5 py-1.5 text-sm font-bold"
                      key={item}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </header>

        <ExerciseSection exercises={workout.exercises} />
      </div>
    </main>
  )
}

export default WorkoutOverview
