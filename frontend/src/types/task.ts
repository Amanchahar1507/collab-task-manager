export interface Task {
  _id: string;
  title: string;
  status: "To Do" | "In Progress" | "Review" | "Completed";
  dueDate?: string;
  creatorId: string;        
  assignedToId?: string;
}

export interface CreateTaskPayload {
  title: string;
  status: "todo" | "in-progress" | "done";
}

export type UpdateTaskPayload = Partial<CreateTaskPayload>;
