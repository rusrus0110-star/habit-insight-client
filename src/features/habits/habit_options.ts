import type { HabitCategory, HabitDifficulty } from "./habit_types";

export const HABIT_CATEGORY_OPTIONS: {
  label: string;
  value: HabitCategory;
}[] = [
  {
    label: "Health",
    value: "health",
  },
  {
    label: "Education",
    value: "education",
  },
  {
    label: "Productivity",
    value: "productivity",
  },
  {
    label: "Mindfulness",
    value: "mindfulness",
  },
];

export const HABIT_DIFFICULTY_OPTIONS: {
  label: string;
  value: HabitDifficulty;
}[] = [
  {
    label: "Easy",
    value: "easy",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Hard",
    value: "hard",
  },
];

export const MOOD_OPTIONS = [
  {
    label: "1 — Very low",
    value: 1,
  },
  {
    label: "2 — Low",
    value: 2,
  },
  {
    label: "3 — Neutral",
    value: 3,
  },
  {
    label: "4 — Good",
    value: 4,
  },
  {
    label: "5 — Excellent",
    value: 5,
  },
];
