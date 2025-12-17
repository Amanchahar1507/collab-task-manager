export interface Task {
  _id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
}
