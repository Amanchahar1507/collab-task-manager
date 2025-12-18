import type { Task } from "./task";

export interface DashboardResponse {
  tasks: Task[];
  overdue: Task[];
}
