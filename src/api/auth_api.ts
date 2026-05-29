import { axiosInstance } from "./axios_instance";
import type {
  AuthData,
  LoginPayload,
  RegisterPayload,
  User,
} from "../features/auth/auth_types";
import type { ApiSuccessResponse } from "../types/api_types";

type AuthResponseData = AuthData;

type CurrentUserResponseData = {
  user: User;
};

export const authApi = {
  register: async (payload: RegisterPayload): Promise<AuthData> => {
    const response = await axiosInstance.post<
      ApiSuccessResponse<AuthResponseData>
    >("/auth/register", payload);

    return response.data.data;
  },

  login: async (payload: LoginPayload): Promise<AuthData> => {
    const response = await axiosInstance.post<
      ApiSuccessResponse<AuthResponseData>
    >("/auth/login", payload);

    return response.data.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response =
      await axiosInstance.get<ApiSuccessResponse<CurrentUserResponseData>>(
        "/auth",
      );

    return response.data.data.user;
  },
};
