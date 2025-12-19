import type { Task } from "./task";

export interface DashboardResponse {
  created: Task[];
  assigned: Task[];
  overdue: Task[];
}
