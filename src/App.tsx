function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
        <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
          React + TypeScript + Vite + Tailwind CSS
        </div>

        <div className="space-y-5">
          <h1 className="bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
            Workout
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300">
            A fresh frontend foundation for building a fast, typed, and responsive workout experience.
          </p>
        </div>

        <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
          {[
            ['Vite', 'Instant dev server and optimized production builds.'],
            ['React', 'Composable UI with modern React rendering.'],
            ['Tailwind', 'Utility-first styling ready for rapid iteration.'],
          ].map(([title, description]) => (
            <article
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-2xl shadow-black/20 backdrop-blur"
              key={title}
            >
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
