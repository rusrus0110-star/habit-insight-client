import { axiosInstance } from "./axios_instance";
import type { ApiSuccessResponse } from "../types/api_types";
import type {
  CompleteHabitPayload,
  CompleteHabitResponse,
  CreateHabitPayload,
  Habit,
  UpdateHabitPayload,
} from "../features/habits/habit_types";

type HabitsResponseData = {
  habits: Habit[];
};

type HabitResponseData = {
  habit: Habit;
};

export const habitsApi = {
  getHabits: async (): Promise<Habit[]> => {
    const response =
      await axiosInstance.get<ApiSuccessResponse<HabitsResponseData>>(
        "/habits",
      );

    return response.data.data.habits;
  },

  createHabit: async (payload: CreateHabitPayload): Promise<Habit> => {
    const response = await axiosInstance.post<
      ApiSuccessResponse<HabitResponseData>
    >("/habits", payload);

    return response.data.data.habit;
  },

  updateHabit: async (
    habitId: string,
    payload: UpdateHabitPayload,
  ): Promise<Habit> => {
    const response = await axiosInstance.put<
      ApiSuccessResponse<HabitResponseData>
    >(`/habits/${habitId}`, payload);

    return response.data.data.habit;
  },

  deleteHabit: async (habitId: string): Promise<Habit> => {
    const response = await axiosInstance.delete<
      ApiSuccessResponse<HabitResponseData>
    >(`/habits/${habitId}`);

    return response.data.data.habit;
  },

  completeHabit: async (
    habitId: string,
    payload: CompleteHabitPayload,
  ): Promise<CompleteHabitResponse> => {
    const response = await axiosInstance.post<
      ApiSuccessResponse<CompleteHabitResponse>
    >(`/habits/${habitId}/complete`, payload);

    return response.data.data;
  },
};
