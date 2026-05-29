import { axiosInstance } from "./axios_instance";
import type { ApiSuccessResponse } from "../types/api_types";
import type { DashboardStats } from "../features/stats_types";

export const statsApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response =
      await axiosInstance.get<ApiSuccessResponse<DashboardStats>>(
        "/stats/dashboard",
      );

    return response.data.data;
  },
};
