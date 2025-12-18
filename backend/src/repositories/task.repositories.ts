import { TaskModel } from "../models/Task.js";
import type { TaskDocument } from "../models/Task.js";

export const createTask = async (
  data: Omit<TaskDocument, "_id">
): Promise<TaskDocument> => {
  return TaskModel.create(data);
};

export const getUserTasks = async (userId: string) => {
  return TaskModel.find({ creatorId: userId });
};

export const getOverdueTasks = async () => {
  return TaskModel.find({ dueDate: { $lt: new Date() } });
};

export const updateTask = async (
  id: string,
  data: Partial<TaskDocument>
) => {
  return TaskModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTask = async (id: string) => {
  return TaskModel.findByIdAndDelete(id);
};
