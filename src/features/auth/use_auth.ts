import { useContext } from "react";

import { AuthContext } from "./auth_context_value";
import type { AuthContextValue } from "./auth_types";

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
