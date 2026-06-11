import React from "react";
import MediaDemo, { MediaDemoProps } from "./MediaDemo";

export type ExerciseMedia = MediaDemoProps;

export interface Exercise {
  id?: string;
  name: string;
  muscleGroup: string;
  instructions: string[];
  sets?: number;
  reps?: string;
  time?: string;
  rest?: string;
  media?: ExerciseMedia;
  beginnerModification: string;
  safetyTip: string;
}

export interface ExerciseCardProps {
  exercise: Exercise;
  phaseLabel?: string;
}

function formatPrescription(exercise: Exercise) {
  const pieces = [
    exercise.sets
      ? `${exercise.sets} set${exercise.sets === 1 ? "" : "s"}`
      : null,
    exercise.reps,
    exercise.time,
  ].filter(Boolean);

  return pieces.length > 0 ? pieces.join(" • ") : "Move for quality reps";
}

export function ExerciseCard({ exercise, phaseLabel }: ExerciseCardProps) {
  return (
    <article
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 24,
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
        display: "grid",
        gap: 20,
        overflow: "hidden",
        padding: 20,
      }}
    >
      <div
        style={{
          alignItems: "flex-start",
          display: "grid",
          gap: 16,
          gridTemplateColumns: "minmax(220px, 0.9fr) minmax(260px, 1.1fr)",
        }}
      >
        <MediaDemo
          alt={`${exercise.name} demonstration`}
          caption={exercise.media?.caption}
          src={exercise.media?.src}
          type={exercise.media?.type}
        />

        <div style={{ display: "grid", gap: 16 }}>
          <header style={{ display: "grid", gap: 8 }}>
            {phaseLabel ? (
              <span
                style={{
                  color: "#2563eb",
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {phaseLabel}
              </span>
            ) : null}
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <h3
                style={{
                  color: "#111827",
                  fontSize: 24,
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                {exercise.name}
              </h3>
              <span
                style={{
                  background: "#eef2ff",
                  borderRadius: 999,
                  color: "#3730a3",
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "6px 10px",
                }}
              >
                {exercise.muscleGroup}
              </span>
            </div>
          </header>

          <dl
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              margin: 0,
            }}
          >
            <div
              style={{ background: "#f9fafb", borderRadius: 14, padding: 12 }}
            >
              <dt
                style={{
                  color: "#6b7280",
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                Sets / reps / time
              </dt>
              <dd
                style={{ color: "#111827", fontWeight: 800, margin: "6px 0 0" }}
              >
                {formatPrescription(exercise)}
              </dd>
            </div>
            <div
              style={{ background: "#f9fafb", borderRadius: 14, padding: 12 }}
            >
              <dt
                style={{
                  color: "#6b7280",
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                Rest
              </dt>
              <dd
                style={{ color: "#111827", fontWeight: 800, margin: "6px 0 0" }}
              >
                {exercise.rest ?? "As needed"}
              </dd>
            </div>
          </dl>

          <section
            aria-labelledby={`${exercise.id ?? exercise.name}-instructions`}
          >
            <h4
              id={`${exercise.id ?? exercise.name}-instructions`}
              style={{ color: "#111827", margin: "0 0 8px" }}
            >
              Instructions
            </h4>
            <ol style={{ color: "#374151", margin: 0, paddingLeft: 20 }}>
              {exercise.instructions.map((instruction) => (
                <li key={instruction} style={{ marginBottom: 6 }}>
                  {instruction}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <aside
          style={{
            background: "#ecfdf5",
            borderRadius: 16,
            color: "#065f46",
            padding: 14,
          }}
        >
          <strong>Beginner modification</strong>
          <p style={{ margin: "6px 0 0" }}>{exercise.beginnerModification}</p>
        </aside>
        <aside
          style={{
            background: "#fff7ed",
            borderRadius: 16,
            color: "#9a3412",
            padding: 14,
          }}
        >
          <strong>Safety tip</strong>
          <p style={{ margin: "6px 0 0" }}>{exercise.safetyTip}</p>
        </aside>
      </div>
    </article>
  );
}

export default ExerciseCard;
