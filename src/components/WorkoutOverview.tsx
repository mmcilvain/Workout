import React from "react";
import ExerciseCard, { Exercise } from "./ExerciseCard";

export interface WorkoutRoutine {
  title: string;
  estimatedDuration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  equipment: string[];
  warmUp: Exercise[];
  mainWorkout: Exercise[];
  cooldown: Exercise[];
}

export interface WorkoutOverviewProps {
  workout?: WorkoutRoutine;
}

export const sampleWorkout: WorkoutRoutine = {
  title: "Full-Body Strength Foundation",
  estimatedDuration: "38 minutes",
  difficulty: "Beginner",
  equipment: ["Mat", "Pair of dumbbells", "Chair or bench"],
  warmUp: [
    {
      id: "march-and-reach",
      name: "March and Overhead Reach",
      muscleGroup: "Full body warm-up",
      instructions: [
        "March in place with a tall chest and relaxed shoulders.",
        "Reach both arms overhead every four steps.",
        "Gradually increase your pace while keeping your breathing easy.",
      ],
      time: "3 minutes",
      rest: "None",
      media: { type: "image", src: "", caption: "Warm-up movement preview" },
      beginnerModification:
        "Keep the arms at shoulder height if overhead reaching is uncomfortable.",
      safetyTip:
        "Land softly and keep your knees tracking in line with your toes.",
    },
  ],
  mainWorkout: [
    {
      id: "goblet-squat",
      name: "Goblet Squat",
      muscleGroup: "Quads, glutes, core",
      instructions: [
        "Hold one dumbbell at chest height with elbows close to your ribs.",
        "Sit your hips back and lower until your thighs are near parallel to the floor.",
        "Drive through your heels to stand tall and squeeze your glutes.",
      ],
      sets: 3,
      reps: "8–10 reps",
      rest: "60 seconds",
      media: { type: "gif", src: "", caption: "Looped squat demonstration" },
      beginnerModification:
        "Squat to a chair and lightly tap it before standing.",
      safetyTip:
        "Keep your chest lifted and stop the set if your lower back rounds.",
    },
    {
      id: "incline-push-up",
      name: "Incline Push-Up",
      muscleGroup: "Chest, shoulders, triceps",
      instructions: [
        "Place your hands on a sturdy bench or countertop slightly wider than your shoulders.",
        "Step your feet back until your body forms a straight line.",
        "Lower your chest toward the surface, then press away with control.",
      ],
      sets: 3,
      reps: "8–12 reps",
      rest: "60 seconds",
      media: { type: "video", src: "", caption: "Pressing pattern video demo" },
      beginnerModification:
        "Use a higher surface to reduce the amount of body weight you press.",
      safetyTip: "Brace your core so your hips do not sag during the movement.",
    },
  ],
  cooldown: [
    {
      id: "childs-pose-breathing",
      name: "Child's Pose Breathing",
      muscleGroup: "Back, hips, shoulders",
      instructions: [
        "Kneel on the mat and sit your hips toward your heels.",
        "Reach your arms forward and relax your forehead toward the floor.",
        "Take slow nasal breaths and let your ribs expand with each inhale.",
      ],
      time: "2 minutes",
      rest: "None",
      media: { type: "image", src: "", caption: "Cooldown stretch preview" },
      beginnerModification:
        "Place a pillow between your hips and heels for support.",
      safetyTip:
        "Come out of the stretch slowly if you feel knee or hip discomfort.",
    },
  ],
};

function WorkoutSection({
  exercises,
  title,
}: {
  exercises: Exercise[];
  title: string;
}) {
  return (
    <section
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
      style={{ display: "grid", gap: 16 }}
    >
      <h2
        id={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
        style={{ color: "#111827", fontSize: 28, margin: 0 }}
      >
        {title}
      </h2>
      {exercises.map((exercise) => (
        <ExerciseCard
          exercise={exercise}
          key={exercise.id ?? exercise.name}
          phaseLabel={title}
        />
      ))}
    </section>
  );
}

export function WorkoutOverview({
  workout = sampleWorkout,
}: WorkoutOverviewProps) {
  return (
    <main
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div
        style={{ display: "grid", gap: 28, margin: "0 auto", maxWidth: 1120 }}
      >
        <header
          style={{
            background: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
            borderRadius: 28,
            boxShadow: "0 24px 60px rgba(30, 64, 175, 0.25)",
            color: "#ffffff",
            padding: 32,
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.12em",
              margin: "0 0 10px",
              textTransform: "uppercase",
            }}
          >
            Workout routine
          </p>
          <h1 style={{ fontSize: 44, lineHeight: 1.05, margin: 0 }}>
            {workout.title}
          </h1>
          <dl
            style={{
              display: "grid",
              gap: 14,
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              margin: "28px 0 0",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.16)",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <dt
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  opacity: 0.8,
                  textTransform: "uppercase",
                }}
              >
                Estimated duration
              </dt>
              <dd style={{ fontSize: 20, fontWeight: 800, margin: "6px 0 0" }}>
                {workout.estimatedDuration}
              </dd>
            </div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.16)",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <dt
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  opacity: 0.8,
                  textTransform: "uppercase",
                }}
              >
                Difficulty
              </dt>
              <dd style={{ fontSize: 20, fontWeight: 800, margin: "6px 0 0" }}>
                {workout.difficulty}
              </dd>
            </div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.16)",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <dt
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  opacity: 0.8,
                  textTransform: "uppercase",
                }}
              >
                Equipment
              </dt>
              <dd style={{ margin: "8px 0 0" }}>
                <ul
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {workout.equipment.map((item) => (
                    <li
                      key={item}
                      style={{
                        background: "rgba(255, 255, 255, 0.22)",
                        borderRadius: 999,
                        fontWeight: 700,
                        padding: "6px 10px",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </header>

        <WorkoutSection exercises={workout.warmUp} title="Warm-up" />
        <WorkoutSection exercises={workout.mainWorkout} title="Main workout" />
        <WorkoutSection exercises={workout.cooldown} title="Cooldown" />
      </div>
    </main>
  );
}

export default WorkoutOverview;
