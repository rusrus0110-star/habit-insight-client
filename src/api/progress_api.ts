import { axiosInstance } from "./axios_instance";
import type { ApiSuccessResponse } from "../types/api_types";
import type { HabitProgressHistoryResponse } from "../features/habits/habit_types";

export const progressApi = {
  getHabitProgressHistory: async (
    habitId: string,
    days?: number,
  ): Promise<HabitProgressHistoryResponse> => {
    const params = days ? { days } : undefined;

    const response = await axiosInstance.get<
      ApiSuccessResponse<HabitProgressHistoryResponse>
    >(`/progress/habits/${habitId}`, {
      params,
    });

    return response.data.data;
  },
};
