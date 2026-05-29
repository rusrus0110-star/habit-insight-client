import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { App } from "antd";

import { authApi } from "../../api/auth_api";
import {
  getAuthToken,
  getStoredUser,
  removeAuthData,
  saveAuthData,
} from "./auth_storage";
import { AuthContext } from "./auth_context_value";
import type {
  AuthContextValue,
  LoginPayload,
  RegisterPayload,
  User,
} from "./auth_types";

type AuthProviderProps = {
  children: ReactNode;
};

const getErrorMessage = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  return "Something went wrong. Please try again.";
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { notification } = App.useApp();

  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [token, setToken] = useState<string | null>(() => getAuthToken());
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const isAuthenticated = Boolean(user && token);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = getAuthToken();

      if (!storedToken) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const currentUser = await authApi.getCurrentUser();

        setUser(currentUser);
        setToken(storedToken);
        saveAuthData(storedToken, currentUser);
      } catch {
        removeAuthData();
        setUser(null);
        setToken(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    void checkAuth();
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        const authData = await authApi.login(payload);

        saveAuthData(authData.token, authData.user);
        setUser(authData.user);
        setToken(authData.token);

        notification.success({
          message: "Login successful",
          description: `Welcome back, ${authData.user.name}.`,
        });
      } catch (error) {
        notification.error({
          message: "Login failed",
          description: getErrorMessage(error),
        });

        throw error;
      }
    },
    [notification],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      try {
        const authData = await authApi.register(payload);

        saveAuthData(authData.token, authData.user);
        setUser(authData.user);
        setToken(authData.token);

        notification.success({
          message: "Registration successful",
          description: `Welcome, ${authData.user.name}.`,
        });
      } catch (error) {
        notification.error({
          message: "Registration failed",
          description: getErrorMessage(error),
        });

        throw error;
      }
    },
    [notification],
  );

  const logout = useCallback(() => {
    removeAuthData();
    setUser(null);
    setToken(null);

    notification.info({
      message: "Logged out",
      description: "You have been signed out.",
    });
  }, [notification]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated,
      isAuthLoading,
      login,
      register,
      logout,
    }),
    [user, token, isAuthenticated, isAuthLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
