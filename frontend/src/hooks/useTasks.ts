import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import type { Task } from "../types/task";

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async (): Promise<Task[]> => {
      const res = await api.get<Task[]>("/tasks");
      return res.data;
    },
  });
};
