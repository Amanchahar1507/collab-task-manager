export interface Task {
  _id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
}
export interface CreateTaskPayload {
  title: string;
  status: "todo" | "in-progress" | "done";
}

export type UpdateTaskPayload = Partial<CreateTaskPayload>;
