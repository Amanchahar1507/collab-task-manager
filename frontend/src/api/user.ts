import { api } from "./client"

export const getProfile = async () =>
  (await api.get("/users/me")).data

export const updateProfile = (name: string) =>
  api.patch("/users/me", { name })
