import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import type { Notification } from "../types/notification";

export const useNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get<Notification[]>("/notifications");
      return res.data;
    },
  });
};
