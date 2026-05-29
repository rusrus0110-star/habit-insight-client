export type HabitCategory =
  | "health"
  | "education"
  | "productivity"
  | "mindfulness";

export type HabitDifficulty = "easy" | "medium" | "hard";

export type Habit = {
  _id: string;
  userId: string;
  name: string;
  category: HabitCategory;
  difficulty: HabitDifficulty;
  streak: number;
  bestStreak: number;
  totalCompletions: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateHabitPayload = {
  name: string;
  category: HabitCategory;
  difficulty: HabitDifficulty;
};

export type UpdateHabitPayload = {
  name: string;
  category: HabitCategory;
  difficulty: HabitDifficulty;
};

export type CompleteHabitPayload = {
  mood: number;
  notes?: string;
};

export type ProgressRecord = {
  _id: string;
  date: string;
  completed: boolean;
  mood: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type CompleteHabitResponse = {
  habit: Habit;
  progress: ProgressRecord;
};

export type HabitProgressHistoryResponse = {
  habit: Habit;
  progress: ProgressRecord[];
};
