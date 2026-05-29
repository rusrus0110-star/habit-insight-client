import { axiosInstance } from "./axios_instance";
import type { ApiSuccessResponse } from "../types/api_types";
import type {
  AbandonedHabitStats,
  BestDayStats,
  BestMonthStats,
  BurnoutHabitStats,
  DashboardStats,
  GoldenMeanStats,
  LongestStreakStats,
  MoodCorrelationItem,
  PerfectDayStats,
} from "../features/stats_types";

export const statsApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response =
      await axiosInstance.get<ApiSuccessResponse<DashboardStats>>(
        "/stats/dashboard",
      );

    return response.data.data;
  },

  getLongestStreak: async (): Promise<LongestStreakStats> => {
    const response = await axiosInstance.get<
      ApiSuccessResponse<LongestStreakStats>
    >("/stats/longest-streak");

    return response.data.data;
  },

  getBestDay: async (): Promise<BestDayStats> => {
    const response =
      await axiosInstance.get<ApiSuccessResponse<BestDayStats>>(
        "/stats/best-day",
      );

    return response.data.data;
  },

  getBestMonth: async (): Promise<BestMonthStats> => {
    const response =
      await axiosInstance.get<ApiSuccessResponse<BestMonthStats>>(
        "/stats/best-month",
      );

    return response.data.data;
  },

  getAbandonedHabits: async (): Promise<AbandonedHabitStats[]> => {
    const response =
      await axiosInstance.get<ApiSuccessResponse<AbandonedHabitStats[]>>(
        "/stats/abandoned",
      );

    return response.data.data;
  },

  getMoodCorrelation: async (): Promise<MoodCorrelationItem[]> => {
    const response = await axiosInstance.get<
      ApiSuccessResponse<MoodCorrelationItem[]>
    >("/stats/mood-correlation");

    return response.data.data;
  },

  getPerfectDay: async (): Promise<PerfectDayStats> => {
    const response =
      await axiosInstance.get<ApiSuccessResponse<PerfectDayStats>>(
        "/stats/perfect-day",
      );

    return response.data.data;
  },

  getGoldenMean: async (): Promise<GoldenMeanStats> => {
    const response =
      await axiosInstance.get<ApiSuccessResponse<GoldenMeanStats>>(
        "/stats/golden-mean",
      );

    return response.data.data;
  },

  getBurnoutHabits: async (): Promise<BurnoutHabitStats[]> => {
    const response =
      await axiosInstance.get<ApiSuccessResponse<BurnoutHabitStats[]>>(
        "/stats/burnout",
      );

    return response.data.data;
  },
};
