import { api } from "./client";
import type {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "../types/task";

export const getDashboard = async (): Promise<{
  tasks: Task[];
  overdue: Task[];
}> => {
  const res = await api.get("/tasks/dashboard");
  return res.data;
};

export const createTask = (data: CreateTaskPayload) =>
  api.post<Task>("/tasks", data);

export const updateTask = (id: string, data: UpdateTaskPayload) =>
  api.patch<Task>(`/tasks/${id}`, data);

export const deleteTask = (id: string) =>
  api.delete(`/tasks/${id}`)