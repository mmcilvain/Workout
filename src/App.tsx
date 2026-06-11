import { useMemo, useState } from "react";
import AppShell from "./components/AppShell";
import CategoryCard from "./components/CategoryCard";

export type WorkoutCategory = {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  intensity: "Low" | "Moderate" | "High";
  gradient: string;
  icon: string;
  focus: string[];
  routine: {
    overview: string;
    warmup: string;
    blocks: string[];
    cooldown: string;
  };
};

const workoutCategories: WorkoutCategory[] = [
  {
    id: "strength",
    name: "Strength",
    tagline: "Build full-body power with controlled compound moves.",
    duration: "45 min",
    intensity: "High",
    gradient: "from-coral",
    icon: "🏋️",
    focus: ["Power", "Muscle", "Progressive load"],
    routine: {
      overview:
        "A balanced lift day that alternates lower and upper-body patterns so you can train hard while keeping form crisp.",
      warmup:
        "5 minutes of dynamic hips, shoulder circles, bodyweight squats, and light hinges.",
      blocks: [
        "4 rounds: goblet squat x 10, push-up x 10, single-arm row x 12/side",
        "3 rounds: reverse lunge x 10/side, dumbbell press x 10, plank drag x 12",
        "Finisher: farmer carry or suitcase march for 4 x 40 seconds",
      ],
      cooldown: "Slow hamstring, chest, and lat stretches for 60 seconds each.",
    },
  },
  {
    id: "hiit",
    name: "HIIT",
    tagline: "Short intervals, big effort, and a serious sweat.",
    duration: "24 min",
    intensity: "High",
    gradient: "from-orange",
    icon: "⚡",
    focus: ["Intervals", "Conditioning", "Calories"],
    routine: {
      overview:
        "A fast circuit using work-rest waves to spike heart rate without needing equipment.",
      warmup:
        "4 minutes alternating march-to-jog, inchworms, lateral lunges, and easy jumping jacks.",
      blocks: [
        "Tabata: 20 seconds skaters, 10 seconds rest x 8",
        "EMOM 10: odd minutes burpees x 8, even minutes mountain climbers x 40",
        "Core blast: hollow hold 30 seconds, bicycle crunches 30 seconds x 3",
      ],
      cooldown:
        "Walk until breathing settles, then stretch calves, quads, and hip flexors.",
    },
  },
  {
    id: "cardio",
    name: "Cardio",
    tagline: "Steady endurance work for a stronger aerobic base.",
    duration: "35 min",
    intensity: "Moderate",
    gradient: "from-blue",
    icon: "🏃",
    focus: ["Endurance", "Heart health", "Pacing"],
    routine: {
      overview:
        "A low-friction aerobic session that works for walking, cycling, rowing, or jogging.",
      warmup: "5 minutes at conversational pace, gradually increasing cadence.",
      blocks: [
        "20 minutes steady zone 2 effort where speaking in short sentences is possible",
        "6 rounds: 45 seconds faster pace, 75 seconds easy recovery",
        "2 minutes smooth tempo to finish strong",
      ],
      cooldown: "5 minutes easy pace, followed by calf and quad mobility.",
    },
  },
  {
    id: "mobility",
    name: "Mobility",
    tagline: "Open stiff joints and restore range of motion.",
    duration: "18 min",
    intensity: "Low",
    gradient: "from-green",
    icon: "🧘",
    focus: ["Recovery", "Range", "Joint care"],
    routine: {
      overview:
        "A restorative flow designed for mornings, desk breaks, or post-training reset days.",
      warmup:
        "2 minutes nasal breathing in child’s pose and easy cat-cow waves.",
      blocks: [
        "Hip sequence: 90/90 switches, world’s greatest stretch, couch stretch",
        "Spine sequence: thoracic rotations, puppy pose, seated twists",
        "Ankle and shoulder sequence: knee-to-wall rocks, wall slides, band pull-aparts",
      ],
      cooldown: "Box breathing for 2 minutes in a comfortable supine position.",
    },
  },
  {
    id: "yoga",
    name: "Yoga",
    tagline: "Flow, balance, and breathing for a centered session.",
    duration: "30 min",
    intensity: "Moderate",
    gradient: "from-purple",
    icon: "🌙",
    focus: ["Balance", "Breath", "Flexibility"],
    routine: {
      overview:
        "A calm vinyasa-inspired practice with accessible poses and clear transitions.",
      warmup:
        "5 minutes of breath-led cat-cow, low lunge, and gentle sun salutations.",
      blocks: [
        "Flow A: chair, forward fold, half lift, plank, cobra, downward dog x 3",
        "Flow B: warrior II, side angle, triangle, half moon prep on each side",
        "Balance: tree pose and supported warrior III for 3 rounds",
      ],
      cooldown: "Supine twist, happy baby, and 3 minutes of savasana.",
    },
  },
  {
    id: "core",
    name: "Core",
    tagline: "Train trunk stability for stronger movement everywhere.",
    duration: "20 min",
    intensity: "Moderate",
    gradient: "from-slate",
    icon: "🔥",
    focus: ["Stability", "Posture", "Control"],
    routine: {
      overview:
        "An anti-rotation and anti-extension routine that supports lifting, running, and daily posture.",
      warmup:
        "3 minutes of dead bugs, bird dogs, and glute bridges at an easy tempo.",
      blocks: [
        "3 rounds: forearm plank 40 seconds, side plank 30 seconds/side, rest 30 seconds",
        "3 rounds: dead bug x 10/side, slow mountain climber x 20, bear hover 30 seconds",
        "Carry finisher: suitcase hold or march 3 x 45 seconds/side",
      ],
      cooldown:
        "Cobra stretch, kneeling lat stretch, and slow belly breathing.",
    },
  },
];

function App() {
  const [selectedId, setSelectedId] = useState(workoutCategories[0].id);
  const selectedCategory = useMemo(
    () =>
      workoutCategories.find((category) => category.id === selectedId) ??
      workoutCategories[0],
    [selectedId],
  );

  return (
    <AppShell
      selectedCategory={selectedCategory}
      categories={workoutCategories}
      onSelectCategory={setSelectedId}
    >
      <section className="category-section" aria-labelledby="category-heading">
        <div className="section-heading">
          <p className="eyebrow">Choose your focus</p>
          <h2 id="category-heading">Workout categories</h2>
        </div>
        <div className="category-grid">
          {workoutCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={category.id === selectedCategory.id}
              onSelect={() => setSelectedId(category.id)}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}

export default App;
