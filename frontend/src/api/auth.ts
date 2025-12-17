import { api } from "./client";
import type { LoginPayload, RegisterPayload } from "../types/auth";

export const login = (data: LoginPayload) =>
  api.post("/auth/login", data);

export const register = (data: RegisterPayload) =>
  api.post("/auth/register", data);

export const logout = () =>
  api.post("/auth/logout");
