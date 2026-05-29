import { createContext } from "react";

import type { AuthContextValue } from "./auth_types";

export const AuthContext = createContext<AuthContextValue | null>(null);
