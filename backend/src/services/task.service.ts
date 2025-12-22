import * as repo from "../repositories/task.repositories.js"
import { Types } from "mongoose"
import type { TaskDocument } from "../models/Task.js"

export interface CreateTaskDTO {
  title: string
  description?: string
  dueDate?: string
  priority: string
  status: string
  assignedToId?: string
}

export const createTaskService = async (
  data: CreateTaskDTO,
  userId: string
): Promise<TaskDocument> => {
  const assignedUserId =
    data.assignedToId && Types.ObjectId.isValid(data.assignedToId)
      ? new Types.ObjectId(data.assignedToId)
      : new Types.ObjectId(userId)

  return repo.createTask({
    title: data.title,
    description: data.description,
    priority: data.priority,
    status: data.status,
    dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    creatorId: new Types.ObjectId(userId),
    assignedToId: assignedUserId
  })
}

export const updateTaskService = async (
  id: string,
  data: Partial<CreateTaskDTO>
): Promise<TaskDocument> => {
  const task = await repo.updateTask(id, {
    ...data,
    dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    assignedToId:
      data.assignedToId && Types.ObjectId.isValid(data.assignedToId)
        ? new Types.ObjectId(data.assignedToId)
        : undefined
  })

  if (!task) throw new Error("Task not found")
  return task
}

export const deleteTaskService = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid task id")
  }

  const task = await repo.deleteTask(id)
  if (!task) throw new Error("Task not found")
}

export const getUserDashboardService = async (userId: string) => {
  const created = await repo.getTasksCreatedByUser(userId)
  const assigned = await repo.getTasksAssignedToUser(userId)
  const overdue = await repo.getOverdueTasksForUser(userId)

  return {
    created,
    assigned,
    overdue
  }
}
