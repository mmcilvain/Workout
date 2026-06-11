import MediaDemo from './MediaDemo'
import { resolveExerciseMedia, type WorkoutExercise } from '../types/workout'

export interface ExerciseCardProps {
  exercise: WorkoutExercise
}

function formatPrescription(exercise: WorkoutExercise) {
  const pieces = [
    exercise.sets
      ? `${exercise.sets} set${exercise.sets === 1 ? '' : 's'}`
      : null,
    exercise.reps,
    exercise.duration,
  ].filter(Boolean)

  return pieces.length > 0 ? pieces.join(' • ') : 'Move for quality reps'
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const media = resolveExerciseMedia(exercise)

  return (
    <article
      className="grid gap-5 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(220px,0.9fr)_minmax(260px,1.1fr)] lg:items-start">
        <MediaDemo
          alt={`${exercise.name} demonstration`}
          caption={`${exercise.mediaType.toUpperCase()} demonstration`}
          src={media.url}
          type={media.type}
        />

        <div className="grid gap-4">
          <header className="grid gap-2">
            <span className="text-xs font-extrabold uppercase tracking-[0.08em] text-blue-600">
              {exercise.category}
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="m-0 text-2xl font-bold leading-tight text-slate-900">
                {exercise.name}
              </h3>
              <span className="rounded-full bg-indigo-50 px-2.5 py-1.5 text-xs font-bold text-indigo-800">
                {exercise.muscleGroup}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-700">
                {exercise.difficulty}
              </span>
            </div>
          </header>

          <dl className="m-0 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-3">
              <dt className="text-xs font-extrabold uppercase text-slate-500">
                Sets / reps / time
              </dt>
              <dd className="m-0 mt-1.5 font-extrabold text-slate-900">
                {formatPrescription(exercise)}
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <dt className="text-xs font-extrabold uppercase text-slate-500">
                Rest
              </dt>
              <dd className="m-0 mt-1.5 font-extrabold text-slate-900">
                {exercise.rest}
              </dd>
            </div>
          </dl>

          <section aria-labelledby={`${exercise.name}-instructions`}>
            <h4
              className="m-0 mb-2 text-base font-bold text-slate-900"
              id={`${exercise.name}-instructions`}
            >
              Instructions
            </h4>
            <ol className="m-0 list-decimal space-y-1.5 pl-5 text-slate-700">
              {exercise.instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <aside className="rounded-2xl bg-emerald-50 p-3.5 text-emerald-800">
          <strong>Modification</strong>
          <p className="m-0 mt-1.5">{exercise.modification}</p>
        </aside>
        <aside className="rounded-2xl bg-orange-50 p-3.5 text-orange-800">
          <strong>Safety tip</strong>
          <p className="m-0 mt-1.5">{exercise.safetyTip}</p>
        </aside>
      </div>
    </article>
  )
}

export default ExerciseCard
