import type { HabitCategory, HabitDifficulty } from "./habits/habit_types";

export type DashboardHabitSummary = {
  _id: string;
  name: string;
  category: HabitCategory;
  difficulty: HabitDifficulty;
  streak: number;
  bestStreak: number;
  totalCompletions: number;
};

export type DashboardStats = {
  totalHabits: number;
  totalCompletions: number;
  bestStreakHabit: DashboardHabitSummary | null;
  averageMood: number;
};
