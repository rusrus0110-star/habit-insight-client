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

export type LongestStreakStats = {
  _id: string;
  name: string;
  category: HabitCategory;
  difficulty: HabitDifficulty;
  streak: number;
} | null;

export type BestDayStats = {
  dayNumber: number;
  dayName: string;
  count: number;
} | null;

export type BestMonthStats = {
  month: number;
  monthName: string;
  year: number;
  completions: number;
} | null;

export type AbandonedHabitStats = {
  _id: string;
  name: string;
  category: HabitCategory;
  difficulty: HabitDifficulty;
  lastCompleted?: string;
  daysSince: number;
};

export type MoodCorrelationItem = {
  difficulty: HabitDifficulty;
  averageMood: number;
  totalCompletions: number;
};

export type PerfectDayStats = {
  date: string;
  completions: number;
  averageMood: number;
} | null;

export type GoldenMeanStats = {
  habit: {
    _id: string;
    name: string;
    category: HabitCategory;
    difficulty: HabitDifficulty;
    totalCompletions: number;
  };
  averageCompletions: number;
  difference: number;
} | null;

export type BurnoutHabitStats = {
  _id: string;
  name: string;
  category: HabitCategory;
  difficulty: HabitDifficulty;
  streak: number;
  totalCompletions: number;
  difference: number;
};

export type AnalyticsStats = {
  longestStreak: LongestStreakStats;
  bestDay: BestDayStats;
  bestMonth: BestMonthStats;
  abandonedHabits: AbandonedHabitStats[];
  moodCorrelation: MoodCorrelationItem[];
  perfectDay: PerfectDayStats;
  goldenMean: GoldenMeanStats;
  burnoutHabits: BurnoutHabitStats[];
};
