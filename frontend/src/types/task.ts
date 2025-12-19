export type TaskStatus =
  | "To Do"
  | "In Progress"
  | "Review"
  | "Completed";

export type TaskPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent";

export interface Task {
  _id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;      
  dueDate: string;             
  creatorId: string;
  assignedToId?: string;
}


export interface CreateTaskPayload {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignedToId?: string;
}

export type UpdateTaskPayload = Partial<CreateTaskPayload>;
