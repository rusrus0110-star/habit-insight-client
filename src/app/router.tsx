import { createBrowserRouter, Navigate } from "react-router-dom";

import { App } from "./App";
import { AppLayout } from "../components/AppLayout/AppLayout";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";
import { HabitsPage } from "../pages/HabitsPage/HabitsPage";
import { AnalyticsPage } from "../pages/AnalyticsPage/AnalyticsPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "habits",
        element: (
          <ProtectedRoute>
            <AppLayout>
              <HabitsPage />
            </AppLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <ProtectedRoute>
            <AppLayout>
              <AnalyticsPage />
            </AppLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
