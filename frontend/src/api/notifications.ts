import { api } from "./client"

export const getNotifications = async () =>
  (await api.get("/notifications")).data

export const markRead = (id: string) =>
  api.patch(`/notifications/${id}`)
