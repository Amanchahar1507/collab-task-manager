
  import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import type { DashboardResponse } from "../types/dashboard";

export const useDashboard = () => {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await api.get<DashboardResponse>("/tasks/dashboard");
      return res.data;
    },
  });
};
