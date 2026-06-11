import React from 'react';
import ReactDOM from 'react-dom/client';
import { WorkoutStepper } from './components/WorkoutStepper';
import { demoWorkout } from './utils/workout';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main className="app-shell">
      <WorkoutStepper exercises={demoWorkout} />
    </main>
  </React.StrictMode>,
);
