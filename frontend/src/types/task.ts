export type TaskStatus =
  | "To Do"
  | "In Progress"
  | "Review"
  | "Completed"

export type TaskPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent"

export interface Task {
  _id: string
  title: string
  description: string
  dueDate?: string
  status: TaskStatus
  priority: TaskPriority
  creatorId: string
  assignedToId: string
}

export interface CreateTaskPayload {
  title: string
  description: string
  dueDate?: string
  status: TaskStatus
  priority: TaskPriority
  assignedToId: string
}

export interface UpdateTaskPayload {
  title?: string
  description?: string
  dueDate?: string
  status?: TaskStatus
  priority?: TaskPriority
  assignedToId?: string
}
